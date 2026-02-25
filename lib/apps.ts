import { AppDefinition } from '@/types'

export const APPS: AppDefinition[] = [
  {
    id: 'projects',
    title: 'Projects.app',
    icon: '🗂️',
    // Center-foreground: visible as focal point over all others on load
    defaultSize: { width: 700, height: 500 },
    defaultPosition: { x: 350, y: 170 },
  },
  {
    id: 'skills',
    title: 'SkillsMonitor.app',
    icon: '📊',
    // Bottom-left quadrant
    defaultSize: { width: 580, height: 440 },
    defaultPosition: { x: 90, y: 360 },
  },
  {
    id: 'about',
    title: 'About.txt',
    icon: '📄',
    // Top-left quadrant
    defaultSize: { width: 520, height: 380 },
    defaultPosition: { x: 90, y: 35 },
  },
  {
    id: 'music',
    title: 'MusicPlayer.app',
    icon: '🎵',
    defaultSize: { width: 320, height: 340 },
    defaultPosition: { x: 500, y: 200 },
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
    defaultPosition: { x: 650, y: 35 },
  },
]
