import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Styles from '@/constant/Styles';
import Colors from '@/constant/Colors';
import { StorageKeys, TypeList, WhenToTake } from '@/constant/Constants';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { FormatDateForText, FormatTimeForText } from '@/services/Date';
import { MedForm } from '@/models/MedForm';
import { validateMedForm } from '@/utils/validations';
import { MedFormErrors } from '@/models/MedFormErrors';
import { getLocalStorage } from '@/services/Storage';
import { doc, setDoc } from 'firebase/firestore';
import { dismissBrowser } from 'expo-web-browser';
import { db } from '@/config/FirebaseConfig';
import { useRouter } from 'expo-router';


export default function AddMedicationForm() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [formData, setFormData] = useState<MedForm>({
        name: "",
        medType: "",
        dose: "",
        whenToTake: "",
        startDate: null,
        endDate: null,
        reminderTime: null,
    });

    const [errors, setErrors] = useState<MedFormErrors>({
        name: "",
        medType: "",
        dose: "",
        whenToTake: "",
        startDate: "",
        endDate: "",
        reminderTime: "",
    });

    const handleInputChange = (field: keyof MedForm, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" })); // Remove error when user types
    };

    const handleSubmit = async () => {
        const validationErrors = validateMedForm(formData);
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
        } else {
            setLoading(true);
            console.log("Form Submitted Successfully", formData);
            const userInfo: any = await getLocalStorage(StorageKeys.UserDetails);
            const docId = Date.now().toString();
            // Add to Firestore
            try {
                await setDoc(doc(db, 'medications', docId), {
                    ...formData,
                    userEmail: userInfo?.email,
                    docId: docId,
                });
                Alert.alert("Success", "Medication details saved successfully");
            }
            catch (e) {
                Alert.alert("Error", "Error saving medication details: " + e,
                    [{
                        text: 'OK', onPress: () => router.push('/(tabs)')
                    }]);
            }
            finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles?.container}>
            <Text style={styles?.title}>➕ Add New Medication Details</Text>

            {/* Medicine Name Input */}
            <View style={styles?.inputContainerWithError}>
                <View style={[styles?.inputContainer, errors.name ? Styles.inputError : {}]}>
                    <Ionicons name="medkit-outline" size={24} color={Colors.PRIMARY} style={styles?.icon} />
                    <TextInput
                        style={styles?.input}
                        placeholder="Medicine Name"
                        inputMode='text'
                        onChangeText={(value) => handleInputChange('name', value)}
                    />
                </View>
                {errors.name && <Text style={Styles.errorText}>{errors.name}</Text>}
            </View>


            {/* Medicine Type Input */}
            <View style={styles?.inputContainerWithError}>
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
                {errors.medType && <Text style={Styles.errorText}>{errors.medType}</Text>}
            </View>

            {/* Medicine Dose Input */}
            <View style={styles?.inputContainerWithError}>
                <View style={[styles?.inputContainer, errors.medType ? Styles.inputError : {}]}>
                    <Ionicons name="eyedrop-outline" size={24} color={Colors.PRIMARY} style={styles?.icon} />
                    <TextInput
                        style={styles?.input}
                        placeholder="Dose Ex. 2, 5ml"
                        inputMode='text'
                        onChangeText={(value) => handleInputChange('dose', value)}
                    />
                </View>
                {errors.dose && <Text style={Styles.errorText}>{errors.dose}</Text>}
            </View>


            {/* Medicine Frequency Input */}
            <View style={styles?.inputContainerWithError}>
                <View style={[styles?.inputContainer, errors.whenToTake ? Styles.inputError : {}]}>
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
                {errors.whenToTake && <Text style={Styles.errorText}>{errors.whenToTake}</Text>}
            </View>


            {/* Medicine Start and End Date Input */}
            <View style={styles?.dateInputContainer}>

                <View style={[styles?.inputContainerWithError, { flex: 1 }]}>
                    <TouchableOpacity
                        style={[styles?.inputContainer, errors.startDate ? Styles.inputError : {}]}
                        onPress={() => setShowStartDate(true)}
                    >
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
                    {errors.startDate && <Text style={Styles.errorText}>{errors.startDate}</Text>}
                </View>

                <View style={[styles?.inputContainerWithError, { flex: 1 }]}>
                    <TouchableOpacity
                        style={[styles?.inputContainer, errors.endDate ? Styles.inputError : {}]}
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
                    </TouchableOpacity>{errors.endDate && <Text style={Styles.errorText}>{errors.endDate}</Text>}
                </View>
            </View>

            {/* Set Reminder Input */}
            <View style={styles?.inputContainerWithError}>
                <TouchableOpacity style={[styles?.inputContainer, errors.reminderTime ? Styles.inputError : {}]} onPress={() => setShowTimePicker(true)}>
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
                                if (selectedTime && !isNaN(selectedTime.getTime())) {
                                    handleInputChange('reminderTime', selectedTime);
                                }
                            }}
                            value={new Date(formData?.reminderTime) ?? new Date()}
                        />
                    )}
                </TouchableOpacity>
                {errors.reminderTime && <Text style={Styles.errorText}>{errors.reminderTime}</Text>}
            </View>


            {/* Submit Button */}
            <TouchableOpacity style={Styles.btnPrimary} onPress={handleSubmit}>
                {loading ?
                    <ActivityIndicator color={Colors.WHITE} size={'large'} /> :
                    <Text style={Styles.btnPrimaryText}>Add New Medication  💊</Text>}
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
        minHeight: 50,
    },
    inputContainerWithError: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minHeight: 50,
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