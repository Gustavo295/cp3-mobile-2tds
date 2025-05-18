import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import styles from "../styles/styles";

export default function TelaInicial() {
  return (
    <View style={styles.container}>
      <Text>Bem-vindo!</Text>
      <Link href="/cadastro">
        <Text style={styles.link}>Ir para outra página</Text>
      </Link>
      <Link href="/cam">
        <Text style={styles.link}>Scannear Codigo de Barras</Text>
      </Link>
      <Link href="/devs">
        <Text style={styles.link}>Desenvolvedores</Text>
      </Link>
    </View>
  );
}
