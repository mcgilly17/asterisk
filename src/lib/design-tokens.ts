/**
 * Design Tokens extracted from Figma
 * Asterisk Website Design System
 */

// Typography scale from Figma
export const typography = {
  // H1: Font(family: "TWK Everett", style: Bold, size: 100, weight: 700, lineHeight: 100)
  display: 'text-[100px] leading-[100px] tracking-[-4px] font-bold',
  h1: 'text-[100px] leading-[100px] tracking-[-4px] font-bold',

  // H2: Font(family: "SF Pro", style: Semibold, size: 48, weight: 590, lineHeight: 64)
  h2: 'text-5xl leading-[64px] tracking-[-1.92px] font-semibold',

  // H3: Font(family: "SF Pro", style: Bold, size: 32, weight: 700, lineHeight: 48)
  h3: 'text-[32px] leading-[48px] tracking-[-1.28px] font-bold',

  // H4: Font(family: "SF Pro", style: Bold, size: 24, weight: 700, lineHeight: 36)
  h4: 'text-2xl leading-9 font-bold',

  // p-large: Font(family: "SF Pro", style: Regular, size: 32, weight: 400, lineHeight: 48)
  'p-large': 'text-[32px] leading-[48px]',

  // p: Font(family: "SF Pro", style: Regular, size: 20, weight: 400, lineHeight: 32)
  p: 'text-xl leading-8',

  // p-small: Font(family: "SF Pro", style: Regular, size: 16, weight: 400, lineHeight: 24)
  'p-small': 'text-base leading-6',
} as const

// Spacing and layout
export const spacing = {
  container: {
    maxWidth: '1440px',
    padding: '64px',
  },
  section: {
    gap: '128px',
    largGap: '192px',
  },
  card: {
    gap: '32px',
    padding: '32px',
    radius: '12px',
  },
} as const

// Color values (for reference, actual colors in globals.css)
export const colors = {
  background: '#000000',
  foreground: '#FFFFFF',
  cardBg: 'rgba(255,255,255,0.08)',
  muted: 'rgba(255,255,255,0.4)',
  border: 'rgba(255,255,255,0.16)',
} as const

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  container: '1440px',
} as const

// Animation durations
export const durations = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const

// Effects
export const effects = {
  blur: 'blur-[10px]',
  cardHover: 'transition-transform duration-300 hover:scale-[1.02]',
  glow: 'hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]',
} as const
