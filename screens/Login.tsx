import React, { useEffect, useId } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import LottieAnimation from "../components/LottieAnimation";
import Button from "../components/Button";
import { Color } from "../constant/Color";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

export default function Login({ navigation }): JSX.Element {
  const { promptAsync, logOut, userInfo } = React.useContext(AuthContext);

  useEffect(() => {
    if (userInfo) console.log("already logged in");
    else {
      console.log("logged out");
    }
  }, []);

  function signInHandler() {
    if (userInfo) navigation.navigate("Home");
    else {
      promptAsync();
      navigation.navigate("Home");
    }
  }

  function logOutHandler() {
    logOut();
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome to ZotnFound</Text>
      <View style={styles.animationContainer}>
        <LottieAnimation
          source={require("../assets/animation.json")}
          loop={true}
        />
      </View>

      <Text style={styles.label}>Please Sign In With UCI Email</Text>
      {/* <Pressable onPress={logOutHandler}>
        <Text>click me</Text>
      </Pressable> */}
      <Button style={styles.button} onPress={signInHandler}>
        <AntDesign name="google" size={24} color="white" />
        <Text style={styles.buttonText}>Sign In With Google</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  animationContainer: {
    height: "30%",
    width: "100%",
    marginVertical: "5%",
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
    padding: "3%",
  },
  button: {
    backgroundColor: Color.googleBlue,
    flexDirection: "row",
    padding: "4%",
    marginVertical: "5%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginLeft: "5%",
    fontWeight: "bold",
  },
});
