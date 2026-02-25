export type WindowState = {
  id: string
  title: string
  isOpen: boolean
  isMinimized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
}

export type AppDefinition = {
  id: string
  title: string
  icon: string
  defaultSize: { width: number; height: number }
  defaultPosition: { x: number; y: number }
}
