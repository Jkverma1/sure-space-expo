import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchFollowers,
  fetchFollowing,
  fetchForYouPosts,
  likePost,
  unlikePost,
  deletePost,
  reportPost,
  fetchComments,
  addCommentToPost,
} from '@/src/features/feed/services/feedService';
import { Post } from '@/src/features/feed/types/feed.types';

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

interface FeedState {
  followers: string[];
  following: string[];
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  followers: [],
  following: [],
  posts: [],
  loading: false,
  error: null,
};

// Load followers/following
export const loadFollowersAndFollowing = createAsyncThunk(
  'feed/loadFollowersAndFollowing',
  async (userId: string, thunkAPI) => {
    try {
      const followers = await fetchFollowers(userId);
      const following = await fetchFollowing(userId);
      return { followers: followers || [], following: following || [] };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// Load ForYou posts
export const loadForYouPosts = createAsyncThunk(
  'feed/loadForYouPosts',
  async (_, thunkAPI) => {
    try {
      const posts = await fetchForYouPosts();
      return posts || [];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// Like a post
export const toggleLike = createAsyncThunk(
  'feed/toggleLike',
  async (
    {
      postId,
      liked,
      userUid,
    }: { postId: string; liked: boolean; userUid: string },
    thunkAPI,
  ) => {
    try {
      liked ? await unlikePost(postId) : await likePost(postId);
      return { postId, liked: liked, userUid };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// Delete a post
export const deletePostById = createAsyncThunk(
  'feed/deletePost',
  async (postId: string, thunkAPI) => {
    try {
      await deletePost(postId);
      return postId;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// Report a post
export const reportPostById = createAsyncThunk(
  'feed/reportPost',
  async (
    {
      userId,
      postId,
      reason,
      comment,
    }: { userId: string; postId: string; reason: string; comment?: string },
    thunkAPI,
  ) => {
    try {
      await reportPost(userId, postId, reason, comment);
      return postId;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// Fetch comments for a post
export const loadCommentsForPost = createAsyncThunk(
  'feed/loadCommentsForPost',
  async (postId: string, thunkAPI) => {
    try {
      const comments = await fetchComments(postId);
      return { postId, comments: comments.results };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// Add a comment to a post
export const addComment = createAsyncThunk(
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
      const response = await addCommentToPost(postId, parentId, comment?.data?.text || '');
      return { postId, comment: comment };
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

    builder
      .addCase(loadForYouPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadForYouPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(loadForYouPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder.addCase(toggleLike.fulfilled, (state, action) => {
      const { postId, liked, userUid } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        if (liked) {
          post.likes = post.likes.filter((like) => like.user.uid !== userUid);
        } else {
          post.likes.push({ user: { uid: userUid } });
        }
      }
    });

    builder.addCase(deletePostById.fulfilled, (state, action) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    });

    builder.addCase(loadCommentsForPost.fulfilled, (state, action) => {
      const { postId, comments } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.comments = comments;
      }
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
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

export default feedSlice.reducer;
