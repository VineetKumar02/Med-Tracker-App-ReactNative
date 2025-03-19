import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setLocalStorage } from '@/services/Storage';
import Styles from '@/constant/Styles';
import { auth } from "@/config/FirebaseConfig";
import { StorageKeys } from '@/constant/Constants';

export default function SignUpPage() {

    const router = useRouter();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (input: string) => {
        const emailPattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
        if (!emailPattern.test(input)) {
            Alert.alert('Warning', 'Enter a valid email address');
            return false;
        }
        return true;
    };

    const validatePassword = (input: string) => {
        if (input.length < 8) {
            Alert.alert('Warning', 'Password must be atleast 8 characters long');
            return false;
        }
        return true;
    };

    const OnCreateAccount = () => {
        if (fullName.trim() === '' || email.trim() === '' || password.trim() === '') {
            Alert.alert('Warning', 'Please fill in all fields');
            return;
        }
        if (!validateEmail(email) || !validatePassword(password)) {
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;

                await updateProfile(user, {
                    displayName: fullName,
                });

                console.log(user);
                await setLocalStorage(StorageKeys.UserDetails, user);
                router.push('/(tabs)');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                if (errorCode == 'auth/email-already-in-use') {
                    ToastAndroid.show('Email already exist', ToastAndroid.BOTTOM);
                }
            });
    }

    return (
        <View style={Styles.container}>
            <View style={styles?.textContainer}>
                <Text style={Styles.headerText}>Create New Account</Text>
                <Text style={Styles.headerSubText}>Please fill in the details</Text>
                {/* <Text style={styles?.headerSubText}>You have been missed</Text> */}
            </View>

            <View style={styles?.formContainer}>
                <View style={Styles.inputContainer}>
                    <Text style={Styles.labelText}>Full Name</Text>
                    <TextInput
                        style={Styles.input}
                        placeholder="Enter your full fullName"
                        inputMode='text'
                        onChangeText={setFullName}
                        value={fullName}
                    />
                </View>

                <View style={Styles.inputContainer}>
                    <Text style={Styles.labelText}>Email</Text>
                    <TextInput
                        style={Styles.input}
                        placeholder="Enter your email"
                        inputMode='email'
                        onChangeText={setEmail}
                        value={email}
                    />
                </View>

                <View style={Styles.inputContainer}>
                    <Text style={Styles.labelText}>Password</Text>
                    <TextInput
                        style={Styles.input}
                        secureTextEntry={true}
                        placeholder="Enter your password"
                        inputMode='text'
                        onChangeText={setPassword}
                        value={password}
                    />
                </View>

                <TouchableOpacity style={Styles.btnPrimary} onPress={OnCreateAccount}>
                    <Text style={Styles.btnPrimaryText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Styles.btnSecondary} onPress={() => router.replace('/login/signIn')}>
                    <Text style={Styles.btnSecondaryText}>Already have an account? Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        marginTop: 50,
    },
})