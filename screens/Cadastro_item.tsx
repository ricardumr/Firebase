import * as React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';
import { useState } from 'react';
import { auth, firestore } from '../firebase';
import { TextInput } from 'react-native-paper';
import { Item } from "../model/Item";
import { useEffect } from "react";




export default function Cadastro_item() {
  
  const[formItem, setFormItem] = useState<Partial<Item>>({})

  const route = useRoute();
  
  useEffect( () => {//recebe objeto item para editar
    if(route.params){
      setFormItem (route.params.item)
    }
  },[route.params])//depois usar isso no picker no sala: selectedValue={formSala.usuario}

  const navigation = useNavigation();

  const cadastrar = () =>{

          const refItem = firestore.collection("Usuario")
            .doc(auth.currentUser?.uid)
            .collection("Item")

            const novoItem = new Item(formItem)
            if(formItem.id){
            const idItem  = refItem.doc(formItem.id);
              idItem.update(novoItem.toFirestore())
              .then( () => {
                alert('Cadastro atualizado');
                
              })

            }
            else{
           const idItem  = refItem.doc();
          novoItem.id = idItem.id
            idItem.set(novoItem.toFirestore())
          alert("Item adicionado com sucesso")
          setFormItem({})
          }
}
    return(
<ImageBackground source={require('../assets/back.png')} resizeMode='stretch' style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Item</Text>

    <View style={styles.inputcontainer}>

      <TextInput style={styles.input} label='Nome' onChangeText={valor => setFormItem({
        ...formItem
        ,
        nome:valor
      })} 
      value={formItem.nome}
      />
      

      <TextInput style={styles.input} label='Estado' onChangeText={valor => setFormItem({
        ...formItem,
        
        estado:valor
      })} 
      value={formItem.estado}
      />

      <TextInput style={styles.input} label='patrimonio' onChangeText={valor => setFormItem({
        ...formItem,
        
        patrimonio:valor
      })} 
      value={formItem.patrimonio}
      />

              <TextInput style={styles.input} label='observacao' onChangeText={valor => setFormItem({
        ...formItem,
        
        observacao:valor
      })} 
      value={formItem.observacao}
/>
              <TextInput style={styles.input} label='sala' onChangeText={valor => setFormItem({
        ...formItem,
        
        sala:valor
      })} 
      value={formItem.sala}
/>



    </View>
      <TouchableOpacity style={styles.botaoCad} onPress={cadastrar}>
        <Text style={styles.text}>Cadastrar</Text>
      </TouchableOpacity>  
      </ImageBackground>
  );
}