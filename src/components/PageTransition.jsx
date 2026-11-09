// src/components/PageTransition.jsx
import { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { ANIMATIONS } from '../theme/theme';

export default function PageTransition({ children }) {
  // Using useState instead of useRef to fix ESLint "access refs during render" error
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [slideAnim] = useState(() => new Animated.Value(20));

  useEffect(() => {
    // Reset animations to starting position every time the page (children) changes
    fadeAnim.setValue(0);
    slideAnim.setValue(20);

    // Start parallel animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: ANIMATIONS.pageTransitionDuration,
        useNativeDriver: false,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, // Slide to normal position
        duration: ANIMATIONS.pageTransitionDuration,
        useNativeDriver: false,
      })
    ]).start();
  }, [children, fadeAnim, slideAnim]); // Added missing dependencies to satisfy ESLint

  return (
    <Animated.View 
      style={{ 
        flex: 1, 
        width: '100%', 
        opacity: fadeAnim, 
        transform: [{ translateY: slideAnim }] 
      }}
    >
      {children}
    </Animated.View>
  );
}