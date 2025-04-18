import { ParamListBase } from '@react-navigation/native';

export interface HeaderProps {
  title: string;
  enableEdit?: boolean;
  handleEdit?: () => void;
  enableClose?: boolean;
  handleClose?: () => void;
  showBack?: boolean;
  backScreen?: string;
}

export interface DeleteChannelResponse {
  success: boolean;
  error?: any;
}

export interface HandleDeleteChannelProps {
  channelId: string;
}

export interface ChatStackParamList extends ParamListBase {
  ChatMain: undefined;
  ConversationScreen: {
    channelId: string;
    channelName: string;
    channelMembers: Record<string, unknown>;
  };
  NewChatScreen: undefined;
}

export interface CreateChatChannelParams {
  channelId: string;
  members: string[];
  user: { uid: string };
  selectedUser: { uid: string };
}

export interface User {
  uid: string;
  id: string;
  fullName: string;
  avatarUrl?: string;
}

export interface Message {
  id: string;
  senderId: string | undefined;
  text: string;
  time: string;
}
