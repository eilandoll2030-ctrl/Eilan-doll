/* موسوعة معادلات إيلان — الفيزياء (2): الحرارة، الموجات، الكهرباء، المغناطيسية، الضوء، الحديثة، النووية، النسبية، الفلك */
EQ.syms(`
Tk_|T|درجة الحرارة بالكلفن|temperature in kelvin|K|298
L0l|L₀|الطول الأصلي|original length|m|10
dL|ΔL|التغير في الطول|change in length|m|0.0012
al|α|معامل التمدد الطولي|linear expansion coefficient|1/K|1.2e-5
bv|β|معامل التمدد الحجمي|volume expansion coefficient|1/K|2.1e-4
dV|ΔV|التغير في الحجم|change in volume|m³|0.0002
V0|V₀|الحجم الأصلي|original volume|m³|1
Qdot|Q/t|معدل انتقال الحرارة|heat-flow rate|W|100
thick|d|السُمك|thickness|m|0.1
emi|ε|الانبعاثية|emissivity||0.9
Th|T_H|درجة حرارة المصدر الساخن|hot reservoir temperature|K|600
Tcold|T_C|درجة حرارة المصدر البارد|cold reservoir temperature|K|300
QH|Q_H|الحرارة المأخوذة من الساخن|heat from hot reservoir|J|1000
QC|Q_C|الحرارة المطروحة للبارد|heat to cold reservoir|J|600
COP|COP|معامل الأداء|coefficient of performance||3
Wd|W|الشغل|work|J|400
vrms|v_rms|جذر متوسط مربع السرعة|rms speed|m/s|500
Mmol|M|الكتلة المولية|molar mass|kg/mol|0.028
mmol|m|كتلة الجزيء|molecular mass|kg|4.65e-26
Ekavg|Ē|متوسط طاقة الحركة للجزيء|mean molecular KE|J|6.2e-21
gamma|γ|نسبة السعات الحرارية|heat-capacity ratio||1.4
Cv|C_v|السعة الحرارية المولية بثبات الحجم|molar heat capacity (const V)|J/(mol·K)|20.8
Cp|C_p|السعة الحرارية المولية بثبات الضغط|molar heat capacity (const P)|J/(mol·K)|29.1
lmax|λ_max|طول موجة ذروة الإشعاع|peak wavelength|m|5e-7
Wien|b|ثابت فين|Wien’s constant|m·K|2.898e-3
Pv|P|الضغط|pressure|Pa|101325
Vgas|V|الحجم|volume|m³|0.0224
Ccap|C|السعة الحرارية|heat capacity|J/K|500
vsnd|v|سرعة الصوت|speed of sound|m/s|343
Lstr|L|طول الوتر أو الأنبوب|string or pipe length|m|0.65
nh|n|رقم التوافقية|harmonic number||1
f1|f₁|التردد الأول|frequency 1|Hz|440
f2|f₂|التردد الثاني|frequency 2|Hz|444
I0|I₀|عتبة السمع|threshold of hearing|W/m²|1e-12
Psrc|P|قدرة المصدر|source power|W|1
dist|r|المسافة|distance|m|10
Bmod|B|معامل الحجم|bulk modulus|Pa|2.2e9
Ymod|Y|معامل يونغ|Young’s modulus|Pa|2e11
kw|k|العدد الموجي|wave number|rad/m|3.14
dphi|Δφ|فرق الطور|phase difference|rad|1.57
dpath|Δx|فرق المسار|path difference|m|1
Mach|M|عدد ماخ|Mach number||2
r12|r|المسافة بين الشحنتين|distance between charges|m|0.1
Eflux|Φ_E|التدفق الكهربائي|electric flux|N·m²/C|100
Vab|ΔV|فرق الجهد|potential difference|V|12
dsep|d|المسافة بين اللوحين|plate separation|m|0.001
kap|κ|ثابت العزل|dielectric constant||1
sig2|σ|كثافة الشحنة السطحية|surface charge density|C/m²|1e-6
lam2|λ|كثافة الشحنة الطولية|linear charge density|C/m|1e-6
pdip|p|عزم ثنائي القطب|dipole moment|C·m|1e-9
Rt|R_T|المقاومة الكلية|total resistance|Ω|10
R3|R₃|المقاومة الثالثة|resistor 3|Ω|12
Ilen|L|طول السلك|wire length|m|10
Awire|A|مساحة مقطع السلك|wire cross-section|m²|1e-6
tauRC|τ|الثابت الزمني|time constant|s|0.001
Vc|V_C|جهد المكثف|capacitor voltage|V|7.6
Ic|I|التيار في المكثف|capacitor current|A|0.01
vd|v_d|سرعة الانجراف|drift velocity|m/s|7e-5
nden|n|كثافة حاملات الشحنة|charge-carrier density|1/m³|8.5e28
R0t|R₀|المقاومة عند درجة حرارة مرجعية|reference resistance|Ω|10
alR|α|معامل المقاومة الحراري|temperature coefficient|1/K|0.0039
Vout|V_out|جهد الخرج|output voltage|V|6
Vin|V_in|جهد الدخل|input voltage|V|12
Irms|I_rms|التيار الفعّال|rms current|A|1.41
I0a|I₀|التيار الأقصى|peak current|A|2
V0a|V₀|الجهد الأقصى|peak voltage|V|311
Vrms|V_rms|الجهد الفعّال|rms voltage|V|220
XL|X_L|المفاعلة الحثية|inductive reactance|Ω|31.4
XC|X_C|المفاعلة السعوية|capacitive reactance|Ω|3183
Zimp|Z|الممانعة|impedance|Ω|50
pfac|cos φ|معامل القدرة|power factor||0.9
ra|r₁|المسافة الأولى|distance 1|m|5
rb|r₂|المسافة الثانية|distance 2|m|10
Bf|B|المجال المغناطيسي|magnetic field|T|0.2
vq|v|سرعة الشحنة|charge speed|m/s|1e5
Fm|F|القوة المغناطيسية|magnetic force|N|0.01
rcyc|r|نصف قطر المسار الدائري|orbit radius|m|0.005
fcyc|f|تردد السيكلوترون|cyclotron frequency|Hz|1.5e6
Lsol|L|طول الملف اللولبي|solenoid length|m|0.2
nturn|n|عدد اللفات لكل متر|turns per metre|1/m|1000
dist2|r|البعد عن السلك|distance from wire|m|0.05
emfI|ε|القوة الدافعة المستحثة|induced emf|V|1.5
dPhi|ΔΦ|التغير في التدفق|change in flux|Wb|0.03
Lr|L|طول الموصل|conductor length|m|0.5
UL|U|الطاقة المخزّنة في الملف|energy in an inductor|J|0.2
mmag|μ|العزم المغناطيسي|magnetic moment|A·m²|0.5
fo2|f|البعد البؤري|focal length|m|0.2
Rmir|R|نصف قطر التكور|radius of curvature|m|0.4
thc|θ_c|الزاوية الحرجة|critical angle|°|41.8
vlight|v|سرعة الضوء في الوسط|speed of light in medium|m/s|2e8
dslit|d|المسافة بين الشقين|slit separation|m|1e-4
Lscr|L|بعد الشاشة|screen distance|m|1
ybr|y|بعد الهدب عن المركز|fringe position|m|0.005
mord|m|رتبة الهدب|fringe order||1
aslit|a|عرض الشق|slit width|m|1e-5
Nlines|N|عدد الخطوط لكل متر|lines per metre|1/m|500000
I0l|I₀|الشدة الأصلية|initial intensity|W/m²|100
Il|I|الشدة|intensity|W/m²|50
thp|θ|الزاوية بين المستقطبين|angle between polarisers|°|45
Dap|D|قطر الفتحة|aperture diameter|m|0.1
thmin|θ|أصغر زاوية فصل|minimum resolvable angle|rad|6.7e-6
f_obj|f_o|البعد البؤري للشيئية|objective focal length|m|1
f_eye|f_e|البعد البؤري للعينية|eyepiece focal length|m|0.025
nf|n|معامل انكسار الغشاء|film index||1.33
tfilm|t|سُمك الغشاء|film thickness|m|1e-7
fph|f|تردد الفوتون|photon frequency|Hz|6e14
lph|λ|الطول الموجي للفوتون|photon wavelength|m|5e-7
Kmax|Kₘₐₓ|أقصى طاقة حركة للإلكترون|max electron KE|J|1e-19
pph|p|زخم الفوتون|photon momentum|kg·m/s|1.3e-27
lamdB|λ|طول موجة دي بروي|de Broglie wavelength|m|1e-10
nq|n|العدد الكمي الرئيسي|principal quantum number||2
ni|nᵢ|المستوى الابتدائي|initial level||3
nfin|n_f|المستوى النهائي|final level||2
Ryd|R_H|ثابت ريدبيرغ|Rydberg constant|1/m|1.097e7
En|Eₙ|طاقة المستوى|energy of level|eV|-3.4
dxq|Δx|عدم اليقين في الموقع|position uncertainty|m|1e-10
dpq|Δp|عدم اليقين في الزخم|momentum uncertainty|kg·m/s|5.3e-25
lC|λ′−λ|إزاحة كومبتون|Compton shift|m|2.4e-12
thC|θ|زاوية التشتت|scattering angle|°|90
Lbox|L|عرض البئر|well width|m|1e-9
Zp|Z|العدد الذري|atomic number||26
Anuc|A|العدد الكتلي|mass number||56
Rnuc|R|نصف قطر النواة|nuclear radius|m|4.6e-15
Eb|E_b|طاقة الربط|binding energy|MeV|492
MeV|E|الطاقة|energy|MeV|931.5
amu|Δm|النقص في الكتلة|mass defect|u|1
vrel2|v|السرعة|speed|m/s|1.8e8
Erel|E|الطاقة الكلية|total energy|J|9e16
E0r|E₀|طاقة السكون|rest energy|J|9e16
prel|p|الزخم|momentum|kg·m/s|1e8
uvel|u′|السرعة في الإطار المتحرك|velocity in moving frame|m/s|1.5e8
vfr|v|سرعة الإطار|frame speed|m/s|1.5e8
mag_ap|m|القدر الظاهري|apparent magnitude||5
mag_ab|M|القدر المطلق|absolute magnitude||0
Fl|F|التدفق الضوئي|flux|W/m²|1361
dpc|d|المسافة|distance|pc|10
par|p|اختلاف المنظر|parallax|arcsec|0.1
vrec|v|سرعة الابتعاد|recession velocity|km/s|7000
Rstar|R|نصف قطر النجم|stellar radius|m|6.96e8
Tstar|T|درجة حرارة السطح|surface temperature|K|5778
Msun|M|الكتلة|mass|kg|1.989e30
lobs|λ_obs|الطول الموجي المرصود|observed wavelength|nm|660
lemit|λ_emit|الطول الموجي المنبعث|emitted wavelength|nm|656.3
`);

EQ.add('thm',`
تحويل سيليزي إلى كلفن|Celsius to kelvin|T(K) = T(°C) + 273.15|Tk|Tc+273.15|Tc|الصفر المطلق −273.15 °C.|Absolute zero is −273.15 °C.
تحويل سيليزي إلى فهرنهايت|Celsius to Fahrenheit|T(°F) = 9/5 T(°C) + 32|Tf|9/5*Tc+32|Tc|الماء يغلي عند 212 °F.|Water boils at 212 °F.
تحويل فهرنهايت إلى سيليزي|Fahrenheit to Celsius|T(°C) = 5/9 (T(°F) − 32)|Tc|5/9*(Tf-32)|Tf|عكس التحويل السابق.|The reverse conversion.
الحرارة النوعية|Specific heat|Q = m c ΔT|Qh|m*c*dT|m c dT|الحرارة لرفع درجة حرارة الجسم.|Heat to warm a body.
السعة الحرارية|Heat capacity|C = Q / ΔT|Ccap|Qh/dT|Qh dT|حرارة لكل درجة.|Heat per degree.
الحرارة الكامنة|Latent heat|Q = m L|Qh|m*Lf|m Lf|حرارة تغيير الحالة بدون تغيير درجة الحرارة.|Heat to change state at constant temperature.
خلط سائلين|Mixing two liquids|T = (m₁c₁T₁ + m₂c₂T₂)/(m₁c₁ + m₂c₂)|Tk|(m1*T1+m2*T2)/(m1+m2)|m1 T1 m2 T2|نفس المادة: متوسط موزون.|Same substance: a weighted average.
التمدد الطولي|Linear expansion|ΔL = α L₀ ΔT|dL|al*L0l*dT|al L0l dT|القضبان تطول بالحرارة.|Rods lengthen when heated.
التمدد الحجمي|Volume expansion|ΔV = β V₀ ΔT|dV|bv*V0*dT|bv V0 dT|β ≈ 3α للمواد الصلبة.|β ≈ 3α for solids.
التوصيل الحراري (فورييه)|Thermal conduction (Fourier)|Q/t = k A ΔT / d|Qdot|kt*Ar*dT/thick|kt Ar dT thick|الحرارة تنتقل عبر المادة.|Heat flowing through a material.
الإشعاع (ستيفان-بولتزمان)|Stefan–Boltzmann law|P = ε σ A T⁴|P|emi*sig*Ar*pow(Tk,4)|emi sig Ar Tk|كل جسم ساخن يشع.|Every warm body radiates.
صافي الإشعاع|Net radiated power|P = ε σ A (T⁴ − T₀⁴)|P|emi*sig*Ar*(pow(T2,4)-pow(T1,4))|emi sig Ar T2 T1|بين الجسم والمحيط.|Between a body and its surroundings.
قانون نيوتن للتبريد|Newton’s law of cooling|T(t) = Tₛ + (T₀ − Tₛ) e^(−kt)|Tk|T1+(T2-T1)*exp(-0.05*t)|T1 T2 t|الكوب الساخن يبرد أسيًا (k = 0.05).|A hot cup cools exponentially (k = 0.05).
قانون فين|Wien’s displacement law|λ_max = b / T|lmax|Wien/Tk|Wien Tk|الأجسام الأسخن تشع بلون أزرق أكثر.|Hotter bodies glow bluer.
قانون الغاز المثالي|Ideal gas law|P V = n R T|Pv|n*Rg*Tk/Vgas|n Rg Tk Vgas|بوحدات SI.|In SI units.|gas
قانون الغاز بالجزيئات|Ideal gas (molecules)|P V = N k_B T|Pv|Np2*kB*Tk/Vgas|Np2 kB Tk Vgas|بعدد الجزيئات.|Using number of molecules.|gas
متوسط طاقة الحركة للجزيء|Mean molecular kinetic energy|Ē = 3/2 k_B T|Ekavg|1.5*kB*Tk|kB Tk|تتناسب مع درجة الحرارة المطلقة.|Proportional to absolute temperature.|gas
سرعة الجزيئات rms|RMS molecular speed|v_rms = √(3RT / M)|vrms|sqrt(3*Rg*Tk/Mmol)|Rg Tk Mmol|جزيئات النيتروجين ≈ 500 m/s.|Nitrogen molecules ≈ 500 m/s.|gas
القانون الأول للديناميكا الحرارية|First law of thermodynamics|ΔU = Q − W|dU|Qh-Wd|Qh Wd|الطاقة محفوظة.|Energy is conserved.
شغل الغاز بضغط ثابت|Work at constant pressure|W = P ΔV|Wd|Pv*dV|Pv dV|عملية متساوية الضغط.|Isobaric process.|gas
شغل التمدد الأيزوثرمي|Isothermal work|W = n R T ln(V₂/V₁)|Wd|n*Rg*Tk*log(V2/V1)|n Rg Tk V2 V1|درجة الحرارة ثابتة.|Constant temperature.|gas
العملية الأديباتية|Adiabatic process|P V^γ = const|Pv|P1*1000*pow(V1/V2,gamma)|P1 V1 V2 gamma|بدون تبادل حرارة.|No heat exchanged.|gas
الطاقة الداخلية لغاز أحادي|Internal energy (monatomic)|U = 3/2 n R T|dU|1.5*n*Rg*Tk|n Rg Tk|مثل الهيليوم.|Like helium.|gas
علاقة ماير|Mayer’s relation|C_p − C_v = R|Cp|Cv+Rg|Cv Rg|للغاز المثالي.|For an ideal gas.|gas
كفاءة المحرك الحراري|Heat-engine efficiency|η = W / Q_H = 1 − Q_C/Q_H|eta|(1-QC/QH)*100|QC QH|جزء من الحرارة يصير شغلًا.|Share of heat turned into work.
كفاءة كارنو|Carnot efficiency|η = 1 − T_C / T_H|eta|(1-Tcold/Th)*100|Tcold Th|أعلى كفاءة ممكنة نظريًا.|Highest possible efficiency.
معامل أداء الثلاجة|Refrigerator COP|COP = Q_C / W|COP|QC/Wd|QC Wd|كم حرارة تسحب لكل جول شغل.|Heat removed per joule of work.
معامل أداء الثلاجة (كارنو)|Carnot refrigerator COP|COP = T_C / (T_H − T_C)|COP|Tcold/(Th-Tcold)|Tcold Th|الحد الأقصى النظري.|The theoretical maximum.
معامل أداء المضخة الحرارية|Heat-pump COP|COP = Q_H / W|COP|QH/Wd|QH Wd|تدفئة المنزل بكفاءة.|Heating a home efficiently.
الإنتروبيا|Entropy change|ΔS = Q / T|dS|Qh/Tk|Qh Tk|مقياس العشوائية.|A measure of disorder.
القانون الثاني للديناميكا الحرارية|Second law of thermodynamics|ΔS_total ≥ 0||||إنتروبيا الكون لا تقل.|The universe’s entropy never decreases.
القانون الثالث|Third law of thermodynamics|S → 0 عند T → 0 K||||لا يمكن الوصول للصفر المطلق.|Absolute zero cannot be reached.
القانون الصفري|Zeroth law of thermodynamics|A = C و B = C ⇒ A = B||||أساس قياس درجة الحرارة.|The basis of thermometers.
قانون دالتون للضغوط الجزئية|Dalton’s law of partial pressures|P = P₁ + P₂ + …|Pk|P1+P2|P1 P2|كل غاز يساهم بضغطه.|Each gas adds its own pressure.|gas
قانون بويل|Boyle’s law|P₁V₁ = P₂V₂|P2|P1*V1/V2|P1 V1 V2|بثبات درجة الحرارة.|At constant temperature.|gas
قانون شارل|Charles’s law|V₁/T₁ = V₂/T₂|V2|V1*T2/T1|V1 T2 T1|بثبات الضغط.|At constant pressure.|gas
قانون جاي-لوساك|Gay-Lussac’s law|P₁/T₁ = P₂/T₂|P2|P1*T2/T1|P1 T2 T1|بثبات الحجم.|At constant volume.|gas
قانون الغاز العام|Combined gas law|P₁V₁/T₁ = P₂V₂/T₂|P2|P1*V1*T2/(T1*V2)|P1 V1 T2 T1 V2|يجمع القوانين الثلاثة.|Combines the three laws.|gas
معادلة فان دير فالس|Van der Waals equation|(P + a n²/V²)(V − n b) = n R T||||تصحيح للغازات الحقيقية.|A correction for real gases.|gas
القيمة الحرارية للطعام|Food energy|1 kcal = 4184 J|E|nn*4184|nn|السعرة الغذائية = كيلو سعرة.|A food Calorie is a kilocalorie.
مقاومة حرارية|Thermal resistance|R = d / (k A)|Rres|thick/(kt*Ar)|thick kt Ar|عزل أفضل = مقاومة أكبر.|Better insulation, higher resistance.
قيمة U للعزل|Overall heat-transfer coefficient|Q/t = U A ΔT|Qdot|2*Ar*dT|Ar dT|U = 2 W/(m²·K) لنافذة مزدوجة تقريبًا.|U ≈ 2 W/(m²·K) for double glazing.
تبخر العرق|Evaporative cooling|Q = m L_v|Qh|m*2.26e6|m|L_v للماء ≈ 2.26 MJ/kg.|L_v of water ≈ 2.26 MJ/kg.
الإزاحة في كثافة الهواء|Air density|ρ = P M / (R T)|rho|Pv*Mmol/(Rg*Tk)|Pv Mmol Rg Tk|الهواء الساخن أخف.|Hot air is lighter.|gas
مسار حر متوسط|Mean free path|λ = k_B T / (√2 π d² P)|lam|kB*Tk/(sqrt(2)*PI*3.7e-10*3.7e-10*Pv)|kB Tk Pv|المسافة بين تصادمين للجزيء.|Distance between molecular collisions.|gas
`);

EQ.add('wav',`
سرعة الموجة|Wave speed|v = f λ|vw|f*lam|f lam|التردد × الطول الموجي.|Frequency times wavelength.
الطول الموجي|Wavelength|λ = v / f|lam|vw/f|vw f|المسافة بين قمتين.|Distance between crests.
الزمن الدوري للموجة|Wave period|T = 1 / f|T|1/f|f|زمن موجة كاملة.|Time of one wave.
العدد الموجي|Wave number|k = 2π / λ|kw|2*PI/lam|lam|عدد الأمواج في 2π متر.|Waves per 2π metres.
معادلة الموجة المتنقلة|Travelling wave|y = A sin(kx − ωt)|xd|A*sin(kw*x-wosc*t)|A kw x wosc t|إزاحة نقطة على الوتر.|Displacement of a point on a string.
سرعة الموجة في وتر|Wave speed on a string|v = √(T / μ)|vw|sqrt(Ften/mul)|Ften mul|وتر أشد = صوت أعلى.|A tighter string sounds higher.
سرعة الصوت في الهواء|Speed of sound in air|v ≈ 331 + 0.6 T(°C)|vsnd|331+0.6*Tc|Tc|تزيد مع درجة الحرارة.|Faster when warmer.
سرعة الصوت في غاز|Speed of sound in a gas|v = √(γ R T / M)|vsnd|sqrt(gamma*Rg*Tk/Mmol)|gamma Rg Tk Mmol|للهواء γ = 1.4.|For air γ = 1.4.
سرعة الصوت في سائل|Speed of sound in a liquid|v = √(B / ρ)|vsnd|sqrt(Bmod/rho)|Bmod rho|في الماء ≈ 1480 m/s.|About 1480 m/s in water.
سرعة الصوت في قضيب صلب|Speed of sound in a solid rod|v = √(Y / ρ)|vsnd|sqrt(Ymod/7850)|Ymod|الفولاذ ≈ 5000 m/s.|Steel ≈ 5000 m/s.
الوتر المشدود: التوافقيات|String harmonics|fₙ = n v / (2L)|f|nh*vw/(2*Lstr)|nh vw Lstr|نغمات الجيتار.|Guitar notes.
أنبوب مفتوح الطرفين|Open pipe harmonics|fₙ = n v / (2L)|f|nh*vsnd/(2*Lstr)|nh vsnd Lstr|كل التوافقيات موجودة.|All harmonics present.
أنبوب مغلق من طرف|Closed pipe harmonics|fₙ = n v / (4L), n فردي|f|nh*vsnd/(4*Lstr)|nh vsnd Lstr|التوافقيات الفردية فقط.|Odd harmonics only.
تأثير دوبلر (مصدر يقترب)|Doppler: approaching source|f′ = f v / (v − v_s)|fo|fs*vsnd/(vsnd-vs)|fs vsnd vs|صفارة الإسعاف أعلى وهي تقترب.|A siren sounds higher approaching.
تأثير دوبلر (مصدر يبتعد)|Doppler: receding source|f′ = f v / (v + v_s)|fo|fs*vsnd/(vsnd+vs)|fs vsnd vs|أخفض وهي تبتعد.|Lower as it moves away.
تأثير دوبلر العام|General Doppler effect|f′ = f (v + v_o)/(v − v_s)|fo|fs*(vsnd+vo)/(vsnd-vs)|fs vsnd vo vs|المصدر والمستمع يتحركان.|Source and observer both moving.
تردد الضربات|Beat frequency|f_beat = ‖f₁ − f₂‖|f|abs(f1-f2)|f1 f2|تموّج يسمع بين نغمتين متقاربتين.|Pulsing heard between close notes.
شدة الصوت|Sound intensity|I = P / (4π r²)|Iw|Psrc/(4*PI*dist*dist)|Psrc dist|تقل مع مربع المسافة.|Falls with the square of distance.
مستوى الصوت بالديسيبل|Sound level in decibels|β = 10 log(I / I₀)|beta|10*log10(Iw/I0)|Iw I0|كل 10 dB = شدة أكبر 10 مرات.|Every 10 dB is 10× intensity.
الشدة من الديسيبل|Intensity from decibels|I = I₀ 10^(β/10)|Iw|I0*pow(10,beta/10)|I0 beta|عكس العلاقة السابقة.|The inverse relation.
فرق المستوى عند تغيير المسافة|Level change with distance|Δβ = 20 log(r₁/r₂)|beta|20*log10(ra/rb)|ra rb|مضاعفة المسافة ينقص 6 dB.|Doubling distance loses 6 dB.
الطاقة في الموجة|Energy in a wave|E ∝ A²|E|A*A*100|A|ضاعف السعة = طاقة 4 أضعاف.|Double the amplitude, four times the energy.
عدد ماخ|Mach number|M = v / v_sound|Mach|v/vsnd|v vsnd|أكبر من 1 = أسرع من الصوت.|Above 1 is supersonic.
زاوية مخروط ماخ|Mach cone angle|sin θ = 1 / M|th|deg(asin(1/Mach))|Mach|موجة الصدمة خلف الطائرة.|The shock cone behind a jet.
الصدى: المسافة|Echo distance|d = v t / 2|d|vsnd*t/2|vsnd t|الصوت يروح ويرجع.|Sound travels there and back.
فرق الطور وفرق المسار|Phase and path difference|Δφ = 2π Δx / λ|dphi|2*PI*dpath/lam|dpath lam|أساس التداخل.|The basis of interference.
التداخل البنّاء|Constructive interference|Δx = n λ|dpath|nh*lam|nh lam|الموجات تقوي بعضها.|Waves reinforce.
التداخل الهدّام|Destructive interference|Δx = (n + ½) λ|dpath|(nh+0.5)*lam|nh lam|الموجات تلغي بعضها (سماعات إلغاء الضوضاء).|Waves cancel (noise-cancelling).
الموجة الواقفة|Standing wave|y = 2A sin(kx) cos(ωt)|xd|2*A*sin(kw*x)*cos(wosc*t)|A kw x wosc t|عقد وبطون ثابتة.|Fixed nodes and antinodes.
المسافة بين عقدتين|Node spacing|d = λ / 2|d|lam/2|lam|نصف طول موجي.|Half a wavelength.
قدرة موجة على وتر|Power on a string|P = ½ μ ω² A² v|P|0.5*mul*wosc*wosc*A*A*vw|mul wosc A vw|الطاقة المنقولة في الثانية.|Energy carried per second.
تردد الرنين لعلبة (هيلمهولتز)|Helmholtz resonance|f = (v/2π) √(A / (V L))|f|vsnd/(2*PI)*sqrt(Ar/(V*Lstr))|vsnd Ar V Lstr|صوت النفخ في فوهة زجاجة.|Blowing across a bottle.
قانون سنل للأمواج|Wave refraction|sin θ₁ / sin θ₂ = v₁ / v₂|th2|deg(asin(sin(rad(th1))*vB/vA))|th1 vA vB|الموجات تنحني عند تغيير الوسط.|Waves bend when speed changes.|optics
التردد الطبيعي لعمود هواء|Fundamental of an open pipe|f₁ = v / (2L)|f|vsnd/(2*Lstr)|vsnd Lstr|الفلوت والأرغن.|Flutes and organ pipes.
الأوكتاف|Octave|f₂ = 2 f₁|f2|2*f1|f1|ضعف التردد = نفس النغمة أعلى.|Double frequency, same note higher.
السلم الموسيقي المعدّل|Equal temperament|fₙ = 440 × 2^(n/12)|f|440*pow(2,nn/12)|nn|n عدد أنصاف الدرجات عن نغمة A4.|n semitones from A4.
الموجات فوق الصوتية الطبية|Ultrasound depth|d = v t / 2|d|1540*t/2|t|سرعة الصوت في الأنسجة ≈ 1540 m/s.|Sound in tissue ≈ 1540 m/s.
موجات الماء العميق|Deep-water wave speed|v = √(g λ / 2π)|vw|sqrt(g*lam/(2*PI))|g lam|الأمواج الطويلة أسرع.|Longer waves travel faster.
موجات الماء الضحل|Shallow-water wave speed|v = √(g h)|vw|sqrt(g*hd)|g hd|مثل التسونامي.|Like tsunamis.
`);

EQ.add('els',`
قانون كولوم|Coulomb’s law|F = k q₁ q₂ / r²|F|ke*q1*q2/(r12*r12)|ke q1 q2 r12|الشحنات المتشابهة تتنافر.|Like charges repel.
ثابت كولوم|Coulomb constant|k = 1 / (4π ε₀)|ke|1/(4*PI*e0)|e0|≈ 8.99 × 10⁹.|≈ 8.99 × 10⁹.
شدة المجال الكهربائي|Electric field|E = F / q|Ef|F/q|F q|القوة على كل كولوم.|Force per coulomb.
مجال شحنة نقطية|Field of a point charge|E = k q / r²|Ef|ke*q/(r12*r12)|ke q r12|يتناقص مع مربع المسافة.|Falls with distance squared.
الجهد الكهربائي لشحنة نقطية|Potential of a point charge|V = k q / r|Vv|ke*q/r12|ke q r12|طاقة لكل كولوم.|Energy per coulomb.
طاقة الوضع الكهربائية|Electric potential energy|U = k q₁ q₂ / r|Ue|ke*q1*q2/r12|ke q1 q2 r12|طاقة نظام شحنتين.|Energy of two charges.
الشغل وفرق الجهد|Work and potential difference|W = q ΔV|W|q*Vab|q Vab|شغل نقل شحنة.|Work to move a charge.
المجال المنتظم بين لوحين|Uniform field between plates|E = ΔV / d|Ef|Vab/dsep|Vab dsep|المجال ثابت بين اللوحين.|Constant between the plates.
السعة الكهربائية|Capacitance|C = Q / V|Cap|q/Vv|q Vv|كم شحنة يخزن المكثف لكل فولت.|Charge stored per volt.
مكثف متوازي اللوحين|Parallel-plate capacitor|C = κ ε₀ A / d|Cap|kap*e0*Ar/dsep|kap e0 Ar dsep|مساحة أكبر = سعة أكبر.|Bigger plates, more capacitance.
طاقة المكثف|Energy in a capacitor|U = ½ C V²|Ue|0.5*Cap*Vv*Vv|Cap Vv|طاقة الفلاش في الكاميرا.|Energy for a camera flash.
طاقة المكثف بالشحنة|Capacitor energy (charge)|U = Q² / (2C)|Ue|q*q/(2*Cap)|q Cap|صيغة بديلة.|Alternative form.
مكثفات على التوالي|Capacitors in series|1/C = 1/C₁ + 1/C₂|Cap|1/(1/C1+1/C2)|C1 C2|السعة الكلية تقل.|Total capacitance drops.
مكثفات على التوازي|Capacitors in parallel|C = C₁ + C₂|Cap|C1+C2|C1 C2|السعة الكلية تزيد.|Total capacitance adds.
قانون غاوس|Gauss’s law|Φ_E = Q / ε₀|Eflux|q/e0|q e0|التدفق عبر سطح مغلق.|Flux through a closed surface.
مجال لوح مشحون لا نهائي|Field of a charged sheet|E = σ / (2ε₀)|Ef|sig2/(2*e0)|sig2 e0|لا يعتمد على المسافة.|Independent of distance.
مجال موصل مشحون|Field at a conductor surface|E = σ / ε₀|Ef|sig2/e0|sig2 e0|خارج الموصل مباشرة.|Just outside a conductor.
مجال سلك مشحون طويل|Field of a long charged wire|E = λ / (2π ε₀ r)|Ef|lam2/(2*PI*e0*r12)|lam2 e0 r12|يتناقص مع المسافة.|Falls off with distance.
كثافة طاقة المجال|Energy density of a field|u = ½ ε₀ E²|E|0.5*e0*Ef*Ef|e0 Ef|طاقة لكل متر مكعب.|Energy per cubic metre.
عزم ثنائي القطب|Electric dipole moment|p = q d|pdip|q*dsep|q dsep|شحنتان متعاكستان.|Two opposite charges.
عزم الدوران على ثنائي القطب|Torque on a dipole|τ = p E sin θ|tau|pdip*Ef*sin(rad(th))|pdip Ef th|يحاول يحاذيه مع المجال.|Tries to align it with the field.
حركة شحنة في مجال|Charge accelerated in a field|a = q E / m|a|q*Ef/m|q Ef m|مثل الإلكترون في الشاشة القديمة.|Like electrons in an old TV tube.
سرعة شحنة بعد فرق جهد|Speed after a potential drop|v = √(2 q V / m)|v|sqrt(2*eC*Vv/me)|eC Vv me|إلكترون يتسارع خلال فرق جهد.|An electron accelerated through V.
الإلكترون فولت|Electron-volt|1 eV = 1.602 × 10⁻¹⁹ J|E|nn*1.602e-19|nn|وحدة طاقة صغيرة.|A tiny energy unit.
الشحنة المكممة|Quantised charge|q = n e|q|nn*eC|nn eC|كل شحنة مضاعفات شحنة الإلكترون.|Charge comes in multiples of e.
مكثف بعازل|Capacitor with a dielectric|C = κ C₀|Cap|kap*C1|kap C1|العازل يزيد السعة.|A dielectric raises capacitance.
جهد ثنائي القطب|Dipole potential|V = k p cos θ / r²|Vv|ke*pdip*cos(rad(th))/(r12*r12)|ke pdip th r12|بعيدًا عن ثنائي القطب.|Far from the dipole.
مجال حلقة مشحونة على المحور|Field on a charged ring’s axis|E = k Q x / (x² + R²)^(3/2)|Ef|ke*q*xd/pow(xd*xd+r*r,1.5)|ke q xd r|يكون صفرًا في المركز.|Zero at the centre.
تيار شحن مكثف أقصى|Initial charging current|I₀ = V / R|Iamp|Vv/Rres|Vv Rres|لحظة الوصل.|At switch-on.|circuit
`);

EQ.add('cir',`
التيار الكهربائي|Electric current|I = Q / t|Iamp|q/t|q t|كمية الشحنة المارة في الثانية.|Charge passing per second.
قانون أوم|Ohm’s law|V = I R|Vv|Iamp*Rres|Iamp Rres|الجهد = التيار × المقاومة.|Voltage equals current times resistance.
التيار من قانون أوم|Current from Ohm’s law|I = V / R|Iamp|Vv/Rres|Vv Rres|جهد أكبر = تيار أكبر.|More voltage, more current.
المقاومة من قانون أوم|Resistance from Ohm’s law|R = V / I|Rres|Vv/Iamp|Vv Iamp|كم يعيق الموصل التيار.|How strongly a conductor resists.
المقاومة والمقاومية|Resistance of a wire|R = ρ L / A|Rres|rhoe*Ilen/Awire|rhoe Ilen Awire|سلك أطول وأرفع = مقاومة أكبر.|Longer, thinner wire resists more.
مقاومات على التوالي|Resistors in series|R = R₁ + R₂ + R₃|Rt|R1+R2+R3|R1 R2 R3|نفس التيار يمر بالكل.|Same current through all.
مقاومات على التوازي|Resistors in parallel|1/R = 1/R₁ + 1/R₂ + 1/R₃|Rt|1/(1/R1+1/R2+1/R3)|R1 R2 R3|المقاومة الكلية أقل من أصغرها.|Less than the smallest one.
مقاومتان على التوازي|Two resistors in parallel|R = R₁R₂ / (R₁ + R₂)|Rt|R1*R2/(R1+R2)|R1 R2|الضرب على الجمع.|Product over sum.
القدرة الكهربائية|Electric power|P = V I|Pw|Vv*Iamp|Vv Iamp|الطاقة المستهلكة في الثانية.|Energy used per second.
القدرة بالمقاومة والتيار|Power from current|P = I² R|Pw|Iamp*Iamp*Rres|Iamp Rres|حرارة جول في السلك.|Joule heating in a wire.
القدرة بالجهد والمقاومة|Power from voltage|P = V² / R|Pw|Vv*Vv/Rres|Vv Rres|مثل المدفأة الكهربائية.|Like an electric heater.
الطاقة الكهربائية|Electrical energy|E = P t|Ue|Pw*t|Pw t|بالجول.|In joules.
تكلفة الكهرباء|Cost of electricity|التكلفة = P(kW) × t(h) × السعر|res|Pw/1000*ty*0.18|Pw ty|بسعر 0.18 ريال لكل kWh (مثال).|At 0.18 SAR per kWh (example).
القوة الدافعة والمقاومة الداخلية|EMF and internal resistance|V = ε − I r|Vv|emf-Iamp*rint|emf Iamp rint|الجهد ينقص عند سحب تيار.|Terminal voltage drops under load.
التيار في دائرة بسيطة|Current in a simple circuit|I = ε / (R + r)|Iamp|emf/(Rres+rint)|emf Rres rint|مع المقاومة الداخلية.|Including internal resistance.
قانون كيرشوف للتيار|Kirchhoff’s current law|ΣI_in = ΣI_out||||ما يدخل العقدة يطلع منها.|What enters a junction leaves it.
قانون كيرشوف للجهد|Kirchhoff’s voltage law|ΣV = 0 حول أي حلقة||||مجموع الجهود في حلقة مغلقة صفر.|Voltages round a loop sum to zero.
مقسّم الجهد|Voltage divider|V_out = V_in R₂ / (R₁ + R₂)|Vout|Vin*R2/(R1+R2)|Vin R1 R2|جزء من الجهد على مقاومة.|A fraction of the voltage.
مقسّم التيار|Current divider|I₁ = I R₂ / (R₁ + R₂)|Iamp|Iamp*R2/(R1+R2)|Iamp R1 R2|التيار يتوزع عكس المقاومة.|Current splits inversely to resistance.
الثابت الزمني RC|RC time constant|τ = R C|tauRC|Rres*Cap|Rres Cap|زمن الشحن إلى 63%.|Time to charge to 63%.
شحن المكثف|Charging a capacitor|V_C = V (1 − e^(−t/RC))|Vc|Vv*(1-exp(-t/(Rres*Cap)))|Vv t Rres Cap|يرتفع ببطء ثم يستقر.|Rises then levels off.
تفريغ المكثف|Discharging a capacitor|V_C = V₀ e^(−t/RC)|Vc|Vv*exp(-t/(Rres*Cap))|Vv t Rres Cap|ينخفض أسيًا.|Falls exponentially.
سرعة الانجراف|Drift velocity|I = n A v_d q|vd|Iamp/(nden*Awire*eC)|Iamp nden Awire eC|الإلكترونات تتحرك ببطء شديد!|Electrons crawl surprisingly slowly!
تغير المقاومة مع الحرارة|Resistance and temperature|R = R₀ (1 + α ΔT)|Rres|R0t*(1+alR*dT)|R0t alR dT|المعادن تزيد مقاومتها بالحرارة.|Metals resist more when hot.
التيار المتردد الفعّال|RMS current|I_rms = I₀ / √2|Irms|I0a/sqrt(2)|I0a|القيمة المكافئة للتيار المستمر.|The DC-equivalent value.
الجهد الفعّال|RMS voltage|V_rms = V₀ / √2|Vrms|V0a/sqrt(2)|V0a|220 V في المنازل = قيمة فعّالة.|Mains 220 V is an rms value.
المفاعلة الحثية|Inductive reactance|X_L = 2π f L|XL|2*PI*f*Lind|f Lind|تزيد مع التردد.|Grows with frequency.
المفاعلة السعوية|Capacitive reactance|X_C = 1 / (2π f C)|XC|1/(2*PI*f*Cap)|f Cap|تقل مع التردد.|Falls with frequency.
ممانعة دائرة RLC|RLC impedance|Z = √(R² + (X_L − X_C)²)|Zimp|sqrt(Rres*Rres+pow(XL-XC,2))|Rres XL XC|المقاومة الكلية للتيار المتردد.|Total opposition to AC.
تردد الرنين|Resonant frequency|f₀ = 1 / (2π √(L C))|f|1/(2*PI*sqrt(Lind*Cap))|Lind Cap|يستخدم في ضبط محطات الراديو.|Used to tune radios.
القدرة المتوسطة في AC|Average AC power|P = V_rms I_rms cos φ|Pw|Vrms*Irms*pfac|Vrms Irms pfac|cos φ معامل القدرة.|cos φ is the power factor.
قانون جول|Joule’s law of heating|Q = I² R t|Qh|Iamp*Iamp*Rres*t|Iamp Rres t|الحرارة الناتجة في المقاومة.|Heat produced in a resistor.
الموصلية|Conductance|G = 1 / R|res|1/Rres|Rres|بوحدة السيمنز.|In siemens.
جسر ويتستون|Wheatstone bridge balance|R₁/R₂ = R₃/R₄|Rres|R2*R3/R1|R1 R2 R3|قياس مقاومة مجهولة بدقة.|Measuring an unknown resistance.
كفاءة نقل القدرة|Maximum power transfer|R_load = r|Pw|emf*emf/(4*rint)|emf rint|أقصى قدرة عندما تتساوى المقاومتان.|Most power when resistances match.
سعة البطارية|Battery capacity|t = (mAh) / I(mA)|t|nn*1000/Iamp/1000|nn Iamp|ساعات التشغيل تقريبيًا.|Approximate running hours.
`);

EQ.add('mag',`
القوة على شحنة متحركة|Magnetic force on a charge|F = q v B sin θ|Fm|q*vq*Bf*sin(rad(th))|q vq Bf th|قوة لورنتز.|The Lorentz force.
قوة لورنتز الكاملة|Full Lorentz force|F = q(E + v × B)|Fm|q*(Ef+vq*Bf)|q Ef vq Bf|المجالان معًا (متعامدان).|Both fields (perpendicular).
القوة على سلك يحمل تيارًا|Force on a current-carrying wire|F = B I L sin θ|Fm|Bf*Iamp*Lr*sin(rad(th))|Bf Iamp Lr th|أساس عمل المحرك الكهربائي.|How electric motors work.
نصف قطر مسار الشحنة|Radius of a charge’s orbit|r = m v / (q B)|rcyc|me*vq/(eC*Bf)|me vq eC Bf|الإلكترون يدور في المجال.|An electron circling in a field.
تردد السيكلوترون|Cyclotron frequency|f = q B / (2π m)|fcyc|eC*Bf/(2*PI*me)|eC Bf me|لا يعتمد على السرعة.|Independent of speed.
مجال سلك طويل مستقيم|Field of a long straight wire|B = μ₀ I / (2π r)|Bf|mu0*Iamp/(2*PI*dist2)|mu0 Iamp dist2|دوائر حول السلك.|Circles around the wire.
مجال مركز حلقة|Field at the centre of a loop|B = μ₀ I / (2R)|Bf|mu0*Iamp/(2*r)|mu0 Iamp r|حلقة دائرية.|A circular loop.
مجال ملف لولبي|Field inside a solenoid|B = μ₀ n I|Bf|mu0*nturn*Iamp|mu0 nturn Iamp|مجال منتظم داخل الملف.|Uniform inside the coil.
مجال ملف لولبي بعدد اللفات|Solenoid field (turns, length)|B = μ₀ N I / L|Bf|mu0*N*Iamp/Lsol|mu0 N Iamp Lsol|صيغة بديلة.|Alternative form.
القوة بين سلكين متوازيين|Force between parallel wires|F/L = μ₀ I₁ I₂ / (2π d)|Fm|mu0*Iamp*Iamp/(2*PI*dist2)|mu0 Iamp dist2|التيارات المتشابهة تتجاذب.|Parallel currents attract.
التدفق المغناطيسي|Magnetic flux|Φ = B A cos θ|Phi|Bf*Ar*cos(rad(th))|Bf Ar th|عدد خطوط المجال عبر سطح.|Field lines through a surface.
قانون فاراداي|Faraday’s law|ε = −N ΔΦ / Δt|emfI|N*dPhi/dt|N dPhi dt|تغيّر التدفق يولد جهدًا.|Changing flux induces a voltage.
القوة الدافعة الحركية|Motional emf|ε = B L v|emfI|Bf*Lr*v|Bf Lr v|موصل يتحرك في مجال.|A conductor moving through a field.
المولد الكهربائي|AC generator|ε = N B A ω sin(ωt)|emfI|N*Bf*Ar*wosc|N Bf Ar wosc|القيمة القصوى للجهد.|Peak generator voltage.
قانون لنز|Lenz’s law|التيار المستحث يعاكس سببه||||اتجاه التيار المستحث.|Direction of induced current.
المحوّل|Transformer|Vₛ / Vₚ = Nₛ / Nₚ|Vs|Vp*Ns/Np|Vp Ns Np|رفع أو خفض الجهد.|Steps voltage up or down.
تيار المحوّل المثالي|Ideal transformer currents|Iₛ / Iₚ = Nₚ / Nₛ|Iamp|Iamp*Np/Ns|Iamp Np Ns|القدرة محفوظة.|Power is conserved.
الحث الذاتي لملف|Self-inductance of a solenoid|L = μ₀ N² A / ℓ|Lind|mu0*N*N*Ar/Lsol|mu0 N Ar Lsol|يقاوم تغيّر التيار.|Resists changes in current.
القوة الدافعة الذاتية|Self-induced emf|ε = −L ΔI / Δt|emfI|Lind*Iamp/dt|Lind Iamp dt|شرارة عند فتح الدائرة.|A spark when a circuit opens.
طاقة الملف|Energy in an inductor|U = ½ L I²|UL|0.5*Lind*Iamp*Iamp|Lind Iamp|طاقة مخزّنة في المجال المغناطيسي.|Stored in the magnetic field.
الثابت الزمني RL|RL time constant|τ = L / R|tauRC|Lind/Rres|Lind Rres|زمن نمو التيار.|Current growth time.
نمو التيار في ملف|Current growth in RL|I = (V/R)(1 − e^(−Rt/L))|Iamp|Vv/Rres*(1-exp(-Rres*t/Lind))|Vv Rres t Lind|يصل للقيمة النهائية تدريجيًا.|Rises gradually to its final value.
عزم على حلقة تيار|Torque on a current loop|τ = N I A B sin θ|tau|N*Iamp*Ar*Bf*sin(rad(th))|N Iamp Ar Bf th|أساس الجلفانومتر.|How galvanometers work.
العزم المغناطيسي لحلقة|Magnetic moment of a loop|μ = N I A|mmag|N*Iamp*Ar|N Iamp Ar|مثل مغناطيس صغير.|Behaves like a small magnet.
كثافة طاقة المجال المغناطيسي|Magnetic energy density|u = B² / (2μ₀)|E|Bf*Bf/(2*mu0)|Bf mu0|طاقة لكل متر مكعب.|Energy per cubic metre.
محدد السرعة (مجالان متعامدان)|Velocity selector|v = E / B|v|Ef/Bf|Ef Bf|تمر فقط الشحنات بهذه السرعة.|Only this speed passes straight.
مطياف الكتلة|Mass spectrometer|m = q B r / v|m|eC*Bf*rcyc/vq|eC Bf rcyc vq|فصل النظائر.|Separating isotopes.
تأثير هول|Hall voltage|V_H = I B / (n q t)|Vv|Iamp*Bf/(nden*eC*0.001)|Iamp Bf nden eC|بسمك 1 mm.|For a 1 mm thick strip.
قانون أمبير|Ampère’s law|∮B·dl = μ₀ I||||المجال حول تيار مغلق.|Field around a current.
قانون بيو-سافار|Biot–Savart law|dB = μ₀ I dl × r̂ / (4π r²)||||مجال قطعة صغيرة من السلك.|Field of a tiny wire segment.
معادلات ماكسويل|Maxwell’s equations|∇·E = ρ/ε₀ ، ∇·B = 0 ، ∇×E = −∂B/∂t ، ∇×B = μ₀J + μ₀ε₀∂E/∂t||||أربع معادلات توحّد الكهرباء والمغناطيسية والضوء.|Four equations uniting electricity, magnetism and light.
سرعة الضوء من الثوابت|Speed of light from constants|c = 1 / √(μ₀ ε₀)|cl|1/sqrt(mu0*e0)|mu0 e0|اكتشاف ماكسويل أن الضوء موجة كهرومغناطيسية.|Maxwell’s discovery that light is electromagnetic.
`);

EQ.add('opt',`
سرعة الضوء في وسط|Speed of light in a medium|v = c / n|vlight|cl/nr|cl nr|الضوء أبطأ في الزجاج.|Light is slower in glass.
معامل الانكسار|Refractive index|n = c / v|nr|cl/vlight|cl vlight|نسبة سرعة الضوء.|Ratio of light speeds.
قانون سنل|Snell’s law|n₁ sin θ₁ = n₂ sin θ₂|th2|deg(asin(n1*sin(rad(th1))/n2))|n1 th1 n2|انكسار الضوء عند الحدود.|Light bending at a boundary.
الزاوية الحرجة|Critical angle|sin θ_c = n₂ / n₁|thc|deg(asin(n1/n2))|n1 n2|أساس الألياف الضوئية (الانعكاس الكلي).|Behind optical fibres (total internal reflection).
قانون الانعكاس|Law of reflection|θ_i = θ_r|th|th1|th1|زاوية السقوط = زاوية الانعكاس.|Angle in equals angle out.
معادلة العدسة الرقيقة|Thin-lens equation|1/f = 1/dₒ + 1/dᵢ|di|1/(1/fl-1/dob)|fl dob|أين تتكون الصورة.|Where the image forms.
البعد البؤري من بعدي الجسم والصورة|Focal length from distances|f = dₒ dᵢ / (dₒ + dᵢ)|fl|dob*di/(dob+di)|dob di|صيغة مكافئة.|Equivalent form.
التكبير|Magnification|M = −dᵢ / dₒ = hᵢ / hₒ|Mg|-di/dob|di dob|سالب = صورة مقلوبة.|Negative means inverted.
طول الصورة|Image height|hᵢ = M hₒ|hi|Mg*ho|Mg ho|حجم الصورة.|Image size.
قوة العدسة|Lens power|P = 1 / f|Dp|1/fl|fl|بالديوبتر (f بالمتر).|In dioptres (f in metres).
عدستان متلاصقتان|Two lenses in contact|1/f = 1/f₁ + 1/f₂|fl|1/(1/fl+1/fo2)|fl fo2|القوى تُجمع.|Powers add.
معادلة صانع العدسات|Lensmaker’s equation|1/f = (n − 1)(1/R₁ − 1/R₂)|fl|1/((nr-1)*(1/Rmir+1/Rmir))|nr Rmir|عدسة محدبة الوجهين.|A biconvex lens.
البعد البؤري للمرآة|Mirror focal length|f = R / 2|fl|Rmir/2|Rmir|نصف نصف قطر التكور.|Half the radius of curvature.
معادلة المرآة|Mirror equation|1/f = 1/dₒ + 1/dᵢ|di|1/(1/fo2-1/dob)|fo2 dob|نفس صيغة العدسة.|Same form as the lens.
تجربة يونغ: موقع الهدب|Young’s double slit: fringe position|y = m λ L / d|ybr|mord*lph*Lscr/dslit|mord lph Lscr dslit|هدب مضيئة متساوية البعد.|Evenly spaced bright fringes.
المسافة بين الهدب|Fringe spacing|Δy = λ L / d|ybr|lph*Lscr/dslit|lph Lscr dslit|شقان أقرب = هدب أبعد.|Closer slits, wider fringes.
حيود الشق الواحد|Single-slit minima|a sin θ = m λ|th|deg(asin(mord*lph/aslit))|mord lph aslit|مواقع الظلام.|Positions of darkness.
محزوز الحيود|Diffraction grating|d sin θ = m λ|th|deg(asin(mord*lph*Nlines))|mord lph Nlines|يفصل ألوان الضوء.|Splits light into colours.
قانون مالوس|Malus’s law|I = I₀ cos² θ|Il|I0l*pow(cos(rad(thp)),2)|I0l thp|الضوء المستقطب.|Polarised light.
زاوية بروستر|Brewster’s angle|tan θ_B = n₂ / n₁|th|deg(atan(n2/n1))|n2 n1|الضوء المنعكس مستقطب كليًا.|Reflected light is fully polarised.
معيار رايلي للتمييز|Rayleigh criterion|θ = 1.22 λ / D|thmin|1.22*lph/Dap|lph Dap|أصغر تفصيل يُرى بالتلسكوب.|Finest detail a telescope can see.
تكبير التلسكوب|Telescope magnification|M = f_o / f_e|Mg|f_obj/f_eye|f_obj f_eye|شيئية طويلة وعينية قصيرة.|Long objective, short eyepiece.
تكبير العدسة المكبّرة|Magnifying glass|M = 25 cm / f|Mg|0.25/fl|fl|لنقطة الرؤية القريبة 25 cm.|For a 25 cm near point.
تكبير المجهر المركب|Compound microscope|M ≈ (L/f_o)(25 cm/f_e)|Mg|(0.16/0.004)*(0.25/f_eye)|f_eye|طول أنبوب 16 cm وشيئية 4 mm.|16 cm tube, 4 mm objective.
تداخل الأغشية الرقيقة|Thin-film interference|2 n t = (m + ½) λ|lph|2*nf*tfilm/(mord+0.5)|nf tfilm mord|ألوان فقاعة الصابون.|Colours on soap bubbles.
الطاقة والطول الموجي للضوء|Light energy and wavelength|E = h c / λ|Eph|hP*cl/lph|hP cl lph|الضوء الأزرق أعلى طاقة.|Blue light carries more energy.|atom
الانزياح الظاهري للعمق|Apparent depth|d′ = d / n|d|hd/nr|hd nr|المسبح يبدو أقل عمقًا.|Pools look shallower.
شدة الإضاءة|Illuminance (inverse square)|E = I / r²|Il|I0l/(dist*dist)|I0l dist|تقل مع مربع المسافة.|Falls with distance squared.
تشتت رايلي|Rayleigh scattering|I ∝ 1 / λ⁴|res|pow(700/450,4)||لهذا السماء زرقاء (الأزرق يتشتت أكثر بـ ≈5.7 مرات).|Why the sky is blue (blue scatters ≈5.7× more).
السرعة في الألياف الضوئية|Time through an optical fibre|t = n L / c|t|nr*Ilen*1000/cl|nr Ilen cl|لطول L بالكيلومتر.|For L in kilometres.
قوة نظارة لقصر النظر|Glasses for short sight|P = −1 / d_far|Dp|-1/dist|dist|d_far أبعد نقطة رؤية واضحة.|d_far is the far point.
`);

EQ.add('mod',`
طاقة الفوتون|Photon energy|E = h f|Eph|hP*fph|hP fph|الضوء حزم من الطاقة.|Light comes in packets.
طاقة الفوتون بالطول الموجي|Photon energy from wavelength|E = h c / λ|Eph|hP*cl/lph|hP cl lph|طول موجي أقصر = طاقة أكبر.|Shorter wavelength, more energy.
زخم الفوتون|Photon momentum|p = h / λ|pph|hP/lph|hP lph|الضوء يدفع (الأشرعة الشمسية).|Light pushes (solar sails).
التأثير الكهروضوئي|Photoelectric effect|Kₘₐₓ = h f − φ|Kmax|hP*fph-W0|hP fph W0|فسّره أينشتاين وأخذ عليه نوبل.|Explained by Einstein (Nobel Prize).
تردد العتبة|Threshold frequency|f₀ = φ / h|fph|W0/hP|W0 hP|أقل تردد يحرر إلكترونًا.|Lowest frequency to free an electron.
جهد الإيقاف|Stopping potential|e V₀ = Kₘₐₓ|Vv|Kmax/eC|Kmax eC|الجهد اللازم لإيقاف الإلكترونات.|Voltage needed to stop electrons.
طول موجة دي بروي|de Broglie wavelength|λ = h / (m v)|lamdB|hP/(me*v)|hP me v|المادة لها طبيعة موجية.|Matter behaves like a wave.
دي بروي بالطاقة|de Broglie from energy|λ = h / √(2 m E)|lamdB|hP/sqrt(2*me*Eph)|hP me Eph|للإلكترون المتسارع.|For an accelerated electron.
مستويات طاقة ذرة الهيدروجين|Hydrogen energy levels|Eₙ = −13.6 eV / n²|En|-13.6/(nq*nq)|nq|طاقات مكممة.|Quantised energies.
نصف قطر بور|Bohr radius of level n|rₙ = 0.0529 nm × n²|r|0.0529e-9*nq*nq|nq|المدارات تكبر مع n².|Orbits grow as n².
معادلة ريدبيرغ|Rydberg formula|1/λ = R_H (1/n_f² − 1/nᵢ²)|lph|1/(Ryd*(1/(nfin*nfin)-1/(ni*ni)))|Ryd nfin ni|خطوط طيف الهيدروجين (3→2 أحمر 656 nm).|Hydrogen spectral lines (3→2 red, 656 nm).
طاقة الفوتون المنبعث|Emitted photon energy|ΔE = 13.6 (1/n_f² − 1/nᵢ²) eV|En|13.6*(1/(nfin*nfin)-1/(ni*ni))|nfin ni|عند قفز الإلكترون لمستوى أدنى.|When an electron drops a level.
مبدأ عدم اليقين لهايزنبرغ|Heisenberg uncertainty principle|Δx Δp ≥ ħ / 2|dpq|hP/(4*PI*dxq)|hP dxq|لا يمكن معرفة الموقع والزخم بدقة معًا.|Position and momentum can’t both be exact.
عدم اليقين في الطاقة والزمن|Energy–time uncertainty|ΔE Δt ≥ ħ / 2|E|hP/(4*PI*dt)|hP dt|الحالات قصيرة العمر طاقتها غير محددة.|Short-lived states have fuzzy energy.
تشتت كومبتون|Compton scattering|Δλ = (h / mₑc)(1 − cos θ)|lC|hP/(me*cl)*(1-cos(rad(thC)))|hP me cl thC|الفوتون يفقد طاقة عند الاصطدام.|A photon loses energy in a collision.
معادلة شرودنغر (المستقلة عن الزمن)|Schrödinger equation (time-independent)|−(ħ²/2m) d²ψ/dx² + Vψ = Eψ||||المعادلة الأساسية لميكانيكا الكم.|The core equation of quantum mechanics.
معادلة شرودنغر (المعتمدة على الزمن)|Schrödinger equation (time-dependent)|iħ ∂ψ/∂t = Ĥψ||||تطور الحالة الكمية مع الزمن.|How a quantum state evolves.
جسيم في صندوق|Particle in a box|Eₙ = n² h² / (8 m L²)|Eph|nq*nq*hP*hP/(8*me*Lbox*Lbox)|nq hP me Lbox|طاقات مكممة لإلكترون محبوس.|Quantised energies of a trapped electron.
احتمال إيجاد الجسيم|Probability density|P = ‖ψ‖²||||مربع دالة الموجة يعطي الاحتمال.|The squared wavefunction gives probability.
ثابت بلانك المختزل|Reduced Planck constant|ħ = h / 2π|hP|hP/(2*PI)|hP|≈ 1.055 × 10⁻³⁴ J·s.|≈ 1.055 × 10⁻³⁴ J·s.
طاقة الإلكترون المتسارع|Energy gained by an electron|E = e V|Eph|eC*Vv|eC Vv|إلكترون فولت.|Electron-volts.
أقصر طول موجي لأشعة X|Shortest X-ray wavelength|λ_min = h c / (e V)|lph|hP*cl/(eC*30000)|hP cl eC|لجهد أنبوب 30 kV.|For a 30 kV tube.
قانون براغ|Bragg’s law|2 d sin θ = n λ|lph|2*2.8e-10*sin(rad(th))/nh|th nh|حيود الأشعة السينية في البلورات.|X-ray diffraction in crystals.
تكميم الزخم الزاوي (بور)|Bohr angular momentum|L = n ħ|L|nq*hP/(2*PI)|nq hP|فرضية بور.|Bohr’s postulate.
الإشعاع الحراري (بلانك)|Planck’s radiation law|B = (2hc²/λ⁵) / (e^(hc/λkT) − 1)|E|2*hP*cl*cl/pow(lph,5)/(exp(hP*cl/(lph*kB*Tk))-1)|hP cl lph kB Tk|طيف الجسم الأسود.|Black-body spectrum.
تشتت راذرفورد|Rutherford closest approach|r = k q₁ q₂ / E|r|ke*2*79*eC*eC/(5e6*eC)|ke eC|جسيم ألفا 5 MeV على الذهب.|A 5 MeV alpha on gold.
تأثير زيمان|Zeeman splitting|ΔE = μ_B B|E|9.274e-24*Bf|Bf|انقسام خطوط الطيف في مجال مغناطيسي.|Spectral lines split in a magnetic field.
`);

EQ.add('nuc',`
تكافؤ الكتلة والطاقة|Mass–energy equivalence|E = m c²|E|m*cl*cl|m cl|الكتلة شكل من أشكال الطاقة.|Mass is a form of energy.
طاقة الربط من النقص الكتلي|Binding energy from mass defect|E_b = Δm c²|E|dm*cl*cl|dm cl|الطاقة اللي تمسك النواة.|Energy holding a nucleus together.
وحدة الكتلة الذرية والطاقة|Atomic mass unit to energy|1 u = 931.5 MeV|MeV|amu*931.5|amu|تحويل سريع.|A quick conversion.
نصف قطر النواة|Nuclear radius|R = 1.2 fm × A^(1/3)|Rnuc|1.2e-15*cbrt(Anuc)|Anuc|النوى صغيرة جدًا.|Nuclei are tiny.
قانون الاضمحلال الإشعاعي|Radioactive decay law|N = N₀ e^(−λt)|Nn|N0*exp(-lamd*t)|N0 lamd t|عدد الأنوية المتبقية.|Nuclei remaining.
الاضمحلال بعمر النصف|Decay with half-life|N = N₀ (½)^(t / t½)|Nn|N0*pow(0.5,t/thalf)|N0 t thalf|كل عمر نصف يبقى النصف.|Half remain after each half-life.
عمر النصف وثابت الاضمحلال|Half-life and decay constant|t½ = ln 2 / λ|thalf|log(2)/lamd|lamd|علاقة أساسية.|A key relation.
النشاط الإشعاعي|Activity|A = λ N|Act|lamd*Nn|lamd Nn|عدد الاضمحلالات في الثانية (بيكريل).|Decays per second (becquerel).
النشاط مع الزمن|Activity over time|A = A₀ e^(−λt)|Act|1000*exp(-lamd*t)|lamd t|يتناقص أسيًا.|Falls exponentially.
العمر المتوسط|Mean lifetime|τ = 1 / λ|tauRC|1/lamd|lamd|متوسط عمر النواة.|Average life of a nucleus.
التأريخ بالكربون 14|Carbon-14 dating|t = (t½ / ln 2) ln(N₀/N)|t|5730/log(2)*log(N0/Nn)|N0 Nn|عمر النصف 5730 سنة (الناتج بالسنوات).|Half-life 5730 years (result in years).
اضمحلال ألفا|Alpha decay|ᴬ_Z X → ᴬ⁻⁴_(Z−2) Y + ⁴₂He||||النواة تفقد بروتونين ونيوترونين.|The nucleus loses two protons and two neutrons.
اضمحلال بيتا السالب|Beta-minus decay|n → p + e⁻ + ν̄ₑ||||نيوترون يتحول لبروتون.|A neutron becomes a proton.
اضمحلال بيتا الموجب|Beta-plus decay|p → n + e⁺ + νₑ||||بروتون يتحول لنيوترون.|A proton becomes a neutron.
اضمحلال غاما|Gamma decay|X* → X + γ||||النواة تتخلص من طاقة زائدة.|A nucleus sheds extra energy.
انشطار اليورانيوم|Uranium fission|²³⁵U + n → ¹⁴¹Ba + ⁹²Kr + 3n + ≈200 MeV||||أساس المفاعلات النووية.|The basis of nuclear reactors.
اندماج الهيدروجين|Deuterium–tritium fusion|²H + ³H → ⁴He + n + 17.6 MeV||||مصدر طاقة الشمس والنجوم.|What powers the Sun and stars.
سلسلة بروتون-بروتون|Proton–proton chain|4 ¹H → ⁴He + 2e⁺ + 2ν + 26.7 MeV||||كيف تحرق الشمس الهيدروجين.|How the Sun burns hydrogen.
طاقة الربط لكل نيوكليون|Binding energy per nucleon|E_b / A|MeV|Eb/Anuc|Eb Anuc|الحديد-56 الأكثر استقرارًا (≈8.8 MeV).|Iron-56 is most stable (≈8.8 MeV).
الجرعة الإشعاعية الممتصة|Absorbed dose|D = E / m|res|E/m|E m|بوحدة الغراي (J/kg).|In grays (J/kg).
التوهين في المادة|Attenuation of radiation|I = I₀ e^(−μx)|Il|I0l*exp(-0.5*xd*100)|I0l xd|μ = 0.5 /cm مثال للرصاص وأشعة غاما.|μ = 0.5 /cm example for lead and gamma rays.
سمك نصف القيمة|Half-value thickness|x½ = ln 2 / μ|xd|log(2)/0.5/100||السمك الذي يقلل الإشعاع للنصف.|Thickness that halves the radiation.
طاقة التفاعل (قيمة Q)|Reaction Q-value|Q = (m_initial − m_final) c²|E|amu*931.5|amu|موجبة = تطلق طاقة.|Positive means energy is released.
الطاقة من كتلة صغيرة|Energy in 1 gram|E = 0.001 × c²|E|0.001*cl*cl|cl|غرام واحد ≈ 9 × 10¹³ J!|One gram ≈ 9 × 10¹³ J!
`);

EQ.add('rel',`
معامل لورنتز|Lorentz factor|γ = 1 / √(1 − v²/c²)|gam|1/sqrt(1-vrel2*vrel2/(cl*cl))|vrel2 cl|يزيد بسرعة قرب سرعة الضوء.|Grows sharply near light speed.
تمدد الزمن|Time dilation|t = γ t₀|t|t0/sqrt(1-vrel2*vrel2/(cl*cl))|t0 vrel2 cl|الساعات المتحركة تبطئ.|Moving clocks run slow.
انكماش الطول|Length contraction|L = L₀ / γ|len|L0*sqrt(1-vrel2*vrel2/(cl*cl))|L0 vrel2 cl|الأجسام المتحركة تنكمش في اتجاه الحركة.|Moving objects shrink along their motion.
الزخم النسبي|Relativistic momentum|p = γ m v|prel|m*vrel2/sqrt(1-vrel2*vrel2/(cl*cl))|m vrel2 cl|يقترب من اللانهاية عند سرعة الضوء.|Approaches infinity at light speed.
الطاقة الكلية النسبية|Total relativistic energy|E = γ m c²|Erel|m*cl*cl/sqrt(1-vrel2*vrel2/(cl*cl))|m cl vrel2|طاقة السكون + الحركة.|Rest plus kinetic energy.
طاقة السكون|Rest energy|E₀ = m c²|E0r|m*cl*cl|m cl|طاقة الجسم وهو ساكن.|Energy of a body at rest.
طاقة الحركة النسبية|Relativistic kinetic energy|K = (γ − 1) m c²|Ek|(1/sqrt(1-vrel2*vrel2/(cl*cl))-1)*m*cl*cl|vrel2 cl m|تختلف عن ½mv² عند السرعات العالية.|Differs from ½mv² at high speeds.
علاقة الطاقة والزخم|Energy–momentum relation|E² = (pc)² + (mc²)²|Erel|sqrt(pow(prel*cl,2)+pow(m*cl*cl,2))|prel cl m|تشمل الجسيمات عديمة الكتلة.|Includes massless particles.
جمع السرعات النسبي|Relativistic velocity addition|u = (u′ + v)/(1 + u′v/c²)|v|(uvel+vfr)/(1+uvel*vfr/(cl*cl))|uvel vfr cl|لا شيء يتجاوز سرعة الضوء.|Nothing exceeds light speed.
تحويل لورنتز للموقع|Lorentz transformation (x)|x′ = γ(x − v t)|x|(x-vfr*t)/sqrt(1-vfr*vfr/(cl*cl))|x vfr t cl|ربط إحداثيات إطارين.|Linking two frames’ coordinates.
تحويل لورنتز للزمن|Lorentz transformation (t)|t′ = γ(t − v x / c²)|t|(t-vfr*x/(cl*cl))/sqrt(1-vfr*vfr/(cl*cl))|t vfr x cl|التزامن نسبي.|Simultaneity is relative.
دوبلر النسبي|Relativistic Doppler shift|f′ = f √((1 − β)/(1 + β))|fo|fph*sqrt((1-vrel2/cl)/(1+vrel2/cl))|fph vrel2 cl|لمصدر يبتعد.|For a receding source.
فترة الزمكان|Spacetime interval|s² = (ct)² − x²|res|pow(cl*t,2)-x*x|cl t x|نفسها لكل المراقبين.|The same for all observers.
تمدد الزمن الجاذبي|Gravitational time dilation|t₀ = t √(1 − 2GM/(rc²))|t0|t*sqrt(1-2*G*Mp/(rr*cl*cl))|t G Mp rr cl|الزمن أبطأ قرب الكتل الكبيرة (مهم لـ GPS).|Time is slower near big masses (matters for GPS).
الانزياح الأحمر الجاذبي|Gravitational redshift|z ≈ G M / (r c²)|z|G*Mp/(rr*cl*cl)|G Mp rr cl|الضوء يفقد طاقة وهو يصعد.|Light loses energy climbing out.
انحراف الضوء قرب الشمس|Light bending by the Sun|θ = 4 G M / (b c²)|radn|4*G*Msun/(Rstar*cl*cl)|G Msun Rstar cl|≈ 1.75 ثانية قوسية؛ أثبت النسبية العامة.|≈ 1.75 arcseconds; confirmed general relativity.
معادلات أينشتاين للمجال|Einstein field equations|G_μν + Λ g_μν = (8πG / c⁴) T_μν||||المادة تحني الزمكان.|Matter curves spacetime.
`);

EQ.add('ast',`
قانون هابل|Hubble’s law|v = H₀ d|vrec|H0*Dpc|H0 Dpc|المجرات الأبعد تبتعد أسرع.|Farther galaxies recede faster.
عمر الكون التقريبي|Age of the universe (estimate)|t ≈ 1 / H₀|t|977.8/H0|H0|بمليارات السنين (≈14 لـ H₀ = 70).|In billions of years (≈14 for H₀ = 70).
الانزياح نحو الأحمر|Redshift|z = (λ_obs − λ_emit) / λ_emit|z|(lobs-lemit)/lemit|lobs lemit|مقدار امتداد الضوء.|How much light is stretched.
السرعة من الانزياح|Velocity from redshift|v ≈ z c|vrec|z*299792|z|للسرعات الصغيرة (km/s).|For small speeds (km/s).
المسافة بالفرسخ من اختلاف المنظر|Distance from parallax|d = 1 / p|dpc|1/par|par|p بالثواني القوسية.|p in arcseconds.
معامل المسافة|Distance modulus|m − M = 5 log₁₀(d / 10 pc)|mag_ap|mag_ab+5*log10(dpc/10)|mag_ab dpc|بين اللمعان الظاهري والحقيقي.|Apparent versus true brightness.
فرق القدر واللمعان|Magnitude and brightness|F₁/F₂ = 100^((m₂ − m₁)/5)|res|pow(100,(mag_ap-mag_ab)/5)|mag_ap mag_ab|فرق 5 أقدار = 100 مرة.|5 magnitudes is 100×.
ضيائية النجم|Stellar luminosity|L = 4π R² σ T⁴|Lum|4*PI*Rstar*Rstar*sig*pow(Tstar,4)|Rstar sig Tstar|الشمس ≈ 3.8 × 10²⁶ W.|The Sun ≈ 3.8 × 10²⁶ W.
التدفق المرصود|Observed flux|F = L / (4π d²)|Fl|Lum/(4*PI*aSemi*aSemi)|Lum aSemi|الثابت الشمسي عند الأرض ≈ 1361 W/m².|Solar constant at Earth ≈ 1361 W/m².
درجة حرارة النجم من اللون|Star temperature from colour|T = b / λ_max|Tstar|Wien/lmax|Wien lmax|قانون فين للنجوم.|Wien’s law for stars.
عمر النجم التقريبي|Stellar lifetime (estimate)|t ≈ 10¹⁰ سنوات × (M/M☉)^(−2.5)|t|1e10*pow(Msun/1.989e30,-2.5)|Msun|النجوم الكبيرة تعيش أقل.|Massive stars die young.
علاقة الكتلة واللمعان|Mass–luminosity relation|L/L☉ ≈ (M/M☉)^3.5|res|pow(Msun/1.989e30,3.5)|Msun|لنجوم التسلسل الرئيسي.|For main-sequence stars.
حد شاندراسيخار|Chandrasekhar limit|M ≈ 1.4 M☉||||أكبر كتلة لقزم أبيض.|Largest mass of a white dwarf.
حرارة الثقب الأسود (هوكينغ)|Hawking temperature|T = ħ c³ / (8π G M k_B)|Tk|hP/(2*PI)*pow(cl,3)/(8*PI*G*Msun*kB)|hP cl G Msun kB|الثقوب السوداء تشع ببطء شديد.|Black holes glow very faintly.
السنة الضوئية|Light-year|1 ly = c × 1 سنة|d|cl*3.156e7*nn|cl nn|≈ 9.46 × 10¹⁵ m.|≈ 9.46 × 10¹⁵ m.
الوحدة الفلكية والفرسخ|Parsec in light-years|1 pc ≈ 3.26 ly|res|dpc*3.26|dpc|تحويل المسافات.|Distance conversion.
الكثافة الحرجة للكون|Critical density|ρ_c = 3H² / (8πG)|rho|3*pow(H0*1000/3.086e22,2)/(8*PI*G)|H0 G|الكثافة التي تجعل الكون مسطحًا.|Density for a flat universe.
معادلة فريدمان|Friedmann equation|H² = (8πG/3)ρ − k c²/a² + Λc²/3||||تصف تمدد الكون.|Describes cosmic expansion.
معادلة دريك|Drake equation|N = R* fₚ nₑ fₗ fᵢ f_c L|res|1.5*1*0.2*0.1*0.01*0.1*10000||تقدير عدد الحضارات (قيم افتراضية تعليمية).|Estimating civilisations (illustrative values).
درجة حرارة الكوكب التوازنية|Planet equilibrium temperature|T = T☉ √(R☉/2a) (1 − A)^(1/4)|Tk|Tstar*sqrt(Rstar/(2*aSemi))*pow(1-0.3,0.25)|Tstar Rstar aSemi|الأرض ≈ 255 K (البيدو 0.3).|Earth ≈ 255 K (albedo 0.3).
الزمن الدوري للمذنب|Comet period (Kepler)|T (سنة) = a^(3/2) (وحدة فلكية)|T|pow(aSemi/1.496e11,1.5)|aSemi|مذنب هالي a ≈ 17.8 AU.|Halley’s comet a ≈ 17.8 AU.
السرعة المدارية للأرض|Earth’s orbital speed|v = 2π a / T|v|2*PI*aSemi/3.156e7|aSemi|≈ 30 km/s.|≈ 30 km/s.
حجم الزاوية|Angular size|θ = D / d|radn|Rstar*2/aSemi|Rstar aSemi|الشمس والقمر ≈ نصف درجة.|Sun and Moon ≈ half a degree.
المد والجزر من القمر|Lunar tidal acceleration|a ≈ 2 G M R / d³|a|2*G*7.35e22*6.371e6/pow(3.84e8,3)|G|≈ 1.1 × 10⁻⁶ m/s².|≈ 1.1 × 10⁻⁶ m/s².
`);
