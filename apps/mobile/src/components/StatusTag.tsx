import { Text, View } from 'react-native';
import type { BookingStatus, PaymentStatus } from '@/types';

const styles: Record<string, { bg: string; text: string; label: string }> = {
  confirmed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Confirmed' },
  pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' },
  completed: { bg: 'bg-brand-50', text: 'text-brand-700', label: 'Completed' },
  paid: { bg: 'bg-green-100', text: 'text-green-700', label: 'Paid' },
  failed: { bg: 'bg-red-100', text: 'text-red-700', label: 'Failed' },
  refunded: { bg: 'bg-ink-100', text: 'text-ink-700', label: 'Refunded' },
};

export function StatusTag({ status }: { status: BookingStatus | PaymentStatus }) {
  const s = styles[status] ?? styles.pending;
  return (
    <View className={`px-2.5 py-1 rounded-full ${s.bg}`}>
      <Text className={`text-xs font-semibold ${s.text}`}>{s.label}</Text>
    </View>
  );
}
