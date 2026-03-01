import { create } from "zustand";
import { makeMutable, SharedValue } from "react-native-reanimated";

/**
 * ui.store
 *
 * Store global para estado de UI compartido entre componentes.
 *
 * sheetIndex   → índice actual del sheet (0 = home, 1 = search).
 *                Usado por MenuButton y LocateButton para ocultarse.
 *
 * animatedIndex → SharedValue de Reanimated que @gorhom/bottom-sheet
 *                 actualiza en tiempo real durante la animación (0→1).
 *                 Usado por HomeScreen para animar el overlay del mapa.
 */

type UIStore = {
  sheetIndex: number;
  setSheetIndex: (index: number) => void;
  animatedIndex: SharedValue<number>;
};

export const useUIStore = create<UIStore>(() => ({
  sheetIndex: 0,
  setSheetIndex: (index) => useUIStore.setState({ sheetIndex: index }),
  // makeMutable crea un SharedValue fuera de un componente
  animatedIndex: makeMutable(0),
}));
