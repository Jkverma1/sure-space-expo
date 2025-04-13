export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
  InviteFriends: undefined;
};

export type MenuItemType = {
  name: string;
  screen: keyof ProfileStackParamList;
  image: any; 
};

export interface HeaderProps {
  title: string;
  enableEdit?: boolean;
  handleEdit?: () => void;
  enableClose?: boolean;
  handleClose?: () => void;
  showBack?: boolean;
}