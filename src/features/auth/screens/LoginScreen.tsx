import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { eye_show, eye_off, google_ico, facebook_icon } from '@/src/constants';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '@/src/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import theme from '@/src/theme';
import { validateEmail } from '@/src/utils/form';
import { login } from '@/src/redux/slices/userSlice';
import { AppDispatch } from '@/src/redux/store';
import { SocialButton } from '../components/SocialButton';
import SubmitButton from '../components/SubmitButton';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setError('');
    setIsLoading(true);

    const res = await dispatch(login(email, password));
    setError(typeof res === 'string' ? res : 'An unexpected error occurred');
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.text}>Enter your details to proceed further</Text>

          {/* Email Input */}
          <View style={styles.container_in}>
            <Text style={styles.b1_text}>Email</Text>
            <TextInput
              style={[
                styles.input,
                !validateEmail(email) && email.length > 0
                  ? styles.invalidInput
                  : {},
              ]}
              placeholder="Enter email"
              placeholderTextColor={theme.colors.placeholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Password Input */}
            <Text style={{ ...styles.b1_text, marginTop: 32 }}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor={theme.colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <Image source={eye_show} style={styles.icon} />
                ) : (
                  <Image source={eye_off} style={styles.icon} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotPassword}
            >
              <Text style={styles.b2_text}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <SubmitButton
            title="Sign In"
            onPress={handleLogin}
            isLoading={isLoading}
          />

          {/* Social Login */}
          <View style={styles.socialLoginContainer}>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtonsContainer}>
              <SocialButton icon={google_ico} onPress={() => {}} />
              <SocialButton icon={facebook_icon} onPress={() => {}} />
            </View>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.b4_text}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.b5_text}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: 20,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 10,
  },
  text: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    marginBottom: 30,
  },
  container_in: {
    width: '100%',
  },
  b1_text: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 40,
    paddingLeft: 15,
    height: 43,
    marginBottom: 10,
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  invalidInput: {
    borderColor: theme.colors.error,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 40,
    paddingHorizontal: 15,
    height: 43,
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.primary,
  },
  eyeIcon: {
    marginLeft: -30,
  },
  icon: {
    width: 20,
    // height: 20,
  },
  forgotPassword: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  b2_text: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 14,
    marginTop: 5,
  },
  socialLoginContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E57373',
  },
  dividerText: {
    marginHorizontal: 10,
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    gap: 13,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  b4_text: {
    color: theme.colors.textPrimary,
    fontSize: 14,
  },
  b5_text: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
