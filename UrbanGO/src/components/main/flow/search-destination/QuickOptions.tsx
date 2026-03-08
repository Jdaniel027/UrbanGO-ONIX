import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  /** Solo visible cuando el input de origen está activo */
  showUseMyLocation: boolean;
  onUseMyLocation: () => void;
  onChooseOnMap: () => void;
};

/**
 * QuickOptions
 *
 * Opciones rápidas debajo de los inputs:
 *
 * - "Usar mi ubicación": visible solo cuando el input de origen
 *   está activo. No tiene sentido como opción de destino.
 *
 * - "Elegir en el mapa": siempre visible, navega a la pantalla
 *   de selección según el input activo (origin o destination).
 */
export default function QuickOptions({
  showUseMyLocation,
  onUseMyLocation,
  onChooseOnMap,
}: Props) {
  return (
    <View style={styles.container}>
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
          <View style={styles.divider} />
        </>
      )}

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
