/**
 * routes.tsx
 * ──────────────────────────────────────────────────────────────
 * Pantalla principal del listado de rutas.
 *
 * Por qué hay un overlay blanco:
 *  El mapa (MapViewBase) vive en el layout de /main y se renderiza
 *  permanentemente debajo de todas las pantallas del flujo.
 *  En esta pantalla el mapa no tiene sentido mostrarse, así que
 *  un View con absoluteFillObject y fondo blanco lo tapa completamente.
 *
 * Ruta Expo Router: app/main/(flow)/routes.tsx
 */

import { View, StyleSheet } from "react-native";

// Componentes
import { MenuButton } from "@/src/components/main/flow/Home/index";
import { MENU_ITEMS_ROUTES } from "@/src/components/main/flow/Home/MenuButton";

export default function RoutesScreen() {
  return (
    // Tapa el mapa del layout con fondo blanco
    <View style={styles.overlay}>
      <MenuButton items={MENU_ITEMS_ROUTES} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // cubre todo el mapa de fondo
    backgroundColor: "#fff",
  },
});
