import AsyncStorage from '@react-native-async-storage/async-storage'
import { UseQuotesFilters } from '@/hooks/useQuotes'
import { QuoteDoc } from '@/types/quote'
import { seedQuotes } from './seed'

// Storage keys
const STORAGE_KEYS = {
  QUOTES: '@quotes',
  FILTERS: '@filters',
} as const

// Helper functions for date serialization/deserialization
function serializeQuote(quote: QuoteDoc): string {
  return JSON.stringify({
    ...quote,
    createdAt: quote.createdAt.toISOString(),
    updatedAt: quote.updatedAt.toISOString(),
  })
}

function deserializeQuote(serializedQuote: string): QuoteDoc {
  const parsed: QuoteDoc = JSON.parse(serializedQuote)
  return {
    ...parsed,
    createdAt: new Date(parsed.createdAt),
    updatedAt: new Date(parsed.updatedAt),
  }
}

export const storageService = {
  // Quote operations
  async saveQuotes(quotes: QuoteDoc[]): Promise<void> {
    try {
      const serializedQuotes = quotes.map(serializeQuote)
      await AsyncStorage.setItem(
        STORAGE_KEYS.QUOTES,
        JSON.stringify(serializedQuotes),
      )
    } catch (error) {
      console.error('Error saving quotes:', error)
      throw error
    }
  },

  async loadQuotes(): Promise<QuoteDoc[]> {
    try {
      const serializedQuotes = await AsyncStorage.getItem(STORAGE_KEYS.QUOTES)
      if (!serializedQuotes) return []

      const quotesArray = JSON.parse(serializedQuotes)
      return quotesArray.map(deserializeQuote)
    } catch (error) {
      console.error('Error loading quotes:', error)
      return []
    }
  },

  async getQuote(quoteId: string): Promise<QuoteDoc | null> {
    try {
      const quotes = await this.loadQuotes()
      return quotes.find((q) => q.id === quoteId) ?? null
    } catch (error) {
      console.error('Error getting quote:', error)
      return null
    }
  },

  async saveQuote(quote: QuoteDoc): Promise<void> {
    try {
      const quotes = await this.loadQuotes()
      const existingIndex = quotes.findIndex((q) => q.id === quote.id)

      if (existingIndex >= 0) {
        quotes[existingIndex] = quote
      } else {
        quotes.push(quote)
      }

      await this.saveQuotes(quotes)
    } catch (error) {
      console.error('Error saving quote:', error)
      throw error
    }
  },

  async deleteQuote(quoteId: string): Promise<void> {
    try {
      const quotes = await this.loadQuotes()
      const filteredQuotes = quotes.filter((q) => q.id !== quoteId)
      await this.saveQuotes(filteredQuotes)
    } catch (error) {
      console.error('Error deleting quote:', error)
      throw error
    }
  },

  // Filter operations
  async saveFilters(filters: UseQuotesFilters): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters))
    } catch (error) {
      console.error('Error saving filters:', error)
      throw error
    }
  },

  async loadFilters(): Promise<UseQuotesFilters | null> {
    try {
      const filters = await AsyncStorage.getItem(STORAGE_KEYS.FILTERS)
      return filters ? JSON.parse(filters) : null
    } catch (error) {
      console.error('Error loading filters:', error)
      return null
    }
  },

  // Utility operations
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.QUOTES,
        STORAGE_KEYS.FILTERS,
      ])
    } catch (error) {
      console.error('Error clearing all data:', error)
    }
  },

  async getStorageInfo(): Promise<{
    quotesCount: number
    hasFilters: boolean
  }> {
    try {
      const quotes = await this.loadQuotes()
      const filters = await this.loadFilters()
      return {
        quotesCount: quotes.length,
        hasFilters: filters !== null,
      }
    } catch (error) {
      console.error('Error getting storage info:', error)
      return { quotesCount: 0, hasFilters: false }
    }
  },

  // Migration and seeding operations
  async populateSeedData(): Promise<void> {
    try {
      console.log('Populating seed data into AsyncStorage...')
      await this.saveQuotes(seedQuotes)
      console.log(
        `Successfully populated ${seedQuotes.length} quotes into AsyncStorage`,
      )
    } catch (error) {
      console.error('Error populating seed data:', error)
      throw error
    }
  },

  async migrateIfNeeded(): Promise<void> {
    try {
      const existingQuotes = await this.loadQuotes()

      // If no quotes exist, populate with seed data
      if (existingQuotes.length === 0) {
        console.log('No quotes found in storage, populating with seed data...')
        await this.populateSeedData()
      } else {
        console.log(`Found ${existingQuotes.length} existing quotes in storage`)
      }
    } catch (error) {
      console.error('Error during migration:', error)
      throw error
    }
  },

  async resetToSeedData(): Promise<void> {
    try {
      console.log('Resetting storage to seed data...')
      await this.clearAll()
      await this.populateSeedData()
      console.log('Storage reset to seed data successfully')
    } catch (error) {
      console.error('Error resetting to seed data:', error)
      throw error
    }
  },
}
