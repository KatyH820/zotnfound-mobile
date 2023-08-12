import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

export default function Card({ item }): JSX.Element {
  const navigation = useNavigation();
  function navigateToDetail() {
    navigation.navigate("Detail", item);
  }

  return (
    <Pressable
      onPress={navigateToDetail}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.imgContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View
            style={[styles.label, item.islost && { backgroundColor: "red" }]}
          >
            <Text style={styles.labelText}>
              {item.islost ? "Lost" : "Found"}
            </Text>
          </View>
        </View>

        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.description}>{item.itemDate}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: "100%",
    padding: "5%",
    paddingHorizontal: "2%",
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
  },
  imgContainer: {
    height: "90%",
    width: "100%",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    fontSize: 16,
  },
  label: {
    backgroundColor: "green",
    position: "absolute",
    borderRadius: 10,
    padding: "5%",
    top: 0,
    left: 0,
    right: 0,
    width: "20%",
  },
  labelText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
  pressed: {
    opacity: 0.7,
  },
});
