import { AnimatedAsterisk } from '@/components/shared/animated-asterisk'
import { typography } from '@/lib/design-tokens'
import { cn } from '@/lib/utils'

const footerLinks = {
  work: ['Beamery', 'Protobloc', 'Unboring', 'View more'],
  company: ['Our services', "Why we're better", 'Careers'],
  blog: ['We launched a studio'],
}

export function Footer() {
  return (
    <footer className="bg-black px-16 py-0">
      <div className="mx-auto max-w-[1440px]">
        {/* Main footer content */}
        <div className="flex w-full gap-8">
          {/* Logo column */}
          <div className="flex w-[304px] items-center gap-1">
            <div className="flex size-16 items-center justify-center text-white">
              <div className="scale-[2]">
                <AnimatedAsterisk />
              </div>
            </div>
          </div>

          {/* Work column */}
          <div className="flex h-[288px] w-[304px] flex-col gap-16">
            <p className={cn(typography['p-small'], 'font-bold text-white')}>WORK</p>
            <div className="flex flex-col gap-6">
              {footerLinks.work.map((link) => (
                <a
                  key={link}
                  href="/"
                  className={cn(
                    typography.p,
                    'text-white transition-colors hover:text-muted-foreground'
                  )}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Company column */}
          <div className="flex h-[232px] w-[304px] flex-col gap-16">
            <p className={cn(typography['p-small'], 'font-bold text-white')}>COMPANY</p>
            <div className="flex flex-col gap-6">
              {footerLinks.company.map((link) => (
                <a
                  key={link}
                  href="/"
                  className={cn(
                    typography.p,
                    'text-white transition-colors hover:text-muted-foreground'
                  )}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Blog column */}
          <div className="flex h-[120px] w-[304px] flex-col gap-16">
            <p className={cn(typography['p-small'], 'font-bold text-white')}>BLOG</p>
            <div className="flex items-center justify-center gap-6">
              {footerLinks.blog.map((link) => (
                <a
                  key={link}
                  href="/"
                  className={cn(
                    typography.p,
                    'text-white transition-colors hover:text-muted-foreground'
                  )}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex w-full items-start justify-between border-t border-border px-0 py-16">
          <div className="flex gap-8">
            <p className={cn(typography['p-small'], 'text-white')}>Built with ♥ by Asterisk</p>
          </div>
          <div className={cn(typography['p-small'], 'flex gap-8 text-muted-foreground')}>
            <a href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <p>© 2026 Asterisk</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
