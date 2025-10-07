import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { auth, firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import style from "../estilo"
import { Picker } from '@react-native-picker/picker';

import { Sala } from '../model/Sala';


export default function Listar_salas() {
    const[salas, setSalas]= useState<Sala[]>([]); //array das salas
   const refSala = firestore
    .collection("Usuario")
    .doc(auth.currentUser?.uid)
    .collection("Salas")

    const listar = () =>{
        const relatorio = refSala
        .onSnapshot( (query) => {
            const salas = [];
            query.forEach((documento) =>{
                salas.push ({
                    ...documento.data(),
                    key: documento.id
               });
            })
            setSalas(salas)
        })

    }
   return(
    <View style= {style.container}>
<Button title= "Listar Salas " onPress={listar}/>
        <FlatList
        data={salas}
        renderItem={({item}) => (
            <View>
                <Text>{item.nome}</Text>
            </View>

        )}

    />
    </View>

    )
  }