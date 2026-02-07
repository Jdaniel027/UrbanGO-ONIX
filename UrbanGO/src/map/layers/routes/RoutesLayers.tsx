import Mapbox from "@rnmapbox/maps";
import { Route } from "@/src/map/routes/types/route.types";
import { useRoutesGeoJSON } from "@/src/map/routes/hooks/useRoutesGeoJSON";
import { ROUTE_STYLES } from "@/src/map/routes/styles/route.styles";

interface RoutesLayerProps {
  routes: Route[];
}

export function RoutesLayer({ routes }: RoutesLayerProps) {
  const geojson = useRoutesGeoJSON(routes);

  if (!geojson.features.length) return null;

  return (
    <Mapbox.ShapeSource id="routes-source" shape={geojson}>
      <Mapbox.LineLayer
        id="routes-line"
        belowLayerID="pois-icons"
        style={{
          lineColor: "#2563eb",
          lineWidth: ["interpolate", ["linear"], ["zoom"], 12, 2, 15, 4, 18, 6],
          lineOpacity: 0.8,
        }}
      />
    </Mapbox.ShapeSource>
  );
}
