'use client'

const CONTENT = `// About.txt — Freshten Zapata Rosales
// ============================================

name        : Freshten Zapata Rosales
title       : Frontend Developer
location    : Makati, Philippines
contact     : LacsonRosales@gmail.com


// PROFESSIONAL SUMMARY
// ─────────────────────────────────────────────

Frontend Developer with production experience building
full-stack web applications using React, TypeScript, and
Python/FastAPI. Strong background in enterprise middleware
administration and system infrastructure.

Experienced delivering real-time features, performance-
optimized interfaces, and automated backend systems in
production environments serving 500+ daily active users.


// CURRENT ROLE
// ─────────────────────────────────────────────

employer    : Lexcode Inc., Philippines
period      : May 2024 — Present
stack       : React · TypeScript · Next.js · FastAPI · MongoDB

  → Built 3 full-stack web applications in production
  → Engineered WebSocket real-time system (60% latency reduction)
  → Achieved 95%+ mobile usability score (Google Lighthouse)
  → Built PDF automation pipeline (75% processing time reduction)
  → Implemented dynamic pricing engine (99.99% accuracy)
  → Created RESTful APIs with JWT + RBAC (5,000+ records)
  → Unit testing with Jest across production components


// PRIOR EXPERIENCE
// ─────────────────────────────────────────────

employer    : Metrobank, Taguig City
period      : January 2023 — May 2024
role        : Middleware Administrator

  → Managed Oracle Fusion Middleware + WebLogic Server infra
  → Maintained 99.9% system uptime across enterprise systems
  → Monitored performance metrics, diagnosed complex issues


// ENGINEERING PRINCIPLES
// ─────────────────────────────────────────────

  → Performance-first: measure before optimizing
  → System-level thinking: understand the full stack
  → Clean, typed code with clear separation of concerns
  → Real-time by design: WebSocket over polling where it matters
  → Reliability: uptime, accuracy, and observability are metrics


// EDUCATION
// ─────────────────────────────────────────────

institution : Batangas State University
degree      : BS Computer Science (BSCS)


// RECOGNITION
// ─────────────────────────────────────────────

award       : LEXCODIAN OF THE MONTH
issuer      : Lexcode Inc., Philippines
date        : March 2025
reason      : Outstanding performance and exceptional teamwork


// END OF FILE
`

export default function AboutApp() {
  const lines = CONTENT.split('\n')

  return (
    <div className="h-full bg-slate-950 font-mono text-sm overflow-auto">
      {/* Editor header */}
      <div className="flex items-center gap-3 px-3 md:px-4 py-2 bg-slate-900 border-b border-slate-800 sticky top-0">
        <span className="text-slate-500 text-xs">About.txt</span>
        <span className="text-slate-700 text-xs">—</span>
        <span className="text-slate-500 text-xs">UTF-8</span>
        <span className="ml-auto text-slate-600 text-xs">{lines.length} lines</span>
      </div>

      {/* Content with line numbers */}
      <div className="p-2 md:p-0">
        {lines.map((line, i) => {
          const lineNum = i + 1
          const isComment = line.trim().startsWith('//')
          const isSection = line.startsWith('//') && line.includes('─')
          const isKey = /^[a-z\s]+\s*:/.test(line.trim()) && !line.trim().startsWith('//')
          const isArrow = line.trim().startsWith('→')
          const isEmpty = line.trim() === ''

          let textClass = 'text-slate-300'
          if (isComment) textClass = 'text-slate-600 italic'
          if (isSection) textClass = 'text-slate-600'
          if (isKey) textClass = 'text-sky-400'
          if (isArrow) textClass = 'text-slate-400'
          if (isEmpty) textClass = ''

          return (
            <div key={i} className="flex hover:bg-slate-900/40 transition-colors">
              <div className="w-10 md:w-12 shrink-0 text-right pr-2 md:pr-3 py-0.5 text-slate-700 select-none border-r border-slate-800/60 text-xs tabular-nums">
                {lineNum}
              </div>
              <div className={`pl-2 md:pl-4 py-0.5 flex-1 leading-relaxed ${textClass} whitespace-pre overflow-x-auto`}>
                {line || ' '}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
