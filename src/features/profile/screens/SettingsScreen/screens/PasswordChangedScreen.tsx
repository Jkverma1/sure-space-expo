import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { lock_done } from '@/src/constants';
import { logout } from '@/src/redux/slices/userSlice';
import SubmitButton from '../components/SubmitButton';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/redux/store';

const screenWidth = Dimensions.get('window').width;

const PasswordChangedScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Image source={lock_done} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Well Done</Text>
      <Text style={styles.subtitle}>
        You have successfully{'\n'}changed your password.
      </Text>
        <SubmitButton
          title="Log In"
          onPress={handleLogout}
          isLoading={false}
        />
    </View>
  );
};

export default PasswordChangedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    height: 180,
    width: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#F08080',
    fontFamily: 'OpenSans-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#8F8E8F',
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#F08080',
    width: (screenWidth * 9) / 10,
    height: 57,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
  },
});
