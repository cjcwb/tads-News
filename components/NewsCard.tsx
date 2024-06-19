import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NewsItem } from '../types';

type Props = {
  news: NewsItem;
};

const categoryTranslations: { [key: string]: string } = {
  business: 'Negócios',
  entertainment: 'Entretenimento',
  general: 'Geral',
  health: 'Saúde',
  science: 'Ciência',
  sports: 'Esportes',
  technology: 'Tecnologia',
};

const NewsCard: React.FC<Props> = ({ news }) => {
  const category = news.category ? categoryTranslations[news.category] : 'Categoria';
  const date = new Date(news.publishedAt).toLocaleDateString();
  const time = new Date(news.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const imageUrl = news.urlToImage || 'https://via.placeholder.com/100'; // Valor alternativo para a imagem

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title}>{news.title}</Text>
        <View style={styles.details}>
          <Text style={styles.author}>{news.author || 'Autor desconhecido'}</Text>
          <Text style={styles.dateTime}>{`${date}, ${time}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontSize: 12,
    color: '#6e6e6e',
  },
  dateTime: {
    fontSize: 12,
    color: '#6e6e6e',
  },
});

export default NewsCard;
