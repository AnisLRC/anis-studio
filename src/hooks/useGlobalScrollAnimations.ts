import { useEffect } from 'react'

/**
 * Globalni scroll observer za automatske scroll animacije
 * Dodaje 'visible' klasu elementima s 'scroll-fade-in' klasom kada uđu u viewport
 */
export function useGlobalScrollAnimations() {
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          // Opcionalno: unobserve nakon što se animacija pokrene za bolju performansu
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Funkcija za inicijalizaciju observera
    const initObserver = () => {
      const elements = document.querySelectorAll('.scroll-fade-in:not(.visible), .scroll-fade-in-stagger:not(.visible)')
      elements.forEach((el) => observer.observe(el))
    }

    // Inicijaliziraj observer
    initObserver()

    // Re-inicijaliziraj kada se DOM promijeni (za dinamičke elemente)
    const mutationObserver = new MutationObserver(() => {
      initObserver()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      mutationObserver.disconnect()
      const elements = document.querySelectorAll('.scroll-fade-in, .scroll-fade-in-stagger')
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])
}


