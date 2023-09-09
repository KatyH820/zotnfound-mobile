import { View, TextInput, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
interface SearchBarProps {
  items: Array<Object>[];
  setItems: React.Dispatch<React.SetStateAction<never[]>>;
}
export default function SearchBar({
  items,
  setItems,
}: SearchBarProps): JSX.Element {
  const allItems = useSelector((state) => state.items);
  function searchBarFilter(text) {
    const filtered = allItems.filter((item) => {
      return (
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.description.toLowerCase().includes(text.toLowerCase())
      );
    });
    setItems(filtered);
  }

  return (
    <View style={styles.searchBar}>
      <TextInput
        onChangeText={(e) => searchBarFilter(e)}
        placeholder="Search here"
        placeholderTextColor="grey"
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
    width: "90%",
    fontSize: 16,
  },
  icon: {
    marginTop: "3 %",
  },
});
