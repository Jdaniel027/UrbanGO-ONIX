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

  selectedPoi: PoiLocation | null;
  setSelectedPoi: (poi: PoiLocation | null) => void;

  /**
   * locateUser: cuando se pone en true la cámara vuela
   * a la ubicación del usuario. MapCamera lo resetea a false
   * después de ejecutar el movimiento.
   */
  locateUser: boolean;
  setLocateUser: (value: boolean) => void;
};

export const useUIStore = create<UIStore>(() => ({
  sheetIndex: 0,
  setSheetIndex: (index) => useUIStore.setState({ sheetIndex: index }),
  animatedIndex: makeMutable(0),
  selectedPoi: null,
  setSelectedPoi: (poi) => useUIStore.setState({ selectedPoi: poi }),
  locateUser: false,
  setLocateUser: (value) => useUIStore.setState({ locateUser: value }),
}));
