import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUIStore } from "@/src/store/ui.store";

export type MenuItemConfig = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
};

const DEFAULT_ITEMS: MenuItemConfig[] = [
  { label: "Usuario", icon: "person-circle-outline", route: "/main/(profile)" },
  { label: "Rutas", icon: "bus-outline", route: "/main/(routes)" },
];

export const MENU_ITEMS_ROUTES: MenuItemConfig[] = [
  { label: "Mapa", icon: "map-outline", route: "/main/(flow)" },
  { label: "Usuario", icon: "person-circle-outline", route: "/main/(profile)" },
];

export const MENU_ITEMS_PROFILE: MenuItemConfig[] = [
  { label: "Mapa", icon: "map-outline", route: "/main/(flow)" },
  { label: "Rutas", icon: "bus-outline", route: "/main/(routes)" },
];

type Props = {
  items?: MenuItemConfig[];
};

export default function MenuButton({ items = DEFAULT_ITEMS }: Props) {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Se oculta cuando el sheet está en snap 1 (modo search)
  const sheetIndex = useUIStore((state) => state.sheetIndex);
  if (sheetIndex !== 0) return null;

  const handleNavigate = (route: string) => {
    setOpen(false);
    router.push(route as any);
  };

  return (
    <>
      {open && (
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <TouchableOpacity
        style={[styles.iconButton, { top: insets.top + 12 }]}
        onPress={() => setOpen((prev) => !prev)}
        activeOpacity={0.6}
      >
        <Ionicons name="menu" size={28} color="#222" />
      </TouchableOpacity>

      {open && (
        <View style={[styles.menu, { top: insets.top + 56 }]}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={item.route}
              style={[
                styles.menuItem,
                index < items.length - 1 && styles.menuItemBorder,
              ]}
              onPress={() => handleNavigate(item.route)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color="#222"
                style={styles.menuIcon}
              />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    zIndex: 10,
  },
  iconButton: {
    position: "absolute",
    left: 16,
    zIndex: 20,
    padding: 4,
  },
  menu: {
    position: "absolute",
    left: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 4,
    minWidth: 160,
    zIndex: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuIcon: { marginRight: 12 },
  menuLabel: { fontSize: 15, fontWeight: "500", color: "#222" },
});
