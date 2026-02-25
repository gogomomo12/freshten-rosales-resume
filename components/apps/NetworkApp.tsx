'use client'

const LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@freshten-rosales',
    description: 'Source code, open-source contributions',
    href: 'https://github.com/freshten-rosales',
    icon: '⬡',
    color: 'slate',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Freshten Zapata Rosales',
    description: 'Professional profile, work history',
    href: 'https://www.linkedin.com/in/freshten-rosales-86a2521b6/',
    icon: '◈',
    color: 'sky',
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'LacsonRosales@gmail.com',
    description: 'Direct contact, opportunities, collaboration',
    href: 'mailto:LacsonRosales@gmail.com',
    icon: '◉',
    color: 'emerald',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    handle: 'freshten-resume.vercel.app',
    description: 'Resume and additional work samples',
    href: 'https://freshten-resume.vercel.app/',
    icon: '◆',
    color: 'violet',
  },
]

const colorMap: Record<string, string> = {
  slate: 'bg-slate-50 dark:bg-slate-700/40 border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600',
  sky: 'bg-sky-50/50 dark:bg-sky-500/5 border-sky-100 dark:border-sky-500/20 text-sky-700 dark:text-sky-400 hover:border-sky-200 dark:hover:border-sky-500/40',
  emerald: 'bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-500/40',
  violet: 'bg-violet-50/50 dark:bg-violet-500/5 border-violet-100 dark:border-violet-500/20 text-violet-700 dark:text-violet-400 hover:border-violet-200 dark:hover:border-violet-500/40',
}

export default function NetworkApp() {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Network Interfaces</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Active connections — external communication channels
        </p>
      </div>

      {/* Links */}
      <div className="flex-1 p-4 space-y-2.5">
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target={link.id !== 'email' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border transition-all group ${colorMap[link.color]}`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-thin shrink-0 bg-white/50 dark:bg-slate-900/30 border border-current/10">
              {link.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold">{link.label}</div>
              <div className="text-xs opacity-70 truncate">{link.handle}</div>
              <div className="text-xs opacity-50 mt-0.5">{link.description}</div>
            </div>
            <svg
              className="w-4 h-4 opacity-30 group-hover:opacity-70 transition-opacity shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700/60">
        <div className="font-mono text-xs text-slate-400 dark:text-slate-600">
          Philippines · UTC+8 · Open to remote opportunities
        </div>
      </div>
    </div>
  )
}
