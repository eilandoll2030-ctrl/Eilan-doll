/* موسوعة معادلات إيلان — ماكسويل والموجات الكهرومغناطيسية، الهندسة الكهربائية والميكانيكية، الفلك المتقدم، الأعمال والمحاسبة، مركبات عضوية */
EQ.syms(`
# ---- EM waves
E0w|E₀|سعة المجال الكهربائي|electric-field amplitude|V/m|100
B0w|B₀|سعة المجال المغناطيسي|magnetic-field amplitude|T|3.34e-7
Sint|I|شدة الموجة|wave intensity|W/m²|13.3
prad|p|ضغط الإشعاع|radiation pressure|Pa|4.4e-8
Zfree|Z₀|ممانعة الفراغ|impedance of free space|Ω|376.7
fskin|f|التردد|frequency|Hz|50
dskin|δ|عمق القشرة|skin depth|m|0.0093
murel|μ_r|النفاذية النسبية|relative permeability||1
Gant|G|كسب الهوائي|antenna gain||1
Prx|P_r|القدرة المستقبلة|received power|W|1e-9
Ptx|P_t|القدرة المرسلة|transmitted power|W|10
# ---- electrical engineering
VL3|V_L|جهد الخط|line voltage|V|400
IL3|I_L|تيار الخط|line current|A|10
VP3|V_ph|جهد الطور|phase voltage|V|230.9
P3|P|القدرة الفعالة|real power|W|5543
S3|S|القدرة الظاهرية|apparent power|VA|6928
Q3|Q|القدرة غير الفعالة|reactive power|var|4157
nsync|n_s|السرعة التزامنية|synchronous speed|rpm|1500
poles|p|عدد الأقطاب|number of poles||4
fgrid|f|تردد الشبكة|grid frequency|Hz|50
nrotor|n_r|سرعة الدوار|rotor speed|rpm|1440
slip|s|الانزلاق|slip|%|4
Pin_|P_in|القدرة الداخلة|input power|W|1000
Pout_|P_out|القدرة الخارجة|output power|W|900
etaE|η|الكفاءة|efficiency|%|90
Iline|I|التيار|current|A|20
Rline|R|مقاومة الخط|line resistance|Ω|0.5
Ploss|P_loss|فقد الخط|line loss|W|200
Vdrop|ΔV|هبوط الجهد|voltage drop|V|10
dBgain|G|الكسب|gain|dB|20
Vratio|V_out/V_in|نسبة الجهد|voltage ratio||10
Qq|q|الشحنة|charge|C|0.5
mAhb|Q|السعة|capacity|Ah|2
Crate|C|معدل الشحن|C-rate|1/h|0.5
Ichg|I|التيار|current|A|1
Npar|n|عدد الوحدات|number of units||3
# ---- mechanical engineering
Tsh|T|العزم المنقول|torque transmitted|N·m|500
dsh|d|قطر العمود|shaft diameter|m|0.05
taush|τ|إجهاد القص|shear stress|Pa|2.04e7
Gmod|G|معامل القص|shear modulus|Pa|8e10
Lsh|L|طول العمود|shaft length|m|1
twist|θ|زاوية الالتواء|angle of twist|°|0.29
dwire|d|قطر سلك النابض|spring wire diameter|m|0.005
Dcoil|D|قطر الملف|coil diameter|m|0.04
Nact|N|عدد اللفات الفعالة|active coils||10
kspr|k|ثابت النابض|spring constant|N/m|4883
D1p|D₁|قطر البكرة الأولى|pulley 1 diameter|m|0.1
D2p|D₂|قطر البكرة الثانية|pulley 2 diameter|m|0.3
n1p|n₁|سرعة البكرة الأولى|pulley 1 speed|rpm|1500
n2p|n₂|سرعة البكرة الثانية|pulley 2 speed|rpm|500
T1b|T₁|شد الجانب المشدود|tight-side tension|N|1000
T2b|T₂|شد الجانب الرخو|slack-side tension|N|300
vbelt|v|سرعة السير|belt speed|m/s|8
Pbelt|P|القدرة المنقولة|power transmitted|W|5600
mufr|μ|معامل الاحتكاك|friction coefficient||0.3
wrap|θ|زاوية التفاف السير|wrap angle|°|180
hconv|h|معامل انتقال الحرارة|heat-transfer coefficient|W/(m²·K)|25
Qconv|Q̇|معدل انتقال الحرارة|heat-transfer rate|W|500
Rth|R|المقاومة الحرارية|thermal resistance|K/W|0.2
rcomp|r|نسبة الانضغاط|compression ratio||10
mod_g|m|موديول الترس|gear module|mm|2
zg|z|عدد الأسنان|number of teeth||30
dpitch|d|قطر الخطوة|pitch diameter|mm|60
# ---- advanced astronomy
Lsun|L|اللمعان|luminosity|L☉|1
Msol|M|الكتلة|mass|M☉|1
tlife|t|العمر على النسق الأساسي|main-sequence lifetime|billion years|10
Rsch|r_s|نصف قطر شفارتزشيلد|Schwarzschild radius|m|2954
Mbh|M|كتلة الجسم|mass of the body|kg|1.989e30
Roche|d|حد روش|Roche limit|m|1.8e7
Rprim|R|نصف قطر الجسم الرئيسي|primary radius|m|6.371e6
rhoM|ρ_M|كثافة الجسم الرئيسي|primary density|kg/m³|5514
rhom|ρ_m|كثافة القمر|satellite density|kg/m³|3344
hill|r_H|نصف قطر هيل|Hill radius|m|1.5e9
mpla|m|كتلة الكوكب|planet mass|kg|5.97e24
Mstar|M|كتلة النجم|star mass|kg|1.989e30
aorb|a|نصف المحور الأكبر|semi-major axis|m|1.496e11
Tcmb|T|درجة حرارة الإشعاع الخلفي|CMB temperature|K|2.725
zred|z|الانزياح نحو الأحمر|redshift||1100
tage|t|عمر الكون التقريبي|approximate age of the universe|billion years|13.97
Hub|H₀|ثابت هابل|Hubble constant|km/s/Mpc|70
dlyr|d|المسافة|distance|ly|4.24
dpc2|d|المسافة|distance|pc|1.3
Teq|T|درجة الحرارة المتوازنة|equilibrium temperature|K|255
Tsurf|T★|حرارة سطح النجم|stellar surface temperature|K|5772
Rsun2|R★|نصف قطر النجم|stellar radius|m|6.957e8
albp|A|انعكاسية الكوكب|planet albedo||0.3
# ---- business & accounting
sales|S|المبيعات|sales|SAR|100000
cogs|COGS|تكلفة البضاعة المباعة|cost of goods sold|SAR|60000
gprof|GP|الربح الإجمالي|gross profit|SAR|40000
netinc|NI|صافي الربح|net income|SAR|12000
assets|A|الأصول|total assets|SAR|200000
liab|L|الخصوم|liabilities|SAR|80000
equity|E|حقوق الملكية|equity|SAR|120000
curA|CA|الأصول المتداولة|current assets|SAR|50000
curL|CL|الخصوم المتداولة|current liabilities|SAR|25000
inv_|Inv|المخزون|inventory|SAR|15000
margin|%|الهامش|margin|%|40
roi|ROI|العائد على الاستثمار|return on investment|%|20
gain_|gain|الربح من الاستثمار|gain from investment|SAR|1200
invest|I|المبلغ المستثمر|amount invested|SAR|6000
bep|Q*|نقطة التعادل|break-even quantity|units|100
markup|%|نسبة الزيادة|mark-up|%|50
sellp|price|سعر البيع|selling price|SAR|150
costp|cost|سعر التكلفة|cost price|SAR|100
disc|%|الخصم|discount|%|20
vat|VAT|ضريبة القيمة المضافة|VAT rate|%|15
gross_|total|المبلغ مع الضريبة|total incl. VAT|SAR|115
net_|net|المبلغ قبل الضريبة|amount before VAT|SAR|100
custs|N|عدد العملاء|customers||1000
churn|%|نسبة المغادرة|churn rate|%|5
lost|lost|العملاء المغادرون|customers lost||50
arpu|ARPU|متوسط الإيراد للعميل|average revenue per user|SAR|50
cltv|CLV|قيمة العميل مدى الحياة|customer lifetime value|SAR|1000
cac|CAC|تكلفة جذب العميل|customer acquisition cost|SAR|200
mspend|spend|الإنفاق التسويقي|marketing spend|SAR|20000
newc|new|العملاء الجدد|new customers||100
convr|CR|نسبة التحويل|conversion rate|%|2
visits|visits|الزيارات|visits||5000
orders|orders|الطلبات|orders||100
`);

EQ.add('emw',`
معادلة ماكسويل الأولى (قانون غاوس)|Maxwell 1: Gauss’s law|∇·E = ρ / ε₀||||الشحنات مصدر المجال الكهربائي.|Charges are the source of electric fields.
معادلة ماكسويل الثانية|Maxwell 2: no magnetic monopoles|∇·B = 0||||ما فيه قطب مغناطيسي منفرد.|There is no single magnetic pole.
معادلة ماكسويل الثالثة (فاراداي)|Maxwell 3: Faraday’s law|∇×E = −∂B/∂t||||المجال المغناطيسي المتغير يولد كهرباء.|A changing magnetic field makes electricity.
معادلة ماكسويل الرابعة (أمبير-ماكسويل)|Maxwell 4: Ampère–Maxwell law|∇×B = μ₀J + μ₀ε₀ ∂E/∂t||||التيار والمجال الكهربائي المتغير يولدان مغناطيسية.|Currents and changing electric fields make magnetism.
العلاقة بين E و B في الموجة|E and B in a light wave|B₀ = E₀ / c|B0w|E0w/cl|E0w cl|المجال المغناطيسي صغير جدًا مقارنة بالكهربائي.|The magnetic field is tiny compared with the electric one.
شدة الموجة الكهرومغناطيسية|Intensity of an EM wave|I = E₀² / (2 μ₀ c)|Sint|E0w*E0w/(2*mu0*cl)|E0w mu0 cl|الطاقة اللي توصل لكل متر مربع.|Energy arriving per square metre.
ضغط الإشعاع (امتصاص)|Radiation pressure (absorbed)|p = I / c|prad|Sint/cl|Sint cl|الضوء يدفع! أساس الأشرعة الشمسية.|Light pushes! The idea behind solar sails.
ضغط الإشعاع (انعكاس)|Radiation pressure (reflected)|p = 2I / c|prad|2*Sint/cl|Sint cl|الانعكاس يضاعف الدفع.|Reflection doubles the push.
ممانعة الفراغ|Impedance of free space|Z₀ = √(μ₀ / ε₀)|Zfree|sqrt(mu0/e0)|mu0 e0|حوالي 377 أوم.|About 377 ohms.
متجه بوينتنغ|Poynting vector|S = (1/μ₀) E × B||||اتجاه سريان الطاقة.|The direction energy flows.
عمق القشرة في الموصل|Skin depth in a conductor|δ = √(2ρ / (ω μ))|dskin|sqrt(2*rhoe/(2*PI*fskin*murel*mu0))|rhoe fskin murel mu0|التيار المتردد يمشي قرب سطح السلك.|AC current flows near the wire’s surface.
معادلة فريس للإرسال|Friis transmission equation|P_r = P_t G_t G_r (λ / 4πd)²|Prx|Ptx*Gant*Gant*pow(lam/(4*PI*dist),2)|Ptx Gant lam dist|كم قدرة توصل للهوائي البعيد.|How much power reaches a distant antenna.
معادلة الموجة الكهرومغناطيسية|EM wave equation|∇²E = μ₀ε₀ ∂²E/∂t²||||من ماكسويل نطلع بالموجات.|Waves come straight out of Maxwell’s equations.
الطيف الكهرومغناطيسي|The electromagnetic spectrum|راديو < ميكروويف < تحت الأحمر < مرئي < فوق البنفسجي < سينية < غاما||||كلها ضوء بأطوال موجية مختلفة.|All light, with different wavelengths.
`);

EQ.add('ee',`
القدرة في نظام ثلاثي الطور|Three-phase power|P = √3 V_L I_L cos φ|P3|sqrt(3)*VL3*IL3*pfac|VL3 IL3 pfac|كهرباء المصانع والمباني الكبيرة.|Power for factories and big buildings.
جهد الطور من جهد الخط|Phase voltage from line voltage|V_ph = V_L / √3|VP3|VL3/sqrt(3)|VL3|في توصيلة النجمة.|In a star (Y) connection.
القدرة الظاهرية|Apparent power|S = √3 V_L I_L|S3|sqrt(3)*VL3*IL3|VL3 IL3|بالفولت أمبير.|In volt-amperes.
القدرة غير الفعالة|Reactive power|Q = √(S² − P²)|Q3|sqrt(S3*S3-P3*P3)|S3 P3|قدرة تروح وترجع بدون شغل مفيد.|Power that sloshes back and forth without doing work.
مثلث القدرة|Power triangle|S² = P² + Q²||||الفعالة والغير فعالة والظاهرية.|Real, reactive and apparent power.
السرعة التزامنية للمحرك|Synchronous speed of a motor|n_s = 120 f / p|nsync|120*fgrid/poles|fgrid poles|محرك 4 أقطاب على 50 هرتز = 1500 لفة.|A 4-pole motor on 50 Hz turns 1500 rpm.
انزلاق المحرك الحثي|Induction-motor slip|s = (n_s − n_r) / n_s × 100|slip|(nsync-nrotor)/nsync*100|nsync nrotor|الدوار دايمًا أبطأ شوي.|The rotor always lags a little.
كفاءة الآلة الكهربائية|Electrical machine efficiency|η = P_out / P_in × 100|etaE|Pout_/Pin_*100|Pout_ Pin_|الباقي يضيع حرارة.|The rest is lost as heat.
فقد القدرة في الخطوط|Power loss in lines|P = I² R|Ploss|Iline*Iline*Rline|Iline Rline|ليه ننقل الكهرباء بجهد عالي.|Why power is sent at high voltage.
هبوط الجهد في السلك|Voltage drop in a cable|ΔV = I R|Vdrop|Iline*Rline|Iline Rline|السلك الطويل يقلل الجهد عند الجهاز.|A long cable lowers the voltage at the device.
الشحنة من التيار والزمن|Charge from current and time|q = I t|Qq|Ichg*t|Ichg t|بالكولوم.|In coulombs.
معدل شحن البطارية|Battery C-rate|C = I / Q|Crate|Ichg/mAhb|Ichg mAhb|1C يعني تشحن في ساعة.|1C means a one-hour charge.
توصيل البطاريات على التوالي|Batteries in series|V = n × V_cell|Vv|Npar*vbat|Npar vbat|الجهد يزيد والسعة ثابتة.|Voltage adds up; capacity stays the same.
توصيل البطاريات على التوازي|Batteries in parallel|Ah = n × Ah_cell|ahbat|Npar*mAhb|Npar mAhb|السعة تزيد والجهد ثابت.|Capacity adds up; voltage stays the same.
قانونا كيرشوف|Kirchhoff’s laws|ΣI = 0 عند العقدة ، ΣV = 0 في الحلقة||||الشحنة والطاقة محفوظتان.|Charge and energy are conserved.
نظرية ثيفينن|Thévenin’s theorem|أي دائرة = V_th + R_th على التوالي||||تبسيط أي دائرة معقدة.|Simplifies any complicated circuit.
نظرية نورتن|Norton’s theorem|أي دائرة = I_N ∥ R_N||||الوجه الثاني لثيفينن.|The other face of Thévenin.
`);

EQ.add('me',`
إجهاد القص في العمود|Shear stress in a shaft|τ = 16 T / (π d³)|taush|16*Tsh/(PI*dsh**3)|Tsh dsh|العمود الأسمك يتحمل عزم أكبر.|A thicker shaft carries more torque.
زاوية التواء العمود|Angle of twist of a shaft|θ = 32 T L / (π d⁴ G)|twist|deg(32*Tsh*Lsh/(PI*dsh**4*Gmod))|Tsh Lsh dsh Gmod|بالدرجات.|In degrees.
القدرة المنقولة بالعمود|Power transmitted by a shaft|P = 2π n T / 60|P|2*PI*rpm*Tsh/60|rpm Tsh|بالواط.|In watts.
ثابت النابض الحلزوني|Coil-spring stiffness|k = G d⁴ / (8 D³ N)|kspr|Gmod*dwire**4/(8*Dcoil**3*Nact)|Gmod dwire Dcoil Nact|سلك أسمك = نابض أقسى.|Thicker wire means a stiffer spring.
سرعة البكرات والسير|Belt-and-pulley speeds|n₂ = n₁ D₁ / D₂|n2p|n1p*D1p/D2p|n1p D1p D2p|البكرة الكبيرة تدور أبطأ.|The big pulley turns slower.
القدرة المنقولة بالسير|Power transmitted by a belt|P = (T₁ − T₂) v|Pbelt|(T1b-T2b)*vbelt|T1b T2b vbelt|فرق الشد × السرعة.|Tension difference × speed.
معادلة الحبل على الأسطوانة (أويلر)|Capstan equation|T₁ / T₂ = e^(μθ)|ratio|exp(mufr*rad(wrap))|mufr wrap|ليه لف الحبل حول عمود يمسك حمل ثقيل.|Why wrapping a rope round a post holds a big load.
انتقال الحرارة بالحمل|Convective heat transfer|Q̇ = h A ΔT|Qconv|hconv*Ar*dT|hconv Ar dT|قانون نيوتن للتبريد.|Newton’s law of cooling.
المقاومة الحرارية للحمل|Convective thermal resistance|R = 1 / (h A)|Rth|1/(hconv*Ar)|hconv Ar|مثل مقاومة الكهرباء لكن للحرارة.|Like electrical resistance, but for heat.
الحرارة عبر مقاومة حرارية|Heat flow through a thermal resistance|Q̇ = ΔT / R|Qconv|dT/Rth|dT Rth|فرق الحرارة على المقاومة.|Temperature difference over resistance.
قطر خطوة الترس|Gear pitch diameter|d = m z|dpitch|mod_g*zg|mod_g zg|الموديول يحدد حجم الأسنان.|The module sets the tooth size.
الميزة الميكانيكية للرافعة|Mechanical advantage of a lever|MA = ذراع القوة / ذراع المقاومة||||ذراع أطول = قوة أقل.|A longer arm needs less force.
الميزة الميكانيكية للبكرات|Mechanical advantage of pulleys|MA = عدد الحبال الحاملة||||كل حبل إضافي يقسم الحمل.|Each extra supporting rope shares the load.
دورة أوتو (محرك البنزين)|Otto cycle (petrol engine)|η = 1 − 1/r^(γ − 1)|eta|(1-1/pow(rcomp,gamma-1))*100|rcomp gamma|نسبة الانضغاط الأعلى = كفاءة أعلى.|A higher compression ratio means higher efficiency.
`);

EQ.add('ast2',`
عمر النجم على النسق الأساسي|Main-sequence lifetime|t ≈ 10 × (M / M☉)^(−2.5)|tlife|10*pow(Msol,-2.5)|Msol|النجوم الكبيرة تعيش أقل بكثير.|Big stars live much shorter lives.
حد روش|Roche limit|d = 2.44 R (ρ_M / ρ_m)^(1/3)|Roche|2.44*Rprim*cbrt(rhoM/rhom)|Rprim rhoM rhom|أقرب من كذا والقمر يتفتت إلى حلقات.|Any closer and a moon breaks into rings.
نصف قطر هيل|Hill radius|r_H = a (m / 3M)^(1/3)|hill|aorb*cbrt(mpla/(3*Mstar))|aorb mpla Mstar|المنطقة اللي يتحكم فيها الكوكب بأقماره.|The zone where a planet holds on to its moons.
حرارة الإشعاع الخلفي في الماضي|CMB temperature in the past|T = 2.725 (1 + z)|Tcmb|2.725*(1+zred)|zred|الكون كان أحر لما كان أصغر.|The universe was hotter when it was younger.
زمن هابل (عمر الكون التقريبي)|Hubble time|t ≈ 977.8 / H₀|tage|977.8/Hub|Hub|بمليارات السنين.|In billions of years.
من السنة الضوئية إلى الفرسخ|Light-years to parsecs|pc = ly / 3.2616|dpc2|dlyr/3.2616|dlyr|أقرب نجم: 4.24 سنة ضوئية.|The nearest star: 4.24 light-years.
مخطط هرتزسبرونغ-راسل|Hertzsprung–Russell diagram|اللمعان مقابل الحرارة||||خريطة حياة النجوم.|A map of stellar lives.
`);

EQ.add('biz',`
الربح الإجمالي|Gross profit|GP = S − COGS|gprof|sales-cogs|sales cogs|قبل المصاريف الثانية.|Before other expenses.
هامش الربح الإجمالي|Gross margin|% = GP / S × 100|margin|gprof/sales*100|gprof sales|كم يتبقى من كل ريال مبيعات.|How much of each riyal of sales is left.
هامش صافي الربح|Net profit margin|% = NI / S × 100|margin|netinc/sales*100|netinc sales|بعد كل المصاريف.|After all expenses.
المعادلة المحاسبية|Accounting equation|A = L + E|assets|liab+equity|liab equity|أساس الميزانية العمومية.|The basis of every balance sheet.
نسبة التداول|Current ratio|CR = CA / CL|ratio|curA/curL|curA curL|قدرة الشركة على دفع ديونها القريبة.|Can the company pay its short-term debts?
النسبة السريعة|Quick ratio|QR = (CA − Inv) / CL|ratio|(curA-inv_)/curL|curA inv_ curL|بدون المخزون.|Excluding inventory.
نسبة الدين إلى حقوق الملكية|Debt-to-equity ratio|D/E = L / E|ratio|liab/equity|liab equity|كم الشركة معتمدة على الديون.|How much the company relies on debt.
العائد على الأصول|Return on assets|ROA = NI / A × 100|roi|netinc/assets*100|netinc assets|كفاءة استخدام الأصول.|How well assets are used.
العائد على حقوق الملكية|Return on equity|ROE = NI / E × 100|roi|netinc/equity*100|netinc equity|ربح الملاك على أموالهم.|Owners’ profit on their money.
نسبة الزيادة على التكلفة|Mark-up percentage|% = (price − cost) / cost × 100|markup|(sellp-costp)/costp*100|sellp costp|تختلف عن هامش الربح!|Not the same as margin!
السعر بعد الخصم|Price after a discount|price = p (1 − %/100)|sellp|priceU*(1-disc/100)|priceU disc|خصم 20% على 30 ريال = 24.|20% off 30 riyals is 24.
السعر مع ضريبة القيمة المضافة|Price including VAT|total = net × (1 + VAT/100)|gross_|net_*(1+vat/100)|net_ vat|ضريبة القيمة المضافة في السعودية 15%.|VAT in Saudi Arabia is 15%.
نسبة مغادرة العملاء|Customer churn rate|% = lost / N × 100|churn|lost/custs*100|lost custs|كم عميل تخسر كل شهر.|How many customers leave each month.
قيمة العميل مدى الحياة|Customer lifetime value|CLV = ARPU / churn|cltv|arpu/(churn/100)|arpu churn|كم يجيب لك العميل طول فترة بقائه.|What a customer brings in over their whole stay.
تكلفة جذب العميل|Customer acquisition cost|CAC = spend / new|cac|mspend/newc|mspend newc|كم يكلفك كل عميل جديد.|What each new customer costs you.
نسبة التحويل|Conversion rate|CR = orders / visits × 100|convr|orders/visits*100|orders visits|من كل 100 زائر، كم اشترى.|Out of every 100 visitors, how many bought.
`);

EQ.add('org2',`
البروبان|Propane|C₃H₈||||غاز الشواء.|Barbecue gas.
البنتان|Pentane|C₅H₁₂||||مذيب سريع التبخر.|A fast-evaporating solvent.
الأوكتان|Octane|C₈H₁₈||||معيار جودة البنزين.|The benchmark for petrol quality.
البروبين (البروبيلين)|Propene (propylene)|C₃H₆||||منه يُصنع البولي بروبيلين.|Used to make polypropylene.
الميثانول|Methanol|CH₃OH||||كحول سام، وقود ومذيب.|A toxic alcohol: fuel and solvent.
الجلسرين|Glycerol|C₃H₅(OH)₃||||في الصابون ومستحضرات التجميل.|In soaps and cosmetics.
الإيثيلين جلايكول|Ethylene glycol|C₂H₄(OH)₂||||سائل تبريد السيارات.|Car antifreeze.
حمض الفورميك|Formic acid|HCOOH||||في لدغة النمل.|In ant stings.
حمض اللاكتيك|Lactic acid|CH₃CH(OH)COOH||||في اللبن والعضلات المتعبة.|In yoghurt and tired muscles.
حمض الأسكوربيك (فيتامين C)|Ascorbic acid (vitamin C)|C₆H₈O₆||||في البرتقال والليمون.|In oranges and lemons.
حمض الساليسيليك|Salicylic acid|C₇H₆O₃||||أصل الأسبرين، وفي منتجات البشرة.|The origin of aspirin; in skincare.
الفركتوز|Fructose|C₆H₁₂O₆||||سكر الفواكه، نفس صيغة الجلوكوز بترتيب مختلف.|Fruit sugar: same formula as glucose, different shape.
اللاكتوز|Lactose|C₁₂H₂₂O₁₁||||سكر الحليب.|Milk sugar.
السليلوز|Cellulose|(C₆H₁₀O₅)ₙ||||جدران الخلايا النباتية والورق والقطن.|Plant cell walls, paper and cotton.
النشا|Starch|(C₆H₁₀O₅)ₙ||||مخزن الطاقة في الرز والبطاطس.|Energy store in rice and potatoes.
الكوليسترول|Cholesterol|C₂₇H₄₆O||||مهم لأغشية الخلايا.|Important for cell membranes.
الأسيتامينوفين (باراسيتامول)|Paracetamol (acetaminophen)|C₈H₉NO₂||||مسكن وخافض حرارة.|A painkiller and fever reducer.
الإيبوبروفين|Ibuprofen|C₁₃H₁₈O₂||||مسكن ومضاد للالتهاب.|A painkiller and anti-inflammatory.
النيكوتين|Nicotine|C₁₀H₁₄N₂||||مادة إدمانية في التبغ.|The addictive substance in tobacco.
الكابسيسين|Capsaicin|C₁₈H₂₇NO₃||||حرارة الفلفل الحار.|The heat in chilli peppers.
الفانيلين|Vanillin|C₈H₈O₃||||نكهة الفانيلا.|The flavour of vanilla.
المنثول|Menthol|C₁₀H₂₀O||||إحساس البرودة في النعناع.|The cool feeling of mint.
الليمونين|Limonene|C₁₀H₁₆||||رائحة قشر البرتقال.|The smell of orange peel.
السيناميلدهيد|Cinnamaldehyde|C₉H₈O||||نكهة القرفة.|The flavour of cinnamon.
الكلوروفيل أ|Chlorophyll a|C₅₅H₇₂MgN₄O₅||||يعطي النبات لونه الأخضر.|Gives plants their green colour.
الهيموغلوبين (مجموعة الهيم)|Haem group|C₃₄H₃₂FeN₄O₄||||ينقل الأكسجين في الدم.|Carries oxygen in the blood.
الأدرينالين|Adrenaline|C₉H₁₃NO₃||||هرمون الخوف والحماس.|The fear-and-excitement hormone.
السيروتونين|Serotonin|C₁₀H₁₂N₂O||||مرسل كيميائي في الدماغ.|A chemical messenger in the brain.
الدوبامين|Dopamine|C₈H₁₁NO₂||||مرسل المكافأة في الدماغ.|The brain’s reward messenger.
الميلاتونين|Melatonin|C₁₃H₁₆N₂O₂||||هرمون النوم.|The sleep hormone.
الجلايسين|Glycine|NH₂CH₂COOH||||أبسط حمض أميني.|The simplest amino acid.
الأدينين|Adenine|C₅H₅N₅||||حرف A في الحمض النووي.|The letter A in DNA.
البولي إيثيلين|Polyethylene|(–CH₂–CH₂–)ₙ||||أكياس البلاستيك.|Plastic bags.
البولي فينيل كلوريد (PVC)|Polyvinyl chloride (PVC)|(–CH₂–CHCl–)ₙ||||أنابيب المياه.|Water pipes.
البوليسترين|Polystyrene|(–CH₂–CH(C₆H₅)–)ₙ||||الفلين الأبيض للتغليف.|White foam packaging.
التفلون|Teflon (PTFE)|(–CF₂–CF₂–)ₙ||||طبقة المقالي غير اللاصقة.|The non-stick coating on pans.
الكيفلار|Kevlar|(–CO–C₆H₄–CO–NH–C₆H₄–NH–)ₙ||||في السترات الواقية.|In protective vests.
التولوين|Toluene|C₆H₅CH₃||||مذيب في الدهانات.|A paint solvent.
الفينول|Phenol|C₆H₅OH||||مطهر قديم ومادة صناعية.|An old antiseptic and industrial chemical.
النفثالين|Naphthalene|C₁₀H₈||||كرات العثة.|Mothballs.
`);
