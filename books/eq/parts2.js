/* قطع المجسمات الإضافية (scenes2.js) — بنفس ترتيب K.place في كل مشهد */
const P=(ar,en,ra,re,o={})=>({n:[ar,en],r:[ra,re],...o});
const CARD=P('بطاقة المعادلة','Equation card','تعرض الصيغة فوق الصفحة','shows the formula on the page');
export const PARTS2={
 drone:()=>[P('منصة الهبوط','Landing pad','المكان اللي يقلع منه الدرون','where the drone takes off',{b:1}),
  P('جسم الدرون','Drone body','يحمل الكاميرا والإلكترونيات','carries the camera and electronics',{e:1,s:['dmass','m']}),
  ...[1,2,3,4].map(i=>P('المروحة '+i,'Propeller '+i,'تدفع الهواء لتحت فيرتفع الدرون','pushes air down so the drone rises',{e:1,s:i===1?['thrm','thmax','nmot']:undefined})),
  P('البطارية','Battery','مصدر الطاقة للمحركات','powers the motors',{e:1,s:['bwh','E']}),CARD],
 car:()=>[P('الطريق','Road','اللي تمشي عليه السيارة','what the car drives on',{b:1}),
  P('السيارة','Car','الجسم اللي يتحرك','the moving body',{e:1,s:['m','kmh','v']}),
  P('مضخة الوقود','Fuel pump','مصدر الطاقة للسيارة','the car’s energy source',{s:['fuelL','fprice']}),CARD],
 phone:()=>[P('الجوال','Phone','الجهاز اللي تنشحن بطاريته','the device whose battery charges',{e:1,s:['phwh','mah']}),
  P('الشاحن','Charger','يعطي الكهرباء للبطارية','delivers electricity to the battery',{e:1,s:['wchg_','ma','vchg','achg']}),
  P('رمز الشحن','Charging sign','يبيّن إن الطاقة تنتقل','shows energy is flowing'),CARD],
 ship:()=>[P('البحر','Sea','الماء اللي تطفو عليه السفينة','the water the ship floats on',{b:1}),
  P('السفينة','Ship','الجسم الطافي','the floating body',{e:1,s:['Vdisp','disp','lwl']}),
  P('المنارة','Lighthouse','ترشد السفن في الليل','guides ships at night'),CARD],
 ac:()=>[P('الجدار','Wall','يحمل المكيف','holds the unit',{b:1}),
  P('المكيف','Air conditioner','يسحب الحرارة من الغرفة','pulls heat out of the room',{e:1,s:['tons','mair','Uhx']}),
  P('الترمومتر','Thermometer','يقيس حرارة الغرفة','measures room temperature'),
  P('الكنب','Sofa','الغرفة اللي نبردها','the room being cooled'),CARD],
 house:()=>[P('الأرض','Ground','مكان البيت','where the house stands',{b:1}),
  P('البيت','House','المبنى اللي نحسب طاقته','the building whose energy we work out',{e:1,s:['Aenv','Ar','watt']}),
  P('الشمس','Sun','مصدر الحرارة والضوء','the source of heat and light',{e:1,s:['irr','salt2']}),
  P('اللوح الشمسي','Solar panel','يحوّل ضوء الشمس لكهرباء','turns sunlight into electricity'),CARD],
 laptop:()=>[P('اللابتوب','Laptop','الجهاز اللي يعالج البيانات','the device that processes the data',{e:1,s:['nalg','bitsN','fileMB','kbits']}),
  P('الراوتر','Router','يوصّل الجهاز بالإنترنت','connects the device to the internet',{e:1,s:['mbps','rtt']}),CARD]
 ,music:()=>[P('البيانو','Piano','آلة النوتات والترددات','the instrument of notes and frequencies',{e:1,s:['key','f1','bpm']}),P('الجيتار','Guitar','أوتار تهتز وتصنع الصوت','vibrating strings that make sound',{s:['Lsc','fret']}),CARD]
 ,sport:()=>[P('مضمار الجري','Running track','المكان اللي يجري فيه اللاعب','where the athlete runs',{b:1}),P('العدّاء','Runner','الجسم اللي يتحرك ويصرف طاقة','the moving body that burns energy',{e:1,s:['massKg','dkm','m']}),P('الكرة','Ball','تنرمي وتنركل','gets thrown and kicked',{s:['v']}),P('ساعة الإيقاف','Stopwatch','تقيس الزمن','measures the time',{s:['tmin','t']}),CARD]
 ,kitchen:()=>[P('الموقد','Stove','مصدر الحرارة للطبخ','the heat source for cooking',{e:1,s:['pkettle','P']}),P('القدر','Pot','فيه الأكل والماء','holds the food and water',{e:1,s:['mw']}),P('الميزان','Kitchen scale','يقيس المقادير','weighs the ingredients',{s:['q1k','flour','grams']}),CARD]
 ,reaction:()=>[P('طاولة المختبر','Lab bench','مكان التجربة','where the experiment happens',{b:1}),
  P('الكأس','Beaker','فيه المادة الأولى ويصير فيه التفاعل','holds the first substance and the reaction',{e:1}),
  P('الدورق','Flask','فيه المادة الثانية ويصبها في الكأس','holds the second substance and pours it in',{e:1}),
  P('الموقد','Burner','يعطي حرارة للتفاعلات اللي تحتاجها','heats reactions that need it'),
  P('صندوق الجزيئات','Particle box','تكبير يبيّن الجزيئات وهي تتحرك وتتصادم','a zoom-in showing particles moving and colliding'),
  P('الترمومتر','Thermometer','يبيّن إذا التفاعل يطلع حرارة','shows whether the reaction gives off heat'),CARD]
 ,body:()=>[P('القاعدة','Stand','تحمل المجسم','holds the model',{b:1}),P('جسم الإنسان (الجلد)','Human body (skin)','شكل الجسم الحقيقي من بيانات علمية','the real body shape from scientific data',{e:1,s:['massKg','m','hgt','hcm']}),P('الهيكل العظمي','Skeleton','يحمل الجسم ويحمي الأعضاء (206 عظمة)','supports the body and protects the organs (206 bones)'),P('الدماغ','Brain','يتحكم في كل الجسم','controls the whole body'),P('القلب','Heart','يضخ الدم في الجسم','pumps blood around the body',{e:1,s:['HR','SVml','edv']}),P('الرئتان والقصبة','Lungs and windpipe','تدخلان الأكسجين للجسم','bring oxygen into the body',{s:['tvol','rr']}),P('الجهاز الهضمي','Digestive system','المعدة والكبد والأمعاء تهضم الأكل','the stomach, liver and intestines digest food',{s:['kcal','carb','prot']}),P('الكليتان والمثانة','Kidneys and bladder','تنظفان الدم وتطلعان السوائل الزايدة','clean the blood and remove extra fluid',{s:['CLr']}),P('الأذن والعينان','Ears and eyes','أعضاء السمع والبصر','the organs of hearing and sight',{s:['acu','dBA']}),P('الأذن الداخلية','Inner ear','القوقعة للسمع والقنوات للتوازن','the cochlea for hearing, the canals for balance'),P('جهاز تخطيط القلب','Heart monitor','يرسم نبضات القلب','draws the heartbeat'),CARD]
 ,earth:()=>[P('الكرة الأرضية','Planet Earth','طبقاتها: القشرة والوشاح واللب','its layers: crust, mantle and core',{e:1,s:['M0','Mrich','Mw']}),P('البركان','Volcano','يطلع منه الصهير من باطن الأرض','where magma reaches the surface'),P('جهاز رصد الزلازل','Seismograph','يرسم اهتزازات الأرض','draws the ground’s shaking',{s:['tsp_']}),CARD]
 ,weather:()=>[P('الأرض','Ground','سطح الأرض','the ground',{b:1}),P('السحابة','Cloud','منها ينزل المطر','where the rain comes from',{e:1,s:['rainmm','Tdew']}),P('الشمس','Sun','تسخن الهواء','warms the air',{e:1,s:['Tair','Tair2']}),P('توربين الرياح','Wind turbine','يبيّن قوة الرياح','shows how strong the wind is',{s:['vkmh','bft']}),P('الترمومتر','Thermometer','يقيس حرارة الجو','measures air temperature'),CARD]
 ,pump:()=>[P('الخزان','Tank','مصدر الماء','the water source',{e:1,s:['Vtank','pop_']}),P('المضخة','Pump','تدفع الماء في الأنابيب','pushes water through the pipes',{e:1,s:['Hpump','etap_','n1pm']}),P('الأنابيب والصمام','Pipes and valve','يمشي فيها الماء','the water flows through them',{e:1,s:['Lpipe','Dpp','Qpipe']}),P('مقياس الضغط','Pressure gauge','يقيس الضغط','measures the pressure'),CARD]
 ,desk:()=>[P('المكتب','Desk','مكان المذاكرة','where you study',{b:1}),P('الكتب','Books','المواد اللي تذاكرها','the subjects you study',{e:1,s:['pages','g1','gp1','words']}),P('الدفتر والقلم','Notebook and pen','تكتب وتراجع','write and review'),P('الساعة','Clock','تقيس وقت المذاكرة','times your study'),P('التقويم','Calendar','الأيام والمواعيد','days and dates'),CARD]
 ,garden:()=>[P('الأصيص','Pot','أصيص فخّار بصحنه','a clay pot with its saucer',{b:1}),
  P('التربة','Soil','منها تمتص الجذور الماء والأملاح','roots draw water and minerals from it',{e:1}),
  P('الساق والأوراق','Stem and leaves','الأوراق تصنع الغذاء من الضوء وتطلق الأكسجين','leaves make food from light and release oxygen',{e:1}),
  P('الزهرة','Flower','منها تتكون البذور','seeds form here',{e:1}),
  P('الشمس','Sun','مصدر الضوء والطاقة لكل الحياة','the source of light and energy for all life'),CARD]
 ,microscope:()=>[P('القاعدة والمصباح','Base and lamp','قاعدة ثقيلة فيها مصباح يرسل الضوء من تحت العينة','a heavy base with a lamp that shines up through the sample',{b:1}),
  P('الذراع ومقابض الضبط','Arm and focus knobs','نمسك المجهر من الذراع، والمقابض تقرّب الصورة وتوضحها','carry it by the arm; the knobs bring the image into focus',{e:1}),
  P('المنصة والشريحة','Stage and slide','نضع الشريحة الزجاجية بالعينة فوقها ونثبتها بالمشابك','the glass slide with the sample sits here, held by clips',{e:1,s:['mkA','mkr','mkCs','mkNc','mkCnt','mkSq','mkDil','mkSd','mkMit','mkTot','mkPh','mkN0','mkCol','mkVp']}),
  P('العدسات الشيئية والعينية','Objective and eyepiece lenses','العدسات تكبّر الصورة: العينية × الشيئية = التكبير الكلي','the lenses magnify: eyepiece × objective = total magnification',{e:1,s:['mkE','mkO','mkM','mkMl','mkMh','mkNA','mkn','mkth','mkLam','mkEd']}),
  P('ساحة الرؤية','Field of view','اللي تشوفه عينك داخل المجهر','what your eye sees inside the microscope',{e:1,s:['mkI','mkFl','mkFh','mkd','mkN','mkG','mkt','mkg','mkk','mkCFU','mkCml','mkMI','mkSA','mkVc','mkSV','mkTp','mkCyc','mkDF']}),CARD]
 ,dna:()=>[P('الحامل','Stand','يحمل نموذج الحلزون','holds the helix model',{b:1}),
  P('الشريط الأول','First strand','عمود من سكر وفوسفات','a sugar–phosphate backbone',{e:1,s:['nkL','nkTu','nkMw','nkLb','nkv','nkGs','nkmu']}),
  P('الشريط الثاني','Second strand','الشريط المكمّل يمشي بالاتجاه المعاكس','the complementary strand runs the opposite way',{e:1,s:['nkN0','nkcy','nkN','nkgen','nkHy']}),
  P('أزواج القواعد','Base pairs','A مع T و G مع C — هذي هي الشفرة الوراثية','A with T and G with C — this is the genetic code',{e:1,s:['nkA','nkT','nkG','nkC','nkAn','nkTn','nkGn','nkCn','nkGC','nkbp','nkb','nkCd','nkAA','nkk','nkAT','nkGCn','nkTm','nkA260','nkA280','nkDil']}),
  P('دليل الألوان','Colour key','كل لون يمثل قاعدة نيتروجينية','each colour stands for one base'),CARD]
 ,titration:()=>[P('الحامل وطاولة المختبر','Stand and lab bench','يمسك السحاحة ثابتة وعمودية','holds the burette steady and upright',{b:1}),
  P('الخلّاط المغناطيسي','Magnetic stirrer','يدوّر قضيب صغير داخل الدورق عشان يخلط المحلول','spins a small bar inside the flask to mix the solution',{e:1}),
  P('الدورق المخروطي','Conical flask','فيه المادة المجهولة والمؤشر، ويتغير لونه عند نقطة النهاية','holds the unknown and the indicator; its colour changes at the end point',{e:1,s:['ttVx','ttMx','ttna','Va','Mac','ttHA','ttA','ttVw','ttVvin','ttnHCl','ttneu']}),
  P('السحاحة المدرّجة','Graduated burette','تنزّل المحلول القياسي قطرة قطرة ونقرأ منها الحجم','delivers the standard solution drop by drop and shows the volume used',{e:1,s:['ttV','ttVi','ttVf','ttM','Mbc','Vb','ttVbb','ttVba','ttn','ttVeq','tterr','ttV1','ttV2','ttV3']}),CARD]
 ,space:()=>[P('الفضاء','Space','خلفية النجوم','the starry background',{b:1}),P('الشمس','Sun','مركز المجموعة الشمسية، وجاذبيتها تمسك الكواكب','the centre of the Solar System; its gravity holds the planets',{e:1,s:['M','Mstar','Msun','GMs']}),P('مدارات الكواكب','Planet orbits','الكواكب تدور حول الشمس (خرائط حقيقية من ناسا)','planets orbit the Sun (real NASA maps)',{e:1,s:['r','aorb','T','Tp']}),CARD]
};
