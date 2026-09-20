/**
 * Content types for the public portfolio.
 *
 * These follow docs/CONTENT_MODEL.md. Presentation code must not hold copy of
 * its own: every user-facing string comes either from `content/*` (portfolio
 * facts) or from `i18n/dictionaries/*` (interface labels).
 */

import type { Locale } from '@/i18n/config'

export type TranslationMap = Record<Locale, string>

/** Multi-line copy (for example the hero headline) kept per locale. */
export type TranslationLines = Record<Locale, string[]>

export type MediaAsset = {
  id: string
  url: string
  alt: TranslationMap
  type: 'image' | 'video' | 'embed'
  width?: number
  height?: number
}

export type SocialLink = {
  id: string
  label: TranslationMap
  url: string
  icon: 'github' | 'linkedin' | 'mail' | 'link'
  order: number
}

export type ProofPoint = {
  id: string
  label: TranslationMap
  value: TranslationMap
}

export type SiteProfile = {
  displayName: string
  role: TranslationMap
  /** Hero headline, kept as lines so each locale controls its own line breaks. */
  headlineLines: TranslationLines
  shortBio: TranslationMap
  longBio: TranslationMap
  location?: string
  availability?: TranslationMap
  profileImage?: MediaAsset
  resumeUrl?: string
  socialLinks: SocialLink[]
  /** The credibility strip from the design brief: founder, team lead, A+, disciplines. */
  proofPoints: ProofPoint[]
  /** Disciplines with real project or coursework evidence. */
  disciplines: TranslationMap[]
  /** Contact details Mohamed has not confirmed yet. Never invent replacements. */
  pendingContactDetails: TranslationMap[]
}

export type ProjectCategory = 'web' | 'mobile' | 'ai_ml' | 'backend' | 'product' | 'leadership'

/**
 * `pending` is the status docs/PROJECT_DATA.md uses for a project whose name is
 * confirmed but whose details have not been supplied yet.
 */
export type ProjectStatus = 'published' | 'coming_soon' | 'in_development' | 'private' | 'pending'

export type TechnologyRef = {
  id: string
  label: string
  /** `cv` means the stack is documented in the CV, `pending` means unconfirmed. */
  source: 'cv' | 'confirmed' | 'pending'
}

/**
 * Every member is optional: docs/PROJECT_DATA.md marks most case-study fields as
 * pending, and a missing field must render as pending rather than be filled in.
 */
export type CaseStudy = {
  problem?: TranslationMap
  solution?: TranslationMap
  responsibilities?: TranslationMap
  challenges?: TranslationMap
  outcome?: TranslationMap
  technicalNotes?: TranslationMap
}

export type CaseStudyField = keyof CaseStudy

export type Project = {
  id: string
  slug: string
  title: TranslationMap
  shortSummary: TranslationMap
  caseStudy?: CaseStudy
  role?: TranslationMap
  technologies: TechnologyRef[]
  category: ProjectCategory[]
  status: ProjectStatus
  featured: boolean
  order: number
  links: {
    github?: string
    live?: string
    googlePlay?: string
    testFlight?: string
  }
  media: MediaAsset[]
  /** Fields still missing before this project can be published as a case study. */
  pendingInformation: TranslationMap[]
  createdAt?: string
  updatedAt?: string
}

export type SkillCategoryId = 'web' | 'backend' | 'mobile' | 'ai_ml' | 'testing' | 'tools' | 'security'

export type Skill = {
  id: string
  name: TranslationMap
  category: SkillCategoryId
  /** A focus/familiarity label, never an objective engineering score. */
  levelLabel?: TranslationMap
  evidenceProjectIds: string[]
  order: number
}

export type SkillCategory = {
  id: SkillCategoryId
  label: TranslationMap
  summary: TranslationMap
  /** Short monospace glyph used by the capability map. */
  glyph: string
  order: number
}

export type LeadershipEntry = {
  id: string
  title: TranslationMap
  organization: TranslationMap
  description: TranslationMap
  responsibilities: TranslationMap
  /**
   * Exact dates are not documented yet, so entries carry a localized period
   * label instead of a fabricated date range.
   */
  periodLabel: TranslationMap
  startDate?: string
  endDate?: string
  current: boolean
  order: number
}

export type EducationEntry = {
  id: string
  institution: TranslationMap
  program: TranslationMap
  period: TranslationMap
  description?: TranslationMap
}

export type Certification = {
  id: string
  title: TranslationMap
  issuer: TranslationMap
  year?: string
  link?: string
}

export type SpotlightPoint = {
  id: string
  label: TranslationMap
  detail: TranslationMap
}

/** The mobile and AI spotlights on the home page. */
export type Spotlight = {
  id: 'mobile' | 'ai'
  lede: TranslationMap
  points: SpotlightPoint[]
  /** Facts that are not confirmed yet and must not be filled in. */
  pending: TranslationMap[]
  relatedProjectIds: string[]
  skillCategory: SkillCategoryId
}

export type TimelineItem = {
  id: string
  kind: 'leadership' | 'education' | 'certification'
  title: TranslationMap
  organization: TranslationMap
  period: TranslationMap
  description: TranslationMap
  current: boolean
}
