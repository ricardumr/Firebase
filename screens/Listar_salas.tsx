import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import styles from "../estilo";
import { useState } from "react";
import { auth, firestore } from "../firebase";
import { TextInput } from "react-native-paper";
import { Sala } from "../model/Sala";

import Home from "./Home";

const Drawer = createDrawerNavigator();

export default function Listar_salas() {
  const [salas, setSalas] = useState<Sala[]>([]);

  const refSala = firestore
    .collection("Usuario")
    .doc(auth.currentUser?.uid)
    .collection("Sala");

  const listar = () => {
    const subscriber = refSala.onSnapshot((query) => {
      const salas= = [];
      query.forEach((documento) => {
        salas.push({
          ...documento.data(),
          key: documento.id,
        });
      });
      setSalas(salas);
    });
    return () => subscriber();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={salas}
        renderSala={({ item }) => (
          <View>
            <Text>sadadasdssadasd</Text>
            <Text>Nome: {item.nome}</Text>
          </View>
        )}
      />
    </View>
  );
}
