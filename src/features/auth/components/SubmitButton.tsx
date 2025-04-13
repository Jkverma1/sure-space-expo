// components/SubmitButton.tsx
import theme from '@/src/theme';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  isLoading: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function SubmitButton({
  title,
  onPress,
  isLoading,
  disabled = false,
  style,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && { opacity: 0.6 }, style]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    width: '100%',
    height: 53,
    justifyContent: 'center',
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 32,
  },
  text: {
    color: theme.colors.white,
    fontSize: 21,
    fontWeight: '600',
  },
});
