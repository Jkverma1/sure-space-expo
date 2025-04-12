import axiosInstance from '@/src/types/axios';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
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
        console.log(response)
    if(response.data.code === 200)
        await AsyncStorage.setItem('token', idToken);
    return response.data;
    }
    catch (error) {
      console.error('Error logging in:', error);
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
}