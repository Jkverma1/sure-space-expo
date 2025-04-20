import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<
  CreateStackParamList,
  'CreateListingScreen'
>;
import { generate_image, upload_image } from '@/src/constants';
import { CreateStackParamList } from '../types/profile.types';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 16 * (2 + 1)) / 2;

const CreateListingScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        'Permission required',
        'Please grant media access to continue.',
      );
      return;
    }

    Alert.alert(
      'Select Option',
      'Choose media source',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ['images', 'videos'],
              quality: 0.7,
              videoMaxDuration: 60,
            });

            if (!result.canceled && result.assets?.[0]?.uri) {
              const { uri, type } = result.assets[0];
              navigation.navigate('ConfirmPostScreen', {
                mediaUrl: uri,
                mediaType: type?.startsWith('video') ? 'video' : 'image',
              });
            }
          },
        },
        {
          text: 'Photo Library',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              quality: 0.7,
            });

            if (!result.canceled && result.assets?.[0]?.uri) {
              const { uri, type } = result.assets[0];
              navigation.navigate('ConfirmPostScreen', {
                mediaUrl: uri,
                mediaType: type?.startsWith('video') ? 'video' : 'image',
              });
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={10}
    >
      <Header title="Create" showBack={false} />

      <View style={styles.createContainer}>
        <TouchableOpacity style={styles.createItem}>
          <Image source={generate_image} style={styles.icon} />
          <Text style={styles.createItemText}>Generate Comic with AI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createItem} onPress={handleUpload}>
          <Image source={upload_image} style={styles.icon} />
          <Text style={styles.createItemText}>Upload my Content</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  createContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  createItem: {
    width: ITEM_WIDTH,
    backgroundColor: '#FFDAB91A',
    borderRadius: 12,
    borderColor: '#FBC4AB',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
    padding: 12,
  },
  createItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1D20',
    textAlign: 'center',
  },
  icon: {
    width: 72,
    height: 72,
  },
});

export default CreateListingScreen;
