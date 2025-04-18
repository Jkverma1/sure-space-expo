import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as ImagePickerLib from 'expo-image-picker';
import { ImagePickerProps } from '../types/settings.types';
import { mdi_camera } from '@/src/constants';

const ImagePicker: React.FC<ImagePickerProps> = ({ setFormData, formData }) => {
  const [imageUri, setImageUri] = useState(formData.avatarUrl);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const mediaStatus =
          await ImagePickerLib.requestMediaLibraryPermissionsAsync();
        const cameraStatus =
          await ImagePickerLib.requestCameraPermissionsAsync();

        if (
          mediaStatus.status !== 'granted' ||
          cameraStatus.status !== 'granted'
        ) {
          Alert.alert(
            'Permissions Required',
            'Camera and media library access are needed.',
          );
        }
      }
    })();
  }, []);

  const handleImagePick = async () => {
    Alert.alert(
      'Update Profile Picture',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: openCamera },
        { text: 'Choose from Library', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  const openGallery = async () => {
    try {
      const result = await ImagePickerLib.launchImageLibraryAsync({
        mediaTypes: ImagePickerLib.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri({ uri });
        setFormData({
          ...formData,
          avatarUrl: { uri },
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open image library.');
    }
  };

  const openCamera = async () => {
    try {
      const result = await ImagePickerLib.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri({ uri });
        setFormData({
          ...formData,
          avatarUrl: { uri },
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open camera.');
    }
  };

  return (
    <View style={styles.container}>
      {imageUri && (
        <View style={styles.editableAvatar}>
          <Image source={imageUri} style={styles.image} />
          <TouchableOpacity style={styles.cameraIcon} onPress={handleImagePick}>
            <Image source={mdi_camera} style={styles.cameraImage} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editableAvatar: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
  },
  cameraImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ImagePicker;
