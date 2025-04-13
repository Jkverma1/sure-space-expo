import axiosInstance from '@/src/types/axios';
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../features/auth/hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const firebaseUser = userCredential.user;
    if (!firebaseUser.emailVerified) {
      await sendEmailVerification(firebaseUser);
      return {
        success: false,
        message:
          'Please verify your email before logging in. A verification link has been sent.',
      };
    }
    const idToken = await firebaseUser.getIdToken();
    const response = await axiosInstance.get('user/profile', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    console.log(response);
    if (response.data.code === 200)
      await AsyncStorage.setItem('token', idToken);
    return response.data;
  } catch (error) {
    console.log('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await auth.signOut();
    await AsyncStorage.removeItem('token');
    return {
      success: true,
      message: 'Logged out successfully.',
    };
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const firebaseUser = userCredential.user;
    await sendEmailVerification(firebaseUser);
    return {
      success: true,
      message:
        'Registration successful. A verification link has been sent to your email.',
    };
  } catch (error) {
    console.log('Error registering:', error);
    throw error;
  }
};

export const getUserData = async (token: string) => {
  try {
    const response = await axiosInstance.get(`/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
};
