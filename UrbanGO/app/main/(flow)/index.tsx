import { View, Text, StyleSheet, Button } from "react-native";
import { useMapMode } from "@/src/map/core/state/MapModeContext";

export default function Home() {
  const { setMapMode } = useMapMode();

  return (
    // Este view evita que algo tape toda la pantalla ocultando el mapa
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <View style={styles.card}>
        <Text style={styles.title}>UrbanGO</Text>
        <Text>Selecciona tu ruta</Text>

        <Button
          title="Buscar ruta"
          onPress={() => setMapMode("ROUTE_SUGGESTION")}
        />
        <Button title="Regresar" onPress={() => setMapMode("SELECT_POINTS")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 650,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "white",
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
