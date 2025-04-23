import {
  addCommentToPost,
  fetchMyPosts,
} from '@/src/features/feed/services/feedService';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSummary {
  uid: string;
  fullName: string;
  avatarUrl?: string;
}

interface MyProfileState {
  followers: UserSummary[] | null;
  following: UserSummary[] | null;
  myPosts: any[] | null;
  loading: boolean;
}

const initialState: MyProfileState = {
  followers: null,
  following: null,
  myPosts: null,
  loading: false,
};

interface Comment {
  id: string;
  user: {
    id: string;
    uid?: string | undefined;
    fullName: string;
    avatarUrl: string | null;
  };
  data: {
    text: string;
    name?: string;
  };
  created_at: string;
}

export const loadMyPosts = createAsyncThunk(
  'myProfile/loadMyPosts',
  async (userId: string, thunkAPI) => {
    try {
      const posts = await fetchMyPosts(userId);
      return posts || [];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const addCommentToMyPost = createAsyncThunk(
  'feed/addComment',
  async (
    {
      postId,
      parentId,
      comment,
    }: { postId: string; parentId: string; comment: Comment },
    thunkAPI,
  ) => {
    try {
      return { postId, comment: comment };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const deleteMyPostById = createAsyncThunk(
  'feed/deletePost',
  async (postId: string, thunkAPI) => {
    try {
      return postId;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const myProfileSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    setFollowers(state, action: PayloadAction<UserSummary[]>) {
      state.followers = action.payload;
    },
    setFollowing(state, action: PayloadAction<UserSummary[]>) {
      state.following = action.payload;
    },
    setMyPosts(state, action: PayloadAction<any[]>) {
      state.myPosts = action.payload;
    },
    clearMyProfile(state) {
      state.followers = null;
      state.following = null;
      state.myPosts = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMyPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMyPosts.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.myPosts = action.payload;
        state.loading = false;
      })
      .addCase(loadMyPosts.rejected, (state) => {
        state.loading = false;
      });
    builder.addCase(deleteMyPostById.fulfilled, (state, action) => {
      if (state.myPosts) {
        state.myPosts = state.myPosts.filter((p) => p.id !== action.payload);
      }
    });
    builder.addCase(addCommentToMyPost.fulfilled, (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.myPosts?.find((p) => p.id === postId);
      if (post) {
        post.comments = [
          ...post.comments,
          {
            ...comment,
            data: {
              ...comment.data,
              text: comment.data.text || '',
              name: comment.data.name || 'Anonymous',
            },
            user: {
              ...comment.user,
              uid: comment.user.uid || '',
            },
          },
        ];
      }
    });
  },
});

export const { setFollowers, setFollowing, setMyPosts, clearMyProfile } =
  myProfileSlice.actions;

export default myProfileSlice.reducer;
