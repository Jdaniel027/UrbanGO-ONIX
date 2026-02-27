import { View, Text, StyleSheet } from "react-native";

export default function SelectOriginScreen() {
  return (
    <View style={styles.container}>
      <Text>Seleccionar punto de partida</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
