
import { View, Text, StyleSheet, TouchableOpacity, Linking, useWindowDimensions } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS } from '../theme/theme';

export default function Footer() {
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  // Function to open external URLs like GitHub or Email
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.footerContainer}>
      <View 
        style={[
          styles.footerInner, 
          // Stack items vertically on mobile, horizontally on web
          { flexDirection: isMobile ? 'column' : 'row' }
        ]}
      >
        {/* Left Side: Copyright Text */}
        <Text 
          style={[
            styles.footerText, 
            { marginBottom: isMobile ? SPACING.sm : 0 }
          ]}
        >
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </Text>

        {/* Right Side: Quick Contact & Social Links */}
        <View style={styles.socialLinks}>
          <TouchableOpacity onPress={() => openLink('https://github.com/your-username')}>
            <Text style={styles.linkText}>GitHub</Text>
          </TouchableOpacity>
          
          <Text style={styles.separator}>•</Text>
          
          <TouchableOpacity onPress={() => openLink('https://linkedin.com/in/your-username')}>
            <Text style={styles.linkText}>LinkedIn</Text>
          </TouchableOpacity>
          
          <Text style={styles.separator}>•</Text>
          
          <TouchableOpacity onPress={() => openLink('mailto:your.email@example.com')}>
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
    backgroundColor: COLORS.surface, // Slight contrast from main background
    borderTopWidth: SIZES.borderWidth,
    borderTopColor: COLORS.border,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginTop: 'auto', // Pushes footer to the bottom of the page
  },
  footerInner: {
    width: '100%',
    maxWidth: SIZES.maxWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body - 2, // Slightly smaller text for footer
  },
  socialLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body - 2,
    fontWeight: FONTS.weightBold,
  },
  separator: {
    color: COLORS.border,
    marginHorizontal: SPACING.sm,
    fontSize: SIZES.body - 2,
  }
});