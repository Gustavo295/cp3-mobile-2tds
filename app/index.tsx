import { View, Text, StyleSheet} from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";

export default function TelaInicial() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#e5fbff', '#c8f6ff']}
        style={styles.background}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Link href="/cadastro" style={styles.link}>
          <Text>Cadastro de Produtos</Text>
        </Link>
        <Link href="/cam" style={styles.link}>
          <Text>Escanear Codigo de Barras</Text>
        </Link>
        <Link href="/devs" style={styles.link}>
          <Text>Desenvolvedores</Text>
        </Link>
      </View>
    </View>
  );
}
