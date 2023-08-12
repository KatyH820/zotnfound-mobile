import { View, TextInput, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
export default function SearchBar(): JSX.Element {
  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Search here"
        placeholderTextColor="black"
        autoCapitalize="none"
        style={styles.text}
      />
      <AntDesign name="search1" size={24} color="black" style={styles.icon} />
    </View>
  );
}
const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    width: "90%",
    height: "4%",
    position: "absolute",
    justifyContent: "space-between",
    marginTop: "13.5%",
    borderRadius: 13,
    backgroundColor: "white",
    paddingHorizontal: "3%",
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  text: {
    fontSize: 16,
  },
  icon: {
    marginTop: "3 %",
  },
});
