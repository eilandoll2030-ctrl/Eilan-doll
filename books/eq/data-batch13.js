/* موسوعة معادلات إيلان — الدراسة والدرجات، النفط والغاز، المياه والصرف، علم الأحياء الدقيقة */
EQ.syms(`
# ---- study & grades
g1|x₁|الدرجة الأولى|grade 1||90
w1|w₁|الوزن الأول|weight 1|%|40
g2|x₂|الدرجة الثانية|grade 2||80
w2|w₂|الوزن الثاني|weight 2|%|60
wavg|x̄_w|المعدل الموزون|weighted average||84
cur|now|درجتك الحالية|current grade|%|78
wfin|w|وزن الاختبار النهائي|final exam weight|%|40
want|target|الدرجة اللي تبيها|target grade|%|85
need|need|الدرجة المطلوبة في النهائي|score needed on the final|%|95.5
pts_|score|الدرجة|score||42
outof|max|الدرجة الكاملة|out of||50
pct_|%|النسبة|percentage|%|84
gp1|p₁|نقاط المادة الأولى|grade points 1||4.5
ch1|h₁|ساعات المادة الأولى|credit hours 1||3
gp2|p₂|نقاط المادة الثانية|grade points 2||4
ch2|h₂|ساعات المادة الثانية|credit hours 2||4
gp3|p₃|نقاط المادة الثالثة|grade points 3||5
ch3|h₃|ساعات المادة الثالثة|credit hours 3||2
gpa|GPA|المعدل الفصلي|term GPA||4.36
oldg|GPA₀|المعدل التراكمي السابق|previous cumulative GPA||4.1
oldh|H₀|الساعات السابقة|previous hours||60
newg|GPA_t|معدل الفصل|this term’s GPA||4.6
newh|H_t|ساعات الفصل|this term’s hours||15
cgpa|CGPA|المعدل التراكمي الجديد|new cumulative GPA||4.2
pages|P|عدد الصفحات|pages||120
ppd|r|صفحات في اليوم|pages per day||15
days_|d|الأيام|days||8
# ---- oil & gas
bbl|bbl|البراميل|barrels|bbl|1
litr|L|اللترات|litres|L|159
sg|SG|الكثافة النسبية|specific gravity||0.85
api|API|درجة API|API gravity|°|35
resv|R|الاحتياطي|reserves|bn bbl|260
prod|P|الإنتاج السنوي|annual production|bn bbl|3.65
rpy|R/P|سنوات الإنتاج المتبقية|reserves-to-production years|years|71
bpd|q|الإنتاج اليومي|daily production|million bbl/day|10
bpy|Q|الإنتاج السنوي|annual production|bn bbl|3.65
boe|BOE|براميل مكافئة|barrels of oil equivalent||1000
GJ|E|الطاقة|energy|GJ|6118
ooip|OOIP|النفط في المكمن|oil originally in place|million bbl|500
rf|RF|معامل الاستخلاص|recovery factor|%|35
recov|N_p|النفط المستخلص|recoverable oil|million bbl|175
gasm3|V|حجم الغاز|gas volume|m³|1e6
# ---- water & wastewater
pop_|P|عدد السكان|population||50000
lpcd|q|الاستهلاك اليومي للفرد|use per person per day|L/day|250
wdem|Q|الطلب اليومي|daily demand|m³/day|12500
Crun|C|معامل الجريان|runoff coefficient||0.7
irain|i|شدة المطر|rainfall intensity|mm/h|50
Acat|A|مساحة الحوض|catchment area|ha|10
Qpeak|Q|التدفق الأقصى|peak runoff|m³/s|0.97
Vtank|V|حجم الحوض|tank volume|m³|500
Qin|Q|التدفق|flow rate|m³/h|250
HRT|t|زمن البقاء|detention time|h|2
cl_d|C|جرعة الكلور|chlorine dose|mg/L|2
Qd|Q|تدفق الماء|water flow|m³/day|10000
clkg|m|الكلور اليومي|chlorine per day|kg/day|20
CaPPM|Ca²⁺|الكالسيوم|calcium|mg/L|60
MgPPM|Mg²⁺|المغنيسيوم|magnesium|mg/L|20
hard|H|عسر الماء|water hardness|mg/L as CaCO₃|232
# ---- microbiology
N0b|N₀|عدد البكتيريا في البداية|initial bacteria||100
gtime|g|زمن الجيل|generation time|min|20
tgrow|t|الزمن|time|min|120
Nbac|N|عدد البكتيريا|bacteria||6400
ngen|n|عدد الأجيال|generations||6
colonies|c|عدد المستعمرات|colonies counted||150
dilf|DF|معامل التخفيف|dilution factor||1e6
vplate_|V|حجم العينة المزروعة|volume plated|mL|0.1
cfu|CFU/mL|الوحدات المكونة للمستعمرات|colony-forming units per mL||1.5e9
Dval|D|زمن التخفيض العشري|D-value|min|2
logred|n|عدد اللوغاريتمات المخفضة|log reductions||6
tster|t|زمن التعقيم|sterilisation time|min|12
`);

EQ.add('stu',`
المعدل الموزون|Weighted average grade|x̄ = (x₁w₁ + x₂w₂) / (w₁ + w₂)|wavg|(g1*w1+g2*w2)/(w1+w2)|g1 w1 g2 w2|كل جزء من المادة له وزن مختلف.|Each part of a course counts differently.
كم تحتاج في النهائي|Score needed on the final|need = (target − now × (1 − w)) / w|need|(want-cur*(1-wfin/100))/(wfin/100)|want cur wfin|اعرف هدفك قبل الاختبار.|Know your target before the exam.
النسبة المئوية للدرجة|Percentage score|% = score / max × 100|pct_|pts_/outof*100|pts_ outof|42 من 50 = 84%.|42 out of 50 is 84%.
المعدل الفصلي|Term GPA|GPA = Σ(p × h) / Σh|gpa|(gp1*ch1+gp2*ch2+gp3*ch3)/(ch1+ch2+ch3)|gp1 ch1 gp2 ch2 gp3 ch3|المواد ذات الساعات الأكثر تأثر أكثر.|Courses with more hours count more.
المعدل التراكمي الجديد|New cumulative GPA|CGPA = (GPA₀H₀ + GPA_t H_t) / (H₀ + H_t)|cgpa|(oldg*oldh+newg*newh)/(oldh+newh)|oldg oldh newg newh|كل ما زادت ساعاتك، صار تغيير المعدل أبطأ.|The more hours you have, the slower your GPA moves.
خطة المذاكرة|Study plan|d = P / r|days_|ceil(pages/ppd)|pages ppd|كم يوم تحتاج تخلص المقرر.|How many days to finish the material.
`);

EQ.add('oil',`
من البرميل إلى لتر|Barrels to litres|L = bbl × 158.987|litr|bbl*158.987|bbl|البرميل النفطي ≈ 159 لتر.|An oil barrel is about 159 litres.
درجة API للنفط|API gravity of crude oil|API = 141.5 / SG − 131.5|api|141.5/sg-131.5|sg|فوق 31 نفط خفيف، وتحت 22 ثقيل.|Above 31 is light crude; below 22 is heavy.
الكثافة النسبية من API|Specific gravity from API|SG = 141.5 / (API + 131.5)|sg|141.5/(api+131.5)|api|العكس من المعادلة السابقة.|The reverse of the previous formula.
سنوات الإنتاج المتبقية|Reserves-to-production ratio|R/P = R / P|rpy|resv/prod|resv prod|كم سنة يكفي الاحتياطي بنفس الإنتاج. ارجع لأحدث الأرقام الرسمية.|How many years reserves last at today’s output. Check the latest official figures.
الإنتاج السنوي من اليومي|Annual production from daily|Q = q × 365 / 1000|bpy|bpd*365/1000|bpd|بمليارات البراميل.|In billions of barrels.
طاقة البرميل المكافئ|Energy in barrels of oil equivalent|E = BOE × 6.118|GJ|boe*6.118|boe|البرميل المكافئ ≈ 6.1 غيغاجول.|One barrel of oil equivalent ≈ 6.1 GJ.
النفط القابل للاستخلاص|Recoverable oil|N_p = OOIP × RF|recov|ooip*rf/100|ooip rf|ما نقدر نطلع كل النفط من المكمن.|We can’t get all the oil out of a reservoir.
الغاز بالبراميل المكافئة|Natural gas in barrels of oil equivalent|BOE ≈ V / 170|boe|gasm3/170|gasm3|تقريب: 170 م³ غاز ≈ برميل واحد طاقةً.|Rule of thumb: 170 m³ of gas ≈ one barrel in energy.
احتراق الميثان (الغاز الطبيعي)|Burning methane (natural gas)|CH₄ + 2O₂ → CO₂ + 2H₂O + 890 kJ/mol||||أنظف وقود أحفوري.|The cleanest fossil fuel.
التقطير التجزيئي للنفط|Fractional distillation of crude oil|غاز ← بنزين ← كيروسين ← ديزل ← زيوت ← إسفلت||||كل جزء يغلي عند حرارة مختلفة.|Each fraction boils at a different temperature.
التكسير الحفزي|Catalytic cracking|C₁₆H₃₄ → C₈H₁₈ + C₈H₁₆||||يحول الجزيئات الكبيرة لبنزين.|Turns big molecules into petrol.
`);

EQ.add('wtr',`
الطلب اليومي على الماء|Daily water demand|Q = P × q / 1000|wdem|pop_*lpcd/1000|pop_ lpcd|بالمتر المكعب في اليوم.|In cubic metres per day.
الطريقة المنطقية لجريان السيول|Rational method for storm runoff|Q = C i A / 360|Qpeak|Crun*irain*Acat/360|Crun irain Acat|لتصميم تصريف مياه الأمطار في المدن.|For designing city storm drains.
زمن البقاء في الحوض|Detention time in a tank|t = V / Q|HRT|Vtank/Qin|Vtank Qin|كم ساعة يبقى الماء في الحوض.|How many hours water stays in the tank.
كمية الكلور اليومية|Daily chlorine amount|m = C × Q / 1000|clkg|cl_d*Qd/1000|cl_d Qd|لتعقيم مياه الشرب.|For disinfecting drinking water.
عسر الماء|Water hardness|H = 2.497 Ca + 4.118 Mg|hard|2.497*CaPPM+4.118*MgPPM|CaPPM MgPPM|فوق 180 يعتبر ماء عسر جدًا.|Above 180 is very hard water.
التناضح العكسي|Reverse osmosis|ماء مالح + ضغط > الضغط الأسموزي → ماء عذب||||أساس محطات تحلية المياه.|The basis of desalination plants.
`);

EQ.add('mic',`
النمو البكتيري|Bacterial growth|N = N₀ × 2^(t/g)|Nbac|N0b*pow(2,tgrow/gtime)|N0b tgrow gtime|بعض البكتيريا تتضاعف كل 20 دقيقة!|Some bacteria double every 20 minutes!
عدد الأجيال|Number of generations|n = t / g|ngen|tgrow/gtime|tgrow gtime|كم مرة انقسمت البكتيريا.|How many times the bacteria divided.
زمن الجيل من عدد البكتيريا|Generation time from counts|g = t / log₂(N / N₀)|gtime|tgrow/log2(Nbac/N0b)|tgrow Nbac N0b|من قياسين للعدد.|From two population counts.
العد بالأطباق|Plate count|CFU/mL = c × DF / V|cfu|colonies*dilf/vplate_|colonies dilf vplate_|كيف يعد المختبر البكتيريا في العينة.|How a lab counts bacteria in a sample.
زمن التعقيم من قيمة D|Sterilisation time from the D-value|t = D × n|tster|Dval*logred|Dval logred|كل D يقتل 90% من الميكروبات.|Each D kills 90% of the microbes.
`);
