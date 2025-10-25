import { useState } from 'react'
import { View } from 'react-native'
import { InputContext } from '../hooks/InputContext'
import { styles } from '../styles'
import { InputRootProps, InputState } from '../types'

export function Root({
  children,
  variant = 'empty',
  width,
  onFocus,
  onBlur,
  ...props
}: InputRootProps) {
  const [state, setState] = useState<InputState>('default')

  const handleFocus = () => {
    setState('focus')
    onFocus?.()
  }

  const handleBlur = () => {
    setState('default')
    onBlur?.()
  }

  const containerStyle = {
    ...styles.container,
    ...styles[variant],
    ...(state === 'focus' && styles.focus),
    ...(width && { width }),
  }

  // Extract style from props to merge it properly
  const { style, ...otherProps } = props

  return (
    <InputContext.Provider
      value={{ variant, state, setState, handleFocus, handleBlur }}
    >
      <View style={[containerStyle, style]} {...otherProps}>
        {children}
      </View>
    </InputContext.Provider>
  )
}
