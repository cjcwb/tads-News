import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserPreferencesContext } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Perfil'>;

const CustomHeader = () => {
  const { user } = useContext(UserPreferencesContext);
  const [greeting, setGreeting] = useState('Bom dia');
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Bom dia');
    } else if (currentHour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, []);

  const handleProfilePress = () => {
    navigation.navigate('Perfil');
  };

  return (
    <TouchableOpacity onPress={handleProfilePress}>
      <View style={styles.header}>
        <Image
          source={user?.image ? { uri: user.image } : require('../profile.jpg')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.greeting}>{greeting},</Text>
          <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  greeting: {
    fontSize: 12,
    color: '#6e6e6e',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CustomHeader;
