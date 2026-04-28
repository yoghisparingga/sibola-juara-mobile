import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/auth';

const isValidEmailOrPhone = (v: string) =>
  /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || /^\+?\d[\d\s-]{6,}$/.test(v);

export default function LoginScreen() {
  const login = useAuthStore((s) => s.login);
  const user = useAuthStore((s) => s.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLogin = () => {
    if (!email.trim() || !password) {
      setError('Email/phone and password are required.');
      return;
    }
    if (!isValidEmailOrPhone(email.trim())) {
      setError('Enter a valid email or phone number.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError(null);
    if (user) login({ ...user, email: email.trim() });
    router.replace('/(auth)/onboarding');
  };

  const onSocialLogin = () => {
    setError(null);
    if (user) login(user);
    router.replace('/(auth)/onboarding');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 48 }} keyboardShouldPersistTaps="handled">
        <View className="items-center mt-6 mb-6">
          <View className="w-20 h-20 rounded-full bg-brand-50 items-center justify-center mb-3">
            <Ionicons name="football" size={36} color="#1E5BF5" />
          </View>
          <Text className="text-xl font-extrabold tracking-wider text-brand-700">SIBOLA JUARA</Text>
        </View>

        <Text className="text-2xl font-bold text-ink-900 text-center">Welcome Back!</Text>
        <Text className="text-ink-500 text-center mt-1 mb-6">
          Log in to continue booking your favorite field.
        </Text>

        <View className="gap-3">
          <View className="flex-row items-center bg-ink-50 rounded-2xl px-4 py-3">
            <Ionicons name="mail-outline" size={18} color="#6B7280" />
            <TextInput
              className="flex-1 ml-2 text-ink-900"
              placeholder="Email or Phone Number"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View className="flex-row items-center bg-ink-50 rounded-2xl px-4 py-3">
            <Ionicons name="lock-closed-outline" size={18} color="#6B7280" />
            <TextInput
              className="flex-1 ml-2 text-ink-900"
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setShowPassword((p) => !p)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color="#6B7280" />
            </Pressable>
          </View>

          <Pressable className="self-end">
            <Text className="text-sm text-brand-600 font-semibold">Forgot Password?</Text>
          </Pressable>
        </View>

        {error ? (
          <Text className="mt-3 text-sm text-danger font-medium">{error}</Text>
        ) : null}

        <View className="mt-5">
          <Button label="Login" onPress={onLogin} />
        </View>

        <View className="flex-row items-center my-5">
          <View className="flex-1 h-px bg-ink-100" />
          <Text className="px-3 text-xs text-ink-400">or continue with</Text>
          <View className="flex-1 h-px bg-ink-100" />
        </View>

        <View className="gap-3">
          <Button
            label="Continue with Google"
            variant="outline"
            leading={<Ionicons name="logo-google" size={18} color="#EA4335" />}
            onPress={onSocialLogin}
          />
          <Button
            label="Continue with Apple"
            variant="outline"
            leading={<Ionicons name="logo-apple" size={18} color="#000" />}
            onPress={onSocialLogin}
          />
        </View>

        <View className="flex-row justify-center mt-6">
          <Text className="text-ink-500">Don't have an account? </Text>
          <Pressable>
            <Text className="text-brand-600 font-semibold">Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
