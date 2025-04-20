import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Video } from 'expo-av';
import {
  avatar,
  like,
  unlike,
  comment,
  report_ico,
  delete_ico,
  share_ico,
} from '@/src/constants';
import { ResizeMode } from 'expo-av';
import { useSelector } from 'react-redux';

const UserPost = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [editing, setEditing] = useState(false);
  const user = useSelector((state: any) => state.user.user);

  const dummyItem = {
    id: 'post123',
    actor: {
      fullName: 'John Doe',
      avatarUrl: user.avatarUrl,
      uid: 'user1',
    },
    uid: 'user2',
    imageAccessUrl: 'https://via.placeholder.com/400',
    videoAccessUrl: '',
    caption: 'This is a sample caption for the post.',
    likes: [1, 2],
    comments: [1, 2, 3],
    createdAt: new Date().toISOString(),
  };

  const handleLike = () => setIsLiked(!isLiked);
  const handleReport = (id: string): void => console.log('Report post:', id);
  const handleDelete = (id: string): void => console.log('Delete post:', id);
  const handleShare = () => console.log('Share post');
  const handleComments = () => console.log('Show comments');
  const showProfile = () => console.log('Navigate to profile');

  return (
    <View style={styles.postContainer}>
      {/* Header */}
      <View style={styles.actions_container}>
        <View style={styles.userInfo}>
          <Image
            source={
              dummyItem.actor.avatarUrl
                ? { uri: dummyItem.actor.avatarUrl }
                : avatar
            }
            style={styles.avatar}
          />
          <Text style={styles.username} onPress={showProfile}>
            {dummyItem.actor.fullName}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.time}>
            {new Date(dummyItem.createdAt).toLocaleDateString()}
          </Text>
          <TouchableOpacity
            style={styles.action_btn}
            onPress={() => handleReport(dummyItem.id)}
          >
            <Image source={report_ico} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Media */}
      {dummyItem.imageAccessUrl ? (
        <Image
          source={{ uri: dummyItem.imageAccessUrl }}
          style={styles.postImage}
        />
      ) : dummyItem.videoAccessUrl ? (
        <Video
          source={{ uri: dummyItem.videoAccessUrl }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
        />
      ) : null}
      <Text style={styles.caption}>{dummyItem.caption}</Text>
      {/* Actions */}
      <View style={{ ...styles.actions_container, marginTop: 8 }}>
        <View style={styles.actions}>
          <TouchableOpacity
            style={{ ...styles.action_btn, marginRight: 8 }}
            onPress={handleLike}
          >
            <Image source={isLiked ? like : unlike} style={styles.icon} />
            <Text style={styles.likes}>{dummyItem.likes.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action_btn} onPress={handleComments}>
            <Image source={comment} style={styles.icon} />
            <Text style={styles.comments}>{dummyItem.comments.length}</Text>
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
    height: 240,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  video: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: '#000',
  },
  caption: {
    fontSize: 14,
    color: '#1E1D20',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
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

export default UserPost;
