import { StatusBar } from "expo-status-bar";
import styles from "../styles/styles";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Keyboard, Alert} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import AsyncStorage from "@react-native-async-storage/async-storage";

const estadosValidos = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];



export default function TelaCadastro() {
  const [nomeProduto, setNomeProduto] = useState("");
  const [dataFabricacao, setDataFabricacao] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [quantidade, setQuantidade] = useState("0");
  const [lote, setLote] = useState("");
  const [estadoDig, setEstadoDig] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
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
        estado: estadoDig,
      };
    } else {
      produtos.push({
        nome: nomeProduto,
        dataF: dataFabricacao,
        dataV: dataValidade,
        quantidade: quantidade,
        lote: lote,
        estado: estadoDig,
      });
    }

    await AsyncStorage.setItem("PRODUTOS", JSON.stringify(produtos));

    setProdutoEditado(null);

    setNomeProduto("");
    setDataFabricacao("");
    setDataValidade("");
    setQuantidade("");
    setLote("");
    setEstadoDig("");

    buscarDados();
  }
     
  function validarEstado(estado) {return estadosValidos.some(e => e.toUpperCase() === estado.trim().toUpperCase());}

  function handleValidar() {
    if (!estadoDig.trim()) {
      Alert.alert("Erro", "Digite o nome de um estado.");
      return;
    }
    const valido = validarEstado(estadoDig);
    if (valido) {
      Alert.alert("Sucesso", `${estadoDig.trim()} é um estado válido!`);
      Salvar();
    } else {
      Alert.alert("Erro", `${estadoDig.trim()} não é um estado válido.`);
    }
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
    setEstadoDig(produto.estado);
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
        keyboardType="numeric"
        style={styles.input}
        value={dataFabricacao}
        onChangeText={(value) => setDataFabricacao(value)}
      />

      <TextInput
        placeholder="Data de Validade"
        keyboardType="numeric"
        style={styles.input}
        value={dataValidade}
        onChangeText={(value) => setDataValidade(value)}
      />

      <TextInput
        placeholder="Quantidade"
        keyboardType="numeric"
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

      <TextInput
        style={styles.input}
        placeholder="Estado. Ex: SP"
        value={estadoDig}
        onChangeText={setEstadoDig}
        maxLength={2}
      />

      <TouchableOpacity style={styles.btn} onPress={handleValidar}>
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
                <Text>Estado: {item.estado}</Text>
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
