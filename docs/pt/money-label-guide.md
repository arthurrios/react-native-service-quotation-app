# Como Criar um Componente MoneyLabel

Este documento explica como criar um componente MoneyLabel em React Native para exibir valores monetários com diferentes tamanhos, cores e opções de formatação.

## 📋 Pré-requisitos

- Conhecimento básico de React Native
- Familiaridade com TypeScript
- Entendimento de componentes e props

## 🎯 Objetivo

Criar um componente MoneyLabel reutilizável que:
- Exibe valores em Real Brasileiro (BRL)
- Suporta múltiplos tamanhos
- Suporta diferentes variantes de cor
- Trata valores negativos e descontos
- Fornece riscado para preços originais
- Separa o prefixo "R$" para estilização independente

## 📁 Estrutura de Arquivos

```
MoneyLabel/
├── index.tsx           # Componente principal MoneyLabel
├── types.ts            # Definições de tipos
├── styles.ts           # Estilos do componente
└── index.ts            # Exportações
```

Além disso:
```
utils/
└── formatCurrency.ts   # Utilitário de formatação de moeda
```

## 🛠️ Implementação Passo a Passo

### 1. Criar Utilitário para Formatação de Moeda

Primeiro, crie uma função utilitária para formatar números como moeda:

```typescript
// utils/formatCurrency.ts
/**
 * Formata um número como moeda Real Brasileira (BRL) (apenas número, sem símbolo)
 * @param value - O valor numérico para formatar
 * @returns String formatada sem símbolo (ex: "1.234,56")
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
```

**Explicação:**
- Usa `Intl.NumberFormat` para formatação brasileira adequada
- Retorna apenas o número (sem símbolo "R$")
- Sempre mostra 2 casas decimais
- Usa vírgula como separador decimal e ponto como separador de milhares

### 2. Definir Tipos

```typescript
// types.ts
import { TextProps } from 'react-native'

export type MoneySize = 'sm' | 'md' | 'lg'

export type MoneyColorVariant = 'default' | 'success' | 'danger'

export interface MoneyLabelProps extends TextProps {
  /** O valor monetário em centavos (inteiro) ou float */
  value: number
  /** Variante de tamanho: sm (textXs), md (textSm), ou lg (titleLg) */
  size?: MoneySize
  /** Variante de cor: default (cinza), success (verde), ou danger (vermelho) */
  color?: MoneyColorVariant
  /** Se é um valor negativo (mostra sinal de menos) */
  isNegative?: boolean
  /** Se deve mostrar com riscado (para preços originais) */
  strikethrough?: boolean
  /** Se deve mostrar o prefixo "R$" (padrão: true) */
  showPrefix?: boolean
}

export interface MoneyLabelStyleProps {
  size: MoneySize
  strikethrough: boolean
  color: MoneyColorVariant
}
```

**Explicação:**
- `MoneySize`: Mapeia para tamanhos de tipografia (sm → textXs, md → textSm, lg → titleLg)
- `MoneyColorVariant`: Define as opções de cor disponíveis
- `MoneyLabelProps`: Estende `TextProps` para herdar estilização padrão de texto
- Todos os elementos (prefixo, menos, valor) podem receber a mesma variante de cor

### 3. Criar Estilos

```typescript
// styles.ts
import { StyleSheet, TextStyle } from 'react-native'
import { colors, textStyles } from '@/styles'
import { MoneyLabelStyleProps, MoneySize } from './types'

// Mapeia variantes de tamanho para textStyles
const sizeToTextStyleMap: Record<MoneySize, TextStyle> = {
  sm: textStyles.textXs,
  md: textStyles.textSm,
  lg: textStyles.titleLg,
}

// Mapeamento de cores para variantes
export const colorMap: Record<string, string> = {
  default: colors.gray[700],
  success: colors.success.base,
  danger: colors.danger.base,
}

export function getMoneyStyles({
  size,
  strikethrough,
  color,
}: MoneyLabelStyleProps) {
  // Se riscado, sempre usa cinza claro
  // Caso contrário, usa a variante de cor
  const baseColor = strikethrough ? colors.gray[400] : colorMap[color]

  const baseStyle: TextStyle = {
    ...sizeToTextStyleMap[size],
    color: baseColor,
    textDecorationLine: strikethrough ? 'line-through' : 'none',
  }

  return StyleSheet.create({
    prefix: {
      ...baseStyle,
      ...textStyles.textXs, // Prefixo sempre pequeno
    },
    minus: {
      ...baseStyle,
    },
    value: {
      ...baseStyle,
    },
  })
}
```

**Explicação:**
- `sizeToTextStyleMap`: Mapeia prop size para textStyles
- `colorMap`: Define cores para cada variante
- `getMoneyStyles`: Cria estilos para prefixo, menos e valor
- Riscado sempre usa cor cinza claro
- Prefixo sempre usa textXs para consistência

### 4. Implementar o Componente

```typescript
// index.tsx
import { Text, View } from 'react-native'
import { formatCurrency } from '@/utils/formatCurrency'
import { getMoneyStyles } from './styles'
import { MoneyLabelProps } from './types'

export function MoneyLabel({
  value,
  size = 'md',
  color = 'default',
  isNegative: isNegativeProp,
  strikethrough = false,
  showPrefix = true,
  ...props
}: MoneyLabelProps) {
  // Detecta negativo automaticamente ou usa prop
  const isNegative = isNegativeProp ?? value < 0

  const { prefix, value: valueStyle, minus } = getMoneyStyles({
    size,
    strikethrough,
    color,
  })

  const formattedValue = formatCurrency(Math.abs(value))

  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
      {isNegative && <Text style={minus}>- </Text>}
      {showPrefix && <Text style={prefix}>R$ </Text>}
      <Text style={[valueStyle, props.style]}>{formattedValue}</Text>
    </View>
  )
}
```

**Características Principais:**
- Detecta automaticamente valores negativos
- Separa sinal de menos, prefixo e valor para estilização independente
- Usa `flexDirection: 'row'` com `alignItems: 'baseline'` para alinhamento
- Todos os elementos (menos, prefixo, valor) herdam a mesma variante de cor

## 🎨 Exemplos de Uso

### Uso Básico

```tsx
import { MoneyLabel } from '@/components/MoneyLabel'

// Tamanho médio padrão
<MoneyLabel value={3847.50} />

// Tamanho pequeno
<MoneyLabel value={100} size="sm" />

// Tamanho grande
<MoneyLabel value={5000} size="lg" />
```

### Variantes de Cor

```tsx
// Cinza padrão
<MoneyLabel value={3847.50} color="default" />

// Sucesso (verde)
<MoneyLabel value={200} color="success" />

// Perigo (vermelho)
<MoneyLabel value={-200} color="danger" />
```

### Valores Negativos

```tsx
// Negativo detectado automaticamente
<MoneyLabel value={-200} color="danger" />

// Explicitamente marcado como negativo
<MoneyLabel value={200} isNegative color="danger" />
```

### Riscado (Preço Original)

```tsx
// Riscado para preço original (sempre cinza claro)
<MoneyLabel value={4050.00} strikethrough />
```

### Sem Prefixo

```tsx
// Esconder prefixo "R$"
<MoneyLabel value={3847.50} showPrefix={false} />
```

### Exemplos Completos

```tsx
// Valor positivo padrão com tamanho grande
<MoneyLabel value={3847.50} size="lg" />

// Valor de desconto (negativo, vermelho)
<MoneyLabel value={-200} color="danger" />

// Preço original (riscado)
<MoneyLabel value={4050.00} strikethrough />

// Total final (grande, sem variante de cor necessária)
<MoneyLabel value={3847.50} size="lg" />
```

### Na Prática: Resumo Financeiro

```tsx
function ResumoFinanceiro() {
  return (
    <View>
      {/* Preço original - riscado */}
      <MoneyLabel value={4050.00} strikethrough />
      
      {/* Desconto - negativo, vermelho */}
      <MoneyLabel value={-200} color="danger" />
      
      {/* Total final - grande */}
      <MoneyLabel value={3847.50} size="lg" />
    </View>
  )
}
```

## 🔍 Conceitos Chave

### Por Que Separar Prefixo do Valor?

O prefixo "R$" é separado do valor para:
1. **Permitir estilização independente** - Prefixo pode ter tamanho diferente (sempre textXs)
2. **Melhor alinhamento** - Cada elemento pode ser posicionado independentemente
3. **Flexibilidade** - Pode esconder prefixo se necessário
4. **Manutenibilidade** - Cada parte pode ser estilizada individualmente

### Detecção Automática de Valores Negativos

```typescript
const isNegative = isNegativeProp ?? value < 0
```

- Usa prop explícita se fornecida (`isNegative={true}`)
- Caso contrário, detecta automaticamente do valor
- Útil para subtotais onde você quer forçar exibição negativa

### Mapeamento de Tamanhos

```
sm → textXs   (12px, regular)
md → textSm   (14px, regular) - padrão
lg → titleLg  (18px, bold)
```

### Variantes de Cor

```
default → gray[700]   - Cor de texto padrão
success → success.base - Verde para valores positivos
danger  → danger.base  - Vermelho para valores negativos
```

### Comportamento de Riscado

Quando `strikethrough={true}`:
- Sempre exibe em cinza claro (`colors.gray[400]`)
- Tem decoração line-through
- Ignora variante de cor
- Usado para preços originais antes do desconto

## ✅ Vantagens

1. **Estilização Flexível**: Todos os elementos (prefixo, menos, valor) podem ser estilizados independentemente
2. **Detecção Automática**: Detecta automaticamente valores negativos
3. **Consistência de Cor**: Todos os elementos usam a mesma variante de cor
4. **Formatação Adequada**: Usa Intl para formatação brasileira correta
5. **Type Safety**: Suporte completo ao TypeScript
6. **Utilitário Reutilizável**: `formatCurrency` pode ser usado em outros lugares

## 🎯 Conclusão

O componente MoneyLabel oferece:
- **Múltiplos tamanhos** (sm, md, lg) para diferentes contextos
- **Variantes de cor** (default, success, danger) para significado semântico
- **Tratamento automático** de valores negativos
- **Suporte a riscado** para preços originais
- **Prefixo flexível** que pode ser mostrado ou escondido
- **Estilização independente** de todos os elementos

É ideal para exibições financeiras, comparações de preços e qualquer caso onde você precise exibir valores monetários com formatação e estilização adequadas.
