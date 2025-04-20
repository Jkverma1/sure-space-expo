export interface HeaderProps {
  title: string;
  enableEdit?: boolean;
  handleEdit?: () => void;
  enableClose?: boolean;
  handleClose?: () => void;
  showBack?: boolean;
}

export type ConfirmPostScreenRouteParams = {
  mediaUrl: string;
  mediaType: 'image' | 'video';
};

export type CreateStackParamList = {
  CreateListingScreen: undefined;
  ConfirmPostScreen: { mediaUrl: string; mediaType: string };
  Community: undefined;
};
