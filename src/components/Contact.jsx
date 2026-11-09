// src/components/Contact.jsx
import { View, Text, StyleSheet, useWindowDimensions, Linking } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS } from '../theme/theme';
import FadeInView from './FadeInView';
import PremiumButton from './PremiumButton';

export default function Contact() {
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  // Function to open the device's default email client
  const handleEmailPress = () => {
    Linking.openURL('mailto:your.email@example.com');
  };

  return (
    <View style={styles.sectionContainer}>
      
      {/* Animated Section Title */}
      <FadeInView delay={100}>
        <Text style={[styles.sectionTitle, { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb }]}>
          Get In Touch
        </Text>
      </FadeInView>
      
      {/* Animated Subtitle */}
      <FadeInView delay={300}>
        <Text style={styles.subtitleText}>
          Currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </Text>
      </FadeInView>

      {/* Animated Contact Card with Premium Hover Effects */}
      <FadeInView 
        delay={500} 
        animationType="zoomIn"
        style={[styles.contactCard, { width: isMobile ? '100%' : '60%' }]}
      >
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>your.email@example.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location:</Text>
          <Text style={styles.infoValue}>Dhaka, Bangladesh</Text>
        </View>

        {/* Upgraded Premium Button with Physics Animation */}
        <View style={styles.buttonWrapper}>
          <PremiumButton 
            title="Say Hello" 
            variant="primary"
            onPress={handleEmailPress}
          />
        </View>
      </FadeInView>

    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: SPACING.xxl,
    marginBottom: SPACING.xxl * 1.5,
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
    marginBottom: SPACING.xl,
    alignSelf: 'center',
  },
  contactCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.xl,
    borderRadius: SIZES.borderRadius,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.border,
    alignItems: 'center',
    ...SHADOWS.card, // Added premium dynamic shadow
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
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
    marginTop: SPACING.lg,
    width: '100%',
    maxWidth: 200, // Keeps the button properly sized inside the card
  }
});