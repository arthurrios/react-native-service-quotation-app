import { StatusType } from '@/components/Status/types'
import { QuoteDoc, QuoteStatus } from '@/types/quote'

/**
 * Mapeia os valores de status do QuoteStatus para as chaves do StatusType
 */
export const statusMapping: Record<QuoteStatus, StatusType> = {
  Draft: StatusType.DRAFT,
  Sent: StatusType.SENT,
  Approved: StatusType.APPROVED,
  Declined: StatusType.DECLINED,
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
    throw new Error(`StatusType ${statusType} not found in mapping`)
  }
  return reverseMapping[0] as QuoteStatus
}

export const seedQuotes: QuoteDoc[] = [
  {
    id: '1',
    client: 'Tech Solutions Beta',
    title: 'Online store app development',
    items: [
      {
        id: '1-1',
        name: 'App Mobile Cross-Platform',
        description:
          'Desenvolvimento completo do aplicativo mobile para iOS e Android usando React Native, incluindo todas as funcionalidades de e-commerce',
        qty: 1,
        price: 12000.0,
      },
      {
        id: '1-2',
        name: 'Gateway de Pagamento',
        description:
          'Integration with multiple payment gateways (Stripe, PayPal, PagSeguro) with secure checkout system',
        qty: 1,
        price: 3500.0,
      },
      {
        id: '1-3',
        name: 'Sistema de Estoque',
        description:
          'Complete inventory management system with entry/exit control, restock alerts and reports',
        qty: 1,
        price: 2800.0,
      },
      {
        id: '1-4',
        name: 'Painel Administrativo',
        description:
          'Complete web dashboard for order management, customers, products and sales reports',
        qty: 1,
        price: 4500.0,
      },
      {
        id: '1-5',
        name: 'Testes e QA',
        description:
          'Automated testing, feature validation, performance testing and quality assurance',
        qty: 1,
        price: 1500.0,
      },
    ],
    discountPct: 5,
    status: 'Approved',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    client: 'Marketing Wizards',
    title: 'Digital marketing consulting',
    items: [
      {
        id: '2-1',
        name: 'Digital Marketing Audit',
        description:
          'Complete analysis of digital presence, SEO, social media, competition and improvement opportunities',
        qty: 1,
        price: 1500.0,
      },
      {
        id: '2-2',
        name: 'Content Strategy',
        description:
          'Strategic content planning for Instagram, Facebook, LinkedIn and TikTok with editorial calendar',
        qty: 1,
        price: 1200.0,
      },
      {
        id: '2-3',
        name: 'Google Ads Campaigns',
        description:
          'Setup and optimization of search, display and shopping campaigns on Google Ads',
        qty: 1,
        price: 800.0,
      },
      {
        id: '2-4',
        name: 'Performance Reports',
        description:
          'Detailed monthly reports with ROI metrics, engagement and optimization suggestions',
        qty: 3,
        price: 500.0,
      },
    ],
    status: 'Draft',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: '3',
    client: 'SEO Masters',
    title: 'SEO Services',
    items: [
      {
        id: '3-1',
        name: 'Technical SEO Audit',
        description:
          'Complete analysis of site technical structure, speed, mobile-friendliness and indexing issues',
        qty: 1,
        price: 1200.0,
      },
      {
        id: '3-2',
        name: 'Keyword Research',
        description:
          'Research and analysis of relevant keywords, competition analysis and positioning strategy',
        qty: 1,
        price: 800.0,
      },
      {
        id: '3-3',
        name: 'SEO Content',
        description:
          'Creation of SEO-optimized content focusing on keywords and user experience',
        qty: 1,
        price: 1000.0,
      },
      {
        id: '3-4',
        name: 'Link Building',
        description:
          'Quality link building strategy to increase domain authority and ranking',
        qty: 1,
        price: 500.0,
      },
    ],
    status: 'Sent',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-30'),
  },
  {
    id: '4',
    client: 'Content Creators',
    title: 'Content creation',
    items: [
      {
        id: '4-1',
        name: 'Instagram Posts',
        description:
          'Creation of 20 creative Instagram posts with design, copy and engagement strategy',
        qty: 1,
        price: 1000.0,
      },
      {
        id: '4-2',
        name: 'YouTube Videos',
        description:
          'Production of 5 YouTube videos including script, recording, editing and optimization',
        qty: 1,
        price: 800.0,
      },
      {
        id: '4-3',
        name: 'Blog Articles',
        description:
          'Creation of 10 blog-optimized articles with research, writing and SEO',
        qty: 1,
        price: 700.0,
      },
    ],
    status: 'Draft',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '5',
    client: 'Social Experts',
    title: 'Social media management',
    items: [
      {
        id: '5-1',
        name: 'Instagram Management',
        description:
          'Complete Instagram management including posts, stories, reels, follower interaction and metrics analysis',
        qty: 1,
        price: 800.0,
      },
      {
        id: '5-2',
        name: 'Facebook Management',
        description:
          'Complete Facebook management including posts, events, groups, ads and comment monitoring',
        qty: 1,
        price: 600.0,
      },
      {
        id: '5-3',
        name: 'Engagement Strategy',
        description:
          'Development of personalized strategy to increase engagement and audience loyalty',
        qty: 1,
        price: 400.0,
      },
    ],
    status: 'Declined',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05'),
  },
  {
    id: '6',
    client: 'UI/UX Designers',
    title: 'UI Design',
    items: [
      {
        id: '6-1',
        name: 'Mobile UI/UX App',
        description:
          'Complete mobile app interface design including wireframes, mockups and technical specifications',
        qty: 1,
        price: 2500.0,
      },
      {
        id: '6-2',
        name: 'Visual Identity',
        description:
          'Complete visual identity creation including logo, color palette, typography and applications',
        qty: 1,
        price: 1500.0,
      },
      {
        id: '6-3',
        name: 'Interactive Prototyping',
        description:
          'Creation of clickable interactive prototypes for flow validation and user experience',
        qty: 1,
        price: 800.0,
      },
      {
        id: '6-4',
        name: 'Design System',
        description:
          'Creation of style guide and reusable component library for development',
        qty: 1,
        price: 400.0,
      },
    ],
    status: 'Approved',
    createdAt: new Date('2024-02-08'),
    updatedAt: new Date('2024-02-10'),
  },
]
