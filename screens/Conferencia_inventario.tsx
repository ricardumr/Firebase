import * as React from "react";
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../estilo";
import { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import {
  Checkbox,
  Button as PaperButton,
  IconButton,
} from "react-native-paper";
import { Item } from "../model/Item";
import { Conferencia } from "../model/Conferencia";

export default function Conferencia_inventario() {
  const navigation = useNavigation();
  const [itens, setItens] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState<{ [key: string]: string | null }>(
    {}
  );

  const refItem = firestore
    .collection("Usuario")
    .doc(auth.currentUser?.uid)
    .collection("Item");

  useEffect(() => {
    const subscriber = refItem.onSnapshot((query) => {
      const itensList: any[] = [];
      query.forEach((documento) => {
        itensList.push({
          ...documento.data(),
          key: documento.id,
        });
      });
      setItens(itensList);
      setLoading(false);
    });
    return () => subscriber();
  }, []);

  function setStatus(itemKey: string, value: string) {
    setStatuses((prev) => ({
      ...prev,
      [itemKey]: prev[itemKey] === value ? null : value,
    }));
  }

  // Validar se todos os itens têm uma checkbox marcada
  const allItemsChecked = (): boolean => {
    if (itens.length === 0) return false;
    return itens.every((item) => {
      const key = item.key || item.id || JSON.stringify(item);
      return statuses[key] !== null && statuses[key] !== undefined;
    });
  };

  // Salvar conferência no Firestore
  const finalizarConferencia = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        Alert.alert("Erro", "Usuário não autenticado");
        return;
      }

      // Construir array de itens com seus status
      const itensConfirmados = itens.map((item) => {
        const key = item.key || item.id || JSON.stringify(item);
        return {
          itemId: item.key || item.id,
          itemNome: item.nome,
          sala: item.sala,
          patrimonio: item.patrimonio,
          status: statuses[key],
        };
      });

      // Criar objeto de conferência
      const conferencia = {
        id: `conferencia_${Date.now()}`,
        data: new Date(),
        itens: itensConfirmados,
        timestamp: new Date(),
      };

      // Salvar no Firestore
      await firestore
        .collection("Usuario")
        .doc(uid)
        .collection("Conferencia")
        .doc(conferencia.id)
        .set(conferencia);

      Alert.alert(
        "Sucesso!",
        "Conferência finalizada e armazenada com sucesso",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error("Erro ao finalizar conferência:", error);
      Alert.alert("Erro", "Não foi possível salvar a conferência");
    }
  };

  const renderHeader = () => (
    <View style={{ marginTop: 120 }}>
      <View style={styles.card}>
        <Text style={styles.title}>Conferência de Inventário</Text>
        <View style={styles.tableHeader}>
          <View style={[styles.cell, { flex: 2 }]}>
            <Text style={styles.headerText}>Item</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.headerText}>Sala</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.headerText}>Patrimônio</Text>
          </View>
          <View style={[styles.checkboxCell]}>
            <Text style={styles.headerText}>Sim</Text>
          </View>
          <View style={[styles.checkboxCell]}>
            <Text style={styles.headerText}>Sim (fora)</Text>
          </View>
          <View style={[styles.checkboxCell]}>
            <Text style={styles.headerText}>Não</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: any }) => {
    const key = item.key || item.id || JSON.stringify(item);
    const status = statuses[key] || null;
    return (
      <View style={[styles.card, styles.tableRow]}>
        <View style={[styles.cell, { flex: 2 }]}>
          <Text>{item.nome}</Text>
        </View>
        <View style={styles.cell}>
          <Text>{item.sala}</Text>
        </View>
        <View style={styles.cell}>
          <Text>{item.patrimonio}</Text>
        </View>
        <View style={styles.checkboxCell}>
          <TouchableOpacity
            onPress={() => setStatus(key, "correct")}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 20,
                color: status === "correct" ? "#10b981" : "#d1d5db",
              }}
            >
              {status === "correct" ? "✓" : "○"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxCell}>
          <TouchableOpacity
            onPress={() => setStatus(key, "wrong")}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 20,
                color: status === "wrong" ? "#f59e0b" : "#d1d5db",
              }}
            >
              {status === "wrong" ? "✓" : "○"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxCell}>
          <TouchableOpacity
            onPress={() => setStatus(key, "not_found")}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 20,
                color: status === "not_found" ? "#ef4444" : "#d1d5db",
              }}
            >
              {status === "not_found" ? "✓" : "○"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      resizeMode="stretch"
      source={require("../assets/back.png")}
      style={styles.container}
    >
      {renderHeader()}
      <FlatList
        data={itens}
        keyExtractor={(item) => item.key}
        refreshing={loading}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 120,
          width: "100%",
          alignItems: "center",
        }}
      />
      {/* Botão Finalizar Conferência */}
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          gap: 10,
        }}
      >
        <PaperButton
          mode="contained"
          style={[
            styles.primaryButton,
            {
              backgroundColor: allItemsChecked() ? "#3B82F6" : "#d1d5db",
            },
          ]}
          disabled={!allItemsChecked()}
          onPress={finalizarConferencia}
          labelStyle={{ fontSize: 16, fontWeight: "bold" }}
        >
          Finalizar Conferência
        </PaperButton>
      </View>
    </ImageBackground>
  );
}
