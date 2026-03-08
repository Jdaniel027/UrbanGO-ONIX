/**
 * LocateButton.tsx
 * ──────────────────────────────────────────────────────────────
 * Botón circular que centra el mapa en la ubicación del usuario.
 *
 * Posición: esquina superior derecha, respetando el safe area
 * (notch / barra de estado del dispositivo).
 *
 * Cómo funciona:
 *  - Al presionarse, activa el flag `locateUser` en el UIStore.
 *  - MapCamera observa ese flag y ejecuta el movimiento de cámara.
 *  - Este componente NO maneja GPS directamente — solo dispara la acción.
 *    Separar la responsabilidad permite que la lógica de cámara
 *    viva en un solo lugar (Camera.config.tsx).
 *
 * Visibilidad:
 *  - Se oculta cuando el sheet está en snap 1 (modo búsqueda),
 *    ya que el sheet cubre la pantalla y el botón no sería útil.
 */

import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUIStore } from "@/src/store/ui.store";

export default function LocateButton() {
  const insets = useSafeAreaInsets();

  // Leer el índice del sheet para saber si debe mostrarse
  const sheetIndex = useUIStore((state) => state.sheetIndex);

  // Función que activa el movimiento de cámara en MapCamera
  const setLocateUser = useUIStore((state) => state.setLocateUser);

  // Ocultar cuando el sheet está abierto en modo búsqueda (snap 1)
  if (sheetIndex !== 0) return null;

  return (
    <TouchableOpacity
      style={[styles.button, { top: insets.top + 12 }]}
      onPress={() => setLocateUser(true)} // dispara el vuelo de cámara
      activeOpacity={0.8}
    >
      <Ionicons name="locate" size={26} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 16,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#9fcdff", // color principal de la app
    justifyContent: "center",
    alignItems: "center",
    // Sombra para que se vea sobre el mapa
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
});
