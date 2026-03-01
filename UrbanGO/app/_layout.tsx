import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

/**
 * RootLayout — layout raíz de toda la app.
 *
 * GestureHandlerRootView es requerido por @gorhom/bottom-sheet
 * y react-native-gesture-handler para que los gestos funcionen.
 *
 * Usamos un Stack simple sin configuraciones especiales.
 * Cada grupo (main, auth) maneja su propia navegación interna.
 */

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </GestureHandlerRootView>
    </>
  );
}
