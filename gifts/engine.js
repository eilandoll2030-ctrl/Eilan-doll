/* هدايا إيلان الحيّة — Eilan Living Gifts engine
   كل هدية = شكل يتكوّن من كلمات متوهجة تتجمّع وتتحرك.
   EilanGift.start(canvas, cfg) — cfg: {g, w, to, m, from, c} */
(function(){
'use strict';

const TINTS={pink:['#ff5fa2','#ff2f85'],gold:['#f5c242','#e8a400'],purple:['#a27bff','#6a2fff'],blue:['#5b8cff','#1e44c8'],green:['#34d98f','#0f9c5a'],red:['#ff4a5c','#d6142c']};

const rnd=(a,b)=>a+Math.random()*(b-a);
const TAU=Math.PI*2;

/* ---------- helpers given to each design ---------- */
function makeAPI(){
  const pts=[];
  const api={
    pts,
    pt(x,y,role,size,extra){pts.push(Object.assign({x,y,role,size:size||9},extra||{}));},
    // fill a shape drawn on a 400x400 offscreen canvas, sample a grid (coords returned in 0..100)
    fill(draw,role,step,size,extra){
      const c=document.createElement('canvas');c.width=c.height=400;const x=c.getContext('2d');
      x.fillStyle='#fff';x.strokeStyle='#fff';x.scale(4,4);draw(x);
      const d=x.getImageData(0,0,400,400).data, s=(step||2.2)*4;
      for(let yy=s/2;yy<400;yy+=s)for(let xx=s/2;xx<400;xx+=s){
        const jx=xx+rnd(-s*.35,s*.35), jy=yy+rnd(-s*.35,s*.35);
        const i=((Math.min(399,Math.max(0,jy|0)))*400+Math.min(399,Math.max(0,jx|0)))*4;
        if(d[i+3]>200)api.pt(jx/4,jy/4,role,size,extra);
      }
    },
    line(x1,y1,x2,y2,n,role,size,extra){for(let i=0;i<=n;i++){const t=i/n;api.pt(x1+(x2-x1)*t,y1+(y2-y1)*t,role,size,extra);}},
    curve(fn,n,role,size,extra){for(let i=0;i<=n;i++){const p=fn(i/n);api.pt(p[0],p[1],role,size,extra);}}
  };
  return api;
}

/* ---------- the designs ---------- */
const heartXY=(t)=>[16*Math.pow(Math.sin(t),3),13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t)];

const DESIGNS={
 heart:{
  name:'قلب الكلمات',en:'Heart of Words',occ:'حب · زواج · ذكرى',word:'أحبك',start:'swirl',beat:true,ambient:'sparks',
  bg:['#1a0612','#05040a'],
  roles:{core:['#ffd6ea','#ff2f85'],main:['tint','tint'],dim:['#ff7fb8','#ff2f85']},
  tint:'pink',
  build(a){
    const L=[1,.86,.72,.58,.45,.33,.22];
    L.forEach((s,li)=>{const n=Math.round(150*s+20);
      for(let i=0;i<n;i++){const [hx,hy]=heartXY(i/n*TAU);
        a.pt(50+hx*s*2.55+rnd(-.4,.4),46-hy*s*2.55+rnd(-.4,.4),li===0||li===4?'core':(Math.random()<.25?'dim':'main'),[13,11,11,9,9,7,7][li],{layer:li});}});
    for(let i=0;i<70;i++){const t=Math.random();a.pt(50+rnd(-1.2,1.2),46-2.55*(9-t*21),'core',7,{layer:8});}
  }
 },

 roses:{
  name:'باقة الورد',en:'Rose Bouquet',occ:'شكر · تهنئة · حب',word:'لأجلك',start:'qr',ambient:'petals',
  bg:['#180608','#05040a'],
  roles:{petal:['tint','tint'],petal2:['#ffb3bf','#ff4a5c'],leaf:['#3ed68a','#0f8a4e'],wrap:['#e9d5b7','#b58a4c'],ribbon:['#f5c242','#e8a400']},
  tint:'red',
  build(a){
    const roses=[[50,30,9],[37,34,8],[63,34,8],[43,22,7],[57,22,7],[30,24,6.5],[70,24,6.5],[50,42,7],[34,45,6],[66,45,6]];
    // leaves first (behind)
    a.fill(x=>{[[24,40,-.7],[76,40,.7],[40,52,-.3],[60,52,.3],[20,28,-1.1],[80,28,1.1]].forEach(([cx,cy,r])=>{x.save();x.translate(cx,cy);x.rotate(r);x.beginPath();x.ellipse(0,0,9,3.6,0,0,TAU);x.fill();x.restore();});},'leaf',2.4,8,{layer:0});
    roses.forEach(([cx,cy,R],k)=>{ // spiral petals
      const turns=3.2,n=Math.round(R*13);
      for(let i=0;i<n;i++){const t=i/n,th=t*turns*TAU+k,r=R*(.15+.85*t);
        a.pt(cx+Math.cos(th)*r,cy+Math.sin(th)*r*.82,t>.55?'petal':'petal2',t>.6?10:8,{layer:1+k*.1});}
    });
    // wrap (paper cone)
    a.fill(x=>{x.beginPath();x.moveTo(22,50);x.lineTo(78,50);x.lineTo(57,92);x.lineTo(43,92);x.closePath();x.fill();},'wrap',2.5,8,{layer:3});
    a.fill(x=>{x.beginPath();x.ellipse(50,70,9,3.2,0,0,TAU);x.fill();x.beginPath();x.moveTo(50,70);x.lineTo(41,82);x.lineTo(45,83);x.closePath();x.fill();x.beginPath();x.moveTo(50,70);x.lineTo(59,82);x.lineTo(55,83);x.closePath();x.fill();},'ribbon',1.9,8,{layer:4});
  }
 },

 palm:{
  name:'نخلة الشكر',en:'Palm of Thanks',occ:'شكر · معلّم · والدين',word:'شكراً',start:'rise',sway:true,ambient:'dust',
  bg:['#0d1406','#05040a'],
  roles:{frond:['tint','tint'],frond2:['#8ff0b6','#1fa863'],trunk:['#d9a45b','#8a5a22'],date:['#f5c242','#d98b00'],sand:['#e9d5b7','#9c7a4a']},
  tint:'green',
  build(a){
    // trunk: slightly curved, ringed
    for(let i=0;i<=40;i++){const t=i/40,cx=50+Math.sin(t*2.2)*3,cy=90-t*52,w=3.6-t*1.2;
      for(let k=-2;k<=2;k++)a.pt(cx+k*w*.45+rnd(-.3,.3),cy+(k%2?1:0)*.6,'trunk',k===0?9:8,{layer:0,trunk:1});}
    const top=[50+Math.sin(2.2)*3,38];
    // fronds: arcs out of the crown
    const fr=[[-160,30],[-130,34],[-100,30],[-70,32],[-40,34],[-15,30],[-195,26],[15,26]];
    fr.forEach(([deg,len],k)=>{const a0=deg*Math.PI/180;
      for(let i=0;i<=26;i++){const t=i/26,ang=a0+t*(deg<-90?-.55:.55)*(1), r=t*len;
        const px=top[0]+Math.cos(ang)*r, py=top[1]+Math.sin(ang)*r+t*t*len*.35;
        a.pt(px,py,'frond',9,{layer:1+k*.05,frond:t});
        if(i>2&&i%2===0){const side=ang+Math.PI/2;for(const sgn of[-1,1]){const l=(1-t)*4+1.5;a.pt(px+Math.cos(side)*l*sgn+rnd(-.3,.3),py+Math.sin(side)*l*sgn+1.2,'frond2',7,{layer:1.5+k*.05,frond:t});}}
      }});
    // dates
    for(const s of[-1,1])for(let i=0;i<16;i++)a.pt(top[0]+s*rnd(2,6),top[1]+rnd(1,8),'date',7,{layer:2});
    a.fill(x=>{x.beginPath();x.ellipse(50,92,26,3.5,0,0,TAU);x.fill();},'sand',2.2,7,{layer:-1});
  }
 },

 lantern:{
  name:'فانوس رمضان',en:'Ramadan Lantern',occ:'رمضان · عيد',word:'رمضان',start:'swirl',ambient:'sparks',
  bg:['#120a24','#05040a'],
  roles:{frame:['tint','tint'],glass:['#ff9d5c','#ff6a00'],flame:['#fff3c4','#ff9d00'],hook:['#cfd3ff','#6a7bff']},
  tint:'gold',
  build(a){
    a.fill(x=>{x.lineWidth=1.6;x.beginPath();x.arc(50,10,3.2,0,TAU);x.stroke();},'hook',1.3,7,{layer:0});
    // dome
    a.fill(x=>{x.beginPath();x.moveTo(36,30);x.quadraticCurveTo(50,8,64,30);x.closePath();x.fill();},'frame',2.1,8,{layer:1});
    a.fill(x=>{x.fillRect(33,30,34,3.5);x.fillRect(33,76,34,3.5);x.beginPath();x.moveTo(36,79.5);x.lineTo(64,79.5);x.lineTo(57,88);x.lineTo(43,88);x.closePath();x.fill();},'frame',1.9,8,{layer:1});
    // body: hexagonal glass with frame bars
    a.fill(x=>{x.beginPath();x.moveTo(35,33.5);x.lineTo(65,33.5);x.lineTo(70,55);x.lineTo(65,76);x.lineTo(35,76);x.lineTo(30,55);x.closePath();x.fill();},'glass',3.4,7,{layer:2,a:.4});
    a.fill(x=>{x.lineWidth=2.6;x.beginPath();x.moveTo(35,33.5);x.lineTo(30,55);x.lineTo(35,76);x.moveTo(65,33.5);x.lineTo(70,55);x.lineTo(65,76);x.moveTo(50,33.5);x.lineTo(50,76);x.moveTo(30,55);x.lineTo(70,55);x.stroke();},'frame',1.4,8,{layer:3});
    for(let i=0;i<70;i++){const r=Math.random()*6,th=Math.random()*TAU;a.pt(50+Math.cos(th)*r*.6,58-Math.abs(Math.sin(th))*r*1.4,'flame',7,{layer:4,flick:1});}
  }
 },

 crescent:{
  name:'هلال العيد',en:'Eid Crescent',occ:'عيد الفطر · عيد الأضحى',word:'مبارك',start:'rain',ambient:'stars',
  bg:['#071430','#05040a'],
  roles:{moon:['tint','tint'],moon2:['#fff6d6','#f5c242'],star:['#ffffff','#9fc0ff']},
  tint:'gold',
  build(a){
    a.fill(x=>{x.beginPath();x.arc(46,48,32,0,TAU);x.fill();x.globalCompositeOperation='destination-out';x.beginPath();x.arc(60,40,28,0,TAU);x.fill();},'moon',2.3,10,{layer:0});
    // outline glow
    a.curve(t=>{const th=t*TAU;return[46+Math.cos(th)*32,48+Math.sin(th)*32];},170,'moon2',8,{layer:1,clip:[60,40,28]});
    const stars=[[78,22,5],[86,44,3.5],[70,64,4],[84,70,3]];
    stars.forEach(([cx,cy,R],k)=>{for(let i=0;i<10;i++){const th=i/10*TAU-Math.PI/2,r=i%2?R*.42:R;a.line(cx+Math.cos(th)*r,cy+Math.sin(th)*r,cx+Math.cos(th+TAU/10)*(i%2?R:R*.42),cy+Math.sin(th+TAU/10)*(i%2?R:R*.42),3,'star',7,{layer:2+k*.1,glyph:'✦'});}});
  }
 },

 name:{
  name:'اسمك بالنجوم',en:'Your Name in Stars',occ:'ميلاد · مولود · تهنئة',word:'✦',start:'spiral',ambient:'stars',shape:true,
  bg:['#0a0a26','#05040a'],
  roles:{letter:['tint','tint'],halo:['#e6ecff','#7b9cff'],dust:['#ffffff','#9fc0ff']},
  tint:'blue',
  build(a,cfg){
    const txt=(cfg.to||'نور').replace(/^إلى\s*/,'').slice(0,12)||'نور';
    a.fill(x=>{let fs=34;x.font=`900 ${fs}px "Segoe UI",Tahoma,system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.direction='rtl';
      while(x.measureText(txt).width>88&&fs>10){fs-=2;x.font=`900 ${fs}px "Segoe UI",Tahoma,system-ui,sans-serif`;}
      x.fillText(txt,50,44);},'letter',1.25,10,{layer:0,glyph:'✦'});
    a.fill(x=>{x.beginPath();x.ellipse(50,44,46,22,0,0,TAU);x.lineWidth=.6;x.stroke();},'halo',1.2,7,{layer:1,glyph:'•'});
    for(let i=0;i<70;i++)a.pt(rnd(4,96),rnd(10,80),'dust',7,{layer:2,glyph:'·'});
  }
 },

 cake:{
  name:'كيكة الميلاد',en:'Birthday Cake',occ:'عيد ميلاد',word:'سنة حلوة',start:'rise',ambient:'confetti',
  bg:['#170a1c','#05040a'],
  roles:{tier:['tint','tint'],cream:['#fff1f7','#ffb3d1'],plate:['#cfd3ff','#7b86ff'],candle:['#d8ffe6','#34d98f'],flame:['#fff3c4','#ff9d00']},
  tint:'purple',
  build(a){
    a.fill(x=>{x.beginPath();x.ellipse(50,88,36,4,0,0,TAU);x.fill();},'plate',2.1,8,{layer:0});
    a.fill(x=>{x.fillRect(18,64,64,22);},'tier',2.5,9,{layer:1});
    a.fill(x=>{x.fillRect(27,46,46,18);},'tier',2.5,9,{layer:2});
    a.fill(x=>{x.fillRect(35,32,30,14);},'tier',2.5,9,{layer:3});
    // cream drips
    [[18,82,64],[27,73,46],[35,65,30]].forEach(([x0,_,w],k)=>{const y0=[64,46,32][k];
      a.curve(t=>[x0+t*w,y0+1+Math.abs(Math.sin(t*w*.55))*2.4],Math.round(w*1.3),'cream',8,{layer:4+k});});
    [40,50,60].forEach((cx,k)=>{a.line(cx,31,cx,21,5,'candle',8,{layer:7});
      for(let i=0;i<10;i++)a.pt(cx+rnd(-1,1),rnd(15,19.5),'flame',7,{layer:8,flick:1,glyph:'✦'});});
  }
 },

 grad:{
  name:'قبعة التخرج',en:'Graduation Cap',occ:'تخرج · نجاح',word:'مبروك',start:'swirl',ambient:'confetti',
  bg:['#06122a','#05040a'],
  roles:{board:['tint','tint'],base:['#9fb6ff','#1e44c8'],tassel:['#f5c242','#e8a400'],scroll:['#fff6e6','#d9b98a']},
  tint:'blue',
  build(a){
    a.fill(x=>{x.beginPath();x.moveTo(30,52);x.lineTo(70,52);x.lineTo(70,66);x.quadraticCurveTo(50,74,30,66);x.closePath();x.fill();},'base',2.4,9,{layer:0});
    a.fill(x=>{x.beginPath();x.moveTo(50,26);x.lineTo(90,40);x.lineTo(50,54);x.lineTo(10,40);x.closePath();x.fill();},'board',2.3,10,{layer:1});
    a.line(50,40,80,44,12,'tassel',8,{layer:2});a.line(80,44,82,66,10,'tassel',8,{layer:2});
    for(let i=0;i<22;i++)a.pt(82+rnd(-2.5,2.5),rnd(66,74),'tassel',7,{layer:3});
    a.fill(x=>{x.save();x.translate(30,82);x.rotate(-.15);x.fillRect(-14,-3,28,6);x.restore();},'scroll',2,8,{layer:4});
    a.fill(x=>{x.save();x.translate(30,82);x.rotate(-.15);x.fillRect(-2,-4,4,8);x.restore();},'tassel',1.5,7,{layer:5});
  }
 }
};

/* ---------- player ---------- */
function start(cv,cfg){
  const D=DESIGNS[cfg.g]||DESIGNS.heart;
  const ctx=cv.getContext('2d');
  let W,H,DPR,parts=[],amb=[],stars=[],sprites={},t0=0,formedAt=0,raf=0,stopped=false;
  const word=(cfg.w||D.word).slice(0,16);
  const tint=TINTS[cfg.c]||TINTS[D.tint];
  const colorOf=r=>{const c=D.roles[r];return [c[0]==='tint'?tint[0]:c[0],c[1]==='tint'?tint[1]:c[1]];};

  function sprite(role,size,glyph){
    const txt=glyph||word,key=role+'|'+size+'|'+txt;if(sprites[key])return sprites[key];
    const [col,glow]=colorOf(role),c=document.createElement('canvas'),x=c.getContext('2d');
    const f=`700 ${size}px "Segoe UI",Tahoma,system-ui,sans-serif`;x.font=f;
    const blur=size>9?8:5,w=Math.ceil(x.measureText(txt).width)+blur*4,h=Math.ceil(size*1.6)+blur*4;
    c.width=Math.max(1,w*DPR);c.height=h*DPR;x.scale(DPR,DPR);x.font=f;x.textAlign='center';x.textBaseline='middle';x.direction='rtl';
    x.shadowColor=glow;x.shadowBlur=blur;x.fillStyle=col;x.fillText(txt,w/2,h/2);x.shadowBlur=0;x.fillText(txt,w/2,h/2);
    return sprites[key]={c,w,h};
  }
  function resize(){DPR=Math.min(window.devicePixelRatio||1,2);W=cv.clientWidth||innerWidth;H=cv.clientHeight||innerHeight;cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);sprites={};}

  function build(){
    const api=makeAPI();D.build(api,cfg);
    let pts=api.pts;
    if(cfg.g==='crescent')pts=pts.filter(p=>!p.clip||Math.hypot(p.x-p.clip[0],p.y-p.clip[1])>p.clip[2]);
    // keep particle count friendly for phones/iPads
    const MAX=W<500?750:1100;if(pts.length>MAX){pts.sort(()=>Math.random()-.5);pts=pts.slice(0,MAX);}
    pts.sort((p,q)=>(p.layer||0)-(q.layer||0));
    const CY=cfg.bare?.5:.43,S=(cfg.bare?Math.min(W,H)*.92:Math.min(W*.94,H*.74))/100, ox=W/2-50*S, oy=H*CY-48*S;
    const cx=W/2,cy=H*CY,n=pts.length;
    const grid=Math.ceil(Math.sqrt(n)),cell=Math.min(W,H)*.55/grid;
    parts=pts.map((p,i)=>{
      const tx=ox+p.x*S,ty=oy+p.y*S, ord=i/n;
      let sx,sy;
      if(D.start==='rise'){sx=tx+rnd(-60,60);sy=H+rnd(20,200);}
      else if(D.start==='rain'){sx=tx+rnd(-30,30);sy=-rnd(20,H*.6);}
      else if(D.start==='spiral'){const a=ord*TAU*6,r=Math.max(W,H)*.7;sx=cx+Math.cos(a)*r;sy=cy+Math.sin(a)*r;}
      else if(D.start==='qr'){const gi=i%grid,gj=(i/grid)|0;sx=cx+(gi-grid/2)*cell;sy=cy+(gj-grid/2)*cell;}
      else{const a=Math.random()*TAU,r=Math.max(W,H)*rnd(.6,1.1);sx=cx+Math.cos(a)*r;sy=cy+Math.sin(a)*r+H*.25;}
      const qr=D.start==='qr';
      return {tx,ty,sx,sy,role:p.role,size:Math.max(6,Math.round(p.size*Math.min(1.25,Math.max(.75,S/5)))),glyph:p.glyph,
        delay:(qr?1700:0)+ord*(qr?1500:2600)+rnd(0,350),dur:rnd(1400,2300),spin:rnd(-1.5,1.5),tw:Math.random()*TAU,
        flick:p.flick,frond:p.frond,a:p.a||1,qr,qcol:qr?(Math.random()<.5?colorOf(p.role)[0]:'#ffffff'):null,show:qr?rnd(0,1400):0};
    });
    stars=Array.from({length:120},()=>({x:Math.random()*W,y:Math.random()*H,r:rnd(.2,1.4),p:Math.random()*TAU}));
    amb=Array.from({length:D.ambient==='stars'?0:38},()=>newAmb(true));
    sprites={};
  }
  function newAmb(init){return{x:Math.random()*W,y:init?Math.random()*H:-10,v:rnd(.25,.9),s:rnd(1.5,3.5),ph:Math.random()*TAU,
    col:D.ambient==='confetti'?['#f5c242','#ff5fa2','#5b8cff','#34d98f','#a27bff'][(Math.random()*5)|0]:D.ambient==='petals'?tint[0]:D.ambient==='dust'?'#e9d5b7':colorOf(Object.keys(D.roles)[0])[0]};}

  const ease=t=>1-Math.pow(1-t,4);
  function frame(now){
    if(stopped)return;
    if(!t0)t0=now;const el=now-t0;
    const g=ctx.createRadialGradient(W/2,H*.43,0,W/2,H*.43,Math.max(W,H)*.75);g.addColorStop(0,D.bg[0]);g.addColorStop(1,D.bg[1]);
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#fff';
    for(const s of stars){ctx.globalAlpha=.2+.25*Math.sin(now/900+s.p);ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,TAU);ctx.fill();}
    // ambient
    for(const m of amb){m.y+=m.v;m.x+=Math.sin(now/1000+m.ph)*.35;if(m.y>H+10)Object.assign(m,newAmb(false));
      ctx.globalAlpha=.55;ctx.fillStyle=m.col;
      if(D.ambient==='confetti'){ctx.save();ctx.translate(m.x,m.y);ctx.rotate(now/500+m.ph);ctx.fillRect(-m.s,-m.s/3,m.s*2,m.s*.7);ctx.restore();}
      else if(D.ambient==='petals'){ctx.beginPath();ctx.ellipse(m.x,m.y,m.s*1.3,m.s*.7,now/800+m.ph,0,TAU);ctx.fill();}
      else{ctx.beginPath();ctx.arc(m.x,m.y,m.s*.5,0,TAU);ctx.fill();}}
    let done=0,beat=1;
    if(formedAt&&D.beat){const b=((now-formedAt)/1100)%1;beat=1+.035*Math.max(0,Math.sin(b*TAU))*(b<.5?1:.4);}
    else if(formedAt){beat=1+.012*Math.sin((now-formedAt)/900);}
    const cx=W/2,cy=H*(cfg.bare?.5:.43), sw=D.sway&&formedAt?Math.sin((now-formedAt)/1300)*.05:0;
    ctx.globalCompositeOperation='lighter';
    for(const q of parts){
      let k=(el-q.delay)/q.dur;
      if(q.qr&&k<0){ // QR phase: show as squares
        if(el<q.show)continue;const a=Math.min(1,(el-q.show)/300);ctx.globalAlpha=a*.9;ctx.fillStyle=q.qcol;const s=Math.max(3,Math.min(W,H)*.009);ctx.fillRect(q.sx-s/2,q.sy-s/2,s,s);continue;}
      if(k<0)continue;if(k>=1){k=1;done++;}
      const e=ease(k);let x=q.sx+(q.tx-q.sx)*e,y=q.sy+(q.ty-q.sy)*e;
      if(k<1&&!q.qr){const w=(1-e)*40*q.spin;x+=Math.cos(e*6+q.tw)*w;y+=Math.sin(e*6+q.tw)*w;}
      if(q.frond!==undefined&&sw){const amt=sw*q.frond*q.frond*60;x+=amt;}
      x=cx+(x-cx)*beat;y=cy+(y-cy)*beat;
      let al=Math.min(1,k*1.6)*(.72+.28*Math.sin(now/600+q.tw))*q.a;
      if(q.flick)al*=.55+.45*Math.abs(Math.sin(now/120+q.tw*3));
      if(q.qr&&k<.35){ctx.globalAlpha=(1-k/.35)*.8;ctx.fillStyle=q.qcol;const s=Math.max(3,Math.min(W,H)*.009);ctx.fillRect(x-s/2,y-s/2,s,s);al*=k/.35;}
      const sp=sprite(q.role,q.size,q.glyph);ctx.globalAlpha=al;ctx.drawImage(sp.c,x-sp.w/2,y-sp.h/2,sp.w,sp.h);
    }
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    if(!formedAt&&done===parts.length&&parts.length){formedAt=now;cfg.onFormed&&cfg.onFormed();}
    raf=requestAnimationFrame(frame);
  }
  function restart(){t0=0;formedAt=0;build();}
  resize();build();raf=requestAnimationFrame(frame);
  const onR=()=>{resize();restart();};addEventListener('resize',onR);
  return {restart,stop(){stopped=true;cancelAnimationFrame(raf);removeEventListener('resize',onR);},design:D,formed:()=>!!formedAt};
}

window.EilanGift={start,DESIGNS,TINTS};
})();
