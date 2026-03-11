/**
 * PlacesList.tsx
 * ──────────────────────────────────────────────────────────────
 * Lista de puntos de interés (POIs) de la ciudad.
 *
 * Filtrado:
 *  Recibe `searchText` desde SearchView (el texto del input activo).
 *  Filtra los POIs cuyo nombre contenga ese texto (case-insensitive).
 *  Si searchText está vacío, muestra todos los POIs.
 *  Si no hay resultados, muestra un mensaje de "sin resultados".
 *
 * Scroll:
 *  Este componente NO tiene ScrollView propio.
 *  El scroll lo maneja BottomSheetScrollView en SearchView.
 *
 * Datos:
 *  Usa mapEntitiesMock filtrando solo type === "POI".
 *  TODO: reemplazar con llamada a API cuando esté disponible.
 *
 * Ruta del archivo:
 *  src/components/main/flow/search-destination/PlacesList.tsx
 */

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import mapEntitiesMock from "@/src/map/__mock__/mapEntities.mock";

export type Place = {
  id: string;
  name: string;
  category?: string;
  lat: number;
  lng: number;
};

// Todos los POIs del mock — se filtran en tiempo real según searchText
const ALL_PLACES: Place[] = mapEntitiesMock
  .filter((e) => e.type === "POI")
  .map((e) => ({
    id: e.id,
    name: e.name,
    category: e.category,
    lat: e.lat,
    lng: e.lng,
  }));

const CATEGORY_ICON: Record<string, string> = {
  restaurant: "🍽️",
  school: "🎓",
  hospital: "🏥",
  park: "🌳",
  store: "🛒",
};

type Props = {
  onSelectPlace?: (place: Place) => void;
  /**
   * Texto para filtrar los POIs en tiempo real.
   * Viene del input activo en SearchView.
   * Si está vacío o es solo espacios, se muestran todos.
   */
  searchText?: string;
};

export default function PlacesList({ onSelectPlace, searchText = "" }: Props) {
  /**
   * Filtrado case-insensitive por nombre del POI.
   * normalize("NFD") + replace elimina acentos para que
   * "uadeo" encuentre "Uadeo" y "cafe" encuentre "Café".
   */
  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filtered = searchText.trim()
    ? ALL_PLACES.filter((p) =>
        normalize(p.name).includes(normalize(searchText)),
      )
    : ALL_PLACES;

  // Sin resultados — mostrar mensaje en lugar de lista vacía
  if (filtered.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Sin resultados para "{searchText}"</Text>
      </View>
    );
  }

  return (
    <View>
      {filtered.map((place, index) => (
        <TouchableOpacity
          key={place.id}
          style={[
            styles.item,
            index === filtered.length - 1 && styles.lastItem,
          ]}
          onPress={() => onSelectPlace?.(place)}
          activeOpacity={0.6}
        >
          <Text style={styles.icon}>
            {CATEGORY_ICON[place.category ?? ""] ?? "📍"}
          </Text>
          <View style={styles.texts}>
            <Text style={styles.name}>{place.name}</Text>
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
    borderBottomWidth: 0,
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
  emptyContainer: {
    paddingVertical: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#ADADAD",
  },
});
