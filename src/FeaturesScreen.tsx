import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, ScrollView, Text } from "react-native";
import tw from "twrnc";

type HomeStackParametersList = {
  Accelerometer: undefined;
  Amplitude: undefined;
  AppleAuthentication: undefined;
  Asset: undefined;
  Audio: undefined;
  BarCodeScanner: undefined;
  BlurView: undefined;
  Camera: undefined;
  Constants: undefined;
  Facebook: undefined;
  Font: undefined;
  Gyroscope: undefined;
  LinearGradient: undefined;
  LocalAuthentication: undefined;
  MapView: undefined;
  Svg: undefined;
  VectorIcons: undefined;
};

interface Props {
  navigation: StackNavigationProp<HomeStackParametersList>;
}

export const FeaturesScreen = (props: Props) => {
  const navigate = props.navigation.navigate;

  return (
    <ScrollView style={tw`p-2 pt-8`}>
      <Text style={tw`text-center text-lg py-3 font-bold`}>
        Demo of React Native Features
      </Text>
      <Button
        onPress={() => navigate("Audio")}
        title={"Play audio from URL"}
      />
      <Button
        onPress={() => navigate("RecordAudio")}
        title={"Record audio"}
      />
      <Button
        onPress={() => navigate("Camera")}
        title={"Take Photo/Video"}
      />
      <Button
        onPress={() => navigate("BarCodeScanner")}
        title={"QR Code Scanner"}
      />
      <Button
        onPress={() => navigate("LocationService")}
        title={"Get current Location"}
      />
      <Button
        onPress={() => navigate("AppleAuthentication")}
        title={"Authentication with Apple"}
      />
      <Button
        onPress={() => navigate("Amplitude")}
        title={"Amplitude"}
      />
      <Button
        onPress={() => navigate("Asset")}
        title={"Asset"}
      />
      <Button
        onPress={() => navigate("BlurView")}
        title={"Blur View"}
      />
      <Button
        onPress={() => navigate("Constants")}
        title={"Constants"}
      />
      <Button
        onPress={() => navigate("Facebook")}
        title={"Facebook"}
      />
      <Button
        onPress={() => navigate("Font")}
        title={"Font"}
      />
      <Button
        onPress={() => navigate("Gyroscope")}
        title={"Gyroscope"}
      />
      <Button
        onPress={() => navigate("LinearGradient")}
        title={"LinearGradient"}
      />
      <Button
        onPress={() => navigate("LocalAuthentication")}
        title={"LocalAuthentication"}
      />
      <Button
        onPress={() => navigate("Manifest")}
        title={"Manifest"}
      />
      <Button
        onPress={() => navigate("MapView")}
        title={"MapView"}
      />
      <Button
        onPress={() => navigate("Platform")}
        title={"Platform"}
      />
      <Button
        onPress={() => navigate("Svg")}
        title={"Svg"}
      />
      <Button
        onPress={() => navigate("SystemFonts")}
        title={"SystemFonts"}
      />
      <Button
        onPress={() => navigate("VectorIcons")}
        title={"VectorIcons"}
      />
    </ScrollView>
  );
};
