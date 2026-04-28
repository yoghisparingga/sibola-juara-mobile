import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  onBack?: () => void;
  trailing?: ReactNode;
  variant?: 'light' | 'brand';
}

export function ScreenHeader({ title, onBack, trailing, variant = 'light' }: Props) {
  const isBrand = variant === 'brand';
  return (
    <View
      className={`flex-row items-center justify-between px-4 py-4 ${isBrand ? 'bg-brand-600' : 'bg-transparent'}`}
    >
      <Pressable
        onPress={onBack ?? (() => router.back())}
        className={`w-10 h-10 rounded-full items-center justify-center ${isBrand ? 'bg-white/15' : 'bg-white'}`}
      >
        <Ionicons name="chevron-back" size={20} color={isBrand ? '#fff' : '#0B1220'} />
      </Pressable>
      <Text className={`text-lg font-semibold ${isBrand ? 'text-white' : 'text-ink-900'}`}>{title}</Text>
      <View className="w-10 h-10 items-center justify-center">{trailing}</View>
    </View>
  );
}
