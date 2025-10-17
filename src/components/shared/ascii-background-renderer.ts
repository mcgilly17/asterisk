/**
 * ASCII Background Canvas Renderer
 * Manages canvas drawing, RAF loop, and FPS monitoring
 */

import type { AsciiBackgroundParams } from '@/lib/ascii-background-config'
import { GRID_CONFIG, PERF_CONFIG } from '@/lib/ascii-background-config'
import { AsciiEngine } from '@/lib/ascii-background-engine'
import { FPSMonitor, SeededRandom } from '@/lib/ascii-background-utils'

export class AsciiRenderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private params: AsciiBackgroundParams
  private engine: AsciiEngine | null = null
  private rng: SeededRandom

  private gridW = GRID_CONFIG.bufferWidth
  private gridH = GRID_CONFIG.bufferHeight
  private cellW: number = GRID_CONFIG.targetCellSize
  private cellH: number = GRID_CONFIG.targetCellSize

  private rafId: number | null = null
  private startTime = 0
  private lastFrameTime = 0
  private fpsMonitor = new FPSMonitor()

  private slowFrameCount = 0
  private fastFrameCount = 0
  private currentFPS: number

  // Performance state
  private isRunning = false
  private isPaused = false

  constructor(canvas: HTMLCanvasElement, params: AsciiBackgroundParams) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) throw new Error('Failed to get 2D context')
    this.ctx = ctx

    this.params = params
    this.currentFPS = params.fpsTarget
    this.rng = new SeededRandom(params.seed)

    this.setupCanvas()
    this.initEngine()
  }

  private setupCanvas() {
    const dpr = window.devicePixelRatio || 1

    // Set canvas size based on grid with DPI scaling
    this.canvas.width = this.gridW * this.cellW * dpr
    this.canvas.height = this.gridH * this.cellH * dpr

    // Scale context for DPI
    this.ctx.scale(dpr, dpr)

    // Set font for monospace rendering
    this.ctx.font = `${this.cellH}px "Geist Mono", "Courier New", monospace`
    this.ctx.textBaseline = 'top'
    this.ctx.textAlign = 'left'
  }

  private initEngine() {
    this.engine = new AsciiEngine(this.params, this.gridW, this.gridH, this.rng)
  }

  /**
   * Start the animation loop
   */
  start() {
    if (this.isRunning) return
    this.isRunning = true
    this.isPaused = false
    this.startTime = performance.now()
    this.lastFrameTime = this.startTime
    this.loop(this.startTime)
  }

  /**
   * Stop the animation loop
   */
  stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    this.isRunning = false
  }

  /**
   * Pause animation (keeps loop running but doesn't update time)
   */
  pause() {
    this.isPaused = true
  }

  /**
   * Resume animation
   */
  resume() {
    this.isPaused = false
  }

  /**
   * Update parameters and reinitialize engine
   */
  updateParams(newParams: Partial<AsciiBackgroundParams>) {
    this.params = { ...this.params, ...newParams }
    this.currentFPS = this.params.fpsTarget
    this.rng = new SeededRandom(this.params.seed)
    this.initEngine()
  }

  /**
   * Resize canvas to fit container
   */
  resize(width: number, height: number) {
    const dpr = window.devicePixelRatio || 1

    // Calculate optimal cell size
    const cellW = Math.max(
      GRID_CONFIG.minCellSize,
      Math.min(GRID_CONFIG.maxCellSize, width / this.gridW)
    )
    const cellH = Math.max(
      GRID_CONFIG.minCellSize,
      Math.min(GRID_CONFIG.maxCellSize, height / this.gridH)
    )

    this.cellW = cellW
    this.cellH = cellH

    this.canvas.width = this.gridW * this.cellW * dpr
    this.canvas.height = this.gridH * this.cellH * dpr

    // Scale context for DPI
    this.ctx.scale(dpr, dpr)

    // Update font size
    this.ctx.font = `${this.cellH}px "Geist Mono", "Courier New", monospace`
  }

  /**
   * Main animation loop
   */
  private loop(currentTime: number) {
    if (!this.isRunning) return

    // Calculate elapsed time
    const elapsed = (currentTime - this.startTime) / 1000 // seconds

    // FPS throttling
    const frameInterval = 1000 / this.currentFPS
    const deltaTime = currentTime - this.lastFrameTime

    if (deltaTime >= frameInterval) {
      const frameStartTime = performance.now()

      // Update FPS monitor
      this.fpsMonitor.update(currentTime)

      // Render frame
      if (!this.isPaused && this.engine) {
        this.renderFrame(elapsed)
      }

      const frameTime = performance.now() - frameStartTime

      // Performance monitoring and auto-degradation
      this.monitorPerformance(frameTime)

      this.lastFrameTime = currentTime - (deltaTime % frameInterval)
    }

    // Schedule next frame
    this.rafId = requestAnimationFrame((time) => this.loop(time))
  }

  /**
   * Render a single frame to canvas
   */
  private renderFrame(t: number) {
    if (!this.engine) return

    // Get frame data from engine
    const frame = this.engine.renderFrame(t)

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Get theme colors from CSS
    const textColor =
      this.params.theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'

    this.ctx.fillStyle = textColor

    // Draw each character
    for (let y = 0; y < this.gridH; y++) {
      for (let x = 0; x < this.gridW; x++) {
        const char = frame[y][x]
        if (char && char !== ' ') {
          this.ctx.fillText(char, x * this.cellW, y * this.cellH)
        }
      }
    }
  }

  /**
   * Monitor performance and degrade FPS if needed
   */
  private monitorPerformance(frameTime: number) {
    const isSlow = frameTime > PERF_CONFIG.frameTimeout

    if (isSlow) {
      this.handleSlowFrame()
    } else {
      this.handleFastFrame()
    }
  }

  private handleSlowFrame() {
    this.slowFrameCount++
    this.fastFrameCount = 0

    if (this.slowFrameCount >= PERF_CONFIG.degradationThreshold) {
      this.degradeFPS()
      this.slowFrameCount = 0
    }
  }

  private handleFastFrame() {
    this.fastFrameCount++
    this.slowFrameCount = 0

    if (this.fastFrameCount >= PERF_CONFIG.recoveryThreshold) {
      this.recoverFPS()
      this.fastFrameCount = 0
    }
  }

  private degradeFPS() {
    if (this.currentFPS === 30) {
      this.currentFPS = 20
      console.warn('ASCII Background: Degraded to 20 FPS')
    } else if (this.currentFPS === 20) {
      this.currentFPS = 15
      console.warn('ASCII Background: Degraded to 15 FPS')
    }
  }

  private recoverFPS() {
    const canRecover = this.currentFPS < this.params.fpsTarget

    if (canRecover && this.currentFPS === 15) {
      this.currentFPS = 20
      console.log('ASCII Background: Recovered to 20 FPS')
    } else if (canRecover && this.currentFPS === 20) {
      this.currentFPS = 30
      console.log('ASCII Background: Recovered to 30 FPS')
    }
  }

  /**
   * Get current FPS
   */
  getFPS(): number {
    return this.fpsMonitor.update(performance.now())
  }

  /**
   * Cleanup
   */
  destroy() {
    this.stop()
    this.fpsMonitor.reset()
  }
}
