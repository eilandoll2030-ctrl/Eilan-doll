/* موسوعة معادلات إيلان — جدول المشتقات والتكاملات، المتسلسلات، الأيونات والمركبات */
EQ.syms(`
xs|x|قيمة x|value of x||0.5
nterm|n|عدد الحدود|number of terms||6
approx|≈|القيمة التقريبية|approximation||1.6487
`);

EQ.add('tbd',`
مشتقة sin(ax)|Derivative of sin(ax)|d/dx sin(ax) = a cos(ax)||||المعامل a يطلع قدام (قاعدة السلسلة).|The factor a comes out front (chain rule).
مشتقة cos(ax)|Derivative of cos(ax)|d/dx cos(ax) = −a sin(ax)||||نفس الفكرة مع إشارة سالبة.|Same idea with a minus sign.
مشتقة e^(ax)|Derivative of e^(ax)|d/dx e^(ax) = a e^(ax)||||الأسية تبقى نفسها مضروبة في a.|The exponential stays, times a.
مشتقة ln(ax)|Derivative of ln(ax)|d/dx ln(ax) = 1/x||||الثابت a يختفي!|The constant a disappears!
مشتقة ln(f(x))|Derivative of ln f(x)|d/dx ln f = f′ / f||||المشتقة اللوغاريتمية.|The logarithmic derivative.
مشتقة e^(f(x))|Derivative of e^f(x)|d/dx e^f = f′ e^f||||قاعدة السلسلة مع الأسية.|Chain rule with an exponential.
مشتقة (ax + b)ⁿ|Derivative of (ax + b)ⁿ|d/dx (ax + b)ⁿ = n a (ax + b)ⁿ⁻¹||||قوة ثم مشتقة الداخل.|Power, then the derivative of the inside.
مشتقة الجذر التربيعي لدالة|Derivative of √f(x)|d/dx √f = f′ / (2√f)||||حالة خاصة من قاعدة القوة.|A special case of the power rule.
مشتقة 1/f(x)|Derivative of 1/f(x)|d/dx (1/f) = −f′ / f²||||قاعدة المقلوب.|The reciprocal rule.
مشتقة xⁿ ln x|Derivative of xⁿ ln x|d/dx (xⁿ ln x) = xⁿ⁻¹(n ln x + 1)||||ضرب دالتين.|A product of two functions.
مشتقة x eˣ|Derivative of x eˣ|d/dx (x eˣ) = eˣ(x + 1)||||قاعدة الضرب.|Product rule.
مشتقة tanh|Derivative of tanh|d/dx tanh x = sech²x||||تشبه مشتقة tan.|Looks like the derivative of tan.
مشتقة coth|Derivative of coth|d/dx coth x = −csch²x||||مقلوب tanh.|The reciprocal of tanh.
مشتقة sech|Derivative of sech|d/dx sech x = −sech x tanh x||||تشبه مشتقة sec مع إشارة.|Like sec’s derivative, with a sign change.
مشتقة csch|Derivative of csch|d/dx csch x = −csch x coth x||||الدوال الزائدية.|Hyperbolic functions.
مشتقة arcsinh|Derivative of arsinh|d/dx sinh⁻¹x = 1/√(x² + 1)||||معكوس sinh.|Inverse of sinh.
مشتقة arccosh|Derivative of arcosh|d/dx cosh⁻¹x = 1/√(x² − 1)||||لـ x > 1.|For x > 1.
مشتقة arctanh|Derivative of artanh|d/dx tanh⁻¹x = 1/(1 − x²)||||لـ ‖x‖ < 1.|For ‖x‖ < 1.
مشتقة arccot|Derivative of arccot|d/dx cot⁻¹x = −1/(1 + x²)||||عكس إشارة مشتقة arctan.|The negative of arctan’s derivative.
مشتقة arcsec|Derivative of arcsec|d/dx sec⁻¹x = 1/(‖x‖√(x² − 1))||||لـ ‖x‖ > 1.|For ‖x‖ > 1.
مشتقة arccsc|Derivative of arccsc|d/dx csc⁻¹x = −1/(‖x‖√(x² − 1))||||لـ ‖x‖ > 1.|For ‖x‖ > 1.
مشتقة sin²x|Derivative of sin²x|d/dx sin²x = 2 sin x cos x = sin 2x||||تطلع ضعف الزاوية.|Gives the double angle.
مشتقة cos²x|Derivative of cos²x|d/dx cos²x = −sin 2x||||عكس مشتقة sin²x.|The negative of sin²x’s derivative.
مشتقة الدالة العكسية|Derivative of an inverse function|(f⁻¹)′(y) = 1 / f′(x)||||ميل المعكوس مقلوب الميل.|The inverse’s slope is the reciprocal slope.
مشتقة الدالة الوسيطية|Derivative of a parametric curve|dy/dx = (dy/dt) / (dx/dt)||||للمنحنيات المكتوبة بدلالة t.|For curves written in terms of t.
المشتقة الثانية للمنحنى الوسيطي|Second derivative of a parametric curve|d²y/dx² = (d/dt (dy/dx)) / (dx/dt)||||التقعر في المنحنيات الوسيطية.|Concavity of parametric curves.
مشتقة المنحنى القطبي|Slope of a polar curve|dy/dx = (r′ sin θ + r cos θ)/(r′ cos θ − r sin θ)||||ميل منحنى r = f(θ).|Slope of the curve r = f(θ).
قاعدة لايبنتز للضرب|Leibniz rule for products|(f g)⁽ⁿ⁾ = Σ C(n,k) f⁽ᵏ⁾ g⁽ⁿ⁻ᵏ⁾||||المشتقة النونية للضرب.|The n-th derivative of a product.
مشتقة التكامل (لايبنتز)|Differentiating an integral (Leibniz)|d/dx ∫ₐ^(g(x)) f(t) dt = f(g(x)) g′(x)||||النظرية الأساسية مع قاعدة السلسلة.|The fundamental theorem with the chain rule.
المشتقة الكلية|Total derivative|df = (∂f/∂x) dx + (∂f/∂y) dy||||تغير الدالة لما يتغير كل المتغيرات.|How f changes when every variable changes.
قاعدة السلسلة لعدة متغيرات|Multivariable chain rule|dz/dt = (∂z/∂x)(dx/dt) + (∂z/∂y)(dy/dt)||||مسار يمر بعدة متغيرات.|A path through several variables.
المشتقة الاتجاهية|Directional derivative|D_u f = ∇f · u||||معدل التغير في اتجاه معين.|Rate of change in a chosen direction.
مصفوفة هيسيان|Hessian matrix|H = [∂²f/∂xᵢ∂xⱼ]||||تحدد نوع النقاط الحرجة في عدة متغيرات.|Classifies critical points in several variables.
اختبار المشتقة الثانية لمتغيرين|Second-derivative test in two variables|D = f_xx f_yy − f_xy²||||D > 0 و f_xx > 0 ⇐ صغرى.|D > 0 and f_xx > 0 ⇒ minimum.
مضاعفات لاغرانج|Lagrange multipliers|∇f = λ ∇g||||أفضل قيمة مع شرط.|Best value under a constraint.
اللابلاسيان|Laplacian|∇²f = ∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z²||||يظهر في الحرارة والموجات والكهرباء.|Appears in heat, waves and electricity.
التباعد|Divergence|∇·F = ∂P/∂x + ∂Q/∂y + ∂R/∂z||||كم الحقل ينتشر من نقطة.|How much a field spreads out from a point.
الدوران (الكرل)|Curl|∇×F = (R_y − Q_z, P_z − R_x, Q_x − P_y)||||كم الحقل يدور حول نقطة.|How much a field swirls around a point.
`);

EQ.add('tbi',`
تكامل sin(ax)|Integral of sin(ax)|∫sin(ax) dx = −cos(ax)/a + C||||اقسم على a.|Divide by a.
تكامل cos(ax)|Integral of cos(ax)|∫cos(ax) dx = sin(ax)/a + C||||اقسم على a.|Divide by a.
تكامل e^(ax)|Integral of e^(ax)|∫e^(ax) dx = e^(ax)/a + C||||عكس المشتقة.|The reverse of the derivative.
تكامل 1/(ax + b)|Integral of 1/(ax + b)|∫dx/(ax + b) = (1/a) ln‖ax + b‖ + C||||لوغاريتم مقسوم على a.|A log divided by a.
تكامل (ax + b)ⁿ|Integral of (ax + b)ⁿ|∫(ax + b)ⁿ dx = (ax + b)ⁿ⁺¹ / (a(n + 1)) + C||||لـ n ≠ −1.|For n ≠ −1.
تكامل csc²x|Integral of csc²x|∫csc²x dx = −cot x + C||||عكس مشتقة cot.|Reverse of cot’s derivative.
تكامل sec x tan x|Integral of sec x tan x|∫sec x tan x dx = sec x + C||||عكس مشتقة sec.|Reverse of sec’s derivative.
تكامل csc x cot x|Integral of csc x cot x|∫csc x cot x dx = −csc x + C||||عكس مشتقة csc.|Reverse of csc’s derivative.
تكامل cot x|Integral of cot x|∫cot x dx = ln‖sin x‖ + C||||cos/sin والبسط مشتقة المقام.|cos/sin: the top is the bottom’s derivative.
تكامل csc x|Integral of csc x|∫csc x dx = ln‖csc x − cot x‖ + C||||مثل sec بإشارة مختلفة.|Like sec, with different signs.
تكامل sin²x|Integral of sin²x|∫sin²x dx = x/2 − sin 2x / 4 + C||||نستخدم متطابقة نصف الزاوية.|Uses the half-angle identity.
تكامل cos²x|Integral of cos²x|∫cos²x dx = x/2 + sin 2x / 4 + C||||نصف الزاوية مرة ثانية.|Half-angle again.
تكامل tan²x|Integral of tan²x|∫tan²x dx = tan x − x + C||||tan² = sec² − 1.|tan² = sec² − 1.
تكامل sin x cos x|Integral of sin x cos x|∫sin x cos x dx = sin²x / 2 + C||||تعويض u = sin x.|Substitute u = sin x.
تكامل x eˣ|Integral of x eˣ|∫x eˣ dx = eˣ(x − 1) + C||||بالتجزئة.|By parts.
تكامل x sin x|Integral of x sin x|∫x sin x dx = sin x − x cos x + C||||بالتجزئة.|By parts.
تكامل x cos x|Integral of x cos x|∫x cos x dx = cos x + x sin x + C||||بالتجزئة.|By parts.
تكامل x ln x|Integral of x ln x|∫x ln x dx = x²/2 ln x − x²/4 + C||||بالتجزئة مع u = ln x.|By parts with u = ln x.
تكامل eˣ sin x|Integral of eˣ sin x|∫eˣ sin x dx = eˣ(sin x − cos x)/2 + C||||التجزئة مرتين وترجع للأصل.|By parts twice; it loops back.
تكامل eˣ cos x|Integral of eˣ cos x|∫eˣ cos x dx = eˣ(sin x + cos x)/2 + C||||نفس الحيلة.|The same trick.
تكامل 1/(a² + x²)|Integral of 1/(a² + x²)|∫dx/(a² + x²) = (1/a) tan⁻¹(x/a) + C||||تعميم arctan.|A general arctan.
تكامل 1/√(a² − x²)|Integral of 1/√(a² − x²)|∫dx/√(a² − x²) = sin⁻¹(x/a) + C||||تعميم arcsin.|A general arcsin.
تكامل 1/(x² − a²)|Integral of 1/(x² − a²)|∫dx/(x² − a²) = (1/2a) ln‖(x − a)/(x + a)‖ + C||||بالكسور الجزئية.|By partial fractions.
تكامل 1/√(x² + a²)|Integral of 1/√(x² + a²)|∫dx/√(x² + a²) = ln‖x + √(x² + a²)‖ + C||||يساوي sinh⁻¹(x/a).|Equals sinh⁻¹(x/a).
تكامل √(a² − x²)|Integral of √(a² − x²)|∫√(a² − x²) dx = (x/2)√(a² − x²) + (a²/2) sin⁻¹(x/a) + C||||مساحة جزء من دائرة.|Area of part of a circle.
تكامل cosh|Integral of cosh|∫cosh x dx = sinh x + C||||مثل cos بدون إشارة سالبة.|Like cos without a minus sign.
تكامل tanh|Integral of tanh|∫tanh x dx = ln(cosh x) + C||||البسط مشتقة المقام.|The top is the bottom’s derivative.
تكامل sech²|Integral of sech²|∫sech²x dx = tanh x + C||||عكس مشتقة tanh.|Reverse of tanh’s derivative.
تكامل arctan x|Integral of arctan x|∫tan⁻¹x dx = x tan⁻¹x − ½ ln(1 + x²) + C||||بالتجزئة.|By parts.
تكامل arcsin x|Integral of arcsin x|∫sin⁻¹x dx = x sin⁻¹x + √(1 − x²) + C||||بالتجزئة.|By parts.
تكامل f′/f|Integral of f′/f|∫f′(x)/f(x) dx = ln‖f(x)‖ + C||||أشهر حيلة في التكامل.|The most famous integration trick.
تكامل لوغاريتمي مضاعف|Integral of 1/(x ln x)|∫dx/(x ln x) = ln‖ln x‖ + C||||تعويض u = ln x.|Substitute u = ln x.
تكامل الدالة الفردية على فترة متماثلة|Odd function on a symmetric interval|∫₋ₐᵃ f(x) dx = 0||||إذا f(−x) = −f(x).|If f(−x) = −f(x).
تكامل الدالة الزوجية على فترة متماثلة|Even function on a symmetric interval|∫₋ₐᵃ f(x) dx = 2∫₀ᵃ f(x) dx||||إذا f(−x) = f(x).|If f(−x) = f(x).
تكامل دالة غاما|Gamma function|Γ(n) = ∫₀^∞ tⁿ⁻¹ e⁻ᵗ dt = (n − 1)!||||يعمم المضروب للأعداد الحقيقية.|Extends the factorial to real numbers.
تكامل xⁿe^(−x) من الصفر للمالانهاية|Integral of xⁿe^(−x) from 0 to ∞|∫₀^∞ xⁿ e^(−x) dx = n!||||حالة خاصة من غاما.|A special case of Gamma.
تكامل e^(−ax²)|Integral of e^(−ax²)|∫₋∞^∞ e^(−ax²) dx = √(π/a)||||تعميم تكامل غاوس.|A general Gaussian integral.
تكامل sin x / x|Dirichlet integral|∫₀^∞ (sin x / x) dx = π/2||||تكامل مشهور ما له مقابل بسيط.|A famous integral with no simple antiderivative.
مساحة سطح الدوران|Surface area of revolution|S = 2π ∫ₐᵇ f(x) √(1 + f′²) dx||||مساحة الجسم الناتج عن لف منحنى.|Area of the shape made by spinning a curve.
مركز الثقل لمنطقة|Centroid of a region|x̄ = (1/A) ∫ x (f − g) dx||||نقطة توازن الشكل.|The balance point of a shape.
طول المنحنى الوسيطي|Arc length of a parametric curve|L = ∫ √((dx/dt)² + (dy/dt)²) dt||||للمنحنيات بدلالة t.|For curves in terms of t.
المساحة في الإحداثيات القطبية|Area in polar coordinates|A = ½ ∫ r² dθ||||مساحة منحنى r = f(θ).|Area enclosed by r = f(θ).
التكامل الثنائي القطبي|Double integral in polar form|∬ f dA = ∬ f(r, θ) r dr dθ||||لا تنسَ r الزائدة!|Don’t forget the extra r!
التكامل الثلاثي الكروي|Triple integral in spherical form|dV = ρ² sin φ dρ dφ dθ||||لحساب حجوم الكرات.|For volumes of spheres.
`);

EQ.add('ser',`
متسلسلة eˣ (تقريب)|Series for eˣ (approximation)|eˣ ≈ Σₖ₌₀ⁿ⁻¹ xᵏ / k!|approx|(()=>{let s=0;for(let k=0;k<Math.round(nterm);k++)s+=pow(xs,k)/fact(k);return s})()|xs nterm|زِد عدد الحدود وشوف التقريب يقرب من eˣ.|Add terms and watch it approach eˣ.
متسلسلة sin x (تقريب)|Series for sin x (approximation)|sin x ≈ Σ (−1)ᵏ x²ᵏ⁺¹ / (2k + 1)!|approx|(()=>{let s=0;for(let k=0;k<Math.round(nterm);k++)s+=pow(-1,k)*pow(xs,2*k+1)/fact(2*k+1);return s})()|xs nterm|x بالراديان.|x in radians.
متسلسلة cos x (تقريب)|Series for cos x (approximation)|cos x ≈ Σ (−1)ᵏ x²ᵏ / (2k)!|approx|(()=>{let s=0;for(let k=0;k<Math.round(nterm);k++)s+=pow(-1,k)*pow(xs,2*k)/fact(2*k);return s})()|xs nterm|x بالراديان.|x in radians.
متسلسلة arctan x|Series for arctan x|tan⁻¹x = x − x³/3 + x⁵/5 − …|approx|(()=>{let s=0;for(let k=0;k<Math.round(nterm);k++)s+=pow(-1,k)*pow(xs,2*k+1)/(2*k+1);return s})()|xs nterm|لـ ‖x‖ ≤ 1.|For ‖x‖ ≤ 1.
متسلسلة sinh x|Series for sinh x|sinh x = x + x³/3! + x⁵/5! + …|approx|(()=>{let s=0;for(let k=0;k<Math.round(nterm);k++)s+=pow(xs,2*k+1)/fact(2*k+1);return s})()|xs nterm|مثل sin بدون إشارات سالبة.|Like sin with no minus signs.
متسلسلة cosh x|Series for cosh x|cosh x = 1 + x²/2! + x⁴/4! + …|approx|(()=>{let s=0;for(let k=0;k<Math.round(nterm);k++)s+=pow(xs,2*k)/fact(2*k);return s})()|xs nterm|مثل cos بدون إشارات سالبة.|Like cos with no minus signs.
متسلسلة 1/(1 + x)|Series for 1/(1 + x)|1/(1 + x) = 1 − x + x² − x³ + …|approx|(()=>{let s=0;for(let k=0;k<Math.round(nterm);k++)s+=pow(-xs,k);return s})()|xs nterm|لـ ‖x‖ < 1.|For ‖x‖ < 1.
متسلسلة ذات الحدين العامة|General binomial series|(1 + x)ᵃ = 1 + a x + a(a − 1)x²/2! + …||||تعمل حتى لو a كسر أو سالب.|Works even for fractional or negative a.
متسلسلة √(1 + x)|Series for √(1 + x)|√(1 + x) = 1 + x/2 − x²/8 + x³/16 − …||||حالة a = ½.|The case a = ½.
متسلسلة tan x|Series for tan x|tan x = x + x³/3 + 2x⁵/15 + …||||لـ ‖x‖ < π/2.|For ‖x‖ < π/2.
متسلسلة arcsin x|Series for arcsin x|sin⁻¹x = x + x³/6 + 3x⁵/40 + …||||لـ ‖x‖ ≤ 1.|For ‖x‖ ≤ 1.
متسلسلة ماكلورين|Maclaurin series|f(x) = Σ f⁽ⁿ⁾(0) xⁿ / n!||||تايلور حول الصفر.|Taylor series about zero.
حد الباقي في تايلور (لاغرانج)|Taylor remainder (Lagrange)|Rₙ = f⁽ⁿ⁺¹⁾(c) (x − a)ⁿ⁺¹ / (n + 1)!||||كم الخطأ في التقريب.|How big the approximation error is.
صيغة أويلر|Euler’s formula|e^(iθ) = cos θ + i sin θ||||تربط الأسية بالمثلثات.|Links exponentials with trigonometry.
متسلسلة فورييه|Fourier series|f(x) = a₀/2 + Σ (aₙ cos nx + bₙ sin nx)||||أي موجة = مجموع موجات جيبية.|Any wave is a sum of sine waves.
معاملات فورييه|Fourier coefficients|aₙ = (1/π) ∫₋π^π f(x) cos nx dx||||تحدد قوة كل موجة.|They give the strength of each wave.
متسلسلة المتناوبة (اختبار لايبنتز)|Alternating series test|Σ(−1)ⁿ bₙ تتقارب إذا bₙ ↓ 0||||الحدود تصغر وتتناوب.|Terms shrink and alternate.
اختبار الجذر|Root test|L = lim ⁿ√‖aₙ‖ ، L < 1 تتقارب||||مفيد مع القوى.|Handy with powers.
اختبار المقارنة|Comparison test|0 ≤ aₙ ≤ bₙ و Σbₙ تتقارب ⇐ Σaₙ تتقارب||||قارن بمتسلسلة تعرفها.|Compare with a series you know.
اختبار التكامل|Integral test|Σ f(n) و ∫ f(x) dx يتقاربان معًا||||إذا f موجبة ومتناقصة.|If f is positive and decreasing.
متسلسلة p|p-series|Σ 1/nᵖ تتقارب إذا p > 1||||p = 1 هي المتسلسلة التوافقية المتباعدة.|p = 1 is the divergent harmonic series.
نصف قطر التقارب|Radius of convergence|R = 1 / lim ‖aₙ₊₁ / aₙ‖||||متى تشتغل متسلسلة القوى.|Where a power series works.
مجموع حاصل ضرب واليس|Wallis product|π/2 = (2·2·4·4·6·6…)/(1·3·3·5·5·7…)||||ضرب لا نهائي يعطي π.|An infinite product that gives π.
متسلسلة رامانجان لـ π|Ramanujan series for π|1/π = (2√2/9801) Σ (4k)!(1103 + 26390k)/((k!)⁴ 396⁴ᵏ)||||كل حد يضيف حوالي 8 أرقام صحيحة.|Each term adds about 8 correct digits.
`);

EQ.add('ion',`
أيون الهيدرونيوم|Hydronium ion|H₃O⁺||||سر الحموضة في الماء.|The source of acidity in water.
أيون الهيدروكسيد|Hydroxide ion|OH⁻||||سر القاعدية.|The source of basicity.
أيون الأمونيوم|Ammonium ion|NH₄⁺||||في الأسمدة.|Found in fertilisers.
أيون الكربونات|Carbonate ion|CO₃²⁻||||في الحجر الجيري والأصداف.|In limestone and shells.
أيون البيكربونات|Bicarbonate ion|HCO₃⁻||||ينظم حموضة الدم.|Keeps blood pH steady.
أيون الكبريتات|Sulfate ion|SO₄²⁻||||في الجبس.|In gypsum.
أيون الكبريتيت|Sulfite ion|SO₃²⁻||||مادة حافظة في بعض الأطعمة.|A preservative in some foods.
أيون النترات|Nitrate ion|NO₃⁻||||سماد مهم للنبات.|An important plant nutrient.
أيون النتريت|Nitrite ion|NO₂⁻||||يستخدم في حفظ اللحوم.|Used to cure meat.
أيون الفوسفات|Phosphate ion|PO₄³⁻||||في العظام والحمض النووي.|In bones and DNA.
أيون الأسيتات|Acetate ion|CH₃COO⁻||||من الخل.|From vinegar.
أيون البرمنغنات|Permanganate ion|MnO₄⁻||||لونه بنفسجي قوي.|Deep purple in colour.
أيون الدايكرومات|Dichromate ion|Cr₂O₇²⁻||||برتقالي ويتحول للأخضر.|Orange, turns green when reduced.
أيون الكرومات|Chromate ion|CrO₄²⁻||||لونه أصفر.|Yellow in colour.
أيون السيانيد|Cyanide ion|CN⁻||||سام جدًا.|Highly toxic.
أيون الهيبوكلوريت|Hypochlorite ion|ClO⁻||||في المبيض.|In bleach.
أيون الكلورات|Chlorate ion|ClO₃⁻||||في الألعاب النارية.|In fireworks.
أيون البيركلورات|Perchlorate ion|ClO₄⁻||||وقود صلب للصواريخ.|Solid rocket propellant.
أيون الأكسالات|Oxalate ion|C₂O₄²⁻||||في السبانخ.|In spinach.
أيون الثيوسلفات|Thiosulfate ion|S₂O₃²⁻||||في تحميض الصور.|Used in photo developing.
أيون البيروكسيد|Peroxide ion|O₂²⁻||||رابطة O–O ضعيفة.|A weak O–O bond.
كلوريد الصوديوم (ملح الطعام)|Sodium chloride (table salt)|NaCl||||Na⁺ + Cl⁻.|Na⁺ + Cl⁻.
بيكربونات الصوديوم (بيكنج صودا)|Sodium bicarbonate (baking soda)|NaHCO₃||||في المطبخ وكمضاد حموضة.|In the kitchen and as an antacid.
كربونات الكالسيوم (الطباشير)|Calcium carbonate (chalk)|CaCO₃||||الطباشير والرخام والأصداف.|Chalk, marble and shells.
هيدروكسيد الصوديوم (الصودا الكاوية)|Sodium hydroxide (caustic soda)|NaOH||||لصناعة الصابون وفتح المجاري.|For soap-making and unblocking drains.
حمض الكبريتيك|Sulfuric acid|H₂SO₄||||أكثر مادة كيميائية تُصنع في العالم.|The world’s most-produced chemical.
حمض الهيدروكلوريك|Hydrochloric acid|HCl||||موجود في معدتك.|Present in your stomach.
حمض النيتريك|Nitric acid|HNO₃||||للأسمدة والمتفجرات.|For fertilisers and explosives.
حمض الفوسفوريك|Phosphoric acid|H₃PO₄||||في المشروبات الغازية.|In fizzy drinks.
حمض الستريك|Citric acid|C₆H₈O₇||||حموضة الليمون.|The sourness of lemons.
الأمونيا|Ammonia|NH₃||||رائحتها قوية، وفي المنظفات.|Strong smell; in cleaners.
بيروكسيد الهيدروجين|Hydrogen peroxide|H₂O₂||||مطهر الجروح.|A wound disinfectant.
كبريتات النحاس|Copper(II) sulfate|CuSO₄·5H₂O||||بلورات زرقاء جميلة.|Beautiful blue crystals.
نترات الفضة|Silver nitrate|AgNO₃||||للكشف عن الكلوريد.|Used to test for chloride.
كلوريد الكالسيوم|Calcium chloride|CaCl₂||||لإذابة الجليد في الطرق.|Melts ice on roads.
كبريتات المغنيسيوم (ملح إبسوم)|Magnesium sulfate (Epsom salt)|MgSO₄·7H₂O||||في أملاح الحمام.|In bath salts.
أكسيد الحديد الثلاثي (الصدأ)|Iron(III) oxide (rust)|Fe₂O₃||||اللون البني المحمر.|The reddish-brown colour.
ثاني أكسيد التيتانيوم|Titanium dioxide|TiO₂||||اللون الأبيض في الدهانات وواقي الشمس.|The white in paint and sunscreen.
ثاني أكسيد السيليكون (الرمل)|Silicon dioxide (sand)|SiO₂||||الرمل والكوارتز والزجاج.|Sand, quartz and glass.
أكسيد الألمنيوم|Aluminium oxide|Al₂O₃||||الياقوت والصنفرة.|Rubies, sapphires and sandpaper.
كلوريد البوتاسيوم|Potassium chloride|KCl||||بديل الملح.|A salt substitute.
فلوريد الصوديوم|Sodium fluoride|NaF||||في معجون الأسنان.|In toothpaste.
الجبس|Gypsum|CaSO₄·2H₂O||||مادة البناء والجبائر.|Building plaster and casts.
أكسيد الكالسيوم (الجير الحي)|Calcium oxide (quicklime)|CaO||||يسخن جدًا مع الماء.|Gets very hot with water.
هيدروكسيد الكالسيوم (ماء الجير)|Calcium hydroxide (limewater)|Ca(OH)₂||||يتعكر مع CO₂.|Turns cloudy with CO₂.
أول أكسيد الكربون|Carbon monoxide|CO||||غاز سام بلا لون ولا رائحة.|A toxic gas with no colour or smell.
ثاني أكسيد الكبريت|Sulfur dioxide|SO₂||||يسبب المطر الحمضي.|Causes acid rain.
ثاني أكسيد النيتروجين|Nitrogen dioxide|NO₂||||غاز بني في ضباب المدن.|A brown gas in city smog.
أكسيد النيتروز|Nitrous oxide|N₂O||||غاز الضحك.|Laughing gas.
كبريتيد الهيدروجين|Hydrogen sulfide|H₂S||||رائحة البيض الفاسد.|Smells of rotten eggs.
`);
