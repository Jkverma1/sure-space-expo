import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { CalendarModalProps } from '../types/settings.types';

const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  onClose,
  onDateSelected,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleConfirm = () => {
    onDateSelected(selectedDate);
    onClose();
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modalContainer}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Select Date</Text>
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          onChange={(event, date) => {
            if (date) {
              setSelectedDate(date);
            }
          }}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleConfirm}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 15,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  confirmButton: {
    backgroundColor: '#F08080',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  cancelText: {
    color: '#333',
    fontWeight: '600',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
  },
});
