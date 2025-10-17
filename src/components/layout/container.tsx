import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'full'
}

/**
 * Container component
 * Max width: 1440px with 64px horizontal padding
 * Matches Figma design system
 */
export function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        size === 'default' && 'max-w-[1440px] px-16',
        size === 'full' && 'max-w-full',
        className
      )}
    >
      {children}
    </div>
  )
}
