import { useRoute } from "@react-navigation/native";
import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
export default function Detail(): JSX.Element {
  const route = useRoute();
  const itemInfo = route.params;

  /**
   * {
   * "date": "2023-08-10T22:52:58.045Z",
   * "description": "test",
   * "email": "stevenz9@uci.edu",
   * "id": 21,
   * "image": "https://firebasestorage.googleapis.com/v0/b/zotnfound2.appspot.com/o/zotnfound2%2Fimages%2F169170797175266ed7dfdf541fcd79fe979518df937ee.jpg?alt=media&token=e6169530-f470-4a0e-ad21-e49a074204e8",
   * "islost": true,
   * "itemdate": "2023-08-12",
   * "location": [33.6476809266996, -117.8428101539612],
   * "name": "test",
   *  "type": "headphone"
   * }
   */

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{itemInfo.name}</Text>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: itemInfo.image }} />
        <View style={[styles.label, itemInfo.islost && styles.lostLabel]}>
          <Text style={styles.labelText}>
            {itemInfo.islost ? "Lost" : "Found"}
          </Text>
        </View>
      </View>
      <Text style={styles.description}>{itemInfo.email}</Text>
      <Text style={styles.description}>{itemInfo.itemdate}</Text>
      <Text style={styles.description}>{itemInfo.description}</Text>
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
    fontSize: 25,
    fontWeight: "bold",
  },
  imgContainer: {
    height: "30%",
    width: "90%",
    marginVertical: "10%",
  },
  img: {
    flex: 1,
  },
  label: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "2%",
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  lostLabel: { backgroundColor: "red" },
  labelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    padding: "1%",
    fontSize: 18,
  },
});
