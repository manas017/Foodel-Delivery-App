import React, { Component } from 'react'
import { Text, StyleSheet, View , FlatList,Image,TouchableOpacity } from 'react-native'
import { useState , useEffect} from 'react';
import {firebase} from '../Firebase/Firebaseconfig'
import Homeheadnav from './Homeheadnav';
import Bottomnav from './Bottomnav';
import Icn from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native'
export default function UserCart(){
    const [cartdata, setCartdata] = useState(null);
    const [totalprc, setTotalprc] = useState('0');
    const navigation=useNavigation()
    const getcartdata = async () => {
        const docRef = firebase.firestore().collection('UserCartdata').doc(firebase.auth().currentUser.uid);

        docRef.get().then((doc) => {
            if (doc.exists) {
                const data = JSON.stringify(doc.data());
                setCartdata(data)
                console.log(data)
            } else {
                console.log('No such document!');
            }
        })
    }

    const deleteItem = (item) => {
        const docRef = firebase.firestore().collection('UserCartdata').doc(firebase.auth().currentUser.uid);
        docRef.update({
            cart: firebase.firestore.FieldValue.arrayRemove(item)
        })
        setTimeout(()=>{
            getcartdata()},40)
       

    }

    useEffect(() => {
        
        for(let i=0;i<2;i++){
        setTimeout(()=>{
            getcartdata()},1000)}
        },[])

   


    useEffect(() => {
        if (cartdata != null) {
            const foodprice = JSON.parse(cartdata).cart;
            let totalfoodprice = 0;
            foodprice.map((item) => {
                console.log(item.data.fprc)
                totalfoodprice = (parseInt(item.data.fprc) * parseInt(item.foodquantity)) +
                    (parseInt(item.data.fdAddonPrice) * parseInt(item.Addonquantity)) + totalfoodprice;
            })
            // console.log(totalfoodprice)
            setTotalprc(JSON.stringify(totalfoodprice))
        }
    }, [cartdata])

    return (
      <View style={{flex:1}}>
        <Text style={{color:'black',fontSize:30,padding:20,alignSelf:'center'}}>Cart Data</Text>
        <View style={styles.cartout}>
                    {cartdata == null || JSON.parse(cartdata).cart.length == 0 ?
                        <Text style={styles.head2}>Your Cart is Empty</Text>
                        :
                        <FlatList style={styles.cardlist} data={JSON.parse(cartdata).cart} renderItem={
                            ({ item }) => {
                                return (
                                    <View style={styles.cartcard}>
                                        <Image source={{ uri: item.data.fimgurl }} style={styles.cartimg} />
                                        <View style={styles.cartcardin}>
                                            <View style={styles.c1}>
                                                <Text style={styles.txt1}>{item.foodquantity}&nbsp;{item.data.fname}</Text>
                                                <Text style={styles.txt2}>₹{item.data.fprc}/each</Text>
                                            </View>
                                            {item.Addonquantity > 0 &&
                                                <View style={styles.c2}>
                                                    <Text style={styles.txt3}>{item.Addonquantity}&nbsp;{item.data.fdAddon}</Text>
                                                    <Text style={styles.txt3}>₹{item.data.fdAddonPrice}/each</Text>
                                                </View>}
                                            <TouchableOpacity style={styles.c4} onPress={() => deleteItem(item)}>
                                                <Text style={styles.txt1}>Delete</Text>
                                                <Icn name="delete" size={24} color="black" style={styles.del} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                )
                            }
                        } />}
                </View>
                <View style={styles.btncont}>
                    <View style={styles.c3}>
                        <Text style={styles.txt5}>Total</Text>
                        <Text style={styles.txt6}>₹{totalprc}</Text>
                    </View>
                    <TouchableOpacity style={styles.bttn} >
                        <Text style={styles.btntxt} onPress={() => navigation.navigate('Place', { cartdata })}>Place Order</Text>
                    </TouchableOpacity>
                </View>
            
        <View style={{position:'absolute',bottom:0,justifyContent:'space-evenly',left:15}}><Bottomnav/></View>
      </View>
    )
}

const styles = StyleSheet.create({
    containerout: {
        flex: 1,
        backgroundColor: 'black',
        // alignItems: 'center',
        width: '100%',
        // height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'red',
        // alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        // height: '100%',
    },
    head1: {
        fontSize: 40,
        textAlign: 'center',
        // fontWeight: '200',
        // marginVertical: 20,
        color: 'red',
    },
    head2: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '200',
        marginVertical: 20,
        elevation: 10,
        backgroundColor: 'white',
        width: '90%',
        height: '50%',
        alignSelf: 'center',
        paddingVertical: '25%',
        borderRadius: 10,
    },
    cartcard: {
        flexDirection: 'row',
        backgroundColor: '#FCFCFF',
        marginVertical: 10,
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center',
        elevation: 5,
        alignItems: 'center',
    },
    cartimg: {
        width: 145,
        marginLeft:5,

        height: 100,
        borderRadius: 10,
    },
    cartcardin: {
        flexDirection: 'column',
        margin: 5,
        width: '58%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: colors.text1,

    },
    cardlist: {
        width: '100%',
    },
    cartout: {
        flex: 1,
        width: '100%',
    },
    btntxt: {
        backgroundColor: 'red',
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',

    },
    btncont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
        marginBottom: 80,
        borderTopColor: 'grey',
        borderTopWidth: 0.2,
        padding:10
    },
   
    c1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
    },
    txt1: {
        fontSize: 16,
        color: 'black',
        width: '60%',
        fontWeight: 'bold',
    },
    txt2: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    c2: {
        backgroundColor: '#FCFCFF',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        flexDirection: 'row',
    },
    txt3: {
        fontSize: 15,
        color: 'black',
    },
    txt5: {
        fontSize: 20,
        color:'black',
        marginHorizontal: 5,
    },
    txt6: {
        fontSize: 25,
        color: 'black',
        marginHorizontal: 5,
        fontWeight: 'bold',
    },
    c3: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    c4: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 10,
        borderColor: 'red',
        borderWidth: 1,
        marginVertical: 10,
        padding: 5,
    },
    del: {
        color: 'black',
    },
    bttn:{width:190,paddingHorizontal:10,height:40}
})

