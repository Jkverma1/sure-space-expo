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
  PasswordChanged: undefined;
};

export interface TextFieldInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
}

export interface CountryInputProps {
  value: string;
  onChange: (text: string) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
}

export interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  onDateSelected: (date: Date) => void;
}

export interface CalendarInputProps {
  value: string;
  onChange: (date: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface ImagePickerProps {
  setFormData: (data: { avatarUrl: { uri: string } }) => void;
  formData: { avatarUrl: { uri: string } };
}

export interface FormData {
  avatarUrl: any;
  fullName: string;
  birthday: string;
  phoneNumber: string;
  userEmail: string;
}

export interface Country {
  cca2: string;
  name: string;
}

export interface RowData {
  text: string;
  value: string;
  key: keyof FormData;
}

export interface DataRow {
  text: string;
  value: string;
  key: keyof FormData;
}

export interface ApiFormData {
  fullName: string;
  birthday: string;
  phoneNumber: string;
  userEmail: string;
}

export interface UpdateUserProfilePayload {
  formData: ApiFormData;
  avatarUrl: string;
}