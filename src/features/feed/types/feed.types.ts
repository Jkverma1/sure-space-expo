import { setFollowers, setFollowing } from '@/src/redux/slices/myProfileSlice';
import { AppDispatch } from '@/src/redux/store';
import axiosInstance from '@/src/types/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Post {
  id: string;
  user: {
    id: string;
    uid: string;
    fullName: string;
    avatarUrl: string | null;
  };
  actor: {
    id: string;
    uid: string;
    fullName: string;
    avatarUrl: string | null;
  };
  caption: string;
  foreign_id: string;
  mediaType: 'video' | 'image' | 'text';
  object: string;
  origin: string | null;
  target: string;
  time: string;
  videoFullUrl?: string;
  videoUrl?: string;
  videoAccessUrl?: string;
  imageAccessUrl?: string;
  likes: any[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  user: {
    id: string;
    uid: string;
    fullName: string;
    avatarUrl: string | null;
  };
  data: {
    text: string;
    name: string;
  };
  created_at: string;
}

export interface MyCommentProps {
  comment: string;
  userName: string;
  avatar?: string;
}

export interface FeedStackParamList {
  FeedScreen: undefined;
  UserProfileScreen: { userId: string };
  [key: string]: object | undefined;
}

interface FollowerResponse {
  id: string;
  uid: string;
  fullName: string;
  avatarUrl: string | null;
}

export const fetchAndCacheFollowers = async (
  uid: string,
  dispatch: AppDispatch,
) => {
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
    const followersRaw: FollowerResponse[] = response.data.data.followers;
    const mappedFollowers = followersRaw.map((f) => ({
      uid: f.uid,
      fullName: f.fullName,
      avatarUrl: f.avatarUrl ?? undefined,
    }));

    dispatch(setFollowers(mappedFollowers));
  } catch (error) {
    console.error('Failed to fetch followers:', error);
  }
};

export const fetchAndCacheFollowing = async (
  uid: string,
  dispatch: AppDispatch,
) => {
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
    const followingsRaw: FollowerResponse[] = response.data.data.following;
    const mappedFollowings = followingsRaw.map((f) => ({
      uid: f.uid,
      fullName: f.fullName,
      avatarUrl: f.avatarUrl ?? undefined,
    }));

    dispatch(setFollowing(mappedFollowings));
  } catch (error) {
    console.error('Failed to fetch followers:', error);
  }
};
