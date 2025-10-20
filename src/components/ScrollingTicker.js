import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, Animated, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES } from '../constants/theme';

export default function ScrollingTicker({ messages }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.timing(scrollX, {
          toValue: -1000,
          duration: 20000,
          useNativeDriver: true,
        })
      ).start();
    };

    animate();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={styles.messagesContainer}>
          {messages.map((message, index) => (
            <Text key={index} style={styles.message}>
              {message}
            </Text>
          ))}
          {messages.map((message, index) => (
            <Text key={`repeat-${index}`} style={styles.message}>
              {message}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: COLORS.beige,
    justifyContent: 'center',
  },
  messagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.black,
    marginHorizontal: 20,
  },
});
