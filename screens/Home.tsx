import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      <Text>Bem vindo! {auth.currentUser?.email}</Text>
      
      
      <Button title='Logout' onPress={sair}/>

    </View>
  );
}


