import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onSwap: () => void;
};

/**
 * SwapButton
 *
 * Botón que intercambia el contenido de los inputs
 * de origen y destino. Se posiciona a la derecha de
 * los inputs usando position absolute en SearchView.
 */
export default function SwapButton({ onSwap }: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onSwap}
      activeOpacity={0.6}
    >
      <Ionicons name="swap-vertical" size={22} color="#555" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
});
