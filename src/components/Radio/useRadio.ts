import { useCallback, useState } from 'react'
import { UseRadioReturn } from './types'

export function useRadio<T>(
  initialValue: T | null = null,
  compareFn?: (a: T, b: T) => boolean,
): UseRadioReturn<T> {
  const [selectedValue, setSelectedValue] = useState<T | null>(initialValue)

  const defaultCompare = (a: T, b: T) => a === b
  const compare = compareFn || defaultCompare

  const isSelected = useCallback(
    (value: T) => {
      return selectedValue !== null && compare(selectedValue, value)
    },
    [compare, selectedValue],
  )

  const select = useCallback((value: T) => {
    setSelectedValue(value)
  }, [])

  const reset = useCallback(() => {
    setSelectedValue(null)
  }, [])

  return {
    selectedValue,
    isSelected,
    select,
    reset,
  }
}
