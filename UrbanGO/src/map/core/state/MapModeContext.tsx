import { createContext, useContext, useState, ReactNode } from "react";
import { MapMode } from "../mapMode.types";

interface MapModeContextValue {
  mapMode: MapMode;
  setMapMode: (mode: MapMode) => void;
}

const MapModeContext = createContext<MapModeContextValue | null>(null);

export function MapModeProvider({ children }: { children: ReactNode }) {
  const [mapMode, setMapMode] = useState<MapMode>("SELECT_POINTS");

  return (
    <MapModeContext.Provider value={{ mapMode, setMapMode }}>
      {children}
    </MapModeContext.Provider>
  );
}

export function useMapMode() {
  const context = useContext(MapModeContext);
  if (!context) {
    throw new Error("useMapMode debe usarse dentro de MapModeProvider");
  }
  return context;
}
