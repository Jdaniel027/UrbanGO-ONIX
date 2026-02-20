/**
 * UserLocation
 * -------------
 * Maneja la ubicación en tiempo real del usuario.
 *
 * 🔹 Escucha la ubicación GPS del dispositivo.
 * 🔹 Renderiza el indicador de ubicación del usuario en el mapa.
 * 🔹 Se encarga del seguimiento automático si está habilitado.
 *
 * Responsabilidades:
 * - Solicitar permisos de ubicación
 * - Mostrar la posición actual del usuario
 * - Actualizar la posición en tiempo real
 *
 * Casos de uso:
 * - Centrar el mapa en el usuario
 * - Navegación
 * - Seguimiento de rutas
 *
 * Nota:
 * - Este componente NO decide lógica de navegación.
 * - Solo expone la ubicación al mapa.
 */

import Mapbox from "@rnmapbox/maps";
import { useLocationPermission } from "./useLocationPermission";

export function UserLocation() {
  const { granted } = useLocationPermission();
  if (!granted) return null;

  return (
    <Mapbox.LocationPuck
      visible={true}
      pulsing={{ isEnabled: true, radius: "accuracy" }}
    />
  );
}
