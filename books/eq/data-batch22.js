/* موسوعة معادلات إيلان — مختبر الموائع: الوزن في الماء، الطفو، الضغط والعمق، الجريان، اللزوجة */
EQ.syms(`
flWa|W_air|الوزن في الهواء|weight in air|N|5
flWw|W_w|الوزن داخل الماء|weight in water|N|3
flWl|W_l|الوزن داخل السائل المجهول|weight in the unknown liquid|N|3.4
flFb|F_b|قوة الطفو|buoyant force|N|2
flrw|ρ_w|كثافة الماء|density of water|kg/m³|1000
flro|ρ|كثافة الجسم|density of the object|kg/m³|2500
flrl|ρ_l|كثافة السائل|density of the liquid|kg/m³|800
flV1|V₁|قراءة المخبار قبل|cylinder reading before|mL|50
flV2|V₂|قراءة المخبار بعد|cylinder reading after|mL|74
flV|V|الحجم|volume|mL|24
flH|H|ارتفاع القطعة الطافية|height of the floating block|m|0.06
flrb|ρ_b|كثافة القطعة|density of the block|kg/m³|600
fld|d|العمق الغاطس|submerged depth|m|0.036
flVr|V|حجم الطوف|raft volume|m³|0.5
flmL|m|أقصى حمولة|maximum load|kg|200
flmh|m|كتلة الهيدروميتر|hydrometer mass|kg|0.02
flAh|A|مساحة مقطع الساق|stem cross-section|m²|0.0002
flhh|h|طول الجزء الغاطس|submerged length|m|0.1
flr1|ρ₁|كثافة السائل الأول|density of the first liquid|kg/m³|1000
flh1|h₁|ارتفاع السائل الأول|height of the first liquid|m|0.1
flr2|ρ₂|كثافة السائل الثاني|density of the second liquid|kg/m³|800
flh2|h₂|ارتفاع السائل الثاني|height of the second liquid|m|0.125
flDh|Δh|فرق ارتفاع المانومتر|manometer height difference|m|0.05
flP|P|الضغط|pressure|Pa|490
flg|g|تسارع الجاذبية|gravity|m/s²|9.8
flhd|h|العمق|depth|m|20
flatm|n|الضغط بالأجواء|pressure in atmospheres|atm|2.94
flA|A|المساحة|area|m²|0.25
flF|F|القوة|force|N|49000
flyc|y_c|عمق مركز الضغط|depth of the centre of pressure|m|2
flhw|h|عمق الماء خلف الجدار|water depth behind the wall|m|3
flra|ρ_air|كثافة الهواء|density of air|kg/m³|1.2
flrhe|ρ_gas|كثافة غاز البالون|density of the balloon gas|kg/m³|0.18
flVb|V|حجم البالون|balloon volume|m³|0.01
flFl|F|قوة الرفع|lift force|N|0.1
flml|m|الكتلة اللي يقدر يرفعها|mass it can lift|kg|0.0102
flri|ρ_ice|كثافة الثلج|density of ice|kg/m³|917
flrs|ρ_sea|كثافة ماء البحر|density of sea water|kg/m³|1025
flfa|f|نسبة الظاهر فوق الماء|fraction above the water||0.105
flt|t|الزمن|time|s|30
flQ|Q|معدل الجريان|flow rate|m³/s|0.0003
flVt|V|حجم الخزان|tank volume|m³|1
flhs|h|ارتفاع الماء فوق الثقب|water height above the hole|m|0.4
flHs|H|ارتفاع الثقب عن الأرض|height of the hole above the floor|m|0.6
flx|x|بُعد سقوط النافورة|horizontal reach of the jet|m|0.98
flAt|A_t|مساحة مقطع الخزان|tank cross-section|m²|0.1
flAo|A_o|مساحة الثقب|hole area|m²|0.0001
fltd|t|زمن تفريغ الخزان|time to empty the tank|s|286
flrp|r|نصف قطر الأنبوب|pipe radius|m|0.01
flv|v|السرعة|speed|m/s|0.95
flA1|A₁|مساحة المكبس الصغير|small piston area|m²|0.001
flA2|A₂|مساحة المكبس الكبير|large piston area|m²|0.05
flMA|MA|الفائدة الآلية|mechanical advantage||50
fld1|d₁|مسافة نزول المكبس الصغير|small piston travel|m|0.1
fld2|d₂|مسافة ارتفاع المكبس الكبير|large piston rise|m|0.002
fldP|ΔP|فرق الضغط في أنبوب بيتو|Pitot pressure difference|Pa|500
fleta|η|لزوجة السائل|viscosity|Pa·s|0.9
flrs2|r|نصف قطر الكرة|sphere radius|m|0.002
flvs|v|سرعة الكرة|sphere speed|m/s|0.01
flFd|F|قوة السحب اللزجة|viscous drag|N|0.00034
flrk|ρ_s|كثافة الكرة|sphere density|kg/m³|7800
flrf|ρ_f|كثافة السائل اللزج|density of the viscous fluid|kg/m³|1260
flmd|ṁ|معدل جريان الكتلة|mass flow rate|kg/s|0.3
flPw|P|قدرة المضخة|pump power|W|58.8
flhp|h|ارتفاع الرفع|lifting height|m|20
flmm|mmHg|الضغط بالمليمتر زئبق|pressure in mmHg|mmHg|120
flPa|P|الضغط بالباسكال|pressure in pascals|Pa|16000
flalt|h|الارتفاع عن سطح البحر|altitude|m|2000
flP0|P₀|الضغط عند سطح البحر|sea-level pressure|kPa|101.3
flPh|P|الضغط على الارتفاع|pressure at altitude|kPa|79.7
flm1|m₁|كتلة القارورة فاضية|empty bottle mass|g|30
flm2|m₂|القارورة مع السائل|bottle with the liquid|g|70
flm3|m₃|القارورة مع الماء|bottle with water|g|80
flSG|SG|الكثافة النسبية|specific gravity||0.8
flAr|A|مساحة فتحة مقياس المطر|rain-gauge opening area|cm²|200
fldr|d|عمق المطر|rainfall depth|cm|1.5
flVr2|V|حجم ماء المطر|rain-water volume|cm³|300
`);

EQ.add('flb',`
قوة الطفو من الميزان|Buoyant force from a spring balance|F_b = W_air − W_w|flFb|flWa-flWw|flWa flWw|الفرق بين القراءتين هو دفع الماء للثقل لفوق.|The drop in the reading is the water pushing up.
كثافة الجسم بالوزن في الماء|Density of an object by weighing in water|ρ = ρ_w W_air / (W_air − W_w)|flro|flrw*flWa/(flWa-flWw)|flrw flWa flWw|نعرف كثافة الحجر بدون ما نقيس حجمه.|Find a stone’s density without measuring its volume.
كثافة سائل مجهول بالوزن|Density of an unknown liquid by weighing|ρ_l = ρ_w (W_air − W_l) / (W_air − W_w)|flrl|flrw*(flWa-flWl)/(flWa-flWw)|flrw flWa flWl flWw|نفس الثقل نغطّسه في الماء ثم في السائل.|Dip the same weight in water, then in the liquid.
الحجم بالإزاحة|Volume by displacement|V = V₂ − V₁|flV|flV2-flV1|flV2 flV1|الطريقة اللي اكتشفها أرخميدس للأجسام غير المنتظمة.|The way to measure odd-shaped objects.
عمق غطس قطعة طافية|Depth a floating block sinks|d = H ρ_b / ρ_w|fld|flH*flrb/flrw|flH flrb flrw|خشب كثافته 600 يغطس 60% من ارتفاعه.|Wood of density 600 sinks 60% of its height.
أقصى حمولة لطوف|Maximum load on a raft|m = V (ρ_w − ρ_b)|flmL|flVr*(flrw-flrb)|flVr flrw flrb|الطوف يشيل لين يغطس كله تحت السطح.|A raft carries load until it is fully under.
الهيدروميتر|Hydrometer|ρ = m / (A h)|flrl|flmh/(flAh*flhh)|flmh flAh flhh|كل ما غطس أعمق كان السائل أخف.|The deeper it sinks, the lighter the liquid.
المانومتر على شكل U|U-tube manometer|P = ρ g Δh|flP|flrw*flg*flDh|flrw flg flDh|فرق 5 سم ماء يعني 490 باسكال.|5 cm of water means 490 Pa.
سائلين في أنبوب U|Two liquids in a U-tube|h₂ = ρ₁ h₁ / ρ₂|flh2|flr1*flh1/flr2|flr1 flh1 flr2|السائل الأخف يرتفع أكثر عشان يوازن.|The lighter liquid stands taller to balance.
الضغط بالأجواء للغواص|Pressure on a diver in atmospheres|n = 1 + h / 10.3|flatm|1+flhd/10.3|flhd|كل 10 أمتار ماء تضيف جوًا كاملًا.|Every 10 m of water adds one atmosphere.
القوة على باب غوّاصة|Force on a submarine hatch|F = ρ g h A|flF|flrw*flg*flhd*flA|flrw flg flhd flA|على عمق 20 م، باب ربع متر مربع يتحمل قرابة 49 ألف نيوتن.|At 20 m a quarter-square-metre hatch holds back about 49 kN.
مركز الضغط على جدار رأسي|Centre of pressure on a vertical wall|y_c = 2h / 3|flyc|2*flhw/3|flhw|الدفع يتركز تحت المنتصف لأن الضغط يزيد مع العمق.|The push acts below the middle because pressure grows with depth.
رفع البالون|Lift of a balloon|F = (ρ_air − ρ_gas) V g|flFl|(flra-flrhe)*flVb*flg|flra flrhe flVb flg|الهيليوم أخف من الهواء سبع مرات تقريبًا.|Helium is about seven times lighter than air.
الكتلة اللي يرفعها البالون|Mass a balloon can lift|m = V (ρ_air − ρ_gas)|flml|flVb*(flra-flrhe)|flVb flra flrhe|بالون 10 لتر يرفع قرابة 10 جرامات.|A 10-litre balloon lifts about 10 g.
الجزء الظاهر من الجبل الجليدي|Part of an iceberg above water|f = 1 − ρ_ice / ρ_sea|flfa|1-flri/flrs|flri flrs|حوالي 90% من الجبل الجليدي مخفي تحت الماء.|About 90% of an iceberg hides below the surface.
معدل الجريان بالدلو والساعة|Flow rate with a bucket and a stopwatch|Q = V / t|flQ|flVt/flt|flVt flt|نعبّي دلو ونوقّت، وهذي أبسط طريقة.|Fill a bucket and time it — the simplest way.
زمن تعبئة خزان|Time to fill a tank|t = V / Q|flt|flVt/flQ|flVt flQ|خزان متر مكعب بحنفية 0.3 لتر/ث ياخذ قرابة ساعة.|A 1 m³ tank from a 0.3 L/s tap takes about an hour.
بعد سقوط نافورة من ثقب|Reach of a jet from a hole|x = 2 √(h H)|flx|2*sqrt(flhs*flHs)|flhs flHs|أبعد نافورة تطلع من الثقب اللي بالنص.|The jet from the middle hole reaches farthest.
زمن تفريغ خزان من ثقب|Time to empty a tank through a hole|t = (A_t / A_o) √(2h / g)|fltd|flAt/flAo*sqrt(2*flhs/flg)|flAt flAo flhs flg|الماء يخرج أبطأ كل ما نزل مستواه.|The flow slows as the level drops.
السرعة في أنبوب من الجريان|Speed in a pipe from the flow rate|v = Q / (π r²)|flv|flQ/(PI*flrp*flrp)|flQ flrp|نفس الجريان في أنبوب أضيق يصير أسرع.|The same flow goes faster in a narrower pipe.
الفائدة الآلية للرافعة الهيدروليكية|Mechanical advantage of a hydraulic jack|MA = A₂ / A₁|flMA|flA2/flA1|flA2 flA1|قوة يد صغيرة ترفع سيارة.|A small push lifts a car.
مسافة المكبس الكبير|Distance moved by the large piston|d₂ = d₁ A₁ / A₂|fld2|fld1*flA1/flA2|fld1 flA1 flA2|نكسب قوة ونخسر مسافة، والشغل نفسه.|We gain force but lose distance; the work is the same.
أنبوب بيتو لقياس السرعة|Pitot tube speed|v = √(2 ΔP / ρ)|flv|sqrt(2*fldP/flra)|fldP flra|الطائرات تقيس سرعتها بهذي الطريقة.|Aircraft measure their airspeed this way.
سحب ستوكس اللزج|Stokes viscous drag|F = 6π η r v|flFd|6*PI*fleta*flrs2*flvs|fleta flrs2 flvs|صحيح للكرات الصغيرة البطيئة في سائل ثقيل.|Valid for small, slow spheres in a thick liquid.
مقياس اللزوجة بالكرة الساقطة|Falling-ball viscometer|η = 2 r² (ρ_s − ρ_f) g / (9 v)|fleta|2*flrs2*flrs2*(flrk-flrf)*flg/(9*flvs)|flrs2 flrk flrf flg flvs|نوقّت كرة حديد تنزل في عسل أو جلسرين.|Time a steel ball sinking through honey or glycerine.
معدل جريان الكتلة|Mass flow rate|ṁ = ρ Q|flmd|flrw*flQ|flrw flQ|كم كيلو ماء يمر كل ثانية.|How many kilograms of water pass each second.
قدرة مضخة ترفع الماء|Power of a pump lifting water|P = ρ g Q h|flPw|flrw*flg*flQ*flhp|flrw flg flQ flhp|القدرة اللازمة لرفع الماء لسطح عمارة.|The power needed to pump water up to a roof tank.
تحويل ضغط الدم إلى باسكال|Blood pressure to pascals|P = 133.3 × mmHg|flPa|133.3*flmm|flmm|120 ملم زئبق تساوي قرابة 16 ألف باسكال.|120 mmHg is about 16 kPa.
الضغط الجوي مع الارتفاع|Air pressure with altitude|P = P₀ e^(−h/8400)|flPh|flP0*exp(-flalt/8400)|flP0 flalt|في أبها (حوالي 2200 م) الضغط أقل بالربع تقريبًا.|At about 2,200 m, as in Abha, the pressure is roughly a quarter lower.
قارورة الكثافة النسبية|Specific-gravity bottle|SG = (m₂ − m₁) / (m₃ − m₁)|flSG|(flm2-flm1)/(flm3-flm1)|flm2 flm1 flm3|نقارن كتلة السائل بكتلة نفس الحجم ماء.|Compare the liquid with the same volume of water.
حجم المطر في المقياس|Rain collected in a gauge|V = A d|flVr2|flAr*fldr|flAr fldr|عمق المطر ما يعتمد على حجم فتحة المقياس.|The rainfall depth does not depend on the gauge’s size.
`);
