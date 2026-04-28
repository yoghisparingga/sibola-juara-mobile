import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { Card } from '@/components/Card';
import { SectionTitle } from '@/components/SectionTitle';
import { StatusTag } from '@/components/StatusTag';
import { useAuthStore } from '@/store/auth';
import { bookings } from '@/data/mockData';
import { formatDateLong } from '@/lib/format';

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const recent = bookings.slice(0, 2);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="flex-row items-center justify-between px-5 pt-2 pb-3">
          <Text className="text-2xl font-bold text-ink-900">Profile</Text>
          <Pressable
            onPress={() => router.push('/settings')}
            className="w-10 h-10 rounded-full bg-white border border-ink-100 items-center justify-center"
          >
            <Ionicons name="settings-outline" size={18} color="#1F2937" />
          </Pressable>
        </View>

        <View className="px-5">
          <Card>
            <View className="flex-row items-center">
              <Avatar url={user?.avatarUrl} name={user?.name} size={64} />
              <View className="flex-1 ml-4">
                <Text className="text-lg font-bold text-ink-900">{user?.name}</Text>
                <View className="flex-row items-center mt-1">
                  <View className="bg-amber-100 px-2 py-0.5 rounded-full flex-row items-center">
                    <Ionicons name="star" size={12} color="#F59E0B" />
                    <Text className="text-amber-700 text-xs font-semibold ml-1">Premium Member</Text>
                  </View>
                </View>
                <Text className="text-ink-500 text-xs mt-1">{user?.points.toLocaleString()} Points</Text>
              </View>
              <Pressable
                onPress={() => router.push('/analytics')}
                className="w-10 h-10 rounded-full bg-brand-50 items-center justify-center"
              >
                <Ionicons name="bar-chart-outline" size={18} color="#1E5BF5" />
              </Pressable>
            </View>

            <View className="flex-row justify-between mt-4 pt-4 border-t border-ink-100">
              <Stat label="Bookings" value="28" />
              <Divider />
              <Stat label="Hours Played" value="56h" />
              <Divider />
              <Stat label="Fields Visited" value="14" />
            </View>
          </Card>
        </View>

        <View className="px-5 mt-5">
          <SectionTitle title="Membership" />
          <Card className="bg-amber-50 border border-amber-100">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-full bg-amber-100 items-center justify-center">
                <Ionicons name="trophy" size={22} color="#F59E0B" />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-ink-900 font-bold">Pro Member</Text>
                <Text className="text-ink-500 text-xs">Valid until May 18, 2026</Text>
              </View>
              <Pressable className="px-3 py-2 rounded-full bg-brand-600">
                <Text className="text-white text-xs font-semibold">View Benefits</Text>
              </Pressable>
            </View>
          </Card>
        </View>

        <View className="px-5 mt-5">
          <SectionTitle title="Recent Bookings" action="See all" onAction={() => router.push('/(tabs)/bookings')} />
          <View className="gap-3">
            {recent.map((b) => (
              <Card key={b.id}>
                <View className="flex-row items-center">
                  <View className="w-12 h-12 rounded-xl bg-brand-50 items-center justify-center">
                    <Ionicons name="football" size={20} color="#1E5BF5" />
                  </View>
                  <View className="flex-1 ml-3">
                    <Text className="text-ink-900 font-semibold">{b.fieldName}</Text>
                    <Text className="text-ink-500 text-xs">
                      {formatDateLong(b.date)} · {b.startTime} - {b.endTime}
                    </Text>
                  </View>
                  <StatusTag status={b.status} />
                </View>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 items-center">
      <Text className="text-ink-900 text-lg font-extrabold">{value}</Text>
      <Text className="text-ink-500 text-xs mt-1">{label}</Text>
    </View>
  );
}

function Divider() {
  return <View className="w-px bg-ink-100 mx-1" />;
}
