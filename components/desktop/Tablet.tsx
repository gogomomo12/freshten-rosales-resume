'use client'

import { useEffect, Suspense, lazy } from 'react'
import Image from 'next/image'
import { useWindowStore } from '@/store/windowStore'
import { APPS } from '@/lib/apps'
import TabletIcon from './TabletIcon'
import SystemWidgets from './SystemWidgets'
import TabletWindow from '../window/TabletWindow'
import TabletTaskbar from '../taskbar/TabletTaskbar'

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
      <div className="w-6 h-6 rounded-full border-2 border-sky-500/30 border-t-sky-500 animate-spin" />
    </div>
  )
}

export default function Tablet() {
  const { windows, initTheme } = useWindowStore()

  useEffect(() => {
    initTheme()
  }, [initTheme])

  return (
    <div className="h-screen w-screen overflow-hidden relative
      bg-gradient-to-br from-slate-100 via-slate-200/60 to-slate-100
      dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900">

      {/* Tablet workspace - simplified layout */}
      <div className="absolute inset-0 flex flex-col">
        {/* Top profile section - smaller on tablet */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 md:gap-6 p-4 overflow-y-auto min-h-0">
          <div className="rounded-full overflow-hidden border-4 border-white/20 shadow-xl w-36 h-36 md:w-48 md:h-48 shrink-0">
            <Image
              src="/freshten-avatar.jpg"
              alt="Freshten Rosales"
              width={192}
              height={192}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="text-center px-4 max-w-md">
            <p className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-white/90 leading-tight">
              👋 I&apos;m{' '}
              <span className="text-sky-500">Freshten Rosales</span>,{' '}
              Front-End Website Developer and aspiring{' '}
              <span className="text-sky-400">Full-Stack Developer</span>.
            </p>
          </div>
        </div>

        {/* Bottom app grid - tablet style */}
        <div className="p-4 pb-20">
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {APPS.map((app) => (
              <TabletIcon key={app.id} app={app} />
            ))}
          </div>
        </div>
      </div>

      {/* Tablet windows - simplified */}
      {APPS.map((app) => {
        const win = windows[app.id]
        if (!win) return null
        const AppComponent = APP_COMPONENTS[app.id]
        return (
          <TabletWindow key={app.id} win={win} icon={app.icon}>
            <Suspense fallback={<AppLoader />}>
              <AppComponent />
            </Suspense>
          </TabletWindow>
        )
      })}

      {/* Tablet taskbar */}
      <TabletTaskbar />
    </div>
  )
}