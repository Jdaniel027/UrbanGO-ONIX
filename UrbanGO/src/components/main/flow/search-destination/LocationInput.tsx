import { View, TextInput, Text, TouchableOpacity } from "react-native";

type Props = {
  type: "origin" | "destination";
  value: string;
  autoFocus?: boolean;
};

export default function LocationInput({ type, value, autoFocus }: Props) {
  const isOrigin = type === "origin";

  return (
    <View style={{ marginBottom: 12 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#f2f2f2",
          borderRadius: 14,
          paddingHorizontal: 14,
        }}
      >
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: isOrigin ? "#4CAF50" : "#FF3B30",
            marginRight: 10,
          }}
        />

        <TextInput
          defaultValue={value}
          placeholder={isOrigin ? "Origen" : "Destino"}
          style={{ flex: 1, paddingVertical: 14 }}
          autoFocus={autoFocus}
        />

        <TouchableOpacity>
          <Text style={{ color: "#999" }}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
