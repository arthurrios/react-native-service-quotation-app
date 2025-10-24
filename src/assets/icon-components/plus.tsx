import Svg, { Path, SvgProps } from 'react-native-svg'

export const Plus = ({
  width = 24,
  height = 24,
  color = '#000',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 32 24" fill="none" {...props}>
    <Path
      fill={color}
      d="M15 26v-9H6a1 1 0 1 1 0-2h9V6a1 1 0 1 1 2 0v9h9l.102.005a1 1 0 0 1 0 1.99L26 17h-9v9a1 1 0 1 1-2 0"
    />
  </Svg>
)
