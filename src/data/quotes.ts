import { QuoteDoc, QuoteStatus } from '@/types/quote'
import { seedQuotes } from './seed'

// Simula um banco de dados local em memória
let quotes: QuoteDoc[] = [...seedQuotes]

export const quotesData = {
  // Buscar todos os orçamentos
  getAll: (): QuoteDoc[] => {
    return [...quotes]
  },

  // Buscar orçamento por ID
  getById: (id: string): QuoteDoc | undefined => {
    return quotes.find((quote) => quote.id === id)
  },

  // Buscar orçamentos por status
  getByStatus: (status: QuoteStatus): QuoteDoc[] => {
    return quotes.filter((quote) => quote.status === status)
  },

  // Buscar orçamentos por cliente
  getByClient: (clientName: string): QuoteDoc[] => {
    return quotes.filter((quote) =>
      quote.client.toLowerCase().includes(clientName.toLowerCase()),
    )
  },

  // Buscar orçamentos por título
  getByTitle: (title: string): QuoteDoc[] => {
    return quotes.filter((quote) =>
      quote.title.toLowerCase().includes(title.toLowerCase()),
    )
  },

  // Busca geral (cliente ou título)
  search: (query: string): QuoteDoc[] => {
    if (!query.trim()) return quotes

    return quotes.filter(
      (quote) =>
        quote.client.toLowerCase().includes(query.toLowerCase()) ||
        quote.title.toLowerCase().includes(query.toLowerCase()),
    )
  },

  // Criar novo orçamento
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

  // Atualizar orçamento
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

  // Deletar orçamento
  delete: (id: string): boolean => {
    const index = quotes.findIndex((quote) => quote.id === id)

    if (index === -1) return false

    quotes.splice(index, 1)
    return true
  },

  // Resetar dados para o estado inicial
  reset: (): void => {
    quotes = [...seedQuotes]
  },

  // Estatísticas gerais
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
