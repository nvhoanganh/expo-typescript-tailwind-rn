import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";
import { AccelerometerScreen } from "./demoScreens/AccelerometerScreen";
import { AmplitudeScreen } from "./demoScreens/AmplitudeScreen";
import { AppleAuthenticationScreen } from "./demoScreens/AppleAuthenticationScreen";
import { AssetScreen } from "./demoScreens/AssetScreen";
import { AudioScreen } from "./demoScreens/AudioScreen";
import { BlurViewScreen } from "./demoScreens/BlurViewScreen";
import { CameraScreen } from "./demoScreens/CameraScreen";
import { ConstantsScreen } from "./demoScreens/constants/ConstantsScreen";
import { ManifestScreen } from "./demoScreens/constants/ManifestScreen";
import { PlatformScreen } from "./demoScreens/constants/PlatformScreen";
import { SystemFontsScreen } from "./demoScreens/constants/SystemFontsScreen";
import { FacebookScreen } from "./demoScreens/FacebookScreen";
import { FontScreen } from "./demoScreens/FontScreen";
import { GyroscopeScreen } from "./demoScreens/GyroscopeScreen";
import { LinearGradientScreen } from "./demoScreens/LinearGradientScreen";
import { LocalAuthenticationScreen } from "./demoScreens/LocalAuthenticationScreen";
import LocationService from "./demoScreens/LocationService";
import { MapViewScreen } from "./demoScreens/MapViewScreen";
import QRCodeScanner from "./demoScreens/QRCodeScanner";
import RecordAudioScreen from "./demoScreens/RecordAudioScreen";
import { SvgScreen } from "./demoScreens/SvgScreen";
import { VectorIconsScreen } from "./demoScreens/VectorIconsScreen";
import { FeaturesScreen } from "./FeaturesScreen";
import { HomeScreen } from "./HomeScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: "home",
  FeaturesStack: "cast-audio-variant",
  Camera: "camera",
  BarCodeScanner: "qrcode",
};

const FeaturesStack = () => {
  return (
    <Stack.Navigator initialRouteName="FeaturesScreen">
      <Stack.Screen
        name="FeaturesScreen"
        component={FeaturesScreen}
        options={{ title: "Features" }}
      />
      <Stack.Screen
        name="Accelerometer"
        component={AccelerometerScreen}
        options={{ title: "Accelerometer" }}
      />
      <Stack.Screen
        name="Amplitude"
        component={AmplitudeScreen}
        options={{ title: "Amplitude" }}
      />
      <Stack.Screen
        name="AppleAuthentication"
        component={AppleAuthenticationScreen}
        options={{ title: "Apple Authentication" }}
      />
      <Stack.Screen
        name="Asset"
        component={AssetScreen}
        options={{ title: "Asset" }}
      />
      <Stack.Screen
        name="Audio"
        component={AudioScreen}
        options={{ title: "Audio" }}
      />
      <Stack.Screen
        name="RecordAudio"
        component={RecordAudioScreen}
        options={{ title: "Record Audio" }}
      />
      <Stack.Screen
        name="LocationService"
        component={LocationService}
        options={{ title: "Location Service" }}
      />
      <Stack.Screen
        name="BarCodeScanner"
        component={QRCodeScanner}
        options={{ title: "Bar Code Scanner" }}
      />
      <Stack.Screen
        name="BlurView"
        component={BlurViewScreen}
        options={{ title: "Blur View" }}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ title: "Camera" }}
      />
      <Stack.Screen
        name="Constants"
        component={ConstantsScreen}
        options={{ title: "Constants" }}
      />
      <Stack.Screen
        name="Facebook"
        component={FacebookScreen}
        options={{ title: "Facebook" }}
      />
      <Stack.Screen
        name="Font"
        component={FontScreen}
        options={{ title: "Font" }}
      />
      <Stack.Screen
        name="Gyroscope"
        component={GyroscopeScreen}
        options={{ title: "Gyroscope" }}
      />
      <Stack.Screen
        name="LinearGradient"
        component={LinearGradientScreen}
        options={{ title: "Linear Gradient" }}
      />
      <Stack.Screen
        name="LocalAuthentication"
        component={LocalAuthenticationScreen}
        options={{ title: "Local Authentication" }}
      />
      <Stack.Screen
        name="Manifest"
        component={ManifestScreen}
        options={{ title: "Manifest" }}
      />
      <Stack.Screen
        name="MapView"
        component={MapViewScreen}
        options={{ title: "Map View" }}
      />
      <Stack.Screen
        name="Platform"
        component={PlatformScreen}
        options={{ title: "Platform" }}
      />
      <Stack.Screen
        name="Svg"
        component={SvgScreen}
        options={{ title: "Svg" }}
      />
      <Stack.Screen
        name="SystemFonts"
        component={SystemFontsScreen}
        options={{ title: "System Fonts" }}
      />
      <Stack.Screen
        name="VectorIcons"
        component={VectorIconsScreen}
        options={{ title: "Vector Icons" }}
      />
    </Stack.Navigator>
  );
};

export const App = () => {
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "#0096FF",
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, size }) => {
              return (
                <MaterialCommunityIcons
                  name={TAB_ICONS[route.name]}
                  size={size}
                  color={focused ? "#0096FF" : "#7393B3"}
                />
              );
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarBadge: 3,
            }}
          />
          <Tab.Screen
            name="FeaturesStack"
            component={FeaturesStack}
          />
          <Tab.Screen
            name="Camera"
            component={CameraScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
};
