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
import { POIS } from "../data/pois.data";
import { POIS_STYLE } from "../styles/pois.styles";
import { POICategory } from "../types/poi.types";

interface POIsLayerProps {
  /** Categorías visibles definidas por la UI */
  visibleCategories: POICategory[];
}

export function POIsLayer({ visibleCategories }: POIsLayerProps) {
  return (
    /**
     * ShapeSource:
     * Fuente de datos geoespaciales para Mapbox.
     * Aquí convertimos nuestros POIs a GeoJSON. */
    <Mapbox.ShapeSource
      id="pois-source"
      shape={{
        type: "FeatureCollection",
        features: POIS.map((poi) => ({
          type: "Feature",
          /**
           * Properties:
           * Información adicional que puede usarse
           * para estilos dinámicos. */
          properties: {
            icon: poi.category, // Coincide con el nombre del icono registrado
            category: poi.category,
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
      {/**
       * SymbolLayer:
       * Capa visual que renderiza iconos.
       */}
      {visibleCategories.map((category) => (
        <Mapbox.SymbolLayer
          key={category}
          id={`pois-${category}`}
          minZoomLevel={POIS_STYLE.minZoom}
          filter={["==", ["get", "category"], category]}
          style={{
            iconImage: category,
            iconSize: POIS_STYLE.iconSize,
            iconAllowOverlap: POIS_STYLE.iconAllowOverlap,
          }}
        />
      ))}
    </Mapbox.ShapeSource>
  );
}
