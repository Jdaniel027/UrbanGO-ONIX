import { useMemo } from "react";
import { FeatureCollection, LineString } from "geojson";
import { Route } from "../types/route.types";

export function useRoutesGeoJSON(
  routes: Route[],
): FeatureCollection<LineString> {
  return useMemo(
    () => ({
      type: "FeatureCollection",
      features: routes.map((route) => ({
        type: "Feature",
        properties: {
          id: route.id,
          type: route.type,
        },
        geometry: {
          type: "LineString",
          coordinates: route.coordinates,
        },
      })),
    }),
    [routes],
  );
}
