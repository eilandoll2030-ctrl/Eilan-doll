/* Eilan Interactive Library — catalog. To add a book: add an entry here and a file books/<id>.js (see physics.js). */
window.EB_CATALOG={
 cats:[
  {id:'enc',ic:'∑',n:{ar:'الموسوعات التفاعلية',en:'Interactive encyclopedias'}},
  {id:'sci',ic:'🔬',n:{ar:'العلوم',en:'Sciences'}},
  {id:'math',ic:'📐',n:{ar:'الرياضيات والإحصاء',en:'Math & Statistics'}},
  {id:'tech',ic:'💻',n:{ar:'التقنية',en:'Technology'}},
  {id:'lang',ic:'🗣️',n:{ar:'اللغات',en:'Languages'}},
  {id:'hum',ic:'🌍',n:{ar:'الإنسانيات',en:'Humanities'}},
  {id:'arts',ic:'🎨',n:{ar:'الفنون',en:'Arts'}}
 ],
 books:[
  {id:'equations',cat:'enc',ready:true,href:'/equations.html',count:2566,ic:'∑',c:['#0B1F5E','#4A2A8F'],n:{ar:'موسوعة معادلات إيلان',en:'Eilan Equations Encyclopedia'},sub:{ar:'+2500 معادلة بمجسمات 3D',en:'2500+ equations in 3D'},kw:['معادلات','معادلة','موسوعة','قوانين','equations','formula','formulas','encyclopedia']},
  {id:'physics',href:'/equations.html?book=physics',eqc:607,cat:'sci',ready:true,ic:'⚡',c:['#1E44C8','#0B1F5E'],n:{ar:'الفيزياء',en:'Physics'},sub:{ar:'الطاقة · القوة · الموجات · الكهرباء',en:'Energy · Force · Waves · Electricity'},kw:['فيزياء','طاقة','قوة','بندول','موجة','كهرباء','physics','energy','force','wave','ohm'],
   toc:[{ar:'طاقة الوضع',en:'Potential energy'},{ar:'حفظ الطاقة',en:'Conservation of energy'},{ar:'قانون نيوتن الثاني',en:"Newton's second law"},{ar:'البندول البسيط',en:'Simple pendulum'},{ar:'الموجات',en:'Waves'},{ar:'قانون أوم',en:"Ohm's law"}]},
  {id:'chemistry',href:'/equations.html?book=chemistry',eqc:535,cat:'sci',ready:true,ic:'⚗️',c:['#4A2A8F','#251147'],n:{ar:'الكيمياء',en:'Chemistry'},sub:{ar:'الذرة · المادة · الغازات · التفاعلات',en:'Atoms · Matter · Gases · Reactions'},kw:['كيمياء','ذرة','غاز','حمض','تفاعل','chemistry','atom','gas','ph','reaction'],
   toc:[{ar:'تركيب الذرة',en:'Atomic structure'},{ar:'حالات المادة',en:'States of matter'},{ar:'قانون الغاز المثالي',en:'Ideal gas law'},{ar:'الأحماض والقواعد',en:'Acids & bases'},{ar:'موازنة التفاعل',en:'Balancing reactions'}]},
  {id:'biology',href:'/equations.html?book=biology',eqc:103,cat:'sci',ready:true,ic:'🧬',c:['#0F6B44','#07341F'],n:{ar:'الأحياء',en:'Biology'},sub:{ar:'الخلية · العين · القلب · النبات',en:'Cell · Eye · Heart · Plants'},kw:['أحياء','خلية','عين','قلب','بناء ضوئي','biology','cell','eye','heart','photosynthesis'],
   toc:[{ar:'الخلية الحيوانية',en:'The animal cell'},{ar:'كيف تركّز العين',en:'How the eye focuses'},{ar:'القلب والنبض',en:'Heart & pulse'},{ar:'البناء الضوئي',en:'Photosynthesis'},{ar:'نمو المجتمعات',en:'Population growth'}]},
  {id:'math',href:'/equations.html?book=math',eqc:548,cat:'math',ready:true,ic:'📐',c:['#0F6B44','#0B1F5E'],n:{ar:'الرياضيات',en:'Mathematics'},sub:{ar:'الدوال · الهندسة · المثلثات · المتجهات',en:'Functions · Geometry · Trig · Vectors'},kw:['رياضيات','دالة','فيثاغورس','مثلثات','متجه','دائرة','math','function','pythagoras','trig','vector','circle'],
   toc:[{ar:'الدالة الخطية',en:'Linear functions'},{ar:'الدالة التربيعية',en:'Quadratic functions'},{ar:'نظرية فيثاغورس',en:'Pythagorean theorem'},{ar:'دائرة الوحدة',en:'The unit circle'},{ar:'جمع المتجهات',en:'Adding vectors'},{ar:'مساحة الدائرة',en:'Area of a circle'}]},
  {id:'statistics',href:'/equations.html?book=statistics',eqc:140,cat:'math',ready:true,ic:'📊',c:['#251147','#1E44C8'],n:{ar:'الإحصاء',en:'Statistics'},sub:{ar:'المتوسطات · التوزيع · الاحتمال',en:'Averages · Distributions · Probability'},kw:['إحصاء','احصاء','متوسط','وسيط','انحراف','احتمال','ارتباط','statistics','mean','median','probability','correlation'],
   toc:[{ar:'الوسط والوسيط والمنوال',en:'Mean, median & mode'},{ar:'التوزيع الطبيعي',en:'Normal distribution'},{ar:'قانون الأعداد الكبيرة',en:'Law of large numbers'},{ar:'الارتباط',en:'Correlation'},{ar:'نظرية النهاية المركزية',en:'Central limit theorem'}]},
  {id:'earth-space',cat:'sci',ic:'🪐',c:['#0B1F5E','#07080C'],n:{ar:'علوم الأرض والفضاء',en:'Earth & Space'},sub:{ar:'المجموعة الشمسية · الطقس',en:'Solar system · Weather'}},
  {id:'geometry',cat:'math',ic:'📏',c:['#07341F','#251147'],n:{ar:'الهندسة الفراغية',en:'Solid Geometry'},sub:{ar:'المجسمات · الحجوم',en:'Solids · Volumes'}},
  {id:'calculus',cat:'math',ic:'∫',c:['#4A2A8F','#0B1F5E'],n:{ar:'التفاضل والتكامل',en:'Calculus'},sub:{ar:'النهايات · المشتقة · التكامل',en:'Limits · Derivative · Integral'}},
  {id:'programming',cat:'tech',ic:'💻',c:['#0F6B44','#07080C'],n:{ar:'البرمجة',en:'Programming'},sub:{ar:'أساسيات التفكير البرمجي',en:'Computational thinking'}},
  {id:'ai',cat:'tech',ic:'🤖',c:['#1E44C8','#251147'],n:{ar:'الذكاء الاصطناعي',en:'Artificial Intelligence'},sub:{ar:'كيف تتعلم الآلة',en:'How machines learn'}},
  {id:'arabic',cat:'lang',ic:'ض',c:['#07341F','#0F6B44'],n:{ar:'اللغة العربية',en:'Arabic Language'},sub:{ar:'النحو · الإملاء · البلاغة',en:'Grammar · Spelling · Rhetoric'}},
  {id:'english',cat:'lang',ic:'Aa',c:['#0B1F5E','#1E44C8'],n:{ar:'اللغة الإنجليزية',en:'English Language'},sub:{ar:'القواعد · المفردات',en:'Grammar · Vocabulary'}},
  {id:'history',cat:'hum',ic:'🏛️',c:['#251147','#07341F'],n:{ar:'التاريخ',en:'History'},sub:{ar:'الحضارات عبر الزمن',en:'Civilizations through time'}},
  {id:'geography',cat:'hum',ic:'🗺️',c:['#0F6B44','#0B1F5E'],n:{ar:'الجغرافيا',en:'Geography'},sub:{ar:'الخرائط · المناخ',en:'Maps · Climate'}},
  {id:'economics',cat:'hum',ic:'💹',c:['#0B1F5E','#07341F'],n:{ar:'الاقتصاد',en:'Economics'},sub:{ar:'العرض والطلب',en:'Supply & demand'}},
  {id:'art',cat:'arts',ic:'🎨',c:['#4A2A8F','#07341F'],n:{ar:'التربية الفنية',en:'Art'},sub:{ar:'الألوان · المنظور',en:'Color · Perspective'}},
  {id:'music',cat:'arts',ic:'🎵',c:['#251147','#4A2A8F'],n:{ar:'الموسيقى والصوت',en:'Music & Sound'},sub:{ar:'الإيقاع · النغمة',en:'Rhythm · Pitch'}}
 ]
};
