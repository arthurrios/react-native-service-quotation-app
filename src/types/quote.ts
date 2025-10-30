export interface QuoteItem {
  id: string
  name: string
  description: string
  qty: number
  price: number
}

export type QuoteStatus = 'Draft' | 'Sent' | 'Approved' | 'Declined'

export interface QuoteDoc {
  id: string
  client: string
  title: string
  items: QuoteItem[]
  discountPct?: number
  status: QuoteStatus
  createdAt: Date
  updatedAt: Date
}
