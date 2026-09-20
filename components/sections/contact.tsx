'use client'

import { useRef, useState } from 'react'
import { usePreferences } from '@/components/providers/preferences'
import { siteProfile } from '@/content/site'
import { tr, trList } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import { Section, SectionHeader, type HeadingLevel } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { PendingNote } from '@/components/ui/pending-note'
import { ExternalActionLink } from '@/components/ui/action-link'
import { GithubIcon } from '@/components/ui/icons'

type Field = 'name' | 'email' | 'message'
type Errors = Partial<Record<Field, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function ContactSection({ level = 2 }: { level?: HeadingLevel }) {
  const { locale, t } = usePreferences()
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const summaryRef = useRef<HTMLDivElement | null>(null)

  const form = t.contact.form

  const validate = (): Errors => {
    const next: Errors = {}
    if (!values.name.trim()) next.name = form.errorName
    if (!emailPattern.test(values.email.trim())) next.email = form.errorEmail
    if (values.message.trim().length < 4) next.message = form.errorMessage
    return next
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    setSubmitted(Object.keys(nextErrors).length === 0)
    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus())
    }
  }

  const fieldClass = (field: Field) =>
    cn(
      'w-full rounded-[var(--radius-card)] border bg-surface-2/50 px-4 py-3 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-faint focus-visible:border-accent',
      errors[field] ? 'border-signal' : 'border-line',
    )

  return (
    <Section id="contact" className="border-t border-line">
      <div className="shell flex flex-col gap-14">
        <SectionHeader
          id="contact"
          index={t.sections.contact.index}
          label={t.sections.contact.label}
          title={t.sections.contact.title}
          lede={t.contact.lede}
          level={level}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <Reveal>
            <form noValidate onSubmit={onSubmit} className="panel flex flex-col gap-5 p-6 md:p-8">
              <fieldset className="flex flex-col gap-5 border-0 p-0">
                <legend className="eyebrow mb-2">{form.legend}</legend>

                {Object.keys(errors).length > 0 && (
                  <div
                    ref={summaryRef}
                    role="alert"
                    tabIndex={-1}
                    className="rounded-[var(--radius-card)] border border-signal/50 bg-surface-2/60 px-4 py-3 text-sm text-ink"
                  >
                    {form.errorSummary}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-sm text-muted">
                    {form.name} <span className="text-faint">({form.required})</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    placeholder={form.namePlaceholder}
                    value={values.name}
                    onChange={(event) => setValues((v) => ({ ...v, name: event.target.value }))}
                    className={fieldClass('name')}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="text-xs text-signal">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-sm text-muted">
                    {form.email} <span className="text-faint">({form.required})</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    placeholder={form.emailPlaceholder}
                    value={values.email}
                    onChange={(event) => setValues((v) => ({ ...v, email: event.target.value }))}
                    className={fieldClass('email')}
                    dir="ltr"
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="text-xs text-signal">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="text-sm text-muted">
                    {form.message} <span className="text-faint">({form.required})</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    placeholder={form.messagePlaceholder}
                    value={values.message}
                    onChange={(event) => setValues((v) => ({ ...v, message: event.target.value }))}
                    className={cn(fieldClass('message'), 'resize-y')}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="text-xs text-signal">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="glow-accent inline-flex items-center justify-center gap-2 self-start rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-[filter] duration-200 hover:brightness-110"
                >
                  {t.actions.send}
                </button>
              </fieldset>

              <div role="status" aria-live="polite">
                {submitted && (
                  <div className="rounded-[var(--radius-card)] border border-dashed border-line-strong bg-surface-2/50 px-4 py-4">
                    <p className="text-sm font-medium text-ink">{form.unavailableTitle}</p>
                    <p className="mt-1.5 text-sm text-muted">{form.unavailableBody}</p>
                  </div>
                )}
              </div>
            </form>
          </Reveal>

          <Reveal step={1}>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="eyebrow">{t.contact.directLabel}</span>
                <div className="flex flex-wrap gap-3">
                  {siteProfile.socialLinks.map((link) => (
                    <ExternalActionLink
                      key={link.id}
                      href={link.url}
                      newTabLabel={t.a11y.opensInNewTab}
                    >
                      <GithubIcon />
                      {tr(link.label, locale)}
                    </ExternalActionLink>
                  ))}
                </div>
              </div>

              <PendingNote
                label={t.contact.pendingLabel}
                hint={t.contact.pendingHint}
                items={trList(siteProfile.pendingContactDetails, locale)}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
