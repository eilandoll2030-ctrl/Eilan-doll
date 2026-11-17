/* موسوعة معادلات إيلان — النواة: الأقسام وقاموس الرموز وطريقة الإضافة.
   صيغة سطر الرمز:   key|العرض|الاسم بالعربي|English name|الوحدة|قيمة افتراضية
   صيغة سطر المعادلة: الاسم بالعربي|English name|الصيغة|رمز الناتج|تعبير الحساب|المدخلات|شرح عربي|English note|المشهد(اختياري)
   (رمز الناتج وتعبير الحساب يُتركان فارغين للمعادلات غير القابلة للحساب) */
window.EQ=(function(){
 const E={groups:[],cats:{},sym:{},list:[]};
 E.groups=[
  {id:'phys',ic:'⚡',n:['الفيزياء','Physics']},
  {id:'chem',ic:'⚗️',n:['الكيمياء','Chemistry']},
  {id:'math',ic:'📐',n:['الرياضيات','Mathematics']},
  {id:'stat',ic:'📊',n:['الإحصاء والاحتمالات','Statistics & Probability']},
  {id:'life',ic:'🧬',n:['الأحياء والطب وعلوم الأرض','Life & Earth Sciences']},
  {id:'more',ic:'💼',n:['المال والهندسة والحاسب','Finance, Engineering & Computing']},
  {id:'day',ic:'🌍',n:['الحياة اليومية والتطبيقات','Everyday life & applications']},
  {id:'comm',ic:'✍️',n:['إضافات المجتمع','Community additions']}
 ];
 // [id, group, ar, en, default scene]
 [['kin','phys','الحركة في خط مستقيم ومقذوفات','Kinematics & projectiles','fall'],
  ['dyn','phys','القوى وقوانين نيوتن','Forces & Newton’s laws','motion'],
  ['enr','phys','الشغل والطاقة والقدرة','Work, energy & power','energy'],
  ['mom','phys','الزخم والتصادمات','Momentum & collisions','motion'],
  ['rot','phys','الحركة الدورانية','Rotational motion','wheel'],
  ['grv','phys','الجاذبية والمدارات','Gravitation & orbits','orbit'],
  ['osc','phys','الاهتزازات والحركة التوافقية','Oscillations & SHM','pendulum'],
  ['fld','phys','الموائع','Fluids','fluid'],
  ['thm','phys','الحرارة والديناميكا الحرارية','Heat & thermodynamics','heat'],
  ['wav','phys','الموجات والصوت','Waves & sound','wave'],
  ['els','phys','الكهرباء الساكنة والمجال','Electrostatics & fields','charges'],
  ['cir','phys','التيار والدوائر','Current & circuits','circuit'],
  ['mag','phys','المغناطيسية والحث','Magnetism & induction','magnet'],
  ['opt','phys','الضوء والبصريات','Light & optics','optics'],
  ['mod','phys','الفيزياء الحديثة والكم','Modern & quantum physics','atom'],
  ['nuc','phys','الفيزياء النووية','Nuclear physics','atom'],
  ['rel','phys','النسبية','Relativity','orbit'],
  ['ast','phys','الفلك والكون','Astronomy & cosmology','orbit'],
  ['cmo','chem','المول والحسابات الكيميائية','Moles & stoichiometry','beaker'],
  ['cga','chem','قوانين الغازات','Gas laws','gas'],
  ['cso','chem','المحاليل والتراكيز','Solutions & concentration','beaker'],
  ['cab','chem','الأحماض والقواعد','Acids & bases','beaker'],
  ['cth','chem','الكيمياء الحرارية','Thermochemistry','heat'],
  ['cki','chem','سرعة التفاعل','Reaction kinetics','beaker'],
  ['ceq','chem','الاتزان الكيميائي','Chemical equilibrium','beaker'],
  ['cel','chem','الكيمياء الكهربائية','Electrochemistry','circuit'],
  ['cat','chem','بنية الذرة والروابط','Atoms & bonding','atom'],
  ['crx','chem','تفاعلات مشهورة','Famous reactions','molecule'],
  ['cor','chem','الكيمياء العضوية','Organic chemistry','molecule'],
  ['alg','math','الجبر','Algebra','graph'],
  ['exl','math','الأسس واللوغاريتمات','Exponents & logarithms','graph'],
  ['seq','math','المتتاليات والمتسلسلات','Sequences & series','blocks'],
  ['ge2','math','الهندسة المستوية','Plane geometry','solids'],
  ['ge3','math','المجسمات','Solid geometry','solids'],
  ['trg','math','حساب المثلثات','Trigonometry','graph'],
  ['ana','math','الهندسة التحليلية','Analytic geometry','graph'],
  ['der','math','التفاضل (المشتقات)','Differential calculus','graph'],
  ['int','math','التكامل','Integral calculus','graph'],
  ['lin','math','المتجهات والمصفوفات','Vectors & matrices','graph'],
  ['cpx','math','الأعداد المركبة','Complex numbers','graph'],
  ['dis','math','الرياضيات المتقطعة والعد','Discrete math & counting','blocks'],
  ['dsc','stat','الإحصاء الوصفي','Descriptive statistics','dice'],
  ['prb','stat','الاحتمالات','Probability','dice'],
  ['dst','stat','التوزيعات الاحتمالية','Probability distributions','dice'],
  ['inf','stat','الاستدلال الإحصائي','Statistical inference','dice'],
  ['bio','life','الأحياء','Biology','plant'],
  ['med','life','الطب وجسم الإنسان','Medicine & the human body','plant'],
  ['ear','life','علوم الأرض والبيئة','Earth & environmental science','orbit'],
  ['fin','more','الرياضيات المالية','Financial math','coins'],
  ['eco','more','الاقتصاد','Economics','coins'],
  ['eng','more','الهندسة والمواد','Engineering & materials','wheel'],
  ['ele','more','الإلكترونيات','Electronics','circuit'],
  ['cs','more','الحاسب والمعلومات','Computing & information','blocks'],
  ['elm','chem','بطاقات العناصر الـ118','The 118 element cards','atom'],
  ['ion','chem','الأيونات والمركبات الشائعة','Common ions & compounds','molecule'],
  ['tbd','math','جدول المشتقات المتقدم','Advanced derivative table','graph'],
  ['tbi','math','جدول التكاملات المتقدم','Advanced integral table','graph'],
  ['ser','math','المتسلسلات والتقريب','Series & approximation','graph'],
  ['gen','life','الوراثة والحمض النووي','Genetics & DNA','plant'],
  ['ecl','life','علم البيئة','Ecology','plant'],
  ['hum','life','جسم الإنسان بالأرقام','The human body in numbers','plant'],
  ['qc','stat','الإحصاء التطبيقي وضبط الجودة','Applied statistics & quality control','dice'],
  ['emw','phys','ماكسويل والموجات الكهرومغناطيسية','Maxwell & electromagnetic waves','magnet'],
  ['ast2','phys','الفلك المتقدم','Advanced astronomy','orbit'],
  ['org2','chem','مركبات عضوية من حولنا','Organic compounds around us','molecule'],
  ['ee','more','الهندسة الكهربائية','Electrical engineering','circuit'],
  ['me','more','الهندسة الميكانيكية','Mechanical engineering','wheel'],
  ['biz','more','الأعمال والمحاسبة','Business & accounting','coins'],
  ['sea','life','البحار والمحيطات','Seas & oceans','wave'],
  ['algo','more','الخوارزميات والأمن الرقمي','Algorithms & digital security','blocks'],
  ['dig','more','المنطق الرقمي والمعالجات','Digital logic & processors','circuit'],
  ['avi','day','الطيران والملاحة','Aviation & navigation','motion'],
  ['agr','day','الزراعة والثروة الحيوانية','Farming & livestock','plant'],
  ['gad','math','الهندسة المتقدمة','Advanced geometry','solids'],
  ['anc','chem','الكيمياء التحليلية','Analytical chemistry','beaker'],
  ['prt','phys','الجسيمات والفيزياء النووية','Particles & nuclear physics','atom'],
  ['geo','life','الجيولوجيا والزلازل','Geology & earthquakes','solids'],
  ['psy','stat','علم النفس والقياس','Psychology & measurement','dice'],
  ['ec2','more','الاقتصاد الكلي','Macroeconomics','coins'],
  ['las','phys','الليزر والألياف الضوئية','Lasers & optical fibre','optics'],
  ['ctl','more','أنظمة التحكم والروبوتات','Control systems & robotics','wheel'],
  ['mat','more','علم المواد','Materials science','solids'],
  ['mfg','more','التصنيع والطباعة ثلاثية الأبعاد','Manufacturing & 3D printing','blocks'],
  ['pfn','day','التخطيط المالي الشخصي','Personal money planning','coins'],
  ['nth','math','نظرية الأعداد','Number theory','blocks'],
  ['gam','stat','الألعاب والتصنيف','Games & ratings','dice'],
  ['hvc','more','التكييف والتبريد','Air conditioning & refrigeration','heat'],
  ['pip','more','الأنابيب والمضخات','Pipes & pumps','fluid'],
  ['cal','day','التقويم والوقت','Calendars & time','blocks'],
  ['opr','stat','بحوث العمليات والمخزون','Operations research & inventory','dice'],
  ['net','more','الشبكات والإنترنت','Networks & the internet','circuit'],
  ['img','more','الصور والفيديو الرقمي','Digital images & video','optics'],
  ['trf','day','المرور وتخطيط المدن','Traffic & city planning','motion'],
  ['qbl','phys','الفلك في حياتنا: القبلة والشمس','Everyday astronomy: Qibla & the Sun','orbit'],
  ['phk','life','علم الأدوية الحركي','Pharmacokinetics','beaker'],
  ['qnt','phys','ميكانيكا الكم المتقدمة','Advanced quantum mechanics','atom'],
  ['pol','life','التلوث وجودة البيئة','Pollution & environmental quality','plant'],
  ['elx','more','الإلكترونيات العملية','Practical electronics','circuit'],
  ['tex','day','الخياطة والنسيج','Sewing & textiles','blocks'],
  ['crd','chem','تفاعلات من حياتنا والصناعة','Everyday & industrial reactions','molecule'],
  ['spt','day','الرياضة واللياقة','Sport & fitness','motion'],
  ['hlt','day','الصحة والتغذية','Health & nutrition','plant'],
  ['ckn','day','المطبخ والطبخ','Kitchen & cooking','heat'],
  ['mus','day','الموسيقى والصوت','Music & audio','wave'],
  ['car','day','السيارات والمواصلات','Cars & transport','motion'],
  ['hom','day','البيت والكهرباء المنزلية','Home & household energy','circuit'],
  ['env','day','الطاقة المتجددة والبيئة','Renewable energy & environment','energy'],
  ['spc','day','الفضاء والصواريخ','Space & rockets','orbit'],
  ['civ','day','البناء والتشييد','Building & construction','solids'],
  ['pho','day','التصوير والشاشات','Photography & screens','optics'],
  ['wth','day','الطقس والمناخ','Weather & climate','gas'],
  ['unt','day','تحويل الوحدات','Unit conversions','blocks'],
  ['com','comm','معادلات أضافها المجتمع','Equations added by the community','energy']
 ].forEach(([id,g,ar,en,sc])=>E.cats[id]={id,g,n:[ar,en],sc});

 E.syms=txt=>txt.split('\n').forEach(l=>{l=l.trim();if(!l||l.startsWith('#'))return;const p=l.split('|');E.sym[p[0]]={d:p[1],n:[p[2],p[3]],u:p[4]||'',v:p[5]===undefined||p[5]===''?1:+p[5]}});
 E.add=(cat,txt,extra)=>{txt.split('\n').forEach(l=>{l=l.trim();if(!l||l.startsWith('#'))return;const p=l.split('|');if(p.length<8){console.warn('EQ bad line',l);return}
  E.list.push({cat,n:[p[0],p[1]],f:p[2],out:p[3]||'',x:p[4]||'',ins:(p[5]||'').trim()?p[5].trim().split(/\s+/):[],d:[p[6],p[7]],sc:(p[8]||'').trim()||E.cats[cat].sc,...(extra||{})})})};

 E.syms(`
# ---- mechanics
m|m|الكتلة|mass|kg|2
m1|m₁|الكتلة الأولى|first mass|kg|2
m2|m₂|الكتلة الثانية|second mass|kg|3
M|M|كتلة الجسم الكبير|large mass|kg|5.97e24
F|F|القوة|force|N|10
F1|F₁|القوة الأولى|first force|N|6
F2|F₂|القوة الثانية|second force|N|8
Fn|Fₙ|القوة العمودية|normal force|N|19.6
Ff|F_f|قوة الاحتكاك|friction force|N|5
Fc|F_c|القوة المركزية|centripetal force|N|10
Fg|F_g|قوة الجاذبية|gravitational force|N|10
Fs|F_s|قوة النابض|spring force|N|5
Fb|F_b|قوة الطفو|buoyant force|N|10
W|W|الشغل|work|J|100
Wt|W|الوزن|weight|N|19.6
a|a|التسارع|acceleration|m/s²|3
ac|a_c|التسارع المركزي|centripetal acceleration|m/s²|5
g|g|تسارع الجاذبية|gravitational acceleration|m/s²|9.8
v|v|السرعة|velocity|m/s|10
v0|v₀|السرعة الابتدائية|initial velocity|m/s|5
v1|v₁|سرعة الجسم الأول|velocity of body 1|m/s|4
v2|v₂|سرعة الجسم الثاني|velocity of body 2|m/s|-2
vf|v_f|السرعة النهائية|final velocity|m/s|12
vavg|v̄|السرعة المتوسطة|average velocity|m/s|8
u|u|السرعة الابتدائية|initial velocity|m/s|5
x|x|الموقع|position|m|10
x0|x₀|الموقع الابتدائي|initial position|m|0
d|d|المسافة|distance|m|10
s|s|الإزاحة|displacement|m|20
dx|Δx|التغير في الموقع|change in position|m|20
t|t|الزمن|time|s|2
dt|Δt|الفترة الزمنية|time interval|s|2
h|h|الارتفاع|height|m|5
H|H|أقصى ارتفاع|maximum height|m|5
R|R|المدى الأفقي|range|m|20
th|θ|الزاوية|angle|°|30
mu|μ|معامل الاحتكاك|friction coefficient||0.3
mus|μₛ|معامل الاحتكاك السكوني|static friction coefficient||0.5
muk|μₖ|معامل الاحتكاك الحركي|kinetic friction coefficient||0.3
k|k|ثابت النابض|spring constant|N/m|200
p|p|الزخم (كمية الحركة)|momentum|kg·m/s|20
J|J|الدفع|impulse|N·s|10
E|E|الطاقة|energy|J|100
Ek|Eₖ|طاقة الحركة|kinetic energy|J|100
Ep|Eₚ|طاقة الوضع|potential energy|J|100
Es|Eₛ|طاقة النابض|spring energy|J|1
P|P|القدرة|power|W|100
eta|η|الكفاءة|efficiency|%|80
Win|W_in|الشغل الداخل|work input|J|1000
Wout|W_out|الشغل الناتج|work output|J|800
r|r|نصف القطر / المسافة|radius / distance|m|2
rr|r|المسافة بين المركزين|distance between centres|m|6.37e6
T|T|الزمن الدوري|period|s|2
f|f|التردد|frequency|Hz|50
w|ω|السرعة الزاوية|angular velocity|rad/s|3
w0|ω₀|السرعة الزاوية الابتدائية|initial angular velocity|rad/s|0
alpha|α|التسارع الزاوي|angular acceleration|rad/s²|2
phi|θ|الإزاحة الزاوية|angular displacement|rad|6.28
tau|τ|العزم|torque|N·m|20
I|I|عزم القصور الذاتي|moment of inertia|kg·m²|2
L|L|الزخم الزاوي|angular momentum|kg·m²/s|6
len|L|الطول|length|m|1
A|A|السعة|amplitude|m|0.1
G|G|ثابت الجذب العام|gravitational constant|N·m²/kg²|6.674e-11
# ---- fluids
rho|ρ|الكثافة|density|kg/m³|1000
V|V|الحجم|volume|m³|0.002
Pr|P|الضغط|pressure|Pa|101325
P0|P₀|الضغط الجوي|atmospheric pressure|Pa|101325
Ar|A|المساحة|area|m²|0.5
A1|A₁|المساحة الأولى|area 1|m²|0.01
A2|A₂|المساحة الثانية|area 2|m²|0.5
Q|Q|معدل التدفق|flow rate|m³/s|0.01
etav|η|اللزوجة|viscosity|Pa·s|0.001
Re|Re|عدد رينولدز|Reynolds number||2000
# ---- heat
Tk|T|درجة الحرارة المطلقة|absolute temperature|K|300
T1|T₁|درجة الحرارة الأولى|temperature 1|K|300
T2|T₂|درجة الحرارة الثانية|temperature 2|K|600
Tc|T_C|درجة الحرارة بالسيليزي|temperature in Celsius|°C|25
Tf|T_F|درجة الحرارة بالفهرنهايت|temperature in Fahrenheit|°F|77
dT|ΔT|التغير في درجة الحرارة|temperature change|K|10
Qh|Q|كمية الحرارة|heat|J|4180
c|c|الحرارة النوعية|specific heat|J/(kg·K)|4186
Lf|L|الحرارة الكامنة|latent heat|J/kg|334000
n|n|عدد المولات|amount of substance|mol|1
Rg|R|ثابت الغازات|gas constant|J/(mol·K)|8.314
kB|k_B|ثابت بولتزمان|Boltzmann constant|J/K|1.381e-23
dU|ΔU|التغير في الطاقة الداخلية|change in internal energy|J|500
sig|σ|ثابت ستيفان-بولتزمان|Stefan–Boltzmann constant|W/(m²·K⁴)|5.67e-8
kt|k|الموصلية الحرارية|thermal conductivity|W/(m·K)|200
dS|ΔS|التغير في الإنتروبيا|entropy change|J/K|10
# ---- waves
lam|λ|الطول الموجي|wavelength|m|2
vw|v|سرعة الموجة|wave speed|m/s|340
fs|f_s|تردد المصدر|source frequency|Hz|440
fo|f′|التردد المسموع|observed frequency|Hz|440
vs|v_s|سرعة المصدر|source speed|m/s|20
vo|v_o|سرعة المستمع|observer speed|m/s|0
Iw|I|شدة الصوت|sound intensity|W/m²|1e-6
beta|β|مستوى الصوت|sound level|dB|60
Ften|T|قوة الشد|tension|N|100
mul|μ|الكتلة لكل وحدة طول|linear density|kg/m|0.01
# ---- electricity
q|q|الشحنة|charge|C|1e-6
q1|q₁|الشحنة الأولى|charge 1|C|2e-6
q2|q₂|الشحنة الثانية|charge 2|C|3e-6
ke|k|ثابت كولوم|Coulomb constant|N·m²/C²|8.99e9
e0|ε₀|سماحية الفراغ|vacuum permittivity|F/m|8.854e-12
Ef|E|شدة المجال الكهربائي|electric field|N/C|1000
Vv|V|الجهد الكهربائي|voltage|V|12
Iamp|I|التيار الكهربائي|current|A|2
Rres|R|المقاومة|resistance|Ω|6
R1|R₁|المقاومة الأولى|resistor 1|Ω|4
R2|R₂|المقاومة الثانية|resistor 2|Ω|6
Cap|C|السعة الكهربائية|capacitance|F|1e-6
C1|C₁|المكثف الأول|capacitor 1|F|2e-6
C2|C₂|المكثف الثاني|capacitor 2|F|3e-6
rhoe|ρ|المقاومية|resistivity|Ω·m|1.68e-8
Pw|P|القدرة الكهربائية|electric power|W|24
Ue|U|الطاقة الكهربائية|electric energy|J|1
emf|ε|القوة الدافعة الكهربائية|emf|V|12
rint|r|المقاومة الداخلية|internal resistance|Ω|0.5
# ---- magnetism
B|B|شدة المجال المغناطيسي|magnetic field|T|0.5
mu0|μ₀|نفاذية الفراغ|vacuum permeability|T·m/A|1.2566e-6
Phi|Φ|التدفق المغناطيسي|magnetic flux|Wb|0.1
N|N|عدد اللفات|number of turns||100
Lind|L|معامل الحث الذاتي|inductance|H|0.1
Np|Nₚ|لفات الملف الابتدائي|primary turns||100
Ns|Nₛ|لفات الملف الثانوي|secondary turns||500
Vp|Vₚ|جهد الملف الابتدائي|primary voltage|V|220
Vs|Vₛ|جهد الملف الثانوي|secondary voltage|V|1100
# ---- optics
fl|f|البعد البؤري|focal length|m|0.1
dob|dₒ|بُعد الجسم|object distance|m|0.3
di|dᵢ|بُعد الصورة|image distance|m|0.15
Mg|M|التكبير|magnification||-0.5
ho|hₒ|طول الجسم|object height|m|0.1
hi|hᵢ|طول الصورة|image height|m|-0.05
n1|n₁|معامل انكسار الوسط الأول|refractive index 1||1
n2|n₂|معامل انكسار الوسط الثاني|refractive index 2||1.5
nr|n|معامل الانكسار|refractive index||1.5
th1|θ₁|زاوية السقوط|angle of incidence|°|30
th2|θ₂|زاوية الانكسار|angle of refraction|°|19.5
cl|c|سرعة الضوء|speed of light|m/s|2.998e8
Dp|D|قوة العدسة|lens power|D|10
# ---- modern
hP|h|ثابت بلانك|Planck constant|J·s|6.626e-34
Eph|E|طاقة الفوتون|photon energy|J|3e-19
W0|φ|دالة الشغل|work function|J|3.2e-19
me|mₑ|كتلة الإلكترون|electron mass|kg|9.109e-31
eC|e|شحنة الإلكترون|elementary charge|C|1.602e-19
N0|N₀|العدد الابتدائي للأنوية|initial number of nuclei||1000
Nn|N|العدد المتبقي|remaining number||500
thalf|t½|عمر النصف|half-life|s|10
lamd|λ|ثابت الاضمحلال|decay constant|1/s|0.0693
Act|A|النشاط الإشعاعي|activity|Bq|1000
dm|Δm|النقص في الكتلة|mass defect|kg|1e-30
gam|γ|معامل لورنتز|Lorentz factor||1.25
t0|t₀|الزمن الذاتي|proper time|s|1
L0|L₀|الطول الذاتي|proper length|m|10
# ---- astronomy
Lum|L|الضيائية|luminosity|W|3.828e26
H0|H₀|ثابت هابل|Hubble constant|km/s/Mpc|70
z|z|الانزياح نحو الأحمر|redshift||0.1
Dpc|d|المسافة|distance|Mpc|100
# ---- chemistry
mol|n|عدد المولات|moles|mol|0.5
mass|m|الكتلة|mass|g|18
Mm|M|الكتلة المولية|molar mass|g/mol|18
NA|N_A|عدد أفوجادرو|Avogadro’s number|1/mol|6.022e23
Np2|N|عدد الجسيمات|number of particles||3.011e23
Cm|C|التركيز المولاري|molarity|mol/L|0.5
VL|V|الحجم|volume|L|1
V1|V₁|الحجم الأول|volume 1|L|1
V2|V₂|الحجم الثاني|volume 2|L|2
P1|P₁|الضغط الأول|pressure 1|kPa|100
P2|P₂|الضغط الثاني|pressure 2|kPa|50
Pk|P|الضغط|pressure|kPa|101.3
Rl|R|ثابت الغازات|gas constant|L·kPa/(mol·K)|8.314
pH|pH|الأس الهيدروجيني|pH||7
pOH|pOH|الأس الهيدروكسيلي|pOH||7
Hc|[H⁺]|تركيز أيون الهيدروجين|hydrogen-ion concentration|mol/L|1e-7
OHc|[OH⁻]|تركيز أيون الهيدروكسيد|hydroxide-ion concentration|mol/L|1e-7
Ka|Kₐ|ثابت تأين الحمض|acid dissociation constant||1.8e-5
Kb|K_b|ثابت تأين القاعدة|base dissociation constant||1.8e-5
pKa|pKₐ|سالب لوغاريتم Ka|pKa||4.74
Kc|K_c|ثابت الاتزان|equilibrium constant||10
Qc|Q|حاصل التفاعل|reaction quotient||1
dH|ΔH|التغير في المحتوى الحراري|enthalpy change|kJ/mol|-100
dG|ΔG|التغير في الطاقة الحرة|Gibbs free energy change|kJ/mol|-50
dSc|ΔS|التغير في الإنتروبيا|entropy change|kJ/(mol·K)|0.1
Ea|Eₐ|طاقة التنشيط|activation energy|J/mol|50000
kr|k|ثابت سرعة التفاعل|rate constant||0.1
Af|A|معامل التردد|frequency factor||1e10
rate|r|سرعة التفاعل|reaction rate|mol/(L·s)|0.01
Ecell|E|جهد الخلية|cell potential|V|1.1
E0|E°|جهد الخلية القياسي|standard cell potential|V|1.1
ne|n|عدد الإلكترونات المنتقلة|electrons transferred||2
Fd|F|ثابت فاراداي|Faraday constant|C/mol|96485
# ---- math
xx|x|المتغير x|variable x||2
yy|y|المتغير y|variable y||3
aa|a|المعامل a|coefficient a||1
bb|b|المعامل b|coefficient b||-3
cc|c|المعامل c|coefficient c||2
nn|n|العدد n|number n||5
kk|k|العدد k|number k||2
rd|r|نصف القطر|radius|cm|3
side|a|طول الضلع|side length|cm|4
sb|b|الضلع b|side b|cm|3
sc|c|الضلع c|side c|cm|5
base|b|القاعدة|base|cm|6
hh|h|الارتفاع|height|cm|4
lw|l|الطول|length|cm|5
wd|w|العرض|width|cm|3
area|A|المساحة|area|cm²|12
vol|V|الحجم|volume|cm³|50
per|P|المحيط|perimeter|cm|20
ang|θ|الزاوية|angle|°|30
dg|θ°|الزاوية بالدرجات|angle in degrees|°|180
radn|θ|الزاوية بالراديان|angle in radians|rad|3.1416
x1|x₁|إحداثي x للنقطة الأولى|x of point 1||1
y1|y₁|إحداثي y للنقطة الأولى|y of point 1||2
x2|x₂|إحداثي x للنقطة الثانية|x of point 2||4
y2|y₂|إحداثي y للنقطة الثانية|y of point 2||6
slope|m|الميل|slope||2
a1|a₁|الحد الأول|first term||2
dd|d|أساس المتتالية الحسابية|common difference||3
rr2|r|أساس المتتالية الهندسية|common ratio||2
an|aₙ|الحد النوني|n-th term||14
Sn|Sₙ|المجموع|sum||40
res|=|الناتج|result||1
# ---- statistics
mean|x̄|الوسط الحسابي|mean||50
mu2|μ|متوسط المجتمع|population mean||50
sd|σ|الانحراف المعياري|standard deviation||10
sdx|s|الانحراف المعياري للعينة|sample standard deviation||10
zz|z|الدرجة المعيارية|z-score||1
nS|n|حجم العينة|sample size||30
pp|p|الاحتمال|probability||0.5
PA|P(A)|احتمال A|probability of A||0.5
PB|P(B)|احتمال B|probability of B||0.4
PAB|P(A∩B)|احتمال A و B معًا|probability of A and B||0.2
SE|SE|الخطأ المعياري|standard error||1.83
# ---- finance
Pm|P|المبلغ الأساسي|principal|SAR|1000
Am|A|المبلغ النهائي|final amount|SAR|1100
ri|r|معدل الفائدة السنوي|annual rate|%|5
ty|t|المدة|time|years|3
nc|n|مرات التركيب في السنة|compounding per year||12
PMT|PMT|القسط الدوري|periodic payment|SAR|500
`);
 E.all=()=>E.list;
 return E;
})();
