import { StreamChat, ChannelSort, Channel } from 'stream-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import axiosInstance from '@/src/types/axios';
import {
  CreateChatChannelParams,
  DeleteChannelResponse,
} from '../types/chat.types';

let client: StreamChat | null = null;

export const initializeChatSession = async (user: any) => {
  if (client && client.userID) return client;

  const expiresAt = await AsyncStorage.getItem('stream_token_expiry');
  const cachedToken = await AsyncStorage.getItem('stream_token');

  const isValidToken =
    cachedToken && expiresAt && new Date(expiresAt).getTime() > Date.now();

  // Create or reuse StreamChat instance
  if (!client) {
    client = StreamChat.getInstance(
      Constants.expoConfig?.extra?.EXPO_STREAM_CHAT_API_KEY,
    );
  }

  if (!isValidToken) {
    const accessToken = await AsyncStorage.getItem('token');
    const response = await axiosInstance.post(
      '/chat/get-token',
      { uid: user.uid },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const token = response.data.token;

    const expiration = new Date(Date.now() + 60 * 60 * 1000);
    await AsyncStorage.setItem('stream_token', token);
    await AsyncStorage.setItem('stream_token_expiry', expiration.toISOString());

    await client.connectUser(
      {
        id: user.uid,
        name: user.fullName,
        image:
          user.avatarUrl ||
          `https://getstream.io/random_avatar/${user.uid}.png`,
      },
      token,
    );
  } else {
    await client.connectUser(
      {
        id: user.uid,
        name: user.fullName,
        image:
          user.avatarUrl ||
          `https://getstream.io/random_avatar/${user.uid}.png`,
      },
      cachedToken,
    );
  }

  return client;
};

export const fetchChannels = async (): Promise<{
  channels: Channel[];
  error: any;
}> => {
  try {
    const client = getChatClient();

    if (!client || !client.userID) {
      throw new Error(
        'Chat client is not initialized or user is not connected',
      );
    }

    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.get('/chat/channels', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return { channels: response.data.data, error: null };
  } catch (error) {
    console.log('Error fetching channels:', error);
    return { channels: [], error };
  }
};

export const deleteChannel = async (
  channelId: string,
): Promise<DeleteChannelResponse> => {
  try {
    const channel = client?.channel('messaging', channelId);
    if (!channel) {
      throw new Error('Channel not found or client is not initialized');
    }
    await channel.delete();
    return { success: true };
  } catch (error) {
    console.log('Error deleting channel:', error);
    return { success: false, error };
  }
};

export const createChatChannel = async (
  channelId: CreateChatChannelParams['channelId'],
  members: CreateChatChannelParams['members'],
  user: CreateChatChannelParams['user'],
  selectedUser: CreateChatChannelParams['selectedUser'],
): Promise<Channel | null> => {
  try {
    const channel = client?.channel('messaging', channelId, { members });
    await channel?.create();
    return channel as Channel;
  } catch {
    try {
      const members = [user.uid, selectedUser.uid];
      const channel = client?.channel('messaging', channelId, { members });
      await channel?.create();
      return channel as Channel;
    } catch (error) {
      console.log('Error creating chat channel:', error);
      return null;
    }
  }
};

export const getMessages = async (channelId: string) => {
  try {
    const channel = client?.channel('messaging', channelId);
    await channel?.watch();
    const response = await channel?.query({
      messages: { limit: 50 },
    });

    return response?.messages;
  } catch (error) {
    console.log('Error fetching messages:', error);
    return [];
  }
};

export const sendMessage = async (
  channelId: string,
  userId: string,
  messageText: string,
) => {
  try {
    const channel = client?.channel('messaging', channelId);
    await channel?.watch();
    await channel?.sendMessage({
      text: messageText,
      user_id: userId,
    });
  } catch (error) {
    console.log('Error sending message:', error);
  }
};

export const listenForNewMessages = async (
  channelId: string,
  onNewMessage: any,
) => {
  try {
    const channel = client?.channel('messaging', channelId);
    await channel?.watch();

    const handleNewMessage = (event: any) => {
      if (event.message) {
        onNewMessage(event.message);
      }
    };

    channel?.on('message.new', handleNewMessage);
    return () => {
      channel?.off('message.new', handleNewMessage);
    };
  } catch (error) {
    console.log('Error in listenForNewMessages:', error);
    return () => {};
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await client?.queryUsers({}, { name: 1 }, { limit: 100 });
    return response?.users;
  } catch (error) {
    console.log('Error fetching users:', error);
    return [];
  }
};

export const getChatClient = () => client;
