import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import Styles from '@/constant/Styles';

export default function AddMedHeader() {

    const router = useRouter();

    return (
        <View>
            <Image source={require('@/assets/images/consult.png')} style={styles?.image} />
            <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', padding: 25 }}>
                <FontAwesome6 name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 280,
    }
});