import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../screens/Dashboard';
import Register from '../screens/Register';
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

const AppRouts: React.FC = () => {

  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 88,
        }
      }}
    >
      <Screen
        name="Home"
        component={Dashboard}
        options={{ 
          headerTransparent: true,
          headerTitle: '',
          tabBarIcon: (({ size, color }) => (
            <Feather size={size} color={color} name="home" />
          ))
        }}
      />
      <Screen
        name="Submeter Certificado"
        component={Register}
        options={{ 
          headerTransparent: true,
          headerTitle: '',
          tabBarIcon: (({ size, color }) => (
            <Feather size={size} color={color} name="send" />
          ))
        }}
      />
      <Screen
        name="Meus envios"
        component={Register}
        options={{ 
          headerTransparent: true,
          headerTitle: '',
          tabBarIcon: (({ size, color }) => (
            <Feather size={size} color={color} name="list" />
          ))
        }}
      />
    </Navigator>
  );
}

export default AppRouts;