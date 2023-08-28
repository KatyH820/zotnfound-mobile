import { useRoute } from "@react-navigation/native";
import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { Color } from "../constant/Color";
import Headphone from "../components/categoryIcon/Headphone";
import Phone from "../components/categoryIcon/Phone";
import Wallet from "../components/categoryIcon/Wallet";
import Key from "../components/categoryIcon/Key";
import Others from "../components/categoryIcon/Others";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import * as MailComposer from "expo-mail-composer";
export default function Detail(): JSX.Element {
  const route = useRoute();
  const itemInfo = route.params;

  const [isAvailable, setIsAvailable] = useState(false);

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
        <View style={styles.categoryLabel}>{icon}</View>
      </View>
      <Text style={styles.description}>{itemInfo.email}</Text>
      <Text style={styles.description}>{itemInfo.itemdate}</Text>
      <Text style={styles.description}>{itemInfo.description}</Text>
      {isAvailable && (
        <Button style={styles.button} onPress={sendEmailHandler}>
          <Text style={styles.buttonText}>Send Email</Text>
        </Button>
      )}
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
    padding: "5%",
    backgroundColor: Color.foundGreen,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "20%",
  },
  lostLabel: { backgroundColor: Color.lostRed },
  labelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    padding: "1%",
    fontSize: 18,
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
  button: {
    backgroundColor: Color.foundGreen,
    borderRadius: 10,
    marginVertical: "2%",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
