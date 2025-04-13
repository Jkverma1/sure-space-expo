import React, { useState } from 'react';
import { View, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ImagePickerProps } from '../types/settings.types';
import { mdi_camera } from '@/src/constants';

const ImagePicker: React.FC<ImagePickerProps> = ({ setFormData, formData }) => {
  const [imageUri, setImageUri] = useState(formData.avatarUrl);

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setFormData({
          ...formData,
          avatarUrl: { uri: response.assets[0].uri || '' },
        });
        setImageUri({ uri: response.assets[0].uri ?? '' });
      }
    });
  };

  return (
    <View style={styles.container}>
      {imageUri && (
        <View style={styles.editableAvatar}>
          <Image source={imageUri} style={styles.image} />
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={handleSelectImage}
          >
            <Image source={mdi_camera} style={styles.cameraImage} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ImagePicker;
