import { ScrollView, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ScreenHeader } from '@/components/ScreenHeader';
import { StatusTag } from '@/components/StatusTag';
import { bookings } from '@/data/mockData';
import { formatDateLong, formatIDRFull } from '@/lib/format';

export default function PaymentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const booking = bookings.find((b) => b.id === id) ?? bookings[0];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader title="Booking Detail" trailing={<Ionicons name="ellipsis-horizontal" size={20} color="#1F2937" />} />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <Card>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-ink-900 text-lg font-bold">{booking.fieldName}</Text>
              <Text className="text-ink-500 text-sm mt-1">
                {formatDateLong(booking.date)} · {booking.startTime} - {booking.endTime}
              </Text>
            </View>
            <StatusTag status={booking.status} />
          </View>
        </Card>

        <Text className="text-base font-semibold text-ink-900 mt-5 mb-3">Payment Summary</Text>
        <Card>
          <Row label="Field Price" value={formatIDRFull(booking.price)} />
          <Row label="Service Fee" value={formatIDRFull(booking.serviceFee)} />
          <Row label="Discount" value={`- ${formatIDRFull(booking.discount)}`} />
          <View className="h-px bg-ink-100 my-3" />
          <View className="flex-row justify-between">
            <Text className="text-ink-700 font-semibold">Total Payment</Text>
            <Text className="text-brand-700 font-extrabold text-base">{formatIDRFull(booking.total)}</Text>
          </View>
        </Card>

        <Text className="text-base font-semibold text-ink-900 mt-5 mb-3">Payment Method</Text>
        <Card>
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-xl bg-purple-100 items-center justify-center">
              <Ionicons name="wallet" size={22} color="#7C3AED" />
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-ink-900 font-semibold">{booking.paymentMethod ?? 'OVO Wallet'}</Text>
              <Text className="text-ink-500 text-xs">Auto-charge enabled</Text>
            </View>
            <StatusTag status={booking.payment} />
          </View>
        </Card>

        {booking.payment === 'paid' ? (
          <View className="mt-5 bg-success rounded-2xl p-5 flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-white/25 items-center justify-center">
              <Ionicons name="checkmark-circle" size={26} color="#fff" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-white font-bold text-base">Payment Successful</Text>
              <Text className="text-white/90 text-sm mt-0.5">Your booking is confirmed.</Text>
              <Text className="text-white/90 text-sm">See you on the field!</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>

      <SafeAreaView edges={['bottom']} className="absolute bottom-0 left-0 right-0 bg-white border-t border-ink-100">
        <View className="p-4 flex-row gap-3">
          <View className="flex-1">
            <Button label="Share Receipt" variant="outline" onPress={() => {}} />
          </View>
          <View className="flex-1">
            <Button label="Back to Home" onPress={() => router.replace('/(tabs)')} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between py-1">
      <Text className="text-ink-500">{label}</Text>
      <Text className="text-ink-900 font-medium">{value}</Text>
    </View>
  );
}
