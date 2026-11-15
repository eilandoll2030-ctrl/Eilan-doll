/* موسوعة معادلات إيلان — المال والاقتصاد والهندسة والإلكترونيات والحاسب */
EQ.syms(`
rm|r|المعدل لكل فترة|rate per period||0.004167
nper|n|عدد الفترات|number of periods||36
FV|FV|القيمة المستقبلية|future value|SAR|1100
PV|PV|القيمة الحالية|present value|SAR|1000
cost|C|التكلفة|cost|SAR|80
rev|R|الإيراد|revenue|SAR|100
profit|π|الربح|profit|SAR|20
priceU|p|سعر الوحدة|unit price|SAR|30
vcost|v|التكلفة المتغيرة للوحدة|variable cost per unit|SAR|18
fcost|F|التكاليف الثابتة|fixed costs|SAR|1200
qty|Q|الكمية|quantity||100
salvage|S|القيمة المتبقية|salvage value|SAR|200
life|n|العمر الإنتاجي|useful life|years|5
inf|i|معدل التضخم|inflation rate|%|2
gdp|GDP|الناتج المحلي|GDP|bn|1000
Cons|C|الاستهلاك|consumption|bn|600
Inv|I|الاستثمار|investment|bn|200
Gov|G|الإنفاق الحكومي|government spending|bn|250
Xp|X|الصادرات|exports|bn|300
Mimp|M|الواردات|imports|bn|350
dQ|%ΔQ|نسبة تغير الكمية|% change in quantity|%|-10
dPr|%ΔP|نسبة تغير السعر|% change in price|%|5
mpc|MPC|الميل الحدي للاستهلاك|marginal propensity to consume||0.8
CPI1|CPI₁|مؤشر الأسعار الحالي|current CPI||110
CPI0|CPI₀|مؤشر الأسعار الأساسي|base CPI||100
stress|σ|الإجهاد|stress|Pa|2e8
strain|ε|الانفعال|strain||0.001
Fload|F|الحمل|load|N|10000
Lbeam|L|طول العارضة|beam length|m|4
Ibeam|I|عزم القصور للمقطع|second moment of area|m⁴|8e-6
Ebeam|E|معامل المرونة|elastic modulus|Pa|2e11
cdist|c|البعد عن المحور المحايد|distance from neutral axis|m|0.1
Mbend|M|عزم الانحناء|bending moment|N·m|10000
SF|SF|معامل الأمان|factor of safety||2
Nt1|N₁|أسنان الترس الأول|teeth on gear 1||20
Nt2|N₂|أسنان الترس الثاني|teeth on gear 2||60
rpm1|ω₁|سرعة الترس الأول|speed of gear 1|rpm|1500
poisson|ν|نسبة بواسون|Poisson’s ratio||0.3
Vbe|V|الجهد|voltage|V|5
Rl|R|المقاومة|resistance|Ω|1000
Cf|C|السعة|capacitance|F|1e-6
fc|f_c|تردد القطع|cut-off frequency|Hz|159
gain|A|الكسب|gain||100
Rfb|R_f|مقاومة التغذية العكسية|feedback resistor|Ω|10000
Rin|R_in|مقاومة الدخل|input resistor|Ω|1000
Vled|V_f|جهد الصمام الضوئي|LED forward voltage|V|2
Iled|I|تيار الصمام|LED current|A|0.02
beta2|β|كسب الترانزستور|transistor gain||100
Ib|I_B|تيار القاعدة|base current|A|0.0001
nbit|n|عدد البتات|bits||8
fsamp|f_s|تردد أخذ العينات|sampling rate|Hz|44100
fmaxs|f_max|أعلى تردد في الإشارة|highest signal frequency|Hz|20000
Bw|B|عرض النطاق|bandwidth|Hz|3000
SNR|S/N|نسبة الإشارة للضوضاء||1000
pr1|p|الاحتمال|probability||0.5
Ninp|n|حجم المدخلات|input size||1000
fsize|S|حجم الملف|file size|MB|100
speed|R|سرعة الاتصال|data rate|Mbit/s|50
`);

EQ.add('fin',`
الفائدة البسيطة|Simple interest|I = P r t|res|Pm*ri/100*ty|Pm ri ty|فائدة ثابتة كل سنة.|The same interest each year.
المبلغ بالفائدة البسيطة|Amount with simple interest|A = P(1 + r t)|Am|Pm*(1+ri/100*ty)|Pm ri ty|الأصل + الفائدة.|Principal plus interest.
الفائدة المركبة|Compound interest|A = P(1 + r/n)^(nt)|Am|Pm*pow(1+ri/100/nc,nc*ty)|Pm ri nc ty|الفائدة على الفائدة.|Interest on interest.
الفائدة المركبة المستمرة|Continuous compounding|A = P e^(rt)|Am|Pm*exp(ri/100*ty)|Pm ri ty|أقصى تركيب ممكن.|The compounding limit.
القيمة الحالية|Present value|PV = FV / (1 + r)ⁿ|PV|FV/pow(1+ri/100,ty)|FV ri ty|قيمة مبلغ مستقبلي اليوم.|What a future sum is worth today.
القيمة المستقبلية|Future value|FV = PV (1 + r)ⁿ|FV|PV*pow(1+ri/100,ty)|PV ri ty|كم يصير مالك.|What your money grows to.
المعدل السنوي الفعلي|Effective annual rate|EAR = (1 + r/n)ⁿ − 1|res|(pow(1+ri/100/nc,nc)-1)*100|ri nc|المعدل الحقيقي بعد التركيب.|The true rate after compounding.
قسط القرض الشهري|Loan monthly payment|PMT = P r / (1 − (1 + r)^(−n))|PMT|Pm*rm/(1-pow(1+rm,-nper))|Pm rm nper|r معدل الشهر (5%/12).|r is the monthly rate (5%/12).
القيمة المستقبلية لدفعات منتظمة|Future value of an annuity|FV = PMT((1 + r)ⁿ − 1)/r|FV|PMT*(pow(1+rm,nper)-1)/rm|PMT rm nper|الادخار الشهري.|Monthly saving.
القيمة الحالية لدفعات منتظمة|Present value of an annuity|PV = PMT(1 − (1 + r)^(−n))/r|PV|PMT*(1-pow(1+rm,-nper))/rm|PMT rm nper|قيمة سلسلة دفعات اليوم.|Today’s value of a stream of payments.
القيمة الحالية لدفعة دائمة|Perpetuity|PV = PMT / r|PV|PMT/(ri/100)|PMT ri|دفعات للأبد.|Payments forever.
معدل العائد على الاستثمار|Return on investment|ROI = (العائد − التكلفة)/التكلفة × 100|res|(rev-cost)/cost*100|rev cost|ربحية الاستثمار.|Profitability of an investment.
الربح|Profit|π = الإيراد − التكلفة|profit|rev-cost|rev cost|ما يبقى لك.|What’s left for you.
هامش الربح|Profit margin|الهامش = الربح / الإيراد × 100|res|(rev-cost)/rev*100|rev cost|نسبة الربح من المبيعات.|Profit as a share of sales.
نسبة الإضافة على التكلفة|Markup|Markup = (السعر − التكلفة)/التكلفة × 100|res|(rev-cost)/cost*100|rev cost|كم أضفت على التكلفة.|How much you added to cost.
نقطة التعادل|Break-even point|Q = F / (p − v)|qty|fcost/(priceU-vcost)|fcost priceU vcost|عدد الوحدات حتى تغطي التكاليف.|Units needed to cover costs.
الإيراد الكلي|Total revenue|R = p × Q|rev|priceU*qty|priceU qty|السعر × الكمية.|Price times quantity.
التكلفة الكلية|Total cost|C = F + v Q|cost|fcost+vcost*qty|fcost vcost qty|ثابتة + متغيرة.|Fixed plus variable.
الاستهلاك بالقسط الثابت|Straight-line depreciation|D = (C − S) / n|res|(cost*100-salvage)/life|cost salvage life|قيمة النقص السنوي.|Yearly loss in value.
الاستهلاك المتناقص|Declining-balance depreciation|V = C(1 − d)ⁿ|res|cost*100*pow(1-0.2,ty)|cost ty|بمعدل 20% سنويًا.|At 20% a year.
القوة الشرائية بعد التضخم|Purchasing power after inflation|القيمة الحقيقية = A / (1 + i)ⁿ|res|Am/pow(1+inf/100,ty)|Am inf ty|كم تساوي فلوسك فعليًا.|What your money is really worth.
معدل الفائدة الحقيقي (فيشر)|Real interest rate (Fisher)|r_real ≈ r_nominal − i|res|ri-inf|ri inf|بعد خصم التضخم.|After inflation.
صافي القيمة الحالية|Net present value|NPV = Σ CFₜ/(1 + r)ᵗ − C₀|res|300/(1.05)+300/pow(1.05,2)+300/pow(1.05,3)+300/pow(1.05,4)-1000||موجب = مشروع مربح (4 تدفقات × 300).|Positive means profitable (4 flows of 300).
فترة الاسترداد|Payback period|المدة = الاستثمار / التدفق السنوي|res|1000/300||كم سنة حتى تسترجع المبلغ.|Years to earn the investment back.
الزكاة|Zakat on savings|الزكاة = المال × 2.5%|res|Pm*0.025|Pm|على المال الذي بلغ النصاب وحال عليه الحول.|On wealth above the threshold held for a lunar year.
ضريبة القيمة المضافة|Value-added tax|الضريبة = السعر × 15%|res|priceU*0.15|priceU|النسبة في السعودية 15%.|The rate in Saudi Arabia is 15%.
السعر قبل الضريبة|Price before VAT|السعر = الإجمالي / 1.15|res|priceU/1.15|priceU|استخراج السعر الأصلي.|Recovering the base price.
عائد السهم من الأرباح|Dividend yield|العائد = توزيع السهم / سعره × 100|res|1.5/priceU*100|priceU|نسبة التوزيعات.|Dividend as a share of price.
مكرر الربحية|Price-to-earnings ratio|P/E = السعر / ربح السهم|res|priceU/2|priceU|ربح السهم 2 مثال.|EPS of 2 example.
متوسط معدل النمو السنوي المركب|Compound annual growth rate|CAGR = (FV/PV)^(1/n) − 1|res|(pow(FV/PV,1/ty)-1)*100|FV PV ty|متوسط النمو سنويًا.|Average yearly growth.
`);

EQ.add('eco',`
الناتج المحلي الإجمالي|Gross domestic product|GDP = C + I + G + (X − M)|gdp|Cons+Inv+Gov+(Xp-Mimp)|Cons Inv Gov Xp Mimp|طريقة الإنفاق.|The expenditure method.
مرونة الطلب السعرية|Price elasticity of demand|E = %ΔQ / %ΔP|res|dQ/dPr|dQ dPr|أكبر من 1 (مطلقًا) = طلب مرن.|Above 1 (in size) is elastic.
المضاعف الاقتصادي|Spending multiplier|k = 1 / (1 − MPC)|res|1/(1-mpc)|mpc|كل ريال إنفاق يولد أكثر من ريال.|Each riyal spent creates more.
معدل التضخم|Inflation rate|i = (CPI₁ − CPI₀)/CPI₀ × 100|res|(CPI1-CPI0)/CPI0*100|CPI1 CPI0|ارتفاع الأسعار.|Rising prices.
نصيب الفرد من الناتج|GDP per capita|GDP / السكان|res|gdp*1e9/35e6|gdp|35 مليون نسمة مثال.|35 million people example.
الميزان التجاري|Trade balance|X − M|res|Xp-Mimp|Xp Mimp|سالب = عجز.|Negative is a deficit.
معدل البطالة|Unemployment rate|العاطلون / القوى العاملة × 100|res|1.2/18*100||1.2 مليون من 18 مليون.|1.2 million of 18 million.
التكلفة الحدية|Marginal cost|MC = ΔC / ΔQ|res|(cost*100-fcost)/qty|cost fcost qty|تكلفة وحدة إضافية.|Cost of one more unit.
الإيراد الحدي|Marginal revenue|MR = ΔR / ΔQ|res|priceU|priceU|في سوق المنافسة = السعر.|Equals price in perfect competition.
شرط تعظيم الربح|Profit maximisation|MR = MC||||أنتج حتى يتساوى الحدّيان.|Produce until they match.
الطلب الخطي|Linear demand|Q_d = a − b P|qty|200-4*priceU|priceU|كلما زاد السعر قل الطلب.|Higher price, lower demand.
العرض الخطي|Linear supply|Q_s = c + d P|qty|20+2*priceU|priceU|كلما زاد السعر زاد العرض.|Higher price, more supply.
سعر التوازن|Equilibrium price|Q_d = Q_s ⇒ P* = (a − c)/(b + d)|res|(200-20)/(4+2)||حيث يلتقي العرض والطلب.|Where supply meets demand.
معامل جيني (من مساحة لورنز)|Gini coefficient|G = A / (A + B)|res|0.15/0.5||0 مساواة تامة، 1 عدم مساواة تامة.|0 equal, 1 totally unequal.
قانون أوكون|Okun’s law|ΔGDP% ≈ 3 − 2 ΔU|res|3-2*1||كل 1% بطالة ≈ 2% نمو أقل.|Each 1% unemployment ≈ 2% less growth.
نسبة الدين إلى الناتج|Debt-to-GDP ratio|الدين / GDP × 100|res|250/gdp*100|gdp|دين 250 مليار مثال.|250 bn debt example.
القيمة المضافة|Value added|القيمة المضافة = قيمة الناتج − المدخلات||||مساهمة كل مرحلة إنتاج.|Each production stage’s contribution.
معادلة التبادل النقدي|Quantity theory of money|M V = P Y||||العلاقة بين النقود والأسعار.|Money and prices.
فائض المستهلك|Consumer surplus|½ × Q* × (Pmax − P*)|res|0.5*80*(50-30)||ما يوفره المستهلك.|What buyers save.
`);

EQ.add('eng',`
الإجهاد|Stress|σ = F / A|stress|Fload/Ar|Fload Ar|القوة على المساحة.|Force per area.
الانفعال|Strain|ε = ΔL / L₀|strain|dL/L0l|dL L0l|التمدد النسبي.|Relative stretch.
معامل يونغ|Young’s modulus|E = σ / ε|Ebeam|stress/strain|stress strain|صلابة المادة.|Material stiffness.
الاستطالة تحت حمل|Elongation under load|ΔL = F L / (A E)|dL|Fload*L0l/(Ar*Ebeam)|Fload L0l Ar Ebeam|كم يتمدد القضيب.|How much a rod stretches.
إجهاد الانحناء|Bending stress|σ = M c / I|stress|Mbend*cdist/Ibeam|Mbend cdist Ibeam|في العوارض.|In beams.
عزم الانحناء لعارضة بسيطة|Max moment, simply supported beam|M = F L / 4|Mbend|Fload*Lbeam/4|Fload Lbeam|حمل في المنتصف.|Load at the middle.
ترخيم عارضة بسيطة|Deflection, simply supported beam|δ = F L³ / (48 E I)|res|Fload*pow(Lbeam,3)/(48*Ebeam*Ibeam)|Fload Lbeam Ebeam Ibeam|كم تنحني العارضة.|How much the beam sags.
ترخيم عارضة كابولية|Cantilever deflection|δ = F L³ / (3 E I)|res|Fload*pow(Lbeam,3)/(3*Ebeam*Ibeam)|Fload Lbeam Ebeam Ibeam|مثل لوح القفز.|Like a diving board.
عزم القصور لمقطع مستطيل|Second moment of a rectangle|I = b h³ / 12|Ibeam|0.1*pow(0.2,3)/12||عارضة 10 × 20 cm.|A 10 × 20 cm beam.
معامل الأمان|Factor of safety|SF = الإجهاد الأقصى / إجهاد التشغيل|SF|4e8/stress|stress|هامش أمان التصميم.|The design safety margin.
نسبة التروس|Gear ratio|ω₂ = ω₁ N₁ / N₂|res|rpm1*Nt1/Nt2|rpm1 Nt1 Nt2|ترس كبير = دوران أبطأ وعزم أكبر.|Bigger gear: slower but stronger.
الفائدة الميكانيكية|Mechanical advantage|MA = F_out / F_in|res|Fload/F|Fload F|مثل الرافعة والبكرة.|Like levers and pulleys.
البكرات المتعددة|Pulley system|F = W / n|F|Wt/nn|Wt nn|n عدد الحبال الحاملة.|n is the number of supporting ropes.
المستوى المائل كآلة بسيطة|Inclined plane advantage|MA = L / h|res|Lbeam/h|Lbeam h|منحدر أطول = جهد أقل.|Longer ramp, less effort.
القدرة الميكانيكية للمحرك|Engine power from torque|P = 2π N τ / 60|P|2*PI*rpm1*tau/60|rpm1 tau|N بالدورات في الدقيقة.|N in rpm.
معدل الإنتاج|Production rate|المعدل = الوحدات / الزمن|res|qty/8|qty|خلال وردية 8 ساعات.|Over an 8-hour shift.
نسبة بواسون|Poisson’s ratio|ν = −ε_lat / ε_axial|poisson|0.0003/strain|strain|انكماش جانبي عند الشد.|Sideways shrink when stretched.
الإجهاد الحراري|Thermal stress|σ = E α ΔT|stress|Ebeam*al*dT|Ebeam al dT|عندما يمنع التمدد.|When expansion is blocked.
عدد ماخ في الهندسة|Mach number (aerospace)|M = v / a|Mach|v/343|v|a سرعة الصوت المحلية.|a is the local speed of sound.
معادلة الطيران (الرفع)|Lift equation|L = ½ ρ v² S C_L|F|0.5*1.225*v*v*Ar*1.2|v Ar|معامل الرفع 1.2.|Lift coefficient 1.2.
كفاءة المضخة|Pump efficiency|η = ρ g Q H / P_in|eta|1000*9.8*Q*hd/5000*100|Q hd|قدرة دخل 5 kW.|5 kW input power.
معادلة بيرنولي الهندسية|Engineering Bernoulli (head)|H = P/(ρg) + v²/(2g) + z|res|Pr/(rho*g)+v*v/(2*g)+hd|Pr rho g v hd|الطاقة لكل وزن.|Energy per weight.
حمل الثلج على السقف|Snow load|w = ρ g d|res|300*9.8*0.5||نصف متر ثلج بكثافة 300.|Half a metre of snow at density 300.
المقاومة الكهربائية للكابلات|Cable voltage drop|ΔV = I R = I ρ L / A|Vv|Iamp*rhoe*Ilen*2/Awire|Iamp rhoe Ilen Awire|ذهاب وإياب.|There and back.
`);

EQ.add('ele',`
قانون أوم (إلكترونيات)|Ohm’s law (electronics)|V = I R|Vbe|Iamp*Rl|Iamp Rl|أساس كل دائرة.|The basis of every circuit.
مقاومة الصمام الضوئي|LED series resistor|R = (V − V_f) / I|Rl|(Vbe-Vled)/Iled|Vbe Vled Iled|حماية الصمام من الاحتراق.|Protects the LED from burning out.
تردد القطع لمرشح RC|RC filter cut-off|f_c = 1 / (2π R C)|fc|1/(2*PI*Rl*Cf)|Rl Cf|يمرر الترددات المنخفضة أو العالية.|Passes low or high frequencies.
الكسب بالديسيبل|Gain in decibels|G = 20 log(V_out / V_in)|res|20*log10(gain)|gain|كسب 100 = 40 dB.|A gain of 100 is 40 dB.
كسب المضخم العاكس|Inverting amplifier gain|A = −R_f / R_in|res|-Rfb/Rin|Rfb Rin|مضخم العمليات.|Op-amp circuit.
كسب المضخم غير العاكس|Non-inverting amplifier gain|A = 1 + R_f / R_in|res|1+Rfb/Rin|Rfb Rin|لا يعكس الإشارة.|Doesn’t invert the signal.
تيار المجمّع في الترانزستور|Transistor collector current|I_C = β I_B|Iamp|beta2*Ib|beta2 Ib|تضخيم التيار.|Current amplification.
مؤقّت 555 (التردد)|555 timer frequency|f = 1.44 / ((R₁ + 2R₂) C)|f|1.44/((Rl+2*Rl)*Cf)|Rl Cf|لتوليد نبضات.|For generating pulses.
تردد رنين LC|LC resonance|f = 1 / (2π √(L C))|f|1/(2*PI*sqrt(Lind*Cf))|Lind Cf|دوائر الراديو.|Radio circuits.
القدرة المبددة|Power dissipation|P = I² R|Pw|Iamp*Iamp*Rl|Iamp Rl|اختيار مقاومة تتحمل الحرارة.|Choosing a resistor that copes with heat.
دقة المحوّل الرقمي|ADC resolution|الدقة = V_ref / 2ⁿ|res|Vbe/pow(2,nbit)|Vbe nbit|أصغر تغير يمكن قياسه.|Smallest measurable change.
عدد مستويات الكم|Quantisation levels|L = 2ⁿ|res|pow(2,nbit)|nbit|8 بت = 256 مستوى.|8 bits = 256 levels.
نظرية نايكويست|Nyquist sampling theorem|f_s ≥ 2 f_max|res|2*fmaxs|fmaxs|لهذا الصوت الرقمي 44.1 kHz.|Why digital audio uses 44.1 kHz.
سعة قناة شانون|Shannon channel capacity|C = B log₂(1 + S/N)|res|Bw*log2(1+SNR)|Bw SNR|أقصى سرعة نقل بيانات.|Maximum data rate.
الطاقة المخزّنة في البطارية|Battery energy|E = V × Ah|res|3.7*4||بطارية جوال 3.7 V و 4 Ah ≈ 14.8 Wh.|A 3.7 V, 4 Ah phone battery ≈ 14.8 Wh.
زمن الشحن|Charging time|t = السعة / تيار الشحن|t|4/2||بالساعات.|In hours.
`);

EQ.add('cs',`
عدد القيم بعدد من البتات|Values with n bits|2ⁿ|res|pow(2,nbit)|nbit|بايت = 256 قيمة.|A byte holds 256 values.
تحويل ثنائي إلى عشري|Binary to decimal|N = Σ bᵢ 2ⁱ|res|1*8+0*4+1*2+1*1||1011₂ = 11.|1011₂ = 11.
محتوى المعلومات|Information content|I = −log₂ p|res|-log2(pr1)|pr1|حدث نادر = معلومات أكثر.|Rare events carry more information.
إنتروبيا شانون|Shannon entropy|H = −Σ p log₂ p|res|-(pr1*log2(pr1)+(1-pr1)*log2(1-pr1))|pr1|عملة عادلة = 1 بت.|A fair coin is 1 bit.
زمن التحميل|Download time|t = حجم الملف × 8 / السرعة|t|fsize*8/speed|fsize speed|MB إلى ميغابت.|Megabytes to megabits.
البحث الثنائي|Binary search steps|خطوات ≈ log₂ n|res|ceil(log2(Ninp))|Ninp|ألف عنصر ≈ 10 خطوات.|1000 items ≈ 10 steps.
تعقيد الفرز السريع|Merge/quick sort complexity|O(n log n)|res|Ninp*log2(Ninp)|Ninp|أسرع بكثير من n².|Much faster than n².
تعقيد الفرز التربيعي|Bubble sort complexity|O(n²)|res|Ninp*Ninp|Ninp|بطيء للبيانات الكبيرة.|Slow on big data.
قانون مور|Moore’s law|N = N₀ × 2^(t/2)|res|1000*pow(2,ty/2)|ty|الترانزستورات تتضاعف كل سنتين تقريبًا.|Transistors double roughly every two years.
قانون أمدال|Amdahl’s law|S = 1 / ((1 − p) + p/n)|res|1/((1-0.9)+0.9/nobj)|nobj|تسريع البرنامج بعدة معالجات (90% متوازٍ).|Speed-up with many processors (90% parallel).
عدد كلمات المرور الممكنة|Password combinations|Nᴸ|res|pow(62,nbit)|nbit|62 رمزًا وطول L.|62 symbols, length L.
بتات الإنتروبيا لكلمة مرور|Password entropy|H = L log₂ N|res|nbit*log2(62)|nbit|أطول = أقوى.|Longer means stronger.
الدالة السيني (Sigmoid)|Sigmoid function|σ(x) = 1 / (1 + e^(−x))|yv|1/(1+exp(-xx))|xx|في الذكاء الاصطناعي.|Used in AI.
دالة ReLU|ReLU activation|f(x) = max(0, x)|yv|max(0,xx)|xx|أشهر دالة تنشيط.|The most popular activation.
دالة Softmax|Softmax|σᵢ = e^(zᵢ) / Σ e^(zⱼ)|res|exp(2)/(exp(2)+exp(1)+exp(0.1))||تحويل الدرجات لاحتمالات.|Turning scores into probabilities.
متوسط مربع الخطأ|Mean squared error|MSE = Σ(y − ŷ)² / n|res|(1+4+0+1)/4||قياس خطأ النموذج.|Measuring model error.
الانتروبيا المتقاطعة|Cross-entropy loss|L = −Σ y log ŷ|res|-log(0.8)||خسارة التصنيف.|Classification loss.
النزول التدريجي|Gradient descent update|θ ← θ − η ∇L|res|1-0.1*2||خطوة تعلم الآلة.|How machines learn.
الدقة في التصنيف|Classification accuracy|الدقة = (TP + TN) / الكل|res|(90+85)/200||نسبة التوقعات الصحيحة.|Share of correct predictions.
مقياس F1|F1 score|F1 = 2PR / (P + R)|res|2*0.86*0.9/(0.86+0.9)||توازن بين الدقة والاستدعاء.|Balances precision and recall.
`);
