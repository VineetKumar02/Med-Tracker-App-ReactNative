import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constant/Colors'
import { useRouter } from 'expo-router'

export default function LoginPage() {

    const router = useRouter();

    return (
        <View style={styles?.container}>
            <View>
                <Image source={require('@/assets/images/login.png')} style={styles?.image} />
            </View>

            <View style={styles?.bottomContainer}>
                <Text style={styles?.headerText}>Stay on Track, Stay Heathy</Text>
                <Text style={styles?.headerSubText}>Track your meds, take control of your health. Stay consistent, stay confident</Text>
                <TouchableOpacity style={styles?.button} onPress={() => router.push('./login/signIn')}>
                    <Text style={styles?.btnText}>Continue</Text>
                </TouchableOpacity>
                <Text style={{ color: Colors.WHITE }}>Note: By Clicking Continue button, you will agree to our terms and conditions</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        height: '100%',
        width: '100%',
        flex: 1,
    },
    image: {
        width: 210,
        height: 450,
        borderRadius: 23,
        resizeMode: 'cover',
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: 30,
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    headerSubText: {
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    btnText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors.BLACK,
    }
})