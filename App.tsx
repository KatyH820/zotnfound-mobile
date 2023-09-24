import "react-native-gesture-handler";
import React from "react";
import { useState } from "react";
import SplashScreen from "./screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import RootStack from "./stack/RootStack";
import { StatusBar } from "expo-status-bar";
import { AuthContextProvider } from "./context/AuthContext";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    return <SplashScreen onFinish={setIsLoading} />;
  }

  return (
    <AuthContextProvider>
      <Provider store={store}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </Provider>
    </AuthContextProvider>
  );
}
