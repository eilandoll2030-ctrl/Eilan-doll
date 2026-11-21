/* موسوعة معادلات إيلان — الإحصاء والاحتمالات */
EQ.syms(`
sumx|Σx|مجموع القيم|sum of values||250
sumx2|Σx²|مجموع مربعات القيم|sum of squares||13000
xv|x|القيمة|value||65
med|Q₂|الوسيط|median||50
q1|Q₁|الربيع الأدنى|lower quartile||40
q3|Q₃|الربيع الأعلى|upper quartile||60
xmax|x_max|أكبر قيمة|maximum||90
xmin|x_min|أصغر قيمة|minimum||10
varc|σ²|التباين|variance||100
kS|k|عدد النجاحات|number of successes||3
nT|n|عدد المحاولات|number of trials||10
lamP|λ|متوسط عدد الأحداث|mean rate||3
phat|p̂|نسبة العينة|sample proportion||0.55
p0|p₀|النسبة المفترضة|hypothesised proportion||0.5
zc|z*|القيمة الحرجة|critical value||1.96
Ebar|E|هامش الخطأ|margin of error||3
obs|O|القيمة المشاهدة|observed||30
expv|E|القيمة المتوقعة|expected||25
sxy|S_xy|مجموع حاصل ضرب الانحرافات|sum of cross-deviations||120
sxx|S_xx|مجموع مربعات انحرافات x|sum of squared x-deviations||100
syy|S_yy|مجموع مربعات انحرافات y|sum of squared y-deviations||200
rc|r|معامل الارتباط|correlation coefficient||0.85
mux|x̄|متوسط x|mean of x||5
muy|ȳ|متوسط y|mean of y||12
bhat|b|ميل خط الانحدار|regression slope||1.2
PBA|P(B‖A)|احتمال B بشرط A|P(B given A)||0.6
PnA|P(Aᶜ)|احتمال عدم A|P(not A)||0.5
rate2|λ|معدل الحدوث|rate||0.5
tt|t|قيمة t|t-value||2.1
s1|s₁|انحراف العينة الأولى|sample 1 sd||8
s2|s₂|انحراف العينة الثانية|sample 2 sd||10
n1|n₁|حجم العينة الأولى|sample 1 size||30
n2|n₂|حجم العينة الثانية|sample 2 size||35
xb1|x̄₁|متوسط العينة الأولى|sample 1 mean||72
xb2|x̄₂|متوسط العينة الثانية|sample 2 mean||68
dfree|df|درجات الحرية|degrees of freedom||9
`);

EQ.add('dsc',`
الوسط الحسابي|Arithmetic mean|x̄ = Σx / n|mean|sumx/nS|sumx nS|مجموع القيم ÷ عددها.|Sum of values ÷ how many.
التباين للمجتمع|Population variance|σ² = Σ(x − μ)² / N|varc|sumx2/nS-pow(sumx/nS,2)|sumx2 sumx nS|متوسط مربعات الانحرافات.|Mean of squared deviations.
الانحراف المعياري للمجتمع|Population standard deviation|σ = √(Σ(x − μ)² / N)|sd|sqrt(sumx2/nS-pow(sumx/nS,2))|sumx2 sumx nS|مدى تشتت البيانات.|How spread out the data are.
التباين للعينة|Sample variance|s² = Σ(x − x̄)² / (n − 1)|varc|(sumx2-sumx*sumx/nS)/(nS-1)|sumx2 sumx nS|نقسم على n − 1 (تصحيح بيسل).|Divide by n − 1 (Bessel’s correction).
الانحراف المعياري للعينة|Sample standard deviation|s = √(Σ(x − x̄)² / (n − 1))|sdx|sqrt((sumx2-sumx*sumx/nS)/(nS-1))|sumx2 sumx nS|للعينات.|For samples.
الدرجة المعيارية|z-score|z = (x − μ) / σ|zz|(xv-mu2)/sd|xv mu2 sd|كم انحراف معياري تبعد القيمة.|How many SDs from the mean.
القيمة من الدرجة المعيارية|Value from a z-score|x = μ + z σ|xv|mu2+zz*sd|mu2 zz sd|عكس العلاقة.|The inverse.
المدى|Range|R = x_max − x_min|res|xmax-xmin|xmax xmin|أبسط مقياس تشتت.|The simplest spread measure.
المدى الربيعي|Interquartile range|IQR = Q₃ − Q₁|res|q3-q1|q3 q1|يتأثر قليلًا بالقيم الشاذة.|Robust to outliers.
حد القيم الشاذة الأعلى|Upper outlier fence|Q₃ + 1.5 × IQR|res|q3+1.5*(q3-q1)|q3 q1|ما فوقه شاذ.|Above it is an outlier.
حد القيم الشاذة الأدنى|Lower outlier fence|Q₁ − 1.5 × IQR|res|q1-1.5*(q3-q1)|q1 q3|ما تحته شاذ.|Below it is an outlier.
معامل الاختلاف|Coefficient of variation|CV = σ / μ × 100%|res|sd/mu2*100|sd mu2|مقارنة التشتت بين مجموعات.|Comparing spread across groups.
الوسط من جدول تكراري|Mean from a frequency table|x̄ = Σfx / Σf|mean|sumx/nS|sumx nS|كل قيمة × تكرارها.|Each value times its frequency.
موقع الوسيط|Position of the median|(n + 1) / 2|res|(nS+1)/2|nS|بعد ترتيب البيانات.|After sorting.
موقع المئين|Position of a percentile|L = (P/100)(n + 1)|res|pct/100*(nS+1)|pct nS|مثل الربيع الأول P = 25.|Like Q₁ when P = 25.
معامل الالتواء (بيرسون)|Pearson’s skewness|Sk = 3(x̄ − Q₂) / σ|res|3*(mean-med)/sd|mean med sd|موجب = ذيل لليمين.|Positive means a right tail.
الوسط الموزون|Weighted mean|x̄_w = Σwx / Σw|mean|(0.3*70+0.7*90)/1||اختبار 30% ونهائي 70%.|Quiz 30%, final 70%.
المنوال|Mode|القيمة الأكثر تكرارًا||||ممكن أكثر من منوال.|There can be several.
التغاير|Covariance|cov(x,y) = Σ(x − x̄)(y − ȳ)/(n − 1)|res|sxy/(nS-1)|sxy nS|كيف يتغير متغيران معًا.|How two variables move together.
معامل ارتباط بيرسون|Pearson correlation coefficient|r = S_xy / √(S_xx S_yy)|rc|sxy/sqrt(sxx*syy)|sxy sxx syy|بين −1 و 1.|Between −1 and 1.
ميل خط الانحدار|Regression slope|b = S_xy / S_xx|bhat|sxy/sxx|sxy sxx|طريقة المربعات الصغرى.|Least squares.
مقطع خط الانحدار|Regression intercept|a = ȳ − b x̄|res|muy-bhat*mux|muy bhat mux|يمر بنقطة المتوسطين.|Passes through the means.
خط الانحدار|Regression line|ŷ = a + b x|yv|(muy-bhat*mux)+bhat*xv|muy bhat mux xv|للتنبؤ.|For prediction.
معامل التحديد|Coefficient of determination|R² = r²|res|rc*rc|rc|نسبة التباين المفسَّر.|Share of variance explained.
ارتباط سبيرمان|Spearman rank correlation|ρ = 1 − 6Σd² / (n(n² − 1))|res|1-6*20/(nS*(nS*nS-1))|nS|Σd² = 20 مثال.|Σd² = 20 example.
`);

EQ.add('prb',`
الاحتمال الكلاسيكي|Classical probability|P(A) = n(A) / n(S)|PA|kS/nT|kS nT|النتائج المناسبة ÷ الكل.|Favourable ÷ total.
الحدث المتمم|Complement rule|P(Aᶜ) = 1 − P(A)|PnA|1-PA|PA|احتمال عدم الوقوع.|Probability it doesn’t happen.
قاعدة الجمع|Addition rule|P(A ∪ B) = P(A) + P(B) − P(A ∩ B)|res|PA+PB-PAB|PA PB PAB|A أو B.|A or B.
الحدثان المتنافيان|Mutually exclusive events|P(A ∪ B) = P(A) + P(B)|res|PA+PB|PA PB|لا يقعان معًا.|Cannot both happen.
قاعدة الضرب للحدثين المستقلين|Independent events|P(A ∩ B) = P(A) P(B)|res|PA*PB|PA PB|A و B معًا.|A and B together.
قاعدة الضرب العامة|General multiplication rule|P(A ∩ B) = P(A) P(B‖A)|res|PA*PBA|PA PBA|للأحداث غير المستقلة.|For dependent events.
الاحتمال الشرطي|Conditional probability|P(B‖A) = P(A ∩ B) / P(A)|PBA|PAB/PA|PAB PA|احتمال B إذا عرفنا أن A وقع.|B given that A happened.
مبرهنة بايز|Bayes’ theorem|P(A‖B) = P(B‖A) P(A) / P(B)|res|PBA*PA/PB|PBA PA PB|تحديث الاحتمال بعد دليل جديد.|Updating belief with evidence.
قانون الاحتمال الكلي|Law of total probability|P(B) = P(B‖A)P(A) + P(B‖Aᶜ)P(Aᶜ)|res|PBA*PA+0.2*(1-PA)|PBA PA|P(B‖Aᶜ) = 0.2 مثال.|P(B‖Aᶜ) = 0.2 example.
القيمة المتوقعة|Expected value|E(X) = Σ x P(x)|res|1*0.2+2*0.5+3*0.3||متوسط النتيجة على المدى الطويل.|The long-run average.
التباين للمتغير العشوائي|Variance of a random variable|Var(X) = E(X²) − (E(X))²|res|(1*0.2+4*0.5+9*0.3)-pow(2.1,2)||تشتت المتغير العشوائي.|Spread of a random variable.
القيمة المتوقعة لتحويل خطي|Expectation of a linear transform|E(aX + b) = a E(X) + b|res|aa*mean+bb|aa mean bb|خاصية الخطية.|Linearity.
تباين تحويل خطي|Variance of a linear transform|Var(aX + b) = a² Var(X)|res|aa*aa*varc|aa varc|الإزاحة لا تغير التشتت.|Shifting doesn’t change spread.
احتمال ظهور وجه معيّن في نرد|Rolling a specific face|P = 1/6|res|1/6||نرد عادل.|A fair die.
احتمال مجموع 7 بنردين|Sum of 7 with two dice|P = 6/36 = 1/6|res|6/36||المجموع الأكثر احتمالًا.|The most likely sum.
احتمال صورتين في رميتين|Two heads in two flips|P = (½)² = ¼|res|pow(0.5,2)||رميات مستقلة.|Independent flips.
احتمال صورة واحدة على الأقل|At least one head in n flips|P = 1 − (½)ⁿ|res|1-pow(0.5,nT)|nT|عن طريق المتمم.|Using the complement.
مسألة عيد الميلاد|Birthday problem|P(تطابق) = 1 − 365!/((365 − n)! 365ⁿ)|res|1-(function(n){let p=1;for(let i=0;i<n;i++)p*=(365-i)/365;return p})(23)||23 شخصًا ⇒ أكثر من 50%!|23 people ⇒ over 50%!
الأرجحية (Odds)|Odds|odds = P / (1 − P)|res|PA/(1-PA)|PA|في المراهنات والطب.|Used in betting and medicine.
احتمال الأوراق (ورقة آس)|Drawing an ace|P = 4/52|res|4/52||من مجموعة ورق كاملة.|From a full deck.
احتمال الفوز في يانصيب|Lottery odds|P = 1 / C(n, k)|res|1/nCr(49,6)||6 من 49 ≈ 1 من 14 مليون.|6 of 49 ≈ 1 in 14 million.
مسألة مونتي هول|Monty Hall problem|P(الفوز بالتبديل) = 2/3|res|2/3||التبديل يضاعف فرصتك!|Switching doubles your chance!
القيمة المتوقعة للنرد|Expected roll of a die|E = 3.5|res|(1+2+3+4+5+6)/6||متوسط الأوجه.|Average of the faces.
احتمال الفشل حتى أول نجاح|Geometric probability|P(X = k) = (1 − p)ᵏ⁻¹ p|res|pow(1-pp,kS-1)*pp|pp kS|أول نجاح في المحاولة k.|First success on trial k.
الاحتمال الهندسي (المساحة)|Geometric probability (area)|P = مساحة المنطقة / المساحة الكلية|res|PI/4||نقطة عشوائية في مربع تقع داخل الدائرة.|A random point in a square landing in its circle.
`);

EQ.add('dst',`
توزيع ذي الحدين|Binomial distribution|P(X = k) = C(n,k) pᵏ (1 − p)ⁿ⁻ᵏ|res|nCr(nT,kS)*pow(pp,kS)*pow(1-pp,nT-kS)|nT kS pp|عدد النجاحات في n محاولة.|Successes in n trials.
متوسط ذي الحدين|Binomial mean|μ = n p|res|nT*pp|nT pp|العدد المتوقع للنجاحات.|Expected number of successes.
تباين ذي الحدين|Binomial variance|σ² = n p (1 − p)|varc|nT*pp*(1-pp)|nT pp|تشتت عدد النجاحات.|Spread of successes.
الانحراف المعياري لذي الحدين|Binomial standard deviation|σ = √(n p (1 − p))|sd|sqrt(nT*pp*(1-pp))|nT pp|الجذر التربيعي للتباين.|Square root of the variance.
توزيع بواسون|Poisson distribution|P(X = k) = λᵏ e^(−λ) / k!|res|pow(lamP,kS)*exp(-lamP)/fact(kS)|lamP kS|أحداث نادرة في فترة زمنية.|Rare events in an interval.
متوسط وتباين بواسون|Poisson mean and variance|μ = σ² = λ|res|lamP|lamP|متساويان.|They are equal.
التوزيع الطبيعي|Normal distribution density|f(x) = (1/(σ√2π)) e^(−(x − μ)²/(2σ²))|res|1/(sd*sqrt(2*PI))*exp(-pow(xv-mu2,2)/(2*sd*sd))|xv mu2 sd|منحنى الجرس.|The bell curve.
التوزيع الطبيعي المعياري|Standard normal density|φ(z) = (1/√2π) e^(−z²/2)|res|1/sqrt(2*PI)*exp(-zz*zz/2)|zz|μ = 0 و σ = 1.|μ = 0 and σ = 1.
القاعدة التجريبية|Empirical rule|68% ضمن ±1σ، 95% ضمن ±2σ، 99.7% ضمن ±3σ||||للبيانات الطبيعية.|For normal data.
التوزيع المنتظم المتصل|Continuous uniform density|f(x) = 1/(b − a)|res|1/(ub-ua)|ub ua|كل القيم متساوية الاحتمال.|All values equally likely.
متوسط التوزيع المنتظم|Uniform mean|μ = (a + b)/2|res|(ua+ub)/2|ua ub|منتصف الفترة.|Middle of the interval.
تباين التوزيع المنتظم|Uniform variance|σ² = (b − a)²/12|varc|pow(ub-ua,2)/12|ub ua|تشتت التوزيع المنتظم.|Spread of the uniform.
التوزيع الأسي|Exponential distribution|f(x) = λ e^(−λx)|res|rate2*exp(-rate2*xx)|rate2 xx|زمن الانتظار حتى حدث.|Waiting time until an event.
متوسط التوزيع الأسي|Exponential mean|μ = 1/λ|res|1/rate2|rate2|متوسط زمن الانتظار.|Average wait.
احتمال الانتظار أكثر من t|Exponential survival|P(X > t) = e^(−λt)|res|exp(-rate2*xx)|rate2 xx|لا ذاكرة له.|It is memoryless.
التوزيع الهندسي (المتوسط)|Geometric mean trials|E = 1/p|res|1/pp|pp|متوسط المحاولات حتى أول نجاح.|Average trials to first success.
التوزيع فوق الهندسي|Hypergeometric distribution|P = C(K,k) C(N−K,n−k) / C(N,n)|res|nCr(5,kS)*nCr(15,nT-kS)/nCr(20,nT)|kS nT|سحب بدون إرجاع (N = 20، K = 5).|Drawing without replacement (N = 20, K = 5).
تقريب ذي الحدين بالطبيعي|Normal approximation to binomial|z = (k − np)/√(np(1 − p))|zz|(kS-nT*pp)/sqrt(nT*pp*(1-pp))|kS nT pp|عندما n كبيرة.|When n is large.
توزيع متوسط العينة|Sampling distribution of the mean|σ_x̄ = σ / √n|SE|sd/sqrt(nS)|sd nS|متوسطات العينات أقل تشتتًا.|Sample means vary less.
نظرية النهاية المركزية|Central limit theorem|x̄ ~ N(μ, σ²/n)||||متوسطات العينات تتوزع طبيعيًا.|Sample means become normal.
توزيع كاي تربيع|Chi-square statistic|χ² = Σ(O − E)² / E|res|pow(obs-expv,2)/expv|obs expv|مقارنة المشاهد بالمتوقع (خلية واحدة).|Observed vs expected (one cell).
توزيع t|Student’s t statistic|t = (x̄ − μ) / (s/√n)|tt|(mean-mu2)/(sdx/sqrt(nS))|mean mu2 sdx nS|للعينات الصغيرة.|For small samples.
القيمة المتوقعة للتوزيع الطبيعي|Normal mean|E(X) = μ|res|mu2|mu2|مركز الجرس.|Centre of the bell.
نسبة تحت المنحنى حتى z = 1.96|Area to z = 1.96|Φ(1.96) ≈ 0.975|res|0.975||أساس فترة الثقة 95%.|Basis of the 95% interval.
`);

EQ.add('inf',`
الخطأ المعياري للمتوسط|Standard error of the mean|SE = s / √n|SE|sdx/sqrt(nS)|sdx nS|دقة تقدير المتوسط.|Precision of the mean.
فترة الثقة للمتوسط (الحد الأعلى)|Confidence interval for a mean (upper)|x̄ + z* s/√n|res|mean+zc*sdx/sqrt(nS)|mean zc sdx nS|95% عند z* = 1.96.|95% when z* = 1.96.
فترة الثقة للمتوسط (الحد الأدنى)|Confidence interval for a mean (lower)|x̄ − z* s/√n|res|mean-zc*sdx/sqrt(nS)|mean zc sdx nS|الحد الأدنى للفترة.|Lower end of the interval.
هامش الخطأ|Margin of error|E = z* σ / √n|Ebar|zc*sd/sqrt(nS)|zc sd nS|يقل بزيادة العينة.|Shrinks with bigger samples.
حجم العينة اللازم|Required sample size|n = (z* σ / E)²|nS|pow(zc*sd/Ebar,2)|zc sd Ebar|كم شخص نحتاج في الاستبيان.|How many people to survey.
الخطأ المعياري للنسبة|Standard error of a proportion|SE = √(p̂(1 − p̂)/n)|SE|sqrt(phat*(1-phat)/nS)|phat nS|في استطلاعات الرأي.|In opinion polls.
فترة الثقة للنسبة|Confidence interval for a proportion|p̂ ± z* √(p̂(1 − p̂)/n)|res|phat+zc*sqrt(phat*(1-phat)/nS)|phat zc nS|الحد الأعلى.|Upper end.
اختبار z للمتوسط|One-sample z-test|z = (x̄ − μ₀)/(σ/√n)|zz|(mean-mu2)/(sd/sqrt(nS))|mean mu2 sd nS|مقارنة متوسط بقيمة.|Comparing a mean to a value.
اختبار z للنسبة|One-proportion z-test|z = (p̂ − p₀)/√(p₀(1 − p₀)/n)|zz|(phat-p0)/sqrt(p0*(1-p0)/nS)|phat p0 nS|هل النسبة تختلف عن المتوقع؟|Does the proportion differ?
اختبار t لعينتين|Two-sample t-test|t = (x̄₁ − x̄₂)/√(s₁²/n₁ + s₂²/n₂)|tt|(xb1-xb2)/sqrt(s1*s1/n1+s2*s2/n2)|xb1 xb2 s1 n1 s2 n2|مقارنة مجموعتين.|Comparing two groups.
درجات الحرية لعينة|Degrees of freedom (one sample)|df = n − 1|dfree|nS-1|nS|لاختبار t.|For the t-test.
اختبار كاي تربيع للاستقلال|Chi-square test of independence|χ² = Σ(O − E)²/E||||هل المتغيران مرتبطان؟|Are two variables related?
القيمة المتوقعة في جدول التوافق|Expected count in a contingency table|E = (مجموع الصف × مجموع العمود)/المجموع الكلي|res|40*50/100||مثال: 40 × 50 / 100.|Example 40 × 50 / 100.
حجم الأثر (كوهين d)|Effect size (Cohen’s d)|d = (x̄₁ − x̄₂)/s|res|(xb1-xb2)/sdx|xb1 xb2 sdx|0.2 صغير، 0.8 كبير.|0.2 small, 0.8 large.
الخطأ من النوع الأول|Type I error|α = P(رفض H₀ ‖ H₀ صحيحة)||||إنذار كاذب.|A false alarm.
الخطأ من النوع الثاني|Type II error|β = P(قبول H₀ ‖ H₀ خاطئة)||||تفويت اكتشاف حقيقي.|Missing a real effect.
قوة الاختبار|Statistical power|القوة = 1 − β|res|1-0.2||عادة نهدف لـ 80%.|Usually aiming for 80%.
الخطأ المعياري للفرق|Standard error of a difference|SE = √(s₁²/n₁ + s₂²/n₂)|SE|sqrt(s1*s1/n1+s2*s2/n2)|s1 n1 s2 n2|لمقارنة متوسطين.|For comparing two means.
تصحيح بونفيروني|Bonferroni correction|α′ = α / m|res|0.05/nobj|nobj|عند إجراء عدة اختبارات.|When running many tests.
فترة التنبؤ في الانحدار|Prediction error (regression)|SE_pred ≈ s √(1 + 1/n)|res|sdx*sqrt(1+1/nS)|sdx nS|عدم اليقين في تنبؤ واحد.|Uncertainty of one prediction.
`);
