import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";
import { MapViewBase } from "@/src/map/core/MapViewBase";
import {
  MapModeProvider,
  useMapMode,
} from "@/src/map/core/state/MapModeContext";

function MainLayoutContent() {
  const { mapMode } = useMapMode();

  return (
    <>
      <View style={styles.container}>
        {/* MAPA GLOBAL */}
        <MapViewBase mapMode={mapMode} />

        {/* PANTALLAS ENCIMA */}
        <Slot />
      </View>
    </>
  );
}

export default function MainLayout() {
  return (
    <MapModeProvider>
      <MainLayoutContent />
    </MapModeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
