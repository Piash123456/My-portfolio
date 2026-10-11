// src/components/Navbar.jsx

import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS } from '../theme/theme';

export default function Navbar() {
  // Get current screen width to determine layout
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  return (
    <View style={styles.navContainer}>
      <View 
        style={[
          styles.navInner, 
          // Adjust horizontal padding based on device type
          { paddingHorizontal: isMobile ? SPACING.md : SPACING.xxl }
        ]}
      >
        {/* Brand Name / Logo Section */}
        <Text style={styles.brandText}>MyPortfolio</Text>

        {/* Navigation Links rendering based on device */}
        {!isMobile ? (
          // Web View: Show links side by side
          <View style={styles.navLinks}>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Projects</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Contact</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Mobile View: Show a simple menu button for now
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>Menu</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    width: '100%',
    height: SIZES.navHeight,
    backgroundColor: COLORS.surface,
    borderBottomWidth: SIZES.borderWidth,
    borderBottomColor: COLORS.border,
    alignItems: 'center', // Center the inner container
  },
  navInner: {
    width: '100%',
    maxWidth: SIZES.maxWidth,
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Align vertically in the center
    justifyContent: 'space-between', // Push brand to left, links to right
    height: '100%',
  },
  brandText: {
    color: COLORS.primary,
    fontSize: SIZES.title,
    fontWeight: FONTS.weightBold,
  },
  navLinks: {
    flexDirection: 'row',
  },
  linkButton: {
    padding: SPACING.sm,
    marginLeft: SPACING.md, // Add space between links
  },
  linkText: {
    color: COLORS.textPrimary,
    fontSize: SIZES.body,
  },
  menuButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.border,
    borderRadius: SIZES.borderRadius,
  },
  menuText: {
    color: COLORS.textPrimary,
    fontSize: SIZES.body,
  }
});