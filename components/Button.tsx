import React from "react";
import { Pressable, StyleSheet } from "react-native";
interface ButtonProps {
  style?: object;
  children: any;
  onPress: () => void;
}
export default function Button({
  children,
  style,
  onPress,
}: ButtonProps): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: "3%",
  },
  pressed: {
    opacity: 0.5,
  },
});
