import type { Project } from './types'

/**
 * Seed data from docs/PROJECT_DATA.md.
 *
 * Rule for this file: a field is either sourced from that document or it is
 * listed in `pendingInformation`. Nothing is filled in to make a card look
 * complete.
 */
export const projects: Project[] = [
  {
    id: 'med-notes',
    slug: 'med-notes',
    title: { en: 'Med Notes', ar: 'Med Notes', sv: 'Med Notes' },
    shortSummary: {
      en: 'A project Mohamed named as featured work. The description, role, stack, and links have not been supplied yet.',
      ar: 'مشروع ذكره محمد ضمن أعماله المميّزة. الوصف والدور والتقنيات والروابط لم تُستلم بعد.',
      sv: 'Ett projekt som Mohamed lyft fram. Beskrivning, roll, teknik och länkar saknas ännu.',
    },
    technologies: [],
    category: ['mobile', 'product'],
    status: 'pending',
    featured: true,
    order: 1,
    links: {},
    media: [],
    pendingInformation: [
      { en: 'Project description', ar: 'وصف المشروع', sv: 'Projektbeskrivning' },
      { en: 'Role', ar: 'الدور', sv: 'Roll' },
      { en: 'Technology stack', ar: 'التقنيات المستخدمة', sv: 'Teknikstack' },
      { en: 'Screenshots', ar: 'لقطات الشاشة', sv: 'Skärmbilder' },
      { en: 'GitHub and live links', ar: 'روابط GitHub والموقع', sv: 'GitHub- och live-länkar' },
    ],
  },

  {
    id: 'myqat',
    slug: 'myqat',
    title: { en: 'MyQat', ar: 'MyQat', sv: 'MyQat' },
    shortSummary: {
      en: 'A project Mohamed named as featured work. The description, role, stack, and links have not been supplied yet.',
      ar: 'مشروع ذكره محمد ضمن أعماله المميّزة. الوصف والدور والتقنيات والروابط لم تُستلم بعد.',
      sv: 'Ett projekt som Mohamed lyft fram. Beskrivning, roll, teknik och länkar saknas ännu.',
    },
    technologies: [],
    category: ['web', 'product'],
    status: 'pending',
    featured: true,
    order: 2,
    links: {},
    media: [],
    pendingInformation: [
      { en: 'Project description', ar: 'وصف المشروع', sv: 'Projektbeskrivning' },
      { en: 'Role', ar: 'الدور', sv: 'Roll' },
      { en: 'Technology stack', ar: 'التقنيات المستخدمة', sv: 'Teknikstack' },
      { en: 'Screenshots', ar: 'لقطات الشاشة', sv: 'Skärmbilder' },
      { en: 'GitHub and live links', ar: 'روابط GitHub والموقع', sv: 'GitHub- och live-länkar' },
    ],
  },

  {
    id: 'su-acm-website',
    slug: 'su-acm-website',
    title: {
      en: 'SU ACM official website',
      ar: 'الموقع الرسمي لفرع ACM الطلابي',
      sv: 'SU ACM:s officiella webbplats',
    },
    shortSummary: {
      en: 'The official website and web presence of the SU ACM Student Chapter, which Mohamed founded and is responsible for.',
      ar: 'الموقع الرسمي والحضور الإلكتروني لفرع ACM الطلابي الذي أسّسه محمد وهو المسؤول عنه.',
      sv: 'Den officiella webbplatsen och webbnärvaron för SU ACM Student Chapter, som Mohamed grundade och ansvarar för.',
    },
    role: {
      en: 'Founder of the chapter and responsible for the official website and web activities.',
      ar: 'مؤسس الفرع والمسؤول عن الموقع الرسمي وأنشطة الويب.',
      sv: 'Grundare av chaptern och ansvarig för den officiella webbplatsen och webbaktiviteterna.',
    },
    caseStudy: {
      responsibilities: {
        en: 'Founding the chapter, owning the official website, and running the chapter web activities.',
        ar: 'تأسيس الفرع، وامتلاك مسؤولية الموقع الرسمي، وإدارة أنشطة الفرع على الويب.',
        sv: 'Grundade chaptern, äger den officiella webbplatsen och driver chapterns webbaktiviteter.',
      },
    },
    technologies: [],
    category: ['web', 'leadership'],
    status: 'in_development',
    featured: true,
    order: 3,
    links: {},
    media: [],
    pendingInformation: [
      { en: 'Technology stack', ar: 'التقنيات المستخدمة', sv: 'Teknikstack' },
      { en: 'Design decisions', ar: 'قرارات التصميم', sv: 'Designbeslut' },
      { en: 'Current status detail', ar: 'تفاصيل الحالة الحالية', sv: 'Aktuell statusbeskrivning' },
      { en: 'Live URL confirmation', ar: 'تأكيد رابط الموقع', sv: 'Bekräftad live-URL' },
    ],
  },

  {
    id: 'graduation-ml-fitness-health',
    slug: 'graduation-ml-fitness-health',
    title: {
      en: 'Graduation ML fitness and health application',
      ar: 'تطبيق التخرج للياقة والصحة بتعلّم الآلة',
      sv: 'Examensarbete: ML-app för träning och hälsa',
    },
    shortSummary: {
      en: 'A Flutter mobile application with a complete machine learning model for fitness and health. Team-led graduation project, graded A+.',
      ar: 'تطبيق موبايل بـ Flutter مع نموذج تعلّم آلة متكامل للياقة والصحة. مشروع تخرج بقيادة فريق، حصل على تقدير A+.',
      sv: 'En Flutter-mobilapp med en komplett maskininlärningsmodell för träning och hälsa. Examensarbete som teamledare, betyg A+.',
    },
    role: {
      en: 'Team Leader and technical lead.',
      ar: 'قائد الفريق والمسؤول التقني.',
      sv: 'Teamledare och teknisk ledare.',
    },
    caseStudy: {
      responsibilities: {
        en: 'Led the graduation project team as Team Leader and technical lead.',
        ar: 'قاد فريق مشروع التخرج كقائد للفريق ومسؤول تقني.',
        sv: 'Ledde examensarbetets team som teamledare och teknisk ledare.',
      },
      outcome: {
        en: 'The graduation project received an A+ grade.',
        ar: 'حصل مشروع التخرج على تقدير A+.',
        sv: 'Examensarbetet fick betyget A+.',
      },
    },
    technologies: [
      { id: 'flutter', label: 'Flutter', source: 'confirmed' },
      { id: 'ml-model', label: 'Machine learning model', source: 'confirmed' },
    ],
    category: ['mobile', 'ai_ml'],
    status: 'coming_soon',
    featured: true,
    order: 4,
    links: {},
    media: [],
    pendingInformation: [
      { en: 'Model purpose and data source', ar: 'هدف النموذج ومصدر البيانات', sv: 'Modellens syfte och datakälla' },
      { en: 'Evaluation method', ar: 'طريقة التقييم', sv: 'Utvärderingsmetod' },
      { en: 'Application features', ar: 'مميزات التطبيق', sv: 'Appens funktioner' },
      { en: 'Screenshots', ar: 'لقطات الشاشة', sv: 'Skärmbilder' },
      {
        en: 'GitHub and Google Play links, both pending publication',
        ar: 'روابط GitHub وGoogle Play، وكلاهما في انتظار النشر',
        sv: 'GitHub- och Google Play-länkar, båda inväntar publicering',
      },
    ],
  },

  {
    id: 'flight-web',
    slug: 'flight-web',
    title: { en: 'Flight Web', ar: 'Flight Web', sv: 'Flight Web' },
    shortSummary: {
      en: 'Flight booking, hotels, and rental cars at competitive prices.',
      ar: 'حجز الطيران والفنادق وتأجير السيارات بأسعار تنافسية.',
      sv: 'Flygbokning, hotell och hyrbilar till konkurrenskraftiga priser.',
    },
    technologies: [
      { id: 'html', label: 'HTML', source: 'cv' },
      { id: 'css', label: 'CSS', source: 'cv' },
      { id: 'javascript', label: 'JavaScript', source: 'cv' },
    ],
    category: ['web'],
    status: 'private',
    featured: false,
    order: 5,
    links: {},
    media: [],
    pendingInformation: [
      { en: 'Role', ar: 'الدور', sv: 'Roll' },
      { en: 'Links', ar: 'الروابط', sv: 'Länkar' },
    ],
  },

  {
    id: 'speed-store',
    slug: 'speed-store',
    title: { en: 'Speed Store', ar: 'Speed Store', sv: 'Speed Store' },
    shortSummary: {
      en: 'A store for games and in-game items.',
      ar: 'متجر للألعاب والعناصر داخل الألعاب.',
      sv: 'En butik för spel och föremål i spel.',
    },
    technologies: [
      { id: 'html', label: 'HTML', source: 'cv' },
      { id: 'css', label: 'CSS', source: 'cv' },
      { id: 'javascript', label: 'JavaScript', source: 'cv' },
      { id: 'nodejs', label: 'Node.js', source: 'cv' },
      { id: 'mysql', label: 'MySQL', source: 'cv' },
    ],
    category: ['web', 'backend'],
    status: 'private',
    featured: false,
    order: 6,
    links: {},
    media: [],
    pendingInformation: [
      { en: 'Role', ar: 'الدور', sv: 'Roll' },
      { en: 'Links', ar: 'الروابط', sv: 'Länkar' },
    ],
  },

  {
    id: 'spark-motors',
    slug: 'spark-motors',
    title: { en: 'Spark Motors', ar: 'Spark Motors', sv: 'Spark Motors' },
    shortSummary: {
      en: 'Selling cars and editing information related to cars and motorcycles.',
      ar: 'بيع السيارات وتحرير المعلومات المتعلقة بالسيارات والدراجات النارية.',
      sv: 'Försäljning av bilar och redigering av information om bilar och motorcyklar.',
    },
    technologies: [
      { id: 'html', label: 'HTML', source: 'cv' },
      { id: 'css', label: 'CSS', source: 'cv' },
      { id: 'javascript', label: 'JavaScript', source: 'cv' },
    ],
    category: ['web'],
    status: 'private',
    featured: false,
    order: 7,
    links: {},
    media: [],
    pendingInformation: [
      { en: 'Role', ar: 'الدور', sv: 'Roll' },
      { en: 'Links', ar: 'الروابط', sv: 'Länkar' },
    ],
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getProjectsByIds(ids: string[]): Project[] {
  return ids
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project))
}
