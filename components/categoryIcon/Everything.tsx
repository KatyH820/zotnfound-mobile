import { Entypo } from "@expo/vector-icons";
import React from "react";
interface Props {
  color: string;
}
export default function Everything({ color }: Props): JSX.Element {
  return <Entypo name="box" size={24} color={color} />;
}
