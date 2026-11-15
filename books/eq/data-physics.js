/* موسوعة معادلات إيلان — الفيزياء (1): الميكانيكا */
EQ.syms(`
vy|v_y|المركبة الرأسية للسرعة|vertical velocity|m/s|5
vx|vₓ|المركبة الأفقية للسرعة|horizontal velocity|m/s|8
tf|t|زمن الطيران|time of flight|s|1.5
dv|Δv|التغير في السرعة|change in velocity|m/s|10
jerk|j|معدل تغير التسارع|jerk|m/s³|2
vrel|v_rel|السرعة النسبية|relative velocity|m/s|3
vA|v_A|سرعة الجسم A|velocity of A|m/s|10
vB|v_B|سرعة الجسم B|velocity of B|m/s|6
spd|v|السرعة القياسية|speed|m/s|15
Fnet|ΣF|محصلة القوى|net force|N|12
Ft|T|قوة الشد|tension|N|20
ang2|α|زاوية الميل|incline angle|°|30
Fd|F_D|قوة السحب|drag force|N|5
Cd|C_D|معامل السحب|drag coefficient||0.47
vt|v_t|السرعة الحدية|terminal velocity|m/s|50
ke2|k|ثابت الإزاحة|constant||1
Wf|W_f|شغل الاحتكاك|work of friction|J|30
Emech|E|الطاقة الميكانيكية|mechanical energy|J|200
dE|ΔE|التغير في الطاقة|energy change|J|50
Pavg|P̄|القدرة المتوسطة|average power|W|50
e|e|معامل الارتداد|coefficient of restitution||0.8
u1|u₁|السرعة الابتدائية للجسم 1|initial velocity 1|m/s|4
u2|u₂|السرعة الابتدائية للجسم 2|initial velocity 2|m/s|0
pf|p_f|الزخم النهائي|final momentum|kg·m/s|20
pi|pᵢ|الزخم الابتدائي|initial momentum|kg·m/s|10
xcm|x_cm|مركز الكتلة|centre of mass|m|1
xA|x₁|موقع الجسم 1|position 1|m|0
xB|x₂|موقع الجسم 2|position 2|m|2
vexh|v_e|سرعة الغازات المندفعة|exhaust speed|m/s|2500
mdot|ṁ|معدل تدفق الكتلة|mass flow rate|kg/s|10
m0|m₀|الكتلة الابتدائية|initial mass|kg|1000
mF|m_f|الكتلة النهائية|final mass|kg|400
Ir|I|عزم القصور|moment of inertia|kg·m²|0.5
Ek_r|E_rot|طاقة الحركة الدورانية|rotational kinetic energy|J|10
arc|s|طول القوس|arc length|m|3
vtan|v_t|السرعة المماسية|tangential velocity|m/s|6
atan_|a_t|التسارع المماسي|tangential acceleration|m/s²|2
rpm|rpm|دورات في الدقيقة|revolutions per minute|rpm|60
dpar|d|المسافة عن المحور|distance from axis|m|0.5
Icm|I_cm|عزم القصور حول مركز الكتلة|moment about centre|kg·m²|0.5
lever|r|ذراع القوة|lever arm|m|0.3
Pr2|P|القدرة الدورانية|rotational power|W|60
gE|g|الجاذبية على السطح|surface gravity|m/s²|9.8
Mp|M|كتلة الكوكب|planet mass|kg|5.97e24
Rp|R|نصف قطر الكوكب|planet radius|m|6.371e6
ve|v_esc|سرعة الإفلات|escape velocity|m/s|11186
vorb|v|السرعة المدارية|orbital speed|m/s|7900
aSemi|a|نصف المحور الأكبر|semi-major axis|m|1.496e11
Ug|U|طاقة الوضع الجاذبية|gravitational potential energy|J|-6e10
Vg|V|جهد الجاذبية|gravitational potential|J/kg|-6.26e7
gfield|g|شدة مجال الجاذبية|gravitational field strength|N/kg|9.8
hAlt|h|الارتفاع عن السطح|altitude|m|400000
xd|x|الإزاحة عن الاتزان|displacement|m|0.05
wosc|ω|التردد الزاوي|angular frequency|rad/s|10
ph0|φ|زاوية الطور|phase|rad|0
Tp|T|الزمن الدوري|period|s|2
bdamp|b|معامل التخميد|damping coefficient|kg/s|0.5
Qf|Q|معامل الجودة|quality factor||20
ks1|k₁|ثابت النابض الأول|spring 1|N/m|100
ks2|k₂|ثابت النابض الثاني|spring 2|N/m|200
Lp|L|طول البندول|pendulum length|m|1
dP|ΔP|فرق الضغط|pressure difference|Pa|9800
hd|h|العمق|depth|m|10
Vsub|V_sub|الحجم المغمور|submerged volume|m³|0.01
rhof|ρ_f|كثافة المائع|fluid density|kg/m³|1000
rhoo|ρ_o|كثافة الجسم|object density|kg/m³|700
vA1|v₁|السرعة في المقطع 1|speed at section 1|m/s|2
vA2|v₂|السرعة في المقطع 2|speed at section 2|m/s|8
F1h|F₁|القوة على المكبس الصغير|small-piston force|N|100
F2h|F₂|القوة على المكبس الكبير|large-piston force|N|5000
gam2|γ|التوتر السطحي|surface tension|N/m|0.072
Dpipe|D|قطر الأنبوب|pipe diameter|m|0.05
lpipe|L|طول الأنبوب|pipe length|m|10
vflow|v|سرعة التدفق|flow speed|m/s|2
rpipe|r|نصف قطر الأنبوب|pipe radius|m|0.01
`);

EQ.add('kin',`
السرعة المتوسطة|Average velocity|v̄ = Δx / Δt|vavg|dx/dt|dx dt|الإزاحة مقسومة على الزمن.|Displacement divided by time.|motion
السرعة الثابتة|Constant-velocity motion|x = x₀ + v t|x|x0+v*t|x0 v t|الموقع يزيد بانتظام مع الزمن.|Position grows steadily with time.|motion
التسارع المتوسط|Average acceleration|a = Δv / Δt|a|dv/dt|dv dt|معدل تغير السرعة.|Rate of change of velocity.|motion
المعادلة الأولى للحركة|First equation of motion|v = v₀ + a t|vf|v0+a*t|v0 a t|السرعة بعد زمن t بتسارع ثابت.|Velocity after time t at constant acceleration.|motion
المعادلة الثانية للحركة|Second equation of motion|x = v₀t + ½at²|s|v0*t+0.5*a*t*t|v0 a t|الإزاحة بتسارع ثابت.|Displacement under constant acceleration.|motion
المعادلة الثالثة للحركة|Third equation of motion|v² = v₀² + 2a x|vf|sqrt(v0*v0+2*a*s)|v0 a s|تربط السرعة بالإزاحة بدون زمن.|Links speed and displacement without time.|motion
الإزاحة بمتوسط السرعتين|Displacement from average velocity|x = ½(v₀ + v)t|s|0.5*(v0+vf)*t|v0 vf t|عند تسارع ثابت.|For constant acceleration.|motion
الإزاحة بالسرعة النهائية|Displacement from final velocity|x = v t − ½ a t²|s|vf*t-0.5*a*t*t|vf a t|صيغة بديلة باستخدام السرعة النهائية.|Alternative form using final velocity.|motion
زمن التوقف|Stopping time|t = v₀ / a|t|v0/a|v0 a|الزمن حتى تتوقف السيارة بتباطؤ a.|Time to stop with deceleration a.|motion
مسافة التوقف|Stopping distance|d = v₀² / (2a)|d|v0*v0/(2*a)|v0 a|مسافة الكبح حتى التوقف.|Braking distance until rest.|motion
السقوط الحر: السرعة|Free fall: velocity|v = g t|v|g*t|g t|سرعة جسم يسقط من السكون.|Speed of a body falling from rest.
السقوط الحر: المسافة|Free fall: distance|h = ½ g t²|h|0.5*g*t*t|g t|المسافة المقطوعة سقوطًا من السكون.|Distance fallen from rest.
السقوط الحر: سرعة الارتطام|Free fall: impact speed|v = √(2 g h)|v|sqrt(2*g*h)|g h|سرعة الوصول للأرض من ارتفاع h.|Speed reaching the ground from height h.
زمن السقوط الحر|Free fall: time|t = √(2h / g)|t|sqrt(2*h/g)|h g|الزمن اللازم للسقوط من ارتفاع h.|Time to fall a height h.
القذف الرأسي: أقصى ارتفاع|Vertical throw: max height|H = v₀² / (2g)|H|v0*v0/(2*g)|v0 g|أعلى نقطة لجسم مقذوف لأعلى.|Highest point of an upward throw.
القذف الرأسي: زمن الصعود|Vertical throw: rise time|t = v₀ / g|t|v0/g|v0 g|الزمن حتى تصير السرعة صفرًا.|Time until velocity reaches zero.
القذف الرأسي: الموقع|Vertical throw: height|y = v₀t − ½gt²|h|v0*t-0.5*g*t*t|v0 g t|ارتفاع الجسم عند الزمن t.|Height at time t.
المقذوف: المركبة الأفقية|Projectile: horizontal component|vₓ = v₀ cos θ|vx|v0*cos(rad(th))|v0 th|تبقى ثابتة طوال الطيران.|Stays constant during flight.
المقذوف: المركبة الرأسية|Projectile: vertical component|v_y = v₀ sin θ|vy|v0*sin(rad(th))|v0 th|تقل بفعل الجاذبية.|Reduced by gravity.
المقذوف: زمن الطيران|Projectile: time of flight|t = 2 v₀ sin θ / g|tf|2*v0*sin(rad(th))/g|v0 th g|على أرض مستوية.|On level ground.
المقذوف: المدى الأفقي|Projectile: range|R = v₀² sin 2θ / g|R|v0*v0*sin(2*rad(th))/g|v0 th g|أقصى مدى عند θ = 45°.|Maximum range at θ = 45°.
المقذوف: أقصى ارتفاع|Projectile: maximum height|H = v₀² sin²θ / (2g)|H|pow(v0*sin(rad(th)),2)/(2*g)|v0 th g|أعلى نقطة في المسار.|Peak of the trajectory.
المقذوف: معادلة المسار|Projectile: trajectory|y = x tan θ − g x² / (2 v₀² cos²θ)|h|x*tan(rad(th))-g*x*x/(2*v0*v0*pow(cos(rad(th)),2))|x th v0 g|المسار قطع مكافئ.|The path is a parabola.
المقذوف الأفقي: المدى|Horizontal launch: range|R = v₀ √(2h / g)|R|v0*sqrt(2*h/g)|v0 h g|جسم مقذوف أفقيًا من ارتفاع h.|Launched horizontally from height h.
السرعة المحصلة للمقذوف|Projectile resultant speed|v = √(vₓ² + v_y²)|spd|sqrt(vx*vx+vy*vy)|vx vy|من المركبتين.|From the two components.
زاوية اتجاه السرعة|Velocity direction|θ = tan⁻¹(v_y / vₓ)|th|deg(atan2(vy,vx))|vy vx|اتجاه الحركة لحظيًا.|Instantaneous direction of motion.
السرعة النسبية|Relative velocity|v_rel = v_A − v_B|vrel|vA-vB|vA vB|سرعة A كما يراها B.|Velocity of A as seen by B.|motion
سرعة القارب عبر النهر|Boat across a river|v = √(v_b² + v_r²)|spd|sqrt(vA*vA+vB*vB)|vA vB|محصلة سرعة القارب والتيار المتعامدتين.|Boat and current at right angles.|motion
التسارع من الرسم البياني|Acceleration from graph|a = (v₂ − v₁) / (t₂ − t₁)|a|(vB-vA)/t|vA vB t|ميل منحنى السرعة-الزمن.|Slope of the velocity–time graph.|motion
المسافة من منحنى السرعة|Distance from v–t area|d = v̄ · t|d|vavg*t|vavg t|المساحة تحت منحنى السرعة-الزمن.|Area under the v–t graph.|motion
معدل تغير التسارع|Jerk|j = Δa / Δt|jerk|a/dt|a dt|يحس فيه الراكب كهزة.|Felt by passengers as a jolt.|motion
السرعة الزاوية من التردد|Angular speed from frequency|ω = 2π f|w|2*PI*f|f|عدد الدورات في الثانية × 2π.|2π times revolutions per second.|wheel
السرعة الزاوية من الزمن الدوري|Angular speed from period|ω = 2π / T|w|2*PI/T|T|زمن دورة كاملة.|From the time of one revolution.|wheel
السرعة الخطية في الدوران|Linear speed in rotation|v = ω r|v|w*r|w r|النقطة الأبعد تتحرك أسرع.|Farther points move faster.|wheel
التسارع المركزي|Centripetal acceleration|a_c = v² / r|ac|v*v/r|v r|يتجه نحو المركز دائمًا.|Always points to the centre.|wheel
التسارع المركزي بالسرعة الزاوية|Centripetal acceleration (ω)|a_c = ω² r|ac|w*w*r|w r|صيغة بدلالة السرعة الزاوية.|In terms of angular speed.|wheel
الإزاحة في الثانية n|Distance in the n-th second|sₙ = v₀ + a(2n − 1)/2|s|v0+a*(2*nn-1)/2|v0 a nn|المسافة المقطوعة خلال الثانية رقم n.|Distance covered during second n.|motion
المسافة على منحدر|Distance down an incline|s = ½ g sin α t²|s|0.5*g*sin(rad(ang2))*t*t|g ang2 t|بدون احتكاك.|Frictionless incline.|motion
تسارع على منحدر أملس|Acceleration on a smooth incline|a = g sin α|a|g*sin(rad(ang2))|g ang2|مركبة الجاذبية على المنحدر.|Gravity component along the slope.|motion
السرعة أسفل المنحدر|Speed at the bottom of a slope|v = √(2 g h)|v|sqrt(2*g*h)|g h|لا تعتمد على زاوية الميل.|Independent of the slope angle.|motion
`);

EQ.add('dyn',`
قانون نيوتن الثاني|Newton’s second law|F = m a|F|m*a|m a|القوة تساوي الكتلة × التسارع.|Force equals mass times acceleration.
التسارع من القوة|Acceleration from force|a = ΣF / m|a|Fnet/m|Fnet m|محصلة القوى تحدد التسارع.|Net force sets the acceleration.
الوزن|Weight|W = m g|Wt|m*g|m g|قوة جذب الأرض للجسم.|Earth’s pull on a body.
الكتلة من الوزن|Mass from weight|m = W / g|m|Wt/g|Wt g|الكتلة ثابتة؛ الوزن يتغير بتغير g.|Mass is fixed; weight varies with g.
قانون نيوتن الثالث|Newton’s third law|F₁₂ = −F₂₁|F|-F1|F1|لكل فعل رد فعل مساوٍ ومعاكس.|Every action has an equal, opposite reaction.
محصلة قوتين متعامدتين|Two perpendicular forces|F = √(F₁² + F₂²)|F|sqrt(F1*F1+F2*F2)|F1 F2|مثل جمع المتجهات بفيثاغورس.|Vector sum by Pythagoras.
قوة الاحتكاك|Friction force|F_f = μ Fₙ|Ff|mu*Fn|mu Fn|تعاكس اتجاه الحركة.|Opposes the motion.
الاحتكاك السكوني الأقصى|Maximum static friction|F_s ≤ μₛ Fₙ|Ff|mus*Fn|mus Fn|أكبر قوة قبل أن يتحرك الجسم.|Largest force before sliding starts.
الاحتكاك الحركي|Kinetic friction|F_k = μₖ Fₙ|Ff|muk*Fn|muk Fn|أثناء الانزلاق.|While sliding.
القوة العمودية على سطح أفقي|Normal force on level ground|Fₙ = m g|Fn|m*g|m g|تساوي الوزن إذا لا توجد قوى رأسية أخرى.|Equals weight with no other vertical forces.
القوة العمودية على منحدر|Normal force on an incline|Fₙ = m g cos α|Fn|m*g*cos(rad(ang2))|m g ang2|تقل كلما زاد الميل.|Smaller on steeper slopes.
قوة الميل على منحدر|Force along an incline|F∥ = m g sin α|F|m*g*sin(rad(ang2))|m g ang2|المركبة التي تسحب الجسم للأسفل.|Component pulling the body down the slope.
التسارع على منحدر مع احتكاك|Incline with friction|a = g(sin α − μ cos α)|a|g*(sin(rad(ang2))-mu*cos(rad(ang2)))|g ang2 mu|إذا كان الناتج سالبًا لا ينزلق.|Negative result means no sliding.
زاوية الانزلاق الحرجة|Angle of repose|tan α = μₛ|ang2|deg(atan(mus))|mus|أقل زاوية يبدأ عندها الانزلاق.|Slope at which sliding begins.
قانون هوك|Hooke’s law|F = −k x|Fs|k*xd|k xd|قوة النابض تتناسب مع الاستطالة.|Spring force is proportional to stretch.
ثابت النابض|Spring constant|k = F / x|k|F/xd|F xd|صلابة النابض.|The stiffness of a spring.
القوة المركزية|Centripetal force|F_c = m v² / r|Fc|m*v*v/r|m v r|تبقي الجسم على مسار دائري.|Keeps a body on a circular path.
القوة المركزية بالسرعة الزاوية|Centripetal force (ω)|F_c = m ω² r|Fc|m*w*w*r|m w r|بدلالة السرعة الزاوية.|In terms of angular speed.
أقصى سرعة في منعطف|Max speed on a flat curve|v = √(μ g r)|v|sqrt(mu*g*r)|mu g r|الاحتكاك يوفر القوة المركزية.|Friction supplies the centripetal force.
زاوية الميل المثالية للمنعطف|Ideal banking angle|tan θ = v² / (r g)|th|deg(atan(v*v/(r*g)))|v r g|منعطف مائل بدون احتكاك.|Banked curve without friction.
الشد في حبل جسم معلّق|Tension holding a mass|T = m g|Ft|m*g|m g|جسم ساكن معلّق.|A mass hanging at rest.
الشد في مصعد يتسارع|Tension in an accelerating lift|T = m (g + a)|Ft|m*(g+a)|m g a|يزيد الشد عند الصعود المتسارع.|Greater when accelerating upward.
الوزن الظاهري في المصعد|Apparent weight in a lift|Fₙ = m (g + a)|Fn|m*(g+a)|m g a|تشعر بالثقل أكثر عند الصعود المتسارع.|You feel heavier accelerating up.
آلة أتوود: التسارع|Atwood machine: acceleration|a = (m₂ − m₁) g / (m₁ + m₂)|a|(m2-m1)*g/(m1+m2)|m1 m2 g|كتلتان على بكرة.|Two masses over a pulley.
آلة أتوود: الشد|Atwood machine: tension|T = 2 m₁ m₂ g / (m₁ + m₂)|Ft|2*m1*m2*g/(m1+m2)|m1 m2 g|الشد في الحبل.|Tension in the string.
جسم يسحب آخر على سطح أملس|Hanging mass pulling a cart|a = m₂ g / (m₁ + m₂)|a|m2*g/(m1+m2)|m1 m2 g|عربة على طاولة وكتلة معلّقة.|Cart on a table pulled by a hanging mass.
قوة السحب في الهواء|Air drag|F_D = ½ ρ v² C_D A|Fd|0.5*rho*v*v*Cd*Ar|rho v Cd Ar|تزيد مع مربع السرعة.|Grows with the square of speed.
السرعة الحدية|Terminal velocity|v_t = √(2 m g / (ρ A C_D))|vt|sqrt(2*m*g/(rho*Ar*Cd))|m g rho Ar Cd|عندما تتساوى مقاومة الهواء مع الوزن.|When drag balances weight.
قانون ستوكس|Stokes’ law|F = 6 π η r v|Fd|6*PI*etav*r*v|etav r v|مقاومة كرة صغيرة تتحرك ببطء في مائع.|Drag on a small slow sphere.
الاتزان الانتقالي|Translational equilibrium|ΣF = 0||||الجسم ساكن أو يتحرك بسرعة ثابتة.|The body is at rest or moves at constant velocity.
قانون نيوتن الأول|Newton’s first law|ΣF = 0 ⇒ v = const||||الجسم يحافظ على حالته ما لم تؤثر قوة.|A body keeps its state unless a force acts.
الدفع والقوة|Impulse–momentum (force form)|F = Δp / Δt|F|p/dt|p dt|القوة معدل تغير الزخم.|Force is the rate of change of momentum.
قوة الضغط|Force from pressure|F = P A|F|Pr*Ar|Pr Ar|الضغط × المساحة.|Pressure times area.
قانون الجذب العام|Newton’s law of gravitation|F = G m₁ m₂ / r²|Fg|G*m1*m2/(r*r)|G m1 m2 r|كل كتلتين تتجاذبان.|Any two masses attract.|orbit
قوة على جسم في مجال جاذبية|Force in a gravitational field|F = m g|Fg|m*g|m g|الوزن كقوة مجال.|Weight as a field force.
الاحتكاك والتسارع|Deceleration by friction|a = μ g|a|mu*g|mu g|جسم ينزلق على سطح أفقي.|A body sliding on level ground.
`);

EQ.add('enr',`
الشغل|Work|W = F d cos θ|W|F*d*cos(rad(th))|F d th|القوة × الإزاحة في اتجاهها.|Force times displacement along it.
الشغل بقوة موازية|Work by a parallel force|W = F d|W|F*d|F d|عندما تكون القوة باتجاه الحركة.|Force along the motion.
طاقة الحركة|Kinetic energy|Eₖ = ½ m v²|Ek|0.5*m*v*v|m v|طاقة الجسم بسبب حركته.|Energy due to motion.
السرعة من طاقة الحركة|Speed from kinetic energy|v = √(2Eₖ / m)|v|sqrt(2*Ek/m)|Ek m|عكس قانون طاقة الحركة.|Inverting the kinetic-energy formula.
طاقة الوضع الجاذبية|Gravitational potential energy|Eₚ = m g h|Ep|m*g*h|m g h|طاقة الجسم بسبب ارتفاعه.|Energy due to height.
طاقة النابض|Elastic potential energy|Eₛ = ½ k x²|Es|0.5*k*xd*xd|k xd|طاقة مخزّنة في نابض مشدود.|Stored in a stretched spring.
مبرهنة الشغل والطاقة|Work–energy theorem|W = ΔEₖ = ½m(v² − v₀²)|W|0.5*m*(vf*vf-v0*v0)|m vf v0|الشغل الكلي يغيّر طاقة الحركة.|Net work changes kinetic energy.
الطاقة الميكانيكية|Mechanical energy|E = Eₖ + Eₚ|Emech|Ek+Ep|Ek Ep|مجموع طاقة الحركة والوضع.|Sum of kinetic and potential.
حفظ الطاقة|Conservation of energy|½mv₁² + mgh₁ = ½mv₂² + mgh₂|vf|sqrt(v0*v0+2*g*h)|v0 g h|السرعة بعد هبوط ارتفاع h بدون احتكاك.|Speed after dropping h without friction.
القدرة|Power|P = W / t|P|W/t|W t|معدل بذل الشغل.|Rate of doing work.
القدرة بالقوة والسرعة|Power from force and speed|P = F v|P|F*v|F v|مثل محرك سيارة يدفعها بسرعة ثابتة.|Like an engine pushing a car steadily.
الكفاءة|Efficiency|η = W_out / W_in × 100%|eta|Wout/Win*100|Wout Win|كم من الطاقة الداخلة صار مفيدًا.|Useful share of the input energy.
الطاقة المفقودة بالاحتكاك|Energy lost to friction|W_f = μ m g d|Wf|mu*m*g*d|mu m g d|تتحول لحرارة.|Turned into heat.
الطاقة الكلية مع الاحتكاك|Energy with friction|E₁ = E₂ + W_f|Emech|Ek+Ep+Wf|Ek Ep Wf|الطاقة محفوظة إذا حسبنا الحرارة.|Energy is conserved when heat is counted.
الشغل المبذول ضد الجاذبية|Work against gravity|W = m g h|W|m*g*h|m g h|رفع جسم بسرعة ثابتة.|Lifting a body at steady speed.
شغل النابض|Work done on a spring|W = ½ k (x₂² − x₁²)|W|0.5*k*(xB*xB-xA*xA)|k xA xB|من استطالة إلى أخرى.|From one stretch to another.
القدرة المتوسطة|Average power|P̄ = ΔE / Δt|Pavg|dE/dt|dE dt|التغير في الطاقة على الزمن.|Energy change over time.
الطاقة بالكيلوواط ساعة|Energy in kilowatt-hours|E (kWh) = P (kW) × t (h)|E|P*t|P t|وحدة فاتورة الكهرباء.|The unit on electricity bills.|circuit
طاقة الوضع والسرعة عند القاع|Speed at the bottom of a swing|v = √(2 g L(1 − cos θ))|v|sqrt(2*g*Lp*(1-cos(rad(th))))|g Lp th|بندول يبدأ من زاوية θ.|Pendulum released from angle θ.|pendulum
ارتفاع النابض للقذف|Spring launch height|h = k x² / (2 m g)|h|k*xd*xd/(2*m*g)|k xd m g|كل طاقة النابض تصير طاقة وضع.|All spring energy becomes height.
الزخم وطاقة الحركة|Kinetic energy from momentum|Eₖ = p² / (2m)|Ek|p*p/(2*m)|p m|علاقة مفيدة في التصادمات.|Handy in collisions.
الطاقة اللازمة للتسلق|Energy to climb|E = m g h / η|E|m*g*h/(eta/100)|m g h eta|مع كفاءة الجسم أو المحرك.|Including efficiency.
القدرة الحصانية|Horsepower|1 hp = 745.7 W|P|nn*745.7|nn|تحويل الحصان الميكانيكي إلى واط.|Converting horsepower to watts.
شغل قوة متغيرة|Work of a variable force|W = ∫ F dx||||المساحة تحت منحنى القوة-الإزاحة.|Area under the force–displacement graph.
طاقة الوضع الجاذبية العامة|General gravitational PE|U = −G M m / r|Ug|-G*Mp*m/rr|G Mp m rr|صفر في اللانهاية.|Zero at infinity.|orbit
أقصى ضغط للنابض|Maximum spring compression|x = v √(m / k)|xd|v*sqrt(m/k)|v m k|جسم يصطدم بنابض.|A body hitting a spring.
`);

EQ.add('mom',`
الزخم الخطي|Linear momentum|p = m v|p|m*v|m v|كمية الحركة.|Quantity of motion.
الدفع|Impulse|J = F Δt|J|F*dt|F dt|القوة × زمن تأثيرها.|Force times contact time.
مبرهنة الدفع والزخم|Impulse–momentum theorem|J = Δp = m(v − v₀)|J|m*(vf-v0)|m vf v0|الدفع يغيّر الزخم.|Impulse changes momentum.
حفظ الزخم|Conservation of momentum|m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′||||المجموع ثابت إذا لا توجد قوى خارجية.|Constant with no external forces.
تصادم عديم المرونة|Perfectly inelastic collision|v = (m₁u₁ + m₂u₂) / (m₁ + m₂)|vf|(m1*u1+m2*u2)/(m1+m2)|m1 m2 u1 u2|الجسمان يلتصقان ويتحركان معًا.|Bodies stick together.
تصادم مرن: سرعة الأول|Elastic collision: body 1|v₁ = ((m₁ − m₂)u₁ + 2m₂u₂)/(m₁ + m₂)|v1|((m1-m2)*u1+2*m2*u2)/(m1+m2)|m1 m2 u1 u2|طاقة الحركة محفوظة.|Kinetic energy conserved.
تصادم مرن: سرعة الثاني|Elastic collision: body 2|v₂ = ((m₂ − m₁)u₂ + 2m₁u₁)/(m₁ + m₂)|v2|((m2-m1)*u2+2*m1*u1)/(m1+m2)|m1 m2 u1 u2|بعد التصادم.|After the collision.
معامل الارتداد|Coefficient of restitution|e = (v₂ − v₁) / (u₁ − u₂)|e|(v2-v1)/(u1-u2)|v1 v2 u1 u2|1 مرن تمامًا، 0 عديم المرونة.|1 elastic, 0 perfectly inelastic.
ارتفاع ارتداد الكرة|Bounce height|h′ = e² h|h|e*e*H|e H|ارتفاع الكرة بعد ارتدادة واحدة.|Height after one bounce.
الطاقة المفقودة في التصادم اللاصق|KE lost in a sticking collision|ΔE = m₁m₂(u₁ − u₂)² / (2(m₁ + m₂))|dE|m1*m2*pow(u1-u2,2)/(2*(m1+m2))|m1 m2 u1 u2|تتحول لحرارة وصوت وتشوّه.|Becomes heat, sound and deformation.
الارتداد (البندقية)|Recoil velocity|v₂ = −m₁v₁ / m₂|v2|-m1*v1/m2|m1 v1 m2|الزخم الكلي يبقى صفرًا.|Total momentum stays zero.
مركز الكتلة لجسمين|Centre of mass (two bodies)|x_cm = (m₁x₁ + m₂x₂)/(m₁ + m₂)|xcm|(m1*xA+m2*xB)/(m1+m2)|m1 xA m2 xB|نقطة توازن النظام.|Balance point of the system.
سرعة مركز الكتلة|Velocity of the centre of mass|v_cm = (m₁v₁ + m₂v₂)/(m₁ + m₂)|v|(m1*v1+m2*v2)/(m1+m2)|m1 v1 m2 v2|لا تتغير بدون قوى خارجية.|Unchanged without external forces.
معادلة الصاروخ (تسيولكوفسكي)|Rocket equation (Tsiolkovsky)|Δv = v_e ln(m₀ / m_f)|dv|vexh*log(m0/mF)|vexh m0 mF|التغير في سرعة الصاروخ.|Change in a rocket’s speed.|orbit
قوة دفع الصاروخ|Rocket thrust|F = ṁ v_e|F|mdot*vexh|mdot vexh|معدل الكتلة × سرعة الغازات.|Mass flow times exhaust speed.|orbit
القوة المتوسطة في التصادم|Average collision force|F = m Δv / Δt|F|m*dv/dt|m dv dt|زمن تصادم أطول = قوة أقل (الوسائد الهوائية).|Longer impact time means less force (airbags).
الزخم في بعدين|Momentum magnitude in 2D|p = √(pₓ² + p_y²)|p|sqrt(pi*pi+pf*pf)|pi pf|مجموع المركبات.|From the components.
التغير في الزخم|Change in momentum|Δp = p_f − pᵢ|p|pf-pi|pf pi|الفرق بين النهائي والابتدائي.|Final minus initial.
بندول قذفي|Ballistic pendulum|v = ((m + M)/m) √(2 g h)|v|((m1+m2)/m1)*sqrt(2*g*h)|m1 m2 g h|قياس سرعة رصاصة.|Measuring a projectile’s speed.|pendulum
تصادم بجسم ساكن (مرن)|Elastic hit on a resting body|v₂ = 2m₁u₁/(m₁ + m₂)|v2|2*m1*u1/(m1+m2)|m1 u1 m2|الجسم الثاني يبدأ ساكنًا.|Second body initially at rest.
`);

EQ.add('rot',`
الإزاحة الزاوية|Angular displacement|θ = s / r|phi|arc/r|arc r|بالراديان.|In radians.
السرعة الزاوية المتوسطة|Average angular velocity|ω = Δθ / Δt|w|phi/dt|phi dt|معدل تغير الزاوية.|Rate of change of angle.
التسارع الزاوي|Angular acceleration|α = Δω / Δt|alpha|(w-w0)/dt|w w0 dt|معدل تغير السرعة الزاوية.|Rate of change of angular velocity.
الحركة الدورانية: المعادلة الأولى|Rotational kinematics 1|ω = ω₀ + α t|w|w0+alpha*t|w0 alpha t|تماثل v = v₀ + at.|Mirrors v = v₀ + at.
الحركة الدورانية: المعادلة الثانية|Rotational kinematics 2|θ = ω₀t + ½αt²|phi|w0*t+0.5*alpha*t*t|w0 alpha t|الزاوية المقطوعة.|Angle turned.
الحركة الدورانية: المعادلة الثالثة|Rotational kinematics 3|ω² = ω₀² + 2αθ|w|sqrt(w0*w0+2*alpha*phi)|w0 alpha phi|بدون زمن.|Without time.
السرعة المماسية|Tangential speed|v = r ω|vtan|r*w|r w|سرعة نقطة على الحافة.|Speed of a point on the rim.
التسارع المماسي|Tangential acceleration|a_t = r α|atan_|r*alpha|r alpha|يغيّر مقدار السرعة.|Changes the speed.
التحويل من rpm|From rpm to rad/s|ω = 2π · rpm / 60|w|2*PI*rpm/60|rpm|دورات في الدقيقة إلى راديان/ثانية.|Revolutions per minute to rad/s.
العزم|Torque|τ = r F sin θ|tau|r*F*sin(rad(th))|r F th|قدرة القوة على التدوير.|Turning effect of a force.
العزم بذراع عمودي|Torque with a perpendicular arm|τ = F d|tau|F*lever|F lever|القوة × ذراعها.|Force times lever arm.
قانون نيوتن للدوران|Newton’s second law for rotation|τ = I α|tau|Ir*alpha|Ir alpha|العزم يسبب تسارعًا زاويًا.|Torque produces angular acceleration.
عزم قصور جسيم نقطي|Moment of inertia of a point mass|I = m r²|Ir|m*r*r|m r|يعتمد على بعد الكتلة عن المحور.|Depends on distance from the axis.
عزم قصور حلقة رقيقة|Thin ring (hoop)|I = M R²|Ir|m*r*r|m r|كل الكتلة على الحافة.|All mass at the rim.
عزم قصور قرص مصمت|Solid disc|I = ½ M R²|Ir|0.5*m*r*r|m r|حول محوره.|About its axis.
عزم قصور كرة مصمتة|Solid sphere|I = ⅖ M R²|Ir|0.4*m*r*r|m r|حول قطرها.|About a diameter.
عزم قصور كرة مجوفة|Hollow sphere|I = ⅔ M R²|Ir|(2/3)*m*r*r|m r|قشرة رقيقة.|Thin shell.
عزم قصور قضيب حول مركزه|Rod about its centre|I = (1/12) M L²|Ir|m*len*len/12|m len|قضيب رفيع.|Thin rod.
عزم قصور قضيب حول طرفه|Rod about one end|I = ⅓ M L²|Ir|m*len*len/3|m len|أصعب في التدوير من المركز.|Harder to spin than about the centre.
عزم قصور أسطوانة مجوفة|Thick hollow cylinder|I = ½ M (R₁² + R₂²)|Ir|0.5*m*(xA*xA+xB*xB)|m xA xB|بنصفي قطر داخلي وخارجي.|Inner and outer radii.
مبرهنة المحاور المتوازية|Parallel-axis theorem|I = I_cm + M d²|Ir|Icm+m*dpar*dpar|Icm m dpar|نقل المحور بعيدًا عن المركز.|Shifting the axis from the centre.
طاقة الحركة الدورانية|Rotational kinetic energy|E = ½ I ω²|Ek_r|0.5*Ir*w*w|Ir w|طاقة الجسم الدوّار.|Energy of a spinning body.
طاقة جسم يتدحرج|Rolling kinetic energy|E = ½mv² + ½Iω²|Ek|0.5*m*v*v+0.5*Ir*pow(v/r,2)|m v Ir r|انتقال + دوران.|Translation plus rotation.
سرعة كرة تتدحرج أسفل منحدر|Rolling sphere down a slope|v = √(10 g h / 7)|v|sqrt(10*g*h/7)|g h|أبطأ من الانزلاق بدون احتكاك.|Slower than frictionless sliding.
سرعة أسطوانة تتدحرج|Rolling cylinder down a slope|v = √(4 g h / 3)|v|sqrt(4*g*h/3)|g h|قرص مصمت يتدحرج.|A solid disc rolling.
الزخم الزاوي|Angular momentum|L = I ω|L|Ir*w|Ir w|كمية الحركة الدورانية.|Rotational momentum.
الزخم الزاوي لجسيم|Angular momentum of a particle|L = m v r|L|m*v*r|m v r|جسيم يدور حول نقطة.|A particle circling a point.
حفظ الزخم الزاوي|Conservation of angular momentum|I₁ω₁ = I₂ω₂|w|Icm*w0/Ir|Icm w0 Ir|المتزلجة تدور أسرع عندما تضم ذراعيها.|A skater spins faster arms-in.
القدرة الدورانية|Rotational power|P = τ ω|Pr2|tau*w|tau w|مثل عزم المحرك × سرعته.|Engine torque times speed.
شغل العزم|Work done by torque|W = τ θ|W|tau*phi|tau phi|العزم × الزاوية.|Torque times angle.
الاتزان الدوراني|Rotational equilibrium|Στ = 0||||مجموع العزوم صفر، مثل الميزان.|Torques balance, like a see-saw.
الرافعة|Lever law|F₁ d₁ = F₂ d₂|F2|F1*xA/xB|F1 xA xB|ذراع أطول = قوة أقل.|Longer arm needs less force.
الزخم الزاوي والعزم|Torque and angular momentum|τ = ΔL / Δt|tau|L/dt|L dt|العزم يغيّر الزخم الزاوي.|Torque changes angular momentum.
البدارية (المبادرة)|Gyroscope precession|Ω = m g r / (I ω)|w|m*g*r/(Ir*wosc)|m g r Ir wosc|دوران محور الجيروسكوب ببطء.|Slow turning of a spinning top’s axis.
نصف قطر الدوران|Radius of gyration|k = √(I / M)|r|sqrt(Ir/m)|Ir m|بعد الكتلة المكافئ.|Equivalent mass distance.
تسارع بكرة ذات كتلة|Pulley with mass|a = m g / (m + I/R²)|a|m*g/(m+Ir/(r*r))|m g Ir r|جسم معلّق على بكرة لها عزم قصور.|Hanging mass on a massive pulley.
`);

EQ.add('grv',`
قانون الجذب العام|Universal gravitation|F = G m₁ m₂ / r²|Fg|G*m1*m2/(r*r)|G m1 m2 r|قوة تتناقص مع مربع المسافة.|Falls off with distance squared.
شدة مجال الجاذبية|Gravitational field strength|g = G M / r²|gfield|G*Mp/(rr*rr)|G Mp rr|تسارع السقوط قرب الكوكب.|Free-fall acceleration near a planet.
الجاذبية على ارتفاع|Gravity at altitude|g = G M / (R + h)²|gfield|G*Mp/pow(Rp+hAlt,2)|G Mp Rp hAlt|تقل كلما ارتفعنا.|Weaker higher up.
جهد الجاذبية|Gravitational potential|V = −G M / r|Vg|-G*Mp/rr|G Mp rr|طاقة لكل كيلوغرام.|Energy per kilogram.
طاقة الوضع الجاذبية (العامة)|Gravitational potential energy (general)|U = −G M m / r|Ug|-G*Mp*m/rr|G Mp m rr|سالبة لأن الجسم مرتبط.|Negative because the body is bound.
السرعة المدارية|Orbital speed|v = √(G M / r)|vorb|sqrt(G*Mp/rr)|G Mp rr|سرعة مدار دائري.|Speed of a circular orbit.
سرعة الإفلات|Escape velocity|v = √(2 G M / R)|ve|sqrt(2*G*Mp/Rp)|G Mp Rp|أقل سرعة للهروب من الجاذبية.|Minimum speed to escape gravity.
الزمن الدوري للمدار|Orbital period|T = 2π √(r³ / (G M))|Tp|2*PI*sqrt(pow(rr,3)/(G*Mp))|rr G Mp|قانون كبلر الثالث بصيغة نيوتن.|Kepler’s third law (Newton’s form).
قانون كبلر الثالث|Kepler’s third law|T² ∝ a³|Tp|sqrt(pow(aSemi/1.496e11,3))*3.156e7|aSemi|بالسنوات للكواكب حول الشمس.|Planets around the Sun.
قانون كبلر الأول|Kepler’s first law|مدار إهليلجي والشمس في البؤرة||||مدارات الكواكب قطوع ناقصة.|Planetary orbits are ellipses.
قانون كبلر الثاني|Kepler’s second law|dA/dt = const||||الكوكب يمسح مساحات متساوية في أزمنة متساوية.|Equal areas in equal times.
طاقة المدار الكلية|Total orbital energy|E = −G M m / (2r)|E|-G*Mp*m/(2*rr)|G Mp m rr|نصف طاقة الوضع.|Half the potential energy.
مدار الأقمار الثابتة|Geostationary orbit radius|r = ∛(G M T² / 4π²)|rr|cbrt(G*Mp*Tp*Tp/(4*PI*PI))|G Mp Tp|زمن دوري 86164 ثانية يعطي ≈ 42,164 km.|With T = 86164 s, about 42,164 km.
تسارع الجاذبية على السطح|Surface gravity|g = G M / R²|gE|G*Mp/(Rp*Rp)|G Mp Rp|للأرض ≈ 9.8 m/s².|About 9.8 m/s² for Earth.
كثافة كوكب من g|Planet density from g|ρ = 3g / (4π G R)|rho|3*gE/(4*PI*G*Rp)|gE G Rp|متوسط كثافة الكوكب.|Mean density of the planet.
الوزن على كوكب آخر|Weight on another planet|W = m g_planet|Wt|m*gE|m gE|كتلتك ثابتة ووزنك يتغير.|Your mass stays, your weight changes.
قوة المد|Tidal acceleration|Δa ≈ 2 G M d / r³|a|2*G*Mp*len/pow(rr,3)|G Mp len rr|فرق الجذب بين طرفي جسم.|Difference in pull across a body.
نصف قطر شفارتزشيلد|Schwarzschild radius|r_s = 2 G M / c²|rr|2*G*Mp/(cl*cl)|G Mp cl|حجم الثقب الأسود لكتلة M.|Size of a black hole of mass M.
نقطة لاغرانج L1 (تقريب)|Lagrange point L1 (approx.)|r ≈ R ∛(m / 3M)|r|rr*cbrt(m1/(3*Mp))|rr m1 Mp|نقطة توازن بين جسمين.|Balance point between two bodies.
السرعة عند الحضيض (حفظ الطاقة)|Vis-viva equation|v² = G M (2/r − 1/a)|vorb|sqrt(G*Mp*(2/rr-1/aSemi))|G Mp rr aSemi|السرعة في أي نقطة من المدار.|Speed anywhere on an orbit.
الزمن الدوري لقمر صناعي منخفض|Low-orbit satellite period|T = 2π (R + h) / v|Tp|2*PI*(Rp+hAlt)/vorb|Rp hAlt vorb|محيط المدار ÷ السرعة.|Orbit circumference over speed.
حد روش (تقريب)|Roche limit (approx.)|d ≈ 2.44 R (ρ_M / ρ_m)^(1/3)|rr|2.44*Rp*cbrt(rhof/rhoo)|Rp rhof rhoo|أقرب مسافة قبل أن يتفكك القمر.|Closest approach before a moon breaks up.
`);

EQ.add('osc',`
الإزاحة في الحركة التوافقية|SHM displacement|x = A cos(ωt + φ)|xd|A*cos(wosc*t+ph0)|A wosc t ph0|حركة ذهاب وإياب منتظمة.|Regular back-and-forth motion.
السرعة في الحركة التوافقية|SHM velocity|v = −Aω sin(ωt + φ)|v|-A*wosc*sin(wosc*t+ph0)|A wosc t ph0|أقصاها عند موضع الاتزان.|Maximum at equilibrium.
التسارع في الحركة التوافقية|SHM acceleration|a = −ω² x|a|-wosc*wosc*xd|wosc xd|يتجه دائمًا نحو الاتزان.|Always toward equilibrium.
أقصى سرعة|Maximum speed|v_max = A ω|v|A*wosc|A wosc|عند المرور بموضع الاتزان.|Passing equilibrium.
أقصى تسارع|Maximum acceleration|a_max = A ω²|a|A*wosc*wosc|A wosc|عند الطرفين.|At the extremes.
السرعة عند موضع ما|Speed at a displacement|v = ω √(A² − x²)|v|wosc*sqrt(A*A-xd*xd)|wosc A xd|بدون زمن.|Without time.
الزمن الدوري لنابض|Mass–spring period|T = 2π √(m / k)|Tp|2*PI*sqrt(m/k)|m k|كتلة أكبر = اهتزاز أبطأ.|Heavier mass, slower oscillation.
تردد نابض|Mass–spring frequency|f = (1/2π) √(k / m)|f|sqrt(k/m)/(2*PI)|k m|عدد الاهتزازات في الثانية.|Oscillations per second.
التردد الزاوي لنابض|Mass–spring angular frequency|ω = √(k / m)|wosc|sqrt(k/m)|k m|يحدد سرعة الاهتزاز.|Sets how fast it oscillates.
البندول البسيط|Simple pendulum period|T = 2π √(L / g)|Tp|2*PI*sqrt(Lp/g)|Lp g|لا يعتمد على الكتلة.|Independent of mass.
طول البندول من الزمن الدوري|Pendulum length from period|L = g T² / (4π²)|Lp|g*Tp*Tp/(4*PI*PI)|g Tp|بندول الثانية ≈ 0.994 m.|A seconds pendulum ≈ 0.994 m.
قياس g بالبندول|Measuring g with a pendulum|g = 4π² L / T²|g|4*PI*PI*Lp/(Tp*Tp)|Lp Tp|تجربة مدرسية مشهورة.|A classic school experiment.
البندول الفيزيائي|Physical pendulum|T = 2π √(I / (m g d))|Tp|2*PI*sqrt(Ir/(m*g*dpar))|Ir m g dpar|جسم صلب يتأرجح.|A swinging rigid body.
البندول الالتوائي|Torsion pendulum|T = 2π √(I / κ)|Tp|2*PI*sqrt(Ir/k)|Ir k|مثل ميزان الساعة.|Like a watch balance wheel.
طاقة المهتز التوافقي|Energy of a harmonic oscillator|E = ½ k A²|E|0.5*k*A*A|k A|ثابتة بدون احتكاك.|Constant without friction.
التردد والزمن الدوري|Frequency and period|f = 1 / T|f|1/Tp|Tp|علاقة عكسية.|Inverse relation.
نابضان على التوالي|Springs in series|1/k = 1/k₁ + 1/k₂|k|1/(1/ks1+1/ks2)|ks1 ks2|النظام أطرى.|The system is softer.
نابضان على التوازي|Springs in parallel|k = k₁ + k₂|k|ks1+ks2|ks1 ks2|النظام أصلب.|The system is stiffer.
التخميد|Damped amplitude|A(t) = A₀ e^(−bt/2m)|A|A*exp(-bdamp*t/(2*m))|A bdamp t m|السعة تقل تدريجيًا.|Amplitude decays over time.
التردد المخمَّد|Damped angular frequency|ω′ = √(k/m − (b/2m)²)|wosc|sqrt(k/m-pow(bdamp/(2*m),2))|k m bdamp|أبطأ قليلًا من غير المخمَّد.|Slightly slower than undamped.
معامل الجودة|Quality factor|Q = ω₀ m / b|Qf|wosc*m/bdamp|wosc m bdamp|كلما زاد استمر الرنين أطول.|Higher Q rings longer.
الرنين|Resonance|f_drive = f₀||||أكبر سعة عندما يطابق التردد الطبيعي.|Largest amplitude at the natural frequency.
الاستطالة الساكنة للنابض|Static spring stretch|x = m g / k|xd|m*g/k|m g k|كتلة معلّقة ساكنة.|A mass hanging at rest.
الزمن الدوري من الاستطالة|Period from static stretch|T = 2π √(x / g)|Tp|2*PI*sqrt(xd/g)|xd g|طريقة سريعة لقياس T.|A quick way to find T.
البندول على كوكب آخر|Pendulum on another planet|T₂ = T₁ √(g₁ / g₂)|Tp|Tp*sqrt(9.8/g)|Tp g|على القمر يتأرجح أبطأ.|Slower on the Moon.
السائل في أنبوب U|Liquid in a U-tube|T = 2π √(L / 2g)|Tp|2*PI*sqrt(Lp/(2*g))|Lp g|L طول عمود السائل.|L is the liquid column length.
`);

EQ.add('fld',`
الكثافة|Density|ρ = m / V|rho|m/V|m V|الكتلة في وحدة الحجم.|Mass per unit volume.
الضغط|Pressure|P = F / A|Pr|F/Ar|F Ar|القوة على وحدة المساحة.|Force per unit area.
ضغط السائل|Hydrostatic pressure|P = ρ g h|dP|rho*g*hd|rho g hd|يزيد مع العمق.|Increases with depth.
الضغط المطلق|Absolute pressure|P = P₀ + ρ g h|Pr|P0+rho*g*hd|P0 rho g hd|الضغط الجوي + ضغط السائل.|Atmosphere plus liquid.
مبدأ باسكال|Pascal’s principle|F₁/A₁ = F₂/A₂|F2h|F1h*A2/A1|F1h A1 A2|الرافعة الهيدروليكية تضخّم القوة.|Hydraulic lifts multiply force.
مبدأ أرخميدس|Archimedes’ principle|F_b = ρ_f g V_sub|Fb|rhof*g*Vsub|rhof g Vsub|قوة الطفو = وزن السائل المزاح.|Buoyancy equals the weight of displaced fluid.
نسبة الجزء المغمور|Fraction submerged|V_sub/V = ρ_o / ρ_f|res|rhoo/rhof|rhoo rhof|الثلج يطفو و≈90% منه تحت الماء.|Ice floats about 90% under water.
الوزن الظاهري في السائل|Apparent weight in a fluid|W′ = W − F_b|Wt|m*g-rhof*g*Vsub|m g rhof Vsub|يبدو الجسم أخف في الماء.|Objects feel lighter in water.
معادلة الاستمرارية|Continuity equation|A₁v₁ = A₂v₂|vA2|A1*vA1/A2|A1 vA1 A2|الأنبوب الأضيق = سرعة أكبر.|Narrower pipe, faster flow.
معدل التدفق|Volume flow rate|Q = A v|Q|Ar*vflow|Ar vflow|حجم السائل في الثانية.|Volume per second.
معادلة برنولي|Bernoulli’s equation|P + ½ρv² + ρgh = const||||حفظ الطاقة للموائع.|Energy conservation for fluids.
فرق الضغط لبرنولي|Bernoulli pressure drop|P₁ − P₂ = ½ρ(v₂² − v₁²)|dP|0.5*rho*(vA2*vA2-vA1*vA1)|rho vA1 vA2|سر رفع جناح الطائرة.|Behind aircraft lift.
مبرهنة توريشيلي|Torricelli’s theorem|v = √(2 g h)|v|sqrt(2*g*hd)|g hd|سرعة خروج الماء من ثقب.|Speed of water leaving a hole.
قانون بوازوي|Poiseuille’s law|Q = π r⁴ ΔP / (8 η L)|Q|PI*pow(rpipe,4)*dP/(8*etav*lpipe)|rpipe dP etav lpipe|تدفق لزج في أنبوب.|Viscous flow in a pipe.
عدد رينولدز|Reynolds number|Re = ρ v D / η|Re|rho*vflow*Dpipe/etav|rho vflow Dpipe etav|أقل من 2000 انسيابي، أكبر من 4000 مضطرب.|Below 2000 laminar, above 4000 turbulent.
ضغط ديناميكي|Dynamic pressure|q = ½ ρ v²|dP|0.5*rho*v*v|rho v|ضغط الحركة.|Pressure of motion.
الضغط بالأمتار|Pressure head|h = P / (ρ g)|hd|Pr/(rho*g)|Pr rho g|ارتفاع عمود السائل المكافئ.|Equivalent liquid column height.
قوة الضغط على سد|Force on a dam wall|F = ½ ρ g w h²|F|0.5*rho*g*len*hd*hd|rho g len hd|الضغط يزيد مع العمق.|Pressure grows with depth.
التوتر السطحي|Surface tension|γ = F / L|gam2|F/len|F len|قوة على طول السطح.|Force per length of surface.
الصعود الشعري (جورين)|Capillary rise (Jurin)|h = 2γ cos θ / (ρ g r)|hd|2*gam2*cos(rad(th))/(rho*g*rpipe)|gam2 th rho g rpipe|الماء يصعد في الأنابيب الرفيعة.|Water climbs thin tubes.
ضغط داخل فقاعة|Pressure inside a bubble|ΔP = 4γ / r|dP|4*gam2/rpipe|gam2 rpipe|فقاعة صابون لها سطحان.|A soap bubble has two surfaces.
ضغط داخل قطرة|Pressure inside a droplet|ΔP = 2γ / r|dP|2*gam2/rpipe|gam2 rpipe|سطح واحد.|One surface.
البارومتر الزئبقي|Mercury barometer|P = ρ_Hg g h|Pr|13534*g*hd|g hd|760 mm زئبق = ضغط جوي واحد.|760 mm of mercury is one atmosphere.
الكثافة النسبية|Relative density|SG = ρ / ρ_water|res|rho/1000|rho|أكبر من 1 يغرق في الماء.|Above 1 sinks in water.
القدرة الهيدروليكية|Hydraulic power|P = Q ΔP|P|Q*dP|Q dP|قدرة المضخة.|Pump power.
السرعة الحدية في سائل (ستوكس)|Terminal speed in a fluid (Stokes)|v = 2r²(ρ_o − ρ_f)g / (9η)|vt|2*rpipe*rpipe*(rhoo-rhof)*g/(9*etav)|rpipe rhoo rhof g etav|كرة صغيرة تهبط في سائل.|A small sphere sinking.
قوة الرفع للجناح|Lift force|L = ½ ρ v² C_L A|F|0.5*rho*v*v*Cd*Ar|rho v Cd Ar|C_L معامل الرفع.|C_L is the lift coefficient.
أنبوب فنتوري|Venturi meter|v₁ = A₁ √(2ΔP / (ρ(A₂² − A₁²)))|vA1|A1*sqrt(2*dP/(rho*(A2*A2-A1*A1)))|A1 dP rho A2|قياس سرعة التدفق.|Measuring flow speed.
`);
