import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';
import { TextInput } from 'react-native-paper';

export default function Home() {
  
  const navigation = useNavigation();
  
  const sair = () => {
    auth
    .signOut()
    .then ( ()=> {
      navigation.replace('Login')
    })
  }

  return (
    <ImageBackground source={require('../assets/back.png')} resizeMode='stretch' style={styles.container}>
      <View style = {styles.logo}></View>
      <Text>Bem vindo! {auth.currentUser?.email}</Text>
      
    <TouchableOpacity style={styles.botaoLog} onPress={()=> navigation.replace('Login')}>
        <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
      

    </ImageBackground>
  );
}


