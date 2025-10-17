import { Container } from '@/components/layout/container'
import { CTA } from '@/components/sections/cta'
import { FAQ } from '@/components/sections/faq'
import { FeaturedCards } from '@/components/sections/featured-cards'
import { Hero } from '@/components/sections/hero'
import { Testimonial } from '@/components/sections/testimonial'
import { ValueProps } from '@/components/sections/value-props'

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      <Container>
        <Hero />
        <FeaturedCards />
        <Testimonial />
        <ValueProps />
        <FAQ />
        <CTA />
      </Container>
    </main>
  )
}
