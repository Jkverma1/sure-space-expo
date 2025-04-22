import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

export const savePost = async (formData: FormData) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(
      `${Constants.expoConfig?.extra?.HOST_URL}/stream/activity-feeds/add`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log('Upload failed:', errorData);
      throw new Error(errorData.message || 'Failed to save post');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log('Error saving post:', error);
    return error.message;
  }
};
