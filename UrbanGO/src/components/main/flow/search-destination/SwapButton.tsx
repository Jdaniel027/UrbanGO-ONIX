/**
 * SwapButton.tsx
 * ──────────────────────────────────────────────────────────────
 * Botón que intercambia el contenido de los inputs de origen y destino.
 *
 * Posición: se posiciona con `position: absolute` en el componente
 * padre (SearchView), a la derecha del bloque de inputs.
 * El padre debe tener `position: relative` para que funcione.
 *
 * Por qué es un componente separado:
 *  Mantiene el JSX de SearchView limpio y permite reutilizar
 *  el botón en otras pantallas si es necesario.
 *
 * Props:
 *  - onSwap: función que ejecuta el intercambio de textos en SearchView
 */

import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onSwap: () => void;
};

export default function SwapButton({ onSwap }: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onSwap}
      activeOpacity={0.6}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Ionicons name="swap-vertical" size={22} color="#555" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    // Posicionado a la derecha del bloque de inputs
    // El padre (inputsWrapper) debe tener position: relative
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
});
