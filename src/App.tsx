import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import tw from "twrnc";
import utilities from "../tailwind.json";
import { AudioScreen } from "./demoScreens/AudioScreen";
import { CameraScreen } from "./demoScreens/CameraScreen";
import QRCodeScanner from "./demoScreens/QRCodeScanner";
import { HomeScreen } from "./HomeScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import SignPad from "./demoScreens/SignatureScreen/SignPad";
import SketchPad from "./demoScreens/SketchPad/SketchPad";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

interface TabBars {
  state: any;
  descriptors: any;
  navigation: any;
}

const MyTabBar = ({ state, descriptors, navigation }: TabBars) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={tw`p-3 text-center text-blue-600 font-bold`}>
              <MaterialCommunityIcons
                name={route.name}
                size={24}
                color="#0096FF"
              />
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TAB_ICONS = {
  Home: "home",
  Audio: "cast-audio-variant",
  Camera: "camera",
  BarCodeScanner: "qrcode",
  Signature: "signature-freehand",
  SketchPad: "draw"
};

export const App = () => {
  return (
    <TailwindProvider utilities={utilities}>
      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Home" }}
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
      </NavigationContainer> */}

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
            }
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarBadge: 3
            }}
          />
          <Tab.Screen
            name="Audio"
            component={AudioScreen}
          />
          <Tab.Screen
            name="Camera"
            component={CameraScreen}
          />
          <Tab.Screen
            name="BarCodeScanner"
            component={QRCodeScanner}
          />
          <Tab.Screen
            name="Signature"
            component={SignPad}
          />
          <Tab.Screen
            name="SketchPad"
            component={SketchPad}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
};
