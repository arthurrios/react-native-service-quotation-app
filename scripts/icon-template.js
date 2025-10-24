const template = (variables, { tpl }) => {
  return tpl`
import Svg, { Path, SvgProps } from 'react-native-svg'

export const ${variables.componentName} = ({
  width = 24,
  height = 24,
  color = '#000',
  ...props
}: SvgProps) => (
  ${variables.jsx}
)
`
}

module.exports = template
