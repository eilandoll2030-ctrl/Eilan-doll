/* موسوعة معادلات إيلان — محرك الكتاب ثلاثي الأبعاد (Three.js) */
import * as THREE from 'three';
import {kit,SCENES} from './scenes.js';
import {PARTS} from './parts.js';
const EQ=window.EQ,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let lang='ar';try{lang=localStorage.getItem('eb-lang')||'ar'}catch(e){}
{const q=new URLSearchParams(location.search).get('lang');if(q==='ar'||q==='en')lang=q}
const L=o=>Array.isArray(o)?(lang==='ar'?o[0]:o[1])||o[0]:o;
const LOGO='/assets/logo/eilan-icon.svg';
const UI={title:['موسوعة معادلات إيلان','Eilan Equations Encyclopedia'],back:['المكتبة','Library'],search:['ابحث عن معادلة… مثل: طاقة، أوم، فيثاغورس، pH','Search an equation… e.g. energy, Ohm, Pythagoras, pH'],index:['الفهرس','Index'],random:['معادلة عشوائية','Random equation'],add:['أضف معادلة','Add equation'],
 calc:['احسب بنفسك','Calculate'],result:['النتيجة','Result'],noCalc:['هذي معادلة وصفية ما تحتاج حساب — اقرأ الشرح وشوف المجسم.','This one is descriptive — read the note and explore the model.'],syms:['الرموز','Symbols'],ex:['مثال محسوب','Worked example'],
 eqOf:['معادلة','Equation'],of:['من','of'],drag:['اسحب لتدوير الكتاب · قرّب بإصبعين · اضغط على المجسمات','Drag to turn the book · pinch to zoom · tap the models'],
 vBook:['الكتاب','Book'],vText:['الصفحة','Page'],vModel:['المجسم','Model'],by:['✍️ الفكرة والشرح:','✍️ Idea & explanation:'],design:['🎨 التصميم التفاعلي: إيلان دول','🎨 Interactive design: Eilan Doll'],
 pending:['⏳ بانتظار المراجعة — تظهر لك أنت فقط الحين','⏳ Awaiting review — only you can see it for now'],fig:['شكل','Fig.'],tapHint:['حرّك القيم في الحاسبة وشوف المجسم يتغيّر','Change the values and watch the model respond'],
 count:['معادلة في الموسوعة','equations in the encyclopedia'],explain:['الشرح والحاسبة','Explanation & calculator'],
 auto:['⚡ تلقائي','⚡ Automatic'],build:['🧩 ابنِها خطوة بخطوة','🧩 Build it step by step'],dragHint:['✋ اسحب أي قطعة برّا الصفحة لتشيلها، أو اضغط عليها لتعرف دورها','✋ Drag any piece off the page to remove it, or tap it to see what it does'],
 step:['الخطوة','Step'],add2:['أضف','Add'],done:['✅ اكتملت! المعادلة تشتغل الحين — جرّب تشيل أي قطعة وشوف وش يصير','✅ Complete! The equation is running — try removing a piece and see what happens'],
 stopped:['⛔ المعادلة توقفت: شلت','⛔ The equation stopped: you removed'],putBack:['رجّعها لتشتغل','put it back to restart'],removed:['القطع المشالة','Removed pieces'],stopRes:['⛔ متوقفة','⛔ stopped'],
 noPart:['ما تنحسب بدون','Cannot be computed without'],what:['وش تقول المعادلة؟','What does it say?'],how:['كيف تتغيّر النتيجة؟','How does the result change?'],solve:['الحل خطوة بخطوة','Solving it step by step'],try:['جرّب بنفسك','Try it yourself'],close:['إغلاق','Close'],none:['ما لقينا معادلة بهذا الاسم. تقدر تضيفها أنت! ✍️','No equation found. You can add it yourself! ✍️'],loading:['جاري فتح الكتاب…','Opening the book…']};
const t=k=>L(UI[k]);

/* ---------- subject books (same 3D engine, filtered) ---------- */
const BOOKS={physics:{g:['phys'],ic:'⚡',n:['كتاب الفيزياء','Physics book']},chemistry:{g:['chem'],ic:'⚗️',n:['كتاب الكيمياء','Chemistry book']},biology:{c:['bio','med','gen','ecl','hum','phk','mic'],grp:'life',ic:'🧬',n:['كتاب الأحياء','Biology book']},math:{g:['math'],ic:'📐',n:['كتاب الرياضيات','Mathematics book']},statistics:{g:['stat'],ic:'📊',n:['كتاب الإحصاء','Statistics book']}};
const BOOK=new URLSearchParams(location.search).get('book'),BK=BOOKS[BOOK]||null;const POSK='eq-pos'+(BK?'-'+BOOK:'');
const SIMMAP={pe:'energy',coaster:'motion',newton:'motion',pendulum:'pendulum',wave:'wave',ohm:'circuit',linear:'graph',quad:'graph',pyth:'solids',unit:'graph',vectors:'graph',circle:'solids',atom:'atom',states:'heat',gas:'gas',ph:'beaker',react:'molecule',cell:'plant',eye:'optics',heart:'plant',photo:'plant',pop:'plant',mean:'dice',normal:'dice',lln:'dice',corr:'graph',clt:'dice'};
let LESSONS=[];
function loadLessons(){if(!BK)return Promise.resolve();window.EB=window.EB||{register:b=>{window.__lb=b},C:{},D:{fmt:v=>String(v)},L:(a,e)=>a,rand:()=>Math.random};
 return new Promise(res=>{const sc=document.createElement('script');sc.src='/books/'+BOOK+'.js?v=2';sc.onload=sc.onerror=()=>res();document.head.appendChild(sc)}).then(()=>{const b=window.__lb;if(!b)return;
  EQ.cats.les={id:'les',g:BK.grp||BK.g[0],n:['دروس الكتاب','Book lessons'],sc:'energy'};
  const fx=h=>String(h||'').replace(/<sub>(.*?)<\/sub>/g,'_{$1}').replace(/<sup>2<\/sup>/g,'²').replace(/<sup>3<\/sup>/g,'³').replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ');
  LESSONS=b.lessons.map((l,i)=>({cat:'les',id:'les-'+(i+1),lesson:{book:BOOK,i},n:[l.t.ar,l.t.en],f:fx(l.eq)||strip(l.t.ar),d:[l.p.ar,l.p.en],pts:(l.pts||[]).map(x=>[strip(x.ar),strip(x.en)]),q:l.q?[strip(l.q.ar),strip(l.q.en)]:null,a:l.a?[strip(l.a.ar),strip(l.a.en)]:null,sc:SIMMAP[l.sim]||'energy',out:'',x:'',ins:[]}))})}

/* ---------- list ---------- */
let LIST=[];
function buildList(){const order=EQ.groups.map(g=>g.id);const cats=Object.values(EQ.cats).filter(c=>c.id!=='les'&&(!BK||(BK.g?BK.g.includes(c.g):BK.c.includes(c.id))));LIST=[...LESSONS];
 order.forEach(g=>cats.filter(c=>c.g===g).forEach(c=>{const items=EQ.list.filter(e=>e.cat===c.id);items.forEach((e,i)=>{e.id=e.id||c.id+'-'+(i+1);LIST.push(e)})}));
 const rk={};LIST.forEach(e=>{rk[e.cat]=(rk[e.cat]||0)+1;e.__r=rk[e.cat]});
 mine().forEach((m,i)=>{if(!BK||(BK.g||[BK.grp]).includes(m.subj))LIST.push({...m,cat:'com',id:'mine-'+(i+1),mine:true})})}
function mine(){try{return JSON.parse(localStorage.getItem('eq-mine')||'[]')}catch(e){return[]}}

/* ---------- math evaluation ---------- */
const SCOPE='const {sqrt,sin,cos,tan,asin,acos,atan,atan2,log,log10,log2,exp,abs,pow,PI,floor,ceil,round,min,max,sinh,cosh,tanh,cbrt,hypot,sign}=Math;const rad=d=>d*PI/180,deg=r=>r*180/PI,ln=log,fact=n=>{n=Math.round(n);let r=1;for(let i=2;i<=n;i++)r*=i;return r},nCr=(n,k)=>fact(n)/(fact(k)*fact(n-k)),nPr=(n,k)=>fact(n)/fact(n-k);';
const fnCache={};
function compile(e){if(!e.out||!e.x)return null;const key=e.ins.join(',')+'|'+e.x;if(fnCache[key]!==undefined)return fnCache[key];try{fnCache[key]=new Function(...e.ins,SCOPE+'return ('+e.x+');')}catch(err){console.warn('bad expr',e.id,e.x,err);fnCache[key]=null}return fnCache[key]}
const sym=k=>EQ.sym[k]||{d:k,n:[k,k],u:'',v:1};
const fmt=v=>{if(v===undefined||v===null||Number.isNaN(v))return '—';if(!isFinite(v))return v>0?'∞':'−∞';const a=Math.abs(v);if(a!==0&&(a>=1e6||a<1e-3))return v.toExponential(3).replace('e','×10^').replace('+','');return (+v.toPrecision(5)).toLocaleString('en-US',{maximumFractionDigits:6})};
function values(e){const st=VALS[e.id]||(VALS[e.id]={});e.ins.forEach(k=>{if(st[k]===undefined)st[k]=sym(k).v});return st}
const VALS={};
const PS={kids:[],removed:new Set(),build:false,stopped:false,why:null};PS.build=true;try{PS.build=localStorage.getItem('eq-build')!=='0'}catch(e){}
function partsState(e){const zero=new Set();let stop=null;PS.removed.forEach(i=>{const pt=PS.kids[i]&&PS.kids[i].userData.part;if(!pt)return;(pt.s||[]).forEach(k=>{if(e.ins.includes(k))zero.add(k)});if((pt.e||pt.b)&&!stop)stop=pt});return{zero,stop}}
const need=pt=>pt&&(pt.e||pt.b);function allNeeded(){return PS.kids.every((k,i)=>!need(k.userData.part)||!PS.removed.has(i))}
function evalEq(e,raw){const f=compile(e);const v=values(e);const out={...v};const ps=raw?{zero:new Set(),stop:null}:partsState(e);ps.zero.forEach(k=>out[k]=0);if(f){try{out[e.out]=f(...e.ins.map(k=>+out[k]))}catch(err){out[e.out]=NaN}}if(ps.stop&&e.out)out[e.out]=0;out.__stop=ps.stop;out.__zero=ps.zero;return out}
function graphFn(e){const f=compile(e);if(!f||!e.ins.length)return null;const v=values(e);const k0=e.ins[0];return{key:k0,x0:+v[k0],xl:sym(k0).d,yl:sym(e.out).d,f:x=>{try{return f(...e.ins.map(k=>k===k0?x:+v[k]))}catch(err){return NaN}}}}

/* ---------- renderer ---------- */
const cv=$('#gl');const R3=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true,powerPreference:'high-performance'});
R3.setPixelRatio(Math.min(2,window.devicePixelRatio||1));R3.shadowMap.enabled=true;R3.shadowMap.type=THREE.PCFSoftShadowMap;R3.outputColorSpace=THREE.SRGBColorSpace;R3.toneMapping=THREE.ACESFilmicToneMapping;R3.toneMappingExposure=1.08;
const scene=new THREE.Scene();scene.fog=new THREE.Fog(0x080a12,5.5,13);
const camera=new THREE.PerspectiveCamera(36,1,.05,40);
scene.add(new THREE.HemisphereLight(0xe3e9ff,0x2a2216,.75));
const key=new THREE.DirectionalLight(0xfff0d8,2.4);key.position.set(-1.8,4,2.2);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-1.6,right:1.6,top:1.3,bottom:-1.3,near:1,far:9});key.shadow.bias=-.0004;key.shadow.normalBias=.015;key.shadow.radius=3;scene.add(key);
const fill=new THREE.DirectionalLight(0x9fb4ff,.45);fill.position.set(2.5,2,-1.5);scene.add(fill);
let K=kit(lang);

/* desk */
{const tex=new THREE.CanvasTexture((()=>{const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d');const g=x.createRadialGradient(256,256,30,256,256,256);g.addColorStop(0,'#2a3150');g.addColorStop(.55,'#161b30');g.addColorStop(1,'#0b0d17');x.fillStyle=g;x.fillRect(0,0,512,512);for(let i=0;i<5000;i++){x.fillStyle=`rgba(255,255,255,${Math.random()*.025})`;x.fillRect(Math.random()*512,Math.random()*512,1,1)}return c})());tex.colorSpace=THREE.SRGBColorSpace;
 const desk=new THREE.Mesh(new THREE.PlaneGeometry(12,12),new THREE.MeshStandardMaterial({map:tex,roughness:.92}));desk.rotation.x=-Math.PI/2;desk.receiveShadow=true;scene.add(desk)}

/* ---------- book geometry ---------- */
const PW=1,PD=1.36,COV=.03,BLK=.05,TOPY=COV+BLK,GUT=.035;
const book=new THREE.Group();scene.add(book);
const cover=new THREE.Mesh(new THREE.BoxGeometry(2*PW+.1,COV,PD+.08),new THREE.MeshStandardMaterial({color:0x0B1F5E,roughness:.55}));cover.position.y=COV/2;cover.castShadow=cover.receiveShadow=true;book.add(cover);
const edge=new THREE.Mesh(new THREE.BoxGeometry(2*PW+.13,.014,PD+.11),new THREE.MeshStandardMaterial({color:0xC9A227,roughness:.35,metalness:.5}));edge.position.y=.007;edge.receiveShadow=true;book.add(edge);
const stripe=new THREE.CanvasTexture((()=>{const c=document.createElement('canvas');c.width=16;c.height=64;const x=c.getContext('2d');for(let i=0;i<64;i+=2){x.fillStyle=i%4?'#efe7d3':'#d6caae';x.fillRect(0,i,16,2)}return c})());stripe.colorSpace=THREE.SRGBColorSpace;stripe.wrapT=THREE.RepeatWrapping;
const sideM=new THREE.MeshStandardMaterial({map:stripe,roughness:.9}),pageTopM=new THREE.MeshStandardMaterial({color:0xf3eee2,roughness:.9});
[-1,1].forEach(s=>{const b=new THREE.Mesh(new THREE.BoxGeometry(PW,BLK,PD),[sideM,sideM,pageTopM,pageTopM,sideM,sideM]);b.position.set(s*(PW/2),COV+BLK/2-.004,0);b.castShadow=b.receiveShadow=true;book.add(b)});
function pageGeo(side){const g=new THREE.PlaneGeometry(PW,PD,40,1);g.rotateX(-Math.PI/2);const p=g.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i);const d=side>0?x+PW/2:PW/2-x;p.setY(i,-GUT*Math.exp(-d*13)+.004*Math.sin(d*Math.PI))}g.computeVertexNormals();return g}
const pageCanvas=()=>{const c=document.createElement('canvas');c.width=1024;c.height=1392;return c};
const texA=new THREE.CanvasTexture(pageCanvas()),texB=new THREE.CanvasTexture(pageCanvas());[texA,texB].forEach(x=>{x.colorSpace=THREE.SRGBColorSpace;x.anisotropy=R3.capabilities.getMaxAnisotropy()});
const pageR=new THREE.Mesh(pageGeo(1),new THREE.MeshStandardMaterial({map:texA,roughness:.88}));pageR.position.set(PW/2,TOPY+.001,0);pageR.receiveShadow=true;book.add(pageR);
const pageL=new THREE.Mesh(pageGeo(-1),new THREE.MeshStandardMaterial({map:texB,roughness:.88}));pageL.position.set(-PW/2,TOPY+.001,0);pageL.receiveShadow=true;book.add(pageL);
const rtl=()=>lang==='ar';
const textSide=()=>rtl()?1:-1;              // RTL: text on the right page, model on the left
const textMesh=()=>rtl()?pageR:pageL,modelMesh=()=>rtl()?pageL:pageR;
const modelAnchor=new THREE.Group();book.add(modelAnchor);

/* ---------- page textures ---------- */
function paper(x,W,H){x.fillStyle='#f6f1e4';x.fillRect(0,0,W,H);const g=x.createLinearGradient(0,0,W,0);const inner=rtl()?0:W;g.addColorStop(0,'rgba(0,0,0,0)');x.fillStyle=g;for(let i=0;i<2600;i++){x.fillStyle=`rgba(120,100,60,${Math.random()*.035})`;x.fillRect(Math.random()*W,Math.random()*H,1.5,1.5)}}
const SUBRX=/_\{([^}]+)\}|_([A-Za-z0-9\u0370-\u03ff]+)/g;
function segs(s){const out=[];let last=0;String(s).replace(SUBRX,(m,a,b,i)=>{if(i>last)out.push([s.slice(last,i),0]);out.push([a||b,1]);last=i+m.length});if(last<s.length)out.push([s.slice(last),0]);return out}
function richW(x,s,font,size){let w=0;segs(s).forEach(([t,sub])=>{x.font=font(sub?size*.62:size);w+=x.measureText(t).width});return w}
function richDraw(x,s,X,Y,font,size,align){const w=richW(x,s,font,size);let cx=align==='center'?X-w/2:align==='right'?X-w:X;x.textAlign='left';segs(s).forEach(([t,sub])=>{x.font=font(sub?size*.62:size);x.fillText(t,cx,Y+(sub?size*.22:0));cx+=x.measureText(t).width})}
const htmlF=s=>esc(s).replace(SUBRX,(m,a,b)=>'<sub>'+(a||b)+'</sub>');
function wrap(x,s,maxW){const words=String(s).split(/\s+/);const lines=[];let cur='';words.forEach(w=>{const tst=cur?cur+' '+w:w;if(x.measureText(tst).width>maxW&&cur){lines.push(cur);cur=w}else cur=tst});if(cur)lines.push(cur);return lines}
const strip=s=>String(s||'').replace(/<[^>]+>/g,'');
function drawText(c,e,idx){const x=c.getContext('2d'),W=c.width,H=c.height,P=86;paper(x,W,H);const ar=rtl();x.direction=ar?'rtl':'ltr';x.textAlign=ar?'right':'left';const X0=ar?W-P:P,maxW=W-2*P;let y=P+10;
 const UIF=(px,b)=>`${b?'700 ':''}${px}px ${ar?'Tajawal':'system-ui,-apple-system,Segoe UI'},sans-serif`,BODY=(px,b)=>`${b?'700 ':''}${px}px ${ar?'Amiri,Tajawal':'Georgia,serif'}`;
 const cat=EQ.cats[e.cat],grp=EQ.groups.find(g=>g.id===cat.g);x.font=UIF(32,true);x.fillStyle='#0F6B44';x.fillText(e.lesson?(rtl()?'الدرس ':'Lesson ')+(e.lesson.i+1)+' · '+L(BK.n):(grp?L(grp.n)+' · ':'')+L(cat.n),X0,y);y+=56;
 x.font=BODY(74,true);x.fillStyle='#101218';wrap(x,strip(L(e.n)),maxW).forEach(l=>{x.fillText(l,X0,y);y+=84});y+=6;
 // formula box
 x.save();const fz=e.f.length>34?54:e.f.length>24?66:82;x.font=`italic ${fz}px 'Cambria Math','Times New Roman',serif`;x.direction='ltr';x.textAlign='center';const fl=wrap(x,e.f,maxW-60);const bh=fl.length*(fz+18)+40;x.fillStyle='rgba(30,68,200,.07)';x.strokeStyle='rgba(30,68,200,.45)';x.setLineDash([10,8]);x.lineWidth=3;const rx=P,ry=y,rw=maxW;x.beginPath();x.roundRect?x.roundRect(rx,ry,rw,bh,22):x.rect(rx,ry,rw,bh);x.fill();x.stroke();x.fillStyle='#14286f';const FF=px=>`italic ${px}px 'Cambria Math','Times New Roman',serif`;fl.forEach((l,i)=>richDraw(x,l,W/2,ry+40+fz*.75+i*(fz+18),FF,fz,'center'));x.restore();y+=bh+44;
 // note
 x.font=BODY(46);x.fillStyle='#1d1f27';wrap(x,strip(L(e.d)),maxW).forEach(l=>{x.fillText(l,X0,y);y+=64});y+=18;
 if(e.pts){x.font=BODY(40);x.fillStyle='#1E44C8';e.pts.forEach(pt=>wrap(x,'• '+L(pt),maxW).forEach(w=>{x.fillText(w,X0,y);y+=54}));y+=10}if(e.q&&y<H-300){x.font=UIF(34,true);x.fillStyle='#4A2A8F';wrap(x,(rtl()?'سؤال: ':'Question: ')+L(e.q),maxW).forEach(w=>{x.fillText(w,X0,y);y+=48});y+=10}
 const rl=relations(e);if(rl.length){x.font=BODY(40);x.fillStyle='#0F6B44';rl.slice(0,2).forEach(l=>{wrap(x,'• '+l.replace(/[«»“”]/g,''),maxW).forEach(w=>{x.fillText(w,X0,y);y+=54})});y+=12}
 // symbols
 const all=[...(e.out?[e.out]:[]),...e.ins];if(all.length){x.font=UIF(34,true);x.fillStyle='#4A2A8F';x.fillText(t('syms'),X0,y);y+=52;x.font=UIF(35);all.slice(0,8).forEach(k=>{const s=sym(k);x.fillStyle='#1E44C8';x.save();const SF=px=>`italic 700 ${px}px 'Times New Roman',serif`;x.direction='ltr';const sw=richW(x,s.d,SF,40);richDraw(x,s.d,X0,y,SF,40,ar?'right':'left');x.restore();x.font=UIF(35);x.textAlign=ar?'right':'left';x.fillStyle='#2b2d36';x.fillText('  '+L(s.n)+(s.u?'  ('+s.u+')':''),ar?X0-sw-8:X0+sw+8,y);y+=52})}
 // worked example
 const f=compile(e);if(f&&y<H-300){const v={};e.ins.forEach(k=>v[k]=sym(k).v);let r;try{r=f(...e.ins.map(k=>v[k]))}catch(er){}if(isFinite(r)){y+=18;x.font=UIF(34,true);x.fillStyle='#0F6B44';x.fillText(t('ex'),X0,y);y+=52;x.save();x.direction='ltr';x.textAlign=ar?'right':'left';x.font=`36px 'Times New Roman',serif`;x.fillStyle='#2b2d36';const line=e.ins.map(k=>sym(k).d+' = '+fmt(v[k])).join(',  ');wrap(x,line,maxW).forEach(l=>{x.fillText(l,X0,y);y+=46});x.font=`700 42px 'Times New Roman',serif`;x.fillStyle='#14286f';richDraw(x,'⇒  '+sym(e.out).d+' = '+fmt(r)+(sym(e.out).u?' '+sym(e.out).u:''),X0,y+4,px=>`700 ${px}px 'Times New Roman',serif`,42,ar?'right':'left');x.restore();y+=50}}
 // footer
 let fy=H-70;if(e.by||e.mine){x.font=UIF(26,true);x.fillStyle='#4A2A8F';if(e.mine){x.fillText(t('pending'),X0,fy-84)}if(e.by&&e.show!==false){x.fillText(t('by')+' '+e.by,X0,fy-48);x.font=UIF(24);x.fillStyle='#6b6d78';x.fillText(t('design'),X0,fy-14)}}
 x.strokeStyle='rgba(90,80,50,.25)';x.lineWidth=2;x.setLineDash([]);x.beginPath();x.moveTo(P,H-60);x.lineTo(W-P,H-60);x.stroke();x.font=UIF(24);x.fillStyle='#8b8571';x.textAlign=ar?'right':'left';x.fillText('إيلان دول · EILAN DOLL',X0,H-30);x.textAlign=ar?'left':'right';x.fillText(String(idx+1),ar?P:W-P,H-30)}
function drawModelPage(c,e,idx){const x=c.getContext('2d'),W=c.width,H=c.height,P=86;paper(x,W,H);const ar=rtl();x.direction=ar?'rtl':'ltr';x.textAlign=ar?'right':'left';const X0=ar?W-P:P;
 x.font=`italic 30px ${ar?'Amiri,Tajawal':'Georgia,serif'}`;x.fillStyle='#6b6d78';x.fillText(t('fig')+' '+(idx+1)+' — '+strip(L(e.n)),X0,H-150);x.font=`italic 32px ${ar?'Amiri,Tajawal':'Georgia,serif'}`;x.fillStyle='#2b2d36';x.fillText(t('tapHint'),X0,H-104);
 x.strokeStyle='rgba(90,80,50,.25)';x.lineWidth=2;x.beginPath();x.moveTo(P,H-60);x.lineTo(W-P,H-60);x.stroke();x.font=`24px ${ar?'Tajawal':'system-ui'},sans-serif`;x.fillStyle='#8b8571';x.textAlign=ar?'right':'left';x.fillText('إيلان دول · EILAN DOLL',X0,H-30)}

/* ---------- state ---------- */
let idx=0,cur=null,busy=false;const tweens=[];
const tween=(dur,fn,done)=>tweens.push({t0:performance.now(),dur,fn,done});
const ease=p=>1-Math.pow(1-p,3),back=p=>{const c1=1.5,c3=c1+1;return 1+c3*Math.pow(p-1,3)+c1*Math.pow(p-1,2)};
function popAll(root,dir,dur=900,done){const kids=root.children.filter(c=>c.userData.pop);kids.forEach((k,i)=>{k.userData.base=k.userData.base||{s:k.scale.y,rx:k.rotation.x}});
 tween(dur+kids.length*60,el=>{kids.forEach((k,i)=>{let p=K.clamp((el-i*60)/dur,0,1);p=dir>0?back(p):1-ease(p);k.scale.set(1,Math.max(.001,p),1);k.rotation.x=(1-K.clamp(p,0,1))*-1.25});},done)}
function mountModel(e){if(cur){modelAnchor.remove(cur.root);cur.root.traverse(o=>{if(o.geometry)o.geometry.dispose()})}
 const fnB=SCENES[e.sc]||SCENES.energy;let s;try{s=fnB(K,e)}catch(err){console.error('scene',e.sc,err);s=SCENES.energy(K,e)}cur=s;
 const side=-textSide();modelAnchor.position.set(side*PW/2,TOPY+.004,-.02);modelAnchor.scale.setScalar(1.18);modelAnchor.add(s.root);s.root.traverse(o=>{if(o.isMesh){o.castShadow=o.castShadow!==false}});
 const kids=s.root.children.filter(k=>k.userData.pop);const spec=(PARTS[e.sc]||(()=>[]))(e);kids.forEach((k,i)=>{k.userData.part=spec[i]||{n:['قطعة','Piece'],r:['جزء من المجسم','part of the model']};k.userData.home=k.position.clone();k.userData.idx=i});PS.kids=kids;PS.removed=new Set();GL.step=0;dimMap.clear();
 PS.strays=s.root.children.filter(k=>!k.userData.pop);PS.done=false;
 if(PS.build)kids.forEach((k,i)=>{PS.removed.add(i);k.visible=false});
 refreshModel();s.root.children.forEach(k=>{if(k.userData.pop){k.scale.set(1,.001,1);k.rotation.x=-1.25}})}
const dimMap=new Map();
function refreshModel(){const e=LIST[idx];if(!cur||!e)return;if(allNeeded())PS.done=true;(PS.strays||[]).forEach(o=>o.visible=!PS.build||PS.done);const v=evalEq(e);PS.stopped=!!v.__stop;try{cur.update&&cur.update(v,graphFn(e))}catch(err){console.error(err)}
 // stopped: lights and glows go dark; restored when running again
 cur.root.traverse(o=>{if(o.isLight){if(!dimMap.has(o))dimMap.set(o,o.intensity);if(PS.stopped)o.intensity=0;else if(o.intensity===0)o.intensity=dimMap.get(o)}
  else if(o.isMesh&&o.material&&o.material.emissive&&!o.material.emissiveMap){const m=o.material;if(!dimMap.has(m))dimMap.set(m,m.emissiveIntensity);if(PS.stopped)m.emissiveIntensity=0;else if(m.emissiveIntensity===0&&e.sc!=='circuit')m.emissiveIntensity=dimMap.get(m)}});
 tray();updRes();liveBtn()}
function paint(e){drawText(textMesh().material.map.image,e,idx);textMesh().material.map.needsUpdate=true;drawModelPage(modelMesh().material.map.image,e,idx);modelMesh().material.map.needsUpdate=true}
function show(i,{flip=0}={}){if(!LIST.length)return;if(TOUR.on){stopSpeech();TOUR.on=false;tourUI()}i=(i+LIST.length)%LIST.length;const e=LIST[i];
 if(!isFree(e,i)){idx=i;showLock(e);ui();return}const wasLk=document.body.classList.contains('locked');hideLock();
 if(!flip||busy||!cur||wasLk){idx=i;paint(e);mountModel(e);popAll(cur.root,1);ui();return}
 busy=true;popAll(cur.root,-1,380,()=>{doFlip(flip,()=>{idx=i;paint(e);mountModel(e);popAll(cur.root,1);ui();busy=false})})}
function doFlip(dir,done){// dir>0 forward. RTL forward: left page turns over to the right.
 const fromSide=(dir>0)===rtl()?-1:1;const pv=new THREE.Group();pv.position.set(0,TOPY+.006,0);book.add(pv);
 const g=new THREE.PlaneGeometry(PW,PD);g.rotateX(-Math.PI/2);const front=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:0xf6f1e4,roughness:.9}));front.position.x=fromSide*PW/2;front.castShadow=true;
 const backC=pageCanvas();const ne=LIST[(idx+dir+LIST.length)%LIST.length];const tmpIdx=idx;
 const toTextSide=-fromSide===textSide();idx=(idx+dir+LIST.length)%LIST.length;(toTextSide?drawText:drawModelPage)(backC,ne,idx);idx=tmpIdx;
 const bt=new THREE.CanvasTexture(backC);bt.colorSpace=THREE.SRGBColorSpace;const backM=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:bt,roughness:.9}));backM.position.x=fromSide*PW/2;backM.rotation.z=Math.PI;backM.position.y=-.001;
 pv.add(front,backM);const target=fromSide<0?-Math.PI:Math.PI;
 tween(820,el=>{const p=ease(K.clamp(el/820,0,1));pv.rotation.z=target*p;pv.position.y=TOPY+.006+Math.sin(p*Math.PI)*.08},()=>{book.remove(pv);g.dispose();bt.dispose();done()})}

/* ---------- camera rig ---------- */
const rig={tx:0,ty:.05,tz:.06,r:3.1,th:0,ph:.86,ttx:0,tr:3.1,tth:0,tph:.86,mode:'book'};
function bookR(){const W=window.innerWidth,H=window.innerHeight;return fitR(panelW?Math.max(.4,(W-panelW-30)/H):0)*(panelH?1+panelH/H*.6:1)}
function fitR(aw){const a=aw||camera.aspect;const need=2.45/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*a);return Math.max(2.9,need)}
function setMode(m){rig.mode=m;const s=textSide();if(m==='book'){rig.ttx=0;rig.tr=bookR();rig.tph=.86}else{rig.ttx=(m==='text'?s:-s)*PW/2;const tn=2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2));rig.tr=Math.max(1.5,Math.max(1.15/(tn*camera.aspect),(m==='text'?1.5:1.2)/tn));rig.tph=m==='text'?.3:.9}rig.tth=0;$$('.vbtn').forEach(b=>b.classList.toggle('on',b.dataset.v===m))}
function updCam(dt){const k=Math.min(1,dt*5);rig.tx+=(rig.ttx-rig.tx)*k;rig.r+=(rig.tr-rig.r)*k;rig.th+=(rig.tth-rig.th)*k;rig.ph+=(rig.tph-rig.ph)*k;const sp=Math.sin(rig.ph);camera.position.set(rig.tx+rig.r*sp*Math.sin(rig.th),rig.ty+rig.r*Math.cos(rig.ph),rig.tz+rig.r*sp*Math.cos(rig.th));camera.lookAt(rig.tx,rig.ty,rig.tz)}
/* pointer: drag rotate, pinch zoom, tap pick */
{const pts=new Map();let down=null,pinch0=0,r0=0;
 cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);pts.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pts.size===1){down={x:e.clientX,y:e.clientY,th:rig.tth,ph:rig.tph,moved:false};startDrag(e)}else{endDrag(null,true)}if(pts.size===2){const[a,b]=[...pts.values()];pinch0=Math.hypot(a.x-b.x,a.y-b.y);r0=rig.tr}});
 cv.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;pts.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pts.size===2){const[a,b]=[...pts.values()];const d=Math.hypot(a.x-b.x,a.y-b.y);rig.tr=K.clamp(r0*pinch0/Math.max(20,d),1.1,6);if(down)down.moved=true;return}if(!down)return;const dx=e.clientX-down.x,dy=e.clientY-down.y;if(Math.abs(dx)+Math.abs(dy)>6)down.moved=true;if(drag){if(down.moved)moveDrag(e);return}rig.tth=K.clamp(down.th-dx*.006,-1.1,1.1);rig.tph=K.clamp(down.ph-dy*.005,.18,1.3)});
 const up=e=>{const wasTap=down&&!down.moved&&pts.size===1;pts.delete(e.pointerId);if(drag)endDrag(e,wasTap);if(wasTap)pick(e);if(!pts.size)down=null};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',e=>{pts.delete(e.pointerId);down=null});
 cv.addEventListener('wheel',e=>{e.preventDefault();rig.tr=K.clamp(rig.tr*(1+e.deltaY*.0012),1.1,6)},{passive:false});
 cv.addEventListener('dblclick',()=>setMode(rig.mode))}
const ray=new THREE.Raycaster(),ndc=new THREE.Vector2();
let drag=null;const dragPlane=new THREE.Plane(new THREE.Vector3(0,1,0),0),tmpV=new THREE.Vector3();
function rayAt(e){const r=cv.getBoundingClientRect();ndc.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(ndc,camera)}
function planePt(e){rayAt(e);dragPlane.constant=-(TOPY+.004);if(!ray.ray.intersectPlane(dragPlane,tmpV))return null;return modelAnchor.worldToLocal(tmpV.clone())}
function partOf(o){while(o&&!o.userData.pop)o=o.parent;return o}
function startDrag(e){if(!cur||busy)return;rayAt(e);const hit=ray.intersectObjects(cur.root.children,true).find(h=>h.object.isMesh&&h.object.visible);if(!hit)return;const k=partOf(hit.object);if(!k||!k.userData.part||(k.userData.part.b&&!PS.build))return;const p=planePt(e);if(!p)return;drag={k,ox:k.position.x-p.x,oz:k.position.z-p.z}}
function moveDrag(e){const p=planePt(e);if(!p||!drag)return;drag.k.position.x=p.x+drag.ox;drag.k.position.z=p.z+drag.oz;const off=Math.abs(drag.k.position.x)>.47||Math.abs(drag.k.position.z)>.6;drag.k.traverse(o=>{if(o.isMesh&&o.material&&o.material.transparent===false)o.material.opacity=1});cv.style.cursor=off?'not-allowed':'grabbing';hint(off?(rtl()?'🗑️ أفلتها هنا لتشيلها':'🗑️ Let go to remove it'):'')}
function endDrag(e,tap){if(!drag)return;const k=drag.k;drag=null;cv.style.cursor='';hint('');if(tap){k.position.y=0;return}const off=Math.abs(k.position.x)>.47||Math.abs(k.position.z)>.6;if(off){removePart(k.userData.idx)}else{tween(250,el=>{k.position.y=.035*(1-K.clamp(el/250,0,1))})}}
function removePart(i){const k=PS.kids[i];if(!k||(k.userData.part.b&&!PS.build))return;PS.removed.add(i);tween(300,el=>{const q=K.clamp(el/300,0,1);k.scale.setScalar(Math.max(.001,1-q))},()=>{k.visible=false;k.scale.set(1,1,1)});refreshModel()}
function addPart(i){const k=PS.kids[i];if(!k)return;PS.removed.delete(i);k.position.copy(k.userData.home);k.visible=true;k.scale.set(1,.001,1);tween(700,el=>{const p=back(K.clamp(el/700,0,1));k.scale.set(1,Math.max(.001,p),1)},()=>k.scale.set(1,1,1));refreshModel()}
let hintT=null;function hint(msg){const h=$('#dhint');if(!h)return;h.textContent=msg;h.classList.toggle('hide',!msg)}
/* «شاهد خطوة بخطوة» لكل المجسمات: التفاعلات لها خطواتها الخاصة، والباقي خطوات من رموز المعادلة ثم النتيجة والحركة */
const GL={step:0,run:99};
function genSteps(){const e=LIST[idx];if(!e)return[];const v=evalEq(e);const out=[];const fmt=x=>typeof x==='number'&&isFinite(x)?(+x.toPrecision(4)).toLocaleString('en-US'):'—';
 (e.ins||[]).forEach(k=>{const s=sym(k);const pi=PS.kids.findIndex(kd=>kd.userData.part&&(kd.userData.part.s||[]).includes(k));const pt=pi>=0?PS.kids[pi].userData.part:null;
  out.push({t:`«${L(s.n)}» = <b dir="ltr">${fmt(v[k])}${s.u?' '+esc(s.u):''}</b>`+(pt?(rtl()?` — في المجسم: «${L(pt.n)}»، ${L(pt.r)}`:` — in the model: “${L(pt.n)}”, ${L(pt.r)}`):''),glow:pi})});
 if(e.out&&e.x){const s=sym(e.out);out.push({t:(rtl()?'نحط القيم في المعادلة: ':'Put the values into the formula: ')+`<span dir="ltr">${esc(e.f)}</span>`,glow:-1});out.push({t:(rtl()?'النتيجة: ':'Result: ')+`«${L(s.n)}» = <b dir="ltr">${fmt(v[e.out])}${s.u?' '+esc(s.u):''}</b> ✅ `+(rtl()?'— شوف المجسم وهو يشتغل':'— watch the model run'),glow:-1,run:1})}
 else{out.unshift({t:(rtl()?'المعادلة: ':'The equation: ')+`<span dir="ltr">${esc(e.f)}</span>`,glow:-1});out.push({t:L(e.d)+(rtl()?' ✅ شوف المجسم وهو يشتغل':' ✅ Watch the model run'),glow:-1,run:1})}
 return out}
function LV(){if(!cur)return null;if(cur.setStep)return{steps:()=>cur.steps(),get:()=>cur.getStep(),set:n=>cur.setStep(n),html:false};
 const S=genSteps();GL.run=S.findIndex(x=>x.run)+1||S.length;return{steps:()=>S.map(x=>x.t),get:()=>GL.step,set:n=>{GL.step=Math.max(0,Math.min(S.length,n));const g=S[GL.step-1];if(g&&g.glow>=0)glow(g.glow)},html:true}}
function liveBtn(){const b=$('#livebtn'),box=$('#livestep');if(!b||!box)return;const A=LV();const ok=A&&(!PS.build||PS.done)&&!PS.stopped;
 if(!ok){b.classList.add('hide');box.classList.add('hide');if(A&&A.get()>0&&(PS.stopped||(PS.build&&!PS.done)))A.set(0);return}
 const n=A.get(),S=A.steps(),N=S.length;if(!N){b.classList.add('hide');box.classList.add('hide');return}
 if(n===0){box.classList.add('hide');b.classList.remove('hide');b.innerHTML=cur.setStep?(rtl()?'▶️ شاهد التفاعل خطوة بخطوة':'▶️ Watch the reaction step by step'):(rtl()?'▶️ شاهد المعادلة تشتغل خطوة بخطوة':'▶️ Watch the equation work step by step');return}
 b.classList.add('hide');box.classList.remove('hide');const txt=A.html?S[n-1]:esc(S[n-1]);
 box.innerHTML=`<div class="lsdots">${S.map((_,i)=>`<i class="${i<n?'on':''}"></i>`).join('')}</div><div class="lstxt"><b>${rtl()?'الخطوة':'Step'} ${n} / ${N}:</b> ${txt}</div><div class="lsbtns">${n<N?`<button data-ls="next" class="g">${rtl()?'الخطوة التالية ⬅':'Next step ➜'}</button>`:''}<button data-ls="again">${rtl()?'↺ من البداية':'↺ Start again'}</button></div>`}
document.addEventListener('click',ev=>{const A=LV();if(!A)return;if(ev.target.closest('#livebtn')){A.set(1);liveBtn();return}const x=ev.target.closest('[data-ls]');if(!x)return;if(x.dataset.ls==='next')A.set(A.get()+1);else{A.set(0);setTimeout(()=>{A.set(1);liveBtn()},300)}liveBtn()});
function tray(){const box=$('#tray');if(!box||!PS.kids.length){box&&box.classList.add('hide');return}box.classList.remove('hide');const e=LIST[idx];
 const rem=[...PS.removed].map(i=>PS.kids[i]).filter(Boolean).sort((a,b)=>(need(b.userData.part)?1:0)-(need(a.userData.part)?1:0)||a.userData.idx-b.userData.idx);
 const ess=PS.kids.filter(k=>need(k.userData.part)),missE=rem.filter(k=>need(k.userData.part));let msg;
 if(PS.build&&missE.length){const n=ess.length-missE.length+1,pt=missE[0].userData.part;msg=`<b>${t('step')} ${n} / ${ess.length}:</b> ${t('add2')} «${L(pt.n)}» — ${L(pt.r)}`}
 else if(PS.stopped){const pt=evalEq(e).__stop;msg=`<b>${t('stopped')} «${L(pt.n)}»</b> — ${L(pt.r)}. ${t('putBack')}`}
 else if(PS.build&&(ess.length||!rem.length))msg=t('done');else msg=t('dragHint');
 $('#tmode').innerHTML=`<button class="${PS.build?'':'on'}" data-mode="auto">${t('auto')}</button><button class="${PS.build?'on':''}" data-mode="build">${t('build')}</button>`;
 $('#tmsg').innerHTML=msg;$('#tmsg').className=PS.stopped&&!PS.build?'stop':(PS.build&&!missE.length&&ess.length?'ok':'');
 $('#tchips').innerHTML=rem.map((k,j)=>`<button class="chip ${need(k.userData.part)?'ess':''} ${(PS.build&&j===0&&need(k.userData.part))||(!PS.build&&PS.stopped&&need(k.userData.part)&&j===0)?'next':''}" data-addpart="${k.userData.idx}">＋ ${esc(L(k.userData.part.n))}</button>`).join('')}
document.addEventListener('click',ev=>{const l2=ev.target.closest('[data-l2d]');if(l2){const[b,i]=l2.dataset.l2d.split(':');try{localStorage.setItem('eb-pos-'+b,String(3+2*(+i)))}catch(e){}return}const a=ev.target.closest('[data-addpart]');if(a){addPart(+a.dataset.addpart);return}const m=ev.target.closest('[data-mode]');if(m){PS.build=m.dataset.mode==='build';try{localStorage.setItem('eq-build',PS.build?'1':'0')}catch(e){}if(cur){PS.removed=new Set();PS.kids.forEach((k,i)=>{k.visible=true;k.position.copy(k.userData.home);k.scale.set(1,1,1);if(PS.build){PS.removed.add(i);k.visible=false}});PS.done=false}refreshModel()}});
function pick(e){if(!cur||busy)return;const r=cv.getBoundingClientRect();ndc.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(ndc,camera);const hit=ray.intersectObjects(cur.root.children,true).find(h=>h.object.isMesh);
 if(hit){let handled=cur.tap&&cur.tap(hit.object);let p=hit.object;while(p&&!p.userData.pop)p=p.parent;if(p&&p.userData.part&&!handled){const pt=p.userData.part;hint(`${L(pt.n)} — ${L(pt.r)}${pt.b?'':(rtl()?' · اسحبها برّا الصفحة لتشيلها':' · drag it off the page to remove it')}`);clearTimeout(hintT);hintT=setTimeout(()=>hint(''),3200)}if(p){const s0=p.scale.y;tween(500,el=>{const q=K.clamp(el/500,0,1);p.position.y=(p.userData.y0??(p.userData.y0=p.position.y))+Math.sin(q*Math.PI)*.05})}return}
 const hp=ray.intersectObject(textMesh())[0];if(hp&&rig.mode==='book')setMode('text');else if(rig.mode!=='book'&&!hp)setMode('book')}

/* ---------- resize & loop ---------- */
let panelW=0,panelH=0;
function resize(){const W=window.innerWidth,H=window.innerHeight;R3.setSize(W,H,false);camera.aspect=W/H;
 const p=$('#panel');const open=!p.classList.contains('closed');const wide=W>=900;panelW=open&&wide?p.offsetWidth+24:0;panelH=open&&!wide?Math.min(p.offsetHeight,H*.5):0;
 if(panelW||panelH){const offX=(rtl()?panelW/2:-panelW/2),offY=panelH/2-30;camera.setViewOffset(W,H,offX,offY,W,H)}else camera.setViewOffset(W,H,0,-20,W,H);
 const tr=$('#tray');if(tr){const avail=W-panelW;tr.style.left=(rtl()?avail/2:panelW+avail/2)+'px';tr.style.width=Math.min(720,avail-24)+'px'}
 camera.updateProjectionMatrix();if(rig.mode==='book')rig.tr=bookR();else setMode(rig.mode)}
window.addEventListener('resize',resize);
let last=performance.now();function loop(now){const dt=Math.min(.05,(now-last)/1000);last=now;
 for(let i=tweens.length-1;i>=0;i--){const tw=tweens[i];const el=now-tw.t0;tw.fn(el);if(el>=tw.dur){tweens.splice(i,1);tw.done&&tw.done()}}
 if(cur&&cur.tick&&!PS.stopped)try{if(cur.setStep||GL.step>=GL.run)cur.tick(now/1000,dt);else cur.tick(0,0)}catch(err){}
 if(drag)drag.k.position.y+=((.035)-drag.k.position.y)*Math.min(1,dt*10);
 updCam(dt);R3.render(scene,camera);requestAnimationFrame(loop)}

/* ---------- UI ---------- */
function ui(){const e=LIST[idx];if(!e)return;const cat=EQ.cats[e.cat];
 $('#num').textContent=`${t('eqOf')} ${idx+1} ${t('of')} ${LIST.length.toLocaleString('en-US')}`;$('#prog').style.width=((idx+1)/LIST.length*100)+'%';
 $('#pk').textContent=L(cat.n);$('#pn').textContent=strip(L(e.n));$('#pf').innerHTML=htmlF(e.f);
 $('#pby').innerHTML=e.mine?`<span class="pend">${t('pending')}</span>`:'';if(e.by&&e.show!==false)$('#pby').innerHTML+=`<div><b>${t('by')}</b> ${esc(e.by)}</div><small>${t('design')}</small>`;
 const box=$('#calc');const f=compile(e);
 if(!f){box.innerHTML=`<p class="mu">${t('noCalc')}</p>`}
 else{const v=values(e);box.innerHTML=e.ins.map(k=>{const s=sym(k);return `<label><span><i>${htmlF(s.d)}</i> ${esc(L(s.n))}${s.u?` <em>(${esc(s.u)})</em>`:''}</span><input type="number" inputmode="decimal" step="any" data-k="${k}" value="${v[k]}"></label>`}).join('')+`<div class="res"><span>${t('result')}: <i>${htmlF(sym(e.out).d)}</i></span><b id="resv"></b></div>`;
  $$('#calc input').forEach(inp=>inp.addEventListener('input',()=>{const val=parseFloat(inp.value);if(!isNaN(val)){values(e)[inp.dataset.k]=val;updRes();refreshModel()}}));updRes()}
 updRes();
 try{history.replaceState(null,'','#'+e.id)}catch(er){}
 try{localStorage.setItem(POSK,e.id)}catch(er){}}
function updRes(){const e=LIST[idx];if(!e)return;const v=evalEq(e);const r=v[e.out];const el=$('#resv');if(el){if(v.__stop)el.textContent=t('stopRes');else if(!isFinite(r)&&v.__zero.size){const k=[...PS.removed].map(i=>PS.kids[i].userData.part).find(p=>(p.s||[]).some(s=>v.__zero.has(s)));el.textContent=t('noPart')+' '+(k?L(k.n):'')}else el.textContent=fmt(r)+(sym(e.out).u?' '+sym(e.out).u:'')}const x=$('#pexp');if(x)x.innerHTML=explainHTML(e)}
/* auto explanation: built from the equation itself */
function relations(e){const f=compile(e);if(!f)return[];const v=values(e);const base=e.ins.map(k=>+v[k]);let f0;try{f0=f(...base)}catch(er){return[]}if(!isFinite(f0)||f0===0)return[];const out=[];const on=L(sym(e.out).n);
 e.ins.forEach((k,i)=>{const s=sym(k);if(s.u==='°'||s.u==='rad'){out.push(rtl()?`«${L(s.n)}» تؤثر عبر دالة مثلثية (جيب أو جيب تمام)، فالتغيير مو بنسبة ثابتة.`:`“${L(s.n)}” acts through a trig function, so the change isn’t a fixed ratio.`);return}
  const b2=base.slice();if(b2[i]===0)return;b2[i]*=2;let f1;try{f1=f(...b2)}catch(er){return}if(!isFinite(f1))return;const r=f1/f0;const near=(a)=>Math.abs(r-a)<1e-3*Math.max(1,Math.abs(a));const nm=L(s.n);let txt=null;
  if(near(1))return;else if(near(2))txt=rtl()?`إذا ضاعفت «${nm}» يتضاعف «${on}» — علاقة طردية.`:`Double “${nm}” and “${on}” doubles — directly proportional.`;
  else if(near(.5))txt=rtl()?`إذا ضاعفت «${nm}» يقل «${on}» للنصف — علاقة عكسية.`:`Double “${nm}” and “${on}” halves — inversely proportional.`;
  else if(near(4))txt=rtl()?`إذا ضاعفت «${nm}» يصير «${on}» 4 أضعاف — لأنه مربّع.`:`Double “${nm}” and “${on}” becomes 4× — it is squared.`;
  else if(near(.25))txt=rtl()?`إذا ضاعفت «${nm}» يقل «${on}» للربع — عكسي مع المربع.`:`Double “${nm}” and “${on}” drops to a quarter — inverse square.`;
  else if(near(8))txt=rtl()?`إذا ضاعفت «${nm}» يصير «${on}» 8 أضعاف — لأنه مكعّب.`:`Double “${nm}” and “${on}” becomes 8× — it is cubed.`;
  else if(near(Math.SQRT2))txt=rtl()?`إذا ضاعفت «${nm}» يزيد «${on}» حوالي 1.41 مرة — تحت جذر.`:`Double “${nm}” and “${on}” grows about 1.41× — it is under a square root.`;
  else if(near(Math.SQRT1_2))txt=rtl()?`إذا ضاعفت «${nm}» يقل «${on}» إلى حوالي 0.71 — عكسي مع الجذر.`:`Double “${nm}” and “${on}” falls to about 0.71 — inverse square root.`;
  else if(near(-1))txt=rtl()?`إذا ضاعفت «${nm}» تنعكس إشارة «${on}».`:`Doubling “${nm}” flips the sign of “${on}”.`;
  else txt=rtl()?`إذا ضاعفت «${nm}» ${r>1?'يزيد':'يقل'} «${on}» (×${(+r.toPrecision(3))}).`:`Double “${nm}” and “${on}” ${r>1?'rises':'falls'} (×${(+r.toPrecision(3))}).`;
  out.push(txt)});return out}
function explainHTML(e){const f=compile(e);const ins=e.ins;const v=values(e);let h=`<div class="xh">📌 ${t('what')}</div><p>${esc(strip(L(e.d)))}</p>`;
 if(e.lesson){if(e.pts)h+=`<div class="xh">🔑 ${rtl()?'أهم النقاط':'Key points'}</div><ul>${e.pts.map(p=>`<li>${esc(L(p))}</li>`).join('')}</ul>`;
  if(e.q)h+=`<div class="xh">❓ ${rtl()?'سؤال':'Question'}</div><p>${esc(L(e.q))}</p><details class="ans"><summary>${rtl()?'اضغط لترى الإجابة':'Tap to see the answer'}</summary><p>${esc(L(e.a))}</p></details>`;
  h+=`<p style="margin-top:10px"><a class="exp2d" href="/interactive-books.html${rtl()?'':'?lang=en'}#${e.lesson.book}" data-l2d="${e.lesson.book}:${e.lesson.i}">🧪 ${rtl()?'افتح تجربة الدرس بالمؤشرات':'Open the lesson’s slider experiment'}</a></p>`;
  const ess=PS.kids.map(k=>k.userData.part).filter(p=>p&&p.e);h+=`<div class="xh">🧪 ${t('try')}</div><ul>${ess.slice(0,2).map(p=>`<li>${rtl()?`شيل «${esc(L(p.n))}» من الصفحة وشوف وش يصير.`:`Remove the “${esc(L(p.n))}” and see what happens.`}</li>`).join('')}<li>${rtl()?'جرّب «ابنِها خطوة بخطوة».':'Try “Build it step by step”.'}</li></ul>`;return h}
 if(f&&e.out){h+=`<p>${rtl()?`المعادلة تحسب <b>${esc(L(sym(e.out).n))}</b> (<i>${htmlF(sym(e.out).d)}</i>) من: ${ins.map(k=>`<b>${esc(L(sym(k).n))}</b>`).join('، ')}.`:`It finds <b>${esc(L(sym(e.out).n))}</b> (<i>${htmlF(sym(e.out).d)}</i>) from ${ins.map(k=>`<b>${esc(L(sym(k).n))}</b>`).join(', ')}.`}</p>`;
  const rel=relations(e);if(rel.length)h+=`<div class="xh">📈 ${t('how')}</div><ul>${rel.map(x=>`<li>${x}</li>`).join('')}</ul>`;
  const r=evalEq(e,true)[e.out];h+=`<div class="xh">✍️ ${t('solve')}</div><ol><li>${rtl()?'اكتب المعادلة:':'Write the equation:'} <span class="fx">${htmlF(e.f)}</span></li><li>${rtl()?'عوّض بالقيم:':'Substitute the values:'} <span class="fx">${ins.map(k=>`${htmlF(sym(k).d)} = ${fmt(+v[k])}${sym(k).u?' '+esc(sym(k).u):''}`).join('  ·  ')}</span></li><li>${rtl()?'احسب:':'Calculate:'} <span class="fx"><b>${htmlF(sym(e.out).d)} = ${fmt(r)}${sym(e.out).u?' '+esc(sym(e.out).u):''}</b></span></li></ol>`}
 else h+=`<p class="mu">${rtl()?'هذي معادلة وصفية (تفاعل أو قانون عام) — اقرأ الرموز وشوف المجسم.':'This is a descriptive equation (a reaction or general law) — read the symbols and explore the model.'}</p>`;
 const ess=PS.kids.map(k=>k.userData.part).filter(p=>p&&p.e);h+=`<div class="xh">🧪 ${t('try')}</div><ul>${ess.slice(0,2).map(p=>`<li>${rtl()?`شيل «${esc(L(p.n))}» من الصفحة وشوف وش يصير للمعادلة.`:`Remove the “${esc(L(p.n))}” from the page and see what happens.`}</li>`).join('')}${f?`<li>${rtl()?'غيّر الأرقام في الحاسبة وراقب المجسم.':'Change the numbers and watch the model.'}</li>`:''}<li>${rtl()?'جرّب وضع «ابنِها خطوة بخطوة» وركّب المعادلة قطعة قطعة.':'Try “Build it step by step” and assemble the equation piece by piece.'}</li></ul>`;return h}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function texts(){document.documentElement.lang=lang;document.documentElement.dir=rtl()?'rtl':'ltr';$$('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));$('#q').placeholder=t('search');$('#lang').textContent=rtl()?'EN':'عربي';if(BK){$$('[data-t="title"]').forEach(el=>el.textContent=L(BK.n));const ne=LIST.length-LESSONS.length;$('#cnt').textContent=rtl()?`${LESSONS.length} دروس · ${ne.toLocaleString('en-US')} معادلة`:`${LESSONS.length} lessons · ${ne.toLocaleString('en-US')} equations`;document.title=L(BK.n)+' | '+(rtl()?'أكاديمية إيلان دول':'Eilan Doll Academy')}else $('#cnt').textContent=`${EQ.list.length.toLocaleString('en-US')} ${t('count')}`}
function setLang(l){lang=l;try{localStorage.setItem('eb-lang',l)}catch(e){}K=kit(lang);texts();show(idx);resize();setMode(rig.mode)}

/* search & index */
function openSheet(id){$$('.sheet').forEach(s=>s.classList.toggle('hide',s.id!==id));$('#veil').classList.toggle('hide',!id);if(id==='s-search'){$('#q').value='';doSearch();setTimeout(()=>$('#q').focus(),50)}if(id==='s-index')buildIndex()}
const norm=s=>String(s||'').toLowerCase().replace(/[ًٌٍَُِّْـ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي');
function doSearch(){const q=norm($('#q').value.trim());const out=[];if(!q){LIST.slice(0,60).forEach((e,i)=>out.push(i))}else{for(let i=0;i<LIST.length&&out.length<200;i++){const e=LIST[i];const hay=norm(e.n[0]+' '+e.n[1]+' '+e.f+' '+e.d[0]+' '+e.d[1]+' '+EQ.cats[e.cat].n.join(' '));if(hay.includes(q))out.push(i)}}
 $('#sres').innerHTML=out.length?out.map(i=>{const e=LIST[i];return `<button class="row" data-go="${i}"><b>${esc(strip(L(e.n)))}</b><span dir="ltr">${htmlF(e.f)}</span><small>${esc(L(EQ.cats[e.cat].n))}</small></button>`}).join(''):`<div class="empty">${t('none')}<br><button class="pill g" data-open="s-add">＋ ${t('add')}</button></div>`}
function buildIndex(){let h='';EQ.groups.forEach(g=>{const cats=Object.values(EQ.cats).filter(c=>c.g===g.id);const blocks=cats.map(c=>{const first=LIST.findIndex(e=>e.cat===c.id);const n=LIST.filter(e=>e.cat===c.id).length;return n?`<button class="row" data-go="${first}"><b>${esc(L(c.n))}</b><small>${n}</small></button>`:''}).join('');if(blocks)h+=`<h4>${g.ic} ${esc(L(g.n))}</h4>${blocks}`});$('#ires').innerHTML=h}
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g){openSheet(null);const i=+g.dataset.go;show(i,{flip:i>idx?1:-1});return}const o=e.target.closest('[data-open]');if(o){openSheet(o.dataset.open);return}if(e.target.closest('[data-close]')||e.target.id==='veil')openSheet(null);const v=e.target.closest('.vbtn');if(v)setMode(v.dataset.v)});
$('#q').addEventListener('input',doSearch);
$('#prev').onclick=()=>show(idx-1,{flip:-1});$('#next').onclick=()=>show(idx+1,{flip:1});$('#rnd').onclick=()=>show(Math.floor(Math.random()*LIST.length),{flip:1});
$('#lang').onclick=()=>setLang(rtl()?'en':'ar');
$('#ptog').onclick=()=>{$('#panel').classList.toggle('closed');setTimeout(resize,260)};
document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea,select'))return;if(e.key==='ArrowLeft')show(idx+(rtl()?1:-1),{flip:rtl()?1:-1});if(e.key==='ArrowRight')show(idx+(rtl()?-1:1),{flip:rtl()?-1:1});if(e.key==='Escape')openSheet(null)});

/* add equation */
const SUBJ=[['phys','energy'],['chem','beaker'],['math','graph'],['stat','dice'],['life','plant'],['more','coins']];
$('#addForm').addEventListener('submit',async ev=>{ev.preventDefault();const f=new FormData(ev.target);const name=String(f.get('name')||'').trim().slice(0,120),formula=String(f.get('formula')||'').trim().slice(0,200),how=String(f.get('how')||'').trim().slice(0,1500),by=String(f.get('by')||'').trim().slice(0,60),showName=f.get('show')==='yes',subj=String(f.get('subj')||'phys'),contact=String(f.get('contact')||'').trim().slice(0,120);
 if(!name||!formula||!how){$('#addMsg').textContent=rtl()?'عبّ اسم المعادلة والصيغة وطريقة الشرح.':'Please fill in the name, formula and explanation.';return}
 const sc=(SUBJ.find(s=>s[0]===subj)||SUBJ[0])[1];const item={n:[name,name],f:formula,d:[how,how],out:'',x:'',ins:[],sc,by:showName&&by?by:'',show:showName,ts:Date.now(),subj};
 const arr=mine();arr.push(item);try{localStorage.setItem('eq-mine',JSON.stringify(arr))}catch(e){}
 $('#addBtn').disabled=true;$('#addMsg').textContent=rtl()?'جاري الإرسال…':'Sending…';let ok=false;
 try{const r=await fetch('/api/equation',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,formula,how,subject:subj,by,show:showName?'yes':'no',contact,lang})});ok=r.ok}catch(e){}
 $('#addBtn').disabled=false;ev.target.reset();$('#consent').classList.add('hide');
 $('#addMsg').textContent=ok?(rtl()?'✅ وصلت معادلتك! تشوفها الحين في آخر الكتاب، وبتظهر لكل الناس بعد المراجعة.':'✅ Received! You can see it at the end of the book now; everyone will see it after review.'):(rtl()?'✅ انحفظت معادلتك في جهازك وتشوفها في آخر الكتاب. ما قدرنا نرسلها للمراجعة الحين — جرّب مرة ثانية لاحقًا.':'✅ Saved on your device (end of the book). We could not send it for review right now — please try again later.');
 buildList();setTimeout(()=>{openSheet(null);show(LIST.length-1,{flip:1})},1600)});
$('#showYes').addEventListener('change',e=>$('#consent').classList.toggle('hide',!e.target.checked));

/* ---------- boot ---------- */
async function boot(){try{await Promise.race([Promise.all([document.fonts.load('700 30px Tajawal'),document.fonts.load('30px Amiri')]),new Promise(r=>setTimeout(r,1500))])}catch(e){}
 await loadLessons();buildList();texts();resize();const h=decodeURIComponent(location.hash.slice(1));let st=LIST.findIndex(e=>e.id===h);if(st<0){let sv='';try{sv=localStorage.getItem(POSK)||''}catch(e){}st=Math.max(0,LIST.findIndex(e=>e.id===sv))}
 const narrow=window.innerWidth<700;if(narrow)$('#panel').classList.add('closed');
 show(st);resize();setMode(narrow?'model':'book');rig.r=rig.tr+1.2;rig.ph=.5;$('#loading').classList.add('hide');requestAnimationFrame(loop);
 setTimeout(()=>{const h=$('#hint');h.classList.add('hide')},5000)}
window.addEventListener('hashchange',()=>{const h=decodeURIComponent(location.hash.slice(1));const i=LIST.findIndex(e=>e.id===h);if(i>=0&&i!==idx)show(i,{flip:i>idx?1:-1})});


/* ---------- free pages + book paywall ---------- */
/* أول 3 صفحات مجانية في كل كتاب (وفي الموسوعة: أول 3 من كل قسم). معادلات الزوار مجانية دايمًا. */
const FREE_N=3;
const PRICE={book:15,enc:29,all:49};
/* المالكة تشوف كل الصفحات: نفس جلسة دخولها في لوحة الموقع (eilan_owner_session) */
let OWNER=false;
(async()=>{try{const st=JSON.parse(localStorage.getItem('eilan_doll_world_v2')||'null');const h=st&&st.owner&&st.owner.hash;if(!h||!crypto.subtle)return;
 let tok=null;try{tok=sessionStorage.getItem('eilan_owner_session')}catch(e){}if(!tok)try{tok=localStorage.getItem('eilan_owner_session')}catch(e){}if(!tok)return;
 const d=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('tok|'+h));const hex=[...new Uint8Array(d)].map(b=>b.toString(16).padStart(2,'0')).join('');
 if(hex===tok){OWNER=true;document.body.classList.add('owner');const b=document.createElement('div');b.className='ownerbadge';b.textContent=rtl()?'👑 وضع المالكة: كل الصفحات مفتوحة':'👑 Owner mode: all pages unlocked';document.body.appendChild(b);if(document.body.classList.contains('locked'))show(idx)}}catch(e){}})();
function isFree(e,i){if(OWNER||e.mine||e.cat==='com')return true;return BK?i<FREE_N:(e.__r||1)<=FREE_N}
function nextFree(from){for(let k=1;k<=LIST.length;k++){const j=(from+k)%LIST.length;if(isFree(LIST[j],j)&&LIST[j].cat!==LIST[from].cat)return j}return 0}
function showLock(e){const ar=rtl();const nm=BK?L(BK.n):(ar?'موسوعة المعادلات':'Equation encyclopedia');const one=BK?PRICE.book:PRICE.enc;
 const T=(a,b)=>ar?a:b;
 $('#lkbox').innerHTML=`<div class="lkic">📘✨</div>
 <h2 id="lkt">${T('عجبك الكتاب؟ كمّل الرحلة','Enjoying the book? Keep going')}</h2>
 <p>${BK?T('جرّبت أول 3 صفحات مجانًا.','You tried the first 3 pages for free.'):T('جرّبت أول 3 معادلات من هذا القسم مجانًا.','You tried the first 3 equations of this section for free.')}
 ${T('افتح الكتاب كامل، وخلّ كل معادلة تطلع قدامك ثلاثية الأبعاد، تبنيها قطعة قطعة لين تفهمها.','Unlock the full book and watch every equation pop up in 3D, building it piece by piece until it clicks.')}</p>
 <div class="lkp">
  <div class="lkc"><b>${esc(nm)}</b><div class="pr">${one} <small>${T('ريال','SAR')}</small></div><div class="mu" style="font-size:12px">${T('دفعة وحدة','One-time payment')}</div>
   <ul><li>✓ ${T('كل صفحات هذا الكتاب','Every page of this book')}</li><li>✓ ${T('المجسمات ثلاثية الأبعاد والحاسبة','3D models and calculator')}</li></ul>
   <button class="buy" disabled>${T('قريبًا','Coming soon')}</button></div>
  <div class="lkc best"><span class="tag">⭐ ${T('الأوفر','Best value')}</span><b>${T('باقة المكتبة الكاملة','Full library bundle')}</b><div class="pr">${PRICE.all} <small>${T('ريال','SAR')}</small></div><div class="mu" style="font-size:12px">${T('دفعة وحدة','One-time payment')}</div>
   <ul><li>✓ ${T('الكتب الخمسة: فيزياء، كيمياء، أحياء، رياضيات، إحصاء','All 5 books: physics, chemistry, biology, math, statistics')}</li><li>✓ ${T('موسوعة المعادلات كاملة','The full equation encyclopedia')}</li><li>✓ ${T('كل كتاب جديد ينضاف للمكتبة','Every new book added to the library')}</li></ul>
   <button class="buy" disabled>${T('قريبًا','Coming soon')}</button></div>
 </div>
 <p class="lknote">🛒 ${T('الشراء يفتح قريبًا في متجر إيلان. وإلى ذلك الوقت تقدر تتصفح الصفحات المجانية.','Purchasing opens soon in the Eilan store. Until then, enjoy the free pages.')}</p>
 <div class="lkact">${BK?`<button class="ib" data-lk="first">↩ ${T('ارجع لأول صفحة','Back to page 1')}</button>`:`<button class="ib g" data-lk="next">➜ ${T('جرّب القسم اللي بعده مجانًا','Try the next section free')}</button><button class="ib" data-lk="first">↩ ${T('ارجع لأول القسم','Back to section start')}</button>`}
  <a class="ib" href="/interactive-books.html${ar?'':'?lang=en'}">📚 ${T('المكتبة','Library')}</a></div>
 <div class="lksig">${T('صُمم بواسطة إيلان دول','Designed by Eilan Doll')}</div>`;
 $('#lock').classList.remove('hide');document.body.classList.add('locked');try{clearModel()}catch(er){}}
function hideLock(){$('#lock').classList.add('hide');document.body.classList.remove('locked')}
document.addEventListener('click',ev=>{const b=ev.target.closest('[data-lk]');if(!b)return;const e=LIST[idx];
 if(b.dataset.lk==='next')show(nextFree(idx));
 else if(b.dataset.lk==='first'){show(BK?0:Math.max(0,LIST.findIndex(x=>x.cat===e.cat)))}});
/* ---------- Eilan voice tour: narrated, build-along explanation ---------- */
const TOUR={on:false,steps:[],i:0,paused:false,timer:null,voice:null,gen:0,audio:null,cloud:true,cache:new Map()};
let VMODE='m';try{VMODE=localStorage.getItem('eq-voice')||'m'}catch(e){}
const cloudVoice=()=>VMODE==='d'?null:(rtl()?(VMODE==='f'?'ar-SA-ZariyahNeural':'ar-SA-HamedNeural'):(VMODE==='f'?'en-US-JennyNeural':'en-US-GuyNeural'));
function getAudio(text){const v=cloudVoice();const key=v+'|'+text;if(TOUR.cache.has(key))return TOUR.cache.get(key);
 const p=fetch('/api/tts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text,voice:v})}).then(r=>{if(!r.ok)throw new Error('tts '+r.status);return r.blob()}).then(b=>URL.createObjectURL(b));
 p.catch(()=>TOUR.cache.delete(key));TOUR.cache.set(key,p);return p}
const synth=window.speechSynthesis||null;
function pickVoice(){if(!synth)return null;const want=rtl()?'ar':'en';const vs=synth.getVoices().filter(v=>v.lang&&v.lang.toLowerCase().replace('_','-').startsWith(want));if(!vs.length)return null;
 const score=v=>{const n=(v.name+' '+v.voiceURI).toLowerCase();let s=0;if(/premium/.test(n))s+=40;if(/enhanced|natural|neural|siri/.test(n))s+=30;if(/compact|eloquence/.test(n))s-=30;if(rtl()&&/sa/i.test(v.lang))s+=8;if(!rtl()&&/en-us|en-gb/i.test(v.lang))s+=5;if(v.localService)s+=2;return s};
 return vs.sort((a,b)=>score(b)-score(a))[0]}
if(synth&&synth.onvoiceschanged!==undefined)synth.onvoiceschanged=()=>{TOUR.voice=pickVoice()};
const speakNum=v=>{const s=fmt(v);return s.replace('×10^',rtl()?' ضرب عشرة أُس ':' times ten to the ').replace(/,/g,'')};
const nameOf=k=>L(sym(k).n);
const UNITS={'V':['فولت','volts'],'A':['أمبير','amps'],'Ω':['أوم','ohms'],'W':['واط','watts'],'J':['جول','joules'],'N':['نيوتن','newtons'],'kg':['كيلوغرام','kilograms'],'m':['متر','metres'],'s':['ثانية','seconds'],'m/s':['متر في الثانية','metres per second'],'m/s²':['متر لكل ثانية تربيع','metres per second squared'],'Hz':['هيرتز','hertz'],'Pa':['باسكال','pascals'],'K':['كلفن','kelvin'],'°C':['درجة مئوية','degrees Celsius'],'mol':['مول','moles'],'g':['غرام','grams'],'L':['لتر','litres'],'cm':['سنتيمتر','centimetres'],'cm²':['سنتيمتر مربع','square centimetres'],'cm³':['سنتيمتر مكعب','cubic centimetres'],'°':['درجة','degrees'],'SAR':['ريال','riyals'],'%':['بالمئة','percent']};
const unitWord=u=>u?(UNITS[u]?L(UNITS[u]):u):'';
function speechText(t){let x=String(t).replace(/[🎉✨…]/g,'').replace(/[«»()“”]/g,' ').replace(/—/g,'، ');
 if(rtl()){x=x.replace(/×/g,' ضرب ').replace(/÷/g,' تقسيم ').replace(/=/g,' يساوي ').replace(/(^|\s)اللي(?=\s)/g,'$1الذي').replace(/(^|\s)وش(?=\s)/g,'$1ماذا').replace(/(^|\s)كذا(?=[\s،.])/g,'$1هكذا').replace(/(^|\s)شي(?=[\s،.])/g,'$1شيء').replace(/(^|\s)مو(?=\s)/g,'$1ليس')}
 if(rtl())x=x.replace(/(^|[\s،:])([A-Za-zΩ°%²³\/]+)(?=[\s،.؟:]|$)/g,(m,a2,tk)=>UNITS[tk]?a2+L(UNITS[tk]):(tk.length<=2?a2:m));
 else x=x.replace(/×/g,' times ').replace(/÷/g,' divided by ').replace(/=/g,' equals ');x=x.replace(/\s+/g,' ');if(rtl())x=x.replace(/(^|[:،]\s?)يساوي\s/g,'$1');return x.trim()}
function buildTour(e){const ar=rtl(),S=[],nm=strip(L(e.n));const f=compile(e);
 const hello=ar?[`مرحبًا بكم! أنا إيلان، هيّا نكتشف معًا سرّ «${nm}».`,`أهلًا وسهلًا! اليوم نفهم «${nm}»، ونبنيها بأيدينا خطوةً خطوة.`,`مرحبًا! لنرَ معًا كيف تعمل «${nm}» من الداخل.`]:[`Hi! I’m Eilan — let’s discover the secret of “${nm}” together.`,`Hello! Ready? Today we understand “${nm}” and build it ourselves.`,`Welcome! Let’s see how “${nm}” works from the inside.`];
 S.push({cam:'book',say:hello[idx%3]});
 S.push({cam:'text',say:strip(L(e.d))});
 if(f&&e.out)S.push({cam:'text',say:ar?`تحسب هذه المعادلة ${nameOf(e.out)}، باستخدام ${e.ins.map(nameOf).join(' و')}.`:`The equation finds the ${nameOf(e.out)}, using ${e.ins.map(nameOf).join(' and ')}.`});
 if(e.pts)e.pts.slice(0,2).forEach(p=>S.push({cam:'text',say:L(p)}));
 // build the model piece by piece
 const kids=PS.kids;const needI=kids.map((k,i)=>i).filter(i=>need(kids[i].userData.part)),restI=kids.map((k,i)=>i).filter(i=>!need(kids[i].userData.part));
 if(kids.length){S.push({cam:'model',act:()=>{clearModel()},say:ar?'والآن، لنبنِ المجسم معًا قطعةً قطعة.':'Now let’s build the model piece by piece. Watch closely!'});
  needI.forEach((i,n)=>{const pt=kids[i].userData.part;S.push({cam:'model',act:()=>{addPart(i);glow(i)},say:(ar?(n===0?'أولًا نضع ':'بعد ذلك نضع ')+`«${L(pt.n)}»، ${L(pt.r)}.`:(n===0?'First we place ':'Next comes ')+`the ${L(pt.n)}: ${L(pt.r)}.`)})});
  if(restI.length)S.push({cam:'model',act:()=>restI.forEach(i=>{if(PS.removed.has(i))addPart(i)}),say:ar?'ثم نُكمل بقية القطع الصغيرة.':'And we add the remaining small pieces.'});
  S.push({cam:'model',say:ar?'انظروا! اكتمل المجسم، وأصبحت المعادلة تعمل أمامنا.':'Look! It’s complete, and the equation is running right in front of you.'})}
 // show how the result changes
 if(f&&e.out){const rel=relations(e).slice(0,2);const v=values(e);rel.forEach((r,j)=>{const k=e.ins.filter(k=>sym(k).u!=='°'&&sym(k).u!=='rad')[j];if(!k)return;const old=+v[k];S.push({cam:'model',act:()=>{values(e)[k]=old*2;ui();refreshModel()},after:()=>{values(e)[k]=old;ui();refreshModel()},say:r.replace(/[«»“”]/g,'')})});
  const r=evalEq(e,true)[e.out];S.push({cam:'text',say:ar?`مثال: إذا كانت قيمة ${e.ins.map(k=>`${nameOf(k)} ${speakNum(+v[k])}`).join('، وقيمة ')}، فإن ${nameOf(e.out)} يساوي ${speakNum(r)} ${unitWord(sym(e.out).u)}.`:`Example: with ${e.ins.map(k=>`${nameOf(k)} ${speakNum(+v[k])}`).join(', ')}, the ${nameOf(e.out)} is ${speakNum(r)} ${sym(e.out).u||''}.`})}
 // challenge
 if(e.q){S.push({cam:'text',say:(ar?'والآن سؤال سريع: ':'Quick question: ')+L(e.q)});S.push({cam:'text',wait:4500,say:ar?'لحظة تفكير…':'Think for a moment…'});S.push({cam:'text',say:(ar?'الإجابة: ':'The answer: ')+L(e.a)})}
 else{const ess=kids.map(k=>k.userData.part).find(p=>p&&p.e);if(ess)S.push({cam:'model',say:ar?`التحدي التالي: اسحبوا «${L(ess.n)}» خارج الصفحة، ولاحظوا ماذا يحدث للمعادلة!`:`Your challenge: drag the ${L(ess.n)} off the page and see what happens to the equation!`})}
 const bye=ar?['عمل رائع! عرفنا السرّ معًا 🎉 لنجرّب الآن تغيير الأرقام.','ممتاز! لننتقل إلى الصفحة التالية ونكمل المغامرة.','رائع جدًا! أصبحت هذه المعادلة واضحة الآن.']:['Well done — now you know the secret! Try changing the numbers yourself.','Awesome! Turn the page and let’s keep exploring.','Bravo — you’re an expert on this one now!'];
 S.push({cam:'book',party:1,say:bye[idx%3]});return S}
function clearModel(){PS.kids.forEach((k,i)=>{PS.removed.add(i);k.visible=false});PS.done=false;refreshModel()}
function glow(i){const k=PS.kids[i];if(!k)return;tween(900,el=>{const q=K.clamp(el/900,0,1);const b=1+Math.sin(q*Math.PI*3)*.08*(1-q);k.scale.set(b,Math.max(.001,k.scale.y),b)},()=>k.scale.set(1,1,1))}
function tourUI(){const b=$('#tour');if(!TOUR.on){b.classList.add('hide');$('#tray').style.visibility='';return}b.classList.remove('hide');$('#tray').style.visibility='hidden';const st=TOUR.steps[TOUR.i]||{};$('#tsay').textContent=st.say||'';$('#tdots').innerHTML=TOUR.steps.map((_,j)=>`<i class="${j<TOUR.i?'d':j===TOUR.i?'c':''}"></i>`).join('');$('#tpause').textContent=TOUR.paused?'▶':'⏸';$('#tvoice').innerHTML=[['m',rtl()?'👨 حامد':'👨 Male'],['f',rtl()?'👩 زارية':'👩 Female'],['d',rtl()?'📱 صوت الجهاز':'📱 Device']].map(([k,l])=>`<button class="${VMODE===k?'on':''}" data-voice="${k}">${l}</button>`).join('');$('#tnovoice').textContent=(cloudVoice()&&!TOUR.cloud)?(rtl()?'ℹ️ الصوت الطبيعي غير متاح الآن — نستخدم صوت الجهاز':'ℹ️ The natural voice isn’t available right now — using the device voice'):rtl()?'🔇 الصوت غير متاح في هذا المتصفح — الشرح مكتوب ويمشي تلقائيًا':'🔇 Voice isn’t available in this browser — the explanation is written and plays automatically';$('#tnovoice').classList.toggle('hide',!(cloudVoice()&&!TOUR.cloud)&&!!(synth&&TOUR.voice)||(cloudVoice()&&TOUR.cloud))}
function startTour(){if(!LIST[idx]||!cur)return;stopSpeech();if(!TOUR.audio){TOUR.audio=new Audio();TOUR.audio.playsInline=true}try{TOUR.audio.src='data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';TOUR.audio.play().catch(()=>{})}catch(e){}TOUR.voice=pickVoice();TOUR.steps=buildTour(LIST[idx]);TOUR.i=0;TOUR.on=true;TOUR.paused=false;$('#panel').classList.add('closed');resize();runStep()}
function stopSpeech(){TOUR.gen++;clearTimeout(TOUR.timer);if(synth)try{synth.cancel()}catch(e){}if(TOUR.audio)try{TOUR.audio.pause();TOUR.audio.onended=null}catch(e){}}
function endTour(){const st=TOUR.steps[TOUR.i];if(st&&st.after)st.after();stopSpeech();TOUR.on=false;tourUI();setMode('book')}
function runStep(){const st=TOUR.steps[TOUR.i];if(!st){endTour();return}const g=++TOUR.gen;if(st.cam)setMode(st.cam);if(st.act)try{st.act()}catch(e){console.error(e)}if(st.party)party();tourUI();
 const next=()=>{if(g!==TOUR.gen||TOUR.paused)return;if(st.after)st.after();TOUR.i++;TOUR.timer=setTimeout(runStep,st.wait||450)};
 const fallback=()=>{TOUR.timer=setTimeout(next,Math.max(2200,st.say.length*70))};
 const sayText=speechText(st.say);
 const nxt=TOUR.steps[TOUR.i+1];if(nxt&&cloudVoice()&&TOUR.cloud)getAudio(speechText(nxt.say)).catch(()=>{});
 if(cloudVoice()&&TOUR.cloud){getAudio(sayText).then(url=>{if(g!==TOUR.gen)return;const a=TOUR.audio;a.onended=()=>{if(g===TOUR.gen)next()};a.onerror=()=>{if(g===TOUR.gen)next()};a.src=url;a.play().catch(()=>{deviceSay()})}).catch(()=>{TOUR.cloud=false;tourUI();if(g===TOUR.gen)deviceSay()});return}
 deviceSay();
 function deviceSay(){
 if(synth&&TOUR.voice){try{synth.cancel();const sp=sayText;const u=new SpeechSynthesisUtterance(sp);u.voice=TOUR.voice;u.lang=TOUR.voice.lang||(rtl()?'ar-SA':'en-US');u.rate=rtl()?.9:1;u.pitch=1;let done=false;u.onend=()=>{if(!done){done=true;next()}};u.onerror=()=>{if(!done){done=true;next()}};synth.speak(u);TOUR.timer=setTimeout(()=>{if(!done&&!synth.speaking){done=true;next()}},st.say.length*120+4000)}catch(e){fallback()}}else fallback()}}
function party(){const box=document.createElement('div');box.className='party';const cols=['#1E44C8','#0F6B44','#4A2A8F','#C9A227','#D8FFE6','#C8463C'];for(let i=0;i<70;i++){const p=document.createElement('i');p.style.left=Math.random()*100+'%';p.style.background=cols[i%6];p.style.animationDelay=Math.random()*.6+'s';p.style.transform=`rotate(${Math.random()*360}deg)`;box.appendChild(p)}document.body.appendChild(box);setTimeout(()=>box.remove(),3200)}
document.addEventListener('click',ev=>{const vb=ev.target.closest('[data-voice]');if(vb){VMODE=vb.dataset.voice;try{localStorage.setItem('eq-voice',VMODE)}catch(e){}TOUR.cloud=true;if(TOUR.on&&!TOUR.paused){stopSpeech();runStep()}else tourUI();return}const t2=ev.target.closest('[data-tour]');if(!t2)return;const a=t2.dataset.tour;
 if(a==='start')startTour();else if(a==='stop')endTour();else if(a==='next'){const st=TOUR.steps[TOUR.i];if(st&&st.after)st.after();stopSpeech();TOUR.paused=false;TOUR.i++;runStep()}
 else if(a==='pause'){if(TOUR.paused){TOUR.paused=false;runStep()}else{TOUR.paused=true;stopSpeech();tourUI()}}});

window.__eq={PS,removePart,addPart,screenOf:i=>{const k=PS.kids[i];const v=new THREE.Vector3();k.getWorldPosition(v);v.y+=.03;v.project(camera);const r=cv.getBoundingClientRect();return{x:(v.x+1)/2*r.width+r.left,y:(1-v.y)/2*r.height+r.top}}};
boot();
