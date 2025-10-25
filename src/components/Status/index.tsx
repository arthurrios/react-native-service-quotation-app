import { Text, View } from 'react-native'
import { getStatusConfig, styles } from './styles'
import { StatusProps } from './types'

export function Status({ status }: StatusProps) {
  const config = getStatusConfig(status)

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.indicatorContainer,
          { backgroundColor: config.background },
        ]}
      >
        <View
          style={[styles.indicator, { backgroundColor: config.indicator }]}
        />
        <Text style={[styles.label, { color: config.text }]}>
          {config.label}
        </Text>
      </View>
    </View>
  )
}
