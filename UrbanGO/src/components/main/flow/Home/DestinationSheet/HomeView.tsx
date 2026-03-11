/**
 * HomeView.tsx
 * ──────────────────────────────────────────────────────────────
 * Contenido del snap 0 del DestinationSheet.
 *
 * Muestra título, subtítulo, un input falso que abre el modo búsqueda
 * y el botón para confirmar la ubicación actual del marcador.
 *
 * Se posiciona con absoluteFillObject encima de SearchView y se
 * desvanece durante la animación hacia el snap 1.
 *
 * Ruta del archivo:
 *  src/components/main/flow/Home/DestinationSheet/HomeView.tsx
 */

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GradientButton } from "@/src/components/main/flow/index";

type Props = {
  /** Estilo animado de opacidad/pointerEvents desde DestinationSheet */
  animatedStyle: object;
  /** Abre el modo búsqueda subiendo el sheet al snap 1 */
  onOpenSearch: () => void;
  /** Confirma la ubicación actual del marcador del mapa */
  onConfirmLocation: () => void;
};

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

      {/* Input falso — al tocarlo abre el snap 1 con la búsqueda real */}
      <TouchableOpacity
        style={styles.searchBox}
        onPress={onOpenSearch}
        activeOpacity={0.7}
      >
        <Text style={styles.searchText}>¿A dónde quiere ir?</Text>
        <Ionicons name="search" size={20} color="#555" />
      </TouchableOpacity>

      {/* Botón principal — confirma la ubicación del marcador */}
      <GradientButton
        label="Usar esta ubicación"
        onPress={onConfirmLocation}
        style={styles.button}
      />
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
  searchText: {
    color: "#999",
    fontSize: 15,
  },
  button: {
    width: "90%", // el GradientButton ocupa el 90% del ancho del sheet
  },
});
