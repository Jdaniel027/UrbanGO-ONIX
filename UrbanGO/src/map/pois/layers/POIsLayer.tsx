/**
 * POIs Layer
 * --------------------------------
 * Capa de Mapbox encargada de renderizar los POIs
 * sobre el mapa.
 *
 * - Convierte los datos de POIs a formato GeoJSON
 * - Define cómo y cuándo se muestran
 * - Centraliza la lógica de renderizado
 *
 * No debe contener datos duros ni estilos específicos,
 * solo la conexión entre Mapbox y la información.
 */

import Mapbox from "@rnmapbox/maps";
import { POIS } from "../data/pois.data";
import { POIS_STYLE } from "../styles/pois.styles";

export function POIsLayer() {
  return (
    <Mapbox.ShapeSource
      id="pois-source"
      shape={{
        type: "FeatureCollection",
        features: POIS.map((poi) => ({
          type: "Feature",
          properties: {
            icon: poi.category,
          },
          geometry: {
            type: "Point",
            coordinates: poi.coordinates,
          },
        })),
      }}
    >
      <Mapbox.SymbolLayer
        id="pois-layer"
        style={{
          iconImage: ["get", "icon"],
          iconSize: POIS_STYLE.iconSize,
          iconAllowOverlap: POIS_STYLE.iconAllowOverlap,
        }}
      />
    </Mapbox.ShapeSource>
  );
}
