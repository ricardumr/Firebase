import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import styles from "../estilo";
import { useState } from "react";
import { auth, firestore } from "../firebase";
import { TextInput } from "react-native-paper";
import { Sala } from "../model/Sala";
import { useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import Header from "../components/Header";

export default function Cadastro_sala() {
  const [formSala, setFormSala] = useState<Partial<Sala>>({});
  const [salas, setSalas] = useState<Sala[]>([]);

  const route = useRoute();

  useEffect(() => {
    //recebe objeto sala para editar
    if (route.params) {
      setFormSala(route.params.sala);
    }
  }, [route.params]); //depois usar isso no picker no sala: selectedValue={formSala.usuario}

  useEffect(() => {
    //carrega as salas cadastradas para validação
    const refSala = firestore
      .collection("Usuario")
      .doc(auth.currentUser?.uid)
      .collection("Sala");

    refSala.onSnapshot((querySnapshot) => {
      const salasArray: Sala[] = [];
      querySnapshot.forEach((doc) => {
        salasArray.push(new Sala(doc.data() as Partial<Sala>));
      });
      setSalas(salasArray);
    });
  }, []);

  const navigation = useNavigation();

  const cadastrar = () => {
    const refSala = firestore
      .collection("Usuario")
      .doc(auth.currentUser?.uid)
      .collection("Sala");

    // Validação de nome vazio
    if (!formSala.nome || formSala.nome.trim() === "") {
      alert("Por favor, insira um nome para a sala");
      return;
    }

    // Validação de duplicação de nome (apenas para novas salas)
    if (!formSala.id) {
      const nomeDuplicado = salas.some(
        (sala) => sala.nome.toLowerCase() === formSala.nome.toLowerCase()
      );
      if (nomeDuplicado) {
        alert(
          "Já existe uma sala com este nome. Por favor, escolha outro nome."
        );
        return;
      }
    }

    const novoSala = new Sala(formSala);
    if (formSala.id) {
      const idSala = refSala.doc(formSala.id);
      idSala.update(novoSala.toFirestore()).then(() => {
        alert("Cadastro atualizado");
      });
    } else {
      const idSala = refSala.doc();
      novoSala.id = idSala.id;
      idSala.set(novoSala.toFirestore());
      alert("Sala adicionado com sucesso");
      setFormSala({});
    }
  };

  return (
    <ImageBackground
      source={require("../assets/back.png")}
      resizeMode="stretch"
      style={styles.container}
    >
      <Header title="Cadastro de Sala" showMenu={true} />

      <View style={styles.formCard}>
        <Text style={styles.titulo}>Cadastro de Sala</Text>

        <TextInput
          mode="outlined"
          label="Nome"
          style={styles.inputOutlined}
          outlineColor="#e2e8f0"
          activeOutlineColor="#3B82F6"
          onChangeText={(valor) => setFormSala({ ...formSala, nome: valor })}
          value={formSala.nome}
        />

        <View style={styles.selectWrapper}>
          <Picker
            mode="dialog"
            onValueChange={(valor) =>
              setFormSala({ ...formSala, usuario: valor })
            }
            selectedValue={formSala.usuario}
          >
            <Picker.Item label="Selecione um responsavel..." value="0" />
            <Picker.Item label="Lisandro" value="Lisandro" />
            <Picker.Item label="Marcel" value="Marcel" />
            <Picker.Item label="Diego" value="Diego" />
            <Picker.Item label="Roger" value="Roger" />
          </Picker>
        </View>

        <View style={styles.formActions}>
          <TouchableOpacity style={styles.primaryButton} onPress={cadastrar}>
            <Text style={styles.primaryButtonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
