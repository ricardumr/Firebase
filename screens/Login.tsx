import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import styles from "../estilo";
import { TextInput } from "react-native-paper";
import Header from "../components/Header";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const logar = () => {
    auth
      .signInWithEmailAndPassword(email, senha)
      .then((userCredentials) => {
        console.log("Logado como:", userCredentials.user.email);
        navigation.replace("Menu");
      })
      .catch((erro) => alert(erro.message));
  };

  return (
    <ImageBackground
      source={require("../assets/back.png")}
      resizeMode="stretch"
      style={styles.container}
    >
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header title="Login" showMenu={false} />

        <View style={styles.formCard}>
          <TextInput
            mode="outlined"
            label="Email"
            style={styles.inputOutlined}
            outlineColor="#e2e8f0"
            activeOutlineColor="#3B82F6"
            onChangeText={(email) => setEmail(email)}
            value={email}
          />
          <TextInput
            mode="outlined"
            label="Senha"
            style={styles.inputOutlined}
            outlineColor="#e2e8f0"
            activeOutlineColor="#3B82F6"
            secureTextEntry={true}
            onChangeText={(senha) => setSenha(senha)}
            value={senha}
          />
          <View style={styles.formActions}>
            <TouchableOpacity style={styles.primaryButton} onPress={logar}>
              <Text style={styles.primaryButtonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.secondButton, { marginTop: 8 }]}
              onPress={() => navigation.replace("Registro")}
            >
              <Text style={styles.secondButtonText}>Registrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
