/**
 * PlacesList.tsx
 * ──────────────────────────────────────────────────────────────
 * Lista de puntos de interés (POIs) de la ciudad.
 *
 * Datos:
 *  Usa el mock `mapEntitiesMock` filtrando solo los items con
 *  type === "POI". Los items type === "STOP" (paradas de camión)
 *  no se muestran aquí ya que son elementos del mapa, no destinos.
 *
 *  TODO: reemplazar MOCK_PLACES con una llamada a API cuando esté lista.
 *        El tipo Place ya tiene lat/lng para la integración futura.
 *
 * Scroll:
 *  Este componente NO tiene ScrollView propio.
 *  El scroll lo maneja BottomSheetScrollView en SearchView,
 *  que es el único ScrollView en toda la jerarquía del snap 1.
 *  Tener dos ScrollViews anidados causaría conflictos de gestos.
 *
 * Iconos:
 *  Cada categoría tiene un emoji asignado en CATEGORY_ICON.
 *  Si la categoría no está mapeada, se usa 📍 como fallback.
 *  TODO: reemplazar emojis por íconos SVG cuando estén disponibles.
 *
 * Al presionar un item:
 *  Se llama onSelectPlace con las coordenadas del POI.
 *  SearchView usa esas coordenadas para mover la cámara del mapa.
 */

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import mapEntitiesMock from "@/src/map/__mock__/mapEntities.mock";

/** Tipo del lugar seleccionable — incluye coordenadas para mover la cámara */
export type Place = {
  id: string;
  name: string;
  category?: string;
  lat: number;
  lng: number;
};

/**
 * Filtramos solo los POIs del mock.
 * Los STOPs son paradas de camión, no destinos para el usuario.
 * TODO: reemplazar con llamada a API cuando esté disponible.
 */
const PLACES: Place[] = mapEntitiesMock
  .filter((e) => e.type === "POI")
  .map((e) => ({
    id: e.id,
    name: e.name,
    category: e.category,
    lat: e.lat,
    lng: e.lng,
  }));

/**
 * Mapa de categoría → emoji representativo.
 * TODO: reemplazar con íconos SVG de la app cuando estén disponibles.
 */
const CATEGORY_ICON: Record<string, string> = {
  restaurant: "🍽️",
  school: "🎓",
  hospital: "🏥",
  park: "🌳",
  store: "🛒",
};

type Props = {
  /** Callback al presionar un POI — recibe las coordenadas para mover la cámara */
  onSelectPlace?: (place: Place) => void;
};

export default function PlacesList({ onSelectPlace }: Props) {
  return (
    <View>
      {PLACES.map((place, index) => (
        <TouchableOpacity
          key={place.id}
          style={[
            styles.item,
            index === PLACES.length - 1 && styles.lastItem, // sin borde en el último
          ]}
          onPress={() => onSelectPlace?.(place)}
          activeOpacity={0.6}
        >
          {/* Icono de categoría — emoji o 📍 si no está mapeada */}
          <Text style={styles.icon}>
            {CATEGORY_ICON[place.category ?? ""] ?? "📍"}
          </Text>

          <View style={styles.texts}>
            <Text style={styles.name}>{place.name}</Text>
            {/* Categoría en texto — solo si existe */}
            {place.category && (
              <Text style={styles.category}>{place.category}</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  lastItem: {
    borderBottomWidth: 0, // sin línea divisoria en el último item
  },
  icon: {
    fontSize: 20,
    marginRight: 14,
    width: 28,
    textAlign: "center",
  },
  texts: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: "#999",
    textTransform: "capitalize",
  },
});
