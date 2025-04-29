import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { search, userAvatar } from '@/src/constants';
import { fetchChannels, deleteChannel } from '../services/chatService';
import { Channel, DefaultGenerics } from 'stream-chat';
import { Swipeable } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { setChannels } from '@/src/redux/slices/chatSlice';
import {
  ChatStackParamList,
  HandleDeleteChannelProps,
} from '../types/chat.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface RenderRightActionsProps {
  progress: Animated.AnimatedInterpolation<number>;
  dragX: Animated.AnimatedInterpolation<number>;
  channel: any;
}

type ChatScreenNavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  'ChatMain'
>;

const ChatMainScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const cachedChannels = useSelector((state: RootState) => state.chat.channels);
  const user = useSelector((state: RootState) => state.user.user);

  const [filteredChannels, setFilteredChannels] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const initialize = async () => {
      setLoading(true); // Start loading
      try {
        if (cachedChannels.length === 0) {
          const { channels, error } = await fetchChannels();
          if (!error && channels) {
            dispatch(setChannels({ channels }));
            setFilteredChannels(channels);
          }
        } else {
          setFilteredChannels(cachedChannels);
        }
      } catch (error) {
        console.log('Error initializing channels:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    initialize();
  }, [dispatch]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered: any[] = cachedChannels.filter((channel: any) =>
      channel.members?.some((member: any) =>
        member.fullName?.toLowerCase().includes(text.toLowerCase()),
      ),
    );
    setFilteredChannels(filtered);
  };

  const handleDeleteChannel = async (
    channel: HandleDeleteChannelProps,
  ): Promise<void> => {
    try {
      await deleteChannel(channel.channelId);
      const updatedChannels = cachedChannels.filter(
        (c: any) => c.channelId !== channel.channelId,
      );
      dispatch(setChannels({ channels: updatedChannels }));
      setFilteredChannels(updatedChannels);
    } catch (error) {
      console.log('Error deleting channel:', error);
    }
  };

  const renderRightActions = (
    progress: RenderRightActionsProps['progress'],
    dragX: RenderRightActionsProps['dragX'],
    channel: RenderRightActionsProps['channel'],
  ): JSX.Element => {
    const opacity = dragX.interpolate({
      inputRange: [-100, -50, 0],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={{ opacity }}>
        <TouchableOpacity
          onPress={() =>
            channel.channelId &&
            handleDeleteChannel({ channelId: channel.channelId })
          }
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const getOtherUser = (members: any[]) => {
    return members.find((item) => item.uid !== user.uid);
  };

  const handleChatPress = (channel: any): void => {
    navigation.navigate('ConversationScreen', {
      channelId: channel.channelId,
      channelName: getOtherUser(channel.members).fullName,
      channelMembers: channel.members,
    });
  };

  if (loading) {
    // Show loader while loading
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#F08080" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title={'Chats'} showBack={false} />
      <View style={styles.searchContainer}>
        <Image source={search} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={handleSearch}
          placeholder="Search"
          placeholderTextColor="#1E1D2080"
        />
      </View>
      <ScrollView style={styles.chatContainer}>
        {filteredChannels.map((channel) => (
          <Swipeable
            key={channel.channelId}
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress, dragX, channel)
            }
          >
            <TouchableOpacity
              style={styles.chatBox}
              onPress={() => handleChatPress(channel)}
            >
              <Image
                source={
                  getOtherUser(channel.members)?.avatarUrl
                    ? {
                        uri: getOtherUser(channel.members)?.avatarUrl,
                      }
                    : userAvatar
                }
                style={styles.profileImage}
              />
              <View style={styles.chatContent}>
                <Text style={styles.title}>
                  {getOtherUser(channel.members).fullName || 'Chat'}
                </Text>
                <Text style={styles.lastMessage}>
                  {channel.lastMessageText
                    ? channel.lastMessageText
                    : 'No messages yet'}
                </Text>
              </View>
              <Text style={styles.time}>
                {channel.lastMessageAt
                  ? new Date(channel.lastMessageAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : ''}
              </Text>
            </TouchableOpacity>
          </Swipeable>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.newChatButton}
        onPress={() => navigation.navigate('NewChatScreen')}
      >
        <Text style={styles.newChatText}>+ New Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E1D2080',
    height: 40,
    borderRadius: 64,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginTop: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Open Sans',
    borderWidth: 0,
  },
  chatContainer: {
    flex: 1,
    marginTop: 10,
  },
  chatBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatContent: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24.51,
    textAlign: 'left',
    color: 'black',
  },
  lastMessage: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 21.79,
    textAlign: 'left',
    color: '#1E1D20B2',
  },
  time: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.07,
    textAlign: 'left',
    color: '#1E1D20B2',
  },
  newChatButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    backgroundColor: '#F08080',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
  newChatText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default ChatMainScreen;
