/**
 * Camera.config.tsx
 * ──────────────────────────────────────────────────────────────
 * Configuración y comportamiento de la cámara del mapa (Mapbox).
 *
 * Este componente se encarga de MOVER la cámara en respuesta a
 * eventos del usuario. Toda la lógica de movimiento vive aquí,
 * no en los componentes que disparan la acción.
 *
 * Comportamientos que maneja:
 *
 *  1. Posición inicial
 *     Al montar el mapa, centra la cámara en Guasave, Sinaloa con zoom 12.
 *
 *  2. Follow user
 *     Cuando followUser está activo en MapModeContext, la cámara sigue
 *     al usuario en tiempo real con zoom 16.
 *
 *  3. POI seleccionado (selectedPoi en UIStore)
 *     Cuando el usuario toca un POI en el DestinationSheet, SearchView
 *     guarda las coordenadas en el store. Este componente detecta el
 *     cambio y vuela la cámara al POI con animación "flyTo".
 *
 *  4. Localizar usuario (locateUser en UIStore)
 *     Cuando el usuario presiona el LocateButton, este componente
 *     solicita el GPS, obtiene las coordenadas actuales y vuela
 *     la cámara a esa posición.
 */

import { useEffect, useRef } from "react";
import Mapbox from "@rnmapbox/maps";
import { useMapMode } from "@/src/map/core/state/MapModeContext";
import { useUIStore } from "@/src/store/ui.store";
import * as Location from "expo-location";

export function MapCamera() {
  const { followUser } = useMapMode();

  // Referencia directa al componente Camera de Mapbox
  // para poder llamar setCamera() de forma imperativa
  const cameraRef = useRef<Mapbox.Camera>(null);

  // Suscripción a los valores del store que disparan movimientos de cámara
  const selectedPoi = useUIStore((state) => state.selectedPoi);
  const setSelectedPoi = useUIStore((state) => state.setSelectedPoi);
  const locateUser = useUIStore((state) => state.locateUser);
  const setLocateUser = useUIStore((state) => state.setLocateUser);

  // ── Comportamiento 3: volar a POI seleccionado ─────────────
  useEffect(() => {
    // Solo ejecutar cuando hay un POI pendiente
    if (!selectedPoi) return;

    cameraRef.current?.setCamera({
      centerCoordinate: [selectedPoi.lng, selectedPoi.lat], // Mapbox usa [lng, lat]
      zoomLevel: 16,
      animationDuration: 800,
      animationMode: "flyTo", // animación suave tipo "vuelo"
    });

    // Resetear para no volver a ejecutar si el componente re-renderiza
    setSelectedPoi(null);
  }, [selectedPoi]);

  // ── Comportamiento 4: volar a la ubicación del usuario ─────
  useEffect(() => {
    // Solo ejecutar cuando el botón de localizar fue presionado
    if (!locateUser) return;

    (async () => {
      // Solicitar permiso de ubicación si aún no se tiene
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // Si el usuario niega el permiso, simplemente cancelamos
        setLocateUser(false);
        return;
      }

      // Obtener posición actual con alta precisión
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      cameraRef.current?.setCamera({
        centerCoordinate: [location.coords.longitude, location.coords.latitude],
        zoomLevel: 16,
        animationDuration: 800,
        animationMode: "flyTo",
      });

      // Resetear el flag para que no se ejecute de nuevo
      setLocateUser(false);
    })();
  }, [locateUser]);

  return (
    <Mapbox.Camera
      ref={cameraRef}
      // ── Posición y zoom inicial ──────────────────────────
      zoomLevel={12}
      minZoomLevel={11} // el usuario no puede alejar más de zoom 11
      maxZoomLevel={18} // el usuario no puede acercar más de zoom 18
      centerCoordinate={[-108.468, 25.5674]} // Guasave, Sinaloa [lng, lat]
      pitch={0} // sin inclinación 3D al inicio
      animationDuration={1000}
      // ── Follow user ──────────────────────────────────────
      // Cuando está activo, Mapbox maneja el movimiento internamente
      followUserLocation={followUser}
      followUserMode={Mapbox.UserTrackingMode.Follow}
      followZoomLevel={16}
    />
  );
}
