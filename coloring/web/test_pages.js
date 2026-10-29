const fs=require('fs');const {JSDOM}=require('jsdom');
const html=fs.readFileSync('/home/user/Eilan-doll/index.html','utf8');
const errs=[];
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://eilan-doll.netlify.app/',
 beforeParse(w){
  w.HTMLCanvasElement.prototype.getContext=function(){return new Proxy({},{get:()=>()=>{},set:()=>true})};
  w.HTMLCanvasElement.prototype.toDataURL=()=>'data:,';
  const noop=()=>{}; w.scrollTo=noop;
  if(w.Element)w.Element.prototype.scrollTo=noop;
  if(w.HTMLElement)w.HTMLElement.prototype.scrollTo=noop;
  w.matchMedia=q=>({matches:false,media:q,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
  w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};
  w.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};
  w.addEventListener('error',e=>errs.push('ERR '+(e.message||(e.error&&e.error.message))));
  w.console.error=(...a)=>errs.push('CE '+a.map(String).join(' ').slice(0,150));
 }});
const w=dom.window,d=w.document;
setTimeout(()=>{
  const inj=d.createElement('script');
  inj.textContent=`window.__x={get S(){return S},get P(){return P},get CATS(){return CATS},get canAccess(){return canAccess},set USER(v){USER=v},get ACT(){return ACT}};`;
  d.head.appendChild(inj);
  const X=w.__x, out=[];
  const t=(n,f)=>{try{f();out.push('PASS  '+n)}catch(e){out.push('FAIL  '+n+' → '+e.message)}};

  X.USER={id:'t1',name:'T',provider:'local'};
  const p=X.S.products.find(x=>x.id==='p15');

  t('p15 priced 10',()=>{ if(+p.price!==10) throw 0; });
  t('p15 category books',()=>{ if(p.cat!=='books') throw 0; });

  // --- store page content
  X.USER=null;
  const store = X.P.store.html({q:{}});
  t('store lists the book',()=>{ if(!store.includes('دفتر التلوين')) throw 0; });
  t('store shows 10 SAR',()=>{ if(!/10\s*<small>ر\.س/.test(store)) throw 0; });
  t('store book card links to product',()=>{ if(!store.includes('eilan://product/p15')) throw 0; });
  t('book card is buyable, not soon',()=>{
    const i=store.indexOf('eilan://product/p15');
    const seg=store.slice(Math.max(0,i-500), i+200);
    if(seg.includes('soon-card')) throw new Error('rendered as soon card');
  });

  // --- books page, not owned
  delete X.S.owned['p15'];
  let bk = X.P.books.html();
  t('books page renders',()=>{ if(!bk.includes('دفتر التلوين')) throw 0; });
  t('books shows buy at 10',()=>{ if(!bk.includes('اشترِ الدفتر — 10 ر.س')) throw new Error(bk.match(/اشترِ[^<]*/)?.[0]); });
  t('books hides unlock when not owned',()=>{ if(bk.includes('افتح الدفتر التفاعلي')) throw 0; });

  // --- books page, owned
  X.S.owned['p15']=Date.now();
  bk = X.P.books.html();
  t('owned: open button',()=>{ if(!bk.includes('افتح الدفتر التفاعلي')) throw 0; });
  t('owned: pdf button',()=>{ if(!bk.includes('تحميل نسخة PDF')) throw 0; });
  t('owned: badge shown',()=>{ if(!bk.includes('مشترى')) throw 0; });
  t('owned: no buy button',()=>{ if(bk.includes('اشترِ الدفتر')) throw 0; });
  t('embed snippet points at book',()=>{ if(!bk.includes('/coloring-book.html')) throw 0; });

  // --- product page delivery
  const prodHtml = X.P.product.html({id:'p15'});
  t('product page shows downloads when owned',()=>{ if(!prodHtml.includes('افتح الدفتر التفاعلي')) throw 0; });

  console.log(out.join('\n'));
  const rel=errs.filter(e=>!/Not implemented|indexedDB|matchMedia/i.test(e));
  console.log('\nerrors:', rel.length?rel.slice(0,4).join('\n'):'none');
  const f=out.filter(x=>x.startsWith('FAIL'));
  console.log('\n'+(f.length?'❌ '+f.length+' failed':'✅ all passed'));
  process.exit(f.length?1:0);
},3500);
