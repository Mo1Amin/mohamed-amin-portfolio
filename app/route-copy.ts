import type { Locale } from './copy';

/**
 * Copy for the routes outside the landing page (the projects index, the case
 * studies) and for the loading, error and not-found screens.
 *
 * These screens used to be English only, which meant an Arabic or Swedish
 * reader dropped back into English as soon as they opened a project.
 */
type RouteCopy = {
  backToPortfolio: string;
  allProjects: string;
  projectsEyebrow: string;
  projectsHead: [string, string];
  projectsIntro: string;
  statusLabel: string;
  roleLabel: string;
  storyEyebrow: string;
  storyHead: [string, string];
  techEyebrow: string;
  backToProjects: string;
  footerLine: string;
  status: Record<'coming' | 'development', string>;
  /** Index, case-study and technology copy, indexed like `projectEntries`. */
  indexTitles: string[];
  indexSummaries: string[];
  notes: string[];
  tech: string[][];
  caseSummaries: string[];
  loadingLabel: string;
  loading: string;
  notFoundEyebrow: string;
  notFoundHead: [string, string];
  notFoundCopy: string;
  notFoundAction: string;
  errorEyebrow: string;
  errorHead: [string, string];
  errorCopy: string;
  errorAction: string;
};

export const routeCopy: Record<Locale, RouteCopy> = {
  en: {
    backToPortfolio: 'Back to portfolio',
    allProjects: 'All projects',
    projectsEyebrow: '01 / Selected work',
    projectsHead: ['Projects that', 'make ideas tangible.'],
    projectsIntro: 'Every project is a chance to connect a human problem with a thoughtful interface and the engineering underneath.',
    statusLabel: 'STATUS',
    roleLabel: 'MY ROLE',
    storyEyebrow: '01 / The story',
    storyHead: ['Evidence first.', 'Details when ready.'],
    techEyebrow: '02 / Technologies',
    backToProjects: 'Back to projects',
    footerLine: 'Mohamed Amin · Software Engineer',
    status: { coming: 'Coming soon', development: 'In development' },
    indexTitles: ['Med Notes', 'MyQat', 'SU ACM official website', 'Fitness × Intelligence'],
    indexSummaries: [
      'A project in preparation. The story, role, and verified links will be added before publication.',
      'A project in preparation. The story, role, and verified links will be added before publication.',
      'The digital home for the student chapter Mohamed founded and supports through its official web work.',
      'A Flutter application and complete machine learning model for fitness and health, led as an A+ graduation project.',
    ],
    notes: [
      'This project remains unpublished until its content is verified.',
      'This project remains unpublished until its content is verified.',
      'Live URL and implementation details will be added after verification.',
      'GitHub and Google Play releases are planned.',
    ],
    tech: [
      ['Details to be confirmed'],
      ['Details to be confirmed'],
      ['Web stack to be confirmed'],
      ['Flutter', 'Machine Learning', 'Fitness and Health'],
    ],
    caseSummaries: [
      'The full case study is being prepared. Verified project information will be published when the repository and media are ready.',
      'The full case study is being prepared. Verified project information will be published when the repository and media are ready.',
      'A digital home for the SU ACM Student Chapter, founded by Mohamed Amin. The project reflects his responsibility for the official website and web activities.',
      'A Flutter mobile application and machine learning model for fitness and health. Mohamed led the team, and the project received an A+ result.',
    ],
    loadingLabel: 'Loading portfolio',
    loading: 'Loading the next chapter',
    notFoundEyebrow: 'This page is still being built',
    notFoundHead: ['Nothing here', 'yet.'],
    notFoundCopy: 'The project may be private, coming soon, or the link may have changed.',
    notFoundAction: 'Return to the portfolio',
    errorEyebrow: 'Something interrupted this page',
    errorHead: ['This part', 'did not load.'],
    errorCopy: 'The rest of the portfolio is unaffected. Try again, or return to the landing page.',
    errorAction: 'Try again',
  },

  ar: {
    backToPortfolio: 'العودة إلى الموقع',
    allProjects: 'كل المشاريع',
    projectsEyebrow: '٠١ / مشاريع مختارة',
    projectsHead: ['مشاريع تحوّل الأفكار', 'إلى تجربة ملموسة.'],
    projectsIntro: 'كل مشروع فرصة لربط مشكلة إنسانية بواجهة مدروسة وبالهندسة التي تقف خلفها.',
    statusLabel: 'الحالة',
    roleLabel: 'دوري',
    storyEyebrow: '٠١ / القصة',
    storyHead: ['الدليل أولاً.', 'والتفاصيل حين تجهز.'],
    techEyebrow: '٠٢ / التقنيات',
    backToProjects: 'العودة إلى المشاريع',
    footerLine: 'محمد أمين · مهندس برمجيات',
    status: { coming: 'قريبًا', development: 'قيد التطوير' },
    indexTitles: ['Med Notes', 'MyQat', 'الموقع الرسمي لـ SU ACM', 'اللياقة × الذكاء'],
    indexSummaries: [
      'مشروع قيد الإعداد. ستُضاف القصة والدور والروابط الموثقة قبل النشر.',
      'مشروع قيد الإعداد. ستُضاف القصة والدور والروابط الموثقة قبل النشر.',
      'البيت الرقمي للفرع الطلابي الذي أسسه محمد ويدعمه من خلال عمله على الموقع الرسمي.',
      'تطبيق Flutter ونموذج تعلم آلي متكامل للياقة والصحة، قاده كمشروع تخرج بتقدير A+.',
    ],
    notes: [
      'يبقى هذا المشروع غير منشور حتى يتم التحقق من محتواه.',
      'يبقى هذا المشروع غير منشور حتى يتم التحقق من محتواه.',
      'سيُضاف رابط الموقع وتفاصيل التنفيذ بعد التحقق منها.',
      'يُخطط لنشر المشروع على GitHub وGoogle Play.',
    ],
    tech: [
      ['التفاصيل قيد التأكيد'],
      ['التفاصيل قيد التأكيد'],
      ['تقنيات الويب قيد التأكيد'],
      ['Flutter', 'التعلم الآلي', 'اللياقة والصحة'],
    ],
    caseSummaries: [
      'يجري إعداد تفاصيل المشروع كاملة. ستُنشر المعلومات الموثقة عندما يصبح المستودع والمواد جاهزة.',
      'يجري إعداد تفاصيل المشروع كاملة. ستُنشر المعلومات الموثقة عندما يصبح المستودع والمواد جاهزة.',
      'بيت رقمي لفرع SU ACM الطلابي الذي أسسه محمد أمين، ويعكس مسؤوليته عن الموقع الرسمي وأنشطة الويب.',
      'تطبيق موبايل بـ Flutter ونموذج تعلم آلي للياقة والصحة. قاد محمد الفريق، وحصل المشروع على تقدير A+.',
    ],
    loadingLabel: 'جارٍ تحميل الموقع',
    loading: 'جارٍ تحميل الفصل التالي',
    notFoundEyebrow: 'هذه الصفحة ما زالت قيد البناء',
    notFoundHead: ['لا شيء هنا', 'حتى الآن.'],
    notFoundCopy: 'قد يكون المشروع خاصًا أو لم يُنشر بعد، أو تغيّر الرابط.',
    notFoundAction: 'العودة إلى الموقع',
    errorEyebrow: 'حدث ما قطع تحميل الصفحة',
    errorHead: ['هذا الجزء', 'لم يتم تحميله.'],
    errorCopy: 'بقية الموقع تعمل بشكل طبيعي. أعد المحاولة أو ارجع إلى الصفحة الرئيسية.',
    errorAction: 'إعادة المحاولة',
  },

  sv: {
    backToPortfolio: 'Tillbaka till portfolion',
    allProjects: 'Alla projekt',
    projectsEyebrow: '01 / Utvalda projekt',
    projectsHead: ['Projekt som gör', 'idéer greppbara.'],
    projectsIntro: 'Varje projekt är en chans att förena ett mänskligt problem med ett genomtänkt gränssnitt och tekniken under det.',
    statusLabel: 'STATUS',
    roleLabel: 'MIN ROLL',
    storyEyebrow: '01 / Berättelsen',
    storyHead: ['Bevis först.', 'Detaljer när de finns.'],
    techEyebrow: '02 / Teknik',
    backToProjects: 'Tillbaka till projekten',
    footerLine: 'Mohamed Amin · Mjukvaruingenjör',
    status: { coming: 'Kommer snart', development: 'Under utveckling' },
    indexTitles: ['Med Notes', 'MyQat', 'SU ACM:s officiella webbplats', 'Träning × Intelligens'],
    indexSummaries: [
      'Ett projekt under förberedelse. Berättelsen, rollen och verifierade länkar läggs till före publicering.',
      'Ett projekt under förberedelse. Berättelsen, rollen och verifierade länkar läggs till före publicering.',
      'Det digitala hemmet för studentföreningen som Mohamed grundade och stödjer genom dess officiella webbarbete.',
      'En Flutter-app och en komplett maskininlärningsmodell för träning och hälsa, ledd som ett examensprojekt med betyget A+.',
    ],
    notes: [
      'Projektet förblir opublicerat tills innehållet är verifierat.',
      'Projektet förblir opublicerat tills innehållet är verifierat.',
      'Live-URL och implementationsdetaljer läggs till efter verifiering.',
      'Publicering på GitHub och Google Play planeras.',
    ],
    tech: [
      ['Detaljer ska bekräftas'],
      ['Detaljer ska bekräftas'],
      ['Webbstack ska bekräftas'],
      ['Flutter', 'Maskininlärning', 'Träning och hälsa'],
    ],
    caseSummaries: [
      'Den fullständiga projektbeskrivningen förbereds. Verifierad information publiceras när repot och materialet är klart.',
      'Den fullständiga projektbeskrivningen förbereds. Verifierad information publiceras när repot och materialet är klart.',
      'Ett digitalt hem för SU ACM Student Chapter, grundad av Mohamed Amin. Projektet speglar hans ansvar för den officiella webbplatsen och webbarbetet.',
      'En Flutter-app och en maskininlärningsmodell för träning och hälsa. Mohamed ledde teamet och projektet fick betyget A+.',
    ],
    loadingLabel: 'Laddar portfolion',
    loading: 'Laddar nästa kapitel',
    notFoundEyebrow: 'Den här sidan byggs fortfarande',
    notFoundHead: ['Inget här', 'ännu.'],
    notFoundCopy: 'Projektet kan vara privat, på väg, eller så har länken ändrats.',
    notFoundAction: 'Tillbaka till portfolion',
    errorEyebrow: 'Något avbröt sidan',
    errorHead: ['Den här delen', 'laddades inte.'],
    errorCopy: 'Resten av portfolion påverkas inte. Försök igen eller gå tillbaka till startsidan.',
    errorAction: 'Försök igen',
  },
};
