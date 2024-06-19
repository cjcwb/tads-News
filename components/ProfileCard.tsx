import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { UserPreferencesContext } from '../App';

const categoriesList = [
  { key: 'business', label: 'Negócios' },
  { key: 'entertainment', label: 'Entretenimento' },
  { key: 'general', label: 'Geral' },
  { key: 'health', label: 'Saúde' },
  { key: 'science', label: 'Ciência' },
  { key: 'sports', label: 'Esportes' },
  { key: 'technology', label: 'Tecnologia' },
];

const ProfileCard = () => {
  const { categories, setCategories, user } = useContext(UserPreferencesContext);

  const toggleCategory = (category: string) => {
    if (category === 'general') {
      setCategories(['general']);
    } else {
      const newCategories = categories.includes(category)
        ? categories.filter(cat => cat !== category)
        : [...categories.filter(cat => cat !== 'general'), category];

      setCategories(newCategories.length > 0 ? newCategories : ['general']);
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={user?.image ? { uri: user.image } : require('../profile.jpg')}
        style={styles.image}
      />
      {user && <Text style={styles.name}>{user.name}</Text>}
      <View style={styles.categoriesContainer}>
        {categoriesList.map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.categoryButton,
              categories.includes(key) && styles.selectedCategoryButton,
            ]}
            onPress={() => toggleCategory(key)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                categories.includes(key) && styles.selectedCategoryButtonText,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  categoryButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  selectedCategoryButton: {
    backgroundColor: '#007bff',
  },
  categoryButtonText: {
    color: '#007bff',
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
});

export default ProfileCard;
