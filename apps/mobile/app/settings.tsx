import { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '@/components/Card';
import { ScreenHeader } from '@/components/ScreenHeader';

export default function SettingsScreen() {
  const [bookingReminder, setBookingReminder] = useState(true);
  const [promotions, setPromotions] = useState(true);
  const [matchUpdates, setMatchUpdates] = useState(false);
  const [newMessages, setNewMessages] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader title="Settings" />

      <ScrollView contentContainerStyle={{ padding: 20, gap: 20, paddingBottom: 32 }}>
        <Section title="Notifications">
          <ToggleRow label="Booking Reminders" value={bookingReminder} onChange={setBookingReminder} />
          <ToggleRow label="Promotions & Offers" value={promotions} onChange={setPromotions} />
          <ToggleRow label="Match Updates" value={matchUpdates} onChange={setMatchUpdates} />
          <ToggleRow label="New Messages" value={newMessages} onChange={setNewMessages} />
        </Section>

        <Section title="Payments">
          <NavRow label="Payment Methods" icon="card-outline" />
        </Section>

        <Section title="Privacy & Security">
          <NavRow label="Privacy Settings" icon="shield-outline" />
          <NavRow label="Change Password" icon="key-outline" />
        </Section>

        <Section title="General">
          <NavRow label="Help Center" icon="help-circle-outline" />
          <NavRow label="About Sibola Juara" icon="information-circle-outline" onPress={() => router.push('/analytics')} />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View>
      <Text className="text-xs font-semibold text-ink-400 mb-2 px-1 uppercase tracking-wide">{title}</Text>
      <Card className="gap-1">{children}</Card>
    </View>
  );
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View className="flex-row items-center justify-between py-2">
      <Text className="text-ink-900 text-sm font-medium">{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: '#E5E7EB', true: '#1E5BF5' }} thumbColor="#fff" />
    </View>
  );
}

function NavRow({ label, icon, onPress }: { label: string; icon: keyof typeof Ionicons.glyphMap; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center justify-between py-3">
      <View className="flex-row items-center">
        <View className="w-9 h-9 rounded-xl bg-brand-50 items-center justify-center">
          <Ionicons name={icon} size={18} color="#1E5BF5" />
        </View>
        <Text className="ml-3 text-ink-900 text-sm font-medium">{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
    </Pressable>
  );
}
