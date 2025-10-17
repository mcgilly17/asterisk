'use client'

import { ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { typography } from '@/lib/design-tokens'
import { cn } from '@/lib/utils'

// Assets from Figma
const iconGroup7 = 'https://www.figma.com/api/mcp/asset/4c9fe32d-2204-427f-8c50-0d6c687886b9'

interface FeatureCardProps {
  title: string
  description: string
  image?: string
  imageAlt?: string
  badge?: string
  announcement?: {
    title: string
    subtitle?: string
  }
  height?: string
  imageBlur?: boolean
}

function FeatureCard({
  title,
  description,
  image,
  imageAlt,
  badge,
  announcement,
  height = 'h-[320px]',
  imageBlur = true,
}: FeatureCardProps) {
  return (
    <motion.div
      className="flex flex-1 flex-col gap-8"
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card with image/content */}
      <Card
        className={cn(
          'flex items-center justify-center border-border bg-muted p-8',
          height,
          imageBlur && 'backdrop-blur-[10px]'
        )}
      >
        {image && (
          <div className={cn('flex items-center justify-center', imageBlur && 'blur-[10px]')}>
            <Image src={image} alt={imageAlt || ''} width={64} height={64} />
          </div>
        )}
        {announcement && (
          <div className="blur-[10px]">
            <h3 className={cn(typography.h4, 'text-center text-muted-foreground')}>
              {announcement.title}
            </h3>
          </div>
        )}
      </Card>

      {/* Card footer with title and description */}
      <div className="flex items-center gap-2">
        {badge && (
          <div className="flex flex-col gap-1 pb-0 pt-2">
            <span className="flex h-8 items-center justify-center rounded-full bg-muted px-8">
              <span className={cn(typography['p-small'], 'text-white')}>{badge}</span>
            </span>
          </div>
        )}

        <div className="flex flex-1 items-center gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <h3 className={cn(typography.h4, 'text-white')}>{title}</h3>
            <p className={cn(typography.p, 'text-muted-foreground')}>{description}</p>
          </div>
          <ChevronRight className="size-6 shrink-0 text-white" />
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturedCards() {
  return (
    <section className="py-32">
      <motion.div
        className="flex gap-8"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {/* Card 1: Hello, world! */}
        <FeatureCard
          title="We launched a studio"
          description="A quick look behind the scenes."
          announcement={{ title: 'Hello, world!' }}
          badge="New"
          height="h-[540px]"
        />

        {/* Card 2: Our services */}
        <FeatureCard
          title="Our services"
          description="Designed to help you move faster and outpace the competition."
          image={iconGroup7}
          imageAlt="Services icon"
          height="h-[180px]"
        />

        {/* Card 3: Why we're better */}
        <FeatureCard
          title="Why we're better"
          description="We don't guess. We've done it before and know what works."
          height="h-[360px]"
          imageBlur={false}
        />
      </motion.div>
    </section>
  )
}
