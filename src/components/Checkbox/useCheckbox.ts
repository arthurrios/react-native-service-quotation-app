import { useCallback, useState } from 'react'

export interface UseCheckboxReturn<T> {
  checkedValues: T[]
  isChecked: (value: T) => boolean
  toggle: (value: T) => void
  toggleAll: (values: T[]) => void
  select: (value: T) => void
  deselect: (value: T) => void
  selectAll: (values: T[]) => void
  deselectAll: () => void
  reset: () => void
}

export function useCheckbox<T>(
  initialValues: T[] = [],
  compareFn?: (a: T, b: T) => boolean,
): UseCheckboxReturn<T> {
  const [checkedValues, setCheckedValues] = useState<T[]>(initialValues)

  const defaultCompare = (a: T, b: T) => a === b
  const compare = compareFn || defaultCompare

  const isChecked = useCallback(
    (value: T) => {
      return checkedValues.some((checkedValue) => compare(checkedValue, value))
    },
    [compare, checkedValues],
  )

  const toggle = useCallback(
    (value: T) => {
      setCheckedValues((prev) => {
        const isAlreadyChecked = prev.some((checkedValue) =>
          compare(checkedValue, value),
        )

        if (isAlreadyChecked) {
          return prev.filter((checkedValue) => !compare(checkedValue, value))
        } else {
          return [...prev, value]
        }
      })
    },
    [compare],
  )

  const select = useCallback(
    (value: T) => {
      setCheckedValues((prev) => {
        if (prev.some((checkedValue) => compare(checkedValue, value))) {
          return prev
        }
        return [...prev, value]
      })
    },
    [compare],
  )

  const deselect = useCallback(
    (value: T) => {
      setCheckedValues((prev) =>
        prev.filter((checkedValue) => !compare(checkedValue, value)),
      )
    },
    [compare],
  )

  const toggleAll = useCallback(
    (values: T[]) => {
      setCheckedValues((prev) => {
        const allSelected = values.every((value) =>
          prev.some((checkedValue) => compare(checkedValue, value)),
        )

        if (allSelected) {
          return prev.filter(
            (checkedValue) =>
              !values.some((value) => compare(value, checkedValue)),
          )
        } else {
          const newValues = values.filter(
            (value) =>
              !prev.some((checkedValue) => compare(checkedValue, value)),
          )
          return [...prev, ...newValues]
        }
      })
    },
    [compare],
  )

  const selectAll = useCallback((values: T[]) => {
    setCheckedValues(() => [...values])
  }, [])

  const deselectAll = useCallback(() => {
    setCheckedValues([])
  }, [])

  const reset = useCallback(() => {
    setCheckedValues(initialValues)
  }, [initialValues])

  return {
    checkedValues,
    isChecked,
    toggle,
    select,
    deselect,
    toggleAll,
    selectAll,
    deselectAll,
    reset,
  }
}
