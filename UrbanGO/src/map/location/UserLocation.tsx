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

export function UserLocation() {
  return (
    <Mapbox.UserLocation visible={true} showsUserHeadingIndicator={true} />
  );
}

// Sustitulle el codigo por este para poder acceder a la ubicacion haslo cunado vallas a generar otro apk porque tienes que instalar
// npx expo install expo-location

// import Mapbox from "@rnmapbox/maps";
// import * as Location from "expo-location";
// import { useEffect, useState } from "react";

// export function UserLocation() {
//   const [hasPermission, setHasPermission] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   if (!hasPermission) return null;

//   return (
//     <Mapbox.UserLocation
//       visible={true}
//       showsUserHeadingIndicator={true}
//       androidRenderMode="gps"
//     />
//   );
// }
