import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';
import { TextInput } from 'react-native-paper';

export default function Login() {

    const navigation = useNavigation();

    const[email,setEmail] = useState('');
    const[senha,setSenha] = useState('');

    const logar = () => {
        auth
        .signInWithEmailAndPassword(email,senha)
        .then(userCredentials => {
            console.log('Logado como:', userCredentials.user.email)
            navigation.replace("Menu")
        })
        .catch(erro => alert(erro.message))
    }
    

  return (
      
        <ImageBackground source={require('../assets/back.png')} resizeMode='strech' style={styles.container}>
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Text style={styles.titulo}>Tela de login</Text>
      
      <View style={styles.inputcontainer}>
        <TextInput 
        style={styles.input}
        label='Email'
        onChangeText={email => setEmail (email)}
        />
        
        <TextInput
        style={styles.input} 
        label='Senha'
        onChangeText={senha => setSenha (senha)}
        secureTextEntry = {true} 
        />
        </View>

        <TouchableOpacity style={styles.botaoLog} onPress={logar}>
          <Text style={styles.text}>entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoOp} onPress={()=> navigation.replace('Registro')}>
          <Text style={styles.textOp}>Registrar</Text>
        </TouchableOpacity>
</KeyboardAvoidingView>
</ImageBackground>        

  );
}

