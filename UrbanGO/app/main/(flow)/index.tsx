import { View, StyleSheet } from "react-native";
import {
  CenterMarker,
  DestinationSheet,
  MenuButton,
  LocateButton,
} from "@/src/components/main/flow/index/index";
import { useTripStore } from "@/src/store/trip.store";

import { useUIStore } from "@/src/store/ui.store";

import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

/**
 * HomeScreen
 *
 * Pantalla principal del flujo. El mapa vive en el layout padre (main).
 * Esta pantalla solo renderiza los componentes que van encima del mapa.
 *
 * pointerEvents="box-none" en el View raíz para que los toques
 * en áreas vacías pasen al mapa. Cada componente hijo captura
 * sus propios toques en su área específica.
 *
 * DestinationSheet maneja internamente los dos modos (home/search)
 * usando @gorhom/bottom-sheet, sin necesidad de navegar a otra pantalla.
 */

export default function HomeScreen() {
  // animatedIndex del sheet, compartido via store para animar el overlay
  const animatedIndex = useUIStore((state) => state.animatedIndex);

  // Opacidad del overlay: 0 en snap 0, 0.45 en snap 1
  const overlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 0.45],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <View style={styles.container} pointerEvents="box-none">
      <CenterMarker />

      {/* Overlay oscuro sobre el mapa — visible al subir el sheet */}
      <Animated.View
        style={[styles.overlay, overlayStyle]}
        pointerEvents="none"
      />

      <MenuButton />
      <LocateButton />
      <DestinationSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
});
