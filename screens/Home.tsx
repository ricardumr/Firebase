import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import styles from "../estilo";
import { TextInput } from "react-native-paper";
import Header from "../components/Header";
import DrawerTab from "../components/DrawerTab";

export default function Home() {
  const navigation = useNavigation();

  const sair = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const menuItems = [
    { label: "Listar Itens", screen: "Lista itens", icon: "📋" },
    { label: "Listar Salas", screen: "Lista salas", icon: "🏠" },
    { label: "Cadastrar Item", screen: "Cadastrar item", icon: "➕" },
    { label: "Cadastrar Sala", screen: "Cadastrar sala", icon: "🔨" },
    { label: "Itens por Sala", screen: "Lista local", icon: "🔍" },
    { label: "Conferência", screen: "Conferencia de inventário", icon: "✅" },
    {
      label: "Histórico de Conferências",
      screen: "Lista de conferências",
      icon: "📊",
    },
  ];

  return (
    <ImageBackground
      source={require("../assets/back.png")}
      resizeMode="stretch"
      style={styles.container}
    >
      <View
        style={{ marginTop: 120, flex: 1, width: "100%", alignItems: "center" }}
      >
        <DrawerTab />
        <Header title="Página Inicial" />
        <View>
          <View style={styles.logo}></View>
          <Text style={{ color: "#fff", marginTop: 8, fontWeight: "600" }}>
            Bem vindo! {auth.currentUser?.email}
          </Text>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuCard}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={styles.menuCardIcon}>{item.icon}</Text>
              <Text style={styles.menuCardText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.botaoLog, { marginBottom: 100 }]}
          onPress={sair}
        >
          <Text style={styles.primaryButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
