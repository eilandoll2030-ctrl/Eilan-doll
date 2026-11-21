/* كتاب الإحصاء التفاعلي — Eilan Doll Academy */
(()=>{const {C,D}=EB,L=EB.L,T=(ar,en)=>({ar,en}),f=D.fmt,PI=Math.PI;
const gauss=(r)=>{const u=Math.max(1e-9,r()),v=r();return Math.sqrt(-2*Math.log(u))*Math.cos(2*PI*v)};
const die=(c,x,y,s,n)=>{D.box(c,x-s/2,y-s/2,s,s,'#fff',C.ink,s*.18,2);const P={1:[[0,0]],2:[[-1,-1],[1,1]],3:[[-1,-1],[0,0],[1,1]],4:[[-1,-1],[1,-1],[-1,1],[1,1]],5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]}[n]||[];P.forEach(([a,b])=>D.circle(c,x+a*s*.26,y+b*s*.26,s*.09,C.ink))};

const sims={
mean:{name:T('حرّك القيمة الشاذة وشوف مين يتأثر','Move the outlier — who changes?'),
 ctl:[{k:'o',lab:T('القيمة الأخيرة','Last value'),min:0,max:40,step:1,v:9}],
 draw(c,W,H,dt,s,p){const data=[3,4,4,5,6,7,p.o],n=data.length,sum=data.reduce((a,b)=>a+b,0),mean=sum/n,sorted=[...data].sort((a,b)=>a-b),med=sorted[3];
  const cnt={};data.forEach(v=>cnt[v]=(cnt[v]||0)+1);const mx=Math.max(...Object.values(cnt)),modes=Object.keys(cnt).filter(k=>cnt[k]===mx).map(Number);
  const x0=24,x1=W-20,ly=H*.6,X=v=>x0+v/40*(x1-x0);D.line(c,x0,ly,x1,ly,C.ink,2);for(let v=0;v<=40;v+=5){D.line(c,X(v),ly,X(v),ly+6,C.ink,1.5);D.text(c,String(v),X(v),ly+16,{size:10,ltr:true,col:C.ink2})}
  const st={};data.forEach((v,i)=>{st[v]=(st[v]||0)+1;D.circle(c,X(v),ly-8-(st[v]-1)*15,6.5,i===n-1?C.gold:C.blueL,C.ink,1.5)});
  const mk=(v,col,lab,row)=>{D.line(c,X(v),ly+24,X(v),ly+30+row*20,col,1.5,[2,3]);D.text(c,lab,X(v),ly+36+row*20,{size:11,col,bold:true,bg:'rgba(246,241,228,.9)'})};
  mk(mean,C.blue,L('الوسط ','mean ')+f(mean,2),0);mk(med,C.green,L('الوسيط ','median ')+med,1);
  D.text(c,'x̄ = '+sum+' ÷ '+n+' = '+f(mean,2),14,16,{size:13,align:'left',ltr:true,bold:true,col:C.blue});
  D.text(c,L('الوسيط = ','median = ')+med+'   ·   '+L('المنوال = ','mode = ')+modes.join(', '),14,36,{size:12,align:'left',col:C.ink,bold:true});
  D.text(c,'{ '+sorted.join(', ')+' }',W-14,16,{size:11,align:'right',ltr:true,col:C.ink2});
  D.text(c,p.o>15?L('القيمة الشاذة سحبت الوسط، والوسيط ما تحرّك!','The outlier dragged the mean — the median stayed put!'):L('حرّك القيمة الذهبية لليمين بعيد','Push the gold value far to the right'),W/2,H-12,{size:11,col:C.purple,bold:true})}},
normal:{name:T('منحنى الجرس وقاعدة 68–95–99.7','The bell curve and the 68–95–99.7 rule'),
 ctl:[{k:'mu',lab:T('الوسط μ','Mean μ'),min:-3,max:3,step:.1,v:0},{k:'sd',lab:T('الانحراف σ','Std dev σ'),min:.5,max:2.5,step:.1,v:1}],
 btns:[{k:'1',lab:T('±1σ','±1σ'),alt:1},{k:'2',lab:T('±2σ','±2σ'),alt:1},{k:'3',lab:T('±3σ','±3σ'),alt:1}],
 init(s){s.k=1},act(k,s){s.k=+k},
 draw(c,W,H,dt,s,p){const x0=-8,x1=8,gx=14,gw=W-28,gy=H-40,gh=H-96,X=x=>gx+(x-x0)/(x1-x0)*gw,pdf=x=>Math.exp(-.5*((x-p.mu)/p.sd)**2)/(p.sd*Math.sqrt(2*PI)),Y=v=>gy-v/.8*gh;
  const a=p.mu-s.k*p.sd,b=p.mu+s.k*p.sd;c.save();c.beginPath();c.moveTo(X(Math.max(a,x0)),gy);for(let x=Math.max(a,x0);x<=Math.min(b,x1);x+=.02)c.lineTo(X(x),Y(pdf(x)));c.lineTo(X(Math.min(b,x1)),gy);c.closePath();c.fillStyle=['','rgba(30,68,200,.3)','rgba(15,107,68,.3)','rgba(74,42,143,.3)'][s.k];c.fill();c.restore();
  D.plot(c,pdf,x0,x1,gx-x0*gw/(x1-x0),gy,gw/(x1-x0),gh/.8,C.ink,2.8);
  D.line(c,gx,gy,gx+gw,gy,C.ink,1.5);for(let x=-8;x<=8;x+=2)D.text(c,String(x),X(x),gy+12,{size:10,ltr:true,col:C.ink2});
  D.line(c,X(p.mu),gy,X(p.mu),Y(pdf(p.mu))-6,C.red,1.5,[4,3]);D.text(c,'μ',X(p.mu),Y(pdf(p.mu))-14,{size:13,bold:true,col:C.red,ltr:true});
  [a,b].forEach(v=>{if(v>x0&&v<x1)D.line(c,X(v),gy,X(v),Y(pdf(v)),C.ink2,1.2)});
  const pct={1:'68.3%',2:'95.4%',3:'99.7%'}[s.k];D.text(c,pct,X(p.mu),gy-gh*.12,{size:16,bold:true,ltr:true,bg:'rgba(255,255,255,.75)'});
  D.text(c,L('نسبة البيانات بين μ ± ','Share of data within μ ± ')+s.k+'σ',14,16,{size:12,align:'left',bold:true,col:C.blue});D.text(c,'['+f(a,2)+' , '+f(b,2)+']',W-14,16,{size:12,align:'right',ltr:true,col:C.ink2})}},
lln:{name:T('ارمِ حجر النرد مرات كثيرة','Roll the die many times'),
 btns:[{k:'1',lab:T('رمية 🎲','Roll 🎲')},{k:'10',lab:T('×10','×10')},{k:'100',lab:T('×100','×100')},{k:'1000',lab:T('×1000','×1000')},{k:'r',lab:T('تصفير','Reset'),alt:1}],
 init(s){s.c=[0,0,0,0,0,0];s.n=0;s.last=0},
 act(k,s){if(k==='r'){this.init(s);return}for(let i=0;i<+k;i++){const v=1+Math.floor(Math.random()*6);s.c[v-1]++;s.n++;s.last=v}s.bump=1},
 draw(c,W,H,dt,s){const gx=40,gy=H-30,gw=W-130,gh=H-80,bw=gw/6;s.bump=Math.max(0,(s.bump||0)-dt*3);
  D.line(c,gx,gy,gx+gw,gy,C.ink,1.5);const Y=v=>gy-v/.4*gh;[0,.1,.2,.3,.4].forEach(v=>{D.text(c,v*100+'%',gx-6,Y(v),{size:9,align:'right',ltr:true,col:C.ink2});D.line(c,gx,Y(v),gx+gw,Y(v),C.grid,1)});
  s.c.forEach((n,i)=>{const fr=s.n?n/s.n:0,x=gx+i*bw+bw*.15;c.fillStyle=i===s.last-1?C.gold:C.blue;D.rr(c,x,Y(Math.min(.4,fr)),bw*.7,gy-Y(Math.min(.4,fr)),4);c.fill();die(c,x+bw*.35,gy+16,16,i+1);if(s.n)D.text(c,f(fr*100,1)+'%',x+bw*.35,Y(Math.min(.4,fr))-9,{size:9,ltr:true,col:C.ink})});
  D.line(c,gx,Y(1/6),gx+gw,Y(1/6),C.red,2,[6,4]);D.text(c,'1/6 ≈ 16.7%',gx+gw+4,Y(1/6),{size:10,align:'left',ltr:true,col:C.red,bold:true});
  if(s.last)die(c,W-44,56,40+s.bump*14,s.last);
  const err=s.n?Math.max(...s.c.map(n=>Math.abs(n/s.n-1/6)))*100:0;
  D.text(c,'n = '+s.n.toLocaleString('en-US'),14,16,{size:14,align:'left',ltr:true,bold:true,col:C.blue});
  if(s.n)D.text(c,L('أكبر بُعد عن 1/6: ','Largest gap from 1/6: ')+f(err,1)+'%',14,36,{size:11,align:'left',col:err<2?C.green:C.purple,bold:true})}},
corr:{name:T('ارتباط موجب وسالب','Positive and negative correlation'),
 ctl:[{k:'r',lab:T('قوة الارتباط r','Correlation r'),min:-1,max:1,step:.05,v:.7}],
 init(s){const g=EB.rand(21);s.pts=[];for(let i=0;i<45;i++)s.pts.push([gauss(g),gauss(g)])},
 draw(c,W,H,dt,s,p){const r=p.r,q=Math.sqrt(Math.max(0,1-r*r)),P=s.pts.map(([x,z])=>[x,r*x+q*z]),n=P.length;
  const mx=P.reduce((a,b)=>a+b[0],0)/n,my=P.reduce((a,b)=>a+b[1],0)/n;let sxy=0,sxx=0,syy=0;P.forEach(([x,y])=>{sxy+=(x-mx)*(y-my);sxx+=(x-mx)**2;syy+=(y-my)**2});const rr=sxy/Math.sqrt(sxx*syy),b=sxy/sxx,a=my-b*mx;
  const k=Math.min((W-50)/7,(H-60)/7),ox=W/2,oy=H/2+12;D.axes(c,ox,oy,-3.3,-3.3,3.3,3.3,k,k,{ticks:false,xl:L('ساعات المذاكرة','study hours'),yl:L('الدرجة','score')});
  P.forEach(([x,y])=>D.circle(c,ox+x*k,oy-y*k,4.5,'rgba(30,68,200,.6)',C.ink,1));
  D.plot(c,x=>a+b*x,-3.3,3.3,ox,oy,k,k,C.red,2.6,-3.4,3.4);
  const desc=Math.abs(rr)<.2?L('لا يوجد ارتباط تقريبًا','almost no correlation'):(rr>0?(rr>.7?L('ارتباط موجب قوي','strong positive'):L('ارتباط موجب','positive')):(rr<-.7?L('ارتباط سالب قوي','strong negative'):L('ارتباط سالب','negative')));
  D.text(c,'r = '+f(rr,2),14,16,{size:14,align:'left',ltr:true,bold:true,col:C.blue});D.text(c,desc,14,36,{size:12,align:'left',bold:true,col:C.purple});
  D.text(c,'ŷ = '+f(a,2)+(b<0?' − ':' + ')+f(Math.abs(b),2)+'x',W-14,16,{size:12,align:'right',ltr:true,bold:true,col:C.red});
  D.text(c,L('الارتباط لا يعني السببية','correlation is not causation'),W-14,36,{size:10,align:'right',col:C.ink2})}},
clt:{name:T('مجموع عدة أحجار نرد','The sum of several dice'),
 ctl:[{k:'k',lab:T('عدد الأحجار','Number of dice'),min:1,max:6,step:1,v:2}],
 btns:[{k:'100',lab:T('ارمِ 100 مرة','Roll 100×')},{k:'1000',lab:T('ارمِ 1000 مرة','Roll 1000×')},{k:'r',lab:T('تصفير','Reset'),alt:1}],
 init(s,p){s.h={};s.n=0;s.kk=p.k},change(s,p){s.h={};s.n=0;s.kk=p.k},
 act(k,s,p){if(k==='r'){s.h={};s.n=0;return}for(let i=0;i<+k;i++){let t=0;for(let j=0;j<p.k;j++)t+=1+Math.floor(Math.random()*6);s.h[t]=(s.h[t]||0)+1;s.n++}},
 draw(c,W,H,dt,s,p){const k=p.k,lo=k,hi=6*k,m=hi-lo+1,gx=20,gw=W-40,gy=H-34,gh=H-90,bw=gw/m;
  const mu=3.5*k,sd=Math.sqrt(k*35/12),pdf=x=>Math.exp(-.5*((x-mu)/sd)**2)/(sd*Math.sqrt(2*PI));const maxP=Math.max(pdf(mu),1/6)*1.15;
  D.line(c,gx,gy,gx+gw,gy,C.ink,1.5);
  for(let v=lo;v<=hi;v++){const fr=s.n?(s.h[v]||0)/s.n:0,x=gx+(v-lo)*bw;c.fillStyle=C.blue;const h=fr/maxP*gh;D.rr(c,x+1,gy-h,Math.max(1,bw-2),h,2);c.fill();if(m<=21||(v-lo)%3===0)D.text(c,String(v),x+bw/2,gy+12,{size:9,ltr:true,col:C.ink2})}
  if(k>1){c.save();c.strokeStyle=C.red;c.lineWidth=2.4;c.beginPath();for(let x=lo-.5;x<=hi+.5;x+=.1){const X=gx+(x-lo+.5)*bw,Y=gy-pdf(x)/maxP*gh;x===lo-.5?c.moveTo(X,Y):c.lineTo(X,Y)}c.stroke();c.restore()}
  for(let i=0;i<k;i++)die(c,W-24-i*30,30,22,1+((i*3+2)%6));
  D.text(c,'n = '+s.n.toLocaleString('en-US'),14,16,{size:13,align:'left',ltr:true,bold:true,col:C.blue});
  D.text(c,k===1?L('حجر واحد: توزيع منتظم (مسطّح)','One die: a flat (uniform) shape'):L('المتوسط المتوقع = ','Expected mean = ')+f(mu,1),14,36,{size:11,align:'left',bold:true,col:C.purple});
  if(!s.n)D.text(c,L('اضغط «ارمِ» تحت ⬇','Press “Roll” below ⬇'),W/2,H/2,{size:14,col:C.ink2,bold:true})}}
};

EB.register({id:'statistics',ic:'📊',c:['#251147','#1E44C8'],n:T('الإحصاء','Statistics'),
 desc:T('افهم البيانات والصدفة: المتوسطات والتوزيع والاحتمال والارتباط — بتجارب ترميها بنفسك.','Make sense of data and chance — averages, distributions, probability and correlation, with experiments you run yourself.'),
 sims,
 lessons:[
 {t:T('الوسط والوسيط والمنوال','Mean, median and mode'),sim:'mean',
  p:T('ثلاث طرق نلخّص فيها مجموعة أرقام برقم واحد. الوسط (المتوسط الحسابي) يتأثر كثير بالقيم الشاذة، أما الوسيط فهو القيمة اللي في النص بعد الترتيب، فيكون أثبت.','Three ways to sum up a set of numbers with one value. The mean (average) is pulled strongly by outliers, while the median — the middle value after sorting — stays steadier.'),
  pts:[T('<b>الوسط</b> = مجموع القيم ÷ عددها','<b>Mean</b> = sum of values ÷ how many'),T('<b>الوسيط</b> = القيمة الوسطى بعد الترتيب','<b>Median</b> = the middle value once sorted'),T('<b>المنوال</b> = القيمة الأكثر تكرارًا','<b>Mode</b> = the most frequent value')],
  eq:'x̄ = Σx ÷ n',
  q:T('البيانات: 2، 3، 3، 8، 9. ما الوسط والوسيط والمنوال؟','Data: 2, 3, 3, 8, 9. Find the mean, median and mode.'),a:T('الوسط = 25 ÷ 5 = <b>5</b> · الوسيط = <b>3</b> · المنوال = <b>3</b>','Mean = 25 ÷ 5 = <b>5</b> · median = <b>3</b> · mode = <b>3</b>')},
 {t:T('التوزيع الطبيعي','The normal distribution'),sim:'normal',
  p:T('كثير من الظواهر (الأطوال، أخطاء القياس، درجات الاختبارات الكبيرة) تتوزع على شكل جرس: أغلب القيم قريبة من الوسط، وكل ما ابتعدنا تقل. الانحراف المعياري σ يقيس قد إيش القيم متباعدة.','Many things — heights, measurement errors, large test scores — form a bell shape: most values sit near the mean and fewer lie far away. The standard deviation σ measures how spread out they are.'),
  pts:[T('حوالي 68% ضمن ±1σ','About 68% lie within ±1σ'),T('حوالي 95% ضمن ±2σ','About 95% within ±2σ'),T('حوالي 99.7% ضمن ±3σ','About 99.7% within ±3σ')],
  eq:'z = (x − μ) ÷ σ',eqn:T('الدرجة المعيارية: كم انحراف معياري تبعد القيمة عن الوسط','the z-score: how many σ a value is from the mean'),
  q:T('درجات اختبار متوسطها 70 وانحرافها المعياري 10. تقريبًا كم نسبة الطلاب بين 60 و 80؟','Test scores have mean 70 and σ = 10. Roughly what share of students scored between 60 and 80?'),a:T('60 و 80 هما μ ± 1σ ← حوالي <b>68%</b>','60 and 80 are μ ± 1σ → about <b>68%</b>')},
 {t:T('الاحتمال وقانون الأعداد الكبيرة','Probability and the law of large numbers'),sim:'lln',
  p:T('احتمال ظهور أي وجه في حجر النرد هو 1 من 6. لو رميت 10 مرات بس، النتائج ممكن تكون غريبة. لكن كل ما زادت الرميات، تقترب النسب من 1/6. هذا هو قانون الأعداد الكبيرة.','Each face of a die has a 1 in 6 chance. With only 10 rolls the results can look odd — but as the rolls pile up, each share gets closer to 1/6. That is the law of large numbers.'),
  pts:[T('الاحتمال بين 0 (مستحيل) و 1 (أكيد)','Probability ranges from 0 (impossible) to 1 (certain)'),T('n(A) عدد النتائج المطلوبة','n(A) = number of favourable outcomes'),T('n(S) عدد كل النتائج الممكنة','n(S) = number of all possible outcomes')],
  eq:'P(A) = n(A) ÷ n(S)',
  q:T('ما احتمال ظهور عدد زوجي عند رمي حجر نرد مرة واحدة؟','What is the probability of rolling an even number with one die?'),a:T('الزوجي {2، 4، 6} ← 3 ÷ 6 = <b>0.5</b>','Even = {2, 4, 6} → 3 ÷ 6 = <b>0.5</b>')},
 {t:T('الارتباط','Correlation'),sim:'corr',
  p:T('الارتباط يقيس قد إيش متغيرين يتحركون مع بعض. معامل الارتباط r بين −1 و 1: القريب من 1 يعني يزيدون مع بعض، والقريب من −1 يعني لما واحد يزيد الثاني ينقص، والقريب من 0 يعني ما فيه علاقة خطية واضحة.','Correlation measures how two variables move together. The coefficient r runs from −1 to 1: near 1 they rise together, near −1 one falls as the other rises, near 0 there is no clear straight-line link.'),
  pts:[T('خط الانحدار يتنبأ بقيمة y من x','The regression line predicts y from x'),T('<b>b</b> ميل الخط · <b>a</b> المقطع','<b>b</b> slope · <b>a</b> intercept'),T('ارتباط قوي ≠ إن واحد سبب الثاني','Strong correlation ≠ one causes the other')],
  eq:'ŷ = a + b x',
  q:T('إذا كان r = −0.9 بين ساعات اللعب ودرجة الاختبار، ماذا نستنتج؟','If r = −0.9 between gaming hours and test score, what can we say?'),a:T('<b>علاقة عكسية قوية</b>: كل ما زادت ساعات اللعب قلّت الدرجة غالبًا — لكن هذا وحده ما يثبت السبب','<b>A strong negative relationship</b>: more gaming tends to go with lower scores — but that alone doesn’t prove cause')},
 {t:T('نظرية النهاية المركزية','The central limit theorem'),sim:'clt',
  p:T('حجر نرد واحد كل نتائجه متساوية (شكل مسطّح). لكن لو جمعنا نتائج عدة أحجار، يبدأ يطلع شكل الجرس! هذي فكرة نظرية النهاية المركزية: مجموع أو متوسط قيم عشوائية كثيرة يقترب من التوزيع الطبيعي.','One die gives a flat shape — every result equally likely. But add up several dice and a bell shape appears! That’s the central limit theorem: the sum or average of many random values tends towards a normal distribution.'),
  pts:[T('حجران: المجموع 7 هو الأكثر','Two dice: 7 is the most common sum'),T('كل ما زاد عدد الأحجار صار الجرس أوضح','More dice → a clearer bell'),T('لهذا السبب التوزيع الطبيعي منتشر في الطبيعة','This is why the normal curve is everywhere')],
  eq:'μ = 3.5 k ,  σ² = 35k ÷ 12',eqn:T('k = عدد الأحجار','k = number of dice'),
  q:T('عند رمي حجري نرد، ما المجموع الأكثر تكرارًا؟ وكم احتماله؟','Rolling two dice, which sum is most likely, and with what probability?'),a:T('<b>7</b> — له 6 طرق من 36 ← احتمال 1/6','<b>7</b> — 6 ways out of 36 → probability 1/6')}
 ]});
})();
