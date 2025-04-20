import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/redux/store';
import { deletePostById } from '@/src/redux/slices/feedSlice';
import theme from '@/src/theme';
import { trash_ico } from '@/src/constants';

const DeleteConfirmModal = ({
  visible,
  onClose,
  post,
}: {
  visible: boolean;
  onClose: () => void;
  post: any;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await dispatch(deletePostById(post.id));
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={trash_ico} style={styles.icon} />
            <Text style={styles.text}>
              Are you sure you want to delete this post?
            </Text>

            <View style={[styles.buttonContainer, { marginBottom: 16 }]}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleDelete}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={theme.colors.white} />
                ) : (
                  <Text style={styles.buttonText}>Yes</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={onClose}
              >
                <Text style={[styles.buttonText, styles.closeButtonText]}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default DeleteConfirmModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: Dimensions.get('screen').width - 64,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 35,
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 15,
    tintColor: '#e53935',
  },
  text: {
    fontSize: 20,
    width: 200,
    color: '#1E1D20',
    fontFamily: theme.typography.semiBold.fontFamily,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#F08080',
    borderRadius: 80,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#FFF',
    borderColor: '#F08080',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 21,
    fontWeight: '600',
    color: '#FFF',
  },
  closeButtonText: {
    color: '#F08080',
  },
});
