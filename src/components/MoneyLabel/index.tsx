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
  prefixStyle,
  ...props
}: MoneyLabelProps) {
  const isNegative = isNegativeProp ?? value < 0

  const {
    prefix,
    value: valueStyle,
    minus,
  } = getMoneyStyles({
    size,
    strikethrough,
    color,
  })

  const formattedValue = formatCurrency(Math.abs(value))

  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
      {isNegative && <Text style={minus}>- </Text>}
      {showPrefix && <Text style={[prefix, prefixStyle]}>$ </Text>}
      <Text style={[valueStyle, props.style]}>{formattedValue}</Text>
    </View>
  )
}
