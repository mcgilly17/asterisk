'use client'

import { motion } from 'motion/react'
import { defaultTransition, fadeInUp } from '@/lib/animations'
import { typography } from '@/lib/design-tokens'
import { cn } from '@/lib/utils'

// Gradient image from Figma for "will die for" text
const gradientImage = 'https://www.figma.com/api/mcp/asset/58bb4d6b-d6ba-4c85-b944-338a7a59b69d'

export function Hero() {
  return (
    <section className="relative flex min-h-[536px] items-center py-48">
      <motion.div
        className="flex w-full flex-col gap-8"
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {/* Main headline */}
        <motion.h1
          className="max-w-[1312px] whitespace-pre-wrap text-white font-bold tracking-[-0.04em]"
          style={{
            fontSize: 'clamp(2.5rem, 6vw + 1rem, 200px)',
            lineHeight: 'clamp(2.5rem, 6vw + 1rem, 200px)',
          }}
          variants={fadeInUp}
          transition={defaultTransition}
        >
          <span className="font-normal">We build products your customers </span>
          <span
            className="bg-cover bg-center bg-clip-text bg-no-repeat"
            style={{
              WebkitTextFillColor: 'transparent',
              backgroundImage: `url('${gradientImage}')`,
            }}
          >
            will die for.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={cn(typography['p-large'], 'text-muted-foreground')}
          variants={fadeInUp}
          transition={defaultTransition}
        >
          Zero-to-one products for scale-ups that lead the market.
        </motion.p>
      </motion.div>
    </section>
  )
}
