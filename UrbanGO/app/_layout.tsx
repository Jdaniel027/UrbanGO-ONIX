import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN!);

export default function RootLayout() {
    return (
    <View style={styles.container}>
      {/* MAPA GLOBAL */}
        <Mapbox.MapView
        style={StyleSheet.absoluteFill}
        styleURL={Mapbox.StyleURL.Street}
        scaleBarEnabled={false}   // Esto elimina la franja negra superior
        logoEnabled={false} // Oculta el logo de MapBox
        compassEnabled={false} // Oculta la burbuja que esta a un costado del logo MapBox

        >
        <Mapbox.Camera
            zoomLevel={12}
            centerCoordinate={[-108.4680, 25.5674]} // Guasave
        />
        </Mapbox.MapView>

      {/* NAVEGACIÓN ENCIMA DEL MAPA
        <View style={styles.overlay}>
        <Stack
            screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
            }}
        />
        </View> */}
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
    flex: 1,
    },
    overlay: {
    flex: 1,
    },
});
