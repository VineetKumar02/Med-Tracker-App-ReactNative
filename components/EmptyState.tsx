import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '@/constant/Colors'
import { DefaultStrings } from '@/constant/Constants';
import Styles from '@/constant/Styles';
import { useRouter } from 'expo-router';

export default function EmptyState({ loading = false }: { loading?: boolean }) {

    const router = useRouter();
    if (loading) {
        return (
            <View style={styles?.containerCentered}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
        )
    }

    return (
        <View style={styles?.containerCentered}>
            <Image
                source={require('@/assets/images/medicine.png')}
                style={styles?.image}
            />
            <Text style={styles?.medicationHeaderText}>{DefaultStrings.NoMedication}</Text>
            <Text style={styles?.medicationSubText}>{DefaultStrings.MedicationSubText}</Text>
            <View style={styles.gapVertical}></View>
            <TouchableOpacity style={Styles.btnPrimary} onPress={() => router.push('./add-new-medication')}>
                <Text style={Styles.btnPrimaryText}>{DefaultStrings.AddNewMedicationBtn}</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    containerCentered: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 125,
        height: 125,
        alignSelf: 'center',
    },
    medicationHeaderText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 25,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    medicationSubText: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
        color: Colors.DARK_GRAY,
    },
    gapVertical: {
        color: 'none',
        backgroundColor: 'none',
        height: 10,
    }
});