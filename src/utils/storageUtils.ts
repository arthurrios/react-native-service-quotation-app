import { storageService } from '@/data/storage'

/**
 * Utility functions for managing AsyncStorage data
 * These can be used for development, testing, or manual data management
 */

export const storageUtils = {
  /**
   * Populate storage with seed data
   * This will overwrite any existing quotes
   */
  async populateSeedData(): Promise<void> {
    try {
      await storageService.populateSeedData()
      console.log('✅ Seed data populated successfully')
    } catch (error) {
      console.error('❌ Error populating seed data:', error)
      throw error
    }
  },

  /**
   * Reset storage to seed data
   * This will clear all data and populate with seed data
   */
  async resetToSeedData(): Promise<void> {
    try {
      await storageService.resetToSeedData()
      console.log('✅ Storage reset to seed data successfully')
    } catch (error) {
      console.error('❌ Error resetting to seed data:', error)
      throw error
    }
  },

  /**
   * Clear all data from storage
   */
  async clearAllData(): Promise<void> {
    try {
      await storageService.clearAll()
      console.log('✅ All data cleared from storage')
    } catch (error) {
      console.error('❌ Error clearing storage:', error)
      throw error
    }
  },

  /**
   * Get storage information
   */
  async getStorageInfo(): Promise<{
    quotesCount: number
    hasFilters: boolean
  }> {
    try {
      const info = await storageService.getStorageInfo()
      console.log('📊 Storage info:', info)
      return info
    } catch (error) {
      console.error('❌ Error getting storage info:', error)
      throw error
    }
  },

  /**
   * Migrate data if needed (populate seed data if storage is empty)
   */
  async migrateIfNeeded(): Promise<void> {
    try {
      await storageService.migrateIfNeeded()
      console.log('✅ Migration completed')
    } catch (error) {
      console.error('❌ Error during migration:', error)
      throw error
    }
  },
}

// For development purposes - expose to global scope
if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(global as Record<string, unknown>).storageUtils = storageUtils
}
