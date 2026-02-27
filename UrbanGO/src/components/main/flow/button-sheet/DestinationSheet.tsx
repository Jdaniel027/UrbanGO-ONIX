import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DestinationSheet() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleGoToSearch = () => {
    router.push("/main/(flow)/search-destination");
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
      {/* Drag handle */}
      <View style={styles.handle} />

      {/* Título */}
      <Text style={styles.title}>Marque su destino</Text>
      <Text style={styles.subtitle}>
        Arrastre el mapa para mover el marcador
      </Text>

      {/* Input falso */}
      <TouchableOpacity
        style={styles.searchBox}
        onPress={handleGoToSearch}
        activeOpacity={0.7}
      >
        <Text style={styles.searchText}>¿A dónde quiere ir?</Text>
        <Ionicons name="search" size={20} color="#555" />
      </TouchableOpacity>

      {/* Botón gradiente */}
      <TouchableOpacity activeOpacity={0.85} style={styles.buttonWrapper}>
        <LinearGradient
          colors={["#9FCDFF", "#419CFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Usar esta ubicación</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    // Sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },

  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 13,
    color: "#888",
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
  },

  searchText: {
    color: "#999",
    fontSize: 15,
  },

  buttonWrapper: {
    borderRadius: 14,
    overflow: "hidden",
  },

  button: {
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 14,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
