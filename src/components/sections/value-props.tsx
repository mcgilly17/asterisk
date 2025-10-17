'use client'

import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { typography } from '@/lib/design-tokens'
import { cn } from '@/lib/utils'

interface ValueCardProps {
  title: string
  height: string
  showButton?: boolean
}

function ValueCard({ title, height, showButton }: ValueCardProps) {
  return (
    <motion.div
      className="flex flex-1 flex-col gap-8"
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card placeholder */}
      <Card className={cn('border-border bg-muted', height)} />

      {/* Description */}
      <div className="flex flex-col gap-8">
        <p className={cn(typography.p, 'text-white')}>{title}</p>

        {showButton && (
          <Button
            size="sm"
            className="w-fit rounded-full bg-white px-6 py-2 text-sm text-black hover:bg-white/90"
          >
            Let's chat
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export function ValueProps() {
  return (
    <section className="py-32">
      <motion.div
        className="flex flex-col gap-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {/* Section header */}
        <motion.div className="flex flex-col items-center gap-4 text-center" variants={fadeInUp}>
          <h2
            className="max-w-[620px] text-white"
            style={{
              fontSize: 'clamp(2rem, 4vw + 0.5rem, 48px)',
              lineHeight: 'clamp(2.5rem, 5vw + 0.5rem, 64px)',
              letterSpacing: '-0.04em',
              fontWeight: 600,
            }}
          >
            Build products your competitors can't keep up with.
          </h2>
          <p className={cn(typography.p, 'text-muted-foreground')}>
            Turn bold ideas into growth, loyalty, and market leadership.
          </p>
        </motion.div>

        {/* 4-column grid */}
        <motion.div className="flex gap-8" variants={staggerContainer}>
          <ValueCard
            title="Start by turning raw ideas into live products in weeks, not quarters."
            height="h-[180px]"
          />
          <ValueCard
            title="Make those products the reason customers choose you and never leave."
            height="h-[270px]"
          />
          <ValueCard
            title="Continuously test, learn, and ship faster than internal teams or big agencies."
            height="h-[360px]"
          />
          <ValueCard
            title="And do it all with expert designers and engineers laser-focused on what actually moves the needle."
            height="h-[450px]"
            showButton
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
