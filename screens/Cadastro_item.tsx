import * as React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';
import { useState } from 'react';
import { auth, firestore } from '../firebase';
import { TextInput } from 'react-native-paper';
import { Item } from "../model/Item";

import Home from "./Home";


const Drawer = createDrawerNavigator();

export default function Cadastro_pro() {
  
  const[formItem, setFormItem] = useState<Partial<Item>>({})

  const navigation = useNavigation();

  const cadastrar = () =>{

          const refItem = firestore.collection("Usuario")
            .doc(auth.currentUser?.uid)
            .collection("Item")

            const novoItem = new Item(formItem)

          const idItem  = refItem.doc();
          novoItem.id = idItem.id
            idItem.set(novoItem.toFirestore())
          alert("Item adicionado com sucesso")
          setFormItem({})
          }

     

    
  


    return(
<ImageBackground source={require('../assets/back.png')} resizeMode='strech' style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Item</Text>

    <View style={styles.inputcontainer}>

      <TextInput style={styles.input} label='Nome' onChangeText={valor => setFormItem({
        ...formItem
        ,
        nome:valor
      })} 
      value={formItem.nome}
      />

      <TextInput style={styles.input} label='Quantidade' onChangeText={valor => setFormItem({
        ...formItem,
        
        quantidade:valor
      })} 
      value={formItem.quantidade}
      />

      <TextInput style={styles.input} label='Validade' onChangeText={valor => setFormItem({
        ...formItem,
        
        validade:valor
      })} 
      value={formItem.validade}
      />

              <TextInput style={styles.input} label='Fone' onChangeText={valor => setFormItem({
        ...formItem,
        
        fone:valor
      })} 
      value={formItem.fone}
/>


    </View>
      <TouchableOpacity style={styles.botaoCad} onPress={cadastrar}>
        <Text style={styles.text}>Cadastrar</Text>
      </TouchableOpacity>  
      <TouchableOpacity style={styles.botaoOp} onPress={()=> navigation.replace('Login')}>
        <Text style={styles.textOp}>Login</Text>
      </TouchableOpacity>  
      </ImageBackground>
  );
}