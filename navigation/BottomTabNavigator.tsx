import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import SavedNewsScreen from '../screens/SavedNewsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap = 'home'; // Initialize with default value

          if (route.name === 'Início') {
            iconName = 'home';
          } else if (route.name === 'Notícias Salvas') {
            iconName = 'bookmark';
          } else if (route.name === 'Perfil') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#273469',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false, // Hide labels
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Notícias Salvas" component={SavedNewsScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
