import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { Icon, Pressable, Box, Text, VStack, HStack, Avatar, AvatarFallbackText, AvatarImage } from '@gluestack-ui/themed';
import { Menu, Home, FileText, User, Grid, LogOut } from 'lucide-react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../auth/authProvider';
import { View, ActivityIndicator } from 'react-native';
import 'react-native-get-random-values';
import bcrypt from 'react-native-bcrypt';

// Fix PRNG
bcrypt.setRandomFallback((len: number) => {
  const bytes = new Uint8Array(len);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes);
});

function DrawerToggleButton() {
  const navigation = useNavigation();
  
  return (
    <Pressable 
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      p="$2"
      ml="$2"
    >
      <Icon as={Menu} color="#10b981" size="xl" />
    </Pressable>
  );
}

// Componente personalizado para el contenido del Drawer
function CustomDrawerContent(props: any) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/loginScreen');
  };

  return (
    <Box flex={1} bg="#2d2d2d">
      {/* Header del Drawer con información del usuario */}
      <Box bg="#1a1a1a" pt="$12" pb="$6" px="$4" borderBottomWidth={1} borderBottomColor="#10b981">
        <VStack space="md" alignItems="center">
          <Avatar size="lg" borderWidth={2} borderColor="#10b981">
            <AvatarFallbackText>{user?.username || 'Usuario'}</AvatarFallbackText>
          </Avatar>
          <VStack space="xs" alignItems="center">
            <Text color="white" fontSize="$lg" fontWeight="$bold">
              {user?.username || 'Usuario'}
            </Text>
            <Text color="#10b981" fontSize="$sm">
              {user?.email || ''}
            </Text>
          </VStack>
        </VStack>
      </Box>

      {/* Opciones del menú */}
      <VStack flex={1} space="sm" pt="$6" px="$2">
        <Pressable
          onPress={() => {
            props.navigation.navigate('homeScreen');
          }}
          p="$3"
          borderRadius="$lg"
          bg={props.state.routeNames[props.state.index] === 'homeScreen' ? '#10b98120' : 'transparent'}
        >
          <HStack space="md" alignItems="center">
            <Icon 
              as={Home} 
              color={props.state.routeNames[props.state.index] === 'homeScreen' ? '#10b981' : '#ffffff'} 
              size="md" 
            />
            <Text 
              color={props.state.routeNames[props.state.index] === 'homeScreen' ? '#10b981' : '#ffffff'}
              fontSize="$md"
              fontWeight="$semibold"
            >
              Inicio
            </Text>
          </HStack>
        </Pressable>

        <Pressable
          onPress={() => {
            props.navigation.navigate('formsScreen');
          }}
          p="$3"
          borderRadius="$lg"
          bg={props.state.routeNames[props.state.index] === 'formsScreen' ? '#10b98120' : 'transparent'}
        >
          <HStack space="md" alignItems="center">
            <Icon 
              as={FileText} 
              color={props.state.routeNames[props.state.index] === 'formsScreen' ? '#10b981' : '#ffffff'} 
              size="md" 
            />
            <Text 
              color={props.state.routeNames[props.state.index] === 'formsScreen' ? '#10b981' : '#ffffff'}
              fontSize="$md"
              fontWeight="$semibold"
            >
              Formularios
            </Text>
          </HStack>
        </Pressable>

        <Pressable
          onPress={() => {
            props.navigation.navigate('profileScreen');
          }}
          p="$3"
          borderRadius="$lg"
          bg={props.state.routeNames[props.state.index] === 'profileScreen' ? '#10b98120' : 'transparent'}
        >
          <HStack space="md" alignItems="center">
            <Icon 
              as={User} 
              color={props.state.routeNames[props.state.index] === 'profileScreen' ? '#10b981' : '#ffffff'} 
              size="md" 
            />
            <Text 
              color={props.state.routeNames[props.state.index] === 'profileScreen' ? '#10b981' : '#ffffff'}
              fontSize="$md"
              fontWeight="$semibold"
            >
              Perfil
            </Text>
          </HStack>
        </Pressable>

        <Pressable
          onPress={() => {
            props.navigation.navigate('displayScreen');
          }}
          p="$3"
          borderRadius="$lg"
          bg={props.state.routeNames[props.state.index] === 'displayScreen' ? '#10b98120' : 'transparent'}
        >
          <HStack space="md" alignItems="center">
            <Icon 
              as={Grid} 
              color={props.state.routeNames[props.state.index] === 'displayScreen' ? '#10b981' : '#ffffff'} 
              size="md" 
            />
            <Text 
              color={props.state.routeNames[props.state.index] === 'displayScreen' ? '#10b981' : '#ffffff'}
              fontSize="$md"
              fontWeight="$semibold"
            >
              Display
            </Text>
          </HStack>
        </Pressable>
      </VStack>

      {/* Botón de Cerrar Sesión */}
      <Box p="$4" borderTopWidth={1} borderTopColor="#10b98120">
        <Pressable
          onPress={handleLogout}
          p="$3"
          borderRadius="$lg"
          bg="#30ff8d20"
          borderWidth={1}
          borderColor="#10b981"
        >
          <HStack space="md" alignItems="center" justifyContent="center">
            <Icon as={LogOut} color="#10b981" size="md" />
            <Text color="#10b981" fontSize="$md" fontWeight="$bold">
              Cerrar Sesión
            </Text>
          </HStack>
        </Pressable>
      </Box>
    </Box>
  );
}

// Hook para proteger rutas
function useProtectedRoute() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inLoginScreen = segments[0] === 'loginScreen';

    if (!user && !inLoginScreen) {
      // Usuario no autenticado intentando acceder a ruta protegida
      router.replace('/loginScreen');
    } else if (user && inLoginScreen) {
      // Usuario autenticado en pantalla de login
      router.replace('/homeScreen');
    }
  }, [user, segments, loading]);

  return { user, loading };
}

function RootLayoutNav() {
  const { loading, user } = useProtectedRoute();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0A0A' }}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

    // Obtener el nombre del usuario, o usar un valor por defecto
  const userName = user?.username || 'Usuario';

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#2d2d2d',
          width: 280,
        },
        drawerActiveTintColor: '#10b981',
        drawerInactiveTintColor: '#ffffff',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#1a1a1a',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        headerLeft: () => <DrawerToggleButton />,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Inicio',
          title: userName,
          drawerItemStyle: { display: 'none' }, // Ocultar en el drawer
        }}
      />
      <Drawer.Screen
        name="loginScreen"
        options={{
          drawerLabel: 'Login',
          title: 'Iniciar Sesión',
          headerShown: false,
          drawerItemStyle: { display: 'none' }, // Ocultar en el drawer
        }}
      />
      <Drawer.Screen
        name="homeScreen"
        options={{
          drawerLabel: 'Inicio',
          title: userName,
          drawerItemStyle: { display: 'none' }, // Usar el drawer personalizado
        }}
      />
      <Drawer.Screen
        name="formsScreen"
        options={{
          drawerLabel: 'Formularios',
          title: `Formularios - ${userName}`,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="profileScreen"
        options={{
          drawerLabel: 'Perfil',
          title: 'Mi Perfil',
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="displayScreen"
        options={{
          drawerLabel: 'Display',
          title: `Display - ${userName}`,
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider config={config}>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}