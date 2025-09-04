import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';
import { TextInput } from 'react-native-paper';

export default function Registro() {
  
  const [nome,setNome]=useState('');
  const [email,setEmail]=useState('');
  const [senha,setSenha]=useState('');
  const [fone,setFone]=useState('');

  const navigation = useNavigation();

  const cadastrar = () =>{
    auth
    .createUserWithEmailAndPassword(email, senha)
    .then(userCredentials => {
            console.log('Logado como:', userCredentials.user.email)
            navigation.replace("Home")
    })
  }

  return (
    <View style={styles.container}>
      <Text>Cadastro de usuário</Text>

      <TextInput label='Nome' onChangeText={texto => setNome(texto)}/>
      <TextInput label='Email' onChangeText={texto => setEmail(texto)}/>
      <TextInput label='Senha' onChangeText={texto => setSenha(texto)}/>
      <TextInput label='Fone' onChangeText={texto => setFone(texto)}/>

      <Button title="Cadastrar" onPress={cadastrar}/>

    </View>
  );
}

