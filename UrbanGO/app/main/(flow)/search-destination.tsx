import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Componentes
import {
  LocationInput,
  SwapButton,
  MapOptionItem,
  PlacesList,
} from "@/src/components/main/flow/search-destination";

import styles from "./search-destination.styles";

export default function SearchDestinationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Overlay */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => router.back()}
      />

      {/* Sheet */}
      <View style={[styles.sheet, { paddingTop: insets.top + 10 }]}>
        <LocationInput type="origin" value="Mi ubicación" />

        <LocationInput type="destination" value="Uadeo" autoFocus />

        <SwapButton />

        <MapOptionItem />

        <PlacesList />
      </View>
    </View>
  );
}
