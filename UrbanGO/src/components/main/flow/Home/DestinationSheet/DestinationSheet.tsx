/**
 * DestinationSheet.tsx
 * ──────────────────────────────────────────────────────────────
 * Sheet principal de la pantalla de inicio. Es el componente
 * orquestador del flujo de búsqueda de destino.
 *
 * Estructura visual:
 *  - Snap 0 (30%) → HomeView: vista de inicio con el input falso
 *  - Snap 1 (90%) → SearchView: búsqueda con inputs reales y POIs
 *
 * Arquitectura de contenido:
 *  BottomSheetView (contenedor fijo, flex:1)
 *    ├── HomeView     (absoluteFill, se desvanece al subir)
 *    └── SearchView   (flex:1)
 *          ├── Título + inputs + opciones  → contenido fijo
 *          └── BottomSheetScrollView       → solo los POIs scrollean
 *
 * Por qué BottomSheetView y no BottomSheetScrollView como raíz:
 *  Con BottomSheetScrollView como raíz, TODO el contenido scrolleaba.
 *  Al usar BottomSheetView + ScrollView solo en los POIs, el contenido
 *  superior (inputs, opciones) queda fijo y solo la lista scrollea.
 *
 * Animaciones:
 *  - animatedIndex (SharedValue) se comparte via UIStore para que
 *    otros componentes (overlay del mapa) se sincronicen.
 *  - HomeView: opacidad 1→0 en el primer 30% del movimiento
 *  - SearchView: opacidad 0→1 en el último 50% del movimiento
 *
 * Teclado:
 *  Al bajar al snap 0 se llama Keyboard.dismiss() para que
 *  el teclado no quede flotando sobre el mapa.
 */

import { useRef, useState, useCallback } from "react";
import { StyleSheet, Keyboard } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { useUIStore } from "@/src/store/ui.store";
import HomeView from "./HomeView";
import SearchView from "./SearchView";
import { sheetStyles } from "./styles";

export default function DestinationSheet() {
  const sheetRef = useRef<BottomSheet>(null);

  // Los dos snaps del sheet: compacto (30%) y expandido (90%)
  const snapPoints = ["30%", "90%"];

  // Índice local para controlar pointerEvents de HomeView/SearchView
  const [snapIndex, setSnapIndex] = useState(0);

  // Store global — sheetIndex para visibilidad de botones,
  // animatedIndex para animaciones sincronizadas con el mapa
  const setSheetIndex = useUIStore((state) => state.setSheetIndex);
  const animatedIndex = useUIStore((state) => state.animatedIndex);

  /**
   * Se ejecuta cada vez que el sheet cambia de snap.
   * Actualiza tanto el estado local como el store global.
   * También cierra el teclado al bajar al snap 0.
   */
  const handleSheetChange = useCallback((index: number) => {
    setSnapIndex(index);
    setSheetIndex(index);
    if (index === 0) Keyboard.dismiss();
  }, []);

  const handleOpenSearch = () => sheetRef.current?.snapToIndex(1);
  const handleConfirmLocation = () => console.log("Ubicación confirmada");

  /**
   * HomeView: visible en snap 0, se desvanece rápido al subir.
   * Se desvanece en el primer 30% del recorrido para dar paso a SearchView.
   * pointerEvents "none" cuando está invisible para no interceptar toques.
   */
  const homeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.3],
      [1, 0],
      Extrapolation.CLAMP,
    ),
    pointerEvents: snapIndex === 0 ? "auto" : "none",
  }));

  /**
   * SearchView: invisible en snap 0, aparece al llegar a snap 1.
   * Empieza a aparecer en el 50% del recorrido para no solaparse con HomeView.
   */
  const searchAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0.5, 1],
      [0, 1],
      Extrapolation.CLAMP,
    ),
    pointerEvents: snapIndex === 1 ? "auto" : "none",
  }));

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      handleIndicatorStyle={sheetStyles.handle}
      backgroundStyle={sheetStyles.sheetBackground}
      onChange={handleSheetChange}
      animatedIndex={animatedIndex} // conecta el SharedValue del store
      enablePanDownToClose={false} // el sheet no se puede cerrar con swipe
      enableOverDrag={false} // no se puede arrastrar más allá del 90%
      enableDynamicSizing={false} // tamaño fijo por snapPoints
    >
      {/*
        BottomSheetView como contenedor raíz.
        flex:1 es necesario para que SearchView pueda calcular
        el espacio disponible para su ScrollView interno.
      */}
      <BottomSheetView style={styles.container}>
        {/* Vista de inicio — visible solo en snap 0 */}
        <HomeView
          animatedStyle={homeAnimatedStyle}
          onOpenSearch={handleOpenSearch}
          onConfirmLocation={handleConfirmLocation}
        />

        {/* Vista de búsqueda — visible solo en snap 1 */}
        <SearchView
          animatedStyle={searchAnimatedStyle}
          ScrollViewComponent={BottomSheetScrollView}
          onClose={() => sheetRef.current?.snapToIndex(0)}
          isVisible={snapIndex === 1}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // necesario para que SearchView calcule su altura disponible
  },
});
