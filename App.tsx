import 'react-native-gesture-handler';
import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { NewsItem } from './types';

type User = {
  username: string;
  password: string;
  name: string;
  image?: string;
};

type UserPreferencesContextType = {
  categories: string[];
  setCategories: (categories: string[]) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  users: User[];
  setUsers: (users: User[]) => void;
};

type SavedNewsContextType = {
  savedNews: NewsItem[];
  saveNews: (news: NewsItem) => void;
  removeNews: (news: NewsItem) => void;
};

const defaultUserPreferencesValue: UserPreferencesContextType = {
  categories: ['general'],
  setCategories: () => {},
  user: null,
  setUser: () => {},
  users: [],
  setUsers: () => {},
};

const defaultSavedNewsValue: SavedNewsContextType = {
  savedNews: [],
  saveNews: () => {},
  removeNews: () => {},
};

export const UserPreferencesContext = createContext<UserPreferencesContextType>(defaultUserPreferencesValue);
export const SavedNewsContext = createContext<SavedNewsContextType>(defaultSavedNewsValue);

export default function App() {
  const [savedNews, setSavedNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['general']);
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const saveNews = (news: NewsItem) => {
    setSavedNews((prevNews) => [...prevNews, news]);
  };

  const removeNews = (news: NewsItem) => {
    setSavedNews((prevNews) => prevNews.filter((item) => item.url !== news.url));
  };

  return (
    <UserPreferencesContext.Provider value={{ categories, setCategories, user, setUser, users, setUsers }}>
      <SavedNewsContext.Provider value={{ savedNews, saveNews, removeNews }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SavedNewsContext.Provider>
    </UserPreferencesContext.Provider>
  );
}
