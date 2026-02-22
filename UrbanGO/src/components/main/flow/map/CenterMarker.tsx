import { View, StyleSheet } from "react-native";

export default function CenterMarker() {
  return (
    <View pointerEvents="none" style={styles.container}>
      <View style={styles.marker} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4f30ff",
    borderWidth: 2,
    borderColor: "#fff",
  },
});
