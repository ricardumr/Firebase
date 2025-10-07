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
import { Item } from "../model/Item";

import Home from "./Home";

const Drawer = createDrawerNavigator();

export default function Listar_itens() {
  const [itens, setItens] = useState<Item[]>([]);

  const refItem = firestore
    .collection("Usuario")
    .doc(auth.currentUser?.uid)  
    .collection("Item");

  const listar = () => {
    const subscriber = refItem.onSnapshot((query) => {
      const itens = [];
      query.forEach((documento) => {
        itens.push({
          ...documento.data(),
          key: documento.id,
        });
      });
      setItens(itens);
    });
    return () => subscriber();
  };

  return (
    <View style={styles.container}>
      
            <TouchableOpacity style={styles.botaoList} onPress={listar}>
              <Text style={styles.text}>Listar itens</Text>
            </TouchableOpacity> 
      
      <View style={styles.row}>
        <Text style = {styles.tabela}>Nome</Text>
        <Text style = {styles.tabela}>Número de patrimônio</Text>
        <Text style = {styles.tabela}>Estado</Text>
        </View>
      <FlatList
        data={itens}
        renderItem={({ item }) => (
          <View style={styles.column}>
            <View style={styles .row}>

            <Text style={styles.tabela}> {item.nome}</Text>
            <Text style={styles.tabela}>{item.patrimonio}</Text>
            <Text style={styles.tabela}>{item.estado}</Text>

          </View>
          </View>
        )}
        
      />
      
    </View>
  );
}
