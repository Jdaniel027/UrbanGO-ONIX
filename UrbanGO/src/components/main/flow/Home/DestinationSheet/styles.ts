import { StyleSheet } from "react-native";

/**
 * Estilos compartidos del DestinationSheet.
 * Usados por DestinationSheet.tsx, HomeView.tsx y SearchView.tsx.
 */
export const sheetStyles = StyleSheet.create({
  // Sheet base
  sheetBackground: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  handle: {
    backgroundColor: "#E0E0E0",
    width: 40,
  },

  // Contenedor del scroll
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  // Wrapper relativo para superponer HomeView y SearchView
  contentWrapper: {
    flex: 1,
  },
});
