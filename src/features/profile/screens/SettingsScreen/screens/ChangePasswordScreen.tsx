import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingStackParamList } from '../types/settings.types';
import Header from '../../../components/Header';
import { eye_off, eye_show } from '@/src/constants';
import { changePassword } from '../services/changePassword';
import SubmitButton from '../components/SubmitButton';
import theme from '@/src/theme';

const screenWidth = Dimensions.get('window').width;

const ChangePasswordScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingStackParamList>>();

  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [reason, setReason] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCpasswordVisible, setIsCpasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleCreatePass = async () => {
    try {
      setIsLoading(true);
      setReason('');

      if (!password || !cpassword) {
        setReason('All fields are required.');
        setIsLoading(false);
        return;
      }

      if (password !== cpassword) {
        setReason('Passwords do not match.');
        setIsLoading(false);
        return;
      }

      if (!validatePassword(password)) {
        setReason(
          'Password must be at least 8 characters long and include a capital letter, lowercase letter, number, and special character.',
        );
        setIsLoading(false);
        return;
      }

      await changePassword(password);
      navigation.navigate('PasswordChanged');
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setReason('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboard}
    >
      <Header title="Change Password" />
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Your new password must be different from previously used ones.
        </Text>

        {/* New Password */}
        <Text style={styles.label}>New Password</Text>
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

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm New Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            placeholderTextColor={theme.colors.placeholder}
            value={cpassword}
            onChangeText={setCpassword}
            secureTextEntry={!isCpasswordVisible}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsCpasswordVisible(!isCpasswordVisible)}
          >
            {isCpasswordVisible ? (
              <Image source={eye_show} style={styles.icon} />
            ) : (
              <Image source={eye_off} style={styles.icon} />
            )}
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {reason !== '' && !isLoading && (
          <Text style={styles.errorText}>{reason}</Text>
        )}

        {/* Save Button */}
        <SubmitButton
          title="Save"
          onPress={handleCreatePass}
          isLoading={isLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.05,
    backgroundColor: 'white',
  },
  instructions: {
    marginTop: 16,
    fontSize: 16,
    color: '#000',
    fontFamily: 'OpenSans-Medium',
    textAlign: 'left',
    width: '100%',
  },
  label: {
    marginTop: 25,
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
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
  errorText: {
    color: 'red',
    marginTop: 5,
    marginBottom: 10,
    alignSelf: 'flex-start',
    fontFamily: 'OpenSans-Regular',
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 57,
    width: '100%',
    marginTop: 40,
    borderRadius: 45,
    backgroundColor: '#F08080',
  },
  disabledButton: {
    backgroundColor: '#E9E9E9',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
});
