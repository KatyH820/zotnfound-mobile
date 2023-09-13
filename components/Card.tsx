import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Color } from "../constant/Color";
import Headphone from "./categoryIcon/Headphone";
import Phone from "./categoryIcon/Phone";
import Wallet from "./categoryIcon/Wallet";
import Key from "./categoryIcon/Key";
import Others from "./categoryIcon/Others";

export default function Card({ item }): JSX.Element {
  const navigation = useNavigation();
  function navigateToDetail() {
    navigation.navigate("Detail", item);
  }

  let icon;
  if (item.type === "headphone") {
    icon = <Headphone />;
  } else if (item.type === "phone") {
    icon = <Phone />;
  } else if (item.type === "wallet") {
    icon = <Wallet />;
  } else if (item.type === "key") {
    icon = <Key />;
  } else if (item.type === "other") {
    icon = <Others />;
  }

  const displayName =
    item.name.length > 11 ? `${item.name.slice(0, 11)}...` : item.name;

  const displayDescription =
    item.description.length > 25
      ? `${item.description.slice(0, 40)}...`
      : item.description;
  return (
    <Pressable
      onPress={navigateToDetail}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>{displayName}</Text>
          <Text style={styles.description}>📅 {item.itemdate}</Text>
          <Text style={[styles.description, { marginTop: 4 }]}>
            {displayDescription}
          </Text>

          {/* <View style={styles.categoryLabel}>{icon}</View> */}
        </View>

        <View style={styles.imgContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View
            style={[
              styles.label,
              item.islost && { backgroundColor: Color.lostRed },
            ]}
          >
            <Text style={styles.labelText}>
              {item.islost ? "Lost" : "Found"}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: "100%",
    padding: 10,
    flexDirection: "row",
    borderRadius: 30,
    marginHorizontal: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: { width: 5, height: 7 },
  },
  cardContent: {
    paddingTop: 5,
    flex: 1,
    flexDirection: "column",
    gap: 5,
    paddingLeft: 10,
  },
  imgContainer: {
    width: "50%",
    height: "80%",
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 25,
  },
  description: {
    fontSize: 15,
    color: "#5A5A5A",
  },
  label: {
    backgroundColor: Color.foundGreen,
    borderRadius: 10,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    position: "absolute", // Absolutely position the label
    bottom: 0, // Adjust as needed
    left: 0, // Adjust as needed
    opacity: 0.85,
  },
  labelText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    fontSize: 23,
  },
  pressed: {
    opacity: 0.7,
  },
  categoryLabel: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: Color.categoryBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "15%",
    padding: "5%",
  },
});
