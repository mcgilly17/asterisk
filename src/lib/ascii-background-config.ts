/**
 * ASCII Ambient Background Configuration
 * Presets, types, and character palettes
 */

export type Theme = 'dark' | 'light'
export type MotionMode = 'normal' | 'reduced' | 'auto'
export type FPSTarget = 15 | 20 | 30

export interface AsciiBackgroundParams {
  theme: Theme
  fpsTarget: FPSTarget
  seed: number
  amplitude: number // 0-1, master motion scale
  contrast: number // 0-1, density gain
  sparkleDensity: number // 0-0.005
  ribbonCount: number // 0-4
  periodA: number // seconds for wave A
  periodB: number // seconds for wave B
  rotationA: number // radians
  rotationB: number // radians
  focusRadius: number // chars, safe zone around center
  motionMode: MotionMode
  // Layer weights
  weights: {
    A: number // wave A weight
    B: number // wave B weight
    R: number // ribbon weight
    S: number // sparkle weight
  }
}

export interface GlyphPalette {
  extraLight: string[]
  light: string[]
  mid: string[]
  heavy: string[]
  contours: string[]
  accents: string[]
}

export const GLYPHS: Record<Theme, GlyphPalette> = {
  dark: {
    extraLight: ['·', "'", '˙'],
    light: [':', '.'],
    mid: ['*', 'o'],
    heavy: ['#', '@'],
    contours: ['/', '\\', '|', '-', '~'],
    accents: ['^', '+'],
  },
  light: {
    extraLight: ['@', '#'],
    light: ['o', '*'],
    mid: [':', '.'],
    heavy: ['·', "'", '˙'],
    contours: ['/', '\\', '|', '-', '~'],
    accents: ['^', '+'],
  },
}

// Density ranges for glyph mapping (6 buckets)
export const DENSITY_RANGES = [
  { min: 0.0, max: 0.1, bucket: 'extraLight' },
  { min: 0.1, max: 0.22, bucket: 'light' },
  { min: 0.22, max: 0.36, bucket: 'light' },
  { min: 0.36, max: 0.52, bucket: 'mid' },
  { min: 0.52, max: 0.7, bucket: 'heavy' },
  { min: 0.7, max: 1.0, bucket: 'heavy' },
] as const

export const PRESETS: Record<string, Partial<AsciiBackgroundParams>> = {
  'midnight-term': {
    theme: 'dark',
    amplitude: 1.0,
    contrast: 1.0,
    sparkleDensity: 0.002,
    ribbonCount: 3,
    periodA: 12.5,
    periodB: 7.8,
    rotationA: Math.PI / 12, // 15°
    rotationB: -Math.PI / 5.6, // -32°
    focusRadius: 15,
    weights: {
      A: 0.06,
      B: 0.09,
      R: 0.03,
      S: 0.02,
    },
  },
  'paper-console': {
    theme: 'light',
    amplitude: 0.8,
    contrast: 0.9,
    sparkleDensity: 0.0015,
    ribbonCount: 2,
    periodA: 14.0,
    periodB: 9.0,
    rotationA: Math.PI / 10,
    rotationB: -Math.PI / 6,
    focusRadius: 15,
    weights: {
      A: 0.05,
      B: 0.08,
      R: 0.025,
      S: 0.015,
    },
  },
  caustic: {
    theme: 'dark',
    amplitude: 1.2,
    contrast: 1.1,
    sparkleDensity: 0.0025,
    ribbonCount: 2,
    periodA: 16.0,
    periodB: 10.0,
    rotationA: Math.PI / 8,
    rotationB: -Math.PI / 4,
    focusRadius: 15,
    weights: {
      A: 0.07,
      B: 0.1,
      R: 0.04,
      S: 0.025,
    },
  },
  reduced: {
    theme: 'dark',
    fpsTarget: 15 as FPSTarget,
    amplitude: 0.25,
    contrast: 0.5,
    sparkleDensity: 0,
    ribbonCount: 0,
    periodA: 20.0,
    periodB: 15.0,
    rotationA: 0,
    rotationB: 0,
    weights: {
      A: 0.03,
      B: 0.04,
      R: 0,
      S: 0,
    },
  },
}

export const DEFAULT_PARAMS: AsciiBackgroundParams = {
  theme: 'dark',
  fpsTarget: 30,
  seed: 42,
  amplitude: 1.0,
  contrast: 1.0,
  sparkleDensity: 0.002,
  ribbonCount: 3,
  periodA: 12.5,
  periodB: 7.8,
  rotationA: Math.PI / 12,
  rotationB: -Math.PI / 5.6,
  focusRadius: 15,
  motionMode: 'auto',
  weights: {
    A: 0.06,
    B: 0.09,
    R: 0.03,
    S: 0.02,
  },
}

// Grid sizing
export const GRID_CONFIG = {
  targetCellSize: 12, // px, target size per char
  minCellSize: 10,
  maxCellSize: 16,
  bufferWidth: 100, // fixed buffer dimensions
  bufferHeight: 40,
} as const

// Performance budgets
export const PERF_CONFIG = {
  frameTimeout: 33, // ms, 30 FPS target
  degradationThreshold: 3, // consecutive slow frames before degrading
  recoveryThreshold: 10, // consecutive fast frames before recovering
} as const
