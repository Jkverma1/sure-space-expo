import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import { left_edge, userAvatar } from '@/src/constants';

const OtherUserComment = ({
  comment,
  userName,
  avatar,
}: {
  comment: string;
  userName: string;
  avatar?: string;
}) => {
  return (
    <View style={styles.container}>
      <Image source={avatar? {uri: avatar}: userAvatar} style={styles.avatar} />
      <View style={styles.commentContainer}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.commentText}>{comment}</Text>
        <Image source={left_edge} style={styles.cornerEdge} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContainer: {
    flex: 1,
    backgroundColor: '#FFEDDC',
    maxWidth: 169,
    padding: 14,
    paddingLeft: 20,
    borderRadius: 20,
  },
  userName: {
    fontSize: 14,
    lineHeight: 19.07,
    fontWeight: '700',
    color: '#1E1D20',
  },
  commentText: {
    fontSize: 18,
    lineHeight: 24.51,
    flexWrap: 'wrap',
    color: '#1E1D20',
    fontFamily: 'Open Sans',
  },
  cornerEdge: {
    width: 27.93,
    height: 28.44,
    position: 'absolute',
    bottom: 0,
    left: -8,
  },
});

export default OtherUserComment;
