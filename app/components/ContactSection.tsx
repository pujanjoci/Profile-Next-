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
    hoverColor: 'hover:text-white hover:border-slate-400',
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
   Input field component (Rectangular Sharp Styling)
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
    w-full px-4 py-3 rounded-none bg-slate-50 border
    text-slate-900 placeholder:text-slate-400 text-sm
    outline-none transition-all duration-200 resize-none
    dark:bg-neutral-950 dark:text-white dark:placeholder:text-slate-500
    ${focused ? 'border-orange-500 bg-white dark:bg-neutral-900 ring-1 ring-orange-500' : 'border-slate-300 dark:border-white/15'}
    ${error ? '!border-red-500 !bg-red-500/5' : ''}
  `

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300">
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
            className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400 mt-0.5"
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
    <section id={id} className="relative w-full min-h-screen flex flex-col justify-center bg-slate-50 pt-16 pb-32 transition-colors duration-300 dark:bg-neutral-950 md:pt-24 md:pb-[32%] overflow-hidden">
      
      {/* ── Background subtle geometric accent lines ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 dark:opacity-20" aria-hidden>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-slate-300 dark:via-white/20 to-transparent" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-slate-300 dark:via-white/20 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-4">
            Contact <span className="text-orange-500">Me</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-none" />
        </motion.div>

        {/* ── Overlapping Two-Column Layout with 20% Vertical Stagger Offset ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center max-w-6xl mx-auto relative my-4">

          {/* ── Left: Dark Contact Info Card (Layered Underneath z-10, Shifted UP) ── */}
          <motion.div
            className="lg:col-span-5 relative z-10 lg:-mr-10 lg:-translate-y-8 mb-8 lg:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={1}
          >
            <div className="rounded-none border border-slate-800 bg-slate-950 text-white p-7 sm:p-9 shadow-xl space-y-6">
              <div>
                <h3 className="text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
                  Contact Information
                </h3>
                <p className="text-xs text-slate-400 mt-2">
                  Reach out directly via email, phone, or socials.
                </p>
              </div>

              <div className="space-y-3.5">
                {contactInfo.map(({ icon: Icon, label, value, href, color, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-3 rounded-none border border-white/10 hover:border-orange-500/50 hover:bg-white/5 transition-all duration-200"
                  >
                    <span className={`flex-shrink-0 p-3 rounded-none ${bg}`}>
                      <Icon size={18} className={color} />
                    </span>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-orange-400 transition-colors">
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social links */}
              <div className="pt-2 border-t border-white/10">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Find me online
                </h4>
                <div className="flex gap-3">
                  {socials.map(({ icon: Icon, label, href, hoverColor }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        flex items-center justify-center w-10 h-10 rounded-none
                        border border-white/15 text-slate-300 bg-white/5
                        transition-all duration-200 ${hoverColor}
                      `}
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability badge */}
              <div className="rounded-none border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-center gap-3">
                <span className="relative flex h-3 w-3 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-none bg-emerald-500" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Available For Work</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Open to freelance projects & collaboration.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Popout Contact Form Card (Layered ON TOP z-20 with 5% Top Padding) ── */}
          <motion.div
            className="lg:col-span-7 relative z-20 lg:translate-y-8 lg:pt-[5%]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={2}
          >
            <div className="rounded-none border border-slate-300 dark:border-white/15 bg-white dark:bg-neutral-900 p-7 sm:p-10 lg:pl-16 border-t-4 border-t-orange-500 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-300">

              {/* Success state */}
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-5"
                  >
                    <div className="w-16 h-16 rounded-none bg-emerald-500/15 flex items-center justify-center mb-2 border border-emerald-500/30">
                      <CheckCircle size={32} className="text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white uppercase tracking-tight">Message sent!</h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-xs text-sm">
                      Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={resetForm}
                      className="mt-2 px-6 py-2.5 rounded-none border border-slate-300 text-xs font-semibold uppercase tracking-wider text-slate-800 hover:bg-slate-100 hover:text-slate-950 transition-all duration-200 dark:border-white/20 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      Send another message
                    </button>
                  </motion.div>

                ) : formState === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-5"
                  >
                    <div className="w-16 h-16 rounded-none bg-red-500/15 flex items-center justify-center mb-2 border border-red-500/30">
                      <AlertCircle size={32} className="text-red-500 dark:text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white uppercase tracking-tight">Something went wrong</h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-xs text-sm">
                      Your message couldn&apos;t be sent. Please try again or email me directly.
                    </p>
                    <button
                      onClick={resetForm}
                      className="mt-2 px-6 py-2.5 rounded-none border border-slate-300 text-xs font-semibold uppercase tracking-wider text-slate-800 hover:bg-slate-100 hover:text-slate-950 transition-all duration-200 dark:border-white/20 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
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
                    <div className="border-b border-slate-200 dark:border-white/10 pb-3 mb-5">
                      <h3 className="text-xl font-bold text-slate-950 dark:text-white tracking-tight uppercase">
                        Send a Message
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Fill out the form below to initiate contact.
                      </p>
                    </div>

                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      placeholder="What is this regarding?"
                      value={fields.subject}
                      onChange={set('subject')}
                      error={errors.subject}
                    />

                    <Field
                      id="message"
                      label="Message"
                      placeholder="Tell me about your project or inquiry..."
                      value={fields.message}
                      onChange={set('message')}
                      error={errors.message}
                      multiline
                      rows={5}
                    />

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={formState === 'loading'}
                      whileHover={{ scale: formState === 'loading' ? 1 : 1.01 }}
                      whileTap={{ scale: formState === 'loading' ? 1 : 0.98 }}
                      className="
                        w-full flex items-center justify-center gap-2.5
                        px-6 py-3.5 rounded-none
                        bg-orange-500 hover:bg-orange-600 active:bg-orange-700
                        text-white font-bold text-xs uppercase tracking-wider
                        shadow-md shadow-orange-500/20
                        transition-all duration-200
                        disabled:opacity-60 disabled:cursor-not-allowed
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900
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

                    <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 mt-3">
                      Replies typically arrive within 24 hours.
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

