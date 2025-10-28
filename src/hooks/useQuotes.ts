import { useMemo, useState } from 'react'
import { StatusType } from '@/components/Status/types'
import { QuoteDoc, QuoteStatus, quotesData } from '@/data'

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
const calculateQuoteTotal = (quote: QuoteDoc): number => {
  const itemsTotal = quote.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0,
  )

  const discount = quote.discountPct
    ? itemsTotal * (quote.discountPct / 100)
    : 0

  return itemsTotal - discount
}

export function useQuotes(): UseQuotesReturn {
  const [filters, setFilters] = useState<UseQuotesFilters>(initialFilters)
  const [modalVisible, setModalVisible] = useState(false)
  const [tempStatuses, setTempStatuses] = useState<StatusType[]>([])
  const [tempOrderBy, setTempOrderBy] = useState<OrderBy>('mostRecent')

  // Get all quotes from data source
  const allQuotes = quotesData.getAll()

  // Filter and sort quotes based on current filters
  const quotes = useMemo(() => {
    let filteredQuotes = [...allQuotes]

    // Apply search filter
    if (filters.search.trim()) {
      filteredQuotes = quotesData.search(filters.search)
    }

    // Apply status filter
    if (filters.statuses.length > 0) {
      const statusValues = filters.statuses.map(
        (status) => STATUS_MAPPING[status],
      )
      filteredQuotes = filteredQuotes.filter((quote) =>
        statusValues.includes(quote.status),
      )
    }

    // Apply sorting
    filteredQuotes.sort((a, b) => {
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

    return filteredQuotes
  }, [allQuotes, filters])

  // Get statistics
  const stats = useMemo(() => {
    return quotesData.getStats()
  }, [allQuotes])

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

  return {
    quotes,
    filters,
    modalVisible,
    tempStatuses,
    tempOrderBy,
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
  }
}
