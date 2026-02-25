'use client'

import { useState, useEffect } from 'react'
import { useWindowStore } from '@/store/windowStore'
import MusicWidget from './MusicWidget'

const STATUS_ROWS = [
  ['System', 'Online'],
  ['Role', 'Frontend Developer'],
  ['Spec.', 'Real-Time Systems'],
  ['Exp.', 'Enterprise + Production'],
  ['Location', 'Philippines'],
]

export default function SystemWidgets() {
  const { theme, toggleTheme } = useWindowStore()
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
      setDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }))
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hidden md:flex flex-col gap-3 w-64">
      {/* Status panel */}
      <div className="bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
        <div className="text-xs font-semibold text-sky-500 dark:text-sky-400 tracking-widest uppercase mb-3">
          System Status
        </div>
        <div className="space-y-2.5">
          {STATUS_ROWS.map(([key, val]) => (
            <div key={key} className="flex justify-between items-start gap-2 text-sm">
              <span className="text-slate-400 dark:text-slate-500 shrink-0">{key}</span>
              <span className="text-slate-700 dark:text-slate-200 font-medium text-right">{val}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-md text-emerald-500 dark:text-emerald-400">Open to New Opportunities</span>
        </div>
      </div>

      {/* Clock */}
      <div className="bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
        <div className="text-xs font-semibold text-sky-500 dark:text-sky-400 tracking-widest uppercase mb-2">
          Clock
        </div>
        <div className="font-mono text-xl font-semibold text-slate-800 dark:text-slate-100 tabular-nums tracking-tight">
          {time}
        </div>
        <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">{date}</div>
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 rounded-xl px-4 py-3 backdrop-blur-sm
          text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white
          hover:bg-slate-100/80 dark:hover:bg-slate-700/60 transition-all
          flex items-center gap-2.5"
      >
        <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
      </button>

      {/* Music Widget */}
      <MusicWidget />
    </div>
  )
}
