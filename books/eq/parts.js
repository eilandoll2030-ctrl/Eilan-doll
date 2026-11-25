import {PARTS2} from './parts2.js';
/* قطع المجسمات: لكل مشهد قائمة بقطعه بنفس ترتيب ظهورها في scenes.js.
   n: الاسم [عربي، إنجليزي] · r: دورها (يظهر في خطوات البناء ورسالة التوقف)
   e: أساسية (بدونها تتوقف المعادلة) · b: قاعدة ثابتة لا تُشال · s: رموز تصير صفرًا عند إزالتها */
const P=(ar,en,ra,re,o={})=>({n:[ar,en],r:[ra,re],...o});
const CARD=P('بطاقة المعادلة','Equation card','تعرض الصيغة فوق الصفحة','shows the formula on the page');
const rep=(n,f)=>Array.from({length:n},(_,i)=>f(i));
export const PARTS={
 energy:eq=>{const map={Ek:1,Ep:4,Es:5,Qh:2,Ue:6,Eph:7};const main=map[eq.out]||4;const L=[
  P('رفّ مخازن الطاقة','Energy-store shelf','كل برطمان يمثل نوعًا من الطاقة','each jar is one kind of energy store',{b:1}),
  P('الدراجة','Bicycle','تخزن طاقة حركة وهي تتحرك','stores kinetic energy as it moves'),
  P('كوب الشاي','Cup of tea','يخزن طاقة حرارية','stores thermal energy'),
  P('البطارية','Battery','تخزن طاقة كيميائية','stores chemical energy'),
  P('الكرة المرفوعة','Raised ball','تخزن طاقة وضع بسبب ارتفاعها','stores potential energy because of its height'),
  P('النابض','Spring','يخزن طاقة مرونة لما ينضغط','stores elastic energy when squeezed'),
  P('المغناطيس','Magnet','يخزن طاقة في مجاله','stores energy in its field'),
  P('الشمس','Sun','مصدر طاقة الضوء','the source of light energy')];L[main].e=1;L[main].r=[L[main].r[0]+' — وهي مصدر الطاقة في هذي المعادلة',L[main].r[1]+' — the energy source in this equation'];return L},
 motion:eq=>[P('المسار','Track','الأرض اللي تتحرك عليها العربة','the ground the cart moves on',{b:1}),
  P('العربة','Cart','الجسم اللي تؤثر عليه القوة','the body the force acts on',{e:1,s:['m','m1']}),
  ...(eq.cat==='mom'?[P('العربة الثانية','Second cart','الجسم الثاني في التصادم','the second body in the collision',{e:1,s:['m2']})]:[]),CARD],
 fall:()=>[P('البرج','Tower','نقطة الإطلاق على ارتفاع','the launch point up high',{e:1,s:['h','H']}),P('المسطرة','Ruler','لقياس الارتفاع','for measuring height'),
  P('الكرة','Ball','الجسم اللي يسقط أو ينقذف','the body that falls or is thrown',{e:1,s:['m']}),P('الأرض','Ground','نهاية المسار','the end of the path',{b:1})],
 wheel:()=>[P('العجلة','Wheel','الجسم اللي يدور','the body that spins',{e:1,s:['Ir','I','m']}),P('التروس','Gears','تنقل الدوران من ترس لآخر','pass the rotation from gear to gear')],
 orbit:()=>[P('الشمس والكواكب','Sun and planets','الكتلة الكبيرة اللي تجذب الكواكب','the big mass that pulls the planets',{e:1,s:['M','Mp','Msun']})],
 pendulum:eq=>{const spr=eq.ins.some(k=>['k','ks1','ks2','plms'].includes(k))||eq.out==='k'||/spring|نابض/i.test(eq.n[1]+eq.n[0]);return[
  P('حامل المختبر','Lab stand','قاعدة حديد وعمود وذراع يتعلّق فيه البندول والنابض','an iron base, rod and arm that hold the pendulum and the spring',{b:1}),
  P('المنقلة','Protractor','نقيس فيها زاوية بداية التأرجح','measures the starting angle of the swing'),
  P('البندول','Pendulum','كرة نحاس على خيط تتأرجح ذهاب وإياب','a brass bob on a thread swinging to and fro',spr?{}:{e:1,s:['Lp','plL']}),
  P('النابض والأثقال','Spring and slotted masses','النابض يمتط بالأثقال ويهتز فوق وتحت','the spring stretches under the masses and bobs up and down',spr?{e:1,s:['k','plk']}:{}),
  P('المسطرة المترية','Metre rule','نقيس فيها الطول والاستطالة','measures length and extension'),
  P('ساعة الإيقاف','Stopwatch','تحسب الزمن وعدد الاهتزازات','counts the time and the oscillations'),CARD]},
 fluid:()=>[P('حوض الماء','Water tank','السائل اللي فيه الضغط والطفو','the liquid with pressure and buoyancy',{e:1,s:['rho','rhof']}),P('مقياس الضغط','Pressure gauge','يقيس الضغط','measures the pressure')],
 heat:()=>[P('الموقد','Burner','مصدر الحرارة','the source of heat',{e:1,s:['Qh','dT']}),P('الترمومتر','Thermometer','يقيس درجة الحرارة','measures temperature'),P('الكوب','Cup','جسم يبرد ويسخن','a body that warms and cools')],
 gas:()=>[P('الأسطوانة والمكبس','Cylinder and piston','وعاء الغاز','the container holding the gas',{e:1,s:['V','VL','Vgas']}),P('مقياس الضغط','Pressure gauge','يقيس ضغط الغاز','measures gas pressure')],
 wave:()=>[P('السماعة','Speaker','مصدر الاهتزاز اللي يصنع الموجة','the vibrating source that makes the wave',{e:1,s:['f','fs','A']}),P('الحامل','End post','نهاية الوتر','the end of the string'),CARD],
 charges:()=>[P('الشحنة الموجبة','Positive charge','الشحنة الأولى','the first charge',{e:1,s:['q1','q']}),P('الشحنة السالبة','Negative charge','الشحنة الثانية','the second charge',{e:1,s:['q2']})],
 circuit:()=>[P('اللوح','Board','قاعدة الدائرة','the circuit base',{b:1}),
  P('البطارية','Battery','مصدر الجهد اللي يدفع الإلكترونات','the voltage source that pushes the electrons',{e:1,s:['Vv','emf','Ecell','E0','Vin','Vbe','V0a','Vrms']}),
  P('المصباح','Bulb','يحوّل الكهرباء لضوء ويكمل الدائرة','turns electricity into light and closes the loop',{e:1}),
  P('المقاومة','Resistor','تتحكم في مقدار التيار','controls how much current flows',{e:1,s:['Rres','R1','Rl']}),
  P('المفتاح','Switch','يفتح ويغلق الدائرة','opens and closes the circuit',{e:1})],
 magnet:()=>[P('المغناطيس','Magnet','مصدر المجال المغناطيسي','the source of the magnetic field',{e:1,s:['B','Bf','Phi']}),...rep(7,i=>P('بوصلة '+(i+1),'Compass '+(i+1),'تشير لاتجاه المجال','points along the field')),P('الملف','Coil','يتولد فيه تيار عند تغير المجال','current is induced in it when the field changes')],
 optics:()=>[P('المسار البصري','Optical rail','قاعدة الأجهزة','holds the parts',{b:1}),P('الشمعة','Candle','مصدر الضوء (الجسم)','the light source (the object)',{e:1}),P('العدسة','Lens','تجمّع الأشعة وتكوّن الصورة','bends rays to form the image',{e:1,s:['fl','Dp']}),P('الشاشة','Screen','تظهر عليها الصورة','shows the image')],
 atom:()=>[P('الذرة','Atom','النواة والإلكترونات','the nucleus and electrons',{e:1})],
 beaker:()=>[P('الكأس','Beaker','المحلول اللي يصير فيه التفاعل','the solution where it all happens',{e:1}),P('الدورق','Flask','محلول ثاني للمقارنة','a second solution for comparison'),P('حامل الأنابيب','Test-tube rack','عينات ملوّنة','coloured samples'),CARD],
 molecule:()=>[P('جزيء الماء','Water molecule','H₂O','H₂O'),P('ثاني أكسيد الكربون','Carbon dioxide','CO₂','CO₂'),P('الميثان','Methane','CH₄','CH₄'),P('الأمونيا','Ammonia','NH₃','NH₃'),CARD],
 solids:()=>[P('المجسم الرئيسي','Main solid','الشكل اللي تحسب له المعادلة','the shape this equation measures',{e:1}),...rep(5,i=>P('مجسم '+(i+1),'Solid '+(i+1),'أشكال للمقارنة','shapes for comparison')),CARD],
 graph:()=>[P('لوحة الرسم البياني','Graph board','يرسم عليها منحنى المعادلة','the equation’s curve is drawn on it',{e:1}),P('القاعدة','Base','تحمل اللوحة','holds the board',{b:1})],
 dice:()=>[P('حجر النرد 1','Die 1','اضغط عليه ليتدحرج','tap it to roll'),P('حجر النرد 2','Die 2','اضغط عليه ليتدحرج','tap it to roll'),...rep(11,i=>P('عمود '+(i+1),'Bar '+(i+1),'جزء من التوزيع','part of the distribution')),P('القاعدة','Base','تحمل الأعمدة','holds the bars',{b:1})],
 coins:()=>[...rep(6,i=>P('رصّة السنة '+(2*i),'Year '+(2*i)+' stack','المال في تلك السنة','the money in that year',{e:i===0,s:i===0?['Pm','PV']:undefined})),P('القاعدة','Base','تحمل الرصّات','holds the stacks',{b:1}),P('الحصّالة','Piggy bank','مكان الادخار','where savings go'),CARD],
 plant:()=>[P('النبتة','Plant','الكائن الحي في المعادلة','the living thing in the equation',{e:1}),P('الخلية','Cell','وحدة بناء الكائن الحي','the building block of life'),P('الشمس','Sun','مصدر الضوء والطاقة','the source of light and energy'),CARD],
 blocks:()=>[P('المكعبات','Blocks','تمثل حدود المتتالية أو البيانات','stand for the terms or the data',{e:1}),CARD]
};
Object.assign(PARTS,PARTS2);
