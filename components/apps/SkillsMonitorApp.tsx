'use client'

const MODULES = [
  {
    id: 'frontend',
    name: 'Frontend Engine',
    status: 'Production Ready',
    statusColor: 'emerald',
    uptime: '99.9%',
    skills: ['React', 'TypeScript', 'Next.js', 'Redux', 'Tailwind CSS', 'Vite', 'Jest', 'MUI'],
    detail: 'Responsive, mobile-first interfaces with performance optimization',
  },
  {
    id: 'backend',
    name: 'Backend Integration',
    status: 'Stable',
    statusColor: 'sky',
    uptime: '99.5%',
    skills: ['FastAPI', 'Python', 'Node.js', 'REST APIs', 'PHP', 'Auth/RBAC', 'JWT', 'Linux'],
    detail: 'Full CRUD operations, authentication middleware, role-based access control',
  },
  {
    id: 'database',
    name: 'Database Layer',
    status: 'Stable',
    statusColor: 'sky',
    uptime: '99.9%',
    skills: ['MongoDB', 'PostgreSQL', 'Oracle', 'SQL', 'NoSQL'],
    detail: 'Multi-model database design, 5,000+ records under management',
  },
  {
    id: 'infra',
    name: 'Enterprise Infrastructure',
    status: 'Production Ready',
    statusColor: 'emerald',
    uptime: '99.9%',
    skills: ['Oracle Fusion Middleware', 'WebLogic Server', 'AWS', 'CI/CD', 'Git', 'Version Control'],
    detail: 'Managed enterprise middleware at Metrobank — 99.9% system uptime',
  },
  {
    id: 'tools',
    name: 'Tooling & Platforms',
    status: 'Scalable',
    statusColor: 'violet',
    uptime: '—',
    skills: ['WordPress', 'Elementor Pro', 'UI/UX Principles', 'SEO', 'Claude AI', 'Copilot', 'ChatGPT'],
    detail: 'CMS management, SEO optimization, AI-assisted development workflows',
  },
]

const statusStyles: Record<string, string> = {
  emerald: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  sky: 'bg-sky-50 dark:bg-sky-500/10 border-sky-100 dark:border-sky-500/20 text-sky-600 dark:text-sky-400',
  violet: 'bg-violet-50 dark:bg-violet-500/10 border-violet-100 dark:border-violet-500/20 text-violet-600 dark:text-violet-400',
}

const dotStyles: Record<string, string> = {
  emerald: 'bg-emerald-400',
  sky: 'bg-sky-400',
  violet: 'bg-violet-400',
}

export default function SkillsMonitorApp() {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800">
      {/* Header */}
      <div className="px-3 md:px-5 py-3 md:py-3.5 border-b border-slate-100 dark:border-slate-700/60">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-100">System Monitor</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Skill module registry — live status</p>
          </div>
          <div className="font-mono text-xs text-slate-400 dark:text-slate-500">
            MODULES: {MODULES.length} ACTIVE
          </div>
        </div>
      </div>

      {/* Table header — hidden on small screens where rows stack */}
      <div className="hidden sm:grid px-3 md:px-5 py-2 grid-cols-[1fr_auto_auto] gap-2 md:gap-4 border-b border-slate-100 dark:border-slate-700/60">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Module</span>
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right w-14">Uptime</span>
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right w-36">Status</span>
      </div>

      {/* Modules */}
      <div className="flex-1 overflow-auto">
        {MODULES.map((mod, i) => (
          <div
            key={mod.id}
            className={`px-3 md:px-5 py-3 md:py-4 ${i < MODULES.length - 1 ? 'border-b border-slate-100 dark:border-slate-700/40' : ''}`}
          >
            {/* Module row — desktop: 3-col grid; mobile: stacked */}
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-2 md:gap-4 items-start mb-2.5">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">{mod.name}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed">{mod.detail}</div>
              </div>
              <div className="font-mono text-xs text-slate-500 dark:text-slate-400 text-right tabular-nums pt-0.5 shrink-0 w-14">
                {mod.uptime}
              </div>
              <div className="w-36 flex justify-end shrink-0">
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-medium whitespace-nowrap ${statusStyles[mod.statusColor]}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${dotStyles[mod.statusColor]} animate-pulse`} />
                  <span className="hidden sm:inline">{mod.status}</span>
                  <span className="sm:hidden">OK</span>
                </div>
              </div>
            </div>
            {/* Mobile stacked layout */}
            <div className="sm:hidden mb-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">{mod.name}</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed">{mod.detail}</div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium shrink-0 ${statusStyles[mod.statusColor]}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${dotStyles[mod.statusColor]} animate-pulse`} />
                  <span>OK</span>
                </div>
              </div>
              {mod.uptime !== '—' && (
                <div className="font-mono text-xs text-slate-400 dark:text-slate-500 mt-1">
                  uptime: {mod.uptime}
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1">
              {mod.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-xs font-medium rounded-md
                    bg-slate-100 dark:bg-slate-700/60
                    text-slate-600 dark:text-slate-300
                    border border-slate-200/60 dark:border-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-3 md:px-5 py-2 md:py-2.5 border-t border-slate-100 dark:border-slate-700/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-1 md:gap-0">
        <span className="font-mono text-xs text-slate-400 dark:text-slate-600">
          freshten@os:~$ skill-monitor --status all
        </span>
        <span className="text-xs text-emerald-500 dark:text-emerald-400 font-medium">● All modules operational</span>
      </div>
    </div>
  )
}
