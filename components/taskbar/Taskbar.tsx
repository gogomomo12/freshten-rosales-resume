'use client'

import { useState, useEffect } from 'react'
import { useWindowStore } from '@/store/windowStore'
import { APPS } from '@/lib/apps'

export default function Taskbar() {
  const { windows, restoreWindow, bringToFront, theme, toggleTheme } = useWindowStore()
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  const openWindows = Object.values(windows).filter((w) => w.isOpen)
  const getIcon = (id: string) => APPS.find((a) => a.id === id)?.icon ?? '🗂️'

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 z-[9999]
      bg-white/90 dark:bg-slate-900/95
      border-t border-slate-200/60 dark:border-slate-700/50
      backdrop-blur-xl
      flex items-center px-4 gap-3">

      {/* Logo */}
      <div className="shrink-0 flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-sky-500 flex items-center justify-center">
          <span className="text-white text-xs font-bold">F</span>
        </div>
        <span className="text-sm font-bold text-sky-600 dark:text-sky-400 tracking-widest uppercase hidden sm:block">
          FreshtenOS
        </span>
      </div>

      <div className="w-px h-5 bg-slate-200 dark:bg-slate-700" />

      {/* Open windows */}
      <div className="flex-1 flex items-center gap-1.5 overflow-x-auto min-w-0">
        {openWindows.length === 0 && (
          <span className="text-xs text-slate-400 dark:text-slate-600 italic">No open windows</span>
        )}
        {openWindows.map((win) => (
          <button
            key={win.id}
            onClick={() => {
              if (win.isMinimized) restoreWindow(win.id)
              else bringToFront(win.id)
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all shrink-0 max-w-[160px]
              ${win.isMinimized
                ? 'text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/50'
                : 'text-slate-700 dark:text-slate-200 bg-slate-200/80 dark:bg-slate-700/70 hover:bg-slate-300/80 dark:hover:bg-slate-600/70'
              }`}
          >
            <span className="text-base leading-none">{getIcon(win.id)}</span>
            <span className="truncate">{win.title.replace('.app', '').replace('.txt', '')}</span>
            {win.isMinimized && <span className="text-slate-300 dark:text-slate-600">—</span>}
          </button>
        ))}
      </div>

      <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 shrink-0" />

      {/* Right controls */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={toggleTheme}
          className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors text-xl"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <span className="text-sm text-slate-500 dark:text-slate-400 tabular-nums font-mono">{time}</span>
      </div>
    </div>
  )
}
