import { View, StyleSheet } from "react-native";
import {
  CenterMarker,
  DestinationSheet,
  MenuButton,
  LocateButton,
} from "@/src/components/main/flow/index/index";
import { useTripStore } from "@/src/store/trip.store";

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
  const destination = useTripStore((state) => state.destination);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <CenterMarker />
      <LocateButton />
      <MenuButton />
      <DestinationSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
