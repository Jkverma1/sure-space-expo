import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatMainScreen from '@/src/features/chat/screens/ChatMainScreen';
import ConversationScreen from '@/src/features/chat/screens/ConversationScreen';
import NewChatScreen from '@/src/features/chat/screens/NewChatScreen';
import { initializeChatSession } from '@/src/features/chat/services/chatService'; // Adjust the import path as necessary
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const ChatScreen = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeChatSession(user);
      } catch (error) {
        console.error('Failed to initialize chat session:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    init();
  }, []);

  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#888" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="ChatMain"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="ChatMain" component={ChatMainScreen} />
        <Stack.Screen name="NewChatScreen" component={NewChatScreen} />
        <Stack.Screen
          name="ConversationScreen"
          component={ConversationScreen}
        />
      </Stack.Navigator>
    </View>
  );
};

export default ChatScreen;
