'use client'

import { useState, useEffect } from 'react'
import { useWindowStore } from '@/store/windowStore'
import Desktop from './desktop/Desktop'
import Tablet from './desktop/Tablet'
import Mobile from './desktop/Mobile'

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

export default function ResponsivePortfolio() {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')
  const { initWindows } = useWindowStore()

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth

      if (width < 768) {
        setDeviceType('mobile')
      } else if (width < 1024) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    checkDeviceType()
    window.addEventListener('resize', checkDeviceType)
    return () => window.removeEventListener('resize', checkDeviceType)
  }, [])

  useEffect(() => {
    initWindows(deviceType)
  }, [deviceType, initWindows])

  switch (deviceType) {
    case 'mobile':
      return <Mobile />
    case 'tablet':
      return <Tablet />
    default:
      return <Desktop />
  }
}