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

/**
 * DestinationSheet
 *
 * Snap 0 (32%) → HomeView
 * Snap 1 (90%) → SearchView
 *
 * Arquitectura de scroll:
 *   BottomSheetView (flex:1, contenedor fijo)
 *     ├── HomeView (absoluteFill, fade out al subir)
 *     └── SearchView (flex:1)
 *           ├── título + inputs + opciones → fijos, no scrollean
 *           └── BottomSheetScrollView     → solo los POIs scrollean
 */
export default function DestinationSheet() {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["32%", "90%"];
  const [snapIndex, setSnapIndex] = useState(0);

  const setSheetIndex = useUIStore((state) => state.setSheetIndex);
  const animatedIndex = useUIStore((state) => state.animatedIndex);

  const handleSheetChange = useCallback((index: number) => {
    setSnapIndex(index);
    setSheetIndex(index);
    if (index === 0) Keyboard.dismiss();
  }, []);

  const handleOpenSearch = () => sheetRef.current?.snapToIndex(1);
  const handleConfirmLocation = () => console.log("Ubicación confirmada");

  const homeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.3],
      [1, 0],
      Extrapolation.CLAMP,
    ),
    pointerEvents: snapIndex === 0 ? "auto" : "none",
  }));

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
      animatedIndex={animatedIndex}
      enablePanDownToClose={false}
      enableOverDrag={false}
      enableDynamicSizing={false}
    >
      <BottomSheetView style={styles.container}>
        <HomeView
          animatedStyle={homeAnimatedStyle}
          onOpenSearch={handleOpenSearch}
          onConfirmLocation={handleConfirmLocation}
        />
        <SearchView
          animatedStyle={searchAnimatedStyle}
          ScrollViewComponent={BottomSheetScrollView}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
