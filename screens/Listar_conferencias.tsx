import * as React from "react";
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../estilo";
import { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import Header from "../components/Header";
import DrawerTab from "../components/DrawerTab";
import { TextInput, Button as PaperButton } from "react-native-paper";

export default function Listar_conferencias() {
  const navigation = useNavigation();
  const [conferencias, setConferencias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataFiltro, setDataFiltro] = useState("");
  const [filtradas, setFiltradas] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [conferenciaSelecionada, setConferenciaSelecionada] =
    useState<any>(null);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const subscriber = firestore
      .collection("Usuario")
      .doc(uid)
      .collection("Conferencia")
      .orderBy("timestamp", "desc")
      .onSnapshot((query) => {
        const conferenciasLista: any[] = [];
        query.forEach((documento) => {
          conferenciasLista.push({
            ...documento.data(),
            key: documento.id,
          });
        });
        setConferencias(conferenciasLista);
        setFiltradas(conferenciasLista);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  const formatarData = (data: any) => {
    if (!data) return "N/A";
    const dataObj = data.toDate ? data.toDate() : new Date(data);
    return dataObj.toLocaleDateString("pt-BR");
  };

  const filtrarPorData = (texto: string) => {
    setDataFiltro(texto);
    if (!texto) {
      setFiltradas(conferencias);
    } else {
      const filtered = conferencias.filter((conf) => {
        const dataConf = formatarData(conf.data);
        return dataConf.includes(texto);
      });
      setFiltradas(filtered);
    }
  };

  const deleteConferencia = (id: string) => {
    Alert.alert("Deletar", "Tem certeza que deseja deletar essa conferência?", [
      { text: "Cancelar" },
      {
        text: "Deletar",
        onPress: async () => {
          try {
            const uid = auth.currentUser?.uid;
            if (uid) {
              await firestore
                .collection("Usuario")
                .doc(uid)
                .collection("Conferencia")
                .doc(id)
                .delete();
              Alert.alert("Sucesso", "Conferência deletada");
            }
          } catch (error) {
            Alert.alert("Erro", "Não foi possível deletar a conferência");
          }
        },
      },
    ]);
  };

  const renderConferencia = ({ item }: { item: any }) => {
    const totalItens = item.itens?.length || 0;
    const corretos =
      item.itens?.filter((i: any) => i.status === "correct").length || 0;
    const errados =
      item.itens?.filter((i: any) => i.status === "wrong").length || 0;
    const naoEncontrados =
      item.itens?.filter((i: any) => i.status === "not_found").length || 0;

    return (
      <TouchableOpacity
        onPress={() => {
          setConferenciaSelecionada(item);
          setModalVisible(true);
        }}
      >
        <View style={{ marginHorizontal: 40 }}>
          <View style={styles.listCard}>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              <Text style={styles.listCardText}>
                Conf. #{item.id?.split("_")[1] || "N/A"}:
              </Text>
              <Text style={styles.listCardSubtext}>
                Data: {formatarData(item.data)};
              </Text>
              <Text style={styles.listCardSubtext}>
                Total: {totalItens} itens;
              </Text>
              <Text style={styles.listCardSubtext}>✓ {corretos};</Text>
              <Text style={styles.listCardSubtext}>Fora {errados};</Text>
              <Text style={styles.listCardSubtext}>Não {naoEncontrados}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderModal = () => {
    if (!conferenciaSelecionada) return null;

    return (
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setModalVisible(false);
          setConferenciaSelecionada(null);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <View
            style={[
              styles.card,
              { width: "100%", maxHeight: "80%", padding: 16 },
            ]}
          >
            <Text
              style={[styles.title, { marginBottom: 16, textAlign: "center" }]}
            >
              Conferência #{conferenciaSelecionada.id?.split("_")[1] || "N/A"}
            </Text>

            {/* Header da Planilha */}
            <View
              style={{
                marginBottom: 12,
                borderBottomWidth: 2,
                borderBottomColor: "#3B82F6",
                paddingBottom: 8,
              }}
            >
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Text
                  style={{
                    flex: 2,
                    fontWeight: "bold",
                    color: "#1f2937",
                    fontSize: 11,
                  }}
                >
                  Item
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontWeight: "bold",
                    color: "#1f2937",
                    fontSize: 11,
                  }}
                >
                  Sala
                </Text>
                <Text
                  style={{
                    flex: 1.2,
                    fontWeight: "bold",
                    color: "#1f2937",
                    fontSize: 11,
                  }}
                >
                  Patrimônio
                </Text>
                <Text
                  style={{
                    flex: 0.8,
                    fontWeight: "bold",
                    color: "#10b981",
                    textAlign: "center",
                    fontSize: 11,
                  }}
                >
                  Sim
                </Text>
                <Text
                  style={{
                    flex: 0.8,
                    fontWeight: "bold",
                    color: "#f59e0b",
                    textAlign: "center",
                    fontSize: 11,
                  }}
                >
                  Fora
                </Text>
                <Text
                  style={{
                    flex: 0.8,
                    fontWeight: "bold",
                    color: "#ef4444",
                    textAlign: "center",
                    fontSize: 11,
                  }}
                >
                  Não
                </Text>
              </View>
            </View>

            {/* Itens da Planilha */}
            <ScrollView style={{ maxHeight: "60%", marginBottom: 16 }}>
              {conferenciaSelecionada.itens &&
                conferenciaSelecionada.itens.map(
                  (itemConf: any, idx: number) => (
                    <View
                      key={idx}
                      style={{
                        flexDirection: "row",
                        gap: 4,
                        paddingVertical: 6,
                        borderBottomWidth: 1,
                        borderBottomColor: "#e5e7eb",
                      }}
                    >
                      <Text style={{ flex: 2, color: "#111827", fontSize: 11 }}>
                        {itemConf.itemNome}
                      </Text>
                      <Text style={{ flex: 1, color: "#6b7280", fontSize: 11 }}>
                        {itemConf.sala}
                      </Text>
                      <Text
                        style={{ flex: 1.2, color: "#6b7280", fontSize: 11 }}
                      >
                        {itemConf.patrimonio}
                      </Text>

                      <Text
                        style={{
                          flex: 0.8,
                          textAlign: "center",
                          color:
                            itemConf.status === "correct"
                              ? "#10b981"
                              : "#d1d5db",
                          fontSize: 12,
                        }}
                      >
                        {itemConf.status === "correct" ? "✓" : "-"}
                      </Text>
                      <Text
                        style={{
                          flex: 0.8,
                          textAlign: "center",
                          color:
                            itemConf.status === "wrong" ? "#f59e0b" : "#d1d5db",
                          fontSize: 12,
                        }}
                      >
                        {itemConf.status === "wrong" ? "✓" : "-"}
                      </Text>
                      <Text
                        style={{
                          flex: 0.8,
                          textAlign: "center",
                          color:
                            itemConf.status === "not_found"
                              ? "#ef4444"
                              : "#d1d5db",
                          fontSize: 12,
                        }}
                      >
                        {itemConf.status === "not_found" ? "✓" : "-"}
                      </Text>
                    </View>
                  )
                )}
            </ScrollView>

            {/* Botões */}
            <View style={{ flexDirection: "row", gap: 12 }}>
              <PaperButton
                mode="contained"
                onPress={() =>
                  navigation.navigate(
                    "Conferencia de inventário" as never,
                    { conferencia: conferenciaSelecionada } as never
                  )
                }
                style={{ flex: 1, backgroundColor: "#3B82F6" }}
                labelStyle={{ color: "#fff", fontSize: 12 }}
              >
                Editar
              </PaperButton>
              <PaperButton
                mode="contained"
                onPress={() => deleteConferencia(conferenciaSelecionada.key)}
                style={{ flex: 1, backgroundColor: "#ef4444" }}
                labelStyle={{ color: "#fff", fontSize: 12 }}
              >
                Excluir
              </PaperButton>
              <PaperButton
                mode="outlined"
                onPress={() => {
                  setModalVisible(false);
                  setConferenciaSelecionada(null);
                }}
                style={{ flex: 1, borderColor: "#6b7280" }}
                labelStyle={{ color: "#6b7280", fontSize: 12 }}
              >
                Fechar
              </PaperButton>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ImageBackground
      resizeMode="stretch"
      source={require("../assets/back.png")}
      style={styles.container}
    >
      {renderModal()}
      <View style={{ width: "100%", marginLeft: 20, marginTop: 90 }}>
        <Header title="Conferências" showMenu={true} showBack={false} />

        <View style={styles.filterCard}>
          <Text
            style={{ fontWeight: "600", color: "#1f2937", marginBottom: 8 }}
          >
            Filtrar por data (DD/MM/AAAA):
          </Text>
          <TextInput
            mode="outlined"
            placeholder="Digite a data..."
            value={dataFiltro}
            onChangeText={filtrarPorData}
            outlineColor="#e2e8f0"
            activeOutlineColor="#3B82F6"
            style={{ backgroundColor: "#fff" }}
          />
        </View>
      </View>

      <FlatList
        data={filtradas}
        keyExtractor={(item) => item.key}
        renderItem={renderConferencia}
        contentContainerStyle={styles.listContainer}
        refreshing={loading}
        ListEmptyComponent={
          <Text style={{ color: "#fff", marginTop: 20 }}>
            Nenhuma conferência encontrada
          </Text>
        }
      />
      <DrawerTab />
    </ImageBackground>
  );
}
