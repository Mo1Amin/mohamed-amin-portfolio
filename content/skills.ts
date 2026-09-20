import type { Skill, SkillCategory, SkillCategoryId } from './types'

/**
 * Capability data from the "Initial skill categories" section of
 * docs/PROJECT_DATA.md. Evidence links point at projects that document the
 * capability; where the documents give no evidence, the list stays empty rather
 * than guessing.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'web',
    order: 1,
    glyph: '</>',
    label: { en: 'Web', ar: 'الويب', sv: 'Webb' },
    summary: {
      en: 'Interface work: markup, styling, component architecture, and accessible responsive layouts.',
      ar: 'العمل على الواجهات: البناء والتنسيق ومعمارية المكوّنات وتخطيطات متجاوبة وسهلة الوصول.',
      sv: 'Gränssnittsarbete: markup, styling, komponentarkitektur och tillgängliga responsiva layouter.',
    },
  },
  {
    id: 'backend',
    order: 2,
    glyph: '[db]',
    label: { en: 'Backend and data', ar: 'الخلفية والبيانات', sv: 'Backend och data' },
    summary: {
      en: 'Server-side code and relational data, from REST endpoints to SQL schemas.',
      ar: 'كود جانب الخادم والبيانات العلائقية، من واجهات REST إلى مخططات SQL.',
      sv: 'Serverkod och relationsdata, från REST-endpoints till SQL-scheman.',
    },
  },
  {
    id: 'mobile',
    order: 3,
    glyph: '▮',
    label: { en: 'Mobile', ar: 'الموبايل', sv: 'Mobil' },
    summary: {
      en: 'Cross-platform application development with Flutter for iOS and Android.',
      ar: 'تطوير تطبيقات متعددة المنصات باستخدام Flutter لنظامي iOS وAndroid.',
      sv: 'Plattformsoberoende apputveckling med Flutter för iOS och Android.',
    },
  },
  {
    id: 'ai_ml',
    order: 4,
    glyph: '∿',
    label: { en: 'AI and machine learning', ar: 'الذكاء الاصطناعي وتعلّم الآلة', sv: 'AI och maskininlärning' },
    summary: {
      en: 'Building a machine learning model and integrating it into a shipped application.',
      ar: 'بناء نموذج تعلّم آلة ودمجه داخل تطبيق حقيقي.',
      sv: 'Att bygga en maskininlärningsmodell och integrera den i en färdig app.',
    },
  },
  {
    id: 'testing',
    order: 5,
    glyph: '✓',
    label: { en: 'Testing and quality', ar: 'الاختبار والجودة', sv: 'Testning och kvalitet' },
    summary: {
      en: 'Manual and automated testing practice, backed by formal software quality training.',
      ar: 'ممارسة الاختبار اليدوي والآلي، مدعومة بتدريب رسمي في جودة البرمجيات.',
      sv: 'Manuell och automatiserad testning, med formell utbildning i mjukvarukvalitet.',
    },
  },
  {
    id: 'tools',
    order: 6,
    glyph: '⌘',
    label: { en: 'Tools and workflow', ar: 'الأدوات وسير العمل', sv: 'Verktyg och arbetsflöde' },
    summary: {
      en: 'Version control, Linux, and issue tracking as everyday working tools.',
      ar: 'إدارة الإصدارات ولينكس وتتبّع المهام كأدوات عمل يومية.',
      sv: 'Versionshantering, Linux och ärendehantering som dagliga arbetsverktyg.',
    },
  },
  {
    id: 'security',
    order: 7,
    glyph: '⌁',
    label: { en: 'Security', ar: 'الأمن', sv: 'Säkerhet' },
    summary: {
      en: 'Cybersecurity as an ongoing personal interest and study area, not professional experience.',
      ar: 'الأمن السيبراني كاهتمام شخصي ومجال دراسة مستمر، وليس خبرة مهنية.',
      sv: 'Cybersäkerhet som ett pågående personligt intresse och studieområde, inte yrkeserfarenhet.',
    },
  },
]

const focus = {
  evidence: {
    en: 'Project evidence',
    ar: 'مدعوم بمشروع',
    sv: 'Projektbevis',
  },
  practice: {
    en: 'Practised',
    ar: 'مُمارَس',
    sv: 'Använd',
  },
  learning: {
    en: 'Learning focus',
    ar: 'قيد التعلّم',
    sv: 'Lärfokus',
  },
  planned: {
    en: 'Planned for this portfolio',
    ar: 'مخطط له في هذا الموقع',
    sv: 'Planerad i denna portfolio',
  },
  interest: {
    en: 'Personal interest',
    ar: 'اهتمام شخصي',
    sv: 'Personligt intresse',
  },
}

const webEvidence = ['flight-web', 'speed-store', 'spark-motors']

export const skills: Skill[] = [
  // Web
  { id: 'html', category: 'web', order: 1, name: { en: 'HTML', ar: 'HTML', sv: 'HTML' }, levelLabel: focus.evidence, evidenceProjectIds: webEvidence },
  { id: 'css', category: 'web', order: 2, name: { en: 'CSS', ar: 'CSS', sv: 'CSS' }, levelLabel: focus.evidence, evidenceProjectIds: webEvidence },
  { id: 'javascript', category: 'web', order: 3, name: { en: 'JavaScript', ar: 'JavaScript', sv: 'JavaScript' }, levelLabel: focus.evidence, evidenceProjectIds: webEvidence },
  { id: 'react', category: 'web', order: 4, name: { en: 'React', ar: 'React', sv: 'React' }, levelLabel: focus.practice, evidenceProjectIds: [] },
  { id: 'typescript', category: 'web', order: 5, name: { en: 'TypeScript', ar: 'TypeScript', sv: 'TypeScript' }, levelLabel: focus.practice, evidenceProjectIds: [] },
  {
    id: 'responsive-ui',
    category: 'web',
    order: 6,
    name: { en: 'Responsive UI', ar: 'واجهات متجاوبة', sv: 'Responsivt gränssnitt' },
    levelLabel: focus.practice,
    evidenceProjectIds: [],
  },
  {
    id: 'accessibility',
    category: 'web',
    order: 7,
    name: { en: 'Accessibility', ar: 'إتاحة الوصول', sv: 'Tillgänglighet' },
    levelLabel: focus.practice,
    evidenceProjectIds: [],
  },
  {
    id: 'frontend-architecture',
    category: 'web',
    order: 8,
    name: { en: 'Frontend architecture', ar: 'معمارية الواجهة الأمامية', sv: 'Frontendarkitektur' },
    levelLabel: focus.practice,
    evidenceProjectIds: [],
  },

  // Backend and data
  { id: 'nodejs', category: 'backend', order: 1, name: { en: 'Node.js', ar: 'Node.js', sv: 'Node.js' }, levelLabel: focus.evidence, evidenceProjectIds: ['speed-store'] },
  { id: 'java', category: 'backend', order: 2, name: { en: 'Java', ar: 'Java', sv: 'Java' }, levelLabel: focus.practice, evidenceProjectIds: [] },
  { id: 'sql', category: 'backend', order: 3, name: { en: 'SQL', ar: 'SQL', sv: 'SQL' }, levelLabel: focus.practice, evidenceProjectIds: [] },
  { id: 'mysql', category: 'backend', order: 4, name: { en: 'MySQL', ar: 'MySQL', sv: 'MySQL' }, levelLabel: focus.evidence, evidenceProjectIds: ['speed-store'] },
  {
    id: 'rest-apis',
    category: 'backend',
    order: 5,
    name: { en: 'REST APIs', ar: 'واجهات REST', sv: 'REST-API:er' },
    levelLabel: focus.practice,
    evidenceProjectIds: [],
  },
  {
    id: 'postgres-supabase',
    category: 'backend',
    order: 6,
    name: { en: 'PostgreSQL / Supabase', ar: 'PostgreSQL / Supabase', sv: 'PostgreSQL / Supabase' },
    levelLabel: focus.planned,
    evidenceProjectIds: [],
  },

  // Mobile
  { id: 'flutter', category: 'mobile', order: 1, name: { en: 'Flutter', ar: 'Flutter', sv: 'Flutter' }, levelLabel: focus.evidence, evidenceProjectIds: ['graduation-ml-fitness-health'] },
  {
    id: 'ios-android',
    category: 'mobile',
    order: 2,
    name: { en: 'iOS and Android delivery', ar: 'النشر على iOS وAndroid', sv: 'Leverans för iOS och Android' },
    levelLabel: focus.practice,
    evidenceProjectIds: ['graduation-ml-fitness-health'],
  },

  // AI and machine learning
  { id: 'python', category: 'ai_ml', order: 1, name: { en: 'Python', ar: 'Python', sv: 'Python' }, levelLabel: focus.practice, evidenceProjectIds: [] },
  {
    id: 'machine-learning',
    category: 'ai_ml',
    order: 2,
    name: { en: 'Machine learning', ar: 'تعلّم الآلة', sv: 'Maskininlärning' },
    levelLabel: focus.evidence,
    evidenceProjectIds: ['graduation-ml-fitness-health'],
  },
  {
    id: 'model-integration',
    category: 'ai_ml',
    order: 3,
    name: { en: 'Model integration', ar: 'دمج النماذج', sv: 'Modellintegration' },
    levelLabel: focus.evidence,
    evidenceProjectIds: ['graduation-ml-fitness-health'],
  },

  // Testing and quality
  {
    id: 'unit-testing',
    category: 'testing',
    order: 1,
    name: { en: 'Unit testing', ar: 'اختبار الوحدات', sv: 'Enhetstestning' },
    levelLabel: focus.practice,
    evidenceProjectIds: [],
  },
  {
    id: 'manual-testing',
    category: 'testing',
    order: 2,
    name: { en: 'Manual testing', ar: 'الاختبار اليدوي', sv: 'Manuell testning' },
    levelLabel: focus.practice,
    evidenceProjectIds: [],
  },
  {
    id: 'automated-testing',
    category: 'testing',
    order: 3,
    name: { en: 'Automated testing', ar: 'الاختبار الآلي', sv: 'Automatiserad testning' },
    levelLabel: focus.practice,
    evidenceProjectIds: [],
  },
  { id: 'selenium', category: 'testing', order: 4, name: { en: 'Selenium', ar: 'Selenium', sv: 'Selenium' }, levelLabel: focus.practice, evidenceProjectIds: [] },
  {
    id: 'qa',
    category: 'testing',
    order: 5,
    name: { en: 'Software quality assurance', ar: 'ضمان جودة البرمجيات', sv: 'Kvalitetssäkring' },
    levelLabel: focus.practice,
    evidenceProjectIds: [],
  },

  // Tools and workflow
  { id: 'git', category: 'tools', order: 1, name: { en: 'Git', ar: 'Git', sv: 'Git' }, levelLabel: focus.practice, evidenceProjectIds: [] },
  { id: 'github', category: 'tools', order: 2, name: { en: 'GitHub', ar: 'GitHub', sv: 'GitHub' }, levelLabel: focus.practice, evidenceProjectIds: [] },
  { id: 'linux', category: 'tools', order: 3, name: { en: 'Linux', ar: 'لينكس', sv: 'Linux' }, levelLabel: focus.practice, evidenceProjectIds: [] },
  { id: 'vscode', category: 'tools', order: 4, name: { en: 'Visual Studio Code', ar: 'Visual Studio Code', sv: 'Visual Studio Code' }, levelLabel: focus.practice, evidenceProjectIds: [] },
  { id: 'jira', category: 'tools', order: 5, name: { en: 'JIRA', ar: 'JIRA', sv: 'JIRA' }, levelLabel: focus.practice, evidenceProjectIds: [] },
  { id: 'vibe-coding', category: 'tools', order: 6, name: { en: 'Vibe Coding', ar: 'Vibe Coding', sv: 'Vibe Coding' }, levelLabel: focus.practice, evidenceProjectIds: [] },

  // Security
  {
    id: 'cybersecurity',
    category: 'security',
    order: 1,
    name: { en: 'Cybersecurity', ar: 'الأمن السيبراني', sv: 'Cybersäkerhet' },
    levelLabel: focus.interest,
    evidenceProjectIds: [],
  },
]

export function getSkillsByCategory(category: SkillCategoryId): Skill[] {
  return skills.filter((skill) => skill.category === category).sort((a, b) => a.order - b.order)
}
