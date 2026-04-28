import { Text, View } from 'react-native';

type Props = {
  latitude: number;
  longitude: number;
  title: string;
};

export function MapPanel({ latitude, longitude, title }: Props) {
  return (
    <View className="rounded-2xl overflow-hidden mt-6 h-48 border border-ink-100 bg-ink-50 items-center justify-center">
      <Text className="text-ink-700 font-semibold">{title}</Text>
      <Text className="text-ink-400 text-xs mt-1">
        {latitude.toFixed(4)}, {longitude.toFixed(4)}
      </Text>
      <Text className="text-ink-400 text-xs mt-1">(Map view available on mobile)</Text>
    </View>
  );
}
