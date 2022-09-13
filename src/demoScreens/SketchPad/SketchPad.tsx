import RNSketchCanvas from "@kichiyaki/react-native-sketch-canvas";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import { Props } from "../../HomeScreen";
import SketchPadWithAuth from "./SketchPadWithAuth";

export default function SketchPad() {
  const Sketch = createNativeStackNavigator();

  return (
    <Sketch.Navigator>
      <Sketch.Screen
        name="Sketch"
        component={SketchPadWithoutAuth}
      />
      <Sketch.Screen
        name="SketchPadWithAuth"
        component={SketchPadWithAuth}
      />
    </Sketch.Navigator>
  );
}

function SketchPadWithoutAuth(props: Props) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to sketching with native biometric"
        onPress={() => props.navigation.navigate("SketchPadWithAuth")}
      />
      <Text style={tw`text-xl font-bold p-5`}>Sketch pad</Text>

      <SketchPadBase></SketchPadBase>
    </View>
  );
}

export function SketchPadBase() {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <RNSketchCanvas
        containerStyle={{ backgroundColor: "transparent", flex: 1 }}
        canvasStyle={{ backgroundColor: "transparent", flex: 1 }}
        defaultStrokeIndex={0}
        defaultStrokeWidth={5}
        closeComponent={
          <View style={styles.functionButton}>
            <Text style={{ color: "white" }}>Close</Text>
          </View>
        }
        undoComponent={
          <View style={styles.functionButton}>
            <Text style={{ color: "white" }}>Undo</Text>
          </View>
        }
        clearComponent={
          <View style={styles.functionButton}>
            <Text style={{ color: "white" }}>Clear</Text>
          </View>
        }
        eraseComponent={
          <View style={styles.functionButton}>
            <Text style={{ color: "white" }}>Eraser</Text>
          </View>
        }
        strokeComponent={(color: any) => (
          <View
            style={[{ backgroundColor: color }, styles.strokeColorButton]}
          />
        )}
        strokeSelectedComponent={(color: any) => {
          return (
            <View
              style={[
                { backgroundColor: color, borderWidth: 2 },
                styles.strokeColorButton
              ]}
            />
          );
        }}
        strokeWidthComponent={(w: number) => {
          return (
            <View style={styles.strokeWidthButton}>
              <View
                style={{
                  backgroundColor: "white",
                  marginHorizontal: 2.5,
                  width: Math.sqrt(w / 3) * 10,
                  height: Math.sqrt(w / 3) * 10,
                  borderRadius: (Math.sqrt(w / 3) * 10) / 2
                }}
              />
            </View>
          );
        }}
        saveComponent={
          <View style={styles.functionButton}>
            <Text style={{ color: "white" }}>Save</Text>
          </View>
        }
        savePreference={() => {
          return {
            folder: "RNSketchCanvas",
            filename: String(Math.ceil(Math.random() * 100000000)),
            transparent: false,
            imageType: "png"
          };
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 20,
    paddingBottom: 20
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 60,
    height: 30,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39579A"
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: "#39579A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  }
});
