'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useWindowStore } from '@/store/windowStore'
import { WindowState } from '@/types'

interface MobileWindowProps {
  win: WindowState
  icon?: string
  children: React.ReactNode
}

export default function MobileWindow({ win, icon, children }: MobileWindowProps) {
  const { closeWindow, bringToFront } = useWindowStore()

  const isVisible = win.isOpen && !win.isMinimized

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={win.id}
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-50 bg-white dark:bg-slate-800 overflow-hidden"
          onClick={() => bringToFront(win.id)}
        >
          {/* Mobile window header */}
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

          {/* Content - full screen mobile experience */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 min-h-0">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}