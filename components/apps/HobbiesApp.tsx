'use client'

const HOBBIES = [
  {
    icon: '📷',
    title: 'Photography',
    subtitle: 'Structured visual planning',
    description:
      'Approach photography like a system design problem — lighting conditions, composition, timing, and post-processing as configurable parameters. Each shoot is a planned workflow.',
    tags: ['Composition', 'Manual Settings', 'Post-Processing'],
  },
  {
    icon: '🌍',
    title: 'Language Systems',
    subtitle: 'Pattern recognition across cultures',
    description:
      'Studying languages through the lens of structural patterns — grammar as type systems, vocabulary as API surfaces. Currently exploring Japanese and Spanish syntax.',
    tags: ['Japanese', 'Spanish', 'Linguistics'],
  },
  {
    icon: '🎌',
    title: 'Cultural Immersion',
    subtitle: 'Contextual understanding',
    description:
      'Deep interest in how cultural systems shape communication patterns, design aesthetics, and problem-solving frameworks across different regions and traditions.',
    tags: ['East Asia', 'Mediterranean', 'Southeast Asia'],
  },
  {
    icon: '🍷',
    title: 'Food & Wine Pairing',
    subtitle: 'Flavor systems thinking',
    description:
      'Approaching culinary pairing as a pattern-matching exercise — understanding why certain flavor profiles interact, acidity balances, and sensory contrasts work together.',
    tags: ['Flavor Profiles', 'Wine Regions', 'Pairing Logic'],
  },
]

export default function HobbiesApp() {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Personal Interests</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Beyond the terminal — how I think outside of code
        </p>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
        {HOBBIES.map((hobby) => (
          <div
            key={hobby.title}
            className="p-4 rounded-xl border border-slate-100 dark:border-slate-700/60
              bg-slate-50/60 dark:bg-slate-900/40
              hover:border-slate-200 dark:hover:border-slate-600/60 transition-colors"
          >
            <div className="flex items-start gap-3 mb-2.5">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-2xl shrink-0">
                {hobby.icon}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{hobby.title}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500">{hobby.subtitle}</div>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              {hobby.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {hobby.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-medium rounded-md
                    bg-slate-100 dark:bg-slate-700/60
                    text-slate-500 dark:text-slate-400
                    border border-slate-200/60 dark:border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
