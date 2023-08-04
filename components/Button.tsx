import React from "react";
import { Pressable, StyleSheet } from "react-native";
interface ButtonProps {
  style: object;
  children: any;
}
export default function Button({ children, style }: ButtonProps): JSX.Element {
  return (
    <Pressable
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
