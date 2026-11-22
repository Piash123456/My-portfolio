
import { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Animated, Image, Platform, Pressable } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS, ANIMATIONS } from '../theme/theme';
import FadeInView from './FadeInView';
import PremiumButton from './PremiumButton';


import profilePic from '../assets/profile.jpg';

// Safe Hover Avatar to avoid Animated.loop crash on Web
const HoverAvatar = () => {
  const [hoverAnim] = useState(() => new Animated.Value(0));

  const handleHoverIn = () => Animated.spring(hoverAnim, { toValue: 1, tension: ANIMATIONS.hoverTension, friction: ANIMATIONS.hoverFriction, useNativeDriver: false }).start();
  const handleHoverOut = () => Animated.spring(hoverAnim, { toValue: 0, tension: ANIMATIONS.hoverTension, friction: ANIMATIONS.hoverFriction, useNativeDriver: false }).start();

  const animatedStyle = {
    transform: [
      { translateY: hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -15] }) }, // Lifts up smoothly
      { scale: hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.03] }) } // Slight zoom
    ]
  };

  return (
    <Animated.View style={[styles.imageContainer, animatedStyle]}>
      <Pressable 
        onHoverIn={Platform.OS === 'web' ? handleHoverIn : null} 
        onHoverOut={Platform.OS === 'web' ? handleHoverOut : null}
      >
        <View style={styles.imageBorder}>
          {/* Imported local profile picture */}
          <Image 
            source={{ uri: profilePic }} 
            style={styles.avatarImage} 
            resizeMode="cover" 
          />
        </View>
        {/* Decorative Blur Glow Behind Image */}
        <View style={styles.glowEffect} />
      </Pressable>
    </Animated.View>
  );
};

export default function Hero({ scrollToSection }) {
  const { width, height } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  return (
    <View style={[styles.fullScreenWrapper, { minHeight: height }]}>
      <View style={[styles.contentWrapper, { flexDirection: isMobile ? 'column-reverse' : 'row' }]}>
        
        {/* Left Side: Introduction Text */}
        <View style={[styles.textContainer, { width: isMobile ? '100%' : '55%', alignItems: isMobile ? 'center' : 'flex-start' }]}>
          
          <FadeInView delay={100}>
            <Text style={styles.greetingText}>Hi, my name is</Text>
          </FadeInView>

          <FadeInView delay={300}>
            <Text style={[styles.nameText, { fontSize: isMobile ? 36 : 56, textAlign: isMobile ? 'center' : 'left' }]}>
              Md. Shazzadur Rahman Piash.
            </Text>
          </FadeInView>

          <FadeInView delay={500}>
            <Text style={[styles.roleText, { fontSize: isMobile ? 28 : 42, textAlign: isMobile ? 'center' : 'left' }]}>
              I build things for Mobile & Web.
            </Text>
          </FadeInView>

          <FadeInView delay={700}>
            <Text style={[styles.descriptionText, { textAlign: isMobile ? 'center' : 'left' }]}>
              I'm a final-year CSE student and Software Developer specializing in cross-platform development with <Text style={styles.highlight}>Flutter</Text> and <Text style={styles.highlight}>React Native</Text>. I love creating modern, user-friendly digital experiences.
            </Text>
          </FadeInView>

          <FadeInView delay={900} style={styles.actionButtonsRow}>
            <PremiumButton 
              title="View Projects" 
              variant="primary"
              onPress={() => scrollToSection('Projects')}
            />
            <View style={{ width: SPACING.md }} />
            <PremiumButton 
              title="Contact Me" 
              variant="secondary"
              onPress={() => scrollToSection('Contact')}
            />
          </FadeInView>
        </View>

        {/* Right Side: Interactive Hover Profile Picture */}
        <FadeInView 
          delay={600} 
          animationType="zoomIn"
          style={[styles.imageWrapper, { width: isMobile ? '100%' : '40%', marginBottom: isMobile ? SPACING.xxxl : 0 }]}
        >
          <HoverAvatar />
        </FadeInView>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenWrapper: { width: '100%', justifyContent: 'center', paddingTop: SIZES.navHeight },
  contentWrapper: { justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  
  // Text Styles
  textContainer: { justifyContent: 'center' },
  greetingText: { color: COLORS.primary, fontSize: SIZES.body, fontWeight: FONTS.weightBold, letterSpacing: 2, marginBottom: SPACING.sm },
  nameText: { color: COLORS.textPrimary, fontWeight: '900', lineHeight: 65, marginBottom: SPACING.xs },
  roleText: { color: COLORS.textSecondary, fontWeight: FONTS.weightBold, lineHeight: 50, marginBottom: SPACING.lg },
  descriptionText: { color: COLORS.textSecondary, fontSize: SIZES.body + 2, lineHeight: 28, maxWidth: 540, marginBottom: SPACING.xxl },
  highlight: { color: COLORS.primary, fontWeight: FONTS.weightBold },
  
  actionButtonsRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: SPACING.md },
  
  // Image / Avatar Styles
  imageWrapper: { alignItems: 'center', justifyContent: 'center' },
  imageContainer: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  imageBorder: { 
    width: 300, 
    height: 300, 
    borderRadius: 150, 
    borderWidth: 3, 
    borderColor: COLORS.primary, 
    backgroundColor: COLORS.surface,
    padding: 8,
    zIndex: 2,
    ...SHADOWS.card 
  },
  avatarImage: { width: '100%', height: '100%', borderRadius: 150, backgroundColor: COLORS.border },
  
  // Cool glowing background effect behind the image
  glowEffect: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.primary,
    opacity: 0.15,
    filter: 'blur(40px)', 
    zIndex: 1,
    transform: [{ scale: 1.2 }]
  }
});