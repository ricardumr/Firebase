import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { auth, firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';
import { TextInput } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Usuario } from '../model/Usuario';

export default function Registro() {
  
  const [formUsuario, setFormUsuario] = useState<Partial<Usuario>>({})
  const [DataPickerVisivel, setDataPickerVisivel] = useState(false)
  const navigation = useNavigation();

  const cadastrar = () =>{
    auth
    .createUserWithEmailAndPassword(formUsuario.email, formUsuario.senha)
    .then(userCredentials => {
            console.log('Logado como:', userCredentials.user?.email)
            navigation.replace("Menu")

          const refUsuario = firestore.collection("Usuario");
          const idUsuario  = refUsuario.doc(auth.currentUser.uid);
            idUsuario.set({
              id      : auth.currentUser.uid,
              nome    : formUsuario.nome,
              email   : formUsuario.email,
              senha   : formUsuario.senha,
              nascimento    : formUsuario.nascimento
              ? formUsuario.nascimento.toISOString()
              : null,

            });
    })
    .catch((erro) => alert(erro.message));
  }
  const confirmarData = (data) => {
    setFormUsuario({
      ...formUsuario,
      nascimento: data,
    });
    setDataPickerVisivel(false);
  }

  return (
      <ImageBackground source={require('../assets/back.png')} resizeMode='stretch' style={styles.container}>
      <Text style={styles.titulo}>Cadastro de usuário</Text>

    <View style={styles.inputcontainer}>

      <TextInput style={styles.input} label='Nome' onChangeText={valor => setFormUsuario({
        ...formUsuario,
        nome:valor
      })} />
      <TextInput style={styles.input} label='Email' onChangeText={valor => setFormUsuario({
        ...formUsuario,
        email:valor
      })} />

          <TouchableOpacity 
    style={styles.inputPicker}
    onPress={() => setDataPickerVisivel(true)}>
      <Text style={styles.inputPicker}>
        {formUsuario.nascimento
        ?formUsuario.nascimento.toLocaleDateString()
        :'Selecionar data de nascimento.'
        }
        </Text> 
    </TouchableOpacity>

    <DateTimePicker
    isVisible={DataPickerVisivel}
    mode="date"
    onConfirm={confirmarData}
    onCancel={() => setDataPickerVisivel(false)}
    maximumDate={new Date()}
/>
      <TextInput style={styles.input} secureTextEntry = {true} label='Senha' onChangeText={valor => setFormUsuario({
        ...formUsuario,
        senha:valor
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
