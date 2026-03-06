import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export type Place = {
  id: string;
  name: string;
  address: string;
};

const MOCK_PLACES: Place[] = [
  {
    id: "1",
    name: "Central Camionera Regional Guasave",
    address: "Calle Jacarandas, Col del Bosque, 81040\nGuasave, Sin., México",
  },
  {
    id: "2",
    name: "Plaza Comercial Los Arcos",
    address: "Blvd. Rolando Arjona, 81000\nGuasave, Sin., México",
  },
  {
    id: "3",
    name: "Hospital General de Guasave",
    address: "Calle Álvaro Obregón, Col. Centro, 81000\nGuasave, Sin., México",
  },
  {
    id: "4",
    name: "Parque Constitución",
    address: "Calle Ángel Flores, Col. Centro, 81000\nGuasave, Sin., México",
  },
  {
    id: "5",
    name: "UADEO Campus Guasave",
    address: "Calle Ángel Flores s/n, 81040\nGuasave, Sin., México",
  },
  {
    id: "6",
    name: "Mercado Municipal",
    address: "Calle Zaragoza, Col. Centro, 81000\nGuasave, Sin., México",
  },
];

type Props = {
  onSelectPlace?: (place: Place) => void;
};

/**
 * PlacesList
 *
 * Renderiza los items sin ScrollView propio.
 * El scroll lo maneja el BottomSheetScrollView en SearchView,
 * que es el único ScrollView en toda la jerarquía del snap 1.
 */
export default function PlacesList({ onSelectPlace }: Props) {
  return (
    <View>
      {MOCK_PLACES.map((place, index) => (
        <TouchableOpacity
          key={place.id}
          style={[
            styles.item,
            index === MOCK_PLACES.length - 1 && styles.lastItem,
          ]}
          onPress={() => onSelectPlace?.(place)}
          activeOpacity={0.6}
        >
          <Text style={styles.star}>⭐</Text>
          <View style={styles.texts}>
            <Text style={styles.name}>{place.name}</Text>
            <Text style={styles.address}>{place.address}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  star: {
    fontSize: 18,
    marginRight: 12,
    marginTop: 1,
  },
  texts: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    marginBottom: 3,
  },
  address: {
    fontSize: 12,
    color: "#888",
    lineHeight: 17,
  },
});
