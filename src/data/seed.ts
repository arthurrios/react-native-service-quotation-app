import { StatusType } from '@/components/Status/types'
import { QuoteDoc, QuoteStatus } from '@/types/quote'

/**
 * Mapeia os valores de status do QuoteStatus para as chaves do StatusType
 */
export const statusMapping: Record<QuoteStatus, StatusType> = {
  Rascunho: StatusType.DRAFT,
  Enviado: StatusType.SENT,
  Aprovado: StatusType.APPROVED,
  Recusado: StatusType.DECLINED,
}

/**
 * Converte um status de QuoteStatus para StatusType
 */
export const mapQuoteStatusToStatusType = (status: QuoteStatus): StatusType => {
  return statusMapping[status]
}

/**
 * Converte um StatusType para QuoteStatus
 */
export const mapStatusTypeToQuoteStatus = (
  statusType: StatusType,
): QuoteStatus => {
  const reverseMapping = Object.entries(statusMapping).find(
    ([, value]) => value === statusType,
  )
  if (!reverseMapping) {
    throw new Error(`StatusType ${statusType} não encontrado no mapeamento`)
  }
  return reverseMapping[0] as QuoteStatus
}

export const seedQuotes: QuoteDoc[] = [
  {
    id: '1',
    client: 'Soluções Tecnológicas Beta',
    title: 'Desenvolvimento de aplicativo de loja online',
    items: [
      {
        id: '1-1',
        description: 'Desenvolvimento do aplicativo mobile (iOS e Android)',
        qty: 1,
        price: 12000.0,
      },
      {
        id: '1-2',
        description: 'Integração com gateway de pagamento',
        qty: 1,
        price: 3500.0,
      },
      {
        id: '1-3',
        description: 'Sistema de gestão de estoque',
        qty: 1,
        price: 2800.0,
      },
      {
        id: '1-4',
        description: 'Painel administrativo web',
        qty: 1,
        price: 4500.0,
      },
      {
        id: '1-5',
        description: 'Testes e validação completa',
        qty: 1,
        price: 1500.0,
      },
    ],
    discountPct: 5,
    status: 'Aprovado',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    client: 'Marketing Wizards',
    title: 'Consultoria em marketing digital',
    items: [
      {
        id: '2-1',
        description: 'Auditoria completa de marketing digital',
        qty: 1,
        price: 1500.0,
      },
      {
        id: '2-2',
        description: 'Estratégia de conteúdo para redes sociais',
        qty: 1,
        price: 1200.0,
      },
      {
        id: '2-3',
        description: 'Configuração de campanhas Google Ads',
        qty: 1,
        price: 800.0,
      },
      {
        id: '2-4',
        description: 'Relatórios mensais de performance',
        qty: 3,
        price: 500.0,
      },
    ],
    status: 'Rascunho',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: '3',
    client: 'SEO Masters',
    title: 'Serviços de SEO',
    items: [
      {
        id: '3-1',
        description: 'Auditoria técnica de SEO',
        qty: 1,
        price: 1200.0,
      },
      {
        id: '3-2',
        description: 'Otimização de palavras-chave',
        qty: 1,
        price: 800.0,
      },
      {
        id: '3-3',
        description: 'Criação de conteúdo otimizado',
        qty: 1,
        price: 1000.0,
      },
      {
        id: '3-4',
        description: 'Link building e autoridade de domínio',
        qty: 1,
        price: 500.0,
      },
    ],
    status: 'Enviado',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-30'),
  },
  {
    id: '4',
    client: 'Content Creators',
    title: 'Criação de conteúdo',
    items: [
      {
        id: '4-1',
        description: 'Criação de 20 posts para Instagram',
        qty: 1,
        price: 1000.0,
      },
      {
        id: '4-2',
        description: 'Produção de 5 vídeos para YouTube',
        qty: 1,
        price: 800.0,
      },
      {
        id: '4-3',
        description: 'Criação de 10 artigos para blog',
        qty: 1,
        price: 700.0,
      },
    ],
    status: 'Rascunho',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '5',
    client: 'Social Experts',
    title: 'Gestão de redes sociais',
    items: [
      {
        id: '5-1',
        description: 'Gestão completa do Instagram',
        qty: 1,
        price: 800.0,
      },
      {
        id: '5-2',
        description: 'Gestão completa do Facebook',
        qty: 1,
        price: 600.0,
      },
      {
        id: '5-3',
        description: 'Criação de estratégia de engajamento',
        qty: 1,
        price: 400.0,
      },
    ],
    status: 'Recusado',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05'),
  },
  {
    id: '6',
    client: 'UI/UX Designers',
    title: 'Design de interface',
    items: [
      {
        id: '6-1',
        description: 'Design de interface para aplicativo mobile',
        qty: 1,
        price: 2500.0,
      },
      {
        id: '6-2',
        description: 'Criação de identidade visual',
        qty: 1,
        price: 1500.0,
      },
      {
        id: '6-3',
        description: 'Prototipação interativa',
        qty: 1,
        price: 800.0,
      },
      {
        id: '6-4',
        description: 'Guia de estilo e componentes',
        qty: 1,
        price: 400.0,
      },
    ],
    status: 'Aprovado',
    createdAt: new Date('2024-02-08'),
    updatedAt: new Date('2024-02-10'),
  },
]
