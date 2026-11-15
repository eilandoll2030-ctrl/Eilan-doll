/* كتاب الكيمياء التفاعلي — Eilan Doll Academy */
(()=>{const {C,D}=EB,L=EB.L,T=(ar,en)=>({ar,en}),f=D.fmt,PI=Math.PI;
const EL=[['H','هيدروجين','Hydrogen',1],['He','هيليوم','Helium',4],['Li','ليثيوم','Lithium',7],['Be','بيريليوم','Beryllium',9],['B','بورون','Boron',11],['C','كربون','Carbon',12],['N','نيتروجين','Nitrogen',14],['O','أكسجين','Oxygen',16],['F','فلور','Fluorine',19],['Ne','نيون','Neon',20],['Na','صوديوم','Sodium',23],['Mg','مغنيسيوم','Magnesium',24],['Al','ألومنيوم','Aluminium',27],['Si','سيليكون','Silicon',28],['P','فوسفور','Phosphorus',31],['S','كبريت','Sulfur',32],['Cl','كلور','Chlorine',35],['Ar','أرغون','Argon',40]];
const HRED='#D9473B',HYD='#F3F3F7';

const sims={
atom:{name:T('ابنِ الذرة: أضف بروتونات وإلكترونات','Build an atom'),
 ctl:[{k:'Z',lab:T('العدد الذري Z','Atomic number Z'),min:1,max:18,step:1,v:6}],
 draw(c,W,H,dt,s,p,t){const Z=p.Z,e=EL[Z-1],N=e[3]-Z,cx=W*.38,cy=H/2+6,R0=Math.min(cx-14,H/2-18)/3.3;
  const sh=[Math.min(Z,2),Math.max(0,Math.min(Z-2,8)),Math.max(0,Z-10)];
  const rnd=EB.rand(Z*7+1),nuc=[];for(let i=0;i<Z+N;i++)nuc.push(i<Z?1:0);nuc.sort(()=>rnd()-.5);
  const nr=Math.max(6,Math.sqrt(Z+N)*3.2);nuc.forEach((q,i)=>{const a=i*2.4,rr=Math.sqrt(i/(Z+N))*nr;D.circle(c,cx+Math.cos(a)*rr,cy+Math.sin(a)*rr,4.2,q?HRED:'#9a9cab',C.ink,.8)});
  sh.forEach((cnt,k)=>{const r=R0*(k+1.1);c.save();c.setLineDash([3,4]);D.circle(c,cx,cy,r,null,'rgba(35,37,46,.35)',1.2);c.restore();for(let i=0;i<cnt;i++){const a=t*(1.3-k*.35)+i*2*PI/cnt;D.circle(c,cx+Math.cos(a)*r,cy+Math.sin(a)*r,4.6,C.blue,C.ink,1)}});
  const bx=W-14-Math.min(120,W*.3),bw=Math.min(120,W*.3);D.box(c,bx,24,bw,bw,'#fff',C.ink,8,2);D.text(c,String(Z),bx+10,38,{size:12,ltr:true,align:'left',bold:true});D.text(c,e[0],bx+bw/2,24+bw*.48,{size:bw*.34,bold:true,ltr:true,col:C.purple});D.text(c,L(e[1],e[2]),bx+bw/2,24+bw*.8,{size:12,bold:true});D.text(c,String(e[3]),bx+bw-8,38,{size:10,ltr:true,align:'right',col:C.ink2});
  const ty=24+bw+22;D.text(c,L('بروتونات','protons')+': '+Z,bx+bw,ty,{size:11,align:'right',col:HRED,bold:true});D.text(c,L('نيوترونات','neutrons')+': '+N,bx+bw,ty+18,{size:11,align:'right',col:'#6b6d78',bold:true});D.text(c,L('إلكترونات','electrons')+': '+Z,bx+bw,ty+36,{size:11,align:'right',col:C.blue,bold:true});
  D.text(c,sh.filter(x=>x).join(', '),bx+bw,ty+60,{size:14,align:'right',bold:true,ltr:true});D.text(c,L('توزيع الإلكترونات','electron shells'),bx+bw,ty+78,{size:10,align:'right',col:C.ink2});
  D.text(c,(Z===2||Z===10||Z===18)?L('غلاف خارجي ممتلئ ← غاز نبيل خامل','Full outer shell → unreactive noble gas'):L('إلكترونات التكافؤ: ','Valence electrons: ')+(sh[2]||sh[1]||sh[0]),14,16,{size:11,align:'left',col:C.green,bold:true})}},
states:{name:T('سخّن الماء وبرّده','Heat and cool water'),
 ctl:[{k:'T',lab:T('درجة الحرارة','Temperature'),min:-30,max:140,step:1,v:20,unit:'°C'}],
 init(s){const r=EB.rand(4);s.P=[];for(let i=0;i<42;i++)s.P.push({x:r(),y:r(),vx:r()-.5,vy:r()-.5,i})},
 draw(c,W,H,dt,s,p){const Tk=p.T+273,st=p.T<0?0:p.T<100?1:2,bx=W*.08,by=36,bw=W*.62,bh=H-62,sp=Math.sqrt(Tk/293);
  D.box(c,bx,by,bw,bh,'rgba(30,68,200,.04)',C.ink,6,2.5);
  const cols=7,rows=6,lx=bx+bw/2-cols*8,ly=by+bh-rows*16-6;
  s.P.forEach(q=>{if(st===0){const tx=(q.i%cols),ty=Math.floor(q.i/cols);const jx=(Math.random()-.5)*sp*2,jy=(Math.random()-.5)*sp*2;q.x=(lx+tx*16+8-bx)/bw;q.y=(ly+ty*16+8-by)/bh;q.dx=jx;q.dy=jy}
   else{const v=st===1?.25*sp:1.1*sp;q.vx+=(Math.random()-.5)*.6;q.vy+=(Math.random()-.5)*.6;const m=Math.hypot(q.vx,q.vy)||1;q.vx=q.vx/m;q.vy=q.vy/m;q.x+=q.vx*v*dt;q.y+=q.vy*v*dt;const ymin=st===1?.48:.02;if(q.x<.02){q.x=.02;q.vx*=-1}if(q.x>.98){q.x=.98;q.vx*=-1}if(q.y>.98){q.y=.98;q.vy*=-1}if(q.y<ymin){q.y=st===1?Math.min(.98,ymin+(ymin-q.y)):ymin;q.vy=Math.abs(q.vy)}q.dx=q.dy=0}
   D.circle(c,bx+q.x*bw+(q.dx||0),by+q.y*bh+(q.dy||0),6,st===0?'#7FA6E8':st===1?C.blue:'#9DB3F2',C.ink,1)});
  if(st===1){D.line(c,bx+4,by+bh*.46,bx+bw-4,by+bh*.46,'rgba(30,68,200,.35)',1.5,[6,5])}
  const tx=bx+bw+28,th=bh-20,ty=by+10,fr=(p.T+30)/170;D.box(c,tx-7,ty,14,th,'#fff',C.ink,7,2);c.fillStyle=C.red;D.rr(c,tx-4,ty+th*(1-fr),8,th*fr,4);c.fill();D.circle(c,tx,ty+th+8,11,C.red,C.ink,2);
  [[0,'0°'],[100,'100°']].forEach(([v,lb])=>{const y=ty+th*(1-(v+30)/170);D.line(c,tx+8,y,tx+16,y,C.ink,1.5);D.text(c,lb,tx+20,y,{size:10,align:'left',ltr:true})});
  D.text(c,[L('🧊 صلب (جليد)','🧊 Solid (ice)'),L('💧 سائل (ماء)','💧 Liquid (water)'),L('♨️ غاز (بخار)','♨️ Gas (steam)')][st],14,16,{size:14,align:'left',bold:true,col:C.purple});
  D.text(c,p.T+' °C = '+Tk+' K',W-14,16,{size:12,align:'right',ltr:true,bold:true,col:C.red});
  D.text(c,[L('الجزيئات تهتز في أماكنها','particles vibrate in place'),L('الجزيئات تنزلق حول بعض','particles slide past each other'),L('الجزيئات حرّة وسريعة','particles move fast and free')][st],bx+bw/2,H-12,{size:11,col:C.ink2})}},
gas:{name:T('غاز داخل أسطوانة بمكبس','Gas in a piston'),
 ctl:[{k:'V',lab:T('الحجم','Volume'),min:1,max:10,step:.5,v:4,unit:'L'},{k:'T',lab:T('درجة الحرارة','Temperature'),min:100,max:600,step:10,v:300,unit:'K'}],
 init(s){const r=EB.rand(9);s.P=[];for(let i=0;i<30;i++){const a=r()*PI*2;s.P.push({x:r(),y:r(),vx:Math.cos(a),vy:Math.sin(a)})}s.hits=0},
 draw(c,W,H,dt,s,p){const n=.1,P=n*8.314*p.T/p.V,maxW=W*.6,bx=14,by=40,bh=H-74,bw=maxW*(p.V/10),sp=.55*Math.sqrt(p.T/300)*(maxW/bw)*.5;
  D.box(c,bx,by,maxW+24,bh,'rgba(0,0,0,.03)',C.ink2,6,1.5);
  c.fillStyle='rgba(201,162,39,.15)';c.fillRect(bx+2,by+2,bw,bh-4);
  s.P.forEach(q=>{q.x+=q.vx*sp*dt;q.y+=q.vy*sp*dt*(bw/bh);if(q.x<0){q.x=0;q.vx*=-1}if(q.x>1){q.x=1;q.vx*=-1}if(q.y<0){q.y=0;q.vy*=-1}if(q.y>1){q.y=1;q.vy*=-1}D.circle(c,bx+6+q.x*(bw-12),by+6+q.y*(bh-12),4.6,C.purple,C.ink,.8)});
  c.fillStyle='#b9bcc8';c.fillRect(bx+bw,by+2,12,bh-4);c.strokeStyle=C.ink;c.lineWidth=2;c.strokeRect(bx+bw,by+2,12,bh-4);c.fillRect(bx+bw+12,by+bh/2-5,maxW+20-bw,10);c.strokeRect(bx+bw+12,by+bh/2-5,maxW+20-bw,10);
  const gx=W-Math.min(60,W*.14)-10,gy=by+50,gr=Math.min(52,W*.13);D.circle(c,gx,gy,gr,'#fff',C.ink,2.5);for(let i=0;i<=10;i++){const a=PI*.75+i*PI*1.5/10;D.line(c,gx+Math.cos(a)*gr*.82,gy+Math.sin(a)*gr*.82,gx+Math.cos(a)*gr*.95,gy+Math.sin(a)*gr*.95,C.ink,1.3);if(i%5===0)D.text(c,String(i*50),gx+Math.cos(a)*gr*.62,gy+Math.sin(a)*gr*.62,{size:9,ltr:true,col:C.ink2})}
  const na=PI*.75+Math.min(1,P/500)*PI*1.5;D.line(c,gx,gy,gx+Math.cos(na)*gr*.8,gy+Math.sin(na)*gr*.8,C.red,2.5);D.circle(c,gx,gy,3,C.ink);D.text(c,'kPa',gx,gy+gr*.45,{size:9,ltr:true});
  D.text(c,'P = '+f(P,1)+' kPa',gx,gy+gr+18,{size:13,bold:true,col:C.red,ltr:true});
  D.text(c,'PV = nRT   ('+f(P,1)+' × '+p.V+' = 0.1 × 8.314 × '+p.T+')',14,16,{size:11,align:'left',ltr:true,bold:true,col:C.blue});
  D.text(c,L('حجم أقل أو حرارة أعلى ← تصادمات أكثر بالجدران ← ضغط أكبر','Less volume or more heat → more wall hits → more pressure'),W/2,H-12,{size:10,col:C.purple})}},
ph:{name:T('مقياس الحموضة pH','The pH scale'),
 ctl:[{k:'ph',lab:T('قيمة pH','pH value'),min:0,max:14,step:.1,v:7}],
 draw(c,W,H,dt,s,p,t){const col=v=>{const st=[[0,[200,30,40]],[3,[240,120,30]],[5,[240,210,50]],[7,[60,170,70]],[9,[40,110,200]],[11,[60,50,170]],[14,[110,40,140]]];for(let i=1;i<st.length;i++)if(v<=st[i][0]){const[a,ca]=st[i-1],[b,cb]=st[i],k=(v-a)/(b-a);return `rgb(${ca.map((x,j)=>Math.round(x+(cb[j]-x)*k)).join(',')})`}return 'rgb(110,40,140)'};
  const bx=W*.07,bw=W*.3,by=44,bh=H-120;c.fillStyle=col(p.ph);const lv=by+bh*.28+Math.sin(t*2)*1.5;c.beginPath();c.moveTo(bx+4,lv);c.lineTo(bx+bw-4,lv);c.lineTo(bx+bw-4,by+bh-6);c.quadraticCurveTo(bx+bw-4,by+bh,bx+bw-10,by+bh);c.lineTo(bx+10,by+bh);c.quadraticCurveTo(bx+4,by+bh,bx+4,by+bh-6);c.closePath();c.globalAlpha=.85;c.fill();c.globalAlpha=1;
  c.strokeStyle=C.ink;c.lineWidth=2.5;c.beginPath();c.moveTo(bx-6,by);c.lineTo(bx,by+4);c.lineTo(bx,by+bh-8);c.quadraticCurveTo(bx,by+bh+2,bx+10,by+bh+2);c.lineTo(bx+bw-10,by+bh+2);c.quadraticCurveTo(bx+bw,by+bh+2,bx+bw,by+bh-8);c.lineTo(bx+bw,by+4);c.lineTo(bx+bw+6,by);c.stroke();
  const sx=W*.44,sw=W*.52,sy=by+10,sh=22;for(let i=0;i<140;i++){c.fillStyle=col(i/10);c.fillRect(sx+i/140*sw,sy,sw/140+1,sh)}c.strokeStyle=C.ink;c.lineWidth=1.5;c.strokeRect(sx,sy,sw,sh);
  for(let i=0;i<=14;i+=1)D.text(c,String(i),sx+i/14*sw,sy+sh+11,{size:9,ltr:true,col:C.ink2});
  const mx=sx+p.ph/14*sw;D.arrow(c,mx,sy-14,mx,sy-2,C.ink,2,8);
  const ex=[[2,'🍋',T('ليمون','lemon')],[5,'☕',T('قهوة','coffee')],[7,'💧',T('ماء نقي','pure water')],[9,'🧁',T('بيكربونات','baking soda')],[12.5,'🧴',T('مُبيّض','bleach')]];
  ex.forEach(([v,ic,nm],i)=>{const x=sx+v/14*sw,y=sy+sh+30+(i%2)*30;D.line(c,x,sy+sh+18,x,y-8,'rgba(35,37,46,.3)',1);D.text(c,ic,x,y,{size:14});D.text(c,L(nm),x,y+14,{size:9,col:C.ink2})});
  const H1=Math.pow(10,-p.ph),kind=p.ph<6.95?L('حمضي','acidic'):p.ph>7.05?L('قاعدي','basic'):L('متعادل','neutral');
  D.text(c,kind,sx+sw/2,H-50,{size:18,bold:true,col:col(p.ph)});D.text(c,'[H⁺] = 10^−'+f(p.ph,1)+' = '+H1.toExponential(1)+' mol/L',sx+sw/2,H-26,{size:11,ltr:true,col:C.ink});
  D.text(c,'pH = '+f(p.ph,1),14,16,{size:14,align:'left',ltr:true,bold:true,col:C.ink})}},
react:{name:T('2H₂ + O₂ → 2H₂O : عُدّ الذرات','2H₂ + O₂ → 2H₂O: count the atoms'),
 ctl:[{k:'h',lab:T('جزيئات H₂','H₂ molecules'),min:0,max:12,step:1,v:6},{k:'o',lab:T('جزيئات O₂','O₂ molecules'),min:0,max:8,step:1,v:2}],
 draw(c,W,H,dt,s,p,t){const w=Math.min(p.h,2*p.o),lh=p.h-w,lo=p.o-w/2;const gw=(W-60)/2,gy=48,gh=H-108;
  D.box(c,14,gy,gw,gh,'rgba(30,68,200,.04)',C.ink2,8,1.5);D.box(c,W-14-gw,gy,gw,gh,'rgba(15,107,68,.05)',C.ink2,8,1.5);D.arrow(c,W/2-16,gy+gh/2,W/2+16,gy+gh/2,C.ink,3,11);
  D.text(c,L('قبل التفاعل','before'),14+gw/2,gy-12,{size:12,bold:true});D.text(c,L('بعد التفاعل','after'),W-14-gw/2,gy-12,{size:12,bold:true});
  const r=Math.max(5,Math.min(9,gw/26));
  const place=(x0,list)=>{const cols=Math.max(2,Math.floor(gw/(r*5.4)));list.forEach((m,i)=>{const cx=x0+r*3+(i%cols)*r*5.2+r,cy=gy+r*3+Math.floor(i/cols)*r*4.4+Math.sin(t*2+i)*1.2;m(cx,cy)})};
  const H2=(x,y)=>{D.circle(c,x-r*.55,y,r*.75,HYD,C.ink,1.2);D.circle(c,x+r*.55,y,r*.75,HYD,C.ink,1.2)},O2=(x,y)=>{D.circle(c,x-r*.65,y,r,HRED,C.ink,1.2);D.circle(c,x+r*.65,y,r,HRED,C.ink,1.2)},W2=(x,y)=>{D.circle(c,x,y,r,HRED,C.ink,1.2);D.circle(c,x-r*.95,y+r*.6,r*.7,HYD,C.ink,1.2);D.circle(c,x+r*.95,y+r*.6,r*.7,HYD,C.ink,1.2)};
  place(14,[...Array(p.h).fill(H2),...Array(p.o).fill(O2)]);place(W-14-gw,[...Array(w).fill(W2),...Array(lh).fill(H2),...Array(lo).fill(O2)]);
  const by=gy+gh+16;D.text(c,'H: '+2*p.h+'   O: '+2*p.o,14+gw/2,by,{size:12,ltr:true,bold:true});D.text(c,'H: '+(2*w+2*lh)+'   O: '+(w+2*lo),W-14-gw/2,by,{size:12,ltr:true,bold:true});
  D.text(c,L('✓ عدد الذرات نفسه قبل وبعد — المادة لا تفنى','✓ Same atoms before and after — mass is conserved'),W/2,by+20,{size:11,col:C.green,bold:true});
  const lim=w===0?'':lh>0?L('المادة المحددة: O₂ — يزيد ','Limiting reagent: O₂ — left over: ')+lh+' H₂':lo>0?L('المادة المحددة: H₂ — يزيد ','Limiting reagent: H₂ — left over: ')+lo+' O₂':L('نسبة مثالية 2 : 1 — ما يزيد شي','Perfect 2 : 1 ratio — nothing left over');
  D.text(c,w+' H₂O  '+(lim?'· '+lim:''),14,16,{size:12,align:'left',bold:true,col:C.blue})}}
};

EB.register({id:'chemistry',ic:'⚗️',c:['#4A2A8F','#251147'],n:T('الكيمياء','Chemistry'),
 desc:T('من الذرة الصغيرة إلى التفاعلات الكبيرة — شوف الجزيئات تتحرك وعُدّها بنفسك.','From the tiny atom to big reactions — watch particles move and count them yourself.'),
 sims,
 lessons:[
 {t:T('تركيب الذرة','Atomic structure'),sim:'atom',
  p:T('كل مادة مكوّنة من ذرات. في مركز الذرة نواة فيها بروتونات موجبة ونيوترونات متعادلة، وحولها إلكترونات سالبة تتوزع على مستويات طاقة (أغلفة). عدد البروتونات هو اللي يحدد نوع العنصر.','All matter is made of atoms. At the centre is a nucleus of positive protons and neutral neutrons, surrounded by negative electrons arranged in energy levels (shells). The number of protons decides which element it is.'),
  pts:[T('الغلاف الأول يتسع لـ 2 إلكترون، والثاني لـ 8','Shell 1 holds 2 electrons, shell 2 holds 8'),T('في الذرة المتعادلة: البروتونات = الإلكترونات','In a neutral atom: protons = electrons'),T('العدد الكتلي = بروتونات + نيوترونات','Mass number = protons + neutrons')],
  eq:'Z = p⁺ = e⁻',eqn:T('العدد الذري = عدد البروتونات','atomic number = number of protons'),
  q:T('ذرة الصوديوم Z = 11. كيف تتوزع إلكتروناتها؟','Sodium has Z = 11. How are its electrons arranged?'),a:T('<b>2، 8، 1</b> — وإلكترون التكافؤ الواحد يخليه نشيط جدًا','<b>2, 8, 1</b> — that single outer electron makes it very reactive')},
 {t:T('حالات المادة','States of matter'),sim:'states',
  p:T('المادة تكون صلبة أو سائلة أو غازية حسب سرعة جزيئاتها وقوة تجاذبها. لما نسخّن، الجزيئات تتحرك أسرع: الجليد يذوب ثم الماء يغلي ويصير بخار.','Matter is solid, liquid or gas depending on how fast its particles move and how strongly they attract. Heat makes particles faster: ice melts, then water boils into steam.'),
  pts:[T('الصلب: شكل وحجم ثابتين','Solid: fixed shape and volume'),T('السائل: حجم ثابت ويأخذ شكل الإناء','Liquid: fixed volume, takes the container’s shape'),T('الغاز: ينتشر ويملأ الإناء كله','Gas: spreads to fill the whole container')],
  eq:'T(K) = T(°C) + 273',eqn:T('درجة الحرارة مقياس لمتوسط طاقة حركة الجزيئات','temperature measures the average kinetic energy of particles'),
  q:T('عند أي درجة حرارة يغلي الماء عند مستوى سطح البحر؟ وكم تساوي بالكلفن؟','At what temperature does water boil at sea level? What is that in kelvin?'),a:T('<b>100 °C = 373 K</b>','<b>100 °C = 373 K</b>')},
 {t:T('قانون الغاز المثالي','The ideal gas law'),sim:'gas',
  p:T('ضغط الغاز سببه اصطدام جزيئاته بجدران الإناء. لو صغّرنا الحجم، الجزيئات تصطدم أكثر فيزيد الضغط. ولو سخّنا، تصير أسرع فيزيد الضغط بعد.','Gas pressure comes from particles hitting the walls. Squeeze the volume and they hit more often, so pressure rises. Heat it and they move faster, so pressure rises too.'),
  pts:[T('<b>P</b> الضغط · <b>V</b> الحجم · <b>T</b> الحرارة بالكلفن','<b>P</b> pressure · <b>V</b> volume · <b>T</b> temperature in kelvin'),T('<b>n</b> عدد المولات · <b>R</b> = 8.314 J/(mol·K)','<b>n</b> moles · <b>R</b> = 8.314 J/(mol·K)'),T('قانون بويل: عند ثبات T يكون P × V ثابت','Boyle’s law: at constant T, P × V is constant')],
  eq:'P V = n R T',
  q:T('إذا ضاعفنا حجم الغاز مع ثبات درجة الحرارة، ماذا يحدث للضغط؟','If we double the volume at constant temperature, what happens to the pressure?'),a:T('<b>يقل للنصف</b> لأن P × V يبقى ثابت','<b>It halves</b>, because P × V stays constant')},
 {t:T('الأحماض والقواعد','Acids and bases'),sim:'ph',
  p:T('مقياس pH يقيس تركيز أيونات الهيدروجين من 0 إلى 14. أقل من 7 حمضي مثل الليمون، و7 متعادل مثل الماء النقي، وأكثر من 7 قاعدي مثل الصابون. والكاشف العام يتغير لونه حسب القيمة.','The pH scale measures hydrogen-ion concentration from 0 to 14. Below 7 is acidic like lemon juice, 7 is neutral like pure water, above 7 is basic like soap. Universal indicator changes colour with pH.'),
  pts:[T('كل نقصان 1 في pH = حموضة أقوى 10 مرات','Each step down of 1 = 10 times more acidic'),T('الحمض يعطي أيونات H⁺','Acids release H⁺ ions'),T('القاعدة تعطي أيونات OH⁻','Bases release OH⁻ ions')],
  eq:'pH = −log[H⁺]',
  q:T('محلول تركيز أيون الهيدروجين فيه 10⁻³ mol/L. كم pH؟ وهل هو حمضي أم قاعدي؟','A solution has [H⁺] = 10⁻³ mol/L. What is its pH — acidic or basic?'),a:T('<b>pH = 3</b> ← حمضي','<b>pH = 3</b> → acidic')},
 {t:T('موازنة التفاعل الكيميائي','Balancing a chemical reaction'),sim:'react',
  p:T('في التفاعل الكيميائي الذرات ما تختفي ولا تنخلق، بس تعيد ترتيب نفسها. لهذا نوازن المعادلة بحيث عدد كل نوع ذرة يكون نفسه في الطرفين. وإذا كانت مادة أقل من اللازم، تخلص أولًا وتسمى «المادة المحددة».','In a reaction atoms are never lost or made — they just rearrange. So we balance the equation: each kind of atom must appear the same number of times on both sides. The reactant that runs out first is the “limiting reagent”.'),
  pts:[T('المعاملات (الأرقام الكبيرة) تعني عدد الجزيئات','Coefficients (big numbers) count molecules'),T('النسبة هنا: 2 H₂ لكل 1 O₂','Here the ratio is 2 H₂ to 1 O₂'),T('قانون حفظ الكتلة — لافوازييه','Law of conservation of mass — Lavoisier')],
  eq:'2H₂ + O₂ → 2H₂O',
  q:T('عندك 6 جزيئات H₂ وجزيئان O₂. كم جزيء ماء ينتج؟ وما الزائد؟','You have 6 H₂ and 2 O₂. How many water molecules form, and what is left over?'),a:T('<b>4 H₂O</b> ويبقى <b>2 H₂</b> زائدة — O₂ هو المادة المحددة','<b>4 H₂O</b>, with <b>2 H₂</b> left over — O₂ is limiting')}
 ]});
})();
