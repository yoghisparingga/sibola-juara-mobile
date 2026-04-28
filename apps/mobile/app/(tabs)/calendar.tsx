import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '@/components/Card';
import { StatusTag } from '@/components/StatusTag';
import { bookings } from '@/data/mockData';

const MONTH_LABEL = 'May 2025';
const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function buildMay2025() {
  const days: { day: number; current: boolean }[] = [];
  for (let i = 27; i <= 30; i++) days.push({ day: i, current: false });
  for (let i = 1; i <= 31; i++) days.push({ day: i, current: true });
  while (days.length % 7 !== 0) days.push({ day: days.length - 30, current: false });
  return days;
}

export default function CalendarScreen() {
  const [selected, setSelected] = useState(18);
  const days = buildMay2025();
  const events = bookings.filter((b) => {
    const date = new Date(b.date);
    return date.getMonth() === 4 && date.getFullYear() === 2025;
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="px-5 pt-2 pb-3">
          <Text className="text-2xl font-bold text-ink-900">Schedule</Text>
        </View>

        <View className="mx-5">
          <Card>
            <View className="flex-row items-center justify-between mb-3">
              <Pressable className="w-8 h-8 rounded-full bg-ink-50 items-center justify-center">
                <Ionicons name="chevron-back" size={16} color="#1F2937" />
              </Pressable>
              <Text className="text-base font-bold text-ink-900">{MONTH_LABEL}</Text>
              <Pressable className="w-8 h-8 rounded-full bg-ink-50 items-center justify-center">
                <Ionicons name="chevron-forward" size={16} color="#1F2937" />
              </Pressable>
            </View>

            <View className="flex-row justify-between mb-2">
              {WEEK.map((w) => (
                <Text key={w} className="w-10 text-center text-xs text-ink-400 font-semibold">
                  {w}
                </Text>
              ))}
            </View>

            <View className="flex-row flex-wrap">
              {days.map((d, i) => {
                const isSelected = d.current && d.day === selected;
                const hasEvent = d.current && events.some((e) => new Date(e.date).getDate() === d.day);
                return (
                  <Pressable
                    key={i}
                    onPress={() => d.current && setSelected(d.day)}
                    className="w-[14.28%] items-center my-1"
                  >
                    <View
                      className={`w-9 h-9 rounded-full items-center justify-center ${
                        isSelected ? 'bg-brand-600' : ''
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          isSelected
                            ? 'text-white font-bold'
                            : d.current
                              ? 'text-ink-700'
                              : 'text-ink-300'
                        }`}
                      >
                        {d.day}
                      </Text>
                    </View>
                    {hasEvent ? <View className="w-1 h-1 rounded-full bg-brand-600 mt-0.5" /> : null}
                  </Pressable>
                );
              })}
            </View>
          </Card>
        </View>

        <View className="px-5 mt-5 gap-3">
          {events.map((b) => (
            <Pressable
              key={b.id}
              onPress={() => router.push({ pathname: '/payment/[id]', params: { id: b.id } })}
            >
              <View>
                <Text className="text-xs font-semibold text-ink-400 mb-2">
                  {new Date(b.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
                <Card>
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-ink-700 font-semibold">
                      {b.startTime} - {b.endTime}
                    </Text>
                    <StatusTag status={b.status} />
                  </View>
                  <Text className="text-ink-900 font-bold">{b.fieldName}</Text>
                  <Text className="text-ink-500 text-xs mt-0.5">
                    {b.homeTeam ? `${b.homeTeam.name} vs ${b.awayTeam?.name ?? 'Team'}` : 'Team Training Session'}
                  </Text>
                </Card>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <Pressable
        onPress={() => router.push('/booking/new')}
        className="absolute right-5 bottom-6 w-14 h-14 rounded-full bg-brand-600 items-center justify-center shadow-lg"
      >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}
