import { create } from "zustand";
import { makeMutable, SharedValue } from "react-native-reanimated";

type PoiLocation = {
  lat: number;
  lng: number;
  name: string;
};

type UIStore = {
  sheetIndex: number;
  setSheetIndex: (index: number) => void;
  animatedIndex: SharedValue<number>;

  /**
   * selectedPoi: coordenadas del POI seleccionado desde el sheet.
   * MapCamera observa este valor y mueve la cámara al cambiar.
   * Se resetea a null después de que la cámara se mueve.
   */
  selectedPoi: PoiLocation | null;
  setSelectedPoi: (poi: PoiLocation | null) => void;
};

export const useUIStore = create<UIStore>(() => ({
  sheetIndex: 0,
  setSheetIndex: (index) => useUIStore.setState({ sheetIndex: index }),
  animatedIndex: makeMutable(0),
  selectedPoi: null,
  setSelectedPoi: (poi) => useUIStore.setState({ selectedPoi: poi }),
}));
