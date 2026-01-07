import * as React from "react";
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../estilo";
import { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import Header from "../components/Header";
import DrawerTab from "../components/DrawerTab";

export default function Lista_conferencias() {
  const navigation = useNavigation();
  const [conferencias, setConferencias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  const formatarData = (data: any) => {
    if (!data) return "Data não disponível";
    const dataObj = data.toDate ? data.toDate() : new Date(data);
    return dataObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
    const isExpanded = expandedId === item.key;
    const totalItens = item.itens?.length || 0;
    const corretos = item.itens?.filter((i: any) => i.status === "correct").length || 0;
    const errados = item.itens?.filter((i: any) => i.status === "wrong").length || 0;
    const naoEncontrados = item.itens?.filter((i: any) => i.status === "not_found").length || 0;

    return (
      <TouchableOpacity
        onLongPress={() => deleteConferencia(item.key)}
        onPress={() => setExpandedId(isExpanded ? null : item.key)}
      >
        <View style={[styles.card, { marginHorizontal: 16, marginBottom: 12 }]}>
          {/* Header da Conferência */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.title, { fontSize: 16, marginBottom: 4 }]}>
                Conferência #{item.id?.split("_")[1] || "N/A"}
              </Text>
              <Text style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>
                {formatarData(item.data)}
              </Text>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Text style={{ fontSize: 16, color: "#10b981" }}>✓</Text>
                  <Text style={{ fontSize: 12, color: "#10b981", fontWeight: "bold" }}>
                    {corretos}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Text style={{ fontSize: 16, color: "#f59e0b" }}>✓</Text>
                  <Text style={{ fontSize: 12, color: "#f59e0b", fontWeight: "bold" }}>
                    {errados}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Text style={{ fontSize: 16, color: "#ef4444" }}>✓</Text>
                  <Text style={{ fontSize: 12, color: "#ef4444", fontWeight: "bold" }}>
                    {naoEncontrados}
                  </Text>
                </View>
                <Text style={{ fontSize: 12, color: "#6b7280", marginLeft: "auto" }}>
                  Total: {totalItens}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 20, color: "#3B82F6" }}>
              {isExpanded ? "▲" : "▼"}
            </Text>
          </View>

          {/* Detalhes Expandidos */}
          {isExpanded && (
            <View style={{ marginTop: 12, borderTopWidth: 1, borderTopColor: "#e5e7eb", paddingTop: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 8, color: "#3B82F6" }}>
                Itens Conferenciados:
              </Text>
              {item.itens && item.itens.length > 0 ? (
                <ScrollView style={{ maxHeight: 300 }}>
                  {item.itens.map((itemConf: any, idx: number) => (
                    <View
                      key={idx}
                      style={{
                        flexDirection: "row",
                        paddingVertical: 8,
                        paddingHorizontal: 8,
                        backgroundColor: "#f9fafb",
                        marginBottom: 8,
                        borderRadius: 6,
                        borderLeftWidth: 4,
                        borderLeftColor:
                          itemConf.status === "correct"
                            ? "#10b981"
                            : itemConf.status === "wrong"
                            ? "#f59e0b"
                            : "#ef4444",
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "bold", color: "#111827" }}>
                          {itemConf.itemNome}
                        </Text>
                        <Text style={{ fontSize: 12, color: "#6b7280" }}>
                          Sala: {itemConf.sala} | Patrimônio: {itemConf.patrimonio}
                        </Text>
                      </View>
                      <View style={{ justifyContent: "center", paddingLeft: 8 }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color:
                              itemConf.status === "correct"
                                ? "#10b981"
                                : itemConf.status === "wrong"
                                ? "#f59e0b"
                                : "#ef4444"
                          }}
                        >
                          ✓
                        </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <Text style={{ fontSize: 12, color: "#9ca3af" }}>Nenhum item conferenciado</Text>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      resizeMode="stretch"
      source={require("../assets/back.png")}
      style={styles.container}
    >
      <Header showMenu={true} showBack={false} title="Conferências" />
      <DrawerTab />

      {conferencias.length === 0 && !loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 48 }}>📄</Text>
          <Text style={{ fontSize: 16, color: "#9ca3af", marginTop: 16 }}>
            Nenhuma conferência registrada
          </Text>
        </View>
      ) : (
        <FlatList
          data={conferencias}
          keyExtractor={(item) => item.key}
          renderItem={renderConferencia}
          contentContainerStyle={{
            paddingTop: 120,
            paddingBottom: 40,
          }}
          refreshing={loading}
        />
      )}
    </ImageBackground>
  );
}
