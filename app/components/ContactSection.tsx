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
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────
   Validation helpers
───────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────
   Contact info data
───────────────────────────────────────────────────────────── */
const contactInfo = [
  {
    icon: Mail,
    label: 'E-mail',
    value: 'contact@pujan-joshi.com.np',
    href: 'mailto:contact@pujan-joshi.com.np',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+977 (98) 609 28 584',
    href: 'tel:+9779860928584',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Bhaktapur, Katunje - Nepal',
    href: 'https://maps.google.com/?q=Bhaktapur,Katunje,Nepal',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
]

const socials = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/pujanjoci',
    hoverColor: 'hover:text-slate-950 hover:border-slate-400 dark:hover:text-white dark:hover:border-white/40',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pujan-joshi-np/',
    hoverColor: 'hover:text-blue-400 hover:border-blue-400/40',
  },
  {
    icon: Twitter,
    label: 'Twitter / X',
    href: 'https://x.com/pujanjoshi3',
    hoverColor: 'hover:text-sky-400 hover:border-sky-400/40',
  },
]

/* ─────────────────────────────────────────────────────────────
   Animation variants
───────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

/* ─────────────────────────────────────────────────────────────
   Input field component
───────────────────────────────────────────────────────────── */
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
    w-full px-4 py-3 rounded-xl bg-white border
    text-slate-900 placeholder:text-slate-400 text-sm
    outline-none transition-all duration-200 resize-none
    dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500
    ${focused ? 'border-orange-500/60 bg-orange-500/5 shadow-[0_0_0_3px_rgba(249,115,22,0.12)]' : 'border-slate-200 dark:border-white/10'}
    ${error ? '!border-red-500/60 !bg-red-500/5' : ''}
  `

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
        <span className="text-orange-500 ml-0.5">*</span>
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
            className="flex items-center gap-1.5 text-xs text-red-400"
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────────────────────── */
export default function ContactSection({ id = 'contact' }: { id?: string }) {
  /* Form state */
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
    // Clear field error on change
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
      /*
       * Formspree endpoint. Replace YOUR_FORM_ID with your actual ID.
       * e.g. https://formspree.io/f/xpzgkwjq
       */
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvgzjlpd'

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
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
    <section id={id} className="relative w-full bg-slate-50 py-20 transition-colors duration-300 dark:bg-neutral-950 md:py-32 overflow-hidden">
      
      {/* ── Decorative background blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute top-0 -right-32 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl opacity-50" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <span className="inline-block text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-4">
            Contact <span className="text-orange-500">Me</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-5" />
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Have a project in mind, want to collaborate, or just want to say hello?
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">

          {/* ── Left: Contact info ── */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={1}
          >
            {/* Info cards */}
            <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 space-y-5 shadow-xl shadow-slate-200/50 dark:border-white/10 dark:bg-white/4 dark:shadow-none">
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href, color, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors duration-200"
                  >
                    <span className={`flex-shrink-0 p-2.5 rounded-lg ${bg}`}>
                      <Icon size={18} className={color} />
                    </span>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-sm text-slate-700 group-hover:text-slate-950 transition-colors dark:text-slate-200 dark:group-hover:text-white">
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 shadow-xl shadow-slate-200/50 dark:border-white/10 dark:bg-white/4 dark:shadow-none">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                Find me online
              </h3>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href, hoverColor }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center justify-center w-11 h-11 rounded-full
                      border border-slate-200 text-slate-600
                      dark:border-white/15 dark:text-slate-400
                      transition-all duration-200 ${hoverColor}
                    `}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 flex items-center gap-3">
              <span className="relative flex h-3 w-3 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <div>
                <p className="text-sm font-semibold text-emerald-400">Contact Me on for various project building purposes!</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Currently open to freelance and collaboration
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Contact form ── */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={2}
          >
            <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-7 sm:p-9 shadow-2xl shadow-slate-200/60 dark:border-white/10 dark:bg-white/4 dark:shadow-2xl">

              {/* Success state */}
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mb-2">
                      <CheckCircle size={32} className="text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white">Message sent!</h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-xs">
                      Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={resetForm}
                      className="mt-2 px-5 py-2 rounded-full border border-slate-200 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition-all duration-200 shadow-sm dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      Send another message
                    </button>
                  </motion.div>

                ) : formState === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-red-500/15 flex items-center justify-center mb-2">
                      <AlertCircle size={32} className="text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white">Something went wrong</h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-xs">
                      Your message couldn&apos;t be sent. Please try again or email me directly.
                    </p>
                    <button
                      onClick={resetForm}
                      className="mt-2 px-5 py-2 rounded-full border border-slate-200 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition-all duration-200 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      Try again
                    </button>
                  </motion.div>

                ) : (
                  /* Form */
                  <form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    <h3 className="text-xl font-semibold text-slate-950 dark:text-white mb-6">Send a Message</h3>

                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field
                        id="name"
                        label="Your Name"
                        placeholder="John Doe"
                        value={fields.name}
                        onChange={set('name')}
                        error={errors.name}
                      />
                      <Field
                        id="email"
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        value={fields.email}
                        onChange={set('email')}
                        error={errors.email}
                      />
                    </div>

                    <Field
                      id="subject"
                      label="Subject"
                      placeholder="What is this about?"
                      value={fields.subject}
                      onChange={set('subject')}
                      error={errors.subject}
                    />

                    <Field
                      id="message"
                      label="Message"
                      placeholder="Tell me about your project..."
                      value={fields.message}
                      onChange={set('message')}
                      error={errors.message}
                      multiline
                      rows={6}
                    />

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={formState === 'loading'}
                      whileHover={{ scale: formState === 'loading' ? 1 : 1.02 }}
                      whileTap={{ scale: formState === 'loading' ? 1 : 0.97 }}
                      className="
                        w-full flex items-center justify-center gap-2.5
                        px-6 py-3.5 rounded-xl
                        bg-orange-500 hover:bg-orange-400
                        text-white font-semibold text-sm
                        shadow-lg shadow-orange-500/25
                        transition-all duration-200
                        disabled:opacity-60 disabled:cursor-not-allowed
                        focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900
                      "
                    >
                      {formState === 'loading' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-xs text-slate-600 mt-4">
                      Replies typically arrive in less than 24 hours.
                    </p>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
