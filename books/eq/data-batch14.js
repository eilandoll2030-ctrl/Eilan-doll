/* موسوعة معادلات إيلان — برمجة الألعاب، التشفير، العمارة والمباني الموفرة، السفن والبحرية */
EQ.syms(`
# ---- game development
px0|x|الموقع|position|px|100
pvel|v|السرعة|speed|px/s|200
pdt|Δt|زمن الإطار|frame time|s|0.016
pxnew|x′|الموقع الجديد|new position|px|103.2
la|a|البداية|start value||0
lb|b|النهاية|end value||100
lt|t|نسبة التقدم|progress (0–1)||0.5
lerp|v|القيمة المتوسطة|interpolated value||50
ease|y|التسهيل|eased value||0.5
cx1|x₁|مركز الأول x|centre 1 x|px|0
cy1|y₁|مركز الأول y|centre 1 y|px|0
cr1|r₁|نصف قطر الأول|radius 1|px|20
cx2|x₂|مركز الثاني x|centre 2 x|px|30
cy2|y₂|مركز الثاني y|centre 2 y|px|10
cr2|r₂|نصف قطر الثاني|radius 2|px|15
hit|hit|تصادم؟|collision? (1 = yes)||1
jh|h|ارتفاع القفزة|jump height|px|120
jg|g|الجاذبية في اللعبة|game gravity|px/s²|1500
jv|v|سرعة القفزة|jump velocity|px/s|600
vx_|x|مركبة x|x component||3
vy_|y|مركبة y|y component||4
vlen|‖v‖|طول المتجه|vector length||5
damp|k|معامل التخميد|damping per second||5
vdamp|v|السرعة بعد التخميد|speed after damping|px/s|184.6
hpmax|HP|نقاط الحياة|hit points||100
atk|ATK|قوة الهجوم|attack||30
defn|DEF|الدفاع|defence||10
gdmg|dmg|الضرر|damage||25
xpl|L|المستوى|level||10
xpn|XP|الخبرة المطلوبة|XP needed||1000
# ---- cryptography
shift|k|الإزاحة|shift||3
letter|x|رقم الحرف|letter number (A = 0)||7
enc|y|الحرف المشفّر|encrypted letter||10
mmsg|m|الرسالة|message number||65
eexp|e|الأس العام|public exponent||17
nmod|n|المقياس|modulus||3233
cRSA|c|النص المشفّر|ciphertext||2790
kbits|n|طول المفتاح|key length|bits|128
keys|N|عدد المفاتيح|number of keys||3.4e38
tries|r|محاولات في الثانية|guesses per second||1e12
tbrute|t|زمن التخمين|time to brute-force|years|1.08e19
hbits_|n|طول البصمة|hash length|bits|64
bday|N|المحاولات لتصادم|tries for a likely collision||5.1e9
# ---- architecture & efficient buildings
hwin|h|ارتفاع النافذة|window height|m|1.5
salt2|α|ارتفاع الشمس صيفًا|summer sun altitude|°|80
ovh|d|طول المظلة|overhang depth|m|0.26
Awin|A_w|مساحة النوافذ|window area|m²|20
Awal|A|مساحة الواجهة|façade area|m²|100
wwr|WWR|نسبة النوافذ للواجهة|window-to-wall ratio|%|20
Uval|U|معامل انتقال الحرارة|U-value|W/(m²·K)|0.5
Aenv|A|مساحة الغلاف|envelope area|m²|300
dTb|ΔT|فرق الحرارة|temperature difference|K|20
Qloss|Q̇|الفقد الحراري|heat loss|W|3000
Rlay|R|المقاومة الحرارية للطبقة|layer resistance|m²·K/W|2
thk|d|سماكة العزل|insulation thickness|m|0.08
kins|λ|موصلية العزل|insulation conductivity|W/(m·K)|0.04
Ein_|E_in|الإضاءة الداخلية|indoor illuminance|lux|300
Eout_|E_out|الإضاءة الخارجية|outdoor illuminance|lux|10000
dfp|DF|معامل ضوء النهار|daylight factor|%|3
# ---- ships & marine
lwl|L|طول خط الماء|waterline length|ft|30
vhull|v|سرعة البدن|hull speed|kt|7.3
knots|kt|العقد|knots|kt|20
kmh2|v|كم/ساعة|km/h|km/h|37
Vdisp|V|الحجم المغمور|submerged volume|m³|50
disp|Δ|الإزاحة|displacement|t|51.25
Bbeam|B|عرض السفينة|beam|m|8
Tdraft|T|الغاطس|draught|m|2
Lship|L|طول السفينة|ship length|m|40
Cblk|C_b|معامل الكتلة|block coefficient||0.6
TPC|TPC|الأطنان لكل سنتيمتر|tonnes per centimetre||3.28
Awp|A_wp|مساحة خط الماء|waterplane area|m²|320
`);

EQ.add('gdv',`
الحركة المستقلة عن سرعة الإطارات|Frame-independent movement|x′ = x + v Δt|pxnew|px0+pvel*pdt|px0 pvel pdt|عشان اللعبة تمشي بنفس السرعة على أي جهاز.|So the game runs at the same speed on any device.
الاستيفاء الخطي (Lerp)|Linear interpolation (lerp)|v = a + (b − a) t|lerp|la+(lb-la)*lt|la lb lt|للحركة الناعمة بين نقطتين.|For smooth motion between two points.
تسهيل الحركة (Smoothstep)|Smoothstep easing|y = 3t² − 2t³|ease|3*lt*lt-2*lt*lt*lt|lt|الحركة تبدأ بهدوء وتخلص بهدوء.|Motion that starts and ends gently.
تصادم دائرتين|Circle–circle collision|تصادم إذا d ≤ r₁ + r₂|hit|(hypot(cx2-cx1,cy2-cy1)<=cr1+cr2)?1:0|cx1 cy1 cr1 cx2 cy2 cr2|أسرع طريقة لكشف التصادم في الألعاب.|The quickest way to detect collisions in games.
سرعة القفزة لارتفاع محدد|Jump velocity for a set height|v = √(2 g h)|jv|sqrt(2*jg*jh)|jg jh|المصممون يختارون الارتفاع ويحسبون السرعة.|Designers choose the height and work out the speed.
طول المتجه|Vector length|‖v‖ = √(x² + y²)|vlen|hypot(vx_,vy_)|vx_ vy_|لتطبيع اتجاه الحركة.|Used to normalise movement direction.
التخميد المستقل عن الإطارات|Frame-independent damping|v′ = v e^(−k Δt)|vdamp|pvel*exp(-damp*pdt)|pvel damp pdt|احتكاك يخلي الشخصية توقف بنعومة.|Friction that slows a character smoothly.
معادلة الضرر البسيطة|Simple damage formula|dmg = ATK × 100 / (100 + DEF)|gdmg|atk*100/(100+defn)|atk defn|الدفاع يقلل الضرر بدون ما يلغيه.|Defence reduces damage without cancelling it.
منحنى الخبرة|Experience curve|XP = 100 × L²|xpn|100*xpl*xpl|xpl|كل مستوى يحتاج خبرة أكثر.|Each level needs more experience.
منحنى بيزييه التربيعي|Quadratic Bézier curve|B(t) = (1 − t)² P₀ + 2(1 − t)t P₁ + t² P₂||||المسارات المنحنية في الرسم والألعاب.|Curved paths in drawing and games.
`);

EQ.add('cry',`
شيفرة قيصر|Caesar cipher|y = (x + k) mod 26|enc|(letter+shift)%26|letter shift|أقدم تشفير معروف؛ يوليوس قيصر استخدم إزاحة 3.|The oldest known cipher; Julius Caesar used a shift of 3.
فك شيفرة قيصر|Decoding a Caesar cipher|x = (y − k) mod 26|letter|((enc-shift)%26+26)%26|enc shift|نفس المفتاح بالعكس.|The same key in reverse.
تشفير RSA|RSA encryption|c = mᵉ mod n|cRSA|(()=>{let r=1,b=Math.round(mmsg)%nmod,e=Math.round(eexp);while(e>0){if(e%2)r=(r*b)%nmod;b=(b*b)%nmod;e=Math.floor(e/2)}return r})()|mmsg eexp nmod|مثال الكتب الشهير: n = 61 × 53 = 3233.|The famous textbook example: n = 61 × 53 = 3233.
عدد المفاتيح الممكنة|Number of possible keys|N = 2ⁿ|keys|pow(2,kbits)|kbits|مفتاح 128 بت = عدد خيالي.|A 128-bit key gives an astronomical number.
زمن كسر المفتاح بالتخمين|Time to brute-force a key|t = 2ⁿ / (2 r × 31557600)|tbrute|pow(2,kbits)/(2*tries*31557600)|kbits tries|في المتوسط تلقاه بعد تجربة نص المفاتيح.|On average you find it after half the keys.
مفارقة عيد الميلاد للبصمات|Birthday bound for hashes|N ≈ 1.177 × 2^(n/2)|bday|1.177*pow(2,hbits_/2)|hbits_|عشان كذا البصمات لازم تكون طويلة.|Why hashes need to be long.
تبادل المفاتيح (ديفي-هيلمان)|Diffie–Hellman key exchange|K = (gᵃ)ᵇ mod p = (gᵇ)ᵃ mod p||||طرفين يتفقون على سر بدون ما يرسلونه.|Two people agree on a secret without sending it.
`);

EQ.add('arc',`
طول المظلة فوق النافذة|Window overhang depth|d = h / tan α|ovh|hwin/tan(rad(salt2))|hwin salt2|تحجب شمس الصيف العالية وتدخل شمس الشتاء.|Blocks the high summer sun and lets in winter sun.
نسبة النوافذ للواجهة|Window-to-wall ratio|WWR = A_w / A × 100|wwr|Awin/Awal*100|Awin Awal|نوافذ كثيرة = حرارة أكثر في الصيف.|More glass means more summer heat.
الفقد الحراري عبر جدران المبنى|Heat loss through a building envelope|Q̇ = U A ΔT|Qloss|Uval*Aenv*dTb|Uval Aenv dTb|العزل الجيد يقلل U.|Good insulation lowers U.
مقاومة طبقة العزل|Thermal resistance of an insulation layer|R = d / λ|Rlay|thk/kins|thk kins|كل ما زادت أحسن.|The higher the better.
معامل U من المقاومة|U-value from resistance|U = 1 / R|Uval|1/Rlay|Rlay|مقلوب المقاومة الكلية.|The inverse of total resistance.
معامل ضوء النهار|Daylight factor|DF = E_in / E_out × 100|dfp|Ein_/Eout_*100|Ein_ Eout_|فوق 2% الغرفة مضاءة طبيعيًا كفاية.|Above 2% the room is naturally well lit.
`);

EQ.add('mar',`
سرعة البدن للقارب|Hull speed of a boat|v = 1.34 √L|vhull|1.34*sqrt(lwl)|lwl|L بالقدم والسرعة بالعقدة.|L in feet, speed in knots.
من العقدة إلى كم/ساعة|Knots to km/h|v = kt × 1.852|kmh2|knots*1.852|knots|العقدة = ميل بحري في الساعة.|A knot is one nautical mile per hour.
إزاحة السفينة|Ship displacement|Δ = V × 1.025|disp|Vdisp*1.025|Vdisp|بالطن في ماء البحر.|In tonnes in seawater.
الحجم المغمور من معامل الكتلة|Submerged volume from block coefficient|V = C_b L B T|Vdisp|Cblk*Lship*Bbeam*Tdraft|Cblk Lship Bbeam Tdraft|كم من السفينة تحت الماء.|How much of the ship is under water.
الأطنان لكل سنتيمتر غاطس|Tonnes per centimetre immersion|TPC = A_wp × 1.025 / 100|TPC|Awp*1.025/100|Awp|كم حمولة تنزل السفينة سنتيمتر.|How much cargo sinks the ship one more centimetre.
`);
