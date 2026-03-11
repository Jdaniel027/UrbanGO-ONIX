/**
 * BackButton.tsx
 * ──────────────────────────────────────────────────────────────
 * Botón de flecha hacia atrás posicionado en la esquina superior izquierda.
 *
 * Se usa en las pantallas de selección en el mapa (select-origin y
 * select-destination) para regresar a la pantalla anterior.
 *
 * Al presionarlo ejecuta router.back() de Expo Router, lo que regresa
 * a la pantalla del DestinationSheet con el sheet ya abierto en snap 1,
 * ya que el estado del sheet persiste en el UIStore.
 *
 * Posición:
 *  Se coloca respetando el safe area del dispositivo (notch/status bar)
 *  más un margen extra de 12px para separarlo del borde visual.
 */

import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function BackButton() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.button, { top: insets.top + 12 }]}
      onPress={() => router.back()} // regresa a la pantalla anterior (HomeScreen)
      activeOpacity={0.8}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} // área táctil más grande
    >
      <Ionicons name="chevron-back" size={32} color="#000" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    left: 16,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
