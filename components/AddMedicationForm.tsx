import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Styles from '@/constant/Styles';
import Colors from '@/constant/Colors';
import { TypeList, WhenToTake } from '@/constant/Constants';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { FormatDateForText, FormatTimeForText } from '@/services/Date';


export default function AddMedicationForm() {

    const [formData, setFormData] = useState<any>({});
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value
        }));

        // setFormData({
        //     ...formData,
        //     [field]: value
        // });
    }

    const handleSubmit = () => {
        console.log(formData);
    }

    return (
        <View style={styles?.container}>
            <Text style={styles?.title}>➕ Add New Medication Details</Text>

            {/* Medicine Name Input */}
            <View style={styles?.inputContainer}>
                <Ionicons name="medkit-outline" size={24} color={Colors.PRIMARY} style={styles?.icon} />
                <TextInput
                    style={styles?.input}
                    placeholder="Medicine Name"
                    textContentType='name'
                    onChangeText={(value) => handleInputChange('name', value)}
                />
            </View>


            {/* Medicine Type Input */}
            <FlatList
                style={styles?.listContainer}
                data={TypeList}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles?.listItem, { backgroundColor: formData?.medType === item?.name ? Colors.PRIMARY : Colors.WHITE }]}
                        onPress={() => handleInputChange('medType', item?.name)}
                    >
                        <Text style={{ color: formData?.medType === item?.name ? Colors.WHITE : Colors.BLACK }}>{item?.name}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Medicine Dose Input */}
            <View style={styles?.inputContainer}>
                <Ionicons name="eyedrop-outline" size={24} color={Colors.PRIMARY} style={styles?.icon} />
                <TextInput
                    style={styles?.input}
                    placeholder="Dose Ex. 2, 5ml"
                    textContentType='name'
                    onChangeText={(value) => handleInputChange('dose', value)}
                />
            </View>


            {/* Medicine Frequency Input */}
            <View style={styles?.inputContainer}>
                <Ionicons name="time-outline" size={24} color={Colors.PRIMARY} style={styles?.icon} />
                <Picker
                    selectedValue={formData?.whenToTake}
                    onValueChange={(value) => handleInputChange('whenToTake', value)}
                    style={styles?.selectInput}
                >
                    {
                        WhenToTake.map((item, index) => (
                            <Picker.Item key={index} label={item} value={item} style={styles.input} />
                        ))
                    }

                </Picker>
            </View>


            {/* Medicine Start and End Date Input */}
            <View style={styles?.dateInputContainer}>
                <TouchableOpacity style={[styles?.inputContainer, { flex: 1 }]} onPress={() => setShowStartDate(true)}>
                    <Ionicons name="calendar-outline" size={24} color={Colors.PRIMARY} style={styles?.icon} />
                    <Text style={styles?.dateText}>
                        {formData?.startDate ? FormatDateForText(formData?.startDate) : 'Start Date'}
                    </Text>
                    {showStartDate && (
                        <RNDateTimePicker
                            minimumDate={new Date()} // Ensure start date is after today
                            onChange={(event, selectedDate) => {
                                setShowStartDate(false); // Hide the picker
                                if (selectedDate && !isNaN(selectedDate.getTime())) {
                                    handleInputChange('startDate', selectedDate);
                                }
                            }}
                            value={new Date(formData?.startDate) ?? new Date()}
                        />
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles?.inputContainer, { flex: 1 }]}
                    onPress={() => setShowEndDate(true)}
                >
                    <Ionicons name="calendar-outline" size={24} color={Colors.PRIMARY} style={styles?.icon} />
                    <Text style={styles?.dateText}>
                        {formData?.endDate ? FormatDateForText(formData.endDate) : 'End Date'}
                    </Text>
                    {showEndDate && (
                        <RNDateTimePicker
                            minimumDate={formData?.startDate ? new Date(formData.startDate) : new Date()} // Default to today if undefined
                            onChange={(event, selectedDate) => {
                                setShowEndDate(false); // Hide the picker
                                if (selectedDate && !isNaN(selectedDate.getTime())) {
                                    handleInputChange('endDate', selectedDate);
                                }
                            }}
                            value={new Date(formData?.endDate) ?? new Date()}
                        />

                    )}
                </TouchableOpacity>
            </View>

            {/* Set Reminder Input */}
            <TouchableOpacity style={styles?.inputContainer} onPress={() => setShowTimePicker(true)}>
                <Ionicons name="notifications-outline" size={24} color={Colors.PRIMARY} style={styles?.icon} />
                <Text style={styles?.dateText}>
                    {formData?.reminderTime ? FormatTimeForText(formData?.reminderTime) : 'Reminder Time'}
                </Text>
                {showTimePicker && (
                    <RNDateTimePicker
                        minimumDate={new Date()} // Ensure start date is after today
                        mode='time'
                        onChange={(event, selectedTime) => {
                            setShowTimePicker(false); // Hide the picker
                            console.log(selectedTime);
                            if (selectedTime && !isNaN(selectedTime.getTime())) {
                                handleInputChange('reminderTime', selectedTime);
                            }
                        }}
                        value={new Date(formData?.reminderTime) ?? new Date()}
                    />
                )}
            </TouchableOpacity>


            {/* Submit Button */}
            <TouchableOpacity style={Styles.btnPrimary} onPress={handleSubmit}>
                <Text style={Styles.btnPrimaryText}>Add New Medication  💊</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        gap: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        backgroundColor: Colors.WHITE,
        gap: 10,
    },
    dateInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        width: '100%',
    },
    dateText: {
        fontSize: 16,
        minHeight: 50,
        textAlignVertical: 'center',
    },
    listContainer: {
    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.GRAY,
    },
    icon: {
        paddingHorizontal: 10,
        borderRightWidth: 1,
        borderRightColor: Colors.DARK_GRAY,
    },
    input: {
        fontSize: 16,
        width: '80%',
        minHeight: 50,
        textAlignVertical: 'center',
    },
    selectInput: {
        fontSize: 16,
        width: '85%',
        minHeight: 50,
    }
});