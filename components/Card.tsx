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

  return (
    <Pressable
      onPress={navigateToDetail}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.title}>{displayName}</Text>
            <Text style={styles.description}>{item.itemdate}</Text>
          </View>

          {/* <View style={styles.categoryLabel}>{icon}</View> */}
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

        {/* <Text style={styles.description}>{item.description}</Text> */}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: "100%",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowOffset: { width: 5, height: 7 },
  },
  cardContent: {
    paddingTop: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 30,
  },
  description: {
    fontSize: 15,
  },
  label: {
    backgroundColor: Color.foundGreen,
    borderRadius: 10,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
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
