import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Header from '../../../components/Header';
import { user_image } from '@/src/constants';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const initialDummyBlockList = [
  { id: '1', fullName: 'John Doe' },
  { id: '2', fullName: 'Jane Smith' },
  { id: '3', fullName: 'Chris Johnson' },
];

const BlockedUsersScreen = () => {
  const [blocklist, setBlocklist] = useState<
    { id: string; fullName: string }[]
  >(initialDummyBlockList);
  const [isLoading, setIsLoading] = useState(false);

  const getBlockList = async () => {
    return new Promise<{ data: any[] }>((resolve) =>
      setTimeout(() => resolve({ data: blocklist }), 500),
    );
  };

  const unblockUser = async (id: string) => {
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        setBlocklist((prev) => prev.filter((user) => user.id !== id));
        resolve();
      }, 300),
    );
  };
  const fetchBlocklist = async () => {
    setIsLoading(true);
    try {
      const response = await getBlockList();
      setBlocklist(response.data);
    } catch (error) {
      console.log('Error fetching blocklist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocklist();
  }, []);

  const handleUnblock = async (id: string) => {
    try {
      await unblockUser(id);
      fetchBlocklist();
    } catch (error) {
      console.log('Error unblocking user:', error);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Image source={user_image} style={styles.avatar} />
      <Text style={styles.itemText}>{item.fullName}</Text>
      <TouchableOpacity
        style={styles.unblockBtn}
        onPress={() => handleUnblock(item.id)}
      >
        <Text style={styles.unblockText}>Unblock</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Header title="Blocked Users" />
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#F08080"
            style={{ marginTop: 30 }}
          />
        ) : blocklist.length === 0 ? (
          <Text style={styles.emptyText}>No blocked users.</Text>
        ) : (
          <FlatList
            data={blocklist}
            style={{ paddingHorizontal: 16 }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </View>
  );
};

export default BlockedUsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    height: screenHeight,
  },
  innerContainer: {
    width: screenWidth,
  },
  listContainer: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  item: {
    marginBottom: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
    color: '#333',
    flex: 1,
  },
  unblockBtn: {
    backgroundColor: '#F08080',
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  unblockText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 30,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
