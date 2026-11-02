'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowUpRight,
} from 'lucide-react'
import {
  EditorialReveal,
  EditorialSectionHeader,
  MagneticWrapper,
} from './editorial/EditorialMotion'

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface FormFields {
  name: string
  email: string
  subject: string
  message: string
}

interface FieldErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function validate(fields: FormFields): FieldErrors {
  const errors: FieldErrors = {}
  if (!fields.name.trim()) errors.name = 'Name is required.'
  if (!fields.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!fields.subject.trim()) errors.subject = 'Subject is required.'
  if (!fields.message.trim()) {
    errors.message = 'Message is required.'
  } else if (fields.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }
  return errors
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Direct Electronic Mail',
    value: 'contact@pujan-joshi.com.np',
    href: 'mailto:contact@pujan-joshi.com.np',
  },
  {
    icon: Phone,
    label: 'Telephone / WhatsApp',
    value: '+977 (98) 609 28 584',
    href: 'tel:+9779860928584',
  },
  {
    icon: MapPin,
    label: 'Base of Operations',
    value: 'Bhaktapur, Katunje - Nepal',
    href: 'https://maps.google.com/?q=Bhaktapur,Katunje,Nepal',
  },
]

const socials = [
  {
    icon: Github,
    label: 'GitHub',
    handle: '@pujanjoci',
    href: 'https://github.com/pujanjoci',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    handle: '/in/pujan-joshi-np',
    href: 'https://www.linkedin.com/in/pujan-joshi-np/',
  },
  {
    icon: Twitter,
    label: 'Twitter / X',
    handle: '@pujanjoshi3',
    href: 'https://x.com/pujanjoshi3',
  },
]

function Field({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  multiline = false,
  rows = 5,
}: {
  id: keyof FormFields
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (val: string) => void
  error?: string
  multiline?: boolean
  rows?: number
}) {
  const [focused, setFocused] = useState(false)
  const baseClass = `
    w-full px-4 py-3.5 bg-[var(--ed-surface)] border
    text-[var(--ed-text)] placeholder:text-[var(--ed-subtle)] text-sm
    outline-none transition-colors duration-200 resize-none
    ${focused
      ? 'border-orange-500 bg-[var(--ed-bg)]'
      : 'border-[var(--ed-border-strong)]'
    }
    ${error ? '!border-red-500 !bg-red-500/5' : ''}
  `

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--ed-muted)]"
      >
        {label} <span className="text-orange-500">*</span>
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={baseClass}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={baseClass}
        />
      )}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-xs text-red-500 mt-0.5 font-mono"
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactSection({
  id = 'contact',
  headingLevel = 'h2',
}: {
  id?: string
  headingLevel?: 'h1' | 'h2'
}) {
  const [fields, setFields] = useState<FormFields>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formState, setFormState] = useState<FormState>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const set = (key: keyof FormFields) => (val: string) => {
    setFields((prev) => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fieldErrors = validate(fields)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setFormState('loading')
    try {
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvgzjlpd'

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...fields,
          _subject: `Portfolio Contact: ${fields.subject}`,
        }),
      })
      if (res.ok) {
        setFormState('success')
        setFields({ name: '', email: '', subject: '', message: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  const resetForm = () => {
    setFormState('idle')
    setErrors({})
  }

  return (
    <section
      id={id}
      className="editorial-section relative w-full py-24 md:py-32 border-t border-[var(--ed-border)] transition-colors duration-300"
    >
      <div className="editorial-container">
        <EditorialSectionHeader
          index="08"
          label="Initiate Dialogue"
          title="Build something"
          accentWord="Exiciting and Expressive"
          subtitle="Available for freelance web development, UI/UX design systems, e-commerce engineering, and long-term technical partnerships."
          headingLevel={headingLevel}
          rightContent={
            <div className="inline-flex items-center gap-2.5 px-4 py-2 border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for New Commissions</span>
            </div>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 Cols): Prominent Direct Contact Channels & Social Ledger */}
          <div className="lg:col-span-5 space-y-10">
            <EditorialReveal className="space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)] block">
                Direct Dispatch
              </span>
              <a
                href="mailto:contact@pujan-joshi.com.np"
                className="group inline-flex items-center gap-2 font-display text-xl sm:text-2xl font-bold text-[var(--ed-text)] hover:text-orange-500 transition-colors break-all"
              >
                <span>contact@pujan-joshi.com.np</span>
                <ArrowUpRight
                  size={20}
                  className="text-orange-500 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <p className="text-sm text-[var(--ed-muted)] leading-relaxed">
                Reach out directly via electronic mail, telephone, or the inquiry brief alongside. Typical response window is under 24 hours.
              </p>
            </EditorialReveal>

            {/* Coordinates List */}
            <EditorialReveal delay={0.08}>
              <div className="divide-y divide-[var(--ed-border)] border-t border-b border-[var(--ed-border)]">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group py-5 flex items-center justify-between gap-4 transition-colors hover:bg-[var(--ed-surface)] px-2 -mx-2"
                  >
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center border border-[var(--ed-border)] bg-[var(--ed-surface)] text-orange-500 shrink-0">
                        <Icon size={16} />
                      </span>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                          {label}
                        </p>
                        <p className="font-display text-sm sm:text-base font-bold text-[var(--ed-text)] group-hover:text-orange-500 transition-colors mt-0.5">
                          {value}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={15}
                      className="text-[var(--ed-subtle)] group-hover:text-orange-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                    />
                  </a>
                ))}
              </div>
            </EditorialReveal>

            {/* Social Profiles Index */}
            <EditorialReveal delay={0.14} className="space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)] block">
                Digital Profiles
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {socials.map(({ icon: Icon, label, handle, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-[var(--ed-border)] bg-[var(--ed-surface)] hover:border-orange-500 transition-colors flex flex-col justify-between gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <Icon
                        size={16}
                        className="text-[var(--ed-text)] group-hover:text-orange-500 transition-colors"
                      />
                      <ArrowUpRight
                        size={13}
                        className="text-[var(--ed-subtle)] group-hover:text-orange-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                    <div>
                      <p className="font-display text-xs font-bold text-[var(--ed-text)]">
                        {label}
                      </p>
                      <p className="text-[10px] font-mono text-[var(--ed-muted)] truncate mt-0.5">
                        {handle}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </EditorialReveal>
          </div>

          {/* Right Column (7 Cols): Inquiry Form */}
          <div className="lg:col-span-7">
            <EditorialReveal delay={0.1}>
              <div className="border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] p-6 sm:p-10 md:p-12">
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center text-center py-14 gap-5"
                    >
                      <div className="w-14 h-14 border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle size={28} className="text-emerald-500" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-[var(--ed-text)]">
                        Transmission Received
                      </h3>
                      <p className="text-[var(--ed-muted)] max-w-sm text-sm leading-relaxed">
                        Thank you for reaching out. I will review your message and respond within 24 hours.
                      </p>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="mt-2 px-6 py-3 border border-[var(--ed-border-strong)] text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer"
                      >
                        Send Another Inquiry
                      </button>
                    </motion.div>
                  ) : formState === 'error' ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center text-center py-14 gap-5"
                    >
                      <div className="w-14 h-14 border border-red-500/30 bg-red-500/10 flex items-center justify-center">
                        <AlertCircle size={28} className="text-red-500" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-[var(--ed-text)]">
                        Delivery Interrupted
                      </h3>
                      <p className="text-[var(--ed-muted)] max-w-sm text-sm leading-relaxed">
                        Your message could not be dispatched at this moment. Please try again or email me directly at contact@pujan-joshi.com.np.
                      </p>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="mt-2 px-6 py-3 border border-[var(--ed-border-strong)] text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer"
                      >
                        Try Again
                      </button>
                    </motion.div>
                  ) : (
                    <form
                      key="form"
                      ref={formRef}
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between border-b border-[var(--ed-border)] pb-4 mb-2">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-orange-500 block">
                            INQUIRY BRIEF
                          </span>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--ed-text)] mt-0.5">
                            Send a Message
                          </h3>
                        </div>
                        <span className="text-xs font-mono text-[var(--ed-muted)] hidden sm:inline">
                          * Required Fields
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Field
                          id="name"
                          label="Your Name"
                          placeholder="Jane Doe"
                          value={fields.name}
                          onChange={set('name')}
                          error={errors.name}
                        />
                        <Field
                          id="email"
                          label="Email Address"
                          type="email"
                          placeholder="jane@company.com"
                          value={fields.email}
                          onChange={set('email')}
                          error={errors.email}
                        />
                      </div>

                      <Field
                        id="subject"
                        label="Subject / Project Scope"
                        placeholder="Web Application, UI/UX Redesign, or Consultation"
                        value={fields.subject}
                        onChange={set('subject')}
                        error={errors.subject}
                      />

                      <Field
                        id="message"
                        label="Project Details & Timeline"
                        placeholder="Tell me about your goals, timeline, and what we can build together..."
                        value={fields.message}
                        onChange={set('message')}
                        error={errors.message}
                        multiline
                        rows={5}
                      />

                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <p className="text-xs font-mono text-[var(--ed-muted)]">
                          Direct encrypted dispatch via Formspree.
                        </p>

                        <MagneticWrapper>
                          <button
                            type="submit"
                            disabled={formState === 'loading'}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs uppercase tracking-[0.18em] font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                          >
                            {formState === 'loading' ? (
                              <>
                                <Loader2 size={15} className="animate-spin" />
                                <span>Sending...</span>
                              </>
                            ) : (
                              <>
                                <Send size={14} />
                                <span>Dispatch Message</span>
                              </>
                            )}
                          </button>
                        </MagneticWrapper>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </EditorialReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
