import React, { useState,useEffect } from 'react'
import { Text, View,StyleSheet ,StatusBar,Image, TouchableOpacity} from 'react-native'
import {firebase} from '../Firebase/Firebaseconfig'
import SettingComponent from '../SettingComponent';
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
export default function User(){
    const [userloggeduid, setUserloggeduid] = useState(null);
    const [userdata, setUserdata] = useState(null);
    const navigation=useNavigation()
    useEffect(() => {
        const checklogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
                // console.log(user);
                if (user) {
                    // navigation.navigate('home');
                    setUserloggeduid(user.uid);
                } else {
                    // No user is signed in.
                    console.log('no user');
                }
            });
        }
        checklogin();
    }, [])

    const getuserdata = async () => {
        const docRef = firebase.firestore().collection('userData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            doc.forEach((doc) => {
                // console.log(doc.data())
                setUserdata(doc.data());
            })
        }
        else {
            console.log('no user data');
        }
    }
    console.log(userloggeduid)
    
    useEffect(() => {

        getuserdata();
    }, [userloggeduid]);
    // console.log(userdata)
    return (
        <View style={styles.container}>
        <StatusBar hidden />
        <TouchableOpacity style={styles.close} onPress={()=>navigation.navigate('Home')}>
            <Icon name='arrowleft' style={{fontSize:30,color:'red'}}/>
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/user.png')}
            style={styles.avatarImage}
          />
          {/* <Text style={styles.avatarText}>{userdata.name}</Text> */}
        </View>
         
        <View style={styles.containerout}>
                <Text style={styles.head1}>Your Profile</Text>
                {/* <View style={styles.containerin}>
                    <Text style={styles.head2}>Name: {userdata ? <Text style={styles.head2in}>
                        {userdata.name}
                    </Text> : 'loading'}</Text>

                    <Text style={styles.head2}>Email: {userdata ? <Text style={styles.head2in}>
                        {userdata.email}
                    </Text> : 'loading'}</Text>

                    <Text style={styles.head2}>Phone: {userdata ? <Text style={styles.head2in}>
                        {userdata.phone}
                    </Text> : 'loading'}</Text>

                    <Text style={styles.head2}>Address: {userdata ? <Text style={styles.head2in}>
                        {userdata.address}
                    </Text> : 'loading'}</Text>
                </View> */}
            </View>
        <View style={styles.profileContainer}>
          <SettingComponent
            icon="user"
            heading="Account"
            subheading="Edit Profile"
            subtitle="Change Password"
          />
          <SettingComponent
            icon="setting"
            heading="Settings"
            subheading="Theme"
            subtitle="Permissions"
          />
          <SettingComponent
            icon="gift"
            heading="Offers & Refferrals"
            subheading="Offer"
            subtitle="Refferrals"
          />
          <SettingComponent
            icon="info"
            heading="About"
            subheading="About Movies"
            subtitle="more"
          />
        </View>
      </View>
    );
    
  
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: 'white',
    },
    appHeaderContainer: {
      marginHorizontal: 36,
      marginTop: 40,
    },
    profileContainer: {
      alignItems: 'center',
      padding: 26,
    },
    avatarImage: {
      height: 80,
      width: 80,
      borderRadius: 80,
    },
    avatarText: {
      fontSize: 16,
      marginTop: 16,
      color: 'black',
    },
    containerout:{
        alignSelf:'center',
        marginVertical:20,
        backgroundColor:'#FF3333',
        borderRadius:15
    },
    head1:{
        alignSelf:'center',
        color:'white',
        fontSize:24,
        paddingVertical:10
    },
    containerin:{
        alignSelf:'center',
        padding:10
    },
    head2:{
        fontSize:14,
        color:'#E0E0E0'
    },
    close:{
        position:'absolute',
        top:20,
        left:20
    },
    head2in:{
        color:'white',
        fontSize:16,
        paddingLeft:15
    }
  });
