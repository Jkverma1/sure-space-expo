import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import CalendarModal from './CalendarModal';
import { CalendarInputProps } from '../types/settings.types';

const calend_ico = require('../../../assets/icons/Settings/calend_ico.png');

const CalendarInput: React.FC<CalendarInputProps> = ({
  value,
  onChange,
  open,
  setOpen,
}) => {
  const handleDateChange = (date: Date): void => {
    const formattedDate = date.toISOString().split('T')[0];
    onChange(formattedDate);
    setOpen(false);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#F08080"
        value={value}
        onChangeText={onChange}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.icon} onPress={() => setOpen(true)}>
        <Image source={calend_ico} />
      </TouchableOpacity>
      <CalendarModal
        visible={open}
        onClose={() => setOpen(false)}
        onDateSelected={handleDateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#F08080',
    padding: 10,
    borderRadius: 45,
    backgroundColor: '#fff',
    paddingLeft: 15,
    marginTop: 5,
  },
  icon: {
    position: 'absolute',
    top: 43,
    right: 10,
  },
});

export default CalendarInput;
