import React from "react";
import { Image, View } from "react-native";
import { Marker } from "react-native-maps";
interface CustomMarkerProps {
  lat: number;
  lng: number;
  title: string;
  description: string;
  type: string;
  islost: boolean;
  onPress: () => void;
}

export default function CustomMarker({
  lat,
  lng,
  title,
  description,
  type,
  islost,
  onPress,
}: CustomMarkerProps): JSX.Element {
  var imgsrc;
  if (islost) {
    if (type == "phone") {
      imgsrc = require("../assets/imgs/Phone_lost.png");
    } else if (type == "headphone") {
      imgsrc = require("../assets/imgs/Headphones_lost.png");
    } else if (type == "wallet") {
      imgsrc = require("../assets/imgs/Wallet_lost.png");
    } else if (type == "key") {
      imgsrc = require("../assets/imgs/Key_lost.png");
    } else if (type == "other") {
      imgsrc = require("../assets/imgs/Others_lost.png");
    }
  } else {
    if (type == "phone") {
      imgsrc = require("../assets/imgs/Phone_found.png");
    } else if (type == "headphone") {
      imgsrc = require("../assets/imgs/Headphones_found.png");
    } else if (type == "wallet") {
      imgsrc = require("../assets/imgs/Wallet_found.png");
    } else if (type == "key") {
      imgsrc = require("../assets/imgs/Key_found.png");
    } else if (type == "other") {
      imgsrc = require("../assets/imgs/Others_found.png");
    }
  }
  return (
    <Marker
      onPress={onPress}
      coordinate={{
        latitude: lat,
        longitude: lng,
      }}
      title={title}
      description={description}
    >
      <View
        style={{
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={imgsrc} style={{ height: "100%", width: "100%" }} />
      </View>
    </Marker>
  );
}
