import { Calendar } from '@/assets/icon-components/calendar'
import { Check } from '@/assets/icon-components/check'
import { ChevronLeft } from '@/assets/icon-components/chevron-left'
import { ChevronRight } from '@/assets/icon-components/chevron-right'
import { Copy } from '@/assets/icon-components/copy'
import { CreditCard } from '@/assets/icon-components/credit-card'
import { DirectionUpRight } from '@/assets/icon-components/direction-up-right'
import { EditPen } from '@/assets/icon-components/edit-pen'
import { Filter } from '@/assets/icon-components/filter'
import { Minus } from '@/assets/icon-components/minus'
import { Multiply } from '@/assets/icon-components/multiply'
import { NoteWithText } from '@/assets/icon-components/note-with-text'
import { Plus } from '@/assets/icon-components/plus'
import { Search } from '@/assets/icon-components/search'
import { Shop } from '@/assets/icon-components/shop'
import { Tag } from '@/assets/icon-components/tag'
import { Trash2 } from '@/assets/icon-components/trash-2'
import { IconName, IconProps } from './types'

export const iconRegistry: Record<IconName, React.ComponentType<IconProps>> = {
  'calendar': Calendar,
  'check': Check,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'copy': Copy,
  'credit-card': CreditCard,
  'direction-up-right': DirectionUpRight,
  'edit-pen': EditPen,
  'filter': Filter,
  'minus': Minus,
  'multiply': Multiply,
  'note-with-text': NoteWithText,
  'plus': Plus,
  'search': Search,
  'shop': Shop,
  'tag': Tag,
  'trash-2': Trash2,
} as const
