import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Welcomescreen from './src/screens/Welcomescreen';
import LoginScreen from './src/screens/login/LoginScreen';
import SignUpScreen from './src/screens/login/SignUpscreen';
import Homescreen from './src/screens/Homescreen';
import {NavigationContainer} from '@react-navigation/native';
import User from './src/screens/User';
import Foodpage from './src/screens/Foodpage';
import TrackOrders from './src/screens/TrackOrders';
import UserCart from './src/screens/UserCart';
import Placeorder from './src/screens/Placeorder';
const Stack=createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='welcome' options={{headerShown:false}}>
      <Stack.Screen name='welcome' component={Welcomescreen}
      options={{headerShown: false, }}/>
      <Stack.Screen name='Login' component={LoginScreen}  options={{headerShown: false, }}/>
      <Stack.Screen name='Signup' component={SignUpScreen}  options={{headerShown: false, }}/>
      <Stack.Screen name='Home' component={Homescreen}  options={{headerShown: false, }}/>
      <Stack.Screen name='User' component={User}  options={{headerShown: false, }}/>
      <Stack.Screen name='Foodpage' component={Foodpage}  options={{headerShown: false, }}/>
      <Stack.Screen name='Cart' component={UserCart} options={{headerShown: false, }}/>
      <Stack.Screen name='Track' component={TrackOrders} options={{headerShown: false, }}/>
      <Stack.Screen name='Place' component={Placeorder} options={{headerShown: false, }}/>
    </Stack.Navigator> 
    </NavigationContainer>
  )
}

const styles=StyleSheet.create({
  container:{display:'flex',flex:1}
})