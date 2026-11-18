// src/components/Footer.jsx
import { View, Text, StyleSheet, TouchableOpacity, Linking, useWindowDimensions } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS } from '../theme/theme';

export default function Footer() {
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;
  
  // Gets the current year automatically
  const currentYear = new Date().getFullYear();

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.footerContainer}>
      <View style={[
        styles.footerInner, 
        { 
          flexDirection: isMobile ? 'column' : 'row',
          paddingHorizontal: isMobile ? SPACING.md : SPACING.xxl 
        }
      ]}>
        
        {/* Left Side: Copyright Text */}
        <Text style={[styles.copyrightText, { marginBottom: isMobile ? SPACING.sm : 0 }]}>
          © {currentYear} Md. Shazzadur Rahman Piash.
        </Text>

        {/* Right Side: Quick Links */}
        <View style={styles.socialLinks}>
          <TouchableOpacity onPress={() => openLink('https://github.com/Piash123456')}>
            <Text style={styles.linkText}>GitHub</Text>
          </TouchableOpacity>
          
          <Text style={styles.dot}>•</Text>
          
          <TouchableOpacity onPress={() => openLink('https://linkedin.com/')}>
            <Text style={styles.linkText}>LinkedIn</Text>
          </TouchableOpacity>

          <Text style={styles.dot}>•</Text>
          
          <TouchableOpacity onPress={() => openLink('mailto:rpiash76@gmail.com')}>
            <Text style={styles.linkText}>Email</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    backgroundColor: COLORS.surface, // Slightly different from main background for contrast
    borderTopWidth: SIZES.borderWidth,
    borderTopColor: COLORS.border,
    paddingVertical: SPACING.md, // Keeps the footer small and compact
    alignItems: 'center',
    marginTop: 'auto', // Pushes footer to the absolute bottom
  },
  footerInner: {
    width: '100%',
    maxWidth: SIZES.maxWidth,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyrightText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body - 2, // Smaller font for a compact look
  },
  socialLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: COLORS.primary, // Highlights the links
    fontSize: SIZES.body - 2,
    fontWeight: FONTS.weightBold,
  },
  dot: {
    color: COLORS.textSecondary,
    marginHorizontal: SPACING.sm,
    fontSize: SIZES.body - 2,
  }
});