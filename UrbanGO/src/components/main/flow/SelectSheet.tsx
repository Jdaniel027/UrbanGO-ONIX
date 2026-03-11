/**
 * SelectLocationSheet.tsx
 * ──────────────────────────────────────────────────────────────
 * Sheet inferior compartido entre select-origin y select-destination.
 *
 * Muestra al usuario instrucciones para colocar el marcador en el mapa
 * y un botón para confirmar la ubicación seleccionada.
 *
 * Por qué es un componente separado y no duplicado en cada pantalla:
 *  select-origin y select-destination son idénticas visualmente.
 *  Solo cambian el título y lo que hace el botón "Usar esta ubicación".
 *  Este componente recibe esas diferencias como props.
 *
 * Cómo funciona la selección de ubicación:
 *  El marcador siempre está fijo en el centro visual del mapa (CenterMarker).
 *  Al presionar "Usar esta ubicación", la pantalla padre llama onConfirm()
 *  pasando las coordenadas del centro actual del mapa, que se obtienen
 *  con la ref de la cámara de Mapbox.
 *
 * Props:
 *  - title: texto principal del sheet ("Elige el punto de partida" / "...destino")
 *  - onConfirm: callback al presionar el botón — recibe las coordenadas del marcador
 *
 * Ruta del archivo:
 *  src/components/main/flow/shared/SelectLocationSheet.tsx
 */

import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Ruta correcta del componente compartido
import { GradientButton } from "@/src/components/main/flow/index";

type Props = {
  /** Texto principal: "Elige el punto de partida" o "Elige el lugar de destino" */
  title: string;
  /** Callback al confirmar — la pantalla padre obtiene las coordenadas del centro del mapa */
  onConfirm: () => void;
};

export default function SelectSheet({ title, onConfirm }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
      {/* Línea de agarre visual (igual al DestinationSheet) */}
      <View style={styles.handle} />

      {/* Ícono + título + subtítulo */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Coloque el marcador en su destino</Text>
      </View>

      {/* Botón de confirmación — onConfirm viene de la pantalla padre */}
      <GradientButton
        label="Usar esta ubicación"
        onPress={onConfirm}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
    marginBottom: 20,
  },
  content: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  button: {
    alignSelf: "stretch", // ocupa todo el ancho disponible del paddingHorizontal
  },
});
