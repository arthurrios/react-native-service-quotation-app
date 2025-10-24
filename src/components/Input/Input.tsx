import { Field } from './components/Field'
import { Icon } from './components/Icon'
import { Prefix } from './components/Prefix'
import { Root } from './components/Root'
import { Suffix } from './components/Suffix'
import { InputProps } from './types'

// Legacy Input Component (for backward compatibility)
function Input({
  icon,
  prefix,
  suffix,
  placeholder,
  variant = 'empty',
  width,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  return (
    <Root
      variant={variant}
      width={variant === 'percentage' ? 90 : width}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    >
      {icon && <Icon name={icon} />}
      {prefix && <Prefix>{prefix}</Prefix>}
      <Field placeholder={placeholder} />
      {suffix && <Suffix>{suffix}</Suffix>}
      {variant === 'percentage' && <Suffix>%</Suffix>}
    </Root>
  )
}

// Create compound component
const InputCompound = Object.assign(Input, {
  Root,
  Icon,
  Prefix,
  Suffix,
  Field,
})

// Export compound component and legacy component
export { InputCompound as Input }
