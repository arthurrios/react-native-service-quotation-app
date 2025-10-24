import Svg, { Path, SvgProps } from 'react-native-svg'

export const Multiply = ({
  width = 24,
  height = 24,
  color = '#000',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 32 32" fill="none" {...props}>
    
    <Path
      fill={color}
      d="M24.702 5.891a1 1 0 0 1 1.407 1.407l-.068.076L17.414 16l8.627 8.627.068.075a1 1 0 0 1-1.407 1.407l-.075-.068L16 17.414 7.374 26.04a1 1 0 0 1-1.414-1.414L14.586 16 5.96 7.374l-.069-.076A1 1 0 0 1 7.298 5.89l.076.069L16 14.586l8.627-8.626z"
    />
  
  </Svg>
)
