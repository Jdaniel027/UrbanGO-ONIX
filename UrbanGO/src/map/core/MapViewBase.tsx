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
import { VehicleLayer } from "../layers/vehicle/VehicleLayer";
import { POIsLayer } from "../layers/pois/POIsLayer";
import { POICategory } from "../pois/types/poi.types";
import { POIS } from "../pois/data/poi.data";
import { StopsLayer } from "../layers/stops/StopsLayer";
import { mockVehicles } from "../vehicle/data/vehicle.mock";

// Inicializa Mapbox con el token definido en variables de entorno en el .env
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN!);

export function MapViewBase() {
  // Esta constante define que categorias de POIS se muestran en el mapa
  const visibleCategories: POICategory[] = [
    "restaurant",
    "hospital",
    "school",
    "shop",
    "stop",
  ];

  return (
    <Mapbox.MapView
      style={StyleSheet.absoluteFill}
      /**
       * Estilo base del mapa.
       * Puede cambiarse por un estilo personalizado de Mapbox Studio.*/
      styleURL="mapbox://styles/joose027/cml45nfc3000s01r86i4i5823"
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
          // test: require("@/assets/images/map/icons/light/poiEjemplo.png"),
          restaurant: require("@/assets/images/map/icons/light/poiRestaurant.png"),
          hospital: require("@/assets/images/map/icons/light/poiHospital.png"),
          school: require("@/assets/images/map/icons/light/poiSchool.png"),
          shop: require("@/assets/images/map/icons/light/poiShop.png"),
          stop: require("@/assets/images/map/icons/light/poiStop.png"),
          bus: require("@/assets/images/map/icons/light/bus.png"),
        }}
      />

      {/* Capa de POIs */}
      <POIsLayer pois={POIS} visibleCategories={visibleCategories} />

      <StopsLayer />

      {/* Cámara inicial del mapa */}
      <MapCamera />
      {/* Ubicación del usuario */}
      <UserLocation />
      {/* Rutas */}
      <RoutesLayer />
      {/* Camiones */}
      <VehicleLayer vehicles={mockVehicles} />
    </Mapbox.MapView>
  );
}
