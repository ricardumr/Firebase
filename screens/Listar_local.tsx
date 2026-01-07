import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import styles from "../estilo";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import { TextInput } from "react-native-paper";
import { Item } from "../model/Item";
import { Picker } from "@react-native-picker/picker";

export default function Listar_local() {
  const navigation = useNavigation();
  const [itens, setItens] = useState<Item[]>([]);
  const [load, setLoad] = useState(true);
  const [formItem, setFormItem] = useState<Partial<Item>>({});
  const [tipoSelecionado, setTipoSelecionado] = useState("");

  const refItem = firestore
    .collection("Usuario")
    .doc(auth.currentUser?.uid)
    .collection("Item");

  useEffect(() => {
    if (load) {
      listar();
    }
  });

  const listar = () => {
    const subscriber = refItem
      .where("sala", "==", tipoSelecionado)
      .onSnapshot((query) => {
        const itens = [];
        query.forEach((documento) => {
          itens.push({
            ...documento.data(),
            key: documento.id,
          });
        });
        setItens(itens);
        setLoad(false);
        console.log(itens);
      });
    return () => subscriber();
  };

  return (
    <ImageBackground
      resizeMode="stretch"
      source={require("../assets/back.png")}
      style={styles.container}
    >
      <View style={{ width: "100%", marginLeft: 20, marginTop: 90 }}>
      <Header title="Itens por Sala" />

      <View style={styles.filterCard}>
        <Text style={{ fontWeight: "600", color: "#1f2937", marginBottom: 8 }}>
          Selecione uma sala:
        </Text>
        <View style={styles.selectWrapper}>
          <Picker
            mode="dialog"
            onValueChange={(valor) => {
              setTipoSelecionado(valor);
              setLoad(true);
            }}
            selectedValue={tipoSelecionado}
          >
            <Picker.Item label="Selecione uma sala..." value="0" />
            <Picker.Item label="301" value="301" />
            <Picker.Item label="302" value="302" />
            <Picker.Item label="303" value="303" />
            <Picker.Item label="304" value="304" />
          </Picker>
        </View>
      </View>
</View>
      <FlatList
        data={itens ?? []}
        keyExtractor={(item, index) => item.key ?? item.id ?? String(index)}
        refreshing={load}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={{ color: "#fff", marginTop: 20 }}>
            Nenhum item nesta sala
          </Text>
        }
        renderItem={({ item }) => (
          
          <View style={styles.listCard}>
            <View style={{ flexDirection: "row" }}>
            <Text style={styles.listCardText}>{item.nome}:</Text>
            <Text style={styles.listCardSubtext}>Sala: {item.sala};</Text>
            <Text style={styles.listCardSubtext}>
              Patrimônio: {item.patrimonio};
            </Text>
            <Text style={styles.listCardSubtext}>Estado: {item.estado}</Text>
          </View>
          </View>
          
        )}
      />
    </ImageBackground>
  );
}
