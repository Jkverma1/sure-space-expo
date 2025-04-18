import axiosInstance from '@/src/types/axios';
import { UpdateUserProfilePayload } from '../types/settings.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateUserProfile = async (
  userData: UpdateUserProfilePayload,
): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.put(
      '/user/updateprofile',
      {
        userData: {
          formData: userData.formData,
          avatarUrl: userData.avatarUrl,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      },
    );

    return response.data;
  } catch (error: any) {
    console.error(
      'Failed to update profile:',
      error?.response || error.message,
    );
    throw error;
  }
};
