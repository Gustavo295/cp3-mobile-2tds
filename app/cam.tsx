import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function BarcodeScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Permissão para usar a câmera foi negada.</Text>
        <Button title="Permitir Câmera" onPress={requestPermission} />
      </View>
    );
  }

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    setIsCameraActive(false);
    Alert.alert("Código lido!", `Tipo: ${type}\nValor: ${data}`);
  };

  return (
    <View style={styles.container}>
      {isCameraActive ? (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={handleBarcodeScanned}
        />
      ) : (
        <View style={styles.center}>
          <Text>Escaneamento concluído!</Text>
          <Button
            title="Escanear novamente"
            onPress={() => {
              setScanned(false);
              setIsCameraActive(true);
            }}
          />
        </View>
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
    padding: 20,
  },
});
