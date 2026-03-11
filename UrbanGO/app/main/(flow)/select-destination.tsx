/**
 * select-destination.tsx
 * ──────────────────────────────────────────────────────────────
 * Pantalla para seleccionar el lugar de DESTINO en el mapa.
 *
 * Ruta Expo Router: app/main/(flow)/select-destination.tsx
 * Acceso desde: SearchView → QuickOptions → "Elegir en el mapa"
 *   cuando el input de destino está activo.
 *
 * Idéntica a select-origin en estructura y comportamiento.
 * Las únicas diferencias son:
 *  - El título del sheet: "Elige el lugar de destino"
 *  - Al confirmar guarda las coordenadas como DESTINO (no origen)
 *
 * Ver select-origin.tsx para documentación completa del flujo.
 *
 * Arquitectura de capas en pantalla:
 *  [ Mapa (del layout de main, siempre activo) ]
 *  [ CenterMarker — pin fijo en el centro ]
 *  [ BackButton — regresa al sheet ]
 *  [ SelectLocationSheet — instrucciones + botón de confirmación ]
 */

import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import Mapbox from "@rnmapbox/maps";
import { useUIStore } from "@/src/store/ui.store";

// Componentes
import { BackButton } from "@/src/components/ui/index";
import { CenterMarker } from "@/src/components/main/flow/Home/index";
import { SelectSheet } from "@/src/components/main/flow/index";
import { LocateButton } from "@/src/components/main/flow/Home/index";

export default function SelectDestinationScreen() {
  const router = useRouter();

  // Referencia a la cámara de Mapbox para leer el centro actual del mapa
  const cameraRef = useRef<Mapbox.Camera>(null);

  /**
   * handleConfirm — se ejecuta al presionar "Usar esta ubicación"
   *
   * Flujo:
   * 1. Lee las coordenadas del centro actual del mapa (donde está el marcador)
   * 2. Las guarda en el store como destino seleccionado
   * 3. Regresa al HomeScreen donde el sheet sigue en snap 1
   *
   * TODO: implementar lectura de coordenadas y campo en UIStore para destino.
   * Ver select-origin.tsx para más detalle del TODO pendiente.
   */
  const handleConfirm = async () => {
    // TODO: leer coordenadas del centro del mapa y guardar como destino
    // const camera = await cameraRef.current?.getCamera();
    // const [lng, lat] = camera?.centerCoordinate ?? [];
    // setDestinationCoordinates({ lat, lng });

    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Pin fijo en el centro — el usuario mueve el mapa debajo */}
      <CenterMarker />

      {/* Botón para regresar al sheet de búsqueda */}
      <BackButton />

      {/*
        forceVisible ignora el check de sheetIndex del store.
        En esta pantalla no hay sheet, pero el botón sí tiene sentido
        para que el usuario pueda centrar el mapa en su posición.
      */}
      <LocateButton forceVisible />

      {/* Sheet inferior con instrucciones y botón de confirmación */}
      <SelectSheet
        title="Elige el lugar de destino"
        onConfirm={handleConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
