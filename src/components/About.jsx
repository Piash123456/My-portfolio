
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS } from '../theme/theme';
import FadeInView from './FadeInView';

// Lightweight inline SVG icons (no external icon library required)
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
          <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
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

// Quick facts data displayed in the right-hand info card
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
    <View style={[styles.fullScreenWrapper, { minHeight: height }]}>
      <View style={styles.sectionContainer}>
        <FadeInView delay={100}>
          <Text
            style={[
              styles.sectionTitle,
              { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb },
            ]}
          >
            About Me
          </Text>
        </FadeInView>

        <View
          style={[
            styles.contentRow,
            { flexDirection: isMobile ? 'column' : 'row' },
          ]}
        >
          {/* Left column: biography paragraphs */}
          <FadeInView
            delay={250}
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
              user-friendly applications. My primary interests include mobile and
              web development, with hands-on experience in{' '}
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

            <Text style={[styles.paragraph, styles.lastParagraph]}>
              My goal is to grow as a Software Developer, continuously improve
              my technical skills, and build impactful digital solutions.
            </Text>
          </FadeInView>

          {/* Right column: quick facts card */}
          <FadeInView
            delay={400}
            style={[
              styles.factsColumn,
              { width: isMobile ? '100%' : '42%' },
            ]}
          >
            <View style={styles.factsCard}>
              <Text style={styles.factsTitle}>Quick Facts</Text>

              {QUICK_FACTS.map((fact, index) => {
                const isLast = index === QUICK_FACTS.length - 1;

                return (
                  <View
                    key={fact.id}
                    style={[
                      styles.factItem,
                      isLast && styles.factItemLast,
                    ]}
                  >
                    <View style={styles.iconCircle}>
                      <FactIcon type={fact.type} color={COLORS.primary} />
                    </View>

                    <View style={styles.factTextContainer}>
                      <Text style={styles.factLabel}>{fact.label}</Text>
                      <Text style={styles.factValue}>{fact.value}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </FadeInView>
        </View>
      </View>
    </View>
  );
}

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
  sectionTitle: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weightBold,
    marginBottom: SPACING.xl,
    textAlign: 'center',
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
    fontSize: SIZES.body + 1,
    lineHeight: 28,
    marginBottom: SPACING.lg,
  },
  lastParagraph: {
    marginBottom: 0,
  },
  highlight: {
    color: COLORS.primary,
    fontWeight: FONTS.weightBold,
  },
  factsColumn: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  factsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.primary,
    padding: SPACING.xl,
    ...SHADOWS.card,
  },
  factsTitle: {
    color: COLORS.primary,
    fontSize: SIZES.title + 2,
    fontWeight: FONTS.weightBold,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  factItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  factItemLast: {
    marginBottom: 0,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.background,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  factTextContainer: {
    flex: 1,
  },
  factLabel: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body - 3,
    fontWeight: FONTS.weightBold,
    letterSpacing: 1,
    marginBottom: 2,
  },
  factValue: {
    color: COLORS.textPrimary,
    fontSize: SIZES.body,
    fontWeight: FONTS.weightBold,
    lineHeight: 20,
  },
});