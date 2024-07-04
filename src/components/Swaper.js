import React, { useRef, useEffect, useState, Children } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

const AnimatedPanel = ({ isVisible, onClose,children }) => {
  const translateY = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    if (isVisible) {
      // Animate the view up when it becomes visible
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      // Animate the view down when it becomes invisible
      Animated.timing(translateY, {
        toValue: 400,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        
        transform: [{ translateY }],
      }}
    >
      <TouchableOpacity onPress={onClose} className="w-full h-2" >
        <Text></Text>
      </TouchableOpacity>

      
      {children}
    </Animated.View>
  );
};
export default AnimatedPanel;
