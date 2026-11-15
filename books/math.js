/* كتاب الرياضيات التفاعلي — Eilan Doll Academy */
(()=>{const {C,D}=EB,L=EB.L,T=(ar,en)=>({ar,en}),f=D.fmt,PI=Math.PI;
const frame=(W,H,xr,yr,top=34)=>{const s=Math.min((W-30)/(2*xr),(H-top-14)/(2*yr));return{s,ox:W/2,oy:top+(H-top-14)/2}};

const sims={
linear:{name:T('حرّك الميل والمقطع','Move the slope and intercept'),
 ctl:[{k:'m',lab:T('الميل m','Slope m'),min:-3,max:3,step:.25,v:1},{k:'b',lab:T('المقطع b','Intercept b'),min:-5,max:5,step:.5,v:1}],
 draw(c,W,H,dt,s,p){const{s:k,ox,oy}=frame(W,H,6,6);D.axes(c,ox,oy,-6,-6,6,6,k,k,{tick:2});
  D.plot(c,x=>p.m*x+p.b,-6,6,ox,oy,k,k,C.blue,3.2,-6.3,6.3);
  const y1=p.m+p.b,y2=2*p.m+p.b;if(Math.abs(y1)<6&&Math.abs(y2)<6){D.line(c,ox+k,oy-y1*k,ox+2*k,oy-y1*k,C.green,2);D.line(c,ox+2*k,oy-y1*k,ox+2*k,oy-y2*k,C.purple,2);D.text(c,'1',ox+1.5*k,oy-y1*k+(p.m>=0?10:-10),{size:11,col:C.green,bold:true,ltr:true});D.text(c,'m = '+p.m,ox+2*k+8,oy-(y1+y2)/2*k,{size:11,col:C.purple,bold:true,ltr:true,align:'left',bg:'rgba(246,241,228,.85)'})}
  D.circle(c,ox,oy-p.b*k,5.5,C.gold,C.ink,1.5);D.text(c,'(0, '+p.b+')',ox-8,oy-p.b*k-12,{size:11,ltr:true,align:'right',bold:true});
  if(p.m!==0){const xr=-p.b/p.m;if(Math.abs(xr)<6){D.circle(c,ox+xr*k,oy,4.5,C.red);D.text(c,'x = '+f(xr,2),ox+xr*k,oy+18,{size:10,col:C.red,ltr:true,bg:'rgba(246,241,228,.85)'})}}
  D.text(c,'y = '+p.m+'x '+(p.b<0?'− '+(-p.b):'+ '+p.b),14,16,{size:14,align:'left',ltr:true,bold:true,col:C.blue});
  D.text(c,p.m>0?L('↗ متزايدة','↗ increasing'):p.m<0?L('↘ متناقصة','↘ decreasing'):L('→ ثابتة','→ constant'),W-14,16,{size:12,align:'right',col:C.purple,bold:true})}},
quad:{name:T('القطع المكافئ: الرأس والجذور','The parabola: vertex and roots'),
 ctl:[{k:'a',lab:T('a','a'),min:-2,max:2,step:.1,v:1},{k:'b',lab:T('b','b'),min:-6,max:6,step:.5,v:-2},{k:'c',lab:T('c','c'),min:-6,max:6,step:.5,v:-3}],
 draw(c,W,H,dt,s,p){const{s:k,ox,oy}=frame(W,H,6,7);D.axes(c,ox,oy,-6,-7,6,7,k,k,{tick:2});
  const a=Math.abs(p.a)<.05?0:p.a;D.plot(c,x=>a*x*x+p.b*x+p.c,-6,6,ox,oy,k,k,C.blue,3.2,-7.3,7.3);
  const dl=p.b*p.b-4*a*p.c;let info='';
  if(a){const h=-p.b/(2*a),kv=a*h*h+p.b*h+p.c;if(Math.abs(h)<6&&Math.abs(kv)<7){D.line(c,ox+h*k,oy+7*k,ox+h*k,oy-7*k,'rgba(74,42,143,.35)',1.2,[4,4]);D.circle(c,ox+h*k,oy-kv*k,6,C.purple,C.ink,1.5);D.text(c,L('الرأس','vertex')+' ('+f(h,2)+', '+f(kv,2)+')',ox+h*k,oy-kv*k+(a>0?20:-18),{size:11,col:C.purple,bold:true,bg:'rgba(246,241,228,.88)'})}
   if(dl>=0){[(-p.b-Math.sqrt(dl))/(2*a),(-p.b+Math.sqrt(dl))/(2*a)].forEach(x=>{if(Math.abs(x)<6)D.circle(c,ox+x*k,oy,5,C.red,C.ink,1.2)})}
   info=dl>0?L('جذران حقيقيان','two real roots'):dl===0?L('جذر واحد مكرر','one repeated root'):L('لا توجد جذور حقيقية','no real roots')}
  else info=L('a = 0 ← صارت خطية','a = 0 → it is linear');
  const sg=v=>v<0?'− '+f(-v,2):'+ '+f(v,2);D.text(c,'y = '+f(a,2)+'x² '+sg(p.b)+'x '+sg(p.c),14,16,{size:13,align:'left',ltr:true,bold:true,col:C.blue});
  D.text(c,'Δ = b² − 4ac = '+f(dl,2),W-14,16,{size:12,align:'right',ltr:true,bold:true,col:dl<0?C.red:C.green});D.text(c,info,W-14,34,{size:11,align:'right',col:C.ink2})}},
pyth:{name:T('المربعات على أضلاع المثلث','Squares on the sides of a triangle'),
 ctl:[{k:'a',lab:T('الضلع a','Side a'),min:1,max:8,step:1,v:3},{k:'b',lab:T('الضلع b','Side b'),min:1,max:8,step:1,v:4}],
 draw(c,W,H,dt,s,p){const a=p.a,b=p.b,cc=Math.hypot(a,b),pw=W*.66,k=Math.min((pw-20)/(a+2*b),(H-24)/(2*a+b));
  const ox=10+b*k+((pw-20)-(a+2*b)*k)/2,oy=12+(b+a)*k+((H-24)-(2*a+b)*k)/2,P=(x,y)=>[ox+x*k,oy-y*k];
  const poly=(pts,fill)=>{c.beginPath();pts.forEach((q,i)=>{const[X,Y]=P(...q);i?c.lineTo(X,Y):c.moveTo(X,Y)});c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=C.ink;c.lineWidth=2;c.stroke()};
  poly([[0,0],[a,0],[a,-a],[0,-a]],'rgba(30,68,200,.22)');poly([[0,0],[0,b],[-b,b],[-b,0]],'rgba(15,107,68,.22)');poly([[a,0],[0,b],[b,a+b],[a+b,a]],'rgba(201,162,39,.28)');
  c.save();c.strokeStyle='rgba(35,37,46,.18)';c.lineWidth=1;for(let i=1;i<a;i++){let[X1,Y1]=P(i,0),[X2,Y2]=P(i,-a);D.line(c,X1,Y1,X2,Y2,'rgba(35,37,46,.18)',1);[X1,Y1]=P(0,-i);[X2,Y2]=P(a,-i);D.line(c,X1,Y1,X2,Y2,'rgba(35,37,46,.18)',1)}for(let i=1;i<b;i++){let[X1,Y1]=P(-i,0),[X2,Y2]=P(-i,b);D.line(c,X1,Y1,X2,Y2,'rgba(35,37,46,.18)',1);[X1,Y1]=P(0,i);[X2,Y2]=P(-b,i);D.line(c,X1,Y1,X2,Y2,'rgba(35,37,46,.18)',1)}c.restore();
  poly([[0,0],[a,0],[0,b]],'#fffaf0');const[rx,ry]=P(0,0);c.strokeStyle=C.ink;c.lineWidth=1.5;c.strokeRect(rx,ry-10,10,10);
  let[X,Y]=P(a/2,-a/2);D.text(c,'a² = '+a*a,X,Y,{size:13,bold:true,col:C.blue,ltr:true});[X,Y]=P(-b/2,b/2);D.text(c,'b² = '+b*b,X,Y,{size:13,bold:true,col:C.green,ltr:true});[X,Y]=P((a+b)/2,(a+b)/2);D.text(c,'c² = '+f(cc*cc,2),X,Y,{size:13,bold:true,col:'#7a5d00',ltr:true});
  [X,Y]=P(a/2,0);D.text(c,'a',X,Y-9,{size:12,ltr:true,bold:true});[X,Y]=P(0,b/2);D.text(c,'b',X+9,Y,{size:12,ltr:true,bold:true});[X,Y]=P(a/2,b/2);D.text(c,'c',X+8,Y+8,{size:12,ltr:true,bold:true});
  const tx=W-12;D.text(c,a*a+' + '+b*b+' = '+f(cc*cc,2),tx,H/2-26,{size:15,align:'right',ltr:true,bold:true});D.text(c,'c = √'+f(cc*cc,2)+' = '+f(cc,3),tx,H/2,{size:14,align:'right',ltr:true,bold:true,col:'#7a5d00'});
  D.text(c,Number.isInteger(+cc.toFixed(6))?L('✓ ثلاثية فيثاغورية!','✓ A Pythagorean triple!'):L('جرّب 3 و 4، أو 6 و 8','Try 3 & 4, or 6 & 8'),tx,H/2+26,{size:11,align:'right',col:C.purple,bold:true})}},
unit:{name:T('دائرة الوحدة والجيب وجيب التمام','Unit circle, sine and cosine'),
 ctl:[{k:'th',lab:T('الزاوية θ','Angle θ'),min:0,max:360,step:1,v:30,unit:'°'}],
 btns:[{k:'spin',lab:T('دوّر ⟳','Spin ⟳')},{k:'stop',lab:T('إيقاف','Stop'),alt:1}],
 act(k,s){s.spin=k==='spin'},
 draw(c,W,H,dt,s,p){if(s.spin){p.th=(p.th+dt*40)%360;document.querySelectorAll('input[data-k="th"]').forEach(i=>{i.value=Math.round(p.th);const o=i.closest('label').querySelector('b');if(o)o.textContent=Math.round(p.th)+' °'})}
  const R=Math.min(H*.36,W*.24),cx=R+26,cy=H/2+6,th=p.th*PI/180,px=cx+R*Math.cos(th),py=cy-R*Math.sin(th);
  D.line(c,cx-R-12,cy,cx+R+12,cy,C.ink2,1.2);D.line(c,cx,cy-R-12,cx,cy+R+12,C.ink2,1.2);D.circle(c,cx,cy,R,null,C.ink,2);
  c.save();c.fillStyle='rgba(74,42,143,.15)';c.beginPath();c.moveTo(cx,cy);c.arc(cx,cy,R*.28,0,-th,true);c.closePath();c.fill();c.restore();
  D.line(c,cx,cy,px,py,C.ink,2.4);D.line(c,cx,cy,px,cy,C.blue,4);D.line(c,px,cy,px,py,C.green,4);D.circle(c,px,py,6,C.gold,C.ink,1.5);
  D.text(c,'cos',(cx+px)/2,cy+(Math.sin(th)>=0?13:-13),{size:11,col:C.blue,bold:true,ltr:true});D.text(c,'sin',px+(Math.cos(th)>=0?16:-16),(cy+py)/2,{size:11,col:C.green,bold:true,ltr:true});
  const gx0=cx+R+30,gx1=W-14,gk=(gx1-gx0)/360;D.line(c,gx0,cy,gx1,cy,C.ink2,1.2);D.line(c,gx0,cy-R,gx0,cy+R,C.ink2,1);
  [90,180,270,360].forEach(a=>D.text(c,a+'°',gx0+a*gk,cy+14,{size:9,ltr:true,col:C.ink2}));
  c.save();c.strokeStyle='rgba(15,107,68,.35)';c.lineWidth=2;c.beginPath();for(let a=0;a<=360;a+=3){const X=gx0+a*gk,Y=cy-R*Math.sin(a*PI/180);a?c.lineTo(X,Y):c.moveTo(X,Y)}c.stroke();c.strokeStyle=C.green;c.lineWidth=3;c.beginPath();for(let a=0;a<=p.th;a+=2){const X=gx0+a*gk,Y=cy-R*Math.sin(a*PI/180);a?c.lineTo(X,Y):c.moveTo(X,Y)}c.stroke();c.restore();
  D.line(c,px,py,gx0+p.th*gk,py,'rgba(201,162,39,.7)',1.2,[3,4]);D.circle(c,gx0+p.th*gk,py,5,C.green);
  D.text(c,'sin '+Math.round(p.th)+'° = '+f(Math.sin(th),3)+'    cos '+Math.round(p.th)+'° = '+f(Math.cos(th),3),14,16,{size:12,align:'left',ltr:true,bold:true,col:C.ink})}},
vectors:{name:T('ركّب متجهين وشوف المحصلة','Combine two vectors'),
 ctl:[{k:'a',lab:T('طول A','|A|'),min:1,max:6,step:.5,v:4},{k:'aa',lab:T('اتجاه A','Angle A'),min:0,max:360,step:5,v:20,unit:'°'},{k:'b',lab:T('طول B','|B|'),min:1,max:6,step:.5,v:3},{k:'ba',lab:T('اتجاه B','Angle B'),min:0,max:360,step:5,v:110,unit:'°'}],
 draw(c,W,H,dt,s,p){const k=Math.min(W/2-16,H/2-24)/8,ox=W/2,oy=H/2+10;D.grid(c,8,30,W-16,H-38,k);D.line(c,8,oy,W-8,oy,C.ink2,1);D.line(c,ox,30,ox,H-8,C.ink2,1);
  const r=d=>d*PI/180,Ax=p.a*Math.cos(r(p.aa)),Ay=p.a*Math.sin(r(p.aa)),Bx=p.b*Math.cos(r(p.ba)),By=p.b*Math.sin(r(p.ba)),Rx=Ax+Bx,Ry=Ay+By,X=x=>ox+x*k,Y=y=>oy-y*k;
  D.line(c,X(Bx),Y(By),X(Rx),Y(Ry),'rgba(30,68,200,.35)',1.5,[5,5]);D.line(c,X(Ax),Y(Ay),X(Rx),Y(Ry),'rgba(15,107,68,.35)',1.5,[5,5]);
  D.arrow(c,X(0),Y(0),X(Ax),Y(Ay),C.blue,3.2,12);D.arrow(c,X(0),Y(0),X(Bx),Y(By),C.green,3.2,12);D.arrow(c,X(0),Y(0),X(Rx),Y(Ry),C.purple,4,14);
  D.text(c,'A',X(Ax*1.08)+4,Y(Ay*1.08),{size:13,bold:true,col:C.blue,ltr:true});D.text(c,'B',X(Bx*1.08)+4,Y(By*1.08),{size:13,bold:true,col:C.green,ltr:true});D.text(c,'R',X(Rx)+10,Y(Ry)-8,{size:13,bold:true,col:C.purple,ltr:true});
  const Rm=Math.hypot(Rx,Ry),Ra=(Math.atan2(Ry,Rx)*180/PI+360)%360;
  D.text(c,'|R| = '+f(Rm,2)+'   θ = '+f(Ra,1)+'°',14,14,{size:13,align:'left',ltr:true,bold:true,col:C.purple});
  D.text(c,'R = ('+f(Rx,2)+', '+f(Ry,2)+')',W-14,14,{size:11,align:'right',ltr:true,col:C.ink2})}},
circle:{name:T('قطّع الدائرة وافردها','Slice the circle and unroll it'),
 ctl:[{k:'n',lab:T('عدد القطع','Slices'),min:4,max:40,step:2,v:12},{k:'u',lab:T('افرد الدائرة','Unroll'),min:0,max:1,step:.01,v:0,fmt:v=>Math.round(v*100)+'%'}],
 btns:[{k:'play',lab:T('شغّل الحركة ▶','Animate ▶')}],
 act(k,s,p){s.anim=true;s.dir=p.u>.5?-1:1},
 draw(c,W,H,dt,s,p){if(s.anim){p.u=Math.max(0,Math.min(1,p.u+s.dir*dt*.45));if(p.u===0||p.u===1)s.anim=false;document.querySelectorAll('input[data-k="u"]').forEach(i=>{i.value=p.u;const o=i.closest('label').querySelector('b');if(o)o.textContent=Math.round(p.u*100)+'%'})}
  const n=p.n,r=Math.min((W-40)/(PI+.7),(H-80)/2.25),half=PI/n,w=2*PI*r/n,u=p.u*p.u*(3-2*p.u);
  const cx=W/2,cy=H/2+4,rowW=n/2*w+w/2,rx0=cx-rowW/2,top=cy-r/2;
  for(let i=0;i<n;i++){const bis0=(i+.5)*2*half,ax0=cx,ay0=cy;const even=i%2===0;const ax1=rx0+(i+1)*w/2-(even?0:0),ay1=even?top:top+r,bis1=even?PI/2:-PI/2;
   let d=bis1-bis0;d=Math.atan2(Math.sin(d),Math.cos(d));const bis=bis0+d*u,ax=ax0+(ax1-ax0)*u,ay=ay0+(ay1-ay0)*u;
   c.beginPath();c.moveTo(ax,ay);c.arc(ax,ay,r,bis-half,bis+half);c.closePath();c.fillStyle=i<n/2?'rgba(30,68,200,.55)':'rgba(201,162,39,.6)';if(even)c.fillStyle=i<n/2?'rgba(30,68,200,.55)':'rgba(30,68,200,.55)';else c.fillStyle='rgba(201,162,39,.65)';c.fill();c.strokeStyle=C.ink;c.lineWidth=1.3;c.stroke()}
  if(u>.85){const al=(u-.85)/.15;c.globalAlpha=al;D.line(c,rx0+w/4,top+r+14,rx0+rowW-w/4,top+r+14,C.purple,2);D.text(c,L('نصف المحيط = πr','half the circumference = πr'),cx,top+r+28,{size:12,bold:true,col:C.purple});D.line(c,rx0-10,top,rx0-10,top+r,C.green,2);D.text(c,'r',rx0-20,top+r/2,{size:13,bold:true,col:C.green,ltr:true});c.globalAlpha=1}
  else{D.line(c,cx,cy,cx+r,cy,C.green,2);D.text(c,'r',cx+r/2,cy-9,{size:13,bold:true,col:C.green,ltr:true})}
  D.text(c,u>.85?'A ≈ πr × r = πr²':'A = π r²',14,16,{size:14,align:'left',ltr:true,bold:true,col:C.blue});D.text(c,L('كل ما زادت القطع صار الشكل مستطيل أكثر','More slices → closer to a rectangle'),W-14,16,{size:10,align:'right',col:C.ink2})}}
};

EB.register({id:'math',ic:'📐',c:['#0F6B44','#0B1F5E'],n:T('الرياضيات','Mathematics'),
 desc:T('الدوال والهندسة والمثلثات والمتجهات — كل قانون تشوفه يتحرك وتفهم من وين جا.','Functions, geometry, trigonometry and vectors — see every rule move and understand where it comes from.'),
 sims,
 lessons:[
 {t:T('الدالة الخطية','Linear functions'),sim:'linear',
  p:T('الدالة الخطية رسمها خط مستقيم. الميل يحدد قد إيش الخط مايل وفي أي اتجاه، والمقطع هو النقطة اللي يقطع فيها الخط محور y.','A linear function draws a straight line. The slope says how steep it is and which way it goes; the intercept is where it crosses the y-axis.'),
  pts:[T('<b>m</b> الميل = التغير في y ÷ التغير في x','<b>m</b> slope = change in y ÷ change in x'),T('<b>b</b> المقطع الصادي: قيمة y عند x = 0','<b>b</b> y-intercept: the value of y when x = 0'),T('ميل موجب يطلع، ميل سالب ينزل','Positive slope rises, negative slope falls')],
  eq:'y = m x + b',eqn:T('m = (y₂ − y₁) ÷ (x₂ − x₁)','m = (y₂ − y₁) ÷ (x₂ − x₁)'),
  q:T('ما ميل الخط المار بالنقطتين (0, 1) و(2, 5)؟','What is the slope of the line through (0, 1) and (2, 5)?'),a:T('m = (5 − 1) ÷ (2 − 0) = <b>2</b>','m = (5 − 1) ÷ (2 − 0) = <b>2</b>')},
 {t:T('الدالة التربيعية','Quadratic functions'),sim:'quad',
  p:T('رسمها منحنى اسمه «القطع المكافئ» مثل مسار الكرة لما ترميها. إشارة a تحدد إذا كان مفتوح لفوق أو لتحت، والمميّز Δ يقول لك كم جذر للمعادلة.','Its graph is a curve called a parabola — like the path of a thrown ball. The sign of a says whether it opens up or down, and the discriminant Δ tells you how many roots it has.'),
  pts:[T('الرأس عند <b>x = −b ÷ 2a</b>','Vertex at <b>x = −b ÷ 2a</b>'),T('Δ > 0 جذران · Δ = 0 جذر واحد · Δ < 0 لا جذور حقيقية','Δ > 0 two roots · Δ = 0 one root · Δ < 0 no real roots'),T('الجذور: <b>x = (−b ± √Δ) ÷ 2a</b>','Roots: <b>x = (−b ± √Δ) ÷ 2a</b>')],
  eq:'y = a x² + b x + c',eqn:T('Δ = b² − 4ac','Δ = b² − 4ac'),
  q:T('كم جذرًا حقيقيًا للمعادلة x² − 4x + 4 = 0؟','How many real roots does x² − 4x + 4 = 0 have?'),a:T('Δ = 16 − 16 = 0 ← <b>جذر واحد مكرر x = 2</b>','Δ = 16 − 16 = 0 → <b>one repeated root, x = 2</b>')},
 {t:T('نظرية فيثاغورس','The Pythagorean theorem'),sim:'pyth',
  p:T('في أي مثلث قائم الزاوية: مساحة المربع المرسوم على الوتر تساوي مجموع مساحتي المربعين على الضلعين الآخرين. بهذي الفكرة نحسب أي ضلع ناقص.','In any right triangle, the square on the hypotenuse has the same area as the two squares on the other sides together. With this we can find any missing side.'),
  pts:[T('<b>c</b> الوتر: أطول ضلع، مقابل الزاوية القائمة','<b>c</b> hypotenuse: the longest side, opposite the right angle'),T('<b>a</b> و<b>b</b> ضلعا القائمة','<b>a</b> and <b>b</b> are the legs'),T('أشهر ثلاثية: 3، 4، 5','Most famous triple: 3, 4, 5')],
  eq:'a² + b² = c²',
  q:T('ضلعا القائمة 6 و 8. كم طول الوتر؟','The legs are 6 and 8. How long is the hypotenuse?'),a:T('c = √(36 + 64) = √100 = <b>10</b>','c = √(36 + 64) = √100 = <b>10</b>')},
 {t:T('دائرة الوحدة','The unit circle'),sim:'unit',
  p:T('دائرة نصف قطرها 1. لما تدور نقطة عليها بزاوية θ، يكون بعدها الأفقي هو cos θ وبعدها الرأسي هو sin θ. ولو رسمت الارتفاع مع الزمن يطلع لك منحنى الجيب.','A circle of radius 1. As a point turns by an angle θ, its horizontal position is cos θ and its vertical position is sin θ. Plot the height over time and you get the sine wave.'),
  pts:[T('sin 0° = 0 · sin 90° = 1','sin 0° = 0 · sin 90° = 1'),T('cos 0° = 1 · cos 90° = 0','cos 0° = 1 · cos 90° = 0'),T('القيم دائمًا بين −1 و 1','Values always lie between −1 and 1')],
  eq:'sin²θ + cos²θ = 1',eqn:T('هي نفسها فيثاغورس داخل الدائرة!','It is Pythagoras inside the circle!'),
  q:T('كم قيمة sin 30°؟','What is sin 30°?'),a:T('<b>0.5</b> — جرّبها على التجربة!','<b>0.5</b> — try it in the experiment!')},
 {t:T('جمع المتجهات','Adding vectors'),sim:'vectors',
  p:T('المتجه كمية لها مقدار واتجاه، مثل السرعة والقوة. نجمع متجهين بوضع ذيل الثاني عند رأس الأول، والمحصلة سهم من البداية للنهاية.','A vector has size and direction, like velocity or force. To add two vectors, put the tail of the second at the head of the first — the result goes from start to finish.'),
  pts:[T('نجمع المركبات: <b>Rₓ = Aₓ + Bₓ</b> و <b>Rᵧ = Aᵧ + Bᵧ</b>','Add components: <b>Rₓ = Aₓ + Bₓ</b>, <b>Rᵧ = Aᵧ + Bᵧ</b>'),T('Aₓ = |A| cos θ · Aᵧ = |A| sin θ','Aₓ = |A| cos θ · Aᵧ = |A| sin θ'),T('متجهين بنفس الاتجاه ← أكبر محصلة','Same direction → biggest result')],
  eq:'R = A + B',eqn:T('|R| = √(Rₓ² + Rᵧ²)','|R| = √(Rₓ² + Rᵧ²)'),
  q:T('مشيت 3 km شرقًا ثم 4 km شمالًا. كم بعدك عن نقطة البداية؟','You walk 3 km east then 4 km north. How far are you from the start?'),a:T('|R| = √(3² + 4²) = <b>5 km</b>','|R| = √(3² + 4²) = <b>5 km</b>')},
 {t:T('مساحة الدائرة','Area of a circle'),sim:'circle',
  p:T('من وين جت πr²؟ قطّع الدائرة لقطع صغيرة مثل البيتزا ورتّبها فوق وتحت. كل ما زادت القطع يصير الشكل مستطيل طوله نصف المحيط (πr) وعرضه نصف القطر (r).','Where does πr² come from? Slice the circle like a pizza and arrange the slices up and down. With more slices it becomes a rectangle: half the circumference (πr) long and one radius (r) tall.'),
  pts:[T('المحيط = 2πr','Circumference = 2πr'),T('π ≈ 3.14159…','π ≈ 3.14159…'),T('مساحة المستطيل = الطول × العرض','Rectangle area = length × width')],
  eq:'A = π r²',
  q:T('دائرة نصف قطرها 3 cm. كم مساحتها؟','A circle has radius 3 cm. What is its area?'),a:T('A = π × 3² = 9π ≈ <b>28.3 cm²</b>','A = π × 3² = 9π ≈ <b>28.3 cm²</b>')}
 ]});
})();
