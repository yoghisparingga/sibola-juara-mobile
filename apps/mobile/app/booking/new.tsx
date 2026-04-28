import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Stepper } from '@/components/Stepper';
import { Card } from '@/components/Card';
import { useBookingStore } from '@/store/booking';
import { fields } from '@/data/mockData';
import { formatIDRFull } from '@/lib/format';

const PAYMENT_METHODS = [
  { id: 'ovo', name: 'OVO Wallet', icon: 'wallet-outline' as const },
  { id: 'gopay', name: 'GoPay', icon: 'wallet-outline' as const },
  { id: 'bca', name: 'BCA Virtual Account', icon: 'card-outline' as const },
  { id: 'qris', name: 'QRIS', icon: 'qr-code-outline' as const },
];

export default function NewBookingScreen() {
  const { step, next, prev, paymentMethod, setPaymentMethod, reset } = useBookingStore();

  const onPrimary = () => {
    if (step < 4) next();
    else {
      reset();
      router.replace({ pathname: '/payment/[id]', params: { id: 'bkg_001' } });
    }
  };

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView edges={['top']} className="bg-brand-600">
        <View className="flex-row items-center justify-between px-4 py-3">
          <Pressable
            onPress={() => (step === 1 ? router.back() : prev())}
            className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
          >
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </Pressable>
          <Text className="text-white font-semibold text-base">Book a Field</Text>
          <View className="w-10 h-10" />
        </View>
        <View className="pb-5">
          <Stepper step={step} total={4} />
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        {step === 1 ? <Step1 /> : null}
        {step === 2 ? <Step2 /> : null}
        {step === 3 ? <Step3 paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} /> : null}
        {step === 4 ? <Step4 /> : null}
      </ScrollView>

      <SafeAreaView edges={['bottom']} className="absolute bottom-0 left-0 right-0 bg-white border-t border-ink-100">
        <View className="p-4">
          <Button label={step < 4 ? 'Next' : 'Confirm & Pay'} onPress={onPrimary} />
        </View>
      </SafeAreaView>
    </View>
  );
}

function FieldRow({ value, placeholder, icon }: { value?: string; placeholder: string; icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <View className="bg-white rounded-2xl border border-ink-100 px-4 py-3 flex-row items-center">
      <Text className="flex-1 text-ink-900">{value ?? placeholder}</Text>
      <Ionicons name={icon} size={18} color="#6B7280" />
    </View>
  );
}

function Step1() {
  return (
    <View className="gap-3">
      <Text className="text-base font-semibold text-ink-900">Select Date & Time</Text>
      <FieldRow value="May 18, 2025" placeholder="Select Date" icon="calendar-outline" />
      <FieldRow value="19:00" placeholder="Start Time" icon="time-outline" />
      <FieldRow value="21:00" placeholder="End Time" icon="time-outline" />
      <FieldRow value="2 Hours" placeholder="Duration" icon="hourglass-outline" />
    </View>
  );
}

function Step2() {
  return (
    <View className="gap-3">
      <Text className="text-base font-semibold text-ink-900">Choose a Field</Text>
      {fields.map((f) => (
        <Card key={f.id}>
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-xl bg-brand-50 items-center justify-center">
              <Ionicons name="football" size={22} color="#1E5BF5" />
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-ink-900 font-semibold">{f.name}</Text>
              <Text className="text-ink-500 text-xs">
                {f.distanceKm} km · ⭐ {f.rating}
              </Text>
            </View>
            <Text className="text-brand-700 font-bold">{formatIDRFull(f.pricePerHour)}</Text>
          </View>
        </Card>
      ))}
    </View>
  );
}

function Step3({
  paymentMethod,
  setPaymentMethod,
}: {
  paymentMethod?: string;
  setPaymentMethod: (m: string) => void;
}) {
  return (
    <View className="gap-3">
      <Text className="text-base font-semibold text-ink-900">Payment Method</Text>
      {PAYMENT_METHODS.map((p) => {
        const active = paymentMethod === p.id;
        return (
          <Pressable key={p.id} onPress={() => setPaymentMethod(p.id)}>
            <Card className={active ? 'border-brand-600 bg-brand-50' : ''}>
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-brand-50 items-center justify-center">
                  <Ionicons name={p.icon} size={20} color="#1E5BF5" />
                </View>
                <Text className="flex-1 ml-3 text-ink-900 font-semibold">{p.name}</Text>
                <View
                  className={`w-5 h-5 rounded-full border-2 ${active ? 'border-brand-600 bg-brand-600' : 'border-ink-200'}`}
                >
                  {active ? <View className="w-2 h-2 rounded-full bg-white m-auto" /> : null}
                </View>
              </View>
            </Card>
          </Pressable>
        );
      })}
    </View>
  );
}

function Step4() {
  return (
    <View className="gap-3">
      <Text className="text-base font-semibold text-ink-900">Review</Text>
      <Card>
        <Text className="text-ink-500 text-xs">Field</Text>
        <Text className="text-ink-900 font-semibold">Victory Arena</Text>
        <View className="h-px bg-ink-100 my-3" />
        <Text className="text-ink-500 text-xs">Schedule</Text>
        <Text className="text-ink-900 font-semibold">May 18, 2025 · 19:00 - 21:00</Text>
        <View className="h-px bg-ink-100 my-3" />
        <Row label="Field Price" value={formatIDRFull(400_000)} />
        <Row label="Service Fee" value={formatIDRFull(15_000)} />
        <Row label="Discount" value={`- ${formatIDRFull(0)}`} />
        <View className="h-px bg-ink-100 my-3" />
        <View className="flex-row justify-between">
          <Text className="text-ink-700 font-semibold">Total</Text>
          <Text className="text-brand-700 font-extrabold">{formatIDRFull(415_000)}</Text>
        </View>
      </Card>
    </View>
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
