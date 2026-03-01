import { useRef, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  LocationInput,
  SwapButton,
  MapOptionItem,
} from "@/src/components/main/flow/search-destination";

// ─────────────────────────────────────────────────────────────
// Subcomponente: lista de lugares sugeridos
// Usa View + map en lugar de FlatList para evitar el error de
// listas virtualizadas anidadas dentro de BottomSheetScrollView.
// ─────────────────────────────────────────────────────────────
function PlaceItems() {
  const MOCK_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <View>
      {MOCK_DATA.map((item) => (
        <View key={item} style={placeStyles.item}>
          <Text style={placeStyles.star}>⭐</Text>
          <View>
            <Text style={placeStyles.name}>
              Central Camionera Regional Guasave
            </Text>
            <Text style={placeStyles.address}>
              Calle Jacarandas, Col del Bosque, 81040
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const placeStyles = StyleSheet.create({
  item: {
    flexDirection: "row",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  star: { marginRight: 10 },
  name: { fontWeight: "600" },
  address: { fontSize: 12, color: "#777" },
});

// ─────────────────────────────────────────────────────────────
// Componente principal: DestinationSheet
//
// Arquitectura:
//   BottomSheet (2 snaps)
//     └── BottomSheetScrollView (único hijo)
//           ├── Animated.View homeContent   → opacidad 1 en snap 0, 0 en snap 1
//           └── Animated.View searchContent → opacidad 0 en snap 0, 1 en snap 1
//
// La transición suave se logra interpolando la opacidad de cada
// contenido usando animatedIndex, que es un valor de Reanimated
// que va de 0 a 1 durante la animación del sheet.
//
// Ambos contenidos están siempre montados para que el sheet
// no colapse al cambiar de snap. La visibilidad se controla
// solo con opacidad y pointerEvents.
// ─────────────────────────────────────────────────────────────
export default function DestinationSheet() {
  const insets = useSafeAreaInsets();
  const sheetRef = useRef<BottomSheet>(null);

  // snapPoints[0] = home (32%), snapPoints[1] = search (90%)
  const snapPoints = ["32%", "90%"];

  // snapIndex: índice actual del sheet. Se actualiza cuando
  // la animación termina (onChange se dispara al llegar al snap).
  const [snapIndex, setSnapIndex] = useState(0);

  // animatedIndex: SharedValue que @gorhom/bottom-sheet actualiza
  // en tiempo real mientras el sheet se anima (0 = snap 0, 1 = snap 1).
  const animatedIndex = useSharedValue(0);

  const handleSheetChange = useCallback((index: number) => {
    setSnapIndex(index);
  }, []);

  const handleOpenSearch = () => sheetRef.current?.snapToIndex(1);
  const handleConfirmLocation = () => console.log("Ubicación confirmada");

  // ── Estilos animados ──────────────────────────────────────
  // homeOpacity: 1 cuando animatedIndex=0 (snap 0), 0 cuando =1 (snap 1)
  const homeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.3],
      [1, 0],
      Extrapolation.CLAMP,
    ),
    pointerEvents: snapIndex === 0 ? "auto" : "none",
  }));

  const searchAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0.5, 1],
      [0, 1],
      Extrapolation.CLAMP,
    ),
    pointerEvents: snapIndex === 1 ? "auto" : "none",
  }));

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      handleIndicatorStyle={styles.handle}
      backgroundStyle={styles.sheetBackground}
      onChange={handleSheetChange}
      // animatedIndex nos da el valor interpolado durante la animación
      animatedIndex={animatedIndex}
      enablePanDownToClose={false}
      enableOverDrag={false}
      enableDynamicSizing={false}
    >
      {/**
       * Único hijo del BottomSheet.
       * scrollEnabled desactivado en snap 0 para que el gesto
       * de arrastrar suba el sheet en lugar de hacer scroll.
       */}
      <BottomSheetScrollView
        scrollEnabled={snapIndex !== 0}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 16 },
        ]}
      >
        {/* Contenedor relativo para superponer home y search */}
        <View style={styles.contentWrapper}>
          {/* ── SNAP 0 (home) — posición absoluta, desaparece al subir ── */}
          <Animated.View
            style={[
              styles.homeContent,
              StyleSheet.absoluteFillObject,
              homeAnimatedStyle,
            ]}
          >
            <Text style={styles.title}>Marque su destino</Text>
            <Text style={styles.subtitle}>
              Arrastre el mapa para mover el marcador
            </Text>

            <TouchableOpacity
              style={styles.searchBox}
              onPress={handleOpenSearch}
              activeOpacity={0.7}
            >
              <Text style={styles.searchText}>¿A dónde quiere ir?</Text>
              <Ionicons name="search" size={20} color="#555" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.buttonWrapper}
              onPress={handleConfirmLocation}
            >
              <LinearGradient
                colors={["#9FCDFF", "#419CFF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Usar esta ubicación</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* ── SNAP 1 (search) — ocupa el espacio real del scroll ── */}
          <Animated.View style={searchAnimatedStyle}>
            <LocationInput type="origin" value="Mi ubicación" />
            <LocationInput type="destination" value="" autoFocus />
            <SwapButton />
            <MapOptionItem />
            <PlaceItems />
          </Animated.View>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  // Sheet base
  sheetBackground: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  handle: {
    backgroundColor: "#E0E0E0",
    width: 40,
  },

  // Contenedor del scroll
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  // Wrapper relativo para que absoluteFillObject del home
  // no afecte el layout del search
  contentWrapper: {
    flex: 1,
  },

  // Snap 0
  homeContent: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    marginBottom: 18,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F2F4F7",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    width: "100%",
  },
  searchText: { color: "#999", fontSize: 15 },
  buttonWrapper: { width: "100%", borderRadius: 14, overflow: "hidden" },
  button: { paddingVertical: 16, alignItems: "center", borderRadius: 14 },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
