/* موسوعة معادلات إيلان — مختبر البندول والنابض: القياس، الأخطاء، التخامد، والبندول في الحياة */
EQ.syms(`
plt|t|الزمن الكلي المقيس|total timed interval|s|20
pln|n|عدد الاهتزازات المعدودة|oscillations counted||10
plT|T|الزمن الدوري|period|s|2
plf|f|التردد|frequency|Hz|0.5
plw|ω|التردد الزاوي|angular frequency|rad/s|3.13
plL|L|الطول الفعّال للبندول|effective pendulum length|m|1
pll|l|طول الخيط|thread length|m|0.97
plr|r|نصف قطر الكرة|bob radius|m|0.03
plT0|T₀|الزمن الدوري للزوايا الصغيرة|small-angle period|s|2
plth0|θ₀|زاوية البداية|starting angle|°|20
plm|m|كتلة الكرة|bob mass|kg|0.2
plFT|F_T|شد الخيط|thread tension|N|2.2
plv|v|سرعة الكرة عند القاع|bob speed at the bottom|m/s|1
plh|h|ارتفاع الكرة فوق القاع|height of the bob above the lowest point|m|0.06
plE|E|طاقة البندول|pendulum energy|J|0.12
plW|Ω|أقصى سرعة زاوية|maximum angular speed|rad/s|1.1
plF|F|قوة الإرجاع|restoring force|N|0.67
pla|a|تسارع المصعد أو السيارة|lift or car acceleration|m/s²|2
plLr|L|طول القضيب|rod length|m|1
plR|R|نصف قطر الحلقة|hoop radius|m|0.2
plkg|k_g|نصف قطر التدويم|radius of gyration|m|0.3
pld|d|بعد المحور عن مركز الكتلة|pivot to centre-of-mass distance|m|0.4
plh1|h₁|بعد المحور الأول عن مركز الكتلة|first pivot distance|m|0.6
plh2|h₂|بعد المحور الثاني عن مركز الكتلة|second pivot distance|m|0.4
plge|g|تسارع الجاذبية المحسوب|calculated gravity|m/s²|9.8
plsl|s|ميل خط T² مع L|slope of T² against L|s²/m|4.03
plsm|s|ميل خط T² مع m|slope of T² against m|s²/kg|0.2
plk|k|ثابت النابض|spring constant|N/m|200
plms|m_s|كتلة النابض نفسه|mass of the spring|kg|0.03
plTs|T|الزمن الدوري للنابض|spring period|s|0.45
plA|A|سعة الاهتزاز|amplitude|m|0.05
plFm|F_max|أقصى قوة في النابض|maximum spring force|N|10
plvm|v_max|أقصى سرعة|maximum speed|m/s|1.6
pldt|Δt|خطأ رد الفعل في التوقيت|reaction-time error|s|0.2
plDT|ΔT|الخطأ في الزمن الدوري|uncertainty in the period|s|0.02
plpe|%|نسبة الخطأ|percentage error|%|1
plDL|ΔL|الخطأ في قياس الطول|uncertainty in length|m|0.002
plrg|Δg/g|الخطأ النسبي في g|relative uncertainty in g||0.022
plA1|A₁|سعة اهتزازة|one amplitude|cm|10
plA2|A₂|سعة الاهتزازة اللي بعدها|next amplitude|cm|9
pldl|δ|التناقص اللوغاريتمي|logarithmic decrement||0.105
plb|b|ثابت التخامد|damping constant|kg/s|0.021
plnh|n½|عدد الاهتزازات حتى نصف السعة|oscillations to halve the amplitude||6.6
plEl|ΔE/E|نسبة الطاقة الضائعة كل اهتزازة|fraction of energy lost per swing||0.19
plf1|f₁|تردد البندول الأول|first pendulum frequency|Hz|0.5
plf2|f₂|تردد البندول الثاني|second pendulum frequency|Hz|0.48
plTb|T_b|زمن النبضة|beat period|s|50
plL1|L₁|طول البندول الأول|first pendulum length|m|1
plL2|L₂|طول البندول الثاني|second pendulum length|m|0.25
plR12|T₁/T₂|نسبة الزمنين الدوريين|ratio of the periods||2
plal|α|معامل التمدد الطولي|linear expansion coefficient|1/°C|0.000019
plDth|Δθ|ارتفاع درجة الحرارة|temperature rise|°C|10
plloss|Δt|الثواني الضايعة في اليوم|seconds lost per day|s|8.2
plDLl|ΔL/L|التغير النسبي في الطول|fractional change in length||0.0001
pllat|φ|خط العرض|latitude|°|24.7
plTF|T_F|زمن دوران مستوى بندول فوكو|Foucault precession period|h|57.4
`);

EQ.add('plb',`
الزمن الدوري من التوقيت|Period from timing many swings|T = t / n|plT|plt/pln|plt pln|نعدّ 10 اهتزازات أو أكثر ونقسم، عشان يصغر خطأ يدنا.|Time 10 or more swings and divide, so the hand-timing error shrinks.
التردد من العدّ|Frequency from counting|f = n / t|plf|pln/plt|pln plt|كم اهتزازة كاملة في كل ثانية.|How many full swings happen each second.
الخطأ في الزمن الدوري من رد الفعل|Period uncertainty from reaction time|ΔT = Δt / n|plDT|pldt/pln|pldt pln|خطأ 0.2 ثانية على 10 اهتزازات يصير 0.02 ثانية بس.|A 0.2 s error over 10 swings becomes only 0.02 s.
نسبة خطأ التوقيت|Percentage timing error|% = Δt / t × 100|plpe|pldt/plt*100|pldt plt|كل ما طوّلنا مدة القياس قلّت النسبة.|The longer you time, the smaller the percentage.
الطول الفعّال للبندول|Effective length of a pendulum|L = l + r|plL|pll+plr|pll plr|نقيس من نقطة التعليق إلى مركز الكرة، مو إلى أسفلها.|Measure from the pivot to the centre of the bob, not its bottom.
التردد الزاوي للبندول|Angular frequency of a pendulum|ω = √(g / L)|plw|sqrt(g/plL)|g plL|بندول طوله متر: ω ≈ 3.13 راديان/ث.|A 1 m pendulum has ω ≈ 3.13 rad/s.
تردد البندول البسيط|Frequency of a simple pendulum|f = (1/2π) √(g / L)|plf|sqrt(g/plL)/(2*PI)|g plL|البندول الأقصر يتأرجح أسرع.|A shorter pendulum swings faster.
تصحيح الزاوية الكبيرة|Large-angle correction|T ≈ T₀ (1 + θ₀²/16)|plT|plT0*(1+pow(rad(plth0),2)/16)|plT0 plth0|عند 20° يزيد الزمن الدوري أقل من 1% فقط.|At 20° the period grows by less than 1%.
تصحيح الزاوية من الرتبة الثانية|Second-order angle correction|T ≈ T₀ (1 + θ₀²/16 + 11θ₀⁴/3072)|plT|plT0*(1+pow(rad(plth0),2)/16+11*pow(rad(plth0),4)/3072)|plT0 plth0|أدق للزوايا اللي فوق 30°.|More accurate above 30°.
ارتفاع الكرة عند زاوية|Height of the bob at an angle|h = L (1 − cos θ₀)|plh|plL*(1-cos(rad(plth0)))|plL plth0|كل ما كبرت الزاوية ارتفعت الكرة أكثر.|The bigger the angle, the higher the bob rises.
طاقة البندول|Energy of a pendulum|E = m g L (1 − cos θ₀)|plE|plm*g*plL*(1-cos(rad(plth0)))|plm g plL plth0|تتحول بين وضع فوق وحركة تحت.|It swaps between potential at the top and kinetic at the bottom.
أقصى سرعة للزوايا الصغيرة|Maximum speed for small swings|v ≈ θ₀ √(g L)|plv|rad(plth0)*sqrt(g*plL)|plth0 g plL|θ بالراديان.|θ in radians.
أقصى سرعة زاوية|Maximum angular speed|Ω = θ₀ √(g / L)|plW|rad(plth0)*sqrt(g/plL)|plth0 g plL|أسرع لحظة هي عند المرور بالقاع.|It is fastest as it passes the bottom.
قوة الإرجاع على الكرة|Restoring force on the bob|F = m g sin θ|plF|plm*g*sin(rad(plth0))|plm g plth0|هي اللي ترجّع الكرة للوسط دائمًا.|This is what always pulls the bob back to the middle.
شد الخيط عند القاع|Thread tension at the bottom|F_T = m g + m v² / L|plFT|plm*g+plm*plv*plv/plL|plm g plv plL|الخيط يشد أقوى من الوزن لأن الكرة تلف.|The thread pulls harder than the weight because the bob curves.
أقصى شد في الخيط|Maximum thread tension|F_T = m g (3 − 2 cos θ₀)|plFT|plm*g*(3-2*cos(rad(plth0)))|plm g plth0|لو أفلتناها أفقيًا يصير الشد ثلاث أضعاف الوزن.|Released from horizontal, the tension reaches three times the weight.
البندول في مصعد يتسارع لفوق|Pendulum in a lift accelerating upward|T = 2π √(L / (g + a))|plT|2*PI*sqrt(plL/(g+pla))|plL g pla|الجاذبية الظاهرية تزيد فيتأرجح أسرع.|Apparent gravity rises, so it swings faster.
البندول في سيارة تتسارع|Pendulum in an accelerating car|T = 2π √(L / √(g² + a²))|plT|2*PI*sqrt(plL/sqrt(g*g+pla*pla))|plL g pla|الخيط يميل للخلف ويقصر الزمن الدوري شوي.|The thread tilts back and the period shortens a little.
قضيب يتأرجح من طرفه|Rod swinging from one end|T = 2π √(2L / 3g)|plT|2*PI*sqrt(2*plLr/(3*g))|plLr g|أسرع من بندول بسيط بنفس الطول.|Faster than a simple pendulum of the same length.
حلقة معلّقة على مسمار|Hoop hanging on a nail|T = 2π √(2R / g)|plT|2*PI*sqrt(2*plR/g)|plR g|نفس زمن بندول بسيط طوله قطر الحلقة.|Same as a simple pendulum as long as the hoop’s diameter.
البندول المركّب ونصف قطر التدويم|Compound pendulum with radius of gyration|T = 2π √((k_g² + d²) / (g d))|plT|2*PI*sqrt((plkg*plkg+pld*pld)/(g*pld))|plkg pld g|أقل زمن دوري لما d = k_g.|The period is shortest when d = k_g.
بندول كاتر العكوس|Kater’s reversible pendulum|g = 4π² (h₁ + h₂) / T²|plge|4*PI*PI*(plh1+plh2)/(plT*plT)|plh1 plh2 plT|لما يتساوى الزمن من المحورين نقيس g بدقة عالية.|When both pivots give the same period, g comes out very precisely.
g من ميل الرسم البياني|g from the slope of a graph|g = 4π² / s|plge|4*PI*PI/plsl|plsl|نرسم T² مقابل L ونأخذ الميل، أدق من قياس واحد.|Plot T² against L and use the slope — better than one reading.
الخطأ النسبي في g|Relative uncertainty in g|Δg/g = ΔL/L + 2 ΔT/T|plrg|plDL/plL+2*plDT/plT|plDL plL plDT plT|خطأ الزمن يتضاعف لأن T مربّعة.|The timing error counts double because T is squared.
نسبة الزمنين لطولين مختلفين|Ratio of periods for two lengths|T₁/T₂ = √(L₁ / L₂)|plR12|sqrt(plL1/plL2)|plL1 plL2|نربّع الطول أربع مرات عشان يتضاعف الزمن.|Make the length four times longer to double the period.
زمن النبضة بين بندولين|Beat period of two pendulums|T_b = 1 / abs(f₁ − f₂)|plTb|1/abs(plf1-plf2)|plf1 plf2|البندولان يتفقان ويختلفان بالتناوب.|The two pendulums drift in and out of step.
ساعة البندول والتمدد بالحرارة|Pendulum clock and heat expansion|Δt = 86400 × α Δθ / 2|plloss|86400*plal*plDth/2|plal plDth|الحرارة تطوّل القضيب فتتأخر الساعة.|Heat lengthens the rod, so the clock runs slow.
تأخر الساعة من تغيّر الطول|Clock error from a length change|Δt = 86400 × (ΔL/L) / 2|plloss|86400*plDLl/2|plDLl|تغيير الطول 0.01% يأخّرها 4 ثواني في اليوم.|A 0.01% longer pendulum loses about 4 s a day.
بندول فوكو ودوران الأرض|Foucault pendulum and Earth’s spin|T_F = 23.93 h / sin φ|plTF|23.93/sin(rad(pllat))|pllat|في الرياض يلف مستوى التأرجح دورة كاملة في 57 ساعة تقريبًا.|In Riyadh the swing plane turns once in about 57 hours.
النابض مع مراعاة كتلته|Spring period including its own mass|T = 2π √((m + m_s/3) / k)|plTs|2*PI*sqrt((plm+plms/3)/plk)|plm plms plk|ثلث كتلة النابض تهتز معه.|A third of the spring’s own mass moves with the load.
k من ميل الرسم البياني|Spring constant from a graph slope|k = 4π² / s|plk|4*PI*PI/plsm|plsm|نرسم T² مقابل الكتلة المعلّقة.|Plot T² against the hanging mass.
أقصى قوة في النابض المهتز|Maximum force in an oscillating spring|F_max = k A|plFm|plk*plA|plk plA|عند أبعد نقطة تكون القوة أكبر ما يمكن.|The force is largest at the furthest point.
أقصى سرعة لكتلة على نابض|Maximum speed of a mass on a spring|v_max = A √(k / m)|plvm|plA*sqrt(plk/plm)|plA plk plm|أسرع لحظة عند المرور بنقطة الاتزان.|It is fastest passing the rest position.
التناقص اللوغاريتمي|Logarithmic decrement|δ = ln(A₁ / A₂)|pldl|log(plA1/plA2)|plA1 plA2|يقيس كم تخف السعة من اهتزازة للي بعدها.|Measures how much the swing shrinks from one swing to the next.
ثابت التخامد من التناقص|Damping constant from the decrement|b = 2 m δ / T|plb|2*plm*pldl/plT|plm pldl plT|مقاومة الهواء صغيرة، فيطلع b صغير.|Air resistance is small, so b is small.
اهتزازات حتى نصف السعة|Swings until the amplitude halves|n½ = ln 2 / δ|plnh|log(2)/pldl|pldl|كل ما قلّ التخامد طالت المدة.|The less damping, the longer it lasts.
الطاقة الضائعة كل اهتزازة|Energy lost per swing|ΔE/E = 1 − e^(−2δ)|plEl|1-exp(-2*pldl)|pldl|الطاقة تخف أسرع من السعة لأنها تعتمد على مربعها.|Energy fades faster than amplitude because it depends on its square.
`);
