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

/**
 * VehicleLayer
 * --------------------------------
 * Capa encargada de renderizar los vehículos (camiones)
 * en tiempo real sobre el mapa.
 *
 * Responsabilidades:
 * 🔹 Convertir vehículos a GeoJSON
 * 🔹 Renderizar íconos rotables (bearing)
 *
 * ❌ No obtiene datos
 * ❌ No maneja sockets
 */

import Mapbox from "@rnmapbox/maps";
import { VehiclePosition } from "../../vehicle/types/types";

interface VehicleLayerProps {
  vehicles: VehiclePosition[];
}

export function VehicleLayer({ vehicles }: VehicleLayerProps) {
  return (
    <Mapbox.ShapeSource
      id="vehicles-source"
      shape={{
        type: "FeatureCollection",
        features: vehicles.map((vehicle) => ({
          type: "Feature",
          properties: {
            id: vehicle.id,
            bearing: vehicle.bearing ?? 0,
          },
          geometry: {
            type: "Point",
            coordinates: [vehicle.longitude, vehicle.latitude],
          },
        })),
      }}
    >
      <Mapbox.SymbolLayer
        id="vehicles-layer"
        minZoomLevel={13}
        style={{
          iconImage: "bus", // nombre registrado en <Mapbox.Images />
          iconSize: 0.9,
          iconRotate: ["get", "bearing"],
          iconRotationAlignment: "map",
          iconAllowOverlap: true,
          iconIgnorePlacement: true,
          symbolSortKey: 100,
        }}
      />
    </Mapbox.ShapeSource>
  );
}
