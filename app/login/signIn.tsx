import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constant/Colors'
import { useRouter } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from "@/config/FirebaseConfig";

export default function SignInPage() {

    const router = useRouter();
    const auth = getAuth();

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

    const OnSignInClick = () => {
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Warning', 'Please fill in all fields');
            return;
        }
        if (!validateEmail(email) || !validatePassword(password)) {
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
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
        <View style={styles?.container}>
            <View style={styles?.textContainer}>
                <Text style={styles?.headerText}>Let's Sign You In</Text>
                <Text style={styles?.headerSubText}>Welcome Back</Text>
                <Text style={styles?.headerSubText}>You have been missed</Text>
            </View>

            <View style={styles?.formContainer}>
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

                <TouchableOpacity style={[styles?.button, styles?.buttonPrimary]} onPress={OnSignInClick}>
                    <Text style={styles?.btnTextPrimary}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles?.button, styles?.buttonSecondary]} onPress={() => router.replace('/login/signUp')}>
                    <Text style={styles?.btnTextSecondary}>Create Account</Text>
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
        fontSize: 30,
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