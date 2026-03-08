import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  /** Estilo animado de opacidad/pointerEvents desde DestinationSheet */
  animatedStyle: object;
  onOpenSearch: () => void;
  onConfirmLocation: () => void;
};

/**
 * HomeView
 *
 * Contenido del snap 0 del DestinationSheet.
 * Muestra título, input falso y botón de confirmar ubicación.
 *
 * Se posiciona con absoluteFillObject sobre el SearchView
 * y se desvanece durante la animación hacia el snap 1.
 */
export default function HomeView({
  animatedStyle,
  onOpenSearch,
  onConfirmLocation,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      style={[
        styles.container,
        StyleSheet.absoluteFillObject,
        { paddingBottom: insets.bottom + 16 },
        animatedStyle,
      ]}
    >
      <Text style={styles.title}>Marque su destino</Text>
      <Text style={styles.subtitle}>
        Arrastre el mapa para mover el marcador
      </Text>

      <TouchableOpacity
        style={styles.searchBox}
        onPress={onOpenSearch}
        activeOpacity={0.7}
      >
        <Text style={styles.searchText}>¿A dónde quiere ir?</Text>
        <Ionicons name="search" size={20} color="#555" />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.buttonWrapper}
        onPress={onConfirmLocation}
      >
        <LinearGradient
          colors={["#9FCDFF", "#419CFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Usar esta ubicación</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    marginBottom: 18,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F2F4F7",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    width: "90%",
  },
  searchText: { color: "#999", fontSize: 15 },
  buttonWrapper: { width: "90%", borderRadius: 14, overflow: "hidden" },
  button: { paddingVertical: 16, alignItems: "center", borderRadius: 14 },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
