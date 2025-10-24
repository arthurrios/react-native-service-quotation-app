import Svg, { Path, SvgProps } from 'react-native-svg'

export const Calendar = ({
  width = 24,
  height = 24,
  color = '#000',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 32 32" fill="none" {...props}>
    
    <Path
      fill={color}
      d="M27 15.167H5v8l.005.215A4.333 4.333 0 0 0 9.333 27.5h13.334A4.333 4.333 0 0 0 27 23.167zm-5.333-6.334V7.167H10.333v1.666a1 1 0 1 1-2 0V7.284A4.33 4.33 0 0 0 5 11.5v1.667h22V11.5a4.335 4.335 0 0 0-3.333-4.216v1.549a1 1 0 0 1-2 0M29 23.167a6.33 6.33 0 0 1-6.333 6.333H9.333a6.333 6.333 0 0 1-6.325-6.02L3 23.168V11.5a6.334 6.334 0 0 1 5.333-6.253V3.5a1 1 0 0 1 2 0v1.667h11.334V3.5a1 1 0 1 1 2 0v1.747A6.33 6.33 0 0 1 29 11.5z"
    />
  
  </Svg>
)
