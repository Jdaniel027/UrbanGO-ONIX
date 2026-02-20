import { createContext, useContext, useState, ReactNode } from "react";
import { MapMode } from "../mapMode.types";

interface MapModeContextValue {
  mapMode: MapMode;
  setMapMode: (mode: MapMode) => void;

  // flag para seguimiento de usuario
  followUser: boolean;
  setFollowUser: (value: boolean) => void;
}

const MapModeContext = createContext<MapModeContextValue | null>(null);

export function MapModeProvider({ children }: { children: ReactNode }) {
  const [mapMode, setMapMode] = useState<MapMode>("SELECT_POINTS");
  const [followUser, setFollowUser] = useState(false); // inicial sin seguimiento

  return (
    <MapModeContext.Provider
      value={{ mapMode, setMapMode, followUser, setFollowUser }}
    >
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
