import type { SiteProfile } from './types'

/**
 * Facts here come from docs/DESIGN_BRIEF.md, docs/CONTENT_MODEL.md, and
 * docs/PROJECT_DATA.md. Nothing is added that those documents do not state.
 */
export const siteProfile: SiteProfile = {
  displayName: 'Mohamed Amin Abdel Wahed',

  role: {
    en: 'Software Engineer building web, mobile, and AI products.',
    ar: 'مهندس برمجيات يبني منتجات للويب والموبايل والذكاء الاصطناعي.',
    sv: 'Mjukvaruingenjör som bygger produkter för webb, mobil och AI.',
  },

  headlineLines: {
    en: ['Software Engineer', 'building web, mobile,', 'and AI products.'],
    ar: ['مهندس برمجيات', 'يبني منتجات للويب', 'والموبايل والذكاء الاصطناعي.'],
    sv: ['Mjukvaruingenjör', 'som bygger webb, mobil', 'och AI-produkter.'],
  },

  shortBio: {
    en: 'Fresh Software Engineering graduate, founder, team leader, and builder of practical digital products.',
    ar: 'خريج هندسة برمجيات حديث، ومؤسس، وقائد فريق، وباني منتجات رقمية عملية.',
    sv: 'Nyexaminerad mjukvaruingenjör, grundare, teamledare och byggare av praktiska digitala produkter.',
  },

  longBio: {
    en: 'Mohamed Amin Abdel Wahed is a fresh Software Engineering graduate. He founded the SU ACM Student Chapter and is responsible for its official website and web activities. He led the team behind an A+ graduation project: a Flutter mobile application with a complete machine learning model for fitness and health. His project work spans frontend, backend, testing, mobile, AI and machine learning, and web operations, with an ongoing personal interest in cybersecurity.',
    ar: 'محمد أمين عبد الواحد خريج هندسة برمجيات حديث. أسّس فرع ACM الطلابي بجامعة سيناء وهو المسؤول عن موقعه الرسمي وأنشطته على الويب. قاد الفريق الذي نفّذ مشروع التخرج الحاصل على تقدير A+: تطبيق موبايل بـ Flutter مع نموذج تعلّم آلة متكامل للياقة والصحة. تمتد أعماله عبر الواجهات الأمامية والخلفية والاختبار والموبايل والذكاء الاصطناعي وتشغيل الويب، مع اهتمام شخصي مستمر بالأمن السيبراني.',
    sv: 'Mohamed Amin Abdel Wahed är nyexaminerad mjukvaruingenjör. Han grundade SU ACM Student Chapter och ansvarar för dess officiella webbplats och webbaktiviteter. Han ledde teamet bakom ett examensarbete med betyget A+: en Flutter-mobilapp med en komplett maskininlärningsmodell för träning och hälsa. Hans projektarbete sträcker sig över frontend, backend, testning, mobil, AI och maskininlärning samt webbdrift, med ett pågående personligt intresse för cybersäkerhet.',
  },

  availability: {
    en: 'Fresh Software Engineering graduate',
    ar: 'خريج هندسة برمجيات حديث',
    sv: 'Nyexaminerad mjukvaruingenjör',
  },

  socialLinks: [
    {
      id: 'github',
      label: { en: 'GitHub', ar: 'GitHub', sv: 'GitHub' },
      url: 'https://github.com/Mo1Amin',
      icon: 'github',
      order: 1,
    },
  ],

  proofPoints: [
    {
      id: 'founder',
      label: { en: 'Founder', ar: 'مؤسس', sv: 'Grundare' },
      value: {
        en: 'SU ACM Student Chapter',
        ar: 'فرع ACM الطلابي — جامعة سيناء',
        sv: 'SU ACM Student Chapter',
      },
    },
    {
      id: 'web-lead',
      label: { en: 'Web responsibility', ar: 'مسؤول الويب', sv: 'Webbansvar' },
      value: {
        en: 'Official chapter website and web activities',
        ar: 'الموقع الرسمي للفرع وأنشطته على الويب',
        sv: 'Chapterns officiella webbplats och webbaktiviteter',
      },
    },
    {
      id: 'team-leader',
      label: { en: 'Team leader', ar: 'قائد فريق', sv: 'Teamledare' },
      value: {
        en: 'Graduation project team',
        ar: 'فريق مشروع التخرج',
        sv: 'Examensarbetets team',
      },
    },
    {
      id: 'grade',
      label: { en: 'A+ result', ar: 'تقدير A+', sv: 'Betyg A+' },
      value: {
        en: 'Flutter application with a machine learning model',
        ar: 'تطبيق Flutter مع نموذج تعلّم آلة',
        sv: 'Flutter-app med en maskininlärningsmodell',
      },
    },
  ],

  disciplines: [
    { en: 'Frontend', ar: 'الواجهة الأمامية', sv: 'Frontend' },
    { en: 'Backend', ar: 'الواجهة الخلفية', sv: 'Backend' },
    { en: 'Testing', ar: 'الاختبار', sv: 'Testning' },
    { en: 'Mobile', ar: 'الموبايل', sv: 'Mobil' },
    { en: 'AI / ML', ar: 'الذكاء الاصطناعي', sv: 'AI / ML' },
    { en: 'Web operations', ar: 'تشغيل الويب', sv: 'Webbdrift' },
  ],

  pendingContactDetails: [
    {
      en: 'Preferred contact email',
      ar: 'البريد الإلكتروني المفضّل للتواصل',
      sv: 'Föredragen kontaktadress',
    },
    {
      en: 'Official social links beyond GitHub',
      ar: 'روابط التواصل الرسمية بخلاف GitHub',
      sv: 'Officiella sociala länkar utöver GitHub',
    },
    {
      en: 'Resume file for download',
      ar: 'ملف السيرة الذاتية للتحميل',
      sv: 'CV-fil för nedladdning',
    },
  ],
}
