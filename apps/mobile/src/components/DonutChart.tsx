import { View } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

interface Segment {
  label: string;
  value: number;
  color: string;
}

interface Props {
  segments: Segment[];
  size: number;
  centerLabel?: string;
}

export function DonutChart({ segments, size, centerLabel }: Props) {
  const radius = size / 2 - 12;
  const stroke = 18;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((acc, s) => acc + s.value, 0) || 1;
  let offset = 0;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <G rotation={-90} originX={size / 2} originY={size / 2}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F3F4F6"
            strokeWidth={stroke}
            fill="none"
          />
          {segments.map((s, i) => {
            const length = (s.value / total) * circumference;
            const dasharray = `${length} ${circumference - length}`;
            const dashoffset = -offset;
            offset += length;
            return (
              <Circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={s.color}
                strokeWidth={stroke}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={dasharray}
                strokeDashoffset={dashoffset}
              />
            );
          })}
        </G>
        {centerLabel ? (
          <SvgText
            x={size / 2}
            y={size / 2 + 6}
            fontSize={20}
            fontWeight="bold"
            textAnchor="middle"
            fill="#0B1220"
          >
            {centerLabel}
          </SvgText>
        ) : null}
      </Svg>
    </View>
  );
}
