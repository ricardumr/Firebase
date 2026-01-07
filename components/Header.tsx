import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import styles from "../estilo";

type Props = {
  title?: string;
  showMenu?: boolean;
  showBack?: boolean;
  rightIcon?: string;
  onRightPress?: () => void;
};

export default function Header({
  title,
  showMenu = true,
  showBack = false,
  rightIcon,
  onRightPress,
}: Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {showMenu && (
          <IconButton
            icon="menu"
            color="#d1d5db"
            size={22}
            onPress={() =>
              (navigation as any).openDrawer
                ? (navigation as any).openDrawer()
                : navigation.goBack()
            }
          />
        )}
        {showBack && (
          <IconButton
            icon="arrow-left"
            color="#d1d5db"
            size={20}
            onPress={() => navigation.goBack()}
          />
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {rightIcon && (
          <IconButton
            icon={rightIcon}
            color="#d1d5db"
            size={20}
            onPress={onRightPress}
          />
        )}
      </View>
    </View>
  );
}
