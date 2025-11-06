import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Box, Text, VStack, Icon } from '@gluestack-ui/themed';

interface StatsCardProps {
  icon: any;
  value: string;
  label: string;
  color: string;
}

export default function StatsCard({ icon, value, label, color }: StatsCardProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <Box
        bg="#2d2d2d"
        p="$4"
        borderRadius="$2xl"
        borderWidth={2}
        borderColor={color}
        shadowColor={color}
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.3}
        shadowRadius={8}
      >
        <VStack space="sm" alignItems="center">
          <Box
            bg={color}
            p="$2"
            borderRadius="$full"
            width={40}
            height={40}
            justifyContent="center"
            alignItems="center"
          >
            <Icon as={icon} color="white" size="lg" />
          </Box>
          <Text color="white" fontSize="$xl" fontWeight="$bold">
            {value}
          </Text>
          <Text color="#6b7280" fontSize="$xs" textAlign="center">
            {label}
          </Text>
        </VStack>
      </Box>
    </Animated.View>
  );
}