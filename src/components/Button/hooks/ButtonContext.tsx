import { createContext, useContext } from 'react'
import { ButtonVariant } from '../types'

interface ButtonContextValue {
  variant: ButtonVariant
}

const ButtonContext = createContext<ButtonContextValue | null>(null)

export function useButtonContext() {
  const context = useContext(ButtonContext)
  if (!context) {
    throw new Error('Button components must be used within a Button.Root')
  }
  return context
}

export { ButtonContext }
