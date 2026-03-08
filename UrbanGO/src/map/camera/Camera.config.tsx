import { useEffect, useRef } from "react";
import Mapbox from "@rnmapbox/maps";
import { useMapMode } from "@/src/map/core/state/MapModeContext";
import { useUIStore } from "@/src/store/ui.store";

/**
 * MapCamera
 *
 * Cámara del mapa. Maneja dos comportamientos:
 *
 * 1. Posición inicial → Guasave, Sinaloa con zoom 12
 * 2. Follow user → cuando followUser está activo en MapModeContext
 * 3. POI seleccionado → cuando el usuario toca un POI en el sheet,
 *    la cámara hace zoom y centra el mapa en ese punto.
 *    Después de moverse resetea selectedPoi a null.
 */
export function MapCamera() {
  const { followUser } = useMapMode();
  const cameraRef = useRef<Mapbox.Camera>(null);

  const selectedPoi = useUIStore((state) => state.selectedPoi);
  const setSelectedPoi = useUIStore((state) => state.setSelectedPoi);

  useEffect(() => {
    if (!selectedPoi) return;

    // Mueve la cámara al POI con animación suave
    cameraRef.current?.setCamera({
      centerCoordinate: [selectedPoi.lng, selectedPoi.lat],
      zoomLevel: 16,
      animationDuration: 800,
      animationMode: "flyTo",
    });

    // Resetea para no repetir el movimiento si el componente re-renderiza
    setSelectedPoi(null);
  }, [selectedPoi]);

  return (
    <Mapbox.Camera
      ref={cameraRef}
      /**
       * Nivel de zoom inicial
       * Valores comunes:
       * - 10–12: vista ciudad
       * - 13–15: calles
       * - 16+: navegación precisa
       */
      zoomLevel={12}
      /** Zoom mimnimo que se puede hacer */
      minZoomLevel={11}
      /** Zoom maximo que se puede hacer */
      maxZoomLevel={18}
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
      // Configuraciones de la ubicacion del usuario
      followUserLocation={followUser}
      followUserMode={Mapbox.UserTrackingMode.Follow}
      followZoomLevel={16}
    />
  );
}
