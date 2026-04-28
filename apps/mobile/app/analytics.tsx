import { Dimensions, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '@/components/Card';
import { DonutChart } from '@/components/DonutChart';
import { LineChart } from '@/components/LineChart';
import { ScreenHeader } from '@/components/ScreenHeader';
import { analyticsSnapshot } from '@/data/mockData';
import { formatIDR } from '@/lib/format';

const screenWidth = Dimensions.get('window').width;

export default function AnalyticsScreen() {
  const { utilization, totalBookings, totalRevenue, bookingsOverview, fieldOccupancy } = analyticsSnapshot;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader
        title="Analytics"
        trailing={
          <View className="flex-row items-center bg-white border border-ink-100 px-2 py-1 rounded-full">
            <Ionicons name="calendar-outline" size={12} color="#1F2937" />
          </View>
        }
      />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 32, gap: 16 }}>
        <Text className="text-xs text-ink-400 -mb-2">May 1 — May 31, 2025</Text>

        <View className="flex-row gap-3">
          <Stat label="Total Bookings" value={String(totalBookings)} delta="+12%" />
          <Stat label="Total Revenue" value={formatIDR(totalRevenue)} delta="+9%" />
          <Stat label="Field Utilization" value={`${utilization}%`} delta="+9%" />
        </View>

        <Card>
          <Text className="text-base font-semibold text-ink-900 mb-1">Bookings Overview</Text>
          <Text className="text-ink-400 text-xs mb-3">Daily bookings throughout the month</Text>
          <LineChart
            data={bookingsOverview.map((b) => ({ label: b.date, value: b.bookings }))}
            width={screenWidth - 80}
            height={220}
          />
        </Card>

        <Card>
          <Text className="text-base font-semibold text-ink-900 mb-1">Field Occupancy</Text>
          <View className="flex-row items-center mt-3">
            <DonutChart segments={fieldOccupancy} size={140} centerLabel={`${utilization}%`} />
            <View className="flex-1 ml-5 gap-2">
              {fieldOccupancy.map((s) => (
                <View key={s.label} className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: s.color }} />
                    <Text className="text-ink-700 text-sm">{s.label}</Text>
                  </View>
                  <Text className="text-ink-900 font-semibold">{s.value}%</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <View className="flex-1 bg-white rounded-2xl p-3 border border-ink-100">
      <Text className="text-ink-400 text-xs">{label}</Text>
      <Text className="text-ink-900 text-lg font-extrabold mt-1">{value}</Text>
      <View className="flex-row items-center mt-1">
        <Ionicons name="arrow-up" size={10} color="#16A34A" />
        <Text className="text-success text-xs font-semibold ml-1">{delta}</Text>
      </View>
    </View>
  );
}
