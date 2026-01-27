import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";
import { MapViewBase } from "@/src/map/MapViewBase";

export default function MainLayout() {
  return (
    <View style={styles.container}>
      {/* MAPA GLOBAL */}
      <MapViewBase />

      {/* PANTALLAS ENCIMA */}
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
