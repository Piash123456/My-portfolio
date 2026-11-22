
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Platform,
} from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS } from '../theme/theme';
import FadeInView from './FadeInView';

// Lightweight inline SVG icons for Quick Facts items (no external icon library required)
const FactIcon = ({ type, color }) => {
  const props = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'education':
      return (
        <svg {...props}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case 'university':
      return (
        <svg {...props}>
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" />
          <path d="M16 6h.01" />
          <path d="M12 6h.01" />
          <path d="M12 10h.01" />
          <path d="M12 14h.01" />
          <path d="M16 10h.01" />
          <path d="M16 14h.01" />
          <path d="M8 10h.01" />
          <path d="M8 14h.01" />
        </svg>
      );
    case 'specialization':
      return (
        <svg {...props}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'research':
      return (
        <svg {...props}>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case 'location':
      return (
        <svg {...props}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    default:
      return null;
  }
};

// Structured profile highlights displayed in the Quick Facts card
const QUICK_FACTS = [
  {
    id: 1,
    type: 'education',
    label: 'EDUCATION',
    value: 'B.Sc. in CSE (Final Year)',
  },
  {
    id: 2,
    type: 'university',
    label: 'UNIVERSITY',
    value: 'Daffodil International University',
  },
  {
    id: 3,
    type: 'specialization',
    label: 'SPECIALIZATION',
    value: 'Mobile & Web Development',
  },
  {
    id: 4,
    type: 'research',
    label: 'RESEARCH',
    value: 'Machine Learning & Dropout Prediction',
  },
  {
    id: 5,
    type: 'location',
    label: 'LOCATION',
    value: 'Mirpur, Dhaka',
  },
];

export default function About() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  return (
    <View
      style={[
        styles.fullScreenWrapper,
        { minHeight: isMobile ? undefined : height },
      ]}
    >
      <View style={styles.sectionContainer}>
        {/* Section title */}
        <FadeInView delay={100} style={styles.headerWrapper}>
          <Text
            style={[
              styles.sectionTitle,
              { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb },
            ]}
          >
            About Me
          </Text>
          <View style={styles.titleAccentLine} />
        </FadeInView>

        <View
          style={[
            styles.contentRow,
            { flexDirection: isMobile ? 'column' : 'row' },
          ]}
        >
          {/* Left column: personal bio and academic focus */}
          <FadeInView
            delay={200}
            style={[
              styles.bioColumn,
              {
                width: isMobile ? '100%' : '54%',
                marginRight: isMobile ? 0 : SPACING.xl,
                marginBottom: isMobile ? SPACING.xl : 0,
              },
            ]}
          >
            <Text style={styles.paragraph}>
              Hello! I&apos;m{' '}
              <Text style={styles.highlight}>Md. Shazzadur Rahman Piash</Text>, a
              final-year Computer Science and Engineering (CSE) student at
              Daffodil International University.
            </Text>

            <Text style={styles.paragraph}>
              I&apos;m passionate about building modern, responsive, and
              user-friendly applications. My primary interests include mobile
              and web development, with hands-on experience in{' '}
              <Text style={styles.highlight}>Flutter</Text> and{' '}
              <Text style={styles.highlight}>React Native</Text>.
            </Text>

            <Text style={styles.paragraph}>
              I enjoy solving real-world problems through technology, writing
              clean and maintainable code, and exploring new tools and
              technologies. Alongside development, I&apos;m currently working on
              my final-year thesis focused on{' '}
              <Text style={styles.highlight}>Machine Learning</Text> and{' '}
              <Text style={styles.highlight}>Student Dropout Prediction</Text>.
            </Text>

            <Text style={styles.paragraphLast}>
              My goal is to grow as a Software Developer, continuously improve
              my technical skills, and build impactful digital solutions.
            </Text>
          </FadeInView>

          {/* Right column: interactive Quick Facts card */}
          <FadeInView
            delay={320}
            style={[
              styles.factsColumn,
              { width: isMobile ? '100%' : '42%' },
            ]}
          >
            <Pressable
              style={({ hovered }) => [
                styles.factsCard,
                hovered && styles.factsCardHovered,
              ]}
            >
              <Text style={styles.factsTitle}>Quick Facts</Text>

              <View style={styles.factsList}>
                {QUICK_FACTS.map((fact) => (
                  <Pressable
                    key={fact.id}
                    style={({ hovered }) => [
                      styles.factItem,
                      hovered && styles.factItemHovered,
                    ]}
                  >
                    {({ hovered }) => (
                      <>
                        <View
                          style={[
                            styles.factIconBox,
                            hovered && styles.factIconBoxHovered,
                          ]}
                        >
                          <FactIcon type={fact.type} color={COLORS.primary} />
                        </View>
                        <View style={styles.factTextGroup}>
                          <Text style={styles.factLabel}>{fact.label}</Text>
                          <Text style={styles.factValue}>{fact.value}</Text>
                        </View>
                      </>
                    )}
                  </Pressable>
                ))}
              </View>
            </Pressable>
          </FadeInView>
        </View>
      </View>
    </View>
  );
}

const webTransition =
  Platform.OS === 'web'
    ? { transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)' }
    : {};

const styles = StyleSheet.create({
  fullScreenWrapper: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: SIZES.navHeight + SPACING.lg,
  },
  sectionContainer: {
    width: '100%',
    marginBottom: SPACING.xxl,
  },
  headerWrapper: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weightBold,
    marginBottom: SPACING.xs + 2,
    textAlign: 'center',
  },
  titleAccentLine: {
    width: 64,
    height: 3,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  contentRow: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bioColumn: {
    justifyContent: 'center',
  },
  paragraph: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    lineHeight: 26,
    marginBottom: SPACING.md + 2,
  },
  paragraphLast: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    lineHeight: 26,
  },
  highlight: {
    color: COLORS.primary,
    fontWeight: FONTS.weightBold,
  },
  factsColumn: {
    justifyContent: 'center',
  },
  factsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius + 2,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.border,
    padding: SPACING.xl,
    ...SHADOWS.card,
    ...webTransition,
  },
  factsCardHovered: {
    borderColor: COLORS.primary,
    transform: [{ translateY: -4 }],
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 14px 30px -10px rgba(56, 189, 248, 0.28)' }
      : {}),
  },
  factsTitle: {
    color: COLORS.primary,
    fontSize: SIZES.title + 2,
    fontWeight: FONTS.weightBold,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  factsList: {
    gap: SPACING.xs + 2,
  },
  factItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs + 4,
    paddingHorizontal: SPACING.sm,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: 'transparent',
    ...webTransition,
    ...(Platform.OS === 'web' ? { cursor: 'default' } : {}),
  },
  factItemHovered: {
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderColor: 'rgba(56, 189, 248, 0.22)',
    transform: [{ translateX: 5 }],
  },
  factIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    ...webTransition,
  },
  factIconBoxHovered: {
    backgroundColor: 'rgba(56, 189, 248, 0.18)',
    borderColor: COLORS.primary,
  },
  factTextGroup: {
    flex: 1,
  },
  factLabel: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body - 4,
    fontWeight: FONTS.weightBold,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  factValue: {
    color: COLORS.textPrimary,
    fontSize: SIZES.body - 1,
    fontWeight: FONTS.weightBold,
  },
});