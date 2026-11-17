/* موسوعة معادلات إيلان — الهندسة المتقدمة، الكيمياء التحليلية، الجسيمات والنووية، الجيولوجيا، علم النفس والقياس، الاقتصاد المتقدم */
EQ.syms(`
# ---- advanced geometry
sa_|a|الضلع a|side a||5
sb_|b|الضلع b|side b||6
sc_|c|الضلع c|side c||7
spm|s|نصف المحيط|semi-perimeter||9
Atri|A|مساحة المثلث|triangle area||14.7
rin|r|نصف قطر الدائرة الداخلية|inradius||1.63
rout|R|نصف قطر الدائرة الخارجية|circumradius||3.57
nsides|n|عدد الأضلاع|number of sides||6
sidep|s|طول الضلع|side length||4
Apoly|A|مساحة المضلع المنتظم|regular-polygon area||41.6
apoth|a|العامد (أبوثيم)|apothem||3.46
iang|θ|الزاوية الداخلية|interior angle|°|120
diag_|D|عدد الأقطار|number of diagonals||9
d1r|d₁|القطر الأول|diagonal 1||8
d2r|d₂|القطر الثاني|diagonal 2||6
Arh|A|المساحة|area||24
ell_a|a|نصف المحور الأكبر|semi-major axis||5
ell_b|b|نصف المحور الأصغر|semi-minor axis||3
ell_p|P|محيط القطع الناقص|ellipse perimeter||25.5
eccE|e|الاختلاف المركزي|eccentricity||0.8
Rtor|R|نصف قطر الحلقة|torus major radius||5
rt_|r|نصف قطر الأنبوب|tube radius||1
Vtor|V|الحجم|volume||98.7
hcap|h|ارتفاع القبة|cap height||2
Rsph|R|نصف قطر الكرة|sphere radius||5
Vcap|V|حجم القبة|cap volume||54.5
rfr1|R|نصف القطر الكبير|large radius||4
rfr2|r|نصف القطر الصغير|small radius||2
hfr|h|الارتفاع|height||5
Vfr|V|حجم المخروط الناقص|frustum volume||146.6
px1|x₁|x الأولى|x₁||1
py1|y₁|y الأولى|y₁||2
px2|x₂|x الثانية|x₂||4
py2|y₂|y الثانية|y₂||6
px3|x₃|x الثالثة|x₃||6
py3|y₃|y الثالثة|y₃||1
Ashoe|A|مساحة المثلث من الإحداثيات|area from coordinates||10.5
# ---- analytical chemistry
absA|A|الامتصاصية|absorbance||0.45
epsM|ε|معامل الامتصاص المولاري|molar absorptivity|L/(mol·cm)|15000
pathb|b|طول الخلية|path length|cm|1
concM|c|التركيز|concentration|mol/L|3e-5
transT|T|النفاذية|transmittance|%|35.5
Rf_|R_f|معامل الاحتجاز|retention factor||0.45
dspot|d_s|مسافة البقعة|spot distance|cm|4.5
dsolv|d_f|مسافة المذيب|solvent front distance|cm|10
c1d|C₁|التركيز الأصلي|stock concentration|mol/L|2
v1d|V₁|الحجم المأخوذ|volume taken|mL|25
v2d|V₂|الحجم النهائي|final volume|mL|250
c2d|C₂|التركيز بعد التخفيف|diluted concentration|mol/L|0.2
dfac|DF|معامل التخفيف|dilution factor||10
meas|x|القيمة المقاسة|measured value||9.6
true_|μ|القيمة الحقيقية|true value||10
perr|%|الخطأ النسبي|percent error|%|4
ppmv|ppm|أجزاء من المليون|parts per million|ppm|50
msol|m_solute|كتلة المذاب|mass of solute|mg|5
Lsolv|V|حجم المحلول|volume of solution|L|0.1
rsd|RSD|الانحراف المعياري النسبي|relative standard deviation|%|2
spike|R|نسبة الاسترجاع|recovery|%|98
found|found|المقاس بعد الإضافة|measured after spike||14.7
added|added|المضاف|amount added||5
orig|orig|المقاس قبل الإضافة|measured before spike||9.8
lod|LOD|حد الكشف|limit of detection||0.03
sblank|s_b|انحراف الفارغ|blank standard deviation||0.01
slope_|m|ميل منحنى المعايرة|calibration slope||1
# ---- particles & nuclear
Ebind|E_b|طاقة الربط|binding energy|MeV|28.3
dmu|Δm|نقص الكتلة|mass defect|u|0.0304
Anu|A|عدد الكتلة|mass number||4
EpA|E/A|طاقة الربط لكل نيوكليون|binding energy per nucleon|MeV|7.07
Rnu|R|نصف قطر النواة|nuclear radius|fm|1.9
Zpr|Z|العدد الذري|atomic number||92
Qmev|Q|طاقة التفاعل|reaction energy|MeV|200
nfis|N|عدد الانشطارات|number of fissions||1e20
Ejoule|E|الطاقة|energy|J|3.2e9
gammaL|γ|معامل لورنتز|Lorentz factor||1.67
vfrac|β|السرعة كنسبة من الضوء|speed as fraction of c||0.8
tau0|τ₀|العمر في السكون|rest lifetime|μs|2.2
taul|τ|العمر المقاس|measured lifetime|μs|3.67
Egev|E|طاقة الجسيم|particle energy|GeV|1
lamdb|λ|طول موجة دي بروي|de Broglie wavelength|fm|1.24
dose|D|الجرعة الممتصة|absorbed dose|Gy|0.01
wR|w_R|معامل نوع الإشعاع|radiation weighting factor||1
Heq|H|الجرعة المكافئة|equivalent dose|Sv|0.01
Aact|A|النشاط الإشعاعي|activity|Bq|1000
Nnuc|N|عدد الأنوية|number of nuclei||1.44e6
thalf|t½|عمر النصف|half-life|s|1000
# ---- geology
Mw|M_w|العزم الزلزالي بالقدر|moment magnitude||6
M0|M₀|العزم الزلزالي|seismic moment|N·m|1.26e18
Erich|E|طاقة الزلزال|earthquake energy|J|6.3e13
Mrich|M|قدر ريختر|Richter magnitude||6
dM|ΔM|فرق القدر|magnitude difference||1
efac_|×|كم مرة أكبر|times larger||31.6
tsp_|Δt|الفرق بين موجتي P و S|S–P time gap|s|20
dquake|d|بعد مركز الزلزال|distance to the quake|km|160
vplate|v|سرعة الصفيحة|plate speed|cm/yr|5
tyr|t|الزمن|time|years|1e6
dplate|d|المسافة|distance|km|50
rho_r|ρ_rock|كثافة الصخر|rock density|kg/m³|2700
hrock|h|العمق|depth|m|1000
Plith|P|الضغط الصخري|lithostatic pressure|MPa|26.5
porosity|φ|المسامية|porosity|%|25
Vvoid|V_v|حجم الفراغات|void volume|m³|25
Vtot|V|الحجم الكلي|total volume|m³|100
Kh|K|الموصلية الهيدروليكية|hydraulic conductivity|m/day|10
igrad|i|الميل الهيدروليكي|hydraulic gradient||0.01
qdarcy|q|تدفق دارسي|Darcy flux|m/day|0.1
gtemp|T|حرارة باطن الأرض|temperature at depth|°C|55
gsurf|T₀|حرارة السطح|surface temperature|°C|25
ggrad|G|التدرج الحراري|geothermal gradient|°C/km|30
dkm_|z|العمق|depth|km|1
# ---- psychology & measurement
raw_|X|الدرجة الخام|raw score||75
zsc|z|الدرجة المعيارية|z-score||0.5
Tsc|T|الدرجة التائية|T-score||55
iqs|IQ|معامل الذكاء المعياري|standard IQ score||107.5
mage|MA|العمر العقلي|mental age|years|12
cage|CA|العمر الزمني|chronological age|years|10
ratioIQ|IQ|معامل الذكاء النسبي|ratio IQ||120
kitems|k|عدد البنود|number of items||20
rbar|r̄|متوسط الارتباط بين البنود|mean inter-item correlation||0.3
alphaC|α|معامل كرونباخ ألفا|Cronbach’s alpha||0.9
rxx|r_xx|معامل الثبات|reliability||0.85
sem|SEM|الخطأ المعياري للقياس|standard error of measurement||5.8
pdiff|p|معامل الصعوبة|item difficulty||0.6
right|correct|الإجابات الصحيحة|correct answers||60
total_|total|عدد المختبرين|test takers||100
Pupp|p_upper|نسبة الصحيح في المجموعة العليا|correct in upper group||0.8
Plow|p_lower|نسبة الصحيح في المجموعة الدنيا|correct in lower group||0.4
disc_|D|معامل التمييز|discrimination index||0.4
rt0|a|الزمن الأساسي|base time|ms|200
bhick|b|ميل هيك|Hick slope|ms|150
nch|n|عدد الخيارات|number of choices||4
rtime|RT|زمن الاستجابة|reaction time|ms|548
dfit|D|المسافة للهدف|distance to target||20
wfit|W|عرض الهدف|target width||2
mtime|MT|زمن الحركة|movement time|ms|719
Istim|I₀|شدة المثير الأصلي|original stimulus intensity||100
kweb|k|ثابت فيبر|Weber fraction||0.02
dI|ΔI|أصغر فرق ملحوظ|just-noticeable difference||2
# ---- advanced economics
Yd|Y|الناتج المحلي|GDP|bn SAR|4000
Ccons|C|الاستهلاك|consumption|bn SAR|1800
Ii|I|الاستثمار|investment|bn SAR|1000
Gg|G|الإنفاق الحكومي|government spending|bn SAR|1100
Xx|X|الصادرات|exports|bn SAR|1200
Mm|M|الواردات|imports|bn SAR|900
mpcE|MPC|الميل الحدي للاستهلاك|marginal propensity to consume||0.8
kmul|k|المضاعف|multiplier||5
nomG|g_n|النمو الاسمي|nominal growth|%|7
infl|π|التضخم|inflation|%|2
realG|g_r|النمو الحقيقي|real growth|%|5
unemp|U|العاطلون|unemployed|million|0.6
labf|LF|القوة العاملة|labour force|million|12
urate|u|معدل البطالة|unemployment rate|%|5
Pd1|%ΔQ|نسبة تغير الكمية|% change in quantity|%|-10
Pd2|%ΔP|نسبة تغير السعر|% change in price|%|5
elas|E|المرونة|elasticity||-2
Mmon|M|عرض النقود|money supply|bn SAR|2500
Vvel|V|سرعة دوران النقود|velocity of money||1.6
Pprice|P|مستوى الأسعار|price level||1
Qreal|Q|الناتج الحقيقي|real output|bn SAR|4000
rrq|rr|نسبة الاحتياطي|reserve ratio|%|10
mmul|mm|مضاعف النقود|money multiplier||10
gini|G|معامل جيني|Gini coefficient||0.35
Aarea|A|المساحة بين الخط ومنحنى لورنز|area between equality line and Lorenz curve||0.175
r72|r|معدل النمو|growth rate|%|6
tdbl|t|زمن التضاعف|doubling time|years|12
`);

EQ.add('gad',`
صيغة هيرون|Heron’s formula|A = √(s(s − a)(s − b)(s − c))|Atri|sqrt(((sa_+sb_+sc_)/2)*((sa_+sb_+sc_)/2-sa_)*((sa_+sb_+sc_)/2-sb_)*((sa_+sb_+sc_)/2-sc_))|sa_ sb_ sc_|مساحة أي مثلث من أضلاعه بس.|The area of any triangle from its sides alone.
عامد المضلع المنتظم|Apothem of a regular polygon|a = s / (2 tan(π/n))|apoth|sidep/(2*tan(PI/nsides))|sidep nsides|المسافة من المركز لمنتصف الضلع.|Distance from the centre to the middle of a side.
مساحة المعين من قطريه|Area of a rhombus from its diagonals|A = d₁ d₂ / 2|Arh|d1r*d2r/2|d1r d2r|يصلح للطائرة الورقية أيضًا.|Works for a kite too.
نظرية بطليموس|Ptolemy’s theorem|AC · BD = AB · CD + AD · BC||||للشكل الرباعي داخل دائرة.|For a quadrilateral inside a circle.
نظرية سيفا|Ceva’s theorem|(AF/FB)(BD/DC)(CE/EA) = 1||||متى تلتقي ثلاثة خطوط في نقطة واحدة.|When three lines meet at one point.
نظرية مينلاوس|Menelaus’s theorem|(AF/FB)(BD/DC)(CE/EA) = −1||||متى تقع ثلاث نقاط على خط واحد (بأطوال موجّهة).|When three points lie on one line (signed lengths).
نظرية ستيوارت|Stewart’s theorem|b²m + c²n = a(d² + mn)||||طول خط من الرأس للضلع المقابل.|The length of a line from a corner to the opposite side.
قانون الظل|Law of tangents|(a − b)/(a + b) = tan((A − B)/2) / tan((A + B)/2)||||أخو قانوني الجيب وجيب التمام.|A sibling of the sine and cosine laws.
`);

EQ.add('anc',`
النفاذية من الامتصاصية|Transmittance from absorbance|T = 10^(−A) × 100|transT|pow(10,-absA)*100|absA|كم من الضوء يعدّي.|How much light gets through.
الخطأ النسبي|Percent error|% = ‖x − μ‖ / μ × 100|perr|abs(meas-true_)/true_*100|meas true_|كم بعدت عن القيمة الحقيقية.|How far you are from the true value.
التركيز بأجزاء من المليون|Concentration in ppm|ppm = mg / L|ppmv|msol/Lsolv|msol Lsolv|للمحاليل المائية المخففة.|For dilute water solutions.
نسبة الاسترجاع|Spike recovery|R = (found − orig) / added × 100|spike|(found-orig)/added*100|found orig added|يتأكد إن طريقة القياس دقيقة.|Checks that the method measures correctly.
حد الكشف|Limit of detection|LOD = 3 s_b / m|lod|3*sblank/slope_|sblank slope_|أقل كمية يقدر الجهاز يحس فيها.|The smallest amount the instrument can detect.
حد التقدير الكمي|Limit of quantification|LOQ = 10 s_b / m|lod|10*sblank/slope_|sblank slope_|أقل كمية يقدر يقيسها بثقة.|The smallest amount it can measure reliably.
المعايرة بالحمض والقاعدة|Acid–base titration|M_a V_a = M_b V_b||||عند نقطة التكافؤ (نسبة 1:1).|At the equivalence point (1:1 ratio).
`);

EQ.add('prt',`
طاقة الانشطار الكلية|Total fission energy|E = N × Q × 1.602×10⁻¹³|Ejoule|nfis*Qmev*1.602e-13|nfis Qmev|كل انشطار لليورانيوم يعطي حوالي 200 ميغا إلكترون فولت.|Each uranium fission gives about 200 MeV.
عمر الميون المتمدد|Muon lifetime dilation|τ = γ τ₀|taul|tau0/sqrt(1-vfrac*vfrac)|tau0 vfrac|ليه الميونات من الفضاء توصل للأرض.|Why muons from space reach the ground.
طول موجة الجسيم عالي الطاقة|Wavelength of a high-energy particle|λ ≈ 1.24 / E|lamdb|1.24/Egev|Egev|λ بالفيمتومتر و E بالغيغا إلكترون فولت.|λ in femtometres, E in GeV.
الجرعة المكافئة|Equivalent dose|H = D × w_R|Heq|dose*wR|dose wR|جسيمات ألفا أخطر 20 مرة من أشعة غاما.|Alpha particles are 20 times more harmful than gamma rays.
النشاط الإشعاعي|Radioactive activity|A = N ln 2 / t½|Aact|Nnuc*log(2)/thalf|Nnuc thalf|بالبيكريل: تحلل كل ثانية.|In becquerels: decays per second.
النموذج القياسي|The Standard Model|6 كواركات + 6 لبتونات + بوزونات القوى + هيغز||||كل المادة المعروفة.|All known matter.
البروتون من الكواركات|A proton from quarks|p = u u d||||شحنته +⅔ +⅔ −⅓ = +1.|Charge +⅔ +⅔ −⅓ = +1.
النيوترون من الكواركات|A neutron from quarks|n = u d d||||شحنته +⅔ −⅓ −⅓ = 0.|Charge +⅔ −⅓ −⅓ = 0.
فناء المادة والمادة المضادة|Matter–antimatter annihilation|e⁻ + e⁺ → 2γ||||الكتلة كلها تتحول طاقة.|All the mass becomes energy.
اندماج الشمس (سلسلة بروتون-بروتون)|Fusion in the Sun (proton–proton chain)|4 ¹H → ⁴He + 2e⁺ + 2νₑ + 26.7 MeV||||مصدر ضوء الشمس.|The source of sunlight.
انشطار اليورانيوم-235|Uranium-235 fission|²³⁵U + n → ¹⁴¹Ba + ⁹²Kr + 3n||||النيوترونات الثلاثة تكمل التفاعل المتسلسل.|The three neutrons keep the chain reaction going.
`);

EQ.add('geo',`
قدر العزم الزلزالي|Moment magnitude|M_w = (2/3)(log₁₀ M₀ − 9.1)|Mw|(2/3)*(log10(M0)-9.1)|M0|المقياس اللي يستخدمه العلماء اليوم.|The scale scientists use today.
كم مرة زلزال أقوى من ثاني|How much stronger one quake is|× = 10^(1.5 ΔM)|efac_|pow(10,1.5*dM)|dM|درجة وحدة = طاقة أكبر 32 مرة تقريبًا.|One magnitude step is about 32 times more energy.
بعد مركز الزلزال|Distance to an earthquake|d ≈ 8 × Δt|dquake|8*tsp_|tsp_|كل ثانية بين موجة P وموجة S تساوي 8 كم تقريبًا.|Each second between the P and S waves is about 8 km.
حركة الصفائح التكتونية|Plate-tectonic motion|d = v × t / 10⁵|dplate|vplate*tyr/1e5|vplate tyr|بسرعة نمو الأظافر تقريبًا.|About as fast as fingernails grow.
الضغط الصخري|Lithostatic pressure|P = ρ g h / 10⁶|Plith|rho_r*g*hrock/1e6|rho_r g hrock|بالميغاباسكال.|In megapascals.
المسامية|Porosity|φ = V_v / V × 100|porosity|Vvoid/Vtot*100|Vvoid Vtot|كم من الصخر فراغات تمسك ماء أو نفط.|How much of a rock is space for water or oil.
حرارة باطن الأرض|Temperature underground|T = T₀ + G z|gtemp|gsurf+ggrad*dkm_|gsurf ggrad dkm_|تزيد حوالي 25–30 درجة لكل كيلومتر.|It rises about 25–30 °C per kilometre.
قانون التعاقب الطبقي|Law of superposition|الطبقات السفلى أقدم||||الأساس في قراءة تاريخ الصخور.|The key to reading rock history.
دورة الصخور|The rock cycle|ناري → رسوبي → متحول → ناري||||الصخور تتحول من نوع لنوع.|Rocks change from one type to another.
`);

EQ.add('psy',`
الدرجة المعيارية|Standard score (z)|z = (X − μ) / σ|zsc|(raw_-mu)/sd|raw_ mu sd|كم انحراف بعدت عن المتوسط.|How many standard deviations from the mean.
الدرجة التائية|T-score|T = 50 + 10 z|Tsc|50+10*zsc|zsc|المتوسط 50 والانحراف 10.|Mean 50, standard deviation 10.
درجة الذكاء المعيارية|Standard IQ score|IQ = 100 + 15 z|iqs|100+15*zsc|zsc|المتوسط 100.|The average is 100.
معامل الذكاء النسبي (التاريخي)|Ratio IQ (historical)|IQ = MA / CA × 100|ratioIQ|mage/cage*100|mage cage|الطريقة القديمة للأطفال.|The old method used for children.
معامل كرونباخ ألفا المعياري|Standardised Cronbach’s alpha|α = k r̄ / (1 + (k − 1) r̄)|alphaC|kitems*rbar/(1+(kitems-1)*rbar)|kitems rbar|فوق 0.7 يعتبر الاختبار ثابت.|Above 0.7 the test is considered reliable.
الخطأ المعياري للقياس|Standard error of measurement|SEM = σ √(1 − r_xx)|sem|sd*sqrt(1-rxx)|sd rxx|كم ممكن تتغير الدرجة لو أعدت الاختبار.|How much a score could shift on a retest.
معامل الصعوبة|Item difficulty|p = correct / total|pdiff|right/total_|right total_|0.9 سهل جدًا، 0.2 صعب جدًا.|0.9 is very easy; 0.2 is very hard.
معامل التمييز|Discrimination index|D = p_upper − p_lower|disc_|Pupp-Plow|Pupp Plow|هل السؤال يفرّق بين المتفوق والضعيف؟|Does the question separate strong from weak students?
قانون هيك|Hick’s law|RT = a + b log₂(n + 1)|rtime|rt0+bhick*log2(nch+1)|rt0 bhick nch|كل ما زادت الخيارات زاد وقت القرار.|More choices mean slower decisions.
قانون فيتس|Fitts’s law|MT = a + b log₂(2D / W)|mtime|rt0+bhick*log2(2*dfit/wfit)|rt0 bhick dfit wfit|الأزرار الكبيرة والقريبة أسرع ضغطًا.|Big, close buttons are quicker to hit.
قانون فيبر|Weber’s law|ΔI = k I|dI|kweb*Istim|kweb Istim|الفرق الملحوظ يكبر مع شدة المثير.|The noticeable difference grows with the stimulus.
قانون فيبر-فخنر|Weber–Fechner law|S = k ln(I / I₀)||||الإحساس يزيد ببطء مع الشدة.|Sensation grows slowly as intensity rises.
`);

EQ.add('ec2',`
الناتج المحلي (طريقة الإنفاق)|GDP by expenditure|Y = C + I + G + (X − M)|Yd|Ccons+Ii+Gg+(Xx-Mm)|Ccons Ii Gg Xx Mm|مجموع كل الإنفاق في الاقتصاد.|All spending in the economy added up.
صافي الصادرات|Net exports|NX = X − M|res|Xx-Mm|Xx Mm|موجب = فائض تجاري.|Positive means a trade surplus.
النمو الحقيقي|Real growth|g_r ≈ g_n − π|realG|nomG-infl|nomG infl|النمو بعد طرح التضخم.|Growth after removing inflation.
معادلة التبادل النقدي|Equation of exchange|M V = P Q|Mmon|Pprice*Qreal/Vvel|Pprice Qreal Vvel|الكمية النقدية اللازمة للاقتصاد.|How much money the economy needs.
مضاعف النقود|Money multiplier|mm = 1 / rr|mmul|1/(rrq/100)|rrq|البنوك تخلق النقود بالإقراض.|Banks create money by lending.
منحنى فيليبس|Phillips curve|π = πₑ − β(u − uₙ)||||علاقة عكسية قصيرة المدى بين التضخم والبطالة.|A short-run trade-off between inflation and unemployment.
معادلة فيشر|Fisher equation|(1 + i) = (1 + r)(1 + π)||||العلاقة بين الفائدة الاسمية والحقيقية والتضخم.|Links nominal interest, real interest and inflation.
`);
