// src/components/About.jsx
import { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Animated, Pressable, Platform, Linking, Image, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS, ANIMATIONS } from '../theme/theme';
import FadeInView from './FadeInView';
import PremiumButton from './PremiumButton';

// High-Quality URL-Encoded SVG Icons
const ICONS = {
  education: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2338BDF8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M22%2010l-10-5-10%205%2010%205z%22%2F%3E%3Cpath%20d%3D%22M6%2012v5c3%203%209%203%2012%200v-5%22%2F%3E%3C%2Fsvg%3E',
  university: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2338BDF8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M3%2021h18%22%2F%3E%3Cpath%20d%3D%22M9%208h1%22%2F%3E%3Cpath%20d%3D%22M9%2012h1%22%2F%3E%3Cpath%20d%3D%22M9%2016h1%22%2F%3E%3Cpath%20d%3D%22M14%208h1%22%2F%3E%3Cpath%20d%3D%22M14%2012h1%22%2F%3E%3Cpath%20d%3D%22M14%2016h1%22%2F%3E%3Cpath%20d%3D%22M5%2021V5a2%202%200%200%201%202-2h10a2%202%200%200%201%202%202v16%22%2F%3E%3C%2Fsvg%3E',
  focus: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2338BDF8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%2216%2018%2022%2012%2016%206%22%2F%3E%3Cpolyline%20points%3D%228%206%202%2012%208%2018%22%2F%3E%3C%2Fsvg%3E',
  research: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2338BDF8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M2%203h6a4%204%200%200%201%204%204v14a3%203%200%200%200-3-3H2z%22%2F%3E%3Cpath%20d%3D%22M22%203h-6a4%204%200%200%200-4%204v14a3%203%200%200%201%203-3h7z%22%2F%3E%3C%2Fsvg%3E',
  location: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2338BDF8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M21%2010c0%207-9%2013-9%2013s-9-6-9-13a9%209%200%200%201%2018%200z%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2210%22%20r%3D%223%22%2F%3E%3C%2Fsvg%3E',
  github: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2338BDF8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M9%2019c-5%201.5-5-2.5-7-3m14%206v-3.87a3.37%203.37%200%200%200-.94-2.61c3.14-.35%206.44-1.54%206.44-7A5.44%205.44%200%200%200%2020%204.77%205.07%205.07%200%200%200%2019.91%201S18.73.65%2016%202.48a13.38%2013.38%200%200%200-7%200C6.27.65%205.09%201%205.09%201A5.07%205.07%200%200%200%205%204.77a5.44%205.44%200%200%200-1.5%203.78c0%205.42%203.3%206.61%206.44%207A3.37%203.37%200%200%200%209%2018.13V22%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E',
  linkedin: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2338BDF8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M16%208a6%206%200%200%201%206%206v7h-4v-7a2%202%200%200%200-2-2%202%202%200%200%200-2%202v7h-4v-7a6%206%200%200%201%206-6z%22%3E%3C%2Fpath%3E%3Crect%20x%3D%222%22%20y%3D%229%22%20width%3D%224%22%20height%3D%2212%22%3E%3C%2Frect%3E%3Ccircle%20cx%3D%224%22%20cy%3D%224%22%20r%3D%222%22%3E%3C%2Fcircle%3E%3C%2Fsvg%3E'
};

// Safe Hover Wrapper for Quick Facts Card
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
        style={{ width: '100%', padding: SPACING.xl }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

// Social Link Button Component
const SocialIcon = ({ iconUri, url }) => (
  <TouchableOpacity style={styles.socialCircle} onPress={() => Linking.openURL(url)}>
    <Image source={{ uri: iconUri }} style={styles.socialIconImage} resizeMode="contain" />
  </TouchableOpacity>
);

export default function About() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  const handleDownloadCV = () => {
    // This will open your resume file if it is named "resume.pdf" inside the public folder.
    if (Platform.OS === 'web') {
      window.open('/resume.pdf', '_blank');
    }
  };

  return (
    <View style={[styles.fullScreenWrapper, { minHeight: height }]}>
      <View style={styles.sectionContainer}>
        
        {/* Animated Title */}
        <FadeInView delay={100}>
          <Text style={[styles.sectionTitle, { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb }]}>
            About Me
          </Text>
        </FadeInView>

        {/* Content Layout */}
        <View style={[styles.contentWrapper, { flexDirection: isMobile ? 'column' : 'row' }]}>
          
          {/* Left Side: Professional Bio */}
          <FadeInView delay={300} style={[styles.textBlock, { width: isMobile ? '100%' : '55%' }]}>
            <Text style={styles.paragraph}>
              Hello! I'm <Text style={styles.highlight}>Md. Shazzadur Rahman Piash</Text>, a final-year Computer Science and Engineering (CSE) student at Daffodil International University.
            </Text>
            
            <Text style={styles.paragraph}>
              I'm passionate about building modern, responsive, and user-friendly applications. My primary interests include mobile and web development, with hands-on experience in <Text style={styles.highlight}>Flutter</Text> and <Text style={styles.highlight}>React Native</Text>.
            </Text>
            
            <Text style={styles.paragraph}>
              I enjoy solving real-world problems through technology, writing clean and maintainable code, and exploring new tools and technologies. Alongside development, I'm currently working on my final-year thesis focused on <Text style={styles.highlight}>Machine Learning</Text> and <Text style={styles.highlight}>Student Dropout Prediction</Text>.
            </Text>
            
            <Text style={styles.paragraph}>
              My goal is to grow as a Software Developer, continuously improve my technical skills, and build impactful digital solutions.
            </Text>
            
            {/* Actions: Download Button & Social Links */}
            <View style={styles.actionsWrapper}>
              <View style={styles.btnWrapper}>
                {/* Adding " ⬇" creates a subtle download icon natively within text */}
                <PremiumButton 
                  title="Download Resume ⬇" 
                  variant="primary"
                  onPress={handleDownloadCV}
                />
              </View>
              
              <View style={styles.socialRow}>
                <SocialIcon 
                  iconUri={ICONS.github} 
                  url="https://github.com/Piash123456" 
                />
                <SocialIcon 
                  iconUri={ICONS.linkedin} 
                  url="https://www.linkedin.com/in/md-shazzadur-rahman-piash-287345319?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                />
              </View>
            </View>
          </FadeInView>

          {/* Right Side: Quick Facts Card */}
          <FadeInView 
            delay={500} 
            animationType="slideUp"
            style={[styles.infoCardContainer, { width: isMobile ? '100%' : '40%', marginTop: isMobile ? SPACING.xxl : 0 }]}
          >
            <HoverCard style={styles.infoCardOuter}>
              <Text style={styles.cardTitle}>Quick Facts</Text>
              
              <View style={styles.factRow}>
                <View style={styles.iconCircle}>
                  <Image source={{ uri: ICONS.education }} style={styles.factIcon} resizeMode="contain" />
                </View>
                <View style={styles.factTextGroup}>
                  <Text style={styles.factLabel}>Education</Text>
                  <Text style={styles.factValue}>B.Sc. in CSE (Final Year)</Text>
                </View>
              </View>
              
              <View style={styles.factRow}>
                <View style={styles.iconCircle}>
                  <Image source={{ uri: ICONS.university }} style={styles.factIcon} resizeMode="contain" />
                </View>
                <View style={styles.factTextGroup}>
                  <Text style={styles.factLabel}>University</Text>
                  <Text style={styles.factValue}>Daffodil International University</Text>
                </View>
              </View>
              
              <View style={styles.factRow}>
                <View style={styles.iconCircle}>
                  <Image source={{ uri: ICONS.focus }} style={styles.factIcon} resizeMode="contain" />
                </View>
                <View style={styles.factTextGroup}>
                  <Text style={styles.factLabel}>Specialization</Text>
                  <Text style={styles.factValue}>Mobile & Web Development</Text>
                </View>
              </View>

              <View style={styles.factRow}>
                <View style={styles.iconCircle}>
                  <Image source={{ uri: ICONS.research }} style={styles.factIcon} resizeMode="contain" />
                </View>
                <View style={styles.factTextGroup}>
                  <Text style={styles.factLabel}>Research</Text>
                  <Text style={styles.factValue}>Machine Learning & Dropout Prediction</Text>
                </View>
              </View>

              <View style={styles.factRow}>
                <View style={styles.iconCircle}>
                  <Image source={{ uri: ICONS.location }} style={styles.factIcon} resizeMode="contain" />
                </View>
                <View style={styles.factTextGroup}>
                  <Text style={styles.factLabel}>Location</Text>
                  <Text style={styles.factValue}>Mirpur, Dhaka</Text>
                </View>
              </View>
            </HoverCard>
          </FadeInView>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenWrapper: { width: '100%', justifyContent: 'center', paddingTop: SIZES.navHeight },
  sectionContainer: { width: '100%', marginBottom: SPACING.xxl },
  sectionTitle: { color: COLORS.textPrimary, fontWeight: FONTS.weightBold, marginBottom: SPACING.xxl, textAlign: 'center' },
  
  contentWrapper: { justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' },
  
  // Left Column Styles
  textBlock: { justifyContent: 'center' },
  paragraph: { color: COLORS.textSecondary, fontSize: SIZES.body + 1, lineHeight: 28, marginBottom: SPACING.lg, textAlign: 'justify' },
  highlight: { color: COLORS.primary, fontWeight: FONTS.weightBold },
  
  // Actions: Button and Social Icons
  actionsWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: SPACING.md, flexWrap: 'wrap', gap: SPACING.lg },
  btnWrapper: { width: 230 },
  socialRow: { flexDirection: 'row', gap: SPACING.md },
  socialCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  socialIconImage: { width: 20, height: 20 },

  // Right Column (Card) Styles
  infoCardContainer: { alignItems: 'center' },
  infoCardOuter: { backgroundColor: COLORS.surface, borderRadius: SIZES.borderRadius * 1.5, borderWidth: SIZES.borderWidth, borderColor: COLORS.border, ...SHADOWS.card, width: '100%' },
  cardTitle: { color: COLORS.primary, fontSize: SIZES.title, fontWeight: FONTS.weightBold, marginBottom: SPACING.xl, textAlign: 'center' },
  
  factRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.lg },
  iconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md, borderWidth: 1, borderColor: COLORS.border },
  factIcon: { width: 20, height: 20 },
  factTextGroup: { flex: 1 },
  factLabel: { color: COLORS.textSecondary, fontSize: SIZES.body - 2, fontWeight: FONTS.weightBold, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  factValue: { color: COLORS.textPrimary, fontSize: SIZES.body, fontWeight: '500', lineHeight: 20 }
});