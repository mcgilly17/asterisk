'use client'

import { motion } from 'motion/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { fadeInUp } from '@/lib/animations'
import { typography } from '@/lib/design-tokens'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'How long do projects take?',
    answer:
      'Project timelines vary based on scope, but we typically deliver initial versions in 4-8 weeks. We work in rapid iterations to get you to market faster.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Our engagements are tailored to your needs and budget. We offer flexible pricing models including fixed-price projects and retained partnerships.',
  },
  {
    question: 'What size companies do you work with?',
    answer:
      'We primarily work with scale-ups and mid-market companies that are ready to move fast and make bold product decisions.',
  },
  {
    question: 'Do you do in-house or embedded work?',
    answer:
      'We can work both ways. Our team can operate independently or embed directly with your team, depending on what works best for your organization.',
  },
]

export function FAQ() {
  return (
    <section className="py-32">
      <motion.div
        className="flex gap-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        {/* Left side - Title */}
        <div className="flex w-[320px] flex-col gap-8">
          <h2
            className="text-white"
            style={{
              fontSize: 'clamp(2rem, 3vw + 0.5rem, 48px)',
              lineHeight: 'clamp(2.5rem, 4vw + 0.5rem, 64px)',
              letterSpacing: '-0.04em',
              fontWeight: 600,
            }}
          >
            Frequently asked questions
          </h2>
          <p className={cn(typography.p, 'text-muted-foreground')}>
            If there's anything we haven't covered, just ask.
          </p>
        </div>

        {/* Right side - Accordion */}
        <div className="flex-1">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="border-b border-border"
              >
                <AccordionTrigger
                  className={cn(typography.h3, 'text-left text-white hover:no-underline')}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className={cn(typography.p, 'text-muted-foreground')}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.div>
    </section>
  )
}
