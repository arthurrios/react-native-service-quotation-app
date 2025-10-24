import { SvgProps } from 'react-native-svg'

export type IconName =
  | 'calendar'
  | 'check'
  | 'chevron-left'
  | 'chevron-right'
  | 'copy'
  | 'credit-card'
  | 'direction-up-right'
  | 'edit-pen'
  | 'filter'
  | 'minus'
  | 'multiply'
  | 'note-with-text'
  | 'plus'
  | 'search'
  | 'shop'
  | 'tag'
  | 'trash-2'

export interface IconProps extends SvgProps {
  name: IconName
  width?: number
  height?: number
  color?: string
  size?: number
}
