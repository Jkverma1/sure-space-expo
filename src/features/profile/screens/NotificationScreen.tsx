import React, { useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { userAvatar } from '@/src/constants';
import { RootState } from '@/src/redux/store';
import Header from '../components/Header';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ProfileStackParamList } from '../types/profile.types';

const screenWidth = Dimensions.get('window').width;

const categorizeNotifications = (notifications: any) => {
  const today: any[] = [];
  const yesterday: any[] = [];
  const sevenDaysAgo: any[] = [];
  const oneMonthAgo: any[] = [];

  notifications?.forEach((notification: any) => {
    const daysAgo = moment().diff(moment(notification.createdAt), 'days');
    if (daysAgo === 0) {
      today.push(notification);
    } else if (daysAgo === 1) {
      yesterday.push(notification);
    } else if (daysAgo <= 7) {
      sevenDaysAgo.push(notification);
    } else {
      oneMonthAgo.push(notification);
    }
  });

  return [
    { title: 'Today', data: today },
    { title: 'Yesterday', data: yesterday },
    { title: 'Last 7 Days', data: sevenDaysAgo },
    { title: 'Older', data: oneMonthAgo },
  ];
};

const getNotificationText = (type: string) => {
  switch (type) {
    case 'post_like':
      return 'liked your post';
    case 'post_comment':
      return 'commented on your post';
    case 'user_follow':
      return 'started following you';
    case 'mention':
      return 'mentioned you in this post';
    default:
      return 'did something';
  }
};

const NotificationScreen = () => {
  const notifications = useSelector(
    (state: RootState) => state.myProfile.notifications,
  );

  const sections = useMemo(
    () => categorizeNotifications(notifications),
    [notifications],
  );
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();

  const handlePress = (item: any) => {
    const type = item?.type;
    if (type === 'post_comment' || type === 'post_like') {
      navigation.navigate('CompletePostScreen', {
        item: item.targetId,
      });
    } else if (type === 'mention' || type === 'user_follow') {
      navigation.navigate('UserProfileScreen', {
        userId: item.data.followerId,
        uid: item.actor.uid,
      });
    }
  };

  const renderNotification = ({
    item,
  }: {
    item: {
      id: string;
      type: string;
      actor?: { fullName?: string; avatarUrl?: string };
      data?: { postTitle?: string };
    };
  }) => {
    const notificationText = getNotificationText(item.type);
    const userName = item.actor?.fullName || 'Someone';
    return (
      <TouchableOpacity
        style={styles.notificationContainer}
        onPress={() => handlePress(item)}
      >
        <View style={styles.leftContainer}>
          <Image
            source={
              item.actor?.avatarUrl
                ? { uri: item.actor?.avatarUrl }
                : userAvatar
            }
            style={styles.avatar}
          />
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.notificationText}>
            <Text style={styles.userName}>{userName}</Text> {notificationText}
          </Text>
          {item.data?.postTitle && (
            <Text style={styles.postTitle}>“{item.data.postTitle}”</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderSection = ({
    item,
  }: {
    item: { title: string; data: any[] };
  }) => (
    <View>
      {item.data.length > 0 && (
        <Text style={styles.sectionHeader}>{item.title}</Text>
      )}
      <FlatList
        data={item.data}
        renderItem={renderNotification}
        keyExtractor={(notification) => notification.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Notifications" />
      <FlatList
        style={styles.list}
        data={sections}
        renderItem={renderSection}
        keyExtractor={(section) => section.title}
        showsVerticalScrollIndicator={false}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  list: {
    width: screenWidth,
    marginBottom: 330,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    width: '100%',
  },
  leftContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  middleContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#000',
  },
  userName: {
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
});

export default NotificationScreen;
