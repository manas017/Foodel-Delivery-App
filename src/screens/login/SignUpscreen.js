import React, { useState } from 'react'
import {View,Text,StyleSheet, TextInput,Button, TouchableOpacity,ScrollView, Alert} from 'react-native'
import {titles,colors,btn1,hrln} from '../../globalcss/style'
import PassIcon from 'react-native-vector-icons/MaterialIcons';
import UserIcon from 'react-native-vector-icons/Feather';
import LockIcon from 'react-native-vector-icons/Feather'
import PhoneIcon from 'react-native-vector-icons/Entypo'
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EyeIcon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import {firebase} from '../../Firebase/Firebaseconfig'
export default function SignUpScreen() {
    let[emailfocus,Setemailfocus]=useState(false)
    let[passwordfocus,Setpasswordfocus]=useState(false)
    let[showpas,Setshowpas]=useState(false)
    let[showcpass,Setshowcpass]=useState(false)
    let[cpfocus,Setcpfocus]=useState(false)
    let[namefocus,Setnamefocus]=useState(false)
    let[mbnfocus,Setmbnfocus]=useState(false)
    const navigation=useNavigation()

    //taking data
    const[name,Setname]=useState('')
    const[email,Setemail]=useState('')
    const[mbno,Setmbno]=useState('')
    const[password,Setpassword]=useState('')
    const[cpassword,Setcpassword]=useState('')
    const[address,Setaddress]=useState('')

    const[customerror,Setcustomerror]=useState('')
    const[successmesage,SetSuccessmesage]=useState(null)
    const handleSignup=()=>{
        
            if(password!=cpassword){
                Setcustomerror("Password didn't match")
                return
            }
            // if(mobileno.length!=10){
            //     Setcustomerror("Enter correct Mobile NO")
            //     return
            // }
            if(name==''){
                Setcustomerror("Please enter name")
                return
            }
            if(email==''){
                Setcustomerror("Please enter email")
                return
            }
            if(address==''){
                Setcustomerror("Please enter address")
                return
            }
            if(password=='' || cpassword==''){
                Setcustomerror("Please enter password")
                return
            }

            try{
                firebase.auth().createUserWithEmailAndPassword(email,password)
                .then((userinfo)=>{
                    console.log('user created')
                    console.log(userinfo?.user.uid)
                    if (userinfo?.user.uid != null) {
                    const useRef=firebase.firestore().collection('userData')
                    useRef.add(
                        {
                            email: email,
                            password: password,
                            // cpassword: cpassword,
                            phone: mbno,
                            name: name,
                            address: address,
                            uid: userinfo?.user?.uid,
                        }
                    ).then(() => {
                        console.log('data added to firestore')
                        SetSuccessmesage('User created successfully')
                    }).catch((error) => {
                        console.log('firestore error ', error)
                    })
                }

                })
                .catch((error)=>{
                    console.log('sign up firebase error ', error.message)
                    if (error.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).') {
                        Setcustomerror('Email already exists')
                    }
                    else if (error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
                        Setcustomerror('Invalid Email')
                    }
                    else if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                        Setcustomerror('Password should be at least 6 characters')
                    }
                    else {
                        Setcustomerror(error.message)
                    }
                })
            }
            catch(error){
                    console.log('System error',error)
            }
        
        }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.container1} >
        { successmesage==null?
        <View>
        <Text style={styles.titl}>Sign Up</Text>
        {customerror !== '' && <Text style={styles.errormsg}>{customerror}</Text>}
        <View style={styles.inpbx}>
            <View style={styles.lg}><UserIcon name="user" style={{fontSize:22, color:(namefocus)?"red":'black'}} /></View>  
            <TextInput style={styles.inp} placeholder='Name' onFocus={()=>{Setpasswordfocus(false)
                 Setemailfocus(false)
                 Setcpfocus(false)
                 Setshowpas(false)
                 Setshowcpass(false)
                 Setmbnfocus(false)
                 Setnamefocus(true)
                Setcustomerror('')}}
                 onChangeText={(text)=>{Setname(text)}}/>
        </View>
        <View style={styles.inpbx}>
            <View style={styles.lg}><EmailIcon name="email" style={{fontSize:22, color:(emailfocus)?"red":'black'}} /></View>  
            <TextInput style={styles.inp} placeholder='Email' onFocus={()=>{Setpasswordfocus(false)
                 Setemailfocus(true)
                 Setcpfocus(false)
                 Setshowpas(false)
                 Setshowcpass(false)
                 Setmbnfocus(false)
                 Setnamefocus(false)
                 Setcustomerror('')}}
                 
                 onChangeText={(text)=>{Setemail(text)}}
                 />
        </View>
        <View style={styles.inpbx}>
            <View style={styles.lg}><PhoneIcon name="phone" style={{fontSize:22, color:(mbnfocus)?"red":'black'}}/></View>  
            <TextInput style={styles.inp} placeholder='Phone No.' onFocus={()=>{Setpasswordfocus(false)
                 Setemailfocus(false)
                 Setcpfocus(false)
                 Setshowpas(false)
                 Setshowcpass(false)
                 Setmbnfocus(true)
                 Setnamefocus(false)
                 Setcustomerror('')}
                 }
                 onChangeText={(text)=>{Setmbno(text)}}
                 />
        </View>
        <View style={styles.inpbx}>
            <View style={styles.lg}><LockIcon name="lock" style={{fontSize:22, color:(passwordfocus)?"red":'black'}} /></View>
            <TextInput style={[styles.inp,{width:'93%'}]} placeholder='Set Password' secureTextEntry={(showpas?false:true)} onFocus={()=>{Setemailfocus(false)
                Setpasswordfocus(true)
                Setcpfocus(false)
                Setmbnfocus(false)
                Setnamefocus(false)
                Setcustomerror('')}}
                onChangeText={(text)=>{Setpassword(text)}}
                />
            {/* <View><EyeIcon name={(showpas)?"eye":'eye-off'} size={24} color="black" onPress={()=>Setshowpas((prev)=>!prev)} /></View> */}
        </View>
        <View style={styles.inpbx}>
            <View style={styles.lg}><PassIcon name="password" style={{fontSize:22, color:(cpfocus)?"red":'black'}} /></View>
            <TextInput style={[styles.inp,{width:'93%'}]} placeholder='Confirm Password' secureTextEntry={(showcpass?false:true)} onFocus={()=>{Setemailfocus(false)
                Setcpfocus(true)
                Setpasswordfocus(false)
                Setmbnfocus(false)
                Setnamefocus(false)
                Setcustomerror('')}}
                onChangeText={(text)=>{Setcpassword(text)}}
                />
            {/* <View><EyeIcon name={(showcpass)?"eye":'eye-off'} size={24} color="black" onPress={()=>Setshowcpass((prev)=>!prev)} /></View> */}
        </View>
        <View style={styles.addbx}>
           <Text style={styles.addtit}> Address</Text>
           <View style={[styles.inpbx,{width:355}]}><TextInput placeholder='Enter your address' onChangeText={(text)=>{Setaddress(text)}}/></View>
        </View>
        <TouchableOpacity onPress={()=>handleSignup()}><View style={styles.btn}><Text style={styles.btntxt}>Sign Up</Text></View></TouchableOpacity>
        
        <View style={styles.hrln} /> 
        <View style={{flexDirection:'row',paddingTop:10}}>
        <Text>Already have an Account ?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}><Text style={{color:'red',marginHorizontal:5}}>Login</Text></TouchableOpacity>
        </View>
        </View>
        :
        <View style={styles.container2}>
        <Text style={styles.successmessage}>{successmesage}</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: colors.col1, fontSize: 15, fontWeight: "bold" }}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => SetSuccessmesage(null)}>
            <Text style={{ color: colors.col1, fontSize: 15, fontWeight: "bold" }}>Go Back</Text>
        </TouchableOpacity>
       </View>
        }
    </ScrollView>
)
}

const styles=StyleSheet.create({
    container:{marginTop:80},
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
  addtit:{fontSize:15,alignSelf:'center',padding:10,fontWeight:'700'},
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
container2: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
},
successmessage: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
}
})
