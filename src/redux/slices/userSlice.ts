// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, logoutUser, registerUser } from '@/src/api/auth';

interface UserState {
  isAuthenticated: boolean;
  user: any | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
};

export const login = (email: string, password: string) => async (dispatch: any) => {
  try {
    const userData = await loginUser(email, password);
    const {user} = userData.data;
    dispatch(loginSuccess({
      user: user
    }));
    return "Login successful";
  } catch (error) {
    console.log('Login failed:', error);
    return "Invalid credentials.";
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    dispatch(logoutUser());
    dispatch(logoutSuccess());
  } catch (error) {
    console.log('Logout failed:', error);
  }
};

export const register = (email: string, password: string) => async (dispatch: any) => {
  try {
    const userData = await registerUser(email, password);
    return {success: userData.success, message: userData.message};
  } catch (error) {
    console.log('Registration failed:', error);
    return {success: false, message: "User already exists."};
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
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
