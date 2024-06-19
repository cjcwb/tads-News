import React, { useContext } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, Button, Alert, Platform } from 'react-native';
import NewsCard from '../components/NewsCard';
import { SavedNewsContext } from '../App';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NewsItem } from '../types';

type SavedNewsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Notícia'>;

const SavedNewsScreen: React.FC = () => {
  const { savedNews, removeNews } = useContext(SavedNewsContext);
  const navigation = useNavigation<SavedNewsScreenNavigationProp>();

  const handleRemoveNews = (item: NewsItem) => {
    if (Platform.OS === 'web') {
      if (window.confirm('Tem certeza de que deseja remover esta notícia das salvas?')) {
        removeNews(item);
      }
    } else {
      Alert.alert(
        "Remover Notícia",
        "Tem certeza de que deseja remover esta notícia das salvas?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Remover", onPress: () => removeNews(item) }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={savedNews}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Notícia', { item, fromSaved: true })}>
              <NewsCard news={item} />
            </TouchableOpacity>
            <Button title="Remover" onPress={() => handleRemoveNews(item)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma notícia salva.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

export default SavedNewsScreen;
