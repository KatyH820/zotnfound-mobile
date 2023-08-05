import React, { LegacyRef, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";
import Button from "./Button";
import { Color } from "../constant/Color";
import CustomMarker from "./CustomMarker";
import { nightStyle } from "../constant/MapStyle";
import { useSelector } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
import SearchBar from "./SearchBar";
import ScrollCategory from "./ScrollCategory";
export default function Map(): JSX.Element {
  const isDark = useSelector((state) => state.theme.dark);
  const map: LegacyRef<MapView> = useRef(null);
  const initialRegion = {
    latitude: 33.6461,
    longitude: -117.8427,
    latitudeDelta: 0.00242,
    longitudeDelta: 0.002621,
  };

  async function onZoomInPress() {
    //DONT KNOW
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={map}
        style={styles.map}
        initialRegion={initialRegion}
        zoomEnabled
        customMapStyle={isDark && nightStyle}
      >
        <CustomMarker
          lat={initialRegion.latitude}
          lng={initialRegion.longitude}
          title="Test"
          description="Just a test"
        />

        {/* <Button onPress={onZoomInPress} style={styles.button}>
        <AntDesign name="plus" size={24} color="black" />
      </Button>

      <Button onPress={onZoomInPress} style={[styles.button, { bottom: "4%" }]}>
        <AntDesign name="minus" size={24} color="black" />
      </Button> */}
      </MapView>
      <SearchBar />
      <ScrollCategory />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    position: "absolute",
    bottom: "10%",
    right: "5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.buttonGray,
    padding: "2%",
  },
});
