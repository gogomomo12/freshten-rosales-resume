'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

const TRACK = {
  title: 'Ambient Focus',
  artist: 'FreshtenOS Radio',
  src: '/audio/placeholder.mp3',
}

export default function MusicPlayerApp() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audio.src = TRACK.src
    audio.volume = volume
    audioRef.current = audio

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    }
    const onLoadedMetadata = () => setDuration(audio.duration)
    const onEnded = () => setIsPlaying(false)
    const onError = () => setHasError(true)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch(() => setHasError(true))
      setIsPlaying(true)
    }
  }, [isPlaying])

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    audio.currentTime = pct * duration
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="h-full flex flex-col items-center justify-center bg-slate-900 p-6 gap-6">
      {/* Album art */}
      <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 flex items-center justify-center shadow-xl">
        {isPlaying ? (
          <div className="w-20 h-20 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-sky-500/40 border border-sky-400/60 animate-pulse" />
          </div>
        ) : (
          <span className="text-6xl opacity-30">🎵</span>
        )}
      </div>

      {/* Track info */}
      <div className="text-center">
        <div className="text-base font-semibold text-slate-100">{TRACK.title}</div>
        <div className="text-sm text-slate-500 mt-0.5">{TRACK.artist}</div>
        {hasError && (
          <div className="text-xs text-amber-500/80 mt-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
            Add your audio file to /public/audio/placeholder.mp3
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full space-y-1">
        <div
          className="h-1.5 bg-slate-700 rounded-full cursor-pointer relative overflow-hidden"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-sky-500 rounded-full transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-600 font-mono tabular-nums">
          <span>{fmt(currentTime)}</span>
          <span>{duration ? fmt(duration) : '--:--'}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-5">
        <button className="text-slate-600 hover:text-slate-400 transition-colors text-xl" title="Previous">
          ⏮
        </button>
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-400 transition-colors flex items-center justify-center shadow-lg shadow-sky-500/20"
        >
          <span className="text-white text-lg">{isPlaying ? '⏸' : '▶'}</span>
        </button>
        <button className="text-slate-600 hover:text-slate-400 transition-colors text-xl" title="Next">
          ⏭
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 w-full">
        <span className="text-slate-600 text-sm">🔈</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
          className="flex-1 h-1.5 accent-sky-500 cursor-pointer"
        />
        <span className="text-slate-600 text-sm">🔊</span>
      </div>
    </div>
  )
}
