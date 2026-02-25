'use client'

import { useWindowStore } from '@/store/windowStore'
import { AppDefinition } from '@/types'

interface MobileIconProps {
  app: AppDefinition
}

export default function MobileIcon({ app }: MobileIconProps) {
  const { openWindow } = useWindowStore()

  return (
    <button
      onClick={() => openWindow(app.id)}
      className="flex flex-col items-center gap-1 p-2 rounded-lg
        bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
        hover:bg-white/80 dark:hover:bg-slate-800/80
        active:bg-white dark:active:bg-slate-800
        transition-all duration-150 active:scale-95"
    >
      <span className="text-3xl">{app.icon}</span>
      <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center leading-tight">
        {app.title.replace('App', '').replace('.app', '')}
      </span>
    </button>
  )
}