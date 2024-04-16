import React, { useState } from 'react'
import 'react-native-vector-icons'
import {View,Text,StyleSheet, TextInput,Button, TouchableOpacity, ScrollView} from 'react-native'
import {titles,colors,btn1,hrln} from '../../globalcss/style'
import PassIcon from 'react-native-vector-icons/MaterialIcons';
import UserIcon from 'react-native-vector-icons/Feather';
import GoogleIcon from 'react-native-vector-icons/AntDesign';
import FacebookIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import {firebase} from '../../Firebase/Firebaseconfig'
export default function LoginScreen() {
    let[emailfocus,Setemailfocus]=useState(false)
    let[passwordfocus,Setpasswordfocus]=useState(false)
    let[showpas,Setshowpas]=useState(false)
    const navigation=useNavigation()

    //
    const[email,Setemail]=useState('')
    const[password,Setpassword]=useState('')
    const[customerror,Setcustomerror]=useState('')

    const handlelogin = () => {
        // console.log(email, password);
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                console.log(user);
                // ...

                navigation.navigate('welcome');
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
                if (errorMessage === 'Firebase: The email address is badly formatted. (auth/invalid-email).'
                ) {
                    Setcustomerror('Please enter a valid email address')
                }
                else {
                    Setcustomerror('Incorrect email or password')
                }
            })
    }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.container1}>
            
        <Text style={styles.titl}>Sign In</Text>
        {customerror !== '' && <Text style={styles.errormsg}>{customerror}</Text>}
        <View style={styles.inpbx}>
            <View style={styles.lg}><UserIcon name="user" style={{fontSize:22, color:(emailfocus)?"red":'black'}} /></View>  
            <TextInput style={styles.inp} placeholder='Email' onFocus={()=>{Setpasswordfocus(false)
                 Setemailfocus(true)
                 Setshowpas(false)
                Setcustomerror('')}}
                 
                onChangeText={(text)=>Setemail(text)}/>
        </View>
        <View style={styles.inpbx}>
            <View style={styles.lg}><PassIcon name="password" style={{fontSize:22, color:(passwordfocus)?"red":'black'}} /></View>
            <TextInput style={[styles.inp,{width:'93%'}]} placeholder='Password' secureTextEntry={(showpas?false:true)} onFocus={()=>{Setemailfocus(false)
                Setpasswordfocus(true)
            Setcustomerror('')}}
                
                onChangeText={(text)=>Setpassword(text)}/>
            {/* <View>
            (showpas)?<EyeIcon name={"eye"} size={24} color="black" onPress={()=>Setshowpas((prev)=>!prev)} />:
                      <EyeIcon name={"eye"} size={24} color="black" onPress={()=>Setshowpas((prev)=>!prev)} /></View> */}
        </View>
        
        <TouchableOpacity onPress={()=>{handlelogin()}}><View style={styles.btn} ><Text style={styles.btntxt}>Sign In</Text></View></TouchableOpacity>
        <Text style={styles.othrtxt}>Forgot Password ?</Text>
        <Text style={styles.or}>OR</Text>
        <Text style={styles.othrtxt}>Sign in With</Text>
        <View style={styles.gfbx}>
            <TouchableOpacity><GoogleIcon name="google" style={{fontSize:35,color:"#EA4335",padding:20}}/></TouchableOpacity>
            <TouchableOpacity><FacebookIcon name="facebook-square" style={{fontSize:35,color:"#316FF6",padding:20}} /></TouchableOpacity>
            
        </View>
        <View style={styles.hrln} /> 
        <View style={{flexDirection:'row'}}>
        <Text>Don't have an Account ?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Signup')}><Text style={{color:'red',marginHorizontal:5}}>Sign Up</Text></TouchableOpacity>
        </View>
    </ScrollView>
)
}

const styles=StyleSheet.create({
    container:{height:'100%'},
    container1:{alignItems:'center',justifyContent:'center'},
  titl:{fontSize:titles.title1,color:colors.text1,padding:20},
  inpbx:{flexDirection:'row',width:'76%',marginVertical:10,borderRadius:10,borderColor:'grey',padding:10,elevation:10,backgroundColor:colors.col1},
  inp:{width:'100%',fontSize:14,marginHorizontal:10},
  lg:{width:20},
  btn:{backgroundColor:"red",padding:10,borderRadius:10,marginTop:30,paddingHorizontal:90},
  btntxt:{color:'white',fontWeight:'bold',fontSize:15},
  othrtxt:{fontSize:12,margin:10},
  or:{fontSize:10,color:'red'},
  gfbx:{flexDirection:'row',margin:5,padding:2},
  hrln:{height:2,width:150,backgroundColor:'#E0E0E0',marginBottom:15},
  errormsg: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
},
head1: {
    fontSize: titles.title1,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 10,
},
})
