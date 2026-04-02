import { motion } from 'framer-motion'
import type { Transition } from 'motion-dom'
import type { ReactNode } from 'react'

interface AnimatedPageProps {
  children: ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -20
  }
}

const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
}

export const AnimatedPage = ({ children }: AnimatedPageProps) => {
  return (
    <motion.div
      className="min-w-0 w-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}
