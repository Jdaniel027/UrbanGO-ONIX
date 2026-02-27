import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Componentes
import {
  LocationInput,
  SwapButton,
  MapOptionItem,
  PlacesList,
} from "@/src/components/main/flow/search-destination";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  sheet: {
    height: "90%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
  },
});
