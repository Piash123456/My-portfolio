// src/App.jsx
import { useState, useRef } from 'react'; 
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact'; 
import Footer from './components/Footer';
import { COLORS, SPACING, SIZES, BREAKPOINTS } from './theme/theme';

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINTS.tablet;

  // Reference to the ScrollView component to control the scrolling behavior
  const scrollViewRef = useRef(null);

  // State to store the exact Y-axis position (vertical position) of each section
  const [sectionPositions, setSectionPositions] = useState({});
  
  // State to keep track of the currently active section on the screen
  const [activeSection, setActiveSection] = useState('Home');

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

      // Manually set the active section right after clicking a navigation link
      setActiveSection(sectionId);
    }
  };

  // Function to detect the scroll position and update the active section in the Navbar
  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    
    // Threshold calculation: Adds navbar height + buffer margin to trigger activation slightly before reaching the exact top
    const scrollThreshold = scrollY + SIZES.navHeight + 150;

    let currentSection = 'Home'; // Default fallback

    // Array ordered from bottom to top section to accurately detect the deepest visible section
    const sections = ['Contact', 'Projects', 'Skills', 'About', 'Home'];

    for (let section of sections) {
      if (sectionPositions[section] !== undefined && scrollThreshold >= sectionPositions[section]) {
        currentSection = section;
        break; // Stop at the first matching section from the bottom
      }
    }

    // Update the state only if the section actually changes to avoid unnecessary re-renders
    if (activeSection !== currentSection) {
      setActiveSection(currentSection);
    }
  };

  return (
    <View style={styles.screen}>
      
      {/* Navbar receives the scroll function and the currently active section to highlight the correct link */}
      <Navbar scrollToSection={scrollToSection} activeSection={activeSection} />

      <ScrollView 
        ref={scrollViewRef} 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16} // Fires the scroll event every 16ms (approx 60fps) for smooth tracking
        onScroll={handleScroll}  // Triggers the scroll detection function
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

          {/* Contact Section */}
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