import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import AddMedHeader from '@/components/AddMedHeader'
import AddMedicationForm from '@/components/AddMedicationForm'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AddNewMedicationPage() {
    return (
        <SafeAreaView>
            <ScrollView>
                <AddMedHeader />
                <AddMedicationForm />
            </ScrollView>
        </SafeAreaView>
    )
}