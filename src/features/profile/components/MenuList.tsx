import React from 'react';
import {
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { MenuItemType, ProfileStackParamList } from '../types/profile.types';

const screenWidth = Dimensions.get('screen').width;

type Props = {
  data: MenuItemType[];
};

const MenuList: React.FC<Props> = ({ data }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

  const handleClick = (item: MenuItemType) => {
    if (item?.screen) {
      navigation.navigate(item.screen);
    }
  };

  const renderItem = ({ item }: { item: MenuItemType }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleClick(item)}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.flatList}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.screen}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: screenWidth,
    marginBottom: 60,
  },
  container: {
    padding: 10,
    marginTop: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemContainer: {
    height: 170,
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#FFDAB91A",
    borderColor: "#FBC4AB",
    borderWidth: 1,
    borderRadius: 15,
    padding: 12,
    justifyContent: "center",
    alignItems: 'center',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 10,
  },
  itemText: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: "Open Sans",
    lineHeight: 24.51,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#1E1D20",
  },
});

export default MenuList;
