import { AppDefinition } from '@/types'

export const APPS: AppDefinition[] = [
  {
    id: 'projects',
    title: 'Projects Application',
    icon: '🗂️',
    // Center-foreground: visible as focal point over all others on load
    defaultSize: { width: 850, height: 600 },
    defaultPosition: { x: 700, y: 150 }, // Right side
  },
  {
    id: 'skills',
    title: 'My Skills Application',
    icon: '📊',
    // Bottom-left quadrant
    defaultSize: { width: 580, height: 440 },
    defaultPosition: { x: 110, y: 440 }, // Bottom Left
  },
  {
    id: 'about',
    title: 'About Me',
    icon: '📄',
    defaultSize: { width: 600, height: 540 },
    defaultPosition: { x: 110, y: 30 },
  },
  {
    id: 'network',
    title: 'My Network',
    icon: '🌐',
    defaultSize: { width: 360, height: 300 },
    defaultPosition: { x: 520, y: 160 },
  },
  {
    id: 'contact',
    title: 'Contact Me',
    icon: '⌨️',
    // Top-right quadrant — taller so Run Code button is always fully visible
    defaultSize: { width: 620, height: 560 },
    defaultPosition: { x: 740, y: 30 },
  },
]
