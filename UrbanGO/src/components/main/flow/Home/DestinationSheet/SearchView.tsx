import { useState, useRef, ComponentType } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import {
  LocationInput,
  SwapButton,
  QuickOptions,
} from "@/src/components/main/flow/search-destination/index";
import PlacesList, {
  Place,
} from "@/src/components/main/flow/search-destination/PlacesList";

type Props = {
  animatedStyle: object;
  ScrollViewComponent: typeof BottomSheetScrollView;
};

/**
 * SearchView
 *
 * Contenido del snap 1. Estructura:
 *
 *   [fijo]  Título "¿A dónde va?"
 *   [fijo]  Inputs origen + destino + SwapButton
 *   [fijo]  QuickOptions (Usar mi ubicación / Elegir en el mapa)
 *   [fijo]  Divisor
 *   [scroll] PlacesList — ÚNICO elemento scrolleable
 *
 * El scroll está contenido en ScrollViewComponent (BottomSheetScrollView)
 * que ocupa el espacio restante con flex:1.
 */
export default function SearchView({
  animatedStyle,
  ScrollViewComponent,
}: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const [originText, setOriginText] = useState("Mi ubicación");
  const [destinationText, setDestinationText] = useState("");
  const [fixedHeight, setFixedHeight] = useState(0);

  const activeInput = useRef<"origin" | "destination">("destination");

  /**
   * Altura disponible para el scroll de POIs:
   * 90% de la pantalla (snap 1) menos el contenido fijo menos el handle (24px)
   */
  const scrollHeight = screenHeight * 0.9 - fixedHeight - 24 - insets.bottom;

  // ── Handlers ────────────────────────────────────────────────

  const handleSwap = () => {
    const prev = originText;
    setOriginText(destinationText);
    setDestinationText(prev);
  };

  const handleUseMyLocation = () => {
    if (activeInput.current === "origin") {
      setOriginText("Mi ubicación");
    } else {
      setDestinationText("Mi ubicación");
    }
  };

  const handleChooseOnMap = () => {
    router.push(`/main/(flow)/select-${activeInput.current}` as any);
  };

  const handleSelectPlace = (place: Place) => {
    setDestinationText(place.name);
    // TODO: cerrar sheet y centrar mapa en place.coordinates
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {/* ── Contenido fijo ── */}
      <View
        style={styles.fixedContent}
        onLayout={(e) => setFixedHeight(e.nativeEvent.layout.height)}
      >
        <Text style={styles.title}>¿A dónde va?</Text>

        {/* Inputs + SwapButton */}
        <View style={styles.inputsWrapper}>
          <View style={styles.inputs}>
            <LocationInput
              type="origin"
              value={originText}
              onChangeText={setOriginText}
              onFocus={() => {
                activeInput.current = "origin";
              }}
            />
            <LocationInput
              type="destination"
              value={destinationText}
              onChangeText={setDestinationText}
              onFocus={() => {
                activeInput.current = "destination";
              }}
            />
          </View>
          <SwapButton onSwap={handleSwap} />
        </View>

        {/* Opciones rápidas */}
        <QuickOptions
          onUseMyLocation={handleUseMyLocation}
          onChooseOnMap={handleChooseOnMap}
        />

        <View style={styles.divider} />
      </View>

      {/* ── Solo los POIs scrollean ── */}
      <ScrollViewComponent
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 8 }}
        style={[styles.placesList, { height: scrollHeight }]}
      >
        <PlacesList onSelectPlace={handleSelectPlace} />
      </ScrollViewComponent>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  fixedContent: {
    // No flex, solo ocupa lo que necesita
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 4,
  },
  inputsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  inputs: {
    flex: 1,
    paddingRight: 36,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginBottom: 4,
  },
  placesList: {
    // altura calculada dinámicamente con scrollHeight
  },
});
