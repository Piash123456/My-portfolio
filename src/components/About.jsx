
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS } from '../theme/theme';
import FadeInView from './FadeInView'; // Import animation wrapper

export default function About() {
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  return (
    <View style={styles.sectionContainer}>
      
      {/* Title with animation */}
      <FadeInView delay={100}>
        <Text style={[styles.sectionTitle, { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb }]}>
          Md. Shazzadur Rahman Piash
        </Text>
      </FadeInView>

      <View style={[styles.contentWrapper, { flexDirection: isMobile ? 'column' : 'row' }]}>
        
        {/* Left/Top Side: Description */}
        <FadeInView delay={300} style={[styles.textBlock, { marginRight: isMobile ? 0 : SPACING.xxl }]}>
          <Text style={styles.paragraph}>
            I am a passionate Software Engineering student and a developer who loves building cross-platform applications. 
            My journey started with a fascination for how mobile apps work, which led me to dive deep into technologies 
            like React Native, Flutter, and web development.
          </Text>
          <Text style={styles.paragraph}>
            Currently, I am working on my final year thesis focused on machine learning and student dropout prediction, 
            while continuously building side projects to sharpen my frontend and backend skills. 
            I enjoy writing clean code, designing consistent user interfaces, and solving real-world problems.
          </Text>
        </FadeInView>

        {/* Right/Bottom Side: Quick Facts */}
        <FadeInView 
          delay={500} 
          animationType="zoomIn"
          style={[styles.infoCard, { width: isMobile ? '100%' : '35%', marginTop: isMobile ? SPACING.lg : 0 }]}
        >
          <Text style={styles.cardTitle}>Quick Facts</Text>
          
          <View style={styles.factRow}>
            <Text style={styles.factLabel}>Education:</Text>
            <Text style={styles.factValue}>B.Sc. in Software Engineering</Text>
          </View>
          
          <View style={styles.factRow}>
            <Text style={styles.factLabel}>Focus:</Text>
            <Text style={styles.factValue}>Mobile & Web Development</Text>
          </View>
          
          <View style={styles.factRow}>
            <Text style={styles.factLabel}>Location:</Text>
            <Text style={styles.factValue}>Dhaka, Bangladesh</Text>
          </View>
        </FadeInView>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: { width: '100%', marginTop: SPACING.xxl * 1.5, marginBottom: SPACING.xxl },
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