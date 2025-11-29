import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Text, VStack } from '@gluestack-ui/themed';
import AnimatedBanner from '../components/animatedBanner';

export default function HomeScreen() {
  return (
    <Box flex={1} bg="#1a1a1a">
      {/* Ajustamos contentContainerStyle para no tapar el header */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <VStack space="xl">

          {/* Banner animado */}
          <AnimatedBanner />

          <Box 
            bg="#2d2d2d" 
            p="$6" 
            borderRadius="$xl"
            borderWidth={1}
            borderColor="#10b981"
          >
            <Text color="white" fontSize="$2xl" fontWeight="$bold" mb="$4">
              Bienvenido
            </Text>
            <Text color="#d1d5db" fontSize="$md" lineHeight="$xl">
              Esta aplicación demuestra el uso de componentes Gluestack UI v3 
              con formularios interactivos, navegación drawer y un diseño moderno 
              y responsive.
            </Text>
          </Box>

          <Box 
            bg="#2d2d2d" 
            p="$6" 
            borderRadius="$xl"
          >
            <Text color="#10b981" fontSize="$xl" fontWeight="$bold" mb="$3">
              Características
            </Text>
            <VStack space="md">
              <Text color="#d1d5db" fontSize="$sm">✓ Menú Drawer con navegación</Text>
              <Text color="#d1d5db" fontSize="$sm">✓ Formularios completos con validación</Text>
              <Text color="#d1d5db" fontSize="$sm">✓ Componente animado personalizado</Text>
              <Text color="#d1d5db" fontSize="$sm">✓ Diseño responsive y moderno</Text>
              <Text color="#d1d5db" fontSize="$sm">✓ Paleta de colores profesional</Text>
            </VStack>
          </Box>

        </VStack>
      </ScrollView>
    </Box>
  );
}
