import React from "react";
import { Marker } from "react-native-maps";
interface CustomMarkerProps {
  style: StyleSheet;
  lat: number;
  lng: number;
  title: string;
  description: string;
  onPress: () => void;
}

export default function CustomMarker({
  style,
  lat,
  lng,
  title,
  description,
  onPress,
}: CustomMarkerProps): JSX.Element {
  return (
    <Marker
      onPress={onPress}
      coordinate={{
        latitude: lat,
        longitude: lng,
      }}
      image={require("../assets/imgs/map_marker.png")}
      title={title}
      description={description}
    ></Marker>
  );
}
