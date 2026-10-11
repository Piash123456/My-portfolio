// src/components/Projects.jsx

import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS } from '../theme/theme';

// Real-world project data
const PROJECT_DATA = [
  {
    id: 1,
    title: 'SketchGuess',
    description: 'A real-time draw-and-guess web application with dynamic room mechanics and continuous canvas drawing functions.',
    tags: ['HTML', 'CSS', 'JS', 'Canvas UI'],
  },
  {
    id: 2,
    title: 'Secret Word',
    description: 'A multiplayer mobile game built with feature-first clean architecture, state models, and real-time backend.',
    tags: ['Flutter', 'Riverpod', 'Firebase'],
  },
  {
    id: 3,
    title: 'blueWear E-Commerce',
    description: 'Clothing web store featuring checkout authentication, dynamic location-based delivery fee, and order storage.',
    tags: ['React', 'Firestore', 'GitHub'],
  },
  {
    id: 4,
    title: 'ML Dropout Predictor',
    description: 'Explainable AI models incorporating LSTM dynamic temporal learning and SHAP interpretability for academic research.',
    tags: ['Python', 'LSTM', 'SHAP'],
  }
];

export default function Projects() {
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;
  // If window is larger than 1000px, show 3 cards per row, else 2 (tablet), else 1 (mobile)
  const isLargeWeb = width > 1000; 

  // Dynamic card width calculation based on screen size
  const getCardWidth = () => {
    if (isMobile) return '100%';
    if (isLargeWeb) return '31%'; // 3 cards per row with space
    return '48%'; // 2 cards per row
  };

  return (
    <View style={styles.sectionContainer}>
      
      {/* Section Header */}
      <Text style={[styles.sectionTitle, { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb }]}>
        Featured Projects
      </Text>

      {/* Projects Grid Container */}
      <View style={styles.gridContainer}>
        {PROJECT_DATA.map((project) => (
          <View 
            key={project.id} 
            style={[styles.card, { width: getCardWidth() }]}
          >
            {/* Card Content */}
            <Text style={styles.cardTitle}>{project.title}</Text>
            <Text style={styles.cardDescription}>{project.description}</Text>
            
            {/* Tech Stack Tags */}
            <View style={styles.tagsContainer}>
              {project.tags.map((tag, index) => (
                <View key={index} style={styles.tagBadge}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>View Source</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutline]}>
                <Text style={[styles.actionBtnText, { color: COLORS.primary }]}>Live Demo</Text>
              </TouchableOpacity>
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
    marginTop: SPACING.xxl * 2, // Large gap from the Hero section
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weightBold,
    marginBottom: SPACING.xl,
    textAlign: 'center', // Center the section title
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows cards to wrap to the next line
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: SIZES.borderRadius,
    marginBottom: SPACING.lg, // Space between rows
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.border,
    ...SHADOWS.card, // Applying shadow from theme
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: SIZES.title,
    fontWeight: FONTS.weightBold,
    marginBottom: SPACING.sm,
  },
  cardDescription: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.md,
  },
  tagBadge: {
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: SIZES.borderRadius,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.border,
  },
  tagText: {
    color: COLORS.primary,
    fontSize: SIZES.body - 2, // Slightly smaller than normal text
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: 'auto', // Pushes buttons to the bottom of the card
  },
  actionBtn: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
    marginRight: SPACING.sm,
  },
  actionBtnOutline: {
    backgroundColor: COLORS.transparent,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.primary,
    marginRight: 0, // Last button has no right margin
  },
  actionBtnText: {
    color: COLORS.background,
    fontWeight: FONTS.weightBold,
  },
});