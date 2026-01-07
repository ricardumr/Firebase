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
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import { TextInput } from "react-native-paper";
import { Item } from "../model/Item";

export default function Listar_itens() {
  const navigation = useNavigation();
  const [itens, setItens] = useState<Item[]>([]);
  const [load, setLoad] = useState(true);

  const refItem = firestore
    .collection("Usuario")
    .doc(auth.currentUser?.uid)
    .collection("Item");

  useEffect(() => {
    if (load) {
      listar();
    }
  }, [load]);

  const listar = () => {
    const subscriber = refItem.onSnapshot((query) => {
      const itensArr: any[] = [];
      query.forEach((documento) => {
        itensArr.push({
          ...documento.data(),
          key: documento.id,
        });
      });
      setItens(itensArr);
      setLoad(false);
      console.log(itensArr);
    });
    return () => subscriber();
  };

  const excluir = async (item) => {
    const resultado = await refItem
      .doc(item.id)
      .delete()
      .then(() => {
        alert("Excluído com sucesso!");
        listar();
      });
  };
  const editar = (item: Item) => {
    navigation.navigate("Cadastrar item", { item: item }); //nome do parametro pra esquerda e oq ele vai receber na direita
  };
  return (
    <ImageBackground
      resizeMode="stretch"
      source={require("../assets/back.png")}
      style={styles.container}
    >
      <View style={{ marginTop: 120, flex: 1, width: "100%", alignItems: "center" }}></View>
      <Header title="Lista de Itens" />
      <FlatList
        data={itens ?? []}
        keyExtractor={(item, index) => item.key ?? item.id ?? String(index)}
        refreshing={load}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={{ color: "#fff", marginTop: 20 }}>
            Nenhum item cadastrado
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listCard}
            onPress={() => editar(item)}
            onLongPress={() => excluir(item)}
          >
            <Text style={styles.listCardText}>{item.nome}</Text>
            <Text style={styles.listCardSubtext}>Sala: {item.sala}</Text>
            <Text style={styles.listCardSubtext}>
              Patrimônio: {item.patrimonio}
            </Text>
          </TouchableOpacity>
        )}
      />
    </ImageBackground>
  );
}
