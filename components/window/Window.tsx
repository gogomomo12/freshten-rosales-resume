'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWindowStore } from '@/store/windowStore'
import { useDrag } from '@/hooks/useDrag'
import { useResize, ResizeDirection } from '@/hooks/useResize'
import { WindowState } from '@/types'

interface WindowProps {
  win: WindowState
  icon?: string
  children: React.ReactNode
}

const HANDLES: { dir: ResizeDirection; cls: string }[] = [
  { dir: 'n',  cls: 'left-3 right-3 -top-1 h-2 cursor-ns-resize' },
  { dir: 's',  cls: 'left-3 right-3 -bottom-1 h-2 cursor-ns-resize' },
  { dir: 'e',  cls: 'top-3 bottom-3 -right-1 w-2 cursor-ew-resize' },
  { dir: 'w',  cls: 'top-3 bottom-3 -left-1 w-2 cursor-ew-resize' },
  { dir: 'ne', cls: '-top-1 -right-1 w-4 h-4 cursor-nesw-resize' },
  { dir: 'nw', cls: '-top-1 -left-1 w-4 h-4 cursor-nwse-resize' },
  { dir: 'se', cls: '-bottom-1 -right-1 w-4 h-4 cursor-nwse-resize' },
  { dir: 'sw', cls: '-bottom-1 -left-1 w-4 h-4 cursor-nesw-resize' },
]

const CloseIcon = () => (
  <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-full h-full">
    <line x1="1.5" y1="1.5" x2="6.5" y2="6.5" />
    <line x1="6.5" y1="1.5" x2="1.5" y2="6.5" />
  </svg>
)

const MinimizeIcon = () => (
  <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-full h-full">
    <line x1="1.5" y1="4" x2="6.5" y2="4" />
  </svg>
)

const MaximizeIcon = () => (
  <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <polyline points="1,3 1,1 3,1" />
    <polyline points="5,7 7,7 7,5" />
    <line x1="1.5" y1="1.5" x2="3.5" y2="3.5" />
    <line x1="6.5" y1="6.5" x2="4.5" y2="4.5" />
  </svg>
)

const RestoreIcon = () => (
  <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <polyline points="3,1 1,1 1,3" />
    <polyline points="7,5 7,7 5,7" />
    <line x1="1.5" y1="1.5" x2="3.5" y2="3.5" />
    <line x1="6.5" y1="6.5" x2="4.5" y2="4.5" />
  </svg>
)

export default function Window({ win, icon, children }: WindowProps) {
  const { closeWindow, minimizeWindow, bringToFront, updateSizeAndPosition } = useWindowStore()
  const { onMouseDown: dragMouseDown } = useDrag(win.id)
  const { onMouseDown: resizeMouseDown } = useResize(win.id)

  const [isMobile, setIsMobile] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [preMaximize, setPreMaximize] = useState<{
    position: { x: number; y: number }
    size: { width: number; height: number }
  } | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const toggleMaximize = () => {
    if (isMaximized && preMaximize) {
      updateSizeAndPosition(win.id, preMaximize.size, preMaximize.position)
      setIsMaximized(false)
      setPreMaximize(null)
    } else {
      setPreMaximize({ position: { ...win.position }, size: { ...win.size } })
      updateSizeAndPosition(
        win.id,
        { width: window.innerWidth, height: window.innerHeight - 48 },
        { x: 0, y: 0 }
      )
      setIsMaximized(true)
    }
    bringToFront(win.id)
  }

  const isVisible = win.isOpen && !win.isMinimized
  const canDrag = !isMobile && !isMaximized
  const canResize = !isMobile && !isMaximized

  const style = isMobile
    ? { left: 0, top: 0, width: '100vw', height: 'calc(100vh - 48px)', zIndex: win.zIndex }
    : { left: win.position.x, top: win.position.y, width: win.size.width, height: win.size.height, zIndex: win.zIndex }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={win.id}
          initial={{ opacity: 0, scale: 0.96, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 6 }}
          transition={{ duration: 0.14, ease: 'easeOut' }}
          className="fixed"
          style={style}
          onClick={() => bringToFront(win.id)}
        >
          {/* Visual window frame */}
          <div
            className={`absolute inset-0 overflow-hidden flex flex-col transition-[border-radius] duration-200
              border border-slate-200/60 dark:border-slate-700/60
              shadow-xl dark:shadow-black/40
              bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl
              ${isMaximized ? 'rounded-none' : 'rounded-xl'}`}
          >
            {/* Title bar — h-12 (48px) for comfortable sizing */}
            <div
              className="flex items-center gap-3 px-4 h-12 shrink-0 select-none
                bg-slate-100/90 dark:bg-slate-900/80
                border-b border-slate-200/60 dark:border-slate-700/50"
              style={{ cursor: canDrag ? 'grab' : 'default' }}
              onMouseDown={canDrag ? dragMouseDown : undefined}
              onDoubleClick={() => { if (!isMobile) toggleMaximize() }}
            >
              {/* Traffic lights */}
              <div className="flex gap-2 shrink-0">
                <button
                  title="Close"
                  onClick={(e) => { e.stopPropagation(); closeWindow(win.id) }}
                  className="w-5 h-5 rounded-full bg-red-400/90 hover:bg-red-500 transition-colors
                    flex items-center justify-center text-red-900"
                >
                  <span className="w-[11px] h-[11px] opacity-70 hover:opacity-100 transition-opacity">
                    <CloseIcon />
                  </span>
                </button>

                <button
                  title="Minimize"
                  onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id) }}
                  className="w-5 h-5 rounded-full bg-yellow-400/90 hover:bg-yellow-500 transition-colors
                    flex items-center justify-center text-yellow-900"
                >
                  <span className="w-[11px] h-[11px] opacity-70 hover:opacity-100 transition-opacity">
                    <MinimizeIcon />
                  </span>
                </button>

                <button
                  title={isMaximized ? 'Restore' : 'Maximize'}
                  onClick={(e) => { e.stopPropagation(); toggleMaximize() }}
                  className="w-5 h-5 rounded-full bg-emerald-400/90 hover:bg-emerald-500 transition-colors
                    flex items-center justify-center text-emerald-900"
                >
                  <span className="w-[11px] h-[11px] opacity-70 hover:opacity-100 transition-opacity">
                    {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
                  </span>
                </button>
              </div>

              {/* App icon + title */}
              <div className="flex-1 flex items-center justify-center gap-2 min-w-0">
                {icon && <span className="text-base leading-none shrink-0">{icon}</span>}
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-wide truncate">
                  {win.title}
                </span>
              </div>

              {/* Balancing spacer (matches traffic lights width: 3×20px + 2×8px = 76px) */}
              <div className="w-[76px] shrink-0" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto min-h-0">
              {children}
            </div>
          </div>

          {/* Resize handles */}
          {canResize && HANDLES.map(({ dir, cls }) => (
            <div key={dir} className={`absolute ${cls}`} onMouseDown={(e) => resizeMouseDown(e, dir)} />
          ))}

          {/* SE corner resize indicator */}
          {canResize && (
            <div className="absolute bottom-2.5 right-2.5 flex gap-0.5 pointer-events-none opacity-25">
              <div className="flex flex-col gap-0.5">
                <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
              </div>
              <div className="flex flex-col gap-0.5 mt-auto">
                <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
