// src/components/Skills.jsx
import { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Pressable, Animated, Platform, Image } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS, ANIMATIONS } from '../theme/theme';
import FadeInView from './FadeInView';

// High-Quality URL-Encoded SVG Icons
const ICONS = {
  languages: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2338BDF8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%2216%2018%2022%2012%2016%206%22%3E%3C%2Fpolyline%3E%3Cpolyline%20points%3D%228%206%202%2012%208%2018%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E',
  frameworks: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2338BDF8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Crect%20x%3D%223%22%20y%3D%223%22%20width%3D%2218%22%20height%3D%2218%22%20rx%3D%222%22%20ry%3D%222%22%3E%3C%2Frect%3E%3Cline%20x1%3D%223%22%20y1%3D%229%22%20x2%3D%2221%22%20y2%3D%229%22%3E%3C%2Fline%3E%3Cline%20x1%3D%229%22%20y1%3D%2221%22%20x2%3D%229%22%20y2%3D%229%22%3E%3C%2Fline%3E%3C%2Fsvg%3E',
  backend: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2338BDF8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cellipse%20cx%3D%2212%22%20cy%3D%225%22%20rx%3D%229%22%20ry%3D%223%22%3E%3C%2Fellipse%3E%3Cpath%20d%3D%22M21%2012c0%201.66-4%203-9%203s-9-1.34-9-3%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M3%205v14c0%201.66%204%203%209%203s9-1.34%209-3V5%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E'
};

const SKILLS_DATA = [
  {
    id: 1,
    title: 'Languages',
    description: 'Writing clean, scalable, and efficient code to build robust logic and algorithms for my cross-platform applications.',
    icon: ICONS.languages,
    skills: ['JavaScript', 'Dart', 'Python', 'HTML & CSS'],
  },
  {
    id: 2,
    title: 'Frameworks',
    description: 'Crafting highly interactive, beautiful, and consistent user interfaces using modern component-driven tools.',
    icon: ICONS.frameworks,
    skills: ['React Native', 'Flutter', 'Expo', 'Vite'],
  },
  {
    id: 3,
    title: 'Tools & Backend',
    description: 'Architecting secure databases, managing real-time states, and maintaining seamless version control across teams.',
    icon: ICONS.backend,
    skills: ['Firebase', 'Git & GitHub', 'Riverpod', 'Firestore', 'Figma'],
  }
];

const HoverSkillCard = ({ children, style }) => {
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

export default function Skills() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  const getCardWidth = () => {
    if (isMobile) return '100%';
    return '31%';
  };

  return (
    <View style={[styles.fullScreenWrapper, { minHeight: height }]}>
      <View style={styles.sectionContainer}>
        
        {/* Updated Animated Title */}
        <FadeInView delay={100}>
          <Text style={[styles.sectionTitle, { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb }]}>
            My Expertise
          </Text>
        </FadeInView>

        <View style={[styles.gridContainer, { flexDirection: isMobile ? 'column' : 'row' }]}>
          {SKILLS_DATA.map((category, index) => (
            <FadeInView 
              key={category.id} 
              delay={300 + (index * 150)} 
              style={{ width: getCardWidth(), marginBottom: isMobile ? SPACING.lg : 0 }}
            >
              <HoverSkillCard style={styles.cardOuter}>
                
                <View style={styles.iconCircle}>
                  <Image source={{ uri: category.icon }} style={styles.iconImage} resizeMode="contain" />
                </View>

                <Text style={styles.cardTitle}>{category.title}</Text>
                <Text style={styles.cardDescription}>{category.description}</Text>
                
                <View style={styles.divider} />

                <View style={styles.skillsWrapper}>
                  {category.skills.map((skill, idx) => (
                    <View key={idx} style={styles.skillBadge}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>

              </HoverSkillCard>
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
  sectionContainer: { 
    width: '100%', 
    marginBottom: SPACING.xxl 
  },
  sectionTitle: { 
    color: COLORS.textPrimary, 
    fontWeight: FONTS.weightBold, 
    marginBottom: SPACING.xxl, 
    textAlign: 'center' 
  },
  gridContainer: { 
    justifyContent: 'space-between', 
    alignItems: 'stretch',
    width: '100%' 
  },
  cardOuter: { 
    borderRadius: SIZES.borderRadius * 1.5, 
    borderWidth: SIZES.borderWidth, 
    backgroundColor: COLORS.surface, 
    ...SHADOWS.card, 
    width: '100%',
    height: '100%' 
  },
  cardInner: { 
    padding: SPACING.xl, 
    height: '100%', 
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconImage: { width: 28, height: 28 },
  cardTitle: { 
    color: COLORS.primary, 
    fontSize: SIZES.title, 
    fontWeight: FONTS.weightBold, 
    marginBottom: SPACING.sm,
    textAlign: 'center'
  },
  cardDescription: { color: COLORS.textSecondary, fontSize: SIZES.body, lineHeight: 22, textAlign: 'center', marginBottom: SPACING.lg },
  divider: { width: '50%', height: 1, backgroundColor: COLORS.border, marginBottom: SPACING.lg },
  skillsWrapper: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: SPACING.sm },
  skillBadge: { backgroundColor: COLORS.background, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md, borderRadius: SIZES.borderRadius, borderWidth: SIZES.borderWidth, borderColor: COLORS.border },
  skillText: { color: COLORS.textPrimary, fontSize: SIZES.body - 1, fontWeight: '500' }
});