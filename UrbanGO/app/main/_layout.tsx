import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";
import { MapViewBase } from "@/src/map/core/MapViewBase";
import {
  MapModeProvider,
  useMapMode,
} from "@/src/map/core/state/MapModeContext";

/**
 * MainLayoutContent
 *
 * Usamos Slot (no Stack) para que Expo Router no cree un View
 * contenedor extra que bloquee los toques al mapa.
 *
 * Arquitectura de capas:
 *   [ View flex:1 ]
 *     ├── MapViewBase  → absoluteFill, siempre interactivo
 *     └── Slot         → renderiza la pantalla activa sin wrapper
 */
function MainLayoutContent() {
  const { mapMode } = useMapMode();

  return (
    <View style={styles.container}>
      {/* Mapa global — fondo de todas las pantallas de main */}
      <MapViewBase mapMode={mapMode} />

      {/* Pantalla activa encima del mapa */}
      <Slot />
    </View>
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
