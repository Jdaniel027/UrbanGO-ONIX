import { View, Text, TouchableOpacity } from "react-native";

export default function MapOptionItem() {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: "#eee",
      }}
    >
      <Text style={{ fontWeight: "600" }}>Elegir ubicación en el mapa</Text>
    </TouchableOpacity>
  );
}
