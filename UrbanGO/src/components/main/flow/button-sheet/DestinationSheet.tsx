import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useTripStore } from "@/src/store/trip.store";
import { useState } from "react";

// Estado del componente
type SheetState = "collapsed" | "expanded" | "search";

export default function DestinationSheet() {
  const [sheetState, setSheetState] = useState<SheetState>("collapsed");

  const setDestination = useTripStore((state) => state.setDestination);

  const handleUseLocation = () => {
    const mockCoordinates = {
      latitude: 19.4326,
      longitude: -99.1332,
    };

    setDestination(mockCoordinates);

    console.log("Destino guardado:", mockCoordinates);
  };

  return (
    <View style={styles.container}>
      {sheetState === "collapsed" && (
        <>
          <Text style={styles.title}>Marque su destino</Text>

          <TouchableOpacity style={styles.button} onPress={handleUseLocation}>
            <Text style={styles.buttonText}>Usar esta ubicación</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setSheetState("expanded")}
          >
            <Text>Expandir</Text>
          </TouchableOpacity>
        </>
      )}

      {sheetState === "expanded" && (
        <>
          <Text style={styles.title}>¿A dónde va?</Text>

          <TouchableOpacity
            style={styles.searchBox}
            onPress={() => setSheetState("search")}
          >
            <Text style={{ color: "#888" }}>Toca para escribir destino</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setSheetState("collapsed")}
          >
            <Text>Volver</Text>
          </TouchableOpacity>
        </>
      )}

      {sheetState === "search" && (
        <>
          <TextInput placeholder="Escribe tu destino..." style={styles.input} />

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setSheetState("expanded")}
          >
            <Text>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("Aquí luego irá navegación a select-destination");
            }}
          >
            <Text style={styles.buttonText}>Elegir ubicación en el mapa</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  secondaryButton: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },

  searchBox: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  input: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
});
