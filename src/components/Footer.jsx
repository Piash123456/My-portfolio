
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Platform,
  Linking,
} from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS } from '../theme/theme';

// Lightweight inline SVG icons for footer social links
const FooterIcon = ({ type, color }) => {
  const props = {
    width: 17,
    height: 17,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'github':
      return (
        <svg {...props}>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...props}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...props}>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case 'email':
      return (
        <svg {...props}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    default:
      return null;
  }
};

// Footer social links
const SOCIAL_LINKS = [
  { id: 1, type: 'github', url: 'https://github.com/Piash123456' },
  { id: 2, type: 'linkedin', url: 'https://www.linkedin.com' },
  { id: 3, type: 'instagram', url: 'https://www.instagram.com' },
  { id: 4, type: 'email', url: 'mailto:rpiash76@gmail.com' },
];

export default function Footer() {
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;
  const currentYear = new Date().getFullYear();

  // Open external links safely on web and mobile
  const openExternalLink = (url) => {
    if (!url) return;
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.footerWrapper}>
      <View
        style={[
          styles.footerContainer,
          { paddingHorizontal: isMobile ? SPACING.md : SPACING.xxl },
        ]}
      >
        {/* Top row: brand identity and animated social icons */}
        <View
          style={[
            styles.topRow,
            {
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: isMobile ? 'center' : 'space-between',
            },
          ]}
        >
          <View
            style={[
              styles.brandBlock,
              {
                alignItems: isMobile ? 'center' : 'flex-start',
                marginBottom: isMobile ? SPACING.lg : 0,
              },
            ]}
          >
            <View style={styles.brandRow}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoText}>SP</Text>
              </View>
              <Text style={styles.brandName}>Md. Shazzadur Rahman Piash</Text>
            </View>
            <Text
              style={[
                styles.brandTagline,
                { textAlign: isMobile ? 'center' : 'left' },
              ]}
            >
              Software Developer &bull; Flutter, React Native &amp; Modern Web
            </Text>
          </View>

          {/* Animated social icon buttons */}
          <View style={styles.socialRow}>
            {SOCIAL_LINKS.map((social) => (
              <Pressable
                key={social.id}
                onPress={() => openExternalLink(social.url)}
                style={({ hovered, pressed }) => [
                  styles.socialButton,
                  hovered && styles.socialButtonHovered,
                  pressed && styles.buttonPressed,
                ]}
              >
                {({ hovered }) => (
                  <FooterIcon
                    type={social.type}
                    color={hovered ? COLORS.background : COLORS.primary}
                  />
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Subtle divider */}
        <View style={styles.divider} />

        {/* Bottom row: copyright and build credit */}
        <View
          style={[
            styles.bottomRow,
            {
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: isMobile ? 'center' : 'space-between',
            },
          ]}
        >
          <Text
            style={[
              styles.copyrightText,
              { marginBottom: isMobile ? SPACING.xs : 0 },
            ]}
          >
            &copy; {currentYear} Md. Shazzadur Rahman Piash. All rights reserved.
          </Text>

          <Text style={styles.creditText}>
            Built with <Text style={styles.highlight}>React Native Web</Text> &amp;{' '}
            <Text style={styles.highlight}>Vite</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const webTransition =
  Platform.OS === 'web'
    ? { transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer' }
    : {};

const styles = StyleSheet.create({
  footerWrapper: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: 'rgba(56, 189, 248, 0.25)',
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  footerContainer: {
    width: '100%',
    maxWidth: SIZES.maxWidth,
    paddingVertical: SPACING.xl,
  },
  topRow: {
    width: '100%',
  },
  brandBlock: {
    justifyContent: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs + 2,
  },
  logoBadge: {
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    marginRight: SPACING.sm + 2,
  },
  logoText: {
    color: COLORS.primary,
    fontSize: SIZES.body,
    fontWeight: FONTS.weightBold,
    letterSpacing: 1,
  },
  brandName: {
    color: COLORS.textPrimary,
    fontSize: SIZES.body + 1,
    fontWeight: FONTS.weightBold,
  },
  brandTagline: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body - 2,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm + 2,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.4)',
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...webTransition,
  },
  socialButtonHovered: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    transform: [{ translateY: -3 }],
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 8px 18px -4px rgba(56, 189, 248, 0.5)' }
      : {}),
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.lg,
    opacity: 0.6,
  },
  bottomRow: {
    width: '100%',
  },
  copyrightText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body - 2,
    textAlign: 'center',
  },
  creditText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body - 2,
    textAlign: 'center',
  },
  highlight: {
    color: COLORS.primary,
    fontWeight: FONTS.weightBold,
  },
});