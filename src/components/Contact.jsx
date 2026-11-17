// src/components/Contact.jsx
import { View, Text, StyleSheet, useWindowDimensions, Linking } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS } from '../theme/theme';
import FadeInView from './FadeInView';
import PremiumButton from './PremiumButton';

export default function Contact() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  // Opens the user's default email client pre-filled with your real email
  const handleEmailPress = () => {
    Linking.openURL('mailto:rpiash76@gmail.com');
  };

  return (
    <View style={[styles.fullScreenWrapper, { minHeight: height }]}>
      <View style={styles.sectionContainer}>
        
        <FadeInView delay={100}>
          <Text style={[styles.sectionTitle, { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb }]}>
            Get In Touch
          </Text>
        </FadeInView>
        
        <FadeInView delay={300}>
          <Text style={styles.subtitleText}>
            My inbox is always open. Whether you have a question, a project proposal, or just want to say hi, 
            I'll try my best to get back to you!
          </Text>
        </FadeInView>

        <FadeInView 
          delay={500} 
          animationType="zoomIn"
          style={[styles.contactCard, { width: isMobile ? '100%' : '60%' }]}
        >
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>rpiash76@gmail.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Location:</Text>
            <Text style={styles.infoValue}>Dhaka, Bangladesh</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>GitHub:</Text>
            <Text style={styles.infoValue}>github.com/Piash123456</Text>
          </View>

          <View style={styles.buttonWrapper}>
            <PremiumButton 
              title="Say Hello" 
              variant="primary"
              onPress={handleEmailPress}
            />
          </View>
        </FadeInView>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenWrapper: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: SIZES.navHeight,
  },
  sectionContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weightBold,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  subtitleText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    textAlign: 'center',
    maxWidth: 600,
    lineHeight: 24,
    marginBottom: SPACING.xxl,
    alignSelf: 'center',
  },
  contactCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.xxl, // Increased padding for a more premium look
    borderRadius: SIZES.borderRadius,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.border,
    alignItems: 'center',
    ...SHADOWS.card, 
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  infoLabel: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    marginRight: SPACING.sm,
    fontWeight: FONTS.weightBold,
  },
  infoValue: {
    color: COLORS.textPrimary,
    fontSize: SIZES.body,
  },
  buttonWrapper: {
    marginTop: SPACING.xl,
    width: '100%',
    maxWidth: 250, 
  }
});