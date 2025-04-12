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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';

import { AuthStackParamList } from '@/src/navigation/types';
import { validateEmail, validatePassword } from '@/src/utils/form';
import { register } from '@/src/redux/slices/userSlice';
import { AppDispatch } from '@/src/redux/store';
import theme from '@/src/theme';
import { eye_off, eye_show, facebook_icon, google_ico } from '@/src/constants';
import { SocialButtonProps } from '../types/auth.types';
import SubmitButton from '../components/SubmitButton';

type SignupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

export default function SignupScreen() {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    setError('');
    setIsLoading(true);

    const response = await dispatch(register(email, password));
    setIsLoading(false);

    if (response?.success) {
      navigation.navigate('VerifyEmail');
    } else {
      setError(response?.message || 'Something went wrong.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.text}>Enter your details to proceed further</Text>

          <View style={styles.container_in}>
            <Text style={styles.b1_text}>Email</Text>
            <TextInput
              style={[
                styles.input,
                !validateEmail(email) && email.length > 0 ? styles.invalidInput : {},
              ]}
              placeholder="Enter email"
              placeholderTextColor={theme.colors.placeholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}

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
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Image
                  source={isPasswordVisible ? eye_show : eye_off}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <SubmitButton
            title="Sign Up"
            onPress={handleSignup}
            isLoading={isLoading}
          />

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

          <View style={styles.signUpContainer}>
            <Text style={styles.b4_text}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.b5_text}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, onPress }) => (
  <TouchableOpacity style={styles.socialButton} onPress={onPress}>
    <Image source={icon} style={styles.socialIcon} />
  </TouchableOpacity>
);

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
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 14,
    marginTop: 5,
  },
  signInButton: {
    backgroundColor: theme.colors.primary,
    width: '100%',
    height: 53,
    justifyContent: 'center',
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 32,
  },
  b3_text: {
    color: theme.colors.white,
    fontSize: 21,
    fontWeight: '600',
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
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.socialButtonBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 56,
    height: 56,
  },
});
