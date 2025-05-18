import { StatusBar } from "expo-status-bar";
import styles from "../styles/styles";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [nomeProduto, setNomeProduto] = useState("");
  const [dataFabricacao, setDataFabricacao] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [quantidade, setQuantidade] = useState("0");
  const [lote, setLote] = useState("");
  const [dados, setDados] = useState([]);
  const [produtoEditado, setProdutoEditado] = useState(null);

  useEffect(() => {
    buscarDados();
  }, []);

  async function Salvar() {
    Keyboard.dismiss();
    let produtos = [];

    if ((await AsyncStorage.getItem("PRODUTOS")) != null) {
      produtos = JSON.parse(await AsyncStorage.getItem("PRODUTOS"));
    }

    if (produtoEditado) {
      produtos[produtoEditado.index] = {
        nome: nomeProduto,
        dataF: dataFabricacao,
        dataV: dataValidade,
        quantidade: quantidade,
        lote: lote,
      };
    } else {
      produtos.push({
        nome: nomeProduto,
        dataF: dataFabricacao,
        dataV: dataValidade,
        quantidade: quantidade,
        lote: lote,
      });
    }

    await AsyncStorage.setItem("PRODUTOS", JSON.stringify(produtos));

    setProdutoEditado(null);

    setNomeProduto("");
    setDataFabricacao("");
    setDataValidade("");
    setQuantidade("");
    setLote("");

    buscarDados();
  }

  async function buscarDados() {
    const p = await AsyncStorage.getItem("PRODUTOS");
    setDados(JSON.parse(p));
  }

  async function deletarProduto(index) {
    const tempDados = dados;
    const dadosAtualizado = tempDados.filter((item, ind) => {
      return ind !== index;
    });
    setDados(dadosAtualizado);
    await AsyncStorage.setItem("PRODUTOS", JSON.stringify(dadosAtualizado));
  }

  function editarProduto(index) {
    const produto = dados[index];
    setNomeProduto(produto.nome);
    setDataFabricacao(produto.dataF);
    setDataValidade(produto.dataV);
    setQuantidade(produto.quantidade);
    setLote(produto.lote);
    setProdutoEditado({ index });
  }
  return (
    <View style={styles.container}>
      <Text>Cadastro</Text>
      <TextInput
        placeholder="Nome do produto"
        style={styles.input}
        value={nomeProduto}
        onChangeText={(value) => setNomeProduto(value)}
      />

      <TextInput
        placeholder="Data de Fabricação"
        style={styles.input}
        value={dataFabricacao}
        onChangeText={(value) => setDataFabricacao(value)}
      />

      <TextInput
        placeholder="Data de Validade"
        style={styles.input}
        value={dataValidade}
        onChangeText={(value) => setDataValidade(value)}
      />

      <TextInput
        placeholder="Quantidade"
        style={styles.input}
        value={quantidade}
        onChangeText={(value) => setQuantidade(value)}
      />

      <TextInput
        placeholder="Lote"
        style={styles.input}
        value={lote}
        onChangeText={(value) => setLote(value)}
      />

      <TouchableOpacity style={styles.btn} onPress={Salvar}>
        <Text style={{ color: "white" }}>
          {produtoEditado ? "ATUALIZAR" : "CADASTRAR"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={dados}
        renderItem={({ item, index }) => {
          if (!item || !item.nome) return null;
          return (
            <View style={styles.listarFlat}>
              <View>
                <Text>Nome:{item.nome}</Text>
                <Text>Data de Fabricação: {item.dataF}</Text>
                <Text>Data de Validade: {item.dataV}</Text>
                <Text>Quantidade: {item.quantidade}</Text>
                <Text>Lote: {item.lote}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.btnExcluir}
                  onPress={() => deletarProduto(index)}
                >
                  <Text>Excluir</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnEditar}
                  onPress={() => editarProduto(index)}
                >
                  <Text>Editar</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      <StatusBar style="auto" />
    </View>
  );
}
