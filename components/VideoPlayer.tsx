'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './VideoPlayer.module.css' // You'll need to create this file

type VideoPlayerProps = {
  src?: string
  autoplay?: boolean
}

export default function VideoPlayer({
  src = '/vids/The-Fabba-Show-Promo.mp4',
  autoplay = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  // Set initial states based on autoplay prop
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.33)
  const [isMuted, setIsMuted] = useState(autoplay) // Muted if autoplay is true
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Update progress as video plays
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime
      const duration = videoRef.current.duration
      setProgress((current / duration) * 100)
      setCurrentTime(current)
    }
  }

  // Allow seeking by clicking on progress bar
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * videoRef.current.duration
    }
  }

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setVolume(value)
    if (videoRef.current) {
      videoRef.current.volume = value
      setIsMuted(value === 0)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  // Format time display (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Set duration once video metadata is loaded
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedMetadata = () => {
        setDuration(video.duration)
        video.volume = 0.33
      }
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [])

  // Handle autoplay when component mounts
  useEffect(() => {
    const video = videoRef.current
    if (video && autoplay) {
      // Most browsers require videos to be muted for autoplay
      video.muted = true
      video.play().catch((err) => {
        console.log('Autoplay was prevented:', err)
        // Reset playing state if autoplay fails
        setIsPlaying(false)
      })
    }
  }, [autoplay])

  return (
    <section className={styles.videoPlayer}>
      <div className={styles.playerContainer}>
        <video
          ref={videoRef}
          className={styles.video}
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          muted={isMuted}
        >
          <source src={src} type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        <div className={styles.controls}>
          <button
            className={styles.playButton}
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>

          <div
            className={styles.progressBar}
            ref={progressRef}
            onClick={handleProgressClick}
          >
            <div
              className={styles.progressFilled}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className={styles.timeDisplay}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <div className={styles.volumeControl}>
            <button onClick={toggleMute} className={styles.volumeButton}>
              {isMuted ? '🔇' : '🔊'}
            </button>
            <input
              type='range'
              min='0'
              max='1'
              step='0.01'
              value={volume}
              onChange={handleVolumeChange}
              className={styles.volumeSlider}
            />
          </div>

          <button
            className={styles.fullscreenButton}
            onClick={toggleFullscreen}
            aria-label='Fullscreen'
          >
            ⛶
          </button>
        </div>
      </div>
    </section>
  )
}
