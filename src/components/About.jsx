// src/components/About.jsx
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS } from '../theme/theme';
import FadeInView from './FadeInView'; 

export default function About() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  return (
    <View style={[styles.fullScreenWrapper, { minHeight: height }]}>
      <View style={styles.sectionContainer}>
        
        <FadeInView delay={100}>
          <Text style={[styles.sectionTitle, { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb }]}>
            About Me
          </Text>
        </FadeInView>

        <View style={[styles.contentWrapper, { flexDirection: isMobile ? 'column' : 'row' }]}>
          
          <FadeInView delay={300} style={[styles.textBlock, { marginRight: isMobile ? 0 : SPACING.xxl }]}>
            <Text style={styles.paragraph}>
              I am a final-year Computer Science and Engineering (CSE) student at Daffodil International University. 
              My core focus lies in software engineering, applied machine learning research, and cross-platform mobile 
              application development.
            </Text>
            <Text style={styles.paragraph}>
              I thrive on understanding system mechanics and data flows thoroughly before implementation, ensuring 
              that my codebases utilize clean architecture, reusable components, and strict state management patterns.
            </Text>
          </FadeInView>

          <FadeInView 
            delay={500} 
            animationType="zoomIn"
            style={[styles.infoCard, { width: isMobile ? '100%' : '35%', marginTop: isMobile ? SPACING.lg : 0 }]}
          >
            <Text style={styles.cardTitle}>Quick Facts</Text>
            
            <View style={styles.factRow}>
              <Text style={styles.factLabel}>Education:</Text>
              <Text style={styles.factValue}>B.Sc. in CSE (Final Year)</Text>
            </View>
            
            <View style={styles.factRow}>
              <Text style={styles.factLabel}>University:</Text>
              <Text style={styles.factValue}>Daffodil International University</Text>
            </View>
            
            <View style={styles.factRow}>
              <Text style={styles.factLabel}>Location:</Text>
              <Text style={styles.factValue}>Dhaka, Bangladesh</Text>
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
    paddingTop: SIZES.navHeight,
  },
  sectionContainer: { width: '100%', marginBottom: SPACING.xxl },
  sectionTitle: { color: COLORS.textPrimary, fontWeight: FONTS.weightBold, marginBottom: SPACING.xl, textAlign: 'center' },
  contentWrapper: { justifyContent: 'space-between', width: '100%' },
  textBlock: { flex: 1 },
  paragraph: { color: COLORS.textSecondary, fontSize: SIZES.body, lineHeight: 26, marginBottom: SPACING.md },
  infoCard: { backgroundColor: COLORS.surface, padding: SPACING.lg, borderRadius: SIZES.borderRadius, borderWidth: SIZES.borderWidth, borderColor: COLORS.border, justifyContent: 'center', ...SHADOWS.card },
  cardTitle: { color: COLORS.primary, fontSize: SIZES.title, fontWeight: FONTS.weightBold, marginBottom: SPACING.md },
  factRow: { marginBottom: SPACING.sm },
  factLabel: { color: COLORS.textSecondary, fontSize: SIZES.body - 2, fontWeight: FONTS.weightBold, marginBottom: SPACING.xs / 2 },
  factValue: { color: COLORS.textPrimary, fontSize: SIZES.body }
});