import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import MapView, { MarkerPressEvent, PROVIDER_GOOGLE } from "react-native-maps";
import { Color } from "../constant/Color";
import CustomMarker from "./CustomMarker";
import { nightStyle } from "../constant/MapStyle";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import ScrollCategory from "./ScrollCategory";
import { ScrollCardItem } from "./ScrollCardItem";
import { fetchItems } from "../util/db";

export default function Map(): JSX.Element {
  const _scrollView = useRef(null);
  const _map: LegacyRef<MapView> = useRef(null);

  const [items, setItems] = useState([]);
  const isDark = useSelector((state) => state.theme.dark);
  const initialRegion = {
    latitude: 33.6461,
    longitude: -117.8427,
    latitudeDelta: 0.00242,
    longitudeDelta: 0.002621,
  };

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / 350 + 0.3);
      if (index >= items.length) {
        index = items.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);
      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { location } = items[index];
          _map.current?.animateToRegion(
            {
              latitude: location[0],
              longitude: location[1],
              latitudeDelta: 0.00242,
              longitudeDelta: 0.002621,
            },
            350
          );
        }
      }, 10);
    });
  });
  useEffect(() => {
    async function fetch() {
      const data = await fetchItems();
      if (data.length > 0) {
        setItems(data);
      }
    }
    fetch();
  }, []);
  // console.log(items[0]);

  function onMarkerPress(markerID) {
    console.log(markerID);
    if (_scrollView.current) {
      const x = markerID * 350 + markerID * 20;
      _scrollView.current.scrollToOffset({ x: x, y: 0, animated: true });
    }
  }
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={_map}
        style={styles.map}
        initialRegion={initialRegion}
        zoomEnabled
        customMapStyle={isDark && nightStyle}
      >
        {/* <CustomMarker
          lat={initialRegion.latitude}
          lng={initialRegion.longitude}
          title="Test"
          description="Just a test"
        /> */}
        {items.length > 0 &&
          items.map((item, index) => (
            <CustomMarker
              key={index}
              lat={item.location[0]}
              lng={item.location[1]}
              description={item.description}
              title={item.title}
              onPress={() => onMarkerPress(index)}
            />
          ))}
      </MapView>
      <SearchBar />
      <ScrollCategory />
      {items.length > 0 && (
        <ScrollCardItem
          item={items}
          mapAnimation={mapAnimation}
          ref={_scrollView}
        />
      )}
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
