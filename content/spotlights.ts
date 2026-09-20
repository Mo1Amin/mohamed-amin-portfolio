import type { Spotlight } from './types'

/**
 * The mobile and AI spotlights. Every point below is stated in the project
 * documents; everything else is listed as pending.
 */
export const spotlights: Spotlight[] = [
  {
    id: 'mobile',
    skillCategory: 'mobile',
    relatedProjectIds: ['graduation-ml-fitness-health'],
    lede: {
      en: 'Mobile work centres on the graduation project: a Flutter application built for iOS and Android, led as Team Leader.',
      ar: 'يتركّز العمل على الموبايل حول مشروع التخرج: تطبيق Flutter لنظامي iOS وAndroid، قاده كقائد فريق.',
      sv: 'Mobilarbetet kretsar kring examensarbetet: en Flutter-app byggd för iOS och Android, ledd som teamledare.',
    },
    points: [
      {
        id: 'framework',
        label: { en: 'Framework', ar: 'الإطار', sv: 'Ramverk' },
        detail: {
          en: 'Flutter, one codebase targeting iOS and Android.',
          ar: 'Flutter، قاعدة كود واحدة تستهدف iOS وAndroid.',
          sv: 'Flutter, en kodbas för både iOS och Android.',
        },
      },
      {
        id: 'role',
        label: { en: 'Role', ar: 'الدور', sv: 'Roll' },
        detail: {
          en: 'Team Leader and technical lead of the project team.',
          ar: 'قائد الفريق والمسؤول التقني لفريق المشروع.',
          sv: 'Teamledare och teknisk ledare för projektteamet.',
        },
      },
      {
        id: 'result',
        label: { en: 'Result', ar: 'النتيجة', sv: 'Resultat' },
        detail: {
          en: 'The graduation project received an A+ grade.',
          ar: 'حصل مشروع التخرج على تقدير A+.',
          sv: 'Examensarbetet fick betyget A+.',
        },
      },
    ],
    pending: [
      { en: 'Application features', ar: 'مميزات التطبيق', sv: 'Appens funktioner' },
      { en: 'Screenshots and screen recordings', ar: 'لقطات وتسجيلات الشاشة', sv: 'Skärmbilder och skärminspelningar' },
      { en: 'Google Play link', ar: 'رابط Google Play', sv: 'Google Play-länk' },
    ],
  },

  {
    id: 'ai',
    skillCategory: 'ai_ml',
    relatedProjectIds: ['graduation-ml-fitness-health'],
    lede: {
      en: 'The same project carries a complete machine learning model for fitness and health, integrated into the shipped application.',
      ar: 'يحمل المشروع نفسه نموذج تعلّم آلة متكاملاً للياقة والصحة، مدمجاً داخل التطبيق النهائي.',
      sv: 'Samma projekt bär en komplett maskininlärningsmodell för träning och hälsa, integrerad i den färdiga appen.',
    },
    points: [
      {
        id: 'domain',
        label: { en: 'Domain', ar: 'المجال', sv: 'Domän' },
        detail: {
          en: 'Fitness and health.',
          ar: 'اللياقة والصحة.',
          sv: 'Träning och hälsa.',
        },
      },
      {
        id: 'scope',
        label: { en: 'Scope', ar: 'النطاق', sv: 'Omfattning' },
        detail: {
          en: 'A complete machine learning model, not a demo notebook.',
          ar: 'نموذج تعلّم آلة متكامل، وليس تجربة في دفتر ملاحظات.',
          sv: 'En komplett maskininlärningsmodell, inte en demo-notebook.',
        },
      },
      {
        id: 'integration',
        label: { en: 'Integration', ar: 'الدمج', sv: 'Integration' },
        detail: {
          en: 'Delivered inside the Flutter mobile application.',
          ar: 'مُسلَّم داخل تطبيق Flutter للموبايل.',
          sv: 'Levererad inuti Flutter-mobilappen.',
        },
      },
    ],
    pending: [
      { en: 'Model purpose in detail', ar: 'تفاصيل الغرض من النموذج', sv: 'Modellens syfte i detalj' },
      { en: 'Data source', ar: 'مصدر البيانات', sv: 'Datakälla' },
      { en: 'Evaluation method', ar: 'طريقة التقييم', sv: 'Utvärderingsmetod' },
      { en: 'Libraries and training stack', ar: 'المكتبات وبيئة التدريب', sv: 'Bibliotek och träningsstack' },
    ],
  },
]

export function getSpotlight(id: Spotlight['id']): Spotlight {
  const spotlight = spotlights.find((entry) => entry.id === id)
  if (!spotlight) throw new Error(`Unknown spotlight: ${id}`)
  return spotlight
}
