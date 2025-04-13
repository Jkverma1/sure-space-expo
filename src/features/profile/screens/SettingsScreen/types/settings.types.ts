export interface ConfirmModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  handleClick: () => void;
  handleClickSkip: () => void;
  text: string;
  icon?: any; 
}

export type SettingsItem = {
  id: string;
  name: string;
  icon: any;
  screen: keyof SettingStackParamList; 
};

export type SettingStackParamList = {
  PersonalInformation: undefined;
  ChangePassword: undefined;
  BlockedUsers: undefined;
  PrivacyPolicy: undefined;
  TermsAndConditions: undefined;
  Help: undefined;
  DataUsage: undefined;
  SignOut: undefined;
};