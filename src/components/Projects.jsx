
import { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Platform,
  Linking,
} from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS } from '../theme/theme';
import FadeInView from './FadeInView';

// Featured projects list with updated BlueWear Store stack and SpeakUp placed last
const PROJECTS = [
  {
    id: 1,
    title: 'LinkUp',
    description:
      'Social media web app featuring mutual friend filters, custom notification management, and restricted feed visibility.',
    tags: ['React Native Web', 'Vite', 'Firebase'],
    image:
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    repoUrl: 'https://github.com/Piash123456/LinkUp-social-app',
  },
  {
    id: 2,
    title: 'LifeOS',
    description:
      'A comprehensive lifestyle and productivity management application aimed at organizing daily routines and tasks.',
    tags: ['React Native', 'Mobile Dev', 'Firebase'],
    image:
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
    repoUrl: 'https://github.com/Piash123456',
  },
  {
    id: 3,
    title: 'BlueWear Store',
    description:
      'An e-commerce clothing platform with dynamic product variant selection, real-time cart, guest checkout, and order filtering.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    repoUrl: 'https://github.com/Piash123456/ecommerce-web-clothing-store',
  },
  {
    id: 4,
    title: 'Weather App',
    description:
      'Cross-platform weather forecast app with automatic GPS location tracking, Riverpod state management, and OpenWeather API.',
    tags: ['Flutter', 'Riverpod', 'Dio'],
    image:
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80',
    repoUrl: 'https://github.com/Piash123456',
  },
  {
    id: 5,
    title: 'Student Dropout Prediction',
    description:
      'Final-year thesis benchmarking XGBoost, Random Forest, KNN, and LSTM models with SHAP explainability to identify at-risk students.',
    tags: ['Python', 'XGBoost', 'SHAP'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    repoUrl: 'https://github.com/Piash123456',
  },
  {
    id: 6,
    title: 'SpeakUp',
    description:
      'A real-time mobile chat application built with Flutter featuring a smooth and responsive UI.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    repoUrl: 'https://github.com/Piash123456',
  },
];

// Reusable animated project card component
function ProjectCard({ project, onOpenRepo }) {
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <Pressable
      onHoverIn={() => setIsCardHovered(true)}
      onHoverOut={() => setIsCardHovered(false)}
      style={[styles.card, isCardHovered && styles.cardHovered]}
    >
      {/* Project cover image with subtle zoom on card hover */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: project.image }}
          style={[
            styles.cardImage,
            isCardHovered && styles.cardImageHovered,
          ]}
          resizeMode="cover"
        />
      </View>

      {/* Card content body */}
      <View style={styles.cardBody}>
        <View>
          <Text
            style={[
              styles.cardTitle,
              isCardHovered && styles.cardTitleHovered,
            ]}
          >
            {project.title}
          </Text>
          <Text style={styles.cardDescription}>{project.description}</Text>

          {/* Technology stack badges */}
          <View style={styles.tagsContainer}>
            {project.tags.map((tag) => (
              <View
                key={tag}
                style={[
                  styles.tagBadge,
                  isCardHovered && styles.tagBadgeHovered,
                ]}
              >
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Animated action button aligned to the bottom of the card */}
        <Pressable
          onPress={() => onOpenRepo(project.repoUrl)}
          style={({ hovered, pressed }) => [
            styles.sourceButton,
            hovered && styles.sourceButtonHovered,
            pressed && styles.sourceButtonPressed,
          ]}
        >
          {({ hovered }) => (
            <Text
              style={[
                styles.sourceButtonText,
                hovered && styles.sourceButtonTextHovered,
              ]}
            >
              View Source →
            </Text>
          )}
        </Pressable>
      </View>
    </Pressable>
  );
}

export default function Projects() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;
  const isTablet = width >= BREAKPOINTS.tablet && width < 1024;

  // Calculate responsive card width based on viewport size
  const cardWidth = isMobile ? '100%' : isTablet ? '48%' : '31.5%';

  // Open GitHub repository links safely on web and mobile
  const openRepository = (url) => {
    if (!url) return;
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url);
    }
  };

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
            Featured Projects
          </Text>
          <View style={styles.titleAccentLine} />
        </FadeInView>

        {/* Responsive project cards grid */}
        <View style={styles.gridContainer}>
          {PROJECTS.map((project, index) => (
            <FadeInView
              key={project.id}
              delay={140 + index * 70}
              style={[styles.cardWrapper, { width: cardWidth }]}
            >
              <ProjectCard project={project} onOpenRepo={openRepository} />
            </FadeInView>
          ))}
        </View>
      </View>
    </View>
  );
}

const webTransition =
  Platform.OS === 'web'
    ? { transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)' }
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
  gridContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  cardWrapper: {
    marginBottom: SPACING.xl,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius + 2,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...SHADOWS.card,
    ...webTransition,
    ...(Platform.OS === 'web' ? { cursor: 'default' } : {}),
  },
  cardHovered: {
    borderColor: COLORS.primary,
    transform: [{ translateY: -6 }],
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 16px 32px -10px rgba(56, 189, 248, 0.3)' }
      : {}),
  },
  imageContainer: {
    width: '100%',
    height: 185,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    ...webTransition,
  },
  cardImageHovered: {
    transform: [{ scale: 1.06 }],
  },
  cardBody: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: SIZES.title + 1,
    fontWeight: FONTS.weightBold,
    marginBottom: SPACING.sm,
    ...webTransition,
  },
  cardTitleHovered: {
    color: COLORS.primary,
  },
  cardDescription: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body - 1,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.lg,
  },
  tagBadge: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: 4,
    marginRight: SPACING.xs + 2,
    marginBottom: SPACING.xs + 2,
    ...webTransition,
  },
  tagBadgeHovered: {
    borderColor: 'rgba(56, 189, 248, 0.45)',
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
  },
  tagText: {
    color: COLORS.primary,
    fontSize: SIZES.body - 3,
    fontWeight: FONTS.weightBold,
  },
  sourceButton: {
    alignSelf: 'flex-start',
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    backgroundColor: 'rgba(56, 189, 248, 0.05)',
    ...webTransition,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' } : {}),
  },
  sourceButtonHovered: {
    backgroundColor: COLORS.primary,
    transform: [{ translateY: -2 }],
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 8px 20px -6px rgba(56, 189, 248, 0.5)' }
      : {}),
  },
  sourceButtonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  sourceButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.body - 1,
    fontWeight: FONTS.weightBold,
    ...webTransition,
  },
  sourceButtonTextHovered: {
    color: COLORS.background,
  },
});