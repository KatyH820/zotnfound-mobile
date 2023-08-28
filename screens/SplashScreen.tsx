import React from "react";
import { StyleSheet, View } from "react-native";
import LottieAnimation from "../components/LottieAnimation";
interface SplashScreenProps {
  onFinish: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SplashScreen({
  onFinish,
}: SplashScreenProps): JSX.Element {
  return (
    <View style={styles.screen}>
      <LottieAnimation
        source={require("../assets/splash_screen.json")}
        onFinish={() => onFinish(false)}
        loop={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    margin: 0,
  },
});
