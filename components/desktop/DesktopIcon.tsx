'use client'

import { useWindowStore } from '@/store/windowStore'
import { AppDefinition } from '@/types'

interface DesktopIconProps {
  app: AppDefinition
}

export default function DesktopIcon({ app }: DesktopIconProps) {
  const { openWindow, windows } = useWindowStore()
  const win = windows[app.id]
  const isOpen = win?.isOpen && !win?.isMinimized

  return (
    <button
      onClick={() => openWindow(app.id)}
      className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl
        hover:bg-slate-200/50 dark:hover:bg-white/5
        active:bg-slate-300/50 dark:active:bg-white/10
        transition-colors group w-[80px]"
      title={app.title}
    >
      {/* Icon container — larger emoji */}
      <div
        className={`w-14 h-14 flex items-center justify-center text-3xl rounded-2xl transition-all
          ${isOpen
            ? 'ring-2 ring-sky-500/60 bg-sky-500/10'
            : 'bg-slate-200/40 dark:bg-slate-700/40'
          }`}
      >
        {app.icon}
      </div>

      {/* Label */}
      <span className="text-xs leading-tight text-center text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
        {app.title.replace('.app', '').replace('.txt', '')}
      </span>

      {/* Open indicator dot */}
      {win?.isOpen && (
        <div className={`w-1.5 h-1.5 rounded-full ${win.isMinimized ? 'bg-slate-400' : 'bg-sky-400'}`} />
      )}
    </button>
  )
}
