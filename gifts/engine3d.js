/* هدايا إيلان ثلاثية الأبعاد — Eilan 3D Gifts
   محرك نقاط ثلاثي الأبعاد بإضاءة وعمق ودوران، بشكلين: نقاط متوهجة، أو حروف كود مظلّلة (ASCII).
   Eilan3D.start(canvas, cfg) — cfg: {g, to, c, bare, seek, onFormed} */
(function(){
'use strict';
const TAU=Math.PI*2,clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),lerp=(a,b,t)=>a+(b-a)*t,rnd=(a,b)=>a+Math.random()*(b-a);
const easeOut=t=>1-Math.pow(1-t,3);
const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const mixc=(a,b,t)=>[lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t)];
function hash(x,y){const s=Math.sin(x*127.1+y*311.7)*43758.5453;return s-Math.floor(s);}
const RAMP=" .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const MONO='700 {s}px Menlo,Consolas,"SF Mono","Courier New",monospace';
const TINTS={pink:'#ff5fa2',gold:'#f5c242',purple:'#a27bff',blue:'#5b8cff',green:'#34d98f',red:'#ff3a52',mint:'#9ff5c8'};
const L=(()=>{const v=[-.45,.62,-.64],n=Math.hypot(...v);return v.map(x=>x/n);})(); // light: up-left-front

/* point: [x,y,z, nx,ny,nz, r,g,b, extra] in model units (y up) */
function norm3(x,y,z){const n=Math.hypot(x,y,z)||1;return [x/n,y/n,z/n];}

/* ============ designs ============ */
const D3={
 /* ---- 1. spinning 3D particle heart ---- */
 heart3d:{wk:'love',occ:['love','wedding','anniversary'],ph:'love',tint:'red',kind:'dots',reveal:2.6,
  build(S){const P=[],base=hex(S.tint);
    for(let n=0;n<9000&&P.length<2600;n++){const x=rnd(-1.25,1.25),y=rnd(-1.15,1.3),f=Math.pow(x*x+y*y-1,3)-x*x*y*y*y;if(f>0)continue;
      const d=.62*Math.cbrt(-f)+.04,surf=Math.random()<.78,z=surf?(Math.random()<.5?-d:d):rnd(-d,d)*.9,[nx,ny,nz]=norm3(x*.8,y*.4+.2,z/(d+.01)*1.2);
      const c=mixc(base,[255,255,255],Math.random()<.08?.5:0);P.push([x*.9,y*.9+.08,z*.9,nx,ny,nz,...c,rnd(.7,1.15)]);}
    S.from=P.map(()=>[rnd(-3,3),rnd(-3,3),rnd(-3,3)]);return P;},
  cam(S,t){return {yaw:t*.9,pitch:.12*Math.sin(t*.5),scale:1+.05*Math.max(0,Math.sin(t*5.5))*(S.formed?1:0),tx:0,ty:0};}},

 /* ---- 2. string-art heart (drawn line by line) ---- */
 stringheart:{wk:'love',occ:['love','anniversary','anyday'],ph:'love',tint:'pink',kind:'lines',reveal:6.4},

 /* ---- 3. rotating 3D Christmas tree in code characters ---- */
 tree3d:{wk:'xmas',occ:['christmas','newyear'],ph:'xmas',tint:'green',kind:'ascii',reveal:3.2,snow:true,
  build(S){const P=[],green=hex(S.tint),dark=mixc(green,[0,30,10],.55);
    const tiers=[[.95,.52,.42],[.66,.18,.56],[.36,-.18,.70],[.04,-.56,.84]]; // [yTop,yBot,rBot]
    tiers.forEach(([yt,yb,rb],k)=>{for(let i=0;i<3400;i++){const h=Math.sqrt(Math.random()),th=Math.random()*TAU;
      let r=rb*h*(1+.1*Math.sin(th*9+k*2)*h),y=lerp(yt,yb,h)+(h>.9?.035*Math.sin(th*14+k):0);
      const slope=rb/(yt-yb),[nx,ny,nz]=norm3(Math.cos(th)+rnd(-.35,.35),slope*.9+rnd(-.3,.3),Math.sin(th)+rnd(-.35,.35));
      const c=mixc(dark,green,clamp(h*.6+Math.random()*.5));P.push([Math.cos(th)*r,y,Math.sin(th)*r,nx,ny,nz,...c,0]);}});
    // ornaments
    const OC=[[255,58,82],[245,194,66],[91,140,255],[162,123,255],[255,95,162]];
    for(let o=0;o<30;o++){const k=o%4,[yt,yb,rb]=tiers[k],h=rnd(.45,.95),th=rnd(0,TAU),r=rb*h+.03,cx=Math.cos(th)*r,cy=lerp(yt,yb,h)-.02,cz=Math.sin(th)*r,col=OC[o%OC.length],R=.042;
      for(let i=0;i<140;i++){const u=Math.random()*TAU,v=Math.acos(rnd(-1,1)),nx=Math.sin(v)*Math.cos(u),ny=Math.cos(v),nz=Math.sin(v)*Math.sin(u);P.push([cx+nx*R,cy+ny*R,cz+nz*R,nx,ny,nz,...col,1]);}}
    // garland lights (spiral)
    for(let i=0;i<700;i++){const s=i/700,y=lerp(.92,-.6,s),th=s*TAU*5.2,r=lerp(.04,.86,s)+.02;P.push([Math.cos(th)*r,y,Math.sin(th)*r,Math.cos(th),.2,Math.sin(th),255,236,170,2]);}
    // star
    const sp=[];for(let i=0;i<10;i++){const a=i/10*TAU-Math.PI/2,r=i%2?.05:.12;sp.push([Math.cos(a)*r,-Math.sin(a)*r]);}
    const inStar=(x,y)=>{let c=false;for(let i=0,j=9;i<10;j=i++){const [xi,yi]=sp[i],[xj,yj]=sp[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)c=!c;}return c;};
    for(let i=0;i<2600;i++){const x=rnd(-.13,.13),y=rnd(-.13,.13);if(!inStar(x,y))continue;for(const s of[-1,1])P.push([x,1.06+y,s*.025,rnd(-.2,.2),rnd(-.2,.2),s,255,206,90,3]);}
    // trunk + snowy ground + presents
    for(let i=0;i<500;i++){const th=Math.random()*TAU,y=rnd(-.78,-.56);P.push([Math.cos(th)*.08,y,Math.sin(th)*.08,Math.cos(th),0,Math.sin(th),150,95,50,0]);}
    for(let i=0;i<1200;i++){const r=Math.sqrt(Math.random())*.95,th=Math.random()*TAU;P.push([Math.cos(th)*r,-.8+rnd(0,.01),Math.sin(th)*r*.9,rnd(-.1,.1),1,rnd(-.1,.1),120,135,170,0]);}
    [[.45,.25,[255,95,162]],[-.5,.15,[162,123,255]],[.05,-.55,[91,140,255]]].forEach(([bx,bz,col])=>{const s=.11;for(let i=0;i<700;i++){const f=(Math.random()*6)|0,u=rnd(-1,1),v=rnd(-1,1);let p,n;
      if(f<2){p=[u,f?1:-1,v];n=[0,f?1:-1,0];}else if(f<4){p=[f===2?1:-1,u,v];n=[f===2?1:-1,0,0];}else{p=[u,v,f===4?1:-1];n=[0,0,f===4?1:-1];}
      const rib=Math.abs(p[0])<.18||Math.abs(p[2])<.18;P.push([bx+p[0]*s,-.8+s+p[1]*s,bz+p[2]*s,...n,...(rib?[245,194,66]:col),0]);}});
    P.forEach(p=>{p[1]=p[1]*1.22+.08;});return P;},
  cam(S,t){return {yaw:t*.55,pitch:-.18,scale:1,tx:0,ty:-.05};}},

 /* ---- 4. betta fish swimming, colors changing ---- */
 betta:{wk:'joy',occ:['anyday','success','birthday'],ph:'general',tint:'blue',kind:'ascii',reveal:3.4,bubbles:true,
  build(S){const P=[];
    // body: u 0 nose → 1 tail root
    for(let i=0;i<5200;i++){const u=Math.random(),th=Math.random()*TAU,r=.17*Math.pow(Math.sin(Math.PI*(u*.86+.07)),.75);
      const x=.42-u*.62,y=Math.sin(th)*r*1.15,z=Math.cos(th)*r*.62,[nx,ny,nz]=norm3(u<.15?.6:0,Math.sin(th),Math.cos(th)*1.4);P.push([x,y,z,nx,ny,nz,0,0,0,0,u,0]);}
    // tail fin (big fan): s radial, a spread
    for(let i=0;i<7600;i++){const s=Math.sqrt(Math.random()),a=rnd(-1,1);P.push([0,0,0,0,0,1,0,0,0,1,s,a]);}
    for(let i=0;i<1700;i++)P.push([0,0,0,0,0,1,0,0,0,2,Math.random(),Math.random()]); // dorsal: v along body, h height
    for(let i=0;i<2600;i++)P.push([0,0,0,0,0,1,0,0,0,3,Math.random(),Math.random()]); // anal (long, hangs down)
    for(let i=0;i<500;i++)P.push([0,0,0,0,0,1,0,0,0,4,Math.random(),rnd(-1,1)]);     // pectoral
    for(let i=0;i<160;i++){const th=Math.random()*TAU,r=Math.sqrt(Math.random())*.03;for(const zs of[-1,1])P.push([.32+Math.cos(th)*r,.04+Math.sin(th)*r,zs*.088,0,0,zs,250,250,255,5,0,0,r<.012?1.4:.15]);}
    return P;},
  // fins are rebuilt every frame (they flow)
  animate(S,P,t){const pal=S.pal(t),c1=pal[0],c2=pal[1];
    for(const p of P){const k=p[9],a=p[10],b=p[11];
      if(k===0){const u=a,w=.05*Math.sin(u*4-t*6)*u;p[2]+=0;p._z=w;const c=mixc(mixc(c2,[255,255,255],.25),c1,u*.7);p[6]=c[0];p[7]=c[1];p[8]=c[2];p[12]=1.15;}
      else if(k===1){const s=a,ang=b*1.25+Math.PI,len=.62*s,wv=Math.sin(s*3.2-t*4+b*1.5)*.13*s;
        p[0]=-.2+Math.cos(ang)*len*.95;p[1]=Math.sin(ang)*len*1.05+Math.sin(t*1.3)*.03*s;p[2]=wv+.06*Math.sin(t*6)*s;
        const [nx,ny,nz]=norm3(-Math.cos(s*3.2-t*4+b*1.5)*.6,.15*b,1);p[3]=nx;p[4]=ny;p[5]=nz;
        const ray=.55+.45*Math.pow(Math.abs(Math.sin(b*38)),.6),edge=s>.93?.45:0,c=mixc(mixc(mixc(c1,[0,0,0],.35),c2,s),[255,255,255],edge);p[6]=c[0];p[7]=c[1];p[8]=c[2];p[12]=(.45+.45*s)*ray+edge;}
      else if(k===2){const v=a,h=b,x=.22-v*.5,top=.12+.06*Math.sin(Math.PI*v);p[0]=x-h*h*.15;p[1]=top+h*.26*Math.sin(Math.PI*(v*.85+.1));p[2]=Math.sin(v*4-t*5)*.05*h;
        p[3]=0;p[4]=.2;p[5]=1;const ray=.55+.45*Math.abs(Math.sin(v*44)),c=mixc(c1,c2,h*.8+.1);p[6]=c[0];p[7]=c[1];p[8]=c[2];p[12]=(.5+.4*h)*ray;}
      else if(k===3){const v=a,h=b,x=.2-v*.42;p[0]=x-h*.22;p[1]=-.12-h*.42*Math.sin(Math.PI*(v*.8+.15));p[2]=Math.sin(v*3+h*3-t*4)*.07*h;
        p[3]=0;p[4]=-.2;p[5]=1;const ray=.55+.45*Math.abs(Math.sin(v*40)),c=mixc(c1,c2,h*.9);p[6]=c[0];p[7]=c[1];p[8]=c[2];p[12]=(.5+.45*h)*ray;}
      else if(k===4){const s=a,an=b*.6-.9+Math.sin(t*5)*.25;p[0]=.18+Math.cos(an)*s*.12;p[1]=-.04+Math.sin(an)*s*.12;p[2]=.11+s*.02;p[3]=0;p[4]=0;p[5]=1;const c=mixc(c2,[255,255,255],.3);p[6]=c[0];p[7]=c[1];p[8]=c[2];}
    }},
  cam(S,t){return {yaw:.95*Math.sin(t*.32)-.15,pitch:.1*Math.sin(t*.5),roll:.06*Math.sin(t*.9),scale:1,tx:.18*Math.sin(t*.32+1.6),ty:.06*Math.sin(t*.7)};}}
};

/* ============ player ============ */
function start(cv,cfg){
  const D=D3[cfg.g]||D3.heart3d,ctx=cv.getContext('2d');
  let W,H,DPR,cw,ch,cols,rows,sprites={},dotS={},t0=0,last=0,formedAt=0,raf=0,stopped=false,S,P,zb,cl,cr,cg,cbb,bubbles=[],snow=[];
  function resize(){DPR=Math.min(window.devicePixelRatio||1,2);W=cv.clientWidth||innerWidth;H=cv.clientHeight||innerHeight;cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);
    cw=Math.max(4,Math.min(8,Math.round(Math.min(W,H)/105)));ch=Math.round(cw*1.5);cols=Math.ceil(W/cw);rows=Math.ceil(H/ch);
    const n=cols*rows;zb=new Float32Array(n);cl=new Float32Array(n);cr=new Float32Array(n);cg=new Float32Array(n);cbb=new Float32Array(n);sprites={};dotS={};}
  function reset(){const tint=TINTS[cfg.c]||TINTS[D.tint];
    const PALS=[[hex('#3d7bff'),hex('#c45bff')],[hex('#ff4d8d'),hex('#ffa23d')],[hex('#22d39a'),hex('#3dc8ff')],[hex('#a46bff'),hex('#ff5f9e')]];
    const first=cfg.c?[hex(tint),mixc(hex(tint),[255,255,255],.35)]:PALS[0];
    S={W,H,m:cfg.bare?Math.min(W,H)*.86:Math.min(W,H*.78),tint,formed:false,
      pal:t=>{const L=[first,...PALS.slice(1)],k=t/6,i=Math.floor(k)%L.length,j=(i+1)%L.length,f=clamp((k%1-.75)*4);return [mixc(L[i][0],L[j][0],f),mixc(L[i][1],L[j][1],f)];}};
    P=D.build?D.build(S):[];formedAt=0;t0=0;last=0;bubbles=[];
    snow=Array.from({length:90},()=>({x:Math.random(),y:Math.random(),v:rnd(.02,.06)}));}
  const Q=v=>Math.min(5,Math.max(0,Math.round(v/51)));
  function sprite(chr,r,g,b,glow){const key=chr+Q(r)+Q(g)+Q(b)+(glow?1:0);let s=sprites[key];if(s)return s;
    const c=document.createElement('canvas'),pad=glow?3:1;c.width=(cw+pad*2)*DPR;c.height=(ch+pad*2)*DPR;const x=c.getContext('2d');x.scale(DPR,DPR);
    x.font=MONO.replace('{s}',Math.round(ch*.95));x.textAlign='center';x.textBaseline='middle';const col=`rgb(${Q(r)*51},${Q(g)*51},${Q(b)*51})`;
    if(glow){x.shadowColor=col;x.shadowBlur=3;}x.fillStyle=col;x.fillText(chr,pad+cw/2,pad+ch/2+1);return sprites[key]={c,pad};}
  function dot(r,g,b){const key=(r>>4)+','+(g>>4)+','+(b>>4);let s=dotS[key];if(s)return s;const R=16,c=document.createElement('canvas');c.width=c.height=R*2;const x=c.getContext('2d');
    const gr=x.createRadialGradient(R*.75,R*.7,0,R,R,R);gr.addColorStop(0,`rgb(${Math.min(255,r+90)},${Math.min(255,g+90)},${Math.min(255,b+90)})`);gr.addColorStop(.45,`rgb(${r},${g},${b})`);gr.addColorStop(1,`rgba(${r*.4|0},${g*.4|0},${b*.4|0},0)`);
    x.fillStyle=gr;x.beginPath();x.arc(R,R,R,0,TAU);x.fill();return dotS[key]=c;}

  // project a model point with the camera → [sx, sy, depth, f, n·l]
  function cam(t){const c=D.cam(S,t);const cy=Math.cos(c.yaw),sy=Math.sin(c.yaw),cp=Math.cos(c.pitch||0),sp=Math.sin(c.pitch||0),cr2=Math.cos(c.roll||0),sr=Math.sin(c.roll||0);
    return {c,f:(x,y,z)=>{let X=x*cy+z*sy,Z=-x*sy+z*cy,Y=y;const Y2=Y*cp-Z*sp;Z=Y*sp+Z*cp;Y=Y2;const X2=X*cr2-Y*sr;Y=X*sr+Y*cr2;X=X2;return [X,Y,Z];}};}

  function drawLines(t){ // string-art heart
    const cx=W/2,cy=H*(cfg.bare?.5:.42),sc=S.m*.028,N=360,k=clamp(t/5.6),base=hex(S.tint);
    const hp=a=>[cx+16*Math.pow(Math.sin(a),3)*sc,cy-(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a))*sc-sc*1.5];
    ctx.globalCompositeOperation='lighter';ctx.lineWidth=Math.max(1,S.m*.0025);
    const shown=Math.floor(N*k);
    for(let i=0;i<shown;i++){const a=(i/N)*TAU,[xo,yo]=hp(a),L=.62+.12*Math.sin(i*1.7);const xi=lerp(xo,cx,L),yi=lerp(yo,cy+sc*2,L);
      const g=ctx.createLinearGradient(xo,yo,xi,yi);const tw=formedAt?.8+.2*Math.sin(t*2+i*.3):1;
      g.addColorStop(0,`rgba(${Math.min(255,base[0]+120)},${Math.min(255,base[1]+120)},${Math.min(255,base[2]+120)},${.9*tw})`);g.addColorStop(.5,`rgba(${base[0]},${base[1]},${base[2]},${.55*tw})`);g.addColorStop(1,`rgba(${base[0]*.5|0},${base[1]*.2|0},${base[2]*.4|0},0)`);
      ctx.strokeStyle=g;ctx.beginPath();ctx.moveTo(xo,yo);ctx.lineTo(xi,yi);ctx.stroke();}
    if(k<1){const a=(shown/N)*TAU,[px,py]=hp(a);const gl=ctx.createRadialGradient(px,py,0,px,py,S.m*.04);gl.addColorStop(0,'rgba(255,255,255,.95)');gl.addColorStop(1,'rgba(255,120,180,0)');ctx.fillStyle=gl;ctx.beginPath();ctx.arc(px,py,S.m*.04,0,TAU);ctx.fill();}
    ctx.globalCompositeOperation='source-over';
  }

  function drawDots(t){
    const C=cam(t),cx=W/2+C.c.tx*S.m,cy=H*(cfg.bare?.5:.43)-C.c.ty*S.m,sc=S.m*.31*C.c.scale,k=easeOut(clamp(t/2.2)),list=[];
    for(let i=0;i<P.length;i++){const p=P[i],fr=S.from[i];const x=lerp(fr[0],p[0],k),y=lerp(fr[1],p[1],k),z=lerp(fr[2],p[2],k);
      const [X,Y,Z]=C.f(x,y,z),[nx,ny,nz]=C.f(p[3],p[4],p[5]),f=3/(3+Z);
      const lam=.3+.7*Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),fog=clamp(1-(Z+1)*.25,.35,1),sh=lam*fog;
      list.push([Z,cx+X*sc*f,cy-Y*sc*f,f*p[9],p[6]*sh,p[7]*sh,p[8]*sh]);}
    list.sort((a,b)=>b[0]-a[0]);const R=S.m*.0085;
    for(const q of list){const s=R*q[3]*2.2;ctx.drawImage(dot(q[4]|0,q[5]|0,q[6]|0),q[1]-s/2,q[2]-s/2,s,s);}
  }

  function drawAscii(t,dt){
    if(D.animate)D.animate(S,P,t);
    const C=cam(t),cx=W/2+C.c.tx*S.m,cy=H*(cfg.bare?.47:.43)-C.c.ty*S.m,sc=S.m*(D===D3.betta?.62:.37);
    zb.fill(1e9);cl.fill(0);
    const rev=D===D3.tree3d?clamp(t/2.6)*2.6-1.3:2,fade=D===D3.betta?clamp(t/1.5):1;
    for(const p of P){
      if(D===D3.tree3d&&p[1]>rev)continue;
      let x=p[0],y=p[1],z=p[2]+(p._z||0);const [X,Y,Z]=C.f(x,y,z),f=2.6/(2.6+Z);
      const sx=cx+X*sc*f,sy=cy-Y*sc*f,i=(sx/cw)|0,j=(sy/ch)|0;if(i<0||j<0||i>=cols||j>=rows)continue;const o=j*cols+i;if(Z>=zb[o])continue;
      const [nx,ny,nz]=C.f(p[3],p[4],p[5]);let d=nx*L[0]+ny*L[1]+nz*L[2];const two=p[9]>=1&&D===D3.betta;if(two)d=Math.abs(d);
      let lum=.22+.78*Math.max(0,d);
      if(D===D3.tree3d){if(p[9]===1)lum+=Math.pow(Math.max(0,d),12)*1.2;if(p[9]===2)lum=.75+.35*Math.sin(t*4+p[0]*30+p[1]*20);if(p[9]===3)lum=.75+.25*Math.max(0,d);}
      if(D===D3.betta){if(p[9]===0)lum+=Math.pow(Math.max(0,d),10)*.7;lum*=p[12]||1;}
      zb[o]=Z;cl[o]=clamp(lum*clamp(1.15-(Z+.6)*.35,.45,1.1))*fade;cr[o]=p[6];cg[o]=p[7];cbb[o]=p[8];}
    // snow / bubbles drawn into empty cells
    if(D.snow)for(const s of snow){s.y+=s.v*dt;if(s.y>1){s.y=0;s.x=Math.random();}const o=((s.y*rows)|0)*cols+((s.x*cols)|0);if(o>=0&&o<cl.length&&cl[o]===0){cl[o]=.5;cr[o]=220;cg[o]=235;cbb[o]=255;}}
    if(D.bubbles){if(Math.random()<dt*2.5)bubbles.push({x:cx+rnd(-.1,.3)*S.m,y:cy,v:rnd(30,60),r:Math.random()});
      bubbles=bubbles.filter(b=>(b.y-=b.v*dt)>0);for(const b of bubbles){const o=((b.y/ch)|0)*cols+(((b.x+Math.sin(b.y*.05)*6)/cw)|0);if(o>=0&&o<cl.length&&cl[o]===0){cl[o]=.6;cr[o]=180;cg[o]=220;cbb[o]=255;}}}
    ctx.globalCompositeOperation='lighter';
    for(let o=0;o<cl.length;o++){const lum=cl[o];if(lum<.04)continue;const i=o%cols,j=(o/cols)|0;
      const ci=Math.max(1,Math.min(RAMP.length-1,Math.round(Math.pow(lum,.85)*(RAMP.length-1))));
      const mx=Math.max(cr[o],cg[o],cbb[o],1),k=255/mx;
      const sp=sprite(RAMP[ci],cr[o]*k,cg[o]*k,cbb[o]*k,lum>.8);ctx.globalAlpha=clamp(.25+.85*lum);ctx.drawImage(sp.c,i*cw-sp.pad,j*ch-sp.pad,cw+sp.pad*2,ch+sp.pad*2);}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
  }

  function frame(now){
    if(stopped)return;if(!t0){t0=now;last=now;}const dt=Math.min(.05,(now-last)/1000);last=now;const t=(now-t0)/1000+(cfg.seek||0);
    const g=ctx.createRadialGradient(W/2,H*.45,0,W/2,H*.45,Math.max(W,H)*.75);g.addColorStop(0,'#0b0b18');g.addColorStop(1,'#020205');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    if(D.kind==='dots')drawDots(t);else if(D.kind==='lines')drawLines(t);else drawAscii(t,dt);
    if(!formedAt&&t>=D.reveal){formedAt=now;S.formed=true;cfg.onFormed&&cfg.onFormed();}
    raf=requestAnimationFrame(frame);
  }
  resize();reset();raf=requestAnimationFrame(frame);
  const onR=()=>{resize();reset();};addEventListener('resize',onR);
  return {restart:reset,stop(){stopped=true;cancelAnimationFrame(raf);removeEventListener('resize',onR);},formed:()=>!!formedAt,design:D};
}
window.Eilan3D={start,D3};
})();
