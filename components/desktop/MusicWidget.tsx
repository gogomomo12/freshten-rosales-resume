'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

const TRACK = {
    title: 'Ambient Focus',
    artist: 'FreshtenOS Radio',
    src: '/audio/Ambient-Sound.mp3',
}

export default function MusicWidget() {
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
        <div className="bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 rounded-xl p-4 backdrop-blur-sm flex flex-col gap-3">
            <div className="text-xs font-semibold text-sky-500 dark:text-sky-400 tracking-widest uppercase">
                Music Player
            </div>

            {/* Track info and controls row */}
            <div className="flex items-center gap-3">
                {/* Album art small */}
                <div className="w-12 h-12 shrink-0 rounded-lg bg-slate-200 dark:bg-slate-700 border border-slate-300/50 dark:border-slate-600/50 flex items-center justify-center shadow-sm relative overflow-hidden">
                    {isPlaying ? (
                        <div className="absolute inset-0 bg-sky-500/10 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-sky-500/40 border border-sky-400/60 animate-pulse" />
                        </div>
                    ) : (
                        <span className="text-xl opacity-50">🎵</span>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{TRACK.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{TRACK.artist}</div>
                </div>

                {/* Play/Pause Button */}
                <button
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-sky-500 hover:bg-sky-400 transition-colors flex items-center justify-center shadow-md shadow-sky-500/20 shrink-0"
                >
                    <span className="text-white text-[10px] leading-none">{isPlaying ? '⏸' : '▶'}</span>
                </button>
            </div>

            {hasError && (
                <div className="text-[10px] text-amber-500 dark:text-amber-400 mt-1">
                    Add audio file to /audio/Ambient-Sound.mp3
                </div>
            )}

            {/* Progress */}
            <div className="space-y-1 mt-1">
                <div
                    className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer relative overflow-hidden"
                    onClick={handleProgressClick}
                >
                    <div
                        className="h-full bg-sky-500 rounded-full transition-none"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                    <span>{fmt(currentTime)}</span>
                    <span>{duration ? fmt(duration) : '--:--'}</span>
                </div>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 w-full mt-1">
                <span className="text-slate-400 dark:text-slate-500 text-[10px] leading-none">🔈</span>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolume}
                    className="flex-1 h-1 accent-sky-500 cursor-pointer"
                />
            </div>
        </div>
    )
}
