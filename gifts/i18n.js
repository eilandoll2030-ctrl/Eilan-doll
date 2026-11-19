/* هدايا إيلان الحيّة — اللغات الثماني
   ar العربية · en English · zh 中文 · ja 日本語 · ko 한국어 · tr Türkçe · es Español · it Italiano */
(function(){
'use strict';
const LANGS=[['ar','العربية'],['en','English'],['zh','中文'],['ja','日本語'],['ko','한국어'],['tr','Türkçe'],['es','Español'],['it','Italiano']];
const ORDER=LANGS.map(l=>l[0]);
// each row follows ORDER: ar, en, zh, ja, ko, tr, es, it
const row=a=>Object.fromEntries(ORDER.map((k,i)=>[k,a[i]]));

/* ---- the word each shape is made of ---- */
const WORDS={
 love:row(['أحبك','I love you','我爱你','愛してる','사랑해','Seni seviyorum','Te quiero','Ti amo']),
 forYou:row(['لأجلك','For you','送给你','あなたへ','너를 위해','Senin için','Para ti','Per te']),
 thanks:row(['شكراً','Thank you','谢谢','ありがとう','고마워','Teşekkürler','Gracias','Grazie']),
 ramadan:row(['رمضان كريم','Ramadan Kareem','斋月快乐','ラマダン','라마단','Hayırlı Ramazanlar','Ramadán Kareem','Ramadan Kareem']),
 eid:row(['عيد مبارك','Eid Mubarak','节日快乐','イード・ムバラク','이드 무바라크','İyi bayramlar','Feliz Eid','Buon Eid']),
 bday:row(['سنة حلوة','Happy Birthday','生日快乐','誕生日おめでとう','생일 축하해','İyi ki doğdun','Feliz cumpleaños','Buon compleanno']),
 congrats:row(['مبروك','Congrats','恭喜','おめでとう','축하해','Tebrikler','Felicidades','Congratulazioni']),
 xmas:row(['ميلاد مجيد','Merry Christmas','圣诞快乐','メリークリスマス','메리 크리스마스','Mutlu Noeller','Feliz Navidad','Buon Natale']),
 mom:row(['أمي','Mom','妈妈','お母さん','엄마','Anneciğim','Mamá','Mamma']),
 friends:row(['صداقة','Friendship','友谊','友情','우정','Dostluk','Amistad','Amicizia']),
 world:row(['عالمي','My world','我的世界','私の世界','나의 세상','Dünyam','Mi mundo','Il mio mondo']),
 joy:row(['فرحة','Joy','快乐','喜び','기쁨','Neşe','Alegría','Gioia']),
 surprise:row(['مفاجأة','Surprise','惊喜','サプライズ','서프라이즈','Sürpriz','Sorpresa','Sorpresa']),
 sunshine:row(['شمسي','Sunshine','阳光','太陽','햇살','Güneşim','Mi sol','Mio sole']),
 hope:row(['أمل','Hope','希望','希望','희망','Umut','Esperanza','Speranza']),
 morning:row(['صباح الخير','Good morning','早安','おはよう','좋은 아침','Günaydın','Buenos días','Buongiorno']),
 forever:row(['للأبد','Forever','永远','永遠に','영원히','Sonsuza dek','Para siempre','Per sempre']),
 treasure:row(['تاج راسي','My treasure','宝贝','宝物','보물','Hazinem','Mi tesoro','Tesoro mio']),
 shine:row(['تألّق','Shine','闪耀','輝いて','빛나','Parla','Brilla','Brilla']),
 star:row(['✦','✦','✦','✦','✦','✦','✦','✦']),
 wish:row(['تمنّ أمنية','Make a wish','许个愿','願いごとを','소원 빌어','Dilek tut','Pide un deseo','Esprimi un desiderio'])
};

/* ---- shape names ---- */
const NAMES={
 orbit:row(['مدار الكلمات','Orbit of Words','文字轨道','言葉の軌道','단어의 궤도','Kelimelerin Yörüngesi','Órbita de palabras','Orbita di parole']),
 lily:row(['زنبقة لأجلك','A Lily for You','送你的百合','あなたへのユリ','너를 위한 백합','Sana Bir Zambak','Un lirio para ti','Un giglio per te']),
 seashell:row(['صدفة من البحر','Ocean Keepsake','Ocean Keepsake','Ocean Keepsake','Ocean Keepsake','Ocean Keepsake','Ocean Keepsake','Ocean Keepsake']),
 rainbow:row(['قوس الأمنيات','Wish Rainbow','Wish Rainbow','Wish Rainbow','Wish Rainbow','Wish Rainbow','Wish Rainbow','Wish Rainbow']),
 heart3d:row(['قلب ثلاثي الأبعاد','3D Spinning Heart','3D 旋转爱心','回転する3Dハート','회전하는 3D 하트','Dönen 3B Kalp','Corazón 3D giratorio','Cuore 3D rotante']),
 stringheart:row(['قلب الخيوط','String-Art Heart','丝线爱心','糸のハート','실로 그린 하트','İp Sanatı Kalp','Corazón de hilos','Cuore di fili']),
 tree3d:row(['شجرة الكريسمس ثلاثية الأبعاد','3D Christmas Tree','3D 圣诞树','3Dクリスマスツリー','3D 크리스마스 트리','3B Noel Ağacı','Árbol de Navidad 3D','Albero di Natale 3D']),
 betta:row(['سمكة البيتا الحيّة','Living Betta Fish','灵动斗鱼','泳ぐベタ','살아있는 베타 물고기','Canlı Beta Balığı','Pez betta vivo','Pesce betta vivo']),
 letter:row(['رسالة تتحوّل وردة','Letter to Rose','信变玫瑰','バラになる手紙','장미가 되는 편지','Güle Dönüşen Mektup','Carta que se vuelve rosa','Lettera che diventa rosa']),
 candle:row(['شمعة الأمنية','Wish Candle','许愿蜡烛','願いのキャンドル','소원 촛불','Dilek Mumu','Vela de los deseos','Candela dei desideri']),
 fireworks:row(['ألعاب نارية باسمك','Fireworks with Your Name','烟花写名字','名前の花火','이름 불꽃놀이','Adınla Havai Fişek','Fuegos artificiales con tu nombre','Fuochi d’artificio col tuo nome']),
 heart:row(['قلب الكلمات','Heart of Words','文字之心','言葉のハート','글자 하트','Kelimelerden Kalp','Corazón de palabras','Cuore di parole']),
 roses:row(['باقة الورد','Rose Bouquet','玫瑰花束','バラの花束','장미 꽃다발','Gül Buketi','Ramo de rosas','Mazzo di rose']),
 palm:row(['نخلة الشكر','Palm of Thanks','感恩棕榈','感謝のヤシの木','감사의 야자수','Teşekkür Palmiyesi','Palmera de gracias','Palma del grazie']),
 lantern:row(['فانوس رمضان','Ramadan Lantern','斋月灯笼','ラマダンのランタン','라마단 등불','Ramazan Feneri','Farol de Ramadán','Lanterna del Ramadan']),
 crescent:row(['هلال العيد','Eid Crescent','节日新月','イードの三日月','이드 초승달','Bayram Hilali','Luna de Eid','Mezzaluna di Eid']),
 name:row(['اسمك بالنجوم','Your Name in Stars','星光写名','星で描く名前','별로 쓴 이름','Yıldızlarla Adın','Tu nombre en estrellas','Il tuo nome tra le stelle']),
 cake:row(['كيكة الميلاد','Birthday Cake','生日蛋糕','バースデーケーキ','생일 케이크','Doğum Günü Pastası','Pastel de cumpleaños','Torta di compleanno']),
 grad:row(['قبعة التخرج','Graduation Cap','毕业帽','卒業帽','졸업모','Mezuniyet Kepi','Birrete de graduación','Tocco di laurea']),
 xmas:row(['شجرة الكريسمس','Christmas Tree','圣诞树','クリスマスツリー','크리스마스 트리','Noel Ağacı','Árbol de Navidad','Albero di Natale']),
 mom:row(['زهور يوم الأم','Mother\'s Day Tulips','母亲节郁金香','母の日のチューリップ','어머니날 튤립','Anneler Günü Laleleri','Tulipanes para mamá','Tulipani per la mamma']),
 friends:row(['قلبين الصداقة','Friendship Hearts','友谊双心','友情のハート','우정 하트','Dostluk Kalpleri','Corazones de amistad','Cuori dell\'amicizia']),
 planet:row(['كوكبي','My Planet','我的星球','私の惑星','나의 행성','Gezegenim','Mi planeta','Il mio pianeta']),
 balloons:row(['بالونات الفرح','Joy Balloons','欢乐气球','よろこびの風船','기쁨 풍선','Neşe Balonları','Globos de alegría','Palloncini di gioia']),
 giftbox:row(['صندوق المفاجأة','Surprise Box','惊喜礼盒','サプライズボックス','서프라이즈 상자','Sürpriz Kutusu','Caja sorpresa','Scatola a sorpresa']),
 sunflower:row(['دوّار الشمس','Sunflower','向日葵','ひまわり','해바라기','Ayçiçeği','Girasol','Girasole']),
 butterfly:row(['فراشة الأمل','Butterfly of Hope','希望蝴蝶','希望の蝶','희망 나비','Umut Kelebeği','Mariposa de esperanza','Farfalla della speranza']),
 coffee:row(['فنجان الصباح','Morning Coffee','早安咖啡','朝のコーヒー','아침 커피','Sabah Kahvesi','Café de la mañana','Caffè del mattino']),
 ring:row(['خاتم للأبد','Forever Ring','永恒之戒','永遠の指輪','영원의 반지','Sonsuzluk Yüzüğü','Anillo eterno','Anello per sempre']),
 crown:row(['تاج راسي','Crown','王冠','王冠','왕관','Taç','Corona','Corona']),
 star:row(['نجمة التألق','Shining Star','闪耀之星','輝く星','빛나는 별','Parlayan Yıldız','Estrella brillante','Stella splendente'])
};

/* ---- occasions ---- */
const OCC={
 love:row(['حب','Love','爱情','恋人','사랑','Aşk','Amor','Amore']),
 wedding:row(['زواج','Wedding','婚礼','結婚','결혼','Düğün','Boda','Matrimonio']),
 anniversary:row(['ذكرى','Anniversary','纪念日','記念日','기념일','Yıl dönümü','Aniversario','Anniversario']),
 thanks:row(['شكر','Thanks','感谢','感謝','감사','Teşekkür','Gracias','Grazie']),
 teacher:row(['معلّم','Teacher','老师','先生','선생님','Öğretmen','Maestro','Insegnante']),
 parents:row(['والدين','Parents','父母','両親','부모님','Anne baba','Padres','Genitori']),
 ramadan:row(['رمضان','Ramadan','斋月','ラマダン','라마단','Ramazan','Ramadán','Ramadan']),
 eid:row(['العيد','Eid','开斋节','イード','이드','Bayram','Eid','Eid']),
 birthday:row(['عيد ميلاد','Birthday','生日','誕生日','생일','Doğum günü','Cumpleaños','Compleanno']),
 newborn:row(['مولود','Newborn','新生儿','出産祝い','출산','Yeni bebek','Recién nacido','Neonato']),
 graduation:row(['تخرج','Graduation','毕业','卒業','졸업','Mezuniyet','Graduación','Laurea']),
 success:row(['نجاح','Success','成功','成功','성공','Başarı','Éxito','Successo']),
 christmas:row(['كريسمس','Christmas','圣诞节','クリスマス','크리스마스','Noel','Navidad','Natale']),
 newyear:row(['سنة جديدة','New Year','新年','新年','새해','Yılbaşı','Año nuevo','Capodanno']),
 mothersday:row(['يوم الأم','Mother\'s Day','母亲节','母の日','어머니날','Anneler Günü','Día de la madre','Festa della mamma']),
 friendship:row(['يوم الأصدقاء','Friendship Day','友谊日','友情の日','우정의 날','Dostluk Günü','Día de la amistad','Giornata dell\'amicizia']),
 engagement:row(['خطوبة','Engagement','订婚','婚約','약혼','Nişan','Compromiso','Fidanzamento']),
 morning:row(['صباح','Morning','早晨','朝','아침','Sabah','Mañana','Mattina']),
 surprise:row(['مفاجأة','Surprise','惊喜','サプライズ','서프라이즈','Sürpriz','Sorpresa','Sorpresa']),
 anyday:row(['أي يوم','Any day','任何日子','いつでも','언제든','Her gün','Cualquier día','Ogni giorno'])
};

/* ---- ready phrases: 2 per language, in ORDER ---- */
function phrases(group,lang){const g=RAW[group]||RAW.general,i=ORDER.indexOf(lang);return i<0?g.slice(0,2):g.slice(i*2,i*2+2);}
const RAW={
 love:['وجودك أحلى شي صار لي','كل كلمة هنا تقول لك شي واحد','You are my favorite person','Every word here says one thing','有你真好','这里的每个字都在说爱你','あなたがいてくれて幸せ','ここの言葉はぜんぶ「好き」','네가 있어서 행복해','여기 모든 글자가 너를 말해','İyi ki varsın','Buradaki her kelime seni anlatıyor','Eres lo mejor que me ha pasado','Cada palabra aquí dice lo mismo','Sei la cosa più bella che ho','Ogni parola qui dice una cosa sola'],
 thanks:['شكراً على كل شي','أثرك جميل وما ينسى','Thank you for everything','Your kindness means a lot','谢谢你所做的一切','你的好我都记得','いつも本当にありがとう','あなたのおかげです','모든 게 고마워','네 덕분이야','Her şey için teşekkürler','İyiliğin hiç unutulmaz','Gracias por todo','Tu cariño vale muchísimo','Grazie di tutto','La tua gentilezza vale tanto'],
 ramadan:['رمضان كريم وكل عام وأنتم بخير','الله يبلغنا وإياكم الشهر','Ramadan Kareem to you and yours','Wishing you a blessed month','祝你斋月吉祥','愿你这个月平安喜乐','ラマダン・カリーム','穏やかなひと月になりますように','라마단 카림','축복 가득한 한 달 되길','Hayırlı Ramazanlar','Bereketli bir ay dilerim','Ramadán Kareem','Te deseo un mes lleno de paz','Ramadan Kareem','Ti auguro un mese sereno'],
 eid:['عيدكم مبارك وعساكم من عوّاده','كل عام وأنتم بخير','Eid Mubarak!','Wishing you joy this Eid','节日快乐，阖家幸福','祝你开斋节快乐','イード・ムバラク！','すてきなイードを','이드 무바라크!','행복한 명절 보내','Bayramınız mübarek olsun','Nice mutlu bayramlara','¡Eid Mubarak!','Feliz Eid para ti y los tuyos','Eid Mubarak!','Buon Eid a te e ai tuoi'],
 newborn:['أهلاً بك في الدنيا','نوّرت حياتنا','Welcome to the world','You lit up our lives','欢迎来到这个世界','你照亮了我们的生活','ようこそ、この世界へ','生まれてきてくれてありがとう','세상에 온 걸 환영해','우리 삶을 밝혀줘서 고마워','Dünyaya hoş geldin','Hayatımızı aydınlattın','Bienvenido al mundo','Iluminas nuestra vida','Benvenuto al mondo','Hai illuminato la nostra vita'],
 birthday:['كل عام وأنت بخير','عسى سنتك الجاية أحلى','Happy birthday!','May this year be your best','生日快乐！','愿新的一岁更美好','お誕生日おめでとう！','最高の一年になりますように','생일 축하해!','올해는 더 행복하길','İyi ki doğdun!','Yeni yaşın en güzeli olsun','¡Feliz cumpleaños!','Que este año sea el mejor','Buon compleanno!','Che sia il tuo anno migliore'],
 grad:['مبروك التخرج والقادم أجمل','تعبك ما راح','Congratulations, graduate!','The best is yet to come','毕业快乐！','未来更精彩','卒業おめでとう！','これからがもっと楽しみ','졸업 축하해!','앞으로가 더 기대돼','Mezuniyetin kutlu olsun!','En güzeli daha gelecek','¡Felicidades por tu graduación!','Lo mejor está por venir','Congratulazioni per la laurea!','Il meglio deve ancora venire'],
 xmas:['ميلاد مجيد وسنة سعيدة','أطيب الأمنيات لك','Merry Christmas!','Warm wishes for the holidays','圣诞快乐！','愿你温暖又幸福','メリークリスマス！','あたたかい冬を','메리 크리스마스!','따뜻한 연말 보내','Mutlu Noeller!','Sıcacık bir yılbaşı dilerim','¡Feliz Navidad!','Mis mejores deseos para ti','Buon Natale!','I miei auguri più belli'],
 mom:['أمي، أنتِ أغلى ما عندي','كل يوم هو يومك يا أمي','Mom, you mean the world to me','Every day is your day','妈妈，我爱你','每一天都是你的节日','お母さん、いつもありがとう','毎日が母の日','엄마, 사랑해요','매일이 엄마의 날이에요','Anneciğim, seni çok seviyorum','Her gün senin günün','Mamá, eres mi todo','Cada día es tu día','Mamma, sei tutto per me','Ogni giorno è la tua festa'],
 friends:['صحبتك كنز','الأصدقاء عائلة نختارها','Friends like you are rare','Friends are the family we choose','有你这个朋友真好','朋友是自己选的家人','あなたは最高の友達','友達は選べる家族','너 같은 친구는 드물어','친구는 우리가 고른 가족','Senin gibi dost bulunmaz','Dostlar seçtiğimiz ailedir','Amigos como tú hay pocos','La amistad es la familia que elegimos','Amici come te sono rari','Gli amici sono la famiglia che scegliamo'],
 morning:['صباحك ورد وقهوة','يومك سعيد','Good morning, sunshine','Have a lovely day','早安，阳光','祝你今天愉快','おはよう、今日もいい日に','すてきな一日を','좋은 아침이야','오늘도 좋은 하루','Günaydın güneşim','Güzel bir gün geçir','Buenos días, mi sol','Que tengas un día precioso','Buongiorno, raggio di sole','Buona giornata'],
 engagement:['مبروك الخطوبة وبالرفاه والبنين','للأبد معك','Congratulations on your engagement','Forever starts today','恭喜订婚','永远从今天开始','婚約おめでとう','永遠は今日から','약혼 축하해','영원은 오늘부터','Nişanınız kutlu olsun','Sonsuzluk bugün başlıyor','Felicidades por el compromiso','El para siempre empieza hoy','Congratulazioni per il fidanzamento','Il per sempre inizia oggi'],
 general:['هدية صغيرة لشخص كبير','تستاهل كل شي حلو','A little gift for someone special','You deserve all the good things','一份小礼物，送给特别的你','你值得一切美好','特別なあなたに小さな贈り物','いいことがたくさんありますように','특별한 너에게 작은 선물','좋은 일만 가득하길','Özel birine küçük bir hediye','Her güzel şeyi hak ediyorsun','Un pequeño regalo para alguien especial','Mereces todo lo bonito','Un piccolo regalo per una persona speciale','Meriti tutte le cose belle']
};

/* ---- interface text ---- */
const UI={
 title:row(['هدايا إيلان الحيّة','Eilan Living Gifts','Eilan 动态礼物','Eilan 動くギフト','Eilan 살아있는 선물','Eilan Canlı Hediyeler','Regalos vivos de Eilan','Regali animati di Eilan']),
 lead:row(['هدية رقمية متحركة: كلمة أو رمز يتطاير ويتجمّع لين يصير شكل يلمع، وبعدها تظهر رسالتك. صمّمها هنا وأرسلها برابط أو باركود.','An animated digital gift: a word or symbol flies in and gathers into a glowing shape, then your message appears. Design it here and send it as a link or QR code.','动态数字礼物：文字或符号飞来聚成闪亮的图案，然后出现你的留言。在这里设计，用链接或二维码发送。','動くデジタルギフト：言葉や記号が集まって光る形になり、最後にメッセージが現れます。ここで作って、リンクかQRコードで送れます。','움직이는 디지털 선물: 글자나 기호가 모여 빛나는 모양이 되고, 마지막에 메시지가 나타나요. 여기서 만들고 링크나 QR 코드로 보내세요.','Hareketli dijital hediye: bir kelime ya da sembol uçuşup parlayan bir şekle dönüşür, ardından mesajın görünür. Burada tasarla, bağlantı veya QR kodla gönder.','Un regalo digital animado: una palabra o símbolo vuela y forma una figura brillante, y luego aparece tu mensaje. Diséñalo aquí y envíalo con un enlace o código QR.','Un regalo digitale animato: una parola o un simbolo vola e forma una figura luminosa, poi appare il tuo messaggio. Crealo qui e invialo con un link o un codice QR.']),
 s1:row(['١ · اختر الشكل','1 · Pick a shape','1 · 选择图案','1 · 形を選ぶ','1 · 모양 고르기','1 · Şekli seç','1 · Elige la figura','1 · Scegli la figura']),
 s2:row(['٢ · اكتب كلمتك ورسالتك','2 · Write your word & message','2 · 写下文字和留言','2 · 言葉とメッセージを書く','2 · 글자와 메시지 쓰기','2 · Kelimeni ve mesajını yaz','2 · Escribe tu palabra y mensaje','2 · Scrivi parola e messaggio']),
 s3:row(['٣ · أرسلها برابط أو باركود','3 · Send by link or QR','3 · 用链接或二维码发送','3 · リンクかQRで送る','3 · 링크나 QR로 보내기','3 · Bağlantı veya QR ile gönder','3 · Envía por enlace o QR','3 · Invia con link o QR']),
 lang:row(['اللغة','Language','语言','言語','언어','Dil','Idioma','Lingua']),
 all:row(['الكل','All','全部','すべて','전체','Tümü','Todos','Tutti']),
 back:row(['كل الهدايا','All gifts','全部礼物','すべてのギフト','모든 선물','Tüm hediyeler','Todos los regalos','Tutti i regali']),
 store:row(['متجر إيلان','Eilan Store','Eilan 商店','Eilan ストア','Eilan 스토어','Eilan Mağaza','Tienda Eilan','Negozio Eilan']),
 fill:row(['الشكل يتكوّن من','The shape is made of','图案组成','形をつくるもの','모양을 이루는 것','Şekil neyden oluşsun','La figura está hecha de','La figura è fatta di']),
 mWord:row(['كلمة','A word','文字','言葉','글자','Kelime','Palabra','Parola']),
 mMix:row(['🌍 كل اللغات','🌍 All languages','🌍 所有语言','🌍 全言語','🌍 모든 언어','🌍 Tüm diller','🌍 Todos los idiomas','🌍 Tutte le lingue']),
 mSym:row(['رمز','A symbol','符号','記号','기호','Sembol','Símbolo','Simbolo']),
 word:row(['الكلمة (قصيرة أحلى)','Your word (short is best)','文字（越短越好看）','言葉（短いほどきれい）','글자 (짧을수록 예뻐요)','Kelimen (kısa olsun)','Tu palabra (mejor corta)','La tua parola (meglio corta)']),
 mixNote:row(['الشكل يتكوّن من الكلمة بثماني لغات مع بعض','The shape mixes the word in eight languages','图案由八种语言的同一个词组成','8つの言語の同じ言葉で形ができます','8개 언어의 같은 단어로 모양이 만들어져요','Şekil kelimenin sekiz dildeki hâlinden oluşur','La figura mezcla la palabra en ocho idiomas','La figura unisce la parola in otto lingue']),
 to:row(['إلى','To','给','宛先','받는 사람','Kime','Para','Per']),
 toName:row(['الاسم اللي ينكتب بالنجوم','The name written in stars','用星星写的名字','星で描く名前','별로 쓸 이름','Yıldızlarla yazılacak isim','El nombre escrito con estrellas','Il nome scritto con le stelle']),
 msg:row(['رسالتك','Your message','你的留言','メッセージ','메시지','Mesajın','Tu mensaje','Il tuo messaggio']),
 ideas:row(['عبارات جاهزة','Ready phrases','现成短语','おすすめの言葉','추천 문구','Hazır cümleler','Frases listas','Frasi pronte']),
 from:row(['من (اختياري)','From (optional)','来自（可选）','差出人（任意）','보내는 사람 (선택)','Kimden (isteğe bağlı)','De (opcional)','Da (facoltativo)']),
 color:row(['اللون','Color','颜色','色','색상','Renk','Color','Colore']),
 orig:row(['الأصلي','Original','原色','オリジナル','기본','Orijinal','Original','Originale']),
 preview:row(['✨ شوف الهدية بعد التعديل','✨ Preview the gift','✨ 预览礼物','✨ プレビュー','✨ 미리 보기','✨ Hediyeyi önizle','✨ Ver el regalo','✨ Anteprima del regalo']),
 copy:row(['🔗 انسخ الرابط','🔗 Copy link','🔗 复制链接','🔗 リンクをコピー','🔗 링크 복사','🔗 Bağlantıyı kopyala','🔗 Copiar enlace','🔗 Copia link']),
 share:row(['📤 أرسلها','📤 Send it','📤 发送','📤 送る','📤 보내기','📤 Gönder','📤 Enviar','📤 Invia']),
 qr:row(['▦ باركود QR','▦ QR code','▦ 二维码','▦ QRコード','▦ QR 코드','▦ QR kod','▦ Código QR','▦ Codice QR']),
 open:row(['🎁 افتحها مثل ما بتوصل','🎁 Open it as they will','🎁 以收礼人视角打开','🎁 受け取る人の画面で開く','🎁 받는 사람 화면으로 열기','🎁 Alıcı gibi aç','🎁 Ábrelo como lo verán','🎁 Aprilo come lo vedranno']),
 note:row(['الرابط والباركود يحملون الهدية كاملة. اضغط على الهدية لإعادتها من البداية.','The link and QR carry the whole gift. Tap the gift to replay it.','链接和二维码包含完整礼物。点击礼物可重播。','リンクとQRにギフトのすべてが入っています。タップでもう一度再生。','링크와 QR에 선물이 모두 담겨 있어요. 누르면 다시 재생돼요.','Bağlantı ve QR hediyenin tamamını taşır. Tekrar izlemek için dokun.','El enlace y el QR llevan el regalo completo. Toca para repetir.','Il link e il QR contengono tutto il regalo. Tocca per rivederlo.']),
 copied:row(['تم نسخ الرابط ✓','Link copied ✓','链接已复制 ✓','コピーしました ✓','복사됐어요 ✓','Kopyalandı ✓','Enlace copiado ✓','Link copiato ✓']),
 scan:row(['امسح الباركود وافتح هديتك','Scan to open your gift','扫码打开你的礼物','スキャンしてギフトを開いてね','스캔해서 선물을 열어보세요','Hediyeni açmak için okut','Escanea para abrir tu regalo','Inquadra per aprire il regalo']),
 save:row(['⬇️ حفظ صورة الباركود','⬇️ Save QR image','⬇️ 保存二维码图片','⬇️ QR画像を保存','⬇️ QR 이미지 저장','⬇️ QR görselini kaydet','⬇️ Guardar imagen QR','⬇️ Salva immagine QR']),
 saveTip:row(['على الآيباد: اضغط مطولاً على الصورة ثم «حفظ الصورة»','On iPad/iPhone: long-press the image, then “Save Image”','在 iPad/iPhone 上：长按图片，然后“存储图像”','iPad/iPhone：画像を長押しして「画像を保存」','iPad/iPhone: 이미지를 길게 누르고 “이미지 저장”','iPad/iPhone: görsele basılı tut, “Görüntüyü Kaydet”','En iPad/iPhone: mantén pulsada la imagen y “Guardar imagen”','Su iPad/iPhone: tieni premuta l’immagine e “Salva immagine”']),
 close:row(['إغلاق','Close','关闭','閉じる','닫기','Kapat','Cerrar','Chiudi']),
 got:row(['وصلتك هدية','You got a gift','你收到一份礼物','ギフトが届きました','선물이 도착했어요','Bir hediyen var','Tienes un regalo','Hai un regalo']),
 tap:row(['اضغط لفتحها','Tap to open','点击打开','タップして開く','눌러서 열기','Açmak için dokun','Toca para abrir','Tocca per aprire']),
 replay:row(['اضغط على الشاشة لإعادة الهدية ✨','Tap the screen to replay ✨','点击屏幕重播 ✨','画面をタップでもう一度 ✨','화면을 눌러 다시 보기 ✨','Tekrar için ekrana dokun ✨','Toca la pantalla para repetir ✨','Tocca lo schermo per rivedere ✨']),
 blow:row(['اضغط على الشاشة لتطفي الشمعة وتتمنّى 🕯️','Tap the screen to blow out the candle and make a wish 🕯️','点击屏幕吹灭蜡烛，许个愿 🕯️','画面をタップしてろうそくを消し、願いごとを 🕯️','화면을 눌러 촛불을 끄고 소원을 빌어요 🕯️','Mumu üflemek ve dilek tutmak için ekrana dokun 🕯️','Toca la pantalla para soplar la vela y pedir un deseo 🕯️','Tocca lo schermo per spegnere la candela ed esprimere un desiderio 🕯️']),
 from_:row(['من','From','来自','より','보낸 사람','Gönderen','De','Da'])
};

function t(key,lang){const r=UI[key];return r?(r[lang]||r.en):key;}
window.EilanI18N={LANGS,ORDER,WORDS,NAMES,OCC,UI,t,phrases,RTL:l=>l==='ar'};
})();
