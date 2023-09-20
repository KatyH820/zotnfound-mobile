import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import UserCard from "../components/UserCard";
import { ScrollView } from "react-native-gesture-handler";
import { getLeaderboard } from "../util/db";

export default function Leaderboard(): JSX.Element {
  const leader = [
    {
      id: 1,
      email: "stevenz9@uci.edu",
      points: 100,
    },
    {
      id: 3,
      email: "sd@uci.edu",
      points: 100,
    },
    {
      id: 2,
      email: "test2@uci.edu",
      points: 5,
    },
    {
      id: 5,
      email: "test@gmail.com",
      points: 5,
    },
  ];
  function renderItem({ item }) {
    return <UserCard email={item.email} points={item.points} />;
  }
  return (
    <>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.leaders}>
        <FlatList
          data={leader}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    marginTop: "20%",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  leaders: {
    flex: 1,
    width: "100%",
    marginLeft: "5%",
  },
});
