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
          'Integração com múltiplos gateways de pagamento (Stripe, PayPal, PagSeguro) com sistema de checkout seguro',
        qty: 1,
        price: 3500.0,
      },
      {
        id: '1-3',
        name: 'Sistema de Estoque',
        description:
          'Sistema completo de gestão de estoque com controle de entrada, saída, alertas de reposição e relatórios',
        qty: 1,
        price: 2800.0,
      },
      {
        id: '1-4',
        name: 'Painel Administrativo',
        description:
          'Dashboard web completo para gestão de pedidos, clientes, produtos e relatórios de vendas',
        qty: 1,
        price: 4500.0,
      },
      {
        id: '1-5',
        name: 'Testes e QA',
        description:
          'Testes automatizados, validação de funcionalidades, testes de performance e garantia de qualidade',
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
        name: 'Auditoria de Marketing Digital',
        description:
          'Análise completa da presença digital, SEO, redes sociais, concorrência e oportunidades de melhoria',
        qty: 1,
        price: 1500.0,
      },
      {
        id: '2-2',
        name: 'Estratégia de Conteúdo',
        description:
          'Planejamento estratégico de conteúdo para Instagram, Facebook, LinkedIn e TikTok com calendário editorial',
        qty: 1,
        price: 1200.0,
      },
      {
        id: '2-3',
        name: 'Campanhas Google Ads',
        description:
          'Configuração e otimização de campanhas de busca, display e shopping no Google Ads',
        qty: 1,
        price: 800.0,
      },
      {
        id: '2-4',
        name: 'Relatórios de Performance',
        description:
          'Relatórios mensais detalhados com métricas de ROI, engajamento e sugestões de otimização',
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
        name: 'Auditoria Técnica SEO',
        description:
          'Análise completa da estrutura técnica do site, velocidade, mobile-friendliness e problemas de indexação',
        qty: 1,
        price: 1200.0,
      },
      {
        id: '3-2',
        name: 'Pesquisa de Palavras-chave',
        description:
          'Pesquisa e análise de palavras-chave relevantes, análise da concorrência e estratégia de posicionamento',
        qty: 1,
        price: 800.0,
      },
      {
        id: '3-3',
        name: 'Conteúdo SEO',
        description:
          'Criação de conteúdo otimizado para SEO com foco em palavras-chave e experiência do usuário',
        qty: 1,
        price: 1000.0,
      },
      {
        id: '3-4',
        name: 'Link Building',
        description:
          'Estratégia de construção de links de qualidade para aumentar a autoridade e ranking do domínio',
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
        name: 'Posts Instagram',
        description:
          'Criação de 20 posts criativos para Instagram com design, copy e estratégia de engajamento',
        qty: 1,
        price: 1000.0,
      },
      {
        id: '4-2',
        name: 'Vídeos YouTube',
        description:
          'Produção de 5 vídeos para YouTube incluindo roteiro, gravação, edição e otimização',
        qty: 1,
        price: 800.0,
      },
      {
        id: '4-3',
        name: 'Artigos para Blog',
        description:
          'Criação de 10 artigos otimizados para blog com pesquisa, escrita e SEO',
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
        name: 'Gestão Instagram',
        description:
          'Gestão completa do Instagram incluindo posts, stories, reels, interação com seguidores e análise de métricas',
        qty: 1,
        price: 800.0,
      },
      {
        id: '5-2',
        name: 'Gestão Facebook',
        description:
          'Gestão completa do Facebook incluindo posts, eventos, grupos, anúncios e monitoramento de comentários',
        qty: 1,
        price: 600.0,
      },
      {
        id: '5-3',
        name: 'Estratégia de Engajamento',
        description:
          'Desenvolvimento de estratégia personalizada para aumentar engajamento e fidelização da audiência',
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
        name: 'UI/UX Mobile App',
        description:
          'Design completo de interface para aplicativo mobile incluindo wireframes, mockups e especificações técnicas',
        qty: 1,
        price: 2500.0,
      },
      {
        id: '6-2',
        name: 'Identidade Visual',
        description:
          'Criação de identidade visual completa incluindo logo, paleta de cores, tipografia e aplicações',
        qty: 1,
        price: 1500.0,
      },
      {
        id: '6-3',
        name: 'Prototipação Interativa',
        description:
          'Criação de protótipos interativos clicáveis para validação de fluxos e experiência do usuário',
        qty: 1,
        price: 800.0,
      },
      {
        id: '6-4',
        name: 'Design System',
        description:
          'Criação de guia de estilo e biblioteca de componentes reutilizáveis para desenvolvimento',
        qty: 1,
        price: 400.0,
      },
    ],
    status: 'Aprovado',
    createdAt: new Date('2024-02-08'),
    updatedAt: new Date('2024-02-10'),
  },
]
