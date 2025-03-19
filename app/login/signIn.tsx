import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setLocalStorage } from '@/services/Storage';
import Styles from '@/constant/Styles';
import { auth } from "@/config/FirebaseConfig";
import { StorageKeys } from '@/constant/Constants';

export default function SignInPage() {

    const router = useRouter();

    const [email, setEmail] = useState('test@gmail.com');
    const [password, setPassword] = useState('12345678');

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

    const OnSignInClick = () => {
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Warning', 'Please fill in all fields');
            return;
        }
        if (!validateEmail(email) || !validatePassword(password)) {
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                await setLocalStorage(StorageKeys.UserDetails, user);
                router.push('/(tabs)');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                if (errorCode == 'auth/invalid-credential')
                    Alert.alert('Invalid email or password');
            }
            );
    }

    return (
        <View style={Styles.container}>
            <View style={styles?.textContainer}>
                <Text style={Styles.headerText}>Let's Sign You In</Text>
                <Text style={Styles.headerSubText}>Welcome Back</Text>
                <Text style={Styles.headerSubText}>You have been missed</Text>
            </View>

            <View style={styles?.formContainer}>
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

                <TouchableOpacity style={Styles.btnPrimary} onPress={OnSignInClick}>
                    <Text style={Styles.btnPrimaryText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Styles.btnSecondary} onPress={() => router.replace('/login/signUp')}>
                    <Text style={Styles.btnSecondaryText}>Create Account</Text>
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