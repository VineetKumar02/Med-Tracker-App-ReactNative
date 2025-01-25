import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constant/Colors'
import { useRouter } from 'expo-router';

export default function SignUpPage() {

    const router = useRouter();

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
                    />
                </View>

                <View style={styles?.inputContainer}>
                    <Text style={styles?.labelText}>Email</Text>
                    <TextInput
                        style={styles?.input}
                        placeholder="Enter your email"
                    />
                </View>

                <View style={styles?.inputContainer}>
                    <Text style={styles?.labelText}>Password</Text>
                    <TextInput
                        style={styles?.input}
                        secureTextEntry={true}
                        placeholder="Enter your password"
                    />
                </View>

                <TouchableOpacity style={[styles?.button, styles?.buttonPrimary]} onPress={() => { }}>
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
        marginVertical: 20,
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