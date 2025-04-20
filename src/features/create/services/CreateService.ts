import axiosInstance from '@/src/types/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const savePost = async (formData: FormData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.post(
      `stream/activity-feeds/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.log('Error saving comic:', error);
    return error.response ? error.response.data : error.message;
  }
};
