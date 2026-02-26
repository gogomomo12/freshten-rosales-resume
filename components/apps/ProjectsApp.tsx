'use client'

import { useState } from 'react'

type Project = {
  id: string
  title: string
  employer: string
  duration: string
  role: string
  description: string
  problem: string
  architecture: string
  tech: string[]
  metrics: { value: string; label: string }[]
  type: string
  url?: string
  image?: string
  thumbnail: string
  thumbBg: string
}

const PROJECTS: Project[] = [
  {
    id: 'eqquip',
    title: 'eQQuip Me',
    employer: 'Lexcode Inc.',
    duration: '2024 – Present',
    role: 'Full-Stack Developer',
    type: 'Quotation Management System',
    description:
      'Comprehensive quotation system for interpretation services and equipment rental with dynamic price calculations, currency conversion (PHP/USD), discount management, PDF generation, and email functionality with file attachments.',
    problem:
      'Manual quotation creation was error-prone and time-consuming with no standardized process for multi-currency pricing, tiered discounts, and document delivery.',
    architecture:
      'React + TypeScript frontend → FastAPI REST endpoints → MongoDB quotation persistence → Python PDF generation → SMTP email with file attachment handling.',
    tech: ['React', 'TypeScript', 'FastAPI', 'Python', 'MongoDB', 'Tailwind CSS', 'PDF Generation', 'SMTP'],
    metrics: [
      { value: '30+', label: 'Quotations/Month' },
      { value: '99.99%', label: 'Accuracy Rate' },
      { value: 'PHP/USD', label: 'Multi-Currency' },
    ],
    url: 'https://eqquipme.lexcode.com/',
    image: '/images/eqquipme.png',
    thumbnail: '📋',
    thumbBg: 'from-sky-400 to-blue-600',
  },
  {
    id: 'qurious',
    title: 'Qurious',
    employer: 'Lexcode Inc.',
    duration: '2024 – Present',
    role: 'Frontend Developer',
    type: 'AI Translation & Transcription Platform',
    description:
      'AI-powered translation platform featuring real-time WebSocket connections for live transcription, face-to-face translation with dual-language displays, speaker session management, microphone audio capture with PCM16 conversion, and automatic summaries.',
    problem:
      'Traditional translation required human interpreters and couldn\'t scale to concurrent users. High latency blocked real-time collaborative translation workflows.',
    architecture:
      'React WebSocket client → FastAPI WebSocket server → AI transcription/translation services → MongoDB session persistence. Room-based multi-speaker connection management.',
    tech: ['React', 'TypeScript', 'WebSocket', 'FastAPI', 'Python', 'MongoDB', 'Web Audio API', 'Tailwind CSS'],
    metrics: [
      { value: '60%', label: 'Latency Reduction' },
      { value: '1,000', label: 'Concurrent Clients' },
      { value: '500+', label: 'Daily Active Users' },
    ],
    url: 'https://qurious.eqqui.com/',
    image: '/images/qurious.png',
    thumbnail: '🌐',
    thumbBg: 'from-violet-400 to-purple-600',
  },
  {
    id: 'kabayanxpress',
    title: 'KabayanXpress',
    employer: 'Lexcode Inc.',
    duration: '2024 – Present',
    role: 'Frontend Developer',
    type: 'Cross-platform Mobile / Web Application',
    description:
      'Cross-platform mobile application that provides certified document translation services specifically designed for Overseas Filipino Workers (OFWs), enabling remote submission and real-time order tracking.',
    problem:
      'OFWs needed a mobile-first platform to submit documents for certified translation without visiting physical offices — a major friction point for overseas workers.',
    architecture:
      'React cross-platform UI → REST API endpoints for document submission → MongoDB order tracking → WebSocket real-time status updates → certified translator workflow backend.',
    tech: ['React', 'TypeScript', 'WebSocket', 'REST APIs', 'MongoDB'],
    metrics: [
      { value: 'OFW', label: 'Target Market' },
      { value: 'Mobile-First', label: 'Platform' },
      { value: 'Real-Time', label: 'Status Updates' },
    ],
    url: 'https://kabayan.lexcode.com/',
    image: '/images/kabayan.png',
    thumbnail: '✈️',
    thumbBg: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'english-tutor',
    title: 'AI English Tutor',
    employer: 'Lexcode Inc.',
    duration: '2024 – Present',
    role: 'Frontend Developer',
    type: 'Cross-platform Mobile / Web Application',
    description:
      'Cross-platform mobile application providing AI-powered English tutoring with real-time data synchronization, scalable user management, and personalized lesson flows across mobile and web.',
    problem:
      'English learners needed personalized, accessible tutoring that could work seamlessly across mobile and web platforms with synchronized progress and consistent UX.',
    architecture:
      'React Ionic cross-platform app → Firebase Realtime Database for sync → REST API for AI tutoring session orchestration → Firebase Auth for user management.',
    tech: ['React Ionic', 'Firebase', 'JavaScript', 'REST APIs', 'Firebase Auth'],
    metrics: [
      { value: 'Cross-Platform', label: 'iOS / Android / Web' },
      { value: 'Real-Time', label: 'Data Sync' },
      { value: 'AI-Powered', label: 'Tutoring Engine' },
    ],
    url: 'https://lexyapp.ai/',
    image: '/images/lexy.png',
    thumbnail: '🤖',
    thumbBg: 'from-amber-400 to-orange-500',
  },
  {
    id: 'lexcode-website',
    title: 'Lexcode Inc. Company Website',
    employer: 'Lexcode Inc.',
    duration: '2024 – Present',
    role: 'Full-Stack Developer',
    type: 'Corporate Website',
    description:
      'Developed and maintained the company website showcasing comprehensive translation and interpretation services with responsive design, SEO optimization, and content management.',
    problem:
      'Company needed a professional, SEO-optimized online presence with clear service categorization to drive organic discovery and convert enterprise clients.',
    architecture:
      'WordPress CMS → Elementor Pro page builder → custom CSS/JS enhancements → Yoast SEO optimization → responsive mobile-first media queries.',
    tech: ['WordPress', 'Elementor Pro', 'HTML', 'CSS', 'JavaScript', 'SEO', 'Yoast'],
    metrics: [
      { value: '15+', label: 'Pages Managed' },
      { value: '2,000+', label: 'Monthly Visitors' },
      { value: '3s', label: 'Load Time' },
    ],
    url: 'https://ph.lexcode.com/',
    image: '/images/lexcode.png',
    thumbnail: '🏢',
    thumbBg: 'from-slate-400 to-slate-600',
  },
  {
    id: 'oracle-middleware',
    title: 'Oracle Fusion Middleware Infrastructure',
    employer: 'Metrobank, Taguig City',
    duration: '2023 – 2024',
    role: 'Middleware Administrator',
    type: 'Enterprise Middleware Infrastructure',
    description:
      'Managed enterprise-grade Oracle Fusion Middleware and WebLogic Server infrastructure at Metrobank, ensuring high availability, zero-downtime operations, and optimal performance across banking transaction systems.',
    problem:
      'Banking-grade infrastructure demands 24/7 uptime and zero-downtime deployments. Any outage directly impacts transaction processing for millions of customers.',
    architecture:
      'Oracle Fusion Middleware stack → WebLogic Server application clusters → Oracle Database backend → WLST scripting for automated deployments → real-time monitoring dashboards.',
    tech: ['Oracle Fusion Middleware', 'WebLogic Server', 'Oracle DB', 'Linux', 'WLST', 'Performance Monitoring'],
    metrics: [
      { value: '99.9%', label: 'System Uptime' },
      { value: 'Enterprise', label: 'Banking Scale' },
      { value: 'Zero', label: 'Critical Downtime' },
    ],
    image: '/images/oracle-fusion-middleware.png',
    thumbnail: '🏦',
    thumbBg: 'from-amber-500 to-red-500',
  },
]

export default function ProjectsApp() {
  const [expanded, setExpanded] = useState<string | null>('eqquip')

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800">
      {/* Header */}
      <div className="px-4 md:px-5 py-3 md:py-4 border-b border-slate-100 dark:border-slate-700/60 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Project Registry</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Lexcode Inc. + Metrobank — production deployments
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              {PROJECTS.length} Projects
            </span>
          </div>
        </div>

        {/* User guidance banner */}
        <div className="mt-3 px-3 md:mx-5 md:px-5 py-2 rounded-lg bg-sky-50 dark:bg-sky-500/10 border border-sky-200/60 dark:border-sky-500/20">
          <div className="flex items-start gap-2">
            <span className="text-sky-500 text-sm mt-0.5">💡</span>
            <div>
              <p className="text-sm text-sky-700 dark:text-sky-300 font-medium leading-snug">
                Click any project below to expand and view details
              </p>
              <p className="text-xs text-sky-600/80 dark:text-sky-400/80 mt-1 hidden md:block">
                Maximize the window <span className="text-green-500">(green button)</span> for the best viewing experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects list */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-4 space-y-2.5 min-h-0">
        {PROJECTS.map((project) => {
          const isOpen = expanded === project.id
          const isEnterprise = project.id === 'oracle-middleware'

          return (
            <div
              key={project.id}
              className={`border rounded-xl transition-all ${isEnterprise
                ? 'border-amber-200/60 dark:border-amber-500/20 bg-amber-50/30 dark:bg-amber-500/5'
                : 'border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900/40'
                } hover:border-slate-200 dark:hover:border-slate-600/60`}
            >
              {/* Collapsed header — always visible */}
              <button
                className="w-full text-left p-3 md:p-4"
                onClick={() => setExpanded(isOpen ? null : project.id)}
              >
                <div className="flex gap-3 items-stretch">
                  {/* Thumbnail — left side */}
                  <div className={`w-16 md:w-20 shrink-0 rounded-lg overflow-hidden bg-linear-to-br ${project.thumbBg} flex flex-col items-center justify-center gap-1 self-stretch min-h-20`}>
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <span className="text-2xl md:text-3xl">{project.thumbnail}</span>
                        <span className="text-[9px] text-white/70 font-mono uppercase tracking-wider hidden md:block">preview</span>
                      </>
                    )}
                  </div>

                  {/* Content — right side */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                              {project.title}
                            </h3>
                            <span className={`text-xs font-medium px-1.5 py-0.5 rounded-md border shrink-0 ${isEnterprise
                              ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20'
                              : 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border-sky-100 dark:border-sky-500/20'
                              }`}>
                              {project.role}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 dark:text-slate-500 leading-tight">
                            {project.employer} · {project.duration}
                            <span className="hidden md:inline"> · {project.type}</span>
                          </div>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="hidden md:flex gap-1.5 shrink-0 flex-nowrap">
                        {project.metrics.map((m) => (
                          <div
                            key={m.label}
                            className={`text-center px-2 py-1 rounded-lg border min-w-15 ${isEnterprise
                              ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20'
                              : 'bg-sky-50 dark:bg-sky-500/10 border-sky-100 dark:border-sky-500/20'
                              }`}
                          >
                            <div className={`text-sm font-bold tabular-nums ${isEnterprise ? 'text-amber-600 dark:text-amber-400' : 'text-sky-600 dark:text-sky-400'}`}>
                              {m.value}
                            </div>
                            <div className={`text-xs leading-tight ${isEnterprise ? 'text-amber-500/70' : 'text-sky-500/70'}`}>
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <span className={`text-slate-400 dark:text-slate-600 text-sm shrink-0 mt-0.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        ▼
                      </span>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-xs font-medium rounded-md
                            bg-slate-100 dark:bg-slate-700/60
                            text-slate-600 dark:text-slate-300
                            border border-slate-200/60 dark:border-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>

              {/* Expanded details — grid-rows trick for smooth height animation */}
              <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <div className="px-3 md:px-4 pb-3 md:pb-4 border-t border-slate-100 dark:border-slate-700/40 pt-3">
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                      {project.description}
                    </p>

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border mb-3 transition-colors ${isEnterprise
                          ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/20'
                          : 'bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-500/20'
                        }`}
                      >
                        <span>🔗</span>
                        Visit Live Project
                      </a>
                    )}

                    <div className="space-y-3">
                      {/* Problem */}
                      <div className="p-3 bg-slate-900/5 dark:bg-slate-950/40 rounded-lg border border-slate-100 dark:border-slate-800">
                        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                          Problem Solved
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      {/* Architecture */}
                      <div className="p-3 bg-slate-900/5 dark:bg-slate-950/40 rounded-lg border border-slate-100 dark:border-slate-800">
                        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                          Architecture
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-mono leading-relaxed wrap-break-word">
                          {project.architecture}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
