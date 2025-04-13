import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
  Linking,
} from 'react-native';
import Header from '../../../components/Header';
import theme from '@/src/theme';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const dropArrowIcon = require('@/assets/icons/Settings/drop_arrow_ico.png');
const upArrowIcon = require('@/assets/icons/Settings/up_arrow_ico.png');

const introText =
  'We’re here to support your journey in learning, creating, and connecting on Sure Space.';

const faqs = [
  {
    text: 'What is Sure Space designed for?',
    value:
      'Sure Space is crafted to support individuals in both educational growth and entertainment. Whether you’re sharing creative content or engaging in meaningful conversations, Sure Space helps foster curiosity and connection.',
  },
  {
    text: 'What features does Sure Space offer?',
    value:
      'Sure Space includes features like multimedia post sharing, real-time chat, creative content discovery, and customizable profiles. All within a secure and user-friendly platform.',
  },
  {
    text: 'How can I access Sure Space?',
    value:
      'You can download Sure Space from the App Store or Google Play. Our app is available globally and works on both iOS and Android devices.',
  },
  {
    text: 'How does Sure Space protect my data?',
    value: (
      <>
        Sure Space complies with all major data privacy standards, including
        GDPR. Your information is encrypted and never shared with third parties
        without consent. Review our full privacy policy{' '}
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://myndpa.co.uk/privacy-policy/')
          }>
          <Text
            style={{
              color: theme.colors.primary,
              textDecorationLine: 'underline',
              fontSize: 16,
            }}>
            here
          </Text>
        </TouchableOpacity>
        .
      </>
    ),
  },
];

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HelpScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Header title="Help" />
        <View style={styles.innerContainer}>
          <Text style={styles.text}>{introText}</Text>
          <Text style={styles.faqTitle}>FAQs</Text>
          {faqs.map((faq, index) => (
            <View key={index}>
              <View style={styles.boxBackground}>
                <View style={styles.faqItem}>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => toggleExpand(index)}>
                    <Text style={styles.question}>{faq.text}</Text>
                    <Image
                      source={expandedIndex === index ? upArrowIcon : dropArrowIcon}
                    />
                  </TouchableOpacity>
                  {expandedIndex === index && (
                    <View style={styles.answerContainer}>
                      <Text style={styles.answer}>{faq.value}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.underline} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight,
    backgroundColor: theme.colors.background,
  },
  innerContainer: {
    marginTop: 25,
    marginBottom: 100,
    gap: 20,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '400',
    paddingHorizontal: 16,
  },
  faqTitle: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    fontWeight: '600',
    paddingHorizontal: 16,
  },
  boxBackground: {
    width: (screenWidth * 9) / 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  faqItem: {
    flexDirection: 'column',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  question: {
    color: theme.colors.primary,
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    maxWidth: screenWidth * 0.8,
    paddingBottom: 14,
  },
  answerContainer: {
    paddingTop: 0,
  },
  answer: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  underline: {
    height: 1,
    backgroundColor: '#1E1D2033',
    width: '100%',
    marginTop: 5,
  },
});
