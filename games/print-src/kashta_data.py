"""Content of «الكشتة المجنونة» — Crazy Kashta (paid PDF game, 30 SAR). Original text by Eilan Doll.
Arabic is gender-neutral: verbal nouns (تقليد، وصف…), group plurals, and unvowelled forms that read for anyone.
Each card: (title_ar, text_ar, title_en, text_en[, answer_ar, answer_en]).  Title may be "" (no title line).
"""

CATS = {
    # key: (name_ar, name_en, points, back bg, back fg, accent, icon)
    "fire":  ("تحدّي النار", "Fire Challenge", 2, "#2F5A3D", "#F6F1E3", "#E0B454", "fire"),
    "talk":  ("سالفة", "Campfire Talk", 1, "#7FAA8A", "#14150F", "#1F3A2B", "talk"),
    "riddle": ("لغز البر", "Desert Riddle", 2, "#14150F", "#E0B454", "#E0B454", "riddle"),
    "group": ("جولة جماعية", "Group Round", 3, "#E0B454", "#14150F", "#1F3A2B", "team"),
    "wild":  ("جوكر", "Joker", 0, "#0E0E0A", "#EBDDB0", "#4A2682", "star"),
}

FIRE = [
    ("", "تقليد صوت جمل زعلان لمدة ٥ ثوانٍ، والمجموعة تعطي درجة من ١٠.",
     "", "Do an angry camel's voice for 5 seconds. The group scores it out of 10."),
    ("", "وصف الطريق من البيت إلى مكان الكشتة بدون كلمة «يمين» ولا «يسار».",
     "", "Describe the road from home to this camp without saying \"left\" or \"right\"."),
    ("", "قول «الشاي جاهز!» بثلاث طرق: مذيع أخبار، معلّق مباراة، وشاعر.",
     "", "Say \"Tea's ready!\" three ways: news anchor, football commentator, and poet."),
    ("", "الوقوف على رجل وحدة والعيون مغمّضة لمدة ٢٠ ثانية — بعيد عن النار.",
     "", "Stand on one leg with eyes closed for 20 seconds — away from the fire."),
    ("", "ارتجال بيتين شعر عن الحطب، والمجموعة تحكم: ينفع ولا ما ينفع؟",
     "", "Make up two lines of poetry about firewood. The group decides: pass or fail?"),
    ("", "تمثيل مشهد «السيارة غرّزت في الرمل» بدون كلام، والمجموعة تخمّن خلال ٣٠ ثانية.",
     "", "Act out \"the car is stuck in the sand\" with no words. The group has 30 seconds to guess."),
    ("", "ذكر ٥ أشياء لونها أصفر في المكان خلال ١٠ ثوانٍ.",
     "", "Name 5 yellow things around the camp in 10 seconds."),
    ("", "٣٠ ثانية بوجه جاد بدون ضحك، والمجموعة تحاول تضحّك بأي طريقة — بدون لمس.",
     "", "Keep a straight face for 30 seconds while the group tries to make you laugh — no touching."),
    ("", "إعلان مدته ٢٠ ثانية لبيع «حبة رمل نادرة جدًا» للمجموعة.",
     "", "A 20-second advert selling \"one very rare grain of sand\" to the group."),
    ("", "العدّ من ٢٠ إلى ١ بسرعة، مع تصفيقة عند كل رقم زوجي.",
     "", "Count down from 20 to 1, fast, with a clap on every even number."),
    ("", "مشية جمل يمشي على رمل حار — ٥ خطوات بعيد عن النار، والمجموعة تقيّم.",
     "", "Walk like a camel on hot sand — 5 steps, away from the fire. The group rates it."),
    ("", "ترتيب المجموعة كلها حسب الطول بدون ولا كلمة خلال ٣٠ ثانية.",
     "", "Line the whole group up by height in 30 seconds without a single word."),
]

TALK = [
    ("", "وش أحلى ذكرى عندك من طلعة بر؟", "", "What's your best memory from a trip to the desert?"),
    ("", "لو جاتك فرصة تخييم في أي مكان في العالم، وين بيكون؟", "", "If you could camp anywhere in the world, where would it be?"),
    ("", "وش الأكلة اللي ما تكتمل الكشتة بدونها؟", "", "Which food makes a kashta complete?"),
    ("", "لو ضعت في البر ومعك ٣ أغراض بس، وش تكون؟", "", "Lost in the desert with only 3 things — what are they?"),
    ("", "وش أغرب موقف صار لك في طلعة؟", "", "What's the strangest thing that happened to you on a trip?"),
    ("", "مين في المجموعة يصلح «قائد الكشتة»؟ وليش؟", "", "Who here would make the best \"camp leader\" — and why?"),
    ("", "وش أكثر شي تعلمته هالسنة وصار مصدر فخر لك؟", "", "What did you learn this year that makes you proud?"),
    ("", "لو نجمة بتنسمّى باسم من اختيارك، وش يكون اسمها؟", "", "If a star were named by you, what would its name be?"),
    ("", "وصف الكشتة هذي بثلاث كلمات بس.", "", "Describe this kashta in exactly three words."),
    ("", "وش موهبة عندك محد يعرف عنها؟", "", "What's a talent of yours that nobody knows about?"),
    ("", "لو الليلة هذي فيلم، وش يكون اسمه؟", "", "If tonight were a film, what would it be called?"),
    ("", "كلمة شكر لشخص موجود هنا… على وش؟", "", "A thank-you to someone here — what for?"),
]

RIDDLE = [
    ("", "أطلع كل ليلة بدون ما أحد يناديني، وأختفي بالنهار وأنا في مكاني. من أنا؟",
     "", "I come out every night without being called, and vanish by day without moving. What am I?",
     "النجوم", "The stars"),
    ("", "آكل وما أشبع، وإذا شربت الماي أموت. من أنا؟",
     "", "I eat and eat and never get full, but if I drink water I die. What am I?",
     "النار", "Fire"),
    ("", "لي رقبة وما لي راس، وأشيل الماي للناس. من أنا؟",
     "", "I have a neck but no head, and I carry water for everyone. What am I?",
     "القارورة (الزجاجة)", "A bottle"),
    ("", "أطير بلا جناحين، وأدمّع العيون بلا حزن. من أنا؟",
     "", "I fly with no wings and bring tears with no sadness. What am I?",
     "الدخان", "Smoke"),
    ("", "كل ما أخذتوا مني، كبرت أكثر. من أنا؟",
     "", "The more you take from me, the bigger I get. What am I?",
     "الحفرة", "A hole"),
    ("", "أمشي بلا رجول، وأبكي بلا عيون. من أنا؟",
     "", "I travel without legs and cry without eyes. What am I?",
     "السحاب (الغيم)", "A cloud"),
    ("", "عند النار أتبعكم وين ما رحتوا، ولا أحد يقدر يمسكني. من أنا؟",
     "", "By the fire I follow you everywhere, yet no one can ever catch me. What am I?",
     "الظل", "Your shadow"),
    ("", "كم مرة ينطرح الرقم ٥ من ٢٥؟",
     "", "How many times can you subtract 5 from 25?",
     "مرة وحدة بس — بعدها يصير الطرح من ٢٠", "Only once — after that you're subtracting from 20"),
    ("", "عائلة عندها ٤ بنات، وكل بنت لها أخ واحد. كم عدد العيال كلهم؟",
     "", "A family has 4 daughters, and each daughter has one brother. How many children are there?",
     "٥: أربع بنات وأخوهم الواحد", "5: four daughters and their one brother"),
    ("", "إذا انقال اسمي… انكسرت. من أنا؟",
     "", "Say my name and I break. What am I?",
     "الصمت (السكوت)", "Silence"),
    ("", "ثلاث أخوات ما يفترقن، شايلات القدر فوق النار وما يشتكن. من هن؟",
     "", "Three sisters who never part, holding the pot over the fire without a complaint. Who are they?",
     "الأثافي: حجار القدر الثلاث", "The three hearth stones under the pot"),
    ("", "لي أسنان كثيرة، بس عمري ما عضّيت أحد. من أنا؟",
     "", "I have lots of teeth, but I've never bitten anyone. What am I?",
     "المشط (والمنشار ينحسب بعد!)", "A comb (a saw counts too!)"),
]

GROUP = [
    ("سلسلة البر", "كلمة لها علاقة بالبر، والكلمة اللي بعدها تبدأ بآخر حرف منها. السكوت ٥ ثوانٍ = خروج. آخر من يبقى يفوز.",
     "Desert chain", "Say a desert word; the next word must start with its last letter. 5 seconds of silence = out. Last one in wins."),
    ("ممنوع «لا»", "دقيقتين أسئلة سريعة بين الكل، وكلمة «لا» تعني الخروج. آخر من يبقى يفوز.",
     "The \"No\" ban", "Two minutes of quick-fire questions. Saying \"no\" means you're out. Last one in wins."),
    ("قصة الخيمة", "بالدور، جملة جملة، تكمل المجموعة قصة تبدأ بـ: «في ليلة باردة سمعنا صوت غريب ورا الخيمة…». أحلى جملة تفوز.",
     "Tent tale", "One sentence each, continue the story: \"On a cold night we heard a strange sound behind the tent…\" The best sentence wins."),
    ("الصمت الذهبي", "من هذي اللحظة ممنوع الكلام. آخر من يبقى ساكت يفوز.",
     "Golden silence", "From this moment, no talking. The last one to stay silent wins."),
    ("خمّن الصوت", "عيون مغمّضة لواحد من المجموعة، والبقية يطلعون صوت من أغراض الكشتة: دلّة، كيس، حطب… ٣ تخمينات صح = فوز.",
     "Guess the sound", "One person closes their eyes; the others make sounds with camp things: coffee pot, bag, firewood… 3 right guesses wins."),
    ("أسرع جمع", "فريقين: كل فريق يجمع ٥ أشياء بخمس ألوان مختلفة من المخيم خلال دقيقة — بعيد عن النار.",
     "Speed hunt", "Two teams: collect 5 things in 5 different colours from the camp in one minute — away from the fire."),
    ("السبعة الممنوعة", "عدّ بالدور من ١. أي رقم فيه ٧ أو يقبل القسمة على ٧ ينقال بدله «كشتة!». الغلط = خروج.",
     "Forbidden seven", "Count in turns from 1. Any number with a 7 in it, or divisible by 7, is replaced by \"Kashta!\". A mistake = out."),
    ("مين قالها؟", "بالدور، همسة للمقدّم بمعلومة غريبة ومحد يعرفها. المقدّم يقولها بصوت، والكل يخمّن صاحبها. أكثر تخمينات صح تفوز.",
     "Who said it?", "In turns, whisper an unknown fun fact about yourself to the host. The host reads them out and everyone guesses who. Most right guesses wins."),
    ("ذاكرة الكشتة", "المقدّم يعدّد ١٠ أغراض بسرعة، والكل يحاول يعيدها بالترتيب. أطول قائمة صحيحة تفوز.",
     "Camp memory", "The host lists 10 items fast; everyone tries to repeat them in order. The longest correct list wins."),
    ("تمثيل صامت", "فريقين: تمثيل أكلات البر بدون كلام (كبسة، مندي، فطاير…). أكثر تخمينات خلال دقيقتين تفوز.",
     "Silent acting", "Two teams act out desert dishes without words (kabsa, mandi, pastries…). Most guesses in 2 minutes wins."),
    ("بطولة حجرة ورقة مقص", "خروج المغلوب، مواجهة بعد مواجهة، حتى يتبقى شخص واحد.",
     "Rock-paper-scissors cup", "Knockout rounds, match after match, until one person is left."),
    ("همس الكشتة", "جملة طويلة تنهمس من شخص للي جنبه حتى آخر واحد. لو وصلت صح: ٣ نقاط للكل!",
     "Campfire whisper", "Whisper a long sentence from person to person to the end. If it arrives right: 3 points for everyone!"),
]

WILD = [
    ("حارس الدلّة", "هذي البطاقة تعطي حق اختيار مين يصب القهوة في الجولة الجاية.",
     "Keeper of the pot", "This card lets you choose who pours the coffee next round."),
    ("دبّل!", "البطاقة الجاية بنقاط مضاعفة ×٢.",
     "Double!", "Your next card is worth double points ×2."),
    ("الهدنة", "إعفاء من أي بطاقة بدون خسارة نقاط. تنحفظ لوقت الحاجة.",
     "Truce", "Skip any one card without losing points. Keep it until you need it."),
    ("مرّرها", "سحب بطاقة ثانية وإعطاؤها لأي أحد في المجموعة ينفّذها.",
     "Pass it on", "Draw another card and hand it to anyone in the group to play."),
]


def deck():
    """52 numbered cards: 1–48 cycle fire → talk → riddle → group (so any first 3 show three kinds), 49–52 jokers."""
    out = []
    for i in range(12):
        for key, lst in (("fire", FIRE), ("talk", TALK), ("riddle", RIDDLE), ("group", GROUP)):
            out.append((key, lst[i]))
    out += [("wild", c) for c in WILD]
    return out


RULES = {
    "ar": ["من ٣ أشخاص وفوق — أفراد أو فرق، ولكل الأعمار.",
           "فرزوا البطاقات ٥ أكوام حسب لون القفا.",
           "بالدور: اختيار كومة، سحب بطاقة، وقراءتها بصوت عالي.",
           "النقاط على كل بطاقة: سالفة ١ · تحدّي ٢ · لغز ٢ · جولة ٣.",
           "الفوز: أول من يوصل ٢٠ نقطة، أو الأعلى نقاط لما يخلص الشاي."],
    "en": ["3 or more players — solo or in teams, all ages.",
           "Sort the cards into 5 piles by the colour of the back.",
           "Take turns: pick a pile, draw a card, read it out loud.",
           "Points are on every card: Talk 1 · Challenge 2 · Riddle 2 · Round 3.",
           "Win: first to 20 points, or the highest score when the tea runs out."],
}
HOWTO = {  # what each kind means
    "fire": ("التنفيذ على من سحب البطاقة، والمجموعة تحكم: نجح؟ تنحسب نقطتين.", "Do it; the group judges. Pass = 2 points."),
    "talk": ("جواب صادق = نقطة. ما فيه جواب غلط.", "An honest answer = 1 point. There's no wrong answer."),
    "riddle": ("المقدّم يقرأ اللغز (الحل مقلوب تحت)، وأول جواب صح = نقطتين.", "The host reads it; the first right answer gets 2 points."),
    "group": ("الكل يلعب، والفوز = ٣ نقاط.", "Everyone plays; the winner gets 3 points."),
    "wild": ("بطاقة قوة: تنحفظ أو تنستخدم فورًا.", "A power card: keep it or use it now."),
}
SAFETY = {
    "ar": "السلامة أول: أي حركة تكون بعيد عن النار ٥ خطوات على الأقل، وأي بطاقة غير مريحة تنترك بدون خسارة نقاط. «المقدّم» = أي أحد من المجموعة يقرأ البطاقة.",
    "en": "Safety first: any moving around happens at least 5 steps from the fire, and any card that feels uncomfortable can be skipped with no penalty. \"Host\" = whoever reads the card.",
}

STORE = {
    "ar": ("الكشتة المجنونة — لعبة بطاقات للطلعات والكشتات حول النار",
           "٥٢ بطاقة أصلية في ٥ أنواع: تحدّيات النار، سوالف، ألغاز البر، جولات جماعية، وجوكر. "
           "تنلعب من ٣ أشخاص وفوق، أفراد أو فرق. فيها نسخة للشاشة (iPad والكمبيوتر) بفهرس تقدرون تضغطون عليه، "
           "ونسخة طباعة وجه وقفا جاهزة للمطبعة. عربي وإنجليزي. أول ٣ بطاقات مجانًا تجربونها قبل الشراء."),
    "en": ("Crazy Kashta — a card game for desert trips and campfire nights",
           "52 original cards in 5 kinds: fire challenges, campfire talk, desert riddles, group rounds and jokers. "
           "For 3 or more players, solo or in teams. Includes a screen version (iPad & computer) with a tappable index, "
           "and a print-ready double-sided version. Arabic and English. Try the first 3 cards free before you buy."),
}
PRICE = {"ar": "٣٠ ريال", "en": "30 SAR"}
