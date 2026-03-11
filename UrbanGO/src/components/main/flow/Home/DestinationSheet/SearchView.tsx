/**
 * SearchView.tsx
 * ──────────────────────────────────────────────────────────────
 * Contenido del snap 1 del DestinationSheet.
 *
 * Estructura visual (de arriba a abajo):
 *  [fijo]   Título "¿A dónde va?"
 *  [fijo]   Input de origen (punto verde)
 *  [fijo]   Input de destino (punto rojo)
 *  [fijo]   SwapButton — intercambia origen y destino
 *  [fijo]   QuickOptions — "Usar mi ubicación" y "Elegir en el mapa"
 *  [scroll] PlacesList — puntos de interés filtrados por el input activo
 *
 * Comportamiento de búsqueda:
 *  Cada input filtra los POIs de forma independiente según el texto escrito.
 *  El input activo (enfocado) determina qué lista se muestra.
 *  Si el input activo no tiene texto, se muestran todos los POIs.
 *
 * Auto-foco:
 *  Al abrirse el snap 1 (isVisible = true), se enfoca automáticamente
 *  el input de origen y se abre el teclado usando una ref con .focus().
 *
 * Altura del scroll:
 *  Se calcula dinámicamente: 90% pantalla - altura del contenido fijo - handle.
 */

import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TextInput,
} from "react-native";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useUIStore } from "@/src/store/ui.store";
import {
  LocationInput,
  SwapButton,
  QuickOptions,
} from "@/src/components/main/flow/search-destination/index";
import PlacesList, {
  Place,
} from "@/src/components/main/flow/search-destination/PlacesList";

type Props = {
  /** Estilo animado que controla la opacidad (fade in/out con el sheet) */
  animatedStyle: object;
  /**
   * ScrollViewComponent inyectado desde DestinationSheet.
   * Es BottomSheetScrollView para que el sheet maneje el gesto de scroll
   * sin conflicto con el arrastre del sheet.
   */
  ScrollViewComponent: typeof BottomSheetScrollView;
  /** Cierra el sheet bajando al snap 0 — se llama al seleccionar un POI */
  onClose: () => void;
  /**
   * true cuando el snap 1 está activo y visible.
   * Dispara el auto-foco en el input de origen y resetea el estado interno.
   */
  isVisible: boolean;
};

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

  /**
   * activeInput: input actualmente enfocado.
   * Determina cuál texto se usa para filtrar los POIs.
   */
  const activeInput = useRef<"origin" | "destination">("origin");

  /**
   * Ref directa al TextInput de origen para poder llamar .focus()
   * programáticamente cuando el snap 1 se abre.
   * Se pasa como prop a LocationInput.
   */
  const originInputRef = useRef<TextInput | null>(null);

  const setSelectedPoi = useUIStore((state) => state.setSelectedPoi);

  const scrollHeight = screenHeight * 0.9 - fixedHeight - 24 - insets.bottom;

  /**
   * Texto de búsqueda activo: el del input que está enfocado.
   * Se usa para filtrar los POIs en PlacesList.
   * Si el input activo es origen → filtra con originText.
   * Si es destino → filtra con destinationText.
   */
  const activeSearchText =
    activeInput.current === "origin" ? originText : destinationText;

  /**
   * Al abrirse el snap 1:
   * 1. Resetear input activo a origen
   * 2. Mostrar "Usar mi ubicación"
   * 3. Enfocar el input de origen con un pequeño delay para que
   *    la animación del sheet termine antes de abrir el teclado.
   *    Sin el delay el teclado puede interferir con la animación.
   */
  useEffect(() => {
    if (isVisible) {
      activeInput.current = "origin";
      setShowUseMyLocation(true);

      // Delay de 300ms para esperar que el sheet termine de animarse
      const timer = setTimeout(() => {
        originInputRef.current?.focus();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

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
   * 1. Pone el nombre en el input activo (origen o destino según corresponda)
   * 2. Envía las coordenadas al store → MapCamera hace zoom
   * 3. Cierra el sheet
   */
  const handleSelectPlace = (place: Place) => {
    if (activeInput.current === "origin") {
      setOriginText(place.name);
    } else {
      setDestinationText(place.name);
    }
    setSelectedPoi({ lat: place.lat, lng: place.lng, name: place.name });
    onClose();
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {/*
        Bloque fijo: todo excepto la lista de POIs.
        onLayout mide su altura real para calcular el espacio del scroll.
      */}
      <View
        style={styles.fixedContent}
        onLayout={(e) => setFixedHeight(e.nativeEvent.layout.height)}
      >
        <Text style={styles.title}>¿A dónde va?</Text>

        <View style={styles.inputsWrapper}>
          <View style={styles.inputs}>
            {/*
              inputRef solo en origen para el auto-foco.
              Al escribir en cualquier input se actualiza activeInput
              y se re-filtran los POIs en tiempo real.
            */}
            <LocationInput
              type="origin"
              value={originText}
              onChangeText={(text) => {
                setOriginText(text);
                // Al escribir, asegurar que el input activo es origen
                activeInput.current = "origin";
              }}
              onFocus={() => {
                activeInput.current = "origin";
                setShowUseMyLocation(true);
              }}
              inputRef={originInputRef}
            />
            <LocationInput
              type="destination"
              value={destinationText}
              onChangeText={(text) => {
                setDestinationText(text);
                activeInput.current = "destination";
              }}
              onFocus={() => {
                activeInput.current = "destination";
                setShowUseMyLocation(false);
              }}
            />
          </View>
          <SwapButton onSwap={handleSwap} />
        </View>

        <QuickOptions
          showUseMyLocation={showUseMyLocation}
          onUseMyLocation={handleUseMyLocation}
          onChooseOnMap={handleChooseOnMap}
        />

        <View style={styles.divider} />
      </View>

      {/* Solo los POIs scrollean, filtrados por el texto del input activo */}
      <ScrollViewComponent
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 8 }}
        style={{ height: scrollHeight }}
      >
        <PlacesList
          onSelectPlace={handleSelectPlace}
          searchText={activeSearchText}
        />
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
    height: 3,
    backgroundColor: "#F0F0F0",
    marginBottom: 4,
  },
});
