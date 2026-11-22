
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Platform,
  Linking,
} from 'react-native';
import { COLORS, SPACING, SIZES, BREAKPOINTS, FONTS, SHADOWS } from '../theme/theme';
import FadeInView from './FadeInView';

// Google Apps Script Web App endpoint for saving messages to Google Sheets
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzk7giOhvsT0DYKGozxACYNfivZlZFMozg9gczAn3_x0wrFn56-ZHdbQ88CZSXt2FO4jg/exec';

// Dropdown options for inquiry category
const INQUIRY_OPTIONS = [
  'Project Inquiry',
  'Internship / Job Opportunity',
  'Collaboration',
  'General Question',
];

// Lightweight inline SVG icons (no external icon package required)
const ContactIcon = ({ type, color }) => {
  const props = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'email':
      return (
        <svg {...props}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...props}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case 'location':
      return (
        <svg {...props}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 'github':
      return (
        <svg {...props}>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...props}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...props}>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case 'chevronDown':
      return (
        <svg {...props} width={16} height={16}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case 'check':
      return (
        <svg {...props} width={14} height={14} strokeWidth={3}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    default:
      return null;
  }
};

// Contact info cards data
const CONTACT_INFO = [
  {
    id: 1,
    type: 'email',
    label: 'Email',
    value: 'rpiash76@gmail.com',
    href: 'mailto:rpiash76@gmail.com',
  },
  {
    id: 2,
    type: 'phone',
    label: 'Phone',
    value: '01308129532',
    href: 'tel:01308129532',
  },
  {
    id: 3,
    type: 'location',
    label: 'Location',
    value: 'Mirpur, Dhaka',
    href: null,
  },
];

// Social media links
const SOCIAL_LINKS = [
  { id: 1, type: 'github', url: 'https://github.com/Piash123456' },
  { id: 2, type: 'linkedin', url: 'https://www.linkedin.com' },
  { id: 3, type: 'instagram', url: 'https://www.instagram.com' },
  { id: 4, type: 'email', url: 'mailto:rpiash76@gmail.com' },
];

export default function Contact() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState(INQUIRY_OPTIONS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Active focused input field for subtle border glow
  const [focusedField, setFocusedField] = useState('');

  // Submission feedback state
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Open external links safely on web and mobile
  const openExternalLink = (url) => {
    if (!url) return;
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url);
    }
  };

  // Validate and submit contact form payload to Google Sheets via Apps Script
  const handleSendMessage = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please fill in your Name, Email, and Message.',
      });
      return;
    }

    if (!agreed) {
      setStatusMessage({
        type: 'error',
        text: 'Please confirm the checkbox before sending your message.',
      });
      return;
    }

    setIsSending(true);
    setStatusMessage({ type: '', text: '' });

    const formattedSubject = subject.trim()
      ? `[${inquiryType}] ${subject.trim()}`
      : `[${inquiryType}] Portfolio Inquiry`;

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: formattedSubject,
          message: message.trim(),
        }),
      });

      setStatusMessage({
        type: 'success',
        text: 'Message sent successfully! Thank you for reaching out.',
      });

      // Reset form inputs after successful submission
      setName('');
      setEmail('');
      setInquiryType(INQUIRY_OPTIONS[0]);
      setSubject('');
      setMessage('');
      setAgreed(false);
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Something went wrong. Please try again later.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <View
      style={[
        styles.fullScreenWrapper,
        { minHeight: isMobile ? undefined : height },
      ]}
    >
      <View style={styles.sectionContainer}>
        <View
          style={[
            styles.contentRow,
            { flexDirection: isMobile ? 'column' : 'row' },
          ]}
        >
          {/* Left column: heading, animated contact cards, and social icons */}
          <FadeInView
            delay={150}
            style={[
              styles.leftColumn,
              {
                width: isMobile ? '100%' : '46%',
                marginRight: isMobile ? 0 : SPACING.xl,
                marginBottom: isMobile ? SPACING.xl : 0,
              },
            ]}
          >
            <Text
              style={[
                styles.heading,
                { fontSize: isMobile ? SIZES.headerMobile : SIZES.headerWeb },
              ]}
            >
              Let&apos;s talk about your project
            </Text>

            <Text style={styles.subtitle}>
              I&apos;m always interested in hearing about new projects and
              opportunities. Whether you have a question or just want to say hi,
              feel free to reach out!
            </Text>

            {/* Interactive contact info cards */}
            <View style={styles.infoList}>
              {CONTACT_INFO.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => openExternalLink(item.href)}
                  style={({ hovered }) => [
                    styles.infoCard,
                    hovered && styles.infoCardHovered,
                    !item.href && Platform.OS === 'web' && { cursor: 'default' },
                  ]}
                >
                  {({ hovered }) => (
                    <>
                      <View
                        style={[
                          styles.infoIconBox,
                          hovered && styles.infoIconBoxHovered,
                        ]}
                      >
                        <ContactIcon
                          type={item.type}
                          color={hovered ? COLORS.primary : COLORS.textSecondary}
                        />
                      </View>
                      <View>
                        <Text style={styles.infoLabel}>{item.label}</Text>
                        <Text style={styles.infoValue}>{item.value}</Text>
                      </View>
                    </>
                  )}
                </Pressable>
              ))}
            </View>

            {/* Animated social links */}
            <Text style={styles.socialHeading}>Follow me on social media</Text>
            <View style={styles.socialRow}>
              {SOCIAL_LINKS.map((social) => (
                <Pressable
                  key={social.id}
                  onPress={() => openExternalLink(social.url)}
                  style={({ hovered, pressed }) => [
                    styles.socialCircle,
                    hovered && styles.socialCircleHovered,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  {({ hovered }) => (
                    <ContactIcon
                      type={social.type}
                      color={hovered ? COLORS.background : COLORS.primary}
                    />
                  )}
                </Pressable>
              ))}
            </View>
          </FadeInView>

          {/* Right column: interactive contact form */}
          <FadeInView
            delay={280}
            style={[
              styles.rightColumn,
              { width: isMobile ? '100%' : '50%' },
            ]}
          >
            <View style={styles.formCard}>
              {/* Name and Email row */}
              <View
                style={[
                  styles.inputRow,
                  { flexDirection: isMobile ? 'column' : 'row' },
                ]}
              >
                <View
                  style={[
                    styles.inputGroup,
                    {
                      flex: 1,
                      marginRight: isMobile ? 0 : SPACING.md,
                    },
                  ]}
                >
                  <Text style={styles.inputLabel}>Your Name</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedField === 'name' && styles.inputFocused,
                    ]}
                    placeholder="Your Name"
                    placeholderTextColor={COLORS.textSecondary}
                    value={name}
                    onChangeText={setName}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Your Email</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedField === 'email' && styles.inputFocused,
                    ]}
                    placeholder="your-email@gmail.com"
                    placeholderTextColor={COLORS.textSecondary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                  />
                </View>
              </View>

              {/* Inquiry Type dropdown and Subject row */}
              <View
                style={[
                  styles.inputRow,
                  { flexDirection: isMobile ? 'column' : 'row' },
                ]}
              >
                <View
                  style={[
                    styles.inputGroup,
                    {
                      flex: 1,
                      marginRight: isMobile ? 0 : SPACING.md,
                      zIndex: 10,
                    },
                  ]}
                >
                  <Text style={styles.inputLabel}>Inquiry Type</Text>
                  <Pressable
                    onPress={() => setDropdownOpen((prev) => !prev)}
                    style={({ hovered }) => [
                      styles.dropdownTrigger,
                      (hovered || dropdownOpen) && styles.inputFocused,
                    ]}
                  >
                    <Text style={styles.dropdownText}>{inquiryType}</Text>
                    <ContactIcon type="chevronDown" color={COLORS.primary} />
                  </Pressable>

                  {dropdownOpen ? (
                    <View style={styles.dropdownMenu}>
                      {INQUIRY_OPTIONS.map((option) => (
                        <Pressable
                          key={option}
                          onPress={() => {
                            setInquiryType(option);
                            setDropdownOpen(false);
                          }}
                          style={({ hovered }) => [
                            styles.dropdownItem,
                            (inquiryType === option || hovered) &&
                              styles.dropdownItemActive,
                          ]}
                        >
                          <Text
                            style={[
                              styles.dropdownItemText,
                              inquiryType === option &&
                                styles.dropdownItemTextActive,
                            ]}
                          >
                            {option}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  ) : null}
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Subject</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedField === 'subject' && styles.inputFocused,
                    ]}
                    placeholder="Brief subject..."
                    placeholderTextColor={COLORS.textSecondary}
                    value={subject}
                    onChangeText={setSubject}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField('')}
                  />
                </View>
              </View>

              {/* Message textarea */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Message</Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                    focusedField === 'message' && styles.inputFocused,
                  ]}
                  placeholder="Tell me about your project..."
                  placeholderTextColor={COLORS.textSecondary}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={message}
                  onChangeText={setMessage}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField('')}
                />
              </View>

              {/* Consent checkbox */}
              <Pressable
                onPress={() => setAgreed((prev) => !prev)}
                style={styles.checkboxRow}
              >
                <View
                  style={[
                    styles.checkboxBox,
                    agreed && styles.checkboxBoxChecked,
                  ]}
                >
                  {agreed ? (
                    <ContactIcon type="check" color={COLORS.background} />
                  ) : null}
                </View>
                <Text style={styles.checkboxLabel}>
                  I agree to be contacted regarding this inquiry.
                </Text>
              </Pressable>

              {/* Inline status feedback */}
              {statusMessage.text ? (
                <View
                  style={[
                    styles.statusBox,
                    statusMessage.type === 'success'
                      ? styles.statusSuccess
                      : styles.statusError,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      statusMessage.type === 'success'
                        ? styles.statusTextSuccess
                        : styles.statusTextError,
                    ]}
                  >
                    {statusMessage.text}
                  </Text>
                </View>
              ) : null}

              {/* Animated submit button */}
              <Pressable
                onPress={handleSendMessage}
                disabled={isSending}
                style={({ hovered, pressed }) => [
                  styles.submitButton,
                  hovered && !isSending && styles.submitButtonHovered,
                  isSending && styles.submitButtonDisabled,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.submitButtonText}>
                  {isSending ? 'Sending...' : 'Send Message →'}
                </Text>
              </Pressable>
            </View>
          </FadeInView>
        </View>
      </View>
    </View>
  );
}

const webTransition =
  Platform.OS === 'web'
    ? { transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)' }
    : {};

const styles = StyleSheet.create({
  fullScreenWrapper: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: SIZES.navHeight + SPACING.lg,
  },
  sectionContainer: {
    width: '100%',
    marginBottom: SPACING.xxl,
  },
  contentRow: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftColumn: {
    justifyContent: 'center',
  },
  heading: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weightBold,
    marginBottom: SPACING.md,
    lineHeight: 46,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  infoList: {
    marginBottom: SPACING.xl,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...webTransition,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' } : {}),
  },
  infoCardHovered: {
    borderColor: COLORS.primary,
    transform: [{ translateX: 6 }],
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 10px 24px -10px rgba(56, 189, 248, 0.28)' }
      : {}),
  },
  infoIconBox: {
    width: 40,
    height: 40,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.background,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    ...webTransition,
  },
  infoIconBoxHovered: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
  },
  infoLabel: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body - 2,
    marginBottom: 2,
  },
  infoValue: {
    color: COLORS.textPrimary,
    fontSize: SIZES.body,
    fontWeight: FONTS.weightBold,
  },
  socialHeading: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    marginBottom: SPACING.md,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    ...webTransition,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' } : {}),
  },
  socialCircleHovered: {
    backgroundColor: COLORS.primary,
    transform: [{ translateY: -4 }],
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 8px 20px -4px rgba(56, 189, 248, 0.55)' }
      : {}),
  },
  rightColumn: {
    justifyContent: 'center',
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius + 2,
    borderWidth: SIZES.borderWidth,
    borderColor: 'rgba(56, 189, 248, 0.45)',
    padding: SPACING.xl,
    ...SHADOWS.card,
  },
  inputRow: {
    width: '100%',
    justifyContent: 'space-between',
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    color: COLORS.textPrimary,
    fontSize: SIZES.body - 1,
    fontWeight: FONTS.weightBold,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.border,
    borderRadius: SIZES.borderRadius,
    color: COLORS.textPrimary,
    fontSize: SIZES.body,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 4,
    outlineStyle: 'none',
    ...webTransition,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 0 0 3px rgba(56, 189, 248, 0.15)' }
      : {}),
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.border,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 4,
    ...webTransition,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' } : {}),
  },
  dropdownText: {
    color: COLORS.textPrimary,
    fontSize: SIZES.body,
  },
  dropdownMenu: {
    marginTop: SPACING.xs,
    backgroundColor: COLORS.background,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    ...webTransition,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' } : {}),
  },
  dropdownItemActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
  },
  dropdownItemText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body - 1,
  },
  dropdownItemTextActive: {
    color: COLORS.primary,
    fontWeight: FONTS.weightBold,
  },
  textArea: {
    minHeight: 115,
    paddingTop: SPACING.md,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' } : {}),
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
    ...webTransition,
  },
  checkboxBoxChecked: {
    backgroundColor: COLORS.primary,
  },
  checkboxLabel: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body - 1,
    flex: 1,
  },
  statusBox: {
    borderRadius: SIZES.borderRadius,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: SIZES.borderWidth,
  },
  statusSuccess: {
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderColor: '#22C55E',
  },
  statusError: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: '#EF4444',
  },
  statusText: {
    fontSize: SIZES.body - 1,
    fontWeight: FONTS.weightBold,
    textAlign: 'center',
  },
  statusTextSuccess: {
    color: '#4ADE80',
  },
  statusTextError: {
    color: '#F87171',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xs,
    ...webTransition,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' } : {}),
  },
  submitButtonHovered: {
    transform: [{ translateY: -3 }],
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 10px 24px -6px rgba(56, 189, 248, 0.55)' }
      : {}),
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  buttonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  submitButtonText: {
    color: COLORS.background,
    fontSize: SIZES.body + 1,
    fontWeight: FONTS.weightBold,
  },
});