
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

// Lightweight inline SVG icons for each skill category
const CategoryIcon = ({ type, color }) => {
  const props = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'mobile':
      return (
        <svg {...props}>
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      );
    case 'web':
      return (
        <svg {...props}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'backend':
      return (
        <svg {...props}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14a9 3 0 0 0 18 0V5" />
          <path d="M3 12a9 3 0 0 0 18 0" />
        </svg>
      );
    case 'state':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v6" />
          <path d="M12 15v6" />
          <path d="m4.2 7.5 5.2 3" />
          <path d="m14.6 13.5 5.2 3" />
          <path d="m19.8 7.5-5.2 3" />
          <path d="m9.4 13.5-5.2 3" />
        </svg>
      );
    case 'tools':
      return (
        <svg {...props}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    default:
      return null;
  }
};

// Categorized technical skills aligned with mobile, web, backend, and tooling stack
const SKILL_CATEGORIES = [
  {
    id: 1,
    title: 'Mobile Development',
    icon: 'mobile',
    skills: ['Flutter', 'Dart', 'React Native', 'React Native Web', 'Expo'],
  },
  {
    id: 2,
    title: 'Web & Frontend',
    icon: 'web',
    skills: ['React.js', 'JavaScript', 'TypeScript', 'Vite', 'HTML5', 'CSS3'],
  },
  {
    id: 3,
    title: 'Backend & Cloud',
    icon: 'backend',
    skills: ['Firebase Auth', 'Cloud Firestore', 'Realtime Database', 'Supabase', 'REST APIs'],
  },
  {
    id: 4,
    title: 'State & Networking',
    icon: 'state',
    skills: ['Riverpod', 'GoRouter', 'Dio', 'Geolocator', 'Responsive UI'],
  },
  {
    id: 5,
    title: 'Tools & Deployment',
    icon: 'tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Netlify', 'Jupyter Notebook'],
  },
];

export default function Skills() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;
  const isTablet = width >= BREAKPOINTS.tablet && width < 1024;

  // Responsive card width for a balanced 3+2 centered layout on desktop
  const cardWidth = isMobile ? '100%' : isTablet ? '47%' : '31%';

  return (
    <View
      style={[
        styles.fullScreenWrapper,
        { minHeight: isMobile ? undefined : height },
      ]}
    >
      <View style={styles.sectionContainer}>
        {/* Section header */}
        <FadeInView delay={100} style={styles.headerWrapper}>
          <Text
            style={[
              styles.sectionTitle,
              { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb },
            ]}
          >
            Technical Expertise
          </Text>
          <View style={styles.titleAccentLine} />
          <Text style={styles.sectionSubtitle}>
            Technologies and tools I use to build cross-platform mobile apps and
            modern, responsive web interfaces.
          </Text>
        </FadeInView>

        {/* Responsive centered grid of animated skill cards */}
        <View style={styles.gridContainer}>
          {SKILL_CATEGORIES.map((category, index) => (
            <FadeInView
              key={category.id}
              delay={140 + index * 70}
              style={[styles.cardWrapper, { width: cardWidth }]}
            >
              <Pressable
                style={({ hovered }) => [
                  styles.card,
                  hovered && styles.cardHovered,
                ]}
              >
                {/* Card header with icon badge and category title */}
                <View style={styles.cardHeader}>
                  <View style={styles.iconBox}>
                    <CategoryIcon type={category.icon} color={COLORS.primary} />
                  </View>
                  <Text style={styles.cardTitle}>{category.title}</Text>
                </View>

                {/* Interactive skill badges */}
                <View style={styles.skillsWrap}>
                  {category.skills.map((skill) => (
                    <Pressable
                      key={skill}
                      style={({ hovered }) => [
                        styles.skillPill,
                        hovered && styles.skillPillHovered,
                      ]}
                    >
                      {({ hovered }) => (
                        <Text
                          style={[
                            styles.skillText,
                            hovered && styles.skillTextHovered,
                          ]}
                        >
                          {skill}
                        </Text>
                      )}
                    </Pressable>
                  ))}
                </View>
              </Pressable>
            </FadeInView>
          ))}
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
    marginBottom: SPACING.md,
  },
  sectionSubtitle: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 600,
  },
  gridContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: SPACING.lg,
  },
  cardWrapper: {
    display: 'flex',
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius + 2,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    ...SHADOWS.card,
    ...webTransition,
  },
  cardHovered: {
    borderColor: COLORS.primary,
    transform: [{ translateY: -5 }],
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 14px 28px -10px rgba(56, 189, 248, 0.28)' }
      : {}),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: SIZES.borderRadius,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: SIZES.title,
    fontWeight: FONTS.weightBold,
    flex: 1,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs + 2,
  },
  skillPill: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm + 4,
    paddingVertical: 6,
    ...webTransition,
    ...(Platform.OS === 'web' ? { cursor: 'default' } : {}),
  },
  skillPillHovered: {
    backgroundColor: 'rgba(56, 189, 248, 0.14)',
    borderColor: COLORS.primary,
    transform: [{ translateY: -2 }],
  },
  skillText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body - 2,
    fontWeight: FONTS.weightBold,
  },
  skillTextHovered: {
    color: COLORS.primary,
  },
});