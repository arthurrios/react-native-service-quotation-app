import { QuoteDoc, QuoteStatus } from '@/types/quote'
import { seedQuotes } from './seed'

// Simulates a local in-memory database
let quotes: QuoteDoc[] = [...seedQuotes]

export const quotesData = {
  // Get all quotes
  getAll: (): QuoteDoc[] => {
    return [...quotes]
  },

  // Get quote by ID
  getById: (id: string): QuoteDoc | undefined => {
    return quotes.find((quote) => quote.id === id)
  },

  // Get quotes by status
  getByStatus: (status: QuoteStatus): QuoteDoc[] => {
    return quotes.filter((quote) => quote.status === status)
  },

  // Get quotes by client
  getByClient: (clientName: string): QuoteDoc[] => {
    return quotes.filter((quote) =>
      quote.client.toLowerCase().includes(clientName.toLowerCase()),
    )
  },

  // Get quotes by title
  getByTitle: (title: string): QuoteDoc[] => {
    return quotes.filter((quote) =>
      quote.title.toLowerCase().includes(title.toLowerCase()),
    )
  },

  // General search (client or title)
  search: (query: string): QuoteDoc[] => {
    if (!query.trim()) return quotes

    return quotes.filter(
      (quote) =>
        quote.client.toLowerCase().includes(query.toLowerCase()) ||
        quote.title.toLowerCase().includes(query.toLowerCase()),
    )
  },

  // Create new quote
  create: (
    quote: Omit<QuoteDoc, 'id' | 'createdAt' | 'updatedAt'>,
  ): QuoteDoc => {
    const newQuote: QuoteDoc = {
      ...quote,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    quotes.push(newQuote)
    return newQuote
  },

  // Update quote
  update: (
    id: string,
    updates: Partial<Omit<QuoteDoc, 'id' | 'createdAt'>>,
  ): QuoteDoc | null => {
    const index = quotes.findIndex((quote) => quote.id === id)

    if (index === -1) return null

    quotes[index] = {
      ...quotes[index],
      ...updates,
      updatedAt: new Date(),
    }

    return quotes[index]
  },

  // Delete quote
  delete: (id: string): boolean => {
    const index = quotes.findIndex((quote) => quote.id === id)

    if (index === -1) return false

    quotes.splice(index, 1)
    return true
  },

  // Reset data to initial state
  reset: (): void => {
    quotes = [...seedQuotes]
  },

  // General statistics
  getStats: () => {
    const total = quotes.length
    const byStatus = quotes.reduce(
      (acc, quote) => {
        acc[quote.status] = (acc[quote.status] || 0) + 1
        return acc
      },
      {} as Record<QuoteStatus, number>,
    )

    const totalValue = quotes.reduce((sum, quote) => {
      const itemsTotal = quote.items.reduce(
        (itemSum, item) => itemSum + item.qty * item.price,
        0,
      )
      const discount = quote.discountPct
        ? itemsTotal * (quote.discountPct / 100)
        : 0
      return sum + (itemsTotal - discount)
    }, 0)

    return {
      total,
      byStatus,
      totalValue,
    }
  },
}
