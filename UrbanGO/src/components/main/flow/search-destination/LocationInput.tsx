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
 * Input de texto para origen o destino.
 * - Fondo blanco con borde
 * - Borde azul (#9FCDFF) cuando está enfocado, gris (#E8E8E8) cuando no
 * - Punto verde para origen, rojo para destino
 * - Botón X para limpiar, visible solo cuando hay texto
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

      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText?.("")}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close-circle" size={18} color="#C0C0C0" />
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
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 10,
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  unfocused: {
    borderColor: "#E8E8E8",
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
});
