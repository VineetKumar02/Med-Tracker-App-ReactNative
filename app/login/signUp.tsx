import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constant/Colors'
import { useRouter } from 'expo-router';
// import { auth } from "@/config/FirebaseConfig";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';

export default function SignUpPage() {

    const router = useRouter();
    const auth = getAuth();

    const [name, setName] = useState('');
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
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
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
                    displayName: name,
                });

                console.log(user);
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
        <View style={styles?.container}>
            <View style={styles?.textContainer}>
                <Text style={styles?.headerText}>Create New Account</Text>
                <Text style={styles?.headerSubText}>Please fill in the details</Text>
                {/* <Text style={styles?.headerSubText}>You have been missed</Text> */}
            </View>

            <View style={styles?.formContainer}>
                <View style={styles?.inputContainer}>
                    <Text style={styles?.labelText}>Full Name</Text>
                    <TextInput
                        style={styles?.input}
                        placeholder="Enter your full name"
                        textContentType='name'
                        onChangeText={setName}
                        value={name}
                    />
                </View>

                <View style={styles?.inputContainer}>
                    <Text style={styles?.labelText}>Email</Text>
                    <TextInput
                        style={styles?.input}
                        placeholder="Enter your email"
                        textContentType='emailAddress'
                        onChangeText={setEmail}
                        value={email}
                    />
                </View>

                <View style={styles?.inputContainer}>
                    <Text style={styles?.labelText}>Password</Text>
                    <TextInput
                        style={styles?.input}
                        secureTextEntry={true}
                        placeholder="Enter your password"
                        textContentType='password'
                        onChangeText={setPassword}
                        value={password}
                    />
                </View>

                <TouchableOpacity style={[styles?.button, styles?.buttonPrimary]} onPress={OnCreateAccount}>
                    <Text style={styles?.btnTextPrimary}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles?.button, styles?.buttonSecondary]} onPress={() => router.replace('/login/signIn')}>
                    <Text style={styles?.btnTextSecondary}>Already have an account? Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 30,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    headerSubText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.GRAY,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        marginTop: 50,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    labelText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPrimary: {
        backgroundColor: Colors.PRIMARY,
    },
    btnTextPrimary: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors.WHITE,
    },
    buttonSecondary: {
        backgroundColor: Colors.WHITE,
    },
    btnTextSecondary: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    }
})