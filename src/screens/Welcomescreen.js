import React from 'react'
import { useState,useEffect } from 'react'
import {View,Text,Image, TouchableOpacity,StyleSheet, StatusBar} from 'react-native'
import logo from'../../assets/logo.png.png'
import {color,colors,hrln} from '../globalcss/style'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../Firebase/Firebaseconfig'
import Icon from 'react-native-vector-icons/AntDesign'
export default function Welcomescreen() {
  const navigation=useNavigation()
  const [userlogged, setUserlogged] = useState(null);
    useEffect(() => {
        const checklogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
                // console.log(user);
                if (user) {
                    // navigation.navigate('home');
                    setUserlogged(user);
                } else {
                    // No user is signed in.
                    console.log('no user');
                }
            });
        }
        checklogin();
    }, [])

    const handlelogout = () => {
      firebase.auth().signOut().then(() => {
          // Sign-out successful.
          setUserlogged(null);
          console.log('signed out');
      }).catch((error) => {
          // An error happened.
          console.log(error);
      });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Fooddel</Text>
      <View style={styles.logobx}>
        <Image source={logo} style={styles.logoim} resizeMode='contain'/>
      </View>
      
        <View style={hrln}/>
        <Text style={styles.pl}>Get your favourite dishes at your doorstep!</Text>
        <View style={hrln}/>
        {userlogged==null?
      <View style={styles.btnbx} >
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.btn}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
          <Text style={styles.btn}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      :
      <>
      <View style={styles.emailbox}>
          <Text style={styles.emailtxt}>Logged in with {userlogged.email}</Text>
        </View>
      <View style={styles.btnbx} >
        
        <TouchableOpacity onPress={()=>handlelogout()}>
          <Text style={styles.btn}> Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
          <Text style={styles.btn}>Home <Icon name='arrowright' style={styles.icn}/> </Text>
        </TouchableOpacity>
      </View></>}
    </View>
  )
}

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:'#FF3333',justifyContent:'center',alignItems:'center',paddingTop:StatusBar.currentHeight,width:'100%'},
  logobx:{width:'80%',height:'30%',alignItems:'center'},
  title:{fontSize:50,color:colors.col1,textAlign:'center',marginVertical:10,fontWeight:'200'},
  logoim:{width:'100%',height:'100%'},
  pl:{color:colors.col1,fontWeight:'600',fontSize:14,padding:10},
  btnbx:{flexDirection:'row'},
  btn:{fontSize:15,marginVertical:30,margin:10,color:'#000',backgroundColor:'yellow',padding:20,borderRadius:10,textAlign:'center',width:120,fontWeight:'700'},
  icn:{color:'black',fontSize:15,},
  emailbox:{alignSelf:'center',backgroundColor:'black',paddingHorizontal:8,paddingVertical:10,borderRadius:10,marginTop:5},
  emailtxt:{fontSize:15,color:'white'}
})
