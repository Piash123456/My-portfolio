
import { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { ANIMATIONS } from '../theme/theme';

export default function FadeInView({ children, delay = 0, animationType = 'slideUp', style }) {
  // useState prevents ESLint ref errors and keeps Animated.Value stable
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [transformAnim] = useState(() => new Animated.Value(animationType === 'zoomIn' ? 0.8 : 50));

  useEffect(() => {
    // Reset state instantly when mounted
    fadeAnim.setValue(0);
    transformAnim.setValue(animationType === 'zoomIn' ? 0.8 : 50);

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: ANIMATIONS.fadeDuration,
          useNativeDriver: false, // React Native Web requires this to be false
        }),
        Animated.spring(transformAnim, {
          toValue: animationType === 'zoomIn' ? 1 : 0,
          tension: ANIMATIONS.springTension,
          friction: ANIMATIONS.springFriction,
          useNativeDriver: false,
        })
      ]).start();
    }, delay);

    // Cleanup timer if user switches page too fast
    return () => clearTimeout(timer);
  }, [delay, animationType, fadeAnim, transformAnim]); 

  return (
    <Animated.View 
      style={[
        { width: '100%' }, 
        style, 
        { 
          opacity: fadeAnim, 
          transform: [
            animationType === 'zoomIn' 
              ? { scale: transformAnim } 
              : { translateY: transformAnim }
          ]
        }
      ]}
    >
      {children}
    </Animated.View>
  );
}