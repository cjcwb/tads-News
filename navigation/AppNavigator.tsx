import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import SavedNewsScreen from '../screens/SavedNewsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import CustomHeader from '../components/CustomHeader';
import { UserPreferencesContext } from '../App';
import { NewsItem } from '../types';
import { MaterialIcons } from '@expo/vector-icons';

export type RootStackParamList = {
  MainTabs: undefined;
  Notícia: { item: NewsItem; fromSaved?: boolean };
  Login: undefined;
  Signup: undefined;
  Perfil: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
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
    <Tab.Screen 
      name="Início" 
      component={HomeScreen}
      options={{ headerTitle: () => <CustomHeader /> }}
    />
    <Tab.Screen 
      name="Notícias Salvas" 
      component={SavedNewsScreen}
      options={{ headerTitle: () => <CustomHeader /> }}
    />
    <Tab.Screen 
      name="Perfil" 
      component={ProfileScreen}
      options={{ headerTitle: () => <CustomHeader /> }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { user } = useContext(UserPreferencesContext);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Notícia" 
            component={NewsScreen} 
            options={{ headerTitle: () => <CustomHeader /> }}
          />
          <Stack.Screen 
            name="Perfil" 
            component={ProfileScreen} 
            options={{ headerTitle: () => <CustomHeader /> }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
