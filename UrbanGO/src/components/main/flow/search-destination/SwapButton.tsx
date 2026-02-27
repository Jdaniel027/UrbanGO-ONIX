import { TouchableOpacity, Text } from "react-native";

export default function SwapButton() {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        right: 30,
        top: 70,
      }}
    >
      <Text style={{ fontSize: 18 }}>⇅</Text>
    </TouchableOpacity>
  );
}
