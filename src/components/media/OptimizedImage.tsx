import React, { useState } from 'react'

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  aspectRatio?: string
  className?: string
  containerClassName?: string
  priority?: boolean
}

function getUnsplashSrcSet(src: string): string | undefined {
  if (!src.includes('images.unsplash.com')) return undefined
  const baseUrl = src.replace(/[?&]w=\d+/, '').replace(/[?&]q=\d+/, '')
  const sep = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${sep}w=480&q=75&auto=format&fit=crop 480w, ${baseUrl}${sep}w=800&q=75&auto=format&fit=crop 800w, ${baseUrl}${sep}w=1200&q=80&auto=format&fit=crop 1200w`
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  aspectRatio = '16/9',
  className = '',
  containerClassName = '',
  priority = false,
  srcSet,
  sizes,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const computedSrcSet = srcSet || getUnsplashSrcSet(src)
  const computedSizes = sizes || (computedSrcSet ? '(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 600px' : undefined)

  return (
    <div
      className={`relative overflow-hidden bg-[#E8E6DF] ${containerClassName}`}
      style={{ aspectRatio }}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-[#E3E0D8]" />
      )}
      
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1E] text-white/40 text-xs tracking-wider uppercase">
          Image Unavailable
        </div>
      ) : (
        <img
          src={src}
          srcSet={computedSrcSet}
          sizes={computedSizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  )
}

