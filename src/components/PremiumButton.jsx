
import { useState } from 'react';
import { Animated, Pressable, StyleSheet, Platform, Text } from 'react-native';
import { COLORS, SIZES, FONTS, ANIMATIONS, SPACING } from '../theme/theme';

export default function PremiumButton({ title, onPress, variant = 'primary', style }) {
  const [scaleAnim] = useState(() => new Animated.Value(1));
  const [glowAnim] = useState(() => new Animated.Value(0));

  const isPrimary = variant === 'primary';

  const handleHoverIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1.05, tension: ANIMATIONS.hoverTension, friction: ANIMATIONS.hoverFriction, useNativeDriver: false }),
      Animated.timing(glowAnim, { toValue: 1, duration: 200, useNativeDriver: false })
    ]).start();
  };

  const handleHoverOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, tension: ANIMATIONS.hoverTension, friction: ANIMATIONS.hoverFriction, useNativeDriver: false }),
      Animated.timing(glowAnim, { toValue: 0, duration: 200, useNativeDriver: false })
    ]).start();
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.95, tension: 200, friction: 5, useNativeDriver: false }).start();
  };

  const animatedShadow = {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.8] }),
    shadowRadius: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 15] }),
    elevation: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 10] }),
  };

  return (
    <Animated.View style={[style, { transform: [{ scale: scaleAnim }] }, isPrimary && animatedShadow]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handleHoverIn}
        onHoverIn={Platform.OS === 'web' ? handleHoverIn : null}
        onHoverOut={Platform.OS === 'web' ? handleHoverOut : null}
        style={[
          styles.buttonBase, 
          isPrimary ? styles.primaryBtn : styles.secondaryBtn
        ]}
      >
        <Text style={[styles.textBase, isPrimary ? styles.primaryText : styles.secondaryText]}>
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonBase: { 
    // Moving padding directly into the button so it never squishes!
    paddingVertical: SPACING.md, 
    paddingHorizontal: SPACING.xl,
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: SIZES.borderRadius,
    width: '100%', // Takes the full width of its wrapper
  },
  textBase: { fontSize: SIZES.body, fontWeight: FONTS.weightBold, textAlign: 'center' },
  primaryBtn: { backgroundColor: COLORS.primary },
  secondaryBtn: { backgroundColor: COLORS.transparent, borderWidth: SIZES.borderWidth, borderColor: COLORS.primary },
  primaryText: { color: COLORS.background },
  secondaryText: { color: COLORS.primary },
});