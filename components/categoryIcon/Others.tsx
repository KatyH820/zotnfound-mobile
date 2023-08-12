import { Entypo } from "@expo/vector-icons";
import React from "react";
interface Props {
  color: string;
}
export default function Others({ color }: Props): JSX.Element {
  return <Entypo name="help" size={24} color={color} />;
}
