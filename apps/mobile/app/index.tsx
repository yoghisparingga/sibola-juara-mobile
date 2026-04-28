import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useAuthStore } from '@/store/auth';

export default function Splash() {
  const { isAuthenticated, hasOnboarded } = useAuthStore();

  useEffect(() => {
    const t = setTimeout(() => {
      if (!isAuthenticated) {
        router.replace('/(auth)/login');
      } else if (!hasOnboarded) {
        router.replace('/(auth)/onboarding');
      } else {
        router.replace('/(tabs)');
      }
    }, 1400);
    return () => clearTimeout(t);
  }, [isAuthenticated, hasOnboarded]);

  return (
    <View className="flex-1 bg-brand-600 items-center justify-center px-6">
      <View className="w-32 h-32 rounded-full bg-white/15 items-center justify-center mb-6">
        <Ionicons name="football" size={64} color="#fff" />
      </View>
      <Text className="text-white text-3xl font-extrabold tracking-wider">SIBOLA JUARA</Text>
      <Text className="text-white/80 text-sm mt-1 tracking-widest">BOOK · PLAY · WIN</Text>

      <View className="absolute bottom-16 items-center">
        <ActivityIndicator color="#fff" />
        <Text className="text-white/80 mt-3 italic">Loading your next match…</Text>
        <Text className="text-white text-base font-semibold mt-1">Let's play!</Text>
      </View>
    </View>
  );
}
