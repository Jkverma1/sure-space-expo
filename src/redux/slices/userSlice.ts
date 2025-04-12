// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '@/src/api/auth';

interface UserState {
  isAuthenticated: boolean;
  user: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
};

export const login = (email: string, password: string) => async (dispatch: any) => {
  try {
    const userData = await loginUser(email, password);
    console.log('Logging in with email:', userData);
    const {user} = userData.data;
    dispatch(loginSuccess({
      user: user
    }));
  } catch (error) {
    console.log('Login failed:', error);
  }
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: any }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
