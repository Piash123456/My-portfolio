// src/components/Hero.jsx
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS } from '../theme/theme';
import FadeInView from './FadeInView';
import PremiumButton from './PremiumButton'; 
import profilePic from '../assets/profile.jpg'; 

export default function Hero({ scrollToSection }) {
  // Grab the exact height of the user's screen to make the section full-screen
  const { width, height } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  return (
    <View style={[styles.fullScreenWrapper, { minHeight: height }]}>
      <View style={[styles.heroContainer, { flexDirection: isMobile ? 'column-reverse' : 'row' }]}>
        
        {/* Text Content Area */}
        <View style={[styles.textContent, { alignItems: isMobile ? 'center' : 'flex-start' }]}>
          <FadeInView delay={100}>
            <Text style={styles.greetingText}>Hello, I am</Text>
          </FadeInView>

          <FadeInView delay={300}>
            <Text style={[styles.nameText, { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb }]}>
              Md. Shazzadur Rahman Piash
            </Text>
          </FadeInView>
          
          <FadeInView delay={500}>
            <Text style={[styles.descriptionText, { textAlign: isMobile ? 'center' : 'left' }]}>
              A passionate final-year CSE student and developer building cross-platform applications 
              with beautiful, consistent, and highly interactive user interfaces.
            </Text>
          </FadeInView>

          <FadeInView delay={700}>
            <View style={[styles.buttonsContainer, { flexDirection: isMobile ? 'column' : 'row' }]}>
              <View style={[styles.btnWrapper, { 
                marginRight: isMobile ? 0 : SPACING.md,
                marginBottom: isMobile ? SPACING.md : 0,
                width: isMobile ? '100%' : 'auto'
              }]}>
                <PremiumButton 
                  title="View Projects" 
                  variant="primary"
                  onPress={() => scrollToSection('Projects')}
                />
              </View>

              <View style={[styles.btnWrapper, { width: isMobile ? '100%' : 'auto' }]}>
                <PremiumButton 
                  title="About Me" 
                  variant="secondary"
                  onPress={() => scrollToSection('About')}
                />
              </View>
            </View>
          </FadeInView>
        </View>

        {/* Profile Image Area */}
        <View style={[styles.imageContainer, { marginBottom: isMobile ? SPACING.xl : 0 }]}>
          <FadeInView delay={200} animationType="zoomIn">
            <Image 
              source={profilePic} 
              style={[
                styles.profileImage, 
                { 
                  width: isMobile ? SIZES.heroImageMobile : SIZES.heroImageWeb,
                  height: isMobile ? SIZES.heroImageMobile : SIZES.heroImageWeb,
                  borderRadius: isMobile ? (SIZES.heroImageMobile / 2) : (SIZES.heroImageWeb / 2) 
                }
              ]}
              resizeMode="cover"
            />
          </FadeInView>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenWrapper: {
    width: '100%',
    justifyContent: 'center', // Centers the content vertically
    paddingTop: SIZES.navHeight, // Prevents navbar overlap
  },
  heroContainer: { 
    width: '100%', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  textContent: { flex: 1, justifyContent: 'center' },
  greetingText: { color: COLORS.primary, fontSize: SIZES.title, fontWeight: FONTS.weightNormal, marginBottom: SPACING.xs },
  nameText: { color: COLORS.textPrimary, fontWeight: FONTS.weightBold, marginBottom: SPACING.md },
  descriptionText: { color: COLORS.textSecondary, fontSize: SIZES.body, lineHeight: 24, marginBottom: SPACING.xl, maxWidth: 500 },
  buttonsContainer: { width: '100%', alignItems: 'center', justifyContent: 'flex-start', marginTop: SPACING.sm },
  btnWrapper: { minWidth: 160 }, 
  imageContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  profileImage: { backgroundColor: COLORS.surface, borderWidth: 4, borderColor: COLORS.surface }
});