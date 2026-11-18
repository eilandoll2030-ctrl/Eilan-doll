/* موسوعة معادلات إيلان — الألغاز الرياضية، رياضيات التسوق والحياة، الجوالات والأجهزة الذكية، الكيمياء الخضراء */
EQ.syms(`
# ---- puzzles
hanoi|n|عدد الأقراص|number of discs||5
hmoves|moves|أقل عدد حركات|fewest moves||31
chsq|n|عدد المربعات|number of squares||64
grains|N|عدد حبات القمح|grains of wheat||1.84e19
sqn|n|ضلع الرقعة|board size||8
nsq|N|عدد المربعات|number of squares||204
nrect|N|عدد المستطيلات|number of rectangles||1296
jos|n|عدد الأشخاص|number of people||41
jpos|J|الموقع الناجي|surviving position||19
gcol|m|عدد الأعمدة|columns||6
gn|n|عدد الصفوف|rows||4
gcross|N|المربعات التي يقطعها القطر|squares the diagonal crosses||8
# ---- shopping & everyday maths
bill_|B|الفاتورة|bill|SAR|240
tipp|t|البقشيش|tip|%|10
ppl|n|عدد الأشخاص|people||4
share|s|نصيب الشخص|each person pays|SAR|66
d1p|a|الخصم الأول|first discount|%|30
d2p|b|الخصم الثاني|second discount|%|20
dtot|d|الخصم الكلي|total discount|%|44
pk1p|p₁|سعر العبوة الأولى|price of pack 1|SAR|12
pk1q|q₁|حجم العبوة الأولى|size of pack 1|g|500
pB|p₂|سعر العبوة الثانية|price of pack 2|SAR|20
qB|q₂|حجم العبوة الثانية|size of pack 2|g|1000
upA|u₁|سعر الوحدة الأولى|unit price 1|SAR/kg|24
upB|u₂|سعر الوحدة الثانية|unit price 2|SAR/kg|20
oldv|old|القيمة القديمة|old value||80
newv|new|القيمة الجديدة|new value||100
pchg|%|نسبة التغير|percentage change|%|25
instal|n|عدد الأقساط|instalments||4
iprice|price|سعر المنتج|price|SAR|1200
ipay|p|القسط|instalment|SAR|300
# ---- phones & smart devices
vchg|V|جهد الشاحن|charger voltage|V|9
achg|I|تيار الشاحن|charger current|A|2
wchg_|P|قدرة الشاحن|charging power|W|18
phwh|E|بطارية الجوال|phone battery|Wh|15
tchg|t|زمن الشحن|charging time|min|58
effc|η|كفاءة الشحن|charging efficiency|%|85
stgb|S|المساحة الفارغة|free storage|GB|64
mbp|s|حجم الصورة|photo size|MB|3
nphoto|N|عدد الصور|number of photos||21845
sot|P|استهلاك الشاشة|screen-on drain|W|1.5
hsot|t|ساعات الشاشة|screen-on time|h|10
# ---- green chemistry
mprod|M_p|كتلة الناتج المطلوب المولية|molar mass of desired product|g/mol|180
mreact|ΣM_r|مجموع كتل المتفاعلات المولية|sum of reactant molar masses|g/mol|240
aecon|AE|اقتصاد الذرة|atom economy|%|75
waste|m_w|كتلة النفايات|mass of waste|kg|25
prodk|m_p|كتلة المنتج|mass of product|kg|5
efac2|E|معامل E|E-factor||5
molp|n_p|مولات الناتج|moles of product|mol|1000
molc|n_c|مولات المحفز|moles of catalyst|mol|1
tonc|TON|عدد الدورات|turnover number||1000
tcat|t|زمن التفاعل|reaction time|h|2
tof|TOF|تردد الدوران|turnover frequency|1/h|500
`);

EQ.add('puz',`
برج هانوي|Tower of Hanoi|moves = 2ⁿ − 1|hmoves|pow(2,hanoi)-1|hanoi|بـ 64 قرص تحتاج مئات المليارات من السنين!|With 64 discs it would take hundreds of billions of years!
حبات القمح على رقعة الشطرنج|Wheat on a chessboard|N = 2ⁿ − 1|grains|pow(2,chsq)-1|chsq|قصة قديمة عن قوة التضاعف.|An old story about the power of doubling.
كم مربع في رقعة الشطرنج|How many squares on a chessboard|N = n(n + 1)(2n + 1) / 6|nsq|sqn*(sqn+1)*(2*sqn+1)/6|sqn|الجواب مو 64، بل 204!|The answer is not 64 but 204!
كم مستطيل في رقعة الشطرنج|How many rectangles on a chessboard|N = [n(n + 1)/2]²|nrect|pow(sqn*(sqn+1)/2,2)|sqn|1296 مستطيل في رقعة 8 × 8.|1296 rectangles on an 8 × 8 board.
مسألة جوزيفوس|Josephus problem|J = 2(n − 2^⌊log₂n⌋) + 1|jpos|2*(jos-pow(2,floor(log2(jos))))+1|jos|لما كل شخص ثاني يطلع من الدائرة، مين يبقى؟|When every second person leaves the circle, who is left?
القطر في شبكة مربعات|Diagonal across a grid|N = m + n − gcd(m, n)|gcross|(()=>{let a=Math.round(gcol),b=Math.round(gn);const s=a+b;while(b){[a,b]=[b,a%b]}return s-a})()|gcol gn|كم مربع يقطعه الخط من زاوية لزاوية.|How many squares a corner-to-corner line passes through.
مسألة المصافحة|Handshake puzzle|n(n − 1)/2 مصافحة||||في حفلة فيها 10 أشخاص: 45 مصافحة.|At a party of 10 people: 45 handshakes.
`);

EQ.add('shp',`
تقسيم الفاتورة مع البقشيش|Splitting a bill with a tip|s = B (1 + t/100) / n|share|bill_*(1+tipp/100)/ppl|bill_ tipp ppl|كل واحد كم يدفع.|What each person pays.
الخصم على الخصم|Stacked discounts|d = 1 − (1 − a)(1 − b)|dtot|(1-(1-d1p/100)*(1-d2p/100))*100|d1p d2p|خصم 30% ثم 20% = 44% مو 50%!|30% then 20% off is 44%, not 50%!
سعر الوحدة للعبوة الأولى|Unit price of pack 1|u = p / q × 1000|upA|pk1p/pk1q*1000|pk1p pk1q|بالريال لكل كيلو.|In riyals per kilogram.
سعر الوحدة للعبوة الثانية|Unit price of pack 2|u = p / q × 1000|upB|pB/qB*1000|pB qB|قارن قبل ما تشتري: الأكبر مو دايمًا أوفر.|Compare before buying: bigger isn’t always cheaper.
نسبة التغير|Percentage change|% = (new − old) / old × 100|pchg|(newv-oldv)/oldv*100|newv oldv|زيادة من 80 إلى 100 = 25%.|A rise from 80 to 100 is 25%.
قيمة القسط بدون فوائد|Interest-free instalment|p = price / n|ipay|iprice/instal|iprice instal|تأكد إنه فعلًا بدون رسوم.|Make sure there really are no fees.
`);

EQ.add('phn',`
قدرة الشاحن|Charger power|P = V × I|wchg_|vchg*achg|vchg achg|الشاحن السريع يرفع الجهد.|Fast chargers raise the voltage.
زمن شحن الجوال من الصفر|Phone charging time from empty|t = E / (P η) × 60|tchg|phwh/(wchg_*effc/100)*60|phwh wchg_ effc|تقريب؛ آخر 20% أبطأ عشان تحمي البطارية.|An estimate; the last 20% is slower to protect the battery.
كم صورة تتسع لها الذاكرة|How many photos fit in storage|N = S × 1024 / s|nphoto|floor(stgb*1024/mbp)|stgb mbp|الفيديو ياخذ مساحة أكثر بكثير.|Video takes much more space.
ساعات الشاشة من البطارية|Screen-on hours from the battery|t = E / P|hsot|phwh/sot|phwh sot|السطوع العالي يقلل الساعات.|High brightness cuts the hours.
`);

EQ.add('grn',`
اقتصاد الذرة|Atom economy|AE = M_p / ΣM_r × 100|aecon|mprod/mreact*100|mprod mreact|كم من الذرات تروح للمنتج المطلوب بدل النفايات.|How many atoms end up in the product instead of waste.
معامل E للنفايات|E-factor|E = m_w / m_p|efac2|waste/prodk|waste prodk|الأدوية فيها معامل عالي جدًا.|Pharmaceuticals have very high E-factors.
عدد دورات المحفز|Catalyst turnover number|TON = n_p / n_c|tonc|molp/molc|molp molc|كم مرة يشتغل المحفز قبل ما يتعب.|How many times a catalyst works before it wears out.
تردد دوران المحفز|Catalyst turnover frequency|TOF = TON / t|tof|tonc/tcat|tonc tcat|سرعة المحفز.|How fast the catalyst works.
المبادئ الاثني عشر للكيمياء الخضراء|The twelve principles of green chemistry|منع النفايات، اقتصاد الذرة، مواد أقل خطرًا، …||||كيمياء تحمي الإنسان والبيئة.|Chemistry that protects people and the planet.
`);
