/* كتاب الفيزياء التفاعلي — Eilan Doll Academy
   كل درس = صفحة شرح + صفحة تجربة. التجارب ترسم على canvas بدوال EB.D */
(()=>{const {C,D}=EB,L=EB.L,T=(ar,en)=>({ar,en}),g=9.8,f=D.fmt;

const sims={
/* 1 — potential energy */
pe:{name:T('ارفع الصندوق وأسقطه','Lift the box and drop it'),
 ctl:[{k:'m',lab:T('الكتلة','Mass'),min:.5,max:10,step:.5,v:2,unit:'kg'},{k:'h',lab:T('الارتفاع','Height'),min:0,max:3,step:.1,v:1.5,unit:'m'}],
 btns:[{k:'drop',lab:T('أسقط ⬇','Drop ⬇')},{k:'reset',lab:T('إعادة','Reset'),alt:1}],
 init(s,p){s.y=p.h;s.v=0;s.fall=false},
 change(s,p){if(!s.fall){s.y=p.h;s.v=0}},
 act(k,s,p){if(k==='drop'&&s.y>0){s.fall=true}else{s.fall=false;s.y=p.h;s.v=0}},
 draw(c,W,H,dt,s,p){
  if(s.fall){s.v+=g*dt;s.y-=s.v*dt;if(s.y<=0){s.y=0;s.fall=false}}
  const gy=H-28,bw=Math.max(70,W*.24),sx=W-bw-14,k=(gy-40)/3.2,rx=34;
  D.line(c,10,gy,W-10,gy,C.ink,2.5);for(let x=14;x<W-10;x+=14)D.line(c,x,gy+2,x-8,gy+10,C.ink2,1);
  D.line(c,rx,gy,rx,gy-3*k,C.ink,2);for(let i=0;i<=6;i++){const y=gy-i*.5*k;D.line(c,rx-6,y,rx+(i%2?4:8),y,C.ink,1.5);if(i%2===0)D.text(c,(i/2)+' m',rx-10,y,{size:10,align:'right',ltr:true,col:C.ink2})}
  const cx=(rx+sx)/2+10,shelfY=gy-p.h*k;
  if(p.h>0){D.line(c,cx-50,shelfY,cx+50,shelfY,C.ink,3);D.line(c,cx+50,shelfY,cx+50,gy,C.ink2,1.5,[4,4])}
  const bs=18+Math.sqrt(p.m)*7,by=gy-s.y*k;
  D.box(c,cx-bs/2,by-bs,bs,bs,C.gold,C.ink,4);D.text(c,p.m+' kg',cx,by-bs/2,{size:10,bold:true,ltr:true});
  D.arrow(c,rx+14,gy,rx+14,by,C.purple,1.6,7);D.text(c,'h = '+f(s.y,2)+' m',rx+20,(gy+by)/2,{size:11,col:C.purple,align:'left',ltr:true,bg:'rgba(246,241,228,.85)'});
  if(s.fall)D.arrow(c,cx+bs/2+12,by-bs/2,cx+bs/2+12,by-bs/2+20+s.v*4,C.red,2,8);
  const Ep=p.m*g*s.y,Ek=.5*p.m*s.v*s.v,max=p.m*g*3||1,bh=gy-60;
  D.bar(c,sx+6,40,bw/2-12,bh,Ep/max,C.blue,L('الوضع','Potential'),f(Ep)+' J');
  D.bar(c,sx+bw/2+6,40,bw/2-12,bh,Ek/max,C.green,L('الحركة','Kinetic'),f(Ek)+' J');
  D.text(c,'Eₚ = m g h = '+f(p.m,1)+' × 9.8 × '+f(s.y,2)+' = '+f(Ep)+' J',14,16,{size:12,align:'left',ltr:true,bold:true,col:C.blue});
  D.text(c,'v = '+f(s.v,2)+' m/s',14,34,{size:11,align:'left',ltr:true,col:C.green})}},

/* 2 — conservation of energy */
coaster:{name:T('قطار الملاهي: الطاقة تتحوّل ولا تختفي','Roller coaster: energy changes form'),
 ctl:[{k:'h0',lab:T('ارتفاع البداية','Start height'),min:1,max:5,step:.1,v:4,unit:'m'},{k:'mu',lab:T('الاحتكاك','Friction'),min:0,max:.15,step:.01,v:0}],
 btns:[{k:'go',lab:T('انطلق ▶','Release ▶')},{k:'reset',lab:T('إعادة','Reset'),alt:1}],
 init(s,p){this.reset(s,p)},
 reset(s,p){const SPAN=12;s.x=Math.acos(Math.min(1,2*p.h0/5-1))/(2*Math.PI)*SPAN;s.E=g*p.h0;s.dir=1;s.run=false;s.v=0},
 change(s,p){this.reset(s,p)},
 act(k,s,p){if(k==='go'){this.reset(s,p);s.run=true}else this.reset(s,p)},
 draw(c,W,H,dt,s,p){const SPAN=12,y=x=>5*(.5+.5*Math.cos(2*Math.PI*x/SPAN)),dy=x=>-5*Math.PI/SPAN*Math.sin(2*Math.PI*x/SPAN);
  if(s.run){let n=4;while(n--){const h=dt/4;const v2=2*(s.E-g*y(s.x));if(v2<=1e-4){s.dir*=-1;s.E=Math.max(s.E,g*y(s.x)+1e-4)}s.v=Math.sqrt(Math.max(0,2*(s.E-g*y(s.x))));const ds=s.v*h+.002;const dx=ds/Math.sqrt(1+dy(s.x)**2)*s.dir;s.x=Math.max(.01,Math.min(SPAN-.01,s.x+dx));s.E-=p.mu*g*ds;if(s.E<0.02){s.E=0;s.x+=(SPAN/2-s.x)*.05;s.v=0}}}
  const bw=Math.max(80,W*.25),x0=16,x1=W-bw-16,gy=H-26,ky=(gy-50)/5.4,X=x=>x0+x/SPAN*(x1-x0),Y=h=>gy-h*ky;
  D.line(c,8,gy,W-8,gy,C.ink,2);
  for(let x=0;x<=SPAN;x+=1){D.line(c,X(x),Y(y(x)),X(x),gy,'rgba(35,37,46,.25)',1.5)}
  c.save();c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();for(let i=0;i<=120;i++){const x=SPAN*i/120;i?c.lineTo(X(x),Y(y(x))):c.moveTo(X(x),Y(y(x)))}c.stroke();c.strokeStyle=C.ink2;c.lineWidth=1;c.beginPath();for(let i=0;i<=120;i++){const x=SPAN*i/120;i?c.lineTo(X(x),Y(y(x))+6):c.moveTo(X(x),Y(y(x))+6)}c.stroke();c.restore();
  D.line(c,X(0)-4,Y(p.h0),X(SPAN)+4,Y(p.h0),C.purple,1.2,[5,5]);D.text(c,L('مستوى البداية','start level'),X(SPAN/2),Y(p.h0)-9,{size:10,col:C.purple});
  const bx=X(s.x),byy=Y(y(s.x));const a=Math.atan(-dy(s.x)*ky/((x1-x0)/SPAN));
  D.circle(c,bx-Math.sin(a)*11,byy-Math.cos(a)*11,10,C.blue,C.ink,2);
  const tot=g*p.h0,PE=g*y(s.x),KE=.5*s.v*s.v,HE=Math.max(0,tot-PE-KE),bh=gy-70,bx0=W-bw-4,w3=(bw-16)/3;
  D.bar(c,bx0,44,w3,bh,PE/tot,C.blue,L('وضع','PE'),Math.round(PE/tot*100)+'%');
  D.bar(c,bx0+w3+6,44,w3,bh,KE/tot,C.green,L('حركة','KE'),Math.round(KE/tot*100)+'%');
  D.bar(c,bx0+2*(w3+6),44,w3,bh,HE/tot,C.red,L('حرارة','Heat'),Math.round(HE/tot*100)+'%');
  D.text(c,'v = '+f(s.v,2)+' m/s   ·   h = '+f(y(s.x),2)+' m',14,16,{size:12,align:'left',ltr:true,bold:true,col:C.blue})}},

/* 3 — Newton's 2nd law */
newton:{name:T('ادفع الجسم: القوة والكتلة والتسارع','Push the block: force, mass, acceleration'),
 ctl:[{k:'F',lab:T('القوة','Force'),min:0,max:20,step:1,v:10,unit:'N'},{k:'m',lab:T('الكتلة','Mass'),min:1,max:10,step:.5,v:2,unit:'kg'}],
 btns:[{k:'go',lab:T('ادفع ▶','Push ▶')},{k:'reset',lab:T('إعادة','Reset'),alt:1}],
 init(s){s.t=0;s.run=false;s.x=0},change(s){s.t=0;s.run=false;s.x=0},
 act(k,s){s.t=0;s.x=0;s.run=k==='go'},
 draw(c,W,H,dt,s,p){const a=p.F/p.m;if(s.run){s.t+=dt;s.x=.5*a*s.t*s.t;if(s.x>=10||s.t>=4){s.run=false;s.x=Math.min(s.x,10)}}
  const x0=40,x1=W-24,gy=H*.62,k=(x1-x0-60)/10,X=x=>x0+x*k;
  D.line(c,10,gy,W-10,gy,C.ink,2.5);
  const ry=gy+20;D.box(c,x0-6,ry,(x1-x0)-40,22,'#efe2bf',C.ink,3,1.5);for(let i=0;i<=10;i++){D.line(c,X(i),ry,X(i),ry+(i%5?7:12),C.ink,1.3);D.text(c,i+(i===10?' m':''),X(i),ry+16,{size:9,ltr:true,col:C.ink2})}
  const bs=26+Math.cbrt(p.m)*14,bx=X(s.x);
  D.box(c,bx,gy-bs,bs,bs,C.green,C.ink,4);D.text(c,p.m+' kg',bx+bs/2,gy-bs/2,{size:11,bold:true,col:'#fff',ltr:true});
  if(p.F>0){const al=10+p.F*3.2;D.arrow(c,bx-al-6,gy-bs/2,bx-4,gy-bs/2,C.red,3.2,11);D.text(c,'F = '+p.F+' N',bx-al/2-6,gy-bs/2-14,{size:11,bold:true,col:C.red,ltr:true})}
  if(s.run||s.t>0){const v=a*s.t;D.arrow(c,bx+bs/2,gy-bs-12,bx+bs/2+Math.min(80,v*6)+2,gy-bs-12,C.blue,2,8);D.text(c,'v = '+f(v,1)+' m/s',bx+bs/2,gy-bs-26,{size:10,col:C.blue,ltr:true})}
  D.text(c,'a = F / m = '+p.F+' / '+p.m+' = '+f(a,2)+' m/s²',14,18,{size:13,align:'left',ltr:true,bold:true,col:C.blue});
  D.text(c,'t = '+f(s.t,2)+' s    x = '+f(s.x,2)+' m',14,38,{size:11,align:'left',ltr:true,col:C.ink2});
  D.text(c,L('قوة أكبر ⇐ تسارع أكبر · كتلة أكبر ⇐ تسارع أقل','More force → more acceleration · more mass → less'),W/2,H-12,{size:10,col:C.purple})}},

/* 4 — pendulum */
pendulum:{name:T('البندول على الأرض والقمر والمشتري','Pendulum on Earth, Moon and Jupiter'),
 ctl:[{k:'L',lab:T('طول الخيط','Length'),min:.2,max:2,step:.05,v:1,unit:'m'},{k:'g',lab:T('الجاذبية','Gravity'),min:1.6,max:24.8,step:.1,v:9.8,unit:'m/s²'}],
 btns:[{k:'moon',lab:T('القمر','Moon'),alt:1},{k:'earth',lab:T('الأرض','Earth'),alt:1},{k:'jup',lab:T('المشتري','Jupiter'),alt:1}],
 init(s){s.t=0},change(s){s.t=0},
 act(k,s,p){p.g={moon:1.6,earth:9.8,jup:24.8}[k];s.t=0;const i=document.querySelectorAll('input[data-k="g"]');i.forEach(x=>{x.value=p.g;x.dispatchEvent(new Event('input'))})},
 draw(c,W,H,dt,s,p){s.t+=dt;const w=Math.sqrt(p.g/p.L),T0=2*Math.PI/w,th=.38*Math.cos(w*s.t);
  const px=W*.42,py=24,k=(H-80)/2.1,len=p.L*k,bx=px+Math.sin(th)*len,by=py+Math.cos(th)*len;
  D.line(c,px-60,py,px+60,py,C.ink,4);for(let i=-56;i<60;i+=10)D.line(c,px+i,py,px+i+7,py-7,C.ink2,1);
  c.save();c.strokeStyle='rgba(74,42,143,.25)';c.setLineDash([3,4]);c.beginPath();c.arc(px,py,len,Math.PI/2-.38,Math.PI/2+.38);c.stroke();c.restore();
  D.line(c,px,py+len,px,py,'rgba(35,37,46,.2)',1,[4,4]);
  D.line(c,px,py,bx,by,C.ink,1.8);D.circle(c,bx,by,11+p.L*2,C.gold,C.ink,2);
  const pl=p.g<2.5?L('🌙 القمر','🌙 Moon'):p.g<5?L('المريخ','Mars'):p.g<12?L('🌍 الأرض','🌍 Earth'):p.g>22?L('🪐 المشتري','🪐 Jupiter'):L('كوكب افتراضي','imaginary planet');
  const rx=W-14;D.text(c,pl,rx,22,{size:13,bold:true,align:'right'});
  D.text(c,'T = 2π √(L/g) = '+f(T0,2)+' s',rx,44,{size:12,align:'right',ltr:true,bold:true,col:C.blue});
  D.text(c,L('عدد الذبذبات: ','Swings: ')+Math.floor(s.t/T0),rx,64,{size:11,align:'right',col:C.green});
  D.text(c,'⏱ '+f(s.t,1)+' s',rx,82,{size:11,align:'right',ltr:true,col:C.ink2});
  D.text(c,L('الكتلة لا تغيّر الزمن الدوري!','Mass does not change the period!'),W/2,H-12,{size:10,col:C.purple})}},

/* 5 — waves */
wave:{name:T('موجة على حبل','A wave on a rope'),
 ctl:[{k:'f',lab:T('التردد','Frequency'),min:.3,max:3,step:.1,v:1,unit:'Hz'},{k:'v',lab:T('سرعة الموجة','Wave speed'),min:1,max:6,step:.5,v:3,unit:'m/s'},{k:'A',lab:T('السعة','Amplitude'),min:.1,max:1,step:.05,v:.5,unit:'m'}],
 init(s){s.t=0},
 draw(c,W,H,dt,s,p){s.t+=dt;const lam=p.v/p.f,x0=30,x1=W-14,span=10,k=(x1-x0)/span,cy=H*.48,ay=(H*.3);
  const y=x=>p.A*Math.sin(2*Math.PI*(x/lam-p.f*s.t));
  D.line(c,x0,cy,x1,cy,'rgba(35,37,46,.25)',1,[5,5]);
  c.save();c.strokeStyle=C.blue;c.lineWidth=3;c.beginPath();for(let i=0;i<=300;i++){const x=span*i/300;const X=x0+x*k,Y=cy-y(x)*ay;i?c.lineTo(X,Y):c.moveTo(X,Y)}c.stroke();c.restore();
  for(let x=0;x<=span;x+=.5)D.circle(c,x0+x*k,cy-y(x)*ay,2.5,C.ink);
  const mx=2;D.circle(c,x0+mx*k,cy-y(mx)*ay,6,C.red,C.ink,1.5);D.line(c,x0+mx*k,cy-ay*p.A-6,x0+mx*k,cy+ay*p.A+6,'rgba(200,70,60,.4)',1,[2,3]);
  D.box(c,6,cy-y(0)*ay-12,16,24,C.gold,C.ink,4);
  // wavelength bracket between two crests
  let n=Math.ceil(-(p.f*s.t+.25));let xc=lam*(p.f*s.t+.25+n);while(xc<.3)xc+=lam;
  if(xc+lam<=span){const X1=x0+xc*k,X2=x0+(xc+lam)*k,Yb=cy-ay*p.A-16;D.line(c,X1,Yb,X2,Yb,C.green,2);D.line(c,X1,Yb-5,X1,Yb+5,C.green,2);D.line(c,X2,Yb-5,X2,Yb+5,C.green,2);D.text(c,'λ = '+f(lam,2)+' m',(X1+X2)/2,Yb-11,{size:12,bold:true,col:C.green,ltr:true,bg:'rgba(246,241,228,.85)'})}
  else D.text(c,'λ = '+f(lam,2)+' m',W/2,cy-ay*p.A-26,{size:12,bold:true,col:C.green,ltr:true});
  for(let i=0;i<=10;i+=2)D.text(c,i+'m',x0+i*k,H-34,{size:9,col:C.ink2,ltr:true});
  D.text(c,'v = f λ  →  '+p.v+' = '+p.f+' × '+f(lam,2),14,18,{size:13,align:'left',ltr:true,bold:true,col:C.blue});
  D.text(c,L('النقطة الحمراء تتحرك لفوق وتحت فقط — الموجة هي اللي تنتقل','The red bead only moves up and down — the wave travels'),W/2,H-14,{size:10,col:C.purple})}},

/* 6 — Ohm's law */
ohm:{name:T('دائرة كهربائية: الجهد والتيار والمقاومة','A circuit: voltage, current, resistance'),
 ctl:[{k:'V',lab:T('الجهد','Voltage'),min:0,max:12,step:.5,v:6,unit:'V'},{k:'R',lab:T('المقاومة','Resistance'),min:1,max:60,step:1,v:10,unit:'Ω'}],
 init(s){s.ph=0},
 draw(c,W,H,dt,s,p){const I=p.V/p.R,P=p.V*I;s.ph+=dt*Math.min(4,I)*60;
  const l=40,r=W-40,t=40,b=H-56,per=2*((r-l)+(b-t));
  c.save();c.strokeStyle=C.ink;c.lineWidth=3;c.lineJoin='round';c.strokeRect(l,t,r-l,b-t);c.restore();
  // electrons
  for(let d=(s.ph%26);d<per;d+=26){let q=d,x,y;const w=r-l,h=b-t;if(q<w){x=r-q;y=t}else if((q-=w)<h){x=l;y=t+q}else if((q-=h)<w){x=l+q;y=b}else{q-=w;x=r;y=b-q}D.circle(c,x,y,3,p.V>0?C.blue:'#aaa')}
  // battery (left)
  const by=(t+b)/2;c.fillStyle=C.paper;c.fillRect(l-14,by-24,28,48);D.line(c,l-14,by-8,l+14,by-8,C.ink,3);D.line(c,l-7,by+8,l+7,by+8,C.ink,5);D.text(c,'+',l+20,by-12,{size:13,bold:true,ltr:true});D.text(c,p.V+' V',l+30,by+8,{size:12,bold:true,col:C.purple,ltr:true,align:'left'});
  // resistor (top) with heat glow
  const rx=(l+r)/2;const glow=Math.min(1,P/40);if(glow>0){const gr=c.createRadialGradient(rx,t,4,rx,t,60);gr.addColorStop(0,`rgba(255,140,40,${.55*glow})`);gr.addColorStop(1,'rgba(255,140,40,0)');c.fillStyle=gr;c.fillRect(rx-70,t-60,140,120)}
  c.fillStyle=C.paper;c.fillRect(rx-36,t-10,72,20);c.save();c.strokeStyle=glow>.5?'#b5401c':C.ink;c.lineWidth=2.6;c.beginPath();c.moveTo(rx-36,t);for(let i=0;i<8;i++)c.lineTo(rx-31+i*9,t+(i%2?8:-8));c.lineTo(rx+36,t);c.stroke();c.restore();D.text(c,p.R+' Ω',rx,t-20,{size:12,bold:true,ltr:true});
  // ammeter (bottom)
  const ax=(l+r)/2,ay=b,rng=I<=1?1:I<=5?5:15;D.circle(c,ax,ay,26,'#fff',C.ink,2.5);for(let i=0;i<=10;i++){const an=Math.PI*(1+i/10);D.line(c,ax+Math.cos(an)*22,ay+Math.sin(an)*22,ax+Math.cos(an)*18,ay+Math.sin(an)*18,C.ink,1)}
  const na=Math.PI*(1+Math.min(1,I/rng));D.line(c,ax,ay,ax+Math.cos(na)*20,ay+Math.sin(na)*20,C.red,2);D.text(c,'A',ax,ay+12,{size:10,bold:true,ltr:true});D.text(c,'0–'+rng+' A',ax+34,ay+14,{size:9,ltr:true,col:C.ink2,align:'left'});
  D.text(c,'I = V / R = '+p.V+' / '+p.R+' = '+f(I,3)+' A',W/2,(t+b)/2-8,{size:13,bold:true,col:C.blue,ltr:true});
  D.text(c,'P = V × I = '+f(P,2)+' W',W/2,(t+b)/2+14,{size:11,col:C.green,ltr:true});
  D.text(c,L('النقاط الزرقاء = الإلكترونات (تتحرك أسرع كل ما زاد التيار)','Blue dots = electrons (faster when the current is larger)'),W/2,H-12,{size:10,col:C.purple})}}
};

EB.register({id:'physics',ic:'⚡',c:['#1E44C8','#0B1F5E'],n:T('الفيزياء','Physics'),
 desc:T('الطاقة والقوة والحركة والموجات والكهرباء — اقرأ القانون، وبعدين جرّبه بيدك.','Energy, force, motion, waves and electricity — read the law, then try it yourself.'),
 sims,
 lessons:[
 {t:T('طاقة الوضع الجاذبية','Gravitational potential energy'),sim:'pe',
  p:T('كل جسم نرفعه لفوق يخزّن طاقة بسبب موقعه في مجال جاذبية الأرض. كل ما زادت كتلته أو ارتفاعه، زادت الطاقة المخزّنة فيه، وهذي الطاقة تتحوّل لحركة لما يطيح.','Anything we lift stores energy because of its position in Earth’s gravity. The heavier it is or the higher it goes, the more energy it stores — and that energy turns into motion when it falls.'),
  pts:[T('<b>m</b> الكتلة بالكيلوغرام (kg)','<b>m</b> mass in kilograms (kg)'),T('<b>g</b> تسارع الجاذبية ≈ 9.8 m/s² على الأرض','<b>g</b> gravitational acceleration ≈ 9.8 m/s² on Earth'),T('<b>h</b> الارتفاع بالمتر، والطاقة بالجول (J)','<b>h</b> height in metres; energy in joules (J)')],
  eq:'E<sub>p</sub> = m · g · h',eqn:T('ضاعف الارتفاع ← تتضاعف الطاقة','Double the height → double the energy'),
  q:T('رفعنا كتابًا كتلته 2 kg إلى رف ارتفاعه 1.5 m. كم طاقة الوضع؟','A 2 kg book is lifted onto a 1.5 m shelf. What is its potential energy?'),
  a:T('Eₚ = 2 × 9.8 × 1.5 = <b>29.4 J</b>','Eₚ = 2 × 9.8 × 1.5 = <b>29.4 J</b>')},
 {t:T('حفظ الطاقة','Conservation of energy'),sim:'coaster',
  p:T('الطاقة ما تنخلق ولا تفنى، تتحوّل من شكل لشكل. في قطار الملاهي: فوق تكون الطاقة «وضع»، وتحت تصير «حركة». ولو فيه احتكاك، جزء منها يتحوّل حرارة، فالقطار ما يرجع لنفس الارتفاع.','Energy is never created or destroyed — it changes form. On a roller coaster it is potential at the top and kinetic at the bottom. With friction, part of it becomes heat, so the car never climbs back as high.'),
  pts:[T('طاقة الحركة: <b>Eₖ = ½ m v²</b>','Kinetic energy: <b>Eₖ = ½ m v²</b>'),T('بدون احتكاك: مجموع الطاقتين ثابت دائمًا','Without friction the total stays constant'),T('السرعة تحت: <b>v = √(2gh)</b>','Speed at the bottom: <b>v = √(2gh)</b>')],
  eq:'E<sub>p</sub> + E<sub>k</sub> = const',
  q:T('كرة تنطلق من السكون على ارتفاع 5 m بدون احتكاك. كم سرعتها في أسفل المسار؟','A ball starts from rest 5 m high with no friction. How fast is it at the bottom?'),
  a:T('v = √(2 × 9.8 × 5) ≈ <b>9.9 m/s</b> — ولاحظ إن الكتلة ما أثّرت!','v = √(2 × 9.8 × 5) ≈ <b>9.9 m/s</b> — notice mass doesn’t matter!')},
 {t:T('قانون نيوتن الثاني','Newton’s second law'),sim:'newton',
  p:T('لما تدفع جسم، يتسارع. التسارع يزيد إذا زادت القوة، ويقل إذا زادت الكتلة. لهذا دفع عربة فاضية أسهل بكثير من عربة مليانة.','Push something and it accelerates. More force means more acceleration; more mass means less. That’s why an empty cart is so much easier to push than a full one.'),
  pts:[T('<b>F</b> القوة بالنيوتن (N)','<b>F</b> force in newtons (N)'),T('<b>a</b> التسارع بـ m/s²','<b>a</b> acceleration in m/s²'),T('1 N = القوة اللي تعطي 1 kg تسارع 1 m/s²','1 N gives 1 kg an acceleration of 1 m/s²')],
  eq:'F = m · a',eqn:T('أو: a = F ÷ m','or: a = F ÷ m'),
  q:T('قوة 10 N تؤثر على جسم كتلته 2 kg. كم تسارعه؟','A 10 N force acts on a 2 kg body. What is its acceleration?'),
  a:T('a = 10 ÷ 2 = <b>5 m/s²</b>','a = 10 ÷ 2 = <b>5 m/s²</b>')},
 {t:T('البندول البسيط','The simple pendulum'),sim:'pendulum',
  p:T('البندول كتلة معلّقة بخيط تتأرجح ذهابًا وإيابًا. الغريب إن زمن الذبذبة الواحدة يعتمد على طول الخيط والجاذبية فقط — مو على الكتلة! لهذا استُخدم البندول في الساعات القديمة.','A pendulum is a mass on a string swinging back and forth. Surprisingly, the time of one swing depends only on the length and gravity — not the mass. That’s why pendulums kept time in old clocks.'),
  pts:[T('<b>T</b> الزمن الدوري: وقت ذبذبة كاملة (s)','<b>T</b> period: time of one full swing (s)'),T('خيط أطول ← ذبذبة أبطأ','Longer string → slower swing'),T('جاذبية أقل (القمر) ← ذبذبة أبطأ','Weaker gravity (Moon) → slower swing')],
  eq:'T = 2π √(L / g)',eqn:T('صحيحة للزوايا الصغيرة','valid for small angles'),
  q:T('بندول طوله 1 m على الأرض. كم زمنه الدوري تقريبًا؟','A 1 m pendulum on Earth. What is its period, roughly?'),
  a:T('T = 2π √(1 ÷ 9.8) ≈ <b>2.0 s</b>','T = 2π √(1 ÷ 9.8) ≈ <b>2.0 s</b>')},
 {t:T('الموجات','Waves'),sim:'wave',
  p:T('الموجة اضطراب ينقل الطاقة من مكان لمكان بدون ما تنتقل المادة نفسها. لما تهزّ طرف حبل، كل نقطة فيه تطلع وتنزل، والشكل هو اللي يمشي. الصوت والضوء وموج البحر كلها موجات.','A wave is a disturbance that carries energy without carrying the material. Shake a rope: each point moves up and down while the shape travels along. Sound, light and sea waves are all waves.'),
  pts:[T('<b>f</b> التردد: عدد الموجات في الثانية (Hz)','<b>f</b> frequency: waves per second (Hz)'),T('<b>λ</b> الطول الموجي: المسافة بين قمتين (m)','<b>λ</b> wavelength: distance between crests (m)'),T('<b>v</b> سرعة انتشار الموجة (m/s)','<b>v</b> wave speed (m/s)')],
  eq:'v = f · λ',
  q:T('موجة صوت سرعتها 340 m/s وترددها 170 Hz. كم طولها الموجي؟','A sound wave travels at 340 m/s with a frequency of 170 Hz. What is its wavelength?'),
  a:T('λ = v ÷ f = 340 ÷ 170 = <b>2 m</b>','λ = v ÷ f = 340 ÷ 170 = <b>2 m</b>')},
 {t:T('قانون أوم','Ohm’s law'),sim:'ohm',
  p:T('البطارية تدفع الإلكترونات في الأسلاك (الجهد)، والمقاومة تعيقها. التيار هو كمية الشحنة اللي تمر كل ثانية. جهد أكبر يعني تيار أكبر، ومقاومة أكبر تعني تيار أقل.','A battery pushes electrons through wires (voltage) while a resistor holds them back. Current is how much charge flows each second. More voltage means more current; more resistance means less.'),
  pts:[T('<b>V</b> الجهد بالفولت (V)','<b>V</b> voltage in volts (V)'),T('<b>I</b> التيار بالأمبير (A)','<b>I</b> current in amperes (A)'),T('<b>R</b> المقاومة بالأوم (Ω)','<b>R</b> resistance in ohms (Ω)')],
  eq:'V = I · R',eqn:T('القدرة: P = V · I بالواط','Power: P = V · I in watts'),
  q:T('بطارية 9 V موصولة بمقاومة 3 Ω. كم التيار؟','A 9 V battery is connected to a 3 Ω resistor. What is the current?'),
  a:T('I = 9 ÷ 3 = <b>3 A</b>','I = 9 ÷ 3 = <b>3 A</b>')}
 ]});
})();
