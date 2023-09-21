import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Color } from "../constant/Color";
interface UserCardProps {
  email: String;
  points: Number;
}
export default function UserCard({
  email,
  points,
}: UserCardProps): JSX.Element {
  return (
    <View style={styles.card}>
      <View style={styles.inline}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.data}>{email}</Text>
      </View>
      <View style={styles.inline}>
        <Text style={styles.label}>Score:</Text>
        <Text style={styles.data}>{points.toString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.buttonGray,
    width: "90%",
    padding: "5%",
    borderRadius: 10,
    marginTop: "5%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  data: {
    fontWeight: "normal",
    fontSize: 16,
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
