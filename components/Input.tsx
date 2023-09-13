import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  multiline: boolean;
  height?: Number;
  style: Object;
  placeholderTextColor: string;
}

export default function Input({
  placeholder,
  value,
  onChangeText,
  label,
  multiline,
  height,
  style,
  placeholderTextColor,
}: InputProps): JSX.Element {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        multiline={multiline}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, style]}
        height={height}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    paddingVertical: "3%",
    paddingHorizontal: "4%",
    borderWidth: 1,
    borderColor: "black",
    marginVertical: "1%",
    marginBottom: "4%",
    fontSize: 16,
    borderRadius: 10,
  },
  labelText: {
    width: "86%",
    textAlign: "left",
  },
});
