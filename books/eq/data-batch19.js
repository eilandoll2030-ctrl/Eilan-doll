/* موسوعة معادلات إيلان — المعايرة والتحليل الحجمي، التحليل الوزني وأدوات المختبر */
EQ.syms(`
# ---- titration
ttVi|V₁|قراءة السحاحة قبل|initial burette reading|mL|0.50
ttVf|V₂|قراءة السحاحة بعد|final burette reading|mL|25.30
ttV|V|حجم المادة المعايِرة المستهلك|titre volume|mL|24.80
ttM|M|تركيز المحلول القياسي|standard solution molarity|mol/L|0.1
ttn|n|عدد مولات المادة المعايِرة|moles of titrant|mol|0.00248
tta|a|معامل المادة المجهولة في المعادلة|coefficient of analyte||1
ttb|b|معامل المادة المعايِرة في المعادلة|coefficient of titrant||1
ttna|nₓ|عدد مولات المادة المجهولة|moles of analyte|mol|0.00248
ttVx|Vₓ|حجم المادة المجهولة|analyte volume|mL|25
ttMx|Mₓ|تركيز المادة المجهولة|analyte molarity|mol/L|0.0992
ttMr|Mᵣ|الكتلة المولية|molar mass|g/mol|60.05
ttm|m|الكتلة|mass|g|0.149
ttms|m_s|كتلة العينة|sample mass|g|0.16
ttpur|P|النقاوة|purity|%|93
ttz|z|عدد المكافئات|equivalents per mole||1
ttN|N|العيارية|normality|eq/L|0.1
ttNa|Nₐ|عيارية الحمض|acid normality|eq/L|0.1
ttNb|N_b|عيارية القاعدة|base normality|eq/L|0.1
ttEW|EW|الوزن المكافئ|equivalent weight|g/eq|60.05
ttnt|n_t|المولات الكلية المضافة|total moles added|mol|0.005
ttnbk|n_r|المولات المتبقية (المعايرة الرجعية)|moles left over (back titration)|mol|0.0018
ttV1|V₁|القراءة الأولى|first titre|mL|24.80
ttV2|V₂|القراءة الثانية|second titre|mL|24.75
ttV3|V₃|القراءة الثالثة|third titre|mL|24.85
ttVav|V̄|متوسط الحجم|mean titre|mL|24.80
ttVmx|V_max|أكبر قراءة|largest titre|mL|24.85
ttVmn|V_min|أصغر قراءة|smallest titre|mL|24.75
ttrng|R|مدى القراءات|range of titres|mL|0.10
tterr|e|خطأ القراءة|reading uncertainty|mL|0.05
ttpe|%e|نسبة الخطأ|percentage error|%|0.4
ttVal|V_al|حجم الجزء المأخوذ|aliquot volume|mL|25
ttVfl|V_fl|حجم الدورق الحجمي|volumetric flask volume|mL|250
ttDF|DF|معامل التخفيف|dilution factor||10
ttCd|C_d|تركيز المحلول المخفف|diluted concentration|mol/L|0.099
ttC0|C₀|تركيز المحلول الأصلي|original concentration|mol/L|0.99
ttA|[A⁻]|تركيز القاعدة المرافقة|conjugate base concentration|mol/L|0.1
ttHA|[HA]|تركيز الحمض الضعيف|weak acid concentration|mol/L|0.1
ttCs|C|تركيز الملح عند التكافؤ|salt concentration at equivalence|mol/L|0.05
ttVeq|V_eq|حجم نقطة التكافؤ|equivalence volume|mL|25
ttdpH|ΔpH|التغير في pH|change in pH||6
ttdV|ΔV|الحجم المضاف|volume added|mL|0.1
ttsl|S|ميل منحنى المعايرة|titration-curve slope|1/mL|60
tthard|H|عسر الماء (ككربونات كالسيوم)|water hardness (as CaCO₃)|mg/L|180
ttVw|V_w|حجم عينة الماء|water sample volume|mL|50
ttVvin|V_v|حجم الخل|vinegar volume|mL|10
ttac|%|نسبة حمض الأسيتيك|acetic acid content|g/100 mL|4.5
ttmKHP|m|كتلة فثالات البوتاسيوم الهيدروجينية|mass of KHP|g|0.5105
ttCl|m_Cl|كتلة الكلوريد|mass of chloride|mg|88
ttnHCl|n_H|مولات حمض المعدة المضاف|moles of acid added|mol|0.005
ttVbb|V_b|حجم القاعدة المضافة (قبل التكافؤ)|base added (before equivalence)|mL|20
ttVba|V_b|حجم القاعدة المضافة (بعد التكافؤ)|base added (after equivalence)|mL|30
ttnNa|n_b|مولات القاعدة في المعايرة الرجعية|moles of base in back titration|mol|0.0021
ttneu|n_n|المولات التي عادلها الدواء|moles neutralised by the tablet|mol|0.0029
# ---- gravimetric & lab measurement
gvp|m_p|كتلة الراسب|precipitate mass|g|0.5
gvGF|GF|المعامل الوزني|gravimetric factor||0.2474
gvMa|Mᵣ(x)|الكتلة المولية للمادة المطلوبة|molar mass of analyte|g/mol|35.45
gvMp|Mᵣ(p)|الكتلة المولية للراسب|molar mass of precipitate|g/mol|143.32
gva|a|عدد ذرات المادة في الراسب|analyte units per formula||1
gvx|mₓ|كتلة المادة المطلوبة|analyte mass|g|0.124
gvm0|m₀|كتلة الجفنة فارغة|empty crucible mass|g|20.1500
gvm1|m₁|كتلة الجفنة مع العينة قبل التسخين|crucible + sample before heating|g|22.6460
gvm2|m₂|كتلة الجفنة مع العينة بعد التسخين|crucible + sample after heating|g|21.7460
gvw|w|نسبة الماء المفقود|water lost|%|36.1
gvnw|x|عدد جزيئات ماء التبلور|water of crystallisation||5
gvanh|n₁|مولات الملح اللامائي|moles of anhydrous salt|mol|0.00999
gvnwat|n₂|مولات الماء|moles of water|mol|0.04995
gvrd|R|القراءة|reading|mL|25.0
gvres|r|أصغر تدريجة|smallest division|mL|0.1
gvunc|u|عدم اليقين في القراءة|reading uncertainty|mL|0.05
gvVm|V|حجم الماء المقاس|measured water volume|mL|10.02
gvmw|m|كتلة الماء|mass of water|g|9.99
gvrho|ρ|كثافة الماء عند الحرارة|density of water at that temperature|g/mL|0.9982
gvmt|m_t|القيمة الصحيحة|true value|g|10.00
gvme|m_e|القيمة المقاسة|measured value|g|10.03
gvacc|E|الخطأ النسبي|relative error|%|0.3
`);

EQ.add('ttr',`
حجم المادة المعايِرة من السحاحة|Titre from burette readings|V = V₂ − V₁|ttV|ttVf-ttVi|ttVf ttVi|اقرأ السحاحة قبل وبعد، والفرق هو اللي نزل.|Read the burette before and after; the difference is what ran out.
مولات المادة المعايِرة|Moles of titrant|n = M × V / 1000|ttn|ttM*ttV/1000|ttM ttV|نقسم على 1000 لأن الحجم بالمللتر.|Divide by 1000 because the volume is in mL.
مولات المادة المجهولة من نسبة المعادلة|Moles of analyte from the mole ratio|nₓ = n × a / b|ttna|ttn*tta/ttb|ttn tta ttb|المعاملات في المعادلة الموزونة تحدد النسبة.|The coefficients in the balanced equation give the ratio.
تركيز المادة المجهولة بالمعايرة|Unknown concentration by titration|Mₓ = M × V × a / (b × Vₓ)|ttMx|ttM*ttV*tta/(ttb*ttVx)|ttM ttV tta ttb ttVx|القانون العام لأي معايرة.|The general rule for any titration.
كتلة المادة المجهولة من المعايرة|Analyte mass from a titration|m = nₓ × Mᵣ|ttm|ttna*ttMr|ttna ttMr|نحوّل المولات إلى جرامات.|Turns moles into grams.
نقاوة العينة|Sample purity|P = m / m_s × 100|ttpur|ttm/ttms*100|ttm ttms|كم من العينة هو المادة النقية فعلًا.|How much of the sample is the pure substance.
العيارية|Normality|N = M × z|ttN|ttM*ttz|ttM ttz|حمض الكبريتيك مثلًا z = 2.|For sulfuric acid, z = 2.
المعايرة بالعيارية|Titration with normality|Nₐ Vₐ = N_b V_b|ttNb|ttNa*Va/Vb|ttNa Va Vb|بالعيارية ما نحتاج نسبة المعادلة.|With normality the mole ratio is already built in.
الوزن المكافئ|Equivalent weight|EW = Mᵣ / z|ttEW|ttMr/ttz|ttMr ttz|كتلة مكافئ واحد من المادة.|The mass of one equivalent.
المعايرة الرجعية|Back titration|nₓ = (n_t − n_r) × a / b|ttna|(ttnt-ttnbk)*tta/ttb|ttnt ttnbk tta ttb|نضيف زيادة معروفة ونعاير الباقي، مفيدة للمواد اللي ما تذوب.|Add a known excess, then titrate what is left; handy for insoluble samples.
متوسط الحجوم المتوافقة|Mean of concordant titres|V̄ = (V₁ + V₂ + V₃) / 3|ttVav|(ttV1+ttV2+ttV3)/3|ttV1 ttV2 ttV3|نعيد المعايرة ونأخذ المتوسط.|Repeat the titration and average the results.
مدى القراءات (التوافق)|Range of titres (concordance)|R = V_max − V_min|ttrng|ttVmx-ttVmn|ttVmx ttVmn|إذا كان 0.1 مل أو أقل فالقراءات متوافقة.|0.1 mL or less means the titres agree.
نسبة خطأ قراءة السحاحة|Burette percentage error|%e = 2e / V × 100|ttpe|2*tterr/ttV*100|tterr ttV|نقرأ مرتين (بداية ونهاية) فالخطأ يتضاعف.|Two readings (start and end), so the error doubles.
معامل تخفيف العينة قبل المعايرة|Dilution factor of a titrated sample|DF = V_fl / V_al|ttDF|ttVfl/ttVal|ttVfl ttVal|كم مرة خفّفنا العينة.|How many times the sample was diluted.
تركيز المحلول الأصلي قبل التخفيف|Original concentration before dilution|C₀ = C_d × DF|ttC0|ttCd*ttDF|ttCd ttDF|نرجع للتركيز الأصلي.|Back to the original strength.
حجم نقطة التكافؤ|Equivalence volume|V_eq = Mₐ Vₐ / M_b|ttVeq|Mac*Va/Mbc|Mac Va Mbc|الحجم اللي يعادل الحمض بالضبط.|The volume that exactly neutralises the acid.
pH قبل التكافؤ (حمض ضعيف مع قاعدة قوية)|pH before equivalence (weak acid, strong base)|pH = pKₐ + log([A⁻]/[HA])|pH|pKa+log10(ttA/ttHA)|pKa ttA ttHA|المحلول يتصرف كمحلول منظم.|The mixture behaves as a buffer.
pH قبل التكافؤ (حمض قوي مع قاعدة قوية)|pH before equivalence (strong acid, strong base)|pH = −log((MₐVₐ − M_bV_b)/(Vₐ + V_b))|pH|-log10((Mac*Va-Mbc*ttVbb)/(Va+ttVbb))|Mac Va Mbc ttVbb|باقي حمض لم يتعادل. جرّب V_b أقل من Vₐ.|Unreacted acid remains. Try V_b smaller than Vₐ.
pH بعد التكافؤ (زيادة قاعدة قوية)|pH after equivalence (excess strong base)|pH = 14 + log((M_bV_b − MₐVₐ)/(Vₐ + V_b))|pH|14+log10((Mbc*ttVba-Mac*Va)/(Va+ttVba))|Mbc ttVba Mac Va|القاعدة الزائدة ترفع pH بسرعة. جرّب V_b أكبر من Vₐ.|Excess base pushes pH up fast. Try V_b larger than Vₐ.
pH عند تكافؤ حمض ضعيف|pH at the equivalence point of a weak acid|pH = 7 + ½pKₐ + ½log C|pH|7+pKa/2+log10(ttCs)/2|pKa ttCs|الملح الناتج قاعدي، فـ pH أكبر من 7.|The salt formed is basic, so pH is above 7.
ميل منحنى المعايرة|Slope of the titration curve|S = ΔpH / ΔV|ttsl|ttdpH/ttdV|ttdpH ttdV|أكبر ميل = نقطة النهاية.|The steepest point marks the end point.
عسر الماء بالمعايرة مع EDTA|Water hardness by EDTA titration|H = M × V × 100.09 × 1000 / V_w|tthard|ttM*ttV*100.09*1000/ttVw|ttM ttV ttVw|كل مول EDTA يرتبط بأيون كالسيوم واحد.|Each mole of EDTA binds one calcium ion.
نسبة حمض الأسيتيك في الخل|Acetic acid in vinegar|% = M × V × 60.05 / (10 × V_v)|ttac|ttM*ttV*60.05/(10*ttVvin)|ttM ttV ttVvin|الخل التجاري عادة 4–5 جرام لكل 100 مل.|Shop vinegar is usually 4–5 g per 100 mL.
توحيد الصودا الكاوية بفثالات البوتاسيوم|Standardising NaOH with KHP|M = m / (204.22 × V / 1000)|ttM|ttmKHP/(204.22*ttV/1000)|ttmKHP ttV|مادة قياسية أولية نقية ونزنها بدقة.|A pure primary standard that is weighed accurately.
الكلوريد بطريقة مور|Chloride by Mohr’s method|m_Cl = M × V × 35.45|ttCl|ttM*ttV*35.45|ttM ttV|نترات الفضة تترسب مع الكلوريد، والكرومات تعطي لون أحمر في النهاية.|Silver nitrate precipitates the chloride; chromate turns red-brown at the end.
قوة دواء الحموضة (معايرة رجعية)|Antacid strength (back titration)|n_n = n_H − n_b|ttneu|ttnHCl-ttnNa|ttnHCl ttnNa|نذيب الحبة في حمض زائد ونعاير الباقي.|Dissolve the tablet in excess acid and titrate what remains.
تعادل حمض الأسيتيك مع الصودا|Acetic acid with sodium hydroxide|CH₃COOH + NaOH → CH₃COONa + H₂O||||مؤشر الفينولفثالين يصير وردي عند النهاية.|Phenolphthalein turns pink at the end point.
معايرة البرمنغنات مع الحديد|Permanganate–iron(II) titration|MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O||||البرمنغنات مؤشر لنفسه: أول قطرة زائدة تعطي لون بنفسجي فاتح.|Permanganate is its own indicator: the first extra drop stays pale purple.
المعايرة اليودومترية بالثيوكبريتات|Iodometric titration with thiosulfate|I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻||||النشا يعطي لون أزرق غامق يختفي عند النهاية.|Starch gives a deep blue that vanishes at the end point.
ترسيب كلوريد الفضة|Silver chloride precipitation|Ag⁺ + Cl⁻ → AgCl↓||||راسب أبيض يتكون فورًا.|A white precipitate forms at once.
معايرة الكالسيوم بالـ EDTA|Calcium–EDTA titration|Ca²⁺ + EDTA⁴⁻ → [CaEDTA]²⁻||||مؤشر إريوكروم الأسود يتحول من أحمر خمري إلى أزرق.|Eriochrome Black T turns from wine red to blue.
`);

EQ.add('gvm',`
المعامل الوزني|Gravimetric factor|GF = a × Mᵣ(x) / Mᵣ(p)|gvGF|gva*gvMa/gvMp|gva gvMa gvMp|يحوّل كتلة الراسب إلى كتلة المادة المطلوبة.|Converts precipitate mass to analyte mass.
كتلة المادة من الراسب|Analyte mass from precipitate|mₓ = m_p × GF|gvx|gvp*gvGF|gvp gvGF|نرسّب ونجفف ونوزن.|Precipitate, dry, then weigh.
نسبة الماء المفقود بالتسخين|Water lost on heating|w = (m₁ − m₂)/(m₁ − m₀) × 100|gvw|(gvm1-gvm2)/(gvm1-gvm0)*100|gvm1 gvm2 gvm0|نسخّن لين تثبت الكتلة.|Heat until the mass stops changing.
مولات الماء في الملح المتبلور|Moles of water in a hydrate|n₂ = (m₁ − m₂) / 18.02|gvnwat|(gvm1-gvm2)/18.02|gvm1 gvm2|الماء المحبوس داخل البلورة.|Water trapped inside the crystal.
عدد جزيئات ماء التبلور|Water of crystallisation|x = n₂ / n₁|gvnw|gvnwat/gvanh|gvnwat gvanh|كبريتات النحاس الزرقاء فيها 5 جزيئات ماء.|Blue copper sulfate holds 5 water molecules.
عدم اليقين في أداة القياس|Uncertainty of a measuring tool|u = r / 2|gvunc|gvres/2|gvres|نصف أصغر تدريجة.|Half the smallest division.
النسبة المئوية لعدم اليقين|Percentage uncertainty|%e = u / R × 100|ttpe|gvunc/gvrd*100|gvunc gvrd|كل ما كبر الحجم المقاس قلّ الخطأ النسبي.|The bigger the measurement, the smaller the relative error.
معايرة الماصة بالوزن|Calibrating a pipette by weighing|V = m / ρ|gvVm|gvmw/gvrho|gvmw gvrho|نزن الماء اللي تنزله الماصة ونقسم على كثافته.|Weigh the water the pipette delivers and divide by its density.
الخطأ النسبي في الميزان|Relative error of a balance|E = (m_e − m_t) / m_t × 100|gvacc|(gvme-gvmt)/gvmt*100|gvme gvmt|نقارن مع كتلة معيارية معروفة.|Compare against a known standard mass.
`);
