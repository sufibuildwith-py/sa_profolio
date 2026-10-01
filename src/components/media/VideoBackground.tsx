import React, { useRef, useEffect, useState } from 'react'

interface VideoBackgroundProps {
  src: string
  poster: string
  className?: string
  overlayOpacity?: number
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  poster,
  className = '',
  overlayOpacity = 0.35,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsLoaded(true)
    }

    const handleError = () => {
      setVideoError(true)
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)

    // Handle intersection observer to pause video when off-screen for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(video)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
      observer.disconnect()
    }
  }, [])

  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#0D0D10] ${className}`}>
      {/* Fallback poster image always present beneath */}
      <img
        src={poster}
        alt="SA Production live event stage backdrop"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          isLoaded && !videoError ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Video element */}
      {!videoError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          disablePictureInPicture
          tabIndex={-1}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Subtle cinematic veil gradient */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0D10]/80 via-transparent to-[#0D0D10]/40"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  )
}
