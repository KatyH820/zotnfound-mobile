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

interface ScrollCategoryProps {
  setItems: React.Dispatch<React.SetStateAction<never[]>>;
}
export default function ScrollCategory({
  setItems,
}: ScrollCategoryProps): JSX.Element {
  const categoryType = [
    "everything",
    "phone",
    "headphone",
    "wallet",
    "key",
    "other",
  ];

  async function filterByCategory(category: string) {
    if (category !== "everything") {
      const data = await filterItemsByCategory(category);
      setItems(data);
    } else {
      const data = await fetchItems();
      setItems(data);
    }
  }
  const categoryList = categoryType.map((ctgy, index) => {
    let icon: React.JSX.Element;
    if (ctgy === "everything") {
      icon = <Everything color="black" />;
    } else if (ctgy === "phone") {
      icon = <Phone color="black" />;
    } else if (ctgy === "headphone") {
      icon = <Headphone color="black" />;
    } else if (ctgy === "wallet") {
      icon = <Wallet color="black" />;
    } else if (ctgy === "key") {
      icon = <Key color="black" />;
    } else if (ctgy === "other") {
      icon = <Others color="black" />;
    }
    return (
      <Pressable
        onPress={() => filterByCategory(ctgy)}
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
