import type { Locale } from './copy';

export type TranslationMap = Record<Locale, string>;
export type ProjectStatus = 'published' | 'coming_soon' | 'private' | 'in_development';
export type ProjectCategory = 'web' | 'backend' | 'mobile' | 'ai_ml' | 'product' | 'leadership';

export type ProjectContent = {
  id: string;
  slug: string;
  title: TranslationMap;
  shortSummary: TranslationMap;
  caseNote: TranslationMap;
  role: TranslationMap;
  technologies: string[];
  category: ProjectCategory[];
  status: ProjectStatus;
  featured: boolean;
  order: number;
  links: { github?: string; live?: string; googlePlay?: string; testFlight?: string };
  media: { id: string; url: string; alt: TranslationMap; type: 'image' | 'video' | 'embed' }[];
};

const text = (en: string, ar = en, sv = en): TranslationMap => ({ en, ar, sv });

/** Factual seed data. Empty links and media stay empty until Mohamed confirms them. */
export const projectCatalog: ProjectContent[] = [
  {
    id: 'med-notes', slug: 'med-notes', title: text('Med Notes'),
    shortSummary: text('Project details are being prepared.'), caseNote: text('This project remains unpublished until its content is verified.'), role: text('Details to be confirmed.'),
    technologies: [], category: ['mobile', 'product'], status: 'coming_soon', featured: true, order: 1,
    links: {}, media: [],
  },
  {
    id: 'myqat', slug: 'myqat', title: text('MyQat'),
    shortSummary: text('Project details are being prepared.'), caseNote: text('This project remains unpublished until its content is verified.'), role: text('Details to be confirmed.'),
    technologies: [], category: ['web', 'product'], status: 'coming_soon', featured: true, order: 2,
    links: {}, media: [],
  },
  {
    id: 'su-acm-website', slug: 'su-acm-website', title: text('SU ACM official website', 'الموقع الرسمي لـ SU ACM', 'SU ACM:s officiella webbplats'),
    shortSummary: text('The digital home for the student chapter Mohamed founded and supports through its official web work.', 'البيت الرقمي للفرع الطلابي الذي أسسه محمد ويدعمه من خلال عمله على الموقع الرسمي.', 'Det digitala hemmet för studentföreningen som Mohamed grundade och stödjer genom dess officiella webbarbete.'),
    caseNote: text('Live URL and implementation details will be added after verification.', 'سيُضاف رابط الموقع وتفاصيل التنفيذ بعد التحقق منها.', 'Live-URL och implementationsdetaljer läggs till efter verifiering.'),
    role: text('Founder and responsible for the official website and web activities.', 'مؤسس الفرع ومسؤول الموقع الرسمي وأنشطة الويب.', 'Grundare och ansvarig för den officiella webbplatsen och webbarbetet.'),
    technologies: [], category: ['web', 'leadership'], status: 'in_development', featured: true, order: 3,
    links: {}, media: [],
  },
  {
    id: 'graduation-ml-fitness-health', slug: 'graduation-ml-fitness-health', title: text('Fitness × Intelligence', 'اللياقة × الذكاء', 'Träning × Intelligens'),
    shortSummary: text('A Flutter application and machine learning model for fitness and health, led as an A+ graduation project.', 'تطبيق Flutter ونموذج تعلم آلي للياقة والصحة، قاده كمشروع تخرج بتقدير A+.', 'En Flutter-app och maskininlärningsmodell för träning och hälsa, ledd som ett examensprojekt med betyget A+.'),
    caseNote: text('GitHub and Google Play releases are planned.', 'يُخطط لنشر المشروع على GitHub وGoogle Play.', 'Publicering på GitHub och Google Play planeras.'),
    role: text('Team leader. The project received an A+ grade.', 'قائد الفريق. حصل المشروع على تقدير A+.', 'Teamledare. Projektet fick betyget A+.'),
    technologies: ['Flutter', 'Machine Learning', 'Fitness and Health'], category: ['mobile', 'ai_ml'], status: 'coming_soon', featured: true, order: 4,
    links: {}, media: [],
  },
  {
    id: 'flight-web', slug: 'flight-web', title: text('Flight Web'),
    shortSummary: text('Flight booking, hotels, and rental cars at competitive prices.'), caseNote: text('This project is private and is not returned by public queries.'), role: text('Details to be confirmed.'),
    technologies: ['HTML', 'CSS', 'JavaScript'], category: ['web'], status: 'private', featured: false, order: 5,
    links: {}, media: [],
  },
  {
    id: 'speed-store', slug: 'speed-store', title: text('Speed Store'),
    shortSummary: text('A store for games and in-game items.'), caseNote: text('This project is private and is not returned by public queries.'), role: text('Details to be confirmed.'),
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MySQL'], category: ['web', 'backend'], status: 'private', featured: false, order: 6,
    links: {}, media: [],
  },
  {
    id: 'spark-motors', slug: 'spark-motors', title: text('Spark Motors'),
    shortSummary: text('A website for selling cars and editing information about cars and motorcycles.'), caseNote: text('This project is private and is not returned by public queries.'), role: text('Details to be confirmed.'),
    technologies: ['HTML', 'CSS', 'JavaScript'], category: ['web'], status: 'private', featured: false, order: 7,
    links: {}, media: [],
  },
];

export const projectStatusLabels: Record<ProjectStatus, string> = {
  published: 'Published',
  coming_soon: 'Coming Soon',
  private: 'Private',
  in_development: 'In Development',
};
