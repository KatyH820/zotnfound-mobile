import React from "react";
import { Animated } from "react-native";
import { StyleSheet, View } from "react-native";
import Card from "./Card";

export const ScrollCardItem = React.forwardRef(
  ({ items, mapAnimation }, ref) => {
    function renderItem({ item }): JSX.Element {
      return <Card item={item} />;
    }

    return (
      <Animated.FlatList
        ref={ref}
        horizontal={true}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        snapToInterval={375}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        style={styles.scrollContainer}
        contentContainerStyle={{
          justifyContent: "space-evenly",
        }}
        ListFooterComponent={<View style={{ width: 20 }} />}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      />
    );
  }
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: "row",
    flex: 1,
    position: "absolute",
    bottom: 0,
    paddingVertical: "5%",
    paddingHorizontal: "3%",
    height: "21%",
    marginBottom: 10,
  },
});
