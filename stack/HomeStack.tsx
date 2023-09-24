import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import React from "react";
import Home from "../screens/Home";
import { View, Switch, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { themeAction } from "../store/theme";
import { Color } from "../constant/Color";
import Leaderboard from "../screens/Leaderboard";

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

export default function HomeStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Map" component={Home} />
      <Drawer.Screen name="Leaderboard" component={Leaderboard} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
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
