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
import { Item } from "../model/Item";
import { Conferencia } from "../model/Conferencia";


export default function Conferencia_inventario() {
  const navigation = useNavigation();
  const [itens, setItens] = useState<Item[]>([]);
  const [load, setLoad] = useState(true)
  const [confs, setConfs] = useState<Conferencia[]>([]);
  
    const refConfs = firestore
    .collection("Usuario")
    .doc(auth.currentUser?.uid)  
    .collection("Conferencia");
    
    useEffect( () => {
      if(load){
        listar();
      }
    })

  const listarconfs = () => {
    const subscriber = refConfs.onSnapshot((query) => {
      const confs = [];
      query.forEach((documento) => {
        confs.push({
          ...documento.data(),
          key: documento.id,
        });
      });
      setItens(itens);
      setLoad(false);
      console.log(itens)
    });
    return () => subscriber();
  };


  const refItem = firestore
    .collection("Usuario")
    .doc(auth.currentUser?.uid)  
    .collection("Item");
    
    useEffect( () => {
      if(load){
        listar();
      }
    })

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
      setLoad(false);
      console.log(itens)
    });
    return () => subscriber();
  };



  return (
    <ImageBackground resizeMode="stretch" source={require('../assets/back.png')} style={styles.container}>
      

      
<View style={[styles.row]}>
 
    <Text style={styles.tabelatext}>Conferencia de estoque</Text>
 

  </View>
      <FlatList
        data={itens}
        refreshing={load}
        renderItem={({ item }) => (
          <View style={styles.tabelatext}>  
  </View>
        )}
        
      />
      
    </ImageBackground>
  )
}
