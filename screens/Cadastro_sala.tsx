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

import { Picker } from "@react-native-picker/picker";

import Home from "./Home";


const Drawer = createDrawerNavigator();

export default function Cadastro_sala() {
  
  const[formSala, setFormSala] = useState<Partial<Sala>>({})

  const navigation = useNavigation();

  const cadastrar = () =>{

          const refSala = firestore.collection("sala")
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
        ...formSala,
        nome:valor
      })} 
      value={formSala.nome}
      />
<View style={styles.inputPicker}>
      <Picker mode='dropdown'
      prompt="Selecione um Usuário"
      onValueChange={valor => setFormSala({
        ...formSala,
        tipo : valor
      })}
      >
        <Picker.Item label="Selecione um usuário" value="0" style={styles.textPicker}/>
        <Picker.Item label="Cachorro" value="Cachorro" />
        <Picker.Item label="Gato" value="Gato" />
         <Picker.Item label="Pássaro" value="Pássaro" />
        <Picker.Item label="Equinos" value="Equinos" />
      </Picker>
</View>      
      {/* <TextInput style={styles.input} label='Usuario' onChangeText={valor => setFormSala({ 
        ...formSala,
        
        usuario:valor
      })} 
      value={formSala.usuario}
      /> */}
     

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

      </ImageBackground>
  );
}