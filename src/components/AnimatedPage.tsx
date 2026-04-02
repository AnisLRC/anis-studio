import { motion, useReducedMotion } from 'framer-motion'
import type { Transition } from 'framer-motion'
import type { ReactNode } from 'react'

const transitionReduced: Transition = {
  duration: 0.15,
  ease: 'linear',
}

const transitionNormal: Transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.3,
}

interface AnimatedPageProps {
  children: ReactNode
}

export const AnimatedPage = ({ children }: AnimatedPageProps) => {
  const prefersReduced = useReducedMotion()

  // When reduced motion is preferred, skip the y-shift entirely and use a
  // short fade only so the page isn't jarring.
  const variants = prefersReduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
      }

  const transition = prefersReduced ? transitionReduced : transitionNormal

  return (
    <motion.div
      className="min-w-0 w-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
