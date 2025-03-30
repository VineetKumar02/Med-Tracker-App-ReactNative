import { View, Text, Button, StyleSheet, ScrollView, FlatList } from 'react-native'
import React from 'react'
import Styles from '@/constant/Styles';
import Header from '@/components/Header';
import { clearLocalStorage } from '@/services/Storage';
import { useRouter } from 'expo-router';
import MedicationList from '@/components/MedicationList';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const router = useRouter();

  const logOut = () => {
    clearLocalStorage();
    router.replace('/login');
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={[]}
        renderItem={() => null}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <View style={styles?.container}>
            <StatusBar style="inverted" animated />
            <Header />
            <MedicationList />
          </View>

        }
      />
      {/* <View style={styles?.container}>
        <StatusBar style="inverted" animated />
        <Header />
        <MedicationList />
      </View> */}
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingHorizontal: 15,
    gap: 10,
  },
});