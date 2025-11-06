import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { Icon, Pressable } from '@gluestack-ui/themed';
import { Menu } from 'lucide-react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

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

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider config={config}>
        <Drawer
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
              title: 'David Rangel',
            }}
          />
          <Drawer.Screen
            name="FormsScreen"
            options={{
              drawerLabel: 'Forms',
              title: 'David Rangel',
            }}
          />
          <Drawer.Screen
            name="ProfileScreen"
            options={{
              drawerLabel: 'Profile',
              title: 'David Rangel',
            }}
          />
        </Drawer>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}