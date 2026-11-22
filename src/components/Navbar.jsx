
import { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Animated } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS, ANIMATIONS } from '../theme/theme';

const NAV_ITEMS = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

// We directly use the activeSection prop passed from the parent (App.jsx)
// This avoids the "cascading renders" warning caused by syncing props to local state via useEffect.
export default function Navbar({ scrollToSection, activeSection = 'Home' }) {
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOpacity] = useState(() => new Animated.Value(0));
  const [menuTranslateY] = useState(() => new Animated.Value(-20));

  // Function to handle opening and closing the mobile menu with smooth animations
  const toggleMobileMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      Animated.parallel([
        Animated.timing(menuOpacity, { toValue: 0, duration: 200, useNativeDriver: false }),
        Animated.timing(menuTranslateY, { toValue: -20, duration: 200, useNativeDriver: false })
      ]).start();
    } else {
      setIsMenuOpen(true);
      Animated.parallel([
        Animated.timing(menuOpacity, { toValue: 1, duration: 250, useNativeDriver: false }),
        Animated.spring(menuTranslateY, { toValue: 0, tension: ANIMATIONS.springTension, friction: ANIMATIONS.springFriction, useNativeDriver: false })
      ]).start();
    }
  };

  // Function to handle navigation clicks
  const handleNavigation = (section) => {
    // The parent component (App.jsx) is now fully responsible for updating the active state
    scrollToSection(section);
    
    // Close the mobile menu automatically after clicking a link
    if (isMobile && isMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <View style={styles.navContainer}>
      <View style={[styles.navInner, { paddingHorizontal: isMobile ? SPACING.md : SPACING.xxl }]}>
        
        {/* Brand Logo "SP" */}
        <TouchableOpacity onPress={() => handleNavigation('Home')}>
          <Text style={styles.brandText}>SP</Text>
        </TouchableOpacity>

        {/* Desktop Navigation Links */}
        {!isMobile ? (
          <View style={styles.navLinks}>
            {NAV_ITEMS.map((item) => {
              // Check if this specific item matches the currently active section
              const isActive = activeSection === item;
              
              return (
                <TouchableOpacity 
                  key={item}
                  style={styles.linkButton}
                  onPress={() => handleNavigation(item)}
                >
                  <Text style={[styles.linkText, isActive && styles.activeLinkText]}>
                    {/* Display "Expertise" visually, but keep logic as "Skills" */}
                    {item === 'Skills' ? 'Expertise' : item}
                  </Text>
                </TouchableOpacity>
              );
            })}
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

      {/* Mobile Dropdown Menu */}
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
          {NAV_ITEMS.map((item) => {
            // Check if this specific item matches the currently active section for the mobile menu
            const isActive = activeSection === item;
            
            return (
              <TouchableOpacity 
                key={item}
                style={styles.mobileDropdownItem}
                onPress={() => handleNavigation(item)}
              >
                <Text style={[styles.mobileDropdownText, isActive && styles.activeLinkText]}>
                   {item === 'Skills' ? 'Expertise' : item}
                </Text>
              </TouchableOpacity>
            );
          })}
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
  
  // "SP" Logo Style
  brandText: { color: COLORS.primary, fontSize: SIZES.title + 4, fontWeight: '900', letterSpacing: 1 },
  
  navLinks: { flexDirection: 'row' },
  linkButton: { padding: SPACING.sm, marginLeft: SPACING.lg },
  linkText: { color: COLORS.textPrimary, fontSize: SIZES.body, fontWeight: FONTS.weightBold },
  
  // Highlight color (Skyblue from Theme) applied to the active page link
  activeLinkText: { color: COLORS.primary }, 

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