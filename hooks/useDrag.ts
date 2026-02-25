import { useCallback } from 'react'
import { useWindowStore } from '@/store/windowStore'

export function useDrag(id: string) {
  const updatePosition = useWindowStore((s) => s.updatePosition)

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (typeof window !== 'undefined' && window.innerWidth < 768) return
      e.preventDefault()

      const storeState = useWindowStore.getState()
      const win = storeState.windows[id]
      if (!win) return

      const startX = e.clientX - win.position.x
      const startY = e.clientY - win.position.y

      document.body.classList.add('dragging')

      const onMouseMove = (ev: MouseEvent) => {
        const current = useWindowStore.getState().windows[id]
        if (!current) return
        const newX = Math.max(0, Math.min(ev.clientX - startX, window.innerWidth - current.size.width))
        const newY = Math.max(0, Math.min(ev.clientY - startY, window.innerHeight - current.size.height - 48))
        updatePosition(id, { x: newX, y: newY })
      }

      const onMouseUp = () => {
        document.body.classList.remove('dragging')
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    },
    [id, updatePosition]
  )

  return { onMouseDown }
}
