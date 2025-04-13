import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Header from '../../../components/Header';
import ConfirmModal from '../components/ConfirmModal';
import { AppDispatch } from '@/src/redux/store';
import { logout } from '@/src/redux/slices/userSlice';
import theme from '@/src/theme';
import {
  delete_modal_icon,
  deleteAccountIcon,
  deleteDataIcon,
} from '@/src/constants';

const screenWidth = Dimensions.get('window').width;

const DataUsageScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [deleteDataModalVisible, setDeleteDataModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);

  const handleClickSkip = () => {
    setDeleteDataModalVisible(false);
    setDeleteAccountModalVisible(false);
  };

  const handleDeleteData = async () => {
    // Placeholder for actual delete data logic
    setDeleteDataModalVisible(false);
    console.log('User data deleted');
  };

  const handleDeleteAccount = async () => {
    await dispatch(logout());
    setDeleteAccountModalVisible(false);
    console.log('Account deleted and logged out');
  };

  return (
    <View style={styles.container}>
      <Header title="Data Usage" />

      {/* Delete Data Modal */}
      <ConfirmModal
        modalVisible={deleteDataModalVisible}
        setModalVisible={setDeleteDataModalVisible}
        handleClick={handleDeleteData}
        handleClickSkip={handleClickSkip}
        text="Are you sure you want to delete data?"
        icon={delete_modal_icon}
      />

      {/* Delete Account Modal */}
      <ConfirmModal
        modalVisible={deleteAccountModalVisible}
        setModalVisible={setDeleteAccountModalVisible}
        handleClick={handleDeleteAccount}
        handleClickSkip={handleClickSkip}
        text="Are you sure you want to delete your account?"
        icon={delete_modal_icon}
      />

      {/* Delete Data Option */}
      <TouchableOpacity onPress={() => setDeleteDataModalVisible(true)}>
        <View style={styles.boxBackground}>
          <View style={styles.itemContent}>
            <Image source={deleteDataIcon} style={styles.icon} />
            <Text style={styles.text}>Delete Data</Text>
          </View>
        </View>
        <View style={styles.underline} />
      </TouchableOpacity>

      {/* Delete Account Option */}
      <TouchableOpacity onPress={() => setDeleteAccountModalVisible(true)}>
        <View style={styles.boxBackground}>
          <View style={styles.itemContent}>
            <Image source={deleteAccountIcon} style={styles.icon} />
            <Text style={styles.text}>Delete Account</Text>
          </View>
        </View>
        <View style={styles.underline} />
      </TouchableOpacity>
    </View>
  );
};

export default DataUsageScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontFamily: theme.typography.semiBold.fontFamily,
  },
  icon: {
    width: 32,
    height: 32,
  },
  boxBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    height: 50,
    paddingLeft: 15,
    marginVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: '#FFF',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  underline: {
    height: 1,
    backgroundColor: '#1E1D2033',
    width: '100%',
  },
});
