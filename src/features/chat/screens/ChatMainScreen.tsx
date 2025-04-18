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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { search } from '@/src/constants';
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
  channel: Channel<DefaultGenerics>;
}

type ChatScreenNavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  'ChatMain'
>;

const ChatMainScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const cachedChannels = useSelector((state: RootState) => state.chat.channels);

  const [filteredChannels, setFilteredChannels] = useState<
    Channel<DefaultGenerics>[]
  >([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const initialize = async () => {
      if (cachedChannels.length === 0) {
        const { channels, error } = await fetchChannels();
        if (!error && channels) {
        dispatch(setChannels({ channels }));
          setFilteredChannels(channels);
        }
      } else {
        setFilteredChannels(cachedChannels);
      }
    };

    initialize();
  }, [dispatch]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered: Channel<DefaultGenerics>[] = cachedChannels.filter(
      (channel: Channel<DefaultGenerics>) =>
        channel.data?.name?.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredChannels(filtered);
  };

  const handleDeleteChannel = async (
    channel: HandleDeleteChannelProps,
  ): Promise<void> => {
    try {
      await deleteChannel(channel.id);
      const updatedChannels = cachedChannels.filter(
        (c: Channel<DefaultGenerics>) => c.id !== channel.id,
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
          onPress={() => channel.id && handleDeleteChannel({ id: channel.id })}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  interface HandleChatPressProps {
    id: string;
    data: {
      name?: string;
    };
    state: {
      members: Record<string, unknown>;
    };
  }

  const handleChatPress = (channel: any): void => {
    navigation.navigate('ConversationScreen', {
      channelId: channel.id,
      channelName: channel.data.name,
      channelMembers: channel.state.members,
    });
  };

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
            key={channel.id}
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress, dragX, channel)
            }
          >
            <TouchableOpacity
              style={styles.chatBox}
              onPress={() => handleChatPress(channel)}
            >
              <Image
                source={{
                  uri:
                    channel.data?.created_by &&
                    typeof channel.data.created_by === 'object' &&
                    'image' in channel.data.created_by
                      ? String(channel.data.created_by.image)
                      : 'https://your-default-avatar.com/avatar.png',
                }}
                style={styles.profileImage}
              />
              <View style={styles.chatContent}>
                <Text style={styles.title}>{channel.data?.name ?? 'Chat'}</Text>
                <Text style={styles.lastMessage}>
                  {channel.state.messages.length > 0
                    ? channel.state.messages[channel.state.messages.length - 1]
                        .text
                    : 'No messages yet'}
                </Text>
              </View>
              <Text style={styles.time}>
                {channel.state.messages.length > 0
                  ? new Date(
                      channel.state.messages[
                        channel.state.messages.length - 1
                      ].created_at,
                    ).toLocaleTimeString()
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
    bottom: 10,
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
});

export default ChatMainScreen;
