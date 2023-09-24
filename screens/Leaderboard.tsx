import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import UserCard from "../components/UserCard";
import { ScrollView } from "react-native-gesture-handler";
import { getLeaderboard } from "../util/db";
import { useSelector } from "react-redux";
import { Color } from "../constant/Color";

export default function Leaderboard(): JSX.Element {
  const isDark = useSelector((state) => state.theme.dark);
  const [leader, setLeader] = useState([]);
  useEffect(() => {
    async function getLeader() {
      const { data } = await getLeaderboard();
      setLeader(data);
    }
    getLeader();
  }, []);

  console.log(leader);
  function renderItem({ item }) {
    return <UserCard email={item.email} points={item.points} isDark={isDark} />;
  }
  return (
    <View
      style={[
        styles.screen,
        isDark && { backgroundColor: Color.darkThemeDrawer },
      ]}
    >
      <Text style={[styles.title, isDark && { color: "white" }]}>
        Leaderboard
      </Text>
      <View style={styles.leaders}>
        <FlatList
          data={leader}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
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
