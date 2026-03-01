import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Componentes de búsqueda
import {
  LocationInput,
  SwapButton,
  MapOptionItem,
  PlacesList,
} from "@/src/components/main/flow/search-destination";

/**
 * SearchDestinationScreen
 *
 * Pantalla de búsqueda de destino. Se presenta como modal transparente
 * con animación slide_from_bottom, lo que hace que visualmente parezca
 * que el DestinationSheet del Home subió, sin notar el cambio de pantalla.
 *
 * Estructura:
 *   - Overlay semitransparente → al tocarlo regresa al Home (router.back())
 *   - Sheet blanco (90% altura) → contiene los inputs y la lista de lugares
 *
 * Para regresar al Home el usuario puede:
 *   - Tocar el overlay oscuro
 *   - Deslizar hacia abajo el sheet (gesto nativo del modal)
 */
export default function SearchDestinationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Overlay — toca para cerrar y volver al Home */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => router.back()}
      />

      {/* Sheet de búsqueda */}
      <View style={[styles.sheet, { paddingTop: insets.top + 10 }]}>
        <LocationInput type="origin" value="Mi ubicación" />
        <LocationInput type="destination" value="" autoFocus />
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

  /**
   * Overlay semitransparente.
   * Cubre el mapa de fondo dando profundidad visual
   * y permite cerrar el modal tocando fuera del sheet.
   */
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  /**
   * Sheet principal de búsqueda.
   * 90% de altura para coincidir visualmente con el sheet del Home
   * cuando está completamente expandido.
   */
  sheet: {
    height: "90%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
  },
});
