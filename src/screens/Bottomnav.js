import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Ic from 'react-native-vector-icons/AntDesign'
// import Ic2 from 'react-native-vector-icons/
import Cart from 'react-native-vector-icons/AntDesign'
import MapView from 'react-native-vector-icons/FontAwesome5'
import {useNavigation} from '@react-navigation/native'
export default function Bottomnav(){
    const navigation = useNavigation()
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}><Ic name='home' style={styles.icn}/></TouchableOpacity>
        <TouchableOpacity style={styles.btncon2} onPress={()=>navigation.navigate('Home')}><Ic name='search1' style={[styles.icn,{color:'white'}]}/></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Cart')}><Cart name='shoppingcart' style={styles.icn}/></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Track')}><MapView name='map-marked-alt' style={styles.icn}/></TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    container:{width:'100%',height:50,backgroundColor:'white',flexDirection:'row',borderTopWidth:2,borderTopColor:'#E0E0E0',alignItems:'center',justifyContent:'space-evenly'},
    icn:{color:'black',fontSize:30},
    btncon2: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: -20,
        backgroundColor: 'red',
        width: 60,
        height: 60,
        borderRadius: 60,
        marginTop:15
    },
})
