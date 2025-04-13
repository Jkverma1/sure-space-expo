// src/screens/VerifyEmailScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { mail_ico } from '@/src/constants';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import theme from '@/src/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/src/navigation/types';
import SubmitButton from '../components/SubmitButton';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

type VerifyEmailScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'VerifyEmail'
>;

export default function VerifyEmailScreen() {
  const navigation = useNavigation<VerifyEmailScreenNavigationProp>();
  const auth = getAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const userEmail = useSelector((state: RootState) => state.user.user?.email);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          clearInterval(interval);
          navigation.navigate('Login');
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [navigation]);

  const handleResend = async () => {
    try {
      setIsLoading(true);
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      }
      setIsLoading(false);
    } catch (error: any) {
      setErrorMsg(error.message || 'Something went wrong.');
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={mail_ico}
          resizeMode="contain"
          style={{ height: 180, width: 180 }}
        />
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.text}>Please verify your email to continue</Text>
        <Text style={styles.b1_text}>{userEmail}</Text>

        <View style={styles.button}>
          <SubmitButton
            title="Resend Verification Email"
            onPress={handleResend}
            isLoading={isLoading}
          />
        </View>
        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    height: screenHeight,
  },
  title: {
    marginTop: 25,
    letterSpacing: -1,
    color: theme.colors.primary,
    fontSize: 32,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '600',
  },
  text: {
    paddingTop: 20,
    color: theme.colors.textSecondary,
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
  },
  b1_text: {
    marginTop: 5,
    color: theme.colors.primary,
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
  },
  button: {
    paddingHorizontal: 16,
    width: '100%',
  },
  errorText: {
    marginTop: 20,
    color: theme.colors.error,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
  },
});
