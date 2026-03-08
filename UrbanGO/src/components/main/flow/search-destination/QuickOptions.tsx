/**
 * QuickOptions.tsx
 * ──────────────────────────────────────────────────────────────
 * Opciones rápidas que aparecen debajo de los inputs de búsqueda.
 *
 * Opciones disponibles:
 *
 *  1. "Usar mi ubicación" (condicional)
 *     Pone la ubicación GPS del usuario en el input de ORIGEN.
 *     Solo se muestra cuando el input de origen está activo/enfocado.
 *     No tiene sentido como opción de destino (nadie quiere ir
 *     a donde ya está), por eso se oculta en ese caso.
 *
 *  2. "Elegir en el mapa" (siempre visible)
 *     Navega a la pantalla de selección en el mapa.
 *     Funciona para origen y destino según el input activo.
 *
 * Props:
 *  - showUseMyLocation: controlado por SearchView según el input activo
 *  - onUseMyLocation: pone "Mi ubicación" en el input de origen
 *  - onChooseOnMap: navega a la pantalla de selección en el mapa
 */

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  showUseMyLocation: boolean;
  onUseMyLocation: () => void;
  onChooseOnMap: () => void;
};

export default function QuickOptions({
  showUseMyLocation,
  onUseMyLocation,
  onChooseOnMap,
}: Props) {
  return (
    <View style={styles.container}>
      {/* "Usar mi ubicación" — solo visible con input de origen activo */}
      {showUseMyLocation && (
        <>
          <TouchableOpacity
            style={styles.option}
            onPress={onUseMyLocation}
            activeOpacity={0.6}
          >
            <Ionicons
              name="locate-outline"
              size={22}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.label}>Usar mi ubicación</Text>
          </TouchableOpacity>
          {/* Separador entre opciones */}
          <View style={styles.divider} />
        </>
      )}

      {/* "Elegir en el mapa" — siempre visible */}
      <TouchableOpacity
        style={styles.option}
        onPress={onChooseOnMap}
        activeOpacity={0.6}
      >
        <Ionicons
          name="map-outline"
          size={22}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.label}>Elegir en el mapa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 4,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  icon: {
    marginRight: 14,
  },
  label: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
  },
  divider: {
    height: 4,
    backgroundColor: "#F0F0F0",
  },
});
