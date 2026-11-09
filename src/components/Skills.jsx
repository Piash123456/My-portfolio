
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS } from '../theme/theme';

// Real-world skills data categorized
const SKILL_CATEGORIES = [
  {
    id: 1,
    title: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Dart', 'Python', 'HTML & CSS'],
  },
  {
    id: 2,
    title: 'Frameworks',
    skills: ['React Native', 'React.js', 'Flutter', 'Expo', 'Vite'],
  },
  {
    id: 3,
    title: 'Tools & Backend',
    skills: ['Firebase', 'Git & GitHub', 'Riverpod', 'Firestore', 'Figma'],
  }
];

export default function Skills() {
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  return (
    <View style={styles.sectionContainer}>
      
      <Text style={[styles.sectionTitle, { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb }]}>
        My Skills
      </Text>

      {/* Grid for Skill Categories */}
      <View 
        style={[
          styles.gridContainer, 
          // Show column on mobile, row on web
          { flexDirection: isMobile ? 'column' : 'row' }
        ]}
      >
        {SKILL_CATEGORIES.map((category) => (
          <View 
            key={category.id} 
            style={[
              styles.skillCard, 
              // Full width on mobile, 31% (3 columns) on web
              { width: isMobile ? '100%' : '31%' }
            ]}
          >
            <Text style={styles.cardTitle}>{category.title}</Text>
            
            <View style={styles.skillsList}>
              {category.skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    marginTop: SPACING.xxl * 1.5,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weightBold,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  gridContainer: {
    justifyContent: 'space-between',
    width: '100%',
  },
  skillCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: SIZES.borderRadius,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
    ...SHADOWS.card,
  },
  cardTitle: {
    color: COLORS.primary,
    fontSize: SIZES.title,
    fontWeight: FONTS.weightBold,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  skillBadge: {
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: SIZES.borderRadius,
    margin: SPACING.xs,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.border,
  },
  skillText: {
    color: COLORS.textPrimary,
    fontSize: SIZES.body,
  }
});