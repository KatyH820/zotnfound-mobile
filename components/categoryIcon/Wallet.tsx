import { AntDesign } from "@expo/vector-icons";
import React from "react";
interface Props {
  color: string;
}
export default function Wallet({ color }: Props): JSX.Element {
  return <AntDesign name="wallet" size={24} color={color} />;
}
