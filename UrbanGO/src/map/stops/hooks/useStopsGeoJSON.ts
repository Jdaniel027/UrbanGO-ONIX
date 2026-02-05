/**
 * useStopsGeoJSON
 * --------------------------------
 * Hook encargado de transformar un arreglo de paradas (Stop[])
 * en un GeoJSON compatible con Mapbox.
 *
 * Este hook:
 * ✅ Convierte datos de dominio a formato geoespacial
 * ✅ Mantiene la lógica separada del renderizado
 * ✅ Optimiza rendimiento usando useMemo
 *
 * ❌ NO renderiza
 * ❌ NO aplica estilos
 * ❌ NO conoce Mapbox directamente
 */

import { useMemo } from "react";
import { FeatureCollection, Point } from "geojson";
import { Stop } from "../types/types";

export function useStopsGeoJSON(stops: Stop[]): FeatureCollection<Point> {
  return useMemo(
    () => ({
      /**
       * FeatureCollection
       * --------------------------------
       * Estructura estándar de GeoJSON
       * requerida por Mapbox.
       */
      type: "FeatureCollection",
      /**
       * Cada parada se convierte en un Feature
       */
      features: stops.map((stop) => ({
        type: "Feature",
        /**
         * Geometry
         * --------------------------------
         * Define la ubicación geográfica del punto.
         *
         * ⚠️ IMPORTANTE:
         * GeoJSON SIEMPRE usa:
         * [longitud, latitud]
         */
        geometry: {
          type: "Point",
          coordinates: stop.coordinates,
        },
        /**
         * Properties
         * --------------------------------
         * Información adicional asociada al punto.
         *
         * Estas propiedades pueden usarse para:
         * - Filtros
         * - Estilos dinámicos
         * - Identificación de elementos
         */
        properties: {
          id: stop.id,
          name: stop.name,
          category: stop.category,
        },
      })),
    }),
    /**
     * useMemo:
     * El GeoJSON solo se recalcula
     * cuando cambian las paradas.
     */
    [stops],
  );
}
