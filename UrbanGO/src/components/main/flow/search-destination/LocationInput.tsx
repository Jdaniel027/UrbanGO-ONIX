import { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  type: "origin" | "destination";
  value: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
};

/**
 * LocationInput
 *
 * Input tipo pill (border-radius alto) igual al diseño.
 * - Fondo gris claro (#F2F4F7), sin sombra
 * - Borde azul claro (#9FCDFF) al estar enfocado, transparente si no
 * - Punto verde para origen, rojo para destino
 * - Botón X circular solo cuando hay texto
 */
export default function LocationInput({
  type,
  value,
  onChangeText,
  onFocus,
}: Props) {
  const [focused, setFocused] = useState(false);
  const isOrigin = type === "origin";

  return (
    <View
      style={[styles.container, focused ? styles.focused : styles.unfocused]}
    >
      <View
        style={[
          styles.dot,
          { backgroundColor: isOrigin ? "#4CAF50" : "#FF3B30" },
        ]}
      />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={isOrigin ? "Punto de partida" : "¿A dónde va?"}
        placeholderTextColor="#ADADAD"
        onFocus={() => {
          setFocused(true);
          onFocus?.();
        }}
        onBlur={() => setFocused(false)}
      />

      {/* Botón X — solo visible si hay texto, igual al diseño */}
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText?.("")}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.clearButton}
        >
          <Ionicons name="close-circle" size={20} color="#ADADAD" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50, // pill shape
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 1.5,
  },
  unfocused: {
    borderColor: "#F2F4F7",
  },
  focused: {
    borderColor: "#9FCDFF",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#111",
    padding: 0,
  },
  clearButton: {
    marginLeft: 8,
  },
});
