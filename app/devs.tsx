import React from "react";
import { View, Text, Image, FlatList } from "react-native";

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
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
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
                width: 100,
                height: 100,
                borderRadius: 50,
                marginBottom: 10,
              }}
            />
            <Text style={{ fontSize: 18 }}>{item.nome}</Text>
            <Text style={{ fontSize: 18 }}>RM - {item.rm}</Text>
          </View>
        )}
      />
    </View>
  );
}
