import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { back_ico, close_ico } from '@/src/constants';
import { HeaderProps } from '../types/chat.types';

const Header: React.FC<HeaderProps> = ({
  title,
  enableEdit = false,
  handleEdit,
  enableClose = false,
  handleClose,
  showBack = true,
}) => {
  const navigation = useNavigation();
  const displayedTitle =
    title.length > 15 ? `${title.substring(0, 15)}...` : title;

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
        {/* Back Button */}
        {showBack && (
          <TouchableOpacity
            style={styles.back_btn}
            onPress={() => navigation.goBack()}
          >
            <Image source={back_ico} style={styles.icon} />
            <Text style={styles.back_btn_text}>Back</Text>
          </TouchableOpacity>
        )}

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {displayedTitle}
          </Text>
        </View>

        {/* Right Actions */}
        <View style={styles.rightButtons}>
          {enableEdit && (
            <TouchableOpacity
              style={styles.edit_btn}
              onPress={handleEdit}
              disabled={!enableEdit}
            >
              <Text style={styles.edit_btn_text}>Edit</Text>
            </TouchableOpacity>
          )}
          {enableClose && (
            <TouchableOpacity onPress={handleClose}>
              <Image source={close_ico} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  back_btn: {
    position: 'absolute',
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  back_btn_text: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Open Sans',
    lineHeight: 21.79,
    color: '#F08080',
    marginLeft: 4,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Open Sans',
    lineHeight: 27.24,
    color: '#1E1D20',
  },
  rightButtons: {
    position: 'absolute',
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  edit_btn: {
    borderRadius: 25,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: '#F08080',
    marginRight: 10,
  },
  edit_btn_text: {
    fontWeight: '400',
    fontSize: 16,
    fontFamily: 'Open Sans',
    lineHeight: 21.79,
    color: '#fff',
  },
});

export default Header;
