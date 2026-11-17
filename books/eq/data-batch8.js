/* موسوعة معادلات إيلان — أنظمة التحكم والروبوتات، الليزر والألياف الضوئية، علم المواد، التصنيع والطباعة ثلاثية الأبعاد، التخطيط المالي الشخصي */
EQ.syms(`
# ---- control & robotics
Kpg|K_p|الكسب التناسبي|proportional gain||2
Ki|K_i|الكسب التكاملي|integral gain||0.5
Kd|K_d|الكسب التفاضلي|derivative gain||0.1
errc|e|الخطأ|error||1
ierr|∫e|تكامل الخطأ|integral of error||2
derr|de/dt|معدل تغير الخطأ|rate of change of error||-0.5
uout|u|إشارة التحكم|control signal||2.95
tauc|τ|الثابت الزمني|time constant|s|2
tc|t|الزمن|time|s|2
yresp|y|الاستجابة كنسبة من النهائية|response as fraction of final|%|63.2
zeta|ζ|نسبة التخميد|damping ratio||0.5
wn|ω_n|التردد الطبيعي|natural frequency|rad/s|4
tset|t_s|زمن الاستقرار|settling time|s|2
Mp_|M_p|التجاوز الأقصى|maximum overshoot|%|16.3
tpk|t_p|زمن الذروة|peak time|s|0.91
Kgain|K|كسب الحلقة المفتوحة|open-loop gain||9
Gcl|T|كسب الحلقة المغلقة|closed-loop gain||0.9
ess|e_ss|الخطأ الثابت|steady-state error|%|10
L1a|L₁|طول الذراع الأول|link 1 length|m|0.4
L2a|L₂|طول الذراع الثاني|link 2 length|m|0.3
th1|θ₁|زاوية المفصل الأول|joint 1 angle|°|30
th2|θ₂|زاوية المفصل الثاني|joint 2 angle|°|45
xee|x|موقع الطرف (x)|end-effector x|m|0.42
yee|y|موقع الطرف (y)|end-effector y|m|0.49
wheelR|r|نصف قطر العجلة|wheel radius|m|0.05
wL|ω_L|سرعة العجلة اليسرى|left wheel speed|rad/s|10
wR_|ω_R|سرعة العجلة اليمنى|right wheel speed|rad/s|12
track|b|المسافة بين العجلتين|wheel separation|m|0.2
vrob|v|سرعة الروبوت|robot speed|m/s|0.55
wrob|ω|سرعة دوران الروبوت|robot turn rate|rad/s|0.5
encN|N|نبضات لكل لفة|encoder counts per rev||1024
encC|n|النبضات المقروءة|counts read||512
encD|d|المسافة المقطوعة|distance travelled|m|0.157
# ---- lasers & fibre
NAf|NA|الفتحة العددية|numerical aperture||0.22
ncore|n₁|معامل انكسار القلب|core index||1.48
nclad|n₂|معامل انكسار الغلاف|cladding index||1.4636
accA|θ|زاوية القبول|acceptance angle|°|12.7
attn|α|التوهين|attenuation|dB/km|0.2
flen_km|L|طول الليف|fibre length|km|50
lossdB|loss|الفقد الكلي|total loss|dB|10
Pin_mW|P_in|القدرة الداخلة|input power|mW|1
Pout_mW|P_out|القدرة الخارجة|output power|mW|0.1
dBm|P|القدرة بالديسيبل ملي واط|power in dBm|dBm|0
Plas|P|قدرة الليزر|laser power|W|0.005
lamL|λ|الطول الموجي|wavelength|nm|650
phot|N|الفوتونات في الثانية|photons per second|1/s|1.6e16
w0|w₀|نصف قطر خصر الحزمة|beam waist radius|mm|0.5
zR|z_R|مدى رايلي|Rayleigh range|m|1.21
divg|θ|زاوية انفراج الحزمة|beam divergence|mrad|0.41
spotD|D|قطر البقعة البؤرية|focused spot diameter|μm|10
flen2|f|البعد البؤري للعدسة|lens focal length|mm|50
Dbeam|D|قطر الحزمة على العدسة|beam diameter at lens|mm|4
Ilas|I|شدة الليزر|laser intensity|W/m²|6366
# ---- materials science
Fmat|F|القوة|force|N|5000
A0mat|A₀|مساحة المقطع الأصلية|original area|mm²|20
Afmat|A_f|مساحة المقطع عند الكسر|area at fracture|mm²|12
RA|RA|نسبة نقص المساحة|reduction of area|%|40
L0mat|L₀|الطول الأصلي|original length|mm|50
Lfmat|L_f|الطول عند الكسر|length at fracture|mm|60
elong|%EL|نسبة الاستطالة|percent elongation|%|20
sigY|σ_y|إجهاد الخضوع|yield stress|MPa|250
Ur|U_r|معامل المرونة الرجوعية|modulus of resilience|kJ/m³|156
Emat|E|معامل يونغ|Young’s modulus|GPa|200
Kic|K_IC|متانة الكسر|fracture toughness|MPa·√m|50
acrack|a|طول الشق|crack length|mm|2
sigf|σ_f|إجهاد الكسر|fracture stress|MPa|631
Ydim|Y|معامل الشكل|geometry factor||1
HBload|P|حمل اختبار برينل|Brinell load|kgf|3000
Dball|D|قطر الكرة|ball diameter|mm|10
dind|d|قطر الأثر|indent diameter|mm|4
HB|HB|صلادة برينل|Brinell hardness||229
UTS|UTS|مقاومة الشد القصوى|ultimate tensile strength|MPa|790
Qact|Q|طاقة التنشيط|activation energy|kJ/mol|140
Tdiff|T|درجة الحرارة|temperature|K|1200
D0d|D₀|معامل الانتشار الأساسي|pre-exponential factor|m²/s|2e-5
Dd|D|معامل الانتشار|diffusion coefficient|m²/s|1.6e-11
tdif|t|زمن الانتشار|diffusion time|s|3600
xdif|x|عمق الانتشار|diffusion depth|mm|0.24
densT|ρ|الكثافة النظرية|theoretical density|g/cm³|7.87
natom|n|الذرات في الخلية|atoms per unit cell||2
Mcell|A|الكتلة المولية|molar mass|g/mol|55.85
acell|a|ضلع الخلية|lattice parameter|nm|0.2866
# ---- manufacturing & 3D printing
Vcut|V_c|سرعة القطع|cutting speed|m/min|100
Dtool|D|قطر الأداة|tool diameter|mm|10
nspin|n|سرعة الدوران|spindle speed|rpm|3183
fz|f_z|التغذية لكل سن|feed per tooth|mm|0.05
zt|z|عدد الأسنان|number of flutes||4
vf|v_f|سرعة التغذية|feed rate|mm/min|637
ap_|a_p|عمق القطع|depth of cut|mm|2
ae_|a_e|عرض القطع|width of cut|mm|5
MRR|MRR|معدل إزالة المادة|material removal rate|cm³/min|6.4
Vpart|V|حجم القطعة|part volume|cm³|50
infill|%|نسبة الحشو|infill|%|20
shell|%|نسبة الجدران|shell share|%|30
filg|m|الفلامنت المستخدم|filament used|g|28
pla|ρ|كثافة الفلامنت|filament density|g/cm³|1.24
vol_rate|Q|معدل البثق|volumetric flow|mm³/s|8
tprint|t|زمن الطباعة|print time|h|1.2
filcost|price|سعر كيلو الفلامنت|filament price per kg|SAR|90
partcost|cost|تكلفة المادة|material cost|SAR|2.5
taktT|T|زمن الإيقاع|takt time|s|60
avail|t|الوقت المتاح|available time|s|28800
demand|d|الطلب|demand|units|480
oee|OEE|الفعالية الكلية للمعدات|overall equipment effectiveness|%|65
availp|A|نسبة الجاهزية|availability|%|90
perfp|P|نسبة الأداء|performance|%|85
qualp|Q|نسبة الجودة|quality|%|95
scrap|%|نسبة الهالك|scrap rate|%|5
bad|bad|القطع المعيبة|defective parts||25
good|total|مجموع القطع|total parts||500
# ---- personal finance
expm|E|المصاريف الشهرية|monthly expenses|SAR|6000
months_|n|عدد الأشهر|months||6
efund|F|صندوق الطوارئ|emergency fund|SAR|36000
goal|G|الهدف|savings goal|SAR|20000
saved|S|المدخر حاليًا|saved so far|SAR|5000
monthly|m|الادخار الشهري|monthly saving|SAR|1000
mreq|n|الأشهر المتبقية|months needed||15
income|I|الدخل الشهري|monthly income|SAR|10000
needs|N|الاحتياجات (50%)|needs (50%)|SAR|5000
wants|W|الرغبات (30%)|wants (30%)|SAR|3000
savings|S|الادخار (20%)|savings (20%)|SAR|2000
saverate|%|نسبة الادخار|saving rate|%|20
debtm|D|أقساط الديون الشهرية|monthly debt payments|SAR|3000
dti|DTI|نسبة الدين إلى الدخل|debt-to-income ratio|%|30
apr|APR|الفائدة السنوية|annual rate|%|24
bal|B|الرصيد|balance|SAR|5000
mint|i|فائدة الشهر|interest this month|SAR|100
pay|P|القسط الشهري|monthly payment|SAR|1500
nmon|n|عدد الأقساط|number of payments||24
tint|interest|الفائدة الكلية|total interest|SAR|4000
loanP|L|مبلغ القرض|loan amount|SAR|32000
hourly|h|الأجر بالساعة|hourly pay|SAR|60
hweek|w|ساعات العمل أسبوعيًا|hours per week|h|40
annual|Y|الدخل السنوي|annual income|SAR|124800
itemp|price|سعر الشيء|price of the item|SAR|300
hwork|t|ساعات العمل اللازمة|hours of work needed|h|5
`);

EQ.add('ctl',`
متحكم PID|PID controller|u = K_p e + K_i ∫e + K_d de/dt|uout|Kpg*errc+Ki*ierr+Kd*derr|Kpg errc Ki ierr Kd derr|أشهر متحكم في الروبوتات والمصانع.|The most common controller in robots and factories.
استجابة نظام من الدرجة الأولى|First-order step response|y = 1 − e^(−t/τ)|yresp|(1-exp(-tc/tauc))*100|tc tauc|بعد τ واحدة يوصل 63%.|After one τ it reaches 63%.
زمن الاستقرار (2%)|Settling time (2%)|t_s ≈ 4 / (ζ ω_n)|tset|4/(zeta*wn)|zeta wn|متى يهدأ النظام.|When the system calms down.
التجاوز الأقصى|Maximum overshoot|M_p = e^(−πζ/√(1 − ζ²)) × 100|Mp_|exp(-PI*zeta/sqrt(1-zeta*zeta))*100|zeta|التخميد الأقل = تجاوز أكبر.|Less damping means more overshoot.
زمن الذروة|Peak time|t_p = π / (ω_n √(1 − ζ²))|tpk|PI/(wn*sqrt(1-zeta*zeta))|wn zeta|متى توصل الاستجابة لأعلى نقطة.|When the response hits its peak.
كسب الحلقة المغلقة|Closed-loop gain|T = K / (1 + K)|Gcl|Kgain/(1+Kgain)|Kgain|التغذية الراجعة تخلي النظام ثابت.|Feedback makes the system steady.
الخطأ الثابت لمدخل خطوة|Steady-state error to a step|e_ss = 1 / (1 + K) × 100|ess|100/(1+Kgain)|Kgain|كسب أعلى = خطأ أقل.|Higher gain, smaller error.
موقع ذراع روبوت بمفصلين (x)|Two-link robot arm position (x)|x = L₁ cos θ₁ + L₂ cos(θ₁ + θ₂)|xee|L1a*cos(rad(th1))+L2a*cos(rad(th1+th2))|L1a L2a th1 th2|الحركيات الأمامية.|Forward kinematics.
موقع ذراع روبوت بمفصلين (y)|Two-link robot arm position (y)|y = L₁ sin θ₁ + L₂ sin(θ₁ + θ₂)|yee|L1a*sin(rad(th1))+L2a*sin(rad(th1+th2))|L1a L2a th1 th2|وين توصل يد الروبوت.|Where the robot’s hand ends up.
سرعة روبوت بعجلتين|Speed of a two-wheeled robot|v = r (ω_R + ω_L) / 2|vrob|wheelR*(wR_+wL)/2|wheelR wR_ wL|متوسط سرعة العجلتين.|The average of both wheels.
دوران روبوت بعجلتين|Turn rate of a two-wheeled robot|ω = r (ω_R − ω_L) / b|wrob|wheelR*(wR_-wL)/track|wheelR wR_ wL track|فرق السرعة يخليه يلف.|A speed difference makes it turn.
المسافة من المشفّر|Distance from an encoder|d = 2π r n / N|encD|2*PI*wheelR*encC/encN|wheelR encC encN|الروبوت يعد لفات العجلة.|The robot counts wheel turns.
دالة النقل|Transfer function|G(s) = Y(s) / U(s)||||وصف النظام في مجال لابلاس.|Describes a system in the Laplace domain.
`);

EQ.add('las',`
الفتحة العددية للليف|Numerical aperture of a fibre|NA = √(n₁² − n₂²)|NAf|sqrt(ncore*ncore-nclad*nclad)|ncore nclad|كم الليف يقدر يجمع ضوء.|How much light a fibre can collect.
زاوية القبول|Acceptance angle|θ = asin(NA)|accA|deg(asin(NAf))|NAf|الضوء لازم يدخل ضمن هالزاوية.|Light must enter within this angle.
فقد الليف الضوئي|Fibre-optic loss|loss = α L|lossdB|attn*flen_km|attn flen_km|ألياف الإنترنت تفقد 0.2 ديسيبل لكل كيلو تقريبًا.|Internet fibre loses about 0.2 dB per km.
القدرة بعد الفقد|Power after loss|P_out = P_in × 10^(−loss/10)|Pout_mW|Pin_mW*pow(10,-lossdB/10)|Pin_mW lossdB|كل 10 ديسيبل = عُشر القدرة.|Every 10 dB cuts power to a tenth.
القدرة بالديسيبل ملي واط|Power in dBm|P = 10 log₁₀(P / 1 mW)|dBm|10*log10(Pin_mW)|Pin_mW|0 dBm = 1 ملي واط.|0 dBm is 1 milliwatt.
عدد فوتونات الليزر|Photons from a laser|N = P λ / (h c)|phot|Plas*lamL*1e-9/(hP*cl)|Plas lamL hP cl|ليزر صغير يطلع ملايين المليارات كل ثانية.|A small laser emits millions of billions every second.
مدى رايلي للحزمة|Rayleigh range of a beam|z_R = π w₀² / λ|zR|PI*pow(w0*1e-3,2)/(lamL*1e-9)|w0 lamL|المسافة اللي تبقى فيها الحزمة ضيقة.|How far the beam stays narrow.
انفراج حزمة الليزر|Laser beam divergence|θ = λ / (π w₀)|divg|lamL*1e-9/(PI*w0*1e-3)*1000|lamL w0|بالملي راديان.|In milliradians.
قطر البقعة البؤرية|Focused spot size|D ≈ 4 λ f / (π D_beam)|spotD|4*lamL*1e-9*flen2/(PI*Dbeam)*1e6|lamL flen2 Dbeam|ليه الليزر يقص لما يتركز.|Why a focused laser can cut.
شدة الليزر|Laser intensity|I = P / (π w₀²)|Ilas|Plas/(PI*pow(w0*1e-3,2))|Plas w0|القدرة على مساحة صغيرة جدًا.|Power on a tiny area.
الانبعاث المحفّز|Stimulated emission|فوتون + ذرة مثارة → 2 فوتون متطابق||||سر الليزر: كل الفوتونات بنفس اللون والاتجاه.|The secret of lasers: identical photons in step.
`);

EQ.add('mat',`
نسبة نقص المساحة|Reduction of area|RA = (A₀ − A_f) / A₀ × 100|RA|(A0mat-Afmat)/A0mat*100|A0mat Afmat|مقياس لليونة المعدن.|A measure of how ductile a metal is.
نسبة الاستطالة|Percent elongation|%EL = (L_f − L₀) / L₀ × 100|elong|(Lfmat-L0mat)/L0mat*100|Lfmat L0mat|كم تمطّ العينة قبل ما تنكسر.|How much the sample stretches before breaking.
معامل المرونة الرجوعية|Modulus of resilience|U_r = σ_y² / (2E)|Ur|sigY*sigY/(2*Emat*1000)*1000|sigY Emat|الطاقة اللي يخزنها المعدن ويرجعها.|The energy a metal stores and gives back.
إجهاد الكسر من الشق|Fracture stress with a crack|σ_f = K_IC / (Y √(π a))|sigf|Kic/(Ydim*sqrt(PI*acrack/1000))|Kic Ydim acrack|الشقوق الصغيرة ممكن تكسر قطعة قوية.|Small cracks can break a strong part.
صلادة برينل|Brinell hardness|HB = 2P / (πD(D − √(D² − d²)))|HB|2*HBload/(PI*Dball*(Dball-sqrt(Dball*Dball-dind*dind)))|HBload Dball dind|كرة تنضغط في المعدن ونقيس الأثر.|A ball is pressed into the metal and the dent measured.
مقاومة الشد من الصلادة|Tensile strength from hardness|UTS ≈ 3.45 × HB|UTS|3.45*HB|HB|تقريب للفولاذ.|An approximation for steel.
معامل الانتشار (أرهينيوس)|Diffusion coefficient (Arrhenius)|D = D₀ e^(−Q/RT)|Dd|D0d*exp(-Qact*1000/(8.314*Tdiff))|D0d Qact Tdiff|الحرارة تسرّع حركة الذرات.|Heat speeds up atoms.
عمق الانتشار|Diffusion depth|x ≈ √(D t)|xdif|sqrt(Dd*tdif)*1000|Dd tdif|تقسية سطح الفولاذ بالكربون.|Case-hardening steel with carbon.
الكثافة النظرية للبلورة|Theoretical crystal density|ρ = n A / (a³ N_A)|densT|natom*Mcell/(pow(acell*1e-7,3)*6.022e23)|natom Mcell acell|من حجم الخلية البلورية.|From the size of the crystal cell.
`);

EQ.add('mfg',`
سرعة الدوران للتشغيل|Spindle speed for machining|n = 1000 V_c / (π D)|nspin|1000*Vcut/(PI*Dtool)|Vcut Dtool|كل مادة لها سرعة قطع مناسبة.|Every material has a suitable cutting speed.
سرعة التغذية|Feed rate|v_f = f_z × z × n|vf|fz*zt*nspin|fz zt nspin|كم تتحرك الأداة في الدقيقة.|How far the tool moves each minute.
معدل إزالة المادة|Material removal rate|MRR = a_p × a_e × v_f / 1000|MRR|ap_*ae_*vf/1000|ap_ ae_ vf|بالسنتيمتر المكعب في الدقيقة.|In cubic centimetres per minute.
الفلامنت المستخدم في الطباعة|Filament used in 3D printing|m ≈ V × ρ × (shell + infill × (1 − shell)) / 100|filg|Vpart*pla*(shell/100+infill/100*(1-shell/100))|Vpart pla shell infill|تقريب: الجدران صلبة والداخل حسب الحشو.|Approximation: solid walls, interior at the infill level.
زمن الطباعة ثلاثية الأبعاد|3D print time|t ≈ (m / ρ) × 1000 / Q / 3600|tprint|filg/pla*1000/vol_rate/3600|filg pla vol_rate|بالساعات، تقريب بدون حركات التنقل.|In hours; ignores travel moves.
تكلفة مادة الطباعة|3D-print material cost|cost = m × price / 1000|partcost|filg*filcost/1000|filg filcost|كم تكلفك القطعة من الفلامنت.|What the part costs in filament.
زمن الإيقاع|Takt time|T = available / demand|taktT|avail/demand|avail demand|كل كم ثانية لازم تطلع قطعة.|How often a part must come off the line.
الفعالية الكلية للمعدات|Overall equipment effectiveness|OEE = A × P × Q|oee|availp*perfp*qualp/10000|availp perfp qualp|المصانع العالمية تستهدف 85%.|World-class factories aim for 85%.
نسبة الهالك|Scrap rate|% = bad / total × 100|scrap|bad/good*100|bad good|القطع اللي ما تنفع.|Parts that can’t be used.
`);

EQ.add('pfn',`
صندوق الطوارئ|Emergency fund|F = E × n|efund|expm*months_|expm months_|النصيحة الشائعة: مصاريف 3 إلى 6 أشهر.|A common guide: 3 to 6 months of expenses.
كم شهر للوصول لهدفك|Months to reach a savings goal|n = (G − S) / m|mreq|(goal-saved)/monthly|goal saved monthly|بدون حساب الأرباح.|Not counting any returns.
قاعدة 50/30/20: الاحتياجات|50/30/20 rule: needs|N = 0.5 × I|needs|0.5*income|income|السكن والأكل والفواتير.|Rent, food and bills.
قاعدة 50/30/20: الرغبات|50/30/20 rule: wants|W = 0.3 × I|wants|0.3*income|income|الطلعات والهوايات.|Outings and hobbies.
قاعدة 50/30/20: الادخار|50/30/20 rule: savings|S = 0.2 × I|savings|0.2*income|income|ادفع لنفسك أول.|Pay yourself first.
نسبة الادخار|Saving rate|% = savings / income × 100|saverate|savings/income*100|savings income|كم من دخلك يبقى لك.|How much of your income you keep.
نسبة الدين إلى الدخل|Debt-to-income ratio|DTI = D / I × 100|dti|debtm/income*100|debtm income|البنوك تنتبه لها قبل القرض.|Banks check it before lending.
فائدة بطاقة الائتمان لشهر|Credit-card interest for one month|i = B × APR / 12 / 100|mint|bal*apr/12/100|bal apr|ليه الأفضل تسدد البطاقة كاملة.|Why paying the card off in full is best.
الفائدة الكلية للقرض|Total interest on a loan|interest = P × n − L|tint|pay*nmon-loanP|pay nmon loanP|كم تدفع فوق مبلغ القرض.|How much you pay on top of the loan.
الدخل السنوي من الأجر بالساعة|Annual income from hourly pay|Y = h × w × 52|annual|hourly*hweek*52|hourly hweek|52 أسبوع في السنة.|52 weeks in a year.
كم ساعة تشتغل عشان تشتري|Hours of work to buy something|t = price / h|hwork|itemp/hourly|itemp hourly|طريقة تفكير ذكية قبل الشراء.|A smart way to think before buying.
`);
