import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  VerifyEmail: undefined;
};

// Define the parameter list for your Main stack
export type MainStackParamList = {
  Feed: undefined;
  Profile: undefined;
  Chat: undefined;
};
