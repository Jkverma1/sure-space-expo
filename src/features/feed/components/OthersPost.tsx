import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import {
  like,
  unlike,
  comment,
  report_ico,
  share_ico,
  userAvatar,
} from '@/src/constants';
import { ResizeMode } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';
import { FeedStackParamList, Post } from '../types/feed.types';
import { toggleLike } from '@/src/redux/slices/feedSlice';
import { AppDispatch } from '@/src/redux/store';
import { sharePost } from '@/src/utils/functions';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface OthersPostProps {
  post: Post;
  onOpenComments: (post: Post) => void;
  onOpenReport: (post: Post) => void;
}

type NavigationProp = NativeStackNavigationProp<
  FeedStackParamList,
  'FeedScreen'
>;

const OthersPost: React.FC<OthersPostProps> = ({
  post,
  onOpenComments,
  onOpenReport,
}) => {
  const user = useSelector((state: any) => state.user.user);
  const [isLiked, setIsLiked] = useState(() =>
    post.likes.some((like: any) => like.user.uid === user.uid),
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp>();
  interface HandleLikeParams {
    postId: string;
  }

  const handleLike = async ({ postId }: HandleLikeParams): Promise<void> => {
    setIsLiked(!isLiked);
    await dispatch(toggleLike({ postId, liked: isLiked, userUid: user.uid }));
  };
  const handleReport = () => onOpenReport(post);
  const handleComments = () => onOpenComments(post);
  const handleShare = () => {
    sharePost({
      postId: post.id,
      message: `Take a look at this amazing post by ${post.user.fullName}!`,
    });
  };
  const showProfile = () => {
    navigation.navigate('UserProfileScreen', { userId: post.actor.id, uid: post.actor.uid });
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.actions_container}>
        <View style={styles.userInfo}>
          <Image
            source={
              post.actor.avatarUrl ? { uri: post.actor.avatarUrl } : userAvatar
            }
            style={styles.avatar}
          />
          <Text style={styles.username} onPress={showProfile}>
            {post.actor.fullName}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.time}>
            {new Date(post.time).toLocaleDateString()}
          </Text>
          <TouchableOpacity style={styles.action_btn} onPress={handleReport}>
            <Image source={report_ico} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {post.mediaType === 'image' && post.imageAccessUrl ? (
        <Image source={{ uri: post.imageAccessUrl }} style={styles.postImage} />
      ) : post.mediaType === 'video' && post.videoAccessUrl ? (
        <Video
          source={{ uri: post.videoAccessUrl }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          style={styles.video}
        />
      ) : null}
      <Text style={styles.caption}>{post.caption}</Text>
      <View style={{ ...styles.actions_container, marginTop: 8 }}>
        <View style={styles.actions}>
          <TouchableOpacity
            style={{ ...styles.action_btn, marginRight: 8 }}
            onPress={() => handleLike({ postId: post.id })}
          >
            <Image source={isLiked ? like : unlike} style={styles.icon} />
            <Text style={styles.likes}>{post.likes.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action_btn} onPress={handleComments}>
            <Image source={comment} style={styles.icon} />
            <Text style={styles.comments}>{post.comments.length}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleShare}>
            <Image source={share_ico} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#1E1D201A',
    paddingVertical: 8,
  },
  actions_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontWeight: '400',
    lineHeight: 21.78,
    fontSize: 16,
    color: '#1E1D20',
  },
  time: {
    fontWeight: '400',
    lineHeight: 19.07,
    fontSize: 14,
    color: '#1E1D2080',
    marginRight: 16,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#eee',
  },
  video: {
    width: '100%',
    aspectRatio: 1,
    marginTop: 8,
    backgroundColor: '#000',
  },
  caption: {
    fontSize: 14,
    color: '#1E1D20',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  action_btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 24,
    width: 24,
  },
  likes: {
    marginLeft: 4,
    fontSize: 13,
    color: '#555',
  },
  comments: {
    marginLeft: 4,
    fontSize: 13,
    color: '#555',
  },
});

export default OthersPost;
