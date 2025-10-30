import { useEffect, useMemo, useState } from 'react'
import { Alert } from 'react-native'
import { useRadio } from '@/components/Radio/useRadio'
import { StatusType } from '@/components/Status/types'
import {
  mapQuoteStatusToStatusType,
  mapStatusTypeToQuoteStatus,
} from '@/data/seed'
import { StackRoutesProps } from '@/routes/StackRoutes'
import { QuoteDoc, QuoteItem, QuoteStatus } from '@/types/quote'
import {
  calculateQuoteDiscount,
  calculateQuoteTotal,
  useQuotes,
} from './useQuotes'

// Simple ID generator for React Native compatibility
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

interface UseQuoteFormProps {
  navigation: StackRoutesProps<'quoteForm'>['navigation']
  quote?: QuoteDoc
}

export function useQuoteForm({
  navigation,
  quote = undefined,
}: UseQuoteFormProps) {
  const [isQuoteItemModalOpen, setIsQuoteItemModalOpen] = useState(false)
  const [title, setTitle] = useState(quote?.title ?? '')
  const [client, setClient] = useState(quote?.client ?? '')
  const [discountPct, setDiscountPct] = useState(quote?.discountPct ?? 0)
  const {
    select: selectStatus,
    selectedValue: status,
    isSelected: isStatusSelected,
  } = useRadio<StatusType>(
    mapQuoteStatusToStatusType(quote?.status as QuoteStatus) ??
      StatusType.DRAFT,
  )
  const [items, setItems] = useState<QuoteItem[]>(quote?.items ?? [])
  const [selectedItem, setSelectedItem] = useState<QuoteItem | null>(null)
  const [hasTitleError, setHasTitleError] = useState(false)
  const [hasClientError, setHasClientError] = useState(false)
  const [hasTouchedTitle, setHasTouchedTitle] = useState(false)
  const [hasTouchedClient, setHasTouchedClient] = useState(false)

  // Update form fields when quote is loaded
  useEffect(() => {
    if (quote) {
      setTitle(quote.title)
      setClient(quote.client)
      setDiscountPct(quote.discountPct ?? 0)
      setItems(quote.items)
      selectStatus(
        mapQuoteStatusToStatusType(quote.status as QuoteStatus) ??
          StatusType.DRAFT,
      )
    }
  }, [quote, selectStatus])

  useEffect(() => {
    if (hasTouchedTitle) {
      setHasTitleError(!title.trim())
    }
  }, [title, hasTouchedTitle])

  useEffect(() => {
    if (hasTouchedClient) {
      setHasClientError(!client.trim())
    }
  }, [client, hasTouchedClient])

  const itemsQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  )

  const total = useMemo(() => calculateQuoteTotal({ items }), [items])
  const discount = useMemo(
    () => calculateQuoteDiscount({ items, discountPct }),
    [items, discountPct],
  )
  const totalWithDiscount = useMemo(() => total - discount, [total, discount])
  const { addQuote, updateQuote } = useQuotes()

  function validateForm() {
    // Mark all fields as touched when validating on submit
    setHasTouchedTitle(true)
    setHasTouchedClient(true)

    let hasError = false

    if (!title.trim()) {
      setHasTitleError(true)
      hasError = true
      return 'Title is required'
    }
    if (!client.trim()) {
      setHasClientError(true)
      hasError = true
      return 'Client is required'
    }
    if (!items.length) {
      return 'You must add at least one item'
    }

    if (hasError) {
      return 'Fill in all required fields'
    }

    setHasTitleError(false)
    setHasClientError(false)
    return null
  }

  async function handleSave() {
    const error = validateForm()
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK', style: 'cancel' }])
      return
    }
    const quoteData = {
      title,
      client,
      items,
      status: mapStatusTypeToQuoteStatus(status || StatusType.DRAFT),
      discountPct,
    }
    try {
      if (quote) {
        await updateQuote(quote.id, quoteData)
      } else {
        await addQuote({
          ...quoteData,
        })
      }
      Alert.alert('Success', 'Quote saved successfully', [
        { text: 'OK', style: 'cancel' },
      ])
      navigation.goBack()
    } catch (error) {
      console.error('Error adding quote:', error)
      Alert.alert('Error', 'Failed to save quote', [
        { text: 'OK', style: 'cancel' },
      ])
    }
  }

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
    total,
    discount,
    totalWithDiscount,
    itemsQuantity,
    hasTitleError,
    hasClientError,
    setHasTouchedTitle,
    setHasTouchedClient,
    handleSave,
  }
}
