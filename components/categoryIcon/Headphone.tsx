import { Feather } from "@expo/vector-icons";
import React from "react";
interface Props {
  color: string;
}
export default function Headphone({ color }: Props): JSX.Element {
  return <Feather name="headphones" size={24} color={color} />;
}
