import { Pressable, Text, View } from 'react-native';

interface Props {
  title: string;
  action?: string;
  onAction?: () => void;
}

export function SectionTitle({ title, action, onAction }: Props) {
  return (
    <View className="flex-row items-center justify-between mb-3">
      <Text className="text-base font-semibold text-ink-900">{title}</Text>
      {action ? (
        <Pressable onPress={onAction}>
          <Text className="text-sm font-semibold text-brand-600">{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
