import { useCallback } from 'react'
import { useWindowStore } from '@/store/windowStore'

export type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'

const MIN_W = 280
const MIN_H = 180

export function useResize(id: string) {
  const updateSizeAndPosition = useWindowStore((s) => s.updateSizeAndPosition)
  const bringToFront = useWindowStore((s) => s.bringToFront)

  const onMouseDown = useCallback(
    (e: React.MouseEvent, dir: ResizeDirection) => {
      if (typeof window !== 'undefined' && window.innerWidth < 768) return
      e.preventDefault()
      e.stopPropagation()

      bringToFront(id)

      const state = useWindowStore.getState()
      const win = state.windows[id]
      if (!win) return

      const startX = e.clientX
      const startY = e.clientY
      const startW = win.size.width
      const startH = win.size.height
      const startPX = win.position.x
      const startPY = win.position.y

      document.body.classList.add('dragging')

      const onMove = (ev: MouseEvent) => {
        const dx = ev.clientX - startX
        const dy = ev.clientY - startY

        let w = startW
        let h = startH
        let px = startPX
        let py = startPY

        // East: grow/shrink width rightward
        if (dir.includes('e')) {
          w = Math.max(MIN_W, Math.min(startW + dx, window.innerWidth - startPX - 4))
        }

        // South: grow/shrink height downward
        if (dir.includes('s')) {
          h = Math.max(MIN_H, Math.min(startH + dy, window.innerHeight - 48 - startPY - 4))
        }

        // West: grow/shrink width leftward, adjusting x position
        if (dir.includes('w')) {
          const rawW = startW - dx
          w = Math.max(MIN_W, rawW)
          px = rawW < MIN_W ? startPX + startW - MIN_W : Math.max(0, startPX + dx)
        }

        // North: grow/shrink height upward, adjusting y position
        if (dir.includes('n')) {
          const rawH = startH - dy
          h = Math.max(MIN_H, rawH)
          py = rawH < MIN_H ? startPY + startH - MIN_H : Math.max(0, startPY + dy)
        }

        updateSizeAndPosition(id, { width: w, height: h }, { x: px, y: py })
      }

      const onUp = () => {
        document.body.classList.remove('dragging')
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onUp)
      }

      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)
    },
    [id, updateSizeAndPosition, bringToFront]
  )

  return { onMouseDown }
}
