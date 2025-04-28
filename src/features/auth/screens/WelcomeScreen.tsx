import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '@/src/theme';
import { appIcon } from '@/src/constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/src/navigation/types';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Welcome'
>;
const WelcomeScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Image
        source={appIcon}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.textBackground}>
        <Text style={styles.title}>Join us today</Text>
        <Text style={styles.text}>Enter your details to proceed further</Text>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.b1_text}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.b2_text}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    width: screenWidth,
    height: screenHeight,
  },
  image: {
    height: (screenWidth - 32) * 346 / 361,
    width: screenWidth - 32,
    bottom: 383,
    position: 'absolute',
  },
  textBackground: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    paddingTop: 48,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: screenWidth,
    height: 383,
    bottom: 0,
    position: 'absolute',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android Shadow
    elevation: 15,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 32,
    lineHeight: 44,
    fontFamily: 'Open Sans',
    fontWeight: "700",
    marginBottom: 12,
  },
  text: {
    color: '#8F8E8F',
    fontSize: 18,
    lineHeight: 25,
    fontFamily: 'Open Sans',
  },
  getStartedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 32,
    paddingHorizontal: 24,
    paddingVertical: 12,
    height: 53,
    marginTop: 40,
    borderRadius: 80,
    backgroundColor: theme.colors.primary,
  },
  signInButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 32,
    height: 57,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    marginTop: 16,
    borderRadius: 45,
    backgroundColor: theme.colors.white,
  },
  b1_text: {
    color: theme.colors.white,
    fontSize: 21,
    lineHeight: 28,
    fontFamily: 'Open Sans',
  },
  b2_text: {
    color: theme.colors.primary,
    fontSize: 21,
    lineHeight: 28,
    fontFamily: 'Open Sans',
  },
});

export default WelcomeScreen;
