/* موسوعة معادلات إيلان — المجهر والخلية، البيولوجيا الجزيئية والـDNA */
EQ.syms(`
mkE|M_e|تكبير العدسة العينية|eyepiece magnification|×|10
mkO|M_o|تكبير العدسة الشيئية|objective magnification|×|40
mkM|M|التكبير الكلي|total magnification|×|400
mkI|I|حجم الصورة|image size|mm|20
mkA|A|الحجم الحقيقي|actual size|mm|0.05
mkFl|FOV₁|قطر ساحة الرؤية بالتكبير الصغير|field of view at low power|µm|4500
mkMl|M₁|التكبير الصغير|low magnification|×|40
mkMh|M₂|التكبير الكبير|high magnification|×|400
mkFh|FOV₂|قطر ساحة الرؤية بالتكبير الكبير|field of view at high power|µm|450
mkNc|N|عدد الخلايا على قطر الساحة|cells across the field|cells|9
mkCs|s|طول الخلية التقريبي|estimated cell length|µm|50
mkLam|λ|الطول الموجي للضوء|wavelength of light|nm|550
mkNA|NA|الفتحة العددية|numerical aperture||1.25
mkd|d|أصغر مسافة يمكن تمييزها|resolution limit|nm|220
mkn|n|معامل انكسار الوسط|refractive index of the medium||1.52
mkth|θ|نصف زاوية مخروط الضوء|half-angle of the light cone|°|55
mkr|r|نصف قطر الخلية|cell radius|µm|10
mkSA|SA|مساحة سطح الخلية|cell surface area|µm²|1257
mkVc|V|حجم الخلية|cell volume|µm³|4189
mkSV|SA:V|نسبة المساحة إلى الحجم|surface-to-volume ratio|1/µm|0.3
mkMit|n_m|عدد الخلايا في الانقسام|cells in mitosis|cells|24
mkTot|n|العدد الكلي للخلايا|total cells counted|cells|200
mkMI|MI|مؤشر الانقسام|mitotic index|%|12
mkPh|n_p|عدد الخلايا في المرحلة|cells in that phase|cells|10
mkCyc|T|زمن دورة الخلية|cell-cycle time|min|1200
mkTp|t_p|مدة المرحلة|time spent in the phase|min|60
mkCnt|c|عدد الخلايا في المربعات|cells counted in the squares|cells|120
mkSq|q|عدد المربعات|squares counted||5
mkDil|D|معامل التخفيف|dilution factor||2
mkCml|C|عدد الخلايا في كل مل|cells per mL|cells/mL|480000
mkN0|N₀|العدد الابتدائي للبكتيريا|starting number of bacteria|cells|100
mkN|N|العدد بعد فترة|number after a time|cells|102400
mkG|n_g|عدد الأجيال|number of generations||10
mkt|t|الزمن|time|min|200
mkg|g|زمن الجيل (المضاعفة)|generation (doubling) time|min|20
mkk|k|ثابت معدل النمو|growth rate constant|gen/min|0.05
mkCol|c|عدد المستعمرات|colonies counted|colonies|86
mkDF|DF|مقلوب التخفيف|reciprocal of the dilution||10000
mkVp|V|الحجم المزروع|volume plated|mL|0.1
mkCFU|CFU|الوحدات المكوّنة للمستعمرات في كل مل|colony-forming units per mL|CFU/mL|8600000
mkSd|s_d|تدريجات مسطرة الشريحة|stage micrometer divisions|div|10
mkEd|e_d|تدريجات مسطرة العدسة العينية|eyepiece graticule divisions|div|40
mkEU|EGU|قيمة تدريجة العدسة العينية|value of one eyepiece division|µm|2.5
nkA|A%|نسبة الأدينين|adenine percentage|%|30
nkT|T%|نسبة الثايمين|thymine percentage|%|30
nkG|G%|نسبة الجوانين|guanine percentage|%|20
nkC|C%|نسبة السيتوسين|cytosine percentage|%|20
nkGn|G|عدد قواعد الجوانين|number of guanine bases||420
nkCn|C|عدد قواعد السيتوسين|number of cytosine bases||420
nkAn|A|عدد قواعد الأدينين|number of adenine bases||580
nkTn|T|عدد قواعد الثايمين|number of thymine bases||580
nkGC|GC|نسبة GC|GC content|%|42
nkbp|bp|عدد أزواج القواعد|base pairs|bp|3000
nkL|L|طول جزيء DNA|length of the DNA molecule|nm|1020
nkTu|t|عدد اللفات|number of helical turns|turns|286
nkMw|M|الكتلة المولية لـDNA|molar mass of the DNA|g/mol|1950000
nkb|b|عدد القواعد في mRNA|bases in the mRNA||903
nkCd|c|عدد الكودونات|number of codons|codons|301
nkAA|aa|عدد الأحماض الأمينية|amino acids in the protein||300
nkk|k|عدد القواعد في الكودون|bases per codon||3
nkPC|P|عدد الكودونات الممكنة|possible codons||64
nkA260|A₂₆₀|الامتصاص عند 260 نانومتر|absorbance at 260 nm||0.5
nkA280|A₂₈₀|الامتصاص عند 280 نانومتر|absorbance at 280 nm||0.27
nkCc|C|تركيز DNA|DNA concentration|µg/mL|250
nkDil|D|معامل التخفيف|dilution factor||10
nkR|R|نسبة النقاوة|purity ratio||1.85
nkN0|N₀|النسخ الابتدائية|starting copies|copies|10
nkcy|n|عدد دورات PCR|PCR cycles|cycles|30
nkN|N|عدد النسخ بعد PCR|copies after PCR|copies|10737418240
nkAT|A+T|عدد A وT في البادئ|A and T in the primer||10
nkGCn|G+C|عدد G وC في البادئ|G and C in the primer||10
nkTm|T_m|درجة انصهار البادئ|primer melting temperature|°C|60
nkmu|μ|معدل الطفرة لكل قاعدة|mutation rate per base|per bp|1e-9
nkGs|G|حجم الجينوم|genome size|bp|3200000000
nkMut|m|عدد الطفرات المتوقعة|expected new mutations||3.2
nkgen|n|عدد الأجيال|generations||3
nkHy|h|نسبة الجزيئات الهجينة|fraction of hybrid molecules||0.25
nkv|v|سرعة شوكة التضاعف|replication fork speed|bp/s|1000
nktr|t|زمن تضاعف الجينوم|genome replication time|s|2320
nkLb|L|طول جينوم البكتيريا|bacterial genome length|bp|4640000
`);

EQ.add('msc',`
التكبير الكلي للمجهر|Total magnification of a microscope|M = M_e × M_o|mkM|mkE*mkO|mkE mkO|عدسة عينية 10× مع شيئية 40× = 400×.|A 10× eyepiece with a 40× objective gives 400×.
الحجم الحقيقي من الصورة|Actual size from an image|A = I / M|mkA|mkI/mkM|mkI mkM|حوّل الوحدات قبل القسمة.|Match the units before dividing.
التكبير من الصورة والحجم الحقيقي|Magnification from image and actual size|M = I / A|mkM|mkI/mkA|mkI mkA|كل ما كبر الرقم صارت التفاصيل أوضح.|The bigger the number, the larger the detail looks.
قطر ساحة الرؤية بالتكبير الكبير|Field of view at high power|FOV₂ = FOV₁ × M₁ / M₂|mkFh|mkFl*mkMl/mkMh|mkFl mkMl mkMh|كل ما زاد التكبير صغرت الساحة اللي نشوفها.|More magnification means a smaller visible area.
تقدير طول الخلية من ساحة الرؤية|Estimating cell size from the field of view|s = FOV / N|mkCs|mkFh/mkNc|mkFh mkNc|نعدّ كم خلية تصطف على القطر.|Count how many cells line up across the field.
قوة التمييز (حد آبي)|Resolution limit (Abbe)|d = λ / (2 NA)|mkd|mkLam/(2*mkNA)|mkLam mkNA|الضوء الأزرق يميّز تفاصيل أدق من الأحمر.|Blue light resolves finer detail than red.
الفتحة العددية للعدسة الشيئية|Numerical aperture of an objective|NA = n sin θ|mkNA|mkn*sin(mkth*PI/180)|mkn mkth|زيت الغمر يرفع n ويحسّن الوضوح.|Immersion oil raises n and sharpens the image.
مساحة سطح الخلية الكروية|Surface area of a spherical cell|SA = 4πr²|mkSA|4*PI*mkr*mkr|mkr|منها تدخل الغذاء ويطلع الفضلات.|Food comes in and waste leaves through it.
حجم الخلية الكروية|Volume of a spherical cell|V = 4/3 πr³|mkVc|4/3*PI*mkr*mkr*mkr|mkr|الحجم يكبر أسرع من المساحة.|Volume grows faster than surface area.
نسبة المساحة إلى الحجم في الخلية|Surface-to-volume ratio of a cell|SA:V = 3 / r|mkSV|3/mkr|mkr|لهذا الخلايا صغيرة: النسبة الكبيرة تسرّع التبادل.|This is why cells are small: a big ratio speeds exchange.
مؤشر الانقسام|Mitotic index|MI = n_m / n × 100|mkMI|mkMit/mkTot*100|mkMit mkTot|يقيس سرعة انقسام النسيج، ويرتفع في الأورام.|Shows how fast a tissue divides; high in tumours.
مدة مرحلة من دورة الخلية|Duration of a cell-cycle stage|t_p = n_p / n × T|mkTp|mkPh/mkTot*mkCyc|mkPh mkTot mkCyc|كل ما كثرت الخلايا في مرحلة، طالت مدتها.|The more cells in a stage, the longer that stage lasts.
عدّ الخلايا بالهيموسيتومتر|Cell count with a haemocytometer|C = c / q × 10⁴ × D|mkCml|mkCnt/mkSq*10000*mkDil|mkCnt mkSq mkDil|كل مربع كبير حجمه 0.1 ميكرولتر.|Each large square holds 0.1 µL.
معايرة مسطرة العدسة العينية|Calibrating the eyepiece graticule|EGU = s_d × 10 / e_d|mkEU|mkSd*10/mkEd|mkSd mkEd|كل تدريجة في مسطرة الشريحة = 10 ميكرومتر.|Each stage-micrometer division is 10 µm.
`);

EQ.add('mic',`
عدد أجيال البكتيريا|Number of bacterial generations|n = (log N − log N₀) / log 2|mkG|(log10(mkN)-log10(mkN0))/log10(2)|mkN mkN0|كل جيل يتضاعف العدد.|The number doubles every generation.
زمن الجيل|Generation time|g = t / n|mkg|mkt/mkG|mkt mkG|بكتيريا الأمعاء تتضاعف كل 20 دقيقة تقريبًا في المختبر.|Gut bacteria can double about every 20 minutes in the lab.
ثابت معدل النمو|Growth rate constant|k = n / t|mkk|mkG/mkt|mkG mkt|عدد الأجيال في كل دقيقة.|Generations per minute.
عدد البكتيريا بعد التضاعف|Bacteria after doubling|N = N₀ × 2ⁿ|mkN|mkN0*pow(2,mkG)|mkN0 mkG|من 100 خلية إلى أكثر من 100 ألف في 10 أجيال.|From 100 cells to over 100,000 in 10 generations.
العدّ بالأطباق بعد التخفيف المتسلسل|Plate count after serial dilution|CFU = c × DF / V|mkCFU|mkCol*mkDF/mkVp|mkCol mkDF mkVp|نختار الطبق اللي فيه 30–300 مستعمرة.|Use the plate with 30–300 colonies.
`);

EQ.add('mlb',`
نسبة GC في الـDNA|GC content of DNA|GC = (G + C) / (A + T + G + C) × 100|nkGC|(nkGn+nkCn)/(nkAn+nkTn+nkGn+nkCn)*100|nkGn nkCn nkAn nkTn|نسبة GC العالية تجعل الـDNA أقوى أمام الحرارة.|High GC makes DNA more heat-stable.
طول جزيء DNA|Length of a DNA molecule|L = bp × 0.34|nkL|nkbp*0.34|nkbp|كل زوج قواعد يرفع الحلزون 0.34 نانومتر.|Each base pair adds 0.34 nm to the helix.
عدد لفات الحلزون|Number of helical turns|t = bp / 10.5|nkTu|nkbp/10.5|nkbp|في كل لفة كاملة نحو 10.5 زوج قواعد.|About 10.5 base pairs per full turn.
الكتلة المولية لـDNA مزدوج|Molar mass of double-stranded DNA|M = bp × 650|nkMw|nkbp*650|nkbp|متوسط كتلة زوج القواعد نحو 650 جرام لكل مول.|An average base pair weighs about 650 g/mol.
عدد الكودونات في mRNA|Number of codons in mRNA|c = b / 3|nkCd|nkb/3|nkb|كل 3 قواعد = كودون واحد.|Every 3 bases make one codon.
عدد الأحماض الأمينية في البروتين|Amino acids in a protein|aa = (b − 3) / 3|nkAA|(nkb-3)/3|nkb|نطرح كودون الوقف لأنه ما يضيف حمض أميني.|Subtract the stop codon; it adds no amino acid.
تركيز DNA من الامتصاص|DNA concentration from absorbance|C = A₂₆₀ × 50 × D|nkCc|nkA260*50*nkDil|nkA260 nkDil|امتصاص 1 = 50 ميكروجرام لكل مل من DNA مزدوج.|An absorbance of 1 equals 50 µg/mL of double-stranded DNA.
نقاوة عينة DNA|Purity of a DNA sample|R = A₂₆₀ / A₂₈₀|nkR|nkA260/nkA280|nkA260 nkA280|حوالي 1.8 يعني نقية، وأقل يعني فيها بروتين.|About 1.8 means pure; lower means protein is present.
عدد النسخ في تفاعل PCR|Copies made by PCR|N = N₀ × 2ⁿ|nkN|nkN0*pow(2,nkcy)|nkN0 nkcy|كل دورة تضاعف النسخ.|Every cycle doubles the copies.
درجة انصهار البادئ (قاعدة والاس)|Primer melting temperature (Wallace rule)|T_m = 2(A + T) + 4(G + C)|nkTm|2*nkAT+4*nkGCn|nkAT nkGCn|G وC بينهم 3 روابط هيدروجينية فيحتاجون حرارة أكثر.|G–C pairs share 3 hydrogen bonds, so they need more heat.
عدد الطفرات الجديدة في الجينوم|New mutations per genome copy|m = μ × G|nkMut|nkmu*nkGs|nkmu nkGs|أخطاء التضاعف نادرة جدًا لكن الجينوم ضخم.|Copying errors are very rare, but the genome is huge.
التضاعف شبه المحافظ|Semi-conservative replication|h = 2 / 2ⁿ|nkHy|2/pow(2,nkgen)|nkgen|تجربة ميسلسون وستال: الشريطان القديمان يبقون في جزيئين فقط.|Meselson–Stahl: the two old strands stay in only two molecules.
زمن تضاعف جينوم البكتيريا|Bacterial genome replication time|t = L / (2v)|nktr|nkLb/(2*nkv)|nkLb nkv|نقطة بداية واحدة وشوكتين تمشيان بعكس بعض.|One origin and two forks moving apart.
`);
