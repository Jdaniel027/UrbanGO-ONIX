/**
 * GradientButton.tsx
 * ──────────────────────────────────────────────────────────────
 * Botón reutilizable con fondo degradado de izquierda a derecha.
 *
 * Usado en:
 *  - HomeView     → "Usar esta ubicación"
 *  - SelectLocationSheet → "Usar esta ubicación"
 *  - Cualquier pantalla que necesite el botón principal de la app
 *
 * El degradado usa los colores principales de la app (#9FCDFF → #419CFF).
 *
 * Props:
 *  - label:    texto que muestra el botón
 *  - onPress:  función que se ejecuta al presionarlo
 *  - style:    estilos extra opcionales para el contenedor (ej: width, marginTop)
 *
 * Ruta del archivo:
 *  src/components/shared/GradientButton.tsx
 */

import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  /** Texto del botón */
  label: string;
  /** Función al presionar */
  onPress: () => void;
  /** Estilos adicionales para el contenedor exterior (ancho, márgenes, etc.) */
  style?: ViewStyle;
};

export default function GradientButton({ label, onPress, style }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.wrapper, style]}
    >
      <LinearGradient
        colors={["#9FCDFF", "#419CFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 50, // pill shape — igual al diseño
    overflow: "hidden", // necesario para que el gradiente respete el borderRadius
  },
  gradient: {
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 50,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
