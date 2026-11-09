// src/components/Navbar.jsx
import { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Animated } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS, ANIMATIONS } from '../theme/theme';

// ADDED: 'Contact' is now part of the navigation menu
const NAV_ITEMS = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

export default function Navbar({ scrollToSection }) {
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Animation states are kept stable
  const [menuOpacity] = useState(() => new Animated.Value(0));
  const [menuTranslateY] = useState(() => new Animated.Value(-20));

  const toggleMobileMenu = () => {
    if (isMenuOpen) {
      // Animate out (close)
      setIsMenuOpen(false);
      Animated.parallel([
        Animated.timing(menuOpacity, { toValue: 0, duration: 200, useNativeDriver: false }),
        Animated.timing(menuTranslateY, { toValue: -20, duration: 200, useNativeDriver: false })
      ]).start();
    } else {
      // Animate in (open)
      setIsMenuOpen(true);
      Animated.parallel([
        Animated.timing(menuOpacity, { toValue: 1, duration: 250, useNativeDriver: false }),
        Animated.spring(menuTranslateY, { toValue: 0, tension: ANIMATIONS.springTension, friction: ANIMATIONS.springFriction, useNativeDriver: false })
      ]).start();
    }
  };

  const handleNavigation = (section) => {
    scrollToSection(section);
    
    // Automatically close the mobile menu after clicking a link
    if (isMobile && isMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <View style={styles.navContainer}>
      <View style={[styles.navInner, { paddingHorizontal: isMobile ? SPACING.md : SPACING.xxl }]}>
        
        {/* Brand Logo/Text */}
        <TouchableOpacity onPress={() => handleNavigation('Home')}>
          <Text style={styles.brandText}>MyPortfolio</Text>
        </TouchableOpacity>

        {/* Desktop Navigation Links */}
        {!isMobile ? (
          <View style={styles.navLinks}>
            {NAV_ITEMS.map((item) => (
              <TouchableOpacity 
                key={item}
                style={styles.linkButton}
                onPress={() => handleNavigation(item)}
              >
                <Text style={styles.linkText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* Mobile Menu Toggle Button */
          <TouchableOpacity 
            style={[styles.menuButton, isMenuOpen && styles.menuButtonActive]} 
            onPress={toggleMobileMenu}
          >
            <Text style={[styles.menuText, isMenuOpen && styles.menuTextActive]}>
              {isMenuOpen ? 'Close' : 'Menu'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Mobile Dropdown Menu rendered dynamically based on state */}
      {isMobile && (
        <Animated.View 
          pointerEvents={isMenuOpen ? 'auto' : 'none'} 
          style={[
            styles.mobileDropdown, 
            { 
              opacity: menuOpacity,
              transform: [{ translateY: menuTranslateY }]
            }
          ]}
        >
          {NAV_ITEMS.map((item) => (
            <TouchableOpacity 
              key={item}
              style={styles.mobileDropdownItem}
              onPress={() => handleNavigation(item)}
            >
              <Text style={styles.mobileDropdownText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    width: '100%', height: SIZES.navHeight, backgroundColor: COLORS.surface,
    borderBottomWidth: SIZES.borderWidth, borderBottomColor: COLORS.border,
    alignItems: 'center', position: 'absolute', top: 0, left: 0, zIndex: 100, 
  },
  navInner: {
    width: '100%', maxWidth: SIZES.maxWidth, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between', height: '100%',
    backgroundColor: COLORS.surface, zIndex: 101, 
  },
  brandText: { color: COLORS.primary, fontSize: SIZES.title, fontWeight: FONTS.weightBold },
  navLinks: { flexDirection: 'row' },
  linkButton: { padding: SPACING.sm, marginLeft: SPACING.md },
  linkText: { color: COLORS.textPrimary, fontSize: SIZES.body, fontWeight: FONTS.weightBold },
  menuButton: {
    paddingVertical: SPACING.xs, paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.background, borderRadius: SIZES.borderRadius,
    borderWidth: SIZES.borderWidth, borderColor: COLORS.border,
  },
  menuButtonActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  menuText: { color: COLORS.textPrimary, fontSize: SIZES.body, fontWeight: FONTS.weightBold },
  menuTextActive: { color: COLORS.background },
  mobileDropdown: {
    position: 'absolute', top: SIZES.navHeight, left: 0, width: '100%',
    backgroundColor: COLORS.surface, borderBottomWidth: SIZES.borderWidth,
    borderBottomColor: COLORS.border, paddingVertical: SPACING.md,
    ...SHADOWS.card, zIndex: 99, 
  },
  mobileDropdownItem: {
    width: '100%', paddingVertical: SPACING.md, alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: COLORS.background,
  },
  mobileDropdownText: { color: COLORS.textPrimary, fontSize: SIZES.title, fontWeight: FONTS.weightBold }
});