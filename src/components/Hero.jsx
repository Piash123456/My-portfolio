
import { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Platform,
} from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS } from '../theme/theme';
import FadeInView from './FadeInView';
import profileImg from '../assets/profile.jpg';

export default function Hero({ scrollToSection }) {
  const { width, height } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  // Responsive avatar size for mobile and desktop viewports
  const avatarSize = isMobile ? 175 : 300;

  // Inject lightweight CSS keyframes for smooth floating avatar animation on web
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const styleId = 'hero-float-animation';
    if (document.getElementById(styleId)) return;

    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
      @keyframes heroFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(styleEl);
  }, []);

  return (
    <View
      style={[
        styles.fullScreenWrapper,
        {
          minHeight: isMobile ? undefined : height,
          paddingTop: isMobile ? SIZES.navHeight + SPACING.xl : SIZES.navHeight,
          paddingBottom: isMobile ? SPACING.xxl * 1.5 : SPACING.lg,
          justifyContent: 'center',
        },
      ]}
    >
      <View
        style={[
          styles.heroRow,
          {
            flexDirection: isMobile ? 'column-reverse' : 'row',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'space-between',
          },
        ]}
      >
        {/* Left column (bottom on mobile): developer intro and animated CTA buttons */}
        <FadeInView
          delay={150}
          style={[
            styles.textColumn,
            {
              width: isMobile ? '100%' : '56%',
              alignItems: isMobile ? 'center' : 'flex-start',
              paddingHorizontal: isMobile ? SPACING.md : 0,
            },
          ]}
        >
          {/* Subtle glassmorphic greeting pill */}
          <View style={styles.greetingPill}>
            <View style={styles.statusDot} />
            <Text style={styles.greeting}>Hi, my name is</Text>
          </View>

          <Text
            style={[
              styles.nameHeading,
              {
                fontSize: isMobile ? 26 : 48,
                lineHeight: isMobile ? 34 : 56,
                textAlign: isMobile ? 'center' : 'left',
              },
            ]}
          >
            Md. Shazzadur Rahman Piash.
          </Text>

          <Text
            style={[
              styles.tagline,
              {
                fontSize: isMobile ? 18 : 28,
                lineHeight: isMobile ? 26 : 36,
                textAlign: isMobile ? 'center' : 'left',
              },
            ]}
          >
            I build things for Mobile &amp; Web.
          </Text>

          <Text
            style={[
              styles.description,
              {
                textAlign: isMobile ? 'center' : 'left',
                maxWidth: isMobile ? 360 : 540,
              },
            ]}
          >
            I&apos;m a final-year CSE student and Software Developer specializing
            in cross-platform development with{' '}
            <Text style={styles.highlight}>Flutter</Text> and{' '}
            <Text style={styles.highlight}>React Native</Text>. I love creating
            modern, user-friendly digital experiences.
          </Text>

          {/* Animated primary and secondary call-to-action buttons */}
          <View
            style={[
              styles.buttonRow,
              {
                justifyContent: isMobile ? 'center' : 'flex-start',
                maxWidth: isMobile ? 340 : undefined,
              },
            ]}
          >
            <Pressable
              onPress={() => scrollToSection && scrollToSection('Projects')}
              style={({ hovered, pressed }) => [
                styles.primaryButton,
                isMobile && styles.mobileButton,
                hovered && styles.primaryButtonHovered,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>View Projects →</Text>
            </Pressable>

            <Pressable
              onPress={() => scrollToSection && scrollToSection('Contact')}
              style={({ hovered, pressed }) => [
                styles.secondaryButton,
                isMobile && styles.mobileButton,
                hovered && styles.secondaryButtonHovered,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.secondaryButtonText}>Contact Me</Text>
            </Pressable>
          </View>
        </FadeInView>

        {/* Right column (top on mobile): floating circular profile image with soft glow */}
        <FadeInView
          delay={250}
          style={[
            styles.imageColumn,
            {
              width: isMobile ? '100%' : '40%',
              marginBottom: isMobile ? SPACING.lg : 0,
            },
          ]}
        >
          <View
            style={[
              styles.avatarOuterGlow,
              {
                width: avatarSize + 20,
                height: avatarSize + 20,
                borderRadius: (avatarSize + 20) / 2,
              },
            ]}
          >
            <View
              style={[
                styles.avatarRing,
                {
                  width: avatarSize + 10,
                  height: avatarSize + 10,
                  borderRadius: (avatarSize + 10) / 2,
                },
              ]}
            >
              <Image
                source={profileImg}
                style={{
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius: avatarSize / 2,
                }}
                resizeMode="cover"
              />
            </View>
          </View>
        </FadeInView>
      </View>
    </View>
  );
}

const webTransition =
  Platform.OS === 'web'
    ? { transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer' }
    : {};

const styles = StyleSheet.create({
  fullScreenWrapper: {
    width: '100%',
  },
  heroRow: {
    width: '100%',
  },
  textColumn: {
    justifyContent: 'center',
  },
  greetingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: 999,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    marginBottom: SPACING.md,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: SPACING.xs + 2,
  },
  greeting: {
    color: COLORS.primary,
    fontSize: SIZES.body - 1,
    fontWeight: FONTS.weightBold,
    letterSpacing: 0.4,
  },
  nameHeading: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weightBold,
    marginBottom: SPACING.xs,
  },
  tagline: {
    color: COLORS.textSecondary,
    fontWeight: FONTS.weightBold,
    marginBottom: SPACING.md,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body - 1,
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  highlight: {
    color: COLORS.primary,
    fontWeight: FONTS.weightBold,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: SPACING.md,
  },
  mobileButton: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md - 2,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.primary,
    alignItems: 'center',
    ...webTransition,
  },
  primaryButtonHovered: {
    transform: [{ translateY: -3 }],
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 10px 24px -6px rgba(56, 189, 248, 0.55)' }
      : {}),
  },
  primaryButtonText: {
    color: COLORS.background,
    fontSize: SIZES.body - 1,
    fontWeight: FONTS.weightBold,
  },
  secondaryButton: {
    backgroundColor: 'rgba(56, 189, 248, 0.05)',
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md - 2,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.primary,
    alignItems: 'center',
    ...webTransition,
  },
  secondaryButtonHovered: {
    backgroundColor: 'rgba(56, 189, 248, 0.16)',
    transform: [{ translateY: -3 }],
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 8px 20px -6px rgba(56, 189, 248, 0.35)' }
      : {}),
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.body - 1,
    fontWeight: FONTS.weightBold,
  },
  buttonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  imageColumn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarOuterGlow: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0 0 36px rgba(56, 189, 248, 0.25)',
          animation: 'heroFloat 4.5s ease-in-out infinite',
        }
      : {}),
  },
  avatarRing: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.card,
  },
});