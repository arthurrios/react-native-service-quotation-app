import { useState } from 'react'
import { useRadio } from '@/components/Radio/useRadio'
import { StatusType } from '@/components/Status/types'
import { QuoteItem } from '@/types/quote'

export function useQuoteForm() {
  const [title, setTitle] = useState('')
  const [client, setClient] = useState('')
  const [discountPct, setDiscountPct] = useState(0)
  const {
    select: selectStatus,
    selectedValue: status,
    isSelected: isStatusSelected,
  } = useRadio<StatusType>(StatusType.DRAFT)
  const [items, setItems] = useState<QuoteItem[]>([])
  const [selectedItem, setSelectedItem] = useState<QuoteItem | null>(null)

  function addItem(quoteItem: Omit<QuoteItem, 'id'>) {
    setItems((prev) => [...prev, { id: crypto.randomUUID(), ...quoteItem }])
  }

  function updateItem(id: string, quoteItem: Omit<QuoteItem, 'id'>) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...quoteItem } : item)),
    )
  }

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return {
    title,
    client,
    setTitle,
    setClient,
    discountPct,
    setDiscountPct,
    status,
    isStatusSelected,
    selectStatus,
    items,
    setItems,
    selectedItem,
    setSelectedItem,
    addItem,
    updateItem,
    deleteItem,
  }
}
