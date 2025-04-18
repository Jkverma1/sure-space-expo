import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

export const updateUserProfile = async (formData: FormData): Promise<any> => {
  const token = await AsyncStorage.getItem('token');

  const response = await fetch(
    `${Constants.expoConfig?.extra?.HOST_URL}/user/updateprofile`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
