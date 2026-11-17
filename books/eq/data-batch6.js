/* موسوعة معادلات إيلان — الطيران والملاحة، الزراعة، الخوارزميات، المنطق الرقمي، البحار والمحيطات */
EQ.syms(`
# ---- aviation & navigation
gs|GS|السرعة الأرضية|ground speed|kt|480
tas|TAS|السرعة الحقيقية|true airspeed|kt|450
hwind|w|مكوّن الرياح الخلفية|tailwind component|kt|30
crossw|XW|الرياح الجانبية|crosswind component|kt|10
windspd|V|سرعة الرياح|wind speed|kt|20
windang|θ|زاوية الرياح مع المدرج|wind angle to runway|°|30
nm_|d|المسافة|distance|NM|1000
fltT|t|زمن الطيران|flight time|h|2.08
burn|ff|استهلاك الوقود|fuel flow|kg/h|2500
fuelkg|fuel|الوقود|fuel|kg|5200
glide|L/D|نسبة الانزلاق|glide ratio||15
gdist|d|مسافة الانزلاق|glide distance|km|150
bank|φ|زاوية الميل|bank angle|°|25
turnR|r|نصف قطر الدوران|turn radius|m|4000
lfac|n|معامل الحمل|load factor||1.1
lat1|φ₁|خط العرض 1|latitude 1|°|21.5
lon1|λ₁|خط الطول 1|longitude 1|°|39.2
lat2|φ₂|خط العرض 2|latitude 2|°|24.7
lon2|λ₂|خط الطول 2|longitude 2|°|46.7
gcd|d|المسافة على سطح الأرض|great-circle distance|km|850
dmach|M|رقم ماخ|Mach number||0.8
# ---- agriculture
fieldA|A|مساحة الحقل|field area|ha|5
yieldt|Y|الإنتاج|yield|t|20
yha|Y/A|الإنتاجية|yield per hectare|t/ha|4
rate_|r|معدل التسميد|application rate|kg/ha|150
fert|F|السماد المطلوب|fertiliser needed|kg|750
npct|N|نسبة النيتروجين في السماد|nitrogen content|%|46
nkg|N|النيتروجين الفعلي|actual nitrogen|kg|345
etc_|ETc|احتياج المحصول للماء|crop water use|mm/day|6
kcrop|K_c|معامل المحصول|crop coefficient||1.1
et0|ET₀|التبخر-نتح المرجعي|reference evapotranspiration|mm/day|5.5
irrig|V|ماء الري|irrigation water|m³|300
seedha|s|معدل البذار|seeding rate|seeds/m²|300
germ|g|نسبة الإنبات|germination|%|90
plants|N|عدد النباتات|plants per m²||270
gdd|GDD|درجات النمو اليومية|growing degree days|°C·day|15
tmax|T_max|الحرارة العظمى|maximum temperature|°C|35
tmin_|T_min|الحرارة الصغرى|minimum temperature|°C|25
tbase|T_base|حرارة الأساس|base temperature|°C|15
feed|feed|العلف|feed eaten|kg|180
gainw|gain|الزيادة في الوزن|weight gained|kg|100
fcr|FCR|معامل تحويل العلف|feed conversion ratio||1.8
# ---- algorithms
nalg|n|حجم المدخلات|input size||1000
ops|ops|عدد العمليات|operations||10000
steps_|steps|خطوات البحث الثنائي|binary-search steps||10
hashN|n|العناصر المخزنة|items stored||75
hashM|m|حجم الجدول|table size||100
load|α|معامل الامتلاء|load factor||0.75
pwlen|L|طول كلمة السر|password length||12
alphab|N|حجم الأبجدية|alphabet size||62
entropy|H|القوة بالبت|entropy|bits|71.5
spdup|S|التسريع|speed-up||5.9
pfrac|p|الجزء القابل للتوازي|parallel fraction||0.9
cores|N|عدد المعالجات|processors||16
# ---- digital logic
bitsN|n|عدد البتات|number of bits||8
states|N|عدد الحالات|number of states||256
maxu|max|أكبر عدد بدون إشارة|largest unsigned value||255
dec|N|العدد العشري|decimal number||200
inputs|n|عدد المداخل|number of inputs||3
rows|rows|صفوف جدول الحقيقة|truth-table rows||8
clk|f|تردد الساعة|clock frequency|GHz|3
cyc|t|زمن الدورة|cycle time|ns|0.333
ipc|IPC|التعليمات لكل دورة|instructions per cycle||4
mips|MIPS|ملايين التعليمات في الثانية|million instructions per second||12000
# ---- oceans
dsea|h|عمق البحر|water depth|m|4000
vtsun|v|سرعة موجة التسونامي|tsunami speed|m/s|198
Lwave|λ|طول الموجة|wavelength|m|100
vdeep|v|سرعة موجة المياه العميقة|deep-water wave speed|m/s|12.5
Tw|T|زمن الموجة|wave period|s|8
Hwave|H|ارتفاع الموجة|wave height|m|2
Ewave|E|طاقة الموجة لكل متر مربع|wave energy per m²|J/m²|5025
Pwave|P|قدرة الموجة لكل متر|wave power per metre|kW/m|31
salin|S|الملوحة|salinity|g/kg|35
Psea|P|الضغط تحت الماء|pressure under water|atm|11
`);

EQ.add('avi',`
السرعة الأرضية|Ground speed|GS = TAS + w|gs|tas+hwind|tas hwind|الرياح الخلفية تسرّعك والأمامية تبطئك.|A tailwind speeds you up; a headwind slows you down.
الرياح الجانبية على المدرج|Crosswind on a runway|XW = V sin θ|crossw|windspd*sin(rad(windang))|windspd windang|كل طائرة لها حد أقصى للرياح الجانبية.|Every aircraft has a crosswind limit.
الرياح الأمامية على المدرج|Headwind on a runway|HW = V cos θ|hwind|windspd*cos(rad(windang))|windspd windang|الطائرات تقلع عكس الرياح.|Aircraft take off into the wind.
زمن الرحلة الجوية|Flight time|t = d / GS|fltT|nm_/gs|nm_ gs|الميل البحري والعقدة يمشون مع بعض.|Nautical miles and knots go together.
الوقود اللازم|Fuel required|fuel = ff × t|fuelkg|burn*fltT|burn fltT|بدون الاحتياطي الإلزامي.|Not counting the required reserve.
مسافة الانزلاق|Glide distance|d = h × L/D / 1000|gdist|h*glide/1000|h glide|طائرة بدون محرك تقدر تنزلق مسافة طويلة.|An aircraft without power can still glide a long way.
نصف قطر الدوران|Turn radius|r = v² / (g tan φ)|turnR|v*v/(g*tan(rad(bank)))|v bank g|ميل أكثر = دوران أضيق.|More bank means a tighter turn.
معامل الحمل في الدوران|Load factor in a turn|n = 1 / cos φ|lfac|1/cos(rad(bank))|bank|عند 60° تحس بضعف وزنك.|At 60° you feel twice your weight.
المسافة بين مدينتين (هافرسين)|Distance between two cities (haversine)|d = 2R asin √(sin²(Δφ/2) + cos φ₁ cos φ₂ sin²(Δλ/2))|gcd|2*6371*asin(sqrt(pow(sin(rad(lat2-lat1)/2),2)+cos(rad(lat1))*cos(rad(lat2))*pow(sin(rad(lon2-lon1)/2),2)))|lat1 lon1 lat2 lon2|الأرقام الافتراضية: من جدة إلى الرياض.|The defaults are Jeddah to Riyadh.
رقم ماخ للطائرة|Aircraft Mach number|M = v / a|dmach|v/vsnd|v vsnd|ماخ 1 = سرعة الصوت.|Mach 1 is the speed of sound.
`);

EQ.add('agr',`
الإنتاجية للهكتار|Yield per hectare|Y/A = Y / A|yha|yieldt/fieldA|yieldt fieldA|مقياس نجاح الموسم.|A measure of how good the season was.
كمية السماد|Fertiliser needed|F = r × A|fert|rate_*fieldA|rate_ fieldA|المعدل × المساحة.|Rate × area.
النيتروجين الفعلي في السماد|Actual nitrogen in fertiliser|N = F × N% / 100|nkg|fert*npct/100|fert npct|اليوريا فيها 46% نيتروجين.|Urea is 46% nitrogen.
احتياج المحصول للماء|Crop water need|ETc = K_c × ET₀|etc_|kcrop*et0|kcrop et0|كل محصول له معامل.|Every crop has its own coefficient.
ماء الري|Irrigation volume|V = ETc × A × 10|irrig|etc_*fieldA*10|etc_ fieldA|1 ملم على هكتار = 10 م³.|1 mm over one hectare is 10 m³.
عدد النباتات الفعلي|Plant stand|N = s × g / 100|plants|seedha*germ/100|seedha germ|مو كل بذرة تنبت.|Not every seed sprouts.
درجات النمو اليومية|Growing degree days|GDD = (T_max + T_min)/2 − T_base|gdd|(tmax+tmin_)/2-tbase|tmax tmin_ tbase|تتنبأ بموعد نضج المحصول.|Predicts when a crop will be ready.
معامل تحويل العلف|Feed conversion ratio|FCR = feed / gain|fcr|feed/gainw|feed gainw|كم كيلو علف لكل كيلو لحم.|Kilograms of feed per kilogram of growth.
`);

EQ.add('algo',`
التعقيد الخطي|Linear complexity O(n)|ops = n|ops|nalg|nalg|ضاعف المدخلات تتضاعف العمليات.|Double the input, double the work.
التعقيد التربيعي|Quadratic complexity O(n²)|ops = n²|ops|nalg*nalg|nalg|ترتيب الفقاعات بطيء مع البيانات الكبيرة.|Bubble sort gets slow with big data.
تعقيد n log n|n log n complexity|ops = n log₂ n|ops|nalg*log2(nalg)|nalg|سرعة أفضل خوارزميات الترتيب.|The speed of the best sorting algorithms.
التعقيد الأسي|Exponential complexity O(2ⁿ)|ops = 2ⁿ|ops|pow(2,min(nalg,60))|nalg|ينفجر بسرعة؛ جرب n = 50.|Explodes fast; try n = 50.
معامل امتلاء جدول التجزئة|Hash-table load factor|α = n / m|load|hashN/hashM|hashN hashM|فوق 0.75 يصير بطيء.|Above 0.75 it slows down.
قوة كلمة السر|Password strength|H = L log₂ N|entropy|pwlen*log2(alphab)|pwlen alphab|كل حرف زيادة يقوّيها كثير.|Every extra character makes it much stronger.
النظرية الرئيسية|Master theorem|T(n) = a T(n/b) + f(n)||||لتحليل خوارزميات فرّق تسد.|For analysing divide-and-conquer algorithms.
`);

EQ.add('dig',`
عدد الحالات|Number of states|N = 2ⁿ|states|pow(2,bitsN)|bitsN|8 بت = 256 حالة.|8 bits give 256 states.
أكبر عدد بدون إشارة|Largest unsigned value|max = 2ⁿ − 1|maxu|pow(2,bitsN)-1|bitsN|البايت يوصل لـ 255.|A byte goes up to 255.
مدى العدد بالإشارة|Signed range (two’s complement)|−2ⁿ⁻¹ … 2ⁿ⁻¹ − 1||||8 بت: من −128 إلى 127.|8 bits: −128 to 127.
عدد البتات اللازمة|Bits needed for a number|n = ⌈log₂(N + 1)⌉|bitsN|ceil(log2(dec+1))|dec|كم بت تحتاج لتخزين الرقم.|How many bits you need to store the number.
صفوف جدول الحقيقة|Truth-table rows|rows = 2ⁿ|rows|pow(2,inputs)|inputs|كل مدخل يضاعف الصفوف.|Each input doubles the rows.
زمن الدورة|Clock cycle time|t = 1 / f|cyc|1/clk|clk|3 غيغاهرتز = ثلث نانوثانية.|3 GHz is a third of a nanosecond.
سرعة المعالج|Processor throughput|MIPS = f × IPC × 1000|mips|clk*ipc*1000|clk ipc|ملايين التعليمات كل ثانية.|Millions of instructions each second.
بوابة AND|AND gate|Y = A · B||||1 فقط إذا الاثنين 1.|1 only if both are 1.
بوابة OR|OR gate|Y = A + B||||1 إذا واحد منهم على الأقل 1.|1 if at least one is 1.
بوابة NOT|NOT gate|Y = Ā||||تقلب القيمة.|Flips the value.
بوابة XOR|XOR gate|Y = A ⊕ B||||1 إذا كانوا مختلفين.|1 if they differ.
بوابة NAND|NAND gate|Y = ¬(A · B)||||بوابة عامة: تقدر تبني منها أي دائرة.|Universal: you can build any circuit from it.
قانونا دي مورغان|De Morgan’s laws|¬(A · B) = Ā + B̄ ، ¬(A + B) = Ā · B̄||||تبسيط الدوائر المنطقية.|Simplify logic circuits.
الجامع النصفي|Half adder|S = A ⊕ B ، C = A · B||||أول خطوة في جمع الأرقام بالكمبيوتر.|The first step in how computers add.
`);

EQ.add('sea',`
سرعة التسونامي|Tsunami speed|v = √(g h)|vtsun|sqrt(g*dsea)|g dsea|في المحيط العميق أسرع من سيارة على الطريق السريع.|In the deep ocean it is faster than a car on a highway.
طول الموجة من زمنها|Wavelength from period|λ = g T² / 2π|Lwave|g*Tw*Tw/(2*PI)|g Tw|في المياه العميقة.|In deep water.
طاقة موجة البحر|Ocean-wave energy|E = ρ g H² / 8|Ewave|1025*g*Hwave*Hwave/8|g Hwave|ضاعف ارتفاع الموجة تصير الطاقة 4 أضعاف.|Double the height and the energy quadruples.
قدرة موجة البحر|Ocean-wave power|P ≈ 0.49 H² T|Pwave|0.49*Hwave*Hwave*Tw|Hwave Tw|بالكيلوواط لكل متر من الشاطئ.|In kilowatts per metre of coastline.
الضغط تحت الماء|Pressure under water|P = 1 + h / 10|Psea|1+hd/10|hd|كل 10 أمتار تزيد ضغط جو كامل.|Every 10 m adds one atmosphere.
`);
