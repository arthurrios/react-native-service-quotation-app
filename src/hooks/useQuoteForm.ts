import { useState } from 'react'
import { useRadio } from '@/components/Radio/useRadio'
import { StatusType } from '@/components/Status/types'
import { QuoteItem } from '@/types/quote'

// Simple ID generator for React Native compatibility
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

const defaultItems: QuoteItem[] = [
  {
    id: '1',
    name: 'Design de interfaces',
    description: 'Design de interfaces para o seu produto',
    qty: 1,
    price: 3847.5,
  },
  {
    id: '2',
    name: 'Implantação e suporte',
    description: 'Publicação do seu produto no Google Play Store e App Store',
    qty: 2,
    price: 3847.5,
  },
]

export function useQuoteForm() {
  const [isQuoteItemModalOpen, setIsQuoteItemModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [client, setClient] = useState('')
  const [discountPct, setDiscountPct] = useState(0)
  const {
    select: selectStatus,
    selectedValue: status,
    isSelected: isStatusSelected,
  } = useRadio<StatusType>(StatusType.DRAFT)
  const [items, setItems] = useState<QuoteItem[]>(defaultItems)
  const [selectedItem, setSelectedItem] = useState<QuoteItem | null>(null)

  function addItem(quoteItem: Omit<QuoteItem, 'id'>) {
    setItems((prev) => [...prev, { id: generateId(), ...quoteItem }])
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
    isQuoteItemModalOpen,
    setIsQuoteItemModalOpen,
  }
}
