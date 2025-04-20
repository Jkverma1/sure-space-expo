import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { right_edge, userAvatar } from '@/src/constants';
import { MyCommentProps } from '../types/feed.types';

const MyComment = ({ comment, userName, avatar }: MyCommentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.commentContainer}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.commentText}>{comment}</Text>
        <Image source={right_edge} style={styles.cornerEdge} />
      </View>
      <Image
        source={avatar ? { uri: avatar } : userAvatar}
        style={styles.avatar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  commentContainer: {
    flex: 1,
    backgroundColor: '#F08080',
    maxWidth: 169,
    padding: 14,
    paddingRight: 18,
    borderRadius: 20,
  },
  userName: {
    fontSize: 14,
    lineHeight: 19.07,
    fontWeight: '700',
    color: '#FFF',
  },
  commentText: {
    fontSize: 18,
    lineHeight: 24.51,
    flexWrap: 'wrap',
    color: '#FFF',
    fontFamily: 'Open Sans',
  },
  cornerEdge: {
    width: 27.93,
    height: 28.44,
    position: 'absolute',
    bottom: 0,
    right: -8,
  },
});

export default MyComment;
