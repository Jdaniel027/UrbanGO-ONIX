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
import { POIS_STYLE } from "@/src/map/pois/styles/poi.styles";
import { POI, POICategory } from "@/src/map/pois/types/poi.types";
import { POI_COLORS } from "@/src/map/styles/mapStyles";

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
        minZoomLevel={16} // aquí controlas cuándo aparecen
        style={{
          textFont: ["Open Sans Semibold", "Arial Unicode MS Bold"],
          textField: ["get", "name"],
          textSize: 12,

          // 👇 COLOR DINÁMICO
          textColor: [
            "match",
            ["get", "category"],
            "restaurant",
            "#F2A900",
            "hospital",
            "#1C6ED5",
            "school",
            "#2E8B57",
            "shop",
            "#F2A900",
            "#1A1A1A", // default
          ],

          textHaloColor: "#FFFFFF",
          textHaloWidth: 1,
          textHaloBlur: 0.5,

          textAnchor: "top",
          textOffset: [0, 1.2],
          textAllowOverlap: false,
          textIgnorePlacement: true,
        }}
      />
    </Mapbox.ShapeSource>
  );
}
