'use client'

import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { fadeInUp } from '@/lib/animations'
import { typography } from '@/lib/design-tokens'
import { cn } from '@/lib/utils'

export function CTA() {
  return (
    <section className="py-32">
      <motion.div
        className="flex flex-col items-center gap-8 text-center"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2
          className="max-w-[620px] text-white"
          style={{
            fontSize: 'clamp(2rem, 4vw + 0.5rem, 48px)',
            lineHeight: 'clamp(2.5rem, 5vw + 0.5rem, 64px)',
            letterSpacing: '-0.04em',
            fontWeight: 600,
          }}
        >
          We'd love to hear about your product or growth challenges.
        </h2>
        <p className={cn(typography.p, 'max-w-[1248px] text-muted-foreground')}>
          Even if you're still figuring out the next step. No pitch, no pressure.
        </p>
        <Button
          size="lg"
          className="mt-4 rounded-full bg-white px-6 py-3 text-sm text-black hover:bg-white/90"
        >
          Let's chat
        </Button>
      </motion.div>
    </section>
  )
}
