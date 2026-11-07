'use client'

import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

export const ImageFrame: React.FC<ImageProps> = ({ src, alt, width, height, fill, className, ...props }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn('overflow-hidden relative bg-muted', className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={cn(
          'size-full object-cover duration-700 ease-in-out',
          'group-hover:scale-[1.03]',
          isLoading
            ? 'scale-105 blur-2xl grayscale'
            : 'scale-100 blur-0 grayscale-0'
        )}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  )
}
