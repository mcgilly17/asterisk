'use client'

import { useEffect, useState } from 'react'

// Custom sequence of star characters
const characters = [
  '✧', // white four pointed star
  '✦', // black four pointed star
  '✴', // eight pointed black star
  '✳', // eight spoked asterisk
  '✹', // twelve pointed black star
  '✺', // sixteen pointed asterisk
]

export function AnimatedAsterisk() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + direction

        // If we've reached the end, reverse direction
        if (nextIndex >= characters.length - 1) {
          setDirection(-1)
          return characters.length - 1
        }
        // If we've reached the beginning, reverse direction
        if (nextIndex <= 0) {
          setDirection(1)
          return 0
        }

        return nextIndex
      })
    }, 120) // Change every 120ms

    return () => clearInterval(interval)
  }, [direction])

  return (
    <span
      className="inline-flex h-[30px] min-w-[30px] items-center justify-center text-[30px] font-medium leading-[30px]"
      style={{
        fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
        fontWeight: 500,
        verticalAlign: 'baseline',
      }}
    >
      {characters[currentIndex]}
    </span>
  )
}
