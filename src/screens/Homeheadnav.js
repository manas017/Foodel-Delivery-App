import React from 'react'
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native'
import MenuIcon from 'react-native-vector-icons/Entypo';
import FastFoodIcon from 'react-native-vector-icons/Ionicons';
import UserIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
export default function Homeheadnav() {
  const navigation=useNavigation()
  return (
    <View style={styles.container}>
      <MenuIcon name="menu" style={{fontSize:32 ,color:"red" }}/>
      <View style={styles.container2}>
      <Text style={styles.txtlg}>Fooddel</Text>
      <FastFoodIcon name="fast-food-sharp" style={{fontSize:44 ,color:"red" }}/>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('User')}><UserIcon name="user-circle" style={{fontSize:30 ,color:"black" }} /></TouchableOpacity>
      
    </View>
  )
}

const styles=StyleSheet.create({
    container:{width:'100%',height:70,flexDirection:'row',justifyContent:'space-between',padding:14,elevation:20,
    backgroundColor:'#FCFCFF',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20,borderColor:'#C0C0C0',borderWidth:2,},
    container2:{flexDirection:'row'},
    txtlg:{fontSize:20,fontWeight:'500',color:'black'}
})