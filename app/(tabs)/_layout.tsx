import React, { useEffect, useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ActivityIndicator, View } from 'react-native';
import { getLocalStorage } from '@/services/Storage';
import { StorageKeys } from '@/constant/Constants';

export default function TabLayout() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userInfo = await getLocalStorage(StorageKeys.UserDetails);
                setIsAuthenticated(!!userInfo); // Set true if userInfo exists, otherwise false
            } catch (error) {
                console.error('Error fetching user details:', error);
                setIsAuthenticated(false); // Ensure state is set to false on error
            }
        };

        fetchUserDetails();
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
