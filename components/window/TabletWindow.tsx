'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWindowStore } from '@/store/windowStore'
import { WindowState } from '@/types'

interface TabletWindowProps {
  win: WindowState
  icon?: string
  children: React.ReactNode
}

export default function TabletWindow({ win, icon, children }: TabletWindowProps) {
  const { closeWindow, bringToFront } = useWindowStore()
  const [isMinimized, setIsMinimized] = useState(false)

  const isVisible = win.isOpen && !win.isMinimized && !isMinimized

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={win.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-4 z-50 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          onClick={() => bringToFront(win.id)}
        >
          {/* Tablet window header */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              {icon && <span className="text-lg">{icon}</span>}
              <span className="font-medium text-slate-800 dark:text-slate-200">{win.title}</span>
            </div>

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeWindow(win.id)
              }}
              className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white text-sm"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 min-h-0">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}