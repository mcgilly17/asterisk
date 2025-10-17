/**
 * ASCII Background Animation Engine
 * Core wave field calculations, gradient generation, and density mapping
 */

import type { AsciiBackgroundParams, Theme } from './ascii-background-config'
import { DENSITY_RANGES, GLYPHS } from './ascii-background-config'
import { clamp, easing, hashCell, lerp, type SeededRandom, vec2 } from './ascii-background-utils'

interface RibbonPath {
  centerX: number
  centerY: number
  radius: number
  frequency: number
  phase: number
  weight: number
}

export class AsciiEngine {
  private params: AsciiBackgroundParams
  private gridW: number
  private gridH: number
  private rng: SeededRandom

  // Precomputed data
  private gradient: number[][]
  private vignette: number[][]
  private hashTable: number[][]
  private ribbonPaths: RibbonPath[]
  private sparkleMask: boolean[][]
  private sparkleLFO: Array<{ omega: number; phase: number }>

  constructor(params: AsciiBackgroundParams, gridW: number, gridH: number, rng: SeededRandom) {
    this.params = params
    this.gridW = gridW
    this.gridH = gridH
    this.rng = rng

    // Initialize precomputed data
    this.gradient = this.precomputeGradient()
    this.vignette = this.precomputeVignette()
    this.hashTable = this.precomputeHashTable()
    this.ribbonPaths = this.generateRibbonPaths()
    this.sparkleMask = this.generateSparkleMask()
    this.sparkleLFO = this.generateSparkleLFO()
  }

  /**
   * Precompute static gradient bed
   */
  private precomputeGradient(): number[][] {
    const grid: number[][] = []
    const centerX = this.gridW / 2
    const centerY = this.gridH / 2
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)

    for (let y = 0; y < this.gridH; y++) {
      grid[y] = []
      for (let x = 0; x < this.gridW; x++) {
        // Radial gradient from center
        const dx = x - centerX
        const dy = y - centerY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const normalized = dist / maxDist

        // Dark theme: center 8%, corners 12-14%
        // Light theme: inverted
        if (this.params.theme === 'dark') {
          grid[y][x] = lerp(0.08, 0.14, normalized)
        } else {
          grid[y][x] = lerp(0.92, 0.86, normalized)
        }
      }
    }
    return grid
  }

  /**
   * Precompute vignette mask
   * Center -15-25% contrast, corners +10-15%
   */
  private precomputeVignette(): number[][] {
    const grid: number[][] = []
    const centerX = this.gridW / 2
    const centerY = this.gridH / 2
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)

    for (let y = 0; y < this.gridH; y++) {
      grid[y] = []
      for (let x = 0; x < this.gridW; x++) {
        const dx = x - centerX
        const dy = y - centerY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const normalized = clamp(dist / maxDist, 0, 1)

        // Center darker, edges lighter (for dark theme)
        if (this.params.theme === 'dark') {
          grid[y][x] = lerp(-0.2, 0.12, easing.inOutCubic(normalized))
        } else {
          grid[y][x] = lerp(0.2, -0.12, easing.inOutCubic(normalized))
        }
      }
    }
    return grid
  }

  /**
   * Precompute hash value per cell for stable glyph selection
   */
  private precomputeHashTable(): number[][] {
    const grid: number[][] = []
    for (let y = 0; y < this.gridH; y++) {
      grid[y] = []
      for (let x = 0; x < this.gridW; x++) {
        grid[y][x] = hashCell(x, y, this.params.seed)
      }
    }
    return grid
  }

  /**
   * Generate caustic ribbon paths
   */
  private generateRibbonPaths(): RibbonPath[] {
    const paths: RibbonPath[] = []
    for (let i = 0; i < this.params.ribbonCount; i++) {
      paths.push({
        centerX: this.rng.range(0.3, 0.7) * this.gridW,
        centerY: this.rng.range(0.3, 0.7) * this.gridH,
        radius: this.rng.range(10, 20),
        frequency: this.rng.range(0.05, 0.15),
        phase: this.rng.range(0, Math.PI * 2),
        weight: this.rng.range(0.5, 1.0),
      })
    }
    return paths
  }

  /**
   * Generate sparkle mask (which cells can sparkle)
   */
  private generateSparkleMask(): boolean[][] {
    const grid: boolean[][] = []
    for (let y = 0; y < this.gridH; y++) {
      grid[y] = []
      for (let x = 0; x < this.gridW; x++) {
        grid[y][x] = this.rng.next() < this.params.sparkleDensity
      }
    }
    return grid
  }

  /**
   * Generate per-sparkle LFO parameters
   */
  private generateSparkleLFO(): Array<{ omega: number; phase: number }> {
    const lfos: Array<{ omega: number; phase: number }> = []
    const totalCells = this.gridW * this.gridH
    for (let i = 0; i < totalCells; i++) {
      lfos.push({
        omega: this.rng.range(0.2, 0.5), // rad/s
        phase: this.rng.range(0, Math.PI * 2),
      })
    }
    return lfos
  }

  /**
   * Calculate wave field A at position and time
   */
  private waveA(x: number, y: number, t: number): number {
    // Normalize coords to [-1, 1]
    const nx = (2 * x) / this.gridW - 1
    const ny = (2 * y) / this.gridH - 1

    // Rotate
    const [u, _v] = vec2.rotate(nx, ny, this.params.rotationA)

    // Wave equation with eased phase
    const phase = (2 * Math.PI * t) / this.params.periodA
    const easedPhase = easing.microEase(phase)

    const kA = 2.0 // wave number (lower = wider bands)
    return Math.sin(kA * u + easedPhase)
  }

  /**
   * Calculate wave field B at position and time
   */
  private waveB(x: number, y: number, t: number): number {
    const nx = (2 * x) / this.gridW - 1
    const ny = (2 * y) / this.gridH - 1

    const [_u, v] = vec2.rotate(nx, ny, this.params.rotationB)

    const phase = (2 * Math.PI * t) / this.params.periodB
    const easedPhase = easing.microEase(phase)

    const kB = 3.0 // wave number (mid frequency)
    return Math.sin(kB * v + easedPhase)
  }

  /**
   * Sample ribbon contribution at position and time
   */
  private ribbonsSample(x: number, y: number, t: number): number {
    let sum = 0
    for (const ribbon of this.ribbonPaths) {
      // Parametric curve
      const u = t * ribbon.frequency + ribbon.phase
      const rx = ribbon.centerX + ribbon.radius * Math.cos(u)
      const ry = ribbon.centerY + ribbon.radius * Math.sin(u)

      // Distance to ribbon center
      const dx = x - rx
      const dy = y - ry
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Soft falloff
      const influence = Math.exp(-dist / 3.0) * ribbon.weight
      sum += influence
    }
    return sum
  }

  /**
   * Calculate sparkle intensity for a cell
   */
  private sparkleLFOValue(x: number, y: number, t: number): number {
    const idx = y * this.gridW + x
    if (idx >= this.sparkleLFO.length) return 0

    const lfo = this.sparkleLFO[idx]
    return 0.5 + 0.5 * Math.sin(lfo.omega * t + lfo.phase)
  }

  /**
   * Calculate focus attenuation (calm zone around center)
   */
  private focusAttenuation(x: number, y: number): number {
    const centerX = this.gridW / 2
    const centerY = this.gridH / 2
    const dx = x - centerX
    const dy = y - centerY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < this.params.focusRadius) {
      // Inside focus zone: reduce motion by 30-60%
      const t = dist / this.params.focusRadius
      return lerp(0.4, 1.0, t)
    }
    return 1.0
  }

  /**
   * Map density to glyph character
   */
  private mapDensityToGlyph(density: number, hash: number, theme: Theme): string {
    const palette = GLYPHS[theme]

    // Find appropriate bucket
    for (const range of DENSITY_RANGES) {
      if (density >= range.min && density < range.max) {
        const bucket = range.bucket as keyof typeof palette
        const glyphs = palette[bucket]
        if (glyphs.length === 0) return ' '

        // Use hash to pick deterministically
        const idx = Math.floor(hash * glyphs.length)
        return glyphs[idx]
      }
    }

    return ' '
  }

  /**
   * Render a single frame
   * Returns 2D array of characters
   */
  renderFrame(t: number): string[][] {
    const frame: string[][] = []

    for (let y = 0; y < this.gridH; y++) {
      frame[y] = []
      for (let x = 0; x < this.gridW; x++) {
        // Get base gradient
        const base = this.gradient[y][x]
        const v = this.vignette[y][x]

        // Calculate wave fields
        const fA = this.waveA(x, y, t)
        const fB = this.waveB(x, y, t)
        const wave =
          this.params.weights.A * fA * this.params.amplitude +
          this.params.weights.B * fB * this.params.amplitude

        // Calculate ribbons
        const rib = this.ribbonsSample(x, y, t) * this.params.weights.R * this.params.amplitude

        // Calculate sparkle
        const spk = this.sparkleMask[y][x]
          ? this.sparkleLFOValue(x, y, t) * this.params.weights.S * this.params.amplitude
          : 0

        // Apply focus attenuation
        const calm = this.focusAttenuation(x, y)
        const dyn = calm * (wave + rib + spk)

        // Combine all layers
        let density = base + dyn + v
        density = density * this.params.contrast
        density = clamp(density, 0, 1)

        // Map to glyph
        const glyph = this.mapDensityToGlyph(density, this.hashTable[y][x], this.params.theme)
        frame[y][x] = glyph
      }
    }

    return frame
  }
}
