import { View } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText } from 'react-native-svg';

interface Props {
  data: { label: string; value: number }[];
  width: number;
  height: number;
  color?: string;
}

export function LineChart({ data, width, height, color = '#1E5BF5' }: Props) {
  if (data.length < 2) return <View style={{ width, height }} />;
  const padding = { top: 16, right: 12, bottom: 28, left: 12 };
  const w = width - padding.left - padding.right;
  const h = height - padding.top - padding.bottom;
  const maxY = Math.max(...data.map((d) => d.value), 1);
  const stepX = w / (data.length - 1);

  const points = data.map((d, i) => ({
    x: padding.left + i * stepX,
    y: padding.top + h - (d.value / maxY) * h,
    label: d.label,
    value: d.value,
  }));

  const path = points.reduce(
    (acc, p, i) => acc + (i === 0 ? `M${p.x},${p.y}` : ` L${p.x},${p.y}`),
    '',
  );

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const y = padding.top + h * t;
          return <Line key={i} x1={padding.left} y1={y} x2={padding.left + w} y2={y} stroke="#F3F4F6" strokeWidth={1} />;
        })}
        <Path d={path} stroke={color} strokeWidth={3} fill="none" />
        {points.map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r={4} fill={color} />
        ))}
        {points.map((p, i) => (
          <SvgText key={`l-${i}`} x={p.x} y={height - 6} fontSize={10} fill="#9CA3AF" textAnchor="middle">
            {p.label}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}
