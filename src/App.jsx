
import { useState, useRef } from 'react'; 
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact'; // ADDED: Import the new Contact component
import Footer from './components/Footer';
import { COLORS, SPACING, SIZES, BREAKPOINTS } from './theme/theme';

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  // Reference to the ScrollView component to control the scrolling behavior
  const scrollViewRef = useRef(null);

  // State to store the exact Y-axis position (vertical position) of each section
  const [sectionPositions, setSectionPositions] = useState({});

  // Function to capture and save the Y coordinate of a section when it renders
  const handleSectionLayout = (sectionId, event) => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions((prevPositions) => ({
      ...prevPositions,
      [sectionId]: y,
    }));
  };

  // Function to smoothly scroll to a specific section based on its captured Y coordinate
  const scrollToSection = (sectionId) => {
    const targetY = sectionPositions[sectionId];
    
    if (scrollViewRef.current && targetY !== undefined) {
      // Subtracting navbar height so the title doesn't hide behind the fixed navbar
      const offset = targetY > SIZES.navHeight ? targetY - SIZES.navHeight : 0;
      
      scrollViewRef.current.scrollTo({ 
        y: offset, 
        animated: true 
      });
    }
  };

  return (
    <View style={styles.screen}>
      
      {/* Navbar receives the scroll function to trigger navigation */}
      <Navbar scrollToSection={scrollToSection} />

      <ScrollView 
        ref={scrollViewRef} 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16} // Improves scroll performance
      >
        <View style={[styles.container, { paddingHorizontal: isMobile ? SPACING.md : SPACING.xxl }]}>
          
          {/* Hero Section */}
          <View onLayout={(event) => handleSectionLayout('Home', event)}>
            <Hero scrollToSection={scrollToSection} />
          </View>

          {/* About Section */}
          <View onLayout={(event) => handleSectionLayout('About', event)}>
            <About />
          </View>

          {/* Skills Section */}
          <View onLayout={(event) => handleSectionLayout('Skills', event)}>
            <Skills />
          </View>

          {/* Projects Section */}
          <View onLayout={(event) => handleSectionLayout('Projects', event)}>
            <Projects />
          </View>

          {/* ADDED: Contact Section */}
          <View onLayout={(event) => handleSectionLayout('Contact', event)}>
            <Contact />
          </View>

        </View>
        
        {/* Footer Section (Always at the bottom) */}
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1, 
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1, 
    alignItems: 'center', 
    paddingBottom: SPACING.xxl, 
  },
  container: {
    width: '100%',
    maxWidth: SIZES.maxWidth,
  },
});