import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUIStore } from "@/src/store/ui.store";

export default function LocateButton() {
  const insets = useSafeAreaInsets();

  // Se oculta cuando el sheet está en snap 1 (modo search)
  const sheetIndex = useUIStore((state) => state.sheetIndex);
  if (sheetIndex !== 0) return null;

  return (
    <TouchableOpacity style={[styles.button, { top: insets.top + 12 }]}>
      <Ionicons name="locate" size={26} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 16,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#9fcdff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
});
