# Portfolio Content Model

This document defines the content shape used by the public portfolio and the future admin dashboard. All user-facing entities support English, Arabic, and Swedish unless noted otherwise.

## Locale model

```ts
type Locale = 'en' | 'ar' | 'sv'
type TranslationMap = Record<Locale, string>
```

English is the default locale. Arabic uses RTL layout. Swedish uses LTR layout.

## Site profile

```ts
type SiteProfile = {
  displayName: string
  role: TranslationMap
  shortBio: TranslationMap
  longBio: TranslationMap
  location?: string
  availability?: TranslationMap
  profileImage?: MediaAsset
  resumeUrl?: string
  socialLinks: SocialLink[]
}
```

Known facts to use in initial content:

- Name: Mohamed Amin Abdel Wahed.
- Role: Software Engineer and fresh Software Engineering graduate.
- Founder of SU ACM Student Chapter.
- Responsible for the official SU ACM website and web activities.
- Team leader of the graduation project.
- Graduation project received an A+ grade.
- Ongoing interest in Cybersecurity.

## Projects

```ts
type Project = {
  id: string
  slug: string
  title: TranslationMap
  shortSummary: TranslationMap
  caseStudy?: CaseStudy
  role: TranslationMap
  technologies: TechnologyRef[]
  category: ProjectCategory[]
  status: 'published' | 'coming_soon' | 'private' | 'in_development'
  featured: boolean
  order: number
  links: {
    github?: string
    live?: string
    googlePlay?: string
    testFlight?: string
  }
  media: MediaAsset[]
  createdAt?: string
  updatedAt?: string
}

type CaseStudy = {
  problem: TranslationMap
  solution: TranslationMap
  responsibilities: TranslationMap
  challenges: TranslationMap
  outcome: TranslationMap
  technicalNotes: TranslationMap
}
```

## Skills

```ts
type Skill = {
  id: string
  name: TranslationMap
  category: 'web' | 'backend' | 'mobile' | 'ai_ml' | 'testing' | 'tools' | 'security'
  levelLabel?: TranslationMap
  evidenceProjectIds: string[]
  order: number
}
```

Use evidence project IDs instead of unsupported percentage scores. If a visual scale is used, label it as focus or familiarity rather than an objective engineering measurement.

## Leadership and experience

```ts
type LeadershipEntry = {
  id: string
  title: TranslationMap
  organization: TranslationMap
  description: TranslationMap
  responsibilities: TranslationMap
  startDate?: string
  endDate?: string
  current: boolean
  order: number
}
```

Initial leadership entries:

- Founder — SU ACM Student Chapter.
- Official website and web responsibility — SU ACM Student Chapter.
- Team Leader — graduation ML fitness and health project.

## Education and certifications

```ts
type EducationEntry = {
  id: string
  institution: TranslationMap
  program: TranslationMap
  period: TranslationMap
  description?: TranslationMap
}

type Certification = {
  id: string
  title: TranslationMap
  issuer: TranslationMap
  year?: string
  link?: string
}
```

Known initial records:

- Bachelor of Information Technology and Computer Science — Sinai University, Arish — 2022–2026.
- Front-End — Hasoub Academy — 2024.
- Software Testing and Quality — ITI — 2024.

## Media and links

```ts
type MediaAsset = {
  id: string
  url: string
  alt: TranslationMap
  type: 'image' | 'video' | 'embed'
  width?: number
  height?: number
}

type SocialLink = {
  label: TranslationMap
  url: string
  icon: string
  order: number
}
```

## Admin requirements

The CMS must allow editing translated fields together, uploading media, changing ordering, marking a project as featured, and changing publication status. Unpublished and private project content must never be returned by public queries.

