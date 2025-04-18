import AsyncStorage from '@react-native-async-storage/async-storage';
import { StreamClient } from 'getstream';
import Constants from 'expo-constants';
import axiosInstance from '@/src/types/axios';

let activityClient: StreamClient;

export const initActivityClient = async (user: any) => {
  try {
    const API_KEY = Constants.expoConfig?.extra?.EXPO_STREAM_CHAT_API_KEY;
    const APP_ID = Constants.expoConfig?.extra?.EXPO_STREAM_CHAT_APP_ID;

    if (activityClient && activityClient.userId) return activityClient;

    const expiresAt = await AsyncStorage.getItem('stream_token_expiry');
    const cachedToken = await AsyncStorage.getItem('stream_token');

    const isValidToken =
      cachedToken && expiresAt && new Date(expiresAt).getTime() > Date.now();

    let token = cachedToken;

    if (!isValidToken) {
      const accessToken = await AsyncStorage.getItem('token');
      const response = await axiosInstance.post(
        '/chat/get-token',
        { uid: user.uid },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      token = response.data.token;

      const expiration = new Date(Date.now() + 60 * 60 * 1000); 
      if (token) {
        await AsyncStorage.setItem('stream_token', token);
      } else {
        throw new Error('Token is null or undefined');
      }
      await AsyncStorage.setItem('stream_token_expiry', expiration.toISOString());
    }

    activityClient = new StreamClient(API_KEY, token, APP_ID);
    await activityClient.setUser({
      id: user.uid,
      name: user.fullName,
      image: user.avatarUrl || `https://getstream.io/random_avatar/${user.uid}.png`,
      token: token,
    });
    return activityClient;
  } catch (error) {
    console.error('❌ Error initializing activity client:', error);
    return null;
  }
};

export const fetchFollowersAndFollowing = async (userId: string) => {
  if (!activityClient) throw new Error('Activity client not initialized');

  const notificationFeed = activityClient.feed('notification', userId);

  const [followersRes, followingRes] = await Promise.all([
    notificationFeed.followers(),
    notificationFeed.following()
  ]);

  return {
    followers: followersRes.results.map(f => f.feed_id.split(':')[1]),
    following: followingRes.results.map(f => f.target_id.split(':')[1]),
  };
};
