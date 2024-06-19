import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { NewsItem } from '../types';

type Props = {
  news: NewsItem;
};

const NewsCard = ({ news }: Props) => {
  return (
    <View style={styles.card}>
      {news.urlToImage ? (
        <Image source={{ uri: news.urlToImage }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text>Sem imagem</Text>
        </View>
      )}
      <Text style={styles.title}>{news.title}</Text>
      {news.description && <Text style={styles.description}>{news.description}</Text>}
      <TouchableOpacity onPress={() => Linking.openURL(news.url)}>
        <Text style={styles.readMore}>Ver notícia completa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeholder: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  readMore: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 10,
  },
});

export default NewsCard;
