import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import theme from '@/src/theme';
import { BlurView } from 'expo-blur';
import { ConfirmModalProps } from '../types/settings.types';

const ConfirmModal: React.FC<ConfirmModalProps> = ({ modalVisible, setModalVisible, handleClick, handleClickSkip, text, icon }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
    <BlurView style={styles.blurView}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {icon && <Image source={icon} style={styles.icon} />}
                  <Text style={styles.text}>{text}</Text>
          <View style={{...styles.buttonContainer, marginBottom: 16}}>
            <TouchableOpacity style={styles.button} onPress={handleClick}>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            
            <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={handleClickSkip}>
              <Text style={[styles.buttonText, styles.closeButtonText]}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDAB91A',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10,
    backgroundColor: '#00000033,#FFDAB966', 
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
  },
  text: {
    fontSize: 20,
    width: 156,
    color: "#1E1D20",
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
    backgroundColor: theme.colors.primary,
    borderRadius: 80,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: "#FFF",
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 21,
    fontWeight: '600',
    color: '#FFF',
  },
  closeButtonText: {
    color: theme.colors.primary,
  },
});

export default ConfirmModal;
