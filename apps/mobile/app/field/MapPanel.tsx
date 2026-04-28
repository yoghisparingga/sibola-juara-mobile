import { View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

type Props = {
  latitude: number;
  longitude: number;
  title: string;
};

export function MapPanel({ latitude, longitude, title }: Props) {
  return (
    <View className="rounded-2xl overflow-hidden mt-6 h-48 border border-ink-100">
      <MapView
        provider={PROVIDER_DEFAULT}
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title={title} />
      </MapView>
    </View>
  );
}
