import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import verificationScreen from '../screens/verificationScreen';

const Stack = createNativeStackNavigator();

function verificationNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Verification" component={verificationScreen} />
        </Stack.Navigator>
    );
}

export default verificationNavigator;
