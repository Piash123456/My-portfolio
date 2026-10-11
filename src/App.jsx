// src/App.jsx

import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects'; // Imporing the new Projects component
import { COLORS, SPACING, SIZES, BREAKPOINTS } from './theme/theme';

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  return (
    // Changed main container to ScrollView so we can scroll down to see projects
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <Navbar />

      <View 
        style={[
          styles.container, 
          { paddingHorizontal: isMobile ? SPACING.md : SPACING.xxl }
        ]}
      >
        <Hero />
        
        {/* Render the Projects Section here */}
        <Projects />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    alignItems: 'center', // Keeps content centered inside ScrollView
    paddingBottom: SPACING.xxl, // Extra space at the bottom of the page
  },
  container: {
    width: '100%',
    maxWidth: SIZES.maxWidth,
  },
});