import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/src/redux/store';
import { reportPostById } from '@/src/redux/slices/feedSlice';

const REPORT_REASONS = [
  'Inappropriate Content',
  'Spam or Scam',
  'Harassment or Hate Speech',
  'Misinformation',
  'Other',
];

const ReportPostSheet = ({
  visible,
  onClose,
  post,
}: {
  visible: boolean;
  onClose: () => void;
  post: any;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: any) => state.user.user);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleReport = () => {
    if (!selectedReason) {
      Alert.alert('Please select a reason');
      return;
    }

    dispatch(
      reportPostById({
        userId: user.uid,
        postId: post.id,
        reason: selectedReason,
      }),
    );
    Alert.alert('Thank you!', 'The post has been reported.');
    setSelectedReason(null);
    onClose();
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
        <Text style={styles.title}>Report Post</Text>

        {REPORT_REASONS.map((reason) => (
          <TouchableOpacity
            key={reason}
            style={[
              styles.option,
              selectedReason === reason && styles.selectedOption,
            ]}
            onPress={() => setSelectedReason(reason)}
          >
            <Text style={styles.optionText}>{reason}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
          <Text style={styles.reportButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ReportPostSheet;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 10,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#fce4ec',
    borderColor: '#f06292',
  },
  optionText: {
    fontSize: 15,
    color: '#333',
  },
  reportButton: {
    backgroundColor: '#e53935',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  reportButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
