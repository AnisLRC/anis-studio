import { createContext, useContext, useState, type ReactNode } from 'react'

interface UiContextType {
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  modals: Record<string, boolean>
  openModal: (modalId: string) => void
  closeModal: (modalId: string) => void
}

const UiContext = createContext<UiContextType | undefined>(undefined)

export function UiProvider({ children }: { children: ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [modals, setModals] = useState<Record<string, boolean>>({})

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  const openModal = (modalId: string) => {
    setModals(prev => ({ ...prev, [modalId]: true }))
  }

  const closeModal = (modalId: string) => {
    setModals(prev => ({ ...prev, [modalId]: false }))
  }

  return (
    <UiContext.Provider value={{ 
      isDrawerOpen, 
      openDrawer, 
      closeDrawer, 
      modals, 
      openModal, 
      closeModal 
    }}>
      {children}
    </UiContext.Provider>
  )
}

export function useUi() {
  const context = useContext(UiContext)
  if (!context) {
    throw new Error('useUi must be used within UiProvider')
  }
  return context
}

