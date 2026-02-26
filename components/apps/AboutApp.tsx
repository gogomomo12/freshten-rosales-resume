'use client'

const ABOUT_SECTIONS = [
  {
    icon: '👨‍💻',
    title: 'Freshten Zapata Rosales',
    subtitle: 'Frontend Developer · Makati, Philippines',
    description:
      'Frontend Developer with production experience building full-stack web applications using React, TypeScript, and Python/FastAPI. Strong background in enterprise middleware administration and system infrastructure. Experienced delivering real-time features, performance-optimized interfaces, and automated backend systems in production environments serving 500+ daily active users.',
    tags: [],
    full: true,
  },
]

const EXPERIENCE = [
  {
    icon: '🏢',
    title: 'Lexcode Inc.',
    subtitle: 'Frontend Developer · May 2024 – Present',
    description:
      'Built 3 full-stack web applications in production. Engineered WebSocket real-time system with 60% latency reduction. Achieved 95%+ mobile usability score. Built PDF automation pipeline (75% processing time reduction) and implemented dynamic pricing engine with 99.99% accuracy.',
    tags: ['React', 'TypeScript', 'WebSocket', 'FastAPI', 'MongoDB'],
  },
  {
    icon: '🏦',
    title: 'Metrobank, Taguig City',
    subtitle: 'Middleware Administrator · Jan 2023 – May 2024',
    description:
      'Managed Oracle Fusion Middleware and WebLogic Server infrastructure. Maintained 99.9% system uptime across enterprise banking systems. Monitored performance metrics and diagnosed complex infrastructure issues.',
    tags: ['Oracle Middleware', 'WebLogic', 'Linux', 'Performance Monitoring'],
  },
]

const EXTRAS = [
  {
    icon: '⚙️',
    title: 'Engineering Principles',
    subtitle: 'How I approach problems',
    description:
      'Performance-first: measure before optimizing. System-level thinking: understand the full stack. Clean, typed code with clear separation of concerns. Real-time by design: WebSocket over polling where it matters. Reliability: uptime, accuracy, and observability are metrics.',
    tags: ['Performance-first', 'Clean Code', 'System Thinking'],
  },
  {
    icon: '🎓',
    title: 'Batangas State University',
    subtitle: 'BS Computer Science (BSCS)',
    description:
      'Earned a Bachelor of Science in Computer Science, building a solid foundation in algorithms, data structures, software engineering, and systems design.',
    tags: ['BSCS', 'Computer Science', 'Philippines'],
  },
  {
    icon: '🏆',
    title: 'Lexcodian of the Month',
    subtitle: 'March 2025 · Lexcode Inc.',
    description:
      'Recognized for outstanding performance and exceptional teamwork. Awarded by Lexcode Inc. Philippines in March 2025.',
    tags: ['Award', 'Recognition', 'March 2025'],
  },
]

const HOBBIES = [
  {
    icon: '🎮',
    title: 'Gaming',
    subtitle: 'Strategy, reflexes & storytelling',
    description:
      "Whether it's competitive multiplayer or story-driven RPGs, gaming sharpens problem-solving instincts and keeps the mind sharp. Always up for a session.",
    tags: ['RPG', 'Multiplayer', 'Strategy'],
  },
  {
    icon: '📺',
    title: 'Anime & Horror Movies',
    subtitle: 'Storytelling across genres',
    description:
      'Big fan of well-crafted narratives — from epic anime arcs to horror films that keep you on edge. Appreciating how great stories are structured and paced.',
    tags: ['Anime', 'Horror', 'Movies'],
  },
  {
    icon: '🤝',
    title: 'Hangouts',
    subtitle: 'Always down for good company',
    description:
      "Whether it's a chill night out or spontaneous plans with friends, I'm always ready. Good conversations and great company recharge me outside of work.",
    tags: ['Social', 'Friends', 'Good Vibes'],
  },
  {
    icon: '🏃',
    title: 'Jogging',
    subtitle: 'Clearing the mind, one run at a time',
    description:
      'Jogging is my reset button — it clears my head, boosts energy, and gives me space to think through ideas away from the screen.',
    tags: ['Fitness', 'Outdoors', 'Mindfulness'],
  },
]

function Card({ icon, title, subtitle, description, tags }: {
  icon: string
  title: string
  subtitle: string
  description: string
  tags: string[]
}) {
  return (
    <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-700/60 bg-slate-50/60 dark:bg-slate-900/40 hover:border-slate-200 dark:hover:border-slate-600/60 transition-colors">
      <div className="flex items-start gap-3 mb-2.5">
        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-xl shrink-0">
          {icon}
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>
          <div className="text-xs text-slate-400 dark:text-slate-500">{subtitle}</div>
        </div>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{description}</p>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</span>
      <div className="flex-1 h-px bg-slate-100 dark:bg-slate-700/60" />
    </div>
  )
}

export default function AboutApp() {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60 shrink-0 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">About Me</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Profile, experience, education & interests
          </p>
        </div>
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0
            bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30
            text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-colors"
        >
          ⬇ Resume
        </a>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4 min-h-0">

        {/* Profile */}
        <SectionLabel label="Profile" />
        {ABOUT_SECTIONS.map((s) => <Card key={s.title} {...s} />)}

        {/* Experience */}
        <SectionLabel label="Experience" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXPERIENCE.map((s) => <Card key={s.title} {...s} />)}
        </div>

        {/* Education, Principles & Recognition */}
        <SectionLabel label="Background" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXTRAS.map((s) => <Card key={s.title} {...s} />)}
        </div>

        {/* Hobbies */}
        <SectionLabel label="Personal Interests" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {HOBBIES.map((h) => <Card key={h.title} {...h} />)}
        </div>

      </div>
    </div>
  )
}
