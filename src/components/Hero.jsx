// src/components/Hero.jsx

import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS } from '../theme/theme';

export default function Hero() {
  // Get window dimensions to handle responsive layout
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  return (
    <View 
      style={[
        styles.heroContainer, 
        // Switch between row (web) and column-reverse (mobile)
        { flexDirection: isMobile ? 'column-reverse' : 'row' }
      ]}
    >
      {/* Left Side: Text Content */}
      <View 
        style={[
          styles.textContent, 
          // Center text on mobile, align left on web
          { alignItems: isMobile ? 'center' : 'flex-start' }
        ]}
      >
        <Text style={styles.greetingText}>Hello, I am</Text>
        
        <Text 
          style={[
            styles.nameText, 
            { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb }
          ]}
        >
        Md. Shazzadur Rahman Piash
        </Text>
        
        <Text 
          style={[
            styles.descriptionText,
            { textAlign: isMobile ? 'center' : 'left' }
          ]}
        >
          A passionate React Native developer building cross-platform applications 
          with beautiful and consistent user interfaces.
        </Text>

        {/* Call to Action Button */}
        <TouchableOpacity 
          style={[
            styles.primaryButton,
            { padding: isMobile ? SIZES.buttonPaddingMobile : SIZES.buttonPaddingWeb }
          ]}
        >
          <Text style={styles.buttonText}>Download Resume</Text>
        </TouchableOpacity>
      </View>

      {/* Right Side: Image/Avatar */}
      <View 
        style={[
          styles.imageContainer, 
          // Add spacing below image only on mobile
          { marginBottom: isMobile ? SPACING.xl : 0 }
        ]}
      >
        <Image 
          source={{ uri: 'https://avatar.iran.liara.run/public/boy' }} 
          style={[
            styles.profileImage, 
            { 
              width: isMobile ? SIZES.heroImageMobile : SIZES.heroImageWeb,
              height: isMobile ? SIZES.heroImageMobile : SIZES.heroImageWeb,
              borderRadius: isMobile ? (SIZES.heroImageMobile / 2) : (SIZES.heroImageWeb / 2) 
            }
          ]}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xxl,
  },
  textContent: {
    flex: 1, // Takes available space
    justifyContent: 'center',
  },
  greetingText: {
    color: COLORS.primary,
    fontSize: SIZES.title,
    fontWeight: FONTS.weightNormal,
    marginBottom: SPACING.xs,
  },
  nameText: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weightBold,
    marginBottom: SPACING.md,
  },
  descriptionText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    lineHeight: 24, // Makes paragraph more readable
    marginBottom: SPACING.xl,
    maxWidth: 500, // Prevents text from stretching too far on large screens
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.background, // Dark text on light blue button
    fontSize: SIZES.body,
    fontWeight: FONTS.weightBold,
  },
  imageContainer: {
    flex: 1, // Takes available space
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    backgroundColor: COLORS.surface, // Fallback color before image loads
    borderWidth: 4,
    borderColor: COLORS.surface,
  }
});