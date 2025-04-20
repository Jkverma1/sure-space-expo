// src/features/feed/components/CommentSheet.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/redux/store';
import { addComment } from '@/src/redux/slices/feedSlice';
import { Comment, Post } from '../types/feed.types';
import { send_filled_ico } from '@/src/constants';
import OtherUserComment from './OtherUserComment';
import MyComment from './MyComment';

const CommentSheet = ({
  visible,
  onClose,
  post,
}: {
  visible: boolean;
  onClose: () => void;
  post: Post;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [localComments, setLocalComments] = useState<Post['comments']>([]);

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (visible && post?.id) {
      setLocalComments(post.comments || []);
      setLoadingComments(false);
    }
  }, [visible, post]);

  const handleSendComment = () => {
    if (!newComment.trim()) return;

    const commentObject: Comment = {
      id: `${Date.now()}`,
      user: {
        id: user.id,
        uid: user.uid,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl ?? null,
      },
      data: { text: newComment, name: user.fullName },
      created_at: new Date().toISOString(),
    };
    dispatch(
      addComment({
        postId: post.id,
        parentId: user.id,
        comment: commentObject,
      }),
    );

    setLocalComments((prev) => [...prev, commentObject]);
    setNewComment('');
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.sheet}>
        <View style={styles.dragIndicator} />
        <Text style={styles.title}>Comments</Text>

        {loadingComments ? (
          <ActivityIndicator
            size="small"
            color="#999"
            style={{ marginTop: 20 }}
          />
        ) : (
          <FlatList
            data={localComments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              item.user.id === user.id ? (
                <MyComment
                  comment={item.data?.text}
                  userName={item.user?.fullName}
                  avatar={item.user.avatarUrl ?? undefined}
                />
              ) : (
                <OtherUserComment
                  comment={item.data?.text}
                  userName={item.user?.fullName}
                  avatar={item.user.avatarUrl ?? undefined}
                />
              )
            }
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity onPress={handleSendComment}>
              <Image source={send_filled_ico} style={styles.send_ico} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default CommentSheet;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '85%',
    minHeight: '85%',
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F08080',
    borderRadius: 64,
    padding: 4,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  send_ico: {
    width: 40,
    height: 40,
  },
});
