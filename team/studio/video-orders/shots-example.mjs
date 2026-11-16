import { chromium } from '/home/claude/film-work/node_modules/playwright-core/index.mjs';
const routes = process.argv.slice(2);
const b = await chromium.launch({ channel: 'chrome', args:['--no-sandbox'] });
const ctx = await b.newContext({ viewport:{width:1920,height:1080}, deviceScaleFactor:1 });
await ctx.addInitScript(()=>{ try{localStorage.setItem('eilanLang','en')}catch(e){} });
const p = await ctx.newPage();
await p.goto('http://127.0.0.1:8765/', {waitUntil:'networkidle'}).catch(()=>{});
await p.waitForTimeout(6000);
const hide = async()=>{ await p.addStyleTag({content:'[class*=ad-pop],[class*=adpop],[class*=toast],[id*=adPop],[class*=promo-pop],.ad-card,.eAd,[class*=popup]{display:none!important}'}).catch(()=>{});
  await p.evaluate(()=>{document.querySelectorAll('button,span,div').forEach(e=>{if(e.textContent.trim()==='×'||e.textContent.trim()==='✕'){const r=e.getBoundingClientRect();if(r.width<50&&r.width>0)e.click()}})}).catch(()=>{}); };
await hide(); await p.screenshot({path:'/home/claude/film-work/shots/home.png'});
for (const r of routes) {
  await p.evaluate((r)=>{ try{ go(r) }catch(e){ console.log(e) } }, 'eilan://'+r);
  await p.waitForTimeout(3500); await hide();
  await p.screenshot({path:`/home/claude/film-work/shots/${r}.png`});
  await p.mouse.wheel(0,900); await p.waitForTimeout(1500);
  await p.screenshot({path:`/home/claude/film-work/shots/${r}-2.png`});
}
await b.close();
