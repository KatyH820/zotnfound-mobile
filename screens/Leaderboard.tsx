import React from "react";
import { StyleSheet, Text, View } from "react-native";
export default function Leaderboard(): JSX.Element {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Leaderboard</Text>
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
    fontSize: 18,
    fontWeight: "bold",
  },
});
