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
import { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import { TextInput } from "react-native-paper";
import Header from "../components/Header";
import { Sala } from "../model/Sala";

export default function Listar_salas() {
  const navigation = useNavigation();
  const [salas, setSalas] = useState<Sala[]>([]);
  const [load, setLoad] = useState(true);

  const refSala = firestore
    .collection("Usuario")
    .doc(auth.currentUser?.uid)
    .collection("Sala");

  useEffect(() => {
    if (load) {
      listar();
    }
  });

  const listar = () => {
    const subscriber = refSala.onSnapshot((query) => {
      const salas = [];
      query.forEach((documento) => {
        salas.push({
          ...documento.data(),
          key: documento.id,
        });
      });
      setSalas(salas);
      setLoad(false);
      console.log(salas);
    });
    return () => subscriber();
  };

  const excluir = async (sala) => {
    const resultado = await refSala
      .doc(sala.id)
      .delete()
      .then(() => {
        alert("Excluído com sucesso!");
        listar();
      });
  };
  const editar = (item: Sala) => {
    navigation.navigate("Cadastrar sala", { sala: item }); //nome do parametro pra esquerda e oq ele vai receber na direita
  };

  return (
    <ImageBackground
      resizeMode="stretch"
      source={require("../assets/back.png")}
      style={styles.container}
    >
      <View style={{ marginTop: 120, flex: 1, width: "100%", alignItems: "center" }}></View>
      <Header title="Lista de Salas" />
      <FlatList
        data={salas ?? []}
        keyExtractor={(item, index) => item.key ?? item.id ?? String(index)}
        refreshing={load}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={{ color: "#fff", marginTop: 20 }}>
            Nenhuma sala cadastrada
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listCard}
            onPress={() => editar(item)}
            onLongPress={() => excluir(item)}
          >
            <Text style={styles.listCardText}>{item.nome}</Text>
            <Text style={styles.listCardSubtext}>
              Responsável: {item.usuario}
            </Text>
          </TouchableOpacity>
        )}
      />
    </ImageBackground>
  );
}
