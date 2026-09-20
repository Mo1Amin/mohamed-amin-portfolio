import type en from './en'

/** Arabic interface dictionary. Arabic renders right-to-left at the layout level. */
const ar: typeof en = {
  meta: {
    title: 'محمد أمين — مهندس برمجيات',
    description:
      'معرض أعمال محمد أمين عبد الواحد، مهندس برمجيات يبني منتجات للويب والموبايل والذكاء الاصطناعي.',
    homeTitle: 'محمد أمين — مهندس برمجيات يبني منتجات للويب والموبايل والذكاء الاصطناعي',
  },

  a11y: {
    skipToContent: 'تخطَّ إلى المحتوى الرئيسي',
    mainNav: 'التنقل الرئيسي',
    utilityNav: 'تفضيلات الموقع',
    sectionProgress: 'أقسام الصفحة',
    languageSwitcher: 'اللغة',
    themeToggle: 'المظهر',
    modeToggle: 'الاتجاه البصري',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    currentPage: 'الصفحة الحالية',
    currentSection: 'القسم الحالي',
    opensInNewTab: 'يفتح في تبويب جديد',
    decorative: 'عنصر بصري زخرفي',
    readingProgress: 'تقدّم القراءة',
  },

  nav: {
    home: 'الرئيسية',
    about: 'نبذة',
    projects: 'المشاريع',
    skills: 'المهارات',
    leadership: 'القيادة',
    contact: 'تواصل',
  },

  actions: {
    exploreWork: 'استعرض الأعمال',
    seeProof: 'شاهد الدليل',
    viewCaseStudy: 'افتح ملف المشروع',
    viewAllProjects: 'كل المشاريع',
    backToProjects: 'العودة إلى المشاريع',
    backToTop: 'العودة إلى الأعلى',
    openGithub: 'فتح حساب GitHub',
    copy: 'نسخ',
    copied: 'تم النسخ',
    send: 'إرسال الرسالة',
    readMore: 'اقرأ المزيد',
  },

  theme: {
    label: 'المظهر',
    dark: 'داكن',
    light: 'فاتح',
    switchToDark: 'التبديل إلى المظهر الداكن',
    switchToLight: 'التبديل إلى المظهر الفاتح',
  },

  mode: {
    label: 'الاتجاه البصري',
    bold: 'جريء',
    calm: 'هادئ',
    hint: 'الاتجاه الجريء تعبيري وتفاعلي، والهادئ أبسط وأسرع في القراءة.',
    switchToBold: 'التبديل إلى الاتجاه الجريء',
    switchToCalm: 'التبديل إلى الاتجاه الهادئ',
  },

  hero: {
    channel: 'القناة ٠١ — الملف الشخصي',
    availabilityLabel: 'الحالة',
    scrollHint: 'مرّر للأسفل للبدء',
    signalLabel: 'حقل الإشارة',
    signalHint: 'حرّك المؤشر فوق الحقل، أو تجاهله — لا شيء هنا ضروري لقراءة الصفحة.',
    telemetryLabel: 'لمحة سريعة',
  },

  sections: {
    about: { index: '٠٢', label: 'نبذة', title: 'مهندس ومؤسس وقائد فريق' },
    projects: { index: '٠٣', label: 'أعمال مختارة', title: 'ملفات المشاريع' },
    skills: { index: '٠٤', label: 'القدرات', title: 'خريطة القدرات' },
    leadership: { index: '٠٥', label: 'القيادة', title: 'القيادة والمجتمع' },
    mobile: { index: '٠٦', label: 'الموبايل', title: 'تطوير تطبيقات الموبايل' },
    ai: { index: '٠٧', label: 'الذكاء الاصطناعي', title: 'الذكاء الاصطناعي وتعلّم الآلة' },
    education: { index: '٠٨', label: 'التعليم', title: 'التعليم والشهادات' },
    contact: { index: '٠٩', label: 'تواصل', title: 'ابدأ محادثة' },
    hero: { index: '٠١', label: 'الملف الشخصي', title: 'الملف الشخصي' },
    journey: { index: '٠٢', label: 'الخط الزمني', title: 'المسار حتى الآن' },
  },

  projects: {
    lede: 'كل مشروع هنا ملف مستقل. الحقائق المؤكدة تُعرض كما هي، وأي معلومة ناقصة تُوضَّح كمعلّقة بدلاً من ملئها بمحتوى غير حقيقي.',
    filterLabel: 'تصفية حسب التصنيف',
    filters: {
      all: 'الكل',
      web: 'ويب',
      mobile: 'موبايل',
      ai_ml: 'ذكاء اصطناعي',
      backend: 'خلفية',
      product: 'منتج',
      leadership: 'قيادة',
    },
    countOne: 'مشروع',
    countMany: 'مشاريع',
    featured: 'مميّز',
    empty: 'لا توجد مشاريع مطابقة لهذه التصفية بعد.',
    roleLabel: 'الدور',
    stackLabel: 'التقنيات',
    linksLabel: 'الروابط',
    noLinks: 'لا توجد روابط عامة بعد.',
    pendingLabel: 'معلومات معلّقة',
    pendingHint: 'هذه الحقول تُترك فارغة عن قصد حتى يؤكدها محمد.',
    sourceLabel: 'المصدر',
    source: {
      cv: 'من السيرة الذاتية',
      confirmed: 'مؤكّد',
      pending: 'معلّق',
    },
    status: {
      published: 'منشور',
      coming_soon: 'قريباً',
      in_development: 'قيد التطوير',
      private: 'خاص',
      pending: 'التفاصيل معلّقة',
    },
    statusHint: {
      published: 'متاح للجميع.',
      coming_soon: 'تم بناؤه، والنشر معلّق.',
      in_development: 'قيد البناء حالياً.',
      private: 'الكود غير عام.',
      pending: 'ذكره محمد، والتفاصيل لم تُستلم بعد.',
    },
    caseStudy: {
      problem: 'المشكلة',
      solution: 'الحل',
      responsibilities: 'المسؤوليات',
      challenges: 'التحديات',
      outcome: 'النتيجة',
      technicalNotes: 'ملاحظات تقنية',
      overview: 'نظرة عامة',
      notFound: 'هذا الملف غير موجود.',
    },
    links: {
      github: 'مستودع GitHub',
      live: 'الموقع المباشر',
      googlePlay: 'Google Play',
      testFlight: 'TestFlight',
    },
  },

  skills: {
    lede: 'خريطة قدرات مرتّبة حسب التخصص. الاختيار هنا مؤشّر تركيز وليس تقييماً رقمياً، وكل قدرة تشير إلى العمل الذي يدعمها.',
    mapLabel: 'خريطة القدرات',
    listLabel: 'قائمة القدرات',
    keyboardHint: 'استخدم مفاتيح الأسهم للتنقل بين التخصصات، أو Tab وEnter.',
    evidenceLabel: 'الدليل',
    noEvidence: 'مشروع الدليل معلّق.',
    focusLabel: 'التركيز',
    inCategory: 'في هذا التخصص',
    selectDiscipline: 'اختر تخصصاً',
  },

  leadership: {
    lede: 'المسؤوليات التي تولّاها، بالترتيب.',
    current: 'مستمر',
    responsibilitiesLabel: 'المسؤوليات',
    timelineLabel: 'الخط الزمني للقيادة والتعليم',
  },

  education: {
    degreeLabel: 'الدرجة العلمية',
    certificationsLabel: 'الشهادات',
    issuerLabel: 'الجهة المانحة',
    yearLabel: 'السنة',
  },

  spotlight: {
    focusLabel: 'مجالات التركيز',
    pendingLabel: 'لم يُؤكَّد بعد',
    relatedLabel: 'أعمال ذات صلة',
    deviceCaption: 'لقطات الشاشة معلّقة',
    modelCaption: 'بنية النموذج — توضيحية وليست نتيجة',
  },

  contact: {
    lede: 'للاستفسارات أو التعاون أو العمل على المشاريع. تُنشر هنا القنوات المؤكّدة فقط.',
    directLabel: 'روابط مباشرة',
    pendingLabel: 'بيانات تواصل معلّقة',
    pendingHint: 'تُنشر هذه القنوات بعد أن يؤكدها محمد.',
    form: {
      legend: 'أرسل رسالة',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      namePlaceholder: 'اسمك',
      emailPlaceholder: 'you@example.com',
      messagePlaceholder: 'ما الذي تودّ بناءه أو مناقشته؟',
      required: 'مطلوب',
      errorName: 'من فضلك اكتب اسمك.',
      errorEmail: 'من فضلك اكتب بريداً إلكترونياً صحيحاً.',
      errorMessage: 'من فضلك اكتب رسالة قصيرة.',
      errorSummary: 'النموذج به أخطاء. راجع الحقول بالأسفل.',
      unavailableTitle: 'إرسال الرسائل غير مفعّل بعد',
      unavailableBody:
        'هذا النموذج يتحقق من المدخلات لكنه غير موصول بخادم، لأن عنوان الاستقبال لم يُؤكَّد بعد. استخدم حساب GitHub بالأسفل في الوقت الحالي.',
    },
  },

  footer: {
    builtWith: 'مبني باستخدام Next.js وTypeScript وTailwind CSS وFramer Motion.',
    directionNote: 'الاتجاه البصري الجريء.',
    localeNote: 'الإنجليزية والعربية (من اليمين لليسار) والسويدية.',
    rights: 'كل الحقوق محفوظة.',
  },

  fallback: {
    badge: 'EN',
    note: 'معروض بالإنجليزية — الترجمة معلّقة.',
  },

  notFound: {
    title: 'الصفحة غير موجودة',
    body: 'هذا المسار غير موجود في هذا الموقع.',
    action: 'العودة إلى الصفحة الرئيسية',
  },
}

export default ar
