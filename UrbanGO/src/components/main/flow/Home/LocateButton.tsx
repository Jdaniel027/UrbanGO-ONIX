/**
 * LocateButton.tsx
 * ──────────────────────────────────────────────────────────────
 * Botón circular que centra el mapa en la ubicación del usuario.
 *
 * Posición: esquina superior derecha, respetando el safe area.
 *
 * Cómo funciona:
 *  - Al presionarse, activa el flag `locateUser` en el UIStore.
 *  - MapCamera observa ese flag y ejecuta el movimiento de cámara.
 *  - Este componente NO maneja GPS directamente — solo dispara la acción.
 *
 * Visibilidad:
 *  - Por defecto se oculta cuando el sheet está en snap 1 (sheetIndex !== 0),
 *    ya que el sheet cubre la pantalla y el botón no sería útil.
 *  - El prop `forceVisible` omite esa verificación y siempre lo muestra.
 *    Útil en pantallas como select-origin y select-destination donde
 *    no hay sheet pero el botón sí tiene sentido.
 *
 * Props:
 *  - forceVisible?: si es true, ignora el check de sheetIndex y siempre
 *    se muestra. Default: false.
 */

import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUIStore } from "@/src/store/ui.store";

type Props = {
  forceVisible?: boolean;
};

export default function LocateButton({ forceVisible = false }: Props) {
  const insets = useSafeAreaInsets();
  const sheetIndex = useUIStore((state) => state.sheetIndex);
  const setLocateUser = useUIStore((state) => state.setLocateUser);

  // Ocultar cuando el sheet está en modo búsqueda (snap 1),
  // a menos que forceVisible esté activo
  if (!forceVisible && sheetIndex !== 0) return null;

  return (
    <TouchableOpacity
      style={[styles.button, { top: insets.top + 12 }]}
      onPress={() => setLocateUser(true)}
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
    backgroundColor: "#9fcdff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
});
