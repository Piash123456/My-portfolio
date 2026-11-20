
import { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Pressable, Animated, Platform, Linking, Image } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS, ANIMATIONS } from '../theme/theme';
import FadeInView from './FadeInView';
import PremiumButton from './PremiumButton'; 

// Project data with GitHub links and theme-matched images
const PROJECT_DATA = [
  { 
    id: 1, 
    title: 'SpeakUp', 
    description: 'A real-time mobile chat application built with Flutter featuring a smooth and responsive UI.', 
    tags: ['Flutter', 'Dart', 'Firebase'], 
    github: 'https://github.com/Piash123456/Speakup-Chatapp',
    image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=600&q=80'
  },
  { 
    id: 2, 
    title: 'LinkUp', 
    description: 'Social media web app featuring mutual friend filters, custom notification management, and restricted feed visibility.', 
    tags: ['React Native Web', 'Vite', 'Firebase'], 
    github: 'https://github.com/Piash123456/React-native-site-practise',
    image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=600&q=80'
  },
  { 
    id: 3, 
    title: 'LifeOS', 
    description: 'A comprehensive lifestyle and productivity management application aimed at organizing daily routines and tasks.', 
    tags: ['React Native', 'Mobile Dev'], 
    github: 'https://github.com/Piash123456/LifeOS',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&q=80'
  },
  { 
    id: 4, 
    title: 'blueWear Store', 
    description: 'E-commerce platform incorporating custom Firestore security rules, cart constraints, and guest checkout options.', 
    tags: ['React', 'Firestore'], 
    github: 'https://github.com/Piash123456/ecommerce-web-clothing-store',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80'
  },
  { 
    id: 5, 
    title: 'Weather App', 
    description: 'Weather application utilizing Riverpod for state management, Geolocator for auto-tracking, and OpenWeather API.', 
    tags: ['Flutter', 'Riverpod', 'API'], 
    github: 'https://github.com/Piash123456/weather-app-flutter',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&q=80'
  },
  { 
    id: 6, 
    title: 'Dropout Predictor', 
    description: 'Academic research on student dropout prediction using machine learning classifiers (XGBoost, LSTM) and SHAP explainability.', 
    tags: ['Python', 'Machine Learning'], 
    github: 'https://github.com/Piash123456/Student-Dropout-Prediction',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'
  }
];

// Safe hover wrapper for project cards
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

  // Opens external GitHub repository links in a new tab on web
  const openGitHubLink = (url) => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url);
    }
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
              style={[styles.cardWrapper, { width: getCardWidth() }]}
            >
              <HoverCard style={styles.cardOuter}>
                
                {/* Project thumbnail image */}
                <Image 
                  source={{ uri: project.image }} 
                  style={styles.cardImage}
                  resizeMode="cover"
                />

                {/* Project content container with space-between to align buttons at the bottom */}
                <View style={styles.cardContent}>
                  <View>
                    <Text style={styles.cardTitle}>{project.title}</Text>
                    <Text style={styles.cardDescription}>{project.description}</Text>
                    
                    <View style={styles.tagsContainer}>
                      {project.tags.map((tag, idx) => (
                        <View key={idx} style={styles.tagBadge}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.cardActions}>
                    <PremiumButton 
                      title="View Source" 
                      variant="secondary"
                      onPress={() => openGitHubLink(project.github)}
                    />
                  </View>
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
    paddingTop: SIZES.navHeight + SPACING.lg,
  },
  sectionContainer: { width: '100%', marginBottom: SPACING.xxl },
  sectionTitle: { color: COLORS.textPrimary, fontWeight: FONTS.weightBold, marginBottom: SPACING.xl, textAlign: 'center' },
  
  // alignItems: 'stretch' forces all cards in a row to match the tallest card's height
  gridContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    alignItems: 'stretch',
    width: '100%' 
  },
  cardWrapper: {
    marginBottom: SPACING.lg,
    alignSelf: 'stretch',
  },
  cardOuter: { 
    flex: 1,
    borderRadius: SIZES.borderRadius, 
    borderWidth: SIZES.borderWidth, 
    backgroundColor: COLORS.surface, 
    ...SHADOWS.card, 
    width: '100%',
    overflow: 'hidden' 
  },
  cardInner: { 
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  cardImage: {
    width: '100%',
    height: 180, 
    backgroundColor: COLORS.border,
  },
  cardContent: {
    padding: SPACING.lg,
    flex: 1, 
    justifyContent: 'space-between',
  },
  
  cardTitle: { color: COLORS.textPrimary, fontSize: SIZES.title, fontWeight: FONTS.weightBold, marginBottom: SPACING.sm },
  cardDescription: { color: COLORS.textSecondary, fontSize: SIZES.body, lineHeight: 22, marginBottom: SPACING.md },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: SPACING.md },
  tagBadge: { backgroundColor: COLORS.background, paddingVertical: SPACING.xs, paddingHorizontal: SPACING.sm, borderRadius: SIZES.borderRadius, marginRight: SPACING.sm, marginBottom: SPACING.sm, borderWidth: SIZES.borderWidth, borderColor: COLORS.border },
  tagText: { color: COLORS.primary, fontSize: SIZES.body - 2 },
  cardActions: { flexDirection: 'row', paddingTop: SPACING.md, width: '100%' },
});