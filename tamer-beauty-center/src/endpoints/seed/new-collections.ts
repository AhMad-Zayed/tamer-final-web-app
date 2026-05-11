export const expertsData = [
  { 
    name: 'تامر شحادة', 
    title: 'المدير العام والمؤسس', 
    bio: 'خبير في إدارة مراكز التجميل لأكثر من 15 عاماً والمدير التنفيذي لمجموعة تامر بيوتي.', 
    experienceYears: 15,
    profileMedia: { type: 'image' },
    speech: {
      root: {
        children: [{
          children: [{
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'رؤيتي هي تحويل مفهوم العناية بالرجل في المنطقة إلى تجربة تجمع بين الرفاهية والنتائج الطبية الملموسة. نحن لا نقدم خدمات فقط، نحن نصنع الثقة.',
            type: 'text',
            version: 1,
          }],
          direction: 'rtl',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        }],
        direction: 'rtl',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
  },
  { name: 'أحمد محمود', title: 'خبير ليزر متقدم', bio: 'متخصص في إزالة الشعر بالليزر بأحدث التقنيات', experienceYears: 8, profileMedia: { type: 'image' } },
  { name: 'سارة علي', title: 'أخصائية العناية بالبشرة', bio: 'أخصائية علاج مشاكل البشرة والعناية الفائقة', experienceYears: 6, profileMedia: { type: 'image' } },
  { name: 'خالد مصطفى', title: 'مصمم مظهر 3D', bio: 'فنان في الحلاقة والتصميم بأسلوب عصري', experienceYears: 10, profileMedia: { type: 'image' } },
  { name: 'منى جمال', title: 'مدربة الأكاديمية المعتمدة', bio: 'مدربة معتمدة في مجالات العناية والتجميل', experienceYears: 12, profileMedia: { type: 'image' } },
  { name: 'يوسف أحمد', title: 'خبير التجميل السريري', bio: 'متخصص في علاجات التجميل الطبية غير الجراحية', experienceYears: 7, profileMedia: { type: 'image' } },
  { name: 'ليلى حسن', title: 'خبيرة الماكياج الدائم', bio: 'فنانة في رسم الملامح والماكياج شبه الدائم', experienceYears: 9, profileMedia: { type: 'image' } },
  { name: 'عمر ياسين', title: 'أخصائي العلاج الطبيعي', bio: 'خبير في المساج العلاجي والاسترخاء', experienceYears: 11, profileMedia: { type: 'image' } },
]

export const aboutData = {
  title: 'تامر بيوتي سنتر — الريادة في عالم التميز',
  tamerBio: {
    root: {
      children: [{
        children: [{
          detail: 0, format: 0, mode: 'normal', style: '',
          text: 'تامر شحادة، مؤسس المركز ورائد أعمال في قطاع التجميل، كرس حياته المهنية لتطوير معايير جديدة للجمال في فلسطين والمنطقة.',
          type: 'text', version: 1,
        }],
        direction: 'rtl', format: '', indent: 0, type: 'paragraph', version: 1,
      }],
      direction: 'rtl', format: '', indent: 0, type: 'root', version: 1,
    },
  },
  tamerVision: {
    root: {
      children: [{
        children: [{
          detail: 0, format: 0, mode: 'normal', style: '',
          text: 'أن نكون الوجهة الأولى والوحيدة لكل من يبحث عن التكامل بين الفن والطب والرفاهية.',
          type: 'text', version: 1,
        }],
        direction: 'rtl', format: '', indent: 0, type: 'paragraph', version: 1,
      }],
      direction: 'rtl', format: '', indent: 0, type: 'root', version: 1,
    },
  },
  centerBio: {
    root: {
      children: [{
        children: [{
          detail: 0, format: 0, mode: 'normal', style: '',
          text: 'تأسس تامر بيوتي سنتر ليكون صرحاً يجمع أرقى خدمات العناية بالرجل والبشرة تحت سقف واحد، مجهزين بأحدث التقنيات العالمية وطاقم من النخبة.',
          type: 'text', version: 1,
        }],
        direction: 'rtl', format: '', indent: 0, type: 'paragraph', version: 1,
      }],
      direction: 'rtl', format: '', indent: 0, type: 'root', version: 1,
    },
  },
  tamerMedia: {
    type: 'image',
  }
}

export const servicesData = [
  {
    title: 'إزالة الشعر بالليزر',
    slug: 'laser-hair-removal',
    category: 'laser',
    icon: 'Zap',
    shortDescription: 'أحدث تقنيات الليزر الطبية لبشرة ناعمة وخالية من الشعر بشكل دائم وآمن.',
    packages: [
      { label: 'الصدر والبطن', price: '200', slug: 'chest-and-abdomen' },
      { label: 'الظهر', price: '200', slug: 'back' },
      { label: 'الأكتاف', price: '150', slug: 'shoulders' },
      { label: 'الإبط', price: '100', slug: 'armpits' },
      { label: 'تحديد اللحية', price: '100', slug: 'beard-shaping' },
      { label: 'اليدين كامل', price: '300', slug: 'full-arms' },
      { label: 'رجلين كامل', price: '400', slug: 'full-legs' },
      { label: 'بوكسر', price: '300', slug: 'boxer' },
    ],
    faqs: [
      { question: 'كم جلسة أحتاج؟', answer: 'عادةً يحتاج المريض بين 6 و8 جلسات للحصول على نتائج مثلى، بفاصل 4-6 أسابيع بين كل جلسة.' },
      { question: 'هل العملية مؤلمة؟', answer: 'نستخدم جهاز تبريد متقدم يجعل الجلسة مريحة جداً. قد يشعر بعض العملاء بوخز خفيف فقط.' },
      { question: 'هل مناسب لجميع أنواع البشرة؟', answer: 'نعم، تقنياتنا مصممة للعمل على جميع أنواع البشرة بأمان تام.' },
    ],
  },
  {
    title: 'علاجات البشرة السريرية',
    slug: 'clinical-skin-care',
    category: 'skin',
    icon: 'Sparkles',
    shortDescription: 'نجمع بين العلم والجمال لتقديم حلول مخصصة لصحة بشرتك، نضارتها وتوهجها.',
    packages: [
      { label: 'هايدروفيشل', price: '250', slug: 'hydrafacial' },
      { label: 'علاج حب الشباب', price: '300', slug: 'acne-treatment' },
      { label: 'تقشير بارد', price: '250', slug: 'cold-peeling' },
      { label: 'تقشير كيميائي', price: '300', slug: 'chemical-peeling' },
      { label: 'تقشير كربوني', price: '300', slug: 'carbon-peeling' },
      { label: 'ميزوثيرابي', price: '300', slug: 'mesotherapy' },
      { label: 'تفتيح العين', price: '250', slug: 'eye-brightening' },
    ],
    faqs: [
      { question: 'ما الفرق بين التقشير البارد والكيميائي؟', answer: 'التقشير البارد مناسب للبشرة الحساسة ويعمل على ترطيب عميق، بينما الكيميائي يعالج التصبغات والخطوط الدقيقة بشكل أكثر فاعلية.' },
      { question: 'كم مرة أحتاج للتقشير؟', answer: 'يُنصح عموماً بجلسة واحدة كل 3-4 أسابيع للحصول على أفضل النتائج.' },
    ],
  },
  {
    title: 'خدمات الشعر 3D',
    slug: '3d-hair-design',
    category: 'hair',
    icon: 'Scissors',
    shortDescription: 'قصات وتصاميم شعر احترافية ثلاثية الأبعاد بأحدث التقنيات العالمية.',
    packages: [
      { label: 'قص 3D', price: '50', slug: '3d-cut' },
      { label: 'بروتين', price: '250 - 800', slug: 'protein' },
      { label: 'حناء لحية', price: '20', slug: 'beard-henna' },
      { label: 'شبكية فرنسية', price: '2000 - 5000', slug: 'french-mesh' },
      { label: 'علاج تساقط', price: '300', slug: 'hair-loss-treatment' },
      { label: 'ترميم', price: '100', slug: 'restoration' },
    ],
    faqs: [
      { question: 'ما هو قص الشعر 3D؟', answer: 'تقنية قص متطورة تأخذ بعين الاعتبار شكل الوجه، حركة الشعر، وحجمه لإنتاج تسريحة ثلاثية الأبعاد متناسقة من جميع الزوايا.' },
      { question: 'كم تدوم الشبكية الفرنسية؟', answer: 'تدوم الشبكية الفرنسية عادةً من شهر إلى شهرين ونصف، ويمكن إعادة ضبطها بانتظام.' },
    ],
  },
  {
    title: 'الحجامة والتدريب العلاجي',
    slug: 'wellness-cupping',
    category: 'wellness',
    icon: 'Droplets',
    shortDescription: 'حجامة طبية ومساج علاجي ومعالجات جمالية متخصصة لراحة الجسم والروح.',
    packages: [
      { label: 'إزالة وشم', price: 'تبدأ من 50', slug: 'tattoo-removal' },
      { label: 'حجامة طبية', price: '100', slug: 'medical-cupping' },
      { label: 'مساج ساعة', price: '100', slug: 'one-hour-massage' },
      { label: 'شمع هوبي', price: '40', slug: 'hopi-wax' },
    ],
    faqs: [
      { question: 'هل الحجامة مؤلمة؟', answer: 'الحجامة بتقنياتنا الحديثة مريحة جداً، قد يشعر المريض بضغط خفيف فقط.' },
      { question: 'كم جلسة أحتاج لإزالة الوشم؟', answer: 'يعتمد ذلك على حجم الوشم وعمقه، عادةً بين 4 و10 جلسات للنتيجة المثلى.' },
    ],
  },
  {
    title: 'خدمة العريس VIP',
    slug: 'vip-groom',
    category: 'vip',
    icon: 'Crown',
    shortDescription: 'باقة حصرية متكاملة للعريس العصري في خصوصية وفخامة تامة لا تُنسى.',
    packages: [
      { label: 'تجهيز شهر كامل', price: 'حسب الطلب', slug: 'full-month-prep', note: 'يشمل تنظيف بشرة، تجديد شعر ودقن، حمام ملكي، تصوير داخلي' },
    ],
    faqs: [
      { question: 'ماذا تشمل باقة العريس؟', answer: 'تشمل الباقة: تنظيف البشرة العميق، تجديد قصة الشعر واللحية، حمام ملكي، ومساج استرخائي، مع جلسة تصوير داخلية بمعدات احترافية.' },
      { question: 'متى يجب أن أحجز؟', answer: 'ننصح بالحجز قبل 30 يوماً على الأقل من يوم الزفاف لضمان جدول برنامج متكامل ومريح.' },
    ],
  },
]

export const offersData = [
  { title: 'باقة العريس المتكاملة', description: 'تجهيز كامل للعريس بخصم خاص', expirationDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), newPrice: 500, oldPrice: 800 },
  { title: 'جلسات ليزر كامل الجسم', description: 'احصل على 3 جلسات ليزر بسعر جلستين', expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), newPrice: 1200, oldPrice: 1800 },
  { title: 'هيدرافيشال VIP', description: 'تنظيف وتوريد البشرة بأحدث التقنيات', expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), newPrice: 350, oldPrice: 500 },
]

export const reviewsData = [
  { name: 'محمد عبدالله', service: 'تجهيز عريس', rating: 5, text: 'تجربة رائعة جداً، طاقم عمل محترف واهتمام بأدق التفاصيل. شكراً لتامر بيوتي سنتر.', status: 'published' },
  { name: 'أحمد سعيد', service: 'ليزر', rating: 5, text: 'نتائج ممتازة من أول جلسة، أجهزة حديثة وتعامل راقي جداً.', status: 'published' },
  { name: 'ياسر محمد', service: 'عناية بالبشرة', rating: 4, text: 'مكان نظيف ومرتب، الخدمة ممتازة والأسعار مناسبة.', status: 'published' },
]
