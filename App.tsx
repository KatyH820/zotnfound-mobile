import "react-native-gesture-handler";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Linking, StyleSheet, Switch, Text, View } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import Login from "./screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Color } from "./constant/Color";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { themeAction } from "./store/theme";
import Detail from "./screens/Detail";
import AddItem from "./screens/AddItem";
import ChooseLocation from "./screens/ChooseLocation";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.dark);

  function toggleTheme() {
    dispatch(themeAction.toggle());
  }
  return (
    <DrawerContentScrollView {...props} style={isDark && styles.darkDrawer}>
      <DrawerItemList {...props} />
      <View style={styles.preference}>
        <Text style={[styles.labelText, isDark && styles.labelDarkTheme]}>
          Dark Theme
        </Text>
        <Switch onChange={toggleTheme} value={isDark} />
      </View>
    </DrawerContentScrollView>
  );
}
function HomeStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Map" component={Home} />
    </Drawer.Navigator>
  );
}

function RootStack() {
  const statusStyle = useSelector((state) => state.theme.status);
  return (
    <>
      <StatusBar style={statusStyle} />
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
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    return <SplashScreen onFinish={setIsLoading} />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  preference: {
    marginTop: "3%",
    left: "5%",
  },
  darkDrawer: {
    backgroundColor: Color.darkThemeDrawer,
  },
  labelText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: "1%",
  },
  labelDarkTheme: {
    color: "white",
  },
});
