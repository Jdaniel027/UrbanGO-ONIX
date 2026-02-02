import { MapMode } from "./mapMode.types";

export interface MapConfig {
  showPois: boolean;
  showStops: "ALL" | "ROUTE_ONLY" | "NONE";
  showRoutes: "NONE" | "MULTIPLE" | "SINGLE";
  showVehicles: boolean;
}

export const MAP_CONFIG_BY_MODE: Record<MapMode, MapConfig> = {
  SELECT_POINTS: {
    showPois: true,
    showStops: "ALL",
    showRoutes: "NONE",
    showVehicles: false,
  },

  ROUTE_SUGGESTION: {
    showPois: true,
    showStops: "ROUTE_ONLY",
    showRoutes: "MULTIPLE",
    showVehicles: true,
  },

  ROUTE_TRACKING: {
    showPois: true,
    showStops: "ROUTE_ONLY",
    showRoutes: "SINGLE",
    showVehicles: true,
  },

  ROUTE_EXPLORER: {
    showPois: true,
    showStops: "ALL",
    showRoutes: "SINGLE",
    showVehicles: true,
  },
};
