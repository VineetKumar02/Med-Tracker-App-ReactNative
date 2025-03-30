import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDateRangeToDisplay } from '@/services/Date';
import { FlatList } from 'react-native';
import Colors from '@/constant/Colors';
import { getLocalStorage } from '@/services/Storage';
import { StorageKeys } from '@/constant/Constants';
import { collection, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import MedCardItem from './MedCardItem';
import EmptyState from './EmptyState';
import { useRouter } from 'expo-router';

export default function MedicationList() {

    const router = useRouter();

    const [medList, setMedList] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [dateRange, setDateRange] = useState<{ date: string; day: string; dayName: string; year: string; }[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toLocaleDateString('en-GB'));

    useEffect(() => {
        setDateRangeList();
    }, []);

    useEffect(() => {
        fetchMedicationList(selectedDate);
    }, [selectedDate]);

    const setDateRangeList = () => {
        const dateRange = getDateRangeToDisplay();
        setDateRange(dateRange);
    }


    const fetchMedicationList = async (selectedDate: string) => {
        setLoading(true);
        try {
            setMedList([]); // Clear the list
            const userDetails: any = await getLocalStorage(StorageKeys.UserDetails);
            const [day, month, year] = selectedDate.split('/');
            const currSelectedDate = new Date(`${year}-${month}-${day}T00:00:00Z`);
            const currSelectedTimestamp = Timestamp.fromDate(currSelectedDate); // Convert to Firestore Timestamp

            const q = query(
                collection(db, 'medications'),
                where('userEmail', '==', userDetails?.email),
                where('startDate', '<=', currSelectedTimestamp),
                where('endDate', '>=', currSelectedTimestamp)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, ' => ', doc.data());
                setMedList((prev: any) => [...prev, doc.data()]);
            }
            );
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
            // setMedList([]);
        }
    }

    const EmptyComponent = () => {
        return (
            <EmptyState loading={loading} />
        )
    }


    return (
        <View style={{ flex: 1, height: '100%', width: '100%' }}>
            <Image source={require('@/assets/images/medication.jpeg')} style={styles?.image} />
            <FlatList
                style={styles?.dateListContainer}
                data={dateRange}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles?.dateContainer, selectedDate === item.date ? { backgroundColor: Colors.PRIMARY } : {}]}
                        onPress={() => { setSelectedDate(item.date); }}
                    >
                        <Text style={[{ fontSize: 15, fontWeight: '500' }, selectedDate === item.date ? { color: Colors.WHITE } : { color: Colors.BLACK }]}>{item.dayName}</Text>
                        <Text style={[{ fontSize: 20, fontWeight: '800' }, selectedDate === item.date ? { color: Colors.WHITE } : { color: Colors.BLACK }]}>{item.day}</Text>
                    </TouchableOpacity>
                )}
            />
            <FlatList
                style={styles?.medListContainer}
                data={medList}
                onRefresh={() => fetchMedicationList(selectedDate)}
                refreshing={loading}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListEmptyComponent={EmptyComponent}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        key={index}
                        // onPress={() => { router.push('/action-modal', { data: { ...item, selectedDate } }) }}
                        onPress={() => {
                            // console.log("Medicine3:", item);
                            // const data = {
                            //     ...item,
                            //     selectedDate,
                            // };
                            const data = {
                                id: item['docId'],
                                selectedDate,
                            };
                            router.push({
                                pathname: '/action-modal',
                                params: data,
                            })
                        }}
                    >
                        <MedCardItem medicine={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        alignSelf: 'center',
    },
    dateListContainer: {
        marginVertical: 10,
    },
    dateContainer: {
        padding: 15,
        backgroundColor: Colors.LIGHT_GRAY_BORDER,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    medListContainer: {
        marginVertical: 10,
    },
});