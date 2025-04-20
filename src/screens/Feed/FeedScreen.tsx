import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import MyContentScreen from '@/src/features/feed/screens/MyContentScreen';
import ForYouScreen from '@/src/features/feed/screens/ForYouScreen';
import CommunityScreen from '@/src/features/feed/screens/CommunityScreen';

export default function FeedScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'my', title: 'My Content' },
    { key: 'foryou', title: 'For You' },
    { key: 'community', title: 'Community' },
  ]);

  const renderScene = () => {
    switch (routes[index].key) {
      case 'my':
        return <MyContentScreen />;
      case 'foryou':
        return <ForYouScreen />;
      case 'community':
        return <CommunityScreen />;
      default:
        return null;
    }
  };

  const renderTabBar = () => (
    <View style={styles.tabBar}>
      {routes.map((route, i) => {
        const isFocused = index === i;
        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => setIndex(i)}
          >
            <Text style={[styles.tabText, isFocused && styles.activeTabText]}>
              {route.title}
            </Text>
            {isFocused && <View style={styles.underline} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderTabBar()}
      <View style={{ flex: 1 }}>{renderScene()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 10,
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 20,
    color: '#1E1D2080',
    fontWeight: '400',
  },
  activeTabText: {
    color: '#1E1D20',
    fontWeight: 'bold',
  },
  underline: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#1E1D20',
  },
});
