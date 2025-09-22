import * as React from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';
import { useState } from 'react';
import { auth, firestore } from '../firebase';
import { TextInput } from 'react-native-paper';

import Home from "./Home";


const Drawer = createDrawerNavigator();

export default function Cadastro_pro() {
  
  const[formProduto, setFormProduto] = useState<Partial<Produto>>({})

  const navigation = useNavigation();

  const cadastrar = () =>{

          const refProduto = firestore.collection("Produto");
          const idProduto  = refProduto.doc(auth.currentUser.uid);
            idProduto.set({
              id           : auth.currentUser.uid,
              nome         : formProduto.nome,
              quantidade   : formProduto.quantidade,
              validade        : formProduto.validade,
              fone         : formProduto.fone,

            })

    }
  }


    return(
<ImageBackground source={require('../assets/back.png')} resizeMode='strech' style={styles.container}>
      <Text style={styles.titulo}>Cadastro de usuário</Text>

    <View style={styles.inputcontainer}>

      <TextInput style={styles.input} label='Nome' onChangeText={valor => setFormProduto({
        ...formProduto,
        nome:valor
      })} />
      <TextInput style={styles.input} label='Quantidade' onChangeText={valor => setFormProduto({
        ...formProduto,
        quantidade:valor
      })} />
      <TextInput style={styles.input} label='validade' onChangeText={valor => setFormProduto({
        ...formProduto,
        validade:valor
      })} />



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