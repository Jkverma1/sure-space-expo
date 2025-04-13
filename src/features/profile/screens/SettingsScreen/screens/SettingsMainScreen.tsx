import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Header from '../../../components/Header';
import ConfirmModal from '../components/ConfirmModal';
import { useNavigation } from '@react-navigation/native';
import {
  user, lock, blocked, privacy, terms, help, cloud, signout, cheveron_right, out_ico,
} from '@/src/constants';
import { logout } from '@/src/redux/slices/userSlice';
import { SettingsItem } from '../types/settings.types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/redux/store';

const settingsData: SettingsItem[] = [
    { id: '1', name: 'Personal Information', icon: user, screen: 'PersonalInformation' },
    { id: '3', name: 'Change Password', icon: lock, screen: 'ChangePassword' },
    { id: '4', name: 'Blocked Users', icon: blocked, screen: 'BlockedUsers' },
    { id: '11', name: 'Privacy Policy', icon: privacy, screen: 'PrivacyPolicy' },
    { id: '12', name: 'Terms and Conditions', icon: terms, screen: 'TermsAndConditions' },
    { id: '13', name: 'Help', icon: help, screen: 'Help' },
    { id: '15', name: 'Data Usage', icon: cloud, screen: 'DataUsage' },
    { id: '16', name: 'Sign Out', icon: signout, screen: 'SignOut' },
];

const SettingsMainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [modalVisible, setModalVisible] = useState(false);

    const handlePress = async (item: SettingsItem): Promise<void> => {
        if (item.screen === 'SignOut') {
            setModalVisible(true);
        } else {
            navigation.navigate(item.screen as never);
        }
    };

  const handleLogout = async () => {
    dispatch(logout());
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: SettingsItem }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item)}>
      <Image source={item.icon} style={styles.icon} />
      <Text style={styles.itemText}>{item.name}</Text>
      <Image source={cheveron_right} style={styles.chevron} />
      <ConfirmModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleLogout}
        handleClickSkip={() => setModalVisible(false)}
        text="Are you sure want to log out?"
        icon={out_ico}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Settings" />
      <FlatList
        style={styles.FlatList}
        data={settingsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  FlatList: {
    marginBottom: 90,
    paddingHorizontal: 16,
  },
  listContainer: {
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 20,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 21.79,
    fontFamily: 'Open Sans',
    color: '#1E1D20',
  },
  chevron: {
    width: 24,
    height: 24,
  },
});

export default SettingsMainScreen;
