import { useSelector } from "react-redux";
import Login from "../screens/Login";
import ChooseLocation from "../screens/ChooseLocation";
import AddItem from "../screens/AddItem";
import Detail from "../screens/Detail";
import { StatusBar } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeStack from "./HomeStack";
const Stack = createNativeStackNavigator();

export default function RootStack() {
  const statusStyle = useSelector((state) => state.theme.status);

  return (
    <>
      <StatusBar barStyle={statusStyle} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "white",
          },
          animation: "fade",
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeStack} />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="Add"
          component={AddItem}
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="Choose"
          component={ChooseLocation}
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
            headerShown: true,
            title: "Choose Location From Map",
          }}
        />
      </Stack.Navigator>
    </>
  );
}
