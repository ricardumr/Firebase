import React from "react";
import { View, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar, Button } from "react-native-paper";
import { auth } from "../firebase";
import styles from "../estilo";

export default function CustomDrawer(props: any) {
  const email = auth.currentUser?.email;

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      props.navigation.replace("Login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0 }}
    >
      <View
        style={[{ padding: 16, backgroundColor: "#3B82F6" }, styles.header]}
      >
        <Avatar.Text size={56} label={(email || "U").charAt(0).toUpperCase()} />
        <View style={{ marginLeft: 12 }}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>
            {email?.split("@")[0] ?? "Usuário"}
          </Text>
          <Text style={{ color: "#e6f0ff", fontSize: 12 }}>{email}</Text>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 8 }}>
        <DrawerItemList {...props} />
      </View>

      <View style={{ padding: 12, borderTopWidth: 1, borderTopColor: "#eee" }}>
        <Button
          mode="contained"
          onPress={handleSignOut}
          style={{ backgroundColor: "#ef4444" }}
        >
          Sair
        </Button>
      </View>
    </DrawerContentScrollView>
  );
}
