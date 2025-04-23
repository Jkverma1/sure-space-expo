import axiosInstance from '@/src/types/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchNotifications = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.get(`/notifications`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log('Error fetching notifications:', error);
    return [];
  }
};
