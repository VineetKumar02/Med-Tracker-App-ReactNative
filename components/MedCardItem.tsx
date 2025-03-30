import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Medicine } from '@/models/Medicine.model'
import Colors from '@/constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FormatTimestampToTimeString } from '@/services/Date';
import { getIconUrlByName } from '@/constant/Constants';

export default function MedCardItem({ medicine }: { medicine: Medicine }) {
    // console.log("Medicine2:", medicine, "Type OF ReminderTime: ", typeof medicine.reminderTime);
    return (
        <View style={styles?.medContainer}>
            <View style={styles?.rowContainer}>
                <Image source={{ uri: getIconUrlByName(medicine?.medType) }} style={{ width: 60, height: 60 }} />

                <View>
                    <Text style={{ fontSize: 18, fontWeight: '900' }}>{medicine?.name}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500' }}>{medicine?.whenToTake}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '300' }}>{medicine?.dose} {medicine?.medType}</Text>
                </View>
            </View>
            <View style={styles?.timeContainer}>
                <Ionicons name="timer-outline" size={24} color="black" />
                <Text style={{ fontSize: 15, fontWeight: '500' }}>{FormatTimestampToTimeString(medicine?.reminderTime)}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    medContainer: {
        padding: 10,
        backgroundColor: Colors.LIGHT_GRAY_BORDER,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        width: '100%',
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    timeContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
});