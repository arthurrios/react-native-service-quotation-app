export interface Item {
  id: string
  description: string
  qty: number
  price: number
}

export type QuoteStatus = 'Rascunho' | 'Enviado' | 'Aprovado' | 'Recusado'

export interface QuoteDoc {
  id: string
  client: string
  title: string
  items: Item[]
  discountPct?: number
  status: QuoteStatus
  createdAt: Date
  updatedAt: Date
}
