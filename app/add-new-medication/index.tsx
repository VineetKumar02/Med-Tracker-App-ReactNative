import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import AddMedHeader from '@/components/AddMedHeader'
import AddMedicationForm from '@/components/AddMedicationForm'

export default function AddNewMedicationPage() {
    return (
        <ScrollView>
            <AddMedHeader />
            <AddMedicationForm />
        </ScrollView>
    )
}