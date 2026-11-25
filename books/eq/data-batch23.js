/* موسوعة معادلات إيلان — مختبر الحرارة: التسخين الكهربائي، الخلط، الانصهار والتبخر، العزل، التكييف والطبخ */
EQ.syms(`
hlV|V|الجهد|voltage|V|12
hlI|I|التيار|current|A|4
hlt|t|الزمن|time|s|300
hlQ|Q|كمية الحرارة|heat|J|14400
hlm|m|الكتلة|mass|kg|0.5
hlc|c|الحرارة النوعية|specific heat capacity|J/(kg·K)|4186
hlDT|ΔT|التغير في درجة الحرارة|temperature change|°C|80
hlP|P|القدرة|power|W|2000
hltk|t|زمن التشغيل|time switched on|s|100
hlmb|m|كتلة القالب المعدني|mass of the metal block|kg|1
hlDTb|ΔT|ارتفاع حرارة القالب|rise in block temperature|°C|16
hlDTs|ΔT|تغير حرارة القضيب|temperature change of the rod|°C|10
hlDTw|ΔT|فرق الحرارة بين الداخل والخارج|inside–outside temperature difference|°C|20
hlDTi|ΔT|التغير في الحرارة|temperature change|°C|10
hlmv|m|كتلة الماء اللي تبخر|mass of water boiled away|kg|0.265
hlAc|A|مساحة سطح الكوب|surface area of the cup|m²|0.02
hlmt|m|كتلة ماء الخزان|mass of water in the tank|kg|100
hlDTt|ΔT|ارتفاع حرارة الخزان|tank temperature rise|°C|40
hlAs|A|مساحة اللوح الشمسي|collector area|m²|2
hlts|t|مدة التعرض للشمس|time in the sun|s|3600
hletas|η|كفاءة السخان الشمسي|solar heater efficiency|%|50
hleta|η|كفاءة الغلاية|kettle efficiency|%|84
hlmw|m_w|كتلة الماء|mass of water|kg|0.2
hlcw|c_w|الحرارة النوعية للماء|specific heat of water|J/(kg·K)|4186
hlmm|m_m|كتلة المعدن|mass of the metal|kg|0.1
hlTm|T_m|حرارة المعدن الساخن|hot metal temperature|°C|100
hlTw|T_w|حرارة الماء أول|starting water temperature|°C|20
hlTf|T_f|الحرارة النهائية|final temperature|°C|23.8
hlcm|c_m|الحرارة النوعية للمعدن|specific heat of the metal|J/(kg·K)|420
hlCc|C_cal|السعة الحرارية للمسعر|calorimeter heat capacity|J/K|80
hlLv|L_v|الحرارة الكامنة للتبخر|latent heat of vaporisation|J/kg|2260000
hlLf|L_f|الحرارة الكامنة للانصهار|latent heat of fusion|J/kg|334000
hlTd|T|الحرارة النهائية للماء|final water temperature|°C|20
hlmd|m_d|كتلة المشروب|mass of the drink|kg|0.3
hlmi|m_ice|كتلة الثلج اللازمة|ice needed|kg|0.0306
hlci|c_ice|الحرارة النوعية للثلج|specific heat of ice|J/(kg·K)|2100
hlrate|m/t|معدل الانصهار|melting rate|kg/s|0.006
hlK|K|درجة الحرارة بالكلفن|temperature in kelvin|K|310
hlF|°F|درجة الحرارة بالفهرنهايت|temperature in Fahrenheit|°F|98.3
hlU|U|معامل انتقال الحرارة|U-value|W/(m²·K)|2
hlA|A|المساحة|area|m²|10
hlE|E|الطاقة|energy|J|34560000
hlR|R|المقاومة الحرارية للمتر المربع|thermal resistance per square metre|m²·K/W|0.5
hlR1|R₁|مقاومة الطبقة الأولى|first layer resistance|m²·K/W|0.3
hlR2|R₂|مقاومة الطبقة الثانية|second layer resistance|m²·K/W|0.2
hlY|E|معامل يونغ|Young’s modulus|Pa|200000000000
hlal|α|معامل التمدد الطولي|linear expansion coefficient|1/°C|0.000012
hlsig|σ|الإجهاد الحراري|thermal stress|Pa|24000000
hlrt|dT/dt|معدل ارتفاع الحرارة|heating rate|°C/s|0.96
hlh|h|معامل الحمل|convection coefficient|W/(m²·K)|10
hltau|τ|الثابت الزمني للتبريد|cooling time constant|s|10465
hlPc|P|القدرة المفقودة بالحمل|convective heat loss|W|2000
hlkwh|kWh|الطاقة بالكيلوواط ساعة|energy in kilowatt-hours|kWh|0.17
hlpr|السعر|سعر الكيلوواط ساعة|price per kWh|SAR/kWh|0.18
hlcost|التكلفة|التكلفة|cost|SAR|0.03
hlbtu|BTU/h|قدرة التبريد بوحدة BTU|cooling capacity|BTU/h|18000
hlWc|W|قدرة التبريد بالواط|cooling capacity in watts|W|5276
hlPin|P_in|القدرة الكهربائية للمكيف|electrical input of the AC|W|1600
hlEER|EER|نسبة كفاءة الطاقة|energy efficiency ratio|BTU/(W·h)|11.25
hlhr|ساعات|عدد ساعات التشغيل|hours of use|h|8
hlG|G|الإشعاع الشمسي|solar irradiance|W/m²|800
hlalt|h|الارتفاع عن سطح البحر|altitude|m|2200
hlTb|T_b|درجة غليان الماء|boiling point of water|°C|92.7
hlTc|T|درجة حرارة الهواء|air temperature|°C|30
hlRH|RH|الرطوبة النسبية|relative humidity|%|60
hlTdp|T_d|نقطة الندى|dew point|°C|22
`);

EQ.add('hlb',`
الحرارة من سخان كهربائي|Heat from an electric heater|Q = V I t|hlQ|hlV*hlI*hlt|hlV hlI hlt|سخان 12 فولت و4 أمبير لخمس دقائق يعطي 14,400 جول.|A 12 V, 4 A heater for five minutes gives 14,400 J.
الحرارة النوعية بالطريقة الكهربائية|Specific heat by the electrical method|c = V I t / (m ΔT)|hlc|hlV*hlI*hlt/(hlmb*hlDTb)|hlV hlI hlt hlmb hlDTb|قالب ألمنيوم كيلو يسخن 16 درجة من 14,400 جول، فتطلع c قرابة 900.|A 1 kg aluminium block warmed 16 °C by 14,400 J gives c ≈ 900.
زمن تسخين الماء|Time to heat water|t = m c ΔT / P|hlt|hlm*hlc*hlDT/hlP|hlm hlc hlDT hlP|غلاية 2000 واط تسخّن نص لتر 80 درجة في قرابة 84 ثانية لو ما فيه فقد.|A 2 kW kettle heats half a litre by 80 °C in about 84 s with no losses.
كفاءة الغلاية|Kettle efficiency|η = m c ΔT / (P t) × 100|hleta|hlm*hlc*hlDT/(hlP*hltk)*100|hlm hlc hlDT hlP hltk|الباقي يروح في تسخين الغلاية والهواء.|The rest warms the kettle and the air.
الحرارة النوعية لمعدن بطريقة الخلط|Specific heat of a metal by mixtures|c_m = m_w c_w (T_f − T_w) / (m_m (T_m − T_f))|hlcm|hlmw*hlcw*(hlTf-hlTw)/(hlmm*(hlTm-hlTf))|hlmw hlcw hlTf hlTw hlmm hlTm|نحط معدن مغلي في ماء بارد ونقيس الحرارة النهائية.|Drop boiled metal into cold water and read the final temperature.
الحرارة في المسعر مع الكوب|Heat in a calorimeter including the cup|Q = (m c + C_cal) ΔT|hlQ|(hlm*hlc+hlCc)*hlDT|hlm hlc hlCc hlDT|الكوب نفسه يمتص جزء من الحرارة.|The cup itself soaks up some heat.
الحرارة الكامنة للتبخر كهربائيًا|Latent heat of vaporisation electrically|L_v = P t / m|hlLv|hlP*hlt/hlmv|hlP hlt hlmv|نوزن الماء قبل وبعد الغليان لمدة معروفة.|Weigh the water before and after boiling for a known time.
ثلج إلى ماء دافئ|Ice at 0 °C to warm water|Q = m (L_f + c_w T)|hlQ|hlm*(hlLf+hlcw*hlTd)|hlm hlLf hlcw hlTd|ذوبان الثلج ياخذ طاقة أكثر من تسخين الماء 80 درجة.|Melting takes more energy than warming the water by 80 °C.
الثلج اللازم لتبريد مشروب|Ice needed to cool a drink|m_ice = m_d c_w ΔT / (L_f + c_w T_f)|hlmi|hlmd*hlcw*hlDTi/(hlLf+hlcw*hlTf)|hlmd hlcw hlDTi hlLf hlTf|مكعبين ثلج تقريبًا يبردون كوب عصير 10 درجات.|About two ice cubes cool a glass of juice by 10 °C.
حرق البخار أخطر من الماء المغلي|Why steam burns worse than boiling water|Q = m (L_v + c_w ΔT)|hlQ|hlm*(hlLv+hlcw*hlDT)|hlm hlLv hlcw hlDT|البخار يعطي حرارته الكامنة لما يتكثف على الجلد.|Steam releases its latent heat as it condenses on skin.
تسخين الثلج تحت الصفر|Warming ice below zero|Q = m c_ice ΔT|hlQ|hlm*hlci*hlDTi|hlm hlci hlDTi|حرارة الثلج النوعية نص حرارة الماء تقريبًا.|Ice has about half the specific heat of water.
معدل ذوبان الثلج|Rate of melting|m/t = P / L_f|hlrate|hlP/hlLf|hlP hlLf|سخان 2000 واط يذوّب 6 جرامات ثلج كل ثانية.|A 2 kW heater melts about 6 g of ice per second.
كلفن إلى فهرنهايت|Kelvin to Fahrenheit|°F = 1.8 (K − 273.15) + 32|hlF|1.8*(hlK-273.15)+32|hlK|310 كلفن هي حرارة الجسم تقريبًا.|310 K is about body temperature.
الحرارة الضائعة من جدار في يوم|Heat lost through a wall in a day|E = U A ΔT t|hlE|hlU*hlA*hlDTw*86400|hlU hlA hlDTw|العزل يقلل U فتقل الفاتورة.|Insulation lowers U and the bill with it.
معامل U من المقاومة|U-value from thermal resistance|U = 1 / R|hlU|1/hlR|hlR|كل ما زادت المقاومة قلّ تسرب الحرارة.|The higher the resistance, the less heat leaks.
مقاومة جدار من طبقتين|Resistance of a two-layer wall|R = R₁ + R₂|hlR|hlR1+hlR2|hlR1 hlR2|الطبقات تنجمع مثل المقاومات على التوالي.|Layers add like resistors in series.
الإجهاد الحراري|Thermal stress|σ = E α ΔT|hlsig|hlY*hlal*hlDTs|hlY hlal hlDTs|ليش نترك فراغات بين قضبان سكة الحديد.|Why rails are laid with small gaps.
معدل ارتفاع الحرارة|Rate of temperature rise|dT/dt = P / (m c)|hlrt|hlP/(hlm*hlc)|hlP hlm hlc|كم درجة يسخن الماء كل ثانية.|How many degrees the water gains each second.
الثابت الزمني لتبريد كوب|Cooling time constant of a cup|τ = m c / (h A)|hltau|hlm*hlc/(hlh*hlAc)|hlm hlc hlh hlAc|بعد τ يكون فرق الحرارة نزل إلى 37% تقريبًا.|After τ the temperature gap falls to about 37%.
الفقد بالحمل|Heat loss by convection|P = h A ΔT|hlPc|hlh*hlA*hlDTw|hlh hlA hlDTw|المروحة تزيد h فتبرد أسرع.|A fan raises h, so things cool faster.
الطاقة بالكيلوواط ساعة|Energy in kilowatt-hours|kWh = P t / 3,600,000|hlkwh|hlP*hlt/3600000|hlP hlt|الوحدة اللي تنحسب فيها فاتورة الكهرباء.|The unit on an electricity bill.
تكلفة تسخين الماء|Cost of heating water|التكلفة = (P t / 3.6×10⁶) × السعر|hlcost|hlP*hlt/3600000*hlpr|hlP hlt hlpr|حط سعر الكيلوواط ساعة من فاتورتك.|Enter the price per kWh from your own bill.
قدرة المكيف من BTU إلى واط|Air-conditioner capacity from BTU/h to watts|W = BTU/h × 0.2931|hlWc|hlbtu*0.2931|hlbtu|مكيف 18 ألف وحدة يسحب حرارة قرابة 5.3 كيلوواط.|An 18,000 BTU/h unit removes about 5.3 kW of heat.
نسبة كفاءة المكيف EER|Air-conditioner efficiency (EER)|EER = BTU/h / P_in|hlEER|hlbtu/hlPin|hlbtu hlPin|كل ما زاد الرقم كان المكيف أوفر.|The higher the number, the more economical the unit.
استهلاك المكيف في اليوم|Daily air-conditioner energy|kWh = P_in × ساعات / 1000|hlkwh|hlPin*hlhr/1000|hlPin hlhr|8 ساعات لمكيف 1600 واط تساوي 12.8 كيلوواط ساعة.|Eight hours of a 1.6 kW unit is 12.8 kWh.
السخان الشمسي|Solar water heater|Q = η G A t / 100|hlQ|hletas*hlG*hlAs*hlts/100|hletas hlG hlAs hlts|الشمس في السعودية تعطي إشعاع عالي أغلب السنة.|Sunshine in Saudi Arabia is strong most of the year.
غليان الماء على المرتفعات|Boiling point at altitude|T_b ≈ 100 − h / 300|hlTb|100-hlalt/300|hlalt|في أبها يغلي الماء قرابة 93 درجة، فيتأخر طبخ الأكل.|In Abha water boils near 93 °C, so food cooks slower.
نقطة الندى التقريبية|Approximate dew point|T_d ≈ T − (100 − RH) / 5|hlTdp|hlTc-(100-hlRH)/5|hlTc hlRH|تقريب جيد لما تكون الرطوبة فوق 50%.|A good estimate when humidity is above 50%.
الطاقة المخزنة في خزان ماء حار|Energy stored in a hot-water tank|kWh = m c ΔT / 3,600,000|hlkwh|hlmt*hlc*hlDTt/3600000|hlmt hlc hlDTt|خزان 100 لتر سخن 40 درجة يخزن قرابة 4.7 كيلوواط ساعة.|A 100-litre tank heated by 40 °C holds about 4.7 kWh.
`);
