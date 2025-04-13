import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {
  facebook_ico,
  instagram_ico,
  tiktok_ico,
  whatsapp_ico,
} from '../../../constants';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import theme from '@/src/theme';

export default function InviteFriendsScreen() {
  const user = useSelector((state: any) => state.user.user);
  const referralCode = user?.referralCode || '';
  const appname = "Sure Space";
  const appLink = `https://apps.apple.com/in/app/sure-space/id6730121865?ref=${referralCode}`;

  const shareToSocial = (platform: string) => {
    let url;
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appLink)}`;
        break;
      case 'instagram':
        url = `https://www.instagram.com/?url=${encodeURIComponent(appLink)}`;
        break;
      case 'tiktok':
        url = `https://www.tiktok.com/share?url=${encodeURIComponent(appLink)}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=Join me on ${appname}! Here's the link: ${encodeURIComponent(appLink)}`;
        break;
      default:
        return;
    }
    Linking.openURL(url).catch(err => console.log('An error occurred', err));
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <Header title={'Invite Friends'} />
      <View style={styles.container}>
        <View style={styles.qrContainer}>
          <QRCode value={appLink} size={345} color="#FF9A9E" />
        </View>
        <Text style={styles.title}>Scan the QR code</Text>
        <Text style={styles.subText}>Invite friends and use app together</Text>
        <Text style={styles.shareTitle}>Share via</Text>
        <View style={styles.shareContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={() => shareToSocial('facebook')}>
            <Image style={styles.shareIcon} source={facebook_ico} />
            <Text style={styles.shareText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={() => shareToSocial('instagram')}>
            <Image style={styles.shareIcon} source={instagram_ico} />
            <Text style={styles.shareText}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={() => shareToSocial('tiktok')}>
            <Image style={styles.shareIcon} source={tiktok_ico} />
            <Text style={styles.shareText}>TikTok</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={() => shareToSocial('whatsapp')}>
            <Image style={styles.shareIcon} source={whatsapp_ico} />
            <Text style={styles.shareText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.white,
    paddingBottom: 90,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  title: {
    marginTop: 35,
    fontFamily: 'Open Sans',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32.68,
    textAlign: 'center',
    color: theme.colors.primary,
  },
  subText: {
    marginTop: 13,
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 24.51,
    textAlign: 'center',
    color: '#1E1D2080',
  },
  shareTitle: {
    marginTop: 50,
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21.79,
    textAlign: 'center',
    color: '#1E1D2080',
  },
  shareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 16,
  },
  shareButton: {
    alignItems: 'center',
  },
  shareIcon: {
    width: 50,
    height: 50,
  },
  shareText: {
    marginTop: 7,
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: '#1E1D2080',
  },
});
