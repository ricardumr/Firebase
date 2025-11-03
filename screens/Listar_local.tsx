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


export default function Listar_local() {
  const navigation = useNavigation();
  const [itens, setItens] = useState<Item[]>([]);
  const [load, setLoad] = useState(true)

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
 
    <Text style={styles.tabelatext}>Lista de Itens em cada sala</Text>
 

</View>
      <FlatList
        data={itens}
        refreshing={load}
        renderItem={({ item }) => (
          <View style={styles.tabelatext}>
            

                <Text>Sala:{item.sala}</Text>
                <Text>Itens:{item.nome}</Text>
                

            
          
          </View>
        )}
        
      />
      
    </ImageBackground>
  )
}
