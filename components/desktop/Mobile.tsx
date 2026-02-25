'use client'

import { useEffect, Suspense, lazy } from 'react'
import Image from 'next/image'
import { useWindowStore } from '@/store/windowStore'
import { APPS } from '@/lib/apps'
import MobileIcon from './MobileIcon'
import MobileWindow from '../window/MobileWindow'
import MobileTaskbar from '../taskbar/MobileTaskbar'

// Lazy load all app components for performance
const ProjectsApp = lazy(() => import('../apps/ProjectsApp'))
const SkillsMonitorApp = lazy(() => import('../apps/SkillsMonitorApp'))
const AboutApp = lazy(() => import('../apps/AboutApp'))
const HobbiesApp = lazy(() => import('../apps/HobbiesApp'))
const NetworkApp = lazy(() => import('../apps/NetworkApp'))
const ContactIDEApp = lazy(() => import('../apps/ContactIDEApp'))

const APP_COMPONENTS: Record<string, React.ComponentType> = {
  projects: ProjectsApp,
  skills: SkillsMonitorApp,
  about: AboutApp,
  hobbies: HobbiesApp,
  network: NetworkApp,
  contact: ContactIDEApp,
}

function AppLoader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 rounded-full border-2 border-sky-500/30 border-t-sky-500 animate-spin" />
    </div>
  )
}

export default function Mobile() {
  const { windows, initTheme } = useWindowStore()

  useEffect(() => {
    initTheme()
  }, [initTheme])

  return (
    <div className="h-screen w-screen overflow-hidden relative
      bg-gradient-to-br from-slate-100 via-slate-200/60 to-slate-100
      dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900">

      {/* Mobile home screen */}
      <div className="absolute inset-0 flex flex-col">
        {/* Top status bar area */}
        <div className="h-12 bg-black/20 dark:bg-black/40 flex items-center justify-center">
          <span className="text-xs text-slate-600 dark:text-slate-400">FreshtenOS</span>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto min-h-0">
          {/* Profile section - compact for mobile */}
          <div className="text-center mb-8">
            <div className="rounded-full overflow-hidden border-3 border-white/20 shadow-lg w-32 h-32 mx-auto mb-4">
              <Image
                src="/freshten-avatar.jpg"
                alt="Freshten Rosales"
                width={128}
                height={128}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <p className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white/90 leading-tight px-2">
              👋 I&apos;m{' '}
              <span className="text-sky-500">Freshten Rosales</span>,{' '}
              Front-End Developer
            </p>
          </div>

          {/* App grid - mobile style */}
          <div className="grid grid-cols-3 gap-6 max-w-xs">
            {APPS.map((app) => (
              <MobileIcon key={app.id} app={app} />
            ))}
          </div>
        </div>

        {/* Bottom home indicator */}
        <div className="h-8 flex items-center justify-center pb-2">
          <div className="w-32 h-1 bg-white/30 dark:bg-white/20 rounded-full"></div>
        </div>
      </div>

      {/* Mobile windows - full screen overlay */}
      {APPS.map((app) => {
        const win = windows[app.id]
        if (!win) return null
        const AppComponent = APP_COMPONENTS[app.id]
        return (
          <MobileWindow key={app.id} win={win} icon={app.icon}>
            <Suspense fallback={<AppLoader />}>
              <AppComponent />
            </Suspense>
          </MobileWindow>
        )
      })}

      {/* Mobile navigation */}
      <MobileTaskbar />
    </div>
  )
}