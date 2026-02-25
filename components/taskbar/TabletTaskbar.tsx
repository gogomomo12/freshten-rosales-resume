'use client'

import { useWindowStore } from '@/store/windowStore'
import { APPS } from '@/lib/apps'

export default function TabletTaskbar() {
  const { windows, openWindow, minimizeWindow } = useWindowStore()

  const openApps = APPS.filter(app => windows[app.id]?.isOpen)

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-center h-full px-4">
        <div className="flex items-center gap-2">
          {openApps.map((app) => {
            const win = windows[app.id]
            const isMinimized = win?.isMinimized

            return (
              <button
                key={app.id}
                onClick={() => {
                  if (isMinimized) {
                    openWindow(app.id)
                  } else {
                    minimizeWindow(app.id)
                  }
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all
                  ${isMinimized
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    : 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300'
                  }`}
              >
                <span className="text-sm">{app.icon}</span>
                <span className="text-xs font-medium">
                  {app.title.replace('App', '').replace('.app', '')}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}