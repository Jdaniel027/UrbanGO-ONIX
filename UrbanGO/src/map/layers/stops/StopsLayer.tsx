/**
 * StopsLayer
 * --------------------------------
 * Capa de Mapbox encargada de renderizar las PARADAS de transporte
 * sobre el mapa.
 *
 * Funcionalidades principales:
 * - Renderiza paradas individuales
 * - Agrupa paradas cercanas mediante CLUSTERING
 * - Muestra un contador cuando hay múltiples paradas en una zona
 *
 * Este componente:
 * ✅ SOLO se encarga del renderizado
 * ❌ NO obtiene datos
 * ❌ NO conoce backend ni ciudades
 * ❌ NO transforma datos manualmente
 */

import Mapbox from "@rnmapbox/maps";
import { stopsMock } from "../../stops/data/stops.mock";
import { useStopsGeoJSON } from "../../stops/hooks/useStopsGeoJSON";

export function StopsLayer() {
  /**
   * Convertimos las paradas (Stop[])
   * a un FeatureCollection<Point> compatible con Mapbox.
   *
   * Esta transformación se hace en un hook separado
   * para mantener este componente limpio.
   */
  const geojson = useStopsGeoJSON(stopsMock);

  /**
   * Si no hay paradas, no renderizamos la capa.
   * Evita renders innecesarios y errores de Mapbox.
   */
  if (!geojson.features.length) return null;

  return (
    /**
     * ShapeSource
     * --------------------------------
     * Fuente de datos geoespaciales para Mapbox.
     *
     * - Recibe el GeoJSON completo
     * - Activa clustering automáticamente
     */
    <Mapbox.ShapeSource
      id="stops-source"
      shape={geojson}
      cluster
      clusterRadius={50}
      clusterMaxZoomLevel={14}
    >
      {/**
       * CLUSTERS
       * --------------------------------
       * Se renderizan cuando hay MÁS DE UNA parada
       * muy cercana entre sí.
       *
       * Mapbox crea automáticamente la propiedad:
       * - point_count
       */}
      <Mapbox.CircleLayer
        id="stops-clusters"
        // Zoom minimo del que se ve el curcle
        minZoomLevel={12}
        filter={["has", "point_count"]}
        style={{
          // Tamaño del círculo del cluster
          circleRadius: 12,
          // Color del cluster
          circleColor: "#1C6ED5",
        }}
      />

      {/**
       * CONTADOR DE CLUSTERS
       * --------------------------------
       * Muestra el número de paradas
       * dentro del cluster.
       */}
      <Mapbox.SymbolLayer
        id="stops-cluster-count"
        minZoomLevel={12}
        filter={["has", "point_count"]}
        style={{
          // Texto dinámico generado por Mapbox
          textField: ["get", "point_count"],
          textSize: 10,
          textColor: "#ffffff",
          iconIgnorePlacement: true,
          textIgnorePlacement: true,
        }}
      />

      {/**
       * PARADAS INDIVIDUALES
       * --------------------------------
       * Se renderizan cuando:
       * - No es un cluster
       * - El zoom es suficiente
       */}
      <Mapbox.SymbolLayer
        id="stops-point"
        filter={["!", ["has", "point_count"]]}
        minZoomLevel={12}
        /**
         * iconImage:
         * Debe coincidir con una imagen registrada
         * previamente en <Mapbox.Images />
         */
        style={{
          iconImage: "stop",
          // Tamaño del icono
          iconSize: 0.6,
          // Permite superposición si es necesario
          iconAllowOverlap: true,
          iconPadding: 0,
          textPadding: 0,
        }}
      />
    </Mapbox.ShapeSource>
  );
}
