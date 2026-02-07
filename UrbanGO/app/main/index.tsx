import { View, Text, StyleSheet, Button } from "react-native";
import { useMapMode } from "@/src/map/core/state/MapModeContext";

export default function Home() {
  const { setMapMode } = useMapMode();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>UrbanGO</Text>
      <Text>Selecciona tu ruta</Text>

      <Button
        title="Buscar ruta"
        onPress={() => setMapMode("ROUTE_SUGGESTION")}
      />
      <Button title="Regresar" onPress={() => setMapMode("SELECT_POINTS")} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 50,
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
