import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Linking, Alert, Platform } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SavedNewsContext } from '../App';
import { NewsItem } from '../types';

type NewsScreenRouteProp = RouteProp<RootStackParamList, 'Notícia'>;
type NewsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Notícia'>;

type Props = {
  route: NewsScreenRouteProp;
  navigation: NewsScreenNavigationProp;
};

const NewsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { item, fromSaved } = route.params;
  const { saveNews } = useContext(SavedNewsContext);
  const [saved, setSaved] = useState(false);

  const truncatedDescription = item.description?.split('[+')[0];
  const truncatedContent = item.content?.split('[+')[0];

  const handleSaveNews = () => {
    saveNews(item);
    setSaved(true);
    if (Platform.OS === 'web') {
      alert('A notícia foi salva com sucesso!');
    } else {
      Alert.alert('Notícia Salva', 'A notícia foi salva com sucesso!');
    }
  };

  return (
    <View style={styles.container}>
      {item.urlToImage && <Image source={{ uri: item.urlToImage }} style={styles.image} />}
      <Text style={styles.title}>{item.title}</Text>
      {truncatedDescription && <Text style={styles.content}>{truncatedDescription}</Text>}
      {truncatedContent && <Text style={styles.content}>{truncatedContent}</Text>}
      <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
        <Text style={styles.readMore}>Ver notícia completa</Text>
      </TouchableOpacity>
      {!fromSaved && (
        <View style={styles.saveButtonContainer}>
          <Button title="Salvar" onPress={handleSaveNews} disabled={saved} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  readMore: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 10,
  },
  saveButtonContainer: {
    marginTop: 20,
  },
});

export default NewsScreen;
