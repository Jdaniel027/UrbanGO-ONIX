import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import mapEntitiesMock from "@/src/map/__mock__/mapEntities.mock";

export type Place = {
  id: string;
  name: string;
  category?: string;
  lat: number;
  lng: number;
};

// Filtramos solo los POIs del mock
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
 * Icono por categoría del POI.
 * TODO: expandir con más categorías cuando se conecte la API.
 */
const CATEGORY_ICON: Record<string, string> = {
  restaurant: "🍽️",
  school: "🎓",
  hospital: "🏥",
  park: "🌳",
  store: "🛒",
};

type Props = {
  onSelectPlace?: (place: Place) => void;
};

/**
 * PlacesList
 *
 * Lista de puntos de interés del mapa.
 * Usa los datos del mock mapEntitiesMock filtrando solo type === "POI".
 * TODO: reemplazar con llamada a API cuando esté disponible.
 *
 * Al presionar un item llama onSelectPlace con lat/lng para
 * que SearchView cierre el sheet y centre el mapa en ese punto.
 */
export default function PlacesList({ onSelectPlace }: Props) {
  return (
    <View>
      {PLACES.map((place, index) => (
        <TouchableOpacity
          key={place.id}
          style={[styles.item, index === PLACES.length - 1 && styles.lastItem]}
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
});
