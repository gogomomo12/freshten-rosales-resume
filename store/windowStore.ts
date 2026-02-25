'use client'

import { create } from 'zustand'
import { WindowState } from '@/types'
import { APPS } from '@/lib/apps'

interface WindowStore {
  windows: Record<string, WindowState>
  maxZIndex: number
  theme: 'dark' | 'light'

  openWindow: (id: string) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  bringToFront: (id: string) => void
  updatePosition: (id: string, pos: { x: number; y: number }) => void
  updateSizeAndPosition: (
    id: string,
    size: { width: number; height: number },
    pos: { x: number; y: number }
  ) => void
  toggleTheme: () => void
  initTheme: () => void
  initWindows: (deviceType?: 'mobile' | 'tablet' | 'desktop') => void
}

// Windows open on first load — z-index = stacking order (higher = in front)
// skills (back) → about → contact → projects (front/focal)
const DEFAULT_OPEN: Record<string, number> = {
  skills: 11,
  about: 12,
  projects: 14,
}

const buildInitialWindows = (deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop'): Record<string, WindowState> => {
  const windows: Record<string, WindowState> = {}

  // Only auto-open apps on desktop
  const shouldAutoOpen = deviceType === 'desktop'
  const defaultOpenApps = shouldAutoOpen ? DEFAULT_OPEN : {}

  APPS.forEach((app) => {
    const defaultZ = defaultOpenApps[app.id]
    windows[app.id] = {
      id: app.id,
      title: app.title,
      isOpen: defaultZ !== undefined,
      isMinimized: false,
      zIndex: defaultZ ?? 10,
      position: app.defaultPosition,
      size: app.defaultSize,
    }
  })
  return windows
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: buildInitialWindows(),
  maxZIndex: 14, // Matches highest default open z-index
  theme: 'dark',

  openWindow: (id) => {
    const newZ = get().maxZIndex + 1
    set((state) => ({
      maxZIndex: newZ,
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isOpen: true,
          isMinimized: false,
          zIndex: newZ,
        },
      },
    }))
  },

  closeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: false, isMinimized: false },
      },
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true },
      },
    })),

  restoreWindow: (id) => {
    const newZ = get().maxZIndex + 1
    set((state) => ({
      maxZIndex: newZ,
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMinimized: false,
          isOpen: true,
          zIndex: newZ,
        },
      },
    }))
  },

  bringToFront: (id) => {
    const { maxZIndex, windows } = get()
    if (windows[id]?.zIndex === maxZIndex) return
    const newZ = maxZIndex + 1
    set((state) => ({
      maxZIndex: newZ,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], zIndex: newZ },
      },
    }))
  },

  updatePosition: (id, pos) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], position: pos },
      },
    })),

  updateSizeAndPosition: (id, size, pos) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], size, position: pos },
      },
    })),

  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem('freshten-theme', newTheme)
    } catch { }
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    set({ theme: newTheme })
  },

  initTheme: () => {
    // Only run on client
    if (typeof window === 'undefined') return
    try {
      const saved = localStorage.getItem('freshten-theme') as 'dark' | 'light' | null
      const theme = saved || 'light'
      document.documentElement.classList.toggle('dark', theme === 'dark')
      set({ theme })
    } catch { }
  },

  initWindows: (deviceType = 'desktop') => {
    set({ windows: buildInitialWindows(deviceType) })
  },
}))
