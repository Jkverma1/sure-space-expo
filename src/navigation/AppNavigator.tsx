import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { AppDispatch, RootState } from '../redux/store';
import { initializeApp, initializedApp } from '../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

export default function AppNavigator() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isInitializing } = useSelector(
    (state: RootState) => state.user,
  );
  useEffect(() => {
    const initialize = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        dispatch(initializeApp(token));
      } else {
        dispatch(initializedApp());
      }
    };
    initialize();
  }, [isInitializing]);

  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F08080" />
      </View>
    );
  }

  return <>{isAuthenticated ? <MainNavigator /> : <AuthNavigator />}</>;
}
