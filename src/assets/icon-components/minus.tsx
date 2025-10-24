import Svg, { Path, SvgProps } from 'react-native-svg'

export const Minus = ({
  width = 24,
  height = 24,
  color = '#000',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 32 32" fill="none" {...props}>
    
    <Path fill={color} d="M26 15a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2z" />
  
  </Svg>
)
