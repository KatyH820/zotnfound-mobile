import { useRoute } from "@react-navigation/native";
import React from "react";
import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { Color } from "../constant/Color";
import Headphone from "../components/categoryIcon/Headphone";
import Phone from "../components/categoryIcon/Phone";
import Wallet from "../components/categoryIcon/Wallet";
import Key from "../components/categoryIcon/Key";
import Others from "../components/categoryIcon/Others";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import * as MailComposer from "expo-mail-composer";
import { deleteItem } from "../util/db";
import { useDispatch, useSelector } from "react-redux";
import { itemsAction } from "../store/Items";
export default function Detail({ navigation }): JSX.Element {
  const isDark = useSelector((state) => state.theme.dark);
  const route = useRoute();
  const itemInfo = route.params;

  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkEmailIsAvailable() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }
    checkEmailIsAvailable();
  }, []);

  let icon;
  if (itemInfo.type === "headphone") {
    icon = <Headphone />;
  } else if (itemInfo.type === "phone") {
    icon = <Phone />;
  } else if (itemInfo.type === "wallet") {
    icon = <Wallet />;
  } else if (itemInfo.type === "key") {
    icon = <Key />;
  } else if (itemInfo.type === "other") {
    icon = <Others />;
  }

  async function sendEmailHandler() {
    try {
      const sendEmail = await MailComposer.composeAsync({
        subject: "Your Item Update",
        body: "Hey, I have the item your post. Are you available for meet up?",
        recipients: ["katyh1@uci.edu"],
      });
    } catch (error) {
      console.error(error);
    }
  }

  function shareLink() {}

  async function deleteHandler() {
    try {
      deleteItem(itemInfo.id);
      dispatch(itemsAction.deleteItem(itemInfo.id));
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <ScrollView
      style={[
        styles.screen,
        isDark && { backgroundColor: Color.darkThemeDrawer },
      ]}
    >
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: itemInfo.image }} />
      </View>
      <View style={styles.itemContent}>
        <Text style={[styles.title, isDark && { color: "white" }]}>
          {itemInfo.name}
        </Text>
        <Text style={[styles.description, isDark && { color: "white" }]}>
          📅 {itemInfo.itemdate}
        </Text>
        <View style={styles.statusAndCata}>
          <View style={[styles.label, itemInfo.islost && styles.lostLabel]}>
            <Text style={[styles.labelText, isDark && { color: "white" }]}>
              {itemInfo.islost ? "Lost" : "Found"}
            </Text>
          </View>
          <View style={styles.categoryLabel}>{icon}</View>
        </View>

        <View style={styles.smallSeperator} />

        <Text style={[styles.heading, isDark && { color: "white" }]}>
          Description
        </Text>
        <View style={styles.descriptionContainer}>
          <ScrollView>
            <Text style={[styles.description, isDark && { color: "white" }]}>
              {itemInfo.description}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.smallSeperator} />
        <View style={styles.shareReportContainer}>
          <Button onPress={shareLink} style={styles.shareReportButton}>
            <Text style={[styles.heading, isDark && { color: "white" }]}>
              🔗 Share
            </Text>
          </Button>
          <Button onPress={shareLink} style={styles.shareReportButton}>
            <Text style={[styles.heading, isDark && { color: "white" }]}>
              🚩 Report
            </Text>
          </Button>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {isAvailable && (
          <Button style={styles.button} onPress={sendEmailHandler}>
            <Text style={styles.buttonText}>Send Email</Text>
          </Button>
        )}
        <Button
          style={[
            styles.button,
            { backgroundColor: Color.lostRed, marginBottom: "5%" },
          ]}
          onPress={deleteHandler}
        >
          <Text style={styles.buttonText}>Delete Item</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  itemContent: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  statusAndCata: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  imgContainer: {
    height: 300,
    width: "100%",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  label: {
    padding: "2%",
    backgroundColor: Color.zotnfoundGreen,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "19%",
  },
  lostLabel: { backgroundColor: Color.lostRed },
  labelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    padding: "1%",
    fontSize: 18,
    color: "#5A5A5A",
  },

  descriptionContainer: {
    marginTop: 10,
    borderRadius: 10,
    maxHeight: 200,
  },
  categoryLabel: {
    borderColor: Color.categoryBlue,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "15%",
    padding: "2%",
  },
  button: {
    backgroundColor: Color.foundGreen,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  seperator: {
    backgroundColor: "#ecedf1",
    height: 10,
    marginBottom: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    // marginLeft: 2,
  },
  smallSeperator: {
    marginVertical: 25,
    backgroundColor: "#ecedf1",
    height: 2,
    borderRadius: 10,
  },
  shareReportContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
  shareReportButton: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    paddingHorizontal: 30,
  },
});
