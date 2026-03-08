import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import LocationInput from "@/src/components/main/flow/search-destination/LocationInput";
import SwapButton from "@/src/components/main/flow/search-destination/SwapButton";
import QuickOptions from "@/src/components/main/flow/search-destination/QuickOptions";
import PlacesList, {
  Place,
} from "@/src/components/main/flow/search-destination/PlacesList";

type Props = {
  animatedStyle: object;
  ScrollViewComponent: typeof BottomSheetScrollView;
  onClose: () => void;
  /** Se llama cuando el snap 1 se hace visible — resetea el estado interno */
  isVisible: boolean;
};

/**
 * SearchView — Contenido del snap 1.
 *
 * [fijo]   Título + inputs + opciones
 * [scroll] PlacesList — único elemento scrolleable
 *
 * "Usar mi ubicación" solo aparece cuando el input de origen está activo,
 * ya que no tiene sentido poner tu ubicación como destino.
 */
export default function SearchView({
  animatedStyle,
  ScrollViewComponent,
  onClose,
  isVisible,
}: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const [originText, setOriginText] = useState("Mi ubicación");
  const [destinationText, setDestinationText] = useState("");
  const [fixedHeight, setFixedHeight] = useState(0);
  const [showUseMyLocation, setShowUseMyLocation] = useState(true);

  const activeInput = useRef<"origin" | "destination">("origin");

  // Al abrirse el snap 1, resetear siempre a origen activo
  useEffect(() => {
    if (isVisible) {
      activeInput.current = "origin";
      setShowUseMyLocation(true);
    }
  }, [isVisible]);

  // Altura disponible para scroll: 90% pantalla - contenido fijo - handle
  const scrollHeight = screenHeight * 0.9 - fixedHeight - 24 - insets.bottom;

  // ── Handlers ────────────────────────────────────────────────

  const handleSwap = () => {
    const prev = originText;
    setOriginText(destinationText);
    setDestinationText(prev);
  };

  const handleUseMyLocation = () => {
    setOriginText("Mi ubicación");
  };

  const handleChooseOnMap = () => {
    router.push(`/main/(flow)/select-${activeInput.current}` as any);
  };

  /**
   * Al seleccionar un POI:
   * 1. Pone el nombre en el input de destino
   * 2. Cierra el sheet para que el usuario vea el mapa
   * TODO: centrar mapa en las coordenadas del lugar
   */
  const handleSelectPlace = (place: Place) => {
    setDestinationText(place.name);
    onClose();
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
                setShowUseMyLocation(true);
              }}
            />
            <LocationInput
              type="destination"
              value={destinationText}
              onChangeText={setDestinationText}
              onFocus={() => {
                activeInput.current = "destination";
                setShowUseMyLocation(false); // ocultar al enfocar destino
              }}
            />
          </View>
          <SwapButton onSwap={handleSwap} />
        </View>

        {/* QuickOptions — "Usar mi ubicación" solo visible en input origen */}
        <QuickOptions
          showUseMyLocation={showUseMyLocation}
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
        style={{ height: scrollHeight }}
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
  fixedContent: {},
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
});
