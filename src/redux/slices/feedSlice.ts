import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFollowersAndFollowing } from '@/src/features/feed/services/feedService';

interface FeedState {
  followers: string[];
  following: string[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  followers: [],
  following: [],
  loading: false,
  error: null,
};

export const loadFollowersAndFollowing = createAsyncThunk(
  'feed/loadFollowersAndFollowing',
  async (userId: string, thunkAPI) => {
    try {
      const data = await fetchFollowersAndFollowing(userId);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFollowersAndFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFollowersAndFollowing.fulfilled, (state, action) => {
        state.followers = action.payload.followers;
        state.following = action.payload.following;
        state.loading = false;
      })
      .addCase(loadFollowersAndFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default feedSlice.reducer;
