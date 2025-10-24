import Svg, { Path, SvgProps } from 'react-native-svg'

export const ChevronRight = ({
  width = 24,
  height = 24,
  color = '#000',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 32 32" fill="none" {...props}>
    
    <Path
      fill={color}
      d="M19.777 16c0-.44-.172-.862-.48-1.177L10.517 6.04l-.069-.076a1 1 0 0 1 1.407-1.406l.076.068 8.783 8.782.005.006.124.132c.601.674.935 1.547.935 2.454l-.004.18a3.68 3.68 0 0 1-1.055 2.406l-8.788 8.787a1 1 0 1 1-1.414-1.414l8.777-8.777c.271-.276.439-.635.477-1.017z"
    />
  
  </Svg>
)
