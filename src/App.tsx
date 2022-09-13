import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";
import { CameraScreen } from "./demoScreens/CameraScreen";
import { FeaturesStack } from "./FeatureStacks";
import { HomeScreen } from "./HomeScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: "home",
  FeaturesStack: "cast-audio-variant",
  Camera: "camera",
  BarCodeScanner: "qrcode",
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
