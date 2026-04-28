import { Text, View } from 'react-native';

interface Props {
  step: number;
  total?: number;
}

export function Stepper({ step, total = 4 }: Props) {
  return (
    <View className="flex-row items-center justify-center">
      {Array.from({ length: total }).map((_, i) => {
        const idx = i + 1;
        const active = idx <= step;
        return (
          <View key={idx} className="flex-row items-center">
            <View
              className={`w-7 h-7 rounded-full items-center justify-center ${active ? 'bg-white' : 'bg-white/30'}`}
            >
              <Text className={`text-xs font-semibold ${active ? 'text-brand-700' : 'text-white'}`}>{idx}</Text>
            </View>
            {idx < total ? (
              <View className={`h-[2px] w-8 mx-1 ${idx < step ? 'bg-white' : 'bg-white/40'}`} />
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
