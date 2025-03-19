import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { getLocalStorage } from '@/services/Storage';
import Colors from '@/constant/Colors';
import { StorageKeys } from '@/constant/Constants';


export default function Header() {

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        const userInfo = await getLocalStorage(StorageKeys.UserDetails);
        setUser(userInfo);
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image source={require('@/assets/images/smiley.png')}
                    style={{ width: 50, height: 50 }}
                />
                <Text style={{ fontSize: 25, fontWeight: 'bold', textTransform: 'capitalize' }}>Hello {user?.displayName}  👋</Text>
            </View>

            <FontAwesome6 name="gear" size={25} color={Colors.DARK_GRAY} />
        </View>
    )
}