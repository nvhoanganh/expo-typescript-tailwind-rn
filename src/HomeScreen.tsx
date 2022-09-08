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

import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

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

WebBrowser.maybeCompleteAuthSession();

const useProxy = true;

const redirectUri = AuthSession.makeRedirectUri({
  useProxy,
});

export const HomeScreen = (props: Props) => {
  const navigate = props.navigation.navigate;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "The name's Bond, James Bond",
    },
  });

  const onSubmit = (data) => {
    Alert.alert(JSON.stringify(data));
  };

  const discovery = AuthSession.useAutoDiscovery(
    "https://demo.duendesoftware.com"
  );

  // Create and load an auth request
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: "interactive.confidential",
      redirectUri,
      scopes: ["openid", "profile", "email", "offline_access"],
    },
    discovery
  );

  return (
    <ScrollView style={tw`p-2`}>
      <Text style={tw`text-center p-3 text-3xl`}>James Bond</Text>
      <View style={tw`flex justify-center`}>
        <Text style={tw`text-center py-5 text-lg`}>007</Text>
        <Image
          source={{
            uri: "https://static.wikia.nocookie.net/jamesbond/images/b/b2/James_Bond_%28Sean_Connery%29_-_Profile.jpg/revision/latest?cb=20220103094711",
          }}
          style={{ width: 150, height: 150, alignSelf: "center" }}
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
        {result && <Text>{JSON.stringify(result, null, 2)}</Text>}

        <Button
          disabled={!request}
          onPress={() => promptAsync({ useProxy })}
          title={"Login using OAuth2"}
        />
        <Button
          onPress={() => navigate("Audio")}
          title={"Hear My Favourite song"}
        />
        {/* <Button
          onPress={() => navigate("RecordAudio")}
          title={"Record audio"}
        /> */}
        <Button
          onPress={() => navigate("Camera")}
          title={"Take Photo/Video"}
        />
        <Button
          onPress={() => navigate("BarCodeScanner")}
          title={"QR Code Scanner"}
        />
        {/* <Button
          onPress={() => navigate("LocationService")}
          title={"Location Service"}
        />
        <Button
          onPress={() => navigate("AppleAuthentication")}
          title={"Authentication with Apple"}
        /> */}
      </View>
    </ScrollView>
  );
};
