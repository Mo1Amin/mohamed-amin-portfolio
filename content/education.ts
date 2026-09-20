import type { Certification, EducationEntry } from './types'

/** Known initial records from docs/CONTENT_MODEL.md. */
export const educationEntries: EducationEntry[] = [
  {
    id: 'sinai-university',
    institution: {
      en: 'Sinai University, Arish',
      ar: 'جامعة سيناء، العريش',
      sv: 'Sinai University, Arish',
    },
    program: {
      en: 'Bachelor of Information Technology and Computer Science',
      ar: 'بكالوريوس تكنولوجيا المعلومات وعلوم الحاسب',
      sv: 'Kandidatexamen i informationsteknik och datavetenskap',
    },
    period: { en: '2022 – 2026', ar: '٢٠٢٢ – ٢٠٢٦', sv: '2022 – 2026' },
    description: {
      en: 'Software Engineering degree completed with an A+ graduation project led as Team Leader.',
      ar: 'درجة في هندسة البرمجيات مع مشروع تخرج حاصل على تقدير A+ قاده كقائد فريق.',
      sv: 'Examen i mjukvaruteknik med ett examensarbete med betyget A+ som han ledde som teamledare.',
    },
  },
]

export const certifications: Certification[] = [
  {
    id: 'hasoub-frontend',
    title: { en: 'Front-End', ar: 'تطوير الواجهات الأمامية', sv: 'Frontend' },
    issuer: { en: 'Hasoub Academy', ar: 'أكاديمية حسوب', sv: 'Hasoub Academy' },
    year: '2024',
  },
  {
    id: 'iti-testing',
    title: {
      en: 'Software Testing and Quality',
      ar: 'اختبار البرمجيات والجودة',
      sv: 'Mjukvarutestning och kvalitet',
    },
    issuer: {
      en: 'ITI — Information Technology Institute',
      ar: 'ITI — معهد تكنولوجيا المعلومات',
      sv: 'ITI — Information Technology Institute',
    },
    year: '2024',
  },
]
