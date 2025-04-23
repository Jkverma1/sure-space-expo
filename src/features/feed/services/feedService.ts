import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '@/src/types/axios';

export const fetchFollowers = async (userId: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.get(
      `/stream/activity-feeds/followers/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log('Error fetching followers:', error);
  }
};

export const fetchFollowing = async (userId: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.get(
      `/stream/activity-feeds/following/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log('Error fetching following:', error);
  }
};

export const fetchForYouPosts = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.get(
      `/stream/activity-feeds/global-feed`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log('Error fetching other post:', error);
  }
};

export const fetchMyPosts = async (userId: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.get(
      `/stream/activity-feeds/user-feed/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log('Error fetching post:', error);
  }
};

export const likePost = async (postId: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.post(
      `/stream/activity-feeds/like`,
      {
        activityId: postId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('Error liking post:', error);
  }
};

export const unlikePost = async (postId: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.delete(
      `/stream/activity-feeds/unlike`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          activityId: postId,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('Error unliking post:', error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.delete(
      `/stream/activity-feeds/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          activityId: postId,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('Error deleting post:', error);
  }
};

export const reportPost = async (
  userId: string,
  postId: string,
  reason: string,
  comment?: string,
) => {
  try {
    const requestBody = {
      reporter_id: userId,
      entity_type: 'post',
      entity_id: postId,
      reason: reason,
      comment: '',
    };
    if (reason === 'other' && comment) {
      requestBody.comment = comment;
    }
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.post(`/reports`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log('Error reporting post:', error);
  }
};

export const fetchComments = async (postId: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.get(
      `/stream/activity-feeds/comments/${postId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log('Error fetching comments:', error);
  }
};

export const getFollowers = async (uid: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.get(
      `/stream/activity-feeds/followers/${uid}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const followersRaw = response.data.data.followers;
    const mappedFollowers = followersRaw.map((f: any) => ({
      uid: f.uid,
      fullName: f.fullName,
      avatarUrl: f.avatarUrl ?? undefined,
    }));
    return { followers: mappedFollowers, user: response.data.data.user };
  }
  catch (error) {
    console.error('Failed to fetch followers:', error);
  }
};

export const getFollowing = async (uid: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.get(
      `/stream/activity-feeds/following/${uid}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const followingRaw = response.data.data.following;
    const mappedFollowing = followingRaw.map((f: any) => ({
      uid: f.uid,
      fullName: f.fullName,
      avatarUrl: f.avatarUrl ?? undefined,
    }));
    return { following: mappedFollowing, user: response.data.data.user };
  }
  catch (error) {
    console.error('Failed to fetch followings:', error);
  }
};

export const addCommentToPost = async (
  postId: string,
  parentId: string,
  comment: string,
) => {
  const requestBody = {
    activityId: postId,
    user_id: parentId,
    text: comment,
  };
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.post(
      `/stream/activity-feeds/comments/add`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('Error adding comment:', error);
  }
};
