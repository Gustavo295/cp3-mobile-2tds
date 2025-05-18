import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function BarcodeScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Permissão para usar a câmera foi negada.</Text>
        <Button title="Permitir Câmera" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={({ type, data }) => {
          if (!scanned) {
            setScanned(true);
            Alert.alert("Código lido!", `Tipo: ${type}\nValor: ${data}`);
          }
        }}
      />
      {scanned && (
        <Button title="Escanear novamente" onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});