/* موسوعة معادلات إيلان — الرياضيات (2) */
EQ.syms(`
A_|A|الزاوية A|angle A|°|40
B_|B|الزاوية B|angle B|°|25
opp|المقابل|الضلع المقابل|opposite side||3
adj|المجاور|الضلع المجاور|adjacent side||4
hyp|الوتر|الوتر|hypotenuse||5
sv|s|قيمة الجيب|sine value||0.5
cvv|c|قيمة جيب التمام|cosine value||0.5
tv|t|قيمة الظل|tangent value||1
xa|x|نقطة الحساب|point x||2
hdx|h|خطوة صغيرة|small step||0.001
ua|a|الحد الأدنى للتكامل|lower limit||0
ub|b|الحد الأعلى للتكامل|upper limit||2
kc|k|ثابت|constant||3
ux|u_x|المركبة x للمتجه u|u x-component||3
uy|u_y|المركبة y للمتجه u|u y-component||4
uz|u_z|المركبة z للمتجه u|u z-component||0
wx|v_x|المركبة x للمتجه v|v x-component||1
wy|v_y|المركبة y للمتجه v|v y-component||2
wz|v_z|المركبة z للمتجه v|v z-component||2
m11|a|العنصر a|entry a||2
m12|b|العنصر b|entry b||1
m21|c|العنصر c|entry c||5
m22|d|العنصر d|entry d||3
re|a|الجزء الحقيقي|real part||3
im|b|الجزء التخيلي|imaginary part||4
re2|c|الجزء الحقيقي الثاني|second real part||1
im2|d|الجزء التخيلي الثاني|second imaginary part||2
modz|r|مقياس العدد المركب|modulus||5
argz|θ|سعة العدد المركب|argument|°|53.13
xc|h|إحداثي x للمركز|centre x||1
yc|k|إحداثي y للمركز|centre y||2
Ac|A|معامل x|coefficient A||3
Bc2|B|معامل y|coefficient B||4
Cc|C|الحد الثابت|constant C||-5
px|p|البعد البؤري للقطع المكافئ|focal parameter||2
ecc|e|الاختلاف المركزي|eccentricity||0.6
nobj|n|عدد العناصر|number of items||5
robj|r|عدد المختارين|number chosen||2
gcd1|a|العدد الأول|first number||48
gcd2|b|العدد الثاني|second number||36
pn2|p|عدد أولي|prime||7
sets|n(A)|عدد عناصر A|size of A||10
setsB|n(B)|عدد عناصر B|size of B||8
setsAB|n(A∩B)|العناصر المشتركة|size of A∩B||3
bits|n|عدد البتات|number of bits||8
Vx|V|عدد الرؤوس|vertices||8
Ex|E|عدد الأحرف|edges||12
`);

EQ.add('trg',`
الجيب في المثلث القائم|Sine in a right triangle|sin θ = المقابل / الوتر|sv|opp/hyp|opp hyp|SOH.|SOH.
جيب التمام في المثلث القائم|Cosine in a right triangle|cos θ = المجاور / الوتر|cvv|adj/hyp|adj hyp|CAH.|CAH.
الظل في المثلث القائم|Tangent in a right triangle|tan θ = المقابل / المجاور|tv|opp/adj|opp adj|TOA.|TOA.
القاطع|Secant|sec θ = 1 / cos θ|res|1/cos(rad(ang))|ang|مقلوب جيب التمام.|Reciprocal of cosine.
قاطع التمام|Cosecant|csc θ = 1 / sin θ|res|1/sin(rad(ang))|ang|مقلوب الجيب.|Reciprocal of sine.
ظل التمام|Cotangent|cot θ = 1 / tan θ|res|1/tan(rad(ang))|ang|مقلوب الظل.|Reciprocal of tangent.
دالة الجيب|Sine function|y = sin x|yv|sin(rad(ang))|ang|موجة تتكرر كل 360°.|A wave repeating every 360°.
دالة جيب التمام|Cosine function|y = cos x|yv|cos(rad(ang))|ang|الجيب مزاح 90°.|Sine shifted by 90°.
دالة الظل|Tangent function|y = tan x|yv|tan(rad(ang))|ang|تتكرر كل 180°.|Repeats every 180°.
المتطابقة الأساسية|Pythagorean identity|sin²θ + cos²θ = 1|res|pow(sin(rad(ang)),2)+pow(cos(rad(ang)),2)|ang|دائمًا 1.|Always 1.
متطابقة الظل والقاطع|Tangent–secant identity|1 + tan²θ = sec²θ|res|1+pow(tan(rad(ang)),2)|ang|من القسمة على cos².|Divide by cos².
متطابقة ظل التمام|Cotangent–cosecant identity|1 + cot²θ = csc²θ|res|1+pow(1/tan(rad(ang)),2)|ang|من القسمة على sin².|Divide by sin².
الظل بدلالة الجيب|Tangent as a ratio|tan θ = sin θ / cos θ|tv|sin(rad(ang))/cos(rad(ang))|ang|تعريف أساسي.|A basic definition.
جيب المجموع|Sine of a sum|sin(A + B) = sin A cos B + cos A sin B|res|sin(rad(A_+B_))|A_ B_|صيغ الجمع.|Addition formulas.
جيب الفرق|Sine of a difference|sin(A − B) = sin A cos B − cos A sin B|res|sin(rad(A_-B_))|A_ B_|صيغ الطرح.|Subtraction formulas.
جيب تمام المجموع|Cosine of a sum|cos(A + B) = cos A cos B − sin A sin B|res|cos(rad(A_+B_))|A_ B_|لاحظ الإشارة السالبة.|Note the minus sign.
جيب تمام الفرق|Cosine of a difference|cos(A − B) = cos A cos B + sin A sin B|res|cos(rad(A_-B_))|A_ B_|لاحظ الإشارة الموجبة.|Note the plus sign.
ظل المجموع|Tangent of a sum|tan(A + B) = (tan A + tan B)/(1 − tan A tan B)|res|tan(rad(A_+B_))|A_ B_|صيغة الظل.|The tangent formula.
ظل الفرق|Tangent of a difference|tan(A − B) = (tan A − tan B)/(1 + tan A tan B)|res|tan(rad(A_-B_))|A_ B_|صيغة الظل.|The tangent formula.
جيب ضعف الزاوية|Double-angle sine|sin 2θ = 2 sin θ cos θ|res|sin(2*rad(ang))|ang|مفيدة في المقذوفات.|Useful for projectiles.
جيب تمام ضعف الزاوية|Double-angle cosine|cos 2θ = cos²θ − sin²θ = 1 − 2sin²θ|res|cos(2*rad(ang))|ang|لها ثلاث صور.|Has three forms.
ظل ضعف الزاوية|Double-angle tangent|tan 2θ = 2tan θ / (1 − tan²θ)|res|tan(2*rad(ang))|ang|من صيغة المجموع.|From the sum formula.
جيب نصف الزاوية|Half-angle sine|sin(θ/2) = ±√((1 − cos θ)/2)|res|sqrt((1-cos(rad(ang)))/2)|ang|الإشارة حسب الربع.|Sign depends on the quadrant.
جيب تمام نصف الزاوية|Half-angle cosine|cos(θ/2) = ±√((1 + cos θ)/2)|res|sqrt((1+cos(rad(ang)))/2)|ang|الإشارة حسب الربع.|Sign depends on the quadrant.
ظل نصف الزاوية|Half-angle tangent|tan(θ/2) = sin θ / (1 + cos θ)|res|sin(rad(ang))/(1+cos(rad(ang)))|ang|بدون جذور.|No square roots.
جيب ثلاثة أضعاف الزاوية|Triple-angle sine|sin 3θ = 3 sin θ − 4 sin³θ|res|sin(3*rad(ang))|ang|صيغة مفيدة.|A handy formula.
جيب تمام ثلاثة أضعاف|Triple-angle cosine|cos 3θ = 4cos³θ − 3cos θ|res|cos(3*rad(ang))|ang|صيغة مفيدة.|A handy formula.
تحويل الضرب لجمع (جيب×جيب تمام)|Product to sum (sin cos)|sin A cos B = ½[sin(A+B) + sin(A−B)]|res|sin(rad(A_))*cos(rad(B_))|A_ B_|لتبسيط التكاملات.|Simplifies integrals.
تحويل الضرب لجمع (جيب تمام×جيب تمام)|Product to sum (cos cos)|cos A cos B = ½[cos(A−B) + cos(A+B)]|res|cos(rad(A_))*cos(rad(B_))|A_ B_|صيغ التحويل.|Conversion formulas.
تحويل الضرب لجمع (جيب×جيب)|Product to sum (sin sin)|sin A sin B = ½[cos(A−B) − cos(A+B)]|res|sin(rad(A_))*sin(rad(B_))|A_ B_|صيغ التحويل.|Conversion formulas.
تحويل الجمع لضرب|Sum to product (sines)|sin A + sin B = 2 sin((A+B)/2) cos((A−B)/2)|res|sin(rad(A_))+sin(rad(B_))|A_ B_|تفسّر الضربات الصوتية.|Explains acoustic beats.
تحويل الدرجات إلى راديان|Degrees to radians|θ(rad) = θ° × π / 180|radn|dg*PI/180|dg|180° = π.|180° = π.
تحويل الراديان إلى درجات|Radians to degrees|θ° = θ(rad) × 180 / π|dg|radn*180/PI|radn|1 rad ≈ 57.3°.|1 rad ≈ 57.3°.
الجيب العكسي|Inverse sine|θ = sin⁻¹(x)|ang|deg(asin(sv))|sv|بين −90° و 90°.|Between −90° and 90°.
جيب التمام العكسي|Inverse cosine|θ = cos⁻¹(x)|ang|deg(acos(cvv))|cvv|بين 0° و 180°.|Between 0° and 180°.
الظل العكسي|Inverse tangent|θ = tan⁻¹(x)|ang|deg(atan(tv))|tv|بين −90° و 90°.|Between −90° and 90°.
الجيب للزاوية السالبة|Sine is odd|sin(−θ) = −sin θ|res|sin(-rad(ang))|ang|دالة فردية.|An odd function.
جيب التمام للزاوية السالبة|Cosine is even|cos(−θ) = cos θ|res|cos(-rad(ang))|ang|دالة زوجية.|An even function.
الزوايا المتتامة|Complementary angles|sin(90° − θ) = cos θ|res|sin(rad(90-ang))|ang|سبب اسم جيب «التمام».|Why it is called co-sine.
الموجة الجيبية العامة|General sinusoid|y = A sin(B(x − C)) + D|yv|2*sin(rad(ang))+1|ang|A السعة، 2π/B الدورة.|A amplitude, 2π/B period.
دورة الدالة الجيبية|Period of a sinusoid|T = 2π / B|res|2*PI/kk|kk|كم تطول الموجة.|How long one cycle is.
مساحة المثلث بالجيب|Triangle area with sine|A = ½ a b sin C|area|0.5*side*sb*sin(rad(ang))|side sb ang|بدون ارتفاع.|Without a height.
صيغة أويلر للمثلثات|Euler’s formula (trig)|e^(iθ) = cos θ + i sin θ||||تربط الأسس بالمثلثات.|Links exponentials and trigonometry.
متطابقة أويلر|Euler’s identity|e^(iπ) + 1 = 0||||أجمل معادلة في الرياضيات.|Often called the most beautiful equation.
قيم الزوايا الخاصة (30°)|Special angle 30°|sin 30° = ½، cos 30° = √3/2، tan 30° = 1/√3|res|sin(rad(30))||احفظها!|Worth memorising!
قيم الزوايا الخاصة (45°)|Special angle 45°|sin 45° = cos 45° = √2/2، tan 45° = 1|res|sin(rad(45))||مثلث متساوي الساقين.|An isosceles right triangle.
قيم الزوايا الخاصة (60°)|Special angle 60°|sin 60° = √3/2، cos 60° = ½، tan 60° = √3|res|sin(rad(60))||نصف مثلث متساوي الأضلاع.|Half an equilateral triangle.
الجيب الزائدي|Hyperbolic sine|sinh x = (eˣ − e⁻ˣ)/2|yv|sinh(xx)|xx|يشبه الجيب لكن أسي.|Like sine, but exponential.
جيب التمام الزائدي|Hyperbolic cosine|cosh x = (eˣ + e⁻ˣ)/2|yv|cosh(xx)|xx|شكل السلسلة المعلقة.|The shape of a hanging chain.
الظل الزائدي|Hyperbolic tangent|tanh x = sinh x / cosh x|yv|tanh(xx)|xx|يستخدم في الشبكات العصبية.|Used in neural networks.
متطابقة الزائدية|Hyperbolic identity|cosh²x − sinh²x = 1|res|pow(cosh(xx),2)-pow(sinh(xx),2)|xx|تشبه المتطابقة الأساسية.|Mirrors the Pythagorean identity.
الارتفاع بزاوية الارتفاع|Height from angle of elevation|h = d tan θ|hh|d*tan(rad(ang))|d ang|قياس ارتفاع مبنى.|Measuring a building’s height.
المسافة بزاوية الانخفاض|Distance from angle of depression|d = h / tan θ|d|hh/tan(rad(ang))|hh ang|من أعلى منارة.|From the top of a lighthouse.
`);

EQ.add('ana',`
المسافة بين نقطتين|Distance between two points|d = √((x₂ − x₁)² + (y₂ − y₁)²)|res|sqrt(pow(x2-x1,2)+pow(y2-y1,2))|x1 y1 x2 y2|فيثاغورس على المستوى.|Pythagoras on a grid.
نقطة المنتصف (x)|Midpoint (x)|xₘ = (x₁ + x₂)/2|res|(x1+x2)/2|x1 x2|منتصف القطعة.|Middle of a segment.
نقطة المنتصف (y)|Midpoint (y)|yₘ = (y₁ + y₂)/2|res|(y1+y2)/2|y1 y2|منتصف القطعة.|Middle of a segment.
الميل بين نقطتين|Slope between two points|m = (y₂ − y₁)/(x₂ − x₁)|slope|(y2-y1)/(x2-x1)|x1 y1 x2 y2|الارتفاع على المسافة الأفقية.|Rise over run.
معادلة الخط بنقطة وميل|Point–slope form|y − y₁ = m (x − x₁)|yv|y1+slope*(xx-x1)|y1 slope xx x1|من نقطة واحدة وميل.|From one point and a slope.
الصورة العامة للخط|General form of a line|A x + B y + C = 0|yv|-(Ac*xx+Cc)/Bc2|Ac Bc2 Cc xx|صيغة شاملة.|A general form.
بعد نقطة عن خط|Distance from a point to a line|d = ‖Ax₀ + By₀ + C‖ / √(A² + B²)|res|abs(Ac*x1+Bc2*y1+Cc)/sqrt(Ac*Ac+Bc2*Bc2)|Ac Bc2 Cc x1 y1|أقصر مسافة.|The shortest distance.
الخطان المتوازيان|Parallel lines|m₁ = m₂||||نفس الميل.|Same slope.
الخطان المتعامدان|Perpendicular lines|m₁ × m₂ = −1|slope|-1/slope|slope|ميل العمودي مقلوب سالب.|Negative reciprocal slope.
الزاوية بين خطين|Angle between two lines|tan θ = ‖(m₁ − m₂)/(1 + m₁m₂)‖|ang|deg(atan(abs((slope-0.5)/(1+slope*0.5))))|slope|الخط الثاني ميله 0.5.|Second line slope 0.5.
معادلة الدائرة|Equation of a circle|(x − h)² + (y − k)² = r²|res|sqrt(pow(xx-xc,2)+pow(yy-yc,2))|xx yy xc yc|بعد النقطة عن المركز.|Distance from the centre.
معادلة القطع المكافئ|Equation of a parabola|y² = 4 p x|yv|sqrt(4*px*xx)|px xx|كل نقطة على بعد متساوٍ من البؤرة والدليل.|Equidistant from focus and directrix.
معادلة القطع الناقص|Equation of an ellipse|x²/a² + y²/b² = 1|yv|sbx*sqrt(1-xx*xx/(sa*sa))|sbx xx sa|مدارات الكواكب.|Planetary orbits.
البعد البؤري للقطع الناقص|Focal distance of an ellipse|c² = a² − b²|res|sqrt(sa*sa-sbx*sbx)|sa sbx|بعد البؤرة عن المركز.|Focus distance from the centre.
الاختلاف المركزي للقطع الناقص|Eccentricity of an ellipse|e = c / a|ecc|sqrt(sa*sa-sbx*sbx)/sa|sa sbx|0 دائرة، قرب 1 ممطوط.|0 is a circle, near 1 is stretched.
معادلة القطع الزائد|Equation of a hyperbola|x²/a² − y²/b² = 1 (عند x = a + x₀)|yv|sbx*sqrt(pow(sa+xx,2)/(sa*sa)-1)|sbx xx sa|له خطا تقارب.|Has two asymptotes.
البعد البؤري للقطع الزائد|Focal distance of a hyperbola|c² = a² + b²|res|sqrt(sa*sa+sbx*sbx)|sa sbx|لاحظ الجمع.|Note the plus.
خطا تقارب القطع الزائد|Asymptotes of a hyperbola|y = ± (b/a) x|yv|sbx/sa*xx|sbx sa xx|يقترب منها المنحنى.|The curve approaches them.
الإحداثيات القطبية إلى ديكارتية (x)|Polar to Cartesian (x)|x = r cos θ|res|rd*cos(rad(ang))|rd ang|تحويل الإحداثيات.|Converting coordinates.
الإحداثيات القطبية إلى ديكارتية (y)|Polar to Cartesian (y)|y = r sin θ|res|rd*sin(rad(ang))|rd ang|تحويل الإحداثيات.|Converting coordinates.
الإحداثيات الديكارتية إلى قطبية (r)|Cartesian to polar (r)|r = √(x² + y²)|res|sqrt(xx*xx+yy*yy)|xx yy|البعد عن الأصل.|Distance from the origin.
الإحداثيات الديكارتية إلى قطبية (θ)|Cartesian to polar (θ)|θ = tan⁻¹(y / x)|ang|deg(atan2(yy,xx))|yy xx|الزاوية مع المحور x.|Angle with the x-axis.
تقسيم قطعة بنسبة|Section formula|x = (m x₂ + n x₁)/(m + n)|res|(2*x2+1*x1)/3|x1 x2|بنسبة 2:1.|In the ratio 2:1.
مركز ثقل المثلث|Centroid of a triangle|G = ((x₁+x₂+x₃)/3 , (y₁+y₂+y₃)/3)|res|(x1+x2+0)/3|x1 x2|الرأس الثالث في الأصل.|Third vertex at the origin.
معادلة الكرة|Equation of a sphere|(x−a)² + (y−b)² + (z−c)² = r²||||في ثلاثة أبعاد.|In three dimensions.
معادلة المستوى|Equation of a plane|a x + b y + c z = d||||مستوى في الفضاء.|A plane in space.
الصيغة العامة للمخروطيات|General conic|A x² + B xy + C y² + D x + E y + F = 0|res|0*0-4*1*1||المميّز B² − 4AC يحدد النوع.|The discriminant B² − 4AC tells the type.
`);

EQ.add('der',`
تعريف المشتقة|Definition of the derivative|f′(x) = lim (f(x+h) − f(x))/h|res|(pow(xa+hdx,2)-xa*xa)/hdx|xa hdx|ميل المماس (مثال f = x²).|Slope of the tangent (example f = x²).
مشتقة الثابت|Derivative of a constant|d/dx (c) = 0|res|0*kc|kc|الثابت لا يتغير.|A constant doesn’t change.
قاعدة القوة|Power rule|d/dx xⁿ = n xⁿ⁻¹|res|nn*pow(xa,nn-1)|nn xa|أهم قاعدة.|The most-used rule.
مشتقة الضرب في ثابت|Constant multiple rule|d/dx (c f) = c f′|res|kc*2*xa|kc xa|الثابت يطلع برّا (f = x²).|The constant comes out (f = x²).
قاعدة المجموع|Sum rule|(f + g)′ = f′ + g′|res|2*xa+3*xa*xa|xa|اشتق كل حد لوحده (x² + x³).|Differentiate term by term (x² + x³).
قاعدة الضرب|Product rule|(f g)′ = f′g + f g′|res|2*xa*sin(xa)+xa*xa*cos(xa)|xa|مثال f = x²، g = sin x.|Example f = x², g = sin x.
قاعدة القسمة|Quotient rule|(f/g)′ = (f′g − f g′)/g²|res|(cos(xa)*xa-sin(xa))/(xa*xa)|xa|مثال sin x / x.|Example sin x / x.
قاعدة السلسلة|Chain rule|(f(g(x)))′ = f′(g(x)) g′(x)|res|cos(xa*xa)*2*xa|xa|مثال sin(x²).|Example sin(x²).
مشتقة الجيب|Derivative of sine|d/dx sin x = cos x|res|cos(xa)|xa|x بالراديان.|x in radians.
مشتقة جيب التمام|Derivative of cosine|d/dx cos x = −sin x|res|-sin(xa)|xa|لاحظ الإشارة.|Note the sign.
مشتقة الظل|Derivative of tangent|d/dx tan x = sec²x|res|1/pow(cos(xa),2)|xa|مقلوب مربع جيب التمام.|One over cos squared.
مشتقة القاطع|Derivative of secant|d/dx sec x = sec x tan x|res|tan(xa)/cos(xa)|xa|قاعدة محفوظة.|A standard rule.
مشتقة قاطع التمام|Derivative of cosecant|d/dx csc x = −csc x cot x|res|-1/sin(xa)/tan(xa)|xa|قاعدة محفوظة.|A standard rule.
مشتقة ظل التمام|Derivative of cotangent|d/dx cot x = −csc²x|res|-1/pow(sin(xa),2)|xa|قاعدة محفوظة.|A standard rule.
مشتقة الدالة الأسية الطبيعية|Derivative of eˣ|d/dx eˣ = eˣ|res|exp(xa)|xa|الدالة التي مشتقتها نفسها.|The function equal to its own derivative.
مشتقة الدالة الأسية|Derivative of aˣ|d/dx aˣ = aˣ ln a|res|pow(base2,xa)*log(base2)|base2 xa|لأي أساس.|For any base.
مشتقة اللوغاريتم الطبيعي|Derivative of ln x|d/dx ln x = 1/x|res|1/xa|xa|مهمة جدًا.|Very important.
مشتقة اللوغاريتم بأساس|Derivative of log_a x|d/dx logₐx = 1/(x ln a)|res|1/(xa*log(base2))|xa base2|لأي أساس.|For any base.
مشتقة الجيب العكسي|Derivative of arcsin|d/dx sin⁻¹x = 1/√(1 − x²)|res|1/sqrt(1-sv*sv)|sv|لـ ‖x‖ < 1.|For ‖x‖ < 1.
مشتقة جيب التمام العكسي|Derivative of arccos|d/dx cos⁻¹x = −1/√(1 − x²)|res|-1/sqrt(1-sv*sv)|sv|لـ ‖x‖ < 1.|For ‖x‖ < 1.
مشتقة الظل العكسي|Derivative of arctan|d/dx tan⁻¹x = 1/(1 + x²)|res|1/(1+xa*xa)|xa|لكل x.|For all x.
مشتقة الجذر|Derivative of √x|d/dx √x = 1/(2√x)|res|1/(2*sqrt(xa))|xa|حالة خاصة من قاعدة القوة.|A special case of the power rule.
مشتقة المقلوب|Derivative of 1/x|d/dx (1/x) = −1/x²|res|-1/(xa*xa)|xa|قاعدة القوة بأس −1.|Power rule with n = −1.
مشتقة الجيب الزائدي|Derivative of sinh|d/dx sinh x = cosh x|res|cosh(xa)|xa|تشبه الجيب.|Like sine.
مشتقة جيب التمام الزائدي|Derivative of cosh|d/dx cosh x = sinh x|res|sinh(xa)|xa|بدون إشارة سالبة!|No minus sign!
المشتقة الثانية|Second derivative|f″(x) = d²f/dx²|res|6*xa|xa|التقعر والتسارع (f = x³).|Concavity and acceleration (f = x³).
معادلة المماس|Tangent line|y = f(a) + f′(a)(x − a)|yv|xa*xa+2*xa*(xx-xa)|xa xx|أفضل تقريب خطي (f = x²).|Best linear approximation (f = x²).
النقاط الحرجة|Critical points|f′(x) = 0||||نقاط القمم والقيعان المحتملة.|Possible peaks and valleys.
اختبار المشتقة الثانية|Second-derivative test|f″ > 0 ⇒ صغرى، f″ < 0 ⇒ عظمى||||لتصنيف النقاط الحرجة.|Classifying critical points.
نقطة الانعطاف|Inflection point|f″(x) = 0 وتغيّر الإشارة||||يتغير اتجاه التقعر.|Concavity flips.
قاعدة لوبيتال|L’Hôpital’s rule|lim f/g = lim f′/g′|res|1||مثال lim sin x / x = 1 عند x → 0.|Example lim sin x / x = 1 as x → 0.
مبرهنة القيمة المتوسطة|Mean value theorem|f′(c) = (f(b) − f(a))/(b − a)|res|(pow(ub,2)-pow(ua,2))/(ub-ua)|ua ub|يوجد مماس يوازي الوتر.|Some tangent is parallel to the chord.
التقريب الخطي|Linear approximation|f(x) ≈ f(a) + f′(a)(x − a)|res|sqrt(4)+1/(2*sqrt(4))*(xa-4)|xa|تقدير √x قرب 4.|Estimating √x near 4.
طريقة نيوتن-رافسون|Newton–Raphson method|xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ)|res|xa-(xa*xa-2)/(2*xa)|xa|خطوة لحساب √2.|A step towards √2.
الاشتقاق الضمني|Implicit differentiation|x² + y² = r² ⇒ dy/dx = −x/y|res|-xx/yy|xx yy|عندما لا نقدر نعزل y.|When y can’t be isolated.
المعدلات المرتبطة|Related rates|dV/dt = 4π r² dr/dt|res|4*PI*rd*rd*0.1|rd|بالون ينتفخ بمعدل dr/dt = 0.1.|A balloon inflating at dr/dt = 0.1.
المشتقة الجزئية|Partial derivative|∂f/∂x (مع ثبات y)|res|2*xx*yy|xx yy|مثال f = x²y.|Example f = x²y.
التدرّج|Gradient|∇f = (∂f/∂x , ∂f/∂y)|res|sqrt(pow(2*xx,2)+pow(2*yy,2))|xx yy|اتجاه أسرع صعود (f = x² + y²).|Direction of steepest ascent (f = x² + y²).
مشتقة القيمة المطلقة|Derivative of ‖x‖|d/dx ‖x‖ = x/‖x‖|res|xa/abs(xa)|xa|غير معرّفة عند 0.|Undefined at 0.
مشتقة xˣ|Derivative of xˣ|d/dx xˣ = xˣ(1 + ln x)|res|pow(xa,xa)*(1+log(xa))|xa|بالاشتقاق اللوغاريتمي.|By logarithmic differentiation.
السرعة كمشتقة|Velocity as a derivative|v = dx/dt|res|2*5*xa|xa|x = 5t² ⇒ v = 10t.|x = 5t² ⇒ v = 10t.
التسارع كمشتقة ثانية|Acceleration as a second derivative|a = d²x/dt²|res|10||x = 5t² ⇒ a = 10.|x = 5t² ⇒ a = 10.
`);

EQ.add('int',`
تكامل القوة|Power rule for integrals|∫xⁿ dx = xⁿ⁺¹/(n + 1) + C|res|pow(xa,nn+1)/(nn+1)|xa nn|n ≠ −1.|n ≠ −1.
تكامل الثابت|Integral of a constant|∫k dx = k x + C|res|kc*xa|kc xa|مساحة مستطيل.|The area of a rectangle.
تكامل 1/x|Integral of 1/x|∫(1/x) dx = ln‖x‖ + C|res|log(abs(xa))|xa|الحالة الخاصة n = −1.|The special case n = −1.
تكامل eˣ|Integral of eˣ|∫eˣ dx = eˣ + C|res|exp(xa)|xa|لا يتغير!|It stays the same!
تكامل aˣ|Integral of aˣ|∫aˣ dx = aˣ / ln a + C|res|pow(base2,xa)/log(base2)|base2 xa|لأي أساس.|For any base.
تكامل الجيب|Integral of sine|∫sin x dx = −cos x + C|res|-cos(xa)|xa|عكس الاشتقاق.|Reverses differentiation.
تكامل جيب التمام|Integral of cosine|∫cos x dx = sin x + C|res|sin(xa)|xa|بسيط.|Simple.
تكامل مربع القاطع|Integral of sec²x|∫sec²x dx = tan x + C|res|tan(xa)|xa|من مشتقة الظل.|From the tangent’s derivative.
تكامل الظل|Integral of tangent|∫tan x dx = −ln‖cos x‖ + C|res|-log(abs(cos(xa)))|xa|بالتعويض.|By substitution.
تكامل القاطع|Integral of secant|∫sec x dx = ln‖sec x + tan x‖ + C|res|log(abs(1/cos(xa)+tan(xa)))|xa|حيلة مشهورة.|A famous trick.
تكامل 1/(1 + x²)|Integral of 1/(1 + x²)|∫dx/(1 + x²) = tan⁻¹x + C|res|atan(xa)|xa|يعطي الظل العكسي.|Gives the arctangent.
تكامل 1/√(1 − x²)|Integral of 1/√(1 − x²)|∫dx/√(1 − x²) = sin⁻¹x + C|res|asin(sv)|sv|يعطي الجيب العكسي.|Gives the arcsine.
تكامل ln x|Integral of ln x|∫ln x dx = x ln x − x + C|res|xa*log(xa)-xa|xa|بالتجزئة.|By parts.
تكامل الجيب الزائدي|Integral of sinh|∫sinh x dx = cosh x + C|res|cosh(xa)|xa|بدون إشارة سالبة.|No minus sign.
المبرهنة الأساسية للتفاضل والتكامل|Fundamental theorem of calculus|∫ₐᵇ f(x) dx = F(b) − F(a)|res|(pow(ub,3)-pow(ua,3))/3|ua ub|المساحة تحت x² من a إلى b.|Area under x² from a to b.
مساحة تحت منحنى خطي|Area under a line|∫ₐᵇ (mx + c) dx|res|slope*(ub*ub-ua*ua)/2+kc*(ub-ua)|slope kc ua ub|مساحة شبه منحرف.|A trapezoid’s area.
مساحة تحت الجيب|Area under one arch of sine|∫₀^π sin x dx = 2|res|-cos(PI)+cos(0)||نتيجة جميلة.|A neat result.
التكامل بالتجزئة|Integration by parts|∫u dv = u v − ∫v du||||لضرب دالتين.|For products of functions.
التكامل بالتعويض|Integration by substitution|∫f(g(x)) g′(x) dx = ∫f(u) du||||عكس قاعدة السلسلة.|Reverses the chain rule.
الكسور الجزئية|Partial fractions|1/((x−a)(x−b)) = A/(x−a) + B/(x−b)||||تفكيك الكسور قبل التكامل.|Splitting fractions before integrating.
قاعدة شبه المنحرف|Trapezoidal rule|∫ ≈ (h/2)[f₀ + 2f₁ + … + 2fₙ₋₁ + fₙ]|res|(ub-ua)/2*(pow(ua,2)+pow(ub,2))|ua ub|تقريب عددي (خطوة واحدة لـ x²).|A numerical estimate (one step for x²).
قاعدة سيمبسون|Simpson’s rule|∫ ≈ (h/3)[f₀ + 4f₁ + f₂]|res|(ub-ua)/6*(pow(ua,2)+4*pow((ua+ub)/2,2)+pow(ub,2))|ua ub|دقيقة جدًا للدوال الملساء.|Very accurate for smooth functions.
القيمة المتوسطة للدالة|Average value of a function|f̄ = (1/(b − a)) ∫ₐᵇ f dx|res|(pow(ub,3)-pow(ua,3))/3/(ub-ua)|ua ub|متوسط x² على الفترة.|Average of x² on the interval.
المساحة بين منحنيين|Area between two curves|A = ∫ₐᵇ (f − g) dx|res|(pow(ub,2)/2-pow(ub,3)/3)-(pow(ua,2)/2-pow(ua,3)/3)|ua ub|بين y = x و y = x².|Between y = x and y = x².
حجم الدوران (الأقراص)|Volume of revolution (discs)|V = π ∫ₐᵇ f(x)² dx|vol|PI*(pow(ub,3)-pow(ua,3))/3|ua ub|تدوير y = x حول المحور.|Spinning y = x about the axis.
حجم الدوران (القشور)|Volume of revolution (shells)|V = 2π ∫ₐᵇ x f(x) dx|vol|2*PI*(pow(ub,3)-pow(ua,3))/3|ua ub|تدوير y = x حول محور y.|Spinning y = x about the y-axis.
طول المنحنى|Arc length of a curve|L = ∫ₐᵇ √(1 + f′²) dx|res|(ub-ua)*sqrt(1+slope*slope)|ua ub slope|لخط مستقيم ميله m.|For a straight line of slope m.
الشغل كتكامل|Work as an integral|W = ∫ F dx|W|0.5*k*(xB*xB-xA*xA)|k xA xB|شد نابض من موضع لآخر.|Stretching a spring.
تكامل غاوس|Gaussian integral|∫₋∞^∞ e^(−x²) dx = √π|res|sqrt(PI)||أساس التوزيع الطبيعي.|The heart of the normal distribution.
تكامل غير محدود (معتل)|Improper integral|∫₁^∞ 1/x² dx = 1|res|1||مساحة لا نهائية الطول ومحدودة!|Infinitely long yet finite area!
المعادلة التفاضلية للنمو|Growth differential equation|dy/dx = k y ⇒ y = C e^(kx)|res|exp(0.5*xa)|xa|أبسط معادلة تفاضلية (k = 0.5).|The simplest differential equation (k = 0.5).
المعادلة التفاضلية للمهتز|Harmonic oscillator ODE|y″ + ω² y = 0 ⇒ y = A cos(ωt + φ)||||أساس الاهتزازات.|The basis of vibrations.
المعادلة التفاضلية الخطية من الرتبة الأولى|First-order linear ODE|y′ + P(x) y = Q(x)||||حلها بعامل التكامل e^(∫P dx).|Solved with an integrating factor.
تحويل لابلاس|Laplace transform|F(s) = ∫₀^∞ e^(−st) f(t) dt||||يحوّل المعادلات التفاضلية لجبرية.|Turns ODEs into algebra.
تحويل فورييه|Fourier transform|F(ω) = ∫ f(t) e^(−iωt) dt||||يفكك الإشارة لترددات.|Splits a signal into frequencies.
متسلسلة تايلور|Taylor series|f(x) = Σ f⁽ⁿ⁾(a)(x − a)ⁿ / n!||||تقريب أي دالة بكثيرة حدود.|Approximating any function with polynomials.
متسلسلة eˣ|Series for eˣ|eˣ = 1 + x + x²/2! + x³/3! + …|res|1+xa+xa*xa/2+pow(xa,3)/6+pow(xa,4)/24|xa|أول خمسة حدود.|First five terms.
متسلسلة sin x|Series for sin x|sin x = x − x³/3! + x⁵/5! − …|res|xa-pow(xa,3)/6+pow(xa,5)/120|xa|أول ثلاثة حدود.|First three terms.
متسلسلة cos x|Series for cos x|cos x = 1 − x²/2! + x⁴/4! − …|res|1-xa*xa/2+pow(xa,4)/24|xa|أول ثلاثة حدود.|First three terms.
متسلسلة ln(1 + x)|Series for ln(1 + x)|ln(1+x) = x − x²/2 + x³/3 − …|res|sv-sv*sv/2+pow(sv,3)/3|sv|لـ ‖x‖ < 1.|For ‖x‖ < 1.
المتسلسلة الهندسية 1/(1 − x)|Geometric series 1/(1 − x)|1/(1−x) = 1 + x + x² + …|res|1/(1-sv)|sv|لـ ‖x‖ < 1.|For ‖x‖ < 1.
التكامل المزدوج|Double integral|∬_R f(x,y) dA|res|(ub-ua)*(ub-ua)|ua ub|حجم تحت سطح (f = 1).|Volume under a surface (f = 1).
مبرهنة غرين|Green’s theorem|∮ (P dx + Q dy) = ∬ (∂Q/∂x − ∂P/∂y) dA||||يربط التكامل الخطي بالمساحة.|Links line integrals and area.
مبرهنة التباعد|Divergence theorem|∯ F·dS = ∭ ∇·F dV||||التدفق الخارج = مجموع المصادر داخلها.|Outflow equals the sources inside.
مبرهنة ستوكس|Stokes’ theorem|∮ F·dr = ∬ (∇×F)·dS||||الدوران على الحافة = الالتفاف داخل السطح.|Circulation equals curl inside.
`);

EQ.add('lin',`
طول المتجه في بعدين|Magnitude of a 2D vector|‖u‖ = √(uₓ² + u_y²)|res|sqrt(ux*ux+uy*uy)|ux uy|فيثاغورس للمتجهات.|Pythagoras for vectors.
طول المتجه في ثلاثة أبعاد|Magnitude of a 3D vector|‖u‖ = √(uₓ² + u_y² + u_z²)|res|sqrt(ux*ux+uy*uy+uz*uz)|ux uy uz|في الفضاء.|In space.
اتجاه المتجه|Direction of a vector|θ = tan⁻¹(u_y / uₓ)|ang|deg(atan2(uy,ux))|uy ux|الزاوية مع المحور x.|Angle with the x-axis.
متجه الوحدة|Unit vector|û = u / ‖u‖|res|ux/sqrt(ux*ux+uy*uy)|ux uy|طوله 1 (المركبة x).|Length 1 (x-component).
الضرب القياسي|Dot product|u · v = uₓvₓ + u_yv_y + u_zv_z|res|ux*wx+uy*wy+uz*wz|ux uy uz wx wy wz|نتيجته عدد.|The result is a number.
الضرب القياسي بالزاوية|Dot product with angle|u · v = ‖u‖‖v‖ cos θ|res|5*3*cos(rad(ang))|ang|صفر يعني متعامدين.|Zero means perpendicular.
الزاوية بين متجهين|Angle between vectors|cos θ = (u · v)/(‖u‖‖v‖)|ang|deg(acos((ux*wx+uy*wy+uz*wz)/(sqrt(ux*ux+uy*uy+uz*uz)*sqrt(wx*wx+wy*wy+wz*wz))))|ux uy uz wx wy wz|من الضرب القياسي.|From the dot product.
مسقط متجه على آخر|Scalar projection|proj = (u · v)/‖v‖|res|(ux*wx+uy*wy+uz*wz)/sqrt(wx*wx+wy*wy+wz*wz)|ux uy uz wx wy wz|ظل متجه على آخر.|The shadow of one vector on another.
الضرب الاتجاهي (المركبة z)|Cross product (z-component)|(u × v)_z = uₓv_y − u_yvₓ|res|ux*wy-uy*wx|ux uy wx wy|متجه عمودي على الاثنين.|A vector perpendicular to both.
طول الضرب الاتجاهي|Magnitude of the cross product|‖u × v‖ = ‖u‖‖v‖ sin θ|res|5*3*sin(rad(ang))|ang|مساحة متوازي الأضلاع.|Area of the parallelogram.
الضرب الثلاثي القياسي|Scalar triple product|u · (v × w)||||حجم متوازي السطوح.|Volume of a parallelepiped.
محدد مصفوفة 2×2|Determinant of a 2×2 matrix|det = a d − b c|res|m11*m22-m12*m21|m11 m12 m21 m22|صفر يعني لا يوجد معكوس.|Zero means no inverse.
معكوس مصفوفة 2×2|Inverse of a 2×2 matrix|A⁻¹ = (1/det) [d −b; −c a]|res|m22/(m11*m22-m12*m21)|m11 m12 m21 m22|العنصر الأول من المعكوس.|First entry of the inverse.
أثر المصفوفة|Trace of a matrix|tr(A) = a + d|res|m11+m22|m11 m22|مجموع القطر الرئيسي.|Sum of the main diagonal.
القيم الذاتية لمصفوفة 2×2|Eigenvalues of a 2×2 matrix|λ = (tr ± √(tr² − 4 det))/2|res|((m11+m22)+sqrt(pow(m11+m22,2)-4*(m11*m22-m12*m21)))/2|m11 m12 m21 m22|القيمة الذاتية الأكبر.|The larger eigenvalue.
المعادلة المميزة|Characteristic equation|det(A − λI) = 0||||لإيجاد القيم الذاتية.|For finding eigenvalues.
القيمة والمتجه الذاتي|Eigenvalue equation|A v = λ v||||المتجه لا يغير اتجاهه.|The vector keeps its direction.
ضرب المصفوفات|Matrix multiplication|(AB)ᵢⱼ = Σₖ Aᵢₖ Bₖⱼ||||الصف × العمود.|Row times column.
مدور المصفوفة|Transpose|(Aᵀ)ᵢⱼ = Aⱼᵢ||||تبديل الصفوف بالأعمدة.|Swap rows and columns.
محدد حاصل الضرب|Determinant of a product|det(AB) = det(A) det(B)||||خاصية مفيدة.|A useful property.
قاعدة كريمر|Cramer’s rule|x = det(Aₓ)/det(A)|res|(5*m22-m12*11)/(m11*m22-m12*m21)|m11 m12 m21 m22|حل أنظمة المعادلات (الثوابت 5 و 11).|Solving systems (constants 5 and 11).
مصفوفة الدوران|Rotation matrix|R(θ) = [cos θ −sin θ; sin θ cos θ]|res|cos(rad(ang))*1-sin(rad(ang))*0|ang|دوران النقطة (1, 0).|Rotating the point (1, 0).
مساحة متوازي الأضلاع بالمحدد|Parallelogram area by determinant|A = ‖det [u v]‖|area|abs(ux*wy-uy*wx)|ux uy wx wy|مساحة يحددها متجهان.|Area spanned by two vectors.
المسافة بين متجهين|Distance between vectors|d = ‖u − v‖|res|sqrt(pow(ux-wx,2)+pow(uy-wy,2)+pow(uz-wz,2))|ux uy uz wx wy wz|البعد بين نهايتيهما.|Gap between their tips.
`);

EQ.add('cpx',`
الوحدة التخيلية|Imaginary unit|i² = −1||||أساس الأعداد المركبة.|The heart of complex numbers.
مقياس العدد المركب|Modulus of a complex number|‖z‖ = √(a² + b²)|modz|sqrt(re*re+im*im)|re im|بعده عن الأصل.|Distance from the origin.
سعة العدد المركب|Argument of a complex number|θ = tan⁻¹(b / a)|argz|deg(atan2(im,re))|im re|الزاوية في المستوى.|Its angle in the plane.
مرافق العدد المركب|Complex conjugate|z̄ = a − bi||||انعكاس في المحور الحقيقي.|A reflection in the real axis.
جمع عددين مركبين (الحقيقي)|Adding complex numbers (real part)|(a + bi) + (c + di) = (a + c) + (b + d)i|res|re+re2|re re2|نجمع كل جزء لحاله.|Add each part separately.
ضرب عددين مركبين (الحقيقي)|Multiplying complex numbers (real part)|(a + bi)(c + di) = (ac − bd) + (ad + bc)i|res|re*re2-im*im2|re im re2 im2|الجزء الحقيقي من الناتج.|Real part of the product.
ضرب عددين مركبين (التخيلي)|Multiplying complex numbers (imaginary part)|Im = ad + bc|res|re*im2+im*re2|re im re2 im2|الجزء التخيلي من الناتج.|Imaginary part of the product.
قسمة عددين مركبين (الحقيقي)|Dividing complex numbers (real part)|Re = (ac + bd)/(c² + d²)|res|(re*re2+im*im2)/(re2*re2+im2*im2)|re im re2 im2|نضرب في المرافق.|Multiply by the conjugate.
الصيغة القطبية|Polar form|z = r(cos θ + i sin θ) = r e^(iθ)|res|modz*cos(rad(argz))|modz argz|الجزء الحقيقي من الصيغة القطبية.|Real part from the polar form.
مبرهنة دي موافر|De Moivre’s theorem|(cos θ + i sin θ)ⁿ = cos nθ + i sin nθ|res|cos(nn*rad(argz))|nn argz|لرفع الأعداد المركبة لقوة.|Raising complex numbers to powers.
قوة عدد مركب (المقياس)|Power of a complex number (modulus)|‖zⁿ‖ = rⁿ|res|pow(modz,nn)|modz nn|المقاييس تُضرب.|Moduli multiply.
جذور الوحدة|Roots of unity|z = e^(2πik/n)|res|cos(2*PI*kk/nn)|kk nn|n جذر موزعة على دائرة.|n roots spread around a circle.
مربع المقياس|Modulus squared|‖z‖² = z z̄|res|re*re+im*im|re im|بدون جذر.|No square root.
`);

EQ.add('dis',`
المضروب|Factorial|n! = n × (n − 1) × … × 1|res|fact(nobj)|nobj|5! = 120.|5! = 120.
التباديل|Permutations|nPr = n! / (n − r)!|res|nPr(nobj,robj)|nobj robj|الترتيب مهم.|Order matters.
التوافيق|Combinations|nCr = n! / (r!(n − r)!)|res|nCr(nobj,robj)|nobj robj|الترتيب غير مهم.|Order doesn’t matter.
التباديل مع التكرار|Permutations with repetition|nʳ|res|pow(nobj,robj)|nobj robj|مثل الأرقام السرية.|Like PIN codes.
التوافيق مع التكرار|Combinations with repetition|C(n + r − 1, r)|res|nCr(nobj+robj-1,robj)|nobj robj|النجوم والخطوط.|Stars and bars.
الترتيب الدائري|Circular permutations|(n − 1)!|res|fact(nobj-1)|nobj|أشخاص حول طاولة.|People around a table.
مبدأ العد الأساسي|Fundamental counting principle|العدد = n₁ × n₂ × …|res|nobj*robj|nobj robj|عدد طرق اختيار شيئين متتاليين.|Ways to make two choices in a row.
مبدأ الشمول والاستبعاد|Inclusion–exclusion|n(A ∪ B) = n(A) + n(B) − n(A ∩ B)|res|sets+setsB-setsAB|sets setsB setsAB|عدم حساب المشترك مرتين.|Don’t count the overlap twice.
عدد المجموعات الجزئية|Number of subsets|2ⁿ|res|pow(2,nobj)|nobj|كل عنصر داخل أو خارج.|Each element is in or out.
مبدأ برج الحمام|Pigeonhole principle|n + 1 حمامة في n أعشاش ⇒ عش فيه اثنتان||||مبدأ بسيط وقوي.|Simple yet powerful.
القاسم المشترك الأكبر (إقليدس)|Greatest common divisor (Euclid)|gcd(a, b) = gcd(b, a mod b)|res|(function g(a,b){return b?g(b,a%b):a})(gcd1,gcd2)|gcd1 gcd2|أقدم خوارزمية معروفة.|One of the oldest algorithms.
المضاعف المشترك الأصغر|Least common multiple|lcm(a, b) = a b / gcd(a, b)|res|gcd1*gcd2/(function g(a,b){return b?g(b,a%b):a})(gcd1,gcd2)|gcd1 gcd2|لتوحيد المقامات.|For common denominators.
مبرهنة فيرما الصغرى|Fermat’s little theorem|aᵖ ≡ a (mod p)||||أساس التشفير الحديث.|Behind modern cryptography.
دالة أويلر φ لعدد أولي|Euler’s totient of a prime|φ(p) = p − 1|res|pn2-1|pn2|عدد الأعداد الأولية معه.|Count of numbers coprime to it.
مبرهنة الأعداد الأولية|Prime number theorem|π(x) ≈ x / ln x|res|1000/log(1000)||عدد الأوليات حتى 1000 ≈ 145 (الفعلي 168).|Primes up to 1000 ≈ 145 (actual 168).
العدد الكاتالاني|Catalan numbers|Cₙ = (2n)! / ((n + 1)! n!)|res|fact(2*nobj)/(fact(nobj+1)*fact(nobj))|nobj|عدد طرق وضع الأقواس.|Ways to place brackets.
عدد أعداد ستيرلنغ (تقريب المضروب)|Stirling’s approximation|n! ≈ √(2πn) (n/e)ⁿ|res|sqrt(2*PI*nobj)*pow(nobj/Math.E,nobj)|nobj|تقريب سريع للمضروب الكبير.|A quick estimate of big factorials.
عدد الأحرف في المخطط|Handshake lemma|Σ deg(v) = 2E|res|2*Ex|Ex|كل حرف يُحسب مرتين.|Each edge counted twice.
صيغة أويلر للمخططات المستوية|Euler’s formula for planar graphs|V − E + F = 2|res|2-Vx+Ex|Vx Ex|عدد الأوجه F.|Number of faces F.
عدد الأحرف في المخطط الكامل|Edges of a complete graph|E = n(n − 1)/2|res|nobj*(nobj-1)/2|nobj|كل اثنين متصلين.|Every pair connected.
الحساب المعياري|Modular arithmetic|a ≡ b (mod n) ⇔ n ‖ (a − b)|res|gcd1%7|gcd1|باقي القسمة (على 7 مثال).|The remainder (mod 7 example).
`);
