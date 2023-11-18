// ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ModalContextProps {
  openModal: (content: ReactNode) => void
  closeModal: () => void
  modalContent: ReactNode | null
  isModalOpen: boolean
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

type ModalProviderProps = {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = (content: ReactNode) => {
    setModalContent(content)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalContent(null)
    setModalOpen(false)
  }

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, modalContent, isModalOpen }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
