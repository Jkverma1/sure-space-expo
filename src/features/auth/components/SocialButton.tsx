import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SocialButtonProps } from '../types/auth.types';
import theme from '@/src/theme';

export const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  onPress,
}) => (
  <TouchableOpacity style={styles.socialButton} onPress={onPress}>
    <Image source={icon} style={styles.socialIcon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.socialButtonBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 56,
    height: 56,
  },
});
