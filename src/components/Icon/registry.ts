import { Check } from '@/assets/icon-components/check'
import { Minus } from '@/assets/icon-components/minus'
import { Plus } from '@/assets/icon-components/plus'
import { Tag } from '@/assets/icon-components/tag'
import { IconName, IconProps } from './types'

export const iconRegistry: Record<IconName, React.ComponentType<IconProps>> = {
  check: Check,
  plus: Plus,
  minus: Minus,
  tag: Tag,
} as const
