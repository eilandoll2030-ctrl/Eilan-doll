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
};
