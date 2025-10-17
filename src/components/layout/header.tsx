import { AnimatedAsterisk } from '@/components/shared/animated-asterisk'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="bg-transparent">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between p-8">
        {/* Logo */}
        <div className="flex items-center gap-3 text-white">
          <span className="text-lg font-semibold">Asterisk</span>
          <AnimatedAsterisk />
        </div>

        {/* CTA Button */}
        <Button
          size="sm"
          className="rounded-full bg-white px-4 py-2 text-sm text-black hover:bg-white/90"
        >
          Let's chat
        </Button>
      </div>
    </header>
  )
}
