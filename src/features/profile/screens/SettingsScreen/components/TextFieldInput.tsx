import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { TextFieldInputProps } from '../types/settings.types';

const TextFieldInput: React.FC<TextFieldInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#F08080"
      value={value}
      onChangeText={onChange}
      autoCapitalize="none"
    />
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
});

export default TextFieldInput;
