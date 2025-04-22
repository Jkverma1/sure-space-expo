import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import chatReducer from './slices/chatSlice';
import feedReducer from './slices/feedSlice';
import myProfileReducer from './slices/myProfileSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    feed: feedReducer,
    myProfile: myProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
