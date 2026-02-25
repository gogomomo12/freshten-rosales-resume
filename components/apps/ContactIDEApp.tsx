'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

type Stage = 'code' | 'form' | 'console'

type FormData = {
  name: string
  email: string
  message: string
}

const CODE_LINES = [
  { tokens: [{ text: '// contact.ts — FreshtenOS', cls: 'text-slate-600 italic' }] },
  { tokens: [] },
  { tokens: [{ text: 'interface ', cls: 'text-purple-400' }, { text: 'Recruiter ', cls: 'text-sky-300' }, { text: '{', cls: 'text-slate-300' }] },
  { tokens: [{ text: '  name', cls: 'text-green-400' }, { text: ': ', cls: 'text-slate-400' }, { text: 'string', cls: 'text-sky-400' }] },
  { tokens: [{ text: '  email', cls: 'text-green-400' }, { text: ': ', cls: 'text-slate-400' }, { text: 'string', cls: 'text-sky-400' }] },
  { tokens: [{ text: '  message', cls: 'text-green-400' }, { text: ': ', cls: 'text-slate-400' }, { text: 'string', cls: 'text-sky-400' }] },
  { tokens: [{ text: '}', cls: 'text-slate-300' }] },
  { tokens: [] },
  { tokens: [{ text: 'async function ', cls: 'text-purple-400' }, { text: 'sendMessage', cls: 'text-yellow-400' }, { text: '(', cls: 'text-slate-300' }, { text: 'data', cls: 'text-orange-300' }, { text: ': ', cls: 'text-slate-400' }, { text: 'Recruiter', cls: 'text-sky-300' }, { text: ') {', cls: 'text-slate-300' }] },
  { tokens: [{ text: '  return ', cls: 'text-purple-400' }, { text: 'await ', cls: 'text-purple-400' }, { text: 'api', cls: 'text-slate-300' }, { text: '.', cls: 'text-slate-400' }, { text: 'post', cls: 'text-yellow-400' }, { text: '(', cls: 'text-slate-300' }, { text: '"/contact"', cls: 'text-amber-400' }, { text: ', data)', cls: 'text-slate-300' }] },
  { tokens: [{ text: '}', cls: 'text-slate-300' }] },
  { tokens: [] },
  { tokens: [{ text: '// Run to initialize contact session ▼', cls: 'text-slate-600 italic' }] },
]

export default function ContactIDEApp() {
  const [stage, setStage] = useState<Stage>('code')
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverMsg, setServerMsg] = useState('')

  const validate = (): boolean => {
    const errs: Partial<FormData> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required'
    if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    try {
      // Debug environment variables
      console.log('Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID)
      console.log('Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID)
      console.log('Public Key is set:', !!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)

      // Send directly via EmailJS
      const templateParams = {
        name: form.name,
        email: form.email,
        message: form.message,
      }

      const res = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      if (res.status === 200) {
        setServerMsg('200 OK')
        setStage('console')
      } else {
        setErrors({ message: 'Failed to send. Please try again.' })
      }
    } catch (err: any) {
      console.error('EmailJS Error details:', err)
      // Display the actual error message from EmailJS in the UI if possible
      const errorMessage = err?.text || err?.message || 'Network error. Please try again.'
      setErrors({ message: `Config Error: ${errorMessage}` })
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setStage('code')
    setForm({ name: '', email: '', message: '' })
    setErrors({})
    setServerMsg('')
  }

  return (
    <div className="h-full flex flex-col bg-slate-950 font-mono text-sm relative">
      {/* IDE top bar */}
      <div className="flex items-center px-4 py-2 bg-slate-900 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-xs">contact.ts</span>
          {stage === 'form' && <span className="text-amber-400/60 text-xs">● unsaved</span>}
          {stage === 'console' && <span className="text-emerald-400/60 text-xs">✓ executed</span>}
        </div>
        <div className="ml-auto flex gap-2">
          {stage !== 'code' && (
            <button onClick={reset} className="text-xs text-slate-500 hover:text-slate-300 transition-colors px-2 py-1 rounded">
              ← Back
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <div className="flex-1 min-h-0 relative overflow-hidden">
          {/* Stage 1: Code view */}
          {stage === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="flex-1 overflow-y-auto min-h-0">
                {CODE_LINES.map((line, i) => (
                  <div key={i} className="flex hover:bg-slate-900/40">
                    <div className="w-12 shrink-0 text-right pr-3 py-1 text-slate-700 select-none text-xs tabular-nums border-r border-slate-800/60">
                      {i + 1}
                    </div>
                    <div className="pl-4 py-1 flex-1 leading-relaxed">
                      {line.tokens.length === 0 ? (
                        <span>&nbsp;</span>
                      ) : (
                        line.tokens.map((t, j) => (
                          <span key={j} className={t.cls}>{t.text}</span>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Always-visible hint */}
              <div className="mx-3 sm:mx-4 mb-2 sm:mb-3 px-3 py-2 rounded-lg bg-sky-500/10 border border-sky-500/25 flex items-center gap-2.5 shrink-0">
                <span className="text-sky-400 text-lg leading-none shrink-0">💡</span>
                <div>
                  <div className="text-sm text-sky-300 font-medium leading-snug">
                    Run this code to Contact Me
                  </div>
                  <div className="text-xs text-sky-500/60 mt-0.5">
                    Click ▶ Run Code below to open the contact form
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-center gap-0.5 shrink-0">
                  <div className="w-px h-3 bg-sky-500/30" />
                  <div className="text-sky-500/50 text-xs leading-none">↓</div>
                </div>
              </div>

              {/* Run button */}
              <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 border-t border-slate-800 pt-3 flex flex-row items-center gap-3 shrink-0 flex-wrap">
                <button
                  onClick={() => setStage('form')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 transition-colors text-white text-sm font-semibold shadow-lg shadow-sky-500/25 shrink-0 justify-center"
                >
                  <span>▶</span>
                  <span>Run Code</span>
                </button>
                <span className="text-slate-600 text-xs">Execute sendMessage() with your data</span>
              </div>
            </motion.div>
          )}

          {/* Stage 2: Form */}
          {stage === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 overflow-y-auto p-4 md:p-5"
            >
              <div className="mb-4">
                <div className="text-xs text-slate-500 mb-1">
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-green-400">payload</span>{' '}
                  <span className="text-slate-400">=</span>{' '}
                  <span className="text-sky-400">Recruiter</span>{' '}
                  <span className="text-slate-500">{'{'}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs text-green-400 mb-1.5">name:</label>
                  <input
                    type="text"
                    placeholder='"Your full name"'
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full bg-slate-900 border rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors
                    ${errors.name ? 'border-red-500/60 focus:border-red-500' : 'border-slate-700 focus:border-sky-500/60'}`}
                  />
                  {errors.name && <span className="text-xs text-red-400 mt-1 block">// {errors.name}</span>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-green-400 mb-1.5">email:</label>
                  <input
                    type="email"
                    placeholder='"your@company.com"'
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full bg-slate-900 border rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors
                    ${errors.email ? 'border-red-500/60 focus:border-red-500' : 'border-slate-700 focus:border-sky-500/60'}`}
                  />
                  {errors.email && <span className="text-xs text-red-400 mt-1 block">// {errors.email}</span>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs text-green-400 mb-1.5">message:</label>
                  <textarea
                    placeholder='"Your message or opportunity..."'
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    className={`w-full bg-slate-900 border rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors resize-none
                    ${errors.message ? 'border-red-500/60 focus:border-red-500' : 'border-slate-700 focus:border-sky-500/60'}`}
                  />
                  {errors.message && <span className="text-xs text-red-400 block">// {errors.message}</span>}
                </div>

                <div className="text-xs text-slate-500 mb-4">{'}'}</div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white text-sm font-medium shadow-lg shadow-sky-500/20"
                >
                  {isLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border border-white/30 border-t-white animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>▶</span>
                      <span>sendMessage(payload)</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {/* Stage 3: Console output */}
          {stage === 'console' && (
            <motion.div
              key="console"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col p-5 overflow-y-auto"
            >
              <div className="flex-1 space-y-2">
                <div className="text-xs text-slate-600">$ sendMessage(payload)</div>
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <span>✔</span>
                    <span>Message sent successfully</span>
                  </div>
                  <div className="text-slate-500 text-xs">
                    Server Response:{' '}
                    <span className="text-emerald-400/80">{serverMsg}</span>
                  </div>
                  <div className="text-slate-500 text-xs">
                    Recipient:{' '}
                    <span className="text-slate-400">LacsonRosales@gmail.com</span>
                  </div>
                  <div className="text-slate-500 text-xs">
                    From:{' '}
                    <span className="text-slate-400">{form.email}</span>
                  </div>
                  <div className="mt-3 text-slate-600 text-xs">
                  // Response time typically within 24 hours
                  </div>
                </div>
              </div>

              <button
                onClick={reset}
                className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-slate-300 text-sm border border-slate-700"
              >
                ← New Message
              </button>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  )
}
