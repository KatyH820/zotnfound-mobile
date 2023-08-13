import { Pressable, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import React from "react";
import Headphone from "./categoryIcon/Headphone";
import Phone from "./categoryIcon/Phone";
import Wallet from "./categoryIcon/Wallet";
import Others from "./categoryIcon/Others";
import Key from "./categoryIcon/Key";
import { fetchItems, filterItemsByCategory } from "../util/db";
import Everything from "./categoryIcon/Everything";
import { useSelector } from "react-redux";

interface ScrollCategoryProps {
  setItems: React.Dispatch<React.SetStateAction<never[]>>;
}
export default function ScrollCategory({
  setItems,
}: ScrollCategoryProps): JSX.Element {
  const allItems = useSelector((state) => state.items);
  const categoryType = [
    "Everything",
    "Phone",
    "Headphone",
    "Wallet",
    "Key",
    "Other",
  ];

  async function filterByCategory(category: string) {
    if (category !== "everything") {
      const data = await filterItemsByCategory(category);
      setItems(data);
    } else {
      setItems(allItems);
    }
  }
  const categoryList = categoryType.map((ctgy, index) => {
    let icon: React.JSX.Element;
    if (ctgy === "Everything") {
      icon = <Everything color="black" />;
    } else if (ctgy === "Phone") {
      icon = <Phone color="black" />;
    } else if (ctgy === "Headphone") {
      icon = <Headphone color="black" />;
    } else if (ctgy === "Wallet") {
      icon = <Wallet color="black" />;
    } else if (ctgy === "Key") {
      icon = <Key color="black" />;
    } else if (ctgy === "Other") {
      icon = <Others color="black" />;
    }
    return (
      <Pressable
        onPress={() => filterByCategory(ctgy.toLowerCase())}
        style={({ pressed }) => [styles.category, pressed && styles.pressed]}
        key={index}
      >
        <Text>{ctgy}</Text>
        {icon}
      </Pressable>
    );
  });

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
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    width: 120,
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
