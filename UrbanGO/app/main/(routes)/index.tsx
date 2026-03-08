import { Text, View, StyleSheet } from "react-native";
import { MenuButton } from "@/src/components/main/flow/Home/index";
import { MENU_ITEMS_ROUTES } from "@/src/components/main/flow/Home/MenuButton";

export default function RoutesScreen() {
  return (
    <View style={styles.container}>
      <MenuButton items={MENU_ITEMS_ROUTES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
});
