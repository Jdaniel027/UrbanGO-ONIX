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
import { MapCamera } from "../camera/Camera";
import { UserLocation } from "../location/UserLocation";
import { RoutesLayer } from "../layers/routes/RoutesLayers";
import { BusLayer } from "../layers/buses/BusLayer";
import { POIsLayer } from "../pois/layers/POIsLayer";
import { POICategory } from "../pois/types/poi.types";
import { POIS } from "../pois/data/poi.data";

// Inicializa Mapbox con el token definido en variables de entorno en el .env
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN!);

export function MapViewBase() {
  // Esta constante define que categorias de POIS se muestran en el mapa
  const visibleCategories: POICategory[] = [
    "test",
    // "shop",
    // "school",
    // "hospital",
    // "restaurant,"
  ];

  return (
    <Mapbox.MapView
      style={StyleSheet.absoluteFill}
      /**
       * Estilo base del mapa.
       * Puede cambiarse por un estilo personalizado de Mapbox Studio.*/
      styleURL="mapbox://styles/joose027/cmkxf0dft00dc01pa44vigkgs"
      /**
       * Deshabilita elementos visuales que no necesitamos
       * para una UI más limpia. */
      scaleBarEnabled={false}
      logoEnabled={false}
      compassEnabled={false}
      attributionEnabled={false}
      /** Habilita vista 3D para futuras animaciones. */
      pitchEnabled={true}
      rotateEnabled={true}
      scrollEnabled={true}
      zoomEnabled={true}
    >
      {/**
       * Registro de imágenes para Mapbox.
       * El nombre ("test") debe coincidir con:
       * properties.icon en los POIs.
       */}
      <Mapbox.Images
        images={{
          test: require("@/assets/images/map/icons/light/poiEjemplo.png"),
        }}
      />
      {/* Capa de POIs */}
      <POIsLayer pois={POIS} visibleCategories={visibleCategories} />
      {/* Cámara inicial del mapa */}
      <MapCamera />
      {/* Ubicación del usuario */}
      <UserLocation />
      {/* Rutas */}
      <RoutesLayer />
      {/* Camiones */}
      <BusLayer />
    </Mapbox.MapView>
  );
}
