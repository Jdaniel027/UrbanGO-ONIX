/**
 * RoutesLayer
 * ------------
 * Capa encargada de dibujar rutas sobre el mapa.
 *
 * 🔹 Renderiza líneas (polylines) usando coordenadas GeoJSON.
 * 🔹 Representa rutas de camiones, recorridos o trayectos.
 *
 * Responsabilidades:
 * - Dibujar rutas sobre el mapa
 * - Aplicar estilos visuales a las rutas
 * - Manejar múltiples rutas si es necesario
 *
 * Ejemplos de uso:
 * - Ruta de un camión
 * - Ruta sugerida
 * - Recorrido completo de una línea
 *
 * Nota:
 * - No obtiene datos por sí sola.
 * - Recibe las coordenadas desde servicios o estado global.
 */

import Mapbox from "@rnmapbox/maps";

export function RoutesLayer() {
  return (
    <Mapbox.ShapeSource
      id="routes"
      shape={{
        type: "FeatureCollection",
        features: [],
      }}
    >
      <Mapbox.LineLayer
        id="routes-line"
        style={{
          lineColor: "#2563eb",
          lineWidth: 4,
        }}
      />
    </Mapbox.ShapeSource>
  );
}
