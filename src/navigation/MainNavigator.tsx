import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, StyleSheet } from 'react-native';
import FeedScreen from '../screens/Feed/FeedScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import CreateScreen from '../screens/Create/CreateScreen';
import {
  add_comic,
  add_comic_click,
  chat,
  chat_click,
  community,
  community_click,
  profile,
  profile_click,
} from '@/src/constants';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Community"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused }) => {
          let iconSource;
          switch (route.name) {
            case 'Chat':
              iconSource = focused ? chat_click : chat;
              break;
            case 'Community':
              iconSource = focused ? community_click : community;
              break;
            case 'Create':
              iconSource = focused ? add_comic_click : add_comic;
              break;
            case 'Profile':
              iconSource = focused ? profile_click : profile;
              break;
          }

          return (
            <Image
              source={iconSource}
              style={{
                height: focused ? 40 : 32,
                resizeMode: 'contain',
                marginBottom: 10,
              }}
            />
          );
        },
        tabBarActiveTintColor: '#F08080',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Community" component={FeedScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    backgroundColor: '#fff',
    height: 100,
    overflow: 'hidden',
  },
  tabBarItem: {
    paddingVertical: 16,
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 5,
  },
});
