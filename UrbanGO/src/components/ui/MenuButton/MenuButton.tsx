import { useState } from "react";
import { View, Text, Pressable, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./MenuButton.styles";

export interface MenuOption {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  hidden?: boolean;
}

interface MenuButtonProps {
  options: MenuOption[];
}

export function MenuButton({ options }: MenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const visibleOptions = options.filter((o) => !o.hidden);

  return (
    <>
      {/* Botón hamburguesa */}
      <Pressable onPress={() => setIsOpen(true)} style={styles.trigger}>
        <Ionicons name="menu" size={22} color="#111827" />
      </Pressable>

      {/* Dropdown como Modal transparente */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        {/* Tap fuera cierra el menú */}
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          {/* La card del menú */}
          <View style={styles.menu}>
            {visibleOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  index < visibleOptions.length - 1 && styles.menuItemBorder,
                ]}
                onPress={() => {
                  setIsOpen(false);
                  option.onPress();
                }}
              >
                <Ionicons
                  name={option.icon}
                  size={20}
                  color="#374151"
                  style={styles.menuIcon}
                />
                <Text style={styles.menuLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
