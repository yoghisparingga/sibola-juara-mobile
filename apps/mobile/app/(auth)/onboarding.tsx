import { useState } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { onboardingSlides } from '@/data/mockData';
import { useAuthStore } from '@/store/auth';

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const { width } = useWindowDimensions();

  const current = onboardingSlides[index];

  const onNext = () => {
    if (index < onboardingSlides.length - 1) setIndex(index + 1);
    else {
      completeOnboarding();
      router.replace('/(tabs)');
    }
  };
  const onSkip = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-end p-4">
        <Pressable
          onPress={onSkip}
          className="w-10 h-10 items-center justify-center rounded-full bg-ink-50"
        >
          <Ionicons name="close" size={20} color="#1F2937" />
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-center px-8">
        <View
          style={{ width: width * 0.7, height: width * 0.7 }}
          className="rounded-3xl bg-brand-50 items-center justify-center mb-8"
        >
          <View className="w-32 h-32 rounded-full bg-white items-center justify-center">
            <Ionicons name={current.icon} size={64} color="#1E5BF5" />
          </View>
        </View>
        <Text className="text-2xl font-bold text-ink-900 text-center">{current.title}</Text>
        <Text className="text-ink-500 text-center mt-2">{current.subtitle}</Text>
      </View>

      <View className="flex-row justify-center mb-6">
        {onboardingSlides.map((_, i) => (
          <View
            key={i}
            className={`mx-1 h-2 rounded-full ${i === index ? 'w-6 bg-brand-600' : 'w-2 bg-ink-200'}`}
          />
        ))}
      </View>

      <View className="px-6 pb-8 gap-3">
        <Button label={index < onboardingSlides.length - 1 ? 'Next' : 'Get Started'} onPress={onNext} />
        <Pressable onPress={onSkip} className="self-center">
          <Text className="text-ink-500 font-medium">Skip</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
