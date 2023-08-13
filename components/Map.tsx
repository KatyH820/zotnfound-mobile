import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, FlatList } from "react-native";
import MapView, { MarkerPressEvent, PROVIDER_GOOGLE } from "react-native-maps";
import { Color } from "../constant/Color";
import CustomMarker from "./CustomMarker";
import { nightStyle } from "../constant/MapStyle";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import ScrollCategory from "./ScrollCategory";
import { ScrollCardItem } from "./ScrollCardItem";
import { fetchItems } from "../util/db";
import { itemsAction } from "../store/Items";

export default function Map(): JSX.Element {
  const _scrollView = useRef<FlatList | null>(null); // Replace FlatList with your specific type if needed
  const _map: LegacyRef<MapView> = useRef(null);
  const dispatch = useDispatch();

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
        dispatch(itemsAction.initialize(data));
        setItems(data);
      }
    }
    fetch();
  }, []);

  function onMarkerPress(markerID) {
    if (_scrollView.current) {
      const x = markerID * 350 + markerID * 20;
      _scrollView.current.scrollToOffset({ offset: x, animated: true });
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
        {items.length > 0 &&
          items.map((item, index) => (
            <CustomMarker
              key={index}
              lat={item.location[0]}
              lng={item.location[1]}
              description={item.description}
              title={item.name}
              onPress={() => onMarkerPress(index)}
            />
          ))}
      </MapView>
      <SearchBar items={items} setItems={setItems} />
      <ScrollCategory setItems={setItems} />

      {items.length > 0 && (
        <ScrollCardItem
          items={items}
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
