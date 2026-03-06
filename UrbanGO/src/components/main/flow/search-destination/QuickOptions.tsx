import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onUseMyLocation: () => void;
  onChooseOnMap: () => void;
};

/**
 * QuickOptions
 *
 * Dos opciones rápidas debajo de los inputs:
 *
 * - "Usar mi ubicación": pone la ubicación del usuario
 *   en el input que esté activo/enfocado.
 *
 * - "Elegir en el mapa": navega a la pantalla de selección
 *   en el mapa (select-origin o select-destination según
 *   el input activo — lógica manejada por SearchView).
 */
export default function QuickOptions({
  onUseMyLocation,
  onChooseOnMap,
}: Props) {
  return (
    <View style={styles.container}>
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

      <View style={styles.divider} />

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
    height: 1,
    backgroundColor: "#F0F0F0",
  },
});
