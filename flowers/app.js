/* ==========================================================================
   دار الورد · app.js — i18n, film scrub, builder, petals, form
   ========================================================================== */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
  const money = (n, lang) => (lang === 'ar'
    ? new Intl.NumberFormat('ar-SA', { maximumFractionDigits: 0 }).format(n) + ' ريال'
    : new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 }).format(n) + ' SAR');
  const arNum = (n) => new Intl.NumberFormat('ar-SA').format(n);

  /* ============================================================ content === */
  const RIBBONS = [
    { id: 'saffron', name: { ar: 'زعفراني', en: 'Saffron' }, hex: '#E0B454' },
    { id: 'blush', name: { ar: 'وردي باهت', en: 'Blush' }, hex: '#E3B7A8' },
    { id: 'forest', name: { ar: 'غامق', en: 'Forest' }, hex: '#2F5E42' },
    { id: 'milk', name: { ar: 'حليبي', en: 'Milk' }, hex: '#EDE3CC' },
    { id: 'plum', name: { ar: 'برقوقي', en: 'Plum' }, hex: '#5B3A73' }
  ];

  const STEMS = [
    { key: 'eucalyptus', price: 2, seasons: ['spring', 'summer', 'autumn', 'winter'], name: { ar: 'أوكالبتوس', en: 'Eucalyptus' } },
    { key: 'grass', price: 1.5, seasons: ['summer', 'autumn', 'winter'], name: { ar: 'عشب الريش', en: 'Feather grass' } },
    { key: 'rose', price: 4.5, seasons: ['spring', 'summer', 'autumn'], name: { ar: 'ورد الحديقة', en: 'Garden rose' } },
    { key: 'anemone', price: 3, seasons: ['spring', 'winter'], name: { ar: 'أنيمون', en: 'Anemone' } },
    { key: 'marigold', price: 2.4, seasons: ['summer', 'autumn'], name: { ar: 'قطيفة', en: 'Marigold' } },
    { key: 'peony', price: 7, seasons: ['spring'], name: { ar: 'بيوني', en: 'Peony' } },
    { key: 'ranunculus', price: 4, seasons: ['spring', 'winter'], name: { ar: 'حوذان', en: 'Ranunculus' } },
    { key: 'foxglove', price: 3.6, seasons: ['summer'], name: { ar: 'قفاز الثعلب', en: 'Foxglove' } },
    { key: 'sweeppea', price: 3.2, seasons: ['spring', 'summer'], name: { ar: 'بازلاء حلوة', en: 'Sweet pea' } }
  ];

  const SEASONS = [
    { id: 'spring', name: { ar: 'الربيع', en: 'Spring' } },
    { id: 'summer', name: { ar: 'الصيف', en: 'Summer' } },
    { id: 'autumn', name: { ar: 'الخريف', en: 'Autumn' } },
    { id: 'winter', name: { ar: 'الشتاء', en: 'Winter' } }
  ];

  const BQ = [
    { id: 'morning', name: { ar: 'باقة الصباح', en: "The morning's bouquet" }, price: 148, tag: { ar: 'الأكثر طلبًا', en: 'Most popular' }, img: 'film-4', cap: 13, desc: { ar: 'اللي وصل الصباح، مربوط باليد بشكل حلزوني.', en: 'Whatever came in that morning, tied by hand in a spiral.' }, cats: ['birthday', 'thanks', 'love', 'just'] },
    { id: 'posy', name: { ar: 'البوسيه', en: 'The posy' }, price: 92, tag: null, img: 'p1', cap: 7, desc: { ar: 'باقة صغيرة لجنبة السرير أو المكتب أو شكرًا.', en: 'A small hand-tied posy for a bedside, a desk or a thank you.' }, cats: ['thanks', 'baby', 'just'] },
    { id: 'peony', name: { ar: 'بيوني وورد', en: 'Peonies and roses' }, price: 176, tag: { ar: 'محدود', en: 'Limited' }, img: 'bucket', cap: 10, desc: { ar: 'بيوني وردي ناعم وورد حديقة، كريمة وممتلئة.', en: 'Soft pink peonies and garden roses, generous and full.' }, cats: ['love', 'birthday', 'baby'] },
    { id: 'meadow', name: { ar: 'المرج', en: 'The meadow' }, price: 132, tag: null, img: 'film-2', cap: 10, desc: { ar: 'عشب ريش وقفازات ثعلب وقطيفة، مفتوحة كالحقل.', en: 'Feather grass, foxgloves and marigolds, loose as a field.' }, cats: ['birthday', 'thanks', 'just'] },
    { id: 'white', name: { ar: 'أبيض وأخضر', en: 'White and green' }, price: 142, tag: null, img: 'sympathy', cap: 10, desc: { ar: 'أبيض هادي وأوراق، للعزاء أو لغرفة تبي الهدوء.', en: 'Quiet whites and foliage, for sympathy or a calm room.' }, cats: ['sympathy', 'baby'] },
    { id: 'grand', name: { ar: 'الباقة الكبيرة', en: 'The grand bouquet' }, price: 265, tag: null, img: 'film-3', cap: 18, desc: { ar: '١٨ ساق من أحسن اللي وصل، للمناسبات الكبيرة.', en: 'Eighteen stems of the best that came in, for the big days.' }, cats: ['love', 'birthday', 'thanks'] }
  ];

  const CATS = [
    { id: 'all', name: { ar: 'الكل', en: 'All' } },
    { id: 'birthday', name: { ar: 'عيد ميلاد', en: 'Birthday' } },
    { id: 'thanks', name: { ar: 'شكر', en: 'Thank you' } },
    { id: 'love', name: { ar: 'حب', en: 'Love' } },
    { id: 'baby', name: { ar: 'مولود', en: 'New baby' } },
    { id: 'sympathy', name: { ar: 'عزاء', en: 'Sympathy' } },
    { id: 'just', name: { ar: 'بدون مناسبة', en: 'Just because' } }
  ];

  const I18N = {
    ar: {
      'brand': 'دار الورد',
      'nav.bouquets': 'الباقات', 'nav.build': 'ركّب باقتك', 'nav.weddings': 'الأعراس',
      'nav.sympathy': 'واجب العزاء', 'nav.shop': 'المحل', 'nav.order': 'اطلب',
      'hero.eyebrow': 'زهور موسمية · الدمام',
      'hero.h1': 'زهور تُجمع <em>باليد</em>.',
      'hero.lead': 'باقات موسمية مربوطة باليد، وزهور أعراس وتقديم واجب. كل باقة تُصنع صباح يومها وتوصل بنفس اليوم.',
      'hero.cta1': 'ركّب باقتك', 'hero.cta2': 'شوف كيف تُصنع',
      'hero.meta1': 'تُصنع صباحًا', 'hero.meta2': 'توصيل نفس اليوم', 'hero.meta3': 'من ٩٢ ريال',
      'cue': 'مرّر',
      'band.1': 'ورد الحديقة', 'band.2': 'أنيمون أبيض', 'band.3': 'قطيفة برتقالية',
      'band.4': 'أوكالبتوس', 'band.5': 'عشب الريش', 'band.6': 'من الموسم',
      'film.h': 'كيف تُصنع الباقة', 'film.hint': 'مرّر لتتقدّم خطوة', 'film.count': 'الباقة',
      's1.k': '٠١ · الجمع', 's1.h': 'ساقًا فوق ساق، بشكل حلزوني.', 's1.p': 'كل ساق تتقاطع مع اللي قبلها عند نفس النقطة، فتنفتح الباقة كالمروحة وتقف على رأسها لحالها.',
      's2.k': '٠٢ · الترشيح', 's2.h': 'نضيف ونشيل، حتى تتوازن.', 's2.p': 'نختار من اللي وصل الصباح فقط: ورد الحديقة، أنيمون، زامبيا، أوكالبتوس وعشب الريش. حطّ إصبعك على أي زهرة تعرف اسمها.',
      's3.k': '٠٣ · اللف والربط', 's3.h': 'ورق، ثم حرير.', 's3.p': 'ورق كرافت ومناديل باهتة، تُلف حول السيقان وتُربط بشريط حرير باليد. اختر لون الشريط.',
      's4.k': '٠٤ · جاهزة', 's4.h': 'جاهزة قبل الساعة ٩.', 's4.p': 'تُقص وتُشرب ماء وتُلفّ في نفس الصباح. تكتب البطاقة ونحطها بين الزهور.',
      's4.cta': 'اطلب هذي الباقة',
      'hs.rose': 'ورد الحديقة', 'hs.zinnia': 'زامبيا', 'hs.anemone': 'أنيمون أبيض', 'hs.eucalyptus': 'أوكالبتوس',
      'bq.eyebrow': 'الباقات', 'bq.h': 'اختر باقة.',
      'bq.note': 'كل باقة تُصنع صباح يومها من اللي وصل المحل، فالمزيج يتغير شوي مع الموسم. الأسعار أمثلة.',
      'bq.order': 'اطلب', 'bq.build': 'خله على ذوقك',
      'build.eyebrow': 'ركّب باقتك', 'build.h': 'اختر السيقان، وشوفها تتجمّع.',
      'build.stage': 'معاينة حيّة', 'build.total': 'الإجمالي', 'build.season': 'الموسم',
      'build.season.note': 'يغيّر المتوفر', 'build.stems': 'السيقان', 'build.ribbon': 'الشريط',
      'build.order': 'اطلب هذي الباقة', 'build.notin': 'ما هو بالموسم', 'build.each': 'للحبة',
      'build.stems.n': 'ساق', 'build.wrap': 'اللف والشريط', 'build.delivery': 'توصيل داخل الدمام',
      'build.note': 'الأسعار أمثلة للعرض.',
      'wed.eyebrow': 'الأعراس', 'wed.h': 'زهور لليوم، وللطاولات بعد.',
      'wed.p': 'باقات وتفاصيل صدرية وتنسيقات منخفضة للطاولات الطويلة، مزروعة ومُختارة للموسم اللي تتزوجون فيه. نبدأ بجلسة ونمشي المكان سوا.',
      'wed.l1': 'الباقة والتفاصيل الصدرية', 'wed.l2': 'الطاولات والمداخل والممر', 'wed.l3': 'تركيب صباح اليوم، وإزالة بعدها',
      'wed.cta': 'تكلم معنا عن يومكم', 'wed.cap': 'طاولة بتنسيقات منخفضة، وشموع بين الزهور.',
      'sym.eyebrow': 'واجب العزاء', 'sym.h': 'شي بسيط، مصنوع بعناية.',
      'sym.p': 'أكاليل وروابط وباقات باللون الأبيض والأخضر، تودي لبيت أو مسجد أو مكتب جنائزي. لو تحب تتكلم فيها، اتصل بالمحل ونساعدك.',
      'sym.cta': 'اطلب زهور العزاء', 'sym.note': 'رقم تجريبي للعرض.',
      'shop.eyebrow': 'المحل', 'shop.h': 'نفتح بدري، على الشارع.',
      'shop.note': 'دلوات من اللي وصل الصباح، وطاولة تنربط عليها الباقات قدامك.',
      'shop.hours': 'الدوام', 'shop.d1': 'الأحد – الخميس', 'shop.d2': 'السبت', 'shop.d3': 'الجمعة', 'shop.closed': 'مغلق',
      'shop.addr': 'شارع الأمير محمد بن فهد، الدمام — عنوان تجريبي للعرض',
      'shop.note2': 'الأوقات والعناوين أمثلة، تُستبدل بأوقات المحل الحقيقية.',
      'order.eyebrow': 'الطلب', 'order.h': 'ابعث ورد.',
      'order.p': 'قل لنا وين ومتى. اطلب قبل الساعة ١١، وتطلع باقة الصباح نفس اليوم.',
      'order.l1': 'تختار الباقة أو تركّب وحدة بنفسك',
      'order.l2': 'نأكد معك بالإيميل أو الواتساب قبل ما نبدأ',
      'order.l3': 'نكتب البطاقة ونحطها بين الزهور',
      'order.l4': 'توصيل باليد داخل الدمام',
      'f.name': 'الاسم', 'f.name.ph': 'اسمك', 'f.phone': 'الجوال', 'f.phone.ph': '05x xxx xxxx',
      'f.bouquet': 'الباقة', 'f.date': 'التاريخ', 'f.addr': 'العنوان', 'f.addr.ph': 'الحي، الشارع، رقم المبنى',
      'f.note': 'البطاقة أو ملاحظة', 'f.note.ph': 'اكتب رسالة البطاقة…',
      'f.terms': 'بالإرسال توافق أن نتواصل معك لتأكيد الطلب. ما نأخذ دفع أونلاين؛ الدفع عند الاستلام أو تحويل.',
      'f.wa': 'ينفتح واتساب برسالة جاهزة ترسلها بنفسك.',
      'f.send': 'أرسل الطلب',
      'f.demo': 'نموذج تجريبي: ما يرسل بياناتك لأي مكان. للحقيقي نربطه بواتساب أو إيميل المحل.',
      'f.today': 'اليوم', 'f.tomorrow': 'بكرة', 'f.builder': 'باقة مركّبة',
      'f.err.name': 'اكتب اسمك أول.', 'f.err.phone': 'الجوال من ٩ إلى ١٤ رقمًا.',
      'f.ok': 'تم. افتح واتساب وأرسل الرسالة الجاهزة، أو خلاص نكلمك على رقمك.',
      'foot.p': 'باقات مربوطة باليد من اللي في الموسم. تُصنع صباح يومها، وتوصل بنفس اليوم داخل الدمام.',
      'foot.browse': 'تصفح', 'foot.help': 'مساعده', 'foot.follow': 'تابعنا',
      'foot.ig': 'إنستقرام', 'foot.wa': 'واتساب',
      'foot.rights': '© ٢٠٢٦ دار الورد. الأسعار والعناوين أمثلة للعرض.',
      'foot.by': 'من إيلان دول',
      'rail.hero': 'البداية', 'rail.film': 'كيف تُصنع', 'rail.bouquets': 'الباقات',
      'rail.build': 'ركّب باقتك', 'rail.weddings': 'الأعراس', 'rail.sympathy': 'العزاء',
      'rail.shop': 'المحل', 'rail.order': 'اطلب',
      'meta.title': 'دار الورد — باقات مربوطة باليد',
      'meta.desc': 'دار الورد: باقات موسمية مربوطة باليد، زهور أعراس وتقديم واجب. تُصنع صباح يومها وتوصل بنفس اليوم داخل الدمام.'
    },
    en: {
      'brand': 'Dar Al-Ward',
      'nav.bouquets': 'Bouquets', 'nav.build': 'Build your own', 'nav.weddings': 'Weddings',
      'nav.sympathy': 'Sympathy', 'nav.shop': 'The shop', 'nav.order': 'Order',
      'hero.eyebrow': 'Seasonal flowers · Dammam',
      'hero.h1': 'Flowers, gathered <em>by hand</em>.',
      'hero.lead': 'Hand-tied seasonal bouquets, wedding flowers and sympathy work. Every bouquet is made the morning it goes out.',
      'hero.cta1': 'Build a bouquet', 'hero.cta2': "See how it's made",
      'hero.meta1': 'Made in the morning', 'hero.meta2': 'Same-day delivery', 'hero.meta3': 'From SAR 92',
      'cue': 'Scroll',
      'band.1': 'Garden rose', 'band.2': 'White anemone', 'band.3': 'Marigold',
      'band.4': 'Eucalyptus', 'band.5': 'Feather grass', 'band.6': 'In season',
      'film.h': 'How a bouquet is made', 'film.hint': 'Scroll to step through', 'film.count': 'Bouquet',
      's1.k': '01 · Gathered', 's1.h': 'Stem by stem, in a spiral.', 's1.p': 'Each stem crosses the last at the same point, so the bunch opens like a fan and stands up on its own.',
      's2.k': '02 · Balanced', 's2.h': 'We add and take away, until it sits right.', 's2.p': "Only what came in this morning: garden roses, anemones, zinnias, eucalyptus and feather grass. Point at a flower to name it.",
      's3.k': '03 · Wrapped and tied', 's3.h': 'Paper, then silk.', 's3.p': 'Kraft paper and blush tissue folded round the stems, tied with a silk ribbon by hand. Choose the ribbon.',
      's4.k': '04 · Finished', 's4.h': 'Ready by nine.', 's4.p': 'Cut, conditioned and wrapped the same morning. Write the card and we tuck it in.',
      's4.cta': 'Order this bouquet',
      'hs.rose': 'Garden rose', 'hs.zinnia': 'Zinnia', 'hs.anemone': 'White anemone', 'hs.eucalyptus': 'Eucalyptus',
      'bq.eyebrow': 'Bouquets', 'bq.h': 'Choose a bouquet.',
      'bq.note': 'Each is made the morning it goes out from what came in that day, so the mix moves a little with the season. Prices are examples.',
      'bq.order': 'Order', 'bq.build': 'Make it your own',
      'build.eyebrow': 'Build a bouquet', 'build.h': 'Choose the stems, and watch it come together.',
      'build.stage': 'Live preview', 'build.total': 'Total', 'build.season': 'Season',
      'build.season.note': 'Changes what is available', 'build.stems': 'Stems', 'build.ribbon': 'Ribbon',
      'build.order': 'Order this bouquet', 'build.notin': 'Not in season', 'build.each': 'each',
      'build.stems.n': 'stems', 'build.wrap': 'Wrapping and ribbon', 'build.delivery': 'Delivery in Dammam',
      'build.note': 'Prices are examples.',
      'wed.eyebrow': 'Weddings', 'wed.h': 'Flowers for the day, and the tables after.',
      'wed.p': 'Bouquets, buttonholes and low arrangements for long tables, grown and bought for the season you marry in. We start with a conversation and a walk round the venue.',
      'wed.l1': 'The bouquet and buttonholes', 'wed.l2': 'Tables, arches and the aisle', 'wed.l3': 'Set up on the morning, cleared at the end',
      'wed.cta': 'Talk to us about your day', 'wed.cap': 'Low arrangements and candles down a long table.',
      'sym.eyebrow': 'Sympathy', 'sym.h': 'Something simple, made with care.',
      'sym.p': 'Wreaths, sheaves and posies in white and green, delivered to a home, a mosque or a funeral director. If you would rather talk it through, ring the shop and we will help.',
      'sym.cta': 'Order sympathy flowers', 'sym.note': 'Example number for the demo.',
      'shop.eyebrow': 'The shop', 'shop.h': 'Open early, on the street.',
      'shop.note': 'Buckets of whatever came in that morning, and a bench where the bouquets are made while you wait.',
      'shop.hours': 'Opening hours', 'shop.d1': 'Sunday – Thursday', 'shop.d2': 'Saturday', 'shop.d3': 'Friday', 'shop.closed': 'Closed',
      'shop.addr': 'Prince Mohammed Bin Fahd Road, Dammam — example address',
      'shop.note2': 'Hours and addresses are examples, to be replaced with the real shop’s.',
      'order.eyebrow': 'Order', 'order.h': 'Send flowers.',
      'order.p': "Tell us where and when. Order by eleven and the morning's bouquet goes out that afternoon.",
      'order.l1': 'Pick a bouquet, or build one yourself',
      'order.l2': 'We confirm by email or WhatsApp before we start',
      'order.l3': 'We write the card and tuck it in',
      'order.l4': 'Delivered by hand in Dammam',
      'f.name': 'Name', 'f.name.ph': 'Your name', 'f.phone': 'Phone', 'f.phone.ph': '05x xxx xxxx',
      'f.bouquet': 'Bouquet', 'f.date': 'Date', 'f.addr': 'Address', 'f.addr.ph': 'District, street, building',
      'f.note': 'Card or note', 'f.note.ph': 'Write the card message…',
      'f.terms': 'By sending you agree we may contact you to confirm the order. No online payment; pay on delivery or by transfer.',
      'f.wa': 'Opens WhatsApp with a ready message you send yourself.',
      'f.send': 'Send the order',
      'f.demo': 'Demo form: it does not send your details anywhere. We can wire it to the shop’s WhatsApp or email.',
      'f.today': 'Today', 'f.tomorrow': 'Tomorrow', 'f.builder': 'Your own bouquet',
      'f.err.name': 'Please write your name.', 'f.err.phone': 'Phone should be 9–14 digits.',
      'f.ok': 'Done. Open WhatsApp and send the ready message, or we will call you back.',
      'foot.p': 'Hand-tied bouquets from what is in season. Made the morning they go out, delivered the same day in Dammam.',
      'foot.browse': 'Browse', 'foot.help': 'Help', 'foot.follow': 'Follow',
      'foot.ig': 'Instagram', 'foot.wa': 'WhatsApp',
      'foot.rights': '© 2026 Dar Al-Ward. Prices and addresses are examples.',
      'foot.by': 'by Eilan Doll',
      'rail.hero': 'Start', 'rail.film': 'How it’s made', 'rail.bouquets': 'Bouquets',
      'rail.build': 'Build', 'rail.weddings': 'Weddings', 'rail.sympathy': 'Sympathy',
      'rail.shop': 'Shop', 'rail.order': 'Order',
      'meta.title': 'Dar Al-Ward — hand-tied bouquets',
      'meta.desc': 'Seasonal, hand-tied bouquets, wedding and sympathy flowers. Made the morning they go out, delivered same day in Dammam.'
    }
  };

  const lang = {
    cur: (() => {
      const q = new URLSearchParams(location.search).get('lang');
      if (q === 'en' || q === 'ar') return q;
      return localStorage.getItem('daw.lang') === 'en' ? 'en' : 'ar';
    })(),
    t(key) { return (I18N[this.cur] && I18N[this.cur][key]) || (I18N.ar[key] || key); },
    name(obj) { return obj && obj[this.cur] != null ? obj[this.cur] : obj; }
  };

  /* ============================================================== state === */
  const state = {
    season: 'spring',
    stems: { eucalyptus: 2, rose: 3, anemone: 2, ranunculus: 2, peony: 1 },
    ribbon: 'saffron',
    cat: 'all'
  };
  const SHOP_WA = '966500000000';  // ← demo number: replace with the shop's WhatsApp
  const WRAP = 45;       // SAR, wrapping and ribbon
  const DELIVERY = 25;   // SAR inside Dammam
  const stemPrice = (s) => s.price;
  const inSeason = (s) => s.seasons.includes(state.season);

  /* ============================================================ i18n run === */
  function applyLang(next, animate = true) {
    lang.cur = next;
    localStorage.setItem('daw.lang', next);
    const html = document.documentElement;
    html.lang = next;
    html.dir = next === 'ar' ? 'rtl' : 'ltr';
    html.dataset.lang = next;
    document.title = lang.t('meta.title');
    const md = $('meta[name="description"]');
    if (md) md.setAttribute('content', lang.t('meta.desc'));
    if ($('meta[property="og:title"]')) $('meta[property="og:title"]').setAttribute('content', lang.t('meta.title'));
    if ($('meta[property="og:description"]')) $('meta[property="og:description"]').setAttribute('content', lang.t('meta.desc'));

    $$('[data-i18n]').forEach(el => { el.textContent = lang.t(el.dataset.i18n); });
    $$('[data-i18n-html]').forEach(el => { el.innerHTML = lang.t(el.dataset.i18nHtml); });
    $$('[data-i18n-ph]').forEach(el => { el.placeholder = lang.t(el.dataset.i18nPh); });
    $$('[data-i18n-name]').forEach(el => {
      const v = lang.t(el.dataset.i18nName);
      el.setAttribute('data-name', v);
      el.setAttribute('aria-label', v);
    });
    $$('[data-i18n-alt]').forEach(el => { el.alt = lang.t(el.dataset.i18nAlt); });

    $('#langNow').textContent = next === 'ar' ? 'ع' : 'EN';
    $('#langAlt').textContent = next === 'ar' ? 'EN' : 'ع';
    $('#langBtn').setAttribute('aria-label', next === 'ar' ? 'Switch to English' : 'التبديل للعربية');

    renderRail();
    renderChips();
    renderBouquets();
    renderSeasons();
    renderStems();
    renderRibbons();
    renderSummary();
    renderOrderOptions();
    if (animate) {
      document.body.classList.remove('lang-fade');
      void document.body.offsetWidth;
      document.body.classList.add('lang-fade');
    }
  }

  /* ============================================================== rail === */
  const RAIL = [
    ['hero', 'rail.hero'], ['film', 'rail.film'], ['bouquets', 'rail.bouquets'],
    ['build', 'rail.build'], ['weddings', 'rail.weddings'], ['sympathy', 'rail.sympathy'],
    ['shop', 'rail.shop'], ['order', 'rail.order']
  ];
  let activeSec = 'hero';
  function renderRail() {
    $('#rail').innerHTML = RAIL.map(([id, k]) =>
      `<a href="#${id}" data-sec="${id}" class="${id === activeSec ? 'is-on' : ''}"><b>${lang.t(k)}</b><i></i></a>`).join('');
  }

  /* brand cube drawn in the hero + film corner */
  function heroCube() {
    const cv = $('#heroCube');
    if (!cv || !window.EilanScene) return;
    const cube = new window.EilanScene.Cube(cv, { size: 34, zoom: 1.35, parallax: true });
    cube.start();
  }

  /* ============================================================ petals === */
  function initPetals(canvas, count = 20) {
    if (!canvas || reduce) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = 0, h = 0, dpr = 1, parts = [];
    const palette = ['#E7B4A6', '#E0B454', '#F3EAD6', '#E3C4BE', '#93A98A'];
    function size() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width || innerWidth; h = r.height || innerHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function make(i) {
      return {
        x: Math.random() * w, y: Math.random() * h - h,
        r: 3 + Math.random() * 6,
        vy: 0.14 + Math.random() * 0.34,
        vx: -0.16 + Math.random() * 0.32,
        a: Math.random() * Math.PI * 2,
        va: (Math.random() - 0.5) * 0.012,
        c: palette[(Math.random() * palette.length) | 0],
        o: 0.18 + Math.random() * 0.4
      };
    }
    size(); parts = Array.from({ length: count }, make);
    addEventListener('resize', size, { passive: true });
    let visible = true;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 }).observe(canvas);
    (function tick() {
      requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y += p.vy; p.x += p.vx + Math.sin(p.y * 0.01) * 0.22; p.a += p.va;
        if (p.y - 22 > h) Object.assign(p, make(0), { y: -20, x: Math.random() * w });
        if (p.x < -30) p.x = w + 20; else if (p.x > w + 30) p.x = -20;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.a);
        ctx.globalAlpha = p.o; ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.56, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    })();
  }

  /* ============================================================== film === */
  const Film = {
    steps: 4, idx: 0, cur: 0, raf: 0, last: 0,
    init() {
      this.track = $('#filmTrack');
      this.frames = $$('.film-frame', $('#filmFrames'));
      this.stepsEls = $$('.film-step', $('#filmCopy'));
      this.dots = $('#filmDots');
      this.num = $('#filmNum');
      this.hot = $('#hotspots');
      if (!this.track) return;
      this.dots.innerHTML = this.stepsEls.map((s, i) =>
        `<button type="button" role="tab" aria-label="${i + 1}" data-i="${i}" class="${i === 0 ? 'is-on' : ''}"></button>`).join('');
      $$('.film-dots button').forEach(b => b.addEventListener('click', () => this.jump(+b.dataset.i)));
      this.update = this.update.bind(this);
      addEventListener('scroll', () => this.schedule(), { passive: true });
      addEventListener('resize', () => { this.measure(); this.schedule(); });
      this.measure(); this.schedule();
    },
    measure() {
      const r = this.track.getBoundingClientRect();
      this.top = r.top + scrollY;
      this.len = this.track.offsetHeight - innerHeight;
    },
    schedule() {
      if (this.raf) return;
      this.raf = requestAnimationFrame(this.update);
    },
    progress() {
      const y = scrollY - this.top;
      return clamp(y / Math.max(1, this.len), 0, 0.9999);
    },
    update() {
      this.raf = 0;
      const p = this.progress();
      // each step holds for a beat, then cross-fades over the last 26%
      const raw = p * this.steps;
      const i = Math.min(this.steps - 1, Math.floor(raw));
      const local = raw - i;
      const nextI = Math.min(this.steps - 1, i + (local > 0.74 ? 1 : 0));
      const fade = local > 0.74 ? (local - 0.74) / 0.26 : 0;
      if (nextI !== this.cur) {
        this.frames.forEach((f, k) => f.classList.toggle('is-on', k === nextI));
        this.stepsEls.forEach((s, k) => s.classList.toggle('is-on', k === nextI));
        this.hot.classList.toggle('is-on', nextI === 1);
        this.dots.childNodes.forEach((d, k) => d.classList.toggle('is-on', k === nextI));
        this.num.textContent = String(nextI + 1).padStart(2, '0');
        this.cur = nextI;
      }
      document.body.classList.toggle('in-film', p > 0.002 && p < 0.998);
      // gentle ken-burns: the frame eases toward the scroll position
      const f = this.frames[this.cur] && this.frames[this.cur].querySelector('img');
      if (f) f.style.transform = `scale(${(1.13 - local * 0.035).toFixed(4)}) translateY(${(local * 1.2).toFixed(2)}%)`;
      void fade;
    },
    jump(i) {
      const p = (i + 0.35) / this.steps;
      scrollTo({ top: this.top + p * this.len, behavior: reduce ? 'auto' : 'smooth' });
    }
  };

  /* ========================================================== bouquets === */
  function renderChips() {
    const box = $('#chips');
    if (!box) return;
    box.innerHTML = CATS.map(c =>
      `<button class="chip${c.id === state.cat ? ' is-on' : ''}" type="button" data-cat="${c.id}">${lang.name(c.name)}</button>`).join('');
  }
  function renderBouquets() {
    const grid = $('#bqGrid');
    if (!grid) return;
    const IMG = {
      'film-4': ['film-4-900.webp', 'film-4-1600.webp'], 'film-3': ['film-3-900.webp', 'film-3-1600.webp'],
      'film-2': ['film-2-900.webp', 'film-2-1600.webp'], 'p1': ['p1-520.webp', 'p1-900.webp'],
      'bucket': ['bucket-520.webp', 'bucket-900.webp'], 'sympathy': ['sympathy-520.webp', 'sympathy-900.webp']
    };
    grid.innerHTML = BQ.map((b, i) => {
      const busy = b.cap;
      const show = state.cat === 'all' || b.cats.includes(state.cat);
      return `<article class="card${show ? '' : ' is-hidden'}" data-tilt data-id="${b.id}" style="transition-delay:${i * 40}ms">
        <div class="card-media">
          <img src="assets/img/${IMG[b.img][1]}" srcset="assets/img/${IMG[b.img][0]} 640w, assets/img/${IMG[b.img][1]} 1200w"
               sizes="(max-width:700px) 92vw, 30vw" alt="${lang.name(b.name)}" loading="lazy" width="900" height="1117">
          ${b.tag ? `<span class="card-tag">${lang.name(b.tag)}</span>` : ''}
        </div>
        <div class="card-body">
          <div class="card-top">
            <h3>${lang.name(b.name)}</h3>
            <span class="price">${money(b.price, lang.cur)}<small>${busy} ${lang.t('build.stems.n')}</small></span>
          </div>
          <p>${lang.name(b.desc)}</p>
          <div class="card-actions">
            <a class="btn btn-sm" href="#order" data-pick="${b.id}">${lang.t('bq.order')}</a>
            <a class="btn btn-sm btn-ghost" href="#build" data-build="${b.id}">${lang.t('bq.build')}</a>
          </div>
        </div>
      </article>`;
    }).join('');
  }

  function initTilt() {
    if (reduce || matchMedia('(hover: none)').matches) return;
    let raf = 0;
    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest && e.target.closest('[data-tilt]');
      if (!card) return;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${(px * 5).toFixed(2)}deg) rotateX(${(-py * 5).toFixed(2)}deg) translateY(-4px)`;
      });
    }, { passive: true });
    document.addEventListener('pointerout', (e) => {
      const card = e.target.closest && e.target.closest('[data-tilt]');
      if (card) card.style.transform = '';
    }, { passive: true });
  }

  /* =========================================================== builder === */
  let bq = null;
  function builderState() {
    const stems = STEMS
      .filter(s => (state.stems[s.key] || 0) > 0 && inSeason(s))
      .map(s => ({ key: s.key, qty: state.stems[s.key] }));
    const rb = RIBBONS.find(r => r.id === state.ribbon) || RIBBONS[0];
    return { stems, ribbon: rb.hex };
  }
  function priceBreakdown() {
    let stemsSAR = 0, count = 0;
    for (const s of STEMS) {
      const q = state.stems[s.key] || 0;
      if (!q || !inSeason(s)) continue;
      stemsSAR += q * stemPrice(s);
      count += q;
    }
    const total = stemsSAR + (count ? WRAP + DELIVERY : 0);
    return { stemsSAR: Math.round(stemsSAR), count, wrap: WRAP, delivery: DELIVERY, total: Math.round(total) };
  }
  function renderSeasons() {
    const box = $('#seasons');
    if (!box) return;
    box.innerHTML = SEASONS.map(s =>
      `<button class="chip${s.id === state.season ? ' is-on' : ''}" type="button" data-season="${s.id}">${lang.name(s.name)}</button>`).join('');
  }
  function renderStems() {
    const box = $('#stems');
    if (!box) return;
    box.innerHTML = STEMS.map(s => {
      const ok = inSeason(s);
      const q = state.stems[s.key] || 0;
      return `<div class="stem${ok ? '' : ' is-off'}" data-key="${s.key}">
        <span class="stem-dot">${stemGlyph(s.key)}</span>
        <span class="stem-name"><b>${lang.name(s.name)}</b>
          <span>${ok ? money(s.price, lang.cur) + ' ' + lang.t('build.each') : lang.t('build.notin')}</span></span>
        <span class="qty">
          <button type="button" data-dec="${s.key}" aria-label="−" ${(!ok || q === 0) ? 'disabled' : ''}>−</button>
          <output>${lang.cur === 'ar' ? arNum(q) : q}</output>
          <button type="button" data-inc="${s.key}" aria-label="+" ${ok ? '' : 'disabled'}>+</button>
        </span>
      </div>`;
    }).join('');
  }
  function stemGlyph(key) {
    const colors = {
      eucalyptus: '#93A98A', grass: '#CDBF92', rose: '#E7B4A6', anemone: '#F6EFE2',
      marigold: '#E08B3A', peony: '#EFC0CE', ranunculus: '#F3D7C4', foxglove: '#D8D3C4', sweeppea: '#D9B6D9'
    };
    const c = colors[key] || '#93A98A';
    const core = key === 'anemone' ? '#2A2A26' : (key === 'rose' || key === 'peony' ? '#D99B89' : '#C9752C');
    return `<svg viewBox="0 0 26 26" aria-hidden="true"><circle cx="13" cy="13" r="6.4" fill="${c}" opacity=".55"/><circle cx="13" cy="13" r="3.2" fill="${core}"/></svg>`;
  }
  function renderRibbons() {
    const html = RIBBONS.map(r =>
      `<button class="ribbon-swatch${r.id === state.ribbon ? ' is-on' : ''}" type="button" data-ribbon="${r.id}">
        <i style="background:${r.hex}"></i>${lang.name(r.name)}</button>`).join('');
    $$('#ribbons, #ribbonsFilm').forEach(el => { if (el) el.innerHTML = html; });
  }
  function renderSummary() {
    const box = $('#summary');
    if (!box) return;
    const p = priceBreakdown();
    box.innerHTML = `
      <div class="row"><span>${lang.t('build.stems')} · ${lang.cur === 'ar' ? arNum(p.count) : p.count}</span><span>${money(p.stemsSAR, lang.cur)}</span></div>
      <div class="row"><span>${lang.t('build.wrap')}</span><span>${money(p.wrap, lang.cur)}</span></div>
      <div class="row"><span>${lang.t('build.delivery')}</span><span>${money(p.delivery, lang.cur)}</span></div>
      <div class="row total"><span>${lang.t('build.total')}</span><b>${money(p.total, lang.cur)}</b></div>
      <p class="small" style="margin-top:6px">${lang.t('build.note')}</p>`;
    const st = $('#stageTotal');
    if (st) st.textContent = lang.cur === 'ar' ? arNum(p.total) : p.total;
    const sc = $('#stemCount');
    if (sc) sc.textContent = `${lang.cur === 'ar' ? arNum(p.count) : p.count} ${lang.t('build.stems.n')}`;
  }
  function syncBuilder() {
    renderStems(); renderSummary();
    if (bq) bq.set(builderState());
  }

  function initBuilder() {
    const host = $('#bouquet');
    if (!host || !window.EilanScene) return;
    bq = new window.EilanScene.Bouquet(host);
    bq.set(builderState());
    (function loop() { bq.tick(); requestAnimationFrame(loop); })();

    document.addEventListener('click', (e) => {
      const t = e.target.closest('button');
      if (!t) return;
      if (t.dataset.season) { state.season = t.dataset.season; renderSeasons(); syncBuilder(); }
      else if (t.dataset.inc) {
        const s = STEMS.find(x => x.key === t.dataset.inc);
        if (s && inSeason(s)) state.stems[s.key] = Math.min(24, (state.stems[s.key] || 0) + 1);
        syncBuilder();
      } else if (t.dataset.dec) {
        const k = t.dataset.dec;
        state.stems[k] = Math.max(0, (state.stems[k] || 0) - 1);
        syncBuilder();
      } else if (t.dataset.ribbon) {
        state.ribbon = t.dataset.ribbon; renderRibbons(); syncBuilder();
      } else if (t.dataset.cat) {
        state.cat = t.dataset.cat; renderChips(); renderBouquets();
      }
    });
  }

  /* ============================================================== order === */
  function renderOrderOptions() {
    const sel = $('#fBq');
    if (sel) {
      sel.innerHTML = BQ.map(b => `<option value="${b.id}">${lang.name(b.name)} — ${money(b.price, lang.cur)}</option>`).join('')
        + `<option value="builder">${lang.t('f.builder')} — ${money(priceBreakdown().total, lang.cur)}</option>`;
    }
    const d = $('#fDate');
    if (d) {
      const fmt = (dt) => new Intl.DateTimeFormat(lang.cur === 'ar' ? 'ar-SA' : 'en-GB',
        { weekday: 'long', day: 'numeric', month: 'short' }).format(dt);
      const t0 = new Date(), t1 = new Date(Date.now() + 864e5);
      d.innerHTML = `<option value="${t0.toISOString().slice(0, 10)}">${lang.t('f.today')} · ${fmt(t0)}</option>
                     <option value="${t1.toISOString().slice(0, 10)}">${lang.t('f.tomorrow')} · ${fmt(t1)}</option>`;
    }
  }

  function initForm() {
    const form = $('#orderForm');
    if (!form) return;
    const alertBox = $('#formAlert');
    const wa = $('#waNote');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alertBox.classList.remove('is-on'); wa.classList.remove('is-on');
      const name = $('#fName').value.trim();
      const phone = $('#fPhone').value.replace(/[^\d+]/g, '');
      if (!name) { alertBox.textContent = lang.t('f.err.name'); alertBox.classList.add('is-on'); $('#fName').focus(); return; }
      if (phone.replace(/\D/g, '').length < 9 || phone.replace(/\D/g, '').length > 14) {
        alertBox.textContent = lang.t('f.err.phone'); alertBox.classList.add('is-on'); $('#fPhone').focus(); return;
      }
      // demo: no network. Show the success state and the WhatsApp hand-off.
      alertBox.textContent = lang.t('f.ok'); alertBox.classList.add('is-on');
      wa.classList.add('is-on');
      form.querySelector('[type="submit"]').blur();
    });
    document.addEventListener('click', (e) => {
      const pick = e.target.closest('[data-pick]');
      if (pick && $('#fBq')) { $('#fBq').value = pick.dataset.pick; }
      const build = e.target.closest('[data-build]');
      if (build && $('#fBq')) { $('#fBq').value = 'builder'; }
    });
  }

  /* ================================================================ nav === */
  function initNav() {
    const head = $('#head'), top = $('#toTop'), burger = $('#burger');
    const onScroll = () => {
      const y = scrollY;
      head.classList.toggle('is-solid', y > 40);
      top.classList.toggle('is-on', y > innerHeight * 0.8);
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    top.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
    burger.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    $$('#nav a').forEach(a => a.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    }));
    $('#langBtn').addEventListener('click', () => applyLang(lang.cur === 'ar' ? 'en' : 'ar'));

    // scrollspy for header underline + rail
    const secs = RAIL.map(([id]) => document.getElementById(id)).filter(Boolean);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const id = en.target.id;
        $$('#nav a').forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + id)));
        activeSec = id;
        $$('#rail a').forEach(a => a.classList.toggle('is-on', a.dataset.sec === id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(s => spy.observe(s));

    // reveal
    const rvs = $$('.rv');
    if (reduce) rvs.forEach(el => el.classList.add('is-in'));
    else {
      const ro = new IntersectionObserver((entries) => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); ro.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      rvs.forEach(el => ro.observe(el));
    }
  }

  /* =============================================================== boot === */
  function boot() {
    applyLang(lang.cur, false);
    initNav();
    Film.init();
    initBuilder();
    renderOrderOptions();
    initForm();
    initTilt();
    heroCube();
    initPetals($('#petals2'), 12);
    requestAnimationFrame(() => {
      document.body.classList.add('ready');
      setTimeout(() => { const v = $('#veil'); if (v) v.remove(); }, 1100);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  // expose a tiny hook for local checks
  window.DAW = { state, applyLang, priceBreakdown, Film, get activeSec() { return activeSec; } };
})();
