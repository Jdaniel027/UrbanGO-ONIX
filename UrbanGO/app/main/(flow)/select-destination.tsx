import { View, Text } from "react-native";
import { styles } from "./select-destination.styles";

import { useTripStore } from "@/src/store/trip.store";

export default function SelectDestinationScreen() {
  const destination = useTripStore((state) => state.destination);

  console.log("Destino actual en SelectDestinationScreen:", destination);
  return (
    <View style={styles.container}>
      <Text>Seleccionar lugar de destino</Text>
    </View>
  );
}
