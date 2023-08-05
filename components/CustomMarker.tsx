import React from "react";
import { Marker } from "react-native-maps";
interface CustomMarkerProps {
  lat: number;
  lng: number;
  title: string;
  description: string;
}

export default function CustomMarker({
  lat,
  lng,
  title,
  description,
}: CustomMarkerProps): JSX.Element {
  return (
    <Marker
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
