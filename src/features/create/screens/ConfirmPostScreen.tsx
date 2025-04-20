import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import Header from '../components/Header';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MentionInput } from 'react-native-controlled-mentions';
import * as ImageManipulator from 'expo-image-manipulator';
import { savePost } from '../services/CreateService';
import { fetchAllUsers } from '@/src/features/chat/services/chatService';
import { Video, ResizeMode } from 'expo-av';
import {
  ConfirmPostScreenRouteParams,
  CreateStackParamList,
} from '../types/profile.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<
  CreateStackParamList,
  'ConfirmPostScreen'
>;

const ConfirmPostScreen = () => {
  const route =
    useRoute<RouteProp<{ params: ConfirmPostScreenRouteParams }, 'params'>>();
  const navigation = useNavigation<NavigationProp>();
  const { mediaUrl, mediaType } = route.params;

  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(
          (data || []).map((user) => ({ id: user.id, name: user.name || '' })),
        );
      } catch (err) {
        console.log('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const compressImage = async (uri: string): Promise<string> => {
    const result: ImageManipulator.ImageResult =
      await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1000 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG },
      );
    return result.uri;
  };

  const handlePost = async () => {
    try {
      setPosting(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Access token not found');

      const formData = new FormData();
      const isImage = mediaType === 'image';
      const compressedUri = isImage ? await compressImage(mediaUrl) : mediaUrl;

      const mediaFile = {
        uri:
          Platform.OS === 'ios'
            ? compressedUri.replace('file://', '')
            : compressedUri,
        name: isImage ? 'image.jpg' : 'video.mp4',
        type: isImage ? 'image/jpeg' : 'video/mp4',
      } as unknown as File;

      formData.append('media', mediaFile);

      formData.append('verb', 'post');
      formData.append('extraData', JSON.stringify({ caption }));

      await savePost(formData);
      navigation.navigate('Community');
    } catch (err) {
      console.error('Error posting content:', err);
      Alert.alert('Error', 'Failed to post content. Please try again.');
    } finally {
      setPosting(false);
    }
  };

  const renderSuggestions = ({
    keyword = '',
    onSuggestionPress,
  }: {
    keyword?: string;
    onSuggestionPress: (user: { id: string; name: string }) => void;
  }) => {
    if (!keyword) return null;
    const filtered = users?.filter((u) =>
      u.name?.toLowerCase().includes(keyword.toLowerCase()),
    );

    return (
      <ScrollView style={styles.suggestionsContainer}>
        {filtered.map((u) => (
          <TouchableOpacity
            key={u.id}
            onPress={() => onSuggestionPress(u)}
            style={styles.suggestionItem}
          >
            <Text style={styles.suggestionText}>@{u.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header title="Confirm Post" />
      <ScrollView contentContainerStyle={styles.content}>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#F08080"
            style={styles.loader}
          />
        )}
        {mediaType === 'video' ? (
          <Video
            source={{ uri: mediaUrl }}
            style={styles.media}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        ) : (
          <Image
            source={{ uri: mediaUrl }}
            style={styles.media}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            resizeMode="contain"
          />
        )}

        <Text style={styles.descriptionText}>Description</Text>
        <MentionInput
          value={caption}
          onChange={setCaption}
          placeholder="Write your caption..."
          partTypes={[
            {
              trigger: '@',
              textStyle: { fontWeight: 'bold', color: '#F08080' },
              renderSuggestions,
            },
          ]}
          style={styles.captionInput}
        />

        <TouchableOpacity
          style={styles.postButton}
          onPress={handlePost}
          disabled={posting}
        >
          <Text style={styles.postButtonText}>
            {posting ? 'Posting...' : 'Post'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 16,
  },
  media: {
    width: '100%',
    aspectRatio: 1,
  },
  loader: {
    marginVertical: 16,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1D2080',
    marginVertical: 12,
  },
  captionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    minHeight: 120,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#F08080',
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 20,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: -210,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
  },
  suggestionItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ConfirmPostScreen;
