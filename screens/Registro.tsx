import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground } from 'react-native';
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
      <ImageBackground source={require('../assets/back.png')} resizeMode='strech' style={styles.container}>
      <Text style={styles.titulo}>Cadastro de usuário</Text>

    <View style={styles.inputcontainer}>

      <TextInput style={styles.input} label='Nome' onChangeText={texto => setNome(texto)}/>
      <TextInput style={styles.input} label='Email' onChangeText={texto => setEmail(texto)}/>
      <TextInput style={styles.input} secureTextEntry = {true} label='Senha' onChangeText={texto => setSenha(texto)}/>
      <TextInput style={styles.input} label='Fone' onChangeText={texto => setFone(texto)}/>
    </View>
      <TouchableOpacity style={styles.botaoCad} onPress={()=> navigation.replace('Cadastro')}>
        <Text style={styles.text}>Cadastrar</Text>
      </TouchableOpacity>  
      <TouchableOpacity style={styles.botaoOp} onPress={()=> navigation.replace('Login')}>
        <Text style={styles.textOp}>Login</Text>
      </TouchableOpacity>  
      </ImageBackground>
  );
}
