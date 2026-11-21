/* موسوعة معادلات إيلان — المرور والمدن، الصور والفيديو الرقمي، الشبكات والإنترنت، بحوث العمليات والمخزون */
EQ.syms(`
# ---- traffic & cities
kden|k|كثافة المرور|traffic density|veh/km|30
vtr|v|سرعة المرور|traffic speed|km/h|60
qflow|q|تدفق المرور|traffic flow|veh/h|1800
vfree|v_f|السرعة الحرة|free-flow speed|km/h|100
kjam|k_j|كثافة الاختناق|jam density|veh/km|150
qmax|q_max|السعة القصوى للحارة|lane capacity|veh/h|3750
hdwy|h|الفاصل الزمني بين السيارات|headway|s|2
Lcyc|L|زمن الفقد في الإشارة|lost time per cycle|s|12
Ysum|Y|مجموع نسب التدفق|sum of flow ratios||0.6
Copt|C|زمن دورة الإشارة الأمثل|optimum signal cycle|s|57.5
popc|P|عدد السكان|population||5e6
areac|A|المساحة|area|km²|1800
dens_|D|الكثافة السكانية|population density|people/km²|2778
gfa|GFA|مساحة البناء الكلية|gross floor area|m²|5000
lot|A|مساحة الأرض|plot area|m²|2000
far|FAR|نسبة البناء إلى الأرض|floor-area ratio||2.5
pk_unit|n|عدد الوحدات السكنية|dwelling units||120
pk_rate|r|مواقف لكل وحدة|spaces per unit||1.5
pk_n|N|عدد المواقف|parking spaces||180
# ---- digital images & video
wpx|W|العرض|width|px|1920
hpx|H|الارتفاع|height|px|1080
bpp|bpp|بتات لكل بكسل|bits per pixel||24
rawMB|size|الحجم بدون ضغط|uncompressed size|MB|6.2
comp|CR|نسبة الضغط|compression ratio||10
cMB|size|الحجم بعد الضغط|compressed size|MB|0.62
colors|N|عدد الألوان|number of colours||16777216
Rr|R|الأحمر|red||200
Gg_|G|الأخضر|green||150
Bblue|B|الأزرق|blue||50
Ylum|Y|السطوع|luminance||151
Vgin|V_in|القيمة الداخلة|input value (0–1)||0.5
gam_|γ|قيمة غاما|gamma||2.2
Vgout|V_out|القيمة بعد تصحيح غاما|gamma-corrected value||0.73
fpsv|fps|الإطارات في الثانية|frames per second||30
vmin|t|المدة|duration|min|1
rawGB|size|حجم الفيديو بدون ضغط|uncompressed video size|GB|11.2
mse|MSE|متوسط مربع الخطأ|mean squared error||25
psnr|PSNR|نسبة الإشارة القصوى إلى الضجيج|peak signal-to-noise ratio|dB|34.2
# ---- networks & internet
fileMB|size|حجم الملف|file size|MB|500
mbps|speed|سرعة الإنترنت|connection speed|Mbit/s|100
tdl|t|زمن التحميل|download time|s|40
dkm3|d|المسافة|distance|km|4500
rtt|RTT|زمن الذهاب والعودة|round-trip time|ms|45
win|W|نافذة TCP|TCP window|KB|64
thpt|T|أقصى معدل نقل|maximum throughput|Mbit/s|11.7
hbits|h|بتات المضيفين|host bits||8
hosts|N|عدد الأجهزة|usable hosts||254
prefix|/n|بادئة الشبكة|prefix length||24
gbday|data|البيانات اليومية|daily data|GB|2
gbmon|data|البيانات الشهرية|monthly data|GB|60
streamM|rate|معدل البث|stream bitrate|Mbit/s|5
shrs|t|ساعات المشاهدة|hours watched|h|2
gbuse|data|البيانات المستهلكة|data used|GB|4.5
ploss|p|نسبة فقد الحزم|packet loss|%|1
mss|MSS|حجم المقطع|segment size|bytes|1460
mathis|T|معدل النقل (ماثيس)|throughput (Mathis)|Mbit/s|3.2
uptime|A|نسبة التشغيل|availability|%|99.9
downm|down|التوقف السنوي|yearly downtime|min|526
# ---- operations research
Dann|D|الطلب السنوي|annual demand|units|12000
Sord|S|تكلفة الطلبية|cost per order|SAR|100
Hhold|H|تكلفة التخزين للوحدة|holding cost per unit|SAR/yr|6
eoq|EOQ|كمية الطلب الاقتصادية|economic order quantity|units|632
dday_|d|الطلب اليومي|daily demand|units|40
lead|L|زمن التوريد|lead time|days|5
ss|SS|مخزون الأمان|safety stock|units|50
rop|ROP|نقطة إعادة الطلب|reorder point|units|250
zsl|z|معامل مستوى الخدمة|service-level factor||1.65
sdd_|σ_d|انحراف الطلب اليومي|sd of daily demand|units|10
lam_q|λ|معدل الوصول|arrival rate|per hour|8
mu_q|μ|معدل الخدمة|service rate|per hour|10
rho_q|ρ|نسبة الانشغال|utilisation|%|80
Lq|L|متوسط عدد الموجودين|average number in system||4
Wq|W|متوسط زمن الانتظار|average time in system|min|30
Lit|L|المخزون تحت التشغيل|items in the system||20
Wit|W|الزمن في النظام|time in the system|h|2.5
lamit|λ|معدل الدخول|arrival rate|per hour|8
turns|turns|دوران المخزون|inventory turnover|per year|8
avginv|inv|متوسط المخزون|average inventory|SAR|25000
cogs2|COGS|تكلفة المبيعات|cost of goods sold|SAR|200000
`);

EQ.add('trf',`
المعادلة الأساسية للمرور|Fundamental traffic equation|q = k v|qflow|kden*vtr|kden vtr|التدفق = الكثافة × السرعة.|Flow = density × speed.
نموذج غرينشيلدز للسرعة|Greenshields speed model|v = v_f (1 − k / k_j)|vtr|vfree*(1-kden/kjam)|vfree kden kjam|كل ما زادت السيارات قلت السرعة.|More cars, lower speed.
السعة القصوى للطريق|Maximum road capacity|q_max = v_f k_j / 4|qmax|vfree*kjam/4|vfree kjam|أعلى تدفق عند نص كثافة الاختناق.|Peak flow happens at half the jam density.
التدفق من الفاصل الزمني|Flow from headway|q = 3600 / h|qflow|3600/hdwy|hdwy|ثانيتين بين السيارات = 1800 سيارة بالساعة.|Two seconds apart is 1800 cars an hour.
زمن دورة الإشارة الأمثل (ويبستر)|Optimum signal cycle (Webster)|C = (1.5L + 5) / (1 − Y)|Copt|(1.5*Lcyc+5)/(1-Ysum)|Lcyc Ysum|كيف تنضبط إشارات المرور.|How traffic lights are timed.
نسبة البناء إلى الأرض|Floor-area ratio|FAR = GFA / A|far|gfa/lot|gfa lot|البلديات تحدد كم تبني على الأرض.|Councils limit how much you can build on a plot.
عدد المواقف المطلوبة|Parking spaces required|N = n × r|pk_n|pk_unit*pk_rate|pk_unit pk_rate|حسب أنظمة البناء.|Set by building codes.
`);

EQ.add('img',`
حجم الصورة بدون ضغط|Uncompressed image size|size = W × H × bpp / 8 / 10⁶|rawMB|wpx*hpx*bpp/8/1e6|wpx hpx bpp|صورة Full HD بـ 24 بت ≈ 6 ميغابايت.|A 24-bit Full HD image is about 6 MB.
الحجم بعد الضغط|Size after compression|size = raw / CR|cMB|rawMB/comp|rawMB comp|صيغة JPEG تضغط حوالي 10 مرات.|JPEG compresses about tenfold.
عدد الألوان الممكنة|Number of possible colours|N = 2^bpp|colors|pow(2,bpp)|bpp|24 بت = أكثر من 16 مليون لون.|24 bits give over 16 million colours.
تحويل الملون إلى رمادي|Colour to greyscale|Y = 0.299R + 0.587G + 0.114B|Ylum|0.299*Rr+0.587*Gg_+0.114*Bblue|Rr Gg_ Bblue|العين أحسّ للأخضر.|Our eyes are most sensitive to green.
تصحيح غاما|Gamma correction|V_out = V_in^(1/γ)|Vgout|pow(Vgin,1/gam_)|Vgin gam_|يخلي الصورة تطلع صح على الشاشة.|Makes images look right on screen.
حجم الفيديو بدون ضغط|Uncompressed video size|size = W × H × bpp × fps × t × 60 / 8 / 10⁹|rawGB|wpx*hpx*bpp*fpsv*vmin*60/8/1e9|wpx hpx bpp fpsv vmin|دقيقة وحدة تحتاج أكثر من 11 غيغابايت! عشان كذا نضغط.|One minute needs over 11 GB! That is why we compress.
نسبة الإشارة إلى الضجيج القصوى|Peak signal-to-noise ratio|PSNR = 10 log₁₀(255² / MSE)|psnr|10*log10(255*255/mse)|mse|فوق 30 ديسيبل يعني جودة كويسة.|Above 30 dB means good quality.
الالتفاف (فلتر الصورة)|Convolution (image filter)|g(x,y) = Σ Σ k(i,j) f(x − i, y − j)||||أساس التمويه والتحديد وكشف الحواف.|The basis of blurring, sharpening and edge detection.
`);

EQ.add('net',`
زمن تحميل الملف|File download time|t = size × 8 / speed|tdl|fileMB*8/mbps|fileMB mbps|البايت = 8 بت؛ السرعات تنكتب بالبت.|A byte is 8 bits; speeds are quoted in bits.
أقل زمن ذهاب وعودة|Minimum round-trip time|RTT ≈ 2d / 200000 × 1000|rtt|2*dkm3/200000*1000|dkm3|الضوء في الألياف يمشي حوالي 200 ألف كم بالثانية.|Light in fibre travels about 200,000 km/s.
أقصى معدل نقل لنافذة TCP|Maximum throughput for a TCP window|T = W × 8 / RTT|thpt|win*1024*8/(rtt/1000)/1e6|win rtt|الاتصال البعيد يحتاج نافذة أكبر.|A distant connection needs a bigger window.
عدد الأجهزة في الشبكة الفرعية|Hosts in a subnet|N = 2ʰ − 2|hosts|pow(2,hbits)-2|hbits|/24 تكفي 254 جهاز.|A /24 fits 254 devices.
بتات المضيفين من البادئة|Host bits from prefix length|h = 32 − n|hbits|32-prefix|prefix|عنوان IPv4 طوله 32 بت.|An IPv4 address is 32 bits long.
عناوين IPv4 الممكنة|Possible IPv4 addresses|2³² ≈ 4.3 مليار||||ما تكفي العالم، عشان كذا جا IPv6.|Not enough for the world, hence IPv6.
عناوين IPv6 الممكنة|Possible IPv6 addresses|2¹²⁸ ≈ 3.4 × 10³⁸||||أكثر من حبات الرمل على الأرض بمليارات المرات.|Billions of times more than the grains of sand on Earth.
استهلاك البيانات الشهري|Monthly data use|data = daily × 30|gbmon|gbday*30|gbday|عشان تختار الباقة المناسبة.|To pick the right plan.
بيانات مشاهدة الفيديو|Data used streaming video|data = rate × t × 3600 / 8000|gbuse|streamM*shrs*3600/8000|streamM shrs|بالغيغابايت.|In gigabytes.
معدل النقل مع فقد الحزم (ماثيس)|Throughput with packet loss (Mathis)|T ≈ (MSS / RTT) × 1.22 / √p|mathis|mss*8/(rtt/1000)*1.22/sqrt(ploss/100)/1e6|mss rtt ploss|1% فقد ممكن يبطئ الاتصال كثير.|1% loss can slow a connection a lot.
التوقف السنوي من نسبة التشغيل|Yearly downtime from availability|down = (1 − A) × 525600|downm|(1-uptime/100)*525600|uptime|99.9% = حوالي 8.8 ساعة توقف بالسنة.|99.9% means about 8.8 hours of downtime a year.
`);

EQ.add('opr',`
كمية الطلب الاقتصادية|Economic order quantity|EOQ = √(2DS / H)|eoq|sqrt(2*Dann*Sord/Hhold)|Dann Sord Hhold|أفضل كمية تطلبها كل مرة.|The best amount to order each time.
مخزون الأمان|Safety stock|SS = z σ_d √L|ss|zsl*sdd_*sqrt(lead)|zsl sdd_ lead|عشان ما ينفد المخزون فجأة.|So you don’t suddenly run out.
نقطة إعادة الطلب|Reorder point|ROP = d × L + SS|rop|dday_*lead+ss|dday_ lead ss|متى تطلب بضاعة جديدة.|When to order more stock.
نسبة انشغال الخادم|Server utilisation|ρ = λ / μ × 100|rho_q|lam_q/mu_q*100|lam_q mu_q|لو وصلت 100% الطابور يطول بلا نهاية.|At 100% the queue grows without end.
متوسط عدد الموجودين في الطابور (M/M/1)|Average number in an M/M/1 system|L = λ / (μ − λ)|Lq|lam_q/(mu_q-lam_q)|lam_q mu_q|طابور الكاشير أو خدمة العملاء.|A checkout or customer-service queue.
متوسط زمن البقاء في الطابور (M/M/1)|Average time in an M/M/1 system|W = 1 / (μ − λ) × 60|Wq|60/(mu_q-lam_q)|mu_q lam_q|بالدقائق.|In minutes.
قانون ليتل|Little’s law|L = λ W|Lit|lamit*Wit|lamit Wit|يصلح لأي طابور أو مصنع أو مطعم.|Works for any queue, factory or restaurant.
دوران المخزون|Inventory turnover|turns = COGS / average inventory|turns|cogs2/avginv|cogs2 avginv|كم مرة تبيع مخزونك في السنة.|How many times a year you sell through your stock.
البرمجة الخطية|Linear programming|max cᵀx بشرط Ax ≤ b ، x ≥ 0||||أفضل قرار مع موارد محدودة.|The best decision with limited resources.
المسار الحرج|Critical path|أطول مسار في شبكة المهام = أقل مدة للمشروع||||أي تأخير فيه يأخر المشروع كله.|Any delay on it delays the whole project.
`);
