import React, { useState } from 'react'

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  aspectRatio?: string
  className?: string
  containerClassName?: string
  priority?: boolean
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  aspectRatio = '16/9',
  className = '',
  containerClassName = '',
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

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
