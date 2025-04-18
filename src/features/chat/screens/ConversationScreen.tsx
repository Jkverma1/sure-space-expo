import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import Header from '../components/Header';
import {
  getMessages,
  sendMessage,
  listenForNewMessages,
} from '../services/chatService';
import { useRoute } from '@react-navigation/native';
import { create_post_background } from '@/src/constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/redux/store';
import { Message } from '../types/chat.types';
import { setChannels } from '@/src/redux/slices/chatSlice';

const ConversationScreen = () => {
  const { params } = useRoute<any>();
  const { channelId, channelName, channelMembers, channel } = params;
  const dispatch = useDispatch<AppDispatch>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState<{ id: any; name: any }[]>([]);
  const [mentionSuggestions, setMentionSuggestions] = useState<
    { id: any; name: any }[]
  >([]);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {

    let unsubscribeMessages: (() => void) | undefined;

    const fetchMessages = async () => {
      try {
        const chatMessages = await getMessages(channelId);
        if (!Array.isArray(chatMessages)) return;

        const formatted = chatMessages.map((msg: any) => ({
          id: msg.id,
          senderId: msg.user?.id,
          text: msg.text || '[No Text]',
          time: new Date(msg.created_at).toLocaleTimeString(),
        }));
        setMessages(formatted);
      } catch (error) {
        console.log('Error fetching messages:', error);
      }
    };

    fetchMessages();

    (async () => {
      const unsubscribe = await listenForNewMessages(channelId, (newMsg: any) => {
        if (!newMsg?.text) return;
        const formatted = {
          id: newMsg.id,
          senderId: newMsg.user?.id,
          text: newMsg.text,
          time: new Date(newMsg.created_at).toLocaleTimeString(),
        };

        setMessages((prev) =>
          prev.some((msg) => msg.id === formatted.id)
            ? prev
            : [...prev, formatted],
        );
      });

      unsubscribeMessages = unsubscribe;
    })();

    const fetchUsers = async () => {
      try {
        const members = Object.values(channelMembers).map((m: any) => ({
          id: m.uid,
          name: m.fullName,
        }));
        setUsers(members);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    fetchUsers();

    return () => {
      unsubscribeMessages?.();
    };
  }, [channelId]);

  const handleSend = async () => {
    if (newMessage.trim()) {
      setNewMessage('');
      try {
        await sendMessage(channelId, user.id, newMessage);
      } catch (error) {
        console.log('Error sending message:', error);
      }
    }
  };

  const handleInputChange = (text: string) => {
    setNewMessage(text);

    const words = text.split(' ');
    const lastWord = words[words.length - 1];

    if (lastWord.startsWith('@')) {
      const query = lastWord.slice(1).toLowerCase();
      const filteredUsers = users.filter((u) =>
        u?.name?.toLowerCase().includes(query),
      );
      setMentionSuggestions(filteredUsers);
    } else {
      setMentionSuggestions([]);
    }
  };

  const handleMentionSelect = (selectedUser: any) => {
    const words = newMessage.split(' ');
    words[words.length - 1] = `@${selectedUser.name} `;
    setNewMessage(words.join(' '));
    setMentionSuggestions([]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: 'white' }}
      keyboardVerticalOffset={10}
    >
      <Header title={channelName} backScreen="ChatMain" />
      <ImageBackground source={create_post_background} style={styles.container}>
        <ScrollView style={styles.chatContainer}>
          {messages.length === 0 ? (
            <Text style={styles.noMessagesText}>No messages yet.</Text>
          ) : (
            messages.map((message) => {
              const isOwnMessage = message.senderId === user?.uid;
              return (
                <View
                  key={message.id}
                  style={[
                    styles.messageBox,
                    isOwnMessage ? styles.selfMessage : styles.userMessage,
                  ]}
                >
                  <Text style={styles.messageText}>{message.text}</Text>
                  <Text style={styles.messageTime}>{message.time}</Text>
                </View>
              );
            })
          )}
        </ScrollView>

        {mentionSuggestions.length > 0 && (
          <View style={styles.mentionContainer}>
            <FlatList
              data={mentionSuggestions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleMentionSelect(item)}
                  style={styles.mentionItem}
                >
                  <Text style={styles.mentionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </ImageBackground>

      <View style={styles.chatFooter}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={handleInputChange}
            placeholder="Type a message"
            placeholderTextColor="#1E1D2080"
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              newMessage.trim() ? {} : styles.disabledSendButton,
            ]}
            onPress={handleSend}
            disabled={!newMessage.trim()}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chatContainer: {
    flex: 1,
    marginTop: 10,
  },
  noMessagesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#1E1D2080',
    marginTop: 20,
  },
  messageBox: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  selfMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#F08080',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FBC4AB',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color: '#1E1D2080',
  },
  chatFooter: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E1D2080',
    borderRadius: 64,
    padding: 5,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#F08080',
    borderRadius: 64,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  disabledSendButton: {
    backgroundColor: '#d3d3d3',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  mentionContainer: {
    position: 'absolute',
    bottom: 150,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    maxHeight: 150,
  },
  mentionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mentionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ConversationScreen;
