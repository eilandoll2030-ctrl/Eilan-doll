/* موسوعة معادلات إيلان — الكيمياء */
EQ.syms(`
mpct|%|النسبة المئوية الكتلية|mass percent|%|25
msolute|m_solute|كتلة المذاب|solute mass|g|10
msoln|m_solution|كتلة المحلول|solution mass|g|100
mth|m_theor|المردود النظري|theoretical yield|g|20
mact|m_actual|المردود الفعلي|actual yield|g|17
molal|b|المولالية|molality|mol/kg|0.5
kgsolv|m_solvent|كتلة المذيب|solvent mass|kg|1
Xa|χ|الكسر المولي|mole fraction||0.2
nA|n_A|مولات المادة A|moles of A|mol|1
nB|n_B|مولات المادة B|moles of B|mol|4
C1c|C₁|التركيز الأول|concentration 1|mol/L|2
C2c|C₂|التركيز الثاني|concentration 2|mol/L|0.5
ppm|ppm|جزء في المليون|parts per million|ppm|50
Kf|K_f|ثابت انخفاض التجمد|freezing-point constant|K·kg/mol|1.86
Kbp|K_b|ثابت ارتفاع الغليان|boiling-point constant|K·kg/mol|0.512
ivh|i|معامل فانت هوف|van ’t Hoff factor||1
Pi_|Π|الضغط الأسموزي|osmotic pressure|atm|1.2
Ratm|R|ثابت الغازات|gas constant|L·atm/(mol·K)|0.08206
Patm|P|الضغط|pressure|atm|1
P0v|P°|ضغط بخار المذيب النقي|pure-solvent vapour pressure|kPa|3.17
kH|k_H|ثابت هنري|Henry’s constant|mol/(L·atm)|0.0013
Cg|C|ذوبانية الغاز|gas solubility|mol/L|0.0013
dens|d|الكثافة|density|g/mL|1
Vml|V|الحجم|volume|mL|100
r1g|r₁|سرعة انتشار الغاز الأول|effusion rate 1||1
M1g|M₁|الكتلة المولية للغاز الأول|molar mass 1|g/mol|2
M2g|M₂|الكتلة المولية للغاز الثاني|molar mass 2|g/mol|32
Kw|K_w|ثابت تأين الماء|water ion product||1e-14
Ca|[HA]|تركيز الحمض|acid concentration|mol/L|0.1
Cb|[A⁻]|تركيز القاعدة المرافقة|conjugate-base concentration|mol/L|0.1
alphad|α|درجة التأين|degree of ionisation||0.013
Va|V_a|حجم الحمض|acid volume|mL|25
Vb|V_b|حجم القاعدة|base volume|mL|25
Mac|M_a|تركيز الحمض|acid molarity|mol/L|0.1
Mbc|M_b|تركيز القاعدة|base molarity|mol/L|0.1
qcal|q|الحرارة|heat|J|4184
Ccal|C_cal|سعة المسعر الحرارية|calorimeter heat capacity|J/K|10
dHf|ΔH_f°|حرارة التكوين القياسية|standard enthalpy of formation|kJ/mol|-286
dHp|ΣΔH_f(نواتج)|مجموع حرارات تكوين النواتج|sum ΔHf products|kJ|-393.5
dHr|ΣΔH_f(متفاعلات)|مجموع حرارات تكوين المتفاعلات|sum ΔHf reactants|kJ|-110.5
BEr|ΣBE(مكسورة)|طاقة الروابط المكسورة|bonds broken|kJ|1000
BEp|ΣBE(متكونة)|طاقة الروابط المتكونة|bonds formed|kJ|1200
TkC|T|درجة الحرارة|temperature|K|298
k1r|k₁|ثابت السرعة الأول|rate constant 1||0.01
k2r|k₂|ثابت السرعة الثاني|rate constant 2||0.04
Tr1|T₁|درجة الحرارة الأولى|temperature 1|K|298
Tr2|T₂|درجة الحرارة الثانية|temperature 2|K|318
A0c|[A]₀|التركيز الابتدائي|initial concentration|mol/L|1
Atc|[A]|التركيز بعد زمن|concentration at t|mol/L|0.5
ordm|m|رتبة التفاعل للمادة A|order in A||1
ordn|n|رتبة التفاعل للمادة B|order in B||1
Bc|[B]|تركيز المادة B|concentration of B|mol/L|0.5
Kp|K_p|ثابت الاتزان بالضغوط|pressure equilibrium constant||10
dn|Δn|التغير في مولات الغاز|change in gas moles||1
Ksp|K_sp|حاصل الإذابة|solubility product||1.8e-10
solx|s|الذوبانية المولية|molar solubility|mol/L|1.34e-5
Pc_|[C]|تركيز الناتج C|concentration of C|mol/L|0.4
Pd_|[D]|تركيز الناتج D|concentration of D|mol/L|0.4
Ac_|[A]|تركيز المتفاعل A|concentration of A|mol/L|0.2
Bc_|[B]|تركيز المتفاعل B|concentration of B|mol/L|0.2
Qch|Q|الشحنة|charge|C|9648.5
Iel|I|التيار|current|A|2
mel|m|الكتلة المترسبة|deposited mass|g|1.18
zel|z|عدد الإلكترونات لكل أيون|electrons per ion||2
Ecath|E°_cathode|جهد المهبط القياسي|cathode potential|V|0.34
Eanod|E°_anode|جهد المصعد القياسي|anode potential|V|-0.76
Qr|Q|حاصل التفاعل|reaction quotient||0.01
Zeff|Z_eff|الشحنة النووية الفعّالة|effective nuclear charge||2.2
Zat|Z|العدد الذري|atomic number||11
Sscr|S|ثابت الحجب|shielding constant||8.8
protons|p⁺|عدد البروتونات|protons||6
neutrons|n⁰|عدد النيوترونات|neutrons||6
massn|A|العدد الكتلي|mass number||12
iso1|m₁|كتلة النظير الأول|isotope 1 mass|u|34.969
iso2|m₂|كتلة النظير الثاني|isotope 2 mass|u|36.966
ab1|f₁|وفرة النظير الأول|abundance 1||0.7576
enX|χ_A|كهروسالبية الذرة A|electronegativity A||3.98
enY|χ_B|كهروسالبية الذرة B|electronegativity B||0.93
Ve|V|إلكترونات التكافؤ|valence electrons||4
Nb|N|الإلكترونات غير الرابطة|non-bonding electrons||0
Bb|B|إلكترونات الروابط|bonding electrons||8
nbo|n_b|إلكترونات المدارات الرابطة|bonding-orbital electrons||10
nab|n_a|إلكترونات المدارات المضادة|antibonding-orbital electrons||4
Cn|n|عدد ذرات الكربون|number of carbons||3
DBE|DBE|درجة عدم التشبع|degree of unsaturation||1
Hn|H|عدد ذرات الهيدروجين|number of hydrogens||6
Nn_|N|عدد ذرات النيتروجين|number of nitrogens||0
Xn|X|عدد ذرات الهالوجين|number of halogens||0
Rf|R_f|معامل الاحتجاز|retention factor||0.5
dsp|d_spot|مسافة البقعة|spot distance|cm|3
dsf|d_front|مسافة المذيب|solvent-front distance|cm|6
eps|ε|معامل الامتصاص المولاري|molar absorptivity|L/(mol·cm)|15000
lpath|l|طول مسار الضوء|path length|cm|1
Abs|A|الامتصاصية|absorbance||0.75
Ttr|T|النفاذية|transmittance||0.18
`);

EQ.add('cmo',`
عدد المولات من الكتلة|Moles from mass|n = m / M|mol|mass/Mm|mass Mm|18 g ماء = 1 مول.|18 g of water is 1 mole.
الكتلة من المولات|Mass from moles|m = n M|mass|mol*Mm|mol Mm|عكس العلاقة السابقة.|The reverse relation.
الكتلة المولية|Molar mass|M = m / n|Mm|mass/mol|mass mol|كتلة مول واحد.|Mass of one mole.
عدد الجسيمات|Number of particles|N = n N_A|Np2|mol*NA|mol NA|عدد أفوجادرو 6.022 × 10²³.|Avogadro’s number 6.022 × 10²³.
المولات من عدد الجسيمات|Moles from particles|n = N / N_A|mol|Np2/NA|Np2 NA|كم مول في عدد من الذرات.|Moles in a number of atoms.
حجم الغاز عند الظروف القياسية|Gas volume at STP|V = n × 22.4 L|VL|mol*22.4|mol|مول الغاز = 22.4 L عند 0 °C و1 atm.|One mole of gas = 22.4 L at 0 °C, 1 atm.
حجم الغاز عند 25 °C|Gas volume at room conditions|V = n × 24.5 L|VL|mol*24.5|mol|عند 25 °C و1 atm.|At 25 °C and 1 atm.
النسبة المئوية الكتلية للعنصر|Percent composition|% = (n × M_element / M_compound) × 100|mpct|2*1.008/18.015*100||مثال: نسبة الهيدروجين في الماء ≈ 11.2%.|Example: hydrogen in water ≈ 11.2%.
النسبة المئوية للمردود|Percent yield|% = (actual / theoretical) × 100|mpct|mact/mth*100|mact mth|كفاءة التفاعل في المختبر.|How efficient a lab reaction was.
النسبة الكتلية في محلول|Mass percent of solution|% = m_solute / m_solution × 100|mpct|msolute/msoln*100|msolute msoln|مثل محلول ملح 10%.|Like a 10% salt solution.
الكتلة الذرية المتوسطة|Average atomic mass|M = m₁f₁ + m₂(1 − f₁)|Mm|iso1*ab1+iso2*(1-ab1)|iso1 ab1 iso2|الكلور ≈ 35.45 u.|Chlorine ≈ 35.45 u.
كثافة المادة بالغرام|Density in g/mL|d = m / V|dens|mass/Vml|mass Vml|g/mL.|g/mL.
المولات من الحجم والتركيز|Moles from volume and molarity|n = C V|mol|Cm*VL|Cm VL|V باللتر.|V in litres.
المادة المحددة|Limiting reagent|المادة التي تعطي أقل كمية ناتج||||تخلص أولًا وتحدد كمية الناتج.|Runs out first and caps the product.
القانون الأول للنسب الثابتة|Law of definite proportions|المركب له نسبة كتل ثابتة||||الماء دائمًا H:O = 1:8 بالكتلة.|Water is always H:O = 1:8 by mass.
قانون حفظ الكتلة|Law of conservation of mass|Σm(متفاعلات) = Σm(نواتج)||||لافوازييه.|Lavoisier.
الصيغة الأولية من النسب|Empirical formula ratio|نسبة المولات = (m₁/M₁) : (m₂/M₂)|res|(40/12.01)/(6.7/1.008)||مثال كربون 40% هيدروجين 6.7% ⇒ CH₂O.|Example C 40%, H 6.7% ⇒ CH₂O.
عدد الذرات في جزيء|Atoms in a sample|ذرات = n × N_A × عدد الذرات في الصيغة|Np2|mol*NA*3|mol NA|جزيء الماء فيه 3 ذرات.|A water molecule has 3 atoms.
المكافئ الغرامي|Equivalent mass|E = M / التكافؤ|Mm|Mm/2|Mm|للأحماض: الكتلة المولية ÷ عدد H⁺.|For acids: molar mass ÷ number of H⁺.
كتلة الناتج من التفاعل|Mass of product|m₂ = (m₁/M₁) × (b/a) × M₂|mass|mass/Mm*1*44|mass Mm|من نسب المعاملات (مثال CO₂ = 44).|From coefficient ratios (CO₂ = 44 example).
`);

EQ.add('cga',`
قانون الغاز المثالي (لتر وكيلوباسكال)|Ideal gas law (L, kPa)|P V = n R T|Pk|mol*Rl*Tk/VL|mol Rl Tk VL|R = 8.314 L·kPa/(mol·K).|R = 8.314 L·kPa/(mol·K).
قانون الغاز المثالي (atm)|Ideal gas law (atm)|P V = n R T|Patm|mol*Ratm*Tk/VL|mol Ratm Tk VL|R = 0.08206 L·atm/(mol·K).|R = 0.08206 L·atm/(mol·K).
عدد المولات من قانون الغاز|Moles from the gas law|n = P V / (R T)|mol|Pk*VL/(Rl*Tk)|Pk VL Rl Tk|كم مول في البالون.|Moles in a balloon.
قانون بويل (كيمياء)|Boyle’s law (chemistry)|P₁ V₁ = P₂ V₂|V2|P1*V1/P2|P1 V1 P2|الحجم يقل عند زيادة الضغط.|Volume shrinks under pressure.
قانون شارل (كيمياء)|Charles’s law (chemistry)|V₁ / T₁ = V₂ / T₂|V2|V1*T2/T1|V1 T2 T1|البالون يكبر في الحرارة.|A balloon grows when warm.
قانون جاي-لوساك (كيمياء)|Gay-Lussac’s law (chemistry)|P₁ / T₁ = P₂ / T₂|P2|P1*T2/T1|P1 T2 T1|علبة الرذاذ خطرة قرب النار.|Aerosol cans are dangerous near fire.
قانون أفوجادرو|Avogadro’s law|V₁ / n₁ = V₂ / n₂|V2|V1*nB/nA|V1 nB nA|حجوم متساوية = عدد جزيئات متساوي.|Equal volumes hold equal numbers of molecules.
القانون العام للغازات (كيمياء)|Combined gas law (chemistry)|P₁V₁/T₁ = P₂V₂/T₂|V2|P1*V1*T2/(T1*P2)|P1 V1 T2 T1 P2|الحجم في ظروف جديدة.|Volume under new conditions.
قانون دالتون (كيمياء)|Dalton’s law (chemistry)|P_total = ΣPᵢ|Pk|P1+P2|P1 P2|مجموع الضغوط الجزئية.|Sum of partial pressures.
الضغط الجزئي|Partial pressure|Pᵢ = χᵢ P_total|Pk|Xa*P1|Xa P1|الكسر المولي × الضغط الكلي.|Mole fraction × total pressure.
قانون جراهام للانتشار|Graham’s law of effusion|r₁/r₂ = √(M₂/M₁)|res|sqrt(M2g/M1g)|M2g M1g|الغازات الخفيفة تنتشر أسرع.|Lighter gases effuse faster.
كثافة الغاز|Gas density|d = P M / (R T)|dens|Patm*Mm/(Ratm*Tk)|Patm Mm Ratm Tk|g/L.|In g/L.
الكتلة المولية من كثافة الغاز|Molar mass from gas density|M = d R T / P|Mm|dens*Ratm*Tk/Patm|dens Ratm Tk Patm|لتحديد غاز مجهول.|Identifying an unknown gas.
جمع الغاز فوق الماء|Gas collected over water|P_gas = P_total − P_water|Pk|P1-3.17|P1|ضغط بخار الماء 3.17 kPa عند 25 °C.|Water vapour 3.17 kPa at 25 °C.
معادلة فان دير فالس (الضغط)|Van der Waals pressure|P = nRT/(V − nb) − a n²/V²|Patm|mol*Ratm*Tk/(VL-mol*0.0318)-3.59*mol*mol/(VL*VL)|mol Ratm Tk VL|ثوابت CO₂: a = 3.59، b = 0.0427 تقريبًا.|CO₂ constants (approx.).
معامل الانضغاطية|Compressibility factor|Z = P V / (n R T)|res|Patm*VL/(mol*Ratm*Tk)|Patm VL mol Ratm Tk|Z = 1 للغاز المثالي.|Z = 1 for an ideal gas.
`);

EQ.add('cso',`
التركيز المولاري|Molarity|C = n / V|Cm|mol/VL|mol VL|مولات المذاب في لتر محلول.|Moles of solute per litre.
تخفيف المحاليل|Dilution|C₁ V₁ = C₂ V₂|V2|C1c*V1/C2c|C1c V1 C2c|إضافة ماء تقلل التركيز.|Adding water lowers concentration.
التركيز بعد التخفيف|Concentration after dilution|C₂ = C₁ V₁ / V₂|C2c|C1c*V1/V2|C1c V1 V2|نفس عدد المولات في حجم أكبر.|Same moles in more volume.
المولالية|Molality|b = n / m_solvent(kg)|molal|mol/kgsolv|mol kgsolv|لا تتغير بتغير الحرارة.|Doesn’t change with temperature.
الكسر المولي|Mole fraction|χ_A = n_A / (n_A + n_B)|Xa|nA/(nA+nB)|nA nB|بدون وحدة.|Unitless.
جزء في المليون|Parts per million|ppm = m_solute / m_solution × 10⁶|ppm|msolute/msoln*1e6|msolute msoln|للتراكيز الصغيرة جدًا مثل الفلورايد.|For tiny concentrations like fluoride.
كتلة المذاب اللازمة|Mass of solute needed|m = C V M|mass|Cm*VL*Mm|Cm VL Mm|لتحضير محلول.|To prepare a solution.
انخفاض درجة التجمد|Freezing-point depression|ΔT_f = i K_f b|dT|ivh*Kf*molal|ivh Kf molal|الملح يذيب الجليد في الطرق.|Salt melts ice on roads.
ارتفاع درجة الغليان|Boiling-point elevation|ΔT_b = i K_b b|dT|ivh*Kbp*molal|ivh Kbp molal|الماء المالح يغلي أعلى من 100 °C.|Salty water boils above 100 °C.
الضغط الأسموزي|Osmotic pressure|Π = i M R T|Pi_|ivh*Cm*Ratm*Tk|ivh Cm Ratm Tk|أساس انتقال الماء في الخلايا.|Drives water movement in cells.
قانون راؤول|Raoult’s law|P = χ_solvent P°|Pk|(1-Xa)*P0v|Xa P0v|المذاب يخفّض ضغط البخار.|A solute lowers vapour pressure.
قانون هنري|Henry’s law|C = k_H P|Cg|kH*Patm|kH Patm|ذوبان الغاز يزيد مع الضغط (المشروبات الغازية).|Gas dissolves more under pressure (fizzy drinks).
المولارية من النسبة والكثافة|Molarity from % and density|C = (10 × % × d) / M|Cm|10*mpct*dens/Mm|mpct dens Mm|لتحويل تركيز المحاليل التجارية.|Converting stock-bottle concentrations.
النسبة الحجمية|Volume percent|% v/v = V_solute / V_solution × 100|mpct|V1/V2*100|V1 V2|مثل الكحول في المعقمات.|Like alcohol in sanitiser.
النسبة الكتلية/الحجمية|Mass/volume percent|% w/v = m(g) / V(mL) × 100|mpct|msolute/Vml*100|msolute Vml|محلول ملحي 0.9% طبي.|0.9% medical saline.
خلط محلولين|Mixing two solutions|C = (C₁V₁ + C₂V₂)/(V₁ + V₂)|Cm|(C1c*V1+C2c*V2)/(V1+V2)|C1c V1 C2c V2|تركيز الخليط.|Concentration of the mix.
الذوبانية|Solubility|s = m_solute / 100 g ماء||||أقصى كمية تذوب عند درجة حرارة.|Max that dissolves at a temperature.
عامل التخفيف|Dilution factor|DF = V_final / V_initial|res|V2/V1|V2 V1|كم مرة خففنا المحلول.|How many times diluted.
قانون بير-لامبرت|Beer–Lambert law|A = ε l c|Abs|eps*lpath*Cm|eps lpath Cm|قياس التركيز بالضوء.|Measuring concentration with light.
الامتصاصية والنفاذية|Absorbance and transmittance|A = −log T|Abs|-log10(Ttr)|Ttr|كلما زادت الامتصاصية قلّ الضوء النافذ.|More absorbance, less light through.
التركيز من الامتصاصية|Concentration from absorbance|c = A / (ε l)|Cm|Abs/(eps*lpath)|Abs eps lpath|بعد قياس الامتصاصية.|After measuring absorbance.
`);

EQ.add('cab',`
الأس الهيدروجيني|pH|pH = −log[H⁺]|pH|-log10(Hc)|Hc|أقل من 7 حمضي.|Below 7 is acidic.
تركيز الهيدروجين من pH|[H⁺] from pH|[H⁺] = 10^(−pH)|Hc|pow(10,-pH)|pH|عكس العلاقة.|The inverse.
الأس الهيدروكسيلي|pOH|pOH = −log[OH⁻]|pOH|-log10(OHc)|OHc|مقياس القاعدية.|A measure of basicity.
العلاقة بين pH و pOH|pH + pOH|pH + pOH = 14|pOH|14-pH|pH|عند 25 °C.|At 25 °C.
الحاصل الأيوني للماء|Water ion product|K_w = [H⁺][OH⁻] = 10⁻¹⁴|OHc|Kw/Hc|Kw Hc|عند 25 °C.|At 25 °C.
ثابت تأين الحمض|Acid dissociation constant|Kₐ = [H⁺][A⁻] / [HA]|Ka|Hc*Cb/Ca|Hc Cb Ca|قوة الحمض.|Acid strength.
pKa|pKa|pKₐ = −log Kₐ|pKa|-log10(Ka)|Ka|أصغر = حمض أقوى.|Smaller means stronger acid.
تركيز H⁺ لحمض ضعيف|[H⁺] of a weak acid|[H⁺] ≈ √(Kₐ C)|Hc|sqrt(Ka*Ca)|Ka Ca|تقريب مفيد.|A useful approximation.
pH حمض ضعيف|pH of a weak acid|pH = ½(pKₐ − log C)|pH|0.5*(-log10(Ka)-log10(Ca))|Ka Ca|مثل الخل.|Like vinegar.
pH حمض قوي|pH of a strong acid|pH = −log C|pH|-log10(Ca)|Ca|يتأين كليًا (HCl).|Fully ionised (HCl).
pH قاعدة قوية|pH of a strong base|pH = 14 + log C|pH|14+log10(Mbc)|Mbc|مثل NaOH.|Like NaOH.
معادلة هندرسون-هاسلبالخ|Henderson–Hasselbalch equation|pH = pKₐ + log([A⁻]/[HA])|pH|pKa+log10(Cb/Ca)|pKa Cb Ca|pH المحلول المنظّم.|pH of a buffer.
العلاقة بين Ka و Kb|Ka × Kb|Kₐ × K_b = K_w|Kb|Kw/Ka|Kw Ka|للزوج المترافق.|For a conjugate pair.
درجة التأين|Degree of ionisation|α = √(Kₐ / C)|alphad|sqrt(Ka/Ca)|Ka Ca|نسبة الجزيئات المتأينة.|Fraction of molecules ionised.
المعايرة (نقطة التكافؤ)|Titration equivalence point|Mₐ Vₐ = M_b V_b|Vb|Mac*Va/Mbc|Mac Va Mbc|حجم القاعدة اللازم.|Volume of base needed.
تركيز الحمض من المعايرة|Acid concentration from titration|Mₐ = M_b V_b / Vₐ|Mac|Mbc*Vb/Va|Mbc Vb Va|تحديد تركيز مجهول.|Finding an unknown concentration.
تعادل حمض وقاعدة|Neutralisation|H⁺ + OH⁻ → H₂O||||الحمض والقاعدة يكوّنان ماء.|Acid and base make water.
حمض الهيدروكلوريك وهيدروكسيد الصوديوم|HCl + NaOH|HCl + NaOH → NaCl + H₂O||||ملح وماء.|Salt and water.
تأين حمض الأسيتيك|Acetic acid ionisation|CH₃COOH ⇌ CH₃COO⁻ + H⁺||||حمض ضعيف (الخل).|A weak acid (vinegar).
تأين الأمونيا|Ammonia in water|NH₃ + H₂O ⇌ NH₄⁺ + OH⁻||||قاعدة ضعيفة.|A weak base.
pH عند منتصف المعايرة|pH at half-equivalence|pH = pKₐ|pH|pKa|pKa|تحديد pKa من المنحنى.|Reading pKa from the curve.
سعة المحلول المنظّم|Buffer capacity (approx.)|β ≈ 2.303 C α(1 − α)|res|2.303*Ca*0.5*0.5|Ca|أعلاها عندما pH = pKa.|Largest when pH = pKa.
تركيز OH⁻ لقاعدة ضعيفة|[OH⁻] of a weak base|[OH⁻] ≈ √(K_b C)|OHc|sqrt(Kb*Mbc)|Kb Mbc|مثل الأمونيا.|Like ammonia.
`);

EQ.add('cth',`
حرارة التفاعل بالمسعر|Calorimetry|q = m c ΔT|qcal|mass*4.184*dT|mass dT|c للماء = 4.184 J/(g·K).|c for water = 4.184 J/(g·K).
المسعر بسعة حرارية|Bomb calorimeter|q = C_cal ΔT|qcal|Ccal*dT|Ccal dT|قياس طاقة الوقود والطعام.|Measuring fuel and food energy.
قانون هس|Hess’s law|ΔH = ΣΔH_f(نواتج) − ΣΔH_f(متفاعلات)|dH|dHp-dHr|dHp dHr|المحتوى الحراري لا يعتمد على الطريق.|Enthalpy doesn’t depend on the path.
المحتوى الحراري من طاقة الروابط|Enthalpy from bond energies|ΔH = ΣBE(مكسورة) − ΣBE(متكونة)|dH|BEr-BEp|BEr BEp|كسر الروابط يحتاج طاقة.|Breaking bonds takes energy.
طاقة جيبس الحرة|Gibbs free energy|ΔG = ΔH − T ΔS|dG|dH-TkC*dSc|dH TkC dSc|سالب = تفاعل تلقائي.|Negative means spontaneous.
الطاقة الحرة وثابت الاتزان|Free energy and equilibrium|ΔG° = −R T ln K|dG|-8.314*TkC*log(Kc)/1000|TkC Kc|بالكيلوجول لكل مول.|In kJ/mol.
ثابت الاتزان من الطاقة الحرة|K from ΔG°|K = e^(−ΔG°/RT)|Kc|exp(-dG*1000/(8.314*TkC))|dG TkC|ΔG سالبة = K كبير.|Negative ΔG gives large K.
الطاقة الحرة وجهد الخلية|Free energy and cell potential|ΔG = −n F E|dG|-ne*Fd*Ecell/1000|ne Fd Ecell|بطارية تلقائية.|A spontaneous battery.
درجة حرارة الانقلاب|Crossover temperature|T = ΔH / ΔS|TkC|dH/dSc|dH dSc|يتغير فيها اتجاه التلقائية.|Where spontaneity switches.
حرارة احتراق الميثان|Heat of combustion of methane|CH₄ + 2O₂ → CO₂ + 2H₂O  ΔH = −890 kJ||||غاز الطبخ يطلق حرارة.|Cooking gas releases heat.
حرارة تكوين الماء|Enthalpy of formation of water|H₂ + ½O₂ → H₂O(l)  ΔH = −286 kJ||||تفاعل طارد للحرارة.|An exothermic reaction.
الحرارة المطلقة من مولات|Heat from moles|q = n ΔH|qcal|mol*dHf*1000|mol dHf|طاقة احتراق كمية من الوقود.|Energy from burning some fuel.
معادلة كيرشوف للمحتوى الحراري|Kirchhoff’s law of enthalpy|ΔH₂ = ΔH₁ + ΔC_p (T₂ − T₁)|dH|dH+0.03*(Tr2-Tr1)|dH Tr2 Tr1|ΔC_p = 0.03 kJ/K (مثال).|ΔC_p = 0.03 kJ/K (example).
معادلة كلاوزيوس-كلابيرون|Clausius–Clapeyron equation|ln(P₂/P₁) = (ΔH_vap/R)(1/T₁ − 1/T₂)|P2|P1*exp(40700/8.314*(1/Tr1-1/Tr2))|P1 Tr1 Tr2|ضغط البخار يزيد بالحرارة (الماء ΔH = 40.7 kJ).|Vapour pressure rises with heat (water ΔH = 40.7 kJ).
قاعدة تروتون|Trouton’s rule|ΔS_vap ≈ 88 J/(mol·K)|dH|88*TkC/1000|TkC|تقدير حرارة التبخر من نقطة الغليان.|Estimating heat of vaporisation from boiling point.
`);

EQ.add('cki',`
قانون السرعة|Rate law|r = k [A]ᵐ [B]ⁿ|rate|kr*pow(A0c,ordm)*pow(Bc,ordn)|kr A0c ordm Bc ordn|الرتب تُحدَّد بالتجربة.|Orders come from experiment.
سرعة التفاعل المتوسطة|Average reaction rate|r = −Δ[A] / Δt|rate|(A0c-Atc)/t|A0c Atc t|تناقص المتفاعل مع الزمن.|Reactant used up over time.
تفاعل الرتبة صفر|Zero-order reaction|[A] = [A]₀ − k t|Atc|A0c-kr*t|A0c kr t|السرعة ثابتة.|Constant rate.
تفاعل الرتبة الأولى|First-order reaction|[A] = [A]₀ e^(−kt)|Atc|A0c*exp(-kr*t)|A0c kr t|مثل الاضمحلال الإشعاعي.|Like radioactive decay.
تفاعل الرتبة الثانية|Second-order reaction|1/[A] = 1/[A]₀ + k t|Atc|1/(1/A0c+kr*t)|A0c kr t|السرعة تعتمد على مربع التركيز.|Rate depends on concentration squared.
عمر النصف للرتبة الأولى|First-order half-life|t½ = 0.693 / k|thalf|log(2)/kr|kr|لا يعتمد على التركيز.|Independent of concentration.
عمر النصف للرتبة صفر|Zero-order half-life|t½ = [A]₀ / 2k|thalf|A0c/(2*kr)|A0c kr|يعتمد على التركيز الابتدائي.|Depends on starting concentration.
عمر النصف للرتبة الثانية|Second-order half-life|t½ = 1 / (k [A]₀)|thalf|1/(kr*A0c)|kr A0c|يطول كلما قلّ التركيز.|Longer at lower concentration.
معادلة أرينيوس|Arrhenius equation|k = A e^(−Eₐ/RT)|kr|Af*exp(-Ea/(8.314*TkC))|Af Ea TkC|الحرارة تسرّع التفاعلات.|Heat speeds reactions up.
أرينيوس بدرجتي حرارة|Arrhenius (two temperatures)|ln(k₂/k₁) = (Eₐ/R)(1/T₁ − 1/T₂)|k2r|k1r*exp(Ea/8.314*(1/Tr1-1/Tr2))|k1r Ea Tr1 Tr2|كل 10 درجات تقريبًا تضاعف السرعة.|Roughly doubles per 10 °C.
طاقة التنشيط من ثابتين|Activation energy from two rates|Eₐ = R ln(k₂/k₁) / (1/T₁ − 1/T₂)|Ea|8.314*log(k2r/k1r)/(1/Tr1-1/Tr2)|k2r k1r Tr1 Tr2|من تجربتين.|From two experiments.
معامل درجة الحرارة Q₁₀|Temperature coefficient Q₁₀|Q₁₀ = (k₂/k₁)^(10/(T₂−T₁))|res|pow(k2r/k1r,10/(Tr2-Tr1))|k2r k1r Tr2 Tr1|في الأحياء والكيمياء.|Used in biology and chemistry.
معادلة ميكايليس-منتن|Michaelis–Menten equation|v = V_max [S] / (K_m + [S])|rate|1*A0c/(0.5+A0c)|A0c|سرعة الإنزيمات (V_max = 1، K_m = 0.5).|Enzyme speed (V_max = 1, K_m = 0.5).|plant
نظرية التصادم|Collision theory|r = Z f p||||يجب أن تتصادم الجزيئات بطاقة واتجاه مناسبين.|Molecules must collide hard enough, the right way round.
المحفّز|Catalyst effect|المحفّز يخفض Eₐ بدون أن يُستهلك||||مثل الإنزيمات ومحوّل السيارة.|Like enzymes and car catalytic converters.
`);

EQ.add('ceq',`
ثابت الاتزان|Equilibrium constant|K_c = [C][D] / ([A][B])|Kc|Pc_*Pd_/(Ac_*Bc_)|Pc_ Pd_ Ac_ Bc_|نسبة النواتج للمتفاعلات عند الاتزان.|Products over reactants at equilibrium.
حاصل التفاعل|Reaction quotient|Q = [C][D] / ([A][B])|Qc|Pc_*Pd_/(Ac_*Bc_)|Pc_ Pd_ Ac_ Bc_|قبل الوصول للاتزان.|Before equilibrium is reached.
العلاقة بين Kp و Kc|Kp and Kc|K_p = K_c (RT)^Δn|Kp|Kc*pow(0.08206*TkC,dn)|Kc TkC dn|للتفاعلات الغازية.|For gas reactions.
مبدأ لوشاتلييه|Le Chatelier’s principle|النظام يعاكس أي تغيير يطرأ عليه||||إضافة متفاعل تزيد النواتج.|Adding reactant makes more product.
حاصل الإذابة|Solubility product|K_sp = [Ag⁺][Cl⁻] = s²|Ksp|solx*solx|solx|لملح نسبته 1:1.|For a 1:1 salt.
الذوبانية من Ksp|Solubility from Ksp|s = √K_sp|solx|sqrt(Ksp)|Ksp|AgCl ≈ 1.3 × 10⁻⁵ mol/L.|AgCl ≈ 1.3 × 10⁻⁵ mol/L.
ذوبانية ملح 1:2|Solubility of a 1:2 salt|K_sp = 4s³|solx|cbrt(Ksp/4)|Ksp|مثل CaF₂.|Like CaF₂.
عكس التفاعل|Reversed reaction|K′ = 1 / K|Kc|1/Kc|Kc|ثابت التفاعل العكسي.|For the reverse reaction.
ضرب المعادلة في عدد|Scaled reaction|K′ = Kⁿ|Kc|pow(Kc,nn)|Kc nn|عند مضاعفة المعاملات.|When coefficients are multiplied.
ثابت الاتزان والسرعات|K from rate constants|K = k_forward / k_reverse|Kc|k2r/k1r|k2r k1r|عند الاتزان تتساوى السرعتان.|At equilibrium the rates match.
معادلة فانت هوف|Van ’t Hoff equation|ln(K₂/K₁) = −(ΔH/R)(1/T₂ − 1/T₁)|Kc|10*exp(-dH*1000/8.314*(1/Tr2-1/Tr1))|dH Tr2 Tr1|تأثير الحرارة على K (K₁ = 10).|How heat shifts K (K₁ = 10).
عملية هابر|Haber process|N₂ + 3H₂ ⇌ 2NH₃  ΔH = −92 kJ||||صناعة الأمونيا للأسمدة.|Making ammonia for fertilisers.
`);

EQ.add('cel',`
جهد الخلية القياسي|Standard cell potential|E° = E°(مهبط) − E°(مصعد)|E0|Ecath-Eanod|Ecath Eanod|خلية دانيال = 1.10 V.|Daniell cell = 1.10 V.
معادلة نيرنست|Nernst equation|E = E° − (RT/nF) ln Q|Ecell|E0-8.314*298/(ne*96485)*log(Qr)|E0 ne Qr|الجهد في ظروف غير قياسية.|Voltage away from standard conditions.
نيرنست عند 25 °C|Nernst at 25 °C|E = E° − (0.0592/n) log Q|Ecell|E0-0.0592/ne*log10(Qr)|E0 ne Qr|صيغة مبسطة.|Simplified form.
قانون فاراداي الأول للتحليل|Faraday’s first law of electrolysis|m = (Q / F)(M / z)|mel|Qch/Fd*Mm/zel|Qch Fd Mm zel|الكتلة المترسبة على القطب.|Mass deposited on an electrode.
الشحنة من التيار|Charge from current|Q = I t|Qch|Iel*t|Iel t|كولوم = أمبير × ثانية.|Coulombs = amps × seconds.
الكتلة بالتيار والزمن|Mass from current and time|m = I t M / (z F)|mel|Iel*t*Mm/(zel*Fd)|Iel t Mm zel Fd|الطلاء الكهربائي.|Electroplating.
ثابت الاتزان من جهد الخلية|K from cell potential|ln K = n F E° / (R T)|Kc|exp(ne*Fd*E0/(8.314*298))|ne Fd E0|جهد موجب = K كبير.|Positive voltage gives large K.
خلية دانيال|Daniell cell|Zn + Cu²⁺ → Zn²⁺ + Cu  E° = 1.10 V||||أول بطارية عملية.|An early practical battery.
تحليل الماء كهربائيًا|Electrolysis of water|2H₂O → 2H₂ + O₂||||إنتاج الهيدروجين بالكهرباء.|Making hydrogen with electricity.
خلية وقود الهيدروجين|Hydrogen fuel cell|2H₂ + O₂ → 2H₂O + كهرباء||||الناتج ماء فقط.|The only product is water.
بطارية الرصاص الحمضية|Lead–acid battery|Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄ + 2H₂O||||بطارية السيارة.|The car battery.
صدأ الحديد|Rusting of iron|4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃||||أكسدة تحتاج ماء وأكسجين.|Oxidation needing water and oxygen.
نصف تفاعل الأكسدة|Oxidation half-reaction|Zn → Zn²⁺ + 2e⁻||||فقدان إلكترونات.|Losing electrons.
نصف تفاعل الاختزال|Reduction half-reaction|Cu²⁺ + 2e⁻ → Cu||||كسب إلكترونات.|Gaining electrons.
`);

EQ.add('cat',`
العدد الكتلي|Mass number|A = Z + N|massn|protons+neutrons|protons neutrons|البروتونات + النيوترونات.|Protons plus neutrons.
عدد النيوترونات|Number of neutrons|N = A − Z|neutrons|massn-protons|massn protons|من العدد الكتلي والذري.|From mass and atomic numbers.
الشحنة النووية الفعّالة|Effective nuclear charge|Z_eff = Z − S|Zeff|Zat-Sscr|Zat Sscr|ما يحسه الإلكترون الخارجي.|What an outer electron feels.
سعة المستوى الرئيسي|Electrons in shell n|عدد الإلكترونات = 2n²|res|2*nq*nq|nq|2 ثم 8 ثم 18.|2, then 8, then 18.
فرق الكهروسالبية|Electronegativity difference|Δχ = ‖χ_A − χ_B‖|res|abs(enX-enY)|enX enY|أكثر من 1.7 تقريبًا رابطة أيونية.|Above ~1.7 is roughly ionic.
الشحنة الشكلية|Formal charge|FC = V − N − B/2|res|Ve-Nb-Bb/2|Ve Nb Bb|لاختيار أفضل تركيب لويس.|Choosing the best Lewis structure.
رتبة الرابطة|Bond order|BO = (n_b − n_a) / 2|res|(nbo-nab)/2|nbo nab|O₂ رتبتها 2.|O₂ has bond order 2.
الصفة الأيونية (باولنغ)|Percent ionic character|% = (1 − e^(−Δχ²/4)) × 100|mpct|(1-exp(-pow(enX-enY,2)/4))*100|enX enY|NaF أيونية جدًا.|NaF is very ionic.
طاقة التأين للهيدروجين|Ionisation energy of hydrogen|IE = 13.6 eV × Z²/n²|En|13.6*Zat*Zat/(nq*nq)|Zat nq|لأيون بإلكترون واحد.|For one-electron ions.
تهجين sp³|sp³ hybridisation|s + 3p → 4 sp³ (زاوية 109.5°)||||مثل الميثان.|Like methane.
تهجين sp²|sp² hybridisation|s + 2p → 3 sp² (زاوية 120°)||||مثل الإيثين.|Like ethene.
تهجين sp|sp hybridisation|s + p → 2 sp (زاوية 180°)||||مثل الإيثاين.|Like ethyne.
مبدأ أوفباو|Aufbau principle|1s 2s 2p 3s 3p 4s 3d 4p …||||ترتيب امتلاء المدارات.|Order in which orbitals fill.
قاعدة الثمانية|Octet rule|8 إلكترونات في الغلاف الخارجي||||الذرات تميل للاستقرار.|Atoms seek a stable octet.
`);

EQ.add('crx',`
البناء الضوئي|Photosynthesis|6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂||||النباتات تصنع السكر والأكسجين.|Plants make sugar and oxygen.|plant
التنفس الخلوي|Cellular respiration|C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + طاقة||||كيف تحصل خلايانا على الطاقة.|How our cells get energy.|plant
احتراق الميثان|Combustion of methane|CH₄ + 2O₂ → CO₂ + 2H₂O||||غاز الطبخ.|Cooking gas.
احتراق البروبان|Combustion of propane|C₃H₈ + 5O₂ → 3CO₂ + 4H₂O||||وقود الشواء.|Barbecue fuel.
احتراق الأوكتان|Combustion of octane|2C₈H₁₈ + 25O₂ → 16CO₂ + 18H₂O||||البنزين في السيارات.|Petrol in cars.
احتراق الإيثانول|Combustion of ethanol|C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O||||وقود حيوي.|A biofuel.
احتراق الهيدروجين|Combustion of hydrogen|2H₂ + O₂ → 2H₂O||||وقود نظيف للصواريخ.|Clean rocket fuel.
احتراق الكربون|Combustion of carbon|C + O₂ → CO₂||||الفحم.|Charcoal.
احتراق غير كامل|Incomplete combustion|2C + O₂ → 2CO||||أول أكسيد الكربون السام.|Toxic carbon monoxide.
تكوين الماء|Formation of water|2H₂ + O₂ → 2H₂O||||تفاعل اتحاد.|A synthesis reaction.
تكوين ملح الطعام|Formation of table salt|2Na + Cl₂ → 2NaCl||||فلز نشط وغاز سام يكوّنان ملحًا.|A reactive metal and toxic gas make salt.
تحلل فوق أكسيد الهيدروجين|Decomposition of hydrogen peroxide|2H₂O₂ → 2H₂O + O₂||||يُسرّع بالمحفّز.|Speeded up by a catalyst.
تحلل كربونات الكالسيوم|Decomposition of limestone|CaCO₃ → CaO + CO₂||||صناعة الجير والإسمنت.|Making lime and cement.
تحلل الماء|Decomposition of water|2H₂O → 2H₂ + O₂||||بالتحليل الكهربائي.|By electrolysis.
البيكربونات والخل|Baking soda and vinegar|NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂||||فوران البركان المدرسي.|The school volcano fizz.
حمض وفلز|Acid and metal|Zn + 2HCl → ZnCl₂ + H₂||||ينطلق غاز الهيدروجين.|Hydrogen gas is released.
حمض وكربونات|Acid and carbonate|CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂||||فوران الرخام في الحمض.|Marble fizzing in acid.
حمض وأكسيد فلز|Acid and metal oxide|CuO + H₂SO₄ → CuSO₄ + H₂O||||يتكون محلول أزرق.|Makes a blue solution.
إحلال بسيط (حديد ونحاس)|Single displacement (iron and copper)|Fe + CuSO₄ → FeSO₄ + Cu||||الحديد يحل محل النحاس.|Iron displaces copper.
إحلال مزدوج (ترسيب)|Double displacement (precipitate)|AgNO₃ + NaCl → AgCl↓ + NaNO₃||||راسب أبيض.|A white precipitate.
ترسيب كبريتات الباريوم|Barium sulfate precipitate|BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl||||كشف الكبريتات.|Testing for sulfate.
اختبار ثاني أكسيد الكربون|Limewater test for CO₂|Ca(OH)₂ + CO₂ → CaCO₃ + H₂O||||ماء الجير يتعكر.|Limewater turns milky.
صناعة الأمونيا (هابر)|Ammonia synthesis (Haber)|N₂ + 3H₂ ⇌ 2NH₃||||أسمدة تطعم مليارات البشر.|Fertiliser feeding billions.
عملية التلامس|Contact process|2SO₂ + O₂ ⇌ 2SO₃||||صناعة حمض الكبريتيك.|Making sulfuric acid.
عملية أوستفالد|Ostwald process|4NH₃ + 5O₂ → 4NO + 6H₂O||||صناعة حمض النيتريك.|Making nitric acid.
التخمر|Fermentation|C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂||||الخميرة تنفخ العجين.|Yeast makes dough rise.|plant
التصبن|Saponification|دهن + 3NaOH → غليسرول + 3 صابون||||صناعة الصابون.|Making soap.
الثيرميت|Thermite reaction|2Al + Fe₂O₃ → Al₂O₃ + 2Fe||||حرارة عالية جدًا للحام السكك.|Very hot; welds rail tracks.
احتراق المغنيسيوم|Burning magnesium|2Mg + O₂ → 2MgO||||ضوء أبيض ساطع.|A brilliant white light.
الصوديوم والماء|Sodium and water|2Na + 2H₂O → 2NaOH + H₂||||تفاعل عنيف.|A violent reaction.
الكالسيوم والماء|Calcium and water|Ca + 2H₂O → Ca(OH)₂ + H₂||||أهدأ من الصوديوم.|Calmer than sodium.
الجير الحي والماء|Quicklime and water|CaO + H₂O → Ca(OH)₂||||طارد للحرارة بشدة.|Strongly exothermic.
تكوين الأوزون|Ozone formation|3O₂ → 2O₃||||بالأشعة فوق البنفسجية.|Driven by UV light.
تكوين المطر الحمضي|Acid rain|SO₃ + H₂O → H₂SO₄||||من حرق الوقود الكبريتي.|From burning sulfur fuels.
ثاني أكسيد الكربون والماء|Carbon dioxide in water|CO₂ + H₂O ⇌ H₂CO₃||||المشروبات الغازية حامضة قليلًا.|Fizzy drinks are slightly acidic.
تفاعل كلوريد الأمونيوم|Ammonia and hydrogen chloride|NH₃ + HCl → NH₄Cl||||دخان أبيض.|A white smoke.
تفاعل الفضة مع الكبريت|Silver tarnishing|4Ag + 2H₂S + O₂ → 2Ag₂S + 2H₂O||||اسوداد الفضة.|Silver turning black.
احتراق السكر|Combustion of glucose|C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O||||طاقة الطعام.|Food energy.
تكسير الهيدروكربونات|Cracking|C₁₀H₂₂ → C₈H₁₈ + C₂H₄||||تحويل النفط الثقيل لبنزين.|Turning heavy oil into petrol.
بلمرة الإيثين|Polymerisation of ethene|n C₂H₄ → (−CH₂−CH₂−)ₙ||||صناعة البولي إيثيلين (البلاستيك).|Making polythene plastic.
الأسترة|Esterification|حمض + كحول ⇌ إستر + ماء||||روائح الفواكه.|Fruity smells.
الهدرجة|Hydrogenation|C₂H₄ + H₂ → C₂H₆||||تحويل الزيوت لسمن.|Turning oils into margarine.
الكلورة بالضوء|Free-radical chlorination|CH₄ + Cl₂ → CH₃Cl + HCl||||بوجود ضوء.|In light.
تحلل كلورات البوتاسيوم|Decomposition of potassium chlorate|2KClO₃ → 2KCl + 3O₂||||تحضير الأكسجين في المختبر.|Making oxygen in the lab.
التحلل الكهربائي لملح الطعام|Electrolysis of brine|2NaCl + 2H₂O → 2NaOH + H₂ + Cl₂||||صناعة الكلور والصودا الكاوية.|Making chlorine and caustic soda.
التعادل في المعدة|Antacid neutralisation|Mg(OH)₂ + 2HCl → MgCl₂ + 2H₂O||||دواء الحموضة.|Antacid medicine.
اختبار النشا باليود|Starch–iodine test|نشا + I₂ → معقد أزرق داكن||||كشف النشا في الطعام.|Detecting starch in food.
تأكسد الإيثانول|Oxidation of ethanol|C₂H₅OH + O₂ → CH₃COOH + H₂O||||النبيذ يتحول لخل.|Turning ethanol into vinegar.
`);

EQ.add('cor',`
الصيغة العامة للألكانات|General formula of alkanes|CₙH₂ₙ₊₂|Hn|2*Cn+2|Cn|هيدروكربونات مشبعة.|Saturated hydrocarbons.
الصيغة العامة للألكينات|General formula of alkenes|CₙH₂ₙ|Hn|2*Cn|Cn|رابطة ثنائية واحدة.|One double bond.
الصيغة العامة للألكاينات|General formula of alkynes|CₙH₂ₙ₋₂|Hn|2*Cn-2|Cn|رابطة ثلاثية واحدة.|One triple bond.
الصيغة العامة للكحولات|General formula of alcohols|CₙH₂ₙ₊₁OH|Hn|2*Cn+2|Cn|مجموعة الهيدروكسيل.|The hydroxyl group.
الصيغة العامة للأحماض الكربوكسيلية|General formula of carboxylic acids|CₙH₂ₙ₊₁COOH|Hn|2*Cn+2|Cn|مجموعة الكربوكسيل.|The carboxyl group.
الصيغة العامة للسيكلوألكانات|General formula of cycloalkanes|CₙH₂ₙ|Hn|2*Cn|Cn|حلقات مشبعة.|Saturated rings.
درجة عدم التشبع|Degree of unsaturation|DBE = C − H/2 + N/2 + 1|DBE|Cn-Hn/2+Nn_/2-Xn/2+1|Cn Hn Nn_ Xn|عدد الحلقات والروابط المضاعفة.|Rings plus multiple bonds.
الكتلة المولية للألكان|Molar mass of an alkane|M = 14n + 2|Mm|14.027*Cn+2.016|Cn|تقريب سريع.|A quick estimate.
معامل الاحتجاز (كروماتوغرافيا)|Retention factor (chromatography)|R_f = d_spot / d_front|Rf|dsp/dsf|dsp dsf|فصل الأصباغ والمواد.|Separating dyes and compounds.
عدد الأيزومرات البنائية للألكان|Constitutional isomers of hexane|C₆H₁₄ له 5 أيزومرات||||نفس الصيغة وتركيب مختلف.|Same formula, different structure.
الميثان|Methane|CH₄||||أبسط ألكان.|The simplest alkane.
الإيثان|Ethane|C₂H₆||||غاز في الغاز الطبيعي.|In natural gas.
البيوتان|Butane|C₄H₁₀||||وقود الولاعات.|Lighter fuel.
الإيثين (الإيثيلين)|Ethene (ethylene)|C₂H₄||||يُنضج الفواكه.|Ripens fruit.
الإيثاين (الأسيتيلين)|Ethyne (acetylene)|C₂H₂||||لهب اللحام.|Welding flame.
البنزين العطري|Benzene|C₆H₆||||حلقة عطرية.|An aromatic ring.
الإيثانول|Ethanol|C₂H₅OH||||كحول المعقمات.|Sanitiser alcohol.
حمض الأسيتيك|Acetic acid|CH₃COOH||||حمض الخل.|Vinegar acid.
الجلوكوز|Glucose|C₆H₁₂O₆||||سكر الطاقة في الدم.|Blood sugar.
السكروز|Sucrose|C₁₂H₂₂O₁₁||||سكر الطعام.|Table sugar.
الأسبرين|Aspirin|C₉H₈O₄||||مسكن ومخفض للحرارة.|A painkiller and fever reducer.
الكافيين|Caffeine|C₈H₁₀N₄O₂||||منبه في القهوة والشاي.|The stimulant in coffee and tea.
اليوريا|Urea|CO(NH₂)₂||||أول مادة عضوية صُنعت في المختبر (فوهلر).|First organic compound made in a lab (Wöhler).
الأسيتون|Acetone|CH₃COCH₃||||مزيل طلاء الأظافر.|Nail-polish remover.
الفورمالديهايد|Formaldehyde|HCHO||||أبسط ألدهيد.|The simplest aldehyde.
`);
