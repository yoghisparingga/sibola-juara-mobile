import { Image, Text, View } from 'react-native';

interface Props {
  url?: string;
  name?: string;
  size?: number;
}

export function Avatar({ url, name = '?', size = 40 }: Props) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2 }}
      className="bg-brand-100 items-center justify-center overflow-hidden"
    >
      {url ? (
        <Image source={{ uri: url }} style={{ width: size, height: size }} />
      ) : (
        <Text className="font-semibold text-brand-700">{initials}</Text>
      )}
    </View>
  );
}
