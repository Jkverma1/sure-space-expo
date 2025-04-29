import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Header from '../../profile/components/Header';
import OthersPost from '../components/OthersPost';
import UserPost from '../components/UserPost';
import ReportPostSheet from '../components/ReportPostSheet';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import CommentSheet from '../components/CommentSheet';
import { getPost } from '../services/feedService';
import { Post } from '../types/feed.types';

type RouteParams = {
  params: {
    item: string;
  };
};

const CompletePostScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const user = useSelector((state: any) => state.user.user);
  const { item } = route.params;

  const [post, setPost] = useState<Post | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch the post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(item);
        setPost(response);
      } catch (error) {
        console.log('Error fetching post:', error);
        Alert.alert('Error', 'Failed to load the post. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [item]);

  // Handlers for opening modals
  const handleOpenReport = useCallback((post: Post) => {
    setSelectedPost(post);
    setShowReport(true);
  }, []);

  const handleOpenDelete = useCallback((post: Post) => {
    setSelectedPost(post);
    setShowDelete(true);
  }, []);

  const handleOpenComments = useCallback((post: Post) => {
    setSelectedPost(post);
    setShowComments(true);
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#F08080" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header title="Explore" />
      {post &&
        (post.actor?.uid === user.uid ? (
          <UserPost
            post={post}
            onOpenComments={handleOpenComments}
            onOpenDelete={handleOpenDelete}
          />
        ) : (
          <OthersPost
            post={post}
            onOpenComments={handleOpenComments}
            onOpenReport={handleOpenReport}
          />
        ))}
      {selectedPost && (
        <>
          <CommentSheet
            visible={showComments}
            onClose={() => setShowComments(false)}
            post={selectedPost}
          />
          <DeleteConfirmModal
            visible={showDelete}
            onClose={() => setShowDelete(false)}
            post={selectedPost}
          />
          <ReportPostSheet
            visible={showReport}
            onClose={() => setShowReport(false)}
            post={selectedPost}
          />
        </>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default CompletePostScreen;
