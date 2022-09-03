import { StackNavigationProp } from "@react-navigation/stack";
import React, { Component } from "react";
import { Button, Image, ScrollView, Text, TextInput, View } from "react-native";
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

export class HomeScreen extends Component<Props> {
  public render() {
    const navigate = this.props.navigation.navigate;

    return (
      <ScrollView style={tw`p-2`}>
        <Text style={tw`text-center py-3 text-3xl`}>Brice Neilson</Text>
        <View style={tw`flex justify-center`}>
          <Text style={tw`text-center py-3 text-md`}>
            Chief Technology Officer
          </Text>
          <Image
            source={{
              uri: "https://images.ctfassets.net/6asdyln2d6ar/6G4sPmUxW3EZjMl1iDweMi/5021cdfa89fccf64de9150f3bfc2423b/Brice-s_Profile_Photo.png",
            }}
            style={{ width: 200, height: 200, alignSelf: "center" }}
          />
        </View>
        <View style={tw`pt-8`}>
          <TextInput
            style={tw`h-10 border-gray-400 border rounded shadow mx-3 px-3`}
            defaultValue="Brice Neilson"
          />
          <Button title={"Update Profile"} />
        </View>
        <Button
          onPress={() => navigate("Accelerometer")}
          title={"View Profile"}
        />
        {/* <Button
          onPress={() => navigate("Amplitude")}
          title={"Amplitude"}
        />
        <Button
          onPress={() => navigate("AppleAuthentication")}
          title={"Apple Authentication"}
        />
        <Button
          onPress={() => navigate("Asset")}
          title={"Asset"}
        />
        <Button
          onPress={() => navigate("Audio")}
          title={"Audio"}
        />
        <Button
          onPress={() => navigate("BarCodeScanner")}
          title={"Bar Code Scanner"}
        />
        <Button
          onPress={() => navigate("BlurView")}
          title={"Blur View"}
        />
        <Button
          onPress={() => navigate("Camera")}
          title={"Camera"}
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
          title={"Linear Gradient"}
        />
        <Button
          onPress={() => navigate("LocalAuthentication")}
          title={"Local Authentication"}
        />
        <Button
          onPress={() => navigate("MapView")}
          title={"Map View"}
        />
        <Button
          onPress={() => navigate("Svg")}
          title={"Svg"}
        />
        <Button
          onPress={() => navigate("VectorIcons")}
          title={"Vector Icons"}
        /> */}
      </ScrollView>
    );
  }
}
