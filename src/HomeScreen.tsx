import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useController, useForm } from "react-hook-form";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
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

const Input = ({ control, name }: { control: any; name: string }) => {
  const { field } = useController({
    control,
    name: name,
  });
  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      style={tw`h-10 border-gray-400 border rounded shadow mx-3 px-3`}
    />
  );
};

export const HomeScreen = (props: Props) => {
  const navigate = props.navigation.navigate;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "The name's Neilson,Brice Neilson",
    },
  });

  const onSubmit = (data) => {
    Alert.alert(JSON.stringify(data));
  };

  return (
    <ScrollView style={tw`p-2`}>
      <Text style={tw`text-center p-3 text-3xl`}>Brice Neilson</Text>
      <View style={tw`flex justify-center`}>
        <Text style={tw`text-center py-5 text-lg`}>
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
        <Input
          control={control}
          name="name"
        />
        <Button
          title={"Save Profile"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <View style={tw`pt-8`}>
        <Button
          onPress={() => navigate("Audio")}
          title={"Hear My Favourite song"}
        />
        <Button
          onPress={() => navigate("RecordAudio")}
          title={"Record audio"}
        />
        <Button
          onPress={() => navigate("Camera")}
          title={"Take Photo/Video"}
        />
      </View>
    </ScrollView>
  );
};
