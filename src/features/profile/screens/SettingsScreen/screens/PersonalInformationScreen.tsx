import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CalendarModal from '../components/CalendarModal';
import Header from '../../../components/Header';
import ImagePicker from '../components/ImagePicker';
import { DataRow, FormDataType, RowData } from '../types/settings.types';
import { calender_ico, user_image } from '@/src/constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../services/personalInformation';
import { AppDispatch } from '@/src/redux/store';
import { initializeApp } from '@/src/redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalInformationScreen = () => {
  const [editMode, setEditMode] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  const avatarSrc =
    user?.avatarUrl && user.avatarUrl !== ''
      ? { uri: user.avatarUrl }
      : user_image;
  const [formData, setFormData] = useState({
    avatarUrl: avatarSrc,
    fullName: user?.fullName,
    birthday: user?.birthday,
    phoneNumber: user?.phoneNumber,
    userEmail: user?.userEmail,
  });

  type InputDate = string | Date | null;

  const handleDateChange = (inputDate: InputDate): void => {
    const dateString =
      typeof inputDate === 'string'
        ? inputDate
        : inputDate instanceof Date
          ? inputDate.toISOString()
          : null;
    if (dateString) {
      setFormData((prev: FormDataType) => ({
        ...prev,
        birthday: dateString.substring(0, 10),
      }));
    }
  };

  const handleChange = (text: string, key: keyof FormDataType): void => {
    setFormData((prev: FormDataType) => ({ ...prev, [key]: text }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const form = new FormData();
      console.log('Form Data:');
      form.append('fullName', formData.fullName);
      form.append('birthday', formData.birthday);
      form.append('phoneNumber', formData.phoneNumber);
      form.append('userEmail', formData.userEmail);
      if (
        formData.avatarUrl &&
        typeof formData.avatarUrl === 'object' &&
        formData.avatarUrl.uri &&
        formData.avatarUrl.uri.startsWith('file://')
      ) {
        const fileName = formData.avatarUrl.uri.split('/').pop();
        const fileType = fileName.split('.').pop();
        form.append('avatar', {
          uri: formData.avatarUrl.uri,
          name: fileName,
          type: `image/${fileType}`,
        } as unknown as File);
      }
      await updateUserProfile(form);
      const token = await AsyncStorage.getItem('token');
      if (token) {
        dispatch(initializeApp(token));
      }
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderInputField = (row: RowData): JSX.Element | null => {
    if (!editMode) return <Text style={styles.text}>{row.value}</Text>;

    if (row.key === 'birthday') {
      return (
        <>
          <TextInput
            style={styles.input}
            placeholder={row.value}
            value={formData.birthday}
            onChangeText={(text: string) => handleDateChange(text)}
          />
          <TouchableOpacity
            style={styles.calendarIcon}
            onPress={() => setOpenCalendar(true)}
          >
            <Image source={calender_ico} />
          </TouchableOpacity>
          <CalendarModal
            visible={openCalendar}
            onClose={() => setOpenCalendar(false)}
            onDateSelected={handleDateChange}
          />
        </>
      );
    }

    return (
      <TextInput
        style={styles.input}
        placeholder={row.value}
        value={formData[row.key]}
        onChangeText={(text: string) => handleChange(text, row.key)}
      />
    );
  };

  const renderDataSection = (title: string, data: DataRow[]): JSX.Element => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map((row: DataRow, index: number) => (
        <View style={styles.boxBackground} key={index}>
          <View style={styles.fieldContainer}>
            <Text style={styles.title}>{row.text}</Text>
            {renderInputField(row)}
            {!editMode && <View style={styles.underline} />}
          </View>
        </View>
      ))}
    </View>
  );

  const generalData: DataRow[] = [
    { text: 'Full Name', value: formData.fullName, key: 'fullName' },
    { text: 'Date of Birth', value: formData.birthday, key: 'birthday' },
  ];

  const contactData: DataRow[] = [
    { text: 'Phone Number', value: formData.phoneNumber, key: 'phoneNumber' },
    { text: 'Email', value: formData.userEmail, key: 'userEmail' },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header
        title={'Personal Information'}
        enableEdit={!editMode}
        handleEdit={() => setEditMode(true)}
        enableClose={editMode}
        handleClose={() => setEditMode(false)}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.centerContainer}>
            {editMode ? (
              <View style={styles.editableAvatar}>
                <ImagePicker
                  formData={{ avatarUrl: formData.avatarUrl }}
                  setFormData={(data) =>
                    setFormData((prev) => ({
                      ...prev,
                      avatarUrl: data.avatarUrl,
                    }))
                  }
                />
              </View>
            ) : (
              <Image source={formData.avatarUrl} style={styles.avatar} />
            )}
          </View>

          {renderDataSection('General', generalData)}
          {renderDataSection('Contacts', contactData)}
        </ScrollView>

        {editMode && (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.saveText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  KeyboardContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, paddingBottom: 30 },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 20 },
  centerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  editableAvatar: { position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  section: { marginBottom: 35 },
  sectionTitle: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 35,
  },
  text: { fontSize: 20, color: '#333', fontWeight: 'bold' },
  title: { fontSize: 16, color: '#F08080', fontWeight: '500' },
  boxBackground: { marginVertical: 10 },
  fieldContainer: { flexDirection: 'column', gap: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#F08080',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 45,
    marginTop: 5,
    backgroundColor: 'white',
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  saveButton: {
    padding: 15,
    marginBottom: 30,
    backgroundColor: '#F08080',
    borderRadius: 80,
    width: '100%',
  },
  saveText: {
    fontSize: 21,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  calendarIcon: { position: 'absolute', top: 43, right: 10 },
});

export default PersonalInformationScreen;
