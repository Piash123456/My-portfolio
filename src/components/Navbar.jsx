
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Platform,
  Linking,
} from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS } from '../theme/theme';

// Path to your resume PDF inside the Vite "public" folder (e.g., public/resume.pdf)
const RESUME_URL = '/resume.pdf';

// Navigation items mapped to section IDs defined in App.jsx
const NAV_ITEMS = [
  { label: 'Home', id: 'Home' },
  { label: 'About', id: 'About' },
  { label: 'Expertise', id: 'Skills' },
  { label: 'Projects', id: 'Projects' },
  { label: 'Contact', id: 'Contact' },
];

// Lightweight inline SVG icons (no external icon library required)
const NavIcon = ({ type, color }) => {
  const props = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'download':
      return (
        <svg {...props}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...props} width={22} height={22}>
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      );
    case 'close':
      return (
        <svg {...props} width={22} height={22}>
          <line x1="18" x2="6" y1="6" y2="18" />
          <line x1="6" x2="18" y1="6" y2="18" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Navbar({ scrollToSection, activeSection }) {
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;
  const [menuOpen, setMenuOpen] = useState(false);

  // Navigate to selected section and close mobile menu if open
  const handleNavPress = (sectionId) => {
    if (scrollToSection) {
      scrollToSection(sectionId);
    }
    setMenuOpen(false);
  };

  // Trigger resume download on web or open externally on mobile
  const handleDownloadResume = () => {
    if (Platform.OS === 'web') {
      const link = document.createElement('a');
      link.href = RESUME_URL;
      link.download = 'Md_Shazzadur_Rahman_Piash_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      Linking.openURL(RESUME_URL);
    }
    setMenuOpen(false);
  };

  return (
    <View style={styles.navbarWrapper}>
      <View
        style={[
          styles.navbarContainer,
          { paddingHorizontal: isMobile ? SPACING.md : SPACING.xxl },
        ]}
      >
        {/* Brand logo button */}
        <Pressable
          onPress={() => handleNavPress('Home')}
          style={({ hovered, pressed }) => [
            styles.logoBadge,
            hovered && styles.logoBadgeHovered,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.logoText}>SP</Text>
        </Pressable>

        {/* Desktop navigation links and Download Resume button */}
        {!isMobile ? (
          <View style={styles.desktopNavGroup}>
            <View style={styles.linksRow}>
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => handleNavPress(item.id)}
                    style={({ hovered }) => [
                      styles.navLinkButton,
                      hovered && styles.navLinkButtonHovered,
                    ]}
                  >
                    {({ hovered }) => (
                      <View style={styles.navLinkInner}>
                        <Text
                          style={[
                            styles.navLinkText,
                            (isActive || hovered) && styles.navLinkTextActive,
                          ]}
                        >
                          {item.label}
                        </Text>
                        <View
                          style={[
                            styles.activeBar,
                            isActive && styles.activeBarVisible,
                          ]}
                        />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>

            {/* Animated Download Resume button */}
            <Pressable
              onPress={handleDownloadResume}
              style={({ hovered, pressed }) => [
                styles.downloadButton,
                hovered && styles.downloadButtonHovered,
                pressed && styles.buttonPressed,
              ]}
            >
              {({ hovered }) => (
                <>
                  <NavIcon
                    type="download"
                    color={hovered ? COLORS.background : COLORS.primary}
                  />
                  <Text
                    style={[
                      styles.downloadButtonText,
                      hovered && styles.downloadButtonTextHovered,
                    ]}
                  >
                    Resume
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        ) : (
          /* Mobile actions: compact Download button + Menu toggle */
          <View style={styles.mobileActions}>
            <Pressable
              onPress={handleDownloadResume}
              style={({ hovered, pressed }) => [
                styles.mobileDownloadBtn,
                hovered && styles.downloadButtonHovered,
                pressed && styles.buttonPressed,
              ]}
            >
              {({ hovered }) => (
                <>
                  <NavIcon
                    type="download"
                    color={hovered ? COLORS.background : COLORS.primary}
                  />
                  <Text
                    style={[
                      styles.mobileDownloadText,
                      hovered && styles.downloadButtonTextHovered,
                    ]}
                  >
                    CV
                  </Text>
                </>
              )}
            </Pressable>

            <Pressable
              onPress={() => setMenuOpen((prev) => !prev)}
              style={({ hovered, pressed }) => [
                styles.menuToggleBtn,
                (hovered || menuOpen) && styles.menuToggleBtnActive,
                pressed && styles.buttonPressed,
              ]}
            >
              <NavIcon
                type={menuOpen ? 'close' : 'menu'}
                color={menuOpen ? COLORS.primary : COLORS.textPrimary}
              />
            </Pressable>
          </View>
        )}
      </View>

      {/* Mobile dropdown navigation menu */}
      {isMobile && menuOpen ? (
        <View style={styles.mobileMenu}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => handleNavPress(item.id)}
                style={({ hovered }) => [
                  styles.mobileMenuItem,
                  (isActive || hovered) && styles.mobileMenuItemActive,
                ]}
              >
                <Text
                  style={[
                    styles.mobileMenuText,
                    isActive && styles.mobileMenuTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}

          <Pressable
            onPress={handleDownloadResume}
            style={({ pressed }) => [
              styles.mobileMenuDownload,
              pressed && styles.buttonPressed,
            ]}
          >
            <NavIcon type="download" color={COLORS.background} />
            <Text style={styles.mobileMenuDownloadText}>Download Resume</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const webTransition =
  Platform.OS === 'web'
    ? { transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer' }
    : {};

const styles = StyleSheet.create({
  navbarWrapper: {
    width: '100%',
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(56, 189, 248, 0.18)',
    alignItems: 'center',
    ...(Platform.OS === 'web'
      ? {
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }
      : {}),
  },
  navbarContainer: {
    width: '100%',
    maxWidth: SIZES.maxWidth,
    height: SIZES.navHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoBadge: {
    paddingHorizontal: SPACING.sm + 4,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    ...webTransition,
  },
  logoBadgeHovered: {
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    borderColor: COLORS.primary,
    transform: [{ scale: 1.05 }],
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 0 16px rgba(56, 189, 248, 0.35)' }
      : {}),
  },
  logoText: {
    color: COLORS.primary,
    fontSize: SIZES.body + 2,
    fontWeight: FONTS.weightBold,
    letterSpacing: 1.2,
  },
  desktopNavGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  navLinkButton: {
    paddingHorizontal: SPACING.sm + 4,
    paddingVertical: SPACING.xs + 2,
    borderRadius: 8,
    ...webTransition,
  },
  navLinkButtonHovered: {
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    transform: [{ translateY: -1 }],
  },
  navLinkInner: {
    alignItems: 'center',
  },
  navLinkText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body - 1,
    fontWeight: FONTS.weightBold,
    ...webTransition,
  },
  navLinkTextActive: {
    color: COLORS.primary,
  },
  activeBar: {
    height: 2,
    width: 0,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    marginTop: 4,
    ...webTransition,
  },
  activeBarVisible: {
    width: '100%',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs + 2,
    paddingHorizontal: SPACING.md + 2,
    paddingVertical: SPACING.xs + 4,
    borderRadius: SIZES.borderRadius,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    ...webTransition,
  },
  downloadButtonHovered: {
    backgroundColor: COLORS.primary,
    transform: [{ translateY: -2 }],
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 8px 20px -4px rgba(56, 189, 248, 0.5)' }
      : {}),
  },
  downloadButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.body - 1,
    fontWeight: FONTS.weightBold,
    ...webTransition,
  },
  downloadButtonTextHovered: {
    color: COLORS.background,
  },
  buttonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  mobileActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  mobileDownloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: SPACING.sm + 4,
    paddingVertical: 6,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    ...webTransition,
  },
  mobileDownloadText: {
    color: COLORS.primary,
    fontSize: SIZES.body - 2,
    fontWeight: FONTS.weightBold,
  },
  menuToggleBtn: {
    width: 40,
    height: 40,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...webTransition,
  },
  menuToggleBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  mobileMenu: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    gap: SPACING.xs,
    ...SHADOWS.card,
  },
  mobileMenuItem: {
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.md,
    borderRadius: SIZES.borderRadius,
    ...webTransition,
  },
  mobileMenuItemActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
  },
  mobileMenuText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    fontWeight: FONTS.weightBold,
  },
  mobileMenuTextActive: {
    color: COLORS.primary,
  },
  mobileMenuDownload: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs + 2,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
    paddingVertical: SPACING.sm + 4,
    marginTop: SPACING.xs,
  },
  mobileMenuDownloadText: {
    color: COLORS.background,
    fontSize: SIZES.body,
    fontWeight: FONTS.weightBold,
  },
});