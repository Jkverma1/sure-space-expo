import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../../../components/Header';

const TermsAndConditionsScreen = () => {
  return (
    <View style={styles.safeArea}>
      <Header title="Terms and Conditions" />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>SureSpace Terms & Conditions</Text>
          <Text style={styles.date}>Last updated: 22 May 2024</Text>

          <Text style={styles.paragraph}>
            Welcome to the SureSpace “Terms & Conditions” which describe and
            govern our relationship with you in respect of our services.
            {'\n\n'}Whenever these Terms & Conditions say, “Sure Space Ltd,”
            “we,” “us,” and “our,” it refers to Sure Space Ltd, incorporated in
            England & Wales, registration number 15615720, registered address:
            2-4 Petworth Road, Haslemere, England, GU27 2HR.
            {'\n\n'}Whenever these Terms & Conditions say “SureSpace”, it refers
            to our product available via desktop browser (https://surespace.com)
            and mobile application. SureSpace is a social platform for creative
            expression, tailored for users 18 years of age and older.
            {'\n\n'}Whenever these Terms & Conditions say “you,” it refers to
            any user of the age of eighteen (18) years or older.
            {'\n\n'}It’s important that you read and understand these Terms &
            Conditions carefully because they create a legally binding contract
            between us.
            {'\n\n'}If you have any questions concerning these Terms &
            Conditions, please contact our team at ceo@myndpa.co.uk.
          </Text>

          <Text style={styles.date}>
            Clause 1: Eligibility and commencement
          </Text>
          <Text style={styles.paragraph}>
            This section tells you who we can support and the start of the
            agreement.
            {'\n\n'}
            (a) You agree and understand that Sure Space is not available to
            anyone under the age of eleven (11). By entering into these Terms &
            Conditions on behalf of a neurodivergent individual aged between
            eleven (11) and seventeen (17), you, as the parent or guardian,
            consent to the neurodivergent child using Sure Space and agree to be
            bound by these Terms & Conditions on their behalf.
            {'\n\n'}
            (b) If you are of the age of eighteen (18) years or older, you may
            independently enter into these Terms & Conditions.
            {'\n\n'}
            (c) We monitor for underage use below the age of 13 without parental
            consent and we will terminate your account if we reasonably suspect
            that you are underage or are allowing someone underage to use your
            account below 13 years old without consent from a legal guardian -
            which will be verified through persona API ID verification.
            {'\n\n'}
            (d) These Terms Conditions shall commence on the date upon which you
            confirm acceptance to these Terms & Conditions or when you otherwise
            use Sure Space.
            {'\n\n'}
            (e) If you download Sure Space on your mobile from the Google Play
            Store or the App Store, you must comply with the terms and
            conditions stipulated by the respective application store provider.
          </Text>

          <Text style={styles.date}>Clause 2: Your account</Text>
          <Text style={styles.paragraph}>
            This section tells you what details are needed to set up and
            maintain your account securely.
            {'\n\n'}
            (a) When you create an account to access and use Sure Space, you
            must provide accurate and up-to-date information about yourself such
            as your date of birth. You agree to maintain and promptly update
            your details if they change.
            {'\n\n'}
            (b) It is important that you take reasonable steps to keep your
            account password confidential and that you do not disclose it to any
            third party. If you know or suspect that any third party has access
            to your password, please contact our team immediately on
            ceo@myndpa.co.uk.
          </Text>

          <Text style={styles.date}>
            Clause 3: Changes to Sure Space and these Terms & Conditions
          </Text>
          <Text style={styles.paragraph}>
            This section tells you that we may change our product and the terms
            and conditions in this contract and explains when and how we would
            do these changes.
            {'\n\n'}
            (a) We can always change Sure Space to:
            {'\n'}
            (i) reflect changes in relevant laws and regulatory requirements;
            {'\n'}
            (ii) implement minor technical adjustments and improvements;
            {'\n'}
            (iii) adopt new technologies;
            {'\n'}
            (iv) reflect changes in the number of people who use Sure Space or
            any relevant feature or functionality of Sure Space; and/or
            {'\n'}
            (v) to further improve our offering to you.
            {'\n\n'}
            (b) We may modify these Terms & Conditions, our Privacy Notice and
            Cookies Notice from time to time. If we make material changes to
            these documents, we will provide you with notice by email or other
            means to provide you with the opportunity to review the changes
            before they become effective.
            {'\n\n'}
            (c) Your continued use of Sure Space after we publish or send a
            notice by email about changes to these Terms & Conditions means that
            you are consenting to the updated terms as of their effective date.
            If you object to any changes, you may notify us by emailing our team
            on ceo@myndpa.co.uk.
          </Text>

          <Text style={styles.date}>Clause 4: Access to Sure Space</Text>
          <Text style={styles.paragraph}>
            This section tells you how you will get access to our product and
            outlines our right to suspend, withdraw or restrict the availability
            of the product and your rights in this situation.
            {'\n\n'}
            (a) Sure Space Ltd grants you a personal non-exclusive, limited,
            revocable, non-sublicensable and non-transferable right to access
            and use Sure Space subject to these Terms & Conditions.
            {'\n\n'}
            (b) You shall be responsible for installing any software and/or
            hardware and making any other arrangements required to use Sure
            Space including use of a network or other connection required to
            access Sure Space.
            {'\n\n'}
            (c) To access certain premium features on Sure Space, you will be
            required to subscribe and pay a monthly fee of £10.00. You have
            fourteen (14) calendar days after purchasing the premium features to
            change your mind. You will lose this right outlined above, however,
            once you access the premium features (such as downloading any
            content). If you change your mind, prior to accessing the premium
            features, you may contact our team at ceo@myndpa.co.uk so that we
            can refund you as soon as possible. We will not charge a fee to
            refund you.
            {'\n\n'}
            (d) We may suspend, withdraw or restrict the availability of all or
            any part of Sure Space for operational reasons such as scheduled or
            emergency maintenance. We will try to give you reasonable notice of
            any suspension, withdrawal or restriction to the accessibility of
            all or part of Sure Space.
            {'\n\n'}
            (e) If we suspend, withdraw or restrict the availability of Sure
            Space for longer than three (3) consecutive calendar days in a six
            (6) month period, you may contact our team on ceo@myndpa.co.uk and
            request a refund for the time of inaccessibility to the premium
            features on Sure Space.
          </Text>

          <Text style={styles.date}>Clause 5: Our commitment to you</Text>
          <Text style={styles.paragraph}>
            This section outlines the commitments we make to you regarding your
            use of Sure Space.
            {'\n\n'}
            (a) We will take all reasonable steps to keep Sure Space a safe and
            secure environment for all users.
            {'\n\n'}
            (b) Sure Space Ltd does not guarantee that any of the content
            generated by users that you find on Sure Space:
            {'\n'}
            (i) is accurate, complete or up-to-date;
            {'\n'}
            (ii) will not offend you; and/or
            {'\n'}
            (iii) does not infringe third party rights.
            {'\n\n'}
            (c) Most of the content on Sure Space is generated by users who use
            it and Sure Space Ltd is not the primary creator of such content
            found on Sure Space. Therefore, you acknowledge and agree that the
            content displayed on Sure Space does not represent our views or
            perspectives and may not be suited to your purpose.
          </Text>

          <Text style={styles.date}>
            Clause 6: What you can do on Sure Space
          </Text>
          <Text style={styles.paragraph}>
            This section tells you about all the fun things you can do on Sure
            Space.
            {'\n\n'}
            (a) You can use Sure Space in order to:
            {'\n'}
            (i) interact with other users sharing similar disabilities or form
            groups based on common interests;
            {'\n'}
            (ii) engage with, create and share artificial intelligence (“AI”)
            created art, videos and images;
            {'\n'}
            (iii) participate in skills building activities including speech
            practice;
            {'\n'}
            (iv) view content created by others;
            {'\n'}
            (v) travel confidently and independently with an accessible digital
            personal assistant or key worker (see clause 6(d));
            {'\n'}
            (vi) receive support through a key worker; and
            {'\n'}
            (vii) access parental control features, content regulation and
            location tracking through the parent app (if a parent/guardian).
            {'\n\n'}
            (b) The permission we give to you:
            {'\n'}
            (i) is limited to what we allow in these Terms & Conditions;
            {'\n'}
            (ii) can be withdrawn for the reasons allowed in these Terms &
            Conditions; and
            {'\n'}
            (iii) is only for you.
            {'\n\n'}
            (c) Sure Space incorporates AI features to enhance user experience
            and streamline functionality, ensuring a seamless and user- friendly
            platform. However, we understand that preferences may vary.
            Therefore, you have the option to opt-out of AI-driven features or
            functionalities within the application settings if you choose to do
            so.
            {'\n\n'}
            (d) Sure Space’s direct messaging feature includes a location
            option, facilitating meetups with the assistance of a key worker. A
            “key worker” plays a pivotal role in fostering independence from
            parental oversight, providing guidance and support as needed. The
            location feature is also optional, allowing you to choose whether or
            not to share your location during interactions.
          </Text>

          <Text style={styles.date}>
            Clause 7: What you can’t do on Sure Space
          </Text>
          <Text style={styles.paragraph}>
            This section tells you about the things you cannot do when using
            Sure Space to keep everyone safe.
            {'\n\n'}
            (a) You must not use Sure Space to:
            {'\n'}
            (i) do anything illegal;
            {'\n'}
            (ii) copy, modify, harvest or create derivative works of Sure Space
            Ltd; or
            {'\n'}
            (iii) use Sure Space in a way that circumvents the security measures
            or that might have a negative effect on Sure Space Ltd (including by
            introducing software designed to disrupt or damage Sure Space Ltd)
            or any other persons or businesses’ systems, websites or security;
            or
            {'\n'}
            (iv) scrape, harvest or collect data from Sure Space, including but
            not limited to, user profiles, contact details or any other data; or
            {'\n'}
            (v) use or attempt to use another user’s account without
            authorization.
          </Text>
          <Text style={styles.date}>
            Clause 8: Content standards and direct messaging
          </Text>
          <Text style={styles.paragraph}>
            This section continues to tell you rules about how you must use Sure
            Space, when you are submitting content and sending direct messages.
            {'\n\n'}(a) You must not send direct messages or upload content
            which:
            {'\n'}(i) is defamatory of any individual or business;
            {'\n'}(ii) is likely to deceive any individual or business;
            {'\n'}(iii) is obscene, offensive, hateful or inflammatory;
            {'\n'}(iv) promotes sexually explicit material;
            {'\n'}(v) promotes violence;
            {'\n'}(vi) promotes any illegal activity;
            {'\n'}(vii) promotes discrimination based on race, sex, religion,
            nationality, disability, sexual orientation or age;
            {'\n'}(viii) infringes any copyright, trademark, patent, trade
            secret, moral right, privacy right or any other intellectual
            property right of another individual or business; and/or
            {'\n'}(ix) would cause you to be in breach of any legal duty that
            you owe to third party, such as a contractual duty or a duty of
            confidence.
            {'\n\n'}(b) Sure Space Ltd has the right to remove any content
            posted by you which violates clause 8.
            {'\n\n'}(c) If we remove or restrict access to your content, we will
            notify you without undue delay and state the reasons for our
            decision, unless it is not appropriate for us to do so.
            {'\n\n'}(d) You are free to remove your content from Sure Space at
            any time.
          </Text>
          <Text style={styles.date}>
            Clause 9: Ownership of intellectual property
          </Text>
          <Text style={styles.paragraph}>
            This section tells you about the ownership of content on Sure Space.
            {'\n\n'}(a) “Intellectual Property Rights” refers to patents, rights
            to inventions, copyright and related rights, trade marks, business
            names and domain names, rights in get-up, goodwill and the right to
            sue for passing off, rights in designs, database rights, rights to
            use, and protect the confidentiality of, confidential information
            (including know-how and trade secrets) and all other intellectual
            property rights, in each case whether registered or unregistered and
            including all applications and rights to apply for and be granted,
            renewals or extensions of, and rights to claim property from, such
            rights and all similar or equivalent rights or forms of protection
            which subsist or will subsist now or in the future in any part of
            the world.
            {'\n\n'}(b) All intellectual property subsisting in, created during,
            or used in connection with Sure Space, including any modifications
            and amendments thereto, provided to you by Sure Space, shall be and
            remain the sole property of Sure Space Ltd or our licensors (and
            shall be Sure Space Ltd’s “Intellectual Property”).
            {'\n\n'}(c) All intellectual property subsisting in any content
            created by you shall be retained by the you, except in cases where
            your content incorporates third-party elements, such as those
            provided by an AI provider associated with Sure Space. In such
            instances, ownership of intellectual property shall be contingent
            upon the terms and conditions established between Sure Space Ltd and
            the relevant third-party provider, potentially resulting in
            ownership by the third-party provider.
            {'\n\n'}(d) You shall not, without our prior written consent, use or
            adopt any name, trade name, trading style or commercial designation
            used by us, or do or omit anything to infringe on any “Intellectual
            Property Rights” (as defined in this clause) relating to Sure Space.
            You agree to notify us immediately if you become aware of any
            unauthorised use of our Intellectual Property.
            {'\n\n'}(e) In the event that new intellectual property, inventions,
            designs or processes evolve in the performance of or as a result of
            Sure Space, including where modifications recommended by you are
            incorporated by us into Sure Space, you acknowledge that the same
            shall be Sure Space Ltd’s Intellectual Property unless otherwise
            agreed in writing by us.
            {'\n\n'}(f) By creating, posting or otherwise making content
            available on Sure Space, you grant Sure Space Ltd a non-exclusive,
            worldwide royalty-free licence to use your content, including to
            reproduce, adapt or make derivative works, perform and communicate
            your content to other Sure Space users (where you’ve consented to
            make the content available to them) and with third parties necessary
            for operating, developing and providing Sure Space.
            {'\n\n'}(g) If you choose to submit ideas or feedback to us, you
            agree that we can use them for the purposes of operating,
            developing, improving and providing Sure Space without compensation
            to you.
          </Text>
          <Text style={styles.date}>Clause 10: Data protection</Text>
          <Text style={styles.paragraph}>
            This section tells you that we comply with the law and directs you
            to our Privacy Notice.
            {'\n\n'}(a) We are a data controller and comply with applicable data
            protection law.
            {'\n\n'}(b) How we use any personal data that you give us is set out
            in our Privacy Notice which you can find here [enter weblink for
            location of Privacy Notice on website].
          </Text>
          <Text style={styles.date}>Clause 11: Disclaimer and warranty</Text>
          <Text style={styles.paragraph}>
            This section tells you our disclaimer of legal liability for the
            quality and reliability of Sure Space.
            {'\n\n'}(a) We make no representations or warranties about Sure
            Space, including any representation that the services will be
            uninterrupted or error-free and provide Sure Space (including
            content and information) on an “as is” basis.
            {'\n\n'}(b) To the fullest extent permitted under applicable law, we
            disclaim any implied or statutory warranty, including any implied
            warranty of title, accuracy of data, non-infringement,
            merchantability or fitness for a particular purpose.x
          </Text>
          <Text style={styles.date}>Clause 12: Liability</Text>
          <Text style={styles.paragraph}>
            This section tells you the limit to legal liability that we have to
            you (where the law allows us to have a limit).
            {'\n\n'}(a) References to liability in this clause 12 includes every
            kind of liability arising under or in connection with these Terms &
            Conditions including but not limited to liability in contract, tort
            (including negligence), misrepresentation, restitution or otherwise.
            {'\n\n'}(b) Our liability for any of the following is not excluded
            or limited by these Terms & Conditions:
            {'\n\n'}(i) death or personal injury caused by its negligence; or
            {'\n'}(ii) fraud or fraudulent misrepresentation; or
            {'\n'}(iii) any other liability which cannot be legally excluded or
            limited.
            {'\n'}(c) In no event shall we be liable for special, incidental,
            consequential, indirect or punitive damages including, but not
            limited to, loss of revenue or profit, loss of data, loss of use of
            any property or costs of substitute performance, equipment or
            service.
            {'\n\n'}(d) Subject to clause 12 (b) and clause 12 (c), our total
            liability for all claims, losses, expenses, or damages arising under
            these Terms & Conditions shall in no event exceed sixty pounds
            (£60.00).
            {'\n\n'}(e) The provisions of this clause 12 shall apply to the
            fullest extent of the law, whether in contract, statute, tort (such
            as negligence), or otherwise.
          </Text>
          <Text style={styles.date}>Clause 13: Your rights</Text>
          <Text style={styles.paragraph}>
            This section tells you about how you may terminate this contract and
            delete your Sure Space account.
            {'\n\n'}(a) You may end your relationship with Sure Space Ltd at any
            time by closing your account and stopping your use of Sure Space.
            You can do this through “Settings” within Sure Space and select the
            option to close your account. You will not receive a refund for any
            subscription fees that you have paid to Sure Space.
            {'\n\n'}(b) If you choose to delete your Sure Space account, it’s
            important to understand that this will result in the immediate
            termination of access to all content within Sure Space.
          </Text>
          <Text style={styles.date}>Clause 14: Sure Space’s rights</Text>
          <Text style={styles.paragraph}>
            This section tells you about how we may terminate this contract. It
            also explains that some terms will continue after the contract has
            been terminated.
            {'\n\n'}(a) We can end these Terms & Conditions with you and
            terminate your Sure Space account if:
            {'\n'}(i) we determine that you are in material breach of these
            Terms & Conditions;
            {'\n'}(ii) we have grounds to reasonably believe that you are about
            to materially breach these Terms & Conditions; or
            {'\n'}(iii) we are legally required to do so. (b) If we have
            previously terminated your account for a breach of these Terms &
            Conditions but you use Sure Space again by opening another account,
            we are entitled to suspend or terminate any such accounts.
            {'\n\n'}(c) Any clause in these Terms & Conditions that by
            implication are intended to come into or continue in force on or
            after termination of this contract shall remain in full force and
            effect.
            {'\n\n'}(d) Termination of these Terms & Conditions shall not affect
            any rights, remedies, obligations or liabilities of you or us that
            have accrued up to the date of termination, including the right to
            claim damages in respect of any breach of these Terms & Conditions
            which existed at or before the date of termination.
          </Text>
          <Text style={styles.date}>Clause 15: Other important terms</Text>
          <Text style={styles.paragraph}>
            This section tells you rules about how you must use our product.
            {'\n\n'}(a) Events beyond our control. If our supply of Sure Space
            is restricted or unavailable entirely by an event outside of our
            control, we will contact you as soon as possible to let you know and
            do what we can to reduce the restriction or unavailability. As long
            as we do this, we won’t compensate you for the restriction or
            unavailability for up to fourteen (14) calendar days, but if the
            restriction or unavailability is substantial and continues for more
            than fourteen (14) calendar days, you can contact our team
            at ceo@myndpa.co.uk to end the contract.
            {'\n\n'}(b) Entire agreement. These Terms & Conditions (and any
            websites) referred to in it, constitutes the entire agreement
            between the parties and supersedes and extinguishes all previous
            agreements, promises, assurances, warranties, representations and
            understandings between them, whether written or oral, relating to
            its subject matter.
            {'\n\n'}(c) Severance of a term. If a court or other authority
            invalidates some of these Terms & Conditions, the rest of it will
            still apply.
            {'\n\n'}(d) Waiver. Even if we are delayed in enforcing this
            contract, we can still enforce it later. We might not immediately
            chase you for not doing something or for doing something you’re not
            allowed to, but that doesn’t mean we can’t do it later on.
            {'\n\n'}(e) Communication and notices.
            {'\n'}(i) Any notice or other communication given by us or you shall
            be in writing and shall be sent by email to the following:
            {'\n'}For us, please contact our team at ceo@myndpa.co.uk.
            {'\n'}For you, we will contact you with the email address that you
            have provided at the time of subscribing to Sure Space.
            {'\n'}(ii) Any email will be deemed to be received at the time of
            transmission, or if this time falls outside of “Business Hours” in
            the place of receipt, when the Business Hours resume. “Business
            Hours” refers to anytime between 09:00 - 17:30 from and including
            Monday to Friday in England & Wales.
            {'\n\n'}(f) Transferring the contract. We may transfer these Terms &
            Conditions with you so that a different organisation is responsible
            for supplying Sure Space. We will tell you in writing if this
            happens and we’ll ensure that the transfer won’t affect your rights
            under these Terms & Conditions. If you’re unhappy with the transfer,
            you can contact our team at ceo@myndpa.co.uk to end the contract
            within seven (7) calendar days of us telling you about it.
            {'\n\n'}(g) Rights of other individuals or businesses. These Terms &
            Conditions are between you and us. Nobody else can enforce it and
            neither of us will need to ask anybody else to sign-off on ending or
            changing it.
            {'\n\n'}(h) Governing law. These Terms & Conditions, and any dispute
            or claim (including non-contractual disputes or claims) arising out
            of or in connection with it or its subject matter or formation,
            shall be governed by, and construed in accordance with, the law of
            England and Wales.
            {'\n\n'}(i) Jurisdiction. We and you irrevocably agree that the
            courts of England and Wales shall have exclusive jurisdiction to
            settle any dispute or claim (including non-contractual disputes or
            claims) arising out of or in connection with these Terms &
            Conditions or its subject matter or formation.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#F08080',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#F08080',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#F08080',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TermsAndConditionsScreen;
