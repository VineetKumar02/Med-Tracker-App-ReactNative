import { View, Text, Button } from 'react-native'
import React from 'react'
import Styles from '@/constant/Styles';
import Header from '@/components/Header';
import { clearLocalStorage } from '@/services/Storage';
import EmptyState from '@/components/EmptyState';
import { useRouter } from 'expo-router';

export default function HomeScreen() {

  const router = useRouter();

  const logOut = () => {
    clearLocalStorage();
    router.replace('/login');
  }
  return (
    <View style={Styles.container}>
      <Header />
      <Button title='Logout' onPress={logOut} />
      <EmptyState />
    </View>
  )
}