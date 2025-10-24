import Svg, { Path, SvgProps } from 'react-native-svg'

export const Check = ({
  width = 24,
  height = 24,
  color = '#000',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 32 32" fill="none" {...props}>
    
    <Path
      fill={color}
      d="M25.293 9.306a1 1 0 1 1 1.414 1.414L15.364 22.062a3.13 3.13 0 0 1-4.443 0l-5.628-5.628a1.001 1.001 0 0 1 1.414-1.415l5.633 5.633a1.13 1.13 0 0 0 1.238.249q.208-.088.367-.249z"
    />
  
  </Svg>
)
