import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDateRangeToDisplay } from '@/services/Date';

export default function MedicationList() {

    const [medList, setMedList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState<{ date: string; day: string; dayName: string; year: string; }[]>([]);

    useEffect(() => {
        const dateRange = getDateRangeToDisplay();
        setDateRange(dateRange);
        console.log(dateRange);
    }, []);

    return (
        <View>
            <Image source={require('@/assets/images/medication.jpeg')}
                style={{ width: '100%', height: 200, borderRadius: 10 }}
            />
            <Text>MedicationList</Text>
        </View>
    )
}