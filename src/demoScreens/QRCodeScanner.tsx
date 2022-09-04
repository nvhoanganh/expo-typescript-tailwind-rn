import { BarCodeScanner, PermissionStatus } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [permission, setPermission] = useState(null);
  const [scannedText, setScannedText] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status);
    })();
  }, []);

  const handleBarCodeScanned = (event: { type: string; data: string }) => {
    setScannedText(`${event.type}: '${event.data}'`);
  };

  switch (permission) {
    case undefined:
      return <Text>Requesting permission to access camera.</Text>;

    case PermissionStatus.UNDETERMINED:
      return <Text>Could not determine if camera could be accessed.</Text>;

    case PermissionStatus.DENIED:
      return <Text>No access to the camera.</Text>;

    case PermissionStatus.GRANTED:
      return (
        <View style={{ flex: 1 }}>
          <Text
            style={{
              margin: 10,
            }}
          >
            {scannedText}
          </Text>
          <View style={{ flex: 1 }}>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={StyleSheet.absoluteFill}
            />
          </View>
        </View>
      );
    default:
      return <Text>Invalid state</Text>;
  }
}
