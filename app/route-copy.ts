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
  technologyFallback: string;
  backToProjects: string;
  footerLine: string;
  status: Record<'coming' | 'development', string>;
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
    technologyFallback: 'Details to be confirmed',
    backToProjects: 'Back to projects',
    footerLine: 'Mohamed Amin · Software Engineer',
    status: { coming: 'Coming soon', development: 'In development' },
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
    technologyFallback: 'التفاصيل قيد التأكيد',
    backToProjects: 'العودة إلى المشاريع',
    footerLine: 'محمد أمين · مهندس برمجيات',
    status: { coming: 'قريبًا', development: 'قيد التطوير' },
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
    technologyFallback: 'Detaljer ska bekräftas',
    backToProjects: 'Tillbaka till projekten',
    footerLine: 'Mohamed Amin · Mjukvaruingenjör',
    status: { coming: 'Kommer snart', development: 'Under utveckling' },
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
