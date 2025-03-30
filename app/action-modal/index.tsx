import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FormatTimestampToDateString, FormatTimestampToTimeString } from '@/services/Date';
import { db } from '@/config/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Colors from '@/constant/Colors';
import MedCardItem from '@/components/MedCardItem';

export default function ActionModal() {
    const router = useRouter();
    const data: any = useLocalSearchParams();
    const [medicine, setMedicine] = useState<any>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchMedicineById(data.id);
    }, []);

    const fetchMedicineById = async (id: string) => {
        setLoading(true);
        // Fetch the medicine details from the database
        try {
            const docRef = doc(db, "medications", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setMedicine(docSnap.data());
            } else {
                console.log("Document does not exist")
            }

        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={[styles?.backBtn]}>
                <MaterialIcons name="arrow-back-ios" size={24} color={Colors.GREEN} style={[styles?.backIcon]} />
                <Text style={styles?.backText}>Back</Text>
            </TouchableOpacity>

            {loading || !medicine ?
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
                :
                <View style={styles?.container}>
                    <Image source={require('@/assets/images/notification.gif')} style={{ width: 125, height: 125, alignSelf: 'center' }} />
                    <Text>{data?.selectedDate}</Text>
                    <Text style={styles.title}>{FormatTimestampToTimeString(medicine?.reminderTime)}</Text>
                    <Text style={{ fontSize: 16, marginBottom: 10 }} >It's time to take</Text>
                    <MedCardItem medicine={medicine} />
                    <View style={styles?.btnGroup}>
                        <TouchableOpacity onPress={() => { }} style={[styles?.actionButton, styles?.closeBtn]}>
                            <Ionicons name="close" size={24} color={Colors.RED} />
                            <Text style={{ color: Colors.RED }}>Missed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} style={[styles?.actionButton, styles?.takenBtn]}>
                            <MaterialIcons name="done" size={24} color={Colors.WHITE} />
                            <Text style={{ color: Colors.WHITE }}>Taken</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Text style={styles.title}>Medication Details</Text>
                    <Text>Name: {medicine?.name}</Text>
                    <Text>Type: {medicine?.medType}</Text>
                    <Text>Dose: {medicine?.dose}</Text>
                    <Text>When to Take: {medicine?.whenToTake}</Text>
                    <Text>Start Date: {FormatTimestampToDateString(medicine?.startDate)}</Text>
                    <Text>End Date: {FormatTimestampToDateString(medicine?.endDate)}</Text>
                    <Text>Reminder Time: {FormatTimestampToTimeString(medicine?.reminderTime)}</Text>
                    <Text>Selected Date: {data?.selectedDate}</Text> */}
                </View>
            }
            {!loading && !medicine &&
                <Text style={styles.title}>Medication Details Not Found!</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    },
    btnGroup: {
        paddingVertical: 15,
        borderRadius: 5,
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    actionButton: {
        padding: 10,
        borderRadius: 8,
        gap: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    closeBtn: {
        borderWidth: 2,
        borderColor: Colors.RED,
        color: Colors.RED,
    },
    takenBtn: {
        borderWidth: 2,
        borderColor: Colors.DARK_GREEN,
        backgroundColor: Colors.GREEN,
        color: Colors.WHITE,
    },
    backBtn: {
        borderRadius: 20,
        width: 125,
        gap: 5,
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.GREEN,
    },
    backIcon: {
        color: Colors.GREEN,
        position: 'absolute',
        left: 10,
    },
    backText: {
        color: Colors.GREEN,
        fontSize: 16,
        fontWeight: 'bold',
    },
});