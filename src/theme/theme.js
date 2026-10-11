// src/theme/theme.js

export const COLORS = {
  background: '#0F172A',
  surface: '#1E293B',
  primary: '#38BDF8',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  border: '#334155',
  transparent: 'transparent',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const SIZES = {
  body: 16,
  title: 22,
  headerWeb: 44,
  headerMobile: 30,
  navHeight: 70,
  maxWidth: 1100,
  borderWidth: 1,
  borderRadius: 8,
  // Sizes added for Hero Section
  heroImageWeb: 350,
  heroImageMobile: 250,
  buttonPaddingWeb: 16,
  buttonPaddingMobile: 12,
};

export const BREAKPOINTS = {
  tablet: 768,
};

export const FONTS = {
  weightBold: 'bold',
  weightNormal: 'normal',
};

// Added for Projects Section (Card Shadows)
export const SHADOWS = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android (if converted to mobile app later)
  },
};