// src/components/Projects.jsx
import { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Pressable, Animated, Platform, Linking } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS, ANIMATIONS } from '../theme/theme';
import FadeInView from './FadeInView';
import PremiumButton from './PremiumButton'; 

// Updated with your actual projects and GitHub links
const PROJECT_DATA = [
  { id: 1, title: 'Speakup', description: 'A mobile application built with Flutter featuring smooth UI.', tags: ['Flutter', 'Dart'], github: 'https://github.com/Piash123456/Speakup' },
  { id: 2, title: 'LinkUp', description: 'Social media web app featuring mutual friend filters and custom notifications.', tags: ['React Native Web', 'Vite', 'Firebase'], github: 'https://github.com/Piash123456/LinkUp-social-app' },
  { id: 3, title: 'Weather App', description: 'Weather app using Riverpod, Geolocator for auto-tracking, and OpenWeather API.', tags: ['Flutter', 'Riverpod'], github: 'https://github.com/Piash123456/weather-app-flutter' },
  { id: 4, title: 'ML Predictor', description: 'Final-year research on university student dropout prediction using XGBoost and LSTM.', tags: ['Python', 'Machine Learning'], github: 'https://github.com/Piash123456' },
  { id: 5, title: 'blueWear Store', description: 'E-commerce platform with custom Firestore security rules and guest checkout.', tags: ['React', 'Firestore'], github: 'https://github.com/Piash123456' },
  { id: 6, title: 'Secret Word', description: 'Multiplayer mobile game utilizing feature-first clean architecture.', tags: ['Flutter', 'Firebase'], github: 'https://github.com/Piash123456' }
];

const HoverCard = ({ children, style }) => {
  const [hoverAnim] = useState(() => new Animated.Value(0)); 

  const handleHoverIn = () => Animated.spring(hoverAnim, { toValue: 1, tension: ANIMATIONS.hoverTension, friction: ANIMATIONS.hoverFriction, useNativeDriver: false }).start();
  const handleHoverOut = () => Animated.spring(hoverAnim, { toValue: 0, tension: ANIMATIONS.hoverTension, friction: ANIMATIONS.hoverFriction, useNativeDriver: false }).start();

  const animatedStyle = {
    transform: [
      { translateY: hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -8] }) }, 
      { scale: hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.02] }) } 
    ],
    shadowOpacity: hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.6] }),
    borderColor: hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [COLORS.border, COLORS.primary] }),
  };

  return (
    <Animated.View style={[style, animatedStyle]}>
      <Pressable 
        onHoverIn={Platform.OS === 'web' ? handleHoverIn : null} 
        onHoverOut={Platform.OS === 'web' ? handleHoverOut : null}
        style={styles.cardInner}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

export default function Projects() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;
  const isLargeWeb = width > 1000; 

  const getCardWidth = () => {
    if (isMobile) return '100%';
    if (isLargeWeb) return '31%'; 
    return '48%'; 
  };

  return (
    <View style={[styles.fullScreenWrapper, { minHeight: height }]}>
      <View style={styles.sectionContainer}>
        <FadeInView delay={100}>
          <Text style={[styles.sectionTitle, { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb }]}>
            Featured Projects
          </Text>
        </FadeInView>

        <View style={styles.gridContainer}>
          {PROJECT_DATA.map((project, index) => (
            <FadeInView 
              key={project.id} 
              delay={300 + (index * 150)} 
              style={{ width: getCardWidth(), marginBottom: SPACING.lg }}
            >
              <HoverCard style={styles.cardOuter}>
                <Text style={styles.cardTitle}>{project.title}</Text>
                <Text style={styles.cardDescription}>{project.description}</Text>
                
                <View style={styles.tagsContainer}>
                  {project.tags.map((tag, idx) => (
                    <View key={idx} style={styles.tagBadge}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.cardActions}>
                  {/* Opens GitHub link directly in a new tab */}
                  <PremiumButton 
                    title="View Source" 
                    variant="secondary"
                    onPress={() => Linking.openURL(project.github)}
                    style={{ padding: SPACING.sm, width: '100%' }}
                  />
                </View>
              </HoverCard>
            </FadeInView>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenWrapper: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: SIZES.navHeight,
  },
  sectionContainer: { width: '100%', marginBottom: SPACING.xxl },
  sectionTitle: { color: COLORS.textPrimary, fontWeight: FONTS.weightBold, marginBottom: SPACING.xl, textAlign: 'center' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
  cardOuter: { borderRadius: SIZES.borderRadius, borderWidth: SIZES.borderWidth, backgroundColor: COLORS.surface, ...SHADOWS.card },
  cardInner: { padding: SPACING.lg, height: '100%' },
  cardTitle: { color: COLORS.textPrimary, fontSize: SIZES.title, fontWeight: FONTS.weightBold, marginBottom: SPACING.sm },
  cardDescription: { color: COLORS.textSecondary, fontSize: SIZES.body, lineHeight: 22, marginBottom: SPACING.md },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: SPACING.md },
  tagBadge: { backgroundColor: COLORS.background, paddingVertical: SPACING.xs, paddingHorizontal: SPACING.sm, borderRadius: SIZES.borderRadius, marginRight: SPACING.sm, marginBottom: SPACING.sm, borderWidth: SIZES.borderWidth, borderColor: COLORS.border },
  tagText: { color: COLORS.primary, fontSize: SIZES.body - 2 },
  cardActions: { flexDirection: 'row', marginTop: 'auto', paddingTop: SPACING.md },
});