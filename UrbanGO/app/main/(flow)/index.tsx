import { View, Text, StyleSheet } from "react-native";

// Componentes relacionados con el flujo de selección de destino y navegación
import {
  CenterMarker,
  DestinationSheet,
  TopLeftMenuButton,
  TopRightLocateButton,
} from "@/src/components/main/flow/index";

// Store
import { useTripStore } from "@/src/store/trip.store";

export default function HomeScreen() {
  const destination = useTripStore((state) => state.destination);

  console.log("Destino actual en Home:", destination);

  return (
    <>
      <CenterMarker />
      <TopRightLocateButton />
      <TopLeftMenuButton />
      <DestinationSheet />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
