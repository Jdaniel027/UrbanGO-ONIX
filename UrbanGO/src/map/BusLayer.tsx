/**
 * BusLayer
 * ---------
 * Capa encargada de renderizar camiones/vehículos en el mapa.
 *
 * 🔹 Representa visualmente cada camión activo.
 * 🔹 Puede mostrar íconos, rotación y animaciones.
 *
 * Responsabilidades:
 * - Renderizar marcadores de camiones
 * - Actualizar posición en tiempo real
 * - Manejar rotación según dirección del vehículo
 *
 * Ejemplos:
 * - Mostrar camiones en movimiento
 * - Actualizar posición cada X segundos
 *
 * Nota:
 * - No gestiona sockets ni polling.
 * - Solo representa datos que recibe.
 */

import Mapbox from "@rnmapbox/maps";

export function BusLayer() {
  return (
    <Mapbox.ShapeSource
      id="buses"
      shape={{
        type: "FeatureCollection",
        features: [],
      }}
    >
      <Mapbox.SymbolLayer
        id="bus-icons"
        style={{
          iconImage: "bus-icon",
          iconAllowOverlap: true,
          iconRotate: ["get", "bearing"],
        }}
      />
    </Mapbox.ShapeSource>
  );
}
