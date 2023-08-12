import { FontAwesome } from "@expo/vector-icons";
import React from "react";
interface Props {
  color: string;
}
export default function Phone({ color }: Props): JSX.Element {
  return <FontAwesome name="mobile-phone" size={25} color={color} />;
}
