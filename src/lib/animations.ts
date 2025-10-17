/**
 * Framer Motion Animation Variants
 * Reusable animation configurations for the Asterisk website
 */

import type { Variants } from 'motion/react'

/**
 * Fade in with slide up animation
 * Used for section entrances
 */
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
}

/**
 * Fade in only (no movement)
 */
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
}

/**
 * Stagger children animations
 * Used for card grids
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

/**
 * Scale up on hover
 * Used for interactive cards
 */
export const scaleOnHover = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

/**
 * Default transition settings
 */
export const defaultTransition = {
  duration: 0.3,
  ease: 'easeOut',
} as const

/**
 * Slow transition for larger movements
 */
export const slowTransition = {
  duration: 0.5,
  ease: 'easeOut',
} as const

/**
 * Spring transition for bouncy effects
 */
export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
} as const
