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
import { Sala } from "../model/Sala";


export default function Listar_salas() {
  const navigation = useNavigation();
  const [salas, setSalas] = useState<Sala[]>([]);
  const [load, setLoad] = useState(true)

  const refSala = firestore
    .collection("Usuario")
    .doc(auth.currentUser?.uid)
    .collection("Sala");

  useEffect(() => {
    if (load) {
      listar();
    }
  })

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
      console.log(salas)
    });
    return () => subscriber();
  };

  const excluir = async (sala) => {
    const resultado = await refSala
      .doc(sala.id)
      .delete()
      .then(() => {
        alert("Excluído com sucesso!")
        listar()
      })

  }
  const editar = (item: Sala) => {
    navigation.navigate("Cadastrar sala", { sala: item })//nome do parametro pra esquerda e oq ele vai receber na direita

  }

  return (
    <ImageBackground resizeMode="stretch" source={require('../assets/back.png')} style={styles.container}>



      <View style={[styles.row]}>

        <Text style={styles.tabelatext}>Lista de salas</Text>


      </View>
      <FlatList
        data={salas}
        refreshing={load}
        renderItem={({ item }) => (
          <View style={styles.tabelatext}>

            <TouchableOpacity
              onPress={() => editar(item)}
              onLongPress={() => excluir(item)}>
              <Text>{item.nome}</Text>
            </TouchableOpacity>


          </View>
        )}

      />

    </ImageBackground>
  )
}
