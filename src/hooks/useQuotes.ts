import { useEffect, useMemo, useState } from 'react'
import { StatusType } from '@/components/Status/types'
import { storageService } from '@/data/storage'
import { QuoteDoc, QuoteStatus } from '@/types/quote'

const STATUS_MAPPING: Record<StatusType, QuoteStatus> = {
  [StatusType.DRAFT]: 'Rascunho',
  [StatusType.SENT]: 'Enviado',
  [StatusType.APPROVED]: 'Aprovado',
  [StatusType.DECLINED]: 'Recusado',
}

export type OrderBy = 'mostRecent' | 'oldest' | 'lowestPrice' | 'highestPrice'

export interface UseQuotesFilters {
  search: string
  statuses: StatusType[]
  orderBy: OrderBy
}

export interface UseQuotesReturn {
  quotes: QuoteDoc[]
  filters: UseQuotesFilters
  // Modal state
  modalVisible: boolean
  tempStatuses: StatusType[]
  tempOrderBy: OrderBy
  // Loading state
  isLoading: boolean
  // Actions
  setSearch: (search: string) => void
  setStatuses: (statuses: StatusType[]) => void
  setOrderBy: (orderBy: OrderBy) => void
  resetFilters: () => void
  // Modal actions
  openModal: () => void
  closeModal: () => void
  updateTempStatuses: (statuses: StatusType[]) => void
  updateTempOrderBy: (orderBy: OrderBy) => void
  applyModalFilters: () => void
  resetModalFilters: () => void
  // Quote operations
  addQuote: (
    quote: Omit<QuoteDoc, 'id' | 'createdAt' | 'updatedAt'>,
  ) => Promise<void>
  updateQuote: (
    id: string,
    updates: Partial<Omit<QuoteDoc, 'id' | 'createdAt'>>,
  ) => Promise<void>
  deleteQuote: (id: string) => Promise<void>
  stats: {
    total: number
    byStatus: Record<QuoteStatus, number>
    totalValue: number
  }
}

const initialFilters: UseQuotesFilters = {
  search: '',
  statuses: [],
  orderBy: 'mostRecent',
}

// Calculate total value for a quote
export const calculateQuoteTotal = (quote: QuoteDoc): number => {
  const itemsTotal = quote.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0,
  )

  const discount = quote.discountPct
    ? itemsTotal * (quote.discountPct / 100)
    : 0

  return itemsTotal - discount
}

export const calculateQuoteDiscount = (quote: QuoteDoc): number => {
  const itemsTotal = quote.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0,
  )

  return itemsTotal * (quote?.discountPct || 0 / 100)
}

export function useQuotes(): UseQuotesReturn {
  const [quotes, setQuotes] = useState<QuoteDoc[]>([])
  const [filters, setFilters] = useState<UseQuotesFilters>(initialFilters)
  const [modalVisible, setModalVisible] = useState(false)
  const [tempStatuses, setTempStatuses] = useState<StatusType[]>([])
  const [tempOrderBy, setTempOrderBy] = useState<OrderBy>('mostRecent')
  const [isLoading, setIsLoading] = useState(true)

  // Load data from storage on mount
  useEffect(() => {
    loadData()
  }, [])

  // Save filters to storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      storageService.saveFilters(filters).catch(console.error)
    }
  }, [filters, isLoading])

  async function loadData() {
    try {
      setIsLoading(true)

      // First, migrate seed data if needed
      await storageService.migrateIfNeeded()

      // Load quotes and filters in parallel
      const [savedQuotes, savedFilters] = await Promise.all([
        storageService.loadQuotes(),
        storageService.loadFilters(),
      ])

      setQuotes(savedQuotes)

      if (savedFilters) {
        setFilters(savedFilters)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Filter and sort quotes based on current filters
  const filteredQuotes = useMemo(() => {
    let filtered = [...quotes]

    // Apply search filter
    if (filters.search.trim()) {
      filtered = filtered.filter(
        (quote) =>
          quote.client.toLowerCase().includes(filters.search.toLowerCase()) ||
          quote.title.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    // Apply status filter
    if (filters.statuses.length > 0) {
      const statusValues = filters.statuses.map(
        (status) => STATUS_MAPPING[status],
      )
      filtered = filtered.filter((quote) => statusValues.includes(quote.status))
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.orderBy) {
        case 'mostRecent':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case 'oldest':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        case 'highestPrice':
          return calculateQuoteTotal(b) - calculateQuoteTotal(a)
        case 'lowestPrice':
          return calculateQuoteTotal(a) - calculateQuoteTotal(b)
        default:
          return 0
      }
    })

    return filtered
  }, [quotes, filters])

  // Get statistics
  const stats = useMemo(() => {
    const total = quotes.length
    const byStatus = quotes.reduce(
      (acc, quote) => {
        acc[quote.status] = (acc[quote.status] || 0) + 1
        return acc
      },
      {} as Record<QuoteStatus, number>,
    )

    const totalValue = quotes.reduce((sum, quote) => {
      return sum + calculateQuoteTotal(quote)
    }, 0)

    return {
      total,
      byStatus,
      totalValue,
    }
  }, [quotes])

  // Filter actions
  const setSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }))
  }

  const setStatuses = (statuses: StatusType[]) => {
    setFilters((prev) => ({ ...prev, statuses }))
  }

  const setOrderBy = (orderBy: OrderBy) => {
    setFilters((prev) => ({ ...prev, orderBy }))
  }

  const resetFilters = () => {
    setFilters(initialFilters)
  }

  // Modal actions
  const openModal = () => {
    setTempStatuses(filters.statuses)
    setTempOrderBy(filters.orderBy)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const updateTempStatuses = (statuses: StatusType[]) => {
    setTempStatuses(statuses)
  }

  const updateTempOrderBy = (orderBy: OrderBy) => {
    setTempOrderBy(orderBy)
  }

  const applyModalFilters = () => {
    setFilters((prev) => ({
      ...prev,
      statuses: tempStatuses,
      orderBy: tempOrderBy,
    }))
    setModalVisible(false)
  }

  const resetModalFilters = () => {
    resetFilters()
    setTempStatuses([])
    setTempOrderBy('mostRecent')
    setModalVisible(false)
  }

  // Quote operations
  async function addQuote(
    quoteData: Omit<QuoteDoc, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    // Generate incremental ID based on existing quotes
    // Finds the highest numeric ID and adds 1
    const maxId = quotes.reduce((max, quote) => {
      const idNum = parseInt(quote.id, 10)
      return Number.isNaN(idNum) ? max : Math.max(max, idNum)
    }, 0)

    const newQuote: QuoteDoc = {
      ...quoteData,
      id: (maxId + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    try {
      await storageService.saveQuote(newQuote)
      setQuotes((prev) => [...prev, newQuote])
    } catch (error) {
      console.error('Error adding quote:', error)
      throw error
    }
  }

  async function updateQuote(
    id: string,
    updates: Partial<Omit<QuoteDoc, 'id' | 'createdAt' | 'updatedAt'>>,
  ) {
    try {
      const updatedQuote: QuoteDoc = {
        ...quotes.find((quote) => quote.id === id)!,
        ...updates,
        updatedAt: new Date(),
      }

      await storageService.saveQuote(updatedQuote)
      setQuotes((prev) =>
        prev.map((quote) => (quote.id === id ? updatedQuote : quote)),
      )
    } catch (error) {
      console.error('Error updating quote:', error)
      throw error
    }
  }

  async function deleteQuote(id: string) {
    try {
      await storageService.deleteQuote(id)
      setQuotes((prev) => prev.filter((quote) => quote.id !== id))
    } catch (error) {
      console.error('Error deleting quote:', error)
      throw error
    }
  }

  return {
    quotes: filteredQuotes,
    filters,
    modalVisible,
    tempStatuses,
    tempOrderBy,
    isLoading,
    setSearch,
    setStatuses,
    setOrderBy,
    resetFilters,
    openModal,
    closeModal,
    updateTempStatuses,
    updateTempOrderBy,
    applyModalFilters,
    resetModalFilters,
    stats,
    addQuote,
    updateQuote,
    deleteQuote,
  }
}
