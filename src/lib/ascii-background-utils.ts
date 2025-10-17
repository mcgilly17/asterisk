/**
 * ASCII Background Utilities
 * Hash functions, easing, math helpers
 */

/**
 * Simple seeded PRNG (LCG algorithm)
 */
export class SeededRandom {
  private seed: number

  constructor(seed: number) {
    this.seed = seed % 2147483647
    if (this.seed <= 0) this.seed += 2147483646
  }

  next(): number {
    this.seed = (this.seed * 16807) % 2147483647
    return (this.seed - 1) / 2147483646
  }

  range(min: number, max: number): number {
    return min + this.next() * (max - min)
  }

  int(min: number, max: number): number {
    return Math.floor(this.range(min, max + 1))
  }
}

/**
 * Deterministic hash for cell coordinates
 * Returns value in [0, 1)
 */
export function hashCell(x: number, y: number, seed = 0): number {
  let h = seed
  h = ((h << 5) - h + x) | 0
  h = ((h << 5) - h + y) | 0
  h = h ^ (h >>> 16)
  h = Math.imul(h, 0x85ebca6b)
  h = h ^ (h >>> 13)
  h = Math.imul(h, 0xc2b2ae35)
  h = h ^ (h >>> 16)
  return (h >>> 0) / 4294967296
}

/**
 * Easing functions for smooth phase transitions
 */
export const easing = {
  /**
   * Micro-ease for wave phases
   * Adds slight slow-in/out to avoid mechanical feel
   */
  microEase(phase: number): number {
    return phase + 0.08 * Math.sin(phase)
  },

  /**
   * Smooth in-out cubic
   */
  inOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
  },

  /**
   * Smooth in-out sine
   */
  inOutSine(t: number): number {
    return -(Math.cos(Math.PI * t) - 1) / 2
  },
}

/**
 * Vector math utilities
 */
export const vec2 = {
  rotate(x: number, y: number, angle: number): [number, number] {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return [x * cos - y * sin, x * sin + y * cos]
  },

  length(x: number, y: number): number {
    return Math.sqrt(x * x + y * y)
  },

  normalize(x: number, y: number): [number, number] {
    const len = this.length(x, y)
    return len > 0 ? [x / len, y / len] : [0, 0]
  },

  lerp(x1: number, y1: number, x2: number, y2: number, t: number): [number, number] {
    return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]
  },
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Linear interpolation
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * Map value from one range to another
 */
export function map(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * Simple 2D perlin-like noise (placeholder)
 * For production, consider using a proper noise library
 */
export function noise2D(x: number, y: number, seed = 0): number {
  // Simple gradient noise approximation using sine
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453
  return (n - Math.floor(n)) * 2 - 1 // Range [-1, 1]
}

/**
 * Radial distance from center
 */
export function radialDistance(x: number, y: number, centerX: number, centerY: number): number {
  const dx = x - centerX
  const dy = y - centerY
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Create a radial gradient value
 */
export function radialGradient(
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number
): number {
  const dist = radialDistance(x, y, centerX, centerY)
  if (dist <= innerRadius) return 0
  if (dist >= outerRadius) return 1
  return (dist - innerRadius) / (outerRadius - innerRadius)
}

/**
 * FPS monitor utility
 */
export class FPSMonitor {
  private frameTimes: number[] = []
  private maxSamples = 60
  private lastFrameTime = 0

  update(currentTime: number): number {
    if (this.lastFrameTime > 0) {
      const delta = currentTime - this.lastFrameTime
      this.frameTimes.push(delta)
      if (this.frameTimes.length > this.maxSamples) {
        this.frameTimes.shift()
      }
    }
    this.lastFrameTime = currentTime

    // Return average FPS
    if (this.frameTimes.length === 0) return 0
    const avgDelta = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length
    return 1000 / avgDelta
  }

  getAverageFrameTime(): number {
    if (this.frameTimes.length === 0) return 0
    return this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length
  }

  reset(): void {
    this.frameTimes = []
    this.lastFrameTime = 0
  }
}
