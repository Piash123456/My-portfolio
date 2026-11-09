

export const COLORS = {
  background: '#0F172A',
  surface: '#1E293B',
  primary: '#38BDF8',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  border: '#334155',
  transparent: 'transparent',
  activeTab: '#0EA5E9',
};

export const SPACING = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };

export const SIZES = {
  body: 16, title: 22, headerWeb: 44, headerMobile: 30,
  navHeight: 70, maxWidth: 1100, borderWidth: 1, borderRadius: 8,
  heroImageWeb: 350, heroImageMobile: 250, buttonPaddingWeb: 16, buttonPaddingMobile: 12,
};

export const BREAKPOINTS = { tablet: 768 };
export const FONTS = { weightBold: 'bold', weightNormal: 'normal' };

export const SHADOWS = {
  card: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
};

// High-level animation configuration
export const ANIMATIONS = {
  springTension: 60,  
  springFriction: 6,  
  fadeDuration: 400,  
  // Added interaction speeds
  hoverTension: 120,
  hoverFriction: 5,
};