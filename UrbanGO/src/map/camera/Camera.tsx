/**
 * camera
 * ----------
 * Contiene la configuración de la cámara inicial del mapa.
 *
 * 🔹 Centraliza los valores de cámara para facilitar mantenimiento.
 * 🔹 Permite reutilizar o modificar fácilmente el punto inicial.
 * 🔹 Evita valores "hardcodeados" dentro de componentes visuales.
 *
 * Nota:
 * - Las coordenadas están en formato [longitud, latitud]
 * - El pitch controla la inclinación del mapa (3D)
 */

import Mapbox from "@rnmapbox/maps";

export function MapCamera() {
  return (
    <Mapbox.Camera
      /**
       * Nivel de zoom inicial
       * Valores comunes:
       * - 10–12: vista ciudad
       * - 13–15: calles
       * - 16+: navegación precisa
       */
      zoomLevel={13}
      /**
       * Coordenadas iniciales del mapa
       * Guasave, Sinaloa */
      centerCoordinate={[-108.468, 25.5674]}
      /**
       * Inclinación del mapa (3D)
       * 0   = vista plana
       * +45 = efecto 3D */
      pitch={0}
      /** Animación suave al cargar el mapa */
      animationDuration={1000}
    />
  );
}
