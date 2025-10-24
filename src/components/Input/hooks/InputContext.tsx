import { createContext, useContext } from 'react'
import { InputState, InputVariant } from '../types'

interface InputContextValue {
  variant: InputVariant
  state: InputState
  setState: (state: InputState) => void
  handleFocus: () => void
  handleBlur: () => void
}

const InputContext = createContext<InputContextValue | null>(null)

export function useInputContext() {
  const context = useContext(InputContext)
  if (!context) {
    throw new Error('Input components must be used within an Input.Root')
  }
  return context
}

export { InputContext }
