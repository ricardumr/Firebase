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
import { Item } from "../model/Item";
import { useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import Header from "../components/Header";
import { Sala } from "../model/Sala";

export default function Cadastro_item() {
  const [formItem, setFormItem] = useState<Partial<Item>>({});
  const [salas, setSalas] = useState<Sala[]>([]);

  const route = useRoute();

  useEffect(() => {
    //recebe objeto item para editar
    if (route.params) {
      setFormItem(route.params.item);
    }
  }, [route.params]); //depois usar isso no picker no sala: selectedValue={formSala.usuario}

  useEffect(() => {
    //carrega as salas cadastradas
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
    const refItem = firestore
      .collection("Usuario")
      .doc(auth.currentUser?.uid)
      .collection("Item");

    const novoItem = new Item(formItem);
    if (formItem.id) {
      const idItem = refItem.doc(formItem.id);
      idItem.update(novoItem.toFirestore()).then(() => {
        alert("Cadastro atualizado");
      });
    } else {
      const idItem = refItem.doc();
      novoItem.id = idItem.id;
      idItem.set(novoItem.toFirestore());
      alert("Item adicionado com sucesso");
      setFormItem({});
    }
  };
  return (
    <ImageBackground
      source={require("../assets/back.png")}
      resizeMode="stretch"
      style={styles.container}
    >
      <Header title="Cadastro de Item" showMenu={true} />
      <View style={styles.formCard}>
        <Text style={styles.titulo}>Cadastro de Item</Text>

        <TextInput
          mode="outlined"
          label="Nome"
          style={styles.inputOutlined}
          outlineColor="#e2e8f0"
          activeOutlineColor="#3B82F6"
          onChangeText={(valor) => setFormItem({ ...formItem, nome: valor })}
          value={formItem.nome}
        />

        <TextInput
          mode="outlined"
          label="Estado"
          style={styles.inputOutlined}
          outlineColor="#e2e8f0"
          activeOutlineColor="#3B82F6"
          onChangeText={(valor) => setFormItem({ ...formItem, estado: valor })}
          value={formItem.estado}
        />

        <TextInput
          mode="outlined"
          label="Patrimônio"
          style={styles.inputOutlined}
          outlineColor="#e2e8f0"
          activeOutlineColor="#3B82F6"
          onChangeText={(valor) =>
            setFormItem({ ...formItem, patrimonio: valor })
          }
          value={formItem.patrimonio}
        />

        <TextInput
          mode="outlined"
          label="Observação"
          style={styles.inputOutlined}
          outlineColor="#e2e8f0"
          activeOutlineColor="#3B82F6"
          onChangeText={(valor) =>
            setFormItem({ ...formItem, observacao: valor })
          }
          value={formItem.observacao}
        />

        <View style={styles.selectWrapper}>
          <Picker
            mode="dialog"
            onValueChange={(valor) => setFormItem({ ...formItem, sala: valor })}
            selectedValue={formItem.sala}
          >
            <Picker.Item label="Selecione uma sala..." value="" />
            {salas.map((sala) => (
              <Picker.Item key={sala.id} label={sala.nome} value={sala.nome} />
            ))}
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
