export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
  InviteFriends: undefined;
  NotificationScreen: undefined;
  UserProfileScreen: { userId: string; uid: string };
  CompletePostScreen: { item: string };
};

export interface MenuItemType {
  name: string;
  image: any;
  screen: any;
}

export interface HeaderProps {
  title: string;
  enableEdit?: boolean;
  handleEdit?: () => void;
  enableClose?: boolean;
  handleClose?: () => void;
  showBack?: boolean;
}

export interface Notification {
  type: 'mention' | 'post_like' | 'post_comment' | 'user_follow';
}

export interface NotificationCounts {
  mention: number;
  post_like: number;
  post_comment: number;
  user_follow: number;
}
