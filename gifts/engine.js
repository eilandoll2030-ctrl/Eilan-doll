/* هدايا إيلان الحيّة — Eilan Living Gifts engine
   كل هدية = شكل يتكوّن من كلمات أو رموز متوهجة تتجمّع وتتحرك.
   EilanGift.start(canvas, cfg) — cfg: {g, list:[texts], to, c, bare, onFormed} */
(function(){
'use strict';

const TINTS={pink:['#ff5fa2','#ff2f85'],gold:['#f5c242','#e8a400'],purple:['#a27bff','#6a2fff'],blue:['#5b8cff','#1e44c8'],green:['#34d98f','#0f9c5a'],red:['#ff4a5c','#d6142c'],mint:['#9ff5c8','#2fd98a']};
const FONT='"Segoe UI",Tahoma,"PingFang SC","Hiragino Sans","Apple SD Gothic Neo","Noto Sans CJK SC",system-ui,sans-serif';
const rnd=(a,b)=>a+Math.random()*(b-a);
const TAU=Math.PI*2;
function mix(hex,to,t){const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));const a=p(hex),b=p(to);return '#'+a.map((v,i)=>Math.round(v+(b[i]-v)*t).toString(16).padStart(2,'0')).join('');}

/* ---------- helpers given to each design ---------- */
function makeAPI(){
  const pts=[];
  const api={
    pts,
    pt(x,y,role,size,extra){pts.push(Object.assign({x,y,role,size:size||9},extra||{}));},
    // fill a shape drawn on a 400x400 canvas (design space 0..100), sample a grid; edges get brighter
    fill(draw,role,step,size,extra){
      const c=document.createElement('canvas');c.width=c.height=400;const x=c.getContext('2d');
      x.fillStyle='#fff';x.strokeStyle='#fff';x.lineCap='round';x.lineJoin='round';x.scale(4,4);draw(x);
      const d=x.getImageData(0,0,400,400).data,s=(step||2.2)*4;
      const on=(px,py)=>px>=0&&py>=0&&px<400&&py<400&&d[((py|0)*400+(px|0))*4+3]>160;
      for(let yy=s/2;yy<400;yy+=s)for(let xx=s/2;xx<400;xx+=s){
        const jx=xx+rnd(-s*.3,s*.3),jy=yy+rnd(-s*.3,s*.3);
        if(!on(jx,jy))continue;
        const e=s*.95,edge=!(on(jx+e,jy)&&on(jx-e,jy)&&on(jx,jy+e)&&on(jx,jy-e));
        const r=typeof role==='function'?role(jx/4,jy/4):role;
        api.pt(jx/4,jy/4,r,(size||9)+(edge?1:0),Object.assign({edge},extra||{}));
      }
    },
    line(x1,y1,x2,y2,n,role,size,extra){for(let i=0;i<=n;i++){const t=i/n;api.pt(x1+(x2-x1)*t,y1+(y2-y1)*t,role,size,extra);}},
    curve(fn,n,role,size,extra){for(let i=0;i<=n;i++){const p=fn(i/n);api.pt(p[0],p[1],role,size,extra);}}
  };
  return api;
}
const heartXY=t=>[16*Math.pow(Math.sin(t),3),13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t)];
function heartPath(x,cx,cy,s){x.beginPath();for(let i=0;i<=100;i++){const [hx,hy]=heartXY(i/100*TAU);const px=cx+hx*s,py=cy-hy*s;i?x.lineTo(px,py):x.moveTo(px,py);}x.closePath();}
const inTri=(px,py,a,b,c)=>{const s=(p,q,r)=>(p[0]-r[0])*(q[1]-r[1])-(q[0]-r[0])*(p[1]-r[1]);const d1=s([px,py],a,b),d2=s([px,py],b,c),d3=s([px,py],c,a);return !((d1<0||d2<0||d3<0)&&(d1>0||d2>0||d3>0));};

/* ---------- the designs ----------
   wk = word key (i18n), occ = occasion keys, ph = phrase group */
const DESIGNS={
 heart:{wk:'love',occ:['love','wedding','anniversary'],ph:'love',start:'swirl',beat:true,ambient:'sparks',bg:['#1a0612','#05040a'],tint:'pink',
  roles:{core:['#ffd6ea','#ff2f85'],main:['tint','tint'],dim:['#ff7fb8','#ff2f85']},
  build(a){
    [1,.86,.72,.58,.45,.33,.22].forEach((s,li)=>{const n=Math.round(160*s+24);
      for(let i=0;i<n;i++){const [hx,hy]=heartXY(i/n*TAU);
        a.pt(50+hx*s*2.55+rnd(-.3,.3),46-hy*s*2.55+rnd(-.3,.3),li===0||li===4?'core':(Math.random()<.25?'dim':'main'),[13,11,11,9,9,7,7][li],{layer:li,edge:li===0});}});
    for(let i=0;i<70;i++){const t=Math.random();a.pt(50+rnd(-1.2,1.2),46-2.55*(9-t*21),'core',7,{layer:8});}
  }},

 roses:{wk:'forYou',occ:['love','thanks','anyday'],ph:'love',start:'qr',ambient:'petals',bg:['#180608','#05040a'],tint:'red',
  roles:{petal:['tint','tint'],petal2:['#ffb3bf','#ff4a5c'],leaf:['#3ed68a','#0f8a4e'],wrap:['#e9d5b7','#b58a4c'],ribbon:['#f5c242','#e8a400']},
  build(a){
    a.fill(x=>{[[24,40,-.7],[76,40,.7],[40,52,-.3],[60,52,.3],[20,28,-1.1],[80,28,1.1]].forEach(([cx,cy,r])=>{x.save();x.translate(cx,cy);x.rotate(r);x.beginPath();x.ellipse(0,0,9,3.6,0,0,TAU);x.fill();x.restore();});},'leaf',2.3,8,{layer:0});
    [[50,30,9],[37,34,8],[63,34,8],[43,22,7],[57,22,7],[30,24,6.5],[70,24,6.5],[50,42,7],[34,45,6],[66,45,6]].forEach(([cx,cy,R],k)=>{
      const n=Math.round(R*14);for(let i=0;i<n;i++){const t=i/n,th=t*3.2*TAU+k,r=R*(.15+.85*t);
        a.pt(cx+Math.cos(th)*r,cy+Math.sin(th)*r*.82,t>.55?'petal':'petal2',t>.6?10:8,{layer:1+k*.1,edge:t>.85});}});
    a.fill(x=>{x.beginPath();x.moveTo(22,50);x.lineTo(78,50);x.lineTo(57,92);x.lineTo(43,92);x.closePath();x.fill();},'wrap',2.6,8,{layer:3,a:.75});
    a.fill(x=>{x.beginPath();x.ellipse(50,70,9,3.2,0,0,TAU);x.fill();x.beginPath();x.moveTo(50,70);x.lineTo(41,82);x.lineTo(45,83);x.closePath();x.fill();x.beginPath();x.moveTo(50,70);x.lineTo(59,82);x.lineTo(55,83);x.closePath();x.fill();},'ribbon',1.8,8,{layer:4});
  }},

 palm:{wk:'thanks',occ:['thanks','teacher','parents'],ph:'thanks',start:'rise',sway:true,ambient:'dust',bg:['#0d1406','#05040a'],tint:'green',
  roles:{frond:['tint','tint'],frond2:['#8ff0b6','#1fa863'],trunk:['#d9a45b','#8a5a22'],date:['#f5c242','#d98b00'],sand:['#e9d5b7','#9c7a4a']},
  build(a){
    for(let i=0;i<=44;i++){const t=i/44,cx=50+Math.sin(t*2.2)*3,cy=90-t*52,w=3.6-t*1.2;
      for(let k=-2;k<=2;k++)a.pt(cx+k*w*.45+rnd(-.3,.3),cy+(k%2?1:0)*.6,'trunk',Math.abs(k)===2?9:8,{layer:0,edge:Math.abs(k)===2});}
    const top=[50+Math.sin(2.2)*3,38];
    [[-160,30],[-130,34],[-100,30],[-70,32],[-40,34],[-15,30],[-195,26],[15,26]].forEach(([deg,len],k)=>{const a0=deg*Math.PI/180;
      for(let i=0;i<=28;i++){const t=i/28,ang=a0+t*(deg<-90?-.55:.55),r=t*len;
        const px=top[0]+Math.cos(ang)*r,py=top[1]+Math.sin(ang)*r+t*t*len*.35;
        a.pt(px,py,'frond',10,{layer:1+k*.05,frond:t,edge:1});
        if(i>2&&i%2===0){const side=ang+Math.PI/2;for(const sg of[-1,1]){const l=(1-t)*4+1.5;a.pt(px+Math.cos(side)*l*sg+rnd(-.3,.3),py+Math.sin(side)*l*sg+1.2,'frond2',7,{layer:1.5+k*.05,frond:t});}}}});
    for(const s of[-1,1])for(let i=0;i<16;i++)a.pt(top[0]+s*rnd(2,6),top[1]+rnd(1,8),'date',7,{layer:2});
    a.fill(x=>{x.beginPath();x.ellipse(50,92,26,3.5,0,0,TAU);x.fill();},'sand',2.2,7,{layer:-1});
  }},

 lantern:{wk:'ramadan',occ:['ramadan','eid'],ph:'ramadan',start:'swirl',ambient:'sparks',bg:['#120a24','#05040a'],tint:'gold',
  roles:{frame:['tint','tint'],glass:['#ff9d5c','#ff6a00'],flame:['#fff3c4','#ff9d00'],hook:['#cfd3ff','#6a7bff']},
  build(a){
    a.fill(x=>{x.lineWidth=1.6;x.beginPath();x.arc(50,10,3.2,0,TAU);x.stroke();},'hook',1.3,7,{layer:0});
    a.fill(x=>{x.beginPath();x.moveTo(36,30);x.quadraticCurveTo(50,8,64,30);x.closePath();x.fill();},'frame',2.1,8,{layer:1});
    a.fill(x=>{x.fillRect(33,30,34,3.5);x.fillRect(33,76,34,3.5);x.beginPath();x.moveTo(36,79.5);x.lineTo(64,79.5);x.lineTo(57,88);x.lineTo(43,88);x.closePath();x.fill();},'frame',1.9,8,{layer:1});
    a.fill(x=>{x.beginPath();x.moveTo(35,33.5);x.lineTo(65,33.5);x.lineTo(70,55);x.lineTo(65,76);x.lineTo(35,76);x.lineTo(30,55);x.closePath();x.fill();},'glass',3.4,7,{layer:2,a:.4});
    a.fill(x=>{x.lineWidth=2.6;x.beginPath();x.moveTo(35,33.5);x.lineTo(30,55);x.lineTo(35,76);x.moveTo(65,33.5);x.lineTo(70,55);x.lineTo(65,76);x.moveTo(50,33.5);x.lineTo(50,76);x.moveTo(30,55);x.lineTo(70,55);x.stroke();},'frame',1.4,8,{layer:3});
    for(let i=0;i<70;i++){const r=Math.random()*6,th=Math.random()*TAU;a.pt(50+Math.cos(th)*r*.6,58-Math.abs(Math.sin(th))*r*1.4,'flame',7,{layer:4,flick:1});}
  }},

 crescent:{wk:'eid',occ:['eid'],ph:'eid',start:'rain',ambient:'stars',bg:['#071430','#05040a'],tint:'gold',
  roles:{moon:['tint','tint'],star:['#ffffff','#9fc0ff']},
  build(a){
    a.fill(x=>{x.beginPath();x.arc(46,48,32,0,TAU);x.fill();x.globalCompositeOperation='destination-out';x.beginPath();x.arc(60,40,28,0,TAU);x.fill();},'moon',2.2,10,{layer:0});
    [[78,22,5],[86,44,3.5],[70,64,4],[84,70,3]].forEach(([cx,cy,R],k)=>{for(let i=0;i<10;i++){const th=i/10*TAU-Math.PI/2,r1=i%2?R*.42:R,r2=i%2?R:R*.42;
      a.line(cx+Math.cos(th)*r1,cy+Math.sin(th)*r1,cx+Math.cos(th+TAU/10)*r2,cy+Math.sin(th+TAU/10)*r2,3,'star',7,{layer:2+k*.1,glyph:'✦'});}});
  }},

 name:{wk:'star',occ:['newborn','birthday'],ph:'newborn',start:'spiral',ambient:'stars',shape:true,bg:['#0a0a26','#05040a'],tint:'blue',
  roles:{letter:['tint','tint'],halo:['#e6ecff','#7b9cff'],dust:['#ffffff','#9fc0ff']},
  build(a,cfg){
    const txt=(cfg.to||'Noor').replace(/^(إلى|To|Para|Per|Kime)\s+/i,'').slice(0,12)||'Noor';
    a.fill(x=>{let fs=34;const f=()=>x.font=`900 ${fs}px ${FONT}`;f();x.textAlign='center';x.textBaseline='middle';
      while(x.measureText(txt).width>88&&fs>10){fs-=2;f();}x.fillText(txt,50,44);},'letter',1.2,10,{layer:0,useGlyph:1});
    a.fill(x=>{x.beginPath();x.ellipse(50,44,46,22,0,0,TAU);x.lineWidth=.6;x.stroke();},'halo',1.2,7,{layer:1,glyph:'•'});
    for(let i=0;i<70;i++)a.pt(rnd(4,96),rnd(10,80),'dust',7,{layer:2,glyph:'·'});
  }},

 cake:{wk:'bday',occ:['birthday'],ph:'birthday',start:'rise',ambient:'confetti',bg:['#170a1c','#05040a'],tint:'purple',
  roles:{tier:['tint','tint'],cream:['#fff1f7','#ffb3d1'],plate:['#cfd3ff','#7b86ff'],candle:['#d8ffe6','#34d98f'],flame:['#fff3c4','#ff9d00']},
  build(a){
    a.fill(x=>{x.beginPath();x.ellipse(50,88,36,4,0,0,TAU);x.fill();},'plate',2.1,8,{layer:0});
    a.fill(x=>x.fillRect(18,64,64,22),'tier',2.5,9,{layer:1});
    a.fill(x=>x.fillRect(27,46,46,18),'tier',2.5,9,{layer:2});
    a.fill(x=>x.fillRect(35,32,30,14),'tier',2.5,9,{layer:3});
    [[18,64,64],[27,46,46],[35,32,30]].forEach(([x0,y0,w],k)=>a.curve(t=>[x0+t*w,y0+1+Math.abs(Math.sin(t*w*.55))*2.4],Math.round(w*1.3),'cream',8,{layer:4+k}));
    [40,50,60].forEach(cx=>{a.line(cx,31,cx,21,5,'candle',8,{layer:7,glyph:'▮'});
      for(let i=0;i<10;i++)a.pt(cx+rnd(-1,1),rnd(15,19.5),'flame',7,{layer:8,flick:1,glyph:'✦'});});
  }},

 grad:{wk:'congrats',occ:['graduation','success'],ph:'grad',start:'swirl',ambient:'confetti',bg:['#06122a','#05040a'],tint:'blue',
  roles:{board:['tint','tint'],base:['#9fb6ff','#1e44c8'],tassel:['#f5c242','#e8a400'],scroll:['#fff6e6','#d9b98a']},
  build(a){
    a.fill(x=>{x.beginPath();x.moveTo(30,52);x.lineTo(70,52);x.lineTo(70,66);x.quadraticCurveTo(50,74,30,66);x.closePath();x.fill();},'base',2.4,9,{layer:0});
    a.fill(x=>{x.beginPath();x.moveTo(50,26);x.lineTo(90,40);x.lineTo(50,54);x.lineTo(10,40);x.closePath();x.fill();},'board',2.3,10,{layer:1});
    a.line(50,40,80,44,12,'tassel',8,{layer:2});a.line(80,44,82,66,10,'tassel',8,{layer:2});
    for(let i=0;i<22;i++)a.pt(82+rnd(-2.5,2.5),rnd(66,74),'tassel',7,{layer:3});
    a.fill(x=>{x.save();x.translate(30,82);x.rotate(-.15);x.fillRect(-14,-3,28,6);x.restore();},'scroll',2,8,{layer:4});
    a.fill(x=>{x.save();x.translate(30,82);x.rotate(-.15);x.fillRect(-2,-4,4,8);x.restore();},'tassel',1.5,7,{layer:5});
  }},

 /* ===== new shapes ===== */
 xmas:{wk:'xmas',occ:['christmas','newyear'],ph:'xmas',start:'spiral',ambient:'snow',bg:['#04150d','#05040a'],tint:'green',
  roles:{tree:['tint','tint'],trunk:['#c8894a','#7a4a1c'],garland:['#f5c242','#e8a400'],b1:['#ff4a5c','#d6142c'],b2:['#f5c242','#e8a400'],b3:['#5b8cff','#1e44c8'],star:['#fff3c4','#f5c242'],gift1:['#ff5fa2','#ff2f85'],gift2:['#a27bff','#6a2fff']},
  build(a){
    const T=[[[50,14],[30,40],[70,40]],[[50,28],[24,58],[76,58]],[[50,44],[17,80],[83,80]]];
    a.fill(x=>x.fillRect(45.5,79,9,10),'trunk',2,8,{layer:0});
    T.forEach((t,k)=>a.fill(x=>{x.beginPath();x.moveTo(...t[0]);x.lineTo(...t[1]);x.lineTo(...t[2]);x.closePath();x.fill();},'tree',2.3,9,{layer:1+k}));
    T.forEach(([top,l,r])=>{const y=l[1]-6,half=(r[0]-l[0])/2*((y-top[1])/(l[1]-top[1]));
      a.curve(t=>[50-half+t*half*2,y-4+Math.sin(t*Math.PI)*5],30,'garland',7,{layer:5,flick:.5});});
    let n=0;while(n<26){const px=rnd(18,82),py=rnd(20,78);if(T.some(t=>inTri(px,py,...t))){a.pt(px,py,['b1','b2','b3'][n%3],11,{layer:6,glyph:'●',flick:.6});n++;}}
    a.pt(50,11,'star',24,{layer:8,glyph:'★',flick:.3});
    for(let i=0;i<12;i++){const th=i/12*TAU;a.pt(50+Math.cos(th)*5,11+Math.sin(th)*5,'star',7,{layer:8,glyph:'✦',flick:1});}
    a.fill(x=>x.fillRect(26,80,12,10),'gift1',1.8,7,{layer:7});a.fill(x=>x.fillRect(62,82,11,8),'gift2',1.8,7,{layer:7});
  }},

 mom:{wk:'mom',occ:['mothersday','parents'],ph:'mom',start:'rise',ambient:'petals',bg:['#1a0614','#05040a'],tint:'pink',
  roles:{petal:['tint','tint'],petal2:['#ffd6ea','#ff7fb8'],petal3:['#c9a7ff','#8a4dff'],stem:['#34d98f','#0f8a4e'],bow:['#f5c242','#e8a400'],heart:['#ff9ac8','#ff2f85']},
  build(a){
    const tulip=(x,cx,cy,s)=>{x.beginPath();x.moveTo(cx-7*s,cy-8*s);x.lineTo(cx-3.5*s,cy-3*s);x.lineTo(cx,cy-9.5*s);x.lineTo(cx+3.5*s,cy-3*s);x.lineTo(cx+7*s,cy-8*s);
      x.bezierCurveTo(cx+8*s,cy+4*s,cx+4*s,cy+8*s,cx,cy+8*s);x.bezierCurveTo(cx-4*s,cy+8*s,cx-8*s,cy+4*s,cx-7*s,cy-8*s);x.fill();};
    a.fill(x=>{x.lineWidth=2.6;x.beginPath();x.moveTo(27,42);x.quadraticCurveTo(38,64,50,80);x.moveTo(50,36);x.lineTo(50,92);x.moveTo(73,42);x.quadraticCurveTo(62,64,50,80);x.stroke();
      [[38,68,-.6],[62,68,.6]].forEach(([cx,cy,r])=>{x.save();x.translate(cx,cy);x.rotate(r);x.beginPath();x.ellipse(0,0,11,3.8,0,0,TAU);x.fill();x.restore();});},'stem',1.9,8,{layer:0});
    a.fill(x=>tulip(x,27,30,1.6),'petal',2.1,9,{layer:1});
    a.fill(x=>tulip(x,73,30,1.6),'petal3',2.1,9,{layer:1});
    a.fill(x=>tulip(x,50,22,1.8),'petal2',2.1,9,{layer:2});
    a.fill(x=>{[[44,80,-.5],[56,80,.5]].forEach(([cx,cy,r])=>{x.save();x.translate(cx,cy);x.rotate(r);x.beginPath();x.ellipse(0,0,5,2.4,0,0,TAU);x.fill();x.restore();});x.beginPath();x.arc(50,80,2,0,TAU);x.fill();},'bow',1.5,8,{layer:3});
    [[10,10],[90,8],[92,56],[8,60]].forEach(([cx,cy],k)=>a.pt(cx,cy,'heart',16-k*2,{layer:4,glyph:'♥',flick:.4}));
  }},

 friends:{wk:'friends',occ:['friendship','anyday'],ph:'friends',start:'swirl',beat:true,ambient:'sparks',bg:['#0a1024','#05040a'],tint:'gold',
  roles:{h1:['tint','tint'],h2:['#5b8cff','#1e44c8'],spark:['#ffffff','#bcd0ff']},
  build(a){
    a.fill(x=>{heartPath(x,38,46,1.95);x.fill();},'h1',2.3,9,{layer:0});
    a.fill(x=>{heartPath(x,62,52,1.95);x.fill();x.globalCompositeOperation='destination-out';x.lineWidth=3;heartPath(x,38,46,1.95);x.stroke();},'h2',2.3,9,{layer:1});
    for(let i=0;i<14;i++){const th=Math.random()*TAU,r=rnd(38,46);a.pt(50+Math.cos(th)*r,48+Math.sin(th)*r*.8,'spark',8,{layer:2,glyph:'✦',flick:1});}
  }},

 planet:{wk:'world',occ:['love','anyday'],ph:'love',start:'spiral',ambient:'stars',bg:['#0b0a26','#05040a'],tint:'purple',
  roles:{p1:['tint','tint'],p2:['#ffb47a','#ff7a2f'],ring:['#d8ffe6','#2fd98a'],moon:['#e6ecff','#9fb6ff'],st:['#ffffff','#9fc0ff']},
  build(a){
    const cx=48,cy=50,R=24,ring=t=>{const th=t*TAU,x=Math.cos(th)*44,y=Math.sin(th)*10,rot=-.32;return [cx+x*Math.cos(rot)-y*Math.sin(rot),cy+x*Math.sin(rot)+y*Math.cos(rot),Math.sin(th)];};
    for(let i=0;i<260;i++){const [x,y,s]=ring(i/260);if(s<0&&Math.hypot(x-cx,y-cy)>=R)a.pt(x+rnd(-.4,.4),y+rnd(-.4,.4),'ring',8,{layer:0,a:.7});}
    a.fill(x=>{x.beginPath();x.arc(cx,cy,R,0,TAU);x.fill();},(x,y)=>Math.floor((y-cy+R+(x-cx)*.3)/6)%2?'p1':'p2',2.1,9,{layer:1});
    for(let i=0;i<260;i++){const [x,y,s]=ring(i/260);if(s>=0)for(const off of[-1.2,0,1.2])a.pt(x+rnd(-.3,.3),y+off,'ring',8,{layer:2,edge:off===0});}
    a.fill(x=>{x.beginPath();x.arc(84,20,5,0,TAU);x.fill();},'moon',1.6,7,{layer:3});
    [[12,16],[20,82],[86,78],[70,10],[8,52]].forEach(([x,y])=>a.pt(x,y,'st',12,{layer:4,glyph:'✦',flick:1}));
  }},

 balloons:{wk:'joy',occ:['birthday','anyday'],ph:'birthday',start:'rise',ambient:'confetti',bg:['#140a22','#05040a'],tint:'pink',
  roles:{b1:['tint','tint'],b2:['#f5c242','#e8a400'],b3:['#5b8cff','#1e44c8'],b4:['#34d98f','#0f9c5a'],b5:['#a27bff','#6a2fff'],str:['#e6ecff','#9fb6ff']},
  build(a){
    const B=[[34,30,'b1'],[52,22,'b2'],[68,32,'b3'],[44,46,'b4'],[60,48,'b5']];
    B.forEach(([cx,cy])=>a.curve(t=>[cx+(52-cx)*t+Math.sin(t*Math.PI*2)*2,cy+11+(88-cy-11)*t],24,'str',6,{layer:0,glyph:'·',wave:.4}));
    B.forEach(([cx,cy,r],k)=>{a.fill(x=>{x.beginPath();x.ellipse(cx,cy,8.5,10.5,0,0,TAU);x.fill();x.beginPath();x.moveTo(cx,cy+10);x.lineTo(cx-2,cy+13);x.lineTo(cx+2,cy+13);x.closePath();x.fill();},r,2,9,{layer:1+k,wave:.6});
      a.pt(cx-3.5,cy-4.5,'str',9,{layer:6,glyph:'◖',a:.6,wave:.6});});
  }},

 giftbox:{wk:'surprise',occ:['surprise','birthday'],ph:'general',start:'qr',ambient:'sparks',bg:['#0e0a24','#05040a'],tint:'purple',
  roles:{box:['tint','tint'],lid:['#c9a7ff','#8a4dff'],ribbon:['#f5c242','#e8a400'],spark:['#ffffff','#f5c242']},
  build(a){
    a.fill(x=>x.fillRect(26,48,48,38),'box',2.3,9,{layer:0});
    a.fill(x=>x.fillRect(22,38,56,11),'lid',2.1,9,{layer:1});
    a.fill(x=>{x.fillRect(46,38,8,48);[[40,30,-.55],[60,30,.55]].forEach(([cx,cy,r])=>{x.save();x.translate(cx,cy);x.rotate(r);x.beginPath();x.ellipse(0,0,9,5,0,0,TAU);x.fill();x.restore();});
      x.beginPath();x.moveTo(48,36);x.lineTo(40,46);x.lineTo(44,47);x.closePath();x.fill();x.beginPath();x.moveTo(52,36);x.lineTo(60,46);x.lineTo(56,47);x.closePath();x.fill();},'ribbon',1.7,8,{layer:2});
    a.fill(x=>{x.beginPath();x.arc(50,34,3,0,TAU);x.fill();},'ribbon',1.2,8,{layer:3});
    [[16,22],[84,20],[14,70],[86,66],[50,10]].forEach(([x,y])=>a.pt(x,y,'spark',13,{layer:4,glyph:'✦',flick:1}));
  }},

 sunflower:{wk:'sunshine',occ:['morning','anyday'],ph:'morning',start:'spiral',ambient:'dust',bg:['#141004','#05040a'],tint:'gold',
  roles:{petal:['tint','tint'],seed:['#9a5a1c','#5a3008'],seed2:['#ffcf7a','#c77a1c'],stem:['#34d98f','#0f8a4e']},
  build(a){
    a.fill(x=>{x.lineWidth=2.6;x.beginPath();x.moveTo(50,46);x.quadraticCurveTo(46,70,50,92);x.stroke();[[40,72,-.7],[60,64,.7]].forEach(([cx,cy,r])=>{x.save();x.translate(cx,cy);x.rotate(r);x.beginPath();x.ellipse(0,0,10,3.6,0,0,TAU);x.fill();x.restore();});},'stem',1.9,8,{layer:0});
    a.fill(x=>{for(let i=0;i<20;i++){const th=i/20*TAU;x.save();x.translate(50+Math.cos(th)*16,36+Math.sin(th)*16);x.rotate(th);x.beginPath();x.ellipse(0,0,8,3.4,0,0,TAU);x.fill();x.restore();}},'petal',2,9,{layer:1});
    a.fill(x=>{x.beginPath();x.arc(50,36,11,0,TAU);x.fill();},'seed',2,8,{layer:2});
    for(let i=0;i<150;i++){const r=Math.sqrt(i/150)*10,th=i*2.39996;a.pt(50+Math.cos(th)*r,36+Math.sin(th)*r,'seed2',6,{layer:3,glyph:'•'});}
  }},

 butterfly:{wk:'hope',occ:['anyday','success'],ph:'general',start:'swirl',ambient:'sparks',bg:['#08142a','#05040a'],tint:'blue',
  roles:{w1:['tint','tint'],w2:['#a27bff','#6a2fff'],spot:['#ffffff','#bcd0ff'],body:['#f5c242','#e8a400']},
  build(a){
    const wings=(x,up)=>{for(const s of[-1,1]){x.save();x.translate(50+s*(up?19:14),up?34:64);x.rotate(s*(up?-.55:.5));x.beginPath();x.ellipse(0,0,up?22:15,up?16:12,0,0,TAU);x.fill();x.restore();}};
    a.fill(x=>wings(x,false),'w2',2.2,9,{layer:0,flap:1});
    a.fill(x=>wings(x,true),'w1',2.2,9,{layer:1,flap:1});
    [[31,32,4.5],[69,32,4.5],[37,66,3.2],[63,66,3.2]].forEach(([cx,cy,r])=>a.fill(x=>{x.beginPath();x.arc(cx,cy,r,0,TAU);x.fill();},'spot',1.3,7,{layer:2,flap:1}));
    a.fill(x=>{x.beginPath();x.ellipse(50,50,2.6,20,0,0,TAU);x.fill();x.lineWidth=1;x.beginPath();x.moveTo(49,31);x.quadraticCurveTo(43,18,37,13);x.moveTo(51,31);x.quadraticCurveTo(57,18,63,13);x.stroke();},'body',1.1,7,{layer:3});
  }},

 coffee:{wk:'morning',occ:['morning','thanks'],ph:'morning',start:'rise',ambient:'dust',bg:['#140c06','#05040a'],tint:'mint',
  roles:{cup:['tint','tint'],coffee:['#b8743a','#6a3a12'],saucer:['#e6ecff','#9fb6ff'],steam:['#ffffff','#c9d6ff'],heart:['#ffd9b0','#e8a400']},
  build(a){
    a.fill(x=>{x.beginPath();x.ellipse(47,84,32,4.5,0,0,TAU);x.fill();},'saucer',2,8,{layer:0});
    a.fill(x=>{x.beginPath();x.moveTo(26,50);x.lineTo(68,50);x.bezierCurveTo(68,72,60,80,47,80);x.bezierCurveTo(34,80,26,72,26,50);x.fill();x.lineWidth=3.4;x.beginPath();x.arc(71,60,7,-1.4,1.4);x.stroke();},'cup',2.2,9,{layer:1});
    a.fill(x=>{x.beginPath();x.ellipse(47,50,20,3.4,0,0,TAU);x.fill();},'coffee',1.6,8,{layer:2});
    a.pt(47,50,'heart',11,{layer:3,glyph:'♥'});
    [36,47,58].forEach((sx,k)=>a.curve(t=>[sx+Math.sin(t*TAU*1.2+k)*3,44-t*30],18,'steam',8,{layer:4,wave:1.2,a:.6}));
  }},

 ring:{wk:'forever',occ:['engagement','wedding'],ph:'engagement',start:'swirl',ambient:'sparks',bg:['#0c0c1c','#05040a'],tint:'gold',
  roles:{band:['tint','tint'],gem:['#e6f4ff','#7bc6ff'],gem2:['#ffffff','#bfe6ff'],spark:['#ffffff','#bfe6ff']},
  build(a){
    a.fill(x=>{x.lineWidth=5;x.beginPath();x.ellipse(50,64,22,20,0,0,TAU);x.stroke();},'band',1.9,9,{layer:0});
    a.fill(x=>{x.beginPath();x.moveTo(38,34);x.lineTo(44,26);x.lineTo(56,26);x.lineTo(62,34);x.lineTo(50,46);x.closePath();x.fill();},(x,y)=>y<34?'gem2':'gem',1.6,9,{layer:1});
    a.line(38,34,62,34,10,'gem2',7,{layer:2});
    [[30,22],[70,20],[50,14],[26,40],[74,40]].forEach(([x,y])=>a.pt(x,y,'spark',13,{layer:3,glyph:'✦',flick:1}));
  }},

 crown:{wk:'treasure',occ:['parents','love'],ph:'general',start:'rain',ambient:'sparks',bg:['#140a1e','#05040a'],tint:'gold',
  roles:{crown:['tint','tint'],band:['#ffe08a','#e8a400'],j1:['#ff4a5c','#d6142c'],j2:['#5b8cff','#1e44c8'],j3:['#34d98f','#0f9c5a']},
  build(a){
    a.fill(x=>{x.beginPath();x.moveTo(18,70);x.lineTo(22,32);x.lineTo(36,52);x.lineTo(50,24);x.lineTo(64,52);x.lineTo(78,32);x.lineTo(82,70);x.closePath();x.fill();},'crown',2.2,9,{layer:0});
    a.fill(x=>x.fillRect(17,69,66,11),'band',2,9,{layer:1});
    [[22,30],[50,22],[78,30]].forEach(([x,y])=>a.pt(x,y-2,'band',14,{layer:2,glyph:'●'}));
    [[32,74,'j1'],[50,74,'j2'],[68,74,'j3'],[50,46,'j1']].forEach(([x,y,r])=>a.pt(x,y,r,13,{layer:3,glyph:'◆',flick:.4}));
  }},

 star:{wk:'shine',occ:['success','graduation'],ph:'grad',start:'spiral',ambient:'stars',bg:['#0a0c24','#05040a'],tint:'gold',
  roles:{star:['tint','tint'],tail:['#bcd0ff','#5b8cff'],mini:['#ffffff','#f5c242']},
  build(a){
    a.fill(x=>{x.beginPath();for(let i=0;i<10;i++){const th=i/10*TAU-Math.PI/2,r=i%2?15:36;x.lineTo(56+Math.cos(th)*r,46+Math.sin(th)*r);}x.closePath();x.fill();},'star',2.2,9,{layer:1});
    for(let k=0;k<3;k++)a.curve(t=>[30-t*24+k*2,62+t*24-k*5],16,'tail',7,{layer:0,a:1-k*.25});
    [[14,18],[86,84],[90,20],[20,48]].forEach(([x,y])=>a.pt(x,y,'mini',11,{layer:2,glyph:'✦',flick:1}));
  }}
};

/* ---------- player ---------- */
function start(cv,cfg){
  const D=DESIGNS[cfg.g]||DESIGNS.heart;
  const ctx=cv.getContext('2d');
  let W,H,DPR,parts=[],amb=[],stars=[],sprites={},t0=0,formedAt=0,raf=0,stopped=false;
  const list=(cfg.list&&cfg.list.length?cfg.list:['✦']).map(s=>String(s).slice(0,20));
  const isEmoji=s=>/\p{Extended_Pictographic}/u.test(s);
  const tint=TINTS[cfg.c]||TINTS[D.tint];
  const colorOf=r=>{const c=D.roles[r]||['#ffffff','#ffffff'];return [c[0]==='tint'?tint[0]:c[0],c[1]==='tint'?tint[1]:c[1]];};

  function sprite(role,size,txt,edge){
    const key=role+'|'+size+'|'+txt+'|'+(edge?1:0);if(sprites[key])return sprites[key];
    let [col,glow]=colorOf(role);if(edge)col=mix(col,'#ffffff',.42);
    const c=document.createElement('canvas'),x=c.getContext('2d');
    let fs=isEmoji(txt)?size*1.25:size;x.font=`700 ${fs}px ${FONT}`;
    const maxW=size*4.4;let mw=x.measureText(txt).width;
    if(mw>maxW){fs=Math.max(4.5,fs*maxW/mw);x.font=`700 ${fs}px ${FONT}`;mw=x.measureText(txt).width;}
    const blur=edge?10:(size>9?7:5),w=Math.ceil(mw)+blur*4,h=Math.ceil(fs*1.7)+blur*4;
    c.width=Math.max(1,w*DPR);c.height=Math.max(1,h*DPR);x.scale(DPR,DPR);x.font=`700 ${fs}px ${FONT}`;x.textAlign='center';x.textBaseline='middle';
    x.shadowColor=glow;x.shadowBlur=blur;x.fillStyle=col;x.fillText(txt,w/2,h/2);x.shadowBlur=0;x.fillText(txt,w/2,h/2);
    return sprites[key]={c,w,h};
  }
  function resize(){DPR=Math.min(window.devicePixelRatio||1,2);W=cv.clientWidth||innerWidth;H=cv.clientHeight||innerHeight;cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);sprites={};}

  function build(){
    const api=makeAPI();D.build(api,cfg);
    let pts=api.pts;
    const MAX=W<500?950:1350;if(pts.length>MAX){const keep=pts.filter(p=>p.glyph||p.edge),rest=pts.filter(p=>!p.glyph&&!p.edge).sort(()=>Math.random()-.5);pts=keep.concat(rest.slice(0,Math.max(0,MAX-keep.length)));}
    pts.sort((p,q)=>(p.layer||0)-(q.layer||0));
    const CY=cfg.bare?.5:.43,S=(cfg.bare?Math.min(W,H)*.92:Math.min(W*.94,H*.74))/100,ox=W/2-50*S,oy=H*CY-48*S;
    const cx=W/2,cy=H*CY,n=pts.length,grid=Math.ceil(Math.sqrt(n)),cell=Math.min(W,H)*.55/grid,qr=D.start==='qr';
    const sc=Math.min(1.3,Math.max(.75,S/5)),emo=isEmoji(list[0]);
    parts=pts.map((p,i)=>{
      const tx=ox+p.x*S,ty=oy+p.y*S,ord=i/n;let sx,sy;
      if(D.start==='rise'){sx=tx+rnd(-60,60);sy=H+rnd(20,200);}
      else if(D.start==='rain'){sx=tx+rnd(-30,30);sy=-rnd(20,H*.6);}
      else if(D.start==='spiral'){const a=ord*TAU*6,r=Math.max(W,H)*.7;sx=cx+Math.cos(a)*r;sy=cy+Math.sin(a)*r;}
      else if(qr){const gi=i%grid,gj=(i/grid)|0;sx=cx+(gi-grid/2)*cell;sy=cy+(gj-grid/2)*cell;}
      else{const a=Math.random()*TAU,r=Math.max(W,H)*rnd(.6,1.1);sx=cx+Math.cos(a)*r;sy=cy+Math.sin(a)*r+H*.25;}
      // useGlyph shapes (name in stars) use the chosen symbol, or a star for words
      const txt=p.useGlyph?(emo?list[0]:'✦'):(p.glyph||list[i%list.length]);
      return {tx,ty,sx,sy,role:p.role,size:Math.max(6,Math.round(p.size*sc)),txt,edge:!!p.edge,
        delay:(qr?1700:0)+ord*(qr?1500:2600)+rnd(0,350),dur:rnd(1400,2300),spin:rnd(-1.5,1.5),tw:Math.random()*TAU,
        flick:p.flick||0,frond:p.frond,flap:p.flap,wave:p.wave||0,a:p.a||1,z:(p.z!=null?p.z:rnd(-1,1)*(p.glyph?1.5:3.4)),qr,qcol:qr?(Math.random()<.5?colorOf(p.role)[0]:'#ffffff'):null,show:qr?rnd(0,1400):0,S};
    });
    stars=Array.from({length:120},()=>({x:Math.random()*W,y:Math.random()*H,r:rnd(.2,1.4),p:Math.random()*TAU}));
    amb=Array.from({length:D.ambient==='stars'?0:(D.ambient==='snow'?70:38)},()=>newAmb(true));
    sprites={};
  }
  function newAmb(init){const pal=['#f5c242','#ff5fa2','#5b8cff','#34d98f','#a27bff'];return{x:Math.random()*W,y:init?Math.random()*H:-10,v:rnd(.25,.9),s:rnd(1.5,3.5),ph:Math.random()*TAU,
    col:D.ambient==='confetti'?pal[(Math.random()*5)|0]:D.ambient==='petals'?tint[0]:D.ambient==='dust'?'#e9d5b7':D.ambient==='snow'?'#ffffff':colorOf(Object.keys(D.roles)[0])[0]};}

  const ease=t=>1-Math.pow(1-t,4);
  function frame(now){
    if(stopped)return;
    if(!t0)t0=now;const el=now-t0;
    const CY=cfg.bare?.5:.43;
    const g=ctx.createRadialGradient(W/2,H*CY,0,W/2,H*CY,Math.max(W,H)*.75);g.addColorStop(0,D.bg[0]);g.addColorStop(1,D.bg[1]);
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#fff';
    for(const s of stars){ctx.globalAlpha=.2+.25*Math.sin(now/900+s.p);ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,TAU);ctx.fill();}
    for(const m of amb){m.y+=m.v;m.x+=Math.sin(now/1000+m.ph)*.35;if(m.y>H+10)Object.assign(m,newAmb(false));
      ctx.globalAlpha=D.ambient==='snow'?.8:.55;ctx.fillStyle=m.col;
      if(D.ambient==='confetti'){ctx.save();ctx.translate(m.x,m.y);ctx.rotate(now/500+m.ph);ctx.fillRect(-m.s,-m.s/3,m.s*2,m.s*.7);ctx.restore();}
      else if(D.ambient==='petals'){ctx.beginPath();ctx.ellipse(m.x,m.y,m.s*1.3,m.s*.7,now/800+m.ph,0,TAU);ctx.fill();}
      else{ctx.beginPath();ctx.arc(m.x,m.y,m.s*(D.ambient==='snow'?.7:.5),0,TAU);ctx.fill();}}
    let done=0,beat=1;
    if(formedAt&&D.beat){const b=((now-formedAt)/1100)%1;beat=1+.035*Math.max(0,Math.sin(b*TAU))*(b<.5?1:.4);}
    else if(formedAt){beat=1+.012*Math.sin((now-formedAt)/900);}
    const cx=W/2,cy=H*CY,live=formedAt?(now-formedAt):0,sw=D.sway&&formedAt?Math.sin(live/1300)*.05:0,flapF=formedAt?.72+.28*Math.cos(live/260):1;
    const rot=Math.sin(el/2600)*.36*(D.flatOnly?0:1),ca=Math.cos(rot),sa=Math.sin(rot);
    ctx.globalCompositeOperation='lighter';
    for(const q of parts){
      let k=(el-q.delay)/q.dur;
      if(q.qr&&k<0){if(el<q.show)continue;ctx.globalAlpha=Math.min(1,(el-q.show)/300)*.9;ctx.fillStyle=q.qcol;const s=Math.max(3,Math.min(W,H)*.009);ctx.fillRect(q.sx-s/2,q.sy-s/2,s,s);continue;}
      if(k<0)continue;if(k>=1){k=1;done++;}
      const e=ease(k);let x=q.sx+(q.tx-q.sx)*e,y=q.sy+(q.ty-q.sy)*e;
      if(k<1&&!q.qr){const w=(1-e)*40*q.spin;x+=Math.cos(e*6+q.tw)*w;y+=Math.sin(e*6+q.tw)*w;}
      if(q.frond!==undefined&&sw)x+=sw*q.frond*q.frond*60;
      if(q.flap&&k>=1)x=cx+(x-cx)*flapF;
      if(q.wave&&formedAt)x+=Math.sin(now/700+q.ty*.05)*q.wave*q.S*.6;
      x=cx+(x-cx)*beat;y=cy+(y-cy)*beat;
      const X=x-cx,Z=q.z*q.S,X2=X*ca+Z*sa,Z2=-X*sa+Z*ca,pf=1/(1+Z2/(Math.max(W,H)*1.4));x=cx+X2*pf;y=cy+(y-cy)*pf;
      let al=Math.min(1,k*1.6)*(.74+.26*Math.sin(now/600+q.tw))*q.a*Math.max(.62,Math.min(1.12,1-Z2/(q.S*55)));
      if(q.flick)al*=1-q.flick*.45+q.flick*.45*Math.abs(Math.sin(now/140+q.tw*3));
      if(q.qr&&k<.35){ctx.globalAlpha=(1-k/.35)*.8;ctx.fillStyle=q.qcol;const s=Math.max(3,Math.min(W,H)*.009);ctx.fillRect(x-s/2,y-s/2,s,s);al*=k/.35;}
      const sp=sprite(q.role,q.size,q.txt,q.edge);ctx.globalAlpha=al;ctx.drawImage(sp.c,x-sp.w*pf/2,y-sp.h*pf/2,sp.w*pf,sp.h*pf);
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

/* ---------- gift data in links: short, works with every language ---------- */
function encode(o){const b=new TextEncoder().encode(JSON.stringify(o));let s='';b.forEach(c=>s+=String.fromCharCode(c));return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function decode(s){try{s=s.replace(/-/g,'+').replace(/_/g,'/');const bin=atob(s);const b=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)b[i]=bin.charCodeAt(i);return JSON.parse(new TextDecoder().decode(b));}catch(e){return null;}}

const SYMBOLS=['❤️','💖','💕','⭐','✨','🌸','🌹','🌷','🌻','🎈','🎉','🎁','🌙','🎄','❄️','☕','🦋','💎','👑','🪐','🍀','🕊️','🎓','🎂'];
window.EilanGift={start,DESIGNS,TINTS,SYMBOLS,encode,decode};
})();
