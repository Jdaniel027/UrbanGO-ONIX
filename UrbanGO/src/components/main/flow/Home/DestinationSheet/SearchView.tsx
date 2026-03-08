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
 *  [scroll] PlacesList — puntos de interés de la ciudad
 *
 * Por qué el ScrollView está en SearchView y no en PlacesList:
 *  PlacesList es solo una lista de items (View + map).
 *  El scroll lo maneja BottomSheetScrollView inyectado como prop
 *  desde DestinationSheet, para que @gorhom/bottom-sheet controle
 *  el gesto y no entre en conflicto con el arrastre del sheet.
 *
 * Lógica de "Usar mi ubicación":
 *  Solo visible cuando el input de origen está activo.
 *  No tiene sentido poner la ubicación actual como destino.
 *  Se resetea a visible cada vez que el snap 1 se abre (isVisible).
 *
 * Altura del scroll:
 *  Se calcula dinámicamente: 90% pantalla - altura del contenido fijo - handle.
 *  onLayout mide el contenido fijo cuando se renderiza por primera vez.
 */

import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useUIStore } from "@/src/store/ui.store";

// Componentes del contenido del snap 1
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
   * Resetea el estado interno (input activo, botón de ubicación)
   * cada vez que el usuario abre el modo búsqueda.
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

  // Valores de los inputs de texto
  const [originText, setOriginText] = useState("Mi ubicación");
  const [destinationText, setDestinationText] = useState("");

  // Altura medida del bloque fijo (título + inputs + opciones)
  // Necesaria para calcular el espacio disponible para el scroll
  const [fixedHeight, setFixedHeight] = useState(0);

  // Controla si "Usar mi ubicación" es visible
  // Solo true cuando el input de origen está activo
  const [showUseMyLocation, setShowUseMyLocation] = useState(true);

  /**
   * Input actualmente enfocado.
   * useRef en lugar de useState para no provocar re-renders al cambiar.
   * Solo necesitamos su valor en el momento de presionar los botones.
   */
  const activeInput = useRef<"origin" | "destination">("origin");

  // Función para enviar coordenadas a MapCamera via store
  const setSelectedPoi = useUIStore((state) => state.setSelectedPoi);

  /**
   * Altura disponible para la lista de POIs.
   * 90% = altura del snap 1 | 24 = altura del handle del sheet
   */
  const scrollHeight = screenHeight * 0.9 - fixedHeight - 24 - insets.bottom;

  /**
   * Cada vez que el snap 1 se hace visible, resetear al estado inicial:
   * - input activo → origen
   * - "Usar mi ubicación" → visible
   * Así el usuario siempre ve el mismo estado al abrir la búsqueda.
   */
  useEffect(() => {
    if (isVisible) {
      activeInput.current = "origin";
      setShowUseMyLocation(true);
    }
  }, [isVisible]);

  // ── Handlers ────────────────────────────────────────────────

  /** Intercambia el texto de los inputs de origen y destino */
  const handleSwap = () => {
    const prev = originText;
    setOriginText(destinationText);
    setDestinationText(prev);
  };

  /**
   * Pone "Mi ubicación" en el input de origen.
   * Solo se llama desde QuickOptions cuando origen está activo.
   * TODO: reemplazar con coordenadas GPS reales.
   */
  const handleUseMyLocation = () => {
    setOriginText("Mi ubicación");
  };

  /**
   * Navega a la pantalla de selección en el mapa.
   * La ruta varía según el input activo (origin o destination).
   * TODO: implementar rutas select-origin y select-destination.
   */
  const handleChooseOnMap = () => {
    router.push(`/main/(flow)/select-${activeInput.current}` as any);
  };

  /**
   * Al seleccionar un POI de la lista:
   * 1. Pone el nombre en el input de destino
   * 2. Guarda las coordenadas en UIStore → MapCamera reacciona y hace zoom
   * 3. Cierra el sheet para que el usuario vea el mapa
   */
  const handleSelectPlace = (place: Place) => {
    setDestinationText(place.name);
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

        {/* Inputs con SwapButton posicionado a la derecha */}
        <View style={styles.inputsWrapper}>
          <View style={styles.inputs}>
            <LocationInput
              type="origin"
              value={originText}
              onChangeText={setOriginText}
              onFocus={() => {
                activeInput.current = "origin";
                setShowUseMyLocation(true); // mostrar al enfocar origen
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

        <QuickOptions
          showUseMyLocation={showUseMyLocation}
          onUseMyLocation={handleUseMyLocation}
          onChooseOnMap={handleChooseOnMap}
        />

        {/* Separador visual entre opciones y lista de POIs */}
        <View style={styles.divider} />
      </View>

      {/*
        Único ScrollView del snap 1.
        Altura explícita calculada dinámicamente para que
        @gorhom/bottom-sheet sepa cuánto contenido hay scrolleable.
      */}
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
  fixedContent: {
    // No flex — solo ocupa la altura que necesita su contenido
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
    paddingRight: 36, // espacio para el SwapButton posicionado en absolute
  },
  divider: {
    height: 3,
    backgroundColor: "#F0F0F0",
    marginBottom: 4,
  },
});
