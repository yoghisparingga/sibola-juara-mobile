import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { fields } from '@/data/mockData';
import { formatIDRFull } from '@/lib/format';
import { MapPanel } from './MapPanel';

const SLOT_DAYS = [
  { label: 'Sun', date: 'May 18' },
  { label: 'Mon', date: 'May 19' },
  { label: 'Tue', date: 'May 20' },
  { label: 'Wed', date: 'May 21' },
];
const SLOT_TIMES = ['18:00', '19:00', '20:00', '21:00'];

const FACILITY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Parking: 'car-outline',
  Lighting: 'bulb-outline',
  Toilet: 'water-outline',
  Cafe: 'cafe-outline',
  Locker: 'lock-closed-outline',
};

export default function FieldDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const field = fields.find((f) => f.id === id) ?? fields[0];
  const [activeDay, setActiveDay] = useState(0);
  const [activeSlot, setActiveSlot] = useState(2);
  const [showMap, setShowMap] = useState(false);

  return (
    <View className="flex-1 bg-white">
      <View className="h-72">
        <Image source={{ uri: field.imageUrl }} className="w-full h-full" resizeMode="cover" />
        <SafeAreaView className="absolute inset-0" edges={['top']}>
          <View className="flex-row justify-between p-4">
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-black/35 items-center justify-center"
            >
              <Ionicons name="chevron-back" size={20} color="#fff" />
            </Pressable>
            <Pressable className="w-10 h-10 rounded-full bg-black/35 items-center justify-center">
              <Ionicons name="bookmark-outline" size={18} color="#fff" />
            </Pressable>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView className="flex-1 -mt-6 bg-background rounded-t-3xl" contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold text-ink-900">{field.name}</Text>
          <View className="bg-green-100 px-2 py-1 rounded-full">
            <Text className="text-green-700 text-xs font-semibold">{field.isOpen ? 'Open' : 'Closed'}</Text>
          </View>
        </View>
        <View className="flex-row items-center mt-1">
          <Ionicons name="star" size={14} color="#F59E0B" />
          <Text className="text-ink-700 text-sm ml-1">{field.rating}</Text>
          <Text className="text-ink-400 text-sm ml-1">({field.reviews} reviews)</Text>
          <Text className="text-ink-400 text-sm ml-2">· {field.distanceKm} km</Text>
        </View>
        <View className="flex-row items-center mt-1">
          <Ionicons name="location-outline" size={14} color="#6B7280" />
          <Text className="text-ink-500 text-sm ml-1">{field.address}</Text>
        </View>
        <View className="flex-row items-center mt-1">
          <Ionicons name="time-outline" size={14} color="#16A34A" />
          <Text className="text-success text-sm ml-1 font-semibold">{field.isOpen ? 'Open' : 'Closed'}</Text>
          <Text className="text-ink-500 text-sm ml-2">
            {field.openHour} - {field.closeHour}
          </Text>
        </View>

        <Text className="text-base font-semibold text-ink-900 mt-6 mb-3">Available Slots</Text>
        <View className="flex-row gap-2">
          {SLOT_DAYS.map((d, i) => (
            <Pressable
              key={d.date}
              onPress={() => setActiveDay(i)}
              className={`px-3 py-2 rounded-xl border ${i === activeDay ? 'bg-brand-600 border-brand-600' : 'bg-white border-ink-100'}`}
            >
              <Text className={`text-xs font-semibold ${i === activeDay ? 'text-white' : 'text-ink-500'}`}>
                {d.label}
              </Text>
              <Text className={`text-sm font-bold ${i === activeDay ? 'text-white' : 'text-ink-900'}`}>
                {d.date}
              </Text>
            </Pressable>
          ))}
        </View>
        <View className="flex-row gap-2 mt-3">
          {SLOT_TIMES.map((t, i) => (
            <Pressable
              key={t}
              onPress={() => setActiveSlot(i)}
              className={`flex-1 py-3 rounded-xl border ${i === activeSlot ? 'bg-brand-600 border-brand-600' : 'bg-white border-ink-100'}`}
            >
              <Text className={`text-center text-sm font-semibold ${i === activeSlot ? 'text-white' : 'text-ink-700'}`}>
                {t}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text className="text-base font-semibold text-ink-900 mt-6 mb-3">Facilities</Text>
        <View className="flex-row flex-wrap gap-3">
          {field.facilities.map((fac) => (
            <View key={fac} className="items-center w-16">
              <View className="w-12 h-12 rounded-2xl bg-white border border-ink-100 items-center justify-center">
                <Ionicons name={FACILITY_ICONS[fac] ?? 'ellipse-outline'} size={20} color="#1E5BF5" />
              </View>
              <Text className="text-ink-700 text-xs mt-1.5">{fac}</Text>
            </View>
          ))}
        </View>

        {showMap ? (
          <MapPanel latitude={field.latitude} longitude={field.longitude} title={field.name} />
        ) : null}

        <View className="mt-6">
          <Text className="text-ink-400 text-xs">Price (2 hours)</Text>
          <Text className="text-2xl font-extrabold text-ink-900">{formatIDRFull(field.pricePerHour * 2)}</Text>
        </View>
      </ScrollView>

      <SafeAreaView className="absolute bottom-0 left-0 right-0 bg-white border-t border-ink-100" edges={['bottom']}>
        <View className="flex-row p-4 gap-3">
          <View className="flex-1">
            <Button
              label={showMap ? 'Hide Map' : 'View on Map'}
              variant="outline"
              leading={<Ionicons name="map-outline" size={18} color="#1F2937" />}
              onPress={() => setShowMap((v) => !v)}
            />
          </View>
          <View className="flex-1">
            <Button label="Book Now" onPress={() => router.push('/booking/new')} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
