// src/components/Contact.jsx
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, useWindowDimensions, Linking, TouchableOpacity, Animated, Pressable, Platform, Image } from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS, ANIMATIONS } from '../theme/theme';
import FadeInView from './FadeInView';
import PremiumButton from './PremiumButton';

// 100% Browser-Safe URL-Encoded SVG Icons (Fixes the blank box issue)
const ICONS = {
  emailInfo: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M4%204h16c1.1%200%202%20.9%202%202v12c0%201.1-.9%202-2%202H4c-1.1%200-2-.9-2-2V6c0-1.1.9-2%202-2z%22%3E%3C%2Fpath%3E%3Cpolyline%20points%3D%2222%2C6%2012%2C13%202%2C6%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E',
  phoneInfo: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M22%2016.92v3a2%202%200%200%201-2.18%202%2019.79%2019.79%200%200%201-8.63-3.07%2019.5%2019.5%200%200%201-6-6%2019.79%2019.79%200%200%201-3.07-8.67A2%202%200%200%201%204.11%202h3a2%202%200%200%201%202%201.72%2012.84%2012.84%200%200%200%20.7%202.81%202%202%200%200%201-.45%202.11L8.09%209.91a16%2016%200%200%200%206%206l1.27-1.27a2%202%200%200%201%202.11-.45%2012.84%2012.84%200%200%200%202.81.7A2%202%200%200%201%2022%2016.92z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E',
  locationInfo: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M21%2010c0%207-9%2013-9%2013s-9-6-9-13a9%209%200%200%201%2018%200z%22%3E%3C%2Fpath%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2210%22%20r%3D%223%22%3E%3C%2Fcircle%3E%3C%2Fsvg%3E',
  githubSocial: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2338BDF8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M9%2019c-5%201.5-5-2.5-7-3m14%206v-3.87a3.37%203.37%200%200%200-.94-2.61c3.14-.35%206.44-1.54%206.44-7A5.44%205.44%200%200%200%2020%204.77%205.07%205.07%200%200%200%2019.91%201S18.73.65%2016%202.48a13.38%2013.38%200%200%200-7%200C6.27.65%205.09%201%205.09%201A5.07%205.07%200%200%200%205%204.77a5.44%205.44%200%200%200-1.5%203.78c0%205.42%203.3%206.61%206.44%207A3.37%203.37%200%200%200%209%2018.13V22%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E',
  linkedinSocial: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2338BDF8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M16%208a6%206%200%200%201%206%206v7h-4v-7a2%202%200%200%200-2-2%202%202%200%200%200-2%202v7h-4v-7a6%206%200%200%201%206-6z%22%3E%3C%2Fpath%3E%3Crect%20x%3D%222%22%20y%3D%229%22%20width%3D%224%22%20height%3D%2212%22%3E%3C%2Frect%3E%3Ccircle%20cx%3D%224%22%20cy%3D%224%22%20r%3D%222%22%3E%3C%2Fcircle%3E%3C%2Fsvg%3E',
  instagramSocial: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2338BDF8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Crect%20x%3D%222%22%20y%3D%222%22%20width%3D%2220%22%20height%3D%2220%22%20rx%3D%225%22%20ry%3D%225%22%3E%3C%2Frect%3E%3Cpath%20d%3D%22M16%2011.37A4%204%200%201%201%2012.63%208%204%204%200%200%201%2016%2011.37z%22%3E%3C%2Fpath%3E%3Cline%20x1%3D%2217.5%22%20y1%3D%226.5%22%20x2%3D%2217.51%22%20y2%3D%226.5%22%3E%3C%2Fline%3E%3C%2Fsvg%3E',
  emailSocial: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2338BDF8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M4%204h16c1.1%200%202%20.9%202%202v12c0%201.1-.9%202-2%202H4c-1.1%200-2-.9-2-2V6c0-1.1.9-2%202-2z%22%3E%3C%2Fpath%3E%3Cpolyline%20points%3D%2222%2C6%2012%2C13%202%2C6%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E'
};

// Safe Hover Wrapper 
const HoverContactCard = ({ children, style }) => {
  const [hoverAnim] = useState(() => new Animated.Value(0)); 

  const handleHoverIn = () => Animated.spring(hoverAnim, { toValue: 1, tension: ANIMATIONS.hoverTension, friction: ANIMATIONS.hoverFriction, useNativeDriver: false }).start();
  const handleHoverOut = () => Animated.spring(hoverAnim, { toValue: 0, tension: ANIMATIONS.hoverTension, friction: ANIMATIONS.hoverFriction, useNativeDriver: false }).start();

  const animatedStyle = {
    transform: [
      { translateY: hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) }, 
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
        style={{ width: '100%', alignItems: 'center' }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

// Reusable Info Card Component with Vector SVG
const InfoCard = ({ iconUri, label, value }) => (
  <View style={styles.infoCard}>
    <View style={styles.iconCircle}>
      <Image source={{ uri: iconUri }} style={styles.iconImage} resizeMode="contain" />
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

// Sleek Social Icon Component with Vector SVG
const SocialIcon = ({ iconUri, url }) => (
  <TouchableOpacity style={styles.socialCircle} onPress={() => Linking.openURL(url)}>
    <Image source={{ uri: iconUri }} style={styles.socialImage} resizeMode="contain" />
  </TouchableOpacity>
);

// Custom Input Component
const CustomInput = ({ label, placeholder, multiline, value, onChangeText, containerStyle }) => (
  <View style={[styles.inputGroup, containerStyle]}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.textArea]}
      placeholder={placeholder}
      placeholderTextColor={COLORS.textSecondary + '80'} 
      multiline={multiline}
      numberOfLines={multiline ? 5 : 1}
      value={value}
      onChangeText={onChangeText}
      // @ts-ignore
      outlineStyle="none"
    />
  </View>
);

export default function Contact() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    alert('Thank you! Your message has been sent successfully.');
    setName(''); setEmail(''); setSubject(''); setMessage('');
  };

  return (
    <View style={[styles.fullScreenWrapper, { minHeight: height }]}>
      <View style={styles.sectionContainer}>
        
        <View style={[styles.layoutWrapper, { flexDirection: isMobile ? 'column' : 'row' }]}>
          
          {/* Left Column: Contact Information */}
          <FadeInView delay={200} style={[styles.leftColumn, { paddingRight: isMobile ? 0 : SPACING.xxl }]}>
            <Text style={[styles.heading, { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb }]}>
              Let's talk about your project
            </Text>
            <Text style={styles.subtitle}>
              I'm always interested in hearing about new projects and opportunities. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </Text>

            <View style={styles.cardsContainer}>
              <InfoCard iconUri={ICONS.emailInfo} label="Email" value="rpiash76@gmail.com" />
              <InfoCard iconUri={ICONS.phoneInfo} label="Phone" value="01308129532" />
              <InfoCard iconUri={ICONS.locationInfo} label="Location" value="Mirpur, Dhaka" />
            </View>

            <View style={styles.socialContainer}>
              <Text style={styles.socialTitle}>Follow me on social media</Text>
              
              <View style={styles.socialIconsRow}>
                <SocialIcon 
                  iconUri={ICONS.githubSocial} 
                  url="https://github.com/Piash123456" 
                />
                <SocialIcon 
                  iconUri={ICONS.linkedinSocial} 
                  url="https://www.linkedin.com/in/md-shazzadur-rahman-piash-287345319?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                />
                <SocialIcon 
                  iconUri={ICONS.instagramSocial} 
                  url="https://www.instagram.com/mdshazzadurpiash/" 
                />
                <SocialIcon 
                  iconUri={ICONS.emailSocial} 
                  url="mailto:rpiash76@gmail.com" 
                />
              </View>
            </View>
          </FadeInView>

          {/* Right Column: Contact Form */}
          <FadeInView 
            delay={400} 
            animationType="slideUp" 
            style={[styles.rightColumn, { marginTop: isMobile ? SPACING.xxl : 0 }]}
          >
            <HoverContactCard style={styles.formContainer}>
              
              <View style={[styles.row, { flexDirection: isMobile ? 'column' : 'row', width: '100%' }]}>
                <CustomInput 
                  label="Your Name" 
                  placeholder="Your Name" 
                  value={name} 
                  onChangeText={setName} 
                  containerStyle={{ flex: 1, marginRight: isMobile ? 0 : SPACING.md, marginBottom: isMobile ? SPACING.md : 0 }} 
                />
                <CustomInput 
                  label="Your Email" 
                  placeholder="your-email@gmail.com" 
                  value={email} 
                  onChangeText={setEmail} 
                  containerStyle={{ flex: 1 }} 
                />
              </View>

              <CustomInput 
                label="Subject" 
                placeholder="Project Inquiry" 
                value={subject} 
                onChangeText={setSubject} 
                containerStyle={{ width: '100%' }}
              />
              
              <CustomInput 
                label="Message" 
                placeholder="Tell me about your project..." 
                multiline 
                value={message} 
                onChangeText={setMessage} 
                containerStyle={{ width: '100%' }}
              />

              <View style={{ width: '100%', marginTop: SPACING.md }}>
                <PremiumButton 
                  title="Send Message →" 
                  variant="primary"
                  onPress={handleSendMessage}
                />
              </View>

            </HoverContactCard>
          </FadeInView>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenWrapper: { width: '100%', justifyContent: 'center', paddingTop: SIZES.navHeight },
  sectionContainer: { width: '100%', marginBottom: SPACING.xxl },
  layoutWrapper: { width: '100%', justifyContent: 'space-between' },
  
  // Left Column
  leftColumn: { flex: 1, justifyContent: 'center' },
  heading: { color: COLORS.textPrimary, fontWeight: FONTS.weightBold, marginBottom: SPACING.md },
  subtitle: { color: COLORS.textSecondary, fontSize: SIZES.body, lineHeight: 24, marginBottom: SPACING.xl },
  cardsContainer: { marginBottom: SPACING.xl },
  
  infoCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, padding: SPACING.md, borderRadius: SIZES.borderRadius, marginBottom: SPACING.md, borderWidth: 1, borderColor: COLORS.border },
  iconCircle: { width: 45, height: 45, borderRadius: 8, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md, borderWidth: 1, borderColor: COLORS.border },
  iconImage: { width: 22, height: 22 },
  infoContent: { flex: 1 },
  infoLabel: { color: COLORS.textSecondary, fontSize: SIZES.body - 2, marginBottom: 2 },
  infoValue: { color: COLORS.textPrimary, fontSize: SIZES.body, fontWeight: FONTS.weightBold },
  
  // Social Icons
  socialContainer: { marginTop: SPACING.md },
  socialTitle: { color: COLORS.textSecondary, fontSize: SIZES.body, marginBottom: SPACING.md },
  socialIconsRow: { flexDirection: 'row', gap: SPACING.md },
  socialCircle: { width: 42, height: 42, borderRadius: 21, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.primary },
  socialImage: { width: 20, height: 20 },

  // Right Column
  rightColumn: { flex: 1, justifyContent: 'center' },
  formContainer: { backgroundColor: COLORS.surface, padding: SPACING.xl, borderRadius: SIZES.borderRadius * 1.5, borderWidth: 1, borderColor: COLORS.border, ...SHADOWS.card, width: '100%' },
  row: { justifyContent: 'space-between' },
  inputGroup: { marginBottom: SPACING.lg },
  inputLabel: { color: COLORS.textPrimary, fontSize: SIZES.body - 2, fontWeight: FONTS.weightBold, marginBottom: SPACING.xs },
  input: { backgroundColor: COLORS.background, color: COLORS.textPrimary, fontSize: SIZES.body, padding: SPACING.md, borderRadius: SIZES.borderRadius, borderWidth: 1, borderColor: COLORS.border, width: '100%' },
  textArea: { minHeight: 120, textAlignVertical: 'top' }
});