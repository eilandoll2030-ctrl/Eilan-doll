/* موسوعة معادلات إيلان — الأحياء والطب وعلوم الأرض */
EQ.syms(`
Np|N|حجم المجتمع|population size||100
N0p|N₀|الحجم الابتدائي|initial population||50
rg|r|معدل النمو|growth rate|1/time|0.3
Kcap|K|السعة الحاملة|carrying capacity||1000
Bth|B|المواليد|births||40
Dth|D|الوفيات|deaths||25
pA|p|تكرار الأليل السائد|dominant allele frequency||0.7
qA|q|تكرار الأليل المتنحي|recessive allele frequency||0.3
massKg|m|الكتلة|body mass|kg|70
hgt|h|الطول|height|m|1.75
hcm|h|الطول|height|cm|175
age|age|العمر|age|years|30
HR|HR|معدل النبض|heart rate|bpm|70
SVml|SV|حجم الضربة|stroke volume|mL|70
SBP|SBP|الضغط الانقباضي|systolic pressure|mmHg|120
DBP|DBP|الضغط الانبساطي|diastolic pressure|mmHg|80
Vmax|V_max|السرعة القصوى للإنزيم|maximum enzyme rate||100
Km|K_m|ثابت ميكايليس|Michaelis constant|mM|2
Sconc|[S]|تركيز المادة الخاضعة|substrate concentration|mM|5
Cdose|C|تركيز الدواء|drug concentration|mg/L|10
C0d|C₀|التركيز الابتدائي|initial concentration|mg/L|20
kel|k|ثابت الإطراح|elimination constant|1/h|0.2
Dose|D|الجرعة|dose|mg|500
Vd|V_d|حجم التوزيع|volume of distribution|L|50
Cr|Cr|الكرياتينين|serum creatinine|mg/dL|1
Mag|M|قدر الزلزال|earthquake magnitude||6
Amp|A|سعة الموجة الزلزالية|seismic amplitude|µm|1000
Tsea|T|درجة الحرارة|temperature|°C|25
RH|RH|الرطوبة النسبية|relative humidity|%|50
hAlt2|h|الارتفاع|altitude|m|1000
dP2|ΔP|فرق الضغط|pressure gradient|Pa|100
Ks|K|الموصلية الهيدروليكية|hydraulic conductivity|m/s|1e-4
grad|i|الميل الهيدروليكي|hydraulic gradient||0.01
alb|α|البيدو (الانعكاسية)|albedo||0.3
S0|S|الثابت الشمسي|solar constant|W/m²|1361
CO2r|C/C₀|نسبة CO₂|CO₂ ratio||2
`);

EQ.add('bio',`
النمو الأسي للمجتمع|Exponential population growth|N = N₀ e^(rt)|Np|N0p*exp(rg*t)|N0p rg t|بدون حدود (بكتيريا في البداية).|Unlimited (early bacteria).
النمو اللوجستي|Logistic growth|dN/dt = r N (1 − N/K)|res|rg*Np*(1-Np/Kcap)|rg Np Kcap|يتباطأ قرب السعة الحاملة.|Slows near carrying capacity.
حل المعادلة اللوجستية|Logistic solution|N = K / (1 + ((K − N₀)/N₀) e^(−rt))|Np|Kcap/(1+((Kcap-N0p)/N0p)*exp(-rg*t))|Kcap N0p rg t|منحنى S.|An S-curve.
معدل النمو الصافي|Net growth rate|r = (B − D) / N|rg|(Bth-Dth)/Np|Bth Dth Np|المواليد ناقص الوفيات.|Births minus deaths.
زمن تضاعف البكتيريا|Bacterial doubling|N = N₀ × 2^(t/g)|Np|N0p*pow(2,t/0.33)|N0p t|زمن جيل 20 دقيقة (0.33 ساعة).|20-minute generation time (0.33 h).
توازن هاردي-واينبرغ|Hardy–Weinberg equilibrium|p² + 2pq + q² = 1|res|pA*pA+2*pA*qA+qA*qA|pA qA|تكرارات الطرز الجينية ثابتة.|Genotype frequencies stay constant.
تكرارات الأليلات|Allele frequencies|p + q = 1|qA|1-pA|pA|مجموع الأليلين.|The two alleles sum to 1.
نسبة الحاملين للصفة|Carrier frequency|2pq|res|2*pA*qA|pA qA|الطراز غير المتماثل.|Heterozygotes.
نسبة الصفة المتنحية|Recessive phenotype frequency|q²|res|qA*qA|qA|تظهر الصفة المتنحية.|Shows the recessive trait.
نسبة مندل (3:1)|Mendel’s monohybrid ratio|Aa × Aa ⇒ 3 سائد : 1 متنحٍ||||قوانين الوراثة.|Laws of inheritance.
نسبة مندل (9:3:3:1)|Mendel’s dihybrid ratio|AaBb × AaBb ⇒ 9:3:3:1||||صفتان معًا.|Two traits together.
معادلة ميكايليس-منتن|Michaelis–Menten kinetics|v = V_max [S] / (K_m + [S])|res|Vmax*Sconc/(Km+Sconc)|Vmax Sconc Km|سرعة عمل الإنزيم.|How fast an enzyme works.
لاينويفر-بيرك|Lineweaver–Burk equation|1/v = (K_m/V_max)(1/[S]) + 1/V_max|res|(Km/Vmax)/Sconc+1/Vmax|Km Vmax Sconc|خط مستقيم للإنزيمات.|A straight line for enzymes.
البناء الضوئي (معادلة)|Photosynthesis equation|6CO₂ + 6H₂O + ضوء → C₆H₁₂O₆ + 6O₂||||في البلاستيدات الخضراء.|In chloroplasts.
التنفس الخلوي (معادلة)|Cellular respiration equation|C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ≈30 ATP||||في الميتوكوندريا.|In mitochondria.
نسبة السطح للحجم|Surface-area-to-volume ratio|SA:V = 3 / r|res|3/rd|rd|الخلايا الصغيرة تتبادل أسرع.|Small cells exchange faster.
التكبير في المجهر|Microscope magnification|التكبير = حجم الصورة / الحجم الحقيقي|res|50/0.01||50 mm صورة لخلية 0.01 mm.|A 50 mm image of a 0.01 mm cell.
مؤشر التنوع (سيمبسون)|Simpson’s diversity index|D = 1 − Σ(n/N)²|res|1-(0.5*0.5+0.3*0.3+0.2*0.2)||ثلاثة أنواع بنسب 50/30/20%.|Three species at 50/30/20%.
طريقة الصيد وإعادة الصيد|Mark–recapture (Lincoln–Petersen)|N = (M × C) / R|Np|40*50/8||40 موسومًا، 50 صيدًا ثانيًا، 8 منها موسومة.|40 marked, 50 recaptured, 8 marked.
كفاءة نقل الطاقة|Ecological efficiency|≈ 10% بين كل مستوى غذائي|res|10000*0.1*0.1||10000 kJ نباتات ⇒ 100 kJ للمستوى الثالث.|10000 kJ of plants ⇒ 100 kJ at level three.
الجهد المائي|Water potential|Ψ = Ψₛ + Ψₚ|res|-0.5+0.3||الماء ينتقل من الأعلى للأدنى.|Water moves from high to low.
الجهد الأسموزي للمحلول|Solute potential|Ψₛ = −i C R T|res|-1*0.1*0.0831*298||بالميغاباسكال تقريبًا (MPa).|Roughly in MPa.
معادلة غولدمان-نيرنست للأيون|Nernst potential of an ion|E = (61/z) log([out]/[in])|res|61*log10(5/140)||جهد البوتاسيوم ≈ −88 mV.|Potassium ≈ −88 mV.
معدل الأيض الأساسي (كلايبر)|Kleiber’s law|BMR ∝ M^(3/4)|res|70*pow(massKg,0.75)|massKg|بالسعرات يوميًا تقريبًا.|Roughly kcal per day.
عمر النصف البيولوجي|Biological half-life|t½ = 0.693 / k|thalf|0.693/kel|kel|زمن خروج نصف المادة من الجسم.|Time for the body to clear half.
`);

EQ.add('med',`
مؤشر كتلة الجسم|Body mass index (BMI)|BMI = m / h²|res|massKg/(hgt*hgt)|massKg hgt|مؤشر عام وليس تشخيصًا.|A general indicator, not a diagnosis.
النتاج القلبي|Cardiac output|CO = HR × SV|res|HR*SVml/1000|HR SVml|لتر في الدقيقة.|Litres per minute.
متوسط الضغط الشرياني|Mean arterial pressure|MAP = DBP + (SBP − DBP)/3|res|DBP+(SBP-DBP)/3|DBP SBP|متوسط ضغط تروية الأعضاء.|Average organ perfusion pressure.
ضغط النبض|Pulse pressure|PP = SBP − DBP|res|SBP-DBP|SBP DBP|الفرق بين الضغطين.|The gap between the two pressures.
أقصى معدل نبض (تقديري)|Estimated maximum heart rate|HRmax ≈ 220 − العمر|res|220-age|age|تقدير عام يختلف بين الأشخاص.|A rough estimate; varies between people.
النبض المستهدف (كارفونن)|Target heart rate (Karvonen)|THR = (HRmax − HRrest) × % + HRrest|res|(220-age-HR)*0.7+HR|age HR|شدة 70% مثال.|70% intensity example.
مساحة سطح الجسم (موستيلر)|Body surface area (Mosteller)|BSA = √(h(cm) × m / 3600)|res|sqrt(hcm*massKg/3600)|hcm massKg|بالمتر المربع.|In square metres.
تركيز الدواء مع الزمن|Drug concentration over time|C = C₀ e^(−kt)|Cdose|C0d*exp(-kel*t)|C0d kel t|اضمحلال أسي.|Exponential decay.
عمر نصف الدواء|Drug half-life|t½ = 0.693 / k|thalf|0.693/kel|kel|بعد 5 أعمار نصف يخرج ≈97%.|After 5 half-lives ≈97% is gone.
حجم التوزيع|Volume of distribution|V_d = الجرعة / C₀|Vd|Dose/C0d|Dose C0d|أين ينتشر الدواء.|Where a drug spreads.
التصفية|Clearance|CL = k × V_d|res|kel*Vd|kel Vd|حجم الدم المنظَّف في الساعة.|Blood volume cleared per hour.
جرعة التحميل|Loading dose|LD = C_target × V_d|Dose|Cdose*Vd|Cdose Vd|للوصول السريع للتركيز.|To reach the target quickly.
التركيز بعد جرعة|Concentration after a dose|C₀ = D / V_d|C0d|Dose/Vd|Dose Vd|التركيز الابتدائي.|The starting concentration.
معدل التسريب الوريدي|IV drip rate|قطرة/دقيقة = الحجم × معامل القطرات / الزمن|res|1000*20/(8*60)||لتر خلال 8 ساعات بمعامل 20.|1 L over 8 h with a factor of 20.
معادلة فيك|Fick principle|CO = VO₂ / (CaO₂ − CvO₂)|res|250/(200-150)||قياس النتاج القلبي.|Measuring cardiac output.
قانون بوازوي للدم|Poiseuille’s law for blood flow|Q ∝ r⁴|res|pow(2,4)||مضاعفة قطر الوعاء = تدفق 16 ضعف.|Doubling vessel radius gives 16× flow.
الاحتياج المائي اليومي (تقريبي)|Daily water need (rough)|≈ 35 mL × الكتلة (kg)|res|35*massKg/1000|massKg|باللتر، ويختلف حسب النشاط والجو.|In litres; varies with activity and climate.
معادلة هاريس-بنديكت (رجال)|Harris–Benedict (men)|BMR = 88.36 + 13.4m + 4.8h − 5.7A|res|88.36+13.4*massKg+4.8*hcm-5.7*age|massKg hcm age|سعرات الراحة اليومية.|Resting calories per day.
معادلة ميفلين-سانت جيور|Mifflin–St Jeor|BMR = 10m + 6.25h − 5A + s|res|10*massKg+6.25*hcm-5*age+5|massKg hcm age|s = +5 للرجال و −161 للنساء.|s = +5 men, −161 women.
تصفية الكرياتينين (كوكروفت-غولت)|Creatinine clearance (Cockcroft–Gault)|CrCl = (140 − العمر) × m / (72 × Cr)|res|(140-age)*massKg/(72*Cr)|age massKg Cr|تقدير وظيفة الكلى.|Estimating kidney function.
الحساسية|Sensitivity|Sens = TP / (TP + FN)|res|90/(90+10)||قدرة الاختبار على كشف المرض.|How well a test finds disease.
النوعية|Specificity|Spec = TN / (TN + FP)|res|85/(85+15)||قدرة الاختبار على استبعاد غير المرضى.|How well a test rules disease out.
القيمة التنبؤية الإيجابية|Positive predictive value|PPV = TP / (TP + FP)|res|90/(90+15)||احتمال المرض عند نتيجة موجبة.|Chance of disease given a positive test.
عدد الحالات اللازمة للعلاج|Number needed to treat|NNT = 1 / ARR|res|1/0.05||انخفاض الخطر المطلق 5%.|5% absolute risk reduction.
الرقم التكاثري الأساسي|Basic reproduction number|R₀ = β / γ|res|0.3/0.1||أكبر من 1 = الوباء ينتشر.|Above 1, an outbreak grows.
عتبة المناعة الجماعية|Herd immunity threshold|1 − 1/R₀|res|(1-1/3)*100||نسبة المناعة اللازمة (R₀ = 3).|Immunity needed (R₀ = 3).
`);

EQ.add('ear',`
مقياس ريختر|Richter magnitude|M = log₁₀(A / A₀)|res|log10(Amp)|Amp|كل درجة = سعة أكبر 10 مرات.|Each step is 10× the amplitude.
طاقة الزلزال|Earthquake energy|log₁₀ E = 4.8 + 1.5 M|E|pow(10,4.8+1.5*Mag)|Mag|بالجول.|In joules.
مسافة مركز الزلزال|Distance to an epicentre|d ≈ 8 × (t_S − t_P)|d|8*t|t|بالكيلومتر.|In kilometres.
نقطة الندى (تقريب)|Dew point (approx.)|T_d ≈ T − (100 − RH)/5|res|Tsea-(100-RH)/5|Tsea RH|للرطوبة فوق 50%.|For humidity above 50%.
الضغط مع الارتفاع|Pressure with altitude|P = P₀ e^(−h/8400)|res|101.325*exp(-hAlt2/8400)|hAlt2|بالكيلوباسكال.|In kilopascals.
انخفاض الحرارة مع الارتفاع|Lapse rate|T = T₀ − 6.5 × h(km)|res|Tsea-6.5*hAlt2/1000|Tsea hAlt2|في طبقة التروبوسفير.|In the troposphere.
قانون دارسي|Darcy’s law|Q = K A i|res|Ks*Ar*grad|Ks Ar grad|تدفق المياه الجوفية.|Groundwater flow.
درجة حرارة الأرض الإشعاعية|Earth’s radiative temperature|T = (S(1 − α)/(4σ))^(1/4)|Tk|pow(S0*(1-alb)/(4*5.67e-8),0.25)|S0 alb|≈ 255 K بدون غلاف جوي.|≈ 255 K without an atmosphere.
التأثير الإشعاعي لـ CO₂|CO₂ radiative forcing|ΔF = 5.35 ln(C/C₀)|res|5.35*log(CO2r)|CO2r|مضاعفة CO₂ ⇒ ≈ 3.7 W/m².|Doubling CO₂ ⇒ ≈ 3.7 W/m².
الطاقة الشمسية على لوح|Solar panel output|P = S × A × η|P|1000*Ar*0.2|Ar|إشعاع 1000 W/m² وكفاءة 20%.|1000 W/m² sunlight, 20% efficiency.
طاقة الرياح|Wind power|P = ½ ρ A v³ Cₚ|P|0.5*1.225*Ar*pow(v,3)*0.4|Ar v|تضاعف السرعة = طاقة 8 أضعاف.|Double the wind, eight times the power.
طاقة السدود|Hydroelectric power|P = η ρ g Q h|P|0.9*1000*9.8*Q*hd|Q hd|ماء يسقط من ارتفاع.|Water falling from a height.
البصمة الكربونية للوقود|Carbon from fuel|CO₂ = لتر بنزين × 2.31 kg|res|nn*2.31|nn|كل لتر بنزين ≈ 2.31 kg CO₂.|Each litre of petrol ≈ 2.31 kg CO₂.
مؤشر الحرارة|Heat index (simplified)|HI ≈ T + 0.33 e − 4|res|Tsea+0.33*RH*0.06112*exp(17.67*Tsea/(Tsea+243.5))*10/10-4|Tsea RH|كم يحس الجسم بالحر.|How hot it feels.
سرعة الصوت في الهواء والبرق|Distance to lightning|d ≈ 343 × t|d|343*t|t|عدّ الثواني بين البرق والرعد.|Count seconds between flash and thunder.
عمر الصخور بالتأريخ الإشعاعي|Radiometric age|t = (1/λ) ln(1 + D/P)|t|log(1+1)/lamd|lamd|نسبة الابنة للأم = 1.|Daughter-to-parent ratio = 1.
قوة كوريوليس|Coriolis parameter|f = 2Ω sin φ|res|2*7.292e-5*sin(rad(ang))|ang|دوران الأعاصير.|Why storms spin.
سرعة الإفلات من الأرض|Earth escape speed|v = √(2gR)|v|sqrt(2*9.8*6.371e6)||≈ 11.2 km/s.|≈ 11.2 km/s.
ارتفاع الأفق|Distance to the horizon|d ≈ 3.57 √h|res|3.57*sqrt(hAlt2)|hAlt2|بالكيلومتر لـ h بالمتر.|km for h in metres.
كثافة السكان|Population density|الكثافة = السكان / المساحة|res|Np/Ar|Np Ar|شخص لكل كيلومتر مربع.|People per square kilometre.
المعدل السنوي لنمو السكان|Annual population growth|r = ln(N/N₀) / t|rg|log(Np/N0p)/t|Np N0p t|معدل النمو المستمر.|Continuous growth rate.
`);
