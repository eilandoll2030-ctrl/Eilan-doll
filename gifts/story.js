/* قصص إيلان الحيّة — Eilan Living Stories
   كل قصة تُرسم بخفّة على لوحة صغيرة، ثم تتحوّل كل خانة إلى حرف متوهّج (أسلوب ASCII).
   EilanStory.start(canvas, cfg) — cfg: {g, word, to, c, l, bare, seek, onFormed, onLit} */
(function(){
'use strict';
const TAU=Math.PI*2,clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),lerp=(a,b,t)=>a+(b-a)*t;
const easeOut=t=>1-Math.pow(1-t,3),easeIn=t=>t*t,easeBack=t=>{const c=1.6;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2);};
const rnd=(a,b)=>a+Math.random()*(b-a);
function hash(x,y){const s=Math.sin(x*127.1+y*311.7)*43758.5453;return s-Math.floor(s);}
function noise(x,y){const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy,u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy);
  const a=hash(ix,iy),b=hash(ix+1,iy),c=hash(ix,iy+1),d=hash(ix+1,iy+1);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v;}
const RAMP=" .`',:;~-+=*!?/|(){}<>%#&$@";
const MONO='700 {s}px Menlo,Consolas,"SF Mono","Courier New",monospace';
const TINTS={pink:'#ff5fa2',gold:'#f5c242',purple:'#a27bff',blue:'#5b8cff',green:'#34d98f',red:'#ff3a52',mint:'#9ff5c8'};

/* sample a text (or anything drawn) into points, in screen coordinates */
function textPoints(txt,cx,cy,maxW,maxH,step){
  const c=document.createElement('canvas'),W=Math.ceil(maxW),H=Math.ceil(maxH);c.width=W;c.height=H;const x=c.getContext('2d');
  let fs=H*.8;const F=()=>x.font=`900 ${fs}px "Segoe UI",Tahoma,"PingFang SC","Hiragino Sans","Apple SD Gothic Neo","Noto Sans CJK SC",system-ui,sans-serif`;F();
  while(x.measureText(txt).width>W*.96&&fs>8){fs-=2;F();}
  x.textAlign='center';x.textBaseline='middle';x.fillStyle='#fff';x.fillText(txt,W/2,H/2);
  const d=x.getImageData(0,0,W,H).data,out=[];
  for(let y=0;y<H;y+=step)for(let xx=0;xx<W;xx+=step)if(d[(y*W+xx)*4+3]>140)out.push([cx-W/2+xx,cy-H/2+y]);
  return out;
}
function heart(x,cx,cy,s){x.beginPath();for(let i=0;i<=60;i++){const t=i/60*TAU,hx=16*Math.pow(Math.sin(t),3),hy=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);const px=cx+hx*s,py=cy-hy*s;i?x.lineTo(px,py):x.moveTo(px,py);}x.closePath();}

/* ================= stories ================= */
const STORIES={
 /* ---------- 1. a letter that burns and becomes a rose ---------- */
 letter:{wk:'forYou',occ:['love','anniversary','anyday'],ph:'love',tint:'red',story:true,reveal:11.6,
  init(S){S.smoke=[];S.sparks=[];S.petals=[];},
  draw(x,t,dt,S){
    const {W,H,m}=S,cx=W/2,cy=H*.42,ew=Math.min(W*.86,m*1.02),eh=ew*.64,ex=cx-ew/2,ey=cy-eh/2,word=S.word.toUpperCase?S.word.toUpperCase():S.word;
    const sealY=cy+eh*.04,burnT0=2.7,burnT1=6.6;
    const envelope=()=>{
      const g=x.createLinearGradient(ex,ey,ex+ew,ey+eh);g.addColorStop(0,'#f2bd84');g.addColorStop(1,'#c7834e');
      x.fillStyle=g;x.fillRect(ex,ey,ew,eh);
      x.strokeStyle='#ffe2b8';x.lineWidth=m*.016;x.strokeRect(ex+m*.012,ey+m*.012,ew-m*.024,eh-m*.024);
      x.strokeStyle='#5b3216';x.lineWidth=m*.013;x.beginPath();x.moveTo(ex,ey);x.lineTo(cx,sealY);x.lineTo(ex+ew,ey);
      x.moveTo(ex,ey+eh);x.lineTo(cx-ew*.12,cy+eh*.16);x.moveTo(ex+ew,ey+eh);x.lineTo(cx+ew*.12,cy+eh*.16);x.stroke();
      x.fillStyle='#3a1a08';let fs=eh*.24;x.font=`900 ${fs}px "Segoe UI",Tahoma,"PingFang SC","Hiragino Sans","Apple SD Gothic Neo",system-ui,sans-serif`;
      while(x.measureText(word).width>ew*.8&&fs>8){fs-=2;x.font=`900 ${fs}px "Segoe UI",Tahoma,"PingFang SC","Hiragino Sans","Apple SD Gothic Neo",system-ui,sans-serif`;}
      x.textAlign='center';x.textBaseline='middle';x.fillText(word,cx,ey+eh*.8);
      const pul=1+.08*Math.sin(t*5);const hg=x.createRadialGradient(cx,sealY,0,cx,sealY,m*.08);hg.addColorStop(0,'#ff9df0');hg.addColorStop(1,'#8a2bff');
      x.fillStyle=hg;heart(x,cx,sealY,m*.0042*pul);x.fill();
    };
    // phase A — the envelope appears line by line
    if(t<burnT1+.2){
      x.save();x.beginPath();x.rect(ex-5,ey-5,ew+10,(eh+10)*easeOut(clamp(t/1.6)));x.clip();
      envelope();
      // phase B — fire spreads from the seal
      if(t>burnT0){
        const p=easeIn(clamp((t-burnT0)/(burnT1-burnT0))),R=p*Math.hypot(ew,eh)*.62;
        const ring=(r)=>{x.beginPath();for(let i=0;i<=72;i++){const a=i/72*TAU,rr=r*(1+.2*(noise(Math.cos(a)*2+5,Math.sin(a)*2+t*1.4)-.5)*2);const px=cx+Math.cos(a)*rr,py=sealY+Math.sin(a)*rr*.82;i?x.lineTo(px,py):x.moveTo(px,py);}x.closePath();};
        x.globalCompositeOperation='destination-out';ring(R);x.fill();
        x.globalCompositeOperation='lighter';
        x.strokeStyle='#ff5a14';x.lineWidth=m*.06;ring(R);x.stroke();
        x.strokeStyle='#ffb02e';x.lineWidth=m*.03;ring(R*1.01);x.stroke();
        x.strokeStyle='#fff3b0';x.lineWidth=m*.01;ring(R*1.02);x.stroke();
        x.fillStyle='rgba(120,20,5,.55)';ring(R*.97);x.fill();x.globalCompositeOperation='destination-out';x.fillStyle='rgba(0,0,0,.75)';ring(R*.82);x.fill();
        x.globalCompositeOperation='source-over';
        for(let i=0;i<4;i++){const a=Math.random()*TAU,px=cx+Math.cos(a)*R,py=sealY+Math.sin(a)*R*.82;if(px>ex&&px<ex+ew&&py>ey&&py<ey+eh){
          S.smoke.push({x:px,y:py,vx:rnd(-12,12),vy:rnd(-50,-25),r:rnd(m*.02,m*.05),life:1});
          if(Math.random()<.7)S.sparks.push({x:px,y:py,vx:rnd(-80,80),vy:rnd(-200,-60),life:1,c:Math.random()<.5?'#ffd27a':'#ff7a2a'});}}
      }else if(t>burnT0-.8){ // the seal catches a purple flame
        const k=clamp((t-burnT0+.8)/.8);const fg=x.createRadialGradient(cx,sealY-m*.04,0,cx,sealY-m*.04,m*.09*k);fg.addColorStop(0,'#fff');fg.addColorStop(.4,'#d36bff');fg.addColorStop(1,'rgba(120,40,255,0)');
        x.globalCompositeOperation='lighter';x.fillStyle=fg;x.beginPath();x.ellipse(cx,sealY-m*.05*k,m*.05*k,m*.1*k,0,0,TAU);x.fill();x.globalCompositeOperation='source-over';}
      x.restore();
    }
    // phase C — a glowing ember disc collapses into a point
    if(t>burnT1-.4&&t<8.3){
      const k=clamp((t-burnT1+.4)/1.7),r=m*.42*(1-easeIn(k))+m*.01,a=Math.sin(Math.min(1,k*1.4)*Math.PI*.9)+.1;
      x.globalCompositeOperation='lighter';
      const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,`rgba(255,220,140,${a})`);g.addColorStop(.6,`rgba(255,110,30,${a*.8})`);g.addColorStop(1,'rgba(120,20,0,0)');
      x.fillStyle=g;x.beginPath();x.arc(cx,cy,r,0,TAU);x.fill();
      for(let i=0;i<40;i++){const an=Math.random()*TAU,rr=Math.sqrt(Math.random())*r;x.fillStyle='#ffcc66';x.fillRect(cx+Math.cos(an)*rr,cy+Math.sin(an)*rr,m*.01,m*.01);}
      x.globalCompositeOperation='source-over';
    }
    // phase D — the rose grows
    if(t>7.9){
      const g0=t-7.9,hx=cx,hy=cy-m*.06,base=[cx,cy+m*.56],sway=g0>3?Math.sin(t*.9)*.03:0;
      x.save();x.translate(base[0],base[1]);x.rotate(sway);x.translate(-base[0],-base[1]);
      // light rays
      const ra=clamp((g0-1.2)/1.5)*.55;if(ra>0){x.globalCompositeOperation='lighter';
        for(let i=0;i<18;i++){const a=i/18*TAU+t*.08,l=m*(.55+.15*Math.sin(i*3+t));x.strokeStyle=`rgba(70,110,255,${ra*(.5+.5*Math.sin(i*1.7+t*2))})`;x.lineWidth=m*.012;x.beginPath();x.moveTo(hx+Math.cos(a)*m*.2,hy+Math.sin(a)*m*.2);x.lineTo(hx+Math.cos(a)*l,hy+Math.sin(a)*l);x.stroke();}
        for(let i=0;i<7;i++){const yy=hy+(i-3)*m*.07,w=m*(.5+.3*noise(i,t*.5));x.strokeStyle=`rgba(90,140,255,${ra*.5})`;x.lineWidth=m*.006;x.beginPath();x.moveTo(hx-w,yy);x.lineTo(hx+w,yy);x.stroke();}
        x.globalCompositeOperation='source-over';}
      // stem
      const sp=easeOut(clamp(g0/1.4)),stem=t=>[lerp(base[0],hx,t)+Math.sin(t*Math.PI)*m*.04,lerp(base[1],hy+m*.12,t)];
      x.strokeStyle='#2fb862';x.lineWidth=m*.024;x.lineCap='round';x.beginPath();for(let i=0;i<=30;i++){const q=stem(i/30*sp);i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]);}x.stroke();
      // leaves
      [[.42,-1,0],[.62,1,.25]].forEach(([at,side,dl])=>{const k=easeBack(clamp((g0-.7-dl)/.8));if(k<=0)return;const q=stem(at);
        x.save();x.translate(q[0],q[1]);x.rotate(side*-.7);x.scale(k,k);const lg=x.createLinearGradient(0,0,side*m*.16,0);lg.addColorStop(0,'#1e8a49');lg.addColorStop(1,'#5be08f');
        x.fillStyle=lg;x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(side*m*.08,-m*.07,side*m*.17,0);x.quadraticCurveTo(side*m*.08,m*.05,0,0);x.fill();
        x.strokeStyle='#0d4a25';x.lineWidth=m*.006;x.beginPath();x.moveTo(0,0);x.lineTo(side*m*.15,0);x.stroke();x.restore();});
      // bloom
      const bp=easeBack(clamp((g0-1.3)/1.7));if(bp>0){const R=m*.25*bp,tint=S.tint;
        x.globalCompositeOperation='lighter';const gl=x.createRadialGradient(hx,hy,0,hx,hy,R*2.2);gl.addColorStop(0,'rgba(255,60,90,.35)');gl.addColorStop(1,'rgba(255,0,60,0)');x.fillStyle=gl;x.beginPath();x.arc(hx,hy,R*2.2,0,TAU);x.fill();x.globalCompositeOperation='source-over';
        const petal=(a,dist,rw,rh,c1,c2)=>{x.save();x.translate(hx+Math.cos(a)*dist,hy+Math.sin(a)*dist*.8);x.rotate(a+Math.PI/2);const pg=x.createLinearGradient(0,-rh,0,rh);pg.addColorStop(0,c1);pg.addColorStop(1,c2);x.fillStyle=pg;x.beginPath();x.ellipse(0,0,rw,rh,0,0,TAU);x.fill();x.restore();};
        for(let i=0;i<6;i++)petal(i/6*TAU+.3,R*.55,R*.5,R*.42,tint,'#7a0618');
        for(let i=0;i<5;i++)petal(i/5*TAU+1,R*.3,R*.36,R*.32,'#ff8095',tint);
        x.strokeStyle='#5a0412';x.lineWidth=m*.008;x.beginPath();for(let i=0;i<=60;i++){const a=i/60*TAU*2.4,r=R*.05+R*.36*(i/60);const px=hx+Math.cos(a)*r,py=hy-R*.1+Math.sin(a)*r*.75;i?x.lineTo(px,py):x.moveTo(px,py);}x.stroke();
        if(g0>3&&Math.random()<.02)S.petals.push({x:hx+rnd(-R,R),y:hy,vx:rnd(-15,15),vy:rnd(15,35),r:0,life:1});}
      x.restore();
    }
    // particles
    x.globalCompositeOperation='lighter';
    x.globalCompositeOperation='source-over';S.smoke=S.smoke.filter(p=>(p.life-=dt*.6)>0);for(const p of S.smoke){p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=m*.03*dt;x.fillStyle=`rgba(110,100,100,${p.life*.07})`;x.beginPath();x.arc(p.x,p.y,p.r,0,TAU);x.fill();}x.globalCompositeOperation='lighter';
    S.sparks=S.sparks.filter(p=>(p.life-=dt*.9)>0);for(const p of S.sparks){p.vy+=60*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;x.fillStyle=p.c;x.globalAlpha=p.life;x.fillRect(p.x,p.y,m*.012,m*.012);}x.globalAlpha=1;
    S.petals=S.petals.filter(p=>(p.life-=dt*.18)>0&&p.y<H);for(const p of S.petals){p.r+=dt*2;p.x+=p.vx*dt+Math.sin(p.r)*.6;p.y+=p.vy*dt;x.fillStyle=`rgba(255,70,100,${p.life})`;x.beginPath();x.ellipse(p.x,p.y,m*.018,m*.01,p.r,0,TAU);x.fill();}
    x.globalCompositeOperation='source-over';
  }},

 /* ---------- 2. a wish candle: lit, melting, blown out, smoke writes the word ---------- */
 candle:{wk:'wish',occ:['birthday','anyday'],ph:'birthday',tint:'gold',story:true,tap:true,
  init(S){S.smoke=[];S.sparks=[];S.blowAt=null;S.word2=[];S.revealed=false;},
  draw(x,t,dt,S){
    const {W,H,m}=S,cx=W/2,cy=H*.42,by=cy+m*.42,cw=m*.2,full=m*.55;
    if(S.blowAt===null&&t>10)S.blow(t);
    const blowK=S.blowAt===null?0:clamp((t-S.blowAt)/.35);
    const build=easeOut(clamp(t/2)),melt=clamp((Math.min(t,S.blowAt??t)-3)/7)*.32,h=full*build*(1-melt),top=by-h;
    // plate + wax pool
    x.fillStyle='#8a6a4c';x.beginPath();x.ellipse(cx,by+m*.02,m*.3,m*.05,0,0,TAU);x.fill();
    const pool=m*(.12+melt*.5);x.fillStyle='#ffe3a8';x.beginPath();x.ellipse(cx,by,pool,m*.03+melt*m*.02,0,0,TAU);x.fill();
    // candle body
    if(h>1){const g=x.createLinearGradient(cx-cw/2,0,cx+cw/2,0);g.addColorStop(0,'#c98a4a');g.addColorStop(.35,'#fff1d6');g.addColorStop(.7,'#f7d39a');g.addColorStop(1,'#b0703a');
      x.fillStyle=g;x.fillRect(cx-cw/2,top,cw,h);
      x.strokeStyle=S.tint;x.globalAlpha=.55;x.lineWidth=m*.014;for(let y=by-m*.03;y>top+m*.02;y-=m*.06){x.beginPath();x.moveTo(cx-cw/2,y);x.lineTo(cx+cw/2,y-m*.03);x.stroke();}x.globalAlpha=1;
      x.fillStyle='#fff6dc';x.beginPath();x.ellipse(cx,top,cw/2,m*.025,0,0,TAU);x.fill();
      // drips
      [[-.42,3.6,.18],[.3,4.6,.26],[-.1,6,.14],[.45,7.2,.2]].forEach(([dx,t0,L])=>{const k=clamp((t-t0)/2.2);if(k<=0||S.blowAt!==null&&t0>S.blowAt)return;const len=Math.min(h-m*.03,m*L*k);
        x.fillStyle='#fff8e6';x.beginPath();x.roundRect?x.roundRect(cx+dx*cw-m*.012,top,m*.024,len,m*.012):x.rect(cx+dx*cw-m*.012,top,m*.024,len);x.fill();});
      // wick
      x.strokeStyle='#2a1a10';x.lineWidth=m*.008;x.beginPath();x.moveTo(cx,top);x.lineTo(cx,top-m*.035);x.stroke();
    }
    // lighting spark
    if(t>1.8&&t<2.5){const k=(t-1.8)/.7,sx=lerp(cx+m*.4,cx,k),sy=lerp(top-m*.3,top-m*.04,k);x.globalCompositeOperation='lighter';x.fillStyle='#fff3c4';x.beginPath();x.arc(sx,sy,m*.015,0,TAU);x.fill();x.globalCompositeOperation='source-over';
      S.sparks.push({x:sx,y:sy,vx:rnd(-30,30),vy:rnd(-30,30),life:.6,c:'#ffd27a'});}
    // flame
    const fk=clamp((t-2.4)/.6)*(1-blowK);
    if(fk>0){const fx=cx+Math.sin(t*7)*m*.006+(noise(t*3,1)-.5)*m*.02,fy=top-m*.035,fh=m*.17*fk*(.9+.15*noise(t*6,3)),fw=m*.05*fk;
      if(S.onLit&&!S.lit&&fk>=1){S.lit=true;S.onLit();}
      x.globalCompositeOperation='lighter';
      const halo=x.createRadialGradient(fx,fy-fh*.4,0,fx,fy-fh*.4,m*.42*fk);halo.addColorStop(0,'rgba(255,170,60,.45)');halo.addColorStop(1,'rgba(255,90,0,0)');x.fillStyle=halo;x.beginPath();x.arc(fx,fy-fh*.4,m*.42*fk,0,TAU);x.fill();
      const tear=(s,c)=>{x.fillStyle=c;x.beginPath();x.moveTo(fx+Math.sin(t*5)*fw*.4,fy-fh*s);x.bezierCurveTo(fx+fw*s,fy-fh*.45*s,fx+fw*s,fy,fx,fy);x.bezierCurveTo(fx-fw*s,fy,fx-fw*s,fy-fh*.45*s,fx+Math.sin(t*5)*fw*.4,fy-fh*s);x.fill();};
      tear(1.15,'#ff6a1a');tear(.85,'#ffb43a');tear(.55,'#fff2b8');
      x.fillStyle='#5a8cff';x.beginPath();x.ellipse(fx,fy-fh*.08,fw*.35,fh*.1,0,0,TAU);x.fill();
      x.globalCompositeOperation='source-over';
      if(Math.random()<.25)S.sparks.push({x:fx,y:fy-fh,vx:rnd(-20,20),vy:rnd(-90,-40),life:.8,c:'#ffcf6a'});}
    // smoke after blowing → becomes the word
    if(S.blowAt!==null){const st=t-S.blowAt;
      if(st<1.4)for(let i=0;i<3;i++)S.smoke.push({x:cx+rnd(-3,3),y:top-m*.04,vx:rnd(-15,15),vy:rnd(-110,-70),r:rnd(m*.012,m*.03),life:1,ph:Math.random()*TAU});
      if(st>1.2&&!S.word2.length){const ws=S.word.split(/\s+/),st2=Math.max(3,Math.round(m*.011)),wd=Math.min(W*.94,m*1.15);let pts;
        if(ws.length>1){const h=Math.ceil(ws.length/2);pts=textPoints(ws.slice(0,h).join(' '),cx,cy-m*.47,wd,m*.22,st2).concat(textPoints(ws.slice(h).join(' '),cx,cy-m*.24,wd,m*.22,st2));}
        else pts=textPoints(S.word,cx,cy-m*.28,wd,m*.28,st2);
        S.word2=pts.map(([tx,ty])=>({x:cx+rnd(-m*.05,m*.05),y:top-m*.05-rnd(0,m*.2),tx,ty,d:rnd(0,.8)}));}
      if(S.word2.length){x.globalCompositeOperation='lighter';
        for(const p of S.word2){const k=easeOut(clamp((st-1.3-p.d)/1.6));const px=lerp(p.x,p.tx,k)+Math.sin(t*2+p.d*9)*(1-k)*m*.05,py=lerp(p.y,p.ty,k);
          x.fillStyle=k>=1?`rgba(255,230,170,${.75+.25*Math.sin(t*3+p.d*20)})`:`rgba(220,210,200,${.5*k+.2})`;x.fillRect(px-S.cw*.5,py-S.ch*.5,S.cw,S.ch);}
        x.globalCompositeOperation='source-over';
        if(st>3.6&&!S.revealed){S.revealed=true;S.formedNow=true;}}
    }
    x.globalCompositeOperation='lighter';
    x.globalCompositeOperation='source-over';S.smoke=S.smoke.filter(p=>(p.life-=dt*.45)>0);for(const p of S.smoke){p.x+=p.vx*dt+Math.sin(t*2+p.ph)*.8;p.y+=p.vy*dt;p.r+=m*.02*dt;x.fillStyle=`rgba(170,165,160,${p.life*.09})`;x.beginPath();x.arc(p.x,p.y,p.r,0,TAU);x.fill();}x.globalCompositeOperation='lighter';
    S.sparks=S.sparks.filter(p=>(p.life-=dt)>0);for(const p of S.sparks){p.x+=p.vx*dt;p.y+=p.vy*dt;x.fillStyle=p.c;x.globalAlpha=clamp(p.life);x.fillRect(p.x,p.y,m*.01,m*.01);}x.globalAlpha=1;
    x.globalCompositeOperation='source-over';
  }},

 /* ---------- 3. fireworks that end as the name ---------- */
 fireworks:{wk:'congrats',occ:['eid','newyear','success','birthday'],ph:'general',tint:'gold',story:true,shape:true,reveal:8.4,
  init(S){S.rockets=[];S.parts=[];S.flash=[];S.launched=0;S.final=null;},
  draw(x,t,dt,S){
    const {W,H,m}=S,cx=W/2,cy=H*.42;
    const PAL=[[S.tint,'#fff3c4'],['#ff5fa2','#ffd6ea'],['#5b8cff','#d6e4ff'],['#34d98f','#d8ffe6'],['#a27bff','#e6d6ff']];
    const plan=[.3,1.3,2.2,3.0,3.7];
    while(S.launched<plan.length&&t>=plan[S.launched]){const k=S.launched++;S.rockets.push({x:cx+rnd(-.38,.38)*W,y:H+10,tx:0,ty:H*rnd(.16,.4),v:rnd(.9,1.2),t0:t,pal:PAL[k%PAL.length]});}
    if(!S.final&&t>=4.6){const name=(S.to||S.word||'✦').replace(/^(إلى|To|Para|Per|Kime)\s+/i,'').slice(0,14);
      S.final={t0:t,pts:textPoints(name,cx,cy,Math.min(W*.94,m*1.3),m*.42,Math.max(3,Math.round(m*.011))),x:cx,y:H+10};}
    // late background bursts
    if(t>9&&Math.random()<dt*.5)S.rockets.push({x:cx+rnd(-.42,.42)*W,y:H+10,ty:H*rnd(.08,.22),v:rnd(.9,1.2),t0:t,pal:PAL[(Math.random()*5)|0],small:1});
    x.globalCompositeOperation='lighter';
    S.rockets=S.rockets.filter(r=>{const k=(t-r.t0)*r.v;const y=lerp(H+10,r.ty,easeOut(clamp(k)));
      x.fillStyle='#fff3c4';x.fillRect(r.x-m*.006,y,m*.012,m*.03);
      S.parts.push({x:r.x+rnd(-2,2),y:y+m*.03,vx:rnd(-10,10),vy:rnd(20,60),life:.5,c:'#ffb45a',tr:1});
      if(k>=1){const n=r.small?70:170;S.flash.push({x:r.x,y,life:.35,r:m*(r.small?.08:.13),c:r.pal[0]});for(let i=0;i<n;i++){const a=i/n*TAU+rnd(-.03,.03),sp=m*rnd(.22,.5)*(r.small?.65:1);S.parts.push({x:r.x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:rnd(1.8,2.6),c:Math.random()<.7?r.pal[0]:r.pal[1]});}return false;}return true;});
    if(S.final){const F=S.final,k=t-F.t0;
      if(k<1){const y=lerp(H+10,cy,easeOut(k));x.fillStyle='#fff';x.fillRect(cx-m*.008,y,m*.016,m*.04);F.y=y;}
      else{if(!F.boom){F.boom=F.pts.map(([tx,ty])=>{const a=Math.random()*TAU,sp=m*rnd(.2,.9);return{x:cx,y:cy,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,tx,ty,c:Math.random()<.75?S.tint:'#ffffff',tw:Math.random()*TAU};});}
        const kk=k-1;for(const p of F.boom){if(kk<.7){p.vx*=.96;p.vy*=.96;p.x+=p.vx*dt;p.y+=p.vy*dt;}else{const s=clamp((kk-.7)/1.6);const e=easeOut(s);p.x=lerp(p.x,p.tx,e*.18+.02);p.y=lerp(p.y,p.ty,e*.18+.02);}
          x.fillStyle=p.c;x.globalAlpha=kk>2.4?.75+.25*Math.sin(t*4+p.tw):1;x.fillRect(p.x-m*.009,p.y-m*.009,m*.018,m*.018);}x.globalAlpha=1;}}
    S.parts=S.parts.filter(p=>(p.life-=dt)>0);
    S.flash=S.flash.filter(f=>(f.life-=dt)>0);for(const f of S.flash){const g=x.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r);g.addColorStop(0,`rgba(255,250,230,${f.life*1.6})`);g.addColorStop(1,'rgba(255,200,120,0)');x.fillStyle=g;x.beginPath();x.arc(f.x,f.y,f.r,0,TAU);x.fill();}
    for(const p of S.parts){p.vy+=m*.12*dt;p.vx*=.975;p.vy*=.975;const ox=p.x,oy=p.y;p.x+=p.vx*dt;p.y+=p.vy*dt;x.globalAlpha=clamp(p.life*1.2);x.strokeStyle=p.c;x.lineWidth=S.cw*.9;x.beginPath();x.moveTo(ox,oy);x.lineTo(p.x,p.y);x.stroke();x.fillStyle=p.c;x.fillRect(p.x-S.cw*.6,p.y-S.ch*.6,S.cw*1.2,S.ch*1.2);}
    x.globalAlpha=1;x.globalCompositeOperation='source-over';
  }}
};

/* ================= the ASCII player ================= */
function start(cv,cfg){
  const D=STORIES[cfg.g]||STORIES.letter,ctx=cv.getContext('2d');
  const lc=document.createElement('canvas'),lx=lc.getContext('2d',{willReadFrequently:true});
  let W,H,DPR,cw,ch,cols,rows,sprites={},t0=0,last=0,formedAt=0,raf=0,stopped=false,S;
  function resize(){DPR=Math.min(window.devicePixelRatio||1,2);W=cv.clientWidth||innerWidth;H=cv.clientHeight||innerHeight;cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);
    cw=Math.max(5,Math.min(10,Math.round(Math.min(W,H)/82)));ch=Math.round(cw*1.45);cols=Math.ceil(W/cw);rows=Math.ceil(H/ch);lc.width=cols;lc.height=rows;sprites={};}
  function reset(){S={cw,ch,W,H,m:cfg.bare?Math.min(W,H)*.8:Math.min(W,H*.78),word:(cfg.word||'✦').slice(0,18),to:cfg.to||'',tint:TINTS[cfg.c]||TINTS[D.tint],onLit:cfg.onLit};
    S.blow=tt=>{if(S.blowAt===null)S.blowAt=tt;};D.init(S);formedAt=0;t0=0;last=0;}
  const Q=v=>Math.min(5,Math.round(v/51));
  function sprite(chr,r,g,b,glow){const key=chr+Q(r)+''+Q(g)+Q(b)+(glow?1:0);let s=sprites[key];if(s)return s;
    const c=document.createElement('canvas'),pad=glow?4:1;c.width=(cw+pad*2)*DPR;c.height=(ch+pad*2)*DPR;const x=c.getContext('2d');x.scale(DPR,DPR);
    x.font=MONO.replace('{s}',Math.round(ch*.92));x.textAlign='center';x.textBaseline='middle';const col=`rgb(${Q(r)*51},${Q(g)*51},${Q(b)*51})`;
    if(glow){x.shadowColor=col;x.shadowBlur=4;}x.fillStyle=col;x.fillText(chr,pad+cw/2,pad+ch/2+1);return sprites[key]={c,pad};}
  function frame(now){
    if(stopped)return;if(!t0){t0=now;last=now;}
    const dt=Math.min(.05,(now-last)/1000);last=now;const t=(now-t0)/1000+(cfg.seek||0);
    lx.setTransform(1,0,0,1,0,0);lx.globalCompositeOperation='source-over';lx.fillStyle='#000';lx.fillRect(0,0,cols,rows);
    lx.setTransform(1/cw,0,0,1/ch,0,0);D.draw(lx,t,dt,S);
    lx.setTransform(1,0,0,1,0,0);lx.globalCompositeOperation='destination-over';lx.fillStyle='#000';lx.fillRect(0,0,cols,rows);lx.globalCompositeOperation='source-over';
    const d=lx.getImageData(0,0,cols,rows).data;
    ctx.globalCompositeOperation='source-over';ctx.fillStyle='#030305';ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';
    const tick=Math.floor(t*12);
    for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const o=(j*cols+i)*4,r=d[o],g=d[o+1],b=d[o+2],mx=Math.max(r,g,b);if(mx<14)continue;
      const lum=mx/255;let ci=Math.floor(Math.pow(lum,.75)*(RAMP.length-1));if(hash(i+tick*.37,j)<.12)ci=Math.max(1,Math.min(RAMP.length-1,ci+(hash(j,i+tick)<.5?-1:1)));
      const k=255/mx,sp=sprite(RAMP[ci],r*k,g*k,b*k,lum>.7);ctx.globalAlpha=.3+.7*lum;ctx.drawImage(sp.c,i*cw-sp.pad,j*ch-sp.pad,cw+sp.pad*2,ch+sp.pad*2);}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    const rev=D.reveal?t>=D.reveal:S.formedNow;
    if(!formedAt&&rev){formedAt=now;cfg.onFormed&&cfg.onFormed();}
    raf=requestAnimationFrame(frame);
  }
  resize();reset();raf=requestAnimationFrame(frame);
  const onR=()=>{resize();reset();};addEventListener('resize',onR);
  return {restart:reset,stop(){stopped=true;cancelAnimationFrame(raf);removeEventListener('resize',onR);},formed:()=>!!formedAt,
    tap(){if(D.tap&&S.lit&&S.blowAt===null){S.blow((performance.now()-t0)/1000+(cfg.seek||0));return true;}return false;},design:D};
}
window.EilanStory={start,STORIES};
})();
