import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  View
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
  Signature: undefined;
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
  SketchPadWithAuth: undefined;
};

export interface Props {
  navigation: StackNavigationProp<HomeStackParametersList>;
}

const Input = ({ control, name }: { control: any; name: string }) => {
  const { field } = useController({
    control,
    name: name
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
  useProxy
});

export const HomeScreen = (props: Props) => {
  const navigate = props.navigation.navigate;
  const { control, handleSubmit, setValue } = useForm({});

  const onSubmit = (data) => {
    Alert.alert(JSON.stringify(data));
  };

  // Identity Server 4
  const clientId = "interactive.public";
  const scopes = ["openid", "profile", "email", "offline_access", "api"];
  const discoveryUrl = "https://demo.duendesoftware.com";

  // Azure B2C
  // const clientId = "5555cf9a-0d7d-4567-850b-45ce0c131c85";
  // const scopes = [
  //   "openid",
  //   "profile",
  //   "email",
  //   "offline_access",
  //   "https://avtab2ctest.onmicrosoft.com/dc624bfc-8e8e-4a12-9c41-983afa80afc7/demo.read",
  // ];
  // const discoveryUrl = "https://login.microsoftonline.com/avtab2ctest.onmicrosoft.com/v2.0"

  const discovery = AuthSession.useAutoDiscovery(discoveryUrl);

  // Create and load an auth request
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: clientId,
      redirectUri,
      usePKCE: true,
      scopes: scopes
    },
    discovery
  );

  const [token, setToken] = useState();
  useEffect(() => {
    if (result && result?.params?.code) {
      const req = new AuthSession.AccessTokenRequest({
        code: result.params.code,
        redirectUri: redirectUri,
        clientId: clientId,
        scopes: scopes,
        extraParams: {
          code_verifier: request.codeVerifier
        }
      });

      req
        .performAsync(discovery)
        .then((x) => setToken(x))
        .catch((e) => {
          console.log("failed to get access token", e);
        });
    }
  }, [result]);

  const [claims, setClaims] = useState(null);
  useEffect(() => {
    if (token) {
      fetch("https://demo.duendesoftware.com/api/test", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "Content-Type": "application/json"
        }
      })
        .then((response) => response.json())
        .then((json) => {
          setClaims(json);
          // get name from token
          const name = json.find((x) => x.type === "name").value;
          setValue("name", name);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token]);

  return (
    <ScrollView style={tw`p-2`}>
      {claims && (
        <View style={tw`pt-8`}>
          <Text style={tw`text-center p-3 text-3xl`}>
            {claims.find((x) => x.type === "name").value}
          </Text>
          <View style={tw`flex justify-center`}>
            <Image
              source={{
                uri: "https://static.wikia.nocookie.net/jamesbond/images/b/b2/James_Bond_%28Sean_Connery%29_-_Profile.jpg/revision/latest?cb=20220103094711"
              }}
              style={{ width: 150, height: 150, alignSelf: "center" }}
            />
          </View>
          <View style={tw`pt-8`}>
            <Text style={tw`text-left p-3 font-bold`}>Full name:</Text>
            <Input
              control={control}
              name="name"
            />
            <Button
              title={"Save Profile"}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      )}

      <View style={tw`pt-8`}>
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
        <Button
          onPress={() => navigate("Signature")}
          title={"Sign pad"}
        />
        <Button
          onPress={() => navigate("SketchPad")}
          title={"Sketch pad"}
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
