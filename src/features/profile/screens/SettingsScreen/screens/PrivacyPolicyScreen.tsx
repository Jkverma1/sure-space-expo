import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header';
const pageTitle = 'SureSpace Privacy Notice';
const updateTitle = 'Last updated: 22 May 2024';
const LatestUpdate =
  'Welcome to SureSpace’s Privacy Notice. This Privacy Notice tells you everything you need to know about how we collect, use, and disclose your “Personal Data” when you interact with us, whether through our website, application, or otherwise.';
const generalData = [
  { text: 'What key information do you need to know about us?', value: <>
Our legal entity name is My NDPA Ltd and we are incorporated in England &amp; Wales and have the registration number of
{'\n'}15615720 and the registered address of 2-4 Petworth Road, Haslemere, England, GU27 2HR.
{'\n'}We have registered with the Information Commissioner’s Office (“ICO”) which is the data protection supervisory authority in
{'\n'}England &amp; Wales. Our registration reference with the ICO is [insert reference].
{'\n'}Data Protection Laws have established the roles of the Data Controller and the Data Processor. We operate as a Data Controller.
{'\n'}As such, we are responsible for protecting your privacy and rights, and we are accountable for ensuring compliance with Data Protection Laws.
  </> },
  { text: 'What key data protection terms do you need to know?', 
  value: 
  <>
  To ensure our Privacy Notice is as clear as possible despite the complexity of legal terminology, we’ve provided a concise glossary below to help you to understand these terms.
  {'\n\n'}<Text style={{color: "#F08080"}}>Consent</Text> refers to when an individual gives agreement which is freely given, specific, informed and is an unambiguous indication of their wishes. It is done by a statement or by a clear positive action in respect of the Processing of any Personal Data relating to them.
  {'\n\n'}<Text style={{color: "#F08080"}}>Criminal Convictions Data</Text> refers to Personal Data relating to criminal convictions and offences and includes Personal Data relating to criminal allegations and proceedings.
  {'\n\n'}<Text style={{color: "#F08080"}}>Data Controller</Text> refers to an organisation that determines when, why and how to Process Personal Data. It is responsible for establishing policies and procedures in line with Data Protection Laws.
  {'\n\n'}<Text style={{color: "#F08080"}}>Data Processor</Text> refers to an organisation that Processes Personal Data on behalf of a Data Controller. It is responsible for establishing policies and procedures in line with Data Protection Laws.
  {'\n\n'}<Text style={{color: "#F08080"}}>Data Protection Laws</Text> refers to the UK GDPR, the Privacy and Electronic Communications (EC Directive) Regulations 2003 and any other applicable European Union legislation (such as the General Data Protection Regulation 2016/679) relating to Personal Data. The “UK GDPR” is the retained version of the General Data Protection Regulation 2016/679 as it forms part of the law of England and Wales, Scotland and Northern Ireland by virtue of section 3 of the European Union (Withdrawal) Act 2018 and as amended by Schedule 1 to the Data Protection, Privacy and Electronic Communications (Amendments etc) (EU Exit) Regulations 2019 (SI 2019/419). It sits alongside the Data Protection Act 2018.
  {'\n\n'}<Text style={{color: "#F08080"}}>Data Subjects</Text> refers to a living, identified or identifiable individuals about whom we hold Personal Data. Data Subjects may
  {'\n'}be nationals or residents of any country and may have legal rights regarding their Personal Data.
  {'\n\n'}<Text style={{color: "#F08080"}}>European Economic Area (“EEA”)</Text> refers to the 27 countries in the European Union, Iceland, Liechtenstein and Norway..
  {'\n\n'}<Text style={{color: "#F08080"}}>Legitimate Interest</Text> refers to when an organisation’s interests are legitimate (as they need to do something to operate) and these interests do not override an individual’s interests or fundamental rights and freedoms.
  {'\n\n'}<Text style={{color: "#F08080"}}>Personal Data</Text> refers to any information identifying an individual or information relating to an individual that an organisation can identify (directly or indirectly) from that data alone or in combination with other identifiers that it Processes. Personal Data includes Special Category Data, Criminal Convictions Data and pseudonymised Personal Data. Personal Data excludes anonymous data or data that has had the identity of an individual permanently removed.
  {'\n\n'}<Text style={{color: "#F08080"}}>Process or Processing</Text> refers to any activity that involves the use of Personal Data. It includes obtaining, recording or holding the data, or carrying out any operation or set of operations on the data including organising, amending, retrieving, using, disclosing, erasing or destroying it. Processing also includes transmitting or transferring Personal Data to third parties.
  {'\n\n'}<Text style={{color: "#F08080"}}>Special Category Data</Text> Data refers to information revealing racial or ethnic origin, political opinions, religious or similar beliefs, trade union membership, physical or mental health conditions, sexual life, sexual orientation, biometric or genetic data of an individual.
  </> 
  },
  { text: 'What does our data protection compliance program look like?', 
    value: 
    <>
    We adhere to Data Protection Laws not just out of legal obligation, but because we believe it is essential for building and maintaining the trust of the Data Subjects we interact with in our business.
    {'\n\n'}Recognizing the critical responsibility of protecting the confidentiality and integrity of Personal Data, we have established a comprehensive data protection compliance program. This program includes a data register (also known as a record of processing activities), notices, policies, procedures, and technical security controls.
    {'\n\n'}We adhere to all of principles under Data Protection Laws including those outlined below.
    {'\n\n'}We only Process Personal Data lawfully, fairly and in a transparent manner.
    {'\n\n'}We only collect Personal Data which is adequate, relevant and limited to what is necessary in relation to the purposes for which it is Processed.
    {'\n\n'}We ensure that Personal Data that we collect and maintain is accurate and kept up to date.
    {'\n\n'}We ensure that Personal Data is not kept in a form which permits identification of individuals for longer than is necessary.
    {'\n\n'}We ensure that Personal Data is processed in a manner that ensures its security, using appropriate technical and organisational measures, to protect it against unauthorised Processing and against accidental loss, destruction or damage.
    {'\n\n'}From the very beginning of our business, we have integrated privacy considerations into the design and development of our services and systems. We utilise privacy-enhanced technologies, conduct data protection impact assessments, implement privacy-preserving measures, and embed privacy into My NDPA Ltd’s culture and practices.
    </> 
  },
  { text: 'Do we have a data protection officer?', value: 'We have conducted an assessment of our organisation under Data Protection Laws and have determined that we are not required, at this stage, to appoint a data protection officer. This is because we do not conduct regular and systemic monitoring of Data Subjects on a large scale and neither do we conduct large-scale Processing of Special Category Data. We will review our determination on a regular basis and will appoint a data protection officer if necessary. Please note that while we do not have a data protection officer, we are still very much committed to protecting the privacy and security of your Personal Data.' },
  { text: 'What types of Personal Data do we collect?',
    value: 
    <>
    We collect, use, store and transfer different kinds of Personal Data depending on our relationship with you.
    {'\n\n'}Examples of the Personal Data which we collect on Data Subjects (based on our relationship with you and the necessity of collecting such Personal Data) is outlined below.
    {'\n\n'}<Text style={{color: "#F08080"}}>Identity Data</Text> ((e.g., first name, maiden name, last name, title, date of birth).
    {'\n\n'}<Text style={{color: "#F08080"}}>Contact Data</Text> (e.g., phone number, email address, home address, business address and billing address).
    {'\n\n'}<Text style={{color: "#F08080"}}>Profile Data</Text> (e.g., information about your professional background/organisation, agreements you’ve made with us).
    {'\n\n'}<Text style={{color: "#F08080"}}>Special Category Data</Text> (e.g., details concerning your racial or ethnic origin, sexual orientation, and mental and physical health).
    {'\n\n'}<Text style={{color: "#F08080"}}>Criminal Convictions Data</Text> (e.g., information on whether you have a criminal conviction or a caution).
    {'\n\n'}<Text style={{color: "#F08080"}}>Transaction & Financial Data</Text> (e.g., bank invoices and payment details).
    {'\n\n'}<Text style={{color: "#F08080"}}>Technical & Usage Data</Text> (e.g., internet protocol addresses, browser type and version, time zone settings, location and information about your interactions with our website).
    {'\n\n'}<Text style={{color: "#F08080"}}>Communications & Marketing Data</Text> (e.g., your preferences regarding cookies and marketing).
    {'\n\n'}We are dedicated to protecting the privacy and security of your Personal Data, especially when it involves sensitive Special Category Data and Criminal Convictions Data.
    {'\n\n'}Please note that we do aggregate data, such as statistical or demographic data, for purposes including research and analysis. Aggregated data may be derived from your Personal Data but is not considered Personal Data under Data Protection Laws, as it does not directly or indirectly reveal your identity. For example, we may aggregate your Technical &amp; Usage Data to determine the percentage of users accessing a specific website feature. However, if we combine or connect aggregated data with your Personal Data in a way that could directly or indirectly identify you, we will treat the combined data as Personal Data and handle it according to this Privacy Notice.
    {'\n\n'}Please also note that in some cases, we may anonymise your Personal Data for research or statistical purposes. Once anonymised, it is no longer possible to link the data back to you, and we may use this information without further notice.
    </>
  },
  {text: "Do we use artificial intelligence?", 
  value: 
  <>
  We leverage Artificial Intelligence (“AI”) to enhance and refine features in order to deliver services and elevate service quality. In respect of automated methods, we utilise the services provided by OpenAI to enhance our website and application. We use OpenAI to improve user experience through natural language processing, predictive text and other AI-driven features. When you interact with features powered by OpenAI, certain data may be processed to provide accurate and relevant responses. This can include input data (e.g., text you type) and context needed to generate appropriate outputs.
  {'\n\n'}We ensure that any data processed by OpenAI is handled securely. OpenAI employs robust security measures to protect your data from unauthorised access and breaches. By using our website and application, you acknowledge the integration of OpenAI and the associated data processing as described.
  </>
  },
  {text: "What are the lawful grounds for which we Process Personal Data?", 
    value: 
    <>
    Under Data Protection Law, there are several lawful grounds for processing Personal Data. These are the justifications organisations must have to Process Personal Data legally. The lawful grounds that we rely upon are outlined below.
    {'\n\n'}<Text style={{color: "#F08080"}}>Consent</Text> – This is where you have given clear and explicit consent for your Personal Data to be Processed for a specific purpose.
    {'\n\n'}<Text style={{color: "#F08080"}}>Contract</Text> – This is where the Processing is necessary in order to enter into or perform a contract.
    {'\n\n'}<Text style={{color: "#F08080"}}>Legal obligation</Text> – This is where the Processing is necessary for compliance with a legal obligation to which we are subjected to.
    {'\n\n'}<Text style={{color: "#F08080"}}>Vital interests</Text> – This is where the Processing is necessary to protect your vital interests of the vital interests of another person. This is generally relied upon in life-and-death situations.
    {'\n\n'}<Text style={{color: "#F08080"}}>Legitimate interests</Text> – This is where the Processing is necessary for the purposes of our Legitimate Interests or those of a third party, except where such interests are overridden by your interests or fundamental rights.
    </>
  },
  {text: "What are the categories of Data Subjects that we engage with? ", 
    value: 
    <>
    In the course of our business, we interact with the following categories of Data Subjects: prospective and existing website and application users; prospective employees and also prospective and existing third-party suppliers (including independent contractors such as our keyworkers).
    {'\n\n'}We have made a chart below to provide key information to each category of Data Subjects.
    {'\n\n'}<Text style={{color: "#F08080"}}>Data Subject </Text>
    {'\n\n'}Prospective or existing website and application user
    {'\n\n'}<Text style={{color: "#F08080"}}>What do we collect?</Text>
    {'\n\n'}Identity Data
    {'\n\n'}Contact Data
    {'\n\n'}Profile Data
    {'\n\n'}Special Category Data
    {'\n\n'}Transaction & Financial Data
    {'\n\n'}Technical & Usage Data
    {'\n\n'}Communications & Marketing Data
    {'\n\n'}<Text style={{color: "#F08080"}}>How do we collect it?</Text>
    {'\n\n'}Collected automatically when you browse our website and application.
    {'\n\n'}You provide it to us (including publishing it on our website or application).
    {'\n\n'}<Text style={{color: "#F08080"}}>What are our lawful grounds?</Text>
    {'\n\n'}Consent
    {'\n\n'}Contract
    {'\n\n'}Legitimate interests
    {'\n\n'}Legal obligation 
    {'\n\n'}<Text style={{color: "#F08080"}}>Data Subject </Text>
    {'\n\n'}Prospective employee
    {'\n\n'}<Text style={{color: "#F08080"}}>What do we collect?</Text>
    {'\n\n'}Identity Data
    {'\n\n'}Contact Data
    {'\n\n'}Profile Data
    {'\n\n'}Special Category Data
    {'\n\n'}Criminal Convictions Data
    {'\n\n'}Technical & Usage Data
    {'\n\n'}<Text style={{color: "#F08080"}}>How do we collect it?</Text>
    {'\n\n'}Collected automatically when you browse our website and application. You directly provide it to us.
    {'\n\n'}You agree for a third party (such as a background check provider) to share it with us.
    {'\n\n'}<Text style={{color: "#F08080"}}>What are our lawful grounds?</Text>
    {'\n\n'}Consent
    {'\n\n'}Contract
    {'\n\n'}Legal obligation 
    {'\n\n'}<Text style={{color: "#F08080"}}>Data Subject </Text>
    {'\n\n'}Prospective and existing third-party suppliers (including independent contractors)
    {'\n\n'}<Text style={{color: "#F08080"}}>What do we collect?</Text>
    {'\n\n'}Identity Data
    {'\n\n'}Contact Data
    {'\n\n'}Profile Data
    {'\n\n'}Special Category Data
    {'\n\n'}Criminal Convictions Data
    {'\n\n'}Transaction & Financial Data
    {'\n\n'}Technical & Usage Data
    {'\n\n'}<Text style={{color: "#F08080"}}>How do we collect it?</Text>
    {'\n\n'}Collected automatically when you browse our website and application. You directly provide it to us.
    {'\n\n'}You agree for a third party (such as a background check provider) to share it with us.
    {'\n\n'}<Text style={{color: "#F08080"}}>What are our lawful grounds?</Text>
    {'\n\n'}Consent
    {'\n\n'}Contract
    {'\n\n'}Legal obligation 
    {'\n\n'}Please note that where we rely on Consent as the lawful grounds for Processing your Personal Data in a specific situation, we do not rely on any other legal grounds in that situation.
    </>
  },
  {
    text: "Who do we share your Personal Data with?", 
    value: 
    <>
    We share your Personal Data only when necessary and we have outlined the categories of third parties that we share your Personal Data with below.
    {'\n\n'}<Text style={{color: "#F08080"}}>Technology companies</Text> – Providers of support and software products essential for conducting our business operations.
    {'\n\n'}<Text style={{color: "#F08080"}}>Professional advisers</Text> – Law firms, banks, payment providers, and accountancy firms engaged for business purposes.
    {'\n\n'}<Text style={{color: "#F08080"}}>Governmental agencies and regulators</Text> – Entities such as Companies House, HMRC and the ICO with whom we need to engage for business purposes and compliance.
    {'\n\n'}<Text style={{color: "#F08080"}}>Potential business owners</Text> – Third parties with whom we may negotiate to sell, transfer, or merge parts of our business or assets, or to attempt to acquire or merge with other companies in the future.
    </>
  },
  {text: "How do protect your Personal Data?", 
    value: 
    <>
      We have implemented appropriate technical and organisational measures, including encryption, to protect your Personal Data from accidental loss, falsification, unauthorised access, alteration, or disclosure. Access to your Personal Data is restricted to authorised personnel, including employees, contractors and relevant third parties, who need it for business purposes.
      {'\n\n'}Furthermore, we have established policies, plans, and procedures to address any suspected or actual breaches of Personal Data, although we aim to prevent such incidents altogether.
      {'\n\n'}Additionally, we require all third parties to respect the security of your Personal Data and to treat it in accordance with Data Protection Laws. We enter into contractual agreements with all of our third parties (with the exception of regulators and governmental authorities) which include the appropriate data protection clauses. We ensure that all third parties (with the exception of governmental agencies and regulators) put in place appropriate security measures to ensure that the Personal Data that is shared is protected from unauthorised access or misuse.
    </>
  },
  {text: "Do we transfer your Personal Data outside of the UK and/or the EEA?", 
    value: 
    <>
    We ensure that Personal Data is always transferred safely and securely. Whenever your Personal Data is transferred outside of the UK and/or the EEA, we protect it by implementing one of the following safeguards:
    {'\n\n'}We only transfer your Personal Data to organisations outside of the UK and/or the EEA if we have entered into specific contracts with them that ensure your Personal Data will receive the same level of protection as it does in the UK and/or the EEA.
    {'\n\n'}We only transfer your Personal Data to countries that have been deemed to provide an adequate level of protection for Personal Data, as endorsed by the ICO and determined by the European Commission.
    </>
  },  
  {text: "How long do we keep your Personal Data for?", 
    value: 
    <>
    We will retain your Personal Data only for as long as necessary to fulfil the purposes for which it was collected, including meeting legal, regulatory, tax, accounting or reporting requirements.
    {'\n\n'}When determining the appropriate retention period for Personal Data, we consider various factors such as the amount, nature, and sensitivity of the data, the potential risks of unauthorised use or disclosure, the purposes for Processing the data, the feasibility of achieving these purposes through other means, and applicable legal, regulatory, tax, accounting, or other obligations.
    {'\n\n'}In certain circumstances, we may retain Personal Data for a longer period, such as in the event of a complaint or if we reasonably believe there is potential for litigation related to our relationship with you (although we strive to avoid such situations whenever possible).
    </>
  },  
  {text: "What rights do you have in respect of your Personal Data?", 
    value: 
    <>
    You have specific rights concerning the Personal Data we handle about you, as outlined below:
    {'\n\n'}<Text style={{color: "#F08080"}}>Right to access</Text> – You can request access to the information and obtain copies of the Personal Data we hold about you.
    {'\n\n'}<Text style={{color: "#F08080"}}>Right to rectification</Text> – You can ask us to correct any inaccuracies or incomplete information in your Personal Data.
    {'\n\n'}<Text style={{color: "#F08080"}}>Right to erasure</Text> – You can request the deletion of your Personal Data under certain circumstances, such as when the data is no longer necessary for its original purpose or Processing. However, complete deletion may not always be possible, especially if there is an ongoing contractual relationship.
    {'\n\n'}<Text style={{color: "#F08080"}}>Right to restrict Processing</Text> – You can request that we restrict the Processing of your Personal Data under specific conditions, such as when we are reviewing the accuracy of the Personal Data or assessing the validity of a deletion request.
    {'\n\n'}<Text style={{color: "#F08080"}}>Right to object</Text> – You can object to the Processing of your Personal Data, particularly if the Processing is based on ourLegitimate Interests or is for direct marketing purposes.
    {'\n\n'}<Text style={{color: "#F08080"}}>Right to data portability</Text> – You can request to receive, transfer, or copy your Personal Data to another Data Controller. This right applies when we process your Personal Data based on your Consent or a contract, and the Processing is automated.
    {'\n\n'}If you are dissatisfied with our approach or have concerns about our approach, you have the right to lodge a complaint with the ICO via <Text style={{color: "#F08080"}}>www.ico.org.uk.</Text> While we strive to adhere to evolving Data Protection Laws and maintain best practices, we encourage you to contact us first to address any concerns you may have about how we handle your Personal Data.
    {'\n\n'}If you would like to exercise any of the rights mentioned above, please reach out to us at <Text style={{color: "#F08080"}}>ceo@myndpa.co.uk.</Text>
    {'\n\n'}There is no charge for accessing your Personal Data or exercising any of these rights. However, if we deem your request to be clearly unfounded, repetitive, or excessive, we reserve the right to either charge a reasonable fee or decline the request.
    {'\n\n'}For security reasons and to protect your interests, we may need to verify your identity by requesting specific information. Additionally, we may contact you for further details to expedite our response. 
    {'\n\n'}We aim to address all legitimate requests within one month. However, if your request is complex or involves multiple aspects, it may take longer. In such cases, we will keep you informed of any delays.
    </>
  },  
  {text: "How do we use your Personal Data in our marketing practices?", 
    value: 
    <>
    We strive to provide you with choices regarding the use of specific Personal Data, particularly in relation to marketing and advertising. By analysing your Identity Data, Contact Data, Profile Data and Technical &amp; Usage Data, we develop insights into your preferences and interests.
    {'\n\n'}You will receive marketing communications from us if you have requested information or purchased our product and have not opted out of such communications. Before sharing your Personal Data with any third party for marketing purposes, we will obtain your explicit opt-in consent. You can request us or third parties to stop sending you marketing messages at any time by contacting us and withdrawing your Consent. However, opting out of these marketing messages will not affect messages necessary to fulfil a contract we have with you (e.g., contacting you to fulfil contractual obligations).
    </>
  },
  {text: "Do you have any questions or concerns?", 
    value: 
    <>
    By using our website and application, we’re assuming you’re happy with our approach to data protection compliance. If you have any questions or concerns, please do get in touch with us at <Text style={{color: "#F08080"}}>ceo@myndpa.co.uk.</Text>
    </>
  },
];

const PrivacyPolicyScreen = () => {

  return (
    <View style={styles.safeArea}>
    <Header title="Privacy Policy" />    
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <Text style={styles.pageTitle}>{pageTitle}</Text>
          <Text style={styles.updateTitle}>{updateTitle}</Text>
          <Text style={styles.text}>{LatestUpdate}</Text>
          {generalData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{row.text}</Text>
              <Text style={styles.sectionText}>{row.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingBottom: 30
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    marginTop: 25,
    marginBottom: 20,
  },
  pageTitle: {
    color: '#F08080',
    fontFamily: 'OpenSans-Medium',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  updateTitle: {
    color: '#F08080',
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '400',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#F08080',
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    marginBottom: 5,
  },
  sectionText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '400',
  },
});

export default PrivacyPolicyScreen;
