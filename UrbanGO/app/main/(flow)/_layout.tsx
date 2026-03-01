import { Slot } from "expo-router";

/**
 * Layout de (flow)
 *
 * Usa Slot en lugar de Stack por la misma razón que main:
 * Stack crea un View contenedor que bloquea los toques al mapa
 * incluso con pointerEvents box-none en contentStyle.
 *
 * Las transiciones de search-destination, select-origin y
 * select-destination se configuran directamente en cada
 * pantalla usando el hook useNavigation o desde el
 * layout de main donde sí tenemos control total.
 */
export default function FlowLayout() {
  return <Slot />;
}

// ─────────────────────────────────────────────────────────────
// CÓMO CONFIGURAR LA TRANSICIÓN DE SEARCH-DESTINATION
//
// Como no podemos usar Stack aquí, la animación slide_from_bottom
// se configura en el app/_layout.tsx raíz (el de toda la app),
// o bien usando router.push con opciones nativas.
//
// Opción A — En app/_layout.tsx (recomendada):
//
//   import { Stack } from "expo-router";
//   export default function RootLayout() {
//     return (
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="main/(flow)/search-destination"
//           options={{
//             presentation: "transparentModal",
//             animation: "slide_from_bottom",
//           }}
//         />
//       </Stack>
//     );
//   }
//
// Opción B — En DestinationSheet al hacer router.push:
//
//   router.push({
//     pathname: "/main/(flow)/search-destination",
//     // La animación se controla desde el layout raíz
//   });
// ─────────────────────────────────────────────────────────────
