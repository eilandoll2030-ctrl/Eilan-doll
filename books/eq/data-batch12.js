/* موسوعة معادلات إيلان — الإلكترونيات العملية، ميكانيكا الكم المتقدمة، التلوث والبيئة، الخياطة والنسيج */
EQ.syms(`
# ---- practical electronics
Vsup|V_s|جهد المصدر|supply voltage|V|5
duty|D|نسبة التشغيل|duty cycle|%|50
Vavg|V_avg|متوسط الجهد|average voltage|V|2.5
ton|t_on|زمن التشغيل|on time|ms|1
tper|T|الدورة|period|ms|2
Vz|V_z|جهد الزينر|Zener voltage|V|3.3
Iz|I|تيار الحمل والزينر|load + Zener current|mA|20
Rz|R|مقاومة التوالي|series resistor|Ω|85
Iact|I_act|تيار التشغيل|active current|mA|50
Isl|I_sleep|تيار النوم|sleep current|mA|0.05
dact|d|نسبة وقت التشغيل|active fraction|%|2
Iavg|I_avg|متوسط التيار|average current|mA|1.05
capmah|C|سعة البطارية|battery capacity|mAh|2000
lifeh|t|عمر البطارية|battery life|h|1905
R1o|R₁|المقاومة الأولى|resistor 1|kΩ|10
R2o|R₂|المقاومة الثانية|resistor 2|kΩ|10
Rfo|R_f|مقاومة التغذية|feedback resistor|kΩ|10
V1o|V₁|الجهد الأول|input 1|V|1
V2o|V₂|الجهد الثاني|input 2|V|2
Vouto|V_out|جهد الخرج|output voltage|V|-3
Rbase|R_B|مقاومة القاعدة|base resistor|kΩ|4.3
Ic_|I_C|تيار المجمع|collector current|mA|100
hfe|β|كسب التيار|current gain||100
Vbe2|V_BE|جهد القاعدة-الباعث|base–emitter voltage|V|0.7
awg|n|رقم السلك AWG|AWG gauge||18
dawg|d|قطر السلك|wire diameter|mm|1.02
Tamb|T_a|حرارة المحيط|ambient temperature|°C|25
Pdis|P|القدرة المبددة|power dissipated|W|5
thja|θ|المقاومة الحرارية|thermal resistance|°C/W|10
Tj|T_j|حرارة الوصلة|junction temperature|°C|75
Iload|I|تيار الحمل|load current|A|1
fripp|f|تردد التموج|ripple frequency|Hz|100
Cfil|C|مكثف الترشيح|filter capacitor|μF|4700
Vrip|V_r|جهد التموج|ripple voltage|V|2.13
# ---- advanced quantum
Vbar|V|ارتفاع الحاجز|barrier height|eV|5
Epart|E|طاقة الجسيم|particle energy|eV|3
Lbar|L|عرض الحاجز|barrier width|nm|0.5
Ttun|T|احتمال النفاذ|tunnelling probability|%|0.07
nqh|n|العدد الكمي|quantum number||1
omq|ω|التردد الزاوي|angular frequency|rad/s|1e14
Eqho|E|الطاقة|energy|eV|0.099
nshell|n|رقم المستوى|shell number||3
nelec|N|عدد الإلكترونات|electrons||18
lq|l|العدد الكمي الثانوي|azimuthal number||2
norb|N|عدد المدارات|number of orbitals||5
Tth|T|درجة الحرارة|temperature|K|300
mthm|m|الكتلة|mass|u|4
lamth|λ|طول الموجة الحراري|thermal wavelength|pm|50.3
# ---- pollution & environment
ppm_|ppm|التركيز|concentration|ppm|1
Mgas|M|الكتلة المولية للغاز|gas molar mass|g/mol|64
mgm3|C|التركيز|concentration|mg/m³|2.62
Q1r|Q₁|تدفق النهر|river flow|m³/s|10
C1r|C₁|تركيز النهر|river concentration|mg/L|1
Q2r|Q₂|تدفق الصرف|discharge flow|m³/s|1
C2r|C₂|تركيز الصرف|discharge concentration|mg/L|30
Cmix|C|التركيز بعد الخلط|mixed concentration|mg/L|3.6
mgas|m|كتلة الغاز|mass of gas|t|1
gwp|GWP|قدرة الاحترار|global-warming potential||28
co2e|CO₂e|المكافئ الكربوني|CO₂ equivalent|t|28
bod0|L₀|الطلب الأقصى على الأكسجين|ultimate BOD|mg/L|20
kbod|k|ثابت التحلل|decay constant|1/day|0.23
tbod|t|الأيام|days|days|5
bodt|BOD_t|الطلب على الأكسجين|BOD exerted|mg/L|13.7
cbud|B|ميزانية الكربون المتبقية|remaining carbon budget|Gt CO₂|250
cyear|E|الانبعاثات السنوية|annual emissions|Gt CO₂/yr|40
yrsleft|t|السنوات المتبقية|years left|years|6.25
# ---- textiles & sewing
gsm|GSM|غرام لكل متر مربع|grams per square metre|g/m²|200
fmass|m|كتلة القماش|fabric mass|g|50
farea|A|مساحة القماش|fabric area|m²|0.25
Lb|L_before|الطول قبل الغسيل|length before washing|cm|100
La|L_after|الطول بعد الغسيل|length after washing|cm|97
shrink|%|الانكماش|shrinkage|%|3
ymass|m|كتلة الخيط|yarn mass|g|5
ylen|L|طول الخيط|yarn length|m|250
tex|tex|التكس|tex||20
den|den|الدنير|denier||180
warp|warp|خيوط الطول في الإنش|warp threads per inch||150
weft|weft|خيوط العرض في الإنش|weft threads per inch||150
tcount|TC|عدد الخيوط|thread count||300
pieceL|L|طول القطعة|piece length|cm|70
npiece|n|عدد القطع|number of pieces||4
fabW|W|عرض القماش|fabric width|cm|150
pieceW|w|عرض القطعة|piece width|cm|50
fabL|L|القماش المطلوب|fabric needed|m|1.4
`);

EQ.add('elx',`
متوسط الجهد بتعديل عرض النبضة|Average voltage with PWM|V_avg = V_s × D / 100|Vavg|Vsup*duty/100|Vsup duty|هكذا تتحكم بسطوع اللمبة وسرعة المحرك.|How you dim LEDs and control motor speed.
نسبة التشغيل|Duty cycle|D = t_on / T × 100|duty|ton/tper*100|ton tper|كم من الوقت الإشارة شغالة.|How much of the time the signal is on.
مقاومة منظم الزينر|Zener regulator resistor|R = (V_s − V_z) / I|Rz|(Vsup-Vz)/(Iz/1000)|Vsup Vz Iz|تحمي الدائرة بجهد ثابت.|Protects a circuit with a steady voltage.
متوسط تيار جهاز ذكي|Average current of a smart device|I_avg = I_act d + I_sleep (1 − d)|Iavg|Iact*dact/100+Isl*(1-dact/100)|Iact dact Isl|الأجهزة تنام أغلب الوقت عشان توفّر.|Devices sleep most of the time to save power.
عمر البطارية|Battery life|t = C / I_avg|lifeh|capmah/Iavg|capmah Iavg|بالساعات.|In hours.
المضخم الجامع العاكس|Inverting summing amplifier|V_out = −R_f (V₁/R₁ + V₂/R₂)|Vouto|-Rfo*(V1o/R1o+V2o/R2o)|Rfo V1o R1o V2o R2o|مثل خلاط الصوت.|Like an audio mixer.
المضخم التفاضلي|Difference amplifier|V_out = (R_f / R₁)(V₂ − V₁)|Vouto|Rfo/R1o*(V2o-V1o)|Rfo R1o V1o V2o|يكبّر الفرق بين إشارتين.|Amplifies the difference between two signals.
مقاومة قاعدة الترانزستور كمفتاح|Transistor switch base resistor|R_B = (V_s − V_BE) β / (2 I_C)|Rbase|(Vsup-Vbe2)*hfe/(2*Ic_/1000)/1000|Vsup Vbe2 hfe Ic_|عامل أمان 2 يضمن التشغيل الكامل.|A safety factor of 2 makes sure it switches fully on.
قطر السلك من رقم AWG|Wire diameter from AWG|d = 0.127 × 92^((36 − n)/39)|dawg|0.127*pow(92,(36-awg)/39)|awg|الرقم الأكبر = سلك أرفع.|A bigger number means a thinner wire.
حرارة القطعة الإلكترونية|Component junction temperature|T_j = T_a + P θ|Tj|Tamb+Pdis*thja|Tamb Pdis thja|عشان تختار المشتت الحراري المناسب.|To pick the right heat sink.
جهد التموج بعد التقويم|Ripple voltage after rectification|V_r = I / (f C)|Vrip|Iload/(fripp*Cfil*1e-6)|Iload fripp Cfil|المكثف الأكبر يخلي الجهد أنعم.|A bigger capacitor gives smoother voltage.
`);

EQ.add('qnt',`
احتمال النفاذ النفقي|Quantum tunnelling probability|T ≈ e^(−2κL)، κ = √(2m(V − E))/ħ|Ttun|exp(-2*sqrt(2*9.109e-31*(Vbar-Epart)*1.602e-19)/1.0546e-34*Lbar*1e-9)*100|Vbar Epart Lbar|الإلكترون يعبر حاجز ما يقدر يتخطاه كلاسيكيًا!|The electron crosses a barrier it classically couldn’t!
مستويات المذبذب التوافقي الكمي|Quantum harmonic oscillator levels|E = (n + ½) ħ ω|Eqho|(nqh+0.5)*1.0546e-34*omq/1.602e-19|nqh omq|حتى في أقل طاقة ما يوقف تمامًا.|Even at its lowest energy it never stops completely.
سعة المستوى الإلكتروني|Electrons in a shell|N = 2n²|nelec|2*nshell*nshell|nshell|2، 8، 18، 32.|2, 8, 18, 32.
عدد المدارات في المستوى الفرعي|Orbitals in a subshell|N = 2l + 1|norb|2*lq+1|lq|s = 1، p = 3، d = 5، f = 7.|s = 1, p = 3, d = 5, f = 7.
طول الموجة الحراري لدي بروي|Thermal de Broglie wavelength|λ = h / √(2π m k T)|lamth|6.626e-34/sqrt(2*PI*mthm*1.6605e-27*1.381e-23*Tth)*1e12|mthm Tth|لما يصير بحجم المسافة بين الذرات تظهر الظواهر الكمية.|When it matches the spacing between atoms, quantum effects appear.
مبدأ باولي للاستبعاد|Pauli exclusion principle|ما فيه إلكترونين بنفس الأعداد الكمية الأربعة||||سبب ترتيب الجدول الدوري.|The reason the periodic table is arranged as it is.
قاعدة هوند|Hund’s rule|الإلكترونات تملأ المدارات منفردة أولًا||||مثل الركاب يختارون مقعد فاضي قبل ما يجلسون جنب أحد.|Like passengers taking empty seats before sitting next to someone.
التشابك الكمي|Quantum entanglement|‖ψ⟩ = (‖00⟩ + ‖11⟩)/√2||||قياس جسيم يحدد حالة الثاني فورًا.|Measuring one particle instantly fixes the other’s state.
الكيوبت|The qubit|‖ψ⟩ = α‖0⟩ + β‖1⟩ ، ‖α‖² + ‖β‖² = 1||||وحدة الحاسوب الكمي.|The unit of a quantum computer.
`);

EQ.add('pol',`
من ppm إلى ملغ لكل متر مكعب|ppm to mg/m³|C = ppm × M / 24.45|mgm3|ppm_*Mgas/24.45|ppm_ Mgas|للغازات عند 25 درجة.|For gases at 25 °C.
تركيز الملوث بعد الخلط في النهر|Pollutant after mixing in a river|C = (Q₁C₁ + Q₂C₂) / (Q₁ + Q₂)|Cmix|(Q1r*C1r+Q2r*C2r)/(Q1r+Q2r)|Q1r C1r Q2r C2r|الصرف يخف لما يختلط بالنهر.|Discharge dilutes as it mixes with the river.
المكافئ الكربوني|CO₂ equivalent|CO₂e = m × GWP|co2e|mgas*gwp|mgas gwp|طن ميثان ≈ 28 طن CO₂.|A tonne of methane ≈ 28 tonnes of CO₂.
الطلب الحيوي على الأكسجين|Biochemical oxygen demand|BOD_t = L₀ (1 − e^(−kt))|bodt|bod0*(1-exp(-kbod*tbod))|bod0 kbod tbod|يقيس تلوث الماء بالمواد العضوية.|Measures how polluted water is with organic matter.
كم سنة تكفي ميزانية الكربون|How long a carbon budget lasts|t = B / E|yrsleft|cbud/cyear|cbud cyear|ارجع للمصادر الرسمية لأحدث الأرقام.|Check official sources for the latest figures.
`);

EQ.add('tex',`
وزن القماش (GSM)|Fabric weight (GSM)|GSM = m / A|gsm|fmass/farea|fmass farea|التيشيرت الخفيف حوالي 150، والثقيل فوق 250.|A light T-shirt is about 150; a heavy one is over 250.
نسبة انكماش القماش|Fabric shrinkage|% = (L_before − L_after) / L_before × 100|shrink|(Lb-La)/Lb*100|Lb La|اغسل القماش قبل القص!|Wash the fabric before cutting!
نمرة الخيط بالتكس|Yarn count in tex|tex = m / L × 1000|tex|ymass/ylen*1000|ymass ylen|غرام لكل كيلومتر.|Grams per kilometre.
من التكس إلى الدنير|Tex to denier|den = 9 × tex|den|9*tex|tex|الدنير = غرام لكل 9 كيلومتر.|Denier is grams per 9 kilometres.
عدد الخيوط في الشراشف|Bed-sheet thread count|TC = warp + weft|tcount|warp+weft|warp weft|خيوط الطول + خيوط العرض في الإنش المربع.|Lengthwise plus crosswise threads per square inch.
القماش المطلوب للقطع|Fabric needed for pieces|L = ⌈n / ⌊W / w⌋⌉ × pieceL / 100|fabL|ceil(npiece/floor(fabW/pieceW))*pieceL/100|npiece fabW pieceW pieceL|كم متر تشتري للقطع اللي تبيها.|How many metres to buy for your pieces.
`);
