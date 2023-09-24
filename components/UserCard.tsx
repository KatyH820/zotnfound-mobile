import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Color } from "../constant/Color";
interface UserCardProps {
  email: String;
  points: Number;
  isDark: boolean;
}
export default function UserCard({
  email,
  points,
  isDark,
}: UserCardProps): JSX.Element {
  return (
    <View style={[styles.card, isDark && { backgroundColor: "#495057" }]}>
      <View style={styles.inline}>
        <Text style={[styles.label, isDark && { color: "white" }]}>Email:</Text>
        <Text style={[styles.data, isDark && { color: "white" }]}>{email}</Text>
      </View>
      <View style={styles.inline}>
        <Text style={[styles.label, isDark && { color: "white" }]}>Score:</Text>
        <Text style={[styles.data, isDark && { color: "white" }]}>
          {points.toString()}
        </Text>
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
