import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppNavigator from './AppNavigator';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import DeliveryHistoryScreen from '../screens/DeliveryHistoryScreen'

const Drawer = createDrawerNavigator();

function AppDrawerNavigator() {
  return (
    <>
      <Drawer.Navigator screenOptions={{ headerShown: false }} >
        <Drawer.Screen name="Home" component={AppNavigator} />
        <Drawer.Screen name="History" component={DeliveryHistoryScreen} />
      </Drawer.Navigator>
    </>
  );
}

export default AppDrawerNavigator;
