import { GestureResponderEvent, ImageSourcePropType } from "react-native";

export interface SocialButtonProps {
  icon: ImageSourcePropType;
  onPress: (event: GestureResponderEvent) => void;  
}