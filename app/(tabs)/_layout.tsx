import React, { useEffect, useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { auth } from "@/config/FirebaseConfig";
import { ActivityIndicator, View } from 'react-native';

export default function TabLayout() {
    const router = useRouter();
    const auth = getAuth();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isAuthenticated === false) {
            router.replace('/login');
        }
    }, [isAuthenticated]);

    if (isAuthenticated === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="AddNew"
                options={{
                    tabBarLabel: 'Add',
                    tabBarIcon: ({ color, size }) => <FontAwesome name="plus-square" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-alt" size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
