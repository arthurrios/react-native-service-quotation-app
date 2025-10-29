# AsyncStorage Integration

This directory contains the storage implementation for the quotes app using AsyncStorage.

## Files

- `storage.ts` - Main storage service with all AsyncStorage operations
- `seed.ts` - Seed data for populating the app with sample quotes
- `quotes.ts` - Legacy in-memory data service (kept for reference)

## Features

### Automatic Migration
The app automatically populates seed data when first launched if no quotes exist in storage.

### Data Persistence
- **Quotes**: All quotes with their items are persisted
- **Filters**: Search, status filters, and sort order are remembered
- **Dates**: Properly serialized/deserialized for storage

### Storage Operations

#### Basic Operations
- `saveQuotes(quotes)` - Save all quotes
- `loadQuotes()` - Load all quotes
- `saveQuote(quote)` - Save/update a single quote
- `deleteQuote(id)` - Delete a quote by ID

#### Filter Operations
- `saveFilters(filters)` - Save filter preferences
- `loadFilters()` - Load filter preferences

#### Migration & Seeding
- `populateSeedData()` - Populate storage with seed data
- `migrateIfNeeded()` - Auto-migrate if storage is empty
- `resetToSeedData()` - Clear all data and populate with seed data

## Development Tools

In development mode, you can access storage utilities via the global `storageUtils` object:

```javascript
// In React Native debugger or console
storageUtils.getStorageInfo()        // Get storage statistics
storageUtils.populateSeedData()      // Populate with seed data
storageUtils.resetToSeedData()       // Reset to seed data
storageUtils.clearAllData()          // Clear all data
storageUtils.migrateIfNeeded()       // Run migration
```

## Usage in Components

```typescript
import { useQuotes } from '@/hooks/useQuotes'

function MyComponent() {
  const { 
    quotes, 
    addQuote, 
    updateQuote, 
    deleteQuote, 
    isLoading 
  } = useQuotes()

  // All operations automatically persist to AsyncStorage
  const handleAddQuote = async (quoteData) => {
    await addQuote(quoteData)
  }
}
```

## Data Structure

### QuoteDoc
```typescript
interface QuoteDoc {
  id: string  // Incremental numeric ID (e.g., "1", "2", "3"...)
  client: string
  title: string
  items: Item[]
  discountPct?: number
  status: QuoteStatus
  createdAt: Date
  updatedAt: Date
}
```

### Item
```typescript
interface Item {
  id: string
  description: string
  qty: number
  price: number
}
```

### Filters
```typescript
interface UseQuotesFilters {
  search: string
  statuses: StatusType[]
  orderBy: OrderBy
}
```
