import { useEffect } from 'react'

const SELECTOR = '.scroll-fade-in:not(.visible), .scroll-fade-in-stagger:not(.visible)'

/**
 * Activates scroll-triggered fade-in animations via IntersectionObserver.
 * Skips all animation when the user prefers-reduced-motion and immediately
 * marks every element as visible so no content is hidden.
 */
export function useGlobalScrollAnimations() {
  useEffect(() => {
    const prefersReduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    if (prefersReduced) {
      // Skip animation, ensure nothing stays hidden
      document
        .querySelectorAll('.scroll-fade-in, .scroll-fade-in-stagger')
        .forEach((el) => el.classList.add('visible'))
      return
    }

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.08,
      rootMargin: '0px 0px -32px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const initObserver = () => {
      document
        .querySelectorAll(SELECTOR)
        .forEach((el) => observer.observe(el))
    }

    initObserver()

    // Debounce MutationObserver so rapid DOM changes don't spam initObserver.
    let mutationTimer: ReturnType<typeof setTimeout> | null = null
    const mutationObserver = new MutationObserver(() => {
      if (mutationTimer) clearTimeout(mutationTimer)
      mutationTimer = setTimeout(initObserver, 120)
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      if (mutationTimer) clearTimeout(mutationTimer)
      mutationObserver.disconnect()
      document
        .querySelectorAll('.scroll-fade-in, .scroll-fade-in-stagger')
        .forEach((el) => observer.unobserve(el))
    }
  }, [])
}
