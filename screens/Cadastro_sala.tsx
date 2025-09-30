import * as React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';
import { useState } from 'react';
import { auth, firestore } from '../firebase';
import { TextInput } from 'react-native-paper';
import { Sala } from "../model/Sala";

import Home from "./Home";


const Drawer = createDrawerNavigator();

export default function Cadastro_pro() {
  
  const[formSala, setFormSala] = useState<Partial<Sala>>({})

  const navigation = useNavigation();

  const cadastrar = () =>{

          const refSala = firestore.collection("Usuario")
            .doc(auth.currentUser?.uid)
            .collection("Sala")

            const novoSala = new Sala(formSala)

          const idSala  = refSala.doc();
          novoSala.id = idSala.id
            idSala.set(novoSala.toFirestore())
          alert("Sala adicionado com sucesso")
          setFormSala({})
          }

     

    
  


    return(
<ImageBackground source={require('../assets/back.png')} resizeMode='strech' style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Sala</Text>

    <View style={styles.inputcontainer}>

      <TextInput style={styles.input} label='Nome' onChangeText={valor => setFormSala({
        ...formSala
        ,
        nome:valor
      })} 
      value={formSala.nome}
      />

      <TextInput style={styles.input} label='Usuario' onChangeText={valor => setFormSala({
        ...formSala,
        
        usuario:valor
      })} 
      value={formSala.usuario}
      />

      <TextInput style={styles.input} label='Item' onChangeText={valor => setFormSala({
        ...formSala,
        
        item:valor
      })} 
      value={formSala.item}
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