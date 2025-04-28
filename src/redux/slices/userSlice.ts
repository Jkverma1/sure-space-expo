import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserData,
  loginUser,
  logoutUser,
  registerUser,
} from '@/src/api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isValidToken } from '@/src/utils/functions';

interface UserState {
  isAuthenticated: boolean;
  isInitializing: boolean;
  user: any | null;
  tokenExpiry: string | null;
  refreshTimeoutId: any | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  isInitializing: true,
  user: null,
  tokenExpiry: null,
  refreshTimeoutId: null,
};

export const initializeApp = (token: string) => async (dispatch: any) => {
  try {
    const isTokenValid = isValidToken(token);
    if (isTokenValid) {
      const userData = await getUserData(token);
      const { user } = userData.data;
      dispatch(loginSuccess({ user }));
      dispatch(initializedApp());
    } else {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      if (email && password) {
        const refreshedData = await dispatch(login(email, password));
        const { user, tokenExpiry } = refreshedData.data;
        dispatch(loginSuccess({ user, tokenExpiry }));
        if (tokenExpiry) {
          dispatch(scheduleTokenRefresh(tokenExpiry));
        }
      } else {
        dispatch(initializedApp());
        console.log('No valid credentials found, user needs to log in again.');
      }
    }
    return 'Login successful';
  } catch (error) {
    dispatch(initializedApp());
    console.log('Login failed:', error);
    return 'Invalid credentials.';
  }
};

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      const userData = await loginUser(email, password);
      const { user, tokenExpiry } = userData;

      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);

      dispatch(loginSuccess(user));
      if (tokenExpiry) {
        dispatch(scheduleTokenRefresh(tokenExpiry));
      }

      return { data: { user, tokenExpiry } };
    } catch (error) {
      console.log('Login failed:', error);
      return 'Invalid credentials.';
    }
  };

export const logout = () => async (dispatch: any) => {
  try {
    await logoutUser();
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('password');
    dispatch(logoutSuccess());
  } catch (error) {
    console.log('Logout failed:', error);
  }
};

export const register =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      const userData = await registerUser(email, password);
      return { success: userData.success, message: userData.message };
    } catch (error) {
      console.log('Registration failed:', error);
      return { success: false, message: 'User already exists.' };
    }
  };

export const scheduleTokenRefresh =
  (expiryDateString: string) => (dispatch: any) => {
    const expiryDate = new Date(expiryDateString);
    const currentTime = new Date();
    const timeRemaining = expiryDate.getTime() - currentTime.getTime();

    if (timeRemaining > 0) {
      const timeoutId = setTimeout(() => {
        dispatch(refreshToken());
      }, timeRemaining);
      dispatch(setRefreshTimeout(timeoutId));
    } else {
      dispatch(refreshToken());
    }
  };

export const refreshToken = () => async (dispatch: any) => {
  try {
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    if (email && password) {
      const refreshedData = await dispatch(login(email, password));
      const { user, tokenExpiry } = refreshedData.data;
      dispatch(loginSuccess({ user, tokenExpiry }));
      dispatch(scheduleTokenRefresh(tokenExpiry));
    } else {
      console.log('No credentials found in AsyncStorage');
      dispatch(logoutSuccess());
    }
  } catch (err) {
    console.log('Failed to refresh token:', err);
    dispatch(logoutSuccess());
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializedApp: (state) => {
      state.isInitializing = false;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: any; tokenExpiry?: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.tokenExpiry = action.payload.tokenExpiry || null;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.tokenExpiry = null;
      if (state.refreshTimeoutId) {
        clearTimeout(state.refreshTimeoutId);
      }
      state.refreshTimeoutId = null;
    },
    setRefreshTimeout: (state, action: PayloadAction<any>) => {
      state.refreshTimeoutId = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  initializedApp,
  setRefreshTimeout,
} = userSlice.actions;

export default userSlice.reducer;
