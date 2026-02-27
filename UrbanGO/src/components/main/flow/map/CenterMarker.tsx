import { View, StyleSheet } from "react-native";

export default function CenterMarker() {
  return (
    <View pointerEvents="none" style={styles.container}>
      {/* Sombra/círculo de impacto en el suelo */}
      <View style={styles.shadow} />

      {/* Pin */}
      <View style={styles.pinWrapper}>
        <View style={styles.pinHead} />
        <View style={styles.pinTail} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },

  pinWrapper: {
    alignItems: "center",
    // Lo subimos un poco para que la punta quede exactamente en el centro
    marginBottom: 18,
  },

  pinHead: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#419CFF",
    borderWidth: 3,
    borderColor: "#fff",
    // Sombra del pin
    shadowColor: "#419CFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 6,
  },

  pinTail: {
    width: 3,
    height: 14,
    backgroundColor: "#419CFF",
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },

  shadow: {
    position: "absolute",
    bottom: "50%",
    width: 14,
    height: 6,
    borderRadius: 7,
    backgroundColor: "rgba(0,0,0,0.15)",
    marginBottom: -3,
  },
});
