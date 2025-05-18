import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const devs = [
  {
    id: "1",
    nome: "Eric Issamu de Lima Yoshida",
    foto: require("../assets/devs/eric.png"),
    rm: 558763,
  },
  {
    id: "2",
    nome: "Gustavo Matias Teixeira",
    foto: require("../assets/devs/gustavo.png"),
    rm: 555010
  },
];

export default function TelaDevs() {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <LinearGradient
        colors={['#111', '#1341f5']}
        style={styles.background}
      />
      <View style={styles.content}>
      <Text style={styles.title}>
        Desenvolvedores
      </Text>

      <FlatList
        data={devs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Image
              source={item.foto}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                marginBottom: 20,
              }}
            />
            <Text style={{ fontSize: 20, color: "#fff" }}>{item.nome}</Text>
            <Text style={{ fontSize: 20, color: "#fff" }}>RM - {item.rm}</Text>
          </View>
        )}
      />
      </View>
    </View>
  );
}
