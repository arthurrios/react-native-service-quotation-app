import { TouchableOpacity } from 'react-native'
import { ButtonContext } from '../hooks/ButtonContext'
import { styles } from '../styles'
import { ButtonRootProps } from '../types'

function Root({ children, variant = 'primary', ...props }: ButtonRootProps) {
  const containerStyle = {
    ...styles.container,
    ...styles[variant],
  }

  return (
    <ButtonContext.Provider value={{ variant }}>
      <TouchableOpacity style={containerStyle} {...props}>
        {children}
      </TouchableOpacity>
    </ButtonContext.Provider>
  )
}

export { Root }
