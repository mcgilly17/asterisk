'use client'

import { useEffect, useRef, useState } from 'react'
import type { AsciiBackgroundParams, MotionMode } from '@/lib/ascii-background-config'
import { DEFAULT_PARAMS, PRESETS } from '@/lib/ascii-background-config'
import { cn } from '@/lib/utils'
import { AsciiRenderer } from './ascii-background-renderer'

interface AsciiBackgroundProps {
  preset?: keyof typeof PRESETS
  theme?: 'dark' | 'light'
  className?: string
  motionMode?: MotionMode
  onFlipStart?: () => void
  onFlipLand?: (result: unknown) => void
  onStreakChange?: (n: number) => void
}

export function AsciiBackground({
  preset = 'midnight-term',
  theme = 'dark',
  className,
  motionMode = 'auto',
  onFlipStart,
  onFlipLand,
  onStreakChange,
}: AsciiBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<AsciiRenderer | null>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Initialize renderer
  useEffect(() => {
    if (!canvasRef.current) return

    // Determine motion mode
    const effectiveMotionMode =
      motionMode === 'auto' ? (isReducedMotion ? 'reduced' : 'normal') : motionMode

    // Build params
    let params: AsciiBackgroundParams = { ...DEFAULT_PARAMS }

    // Apply preset
    if (preset && PRESETS[preset]) {
      params = { ...params, ...PRESETS[preset] }
    }

    // Apply reduced motion preset if needed
    if (effectiveMotionMode === 'reduced') {
      params = { ...params, ...PRESETS.reduced }
    }

    // Override with props
    params.theme = theme
    params.motionMode = effectiveMotionMode

    // Create renderer
    const renderer = new AsciiRenderer(canvasRef.current, params)
    rendererRef.current = renderer

    // Start animation
    renderer.start()

    return () => {
      renderer.destroy()
      rendererRef.current = null
    }
  }, [preset, theme, isReducedMotion, motionMode])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return

      const { clientWidth, clientHeight } = containerRef.current
      rendererRef.current.resize(clientWidth, clientHeight)
    }

    // Initial resize
    handleResize()

    // Debounced resize handler
    let timeout: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(timeout)
      timeout = setTimeout(handleResize, 150)
    }

    window.addEventListener('resize', debouncedResize)
    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(timeout)
    }
  }, [])

  // Event hooks placeholder
  // TODO: Wire up flip/streak events when needed
  // These would be called from parent components
  useEffect(() => {
    if (!rendererRef.current) return
    // For now, just expose the renderer for future hookup
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('fixed inset-0 overflow-hidden', className)}
      style={{
        zIndex: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          imageRendering: 'pixelated',
          opacity: 0.8,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  )
}
