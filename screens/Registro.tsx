import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { auth, firestore } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import styles from "../estilo";
import { TextInput } from "react-native-paper";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Usuario } from "../model/Usuario";
import Header from "../components/Header";

export default function Registro() {
  const [formUsuario, setFormUsuario] = useState<Partial<Usuario>>({});
  const navigation = useNavigation();

  const cadastrar = () => {
    auth
      .createUserWithEmailAndPassword(formUsuario.email, formUsuario.senha)
      .then((userCredentials) => {
        console.log("Logado como:", userCredentials.user?.email);
        navigation.replace("Menu");

        const refUsuario = firestore.collection("Usuario");
        const idUsuario = refUsuario.doc(auth.currentUser.uid);
        idUsuario.set({
          id: auth.currentUser.uid,
          nome: formUsuario.nome,
          email: formUsuario.email,
          senha: formUsuario.senha,

        });
      })
      .catch((erro) => alert(erro.message));
  };


  return (
    <ImageBackground
      source={require("../assets/back.png")}
      resizeMode="stretch"
      style={styles.container}
    >
      <Header title="Registrar Usuário" showMenu={false} />

      <View style={styles.formCard}>
        <Text style={styles.titulo}>Cadastro de usuário</Text>

        <TextInput
          mode="outlined"
          label="Nome"
          style={styles.inputOutlined}
          outlineColor="#e2e8f0"
          activeOutlineColor="#3B82F6"
          onChangeText={(valor) =>
            setFormUsuario({ ...formUsuario, nome: valor })
          }
        />

        <TextInput
          mode="outlined"
          label="Email"
          style={styles.inputOutlined}
          outlineColor="#e2e8f0"
          activeOutlineColor="#3B82F6"
          onChangeText={(valor) =>
            setFormUsuario({ ...formUsuario, email: valor })
          }
        />


        

        <TextInput
          mode="outlined"
          label="Senha"
          secureTextEntry={true}
          style={styles.inputOutlined}
          outlineColor="#e2e8f0"
          activeOutlineColor="#3B82F6"
          onChangeText={(valor) =>
            setFormUsuario({ ...formUsuario, senha: valor })
          }
        />
</View>
        <View style={styles.formActions}>
          <TouchableOpacity style={styles.primaryButton} onPress={cadastrar}>
            <Text style={styles.primaryButtonText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.botaoOp, { marginTop: 8 }]}
            onPress={() => navigation.replace("Login")}
          >
            <Text style={styles.primaryButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      
    </ImageBackground>
  );
}
