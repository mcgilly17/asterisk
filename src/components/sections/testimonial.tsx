'use client'

import { motion } from 'motion/react'
import { Card } from '@/components/ui/card'
import { fadeInUp } from '@/lib/animations'
import { typography } from '@/lib/design-tokens'
import { cn } from '@/lib/utils'

export function Testimonial() {
  return (
    <section className="py-32">
      <motion.div
        className="flex flex-col gap-8"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        {/* Large display card */}
        <Card className="h-[738px] border-border bg-muted" />

        {/* Company info */}
        <div className="flex flex-col gap-4">
          <h3 className={cn(typography.h3, 'text-white')}>Example Company Name</h3>
          <p className={cn(typography.p, 'text-muted-foreground')}>Design, Engineering, Strategy</p>
        </div>
      </motion.div>
    </section>
  )
}
