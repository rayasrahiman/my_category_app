import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, AntDesign } from "@expo/vector-icons";

import ViewScreen from "../screens/ViewScreen";
import AddNewScreen from "../screens/AddNewScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const screenOptions = (route, color) => {
    let iconName;

    switch (route.name) {
      case "View":
        iconName = "exclamationcircle";
        break;
      case "AddNew":
        iconName = "checkcircleo";
        break;
      default:
        break;
    }

    return <AntDesign name={iconName} color={color} size={24} />;
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
        tabBarActiveTintColor: "#019fe6",
        tabBarInactiveTintColor: "#cdcdcd",
        tabBarLabelStyle: {
          fontSize: 14,
          // fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="View"
        component={ViewScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="AddNew"
        component={AddNewScreen}
      />
    </Tab.Navigator>
  );
};

export default function NavigationScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="View" component={ViewScreen} />
        <Stack.Screen name="AddNew" component={AddNewScreen} /> */}
        <Stack.Screen name="MyTab" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
