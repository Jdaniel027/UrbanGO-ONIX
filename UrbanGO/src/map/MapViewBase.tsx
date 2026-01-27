/**
 * MapViewBase
 * -------------
 * Este componente representa el MAPA PRINCIPAL de la aplicación.
 *
 * 🔹 Se renderiza UNA SOLA VEZ dentro del layout de /main.
 * 🔹 Permanece vivo mientras el usuario navega entre pantallas del flujo principal.
 * 🔹 Todas las pantallas se renderizan POR ENCIMA del mapa.
 *
 * Responsabilidades:
 * - Inicializar Mapbox con el access token
 * - Renderizar el MapView base
 * - Aplicar configuraciones globales del mapa (estilo, UI, 3D, controles)
 * - Definir la cámara inicial (posición, zoom, pitch)
 *
 * ❗ NO debe contener lógica de negocio ni datos dinámicos
 * ❗ Rutas, marcadores, camiones, etc. se agregan en componentes separados
 *
 * Las capas del mapa (ubicación, rutas, buses, eventos)
 * se agregan mediante componentes separados.
 */

import Mapbox from "@rnmapbox/maps";
import { StyleSheet } from "react-native";
import { MapCamera } from "./Camera";
import { UserLocation } from "./UserLocation";
import { RoutesLayer } from "./RoutesLayers";
import { BusLayer } from "./BusLayer";

// Inicializa Mapbox con el token definido en variables de entorno en el .env
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN!);

export function MapViewBase() {
  return (
    <Mapbox.MapView
      style={StyleSheet.absoluteFill}
      /**
       * Estilo base del mapa.
       * Puede cambiarse por un estilo personalizado de Mapbox Studio.*/
      styleURL={Mapbox.StyleURL.Street}
      /**
       * Deshabilita elementos visuales que no necesitamos
       * para una UI más limpia. */
      scaleBarEnabled={false}
      logoEnabled={false}
      compassEnabled={false}
      /** Habilita vista 3D para futuras animaciones. */
      pitchEnabled={true}
      rotateEnabled={true}
      scrollEnabled={true}
      zoomEnabled={true}
    >
      {/* Cámara inicial del mapa */}
      <MapCamera />
      <UserLocation />
      <RoutesLayer />
      <BusLayer />
    </Mapbox.MapView>
  );
}
