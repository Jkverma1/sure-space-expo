import { auth } from '@/src/features/auth/hooks/useAuth';
import { updatePassword } from 'firebase/auth';

export const changePassword = async (newPassword: string) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('No user is currently signed in.');
  }

  try {
    await updatePassword(currentUser, newPassword);
    console.log('Password updated successfully');
  } catch (error: any) {
    if (error.code === 'auth/requires-recent-login') {
      console.log('User needs to re-authenticate');
    }
    throw error;
  }
};