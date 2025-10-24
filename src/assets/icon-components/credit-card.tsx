import Svg, { Path, SvgProps } from 'react-native-svg'

export const CreditCard = ({
  width = 24,
  height = 24,
  color = '#000',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 32 32" fill="none" {...props}>
    
    <Path
      fill={color}
      d="M27.335 10.517a4.49 4.49 0 0 0-1.312-3.169 4.48 4.48 0 0 0-3.157-1.312H9.147a4.48 4.48 0 0 0-4.481 4.481v.372h22.668zm-12.192 9.964a1 1 0 0 1 0 2H8.291a1 1 0 0 1 0-2zm-10.477 1a4.48 4.48 0 0 0 4.481 4.482h13.707a4.48 4.48 0 0 0 4.48-4.48v-8.594H4.666zm24.668.001a6.48 6.48 0 0 1-6.48 6.48H9.147A6.48 6.48 0 0 1 2.673 21.8l-.007-.319V10.517a6.48 6.48 0 0 1 6.481-6.48h13.686l.02-.001a6.48 6.48 0 0 1 6.481 6.481z"
    />
  
  </Svg>
)
