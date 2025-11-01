import type { ReactNode } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface ScrollFadeInProps {
  children: ReactNode
  className?: string
  stagger?: boolean
  delay?: number
}

/**
 * Wrapper komponenta za scroll-triggered fade-in animacije
 */
export default function ScrollFadeIn({ children, className = '', stagger = false, delay = 0 }: ScrollFadeInProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`${stagger ? 'scroll-fade-in-stagger' : 'scroll-fade-in'} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}


