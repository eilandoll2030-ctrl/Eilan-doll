/* موسوعة معادلات إيلان — الرياضيات (1) */
EQ.syms(`
root|x|الجذر|root||1
yv|y|قيمة y|value of y||7
mm|m|الميل|slope||2
bb0|b|المقطع الصادي|y-intercept||1
pp2|p|العدد p|number p||3
qq2|q|العدد q|number q||4
ex|n|الأس|exponent||3
base2|b|الأساس|base||2
lgv|x|العدد داخل اللوغاريتم|argument||8
pct|p|النسبة المئوية|percentage|%|15
whole|W|الكل|whole||200
part|P|الجزء|part||30
old|a|القيمة القديمة|old value||80
nw|b|القيمة الجديدة|new value||100
ratio|r|النسبة|ratio||0.5
nterms|n|عدد الحدود|number of terms||10
rad2|r|نصف القطر|radius|cm|5
diam|d|القطر|diameter|cm|10
d1|d₁|القطر الأول|diagonal 1|cm|6
d2|d₂|القطر الثاني|diagonal 2|cm|8
aa2|a|القاعدة الصغرى|shorter base|cm|4
bb2|b|القاعدة الكبرى|longer base|cm|8
semi|s|نصف المحيط|semi-perimeter|cm|6
nside|n|عدد الأضلاع|number of sides||6
apo|a|العامد (الأبوثيم)|apothem|cm|4.33
angc|θ|الزاوية المركزية|central angle|°|60
sa|a|نصف المحور الأكبر|semi-major axis|cm|5
sbx|b|نصف المحور الأصغر|semi-minor axis|cm|3
r_in|r|نصف القطر الداخلي|inner radius|cm|3
r_out|R|نصف القطر الخارجي|outer radius|cm|5
SA|S|المساحة السطحية|surface area|cm²|94
slant|l|الارتفاع الجانبي (المائل)|slant height|cm|5
hh2|h|الارتفاع|height|cm|10
lw2|l|الطول|length|cm|5
wd2|w|العرض|width|cm|4
Bar|B|مساحة القاعدة|base area|cm²|16
gm|G|المتوسط الهندسي|geometric mean||6
hm|H|المتوسط التوافقي|harmonic mean||4.8
`);

EQ.add('alg',`
المعادلة الخطية|Linear equation|a x + b = 0|root|-bb/aa|aa bb|حلها x = −b/a.|Solution x = −b/a.
معادلة الخط المستقيم|Slope–intercept form|y = m x + b|yv|mm*xx+bb0|xx mm bb0|m الميل و b المقطع.|m is slope, b the intercept.
القانون العام للمعادلة التربيعية (الجذر الأول)|Quadratic formula (root 1)|x = (−b + √(b² − 4ac)) / 2a|root|(-bb+sqrt(bb*bb-4*aa*cc))/(2*aa)|aa bb cc|الجذر بالإشارة الموجبة.|The root with the plus sign.
القانون العام للمعادلة التربيعية (الجذر الثاني)|Quadratic formula (root 2)|x = (−b − √(b² − 4ac)) / 2a|root|(-bb-sqrt(bb*bb-4*aa*cc))/(2*aa)|aa bb cc|الجذر بالإشارة السالبة.|The root with the minus sign.
المميّز|Discriminant|Δ = b² − 4ac|res|bb*bb-4*aa*cc|aa bb cc|يحدد عدد الجذور الحقيقية.|Decides how many real roots.
الدالة التربيعية|Quadratic function|y = a x² + b x + c|yv|aa*xx*xx+bb*xx+cc|xx aa bb cc|منحنى على شكل قطع مكافئ.|A parabola-shaped curve.
رأس القطع المكافئ (x)|Vertex x-coordinate|x = −b / 2a|root|-bb/(2*aa)|aa bb|محور التماثل.|The axis of symmetry.
رأس القطع المكافئ (y)|Vertex y-coordinate|y = c − b² / 4a|yv|cc-bb*bb/(4*aa)|aa bb cc|أعلى أو أدنى قيمة.|The maximum or minimum value.
مجموع جذري التربيعية|Sum of quadratic roots|x₁ + x₂ = −b / a|res|-bb/aa|aa bb|علاقات فييتا.|Vieta’s formulas.
حاصل ضرب جذري التربيعية|Product of quadratic roots|x₁ x₂ = c / a|res|cc/aa|aa cc|علاقات فييتا.|Vieta’s formulas.
مربع المجموع|Square of a sum|(a + b)² = a² + 2ab + b²|res|pow(aa+bb,2)|aa bb|متطابقة شهيرة.|A well-known identity.
مربع الفرق|Square of a difference|(a − b)² = a² − 2ab + b²|res|pow(aa-bb,2)|aa bb|متطابقة شهيرة.|A well-known identity.
الفرق بين مربعين|Difference of squares|a² − b² = (a − b)(a + b)|res|aa*aa-bb*bb|aa bb|تحليل سريع.|A quick factorisation.
مكعب المجموع|Cube of a sum|(a + b)³ = a³ + 3a²b + 3ab² + b³|res|pow(aa+bb,3)|aa bb|من مثلث باسكال.|From Pascal’s triangle.
مكعب الفرق|Cube of a difference|(a − b)³ = a³ − 3a²b + 3ab² − b³|res|pow(aa-bb,3)|aa bb|من مثلث باسكال.|From Pascal’s triangle.
مجموع مكعبين|Sum of two cubes|a³ + b³ = (a + b)(a² − ab + b²)|res|pow(aa,3)+pow(bb,3)|aa bb|تحليل المكعبات.|Factoring cubes.
الفرق بين مكعبين|Difference of two cubes|a³ − b³ = (a − b)(a² + ab + b²)|res|pow(aa,3)-pow(bb,3)|aa bb|تحليل المكعبات.|Factoring cubes.
ذات الحدين|Binomial theorem|(a + b)ⁿ = Σ C(n,k) aⁿ⁻ᵏ bᵏ|res|pow(aa+bb,nn)|aa bb nn|المعاملات من مثلث باسكال.|Coefficients from Pascal’s triangle.
الحد العام في ذات الحدين|General binomial term|T = C(n,k) aⁿ⁻ᵏ bᵏ|res|nCr(nn,kk)*pow(aa,nn-kk)*pow(bb,kk)|nn kk aa bb|الحد رقم k + 1.|The (k + 1)-th term.
القيمة المطلقة|Absolute value|‖x‖ = x إذا x ≥ 0، و −x إذا x < 0|res|abs(xx)|xx|البعد عن الصفر.|Distance from zero.
النسبة المئوية|Percentage|P = p% × W|part|pct/100*whole|pct whole|جزء من الكل.|A part of the whole.
النسبة المئوية من جزء|Percent from a part|p = P / W × 100|pct|part/whole*100|part whole|كم نسبة الجزء.|What percent the part is.
نسبة التغير|Percent change|التغير = (b − a) / a × 100|pct|(nw-old)/old*100|old nw|زيادة أو نقصان.|Increase or decrease.
السعر بعد الخصم|Price after discount|السعر = a × (1 − p/100)|res|old*(1-pct/100)|old pct|خصم 15% مثلًا.|For example a 15% discount.
السعر مع الضريبة|Price with tax|السعر = a × (1 + p/100)|res|old*(1+pct/100)|old pct|ضريبة القيمة المضافة 15%.|15% VAT.
التناسب الطردي|Direct proportion|y = k x|yv|kk*xx|kk xx|كلما زاد x زاد y.|y grows with x.
التناسب العكسي|Inverse proportion|y = k / x|yv|kk/xx|kk xx|كلما زاد x قلّ y.|y shrinks as x grows.
النسبة والتناسب|Proportion (rule of three)|a/b = c/x ⇒ x = b c / a|root|bb*cc/aa|aa bb cc|الضرب التبادلي.|Cross-multiplication.
المتوسط الحسابي لعددين|Arithmetic mean of two numbers|(a + b) / 2|res|(aa+bb)/2|aa bb|النقطة الوسطى.|The midpoint.
المتوسط الهندسي|Geometric mean|G = √(a b)|gm|sqrt(abs(aa*bb))|aa bb|للنسب والنمو.|For ratios and growth.
المتوسط التوافقي|Harmonic mean|H = 2ab / (a + b)|hm|2*aa*bb/(aa+bb)|aa bb|لمتوسط السرعات.|For averaging speeds.
متباينة المتوسطات|AM–GM inequality|(a + b)/2 ≥ √(ab)||||المتوسط الحسابي ≥ الهندسي.|Arithmetic mean ≥ geometric mean.
متباينة المثلث|Triangle inequality|‖a + b‖ ≤ ‖a‖ + ‖b‖||||مجموع ضلعين أكبر من الثالث.|Two sides together beat the third.
متباينة كوشي-شوارز|Cauchy–Schwarz inequality|(Σaᵢbᵢ)² ≤ (Σaᵢ²)(Σbᵢ²)||||من أهم المتباينات.|One of the most important inequalities.
الجذر التربيعي|Square root|√x = x^(1/2)|res|sqrt(abs(xx))|xx|العدد الذي مربعه x.|The number whose square is x.
الجذر النوني|n-th root|ⁿ√x = x^(1/n)|res|pow(abs(xx),1/nn)|xx nn|الجذر التكعيبي عندما n = 3.|Cube root when n = 3.
ترشيد المقام|Rationalising a denominator|1/√a = √a / a|res|sqrt(aa)/aa|aa|إزالة الجذر من المقام.|Removing the root from the bottom.
حل نظام معادلتين (كريمر) — x|Two linear equations (Cramer) — x|x = (c₁b₂ − c₂b₁) / (a₁b₂ − a₂b₁)|root|(cc*2-5*bb)/(aa*2-1*bb)|aa bb cc|مثال: a₂ = 1، b₂ = 2، c₂ = 5.|Example a₂ = 1, b₂ = 2, c₂ = 5.
القسمة المطوّلة للحدود|Polynomial division|P(x) = D(x) Q(x) + R(x)||||المقسوم = المقسوم عليه × الناتج + الباقي.|Dividend = divisor × quotient + remainder.
نظرية الباقي|Remainder theorem|باقي قسمة P(x) على (x − a) = P(a)|res|pow(xx,3)-2*xx+1|xx|مثال P(x) = x³ − 2x + 1.|Example P(x) = x³ − 2x + 1.
نظرية العامل|Factor theorem|P(a) = 0 ⇔ (x − a) عامل||||للبحث عن الجذور.|For finding roots.
الدالة التكعيبية|Cubic function|y = a x³ + b x² + c x + d|yv|aa*pow(xx,3)+bb*xx*xx+cc*xx|xx aa bb cc|لها نقطة انعطاف.|Has an inflection point.
الدالة الكسرية|Rational function|y = 1 / x|yv|1/xx|xx|لها خطوط تقارب.|Has asymptotes.
دالة الجذر|Square-root function|y = √x|yv|sqrt(abs(xx))|xx|معرّفة لـ x ≥ 0.|Defined for x ≥ 0.
تركيب الدوال|Function composition|(f ∘ g)(x) = f(g(x))|res|pow(2*xx+1,2)|xx|مثال f(x) = x²، g(x) = 2x + 1.|Example f(x) = x², g(x) = 2x + 1.
الدالة العكسية للخطية|Inverse of a linear function|f⁻¹(x) = (x − b)/m|res|(xx-bb0)/mm|xx bb0 mm|تعكس عمل الدالة.|Undoes the function.
الإزاحة الرأسية|Vertical shift|y = f(x) + k|yv|xx*xx+kk|xx kk|تحريك المنحنى لأعلى.|Moves the graph up.
الإزاحة الأفقية|Horizontal shift|y = f(x − h)|yv|pow(xx-kk,2)|xx kk|تحريك المنحنى لليمين.|Moves the graph right.
المسافة على خط الأعداد|Distance on a number line|d = ‖a − b‖|res|abs(aa-bb)|aa bb|البعد بين عددين.|Gap between two numbers.
الكسر المركب|Adding fractions|a/b + c/d = (ad + bc)/(bd)|res|(aa*4+bb*cc)/(bb*4)|aa bb cc|مثال d = 4.|Example d = 4.
قاعدة الإشارات|Sign rules|(−)(−) = (+) ، (+)(−) = (−)||||أساس الحساب.|The basis of arithmetic.
خاصية التوزيع|Distributive law|a(b + c) = ab + ac|res|aa*(bb+cc)|aa bb cc|الضرب يتوزع على الجمع.|Multiplication spreads over addition.
الفرق بين قوتين|Difference of n-th powers|aⁿ − bⁿ = (a − b)(aⁿ⁻¹ + … + bⁿ⁻¹)|res|pow(aa,nn)-pow(bb,nn)|aa bb nn|تعميم الفرق بين مربعين.|Generalises the difference of squares.
الإكمال إلى مربع|Completing the square|x² + bx = (x + b/2)² − b²/4|res|pow(xx+bb/2,2)-bb*bb/4|xx bb|طريقة لحل التربيعيات.|A method for solving quadratics.
المتوسط الموزون|Weighted average|x̄ = Σwᵢxᵢ / Σwᵢ|res|(3*aa+1*bb)/4|aa bb|الأوزان 3 و 1 مثال.|Weights 3 and 1 example.
`);

EQ.add('exl',`
ضرب القوى|Product of powers|aᵐ × aⁿ = aᵐ⁺ⁿ|res|pow(base2,ex+nn)|base2 ex nn|نجمع الأسس.|Add the exponents.
قسمة القوى|Quotient of powers|aᵐ / aⁿ = aᵐ⁻ⁿ|res|pow(base2,ex-nn)|base2 ex nn|نطرح الأسس.|Subtract the exponents.
قوة القوة|Power of a power|(aᵐ)ⁿ = aᵐⁿ|res|pow(base2,ex*nn)|base2 ex nn|نضرب الأسس.|Multiply the exponents.
الأس الصفري|Zero exponent|a⁰ = 1|res|pow(base2,0)|base2|لأي عدد غير صفري.|For any non-zero number.
الأس السالب|Negative exponent|a⁻ⁿ = 1 / aⁿ|res|pow(base2,-nn)|base2 nn|مقلوب القوة.|The reciprocal power.
الأس الكسري|Fractional exponent|a^(m/n) = ⁿ√(aᵐ)|res|pow(base2,ex/nn)|base2 ex nn|الجذر والقوة معًا.|A root and a power together.
تعريف اللوغاريتم|Definition of logarithm|log_b x = y ⇔ bʸ = x|res|log(lgv)/log(base2)|lgv base2|اللوغاريتم أس.|A logarithm is an exponent.
لوغاريتم الضرب|Log of a product|log(xy) = log x + log y|res|log10(lgv*xx)|lgv xx|الضرب يصير جمع.|Multiplication becomes addition.
لوغاريتم القسمة|Log of a quotient|log(x/y) = log x − log y|res|log10(lgv/xx)|lgv xx|القسمة تصير طرح.|Division becomes subtraction.
لوغاريتم القوة|Log of a power|log(xⁿ) = n log x|res|nn*log10(lgv)|nn lgv|الأس يطلع قدام.|The exponent comes to the front.
تغيير الأساس|Change of base|log_b x = ln x / ln b|res|log(lgv)/log(base2)|lgv base2|حساب أي لوغاريتم بالآلة.|Computing any log on a calculator.
اللوغاريتم العشري|Common logarithm|log₁₀ x|res|log10(lgv)|lgv|أساس 10.|Base 10.
اللوغاريتم الطبيعي|Natural logarithm|ln x = logₑ x|res|log(lgv)|lgv|الأساس e ≈ 2.718.|Base e ≈ 2.718.
العدد e|Euler’s number|e = lim (1 + 1/n)ⁿ|res|pow(1+1/nn,nn)|nn|يقترب من 2.71828 كلما كبر n.|Approaches 2.71828 as n grows.
الدالة الأسية|Exponential function|y = aˣ|yv|pow(base2,xx)|xx base2|نمو سريع جدًا.|Very fast growth.
الدالة الأسية الطبيعية|Natural exponential|y = eˣ|yv|exp(xx)|xx|مشتقتها هي نفسها.|Its derivative is itself.
النمو الأسي|Exponential growth|N = N₀ e^(kt)|res|100*exp(0.1*xx)|xx|مثال N₀ = 100، k = 0.1.|Example N₀ = 100, k = 0.1.
الاضمحلال الأسي|Exponential decay|N = N₀ e^(−kt)|res|100*exp(-0.1*xx)|xx|مثل تبريد كوب الشاي.|Like a cup of tea cooling.
زمن المضاعفة|Doubling time|T = ln 2 / k|res|log(2)/0.07||بمعدل 7%: تتضاعف كل 10 فترات تقريبًا.|At 7%: doubles about every 10 periods.
قاعدة 72|Rule of 72|T ≈ 72 / p%|res|72/pct|pct|تقدير سريع لمضاعفة المال.|Quick estimate of money doubling.
حل معادلة أسية|Solving an exponential equation|bˣ = c ⇒ x = log c / log b|root|log(lgv)/log(base2)|lgv base2|بأخذ اللوغاريتم.|Take logs of both sides.
الدالة اللوغاريتمية|Logarithmic function|y = log_b x|yv|log(lgv)/log(base2)|lgv base2|عكس الدالة الأسية.|Inverse of the exponential.
اللوغاريتم الثنائي|Binary logarithm|log₂ x|res|log2(lgv)|lgv|مهم في الحاسب.|Important in computing.
الصيغة العلمية|Scientific notation|a × 10ⁿ، 1 ≤ a < 10|res|old*pow(10,ex)|old ex|للأعداد الكبيرة والصغيرة.|For huge and tiny numbers.
عدد خانات العدد|Number of digits|خانات = ⌊log₁₀ x⌋ + 1|res|floor(log10(lgv))+1|lgv|كم رقم في العدد.|How many digits a number has.
مقياس ريختر|Richter scale (energy ratio)|E₂/E₁ = 10^(1.5 ΔM)|res|pow(10,1.5*nn)|nn|كل درجة = طاقة أكبر ≈ 32 مرة.|Each step ≈ 32× the energy.|orbit
الدالة اللوجستية|Logistic function|y = L / (1 + e^(−k(x − x₀)))|yv|1/(1+exp(-xx))|xx|منحنى S.|An S-curve.
`);

EQ.add('seq',`
الحد النوني للمتتالية الحسابية|n-th term of an arithmetic sequence|aₙ = a₁ + (n − 1)d|an|a1+(nn-1)*dd|nn a1 dd|نضيف نفس العدد كل مرة.|Add the same number each time.
مجموع متتالية حسابية|Sum of an arithmetic series|Sₙ = n/2 (2a₁ + (n − 1)d)|Sn|nn/2*(2*a1+(nn-1)*dd)|nn a1 dd|طريقة غاوس.|Gauss’s trick.
مجموع حسابية بالحد الأخير|Arithmetic sum with last term|Sₙ = n (a₁ + aₙ) / 2|Sn|nn*(a1+an)/2|nn a1 an|الأول + الأخير × النصف.|First plus last, times half.
الحد النوني للمتتالية الهندسية|n-th term of a geometric sequence|aₙ = a₁ rⁿ⁻¹|an|a1*pow(rr2,nn-1)|nn a1 rr2|نضرب في نفس العدد كل مرة.|Multiply by the same number each time.
مجموع متتالية هندسية|Sum of a geometric series|Sₙ = a₁(1 − rⁿ)/(1 − r)|Sn|a1*(1-pow(rr2,nn))/(1-rr2)|nn a1 rr2|r ≠ 1.|r ≠ 1.
مجموع هندسية لا نهائية|Infinite geometric series|S = a₁ / (1 − r)|Sn|a1/(1-ratio)|a1 ratio|عندما ‖r‖ < 1.|When ‖r‖ < 1.
مجموع الأعداد الطبيعية|Sum of the first n naturals|1 + 2 + … + n = n(n + 1)/2|Sn|nn*(nn+1)/2|nn|1 إلى 100 = 5050.|1 to 100 = 5050.
مجموع المربعات|Sum of squares|Σk² = n(n + 1)(2n + 1)/6|Sn|nn*(nn+1)*(2*nn+1)/6|nn|مثل كومة كرات هرمية.|Like a pyramid of balls.
مجموع المكعبات|Sum of cubes|Σk³ = (n(n + 1)/2)²|Sn|pow(nn*(nn+1)/2,2)|nn|مربع مجموع الأعداد!|The square of the plain sum!
مجموع الأعداد الفردية|Sum of odd numbers|1 + 3 + … + (2n − 1) = n²|Sn|nn*nn|nn|مربعات كاملة.|Perfect squares.
مجموع الأعداد الزوجية|Sum of even numbers|2 + 4 + … + 2n = n(n + 1)|Sn|nn*(nn+1)|nn|ضعف مجموع الطبيعية.|Twice the natural sum.
متتالية فيبوناتشي|Fibonacci sequence|Fₙ = Fₙ₋₁ + Fₙ₋₂|an|round((pow((1+sqrt(5))/2,nn)-pow((1-sqrt(5))/2,nn))/sqrt(5))|nn|1، 1، 2، 3، 5، 8، 13…|1, 1, 2, 3, 5, 8, 13…
صيغة بينيه|Binet’s formula|Fₙ = (φⁿ − ψⁿ)/√5|an|(pow((1+sqrt(5))/2,nn)-pow((1-sqrt(5))/2,nn))/sqrt(5)|nn|حساب فيبوناتشي مباشرة.|Fibonacci directly.
النسبة الذهبية|Golden ratio|φ = (1 + √5)/2|res|(1+sqrt(5))/2||≈ 1.618 في الفن والطبيعة.|≈ 1.618 in art and nature.
الأعداد المثلثية|Triangular numbers|Tₙ = n(n + 1)/2|an|nn*(nn+1)/2|nn|1، 3، 6، 10…|1, 3, 6, 10…
الأعداد المربعة|Square numbers|Sₙ = n²|an|nn*nn|nn|1، 4، 9، 16…|1, 4, 9, 16…
الأعداد الخماسية|Pentagonal numbers|Pₙ = n(3n − 1)/2|an|nn*(3*nn-1)/2|nn|1، 5، 12، 22…|1, 5, 12, 22…
الأعداد المكعبة|Cube numbers|Cₙ = n³|an|nn*nn*nn|nn|1، 8، 27…|1, 8, 27…
المتسلسلة التوافقية|Harmonic series|Hₙ = 1 + 1/2 + … + 1/n ≈ ln n + 0.5772|Sn|log(nn)+0.5772|nn|تتباعد ببطء شديد.|Diverges very slowly.
متسلسلة بازل|Basel problem|Σ 1/k² = π²/6|Sn|PI*PI/6||حلها أويلر.|Solved by Euler.
متسلسلة لايبنتز|Leibniz series for π|1 − 1/3 + 1/5 − … = π/4|Sn|PI/4||طريقة لحساب π.|A way to compute π.
الوسط الحسابي بين حدين|Arithmetic mean term|b = (a + c)/2|res|(aa+cc)/2|aa cc|الحد الأوسط.|The middle term.
الوسط الهندسي بين حدين|Geometric mean term|b = √(a c)|res|sqrt(abs(aa*cc))|aa cc|في المتتالية الهندسية.|In a geometric sequence.
المتتالية التكرارية|Recursive sequence|aₙ₊₁ = r aₙ + d||||كل حد يعتمد على السابق.|Each term depends on the last.
اختبار النسبة للتقارب|Ratio test|L = lim ‖aₙ₊₁ / aₙ‖ ، L < 1 تتقارب||||لمعرفة هل المتسلسلة تتقارب.|Does a series converge?
`);

EQ.add('ge2',`
مساحة المربع|Area of a square|A = a²|area|side*side|side|الضلع × نفسه.|Side times itself.
محيط المربع|Perimeter of a square|P = 4a|per|4*side|side|أربعة أضلاع متساوية.|Four equal sides.
قطر المربع|Diagonal of a square|d = a√2|res|side*sqrt(2)|side|من فيثاغورس.|From Pythagoras.
مساحة المستطيل|Area of a rectangle|A = l × w|area|lw*wd|lw wd|الطول × العرض.|Length times width.
محيط المستطيل|Perimeter of a rectangle|P = 2(l + w)|per|2*(lw+wd)|lw wd|ضعف مجموع البعدين.|Twice length plus width.
قطر المستطيل|Diagonal of a rectangle|d = √(l² + w²)|res|sqrt(lw*lw+wd*wd)|lw wd|فيثاغورس.|Pythagoras.
مساحة المثلث|Area of a triangle|A = ½ b h|area|0.5*base*hh|base hh|نصف القاعدة × الارتفاع.|Half base times height.
مساحة المثلث بضلعين وزاوية|Triangle area (two sides and angle)|A = ½ a b sin C|area|0.5*side*sb*sin(rad(ang))|side sb ang|بدون ارتفاع.|No height needed.
قانون هيرون|Heron’s formula (triangle)|A = √(s(s − a)(s − b)(s − c))|area|sqrt(semi*(semi-side)*(semi-sb)*(semi-sc))|semi side sb sc|s نصف المحيط.|s is the semi-perimeter.
نصف محيط المثلث|Semi-perimeter of a triangle|s = (a + b + c)/2|semi|(side+sb+sc)/2|side sb sc|لقانون هيرون.|For Heron’s formula.
محيط المثلث|Perimeter of a triangle|P = a + b + c|per|side+sb+sc|side sb sc|مجموع الأضلاع.|Sum of sides.
مجموع زوايا المثلث|Angle sum of a triangle|A + B + C = 180°|ang|180-60-ang|ang|الزاوية الثالثة إذا كانت إحداها 60°.|Third angle when one is 60°.
مساحة مثلث متساوي الأضلاع|Equilateral triangle area|A = (√3/4) a²|area|sqrt(3)/4*side*side|side|كل الأضلاع متساوية.|All sides equal.
ارتفاع مثلث متساوي الأضلاع|Equilateral triangle height|h = (√3/2) a|hh|sqrt(3)/2*side|side|من المنتصف.|From the midpoint.
نظرية فيثاغورس|Pythagorean theorem (triangle)|c² = a² + b²|sc|sqrt(side*side+sb*sb)|side sb|في المثلث القائم.|In a right triangle.
ضلع قائم من فيثاغورس|Missing leg (Pythagoras)|a = √(c² − b²)|side|sqrt(sc*sc-sb*sb)|sc sb|إيجاد ضلع ناقص.|Finding a missing side.
مساحة متوازي الأضلاع|Area of a parallelogram|A = b h|area|base*hh|base hh|القاعدة × الارتفاع.|Base times height.
مساحة المعيّن|Area of a rhombus|A = d₁ d₂ / 2|area|d1*d2/2|d1 d2|نصف حاصل ضرب القطرين.|Half the product of diagonals.
مساحة شبه المنحرف|Area of a trapezoid|A = ½ (a + b) h|area|0.5*(aa2+bb2)*hh|aa2 bb2 hh|متوسط القاعدتين × الارتفاع.|Average of bases times height.
مساحة الطائرة الورقية|Area of a kite|A = d₁ d₂ / 2|area|d1*d2/2|d1 d2|مثل المعيّن.|Same as a rhombus.
مساحة الدائرة|Area of a circle|A = π r²|area|PI*rad2*rad2|rad2|π ≈ 3.14159.|π ≈ 3.14159.
محيط الدائرة|Circumference of a circle|C = 2π r|per|2*PI*rad2|rad2|أو π × القطر.|Or π times the diameter.
مساحة الدائرة بالقطر|Circle area from diameter|A = π d² / 4|area|PI*diam*diam/4|diam|صيغة بالقطر.|Using the diameter.
طول القوس|Arc length|s = (θ/360) × 2π r|res|angc/360*2*PI*rad2|angc rad2|جزء من المحيط.|A slice of the circumference.
مساحة القطاع الدائري|Area of a sector|A = (θ/360) × π r²|area|angc/360*PI*rad2*rad2|angc rad2|مثل قطعة البيتزا.|Like a pizza slice.
مساحة القطاع بالراديان|Sector area (radians)|A = ½ r² θ|area|0.5*rad2*rad2*radn|rad2 radn|θ بالراديان.|θ in radians.
مساحة القطعة الدائرية|Area of a circular segment|A = ½ r² (θ − sin θ)|area|0.5*rad2*rad2*(rad(angc)-sin(rad(angc)))|rad2 angc|بين الوتر والقوس.|Between chord and arc.
طول الوتر|Chord length|c = 2 r sin(θ/2)|res|2*rad2*sin(rad(angc)/2)|rad2 angc|المستقيم بين نقطتين على الدائرة.|Straight line between two points on a circle.
مساحة الحلقة|Area of an annulus|A = π (R² − r²)|area|PI*(r_out*r_out-r_in*r_in)|r_out r_in|مثل الكعكة الدائرية.|Like a doughnut shape.
مساحة القطع الناقص|Area of an ellipse|A = π a b|area|PI*sa*sbx|sa sbx|دائرة ممطوطة.|A stretched circle.
محيط القطع الناقص (رامانوجان)|Ellipse perimeter (Ramanujan)|P ≈ π(3(a + b) − √((3a + b)(a + 3b)))|per|PI*(3*(sa+sbx)-sqrt((3*sa+sbx)*(sa+3*sbx)))|sa sbx|تقريب دقيق جدًا.|A very accurate approximation.
مساحة مضلع منتظم|Area of a regular polygon|A = ½ × P × a|area|0.5*nside*side*apo|nside side apo|نصف المحيط × العامد.|Half the perimeter times apothem.
مساحة مضلع منتظم بالضلع|Regular polygon area (side)|A = n a² / (4 tan(π/n))|area|nside*side*side/(4*tan(PI/nside))|nside side|بدون عامد.|No apothem needed.
مساحة السداسي المنتظم|Area of a regular hexagon|A = (3√3/2) a²|area|3*sqrt(3)/2*side*side|side|خلايا النحل.|Honeycomb cells.
مجموع زوايا المضلع الداخلية|Interior angle sum of a polygon|S = (n − 2) × 180°|res|(nside-2)*180|nside|المثلث 180، المربع 360.|Triangle 180, square 360.
الزاوية الداخلية لمضلع منتظم|Interior angle of a regular polygon|θ = (n − 2) × 180° / n|ang|(nside-2)*180/nside|nside|السداسي 120°.|A hexagon has 120°.
الزاوية الخارجية لمضلع منتظم|Exterior angle of a regular polygon|θ = 360° / n|ang|360/nside|nside|مجموعها دائمًا 360°.|They always sum to 360°.
عدد أقطار المضلع|Number of diagonals of a polygon|D = n(n − 3)/2|res|nside*(nside-3)/2|nside|السداسي له 9 أقطار.|A hexagon has 9 diagonals.
نصف قطر الدائرة المحيطة بمثلث|Circumradius of a triangle|R = a b c / (4A)|rd|side*sb*sc/(4*area)|side sb sc area|تمر بالرؤوس الثلاثة.|Through all three vertices.
نصف قطر الدائرة الداخلية لمثلث|Inradius of a triangle|r = A / s|rd|area/semi|area semi|تمس الأضلاع الثلاثة.|Touches all three sides.
قانون الجيوب|Law of sines|a/sin A = b/sin B = c/sin C|side|sb*sin(rad(ang))/sin(rad(60))|sb ang|إيجاد ضلع من زاويتين (B = 60°).|Finding a side from angles (B = 60°).
قانون جيوب التمام|Law of cosines|c² = a² + b² − 2ab cos C|sc|sqrt(side*side+sb*sb-2*side*sb*cos(rad(ang)))|side sb ang|تعميم فيثاغورس.|Generalises Pythagoras.
زاوية من قانون جيوب التمام|Angle from the law of cosines|cos C = (a² + b² − c²)/(2ab)|ang|deg(acos((side*side+sb*sb-sc*sc)/(2*side*sb)))|side sb sc|إيجاد زاوية من ثلاثة أضلاع.|An angle from three sides.
تشابه المثلثات|Similar triangles|a₁/a₂ = b₁/b₂ = c₁/c₂|side|sb*2|sb|نسبة التشابه 2 مثال.|Scale factor 2 example.
نسبة المساحات في التشابه|Area ratio of similar shapes|A₁/A₂ = k²|area|area*kk*kk|area kk|ضاعف الأبعاد = مساحة 4 أضعاف.|Double lengths, four times the area.
قاعدة طاليس (منتصف الضلعين)|Midsegment theorem|القطعة الواصلة = ½ الضلع الثالث|res|sc/2|sc|توازي الضلع الثالث.|Parallel to the third side.
زاوية محيطية|Inscribed angle theorem|الزاوية المحيطية = ½ المركزية|ang|angc/2|angc|على نفس القوس.|On the same arc.
قوة النقطة|Power of a point|PA × PB = PC × PD||||للأوتار المتقاطعة.|For intersecting chords.
صيغة بيك|Pick’s theorem|A = I + B/2 − 1|area|5+8/2-1||مضلع على شبكة نقاط (I = 5، B = 8).|Polygon on a dot grid (I = 5, B = 8).
مساحة المثلث بالإحداثيات|Triangle area from coordinates|A = ½ ‖x₁(y₂ − y₃) + x₂(y₃ − y₁) + x₃(y₁ − y₂)‖|area|0.5*abs(x1*(y2-0)+x2*(0-y1)+0)|x1 y1 x2 y2|الرأس الثالث في الأصل.|Third vertex at the origin.
`);

EQ.add('ge3',`
حجم المكعب|Volume of a cube|V = a³|vol|side*side*side|side|الضلع مكعب.|Side cubed.
المساحة السطحية للمكعب|Surface area of a cube|S = 6a²|SA|6*side*side|side|ستة أوجه مربعة.|Six square faces.
قطر المكعب|Space diagonal of a cube|d = a√3|res|side*sqrt(3)|side|من زاوية لزاوية مقابلة.|Corner to opposite corner.
حجم متوازي المستطيلات|Volume of a cuboid|V = l w h|vol|lw2*wd2*hh2|lw2 wd2 hh2|مثل صندوق.|Like a box.
المساحة السطحية لمتوازي المستطيلات|Surface area of a cuboid|S = 2(lw + lh + wh)|SA|2*(lw2*wd2+lw2*hh2+wd2*hh2)|lw2 wd2 hh2|مساحة كرتون التغليف.|The cardboard needed.
قطر متوازي المستطيلات|Diagonal of a cuboid|d = √(l² + w² + h²)|res|sqrt(lw2*lw2+wd2*wd2+hh2*hh2)|lw2 wd2 hh2|فيثاغورس في ثلاثة أبعاد.|Pythagoras in 3D.
حجم الكرة|Volume of a sphere|V = 4/3 π r³|vol|4/3*PI*pow(rad2,3)|rad2|أرخميدس.|Archimedes.
المساحة السطحية للكرة|Surface area of a sphere|S = 4π r²|SA|4*PI*rad2*rad2|rad2|أربعة أضعاف مساحة دائرتها.|Four times its circle.
حجم نصف الكرة|Volume of a hemisphere|V = 2/3 π r³|vol|2/3*PI*pow(rad2,3)|rad2|نصف الكرة.|Half a sphere.
المساحة السطحية لنصف الكرة|Surface area of a hemisphere|S = 3π r²|SA|3*PI*rad2*rad2|rad2|مع القاعدة المسطحة.|Including the flat base.
حجم الأسطوانة|Volume of a cylinder|V = π r² h|vol|PI*rad2*rad2*hh2|rad2 hh2|مثل علبة المشروب.|Like a drink can.
المساحة الجانبية للأسطوانة|Lateral area of a cylinder|S = 2π r h|SA|2*PI*rad2*hh2|rad2 hh2|الملصق حول العلبة.|The label around a can.
المساحة الكلية للأسطوانة|Total surface area of a cylinder|S = 2π r (r + h)|SA|2*PI*rad2*(rad2+hh2)|rad2 hh2|مع القاعدتين.|With both ends.
حجم المخروط|Volume of a cone|V = 1/3 π r² h|vol|PI*rad2*rad2*hh2/3|rad2 hh2|ثلث الأسطوانة.|A third of the cylinder.
الارتفاع الجانبي للمخروط|Slant height of a cone|l = √(r² + h²)|slant|sqrt(rad2*rad2+hh2*hh2)|rad2 hh2|من فيثاغورس.|From Pythagoras.
المساحة الجانبية للمخروط|Lateral area of a cone|S = π r l|SA|PI*rad2*slant|rad2 slant|بدون القاعدة.|Without the base.
المساحة الكلية للمخروط|Total surface area of a cone|S = π r (r + l)|SA|PI*rad2*(rad2+slant)|rad2 slant|مع القاعدة.|With the base.
حجم الهرم|Volume of a pyramid|V = 1/3 B h|vol|Bar*hh2/3|Bar hh2|ثلث المنشور.|A third of the prism.
حجم الهرم المربع|Volume of a square pyramid|V = 1/3 a² h|vol|side*side*hh2/3|side hh2|مثل أهرامات الجيزة.|Like the Giza pyramids.
المساحة السطحية للهرم المربع|Surface area of a square pyramid|S = a² + 2 a l|SA|side*side+2*side*slant|side slant|القاعدة + أربعة مثلثات.|Base plus four triangles.
حجم المنشور|Volume of a prism|V = B h|vol|Bar*hh2|Bar hh2|مساحة القاعدة × الارتفاع.|Base area times height.
حجم المنشور الثلاثي|Volume of a triangular prism|V = ½ b h_t × L|vol|0.5*base*hh*lw2|base hh lw2|مثل خيمة.|Like a tent.
حجم المخروط الناقص|Volume of a frustum|V = 1/3 π h (R² + Rr + r²)|vol|PI*hh2/3*(r_out*r_out+r_out*r_in+r_in*r_in)|hh2 r_out r_in|مثل الكأس أو الدلو.|Like a cup or bucket.
حجم الحلقة (الطارة)|Volume of a torus|V = 2π² R r²|vol|2*PI*PI*r_out*r_in*r_in|r_out r_in|شكل الدونات.|A doughnut shape.
المساحة السطحية للطارة|Surface area of a torus|S = 4π² R r|SA|4*PI*PI*r_out*r_in|r_out r_in|سطح الدونات.|A doughnut’s surface.
حجم الشكل البيضاوي|Volume of an ellipsoid|V = 4/3 π a b c|vol|4/3*PI*sa*sbx*rad2|sa sbx rad2|مثل حبة البيض.|Like an egg.
حجم القبة الكروية|Volume of a spherical cap|V = (π h² / 3)(3r − h)|vol|PI*hh*hh/3*(3*rad2-hh)|hh rad2|قطعة من الكرة.|A slice of a sphere.
حجم رباعي الأوجه المنتظم|Volume of a regular tetrahedron|V = a³ / (6√2)|vol|pow(side,3)/(6*sqrt(2))|side|أربعة مثلثات متساوية.|Four equal triangles.
حجم ثماني الأوجه المنتظم|Volume of a regular octahedron|V = (√2/3) a³|vol|sqrt(2)/3*pow(side,3)|side|مثل هرمين ملتصقين.|Like two pyramids joined.
صيغة أويلر للمجسمات|Euler’s polyhedron formula|V − E + F = 2|res|8-12+6||المكعب: 8 رؤوس − 12 حرفًا + 6 أوجه = 2.|Cube: 8 − 12 + 6 = 2.
مبدأ كافاليري|Cavalieri’s principle|مقاطع متساوية ⇒ حجوم متساوية||||المجسمات المائلة لها نفس الحجم.|Slanted solids keep their volume.
نسبة الحجوم في التشابه|Volume ratio of similar solids|V₁/V₂ = k³|vol|vol*kk*kk*kk|vol kk|ضاعف الأبعاد = حجم 8 أضعاف.|Double lengths, eight times the volume.
الحجم باللتر|Volume in litres|1 L = 1000 cm³|res|vol/1000|vol|تحويل الحجوم.|Converting volumes.
المسافة في الفضاء|Distance between 3D points|d = √(Δx² + Δy² + Δz²)|res|sqrt(pow(x2-x1,2)+pow(y2-y1,2)+9)|x1 y1 x2 y2|Δz = 3 مثال.|Δz = 3 example.
حجم الأسطوانة المجوفة|Volume of a hollow cylinder|V = π h (R² − r²)|vol|PI*hh2*(r_out*r_out-r_in*r_in)|hh2 r_out r_in|مثل الأنبوب.|Like a pipe.
`);
