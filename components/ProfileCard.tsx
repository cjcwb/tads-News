import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { UserPreferencesContext } from '../App';

type Category = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

const categoriesList = [
  { key: 'business', label: 'Negócios' },
  { key: 'entertainment', label: 'Entretenimento' },
  { key: 'general', label: 'Geral' },
  { key: 'health', label: 'Saúde' },
  { key: 'science', label: 'Ciência' },
  { key: 'sports', label: 'Esportes' },
  { key: 'technology', label: 'Tecnologia' },
];

const ProfileCard: React.FC = () => {
  const { categories, setCategories, user, setUser } = useContext(UserPreferencesContext);
  const [name, setName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');

  const toggleCategory = (category: Category) => {
    if (category === 'general') {
      setCategories(['general']);
    } else {
      const newCategories = categories.includes(category)
        ? categories.filter(cat => cat !== category)
        : [...categories.filter(cat => cat !== 'general'), category];

      setCategories(newCategories.length > 0 ? newCategories : ['general']);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (name.trim() === '') {
      Alert.alert('Erro', 'O nome não pode estar vazio.');
      return;
    }
    if (user) {
      setUser({ ...user, name, image: image || user.image });
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    }
  };

  const handleLogout = () => {
    setUser(null); // Implementar a lógica de logout, que pode ser limpar o estado do usuário
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={image ? { uri: image } : require('../profile.jpg')}
          style={styles.image}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.nameInput}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <Button title="Salvar Alterações" onPress={handleSave} />
      <View style={styles.categoriesContainer}>
        {categoriesList.map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.categoryButton,
              categories.includes(key) && styles.selectedCategoryButton,
            ]}
            onPress={() => toggleCategory(key as Category)}
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
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
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
  nameInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    width: '80%',
    textAlign: 'center',
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
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileCard;
