'use client'

import { useWindowStore } from '@/store/windowStore'
import { AppDefinition } from '@/types'

interface TabletIconProps {
  app: AppDefinition
}

export default function TabletIcon({ app }: TabletIconProps) {
  const { openWindow } = useWindowStore()

  return (
    <button
      onClick={() => openWindow(app.id)}
      className="flex flex-col items-center gap-2 p-3 rounded-xl
        bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm
        border border-slate-200/50 dark:border-slate-700/50
        hover:bg-white dark:hover:bg-slate-800
        hover:border-sky-300 dark:hover:border-sky-600
        transition-all duration-200 shadow-sm hover:shadow-md
        active:scale-95"
    >
      <span className="text-2xl">{app.icon}</span>
      <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center leading-tight">
        {app.title.replace('App', '').replace('.app', '')}
      </span>
    </button>
  )
}