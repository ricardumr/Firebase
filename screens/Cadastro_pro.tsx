import * as React from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';
import { useState } from 'react';
import { auth, firestore } from '../firebase';
import { TextInput } from 'react-native-paper';
import { Produto } from "../model/Produto"

import Home from "./Home";


const Drawer = createDrawerNavigator();

export default function Cadastro_pro() {
  
  const[formProduto, setFormProduto] = useState<Partial<Produto>>({})

  const navigation = useNavigation();

  const cadastrar = () =>{

          const refProduto = firestore.collection("Usuario")
            .doc(auth.currentUser?.uid)
            .collection("Produto")

            const novoProduto = new Produto(formProduto)

          const idProduto  = refProduto.doc();
          formProduto.id = idProduto.id
            idProduto.set(novoProduto.toFirestore())
          alert("Produto adicionado com sucesso")
          setFormProduto({})
          }

            navigation.replace("Menu")

    }
  


    return(
<ImageBackground source={require('../assets/back.png')} resizeMode='strech' style={styles.container}>
      <Text style={styles.titulo}>Cadastro de produto</Text>

    <View style={styles.inputcontainer}>

      <TextInput style={styles.input} label='Nome' onChangeText={valor => setFormProduto({
        ...formProduto
        ,
        nome:valor
      })} />
      value={formProduto}
      <TextInput style={styles.input} label='Quantidade' onChangeText={valor => setFormProduto({
        ...formProduto,
        
        quantidade:valor
      })} />
      value={formProduto}
      <TextInput style={styles.input} label='Validade' onChangeText={valor => setFormProduto({
        ...formProduto,
        
        validade:valor
      })} />
      value={formProduto}
              <TextInput style={styles.input} label='Fone' onChangeText={valor => setFormProduto({
        ...formProduto,
        
        fone:valor
      })} />
      value={formProduto}



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