import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { Card } from '@/components/Card';
import { SectionTitle } from '@/components/SectionTitle';
import { StatusTag } from '@/components/StatusTag';
import { useAuthStore } from '@/store/auth';
import { bookings, fields, teams } from '@/data/mockData';
import { formatIDR, formatIDRFull } from '@/lib/format';

export default function DashboardScreen() {
  const user = useAuthStore((s) => s.user);
  const upcomingMatch = bookings.find((b) => b.homeTeam && b.awayTeam && b.status === 'confirmed');
  const activeBooking = bookings.find((b) => b.status === 'pending') ?? bookings[1];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
          <View className="flex-row items-center">
            <Avatar url={user?.avatarUrl} name={user?.name} size={48} />
            <View className="ml-3">
              <Text className="text-lg font-bold text-ink-900">Hi, {user?.name?.split(' ')[0] ?? 'Player'}!</Text>
              <Text className="text-ink-500 text-sm">Welcome back</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-2">
            <Pressable className="w-10 h-10 rounded-full bg-white border border-ink-100 items-center justify-center">
              <Ionicons name="notifications-outline" size={20} color="#1F2937" />
              <View className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger" />
            </Pressable>
          </View>
        </View>

        <View className="px-5">
          <Card className="bg-brand-600 border-0">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-white font-semibold">This Month Overview</Text>
              <Pressable onPress={() => router.push('/analytics')}>
                <Text className="text-white/90 text-xs font-semibold">View Report ›</Text>
              </Pressable>
            </View>
            <View className="flex-row justify-between">
              <Stat label="Bookings" value="12" />
              <Divider />
              <Stat label="Hours Played" value="24h" />
              <Divider />
              <Stat label="Total Spent" value="Rp 1.250K" />
            </View>
          </Card>
        </View>

        <View className="px-5 mt-5">
          <SectionTitle title="Upcoming Match" action="See all" />
          {upcomingMatch ? (
            <Card>
              <View className="flex-row items-center justify-between">
                <TeamSide teamName={upcomingMatch.homeTeam!.name} accent="brand" />
                <View className="items-center">
                  <Text className="text-ink-400 text-xs font-bold tracking-widest">VS</Text>
                  <Text className="text-ink-700 text-sm mt-1">{upcomingMatch.startTime} - {upcomingMatch.endTime}</Text>
                  <Text className="text-ink-400 text-xs">{upcomingMatch.fieldName}</Text>
                </View>
                <TeamSide teamName={upcomingMatch.awayTeam!.name} accent="dark" />
              </View>
            </Card>
          ) : null}
        </View>

        <View className="px-5 mt-5">
          <SectionTitle title="Active Bookings" action="View Details" onAction={() => router.push('/(tabs)/bookings')} />
          <Card>
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-xl bg-brand-50 items-center justify-center">
                <Ionicons name="football" size={22} color="#1E5BF5" />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-ink-900 font-semibold">{activeBooking.fieldName}</Text>
                <Text className="text-ink-500 text-xs mt-0.5">
                  {activeBooking.date} · {activeBooking.startTime} - {activeBooking.endTime}
                </Text>
              </View>
              <StatusTag status={activeBooking.status} />
            </View>
          </Card>
        </View>

        <View className="px-5 mt-5">
          <SectionTitle title="Nearby Fields" action="See all" onAction={() => router.push('/(tabs)/bookings')} />
          <View className="gap-3">
            {fields.slice(0, 3).map((f) => (
              <Pressable key={f.id} onPress={() => router.push({ pathname: '/field/[id]', params: { id: f.id } })}>
                <Card>
                  <View className="flex-row items-center">
                    <View className="w-14 h-14 rounded-xl bg-ink-100 items-center justify-center">
                      <Ionicons name="location" size={20} color="#1E5BF5" />
                    </View>
                    <View className="flex-1 ml-3">
                      <Text className="text-ink-900 font-semibold">{f.name}</Text>
                      <Text className="text-ink-500 text-xs">{f.distanceKm} km · ⭐ {f.rating}</Text>
                    </View>
                    <Text className="text-brand-700 font-bold">{formatIDR(f.pricePerHour)}</Text>
                  </View>
                </Card>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="px-5 mt-5">
          <SectionTitle title="Quick Actions" />
          <View className="flex-row gap-3">
            <QuickAction icon="add-circle-outline" label="Book Field" onPress={() => router.push('/booking/new')} />
            <QuickAction icon="people-outline" label="My Team" onPress={() => router.push('/(tabs)/profile')} />
            <QuickAction icon="card-outline" label="Payments" onPress={() => router.push('/settings')} />
            <QuickAction icon="pricetag-outline" label="Promo" onPress={() => {}} />
          </View>
        </View>

        <View className="px-5 mt-5 mb-2">
          <Text className="text-xs text-ink-400">{teams.length} teams · {fields.length} fields nearby · Total spent: {formatIDRFull(1_250_000)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 items-center">
      <Text className="text-white text-lg font-extrabold">{value}</Text>
      <Text className="text-white/80 text-xs mt-1">{label}</Text>
    </View>
  );
}

function Divider() {
  return <View className="w-px bg-white/20 mx-1" />;
}

function TeamSide({ teamName, accent }: { teamName: string; accent: 'brand' | 'dark' }) {
  return (
    <View className="items-center">
      <View
        className={`w-12 h-12 rounded-full items-center justify-center ${accent === 'brand' ? 'bg-brand-100' : 'bg-ink-100'}`}
      >
        <Ionicons name="shield" size={22} color={accent === 'brand' ? '#1E5BF5' : '#1F2937'} />
      </View>
      <Text className="text-ink-900 font-semibold text-sm mt-2">{teamName}</Text>
    </View>
  );
}

function QuickAction({ icon, label, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="flex-1 items-center">
      <View className="w-14 h-14 rounded-2xl bg-white border border-ink-100 items-center justify-center">
        <Ionicons name={icon} size={22} color="#1E5BF5" />
      </View>
      <Text className="text-ink-700 text-xs mt-2 font-medium">{label}</Text>
    </Pressable>
  );
}
