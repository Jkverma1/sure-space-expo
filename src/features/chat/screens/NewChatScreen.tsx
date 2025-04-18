import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { userAvatar } from '@/src/constants';
import { useSelector } from 'react-redux';
import { createChatChannel } from '../services/chatService';
import { ChatStackParamList, User } from '../types/chat.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ChatScreenNavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  'NewChatScreen'
>;

// const mockedFollowers = [{ uid: '2', fullName: 'Jane Doe', id: '2' }];
// const mockedFollowing = [{ uid: '3', fullName: 'Bob Smith', id: '3' }];

const NewChatScreen = () => {
  const user = useSelector((state: any) => state.user.user);
  const { followers, following } = useSelector(
    (state: any) => state.user.user?.followers || [],
  );
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const allUsers = [
      ...(followers?.followers || []),
      ...(following?.following || []),
    ];
    const uniqueUsers = Array.from(
      new Map(
        allUsers
          .filter((u) => u?.uid && u.uid !== user?.uid)
          .map((u) => [u.uid, u]),
      ).values(),
    );
    setUsers(uniqueUsers);
  }, [user?.uid]); // fixed dependency array

  const handleCreateChat = async (selectedUser: User): Promise<void> => {
    setLoading(true);
    setError('');

    const channelId = `chat-${user.uid}-${selectedUser.uid}`;
    const members = [user.id, selectedUser.id];

    try {
      const channel = await createChatChannel(
        channelId,
        members,
        user,
        selectedUser,
      );
      if (channel) {
        await channel.updatePartial({
          set: { name: selectedUser.fullName },
        });
        navigation.navigate('ConversationScreen', {
          channelId: channel.id || '',
          channelName: channel.data?.name || '',
          channelMembers: channel.state.members,
        });
      }
    } catch (err) {
      setError('Failed to create chat. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Select Member" />
      {loading ? (
        <ActivityIndicator size="large" color="#F08080" />
      ) : (
        <>
          {users.length > 0 ? (
            <FlatList
              data={users}
              keyExtractor={(item) => item.uid}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.userItem}
                  onPress={() => handleCreateChat(item)}
                >
                  <Image
                    source={
                      item.avatarUrl ? { uri: item.avatarUrl } : userAvatar
                    }
                    style={styles.avatar}
                  />
                  <Text style={styles.userName}>{item.fullName}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.noUsersText}>No users available</Text>
          )}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
  },
  noUsersText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
});

export default NewChatScreen;
