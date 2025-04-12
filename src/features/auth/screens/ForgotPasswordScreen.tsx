// src/screens/ForgotPasswordScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { reset_lock } from '@/src/constants';
import theme from '@/src/theme';
import { validateEmail } from '@/src/utils/form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/src/navigation/types';
import SubmitButton from '../components/SubmitButton';

const screenWidth = Dimensions.get('window').width;

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordReset = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setIsValidEmail(true);
      if (!validateEmail(email)) {
        setIsValidEmail(false);
        setErrorMessage('Invalid email format');
        return;
      }

      if (!email) {
        setIsLoading(false);
        setErrorMessage('Please enter your email.');
        return;
      }

      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);

      Alert.alert(
        'Success',
        'A password reset email has been sent to your email address. Please check your inbox and follow the instructions.'
      );

      navigation.navigate('Login' as never);
    } catch (error: any) {
      console.error('Reset error:', error);
      setErrorMessage(error.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={reset_lock} resizeMode="contain" style={styles.image} />
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.text}>
        Enter your registered email address to receive a password reset link.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[
            styles.input,
            isValidEmail && email.length > 0 ? styles.validEmail : {},
          ]}
          placeholder="Enter email"
          placeholderTextColor="#969596"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {!isValidEmail && email.length > 0 && (
          <Text style={styles.errorText}>Invalid email format</Text>
        )}
        {!isLoading && errorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
        <SubmitButton
          title="Send Reset Email"
          onPress={handlePasswordReset}
          isLoading={isLoading}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp' as never)}>
          <Text style={styles.signUpText}>Sign Up</Text>
          <View style={styles.underline} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  image: {
    height: 180,
    width: 180,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 32,
    fontFamily: 'OpenSans-Bold',
  },
  text: {
    paddingTop: 16,
    color: theme.colors.textSecondary,
    fontSize: 16,
    lineHeight: 25.6,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
    paddingHorizontal: 16,
  },
  inputContainer: {
    width: (screenWidth * 9) / 10,
    backgroundColor: theme.colors.white,
    marginTop: 36,
  },
  label: {
    color: theme.colors.primary,
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: 10,
    paddingLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 40,
    fontFamily: 'OpenSans-Regular',
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  validEmail: {
    color: theme.colors.primary,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 10,
    textAlign: 'left',
    fontFamily: 'OpenSans-Regular',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (screenWidth * 9) / 10,
    height: 53,
    marginTop: 32,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 21,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    color: theme.colors.black,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
  },
  signUpText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  underline: {
    height: 2,
    backgroundColor: theme.colors.primary,
    width: '100%',
  },
});
