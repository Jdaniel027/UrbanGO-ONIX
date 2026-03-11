/**
 * select-origin.tsx
 * ──────────────────────────────────────────────────────────────
 * Pantalla para seleccionar el punto de PARTIDA en el mapa.
 *
 * Ruta Expo Router: app/main/(flow)/select-origin.tsx
 * Acceso desde: SearchView → QuickOptions → "Elegir en el mapa"
 *   cuando el input de origen está activo.
 *
 * Cómo funciona:
 *  1. El mapa de fondo (MapViewBase) ya está renderizado en el layout
 *     de /main, así que el usuario lo ve directamente.
 *  2. CenterMarker muestra un pin fijo en el centro de la pantalla.
 *     El usuario arrastra el mapa hasta poner el marcador en su punto.
 *  3. Al presionar "Usar esta ubicación":
 *     a. Obtiene las coordenadas del centro del mapa con la cámara de Mapbox
 *     b. Guarda esas coordenadas en el UIStore
 *     c. Regresa a la pantalla anterior (HomeScreen con el sheet en snap 1)
 *
 * Arquitectura de capas en pantalla:
 *  [ Mapa (del layout de main, siempre activo) ]
 *  [ CenterMarker — pin fijo en el centro ]
 *  [ BackButton — regresa al sheet ]
 *  [ LocateButton forceVisible — centra el mapa en el usuario ]
 *  [ SelectSheet — instrucciones + botón de confirmación ]
 */

import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import Mapbox from "@rnmapbox/maps";
import { useUIStore } from "@/src/store/ui.store";
import { BackButton } from "@/src/components/ui/index";
import {
  CenterMarker,
  LocateButton,
} from "@/src/components/main/flow/Home/index";
import { SelectSheet } from "@/src/components/main/flow/index";

export default function SelectOriginScreen() {
  const router = useRouter();
  const cameraRef = useRef<Mapbox.Camera>(null);
  const setSelectedPoi = useUIStore((state) => state.setSelectedPoi);

  /**
   * handleConfirm — se ejecuta al presionar "Usar esta ubicación"
   * TODO: leer coordenadas del centro del mapa y guardarlas en UIStore
   *       para que SearchView actualice su input de origen.
   */
  const handleConfirm = async () => {
    // const camera = await cameraRef.current?.getCamera();
    // const [lng, lat] = camera?.centerCoordinate ?? [];
    // setOriginLocation({ lat, lng });
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Pin fijo en el centro — el usuario mueve el mapa debajo */}
      <CenterMarker />

      {/* Regresa al sheet de búsqueda */}
      <BackButton />

      {/*
        forceVisible ignora el check de sheetIndex del store.
        En esta pantalla no hay sheet, pero el botón sí tiene sentido
        para que el usuario pueda centrar el mapa en su posición.
      */}
      <LocateButton forceVisible />

      {/* Sheet inferior con instrucciones y botón de confirmación */}
      <SelectSheet
        title="Elige el punto de partida"
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
