'use client'

import { useEffect, Suspense, lazy } from 'react'
import Image from 'next/image'
import { useWindowStore } from '@/store/windowStore'
import { APPS } from '@/lib/apps'
import DesktopIcon from './DesktopIcon'
import SystemWidgets from './SystemWidgets'
import Window from '../window/Window'
import Taskbar from '../taskbar/Taskbar'

// Lazy load all app components for performance
const ProjectsApp = lazy(() => import('../apps/ProjectsApp'))
const SkillsMonitorApp = lazy(() => import('../apps/SkillsMonitorApp'))
const AboutApp = lazy(() => import('../apps/AboutApp'))
const MusicPlayerApp = lazy(() => import('../apps/MusicPlayerApp'))
const HobbiesApp = lazy(() => import('../apps/HobbiesApp'))
const NetworkApp = lazy(() => import('../apps/NetworkApp'))
const ContactIDEApp = lazy(() => import('../apps/ContactIDEApp'))

const APP_COMPONENTS: Record<string, React.ComponentType> = {
  projects: ProjectsApp,
  skills: SkillsMonitorApp,
  about: AboutApp,
  music: MusicPlayerApp,
  hobbies: HobbiesApp,
  network: NetworkApp,
  contact: ContactIDEApp,
}

function AppLoader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-5 h-5 rounded-full border-2 border-sky-500/30 border-t-sky-500 animate-spin" />
    </div>
  )
}

export default function Desktop() {
  const { windows, initTheme } = useWindowStore()

  useEffect(() => {
    initTheme()
  }, [initTheme])

  return (
    <div className="h-screen w-screen overflow-hidden relative
      bg-gradient-to-br from-slate-100 via-slate-200/60 to-slate-100
      dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900">

      {/* Desktop workspace */}
      <div className="absolute inset-0 pb-12 flex">
        {/* Left icon column */}
        <div className="flex flex-col gap-0.5 p-3 pt-5 shrink-0 z-10">
          {APPS.map((app) => (
            <DesktopIcon key={app.id} app={app} />
          ))}
        </div>

        {/* Centered wallpaper profile */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-0 pointer-events-none select-none">
          <div className="rounded-full overflow-hidden border-6 border-white/20 shadow-2xl w-66 h-66 -mt-[10%]">
            <Image
              src="/freshten-avatar.jpg"
              alt="Freshten Rosales"
              width={264}
              height={264}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="text-center px-6 max-w-[1020px]">
            <p className="text-3xl font-semibold text-slate-800 dark:text-white/90 leading-[44px]">
              👋 I&apos;m{' '}
              <span className="text-sky-500">Freshten Rosales</span>,{' '}
              Front-End Website Developer and aspiring{' '}
              <span className="text-sky-400">Full-Stack Developer</span>.
            </p>
          </div>
        </div>

        {/* Right widgets — positioned absolutely */}
        <div className="absolute right-4 top-4 z-10">
          <SystemWidgets />
        </div>
      </div>

      {/* Draggable windows layer */}
      {APPS.map((app) => {
        const win = windows[app.id]
        if (!win) return null
        const AppComponent = APP_COMPONENTS[app.id]
        return (
          <Window key={app.id} win={win} icon={app.icon}>
            <Suspense fallback={<AppLoader />}>
              <AppComponent />
            </Suspense>
          </Window>
        )
      })}

      {/* Bottom taskbar */}
      <Taskbar />
    </div>
  )
}
