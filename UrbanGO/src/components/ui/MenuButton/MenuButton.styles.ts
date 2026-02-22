import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  trigger: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  overlay: {
    flex: 1,
    // Alineamos la card justo debajo del botón
    paddingTop: 60,
    paddingLeft: 16,
  },
  menu: {
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 4,
    width: 180,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  menuIcon: {
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },
});
