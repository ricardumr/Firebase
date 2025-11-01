import * as React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';
import { useState } from 'react';
import { auth, firestore } from '../firebase';
import { TextInput } from 'react-native-paper';
import { Sala } from "../model/Sala";
import { useEffect } from "react";




export default function Cadastro_sala() {
  
  const[formSala, setFormSala] = useState<Partial<Sala>>({})

  const route = useRoute();
  
  useEffect( () => {//recebe objeto item para editar
    if(route.params){
      setFormSala (route.params.sala)
    }
  },[route.params])//depois usar isso no picker no sala: selectedValue={formSala.usuario}

  const navigation = useNavigation();

  const cadastrar = () =>{

          const refSala = firestore.collection("Usuario")
            .doc(auth.currentUser?.uid)
            .collection("Sala")

            const novoSala = new Sala(formSala)
            if(formSala.id){
            const idSala  = refSala.doc(formSala.id);
              idSala.update(novoSala.toFirestore())
              .then( () => {
                alert('Cadastro atualizado');
                
              })

            }

            

          const idSala  = refSala.doc();
          novoSala.id = idSala.id
            idSala.set(novoSala.toFirestore())
          alert("Sala adicionado com sucesso")
          setFormSala({})
          }

    return(
<ImageBackground source={require('../assets/back.png')} resizeMode='stretch' style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Sala</Text>

    <View style={styles.inputcontainer}>

      <TextInput style={styles.input} label='Nome' onChangeText={valor => setFormSala({
        ...formSala
        ,
        nome:valor
      })} 
      value={formSala.nome}
      />

              <TextInput style={styles.input} label='Responsável' onChangeText={valor => setFormSala({
        ...formSala,
        
        usuario:valor
      })} 
      value={formSala.usuario}
/>



    </View>
      <TouchableOpacity style={styles.botaoCad} onPress={cadastrar}>
        <Text style={styles.text}>Cadastrar</Text>
      </TouchableOpacity>  
      </ImageBackground>
  );
}