import * as React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';
import { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { TextInput } from 'react-native-paper';
import { Sala } from "../model/Sala";

import { Picker } from "@react-native-picker/picker";

export default function Cadastro_sala() {
  
const [formSala, setFormSala] = useState<Partial<Sala>>({});
const [formUsuario, setFormUsuario] = useState<Partial<Sala>>({});

  const [usuario, setUsuario] = useState<any[]>([]);
  const [itens, setItens] = useState<any[]>([]);
  const navigation = useNavigation();

  // 🔹 Buscar usuários
  // useEffect(() => {
  //   const unsubscribeUsuarios = firestore
  //     .collection("usuarios") // nome da coleção de usuários
  //     .onSnapshot((snapshot) => {
  //       const listaUsuarios = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));
  //       setUsuarios(listaUsuarios);
  //     });

  //   return () => unsubscribeUsuarios();
  // }, []);

  // 🔹 Buscar itens
  useEffect(() => {
    const unsubscribeItens = firestore
      .collection("itens") // nome da coleção de itens
      .onSnapshot((snapshot) => {
        const listaItens = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setItens(listaItens);
      });

    return () => unsubscribeItens();
  }, []);

  // 🔹 Função de cadastro da sala
  const cadastrar = () => {
    const refSala = firestore
      .collection("sala")
      .doc(auth.currentUser?.uid)
      .collection("Sala");

    const novaSala = new Sala(formSala);
    const idSala = refSala.doc();
    novaSala.id = idSala.id;

    idSala.set(novaSala.toFirestore())
      .then(() => {
        alert("Sala adicionada com sucesso!");
        setFormSala({});
      })
      .catch((error) => {
        console.error("Erro ao cadastrar sala:", error);
        alert("Erro ao cadastrar sala.");
      });
  };
  
    return(
 <ImageBackground source={require('../assets/back.png')} resizeMode='stretch' style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Sala</Text>

      <View style={styles.inputcontainer}>

        <TextInput
          style={styles.input}
          label='Nome da Sala'
          onChangeText={valor => setFormSala({ ...formSala, nome: valor })}
          value={formSala.nome}
        />
        <TextInput
          style={styles.input}
          label='Responsável pela sala'
          onChangeText={valor => setFormUsuario({ ...formUsuario, nome: valor })}
          value={formUsuario.nome}
        />

        {/* Picker de Usuários */}
        {/* <View style={styles.inputPicker}>
          <Picker
            mode='dropdown'
            prompt="Selecione um Usuário"
            selectedValue={formSala.Usuario}
            onValueChange={valor => setFormSala({ ...formSala, Usuario: valor })}
          >
            <Picker.Item label="Selecione um usuário" value="" style={styles.textPicker}/>
            {usuarios.map((user) => (
              <Picker.Item key={user.id} label={user.nome || user.email || "Usuário sem nome"} value={user.id} />
            ))}
          </Picker>
        </View> *ISSO TBM/}

        {/* Picker de Itens */}
        {/* <View style={styles.inputPicker}>
          <Picker
            mode='dropdown'
            prompt="Selecione um Item"
            selectedValue={formSala.Item}
            onValueChange={valor => setFormSala({ ...formSala, Item: valor })}
          >
            <Picker.Item label="Selecione um item" value="" style={styles.textPicker}/>
            {itens.map((item) => (
              <Picker.Item key={item.id} label={item.nome || item.descricao || "Item sem nome"} value={item.id} />
            ))}
          </Picker>
        </View> DXA ESSA PORR PRO TCC SÓ*/}

      </View>

      <TouchableOpacity style={styles.botaoCad} onPress={cadastrar}>
        <Text style={styles.text}>Cadastrar</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}