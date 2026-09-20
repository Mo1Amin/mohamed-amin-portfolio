import type { LeadershipEntry } from './types'

/** Initial leadership entries listed in docs/CONTENT_MODEL.md. */
export const leadershipEntries: LeadershipEntry[] = [
  {
    id: 'su-acm-founder',
    order: 1,
    current: true,
    title: { en: 'Founder', ar: 'مؤسس', sv: 'Grundare' },
    organization: {
      en: 'SU ACM Student Chapter',
      ar: 'فرع ACM الطلابي — جامعة سيناء',
      sv: 'SU ACM Student Chapter',
    },
    periodLabel: { en: 'Ongoing', ar: 'مستمر', sv: 'Pågående' },
    description: {
      en: 'Founded the SU ACM Student Chapter and built it into a community for students who want to practise engineering together.',
      ar: 'أسّس فرع ACM الطلابي بجامعة سيناء وحوّله إلى مجتمع للطلاب الراغبين في ممارسة الهندسة معاً.',
      sv: 'Grundade SU ACM Student Chapter och byggde upp den till en gemenskap för studenter som vill praktisera ingenjörsarbete tillsammans.',
    },
    responsibilities: {
      en: 'Establishing the chapter and leading its direction.',
      ar: 'تأسيس الفرع وقيادة اتجاهه.',
      sv: 'Att etablera chaptern och leda dess inriktning.',
    },
  },
  {
    id: 'su-acm-web',
    order: 2,
    current: true,
    title: {
      en: 'Official website and web responsibility',
      ar: 'مسؤول الموقع الرسمي وأنشطة الويب',
      sv: 'Ansvarig för webbplats och webbaktiviteter',
    },
    organization: {
      en: 'SU ACM Student Chapter',
      ar: 'فرع ACM الطلابي — جامعة سيناء',
      sv: 'SU ACM Student Chapter',
    },
    periodLabel: { en: 'Ongoing', ar: 'مستمر', sv: 'Pågående' },
    description: {
      en: 'Responsible for the chapter’s official website and its web activities.',
      ar: 'مسؤول عن الموقع الرسمي للفرع وأنشطته على الويب.',
      sv: 'Ansvarig för chapterns officiella webbplats och dess webbaktiviteter.',
    },
    responsibilities: {
      en: 'Owning the official website and running the chapter’s web presence.',
      ar: 'امتلاك مسؤولية الموقع الرسمي وإدارة حضور الفرع على الويب.',
      sv: 'Äger den officiella webbplatsen och driver chapterns webbnärvaro.',
    },
  },
  {
    id: 'graduation-team-leader',
    order: 3,
    current: false,
    title: { en: 'Team Leader', ar: 'قائد فريق', sv: 'Teamledare' },
    organization: {
      en: 'Graduation project team',
      ar: 'فريق مشروع التخرج',
      sv: 'Examensarbetets team',
    },
    periodLabel: {
      en: 'Graduation project',
      ar: 'مشروع التخرج',
      sv: 'Examensarbete',
    },
    description: {
      en: 'Led the team behind the graduation project: a Flutter mobile application with a complete machine learning model for fitness and health. The project received an A+ grade.',
      ar: 'قاد الفريق الذي نفّذ مشروع التخرج: تطبيق موبايل بـ Flutter مع نموذج تعلّم آلة متكامل للياقة والصحة. وحصل المشروع على تقدير A+.',
      sv: 'Ledde teamet bakom examensarbetet: en Flutter-mobilapp med en komplett maskininlärningsmodell för träning och hälsa. Projektet fick betyget A+.',
    },
    responsibilities: {
      en: 'Team leadership and technical lead for the project.',
      ar: 'قيادة الفريق والمسؤولية التقنية عن المشروع.',
      sv: 'Teamledning och tekniskt ansvar för projektet.',
    },
  },
]
