import Svg, { Path, SvgProps } from 'react-native-svg'

export const ChevronLeft = ({
  width = 24,
  height = 24,
  color = '#000',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 32 32" fill="none" {...props}>
    
    <Path
      fill={color}
      d="M10.222 16c0-.967.382-1.896 1.06-2.586l.006-.005 8.782-8.783.076-.068a1 1 0 0 1 1.407 1.406l-.069.076-8.782 8.784c-.307.314-.48.736-.48 1.176l.008.165c.038.382.205.741.477 1.017l8.777 8.777.07.076a1 1 0 0 1-1.408 1.408l-.076-.07-8.787-8.787a3.69 3.69 0 0 1-1.056-2.405z"
    />
  
  </Svg>
)
