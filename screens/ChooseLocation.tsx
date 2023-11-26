import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Button from "../components/Button";
import { Feather } from "@expo/vector-icons";
export default function ChooseLocation({ navigation }): JSX.Element {
  const initialRegion = {
    latitude: 33.6461,
    longitude: -117.8427,
    latitudeDelta: 0.00242,
    longitudeDelta: 0.002621,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialRegion);

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.00242,
      longitudeDelta: 0.002621,
    });
  }

  function confirmSelection() {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location by tapping on the map!"
      );
      return;
    }

    navigation.navigate("Add", {
      pickedLocation: {
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
      },
    });
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => {
        return (
          <Button onPress={confirmSelection}>
            <Feather name="save" size={24} color={tintColor} />
          </Button>
        );
      },
    });
  }, [navigation, confirmSelection]);

  return (
    <MapView
      initialRegion={initialRegion}
      style={styles.map}
      onPress={selectLocationHandler}
      provider="google"
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
