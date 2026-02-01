/**
 * POIs Layer
 * --------------------------------
 * Capa de Mapbox encargada de renderizar los POIs
 * sobre el mapa.
 *
 * Responsabilidades:
 * 🔹 Convertir POIs a formato GeoJSON
 * 🔹 Definir cómo se dibujan en el mapa
 *
 * ❌ No debe contener datos duros
 * ❌ No debe contener lógica de negocio
 */

import Mapbox from "@rnmapbox/maps";
import { POIS_STYLE } from "../../pois/styles/poi.styles";
import { POI, POICategory } from "../../pois/types/poi.types";

interface POIsLayerProps {
  /** Lista de POIs ya procesados */
  pois: POI[];

  /** Categorías visibles definidas por la UI */
  visibleCategories: POICategory[];
}

export function POIsLayer({ pois, visibleCategories }: POIsLayerProps) {
  return (
    /**
     * ShapeSource:
     * Fuente de datos geoespaciales para Mapbox.
     * Aquí convertimos nuestros POIs a GeoJSON. */
    <Mapbox.ShapeSource
      id="pois-source"
      shape={{
        type: "FeatureCollection",
        features: pois.map((poi) => ({
          type: "Feature",
          /**
           * Properties:
           * Información adicional que puede usarse
           * para estilos dinámicos. */
          properties: {
            id: poi.id,
            name: poi.name,
            icon: poi.category,
            category: poi.category,
            importance: poi.importance,
          },
          /**
           * Geometry:
           * Define la forma que se dibuja en el mapa. */
          geometry: {
            type: "Point",
            coordinates: poi.coordinates,
          },
        })),
      }}
    >
      <Mapbox.SymbolLayer
        id="pois-icons"
        filter={[
          "all",
          ["in", ["get", "category"], ["literal", visibleCategories]],
          [
            "any",
            [
              "all",
              ["==", ["get", "importance"], "high"],
              [">=", ["zoom"], 13],
            ],
            [
              "all",
              ["==", ["get", "importance"], "medium"],
              [">=", ["zoom"], 15],
            ],
            ["all", ["==", ["get", "importance"], "low"], [">=", ["zoom"], 17]],
          ],
        ]}
        style={{
          iconImage: ["get", "category"],
          iconSize: POIS_STYLE.iconSize,
          iconAllowOverlap: false,
          iconIgnorePlacement: false,
          iconPadding: 4,
        }}
      />

      <Mapbox.SymbolLayer
        id="pois-labels"
        minZoomLevel={16}
        style={{
          textField: ["get", "name"],
          textSize: 12,
          textOffset: [0, 1.3],
          textAnchor: "top",
          textOptional: true,
        }}
      />
    </Mapbox.ShapeSource>
  );
}
