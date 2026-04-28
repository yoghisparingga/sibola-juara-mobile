import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { Card } from '@/components/Card';
import { teams } from '@/data/mockData';

const conversations = teams.map((t, i) => ({
  id: t.id,
  team: t,
  lastMessage: i % 2 === 0 ? 'See you on the field tonight!' : 'Coach uploaded the lineup.',
  time: i % 2 === 0 ? '10:24' : 'Yesterday',
  unread: i === 0 ? 2 : 0,
}));

export default function MessagesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-5 pt-2 pb-3 flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-ink-900">Messages</Text>
        <View className="w-10 h-10 rounded-full bg-white border border-ink-100 items-center justify-center">
          <Ionicons name="create-outline" size={18} color="#1F2937" />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
        {conversations.map((c) => (
          <Card key={c.id}>
            <View className="flex-row items-center">
              <Avatar name={c.team.name} size={48} />
              <View className="flex-1 ml-3">
                <View className="flex-row justify-between">
                  <Text className="text-ink-900 font-semibold">{c.team.name}</Text>
                  <Text className="text-ink-400 text-xs">{c.time}</Text>
                </View>
                <Text className="text-ink-500 text-sm mt-0.5" numberOfLines={1}>
                  {c.lastMessage}
                </Text>
              </View>
              {c.unread > 0 ? (
                <View className="ml-2 min-w-5 h-5 px-1 rounded-full bg-brand-600 items-center justify-center">
                  <Text className="text-white text-[10px] font-bold">{c.unread}</Text>
                </View>
              ) : null}
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
