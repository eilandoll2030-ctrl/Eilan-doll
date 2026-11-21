/* كتاب الأحياء التفاعلي — Eilan Doll Academy */
(()=>{const {C,D}=EB,L=EB.L,T=(ar,en)=>({ar,en}),f=D.fmt,PI=Math.PI;
const ORG={nuc:[T('النواة','Nucleus'),T('مركز التحكم: فيها DNA اللي يحمل التعليمات الوراثية','Control centre: holds the DNA with the genetic instructions')],
 mito:[T('الميتوكوندريا','Mitochondria'),T('محطة الطاقة: تنتج الطاقة (ATP) من الغذاء بالتنفس الخلوي','Powerhouse: makes energy (ATP) from food by cellular respiration')],
 mem:[T('الغشاء الخلوي','Cell membrane'),T('الحارس: يتحكم في اللي يدخل ويطلع من الخلية','Gatekeeper: controls what enters and leaves the cell')],
 ribo:[T('الرايبوسومات','Ribosomes'),T('مصانع صغيرة تبني البروتينات','Tiny factories that build proteins')],
 er:[T('الشبكة الإندوبلازمية','Endoplasmic reticulum'),T('شبكة أنابيب تنقل البروتينات وتصنع الدهون','A network of tubes that moves proteins and makes lipids')],
 golgi:[T('جهاز جولجي','Golgi apparatus'),T('مكتب البريد: يغلّف المواد ويرسلها لوجهتها','The post office: packages materials and ships them')]};

const sims={
cell:{name:T('جولة داخل الخلية','A tour inside the cell'),
 btns:Object.keys(ORG).map(k=>({k,lab:ORG[k][0],alt:1})),
 init(s){s.sel='nuc'},act(k,s){s.sel=k},
 draw(c,W,H,dt,s,p,t){const cx=W/2,cy=H/2-6,rx=Math.min(W*.44,H*.62),ry=Math.min(H*.36,rx*.72),on=k=>s.sel===k,hl=(k,base)=>on(k)?base:'rgba(35,37,46,.75)';
  c.save();c.beginPath();for(let i=0;i<=60;i++){const a=i/60*2*PI,w=1+.04*Math.sin(a*5+t*.8);i?c.lineTo(cx+Math.cos(a)*rx*w,cy+Math.sin(a)*ry*w):c.moveTo(cx+Math.cos(a)*rx*w,cy+Math.sin(a)*ry*w)}c.closePath();c.fillStyle='rgba(127,196,160,.18)';c.fill();c.lineWidth=on('mem')?6:3;c.strokeStyle=on('mem')?C.green:C.ink;c.stroke();c.restore();
  const nx=cx-rx*.12,ny=cy-ry*.05,nr=ry*.42;
  c.save();c.strokeStyle=hl('er',C.purple);c.lineWidth=on('er')?3:1.8;for(let j=0;j<3;j++){c.beginPath();for(let a=-1.2;a<=1.2;a+=.05){const r=nr+12+j*9+Math.sin(a*9+j)*3;c.lineTo(nx+Math.cos(a+PI)*r,ny+Math.sin(a+PI)*r)}c.stroke()}c.restore();
  D.circle(c,nx,ny,nr,on('nuc')?'rgba(74,42,143,.35)':'rgba(74,42,143,.15)',on('nuc')?C.purple:C.ink,on('nuc')?4:2);D.circle(c,nx+nr*.2,ny-nr*.1,nr*.3,'rgba(74,42,143,.45)');
  const mito=(x,y,a)=>{c.save();c.translate(x,y);c.rotate(a);c.beginPath();c.ellipse(0,0,ry*.22,ry*.1,0,0,2*PI);c.fillStyle=on('mito')?'rgba(200,70,60,.4)':'rgba(200,70,60,.18)';c.fill();c.lineWidth=on('mito')?3:1.6;c.strokeStyle=on('mito')?C.red:C.ink;c.stroke();c.beginPath();for(let i=-3;i<=3;i++){c.moveTo(i*ry*.055,-ry*.07);c.quadraticCurveTo(i*ry*.055+ry*.03,0,i*ry*.055,ry*.07)}c.lineWidth=1;c.stroke();c.restore()};
  mito(cx+rx*.5,cy-ry*.35,.4);mito(cx+rx*.55,cy+ry*.35,-.3);mito(cx-rx*.62,cy+ry*.45,.9);
  const gx=cx+rx*.22,gy=cy+ry*.12;c.save();c.strokeStyle=hl('golgi',C.gold);c.lineWidth=on('golgi')?4:2.4;for(let i=0;i<4;i++){c.beginPath();c.arc(gx,gy+i*7+20,ry*.18-i*2,PI*1.15,PI*1.85);c.stroke()}c.restore();
  const rr=EB.rand(3);for(let i=0;i<46;i++){const a=rr()*2*PI,d=.25+rr()*.68,x=cx+Math.cos(a)*rx*d,y=cy+Math.sin(a)*ry*d;if(Math.hypot(x-nx,y-ny)<nr+6)continue;D.circle(c,x,y,on('ribo')?3.4:2,on('ribo')?C.blue:C.ink)}
  const o=ORG[s.sel];D.text(c,L(o[0]),14,16,{size:14,align:'left',bold:true,col:C.purple});D.text(c,L(o[1]),W/2,H-12,{size:11,col:C.ink,bg:'rgba(255,255,255,.75)'})}},
eye:{name:T('ركّز العين على جسم قريب وبعيد','Focus the eye near and far'),
 ctl:[{k:'d',lab:T('بُعد الجسم','Object distance'),min:.15,max:6,step:.05,v:.5,unit:'m'},{k:'P',lab:T('قوة العدسة','Lens power'),min:58,max:66,step:.1,v:59.5,unit:'D'}],
 btns:[{k:'auto',lab:T('ركّز تلقائي 👁','Auto-focus 👁')}],
 act(k,s,p){s.target=1/p.d+1/.017},
 draw(c,W,H,dt,s,p){if(s.target){p.P+=(s.target-p.P)*Math.min(1,dt*4);if(Math.abs(s.target-p.P)<.02){p.P=Math.round(s.target*10)/10;s.target=0}document.querySelectorAll('input[data-k="P"]').forEach(i=>{i.value=p.P;const b=i.closest('label').querySelector('b');if(b)b.textContent=f(p.P,1)+' D'})}
  const need=1/p.d+1/.017,di=1/Math.max(.01,p.P-1/p.d),er=Math.min(H*.36,W*.24),ecx=W-er-24,cy=H/2+4,lx=ecx-er*.62,k=(er*1.5)/.017,rx=lx+.017*k,fx=lx+di*k;
  D.circle(c,ecx,cy,er,'#fff',C.ink,2.5);c.save();c.beginPath();c.arc(ecx,cy,er-4,-PI/2.6,PI/2.6);c.strokeStyle=C.red;c.lineWidth=4;c.stroke();c.restore();
  c.save();c.beginPath();c.arc(ecx-er*.95,cy,er*.42,-1.1,1.1);c.strokeStyle='rgba(30,68,200,.5)';c.lineWidth=2;c.stroke();c.restore();
  const th=6+(p.P-58)*2.4;c.save();c.beginPath();c.ellipse(lx,cy,th,er*.38,0,0,2*PI);c.fillStyle='rgba(143,167,240,.55)';c.fill();c.strokeStyle=C.blue;c.lineWidth=2;c.stroke();c.restore();
  D.line(c,lx,cy-er*.42,lx,cy-er*.55,C.green,3);D.line(c,lx,cy+er*.42,lx,cy+er*.55,C.green,3);
  const ox=24;D.line(c,ox,cy,ox,cy-26,C.ink,2);D.circle(c,ox,cy-30,9,C.greenL,C.ink,1.5);
  const hs=[-.32,-.16,.16,.32];hs.forEach(h=>{const y1=cy+h*er;D.line(c,ox,cy-18,lx,y1,'rgba(201,162,39,.85)',1.4);const sl=(cy-y1)/(fx-lx);const yr=y1+sl*(rx-lx);D.line(c,lx,y1,rx,yr,'rgba(201,162,39,.95)',1.4)});
  D.line(c,ox,cy,W-8,cy,'rgba(35,37,46,.15)',1,[3,4]);
  const blur=Math.abs(di-.017)*k*.6,ok=Math.abs(p.P-need)<.35;D.circle(c,rx,cy,Math.max(2,Math.min(26,blur)),ok?'rgba(15,107,68,.6)':'rgba(200,70,60,.35)');
  D.text(c,p.d+' m →',ox+40,cy-36,{size:11,ltr:true,col:C.ink2});
  D.text(c,ok?L('✓ الصورة واضحة على الشبكية','✓ Sharp image on the retina'):(di<.017?L('✗ تتجمع الأشعة قبل الشبكية — ضبابية','✗ Rays meet before the retina — blurry'):L('✗ تتجمع الأشعة بعد الشبكية — ضبابية','✗ Rays meet behind the retina — blurry')),14,16,{size:12,align:'left',bold:true,col:ok?C.green:C.red});
  D.text(c,L('القوة المطلوبة: ','Needed power: ')+f(need,1)+' D',14,36,{size:11,align:'left',col:C.ink2});
  D.text(c,L('شبكية','retina'),ecx+er+4,cy-er*.6,{size:10,col:C.red,align:'right'});D.text(c,L('عدسة','lens'),lx,cy+er*.55+14,{size:10,col:C.blue});
  D.text(c,L('الرسم ليس بمقياس رسم حقيقي','not drawn to scale'),W/2,H-10,{size:9,col:C.ink2})}},
heart:{name:T('القلب ونبضه','The heart and its beat'),
 ctl:[{k:'hr',lab:T('معدل النبض','Heart rate'),min:40,max:180,step:1,v:72,unit:T('نبضة/د','bpm')},{k:'sv',lab:T('حجم الضربة','Stroke volume'),min:40,max:120,step:5,v:70,unit:'mL'}],
 init(s){s.ph=0;s.buf=[]},
 draw(c,W,H,dt,s,p){s.ph+=dt*p.hr/60;const ph=s.ph%1;
  const ecg=x=>{x=x%1;const g=(m,w,a)=>a*Math.exp(-(((x-m)/w)**2));return g(.12,.025,.12)-g(.24,.008,.15)+g(.26,.012,1)-g(.29,.01,.25)+g(.48,.05,.3)};
  s.buf.push(ecg(s.ph));const maxN=Math.floor(W*.9);while(s.buf.length>maxN)s.buf.shift();
  const beat=1+.12*Math.exp(-(((ph-.27)/.06)**2)),hx=W*.27,hy=H*.42,hs=Math.min(W*.18,H*.24)*beat;
  c.save();c.translate(hx,hy);c.scale(hs/50,hs/50);c.beginPath();c.moveTo(0,18);c.bezierCurveTo(-48,-12,-28,-50,0,-26);c.bezierCurveTo(28,-50,48,-12,0,18);c.lineTo(0,40);c.closePath();
  c.beginPath();c.moveTo(0,42);c.bezierCurveTo(-60,0,-42,-48,0,-24);c.bezierCurveTo(42,-48,60,0,0,42);c.fillStyle=C.red;c.fill();c.lineWidth=3;c.strokeStyle=C.ink;c.stroke();
  c.beginPath();c.moveTo(-8,-30);c.lineTo(-8,-52);c.moveTo(8,-30);c.quadraticCurveTo(10,-56,26,-56);c.lineWidth=7;c.strokeStyle='#8b2a24';c.stroke();c.restore();
  const co=p.hr*p.sv/1000,tx=W*.56;D.text(c,L('النتاج القلبي','Cardiac output'),tx,H*.22,{size:12,align:'left',col:C.ink2});D.text(c,f(co,2)+' L/min',tx,H*.22+24,{size:22,align:'left',bold:true,ltr:true,col:C.red});
  D.text(c,p.hr+' × '+p.sv+' mL = '+f(co*1000,0)+' mL/min',tx,H*.22+50,{size:11,align:'left',ltr:true,col:C.ink2});
  const st=p.hr<60?L('أبطأ من المعتاد وقت الراحة','slower than a typical resting rate'):p.hr<=100?L('ضمن معدل الراحة المعتاد للبالغين (60–100)','typical adult resting range (60–100)'):L('أسرع — مثل وقت الرياضة','faster — like during exercise');D.text(c,st,tx,H*.22+72,{size:10,align:'left',col:C.purple});
  const ey=H-46,eh=40;D.box(c,10,ey-eh,W-20,eh+18,'rgba(15,107,68,.06)',null,6);
  c.save();c.strokeStyle=C.green;c.lineWidth=2;c.beginPath();s.buf.forEach((v,i)=>{const x=W-14-(s.buf.length-1-i),y=ey-v*eh*.8;i?c.lineTo(x,y):c.moveTo(x,y)});c.stroke();c.restore();
  D.text(c,'CO = HR × SV',14,16,{size:13,align:'left',ltr:true,bold:true,col:C.blue})}},
photo:{name:T('نبتة مائية تحت المصباح','A water plant under a lamp'),
 ctl:[{k:'light',lab:T('شدة الضوء','Light intensity'),min:0,max:100,step:1,v:60,unit:'%'},{k:'co2',lab:T('تركيز CO₂','CO₂ level'),min:0,max:100,step:1,v:50,unit:'%'}],
 init(s){s.b=[];s.acc=0;s.cnt=0;s.tm=0},
 draw(c,W,H,dt,s,p,t){const fl=p.light/(p.light+25),fc=p.co2/(p.co2+20),rel=fl*fc/((100/125)*(100/120));
  s.acc+=rel*5*dt;s.tm+=dt;while(s.acc>1){s.acc--;s.b.push({x:(Math.random()-.5)*20,y:0,r:2+Math.random()*2.5});s.cnt++}
  const bx=W*.36,bw=W*.36,by=40,bh=H-80;
  const lx=W*.12,ly=by+bh*.35;if(p.light>0){const g=c.createRadialGradient(lx,ly,4,lx,ly,W*.35);g.addColorStop(0,`rgba(255,220,90,${p.light/120})`);g.addColorStop(1,'rgba(255,220,90,0)');c.fillStyle=g;c.fillRect(0,0,W*.7,H)}
  D.circle(c,lx,ly,16,p.light>0?'#ffe27a':'#ddd',C.ink,2);D.line(c,lx,ly+16,lx,by+bh,C.ink,3);
  c.fillStyle='rgba(30,68,200,.12)';c.fillRect(bx,by+20,bw,bh-20);c.strokeStyle=C.ink;c.lineWidth=2.5;c.beginPath();c.moveTo(bx,by);c.lineTo(bx,by+bh);c.lineTo(bx+bw,by+bh);c.lineTo(bx+bw,by);c.stroke();
  const px=bx+bw/2,py=by+bh-4;c.save();c.strokeStyle=C.green;c.lineWidth=3;c.beginPath();c.moveTo(px,py);c.quadraticCurveTo(px+8,py-bh*.4,px,py-bh*.62);c.stroke();for(let i=1;i<9;i++){const y=py-i*bh*.07,sx=Math.sin(t*1.5+i)*2;c.beginPath();c.ellipse(px-12+sx,y,11,4,-.5,0,2*PI);c.ellipse(px+12+sx,y-3,11,4,.5,0,2*PI);c.fillStyle='rgba(15,107,68,.55)';c.fill()}c.restore();
  const topY=py-bh*.62;s.b.forEach(q=>{q.y+=dt*bh*.35;q.x+=Math.sin(q.y*.08)*.3});s.b=s.b.filter(q=>topY-q.y>by+22);s.b.forEach(q=>D.circle(c,px+q.x,topY-q.y,q.r,'rgba(255,255,255,.85)',C.blue,1));
  const tx=W-14;D.text(c,'O₂',tx,by+20,{size:16,align:'right',bold:true,col:C.blue,ltr:true});D.text(c,f(rel*5*60,0)+L(' فقاعة/دقيقة',' bubbles/min'),tx,by+44,{size:12,align:'right',bold:true});
  D.bar(c,tx-34,by+64,30,bh-110,rel,C.green,'',f(rel*100,0)+'%');
  const lim=p.light===0?L('بدون ضوء ما فيه بناء ضوئي','No light → no photosynthesis'):fl<fc?L('العامل المحدد الآن: الضوء','Limiting factor now: light'):L('العامل المحدد الآن: CO₂','Limiting factor now: CO₂');
  D.text(c,lim,14,16,{size:12,align:'left',bold:true,col:C.purple});D.text(c,L('نموذج تعليمي مبسّط','simplified teaching model'),W/2,H-10,{size:9,col:C.ink2})}},
pop:{name:T('نمو مجتمع أرانب في جزيرة','Rabbits growing on an island'),
 ctl:[{k:'r',lab:T('معدل النمو r','Growth rate r'),min:.1,max:1.5,step:.05,v:.5},{k:'K',lab:T('السعة الحاملة K','Carrying capacity K'),min:100,max:1000,step:50,v:600}],
 btns:[{k:'re',lab:T('من البداية ⟲','Restart ⟲')}],
 init(s){s.t=0},change(s){s.t=0},act(k,s){s.t=0},
 draw(c,W,H,dt,s,p){s.t=Math.min(30,s.t+dt*3);const N0=10,N=t=>p.K/(1+((p.K-N0)/N0)*Math.exp(-p.r*t));
  const gx=44,gy=H-36,gw=W-64,gh=H-84,X=t=>gx+t/30*gw,Y=n=>gy-n/1000*gh;
  D.line(c,gx,gy,gx+gw,gy,C.ink,1.6);D.line(c,gx,gy,gx,gy-gh,C.ink,1.6);for(let n=0;n<=1000;n+=250){D.text(c,String(n),gx-6,Y(n),{size:9,align:'right',ltr:true,col:C.ink2});D.line(c,gx,Y(n),gx+gw,Y(n),C.grid,1)}for(let t=0;t<=30;t+=5)D.text(c,String(t),X(t),gy+12,{size:9,ltr:true,col:C.ink2});
  D.text(c,L('الزمن (أسابيع)','time (weeks)'),gx+gw,gy+26,{size:10,align:'right',col:C.ink2});
  D.line(c,gx,Y(p.K),gx+gw,Y(p.K),C.red,1.5,[6,5]);D.text(c,'K = '+p.K,gx+gw,Y(p.K)-9,{size:11,align:'right',ltr:true,bold:true,col:C.red});
  c.save();c.strokeStyle='rgba(74,42,143,.45)';c.lineWidth=1.8;c.setLineDash([3,4]);c.beginPath();for(let t=0;t<=30;t+=.2){const n=N0*Math.exp(p.r*t);if(n>1000)break;t?c.lineTo(X(t),Y(n)):c.moveTo(X(t),Y(n))}c.stroke();c.restore();
  c.save();c.strokeStyle=C.green;c.lineWidth=3.2;c.beginPath();for(let t=0;t<=s.t;t+=.1){t?c.lineTo(X(t),Y(N(t))):c.moveTo(X(t),Y(N(t)))}c.stroke();c.restore();
  const n=N(s.t);D.circle(c,X(s.t),Y(n),5.5,C.gold,C.ink,1.5);
  D.text(c,'N = '+Math.round(n)+L(' أرنب',' rabbits'),14,16,{size:13,align:'left',bold:true,col:C.green});D.text(c,'dN/dt = '+f(p.r*n*(1-n/p.K),1),W-14,16,{size:11,align:'right',ltr:true,col:C.ink2});
  D.text(c,L('المتقطع البنفسجي = نمو بدون حدود (أُسّي)','dashed purple = unlimited (exponential) growth'),W/2,34,{size:10,col:C.purple})}}
};

EB.register({id:'biology',ic:'🧬',c:['#0F6B44','#07341F'],n:T('الأحياء','Biology'),
 desc:T('الخلية والعين والقلب والنبات والمجتمعات — شوف الحياة تشتغل من الداخل.','Cells, eyes, hearts, plants and populations — see life working from the inside.'),
 sims,
 lessons:[
 {t:T('الخلية الحيوانية','The animal cell'),sim:'cell',
  p:T('الخلية هي أصغر وحدة حية. جسمك فيه عشرات التريليونات منها، وكل خلية مثل مدينة صغيرة: فيها مركز تحكم، ومحطات طاقة، ومصانع، وبريد، وسور يحميها.','The cell is the smallest living unit. Your body has tens of trillions of them, and each is like a tiny city: a control centre, power stations, factories, a post office and a protective wall.'),
  pts:[T('النواة تحمل المادة الوراثية DNA','The nucleus holds the DNA'),T('الميتوكوندريا تنتج الطاقة','Mitochondria release energy'),T('الخلية النباتية فيها زيادة: جدار خلوي وبلاستيدات خضراء','Plant cells add a cell wall and chloroplasts')],
  eq:'',eqn:T('اضغط على أسماء العضيات في صفحة التجربة','Tap the organelle names on the experiment page'),
  q:T('أي عضية تُلقّب بـ«محطة الطاقة» في الخلية؟','Which organelle is called the cell’s “powerhouse”?'),a:T('<b>الميتوكوندريا</b>','<b>The mitochondria</b>')},
 {t:T('كيف تركّز العين','How the eye focuses'),sim:'eye',
  p:T('العين تشتغل مثل الكاميرا: الضوء يدخل وتجمعه العدسة على الشبكية. الحلو إن العدسة مرنة؛ العضلات الهدبية تغيّر سُمكها عشان تركّز على البعيد والقريب. هذا اسمه «التكيّف».','The eye works like a camera: light enters and the lens focuses it onto the retina. The lens is flexible — the ciliary muscles change its thickness to focus near or far. This is called accommodation.'),
  pts:[T('جسم قريب ← عدسة أسمك (قوة أكبر)','Near object → thicker lens (more power)'),T('جسم بعيد ← عدسة أرق','Far object → thinner lens'),T('قوة العدسة بالديوبتر: D = 1 ÷ f(m)','Lens power in dioptres: D = 1 ÷ f (m)')],
  eq:'1/f = 1/d<sub>o</sub> + 1/d<sub>i</sub>',eqn:T('dₒ بُعد الجسم · dᵢ بُعد الصورة (الشبكية)','dₒ object distance · dᵢ image distance (retina)'),
  q:T('لما تنظر لجسم قريب، هل تصير عدسة العين أسمك أم أرق؟','When you look at something close, does the eye lens get thicker or thinner?'),a:T('<b>أسمك</b> — تزيد قوتها لتجمع الأشعة على الشبكية','<b>Thicker</b> — its power increases to focus the rays on the retina')},
 {t:T('القلب والنبض','The heart and pulse'),sim:'heart',
  p:T('القلب مضخة عضلية تدفع الدم لكل الجسم. كل نبضة تدفع كمية من الدم اسمها «حجم الضربة»، وكمية الدم اللي يضخها القلب في الدقيقة اسمها «النتاج القلبي».','The heart is a muscular pump that pushes blood around the body. Each beat pushes out a volume called the stroke volume; the total pumped each minute is the cardiac output.'),
  pts:[T('<b>HR</b> معدل النبض (نبضة/دقيقة)','<b>HR</b> heart rate (beats per minute)'),T('<b>SV</b> حجم الضربة (mL)','<b>SV</b> stroke volume (mL)'),T('مع الرياضة يزيد الاثنين','Both rise during exercise')],
  eq:'CO = HR × SV',
  q:T('معدل النبض 70 نبضة/دقيقة وحجم الضربة 70 mL. كم النتاج القلبي؟','Heart rate 70 bpm, stroke volume 70 mL. What is the cardiac output?'),a:T('70 × 70 = 4900 mL/min ≈ <b>4.9 L/min</b>','70 × 70 = 4900 mL/min ≈ <b>4.9 L/min</b>')},
 {t:T('البناء الضوئي','Photosynthesis'),sim:'photo',
  p:T('النباتات تصنع غذاءها بنفسها: تاخذ ثاني أكسيد الكربون من الهواء والماء من التربة، وبطاقة الضوء تحوّلهم لسكر (جلوكوز) وتطلق الأكسجين. يصير هذا في البلاستيدات الخضراء بفضل الكلوروفيل.','Plants make their own food: they take carbon dioxide from the air and water from the soil, and with light energy turn them into sugar (glucose), releasing oxygen. This happens in chloroplasts thanks to chlorophyll.'),
  pts:[T('يزيد المعدل مع الضوء وCO₂ لحد معيّن','The rate rises with light and CO₂ — up to a point'),T('العامل الأقل هو اللي يحدد السرعة','The scarcest factor sets the speed'),T('فقاعات النبتة المائية = أكسجين','The water plant’s bubbles are oxygen')],
  eq:'6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',eqn:T('بوجود الضوء والكلوروفيل','with light and chlorophyll'),
  q:T('ما الغاز اللي تطلقه النباتات أثناء البناء الضوئي؟','Which gas do plants release during photosynthesis?'),a:T('<b>الأكسجين O₂</b>','<b>Oxygen, O₂</b>')},
 {t:T('نمو المجتمعات','Population growth'),sim:'pop',
  p:T('لو عندك أرانب في جزيرة، تتكاثر بسرعة بالبداية. لكن الأكل والمكان محدود، فالنمو يبطأ لين يستقر العدد قريب من «السعة الحاملة» K. هذا اسمه النمو اللوجستي.','Put rabbits on an island and they multiply fast at first. But food and space are limited, so growth slows until the number levels off near the carrying capacity K. This is logistic growth.'),
  pts:[T('<b>N</b> عدد الأفراد · <b>r</b> معدل النمو','<b>N</b> population · <b>r</b> growth rate'),T('<b>K</b> أكبر عدد تقدر البيئة تعيّشه','<b>K</b> the most the environment can support'),T('منحنى على شكل حرف S','An S-shaped curve')],
  eq:'dN/dt = r N (1 − N/K)',
  q:T('ماذا يحدث لسرعة نمو المجتمع لما يقترب N من K؟','What happens to the growth rate as N approaches K?'),a:T('<b>تتباطأ حتى تقترب من الصفر</b> لأن (1 − N/K) يقترب من الصفر','<b>It slows towards zero</b>, because (1 − N/K) approaches zero')}
 ]});
})();
