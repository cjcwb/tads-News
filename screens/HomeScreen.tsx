import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Button, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NewsItem } from '../types';
import { UserPreferencesContext } from '../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { categories} = useContext(UserPreferencesContext);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const promises = categories.map(category => 
        axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=SUA_API`)
      );
      const responses = await Promise.all(promises);
      const allArticles = responses.flatMap(response => response.data.articles);
      const filteredNews = allArticles.filter((article: NewsItem) => article.urlToImage);
      setNews(filteredNews);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [categories]);

  return (
    <ScrollView style={styles.container}>
      <Button title="Recarregar Notícias" onPress={fetchNews} disabled={loading} />
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Notícia', { item })}>
            <NewsCard news={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma notícia encontrada.</Text>}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

export default HomeScreen;
