import { AppDefinition } from '@/types'

export const APPS: AppDefinition[] = [
  {
    id: 'projects',
    title: 'Projects.app',
    icon: '🗂️',
    // Center-foreground: visible as focal point over all others on load
    defaultSize: { width: 850, height: 600 },
    defaultPosition: { x: 700, y: 150 }, // Right side
  },
  {
    id: 'skills',
    title: 'SkillsMonitor.app',
    icon: '📊',
    // Bottom-left quadrant
    defaultSize: { width: 580, height: 440 },
    defaultPosition: { x: 110, y: 440 }, // Bottom Left
  },
  {
    id: 'about',
    title: 'About.txt',
    icon: '📄',
    // Top-left quadrant
    defaultSize: { width: 520, height: 380 },
    defaultPosition: { x: 110, y: 30 }, // Top Left
  },
  {
    id: 'hobbies',
    title: 'Hobbies.app',
    icon: '🎯',
    defaultSize: { width: 580, height: 440 },
    defaultPosition: { x: 460, y: 130 },
  },
  {
    id: 'network',
    title: 'Network.app',
    icon: '🌐',
    defaultSize: { width: 360, height: 300 },
    defaultPosition: { x: 520, y: 160 },
  },
  {
    id: 'contact',
    title: 'ContactIDE.app',
    icon: '⌨️',
    // Top-right quadrant — taller so Run Code button is always fully visible
    defaultSize: { width: 620, height: 560 },
    defaultPosition: { x: 740, y: 30 },
  },
]
