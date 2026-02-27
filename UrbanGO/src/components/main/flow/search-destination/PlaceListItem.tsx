import { View, Text } from "react-native";

export default function PlaceListItem() {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: "#f0f0f0",
      }}
    >
      <Text style={{ marginRight: 10 }}>⭐</Text>

      <View>
        <Text style={{ fontWeight: "600" }}>
          Central Camionera Regional Guasave
        </Text>
        <Text style={{ fontSize: 12, color: "#777" }}>
          Calle Jacarandas, Col del Bosque, 81040
        </Text>
      </View>
    </View>
  );
}
