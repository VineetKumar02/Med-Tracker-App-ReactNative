import { View, Text, Button } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from "@/config/FirebaseConfig";

export default function HomeScreen() {
  return (
    <View>
      <Text>homeScreen</Text>
      <Button title='Logout' onPress={() => signOut(auth)} />
    </View>
  )
}