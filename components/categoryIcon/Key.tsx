import { FontAwesome } from "@expo/vector-icons";
import React from "react";
interface Props {
  color: string;
}
export default function Key({ color }: Props): JSX.Element {
  return <FontAwesome name="key" size={24} color={color} />;
}
