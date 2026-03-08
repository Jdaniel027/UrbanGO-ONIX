/**
 * LocationInput.tsx
 * ──────────────────────────────────────────────────────────────
 * Input de texto para ingresar origen o destino de un viaje.
 *
 * Diseño tipo "pill" (cápsula):
 *  - Fondo blanco (#fff), sin sombra
 *  - Borde azul claro (#9FCDFF) cuando está enfocado
 *  - Borde gris claro (#D3D3D3) cuando no está enfocado
 *  - Punto de color a la izquierda: verde = origen, rojo = destino
 *  - Botón X circular a la derecha, solo visible cuando hay texto
 *
 * Props:
 *  - type: "origin" | "destination" → determina color del punto y placeholder
 *  - value: texto actual del input
 *  - onChangeText: callback al escribir
 *  - onFocus: callback al tocar el input (usado por SearchView para
 *    saber cuál input está activo y mostrar/ocultar "Usar mi ubicación"
 */

import { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  type: "origin" | "destination";
  value: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
};

export default function LocationInput({
  type,
  value,
  onChangeText,
  onFocus,
}: Props) {
  // Estado local de foco para cambiar el borde del input
  const [focused, setFocused] = useState(false);

  const isOrigin = type === "origin";

  return (
    <View
      style={[styles.container, focused ? styles.focused : styles.unfocused]}
    >
      {/* Indicador de tipo: verde para origen, rojo para destino */}
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
          onFocus?.(); // notificar a SearchView qué input está activo
        }}
        onBlur={() => setFocused(false)}
      />

      {/* Botón limpiar — solo visible si hay texto escrito */}
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
    borderRadius: 50, // forma pill/cápsula
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 1.5,
  },
  unfocused: {
    borderColor: "#F2F4F7", // sin borde cuando no está activo
  },
  focused: {
    borderColor: "#9FCDFF", // azul claro de la app al estar activo
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
