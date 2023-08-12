import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import React from "react";
import { Feather } from "@expo/vector-icons";
export default function ScrollCategory(): JSX.Element {
  const dummy_data = [
    "category1",
    "category1",
    "category1",
    "category1",
    "category1",
  ];
  const categoryList = dummy_data.map((ctgy, index) => (
    <Pressable
      style={({ pressed }) => [styles.category, pressed && styles.pressed]}
      key={index}
    >
      <Text>{ctgy}</Text>
      <Feather name="smartphone" size={24} color="black" />
    </Pressable>
  ));

  return (
    <ScrollView
      horizontal
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      style={styles.chipsScrollView}
      height="5%"
      width="90%"
    >
      {categoryList}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chipsScrollView: {
    position: "absolute",
    top: "12%",
    paddingHorizontal: 10,
  },
  category: {
    height: "90%",
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    width: 150,
    marginHorizontal: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 10,
  },
  pressed: {
    opacity: 0.8,
  },
});
