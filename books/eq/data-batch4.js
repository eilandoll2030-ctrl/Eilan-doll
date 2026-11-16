/* موسوعة معادلات إيلان — الوراثة، علم البيئة، جسم الإنسان، الإحصاء التطبيقي والاختبارات */
EQ.syms(`
# ---- genetics
bpair|bp|أزواج القواعد|base pairs|bp|3.2e9
gcpct|GC|نسبة G + C|GC content|%|42
apct|A|نسبة الأدينين|adenine content|%|29
codons|codons|عدد الكودونات|codons||300
aminos|aa|الأحماض الأمينية|amino acids||300
nucl|nt|النيوكليوتيدات|nucleotides||900
ncross|n|عدد الأزواج غير المتماثلة|heterozygous gene pairs||3
ngam|gametes|أنواع الأمشاج|gamete types||8
rfreq|RF|تكرار إعادة الاتحاد|recombination frequency|%|10
recomb|rec|النسل المعاد اتحاده|recombinant offspring||50
offs|total|مجموع النسل|total offspring||500
cM|d|المسافة على الكروموسوم|map distance|cM|10
cycl|n|عدد دورات PCR|PCR cycles||30
copies0|N₀|النسخ في البداية|starting copies||10
copiesN|N|النسخ بعد التضخيم|copies after amplification||1.07e10
lenDNA|L|طول DNA|DNA length|m|1.09
# ---- ecology
ntA|N₁|العدد في البداية|starting count||100
ntB|N₂|العدد في النهاية|final count||150
lamg|λ|معدل النمو الدوري|finite growth rate||1.5
spec|S|عدد الأنواع|number of species||10
shan|H′|مؤشر شانون|Shannon index||2.1
even|J|التوزيع المتكافئ|evenness||0.91
quad|n|العدد في المربعات|count in quadrats||24
qarea|a|مساحة المربعات|quadrat area sampled|m²|4
tarea|A|المساحة الكلية|total area|m²|1000
popest|N|العدد التقديري|estimated population||6000
biomass|B|الكتلة الحيوية|biomass|kg|1000
troph|n|عدد المستويات الغذائية|trophic steps||2
gpp|GPP|الإنتاجية الإجمالية|gross primary production|g/m²/yr|2000
resp|R|التنفس|respiration|g/m²/yr|800
npp|NPP|الإنتاجية الصافية|net primary production|g/m²/yr|1200
# ---- human body
tvol|TV|حجم الهواء في النفس|tidal volume|mL|500
rr|RR|معدل التنفس|breathing rate|breaths/min|12
ve_|V_E|التهوية الدقيقية|minute ventilation|mL/min|6000
dead|V_D|الحيز الميت|dead space|mL|150
va_|V_A|التهوية السنخية|alveolar ventilation|mL/min|4200
irv|IRV|حجم الشهيق الاحتياطي|inspiratory reserve volume|mL|3000
erv|ERV|حجم الزفير الاحتياطي|expiratory reserve volume|mL|1100
vc|VC|السعة الحيوية|vital capacity|mL|4600
rv|RV|الحجم المتبقي|residual volume|mL|1200
tlc|TLC|السعة الكلية للرئة|total lung capacity|mL|5800
edv|EDV|الحجم نهاية الانبساط|end-diastolic volume|mL|120
esv|ESV|الحجم نهاية الانقباض|end-systolic volume|mL|50
efr|EF|الكسر القذفي|ejection fraction|%|58
bvol|BV|حجم الدم|blood volume|L|5
hct|Hct|الهيماتوكريت|haematocrit|%|45
pvol|PV|حجم البلازما|plasma volume|L|2.75
qtint|QT|فترة QT|QT interval|s|0.4
rrint|RR|الفترة بين النبضتين|RR interval|s|0.8
qtc|QTc|فترة QT المصححة|corrected QT|s|0.447
# ---- applied statistics
xbar|x̄|المتوسط|mean||50
usl|USL|الحد الأعلى للمواصفة|upper spec limit||56
lsl|LSL|الحد الأدنى للمواصفة|lower spec limit||44
cp|C_p|قدرة العملية|process capability||1
cpk|C_pk|قدرة العملية الفعلية|process capability index||1
ucl|UCL|حد التحكم الأعلى|upper control limit||59
defects|d|العيوب|defects||7
units|n|الوحدات|units||1000
opps|o|فرص العيب لكل وحدة|opportunities per unit||10
dpmo|DPMO|عيوب لكل مليون فرصة|defects per million opportunities||700
cv|CV|معامل الاختلاف|coefficient of variation|%|20
iqr|IQR|المدى الربيعي|interquartile range||10
upf|fence|الحد الأعلى للقيم الشاذة|upper outlier fence||30
r2|R²|معامل التحديد|coefficient of determination||0.64
kpred|k|عدد المتغيرات المستقلة|number of predictors||2
r2adj|R²_adj|معامل التحديد المعدّل|adjusted R²||0.62
fstat|F|قيمة F|F statistic||4
v1|s₁²|التباين الأول|variance 1||16
v2|s₂²|التباين الثاني|variance 2||4
dmean|d̄|متوسط الفروق|mean difference||3
sdd|s_d|انحراف الفروق|sd of differences||4
effd|d|حجم الأثر (كوهين)|effect size (Cohen’s d)||0.5
spool|s_p|الانحراف المجمّع|pooled standard deviation||10
nsize|n|حجم العينة المطلوب|required sample size||385
zcrit|z|القيمة الحرجة|critical value||1.96
marg|E|هامش الخطأ|margin of error||0.05
odds|odds|الأرجحية|odds||0.25
oddsr|OR|نسبة الأرجحية|odds ratio||2.25
rrisk|RR|الخطر النسبي|relative risk||1.5
ca|a|المعرّضون المصابون|exposed with outcome||30
cb|b|المعرّضون غير المصابين|exposed without outcome||70
cc_|c|غير المعرّضين المصابون|unexposed with outcome||20
cd_|d|غير المعرّضين غير المصابين|unexposed without outcome||80
`);

EQ.add('gen',`
قاعدة شارغاف|Chargaff’s rule|A = T و G = C||||الأدينين يقابل الثايمين، والجوانين يقابل السايتوسين.|Adenine pairs with thymine; guanine with cytosine.
نسبة الأدينين من نسبة GC|Adenine share from GC content|A = (100 − GC) / 2|apct|(100-gcpct)/2|gcpct|بما إن A = T و G = C.|Because A = T and G = C.
عدد الأحماض الأمينية من الكودونات|Amino acids from codons|aa = codons|aminos|codons|codons|كل كودون (3 قواعد) يحدد حمضًا أمينيًا واحدًا.|Each codon (3 bases) codes for one amino acid.
النيوكليوتيدات اللازمة لبروتين|Nucleotides needed for a protein|nt = 3 × aa|nucl|3*aminos|aminos|بدون كودون التوقف.|Not counting the stop codon.
عدد الكودونات الممكنة|Number of possible codons|4³ = 64||||4 قواعد في 3 مواقع.|Four bases in three positions.
أنواع الأمشاج|Number of gamete types|gametes = 2ⁿ|ngam|pow(2,ncross)|ncross|كل زوج غير متماثل يضاعف الأنواع.|Each heterozygous pair doubles the types.
عدد التراكيب في مربع بانيت|Squares in a Punnett square|4ⁿ|res|pow(4,ncross)|ncross|لتهجين بين فردين غير متماثلين في n جينات.|For a cross of two individuals heterozygous at n genes.
تكرار إعادة الاتحاد|Recombination frequency|RF = rec / total × 100|rfreq|recomb/offs*100|recomb offs|كل ما بعدت الجينات زاد.|Rises the further apart genes are.
المسافة على الخريطة الجينية|Genetic map distance|1% RF = 1 cM|cM|rfreq|rfreq|السنتيمورغان وحدة المسافة بين الجينات.|The centimorgan measures distance between genes.
تضخيم PCR|PCR amplification|N = N₀ × 2ⁿ|copiesN|copies0*pow(2,cycl)|copies0 cycl|كل دورة تضاعف عدد النسخ.|Each cycle doubles the copies.
طول الحمض النووي|Length of DNA|L = bp × 0.34 nm|lenDNA|bpair*0.34e-9|bpair|DNA خلية واحدة طوله أكثر من متر!|One cell’s DNA is longer than a metre!
التهجين الأحادي غير المتماثل|Monohybrid cross Aa × Aa|1 AA : 2 Aa : 1 aa||||النسبة الجينية.|The genotype ratio.
التهجين الاختباري|Test cross Aa × aa|1 Aa : 1 aa||||يكشف إذا الصفة السائدة نقية.|Reveals whether a dominant trait is pure.
الوراثة المرتبطة بالجنس|Sex-linked inheritance|Xᴬ Xᵃ × Xᴬ Y ⇒ نصف الذكور يحملون الصفة||||مثل عمى الألوان.|Like colour blindness.
فصائل الدم|ABO blood groups|Iᴬ = Iᴮ > i||||الصفتان A و B متساويتان في السيادة.|A and B are co-dominant.
السيادة غير التامة|Incomplete dominance|أحمر × أبيض ⇒ وردي||||الصفة الوسطى تظهر.|The in-between trait shows.
النسخ|Transcription|DNA → mRNA||||الإنزيم يقرأ الجين ويكتب نسخة.|An enzyme reads the gene and writes a copy.
الترجمة|Translation|mRNA → بروتين||||الرايبوسوم يقرأ الكودونات.|The ribosome reads the codons.
العقيدة المركزية|Central dogma|DNA → RNA → بروتين||||مسار المعلومة في الخلية.|How information flows in the cell.
الانقسام المتساوي|Mitosis|2n → 2n + 2n||||خليتين متطابقتين.|Two identical cells.
الانقسام المنصف|Meiosis|2n → 4 × n||||أربع خلايا جنسية.|Four sex cells.
`);

EQ.add('ecl',`
معدل النمو الدوري|Finite rate of increase|λ = N₂ / N₁|lamg|ntB/ntA|ntA ntB|أكبر من 1 يعني الجماعة تكبر.|Above 1 means the population grows.
تقدير الجماعة بالمربعات|Population estimate from quadrats|N = n × A / a|popest|quad*tarea/qarea|quad tarea qarea|عد في مساحة صغيرة وكبّر.|Count a small area and scale up.
مؤشر التكافؤ (بيلو)|Pielou’s evenness|J = H′ / ln S|even|shan/log(spec)|shan spec|1 يعني كل الأنواع متساوية العدد.|1 means every species is equally common.
قاعدة العشرة بالمئة|Ten-percent rule|E = B × 0.1ⁿ|res|biomass*pow(0.1,troph)|biomass troph|10% فقط من الطاقة تنتقل للمستوى التالي.|Only 10% of energy passes up each level.
الإنتاجية الصافية|Net primary production|NPP = GPP − R|npp|gpp-resp|gpp resp|اللي يتبقى للحيوانات بعد تنفس النبات.|What is left for animals after plants respire.
مؤشر شانون للتنوع|Shannon diversity index|H′ = −Σ pᵢ ln pᵢ||||كل ما زاد كان المكان أغنى بالأنواع.|Higher means a richer mix of species.
دورة الكربون: البناء والتنفس|Carbon cycle balance|CO₂ (هواء) ⇄ كربون عضوي||||النبات يسحب والكائنات تطلق.|Plants take it in; living things give it back.
دورة النيتروجين|Nitrogen cycle|N₂ → NH₄⁺ → NO₂⁻ → NO₃⁻ → N₂||||بكتيريا تحول النيتروجين.|Bacteria convert nitrogen step by step.
السلسلة الغذائية|Food chain|منتج → مستهلك أول → مستهلك ثاني → مفترس||||الطاقة تمشي باتجاه واحد.|Energy flows one way.
`);

EQ.add('hum',`
التهوية الدقيقية|Minute ventilation|V_E = TV × RR|ve_|tvol*rr|tvol rr|كم هواء تتنفس في الدقيقة.|How much air you breathe each minute.
التهوية السنخية|Alveolar ventilation|V_A = (TV − V_D) × RR|va_|(tvol-dead)*rr|tvol dead rr|الهواء اللي يوصل فعلًا للرئة.|The air that actually reaches the lungs.
السعة الحيوية|Vital capacity|VC = IRV + TV + ERV|vc|irv+tvol+erv|irv tvol erv|أقصى هواء تطلعه بعد أعمق شهيق.|The most air you can blow out after the deepest breath.
السعة الكلية للرئة|Total lung capacity|TLC = VC + RV|tlc|vc+rv|vc rv|يبقى هواء في الرئة دايمًا.|Some air always stays in the lungs.
حجم الضربة من الأحجام|Stroke volume from volumes|SV = EDV − ESV|SVml|edv-esv|edv esv|الدم اللي يطلع مع كل نبضة.|Blood pushed out with each beat.
الكسر القذفي|Ejection fraction|EF = (EDV − ESV) / EDV × 100|efr|(edv-esv)/edv*100|edv esv|نسبة الدم اللي يضخها القلب من البطين.|The share of blood the ventricle pumps out.
حجم البلازما|Plasma volume|PV = BV × (1 − Hct/100)|pvol|bvol*(1-hct/100)|bvol hct|الدم = خلايا + بلازما.|Blood is cells plus plasma.
تصحيح فترة QT (بازيت)|Corrected QT interval (Bazett)|QTc = QT / √RR|qtc|qtint/sqrt(rrint)|qtint rrint|يصحح الفترة حسب سرعة النبض.|Adjusts the interval for heart rate.
النبض من فترة RR|Heart rate from the RR interval|HR = 60 / RR|HR|60/rrint|rrint|من تخطيط القلب.|From an ECG.
`);

EQ.add('qc',`
قدرة العملية|Process capability|C_p = (USL − LSL) / (6σ)|cp|(usl-lsl)/(6*sd)|usl lsl sd|أكبر من 1.33 تعتبر جيدة.|Above 1.33 is considered good.
مؤشر القدرة الفعلي|Process capability index|C_pk = min(USL − x̄, x̄ − LSL) / (3σ)|cpk|min(usl-xbar,xbar-lsl)/(3*sd)|usl lsl xbar sd|ياخذ بعين الاعتبار إذا العملية مو في المنتصف.|Accounts for an off-centre process.
حد التحكم الأعلى|Upper control limit|UCL = x̄ + 3σ/√n|ucl|xbar+3*sd/sqrt(nS)|xbar sd nS|نقطة فوقه تعني شي غير طبيعي.|A point above it signals trouble.
عيوب لكل مليون فرصة|Defects per million opportunities|DPMO = d / (n × o) × 10⁶|dpmo|defects/(units*opps)*1e6|defects units opps|ستة سيغما = 3.4 عيب لكل مليون.|Six Sigma means 3.4 defects per million.
حد القيم الشاذة|Outlier fence|fence = Q₃ + 1.5 IQR|upf|q3+1.5*iqr|q3 iqr|أي قيمة فوقه تعتبر شاذة.|Any value above it is an outlier.
معامل التحديد المعدّل|Adjusted R²|R²_adj = 1 − (1 − R²)(n − 1)/(n − k − 1)|r2adj|1-(1-r2)*(nS-1)/(nS-kpred-1)|r2 nS kpred|يعاقب إضافة متغيرات بلا فائدة.|Penalises adding useless variables.
اختبار F لتساوي التباين|F test for equal variances|F = s₁² / s₂²|fstat|v1/v2|v1 v2|نسبة تباينين.|A ratio of two variances.
اختبار t للعينات المزدوجة|Paired t-test|t = d̄ / (s_d / √n)|tt|dmean/(sdd/sqrt(nS))|dmean sdd nS|قبل وبعد على نفس الأشخاص.|Before and after on the same people.
حجم العينة لنسبة|Sample size for a proportion|n = z² p(1 − p) / E²|nsize|zcrit*zcrit*pp*(1-pp)/(marg*marg)|zcrit pp marg|كم شخص تحتاج في الاستبيان.|How many people your survey needs.
حجم العينة لمتوسط|Sample size for a mean|n = (z σ / E)²|nsize|pow(zcrit*sd/marg,2)|zcrit sd marg|كل ما صغر هامش الخطأ احتجت عينة أكبر.|A smaller margin needs a bigger sample.
الأرجحية من الاحتمال|Odds from probability|odds = p / (1 − p)|odds|pp/(1-pp)|pp|احتمال 0.2 = أرجحية 1 إلى 4.|A probability of 0.2 is odds of 1 to 4.
نسبة الأرجحية|Odds ratio|OR = (a d) / (b c)|oddsr|ca*cd_/(cb*cc_)|ca cb cc_ cd_|تستخدم كثيرًا في الدراسات الطبية.|Widely used in medical studies.
الخطر النسبي|Relative risk|RR = (a/(a + b)) / (c/(c + d))|rrisk|(ca/(ca+cb))/(cc_/(cc_+cd_))|ca cb cc_ cd_|كم مرة يزيد الخطر مع التعرض.|How many times exposure raises the risk.
`);
