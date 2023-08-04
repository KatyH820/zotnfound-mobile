import React from "react";
import LottieView from "lottie-react-native";
interface LottieAnimationProps {
  source: string;
  onFinish?: React.Dispatch<React.SetStateAction<boolean>>;
  loop: boolean;
}
export default function LottieAnimation({
  source,
  onFinish,
  loop,
}: LottieAnimationProps): JSX.Element {
  return (
    <LottieView
      source={source}
      autoPlay
      loop={loop}
      resizeMode="cover"
      onAnimationFinish={onFinish}
    />
  );
}
