import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '@/components/Card';
import { StatusTag } from '@/components/StatusTag';
import { Avatar } from '@/components/Avatar';
import { bookings, teams } from '@/data/mockData';
import { formatDateLong, formatIDRFull } from '@/lib/format';

const TABS = ['Upcoming', 'Past', 'Cancelled'] as const;
type Tab = (typeof TABS)[number];

export default function MyBookingsScreen() {
  const [tab, setTab] = useState<Tab>('Upcoming');

  const filtered = useMemo(() => {
    if (tab === 'Past') return bookings.filter((b) => b.status === 'completed');
    if (tab === 'Cancelled') return bookings.filter((b) => b.status === 'cancelled');
    return bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending');
  }, [tab]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-5 pt-2 pb-3">
        <Text className="text-2xl font-bold text-ink-900">My Bookings</Text>
        <Pressable className="w-10 h-10 rounded-full bg-white border border-ink-100 items-center justify-center">
          <Ionicons name="search" size={18} color="#1F2937" />
        </Pressable>
      </View>

      <View className="flex-row mx-5 bg-white rounded-2xl p-1 border border-ink-100">
        {TABS.map((t) => (
          <Pressable
            key={t}
            onPress={() => setTab(t)}
            className={`flex-1 py-2 rounded-xl items-center ${tab === t ? 'bg-brand-600' : ''}`}
          >
            <Text className={`font-semibold ${tab === t ? 'text-white' : 'text-ink-500'}`}>{t}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
        {filtered.map((b, i) => (
          <View key={b.id}>
            {i === 0 ? (
              <Text className="text-xs font-semibold text-ink-400 mb-2">
                {b.status === 'confirmed' ? 'Tomorrow · ' : ''}
                {formatDateLong(b.date)}
              </Text>
            ) : null}
            <Pressable onPress={() => router.push({ pathname: '/payment/[id]', params: { id: b.id } })}>
              <Card>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-base font-bold text-ink-900">{b.fieldName}</Text>
                  <StatusTag status={b.status} />
                </View>
                <Text className="text-ink-500 text-sm">
                  {b.startTime} - {b.endTime} ({b.durationHours} Hours)
                </Text>
                <Text className="text-brand-700 font-semibold mt-1">{formatIDRFull(b.total)}</Text>
                {b.homeTeam && b.awayTeam ? (
                  <View className="flex-row items-center mt-3 pt-3 border-t border-ink-100">
                    <Ionicons name="shield-outline" size={14} color="#1E5BF5" />
                    <Text className="text-ink-500 text-xs ml-2">
                      {b.homeTeam.name} vs {b.awayTeam.name}
                    </Text>
                  </View>
                ) : null}
              </Card>
            </Pressable>
          </View>
        ))}

        <View className="mt-2">
          <Text className="text-base font-semibold text-ink-900 mb-3">Manage Team</Text>
          <Card>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                {teams.slice(0, 4).map((t, i) => (
                  <View key={t.id} style={{ marginLeft: i === 0 ? 0 : -10 }}>
                    <Avatar name={t.name} size={36} />
                  </View>
                ))}
              </View>
              <Pressable className="flex-row items-center bg-brand-600 px-3 py-2 rounded-full">
                <Ionicons name="add" size={16} color="#fff" />
                <Text className="text-white font-semibold text-xs ml-1">Invite</Text>
              </Pressable>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
