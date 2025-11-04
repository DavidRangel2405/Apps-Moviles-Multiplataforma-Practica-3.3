import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { Box, Text, VStack, HStack } from '@gluestack-ui/themed';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function AnimatedBanner() {
  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Animación de rotación continua
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Animación de pulso continuo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          { translateY: slideAnim },
          { scale: scaleAnim },
        ],
      }}
    >
      <LinearGradient
        colors={['#10b981', '#059669', '#047857']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 20,
          padding: 20,
          overflow: 'hidden',
        }}
      >
        <Box position="relative">
          {/* Círculos decorativos animados */}
          <Animated.View
            style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transform: [{ rotate: rotation }],
            }}
          />
          <Animated.View
            style={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transform: [{ rotate: rotation }, { scale: pulseAnim }],
            }}
          />

          <VStack space="md" zIndex={1}>
            <HStack space="md" alignItems="center">
              <Animated.View
                style={{
                  transform: [{ scale: pulseAnim }],
                }}
              >
                <Box
                  bg="white"
                  w={50}
                  h={50}
                  borderRadius="$full"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontSize="$2xl" fontWeight="$bold" color="#10b981">
                    🚀
                  </Text>
                </Box>
              </Animated.View>
              
              <VStack flex={1}>
                <Text 
                  color="white" 
                  fontSize="$2xl" 
                  fontWeight="$bold"
                  style={{ textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 4 }}
                >
                  Práctica Gluestack
                </Text>
                <Text 
                  color="rgba(255, 255, 255, 0.9)" 
                  fontSize="$sm"
                >
                  Componente personalizado con animaciones
                </Text>
              </VStack>
            </HStack>

            <Box 
              bg="rgba(255, 255, 255, 0.2)" 
              p="$3" 
              borderRadius="$lg"
              borderWidth={1}
              borderColor="rgba(255, 255, 255, 0.3)"
            >
              <Text color="white" fontSize="$xs" fontWeight="$medium">
                Banner dinámico con múltiples animaciones
              </Text>
              <Text color="white" fontSize="$xs" mt="$1">
                • Fade in • Slide • Scale • Rotate • Pulse
              </Text>
            </Box>
          </VStack>
        </Box>
      </LinearGradient>
    </Animated.View>
  );
}